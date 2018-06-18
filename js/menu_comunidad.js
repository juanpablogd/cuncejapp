window.onload = function() {
	$("#AbrirSitio").click(function(){
	    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	    var pageContentUrl = "http://cuncejapp-cundinamarca.gov.co/index.php?r=user%2Fauth%2Flogin";
	    var obj = JSON.parse(localStorage.getItem("usuario"));  console.log(obj);
	    if(isCordovaApp){
	        if(!obj.hasOwnProperty("comunidad_pas")){
	            localStorage.clear();var isCordovaApp = !!window.cordova; console.log(isCordovaApp);if(isCordovaApp){window.open('login.html');}else{window.open('login.html','_self');};return false;
	        }
	        if(obj.comunidad_usr != "" && obj.comunidad_pas != ""){
	            var pageContent = '<html><head></head><body style="background: rgb(11, 60, 93);">'+
	                '<h1 style="color:white">Ingresando a la comunidad de Concejales...</h1>'+
			            '<form id="account-login-form" action="'+pageContentUrl+'" method="post" style="display:none">'+
//						'<input type="hidden" name="_csrf" value="V4IRVQhtOvvO_Wx2NxcjBD3U_y6SOQSpo77b1vsHSBviwz3COMIMd2K3a3pnM8WMO7bTgWLsWpB2i0MFHCFRAw==">            <div class="form-group field-login_username required">'+
						'<input type="text" id="login_username" value="'+obj.comunidad_usr+'" class="form-control" name="Login[username]" placeholder="Usuario o correo electrónico" aria-label="Usuario o correo electrónico" aria-required="true">'+
						'<div class="help-block"></div>'+
						'</div>            <div class="form-group field-login_password required">'+
						'<input type="password" id="login_password" value="'+obj.comunidad_pas+'" class="form-control" name="Login[password]" placeholder="contraseña" aria-label="contraseña" aria-required="true">'+
						'<div class="help-block"></div>'+
						'</div>            <div class="form-group field-login-rememberme">'+
						'<input type="hidden" name="Login[rememberMe]" value="0"><label><input type="checkbox" id="login-rememberme" name="Login[rememberMe]" value="1" checked="" class="regular-checkbox"> Recordarme<div class="regular-checkbox-box"></div></label>'+
						'<div class="help-block"></div>'+
						'</div>'+
						'            <hr>'+
						'            <div class="row">'+
						'                <div class="col-md-4">'+
						'                    <button type="submit" id="login-button" class="btn btn-large btn-primary" data-ui-loader="">Iniciar sesión</button>                </div>'+
						'                <div class="col-md-8 text-right">'+
						'                    <small>'+
						'                        ¿Olvidaste tu contraseña?                        <a id="password-recovery-link" href="/index.php?r=user%2Fpassword-recovery" data-pjax-prevent=""><br>Crear una nueva.</a>'+
						'                    </small>'+
						'                </div>'+
						'            </div>'+
						'</form>'+
					'<script type="text/javascript">document.getElementById("account-login-form").submit();</script></body></html>';
	            pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);          
	        }
	        var ref = cordova.InAppBrowser.open(pageContentUrl, '_self', 'location=yes');
	    }else{
	        window.open(pageContentUrl);
	    }
	});
};