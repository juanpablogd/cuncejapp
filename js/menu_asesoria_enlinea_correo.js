window.onload = function() {

	var obj = JSON.parse(localStorage.getItem("usuario")); 	//console.log(validator.showErrors(obj));
	var isCordovaApp = !!window.cordova; console.log(isCordovaApp);

	if(isCordovaApp){
	    setTimeout(function(){
		    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
		    if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
				$.each(obj, function( index, value ) {      console.log(value + " " + index);
			        if(index == "cedula"){
			            $('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/menu_asesoria_enlinea_correo.php?busca=' + value);
			        }
		    	});
		    }
	    }, 100);
	}else{
		$.each(obj, function( index, value ) {      console.log(value + " " + index);
	        if(index == "cedula"){
	            $('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/menu_asesoria_enlinea_correo.php?busca=' + value);
	        }
    	});
	}

};