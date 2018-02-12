var urlget='http://saga.cundinamarca.gov.co/apps/cuncejapp';

function indicativo(num){
	if(num.length<10){
		num='031'+num;
	}
	return num;
}


function modalData(id){
	$( "body" ).scrollTop(0);
	$.getJSON( urlget+"/servicios/GetIdGabinete.php", 
		  {
		  	id: id	    
		  },function( data ) {
			var value=data[1];
			var html_telefono='';
			if (value.telefono != null && value.telefono !== undefined) {
				if (value.telefono2 != null && value.telefono2 !== undefined) {
					html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted "> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> - <a href="tel:'+indicativo(value.telefono2)+'">'+value.telefono2+'</a> </span></h5>';
				}else{
					html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted"> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> </span></h5>';
				}	
			}else{
				html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted"> No registra </span></h5>';
			}
			var dialog = new BootstrapDialog({
		        message: function(dialogRef){
		                var $message = $(
						'<div>'+
							'<div >'+
							        '<div class="card hovercard">'+
							            '<div class="cardheader">'+
							            	
										'</div>'+
							            '<div class="avatar">'+
							                '<img alt="" src="'+urlget+'/fotos/gabinete/'+id+'.jpg">'+
							            '</div>'+
							            '<div class="info">'+
							                '<div class="title">'+
							                    '<a target="_blank" href="http://scripteden.com/">'+value.nombre+'</a>'+
							                '</div>'+
							                '<div class="profile-usermenu">'+
												'<ul class="nav">'+
													'<li>'+
														'<a >'+
														'<span class="glyphicon glyphicon-bookmark "></span><span> '+
														value.cargo+'</span>'+
														'</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
														html_telefono+ '</a>'+
													'</li>'+
													'<li>'+
														'<a >'+
														'<span class="glyphicon glyphicon-envelope "></span> '+
														value.correo+ '</a>'+
													'</li>'+
												'</ul>'+
											'</div>'+
											'<hr size="20" />'+
											'<div class="desc">'+value.detalle+ '</div>'+
							            '</div>'+					            
									'</div>'+
								
							'</div>');
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
		$.getJSON( urlget+"/servicios/GetGabinete.php", 
		  {
		  	cl: datoInput	    
		  },function( data ) {
			//console.log(data);
			$(".lista").empty();
			$.each(data, function( index, value ) {
				var html_telefono='';
				if (value.telefono != null && value.telefono !== undefined) {
					if (value.telefono2 != null && value.telefono2 !== undefined) {
						html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted "> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> - <a href="tel:'+indicativo(value.telefono2)+'">'+value.telefono2+'</a> </span></h5>';
					}else{
						html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted"> <a href="tel:'+indicativo(value.telefono)+'">'+value.telefono+'</a> </span></h5>';
					}	
				}else{
					html_telefono='<h5><span class="glyphicon glyphicon-earphone text-muted"> No registra </span></h5>';
				}
				$(".lista").append(
			    '<div class="row">'+
		        '<div class="[ col-xs-12 col-sm-offset-1 col-sm-12 ]">'+
		            '<div class="[ panel panel-default ] panel-google-plus">'+
		                '<div class="panel-heading ">'+
		                    '<div class="avatar"><img class="[ img-circle pull-left ]" src="'+urlget+'/fotos/gabinete/'+value.id+'.jpg" alt="Mouse0270" height="90"  /></div>'+
		                    '<h3>'+value.nombre+'</h3>'+
		                    '<h5><span class="glyphicon glyphicon-bookmark text-muted c-info"></span><span> '+value.cargo+'</span> </h5>'+
		                    '<button type="button"  onclick="modalData('+value.id+')" class="vermas pull-right btn btn-primary btn-xs"><span class="glyphicon glyphicon-share-alt "></span> VER MAS</button>'+
		                    //'<button type="button" class="btn btn-default btn-xs"> <span class="glyphicon glyphicon-info-sign"> Mas Informacion</span></button>'+
		                '</div>'+
		                '<div class="panel-body">'+
		                    html_telefono+
		                    '<h5><span class="glyphicon glyphicon-envelope text-muted "> <a href="mailto:'+value.correo+'"> '+value.correo+'</a></span></h5>'+
		                '</div>'+
		            '</div>'+
		        '</div>'+
		    '</div>');
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
	   }, 400 );
	});
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