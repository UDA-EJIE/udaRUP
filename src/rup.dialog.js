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


///* Evento del evento de antes de la carga de los datos */
//		var loadBeforeSendUserEvent = settings.loadBeforeSend;
//		settings.loadBeforeSend = function(xhr){
//			if(loadBeforeSendUserEvent !== null){
//		        if(loadBeforeSendUserEvent(xhr) === false){
//		            return false;
//		        }
//		    }
//			//console.log("loadBeforeSend");
//			//Comportamiento por defecto del evento
//			loadBeforeSend_default(xhr);
//		};

(function ($) {
	
	//*********************************************
	// ESPECIFICACÍON DE LOS TIPOS BASE DEL PATRÓN 
	//*********************************************
	
	$.extend($.rup, {
		dialog : {
			DIV : "dialogDIV", 
			TEXT : "textDialog", 
			AJAX : "ajaxDialog", 
			LINK : "linkButton"
		}
	});
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	
	var rup_dialog = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_dialog", rup_dialog));
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.fn.rup_dialog("extend",{
		open : function () {//abre el dialogo y estable el foco en el primer botón.
			var settings = $.extend({}, $(this).dialog("option")), $overlayEl;
			//Guardar el elemento que tenía el foco antes de abrir el diálogo
			$(this).data("focus",$(document.activeElement));

			var docHeight = $(document).height(), docWidth = $(document).width();
			
			if ($(this).dialog("option", "ajaxCache") === false){
				settings.id = $(this).attr('id');
				settings.autoOpen = true;
				this._ajaxLoad(settings);
			} else {
				$(this).dialog("open");				
			}			
			
			//Ajuste para portales
			if($.rup_utils.aplicatioInPortal()){
				if ($(this).data("dialog").overlay !== null){
					$overlayEl = $(this).data("dialog").overlay.$el;
					$(".r01gContainer").append($overlayEl);
					$overlayEl.css("height",docHeight).css("width",docWidth);
					
				}
				if (settings.position === undefined || settings.position === null){
					$(this).data("dialog").uiDialog.css("position","absolute").css("top",(docHeight/2)-($('div[aria-labelledby=ui-dialog-title-' + this[0].id + ']').height()/2));
				}
			}
			
			$('div[aria-labelledby=ui-dialog-title-' + this[0].id + '] .ui-dialog-buttonpane button:first').focus();
		},
		destroy : function (){
			$(this).dialog("destroy");
		},
		disable : function (){
			$(this).dialog( "disable" );
		},
		enable : function (){
			$(this).dialog( "enable" );
		},
		widget : function (){
			return ($(this).dialog( "widget" ));
		},
		moveToTop : function(){
			$(this).dialog( "moveToTop" );
		}, 
		close : function () {//Cierra el dialogo.
			$(this).dialog("close");
		},
		isOpen : function () {//Función que devuelve si el dialogo esta abierto.
			return $(this).dialog("isOpen");
		},
		getOption : function (opt) {//Obtiene la propiedad que recibe como parametro.
			return $(this).dialog("option", opt);
		},
		setOption : function (opt, value) {//Establece la propiedad que recibe como parametro.
			if (opt === "buttons") {//si establecemos los botones tenemos que tener encuenta lo de los links
				var btnsLength = value.length, aux, i, j, linkButtons = [], linkButtonsLength;//tamaño incial de los botones se o no enlaces
				if (btnsLength > 1) {//si tenemos mas de un boton buscamos cual es el link
					aux = value;
					for (i = 0; i < value.length;i++) {//se usa el length y no una variable porque se eliminan botones y el tamaño varia
						if (value[i].btnType === $.rup.dialog.LINK) {
							linkButtons.push(value.splice(i, 1));
							i--;
						}					
					}
					i = null;
				}
				linkButtonsLength = linkButtons.length;
				//Si tiene mas de dos botones y ninguno de ellos es de tipo link, entonces le mostrar una alerta diciendo que no cumple arista.
				if (btnsLength > 1 && linkButtonsLength === 0 /*&& settings.rupCheckStyle*/) {
					$.rup.msgAlert({message: $.rup.i18nParse ($.rup.i18n, "base.rup_global.rupCheckStyleError")});
					return false;
				}
				$(this).dialog("option", opt, value);
				if (linkButtonsLength > 0) { //si tenemos enlaces los añadimos
					for (j = 0; j < linkButtonsLength; j++) {
						this.createBtnLinks(linkButtons[j][0], this[0].id);
					}
					j = null;
				}
				return;
			}
			if(opt !== "title"){
				if (value !== undefined){
					$(this).dialog("option", opt, value);
				} else {
					$(this).dialog("option", opt);
				}
			} else {
				//A raíz de un bug del plug-in subyacente, el cambio del titulo se hace a mano (en caso de que se corrija el error esto sorbería y habría que borrarlo)
				$("#ui-dialog-title-"+$(this).attr("id")).html(value);
			}
		},	
		createBtnLinks : function (btn, id) {
			/**
			 * Función que crea los botones como enlaces y se los añade al panel de botones al final de los botones
			 */
			var buttonHREF = $("<a href='#'></a>")
			.attr("role", "button")
			.attr("id", "rup_dialog" + btn.text)
			.addClass("rup-enlaceCancelar")
			.html(btn.text)
			.click(btn.click);
			$('div[aria-labelledby=ui-dialog-title-' + id + '] .ui-dialog-buttonset ').append(buttonHREF); 
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************
	
	$.fn.rup_dialog("extend",{
			_init : function(args){
				
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError" + $(this).attr("id")));
				}
				else {		
					//Se recogen y cruzan las paremetrizaciones del objeto
					var settings = $.extend({}, $.fn.rup_dialog.defaults, args[0]), json_i18n, dialog = this, msgDiv, codeEventCreate = undefined;
					
					//Sobrecargar close para recuperar foco en elemento que ha lanzado el diálogo
					settings._close = settings.close;
					settings.close = function(event, ui) {
						if ($(this).data("focus")!==undefined){ $(this).data("focus").focus();}
						if (settings._close!==undefined){settings._close(event,ui);}
					};
					
					
					//Se verifica que el selector solo contenga un diálogo
					if(settings.type !== null && $(this).length > 0){
						
						$.each($(this), function(index, object) {

							if($(this).attr('id') !== undefined){
								settings.id = $(this).attr('id');
							} else {
								settings.id = "rup_"+settings.type+"DIV";
								msgDiv = $("<div/>").attr("id", settings.id);
								msgDiv.appendTo('body');
							}
							
							var autopen = false, linkButtons = [], btnsLength, aux, aClose, linkButtonsLength = 0, closeSpan, i, j, created = false, codeEventCreate = undefined;
							
							//Se determina la ubicación del dialogo físicamente (dentro de la pagina html). Por defecto se ubica en el body de la página pero puede determinarse una ubicación específica.
							//En caso de encontrarnos en portales (Ejie), y no determinar una ubicación específica, se ubica dentro de los rangos apropiados.
							if($('div[aria-labelledby=ui-dialog-title-' + settings.id + ']').length > 0){//comprobamos que no se haya ya creado el dialog sobre ese div para evitar problemas de sobreescritura de propiedades, como el tiulo...
								created = true;
							} else {
								if($("body #"+settings.id).not(".ui-dialog-content").length > 1){
									$($("body #"+settings.id).not(".ui-dialog-content")[1]).remove();
								}
								
								if(settings.specificLocation !== ""){
									codeEventCreate = function(event, ui){
										 $("#"+settings.id).parent(".ui-dialog").insertAfter($("#"+settings.specificLocation));
									};
								} else if ($.rup_utils.aplicatioInPortal()){ //Ajuste para portales
									codeEventCreate = function(event, ui){
										 $(".r01gContainer").append($(".ui-dialog"));
									};
								}
							}
							
							//Evento de create (respetando las opciones de los usuarios)
							if (codeEventCreate !== undefined){
								/* Gestion del evento create */
								var createUserEvent = settings.create;
								settings.create = function(event, ui){
									if(createUserEvent !== undefined && createUserEvent !== null ){
								        if(createUserEvent.call(event, ui) === false){
								            return false;
								        }
								    }
									//Comportamiento por defecto del evento
									codeEventCreate(event, ui);
								};
							}
													
							switch (settings.type) {
							case $.rup.dialog.DIV://si el dialog es de tipo DIV se utilizara el div creado por el desarrollador para crear el ui dialog
								if(settings.clone !== undefined){
									$('#'+settings.id).clone(true).attr("id",settings.clone).insertAfter('#'+settings.id );
									settings.id = settings.clone;
								}
								break;
							case $.rup.dialog.TEXT:
								$("#"+settings.id).html(settings.message);
								break;
							case $.rup.dialog.AJAX:
								dialog._ajaxLoad(settings);
								break;
							}
							
							//Para que no se abra hasta que terminemos con todas nuestra acciones
							if (settings.autoOpen === true) {
								autopen = true;
								settings.autoOpen = false;
							}

							//controlar que existan los botones
							if (settings.buttons && settings.buttons !== null) { 
								btnsLength = settings.buttons.length;//tamaño incial de los botones se o no enlaces
								if (btnsLength > 1) {//si tenemos mas de un boton buscamos cual es el link
									aux = settings.buttons;
									for (i = 0; i < settings.buttons.length;i++) {//se usa el length y no una variable porque se eliminan botones y el tamaño varia
										if (settings.buttons[i].btnType === $.rup.dialog.LINK) {
											linkButtons.push(settings.buttons.splice(i, 1));
											i--;
										}					
									}
									i = null;
								}
								linkButtonsLength = linkButtons.length;
								//Si tiene mas de dos botones y ninguno de ellos es de tipo link, entonces le mostrar una alerta diciendo que no cumple arista.
								if (btnsLength > 1 && linkButtonsLength === 0 && settings.rupCheckStyle) {
									$(document).rup().msgAlert({message: $.rup.i18nParse($.rup.i18n.base,"rup_global.rupCheckStyleError")});
									settings.stack = false;
									settings.modal = false;
									settings.zIndex = 9999;
								}
							}
							
							if (!created) { //si ha sido creado no hace falta volver a añadir el elnace de cierre
								$("#" + settings.id).dialog(settings);
								closeSpan = "<span id='closeText_" + settings.id + "' style='float:right;font-size:0.85em'>" + $.rup.i18nParse($.rup.i18n.base,"rup_global.cerrar") + "</span>";
								aClose = $("<a href='#'></a>")
								.attr("role", "button")
								.css("margin-right", "0.9em")
								.css("float", "right")
								.css("width", "50px")
								.addClass("ui-dialog-title")
								.html(closeSpan)
								.click(function (event) {
									$("#" + settings.id).dialog("close");
									return false;
								})
								.hover(function (eventObject) { //Evento lanzado para que se cambie el icono de la X a hover, marcado por ARISTA
									$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-titlebar-close').addClass("ui-state-hover");
									$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-titlebar-close').css("padding", "0px");
								},
								function (eventObject) {
									$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-titlebar-close').removeClass("ui-state-hover");
									$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-titlebar-close').attr("style", "");					
								})
								.insertAfter("#ui-dialog-title-" + settings.id);
								$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-titlebar-close').hover(
									function () { 
										aClose.css("text-decoration", "none");
									},
									function () {
										aClose.css("text-decoration", "");
									});
							} else { //borramos todos los posibles enlances que se hayan creado para esa capa
								$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-buttonset a').remove();
								
								if (settings.title){
									$("#ui-dialog-title-" + settings.id).text(settings.title);
								}
							}
							if (linkButtonsLength > 0) { //si tenemos enlaces los añadimos
								for (j = 0; j < linkButtonsLength; j++) {
									$(this).rup_dialog("createBtnLinks",linkButtons[j][0], settings.id);
								}
								j = null;
							}			
							if (autopen) { //si se auto abría lo mostramos
								if( settings.type !== $.rup.dialog.AJAX){
									$("#" + settings.id).rup_dialog("open");
									//le establecemos el foco
									$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-buttonpane button:first').focus();
								} else {
									settings.autoOpen = true;
								}
							}
						});
					} else {
						if ($(this).length === 0){
							$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.selectorError"));
						} else {
							$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.dialogTypeError"));
						}
					}
				}
			},
			_ajaxLoad : function(settings){
				//Si el tipo de dialogo es AJAX y no se establece url se muestra un error y se devuelve el control
				if (!settings.url || settings.url === null || settings.url === '') {
					$.rup.msgAlert({title: $.rup.i18nParse($.rup.i18n.base,"rup_global.error"), message: $.rup.i18nParse($.rup.i18n.base,"rup_dialog.noURL")});
					return false;
				}
				
				if (settings.showLoading && settings.autoOpen === true) { //si hay que mostrar la capa de cargando por defecto a false
					$.blockUI({
						message: '<img src="' + $.rup.RUP + '/basic-theme/images/rup.ajaxLoader.gif" style="position:absolute;top:12px;left:15px;" alt="' + $.rup.i18nParse($.rup.i18n.base,"rup_blockUI.cargando") + '" ><h1 class="loading">' + $.rup.i18nParse($.rup.i18n.base,"rup_blockUI.cargando") + '...' + '</h1>'
					});
				}
				
				//Especificación de las opciones asociadas a las llamada Ajax que carga el diálogo
				var ajaxOptions =  $.extend({},settings.ajaxOptions);
				ajaxOptions.success = function (data, textStatus, XMLHttpRequest){
						if (data !== '' || data !== null) {//si nos devuelve datos los mostramos como HTML y desbloqueamos el ui
							$("#"+settings.id).html(data);
							$.unblockUI();
							if(settings.autoOpen === true){
								$("#" + settings.id).rup_dialog("open");
								//le establecemos el foco
								$('div[aria-labelledby=ui-dialog-title-' + settings.id + '] .ui-dialog-buttonpane button:first').focus();
							}
						}
					if(settings.ajaxOptions && settings.ajaxOptions.success !== undefined && settings.ajaxOptions.success !== null && typeof settings.ajaxOptions.success === "function"){
						settings.ajaxOptions.success(data, textStatus, XMLHttpRequest);
					}
				};
				ajaxOptions.error = function (XMLHttpRequest, textStatus, errorThrown) { //en caso de error mostramos un mensaje de alerta
						$.unblockUI();
						$(document).rup().msgAlert({message: $.rup.i18nParse($.rup.i18n.base,"rup_dialog.errorLoadingData")});
					
					if(settings.ajaxOptions.error !== undefined && settings.ajaxOptions.error !== null && typeof settings.ajaxOptions.error === "function"){
						settings.ajaxOptions.error(XMLHttpRequest, textStatus, errorThrown);
					}
				};
				ajaxOptions.url = $.rup_utils.setNoPortalParam(settings.url);
				ajaxOptions.type= 'GET';
				ajaxOptions.cache= false;
				ajaxOptions.dataType= 'text'; 
				//Peticion ajax para obtener los datos a mostrar
				$.rup_ajax(ajaxOptions);
			}
		});
		
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.fn.rup_dialog.defaults = {
		rupCheckStyle: true,
		type: null,
		url: null,
		minHeight: 100,
		ajaxCache: true,
		specificLocation: "",
		clone: undefined
	};		
	

})(jQuery);