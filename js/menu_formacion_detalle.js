function msjDialog(msj){
	console.log(msj);
	var dialog = new BootstrapDialog({
        message: function(dialogRef){
                var $message = $(
				'<div>'+
					'<div >'+
					        '<div class="card hovercard">'+
					            '<div class="info">'+
					                '<div class="profile-usermenu">'+
										'<ul class="nav">'+
											'<li class="alineacion">'+
												'<a >'+
												'<span class="fa fa-gavel"></span><span> Inscipción Exitosa!</span>'+
												'</a>'+
											'</li>'+	
										'</ul>'+
									'</div>'+
									'<hr size="20" />'+
									'<div class="desc alineacion">'+msj+ '</div>'+
					            '</div>'+					            
							'</div>'+
						
					'</div><br>');
                var $button = $('<button class="btn btn-primary  btn-block">Cerrar</button>');
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
					var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
                    if(isCordovaApp){
                        window.open('menu_formacion.html');            
                    }else{
                        window.open('menu_formacion.html','_self');
                    }
                });
                $message.append($button);
        
                return $message;
         }, 
        closable: false
     });
    dialog.realize();
    dialog.getModalHeader().hide();
    dialog.open();
}
window.onload = function() {
	var obj = JSON.parse(localStorage.getItem("usuario"));	//console.log(obj);
	$("#btn_inscribirse").html(obj.nombres+"!   preinscribete.")

	var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	if(isCordovaApp){
	    setTimeout(function(){
		    var networkState = navigator.connection.type;	console.log('Connection type: ' + networkState);
		    if (networkState != Connection.NONE && networkState != Connection.UNKNOWN) {
		    	$('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/pdf-viewer/web/viewer.php?codigo='+localStorage.getItem("tmp_curso"));
		    }
	    }, 200);
	}else{
		$('#myIframe').attr('src', 'http://saga.cundinamarca.gov.co/apps/cuncejapp/pdf-viewer/web/viewer.php?codigo='+localStorage.getItem("tmp_curso"));
	}

	$('#btn_inscribirse').click(function () {
		$("#cargando").show();
		$('#btn_inscribirse').hide();
		var cedula = '';
		var nombres = '';
		var apellidos = '';
		var id_curso = '';
		var obj = JSON.parse(localStorage.getItem("usuario"));
		$.each(obj, function( index, value ) {      console.log(value + " " + index);
	        if(index == "cedula"){
	            cedula = value;
	        }else if(index == "nombres"){
	        	nombres = value;
	        }else if(index == "apellidos"){
	        	apellidos = value;
	        }
    	});

        id_curso = localStorage.getItem("tmp_curso");
        //envia el dato para guardar el curso
		$.ajax({
		  url: "http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/setCurso.php",
		  data: {
		    cedula: cedula,
		    id_curso: id_curso
		  },
		  type: 'GET',
		  success: function( result ) {
			$("#cargando").hide();
			$('#btn_inscribirse').show();
		  	if($.isNumeric(result)){
				msjDialog("Honorable Concejal(a) "+nombres+" "+apellidos+". su preinscripción ha sido exitosa, nos comunicaremos en las siguientes 24 horas para brindar asistencia y orientación para el proceso de matrícula.");
/*				  		alerta("Señor Concejal su preinscripción ha sido exitosa, nos comunicaremos en las siguientes 24 horas para brindar asistencia y orientación para el proceso de matrícula.",function() {
                    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
                    if(isCordovaApp){
                        window.open('menu_formacion.html');            
                    }else{
                        window.open('menu_formacion.html','_self');
                    }
		  		},"CuncejApp","Ir");	*/

			  }else{
			  	alerta("No se realizó la Preincripción, revise la red por favor."+ result,function() {},"CuncejApp","Ir");
			  }
		  },
          error: function(result) {
			$("#cargando").hide();
			$('#btn_inscribirse').show();
          	alerta("No se realizó la Preincripción, revise la red por favor."+ result,function() {},"CuncejApp","Ir");
          }
		});
	});
};

