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


<div id="registrate" class="content clearfix">    
    <div class="content_inner clearfix">          
        <div class="header">
            <h1><a href="#"><img src="<?php echo site_resource('')?>web/images/inner_logo.png" alt=""></a></h1>
        </div>
        <!-- contenido -->
        <div class="main_content">
			<h2>- D&eacute;janos tus datos -</h2>
			<div class="content_form clearfix">
				<form id="form_contact" class="form_contact"  method="post" name="form" action="<?php echo $site_url_actual."/guardar_registro/".@$user_data->intUserId; ?>">					
					<div class="box_row"><label for="txt_nombre">Mi nombre es:</label></div>
					<div class="box_row"><input type="text" id="txt_nombre" title="Ingrese su nombre" name="txt_nombre" class="required"></div>
					<div class="box_row"><label for="txt_baby">Mi beb&eacute; se llama:</label></div>
					<div class="box_row"><input type="text" id="txt_baby" name="txt_baby" title="Ingrese el nombre de su bebe" class="required"></div>
					<div class="box_row"><label for="txt_fecha">Fecha de nacimiento de mi beb&eacute; (dd-mm-aaaa):</label></div>
					<div class="box_row"><input type="text" id="txt_fecha" name="txt_fecha" title="Ingrese la fecha de nacimiento" class="required"></div>
					<div class="box_row no_margin"><label for="txt_correo">Mi correo es:</label></div>
					<div class="box_row no_margin"><input type="text" id="txt_correo" title="Ingrese su correo" name="txt_correo" class="email required"></div>
					<div class="box_row no_margin"><label for="txt_dni">Mi DNI es:</label></div>
					<div class="box_row no_margin"><input type="text" id="txt_dni" title="Ingrese dni" name="txt_dni" class="solo_numeros required" minlength="8" maxlength="8"></div>	
	
					<div id="bx_error" class="bx_error"></div>

					<div class="box_consultas">
						<button type="submit" name="submit" class="transition btn_submit">ENVIAR</button>			
					</div>					
				</form>
			</div>
		</div>	
    </div>
</div>

<script type="text/javascript">
	
	$(document).ready(function() {
	
			/*,
			invalidHandler: function(e, validator) {
		            var errors = validator.numberOfInvalids();        
		        if (errors) {
		            $("#bx_error").html("Todos los campos son requeridos");
		            $("#bx_error").show();
		        } else {
		            $("#bx_error").hide();		            
		        }
		    },
			remote: {
						url: "<?php echo $site_url_actual."/revisar_dni"; ?>",
						type: "post"
					}
			*/
			
		/*
		$('#form_contact').validate({
			rules: {
				txt_dni: {
					required: true
				}
			},messages:{
				txt_dni:{
					required: "Ingrese dni",
					minlength: "Ingrese 8 digitos",
					remote: "Dni ya registrado"
				}
			},submitHandler: function(form) {
			
				$('.btn_submit').hide();
				form.submit();
				return false;
			}
		});	
		*/
		
		$(".solo_numeros").keydown(function(event) {
			// Allow: backspace, delete, tab, escape, and enter
			if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
				// Allow: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
				// Allow: home, end, left, right
			(event.keyCode >= 35 && event.keyCode <= 39)) {
				// let it happen, don't do anything
				return;
			}
			else {
				// Ensure that it is a number and stop the keypress
				if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
					event.preventDefault();
				}  
			}
		});
	});
	
	

</script>