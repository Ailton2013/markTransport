/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


//paginas 
$('#page-viagens').live('pageshow',controllerPaginaViagens);
$('#page-mapa').live('pageshow',controllerPaginaMapa);
$('#page-passageiros').live('pageshow',controllerPaginaPassageiros);
$('#page-passageiro').live('pageshow',controllerPaginaPassageiro);
$('#page-esqueceu-senha').live('pageshow',controllerEsqueceuSenha);
$('#page-nova-viagem').live('pageshow',controllerNovaViagem);
$('#page-login').live('pageshow',controllerPaginaLogin);

//botoes
$("#btn_logar").live('click',logar);
$(".btn-sair").live('click',sair);
$(".lnk-viagem").live('click',selecionarViagem);
$(".lnk-passageiro").live('click',selecionarPassageiro);
$(".btn-ver-mapa").live('click',selecionarEndereco);


function controllerPaginaLogin(){
	if(validarAcesso(false)){
		$.redirect('#page-viagens');
	}
}

function controllerPaginaViagens(){
	validarAcesso(true);
	preencherViagens();
}

function controllerPaginaMapa(){
	validarAcesso(true);
	preencherMapa();
	marcarMapa();
}

function controllerPaginaPassageiros(){
	validarAcesso(true);
	preencherPassageiros();
}

function controllerPaginaPassageiro(){
	validarAcesso(true);
	detalharPassageiro();
}

function controllerEsqueceuSenha(){
	alert("esqueceusenha");
}

function controllerNovaViagem(){
	validarAcesso(true);
	alert("novaviagem");
}

function preencherViagens(){
		var pessoa = $.storage.getItem("pessoa");
		var PES_CDPESSOA = pessoa.PES_CDPESSOA;
		var header = '<li role="heading" data-role="list-divider" class="ui-li ui-li-divider ui-bar-b ui-corner-top">'+
          			'Viagens'+
          		 '</li>';
        var linhas = '';
		
		// alert(PES_CDPESSOA);
		// $.onLoader();
		$.ajax({
			url: 'http://aspspider.ws/luansidney/WebService/MarkWebService.asmx/ConsultarViagens',
			contentType: 'application/x-www-form-urlencoded', 
			type: 'post', 
			data: {'PES_CDPESSOA_TAXISTA':PES_CDPESSOA},
			dataType: 'json',
			success: function(viagens) {
				$.each(viagens,function(){
					// console.log($(this)[0]);
					linhas +=	'<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-iconsize="18" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-corner-bottom ui-btn-up-c">'+
								'<div class="ui-btn-inner ui-li" >'+
									'<div class="ui-btn-text" >'+
									    '<a href="#page-passageiros" data-id="'+$(this)[0].VIA_CDVIAGEM+'" data-transition="slide" class="ui-link-inherit lnk-viagem">'+
									        $(this)[0].UF_CIDADE_SAIDA+' - '+$(this)[0].UF_CIDADE_DESTINO+' - '+$(this)[0].DATA_SAIDA+
									        '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+
									            $(this)[0].QT_VAGAS_PREENCHIDA+
									        '</span>'+
									    '</a>'+
								    '</div>'+
								    '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow ui-iconsize-18">&nbsp;</span>'+
								'</div>'+
						    '</li>';
				});
				$("#lst-viagens").html(header + linhas);
				$("#lst-viagens").listview("refresh");
				// $.offLoader();
			}
		});	
		
}



