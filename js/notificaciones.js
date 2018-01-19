window.onload = function() {

function cargaNoti(){
    var ahora = moment().locale('es');          //console.log(ahora);
    var manana = moment().add(1, 'days');       //console.log(ayer);
    var ayer = moment().subtract(1, 'days');    //console.log(manana);

    // Retrieve the object from storage https://www.w3schools.com/bootstrap/bootstrap_list_groups.asp
    var retrievedObject = localStorage.getItem('nt');   console.log(retrievedObject);
    if(retrievedObject != null) {
        var arr = JSON.parse(retrievedObject);
        console.log('retrievedObject: ', arr);
        $( "#listNoti" ).html('');
        for (var i = 0; i < arr.length; i++){
            var clactivo = '';
            var htmlNoti = '';
            var fecNoti = moment(arr[i].fecha_hora);    console.log(fecNoti);
            if(fecNoti >= ayer && fecNoti <= manana){
                console.log(fecNoti.format('YYYY-MM-DD HH:mm:ss'));
                clactivo = "list-group-item-info";
            }
            htmlNoti = '<a href="'+arr[i].data.enlace+'.html" class="list-group-item '+clactivo+'">'+
                        '<div class="col-xs-12 col-sm-12">'+
                            '<span class="glyphicon glyphicon glyphicon-bullhorn  c-info" data-toggle="tooltip" title="CuncejApp"></span>'+
                            '<span class="lbTitulo">'+arr[i].titulo+'</span><br/>'+
                            '<span class="visible-xs"><span class="glyphicon glyphicon glyphicon-text-width  c-info" data-toggle="tooltip" title="CuncejApp"></span>&nbsp;<span class="">'+arr[i].cuerpo+'</span><br/></span>'+
                            '<span class="visible-xs"> <span class="glyphicon glyphicon glyphicon-time  c-info" data-toggle="tooltip" title="CuncejApp"></span>&nbsp;<span class="">'+fecNoti.format('YYYY-MM-DD HH:mm:ss')+'</span><br/></span>'+
                        '</div>'+
                        '<div class="clearfix"></div>'+
                    '</a>';

            $( "#listNoti" ).append(htmlNoti);
        }
    }
}

cargaNoti();

setTimeout(function(){
    /* Busca notificaciones */
    var parametros = new Object();
    parametros['app'] = 'cuncejapp';
    $.ajax({
        data:  parametros,
        url:'http://saga.cundinamarca.gov.co/SIG/servicios/apps/notificaciones.php',
        type:  'post',
        async: false,       //timeout: 30000,
        success: function(responsef){ 
            var testObject = JSON.parse(responsef.replace(/&quot;/g,'"'));  console.log(testObject);
            localStorage.setItem('nt', JSON.stringify(testObject));
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function() {
        console.log("Busca Notificaciones");
        cargaNoti();
    });
}, 50);

};