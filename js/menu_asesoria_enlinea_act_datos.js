window.onload = function() {

    var obj = JSON.parse(localStorage.getItem("usuario")); //console.log(validator.showErrors(obj));
    $.each(obj, function( index, value ) {      console.log(value + " " + index);
        if(index == "cedula"){
            $('#myIframe').attr('src', 'http://www5.cundinamarca.gov.co/cuncejapp/menu_asesoria_enlinea_act_datos.php?busca=' + value);
        }
    });
};