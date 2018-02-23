function irCurso(id){
    localStorage.setItem("tmp_curso", id);
    console.log(id);
    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
    if(isCordovaApp){
        window.open('menu_formacion_detalle.html');            
    }else{
        window.open('menu_formacion_detalle.html','_self');
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
            
            $(".lista").append(
            '<div class="row">'+
                '<div class="col-xs-12 col-sm-11 col-lg-6">'+
                    '<div class="[ panel panel-default ] panel-google-plus">'+
                        '<div class="panel-heading">'+
                            '<span class="glyphicon glyphicon glyphicon-book  c-info" data-toggle="tooltip" title="CuncejApp"></span>'+
                            '<span class="lbTitulo" style="font-size: inherit;"> '+arr[i].institucion+'</span><br/>'+
                        '</div>'+
                        '<div class="panel-body" style="background-color: #053d59;" onclick="irCurso('+arr[i].id+')">'+
                            '<div class="row"><br>'+
                              '<div class="col-xs-8 col-md-8" style="color: white;left: 10px;"><p style="margin-bottom: 0px;">'+arr[i].titulo+'</p></div>'+
                              '<div class="col-xs-4 col-md-4"><img src="resources/cursos/cursoFecha.png" style="width: 100%;"><div class="center" style="position: absolute;top: 32%;left: 20%;color: lightgoldenrodyellow;">'+arr[i].fecha_inicio+'</div></img></div>'+
                            '</div>'+
                            '<div class="row">'+
                                '<div class="col-xs-4 col-xs-offset-4"><img src="resources/cursos/verMas.png" style="width: 100%;"/></div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>');
            
        }
    }
}

setTimeout(function(){
    /* Busca notificaciones */
    var parametros = new Object();  //parametros['app'] = 'cuncejapp';
    $.ajax({
        data:  parametros,
        url:'http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/GetCursos.php?tipo=cursoESAP',
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