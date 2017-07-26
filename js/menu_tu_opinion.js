window.onload = function() {

    var obj = JSON.parse(localStorage.getItem("usuario")); //console.log(validator.showErrors(obj));
    $.each(obj, function( index, value ) {      console.log(value + " " + index);
        if(index == "cedula"){
            $('#myIframe').attr('src', 'http://www5.cundinamarca.gov.co/cuncejapp/menu_tu_opinion.php?id=' + value);
        }
    });

    //$('#myIframe').attr('src', 'http://www5.cundinamarca.gov.co/cuncejapp/menu_asesoria_enlinea.php?roll=' + rollNumber);
    /*                $.each(data[1], function( index, value ) {
                    console.log(value + " " + index);
                }); */

/*    var iframe = document.getElementsByTagName('iframe')[0];
    var win;
    // some browser (don't remember which one) throw exception when you try to access
    // contentWindow for the first time, it work when you do that second time
    try {
        win = iframe.contentWindow;
    } catch(e) {
        win = iframe.contentWindow;
    }
    var obj = {
       name: "Jack"
    };
    // save obj in subdomain localStorage
    win.postMessage(JSON.stringify({key: 'storage', method: "set", data: obj}), "*");
    window.onmessage = function(e) {
        if (e.origin != "http://www5.cundinamarca.gov.co") {
            return;
        }
        // this will log "Jack"
        console.log(JSON.parse(e.data).name);
    };
    // load previously saved data
    win.postMessage(JSON.stringify({key: 'storage', method: "get"}), "*"); */
};