function preencherPassageiros(){
		var viagem = $.storage.getItem("viagem");
		

		var header = '<li role="heading" data-role="list-divider" class="ui-li ui-li-divider ui-bar-b ui-corner-top">'+
          			'Passageiros'+
          		 '</li>';
		var linhas = '';
		// $.onLoader();
		$.ajax({
			url: 'http://aspspider.ws/luansidney/WebService/MarkWebService.asmx/ConsultarPassageirosViagem',
			contentType: 'application/x-www-form-urlencoded', 
			type: 'post', 
			data: {'VIA_CDVIAGEM':viagem},
			dataType: 'json',
			success: function(passageiros) {
				$.each(passageiros,function(){
					// console.log($(this)[0]);
					linhas +=	'<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-iconsize="18" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-corner-bottom ui-btn-up-c">'+
									'<div class="ui-btn-inner ui-li">'+
										'<div class="ui-btn-text">'+
				                			'<a href="#page-passageiro" data-transition="slide" data-id="'+$(this)[0].RES_CDRESERVA+'" class="ui-link-inherit lnk-passageiro">'+
					                				$(this)[0].PES_NOME+
					                			'<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+
					                			$(this)[0].RES_QTRESERVA+'</span>'+
				                			'</a>'+
				                		'</div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow ui-iconsize-18">&nbsp;</span>'+
			                		'</div></li>';
				});
				$("#lst-passageiros").html(header + linhas);
				$("#lst-passageiros").listview("refresh");
				// $.offLoader();
			}
		});	
}

var map;
function preencherMapa() {
    var mapOptions = {
      center: new google.maps.LatLng(-10.915235, -37.670673),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("div-mapa"),mapOptions);
}


function marcarMapa(){

      var endereco = $.storage.getItem("endereco");
	 alert(endereco);	
	  var latlng = new google.maps.LatLng(-10.915235, -37.670673);   
	  // var Options = {'latLng': latlng};
	  var Options = {'address': endereco};
	  
	  var geocoder = new google.maps.Geocoder();
	  geocoder.geocode( Options, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK) {
		   	  map.setCenter(results[0].geometry.location);	
			  marker = new google.maps.Marker({
			  map: map,
			  position: results[0].geometry.location
			  });
		  }
	  });
}

var a;

function logar(e){
	e.preventDefault();
	// $.onLoader();
	$.ajax({
		url: 'http://aspspider.ws/luansidney/WebService/MarkWebService.asmx/LogarSistema',
		contentType: 'application/x-www-form-urlencoded', 
		type: 'post', 
		data: {'usuario':$("#usuario").val(),'senha':$("#senha").val()},
		dataType: 'json',
		success: function(pessoa) {
			if(pessoa.PES_CDPESSOA > 0){
				$.storage.setItem("logado","1");
				$.storage.setItem("pessoa",pessoa);
				$.redirect('#page-viagens');
			}else{
				alert("Usuários ou senha inválidos");
			}
			// $.offLoader();
		}
	});
}


function sair(e){
	e.preventDefault();
	// alert("aqui");
	$.storage.clear();
	$.redirect('#page-login');
}


function validarAcesso(redirect){
	var logado = $.storage.getItem("logado");
	if(logado == 1){
		return true;
	}else{
		if(redirect){
			$.redirect('#page-login');
		}
		return false;
	}
}


function selecionarViagem(e){
	e.preventDefault();
	$.storage.setItem("viagem",$(this).data("id"));
	$.redirect('#page-passageiros');
}

function selecionarPassageiro(e){
	e.preventDefault();
	$.storage.setItem("reserva",$(this).data("id"));
	$.redirect('#page-passageiro');
}

function selecionarEndereco(e){
	e.preventDefault();
	$.storage.setItem("endereco",$(this).data("endereco"));
	$.redirect('#page-mapa');
}

function detalharPassageiro(){
	var reserva = $.storage.getItem("reserva");
	// $.onLoader();
	$.ajax({
		url: 'http://aspspider.ws/luansidney/WebService/MarkWebService.asmx/DetalharReserva',
		contentType: 'application/x-www-form-urlencoded', 
		type: 'post', 
		data: {'RES_CDRESERVA':reserva},
		dataType: 'json',
		success: function(reserva) {
			$("#nome_passageiro").html(reserva.PES_NOME);
			$("#quantidade_vagas").html(reserva.RES_QTRESERVA);
			$("#local_origem").html(reserva.END_COMPLETO_SAIDA);
			$("#local_destino").html(reserva.END_COMPLETO_CHEGADA);
			$("#btn-mapa-saida").data("endereco",reserva.END_COMPLETO_SAIDA);
			$("#btn-mapa-chegada").data("endereco",reserva.END_COMPLETO_CHEGADA);
			// $.offLoader();
		}
	});
}