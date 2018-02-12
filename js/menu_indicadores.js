window.onload = function() {
	var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	if(isCordovaApp){
	    setTimeout(function(){
		    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
		    if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
	            $('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cundidata/');
		    }
	    }, 200);
	}else{
        $('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cundidata/');
	}

};