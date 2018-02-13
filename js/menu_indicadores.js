window.onload = function() {
	var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	if(isCordovaApp){
	    setTimeout(function(){
		    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
		    if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
		        var devicePlatform = device.platform;
		        console.log(devicePlatform);
		        if(devicePlatform == "iOS"){
		        	var ref = cordova.InAppBrowser.open('http://saga.cundinamarca.gov.co/apps/cundidata/', '_system', 'location=no');
		        	setTimeout(function(){
		        			window.open('menu_principal.html'); 
		        	}, 50);	
		        }else{
					$('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cundidata/');
		        }
		    }
	    }, 200);
	}else{
        $('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cundidata/');
	}

};