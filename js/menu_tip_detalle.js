window.onload = function() {
	//$('#myIframe').attr('src', 'libs/pdf/web/detalleTips.html');

	var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	if(isCordovaApp){
	    setTimeout(function(){
		    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
		    if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
		    	$('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/pdf-viewer/web/viewer.php?tipo=tips&codigo='+localStorage.getItem("tmp_tip"));
		    }
	    }, 200);
	}else{
		$('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/pdf-viewer/web/viewer.php?tipo=tips&codigo='+localStorage.getItem("tmp_tip"));
	}
};