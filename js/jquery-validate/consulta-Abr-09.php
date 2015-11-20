
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*  ***************************************************************************	*/
/*	Datos de informacion de la seccion
/*	--------------------------------------------------------------------------	*/
		
    $params = array(    "title"             => '',
                        "description"       => '',     		
						"layout" 	  		=> '../../consultorio/templates/layout2.php',
						"routemodule" 		=> array( "module" 	=> 'pagina-1' ),
                        "metaTitle"         => '',
                        "metaDescription"   => '',
                        "image_src"         => ''
			  );
			  
	 //Agregamos los parametro
	  $this->template->set( $params );
	
/*	***************************************************************************	*/

function site_head(){?>


<?php }

 function site_footer(){ ?>
<!--Aqui va el js para la pagina actual-->


<?php } ?>
<?php

	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") {
			$base_url_actual = str_replace('http','https',base_url());
		}else{
			$base_url_actual = base_url();
	}
	
	if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == "on") {
		$site_url_actual = str_replace('http','https',site_url());
	}else{
		$site_url_actual = site_url();
}
?>

<div id="consultas" class="content clearfix">    
    <div class="content_inner clearfix">          
        <div class="header">
            <h1><a href="#"><img src="<?php echo site_resource('')?>web/images/inner_logo.png" alt=""></a></h1>
        </div>
        <!-- contenido -->
        <div class="main_content">
			<div class="inner_cont_frecuentes">
				<form action="<?php echo $site_url_actual."/guardar_consulta/".@$user_data->intUserId; ?>" method="post" id="txt_form">
					<h2>- HAZ TU CONSULTA -</h2>
					<h3>&iquest;Sobre qu&eacute; tema te gustar&iacute;a preguntar?</h3>
					<div class="box_cont_frecuentes clearfix">
						<div class="content_btn">
							<ul class="list_reset clearfix no_margin">
								<li><a href="#" data-id="bebe" class="transition btn_question btn_baby">Beb&eacute;</a></li>
								<li><a href="#" data-id="mama" class="transition btn_question btn_mama">Mam&aacute;</a></li>
								<li><a href="#" data-id="producto" class="transition btn_question no_margin btn_producto">Producto</a></li>
							</ul>
							<input type="hidden" value="" id="input_question" name="input_question" class="required">
							<input type="hidden" value="<?php echo @$user_data->intUserId; ?>" id="input_userid" name="input_userid" />
							<div id="txt_error_q"></div>
						</div>
					</div>
					<p>Escribe tu pregunta y recibe los mejores consejos de nuestra comunidad:</p>
					<div class="content_txt_question clearfix">							
						<textarea name="textArea" class="required" title="" id="textArea"></textarea>
						<div class="bx_btn_message float_left"><button type="submit" name="submit" class="opa transition btn_message">Enviar</button></div>
						<div id="txt_error"></div>					
						<a href="<?php echo $site_url_actual."/consultas-frecuentes"; ?>" class="regresar">Regresar</a>
					</div>
				</form>
			</div>
        </div>
    </div>
</div>
<style>

label.error {
	display: none !important;
}
</style>
<script type="text/javascript">
	
$(document).ready(function() {

	$('.btn_question').click(function(e) {
		var dataOption = $(this).attr('data-id');
		$('.btn_question').removeClass('active_btn');
		 $(this).addClass('active_btn');
		 $('#input_question').val(dataOption);	
		 $('#txt_error_q').html('');			
		e.preventDefault();
	});	

	$('.btn_message').click(function() {
		var dataInput = $('#input_question').val();		
		if ( dataInput == "" ) {
			$('#txt_error_q').html('Debes escoger un tema');			 
		} else {
			$('#txt_error_q').html('');			
		}		
	});

	$('#txt_form').validate({       
		invalidHandler: function(e, validator) {
	        var errors = validator.numberOfInvalids();        
	        if (errors) {

	            $("#txt_error").html("Debes escribir una pregunta");
	            $("#txt_error").show();
	        } else {
	            $("#txt_error").hide();		            
	        }
	    },
		submitHandler: function(form) {	
			var dataInput = $('#input_question').val();	

			if ( dataInput == "" ) {
				$('#txt_error_q').html('Debes escoger un tema');			 
			} else {
				$('#txt_error_q').html('');
				form.submit();			
			}			
		}
	});	
		
});	

</script>