var urlget='http://saga.cundinamarca.gov.co/apps/cuncejapp';

function modalData(id){
	$( "body" ).scrollTop(0);
	$.getJSON( urlget+"/servicios/GetIdPregunta.php", 
		  {
		  	id: id	    
		  },function( data ) {
			var value=data[1];
			
			var dialog = new BootstrapDialog({
		        message: function(dialogRef){
		                var $message = $(
						'<div>'+
							'<div >'+
							        '<div class="card hovercard">'+
							            '<div class="info">'+
							                '<div class="profile-usermenu">'+
												'<ul class="nav">'+
													'<li class="alineacion">'+
														'<a >'+
														'<span class="glyphicon glyphicon-question-sign "></span><span> '+
														value.pregunta+'</span>'+
														'</a>'+
													'</li>'+													
												'</ul>'+
											'</div>'+
											'<hr size="20" />'+
											'<div class="desc alineacion">'+value.respuesta+ '</div>'+
							            '</div>'+					            
									'</div>'+
								
							'</div><br>');
		                var $button = $('<button class="btn btn-primary  btn-block">Cerrar</button>');
		                $button.on('click', {dialogRef: dialogRef}, function(event){
		                    event.data.dialogRef.close();
		                });
		                $message.append($button);
		        
		                return $message;
		         }, 
		        closable: false
		     });
		     dialog.realize();
		     dialog.getModalHeader().hide();
		      dialog.open();
		});
	 //BootstrapDialog.alert(id);
	 	
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
	
	function busqueda(){
		$.getJSON( urlget+"/servicios/GetPregunta.php", 
		  {cl: datoInput}
		  ,function( data ) {
			$(".lista").empty();
		  	var longitud=Object.keys(data).length;
			if(longitud>49) $(".lista").append('<center><h6 class="text-muted c-info"> Más de '+longitud+' resultados.<h6><center>');
			else $(".lista").append('<center><h6 class="text-muted c-info"> '+longitud+' resultados .<h6><center>');
			$.each(data, function( index, value ) {
				if (value.respuesta != null && value.respuesta !== undefined) {
					if (value.respuesta.length>255)	
					value.respuesta=value.respuesta.substring(0, 255)+'...';
				}else{
					value.respuesta='<h5><span class="glyphicon glyphicon-earphone text-muted"> No registra </span></h5>';
				}
				$(".lista").append(
				    '<div class="row">'+
			        '<div class="col-xs-12 col-sm-11 col-lg-6 bloque">'+
			            '<div class="[ panel panel-default ] panel-google-plus">'+
			                '<div class="panel-heading" style="color:#5c90d2">'+
			                	'<span class="glyphicon glyphicon-question-sign "></span> '+
			                	value.pregunta+
			    			    
			                '</div>'+
			                '<div class="panel-body alineacion">'+
			                	'<p>'+
//			                	'<span class="glyphicon glyphicon-info-sign "></span> '+
			                	value.respuesta+
			                	'</p><button type="button"  onclick="modalData('+value.id+')" class=" pull-right btn btn-primary btn-xs"><span class="glyphicon glyphicon-share-alt "></span> VER MAS</button>'+
			                '</div>'+
			            '</div>'+
			        '</div>'+
			    '</div>')
			});
			if(data.length>49)
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