
$(document).ready(function(){

function cargaChats(){
    // Retrieve the object from storage https://www.w3schools.com/bootstrap/bootstrap_list_groups.asp
    var retrievedObject = localStorage.getItem('ch');   //console.log(retrievedObject);
    if(retrievedObject != null) {
        var arr = JSON.parse(retrievedObject);  
        var registros = Object.keys(arr).length;    console.log(registros);
        $( ".lista" ).html('<br>');
        for (var i = 1; i < (registros+1); i++){    console.log(arr[i]);
            $(".lista").append(
            '<div class="row" style="font-size: 12px;">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                    '<div class="[ panel panel-default ] panel-google-plus">'+
                        '<div class="panel-heading" style="background: #1e5da1;color: white;">'+
                            '<span class="glyphicon glyphicon glyphicon-envelope  c-info" data-toggle="tooltip" title="CuncejApp"></span>'+
                            '<span class="lbTitulo" style="font-size: initial;"> '+arr[i].nombre+'</span>'+
                        '</div>'+
                        '<div class="panel-body">'+
                            '<div class="row"><br>'+
                                '<a href="'+arr[i].url+'">'+
                                    '<div class="col-xs-3 col-md-3"><img src="resources/sms_64x64.png" style="margin-top: 7px;width: 66px;height: 66px;"></img></div>'+
                                    '<div class="col-xs-9 col-md-9" style="color: grey;">'+arr[i].descripcion+'</div>'+
                                '</a>'+
                            '</div><br>'+
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
        url:'http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/GetChats.php',
        type:  'post',
        async: false,       //timeout: 30000,
        success: function(responsef){ 
            var testObject = JSON.parse(responsef.replace(/&quot;/g,'"'));  console.log(testObject);
            localStorage.setItem('ch', JSON.stringify(testObject));
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function() {
        console.log("Busca Chats");
        cargaChats();
    });
}, 50);

});