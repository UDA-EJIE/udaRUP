/*!
 * Copyright 2013 E.J.I.E., S.A.
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
(function ($) {
	
	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************
	
//	$.contextMenu.types.cssSprite = function(item, opt, root) {
//		 
//		alert("ssss");
//		 
//	 };
//	
	var rup_contextMenu = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_contextMenu", rup_contextMenu));
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_contextMenu("extend",{
		show: function(position){
			$(this).contextMenu(position);
		},
		hide: function(){
			$(this).contextMenu("hide");
		},
		enable: function(){
			$(this).contextMenu(true);
		},
		disable: function(){
			$(this).contextMenu(false);
		},
		destroy: function(){
			$.contextMenu('destroy', this.selector);
		}
	});
	 
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_contextMenu("extend", {
			_init : function(args){
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					//Se recogen y cruzan las paremetrizaciones del objeto
					var $self = this, settings = $.extend({}, $.fn.rup_contextMenu.defaults, args[0]), background_image, background_position;
					
					//Asociar el selector
					settings.selector = $self.selector;
					
					//TODO:ejemplo de title en el contextMenu
					//Procesar items para i18n
					
					//Lanzar el plugin subyaciente
					jQuery.contextMenu(settings);
					
					/* Añadir el estilo para la modificación del estilo del puntero del ratón */
					$self.addClass("context-menu-cursor");
					if (jQuery.rup.browser.isIE){
						$self.css("cursor", settings.msieCursorCss);
					}
					
					
					/* Adecuar los cssSprites */
					$.each($(".context-menu-list.context-menu-root"), function(index, elem){
						var $elem = jQuery(elem);
					    if ($elem.data("contextMenuRoot").selector===settings.selector){
					    	$elem.attr("id", $elem.data("contextMenuRoot").ns.substring(1));
					    	$.each($(".context-menu-item"), function(index, item){
					    		var $item = jQuery(item),
					    		contextMenuKey = $item.data("contextMenuKey"),
					    		cssSprite, itemCfg;
					    		if (contextMenuKey !== undefined){
					    			itemCfg = settings.items[contextMenuKey];
					    			if (itemCfg!==undefined){
						    			cssSprite = itemCfg.cssSprite;
						    			if (cssSprite!==undefined && !$item.hasClass("rup-css-sprite")){
						    				$item.addClass("rup-css-sprite");
						    				$item.prepend($("<span>").addClass(cssSprite));
						    			}
						    			if (itemCfg.id!==undefined){
						    				$item.attr("id", itemCfg.id);
						    			}
					    			}
					    		}
					    	});
					    }
					});
				}
			}
		});
		
	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//******************************************************
	$.fn.rup_contextMenu.defaults = {
		autoHide: true,
		showCursor:true,
		msieCursorCss:"url("+$.rup.RUP+"/basic-theme/cursors/context-menu.cur),default"
	};	
	
})(jQuery);