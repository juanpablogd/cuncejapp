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

	$('#btn_noti').click(function(){
		window.open(
		  'notificaciones.html'
		);
	});

	function verNoti(){
		var ahora = moment().locale('es');			//console.log(ahora);
		var manana = moment().add(1, 'days');		//console.log(ayer);
		var ayer = moment().subtract(1, 'days');	//console.log(manana);

		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('nt');	//console.log(retrievedObject);
		if(retrievedObject != null) {
			var arr = JSON.parse(retrievedObject);
			console.log('retrievedObject: ', arr);
			var notiActual = 0;
			for (var i = 0; i < arr.length; i++){
				var fecNoti = moment(arr[i].fecha_hora);	//console.log(fecNoti);
				if(fecNoti >= ayer && fecNoti <= manana){
					console.log("Esta en el Rango: " + arr[i].fecha_hora)
					notiActual++;
				}
			}
			if(notiActual>0){
				$("#nactual").html(notiActual);
				$("#btn_noti").removeClass("btn-default");
				$("#btn_noti").addClass("btn-danger");
			}else{
				$("#btn_noti").removeClass("btn-danger");
				$("#btn_noti").addClass("btn-default");
			}
		}
	}

	/* Busca notificaciones */
	var parametros = new Object();
	parametros['app'] = 'cuncejapp';
	$.ajax({
		data:  parametros,
		url:'http://saga.cundinamarca.gov.co/SIG/servicios/apps/notificaciones.php',
		type:  'post',
		async: false,		//timeout: 30000,
		success: function(responsef){ 
			var testObject = JSON.parse(responsef.replace(/&quot;/g,'"'));	console.log(testObject);
			localStorage.setItem('nt', JSON.stringify(testObject));
		},
		error: function (error) {
			console.log(error);
	    }
	}).always(function() {
	    setTimeout(function(){ verNoti(); }, 1000*0.1);
	});

};