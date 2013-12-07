// Métodos para manipular objetos no localStorage
$.redirect = function(page){
	window.location.replace(page);
}

$.onLoader = function(){
	// $("#loader").show();
	$.mobile.loading( 'show', {
		textVisible: false,
		html: ""
	});
}

$.offLoader = function(){
	// $("#loader").hide();
	$.mobile.loading('hide');
}

$.storage = function() {
	return "Metodos para manipular objetos no localStorage";
};
$.storage.setItem = function(key, value) {
	if (typeof value == "object") {
		value = JSON.stringify(value);
	}
	localStorage.setItem(key, value);
};
$.storage.getItem = function(key) {
	var value = localStorage.getItem(key);

	if (value == null) {
		return false;
	}

	// assume it is an object that has been stringified
	if (value[0] == "{") {
		value = JSON.parse(value);
	}

	return value;
};

$.storage.clear = function(){
	localStorage.clear();
};

$(document).ajaxStart(function() {
  $.onLoader();
});

$( document ).ajaxComplete(function() {
  $.offLoader();
});