var urlget='http://www5.cundinamarca.gov.co/cuncejapp/saga';

$(function () {
    if(localStorage.getItem("usuario") != null){
        window.open(
          'menu_principal.html'
        );
    }
	function mensaje (msj,tipo){
	    $.notify({  icon: 'glyphicon glyphicon-warning-sign',
	                message: msj
	             }, { 
	            type: tipo,
	            allow_dismiss: false, 
	            timer : 100,
	            delay: 3000,
	                animate: {
	                    enter: 'animated zoomInDown',
	                    exit: 'animated zoomOutUp'
	                },
	                placement: {
	                    from: "top",
	                    align: "center"
	                }
	            }
	        );
	}

    $("#enviar").click(function() {  
        var usr =  $("#usr").val(); //console.log(usr);
        if (usr.trim()==""){
            mensaje("Digite el usuario","danger");
            $("#usr").focus();
            return false;
        }        //console.log("Ok");
	$.ajax( urlget+"/servicios/recuperaUsuario.php?usr="+usr )
		.done(function(data) { console.log(data);
			console.log( "success" );
        		if(data == "Ok"){
        			mensaje("Revise su correo para recuperar la Contraseña.","success");
			  		setTimeout(function(){
			  			window.open(
						  'login.html'
						); 
					}, 4*1000);
        		}else{
        			mensaje(data,"danger");
        		}
		})
		.fail(function() {
			console.log( "error" );
			mensaje("Error de conexión con el servidor!","danger");
		})
		.always(function() {
			console.log( "complete" );
	  	});
    });

});