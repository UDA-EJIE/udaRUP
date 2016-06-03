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
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	
	var rup_accordion = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_accordion", rup_accordion));
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.fn.rup_accordion("extend",{
		destroy : function(){
			$(this).accordion("destroy");
		},
		disable : function(){
			$(this).accordion("disable");
		},
		enable : function(){
			$(this).accordion("enable");
		},
		option : function(opt, value){//Se establecen la propiedad o propiedades que reciben como parametro y se leen las que no vienen con una asignación.
			if (value !== undefined){
				$(this).accordion("option", opt, value);
			} else {
				$(this).accordion("option", opt);
			}
		},
		widget : function(){
			$(this).accordion("widget");
		},
		activate : function(index){
			$(this).accordion("activate",index);
		},
		resize : function(){
			$(this).accordion("resize");
		}
	});
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.fn.rup_accordion("extend", {
		_init : function(args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18n.base.rup_global.initError + $(this).attr("id"));
			}
			else {				
				var elements = this.children(), elementsNum = (elements.length)/2,
				settings = $.extend({}, $.fn.rup_accordion.defaults, args[0]);
				//Se recogen y cruzan las paremetrizaciones del objeto
				//Se tapa la creación del accordion para evitar visualizaciones inapropiadas
				//Se recomienda que el componente, inicialmente, sea invisible. Para ello se dispone del estilo rup_accordion
				this.removeClass("rup_accordion");
				
				
				
				//Se almacenan los settings en el data del objeto 
				this.data("settings",settings);
				
				//Se sobreescribe uno de los eventos para hacer reaparecer, una vez creado, el accordion
				createUserEvent = settings.create;
				settings.create = function (event, ui) {
					if (createUserEvent !== undefined) {
						if (createUserEvent(event, ui) === false) {
							return false;
						}
					}
					//Comportamiento por defecto del evento
					create_default(event, ui);
				};
				
				function create_default(event, ui){
					$(event.target).addClass("rup_accordion_create");
				}
				
				//Se comprueba la corrección del html con el que se creara el accordion
				if(settings.validation){
					if(parseInt(elementsNum) !== elementsNum){
						$.rup.errorGestor($.rup.i18n.base.rup_accordion.strucPairError);
						return false;
					} else {
						elements.each(function(index,object){
							if ((parseInt(index/2) === index/2) && ($(object).find("a").length === 0)){
								$.rup.errorGestor($.rup.i18n.base.rup_accordion.headFormatError);
								return false;
							} 
						});
					}
				}
				
				//Se invoca la creacion del accordion
				this.accordion(settings);
			}
		}
	});
	
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.fn.rup_accordion.defaults = {
		validation: true
	};
	
})(jQuery);