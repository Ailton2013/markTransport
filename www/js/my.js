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



//página viagens 
$('#page2').live('pageshow',controllerPaginaViagens);
function controllerPaginaViagens(){
	preencherViagens();
}

function preencherViagens(){
		var header = '<li role="heading" data-role="list-divider" class="ui-li ui-li-divider ui-bar-b ui-corner-top">'+
          			'Viagens'+
          		 '</li>';
		var linhas = '';
		for(var i=1;i<10;i++){
			linhas +=	'<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-iconsize="18" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-corner-bottom ui-btn-up-c">'+
								'<div class="ui-btn-inner ui-li">'+
									'<div class="ui-btn-text">'+
									    '<a href="#page3" data-transition="slide" class="ui-link-inherit">'+
									        'Lagarto - Aracaju 13h'+
									        '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+
									            '2'+
									        '</span>'+
									    '</a>'+
								    '</div>'+
								    '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow ui-iconsize-18">&nbsp;</span>'+
								'</div>'+
						    '</li>';
		}
		$("#lst-viagens").html(header + linhas);
		$("#lst-viagens").listview("refresh");
}

//página passageiros

$('#page3').live('pageshow',controllerPaginaPassageiros);
function controllerPaginaPassageiros(){
	preencherPassageiros();
}

function preencherPassageiros(){
		var header = '<li role="heading" data-role="list-divider" class="ui-li ui-li-divider ui-bar-b ui-corner-top">'+
          			'Passageiros'+
          		 '</li>';
		var linhas = '';
		for(var i=1;i<10;i++){
			linhas +=	'<li data-theme="c" data-corners="false" data-shadow="false" data-iconshadow="true" data-iconsize="18" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-li-has-count ui-corner-bottom ui-btn-up-c">'+
							'<div class="ui-btn-inner ui-li">'+
								'<div class="ui-btn-text">'+
		                			'<a href="#page4" data-transition="slide" class="ui-link-inherit">'+
		                				'Augusto Flavio'+
		                			'</a>'+
		                		'</div><span class="ui-icon ui-icon-arrow-r ui-icon-shadow ui-iconsize-18">&nbsp;</span>'+
	                		'</div></li>';
		}
		$("#lst-passageiros").html(header + linhas);
		$("#lst-passageiros").listview("refresh");
}

