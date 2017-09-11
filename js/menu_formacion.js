window.onload = function() {

    function cargarIframe(){
        var obj = JSON.parse(localStorage.getItem("usuario")); //console.log(validator.showErrors(obj));
        $.each(obj, function( index, value ) {      //console.log(value + " " + index);
            if(index == "cedula"){
                $('#myIframe').attr('src', 'http://www5.cundinamarca.gov.co/cuncejapp/menu_formacion.php?cedula=' + value);
            }
        });
    }

    $("#loadIframe").click(function(){
        cargarIframe();
    });

    cargarIframe();

};