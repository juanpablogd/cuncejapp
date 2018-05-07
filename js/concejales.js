var urlget='http://saga.cundinamarca.gov.co/apps/cuncejapp';

function indicativo(num){
	if(num.length<10){
		num='031'+num;
	}
	return num;
}


$(function () {
	var datoInput="";
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
	
	$.getJSON( urlget+"/servicios/GetMunicipio.php", function( data ) {
			$.each(data, function( index, value ) {
				$("#sel1").append(
				'<option value="'+value.municipio+'" >'+value.municipio+'</option>'
				);
				
			});
	});
	function busqueda(){
		$.getJSON( urlget+"/servicios/GetConcejales.php", 
		  {
		  	cl: datoInput,
		  	mun:$("#sel1").val()	    
		  },function( data ) {
			//console.log(data);
			$(".lista").empty();
			var longitud=Object.keys(data).length;
			console.log(longitud)
			if(longitud>99)
			$(".lista").append('<center><h6 class="text-muted c-info"> Más de '+longitud+' resultados.<h6><center>');
			else
			$(".lista").append('<center><h6 class="text-muted c-info"> '+longitud+' resultados .<h6><center>');
			$.each(data, function( index, value ) {
				var html_telefono='';
				if (value.telefono != null && value.telefono !== undefined) {
					if (value.telefono2 != null && value.telefono2 !== undefined) {
						html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted " style="margin-left: 12px;"> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> - <a href="tel:'+indicativo(value.telefono2)+'">'+value.telefono2+'</a></span></h5>';
					}else{
						html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted" style="margin-left: 12px;"> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> </span>&nbsp;<a href="whatsapp://send?text=Amigo concejal&phone=+57'+value.telefono+'&abid=+57'+value.telefono+'"><img border="0" alt="W3Schools" src="resources/sms_64x64.png" width="16" height="16"></a></h5>';
					}	
				}else{
					html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted" style="margin-left: 12px;"> No registra </span></h5>';
				}
				if (value.nombre != null && value.nombre !== undefined) {
					html_nombre='<h3>'+value.nombre+'</h3>';
				}else{
					html_nombre='<h3>Sin dato.</h3>';
				}
				
				$(".lista").append(
				    '<div class="row">'+
			        '<div class="[ col-sm-12 col-sm-offset-1 col-sm-12 ]">'+
			            '<div class="[ panel panel-default ] panel-google-plus">'+
			                '<div class="panel-heading">'+
			                    html_nombre+
			                    '<h5><span class="glyphicon glyphicon-map-marker text-muted c-info"></span><span>  '+value.mun+'</span> </h5>'+
	//		                    '<h5><span class="glyphicon glyphicon-bookmark text-muted c-info"></span><span>  '+value.cargo+'</span> </h5>'+
			                '</div>'+
			                '<div class="panel-body">'+
			                    html_telefono+
			                    '<h5><span class="glyphicon glyphicon-envelope text-muted " style="margin-left: 12px;"> <a href="mailto:'+value.correo+'"> '+value.correo+'</a></span></h5>'+
			                '</div>'+
			            '</div>'+
			        '</div>'+
			    '</div>');
			});
			if(longitud>99)
			$(".lista").append('<h6 class="text-muted c-info">Muestra  los primeros 50 resultados, por favor realice una busqueda más especifica.</h6>')
			
		}).fail(function() {
		   	$(".lista").empty();
		});
	}
	busqueda();
	$("#busqueda").keyup(function() {
    delay(function(){
	        var value =$("#busqueda").val();
		    if(datoInput!=value){
		    	datoInput=value;
		    	busqueda();
		    }
	   }, 300 );
	});
	$("#sel1").change(function(){
		busqueda();
	})
	
	$(window).scroll(function() {    
	    var scroll = $(window).scrollTop();
	    if (scroll > 100) {
	        $("#inicio").show(500);
	    } else {
	        $("#inicio").hide(500);
	    }
	});
	$("#inicio").hide();
	$("#inicio").click(function(){
		$( "body" ).scrollTop(0);
			
	});
	
});