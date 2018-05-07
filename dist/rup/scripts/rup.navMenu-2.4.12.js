/*!
 * Copyright 2014 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

(function (jQuery) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var rup_navMenu = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	jQuery.extend(jQuery.rup.iniRup, jQuery.rup.rupSelectorObjectConstructor("rup_navMenu", rup_navMenu));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************


	jQuery.fn.rup_navMenu("extend",{
		//Función encargada de pasar a la siguiente página
		next: function() {
			jQuery(this).rcarousel('next');
		},
		//Función encargada de pasar a la anterior página
		prev: function() {
			jQuery(this).rcarousel('prev');
		},
		//Función encargada de ir a la página especificada
		goToPage: function(args) {
			jQuery(this).rcarousel('goToPage',args.position);
		},
		//Función que devuelve el número de páginas del menu
		getTotalPages:function(){
			return jQuery(this).rcarousel('getTotalPages');
		},
		//Función que devuelve el número de páginas actual
		getCurrentPage:function(){
			return jQuery(this).rcarousel('getCurrentPage');
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	jQuery.fn.rup_navMenu("extend",{
		//Funcion que marca las clases antes de convertirlas en pestañas
		_markTabs:function(pId){
			

			//marco las pestañas con una clase
			jQuery('#'+pId+'>li').each(function(){
				//if ($(this).attr('class')===""){
					$(this).addClass('itemTab');
				//}
			});
			
			jQuery('.itemTab').each(function(){
				$(this).addClass('ui-state-default ui-corner-top');
			});

			
			$('.itemTab').hover(function() {
			$(this).addClass("ui-tabs-active ui-state-active");
			}, function() {
			$(this).removeClass("ui-tabs-active ui-state-active");
			});
			
			
			jQuery('.itemTab a').each(function(  ){
				$(this).addClass('ui-tabs-anchor');
			});
			
		},
		//Función que añade un contenedor
		_createContainer:function(){

				var settings=this.data("settings");


				
				//añado un div que engloba todo el menu, hará de contenedor
				jQuery('#'+settings.id).wrapAll('<div id="contenedorMenuTab">');
				

		},

		//función que añade los botones de navegación
		_addNavButtons: function() {

			var settings=this.data("settings");
				

			//añado los botones de Next y previous
			jQuery('#contenedorMenuTab').prepend('<li class="ui-state-default ui-corner-top" id="prvButton"><a class="ui-tabs-anchor" href="#" id="ui-carousel-prev"><span><</span></a></li>');
			jQuery('#contenedorMenuTab').append('<li class="ui-state-default ui-corner-top" id="nxtButton"><a class="ui-tabs-anchor" href="#" id="ui-carousel-next"><span>></span></a></li>');
			
			
			//dejo invisible el botón previous hasta que pase de la primera página
			jQuery('#prvButton').hide();

			//bindings de los clicks
			jQuery("#ui-carousel-next").bind("click",function(){
				jQuery("#"+settings.id).rcarousel("next");
				var pagActual=jQuery('#'+settings.id).rcarousel("getCurrentPage");
				var pagTotal=jQuery('#'+settings.id).rcarousel("getTotalPages");
				//si estamos en la ultima página ocultamos el botón para que no pueda seguir cambiando hacia adelante
				if (pagActual===pagTotal){
					jQuery('#nxtButton').hide();
				}
				jQuery('#prvButton').show();
			});

			jQuery("#ui-carousel-prev").bind("click",function(){
				jQuery("#"+settings.id).rcarousel("prev");

				var pagActual=jQuery('#'+settings.id).rcarousel("getCurrentPage");
				var pagTotal=jQuery('#'+settings.id).rcarousel("getTotalPages");
				//si estamos en la ultima primera ocultamos el botón para que no pueda seguir cambiando hacia atras
				if (pagActual===1){
					jQuery('#prvButton').hide();
				}
					jQuery('#nxtButton').show();
			});

		},
		//Función que añade los estilos
		_addCSS:function(){
				var settings=this.data("settings");
				
				jQuery('#contenedorMenuTab').addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
				
				jQuery('#'+settings.id).css({"margin-left":"30px"});
			
		},
		//Funcion que calcula la pagina donde esta el item del menu
		_calculatePage:function(){
				var settings=this.data("settings");
				var itemSelected=settings.startAtItem;
				var page=0;
				var item=0;
				for (i=0;i<jQuery('.itemTab').length;i++){
						for (j=0;j<settings.step;j++){
							if (item==itemSelected){
								return page;
							}else{
								item=item++;
							}
						}
						page=page++;
				}
				return 0;
			}
	});

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	jQuery.fn.rup_navMenu("extend", {
		_init : function(args){
			if (args.length > 1) {
				jQuery.rup.errorGestor(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_global.initError") + jQuery(this).attr("id"));
			}
			else {
				//Se recogen y cruzan las paremetrizaciones del objeto
				var settings = jQuery.extend({}, jQuery.fn.rup_navMenu.defaults, args[0]);

				settings.id = jQuery(this).attr("id");




				//si navigation==true establezco que el paso de página es igual a los items visibles
				if (undefined!==settings.navigation){
						if (settings.navigation===true){
								settings.step=settings.visible;

						}
				}

				if (undefined!==settings.startAtItem){
						//: calcular la page donde está el item del menú
						settings.startAtPage=this._calculatePage();//;
				}

				//marco las pestañas con una clase
				this._markTabs(settings.id);
				
				//inicializo el objeto rcarousel
				jQuery('#'+settings.id).rcarousel({
						visible: 			settings.visible,
						step: 				settings.step,
						height: 			settings.height,
						speed: 				settings.speed,
						margin: 			settings.margin,
						width:				150,
						startAtPage: 		settings.startAtPage

				});


				//Se almacenan los settings en el data del objeto
				this.data("settings",settings);

				//crea un contenedor que engloba el menú
				this._createContainer();


			if (undefined!==settings.height){
				jQuery('#contenedorMenuTab').css('height',settings.height);
			}else{
				jQuery('#contenedorMenuTab').css('height',30);
			}
			if (undefined!==settings.width){
				jQuery('#contenedorMenuTab').css('width',settings.width);
			}else{
				jQuery('#contenedorMenuTab').css('width',700);
			}

				//si la option de navigation==true añade botones de navegación
				if (settings.navigation==true){
					this._addNavButtons();
				}

				//aplica estilos
				this._addCSS();


			}
		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	jQuery.fn.rup_navMenu.defaults = {
				visible: 			3,
				step: 				3,
				width: 				null,
				height: 			40,
				speed: 				500,
				margin: 			1,
				startAtPage: 		0

		};


})(jQuery);
