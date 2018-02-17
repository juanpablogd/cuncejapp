window.onload = function() {
	$('#myIframe').attr('src', 'libs/pdf/web/detalleCurso.html');

	$('#btn_inscribirse').click(function () {
		$("#cargando").show();
		$('#btn_inscribirse').hide();
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
					$("#cargando").hide();
					$('#btn_inscribirse').show();
				  	if($.isNumeric(result)){
				  		alerta("Se ha inscrito con el codigo: "+ result,function() {
		                    var isCordovaApp = !!window.cordova; console.log(isCordovaApp);
	                        if(isCordovaApp){
	                            window.open('menu_formacion.html');            
	                        }else{
	                            window.open('menu_formacion.html','_self');
	                        }
				  		},"CuncejApp","Ir");
					  }else{
					  	alerta("No se realizó la Preincripción, revise la red por favor."+ result,function() {},"CuncejApp","Ir");
					  }
				  },
	              error: function(result) {
					$("#cargando").hide();
					$('#btn_inscribirse').show();
	              	alerta("No se realizó la Preincripción, revise la red por favor."+ result,function() {},"CuncejApp","Ir");
	              }
				});
	        }
    	});
	});
};

