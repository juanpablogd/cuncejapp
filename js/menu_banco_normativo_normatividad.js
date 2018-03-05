window.onload = function() {

	function tipoNorma(opcion){
		localStorage.setItem('noro', opcion);
		setTimeout(function(){
	        var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	        if(isCordovaApp){
	            window.open('menu_normatividad.html');            
	        }else{
	            window.open('menu_normatividad.html','_self');
	        }
	    }, 1000*0.09);
	}

	$('#btnApoyo').click(function(){
		tipoNorma('PROCESO DE APOYO');
	});

	$('#btnControl').click(function(){
		tipoNorma('PROCESO DE CONTROL');
	});

	$('#btnEstrategico').click(function(){
		tipoNorma('PROCESO ESTRATEGICO');
	});

	$('#btnMisional').click(function(){
		tipoNorma('PROCESO MISIONAL');
	});


};