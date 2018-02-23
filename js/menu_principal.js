window.onload = function() {

	function acceso(opcion){
		if(localStorage.getItem("usuario") == null){
			confirmar (
			    "Opción solo para usuarios registrados, quiere acceder?",  // message
			    function(buttonIndex){	console.log(buttonIndex);
			    	if(buttonIndex == undefined || buttonIndex =="2"){ 
				        var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
				        if(isCordovaApp){
				            window.open('login.html');            
				        }else{
				            window.open('login.html','_self');
				        }
			    	}
			    },         				// callback
			    'Cuncejapp',            	// title
			    ['Si','No']           	// buttonName
			);
		}else {
	        var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	        if(isCordovaApp){
	            window.open(opcion+'.html');            
	        }else{
	            window.open(opcion+'.html','_self');
	        }
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

	$('#menu_asesoria_enlinea_correo').click(function(){
		acceso('menu_asesoria_enlinea_correo');
	});

	$('#btn_noti').click(function(){
        var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
        if(isCordovaApp){
            window.open('notificaciones.html');            
        }else{
            window.open('notificaciones.html','_self');
        }
	});
	
	$('#btnSalir').click(function(){
		localStorage.clear();
		var isCordovaApp = !!window.cordova;	//console.log(isCordovaApp);
		if(isCordovaApp){window.open('login.html');}
		else{window.open('login.html','_self');};
		return false;
	});
	

	function verNoti(){
		var ahora = moment().locale('es');			//console.log(ahora);
		var manana = moment().add(1, 'days');		//console.log(ayer);
		var ayer = moment().subtract(1, 'days');	//console.log(manana);

		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('nt');	//console.log(retrievedObject);
		if(retrievedObject != null) {
			var arr = JSON.parse(retrievedObject);	//console.log('retrievedObject: ', arr);
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
		async: true,		//timeout: 30000,
		success: function(responsef){ 
			var testObject = JSON.parse(responsef.replace(/&quot;/g,'"'));	//console.log(testObject);
			localStorage.setItem('nt', JSON.stringify(testObject));
		},
		error: function (error) {
			console.log(error);
	    }
	}).always(function() {
	    setTimeout(function(){ verNoti(); }, 1000*0.1);
	});

};