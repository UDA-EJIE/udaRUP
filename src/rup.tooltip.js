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
	
	var rup_tooltip = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_tooltip", rup_tooltip));
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_tooltip("extend",{
		open: function() {
			$(this).qtip('show', true);
		},
		close: function(){
			$(this).qtip('hide', true);
		},
		enable: function() {
			$(this).qtip('enable', true);
		},
		disable: function() {
			$(this).rup_tooltip('close');
			$(this).qtip('disable', true);
		},
		destroy: function() {
			$(this).rup_tooltip('disable');
			$(this).qtip('destroy');
		},
		option: function(option, value){
			return $(this).qtip('option', option, value);
		}
	});
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_tooltip("extend", {
			_init : function(args){
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					if ($(this).size()>0){//Evitar invocaciones sin objetos (grid)
						
						var settings = $.extend({}, $.fn.rup_tooltip.defaults, args[0]),
							isGrid = this[0].className.indexOf("rup-grid") !== -1, openUserEvent;
						
						//Identificador de la capa del tooltip
						if (settings.id === undefined){
							settings.id = $(this).attr('id');
						}
						
						if (isGrid){
							var elems = $(this)
									//Modificar atributo 'title' por 'rup_tooltip'
									.each(function(index, element) {
										$.attr(this, 'rup_tooltip', $.attr(this, 'title'));
										if (element.localName === 'img'){
											$(element).parents("td").attr("rup_tooltip", $(element).attr("rup_tooltip"));	
										}
									})
									//Eliminar atributo 'title'
									.removeAttr('title');
							
							settings = { 
								content : ' ', 
								position: {
									target: 'event',
									effect: false
								},
								show : { 
									delay: settings.show.delay
								},
								hide : { 
									delay: 0 //Para que funcione correctamente en las tablas
								},
								events: {
									show: function(event, api) {
										var target = $(event.originalEvent.target);
										if(target.length) {
											//Recorrer hasta encontrar atributo o ser columna
											while (target.attr('rup_tooltip') === undefined && target[0].nodeName !== "TD"){
												target = $(target).parent();
											}

											//Correción para datos vacíos
											api.set('content.text', (target.attr('rup_tooltip') === '')?' ':target.attr('rup_tooltip'));
											if (target.attr('rup_tooltip') === '' || target.attr('rup_tooltip') === ' '){
												target.qtip('destroy');
											}
											
											//Si es última columna que comience en la izquierda
												//Obtenemos la columna (puede que el target sea A, IMG, ...)
												if (target[0].nodeName !== "TD"){
													target = $(target).parents("td");
												}
												//Cambiamos posición tooltip
												if (target.nextAll("td:visible").length==0){
													api.set('position.my.x', 'right'); //Última columna
												} else {
													api.set('position.my.x', 'left'); //Otra columna
												}
												
											//Cambiamos el objetivo del tooltip (puede que el target sea A, IMG, ...)
											api.set('position.target',target);
										}
									},
									render: function(event, api) {
										if($.rup_utils.aplicatioInPortal()){
		                                    $("div.r01gContainer").append($(this));
		                                    if(!($("#qtip-overlay").size() === 0)){
		                                    	$("div.r01gContainer").append($("#qtip-overlay"));
		                                    }
										}
									}
								}
							};
							
							//Unificar en una capa el TOOLTIP
							$(this).qtip(settings);
						} else {
							var thisPortal;
							
							if(($.rup_utils.aplicatioInPortal()) && (!settings.applyToPortal)){
								thisPortal = $("div.r01gContainer "+ $(this).selector);
							} else {
								thisPortal = this;
							}
							
							if (settings.open !== undefined){
								settings.events.show = settings.open;
							}
							
							if (settings.close !== undefined){
								settings.events.hide = settings.close;
							}
							
							settings.events.render = function(event, api) {
								if($.rup_utils.aplicatioInPortal()){
                                    $("div.r01gContainer").append($(this));
                                    if(!($("#qtip-overlay").size() === 0)){
                                    	$("div.r01gContainer").append($("#qtip-overlay"));
                                    }
                                   // api.set('position.my.x', api.get('position.my.x'));
								}
							};
							
							$(thisPortal).qtip(settings);
							
							if (settings.disabled){
								$(thisPortal).qtip('disable');
							}
						}
					}
				}
			}
		});
		
	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//******************************************************
	$.fn.rup_tooltip.defaults = {
		disabled: false,
		applyToPortal: false,
		show:{
			delay:0
		},
		//tooltip
		position: {
			my: 'top left',
			at: 'bottom right',
			target: 'event',
			effect: false
		},
		events : {}
	};	
	
})(jQuery);