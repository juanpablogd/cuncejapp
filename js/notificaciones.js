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

};