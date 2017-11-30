window.onload = function() {

	function acceso(opcion){
		if(localStorage.getItem("usuario") == null){
			confirmar (
			    "Opción solo para usuarios registrados, quiere acceder?",  // message
			    function(buttonIndex){	console.log(buttonIndex);
			    	if(buttonIndex == undefined || buttonIndex =="2"){ 
			    		//window.location="login.html";
						window.open('login.html');			    		
			    	}
			    },         				// callback
			    'Cuncejapp',            	// title
			    ['Si','No']           	// buttonName
			);
		}else {
			window.open(
			  opcion+'.html'
			);
		}
	}

	$('#menu_formacion').click(function(){
		acceso('menu_formacion');
	});

	$('#menu_asesoria_enlinea').click(function(){
		acceso('menu_asesoria_enlinea');
	});

	$('#menu_comunidad').click(function(){
		acceso('menu_comunidad');
	});

	$('#menu_tu_opinion').click(function(){
		acceso('menu_tu_opinion');
	});

};