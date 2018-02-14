window.onload = function() {
	$('#myIframe').attr('src', 'libs/pdf/web/detalleCurso.html');

	$('#btn_inscribirse').click(function () {
		var cedula = '';
		var id_curso = '';
		var obj = JSON.parse(localStorage.getItem("usuario"));
		$.each(obj, function( index, value ) {      console.log(value + " " + index);
	        if(index == "cedula"){
	            cedula = value;
	            id_curso = localStorage.getItem("tmp_curso");
	            //envia el dato para guardar el curso
				$.ajax({
				  url: "http://saga.cundinamarca.gov.co/apps/cuncejapp/servicios/setCurso.php",
				  data: {
				    cedula: cedula,
				    id_curso: id_curso
				  },
				  type: 'GET',
				  success: function( result ) {
					alert("Se ha inscrito con el codigo: " + result);
				  	window.open('menu_formacion.html');
				  },
	              error: function(result) {
	              	alert("No se realizó la Preincripción, revise la red por favor.");
	              }
				});
	        }
    	});
	});
};

