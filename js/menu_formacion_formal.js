function irCurso(id){
    localStorage.setItem("tmp_curso", id);
    console.log(id);
    setTimeout(function(){
/*        window.open(
          'menu_formacion_detalle.html'
        );  */ 
    }, 50);
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
                '<div class="[ col-xs-12 col-sm-offset-1 col-sm-12 ]">'+
                    '<div class="[ panel panel-default ] panel-google-plus">'+
                        '<div class="panel-heading">'+
                            '<span class="glyphicon glyphicon glyphicon-book  c-info" data-toggle="tooltip" title="CuncejApp"></span>'+
                            '<span class="lbTitulo" style="font-size: inherit;"> '+arr[i].titulo+'</span><br/>'+
                        '</div>'+
                        '<div class="panel-body">'+
                            '<span class="visible-xs" style="font-size: 11px;"> <span class="glyphicon glyphicon glyphicon-time  " data-toggle="tooltip" title="CuncejApp"></span>&nbsp;<span class="">Inicio: '+arr[i].fecha_inicio+'</span><br/></span>'+
                            '<span class="visible-xs" style="font-size: 11px;"> <span class="glyphicon glyphicon glyphicon-blackboard  " data-toggle="tooltip" title="CuncejApp"></span>&nbsp;  <span class="">Modalidad: '+arr[i].modalidad+'</span><br/></span>'+
                            '<span class="visible-xs" style="font-size: 11px;"><span class="glyphicon glyphicon glyphicon-home " data-toggle="tooltip" title="CuncejApp"></span>&nbsp;<span class="">'+arr[i].institucion+'</span><br/></span>'+
                            '<center><button type="button" class="btn btn-primary btn-sm " onclick="irCurso('+arr[i].id+')"  ><span class="glyphicon glyphicon-share-alt "></span> Ver Más</button><center>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>')
        }
    }
}

setTimeout(function(){
    /* Busca notificaciones */
    var parametros = new Object();  //parametros['app'] = 'cuncejapp';
    $.ajax({
        data:  parametros,
        url:'http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/GetCursos.php?tipo=Formal',
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