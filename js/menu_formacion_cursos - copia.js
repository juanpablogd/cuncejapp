function irCurso(id){
    localStorage.setItem("tmp_curso", id);
    console.log(id);

    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
    if(isCordovaApp){
        setTimeout(function(){ window.open('menu_formacion_detalle.html'); }, 50);          
    }else{
        window.open('menu_formacion_detalle.html','_self');
        setTimeout(function(){ window.open('menu_formacion_detalle.html','_self'); }, 50);
    }
}

$(document).ready(function(){

function cargaCursos(){
    // Retrieve the object from storage https://www.w3schools.com/bootstrap/bootstrap_list_groups.asp
    var retrievedObject = localStorage.getItem('cr');   //console.log(retrievedObject);
    if(retrievedObject != null) {
        var arr = JSON.parse(retrievedObject);  
        var registros = Object.keys(arr).length;    console.log(registros);
        $( ".lista" ).html('<br>');
        for (var i = 1; i < (registros+1); i++){
            var htmlItem = '';  //console.log(arr[i]);
            var htmlInscribirse = '';
            var fInicio = moment(arr[i].fecha_inicio+" 23:59:59", 'YYYY-MM-DD HH:mm:ss').toDate();
            var fLimite = moment(arr[i].fecha_inscripcion+" 23:59:59", 'YYYY-MM-DD HH:mm:ss').toDate();
            var fActual = moment(); //console.log(fLimite);   //console.log(fActual);
            var enCLick = "";
            if(fActual >= fLimite || fActual >= fInicio){
                htmlInscribirse = '<div class="col-xs-12" style="color: red;">Cerrado!! Inscritos: '+arr[i].inscritos+'</div><br>';
            }else{
                if(parseInt(arr[i].inscritos) >= parseInt(arr[i].limite_cupos)){
                    htmlInscribirse = '<div class="col-xs-12" style="color: red;">Agotado!! Inscritos: '+arr[i].inscritos+'</div><br>';
                }else{
                    htmlInscribirse = '<div class="col-xs-12" style="color: green;">Inscritos: '+arr[i].inscritos+' - Cupos Disponibles: '+(parseInt(arr[i].limite_cupos)-parseInt(arr[i].inscritos))+'</div>'+
                                    '<div class="col-xs-4 col-xs-offset-4"><img src="resources/cursos/verMas.png" style="width: 100%;"/></div>';
                    enCLick = 'irCurso('+arr[i].id+')';
                }
            }
            if(arr[i].fecha_inscripcion == null) arr[i].fecha_inscripcion = "NA";
            if(arr[i].fecha_inicio == null) arr[i].fecha_inicio = "NA";
            
            $(".lista").append(
            '<div class="row" onclick="'+enCLick+'" style="font-size: 12px;">'+
                '<div class="col-xs-12 col-sm-11 col-lg-6">'+
                    '<div class="[ panel panel-default ] panel-google-plus">'+
                        '<div class="panel-heading" style="background: #1e5da1;color: white;">'+
                            '<span class="glyphicon glyphicon glyphicon-book  c-info" data-toggle="tooltip" title="CuncejApp"></span>'+
                            '<span class="lbTitulo" style="font-size: inherit;"> '+arr[i].institucion+'</span><br/>'+
                        '</div>'+
                        '<div class="panel-body">'+
                            '<div class="row"><br>'+
                              '<div class="col-xs-4 col-md-4"><img src="resources/cursos/icoCursos.png" style="width: 100%;"></img></div>'+
                              '<div class="col-xs-8 col-md-8" style="color: grey;left: 10px;"><p style="margin-bottom: 0px;"><b>'+arr[i].titulo+'</b></p></div>'+
                              '<div class="col-xs-8 col-md-8" style="color: grey;left: 10px;"><p style="margin-bottom: 0px;">Limite de inscripción: '+arr[i].fecha_inscripcion+'. Fecha inicio: '+arr[i].fecha_inicio+' </p></div>'+
                            '</div>'+
                            '<div class="row">'+
                                htmlInscribirse+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>');
        }
    }
}

$("#AbrirSitio").click(function(){
    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
    var pageContentUrl = "http://aulavirtual.cundinamarca.gov.co/aulavirtual32/moodle/login/index.php";
    var obj = JSON.parse(localStorage.getItem("usuario"));  console.log(obj);
    if(isCordovaApp){
        if(!obj.hasOwnProperty("ev2036_pas")){
            localStorage.clear();var isCordovaApp = !!window.cordova; console.log(isCordovaApp);if(isCordovaApp){window.open('login.html');}else{window.open('login.html','_self');};return false;
        }
        if(obj.ev2036_usr != "" && obj.ev2036_pas != ""){
            var pageContent = '<html><head></head><body style="background: rgb(11, 60, 93);">'+
                '<h1 style="color:white">Ingresando a la ESCUELA VIRTUAL 2036...</h1>'+
                '<form style="display:none" class="m-t-1" action="'+pageContentUrl+'" method="post" id="login" autocomplete="off">'+
                '    <input id="anchor" type="hidden" name="anchor" value="">'+
                '    <script>document.getElementById(\'anchor\').value = location.hash;</script>'+
                '    <label for="username" class="sr-only">'+
                '            Nombre de usuario'+
                '    </label>'+
                '    <input type="text" name="username" id="username" class="form-control" value="'+obj.ev2036_usr+'" placeholder="Nombre de usuario">'+
                '    <label for="password" class="sr-only">Contraseña</label>'+
                '    <input type="password" name="password" id="password" value="'+obj.ev2036_pas+'" class="form-control" placeholder="Contraseña" autocomplete="off">'+
                '        <div class="rememberpass m-t-1" id="yui_3_17_2_1_1525883738416_33">'+
                '            <input type="checkbox" name="rememberusername" id="rememberusername" value="1" checked="checked">'+
                '            <label for="rememberusername">Recordar nombre de usuario</label>'+
                '       </div>'+
                '    <button type="submit" class="btn btn-primary btn-block m-t-1" id="loginbtn">Acceder</button>'+
                '</form>'+
                '<script type="text/javascript">document.getElementById("login").submit();</script></body></html>';
            pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);          
        }
        var ref = cordova.InAppBrowser.open(pageContentUrl, '_self', 'location=yes');
    }else{
        window.open(pageContentUrl);
    }
});

setTimeout(function(){
    /* Busca notificaciones */
    var parametros = new Object();  //parametros['app'] = 'cuncejapp';
    $.ajax({
        data:  parametros,
        url:'http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/GetCursos.php?tipo=cursoGob&tipo2=cursoESAP',
        type:  'post',
        async: false,       //timeout: 30000,
        success: function(responsef){ 
            var testObject = JSON.parse(responsef.replace(/&quot;/g,'"'));  console.log(testObject);
            localStorage.setItem('cr', JSON.stringify(testObject));
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function() {
        console.log("Busca Cursos");
        cargaCursos();
    });
}, 50);

});