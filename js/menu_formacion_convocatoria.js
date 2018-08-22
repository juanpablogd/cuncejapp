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
            var htmlItem = '';  console.log(arr[i]);
            var htmlInscribirse = '';
            var fInicio = moment(arr[i].fecha_inicio+" 23:59:59", 'YYYY-MM-DD HH:mm:ss').toDate();
            var fLimite = moment(arr[i].fecha_inscripcion+" 23:59:59", 'YYYY-MM-DD HH:mm:ss').toDate();
            var fActual = moment(); console.log(fLimite);   //console.log(fActual);
            var enCLick = "";
            if(fActual >= fLimite || fActual >= fInicio){
                htmlInscribirse = '<div class="col-xs-12" style="color: red;">Cerrado!! Inscritos: '+arr[i].inscritos+'</div><br>';
            }else{
                if(parseInt(arr[i].inscritos) >= parseInt(arr[i].limite_cupos) && parseInt(arr[i].limite_cupos) > 0){
                    htmlInscribirse = '<div class="col-xs-12" style="color: red;">Agotado!! Inscritos: '+arr[i].inscritos+'</div><br>';
                }else{
                    if(parseInt(arr[i].limite_cupos) > 0){
                        htmlInscribirse = '<div class="col-xs-12" style="color: green;">Inscritos: '+arr[i].inscritos+' - Cupos Disponibles: '+(parseInt(arr[i].limite_cupos)-parseInt(arr[i].inscritos))+'</div>';
                    }
                    htmlInscribirse = htmlInscribirse +
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
                            '<div class="col-xs-4 col-md-4"><img src="resources/CUNSEAPP-10.png" style="width: 100%;"></img></div>'+
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
    if(isCordovaApp){
        var ref = cordova.InAppBrowser.open('http://www.esap.edu.co/portal/index.php/concursos-y-convocatorias-2/inscripciones/', '_system', 'location=no');
    }else{
        window.open('http://www.esap.edu.co/portal/index.php/concursos-y-convocatorias-2/inscripciones/');
    }
});

setTimeout(function(){
    /* Busca notificaciones */
    var parametros = new Object();  //parametros['app'] = 'cuncejapp';
    $.ajax({
        data:  parametros,
        url:'http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/GetCursos.php?tipo=Convocatoria',
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