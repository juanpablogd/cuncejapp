var urlget='http://saga.cundinamarca.gov.co/apps/cuncejapp';

$(function () {
    setTimeout(function(){
        if(localStorage.getItem("usuario") != null){
            var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
            if(isCordovaApp){
                window.open('menu_principal.html');            
            }else{
                window.open('menu_principal.html','_self');
            }
        }
    }, 50);
	function mensaje (msj){
	    $.notify({  icon: 'glyphicon glyphicon-warning-sign',
	                message: msj
	             }, { 
	            type: "danger",
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

    $("#ingresar").click(function() {  
        var usr =  $("#usr").val(); console.log(usr);
        var pwd = $("#pwd").val();
        if (usr.trim()==""){
            mensaje("Digite el usuario");
            $("#usr").focus();
            return false;
        }
        if (pwd.trim()==""){
            mensaje("Digite la clave");
            $("#pwd").focus();
            return false;
        }
        console.log("Ok");

        $.getJSON(urlget+"/servicios/getUsuario.php?usr="+usr+"&pwd="+pwd, function( data ) {
        		console.log(data);
        		if(data == null){
        			mensaje("Usuario o Clave invalida!");
        		}else{
        			localStorage.setItem("usuario", JSON.stringify(data[1]));
			  		setTimeout(function(){
                        var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
                        if(isCordovaApp){
                            window.open('menu_principal.html');            
                        }else{
                            window.open('menu_principal.html','_self');
                        }
					}, 50);
        		}
        });
    });

});