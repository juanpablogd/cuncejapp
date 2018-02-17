var urlget='http://saga.cundinamarca.gov.co/apps/cuncejapp';
var urlArchivos='http://saga.cundinamarca.gov.co/SIG/data/doc/cuncejapp/normatividad/';
//var urlget='.';
function modalData(id){
	$( "body" ).scrollTop(0);
	$.getJSON( urlget+"/servicios/GetIdNormatividad.php", 
		  {
		  	id: id	    
		  },function( data ) {
			var value=data[1];
			if (value.epigrafe != null && value.epigrafe !== undefined) {
					if (value.epigrafe.length>255)	
					value.epigrafe=value.epigrafe.substring(0, 500)+'...';
				}else{
					value.respuesta='<h5><span class="glyphicon glyphicon-earphone text-muted"> No registra </span></h5>';
				}
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
														'<span class="fa fa-gavel"></span><span> '+
														value.num+'</span>'+
														'</a>'+
													'</li>'+	
													'<li >'+ //'<a   download  class="pull-right" >Descargar Ley</a>'+
													'<button type="button" onclick="window.open(\''+urlArchivos+value.url+'\', \'_system\', \'location=no\');" class="btn btn-primary btn-sm pull-right">Descargar</button>'+
													'</li>'+													
												'</ul>'+
											'</div>'+
											'<hr size="20" />'+
											'<div class="desc alineacion">'+value.epigrafe+ '</div>'+
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
	$.getJSON( urlget+"/servicios/GetTipoNorma.php", function( data ) {
				$.each(data, function( index, value ) {
					$("#sel1").append(
					'<option value="'+value.tipo+'" >'+value.tipo+'</option>'
					);
					
				});
		});
	function busqueda(){
		$.getJSON(urlget+"/servicios/GetNormatividad.php", 
		  {cl: datoInput,
		  	tipo:$("#sel1").val()}
		  ,function( data ) {
		  	
		  	var longitud=Object.keys(data).length;
			$.getJSON( urlget+"/servicios/GetCuentaNorma.php" 
			,function( datosCuenta ) {	console.log(datosCuenta[1]);
				$(".lista").empty();
			 	if(longitud>99) $(".lista").append('<center><h6 class="text-muted c-info"> Mostrando '+longitud+' resultados de '+datosCuenta[1].cuenta+'.<h6><center>');
				else $(".lista").append('<center><h6 class="text-muted c-info"> '+longitud+' resultados de '+datosCuenta[1].cuenta+'.<h6><center>');
		  	
			$.each(data, function( index, value ) {
				if (value.epigrafe != null && value.epigrafe !== undefined) {
					if (value.epigrafe.length>255)	
					value.epigrafe=value.epigrafe.substring(0, 255)+'...';
				}else{
					value.respuesta='<h5><span class="glyphicon glyphicon-earphone text-muted"> No registra </span></h5>';
				}
				$(".lista").append(
				    '<div class="row">'+
			        '<div class="col-xs-12 col-sm-11 col-lg-6 bloque">'+
			            '<div class="[ panel panel-default ] panel-google-plus">'+
			                '<div class="panel-heading">'+
			                	'<span class="fa fa-gavel "></span> '+
			                	value.num+
			    			    
			                '</div>'+
			                '<div class="panel-body alineacion">'+
			                	'<p><span class="fa fa-pencil-square-o "></span> '+
			                	value.epigrafe+
			                	'</p><button type="button"  onclick="modalData('+value.id+')" class="pull-right btn btn-primary btn-xs"><span class="glyphicon glyphicon-share-alt "></span> VER MAS</button>'+
			                '</div>'+
			            '</div>'+
			        '</div>'+
			    '</div>')
			});
			if(longitud>100)
			$(".lista").append('<h6 class="text-muted c-info">Muestra  los primeros 100 resultados, por favor realice una busqueda más especifica.</h6>')
			});
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