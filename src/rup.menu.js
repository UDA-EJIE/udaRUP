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
 //require(["jquery", "require-jqueryui"],function (jQuery, widgetMenu) {

 define(["jquery", "private-jqueryui-menu"], function(jQuery, widgetMenu){
(function ($, widgetMenu) {

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************

	var rup_menu = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_menu", rup_menu));

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	$.fn.rup_menu("extend",{
		disable : function (entryMenuId){
			var entryMenu = $("#"+entryMenuId);
			entryMenu.addClass("ui-state-disabled");
//			entryMenu.bind("click", function(event){event.preventDefault(); event.stopImmediatePropagation();});
		},
		enable : function (entryMenuId){
			var entryMenu = $("#"+entryMenuId);
			entryMenu.removeClass("ui-state-disabled");
//			entryMenu.unbind("click");
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.fn.rup_menu("extend",{
			_init : function(args){

				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError" + $(this).attr("id")));
				} else {
					if(this.length > 0){

						//Se recogen y cruzan las paremetrizaciones del objeto
						var settings = $.extend({}, $.fn.rup_menu.defaults, args[0]), self = this, selectorSelf = widgetMenu(this), menuId = self[0].id, json, json_i18n;

						//visualizacion de los menus
						//Se oculta la capa para que no aparezca deformada
						selectorSelf.removeClass("rup_invisible_menu");

						//Se determina el identificador de los literales y se cargan los mismos
						if (settings.i18nId === undefined){
							settings.i18nId = menuId;
						}

						json_i18n = $.rup.i18n.app[settings.i18nId];

						//Obtener estructura y literales
						if (settings.menu !== undefined){
							json = settings.menu;
						} else if (settings.json !== undefined){
							json = settings.json;
						}

						//Se extienden las funcionalidades del menú para ajustarlas a las necesidades de funcionamiento del rup_menu
						widgetMenu.widget( "ui.rupMenu", widgetMenu.ui.menu, $.rup.compatibility.menu );

						//En caso de ser necesario, se secra el objeto que compondra la estructura del menu
						if (json !== undefined){
							//Generar estructura de menu
							self._parseJSON(json, json_i18n, selectorSelf, settings.forceAbs);
							selectorSelf = widgetMenu("#"+self.attr('id'));
						}

						//Se trata el evento de selección para que se produzca una redirección de menú automática
						selectUserEvent = settings.select;
						settings.select = function(event, ui){
							if(selectUserEvent !== undefined && selectUserEvent !== null){
								if (typeof selectUserEvent === "function"){
									if(selectUserEvent(event, ui) === false){
										return false;
									}
								}
							}
							//Comportamiento por defecto del evento
							if (/^keydown/.test( event.originalEvent.type )){
								event.stopImmediatePropagation();

								redirectObject = $(ui.item.children());

								if(redirectObject.attr('target') !== '_blank' ){
									$(location).attr('href',redirectObject.attr('href'));
								} else {
									if($.rup.browser.isFF){
										var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
										var recentWindow = wm.getMostRecentWindow("navigator:browser");
										recentWindow.delayedOpenTab(redirectObject.attr('href'), null, null, null, null);
									} else if($.rup.browser.isChrome){
										chrome.tabs.create({ 'url': redirectObject.attr('href') });
									} else {
										window.open(redirectObject.attr('href'), '_blank');
									}
								}
							}

							return false;
						};

						//Enlaces externos (add icon)
						selectorSelf.find("a[target='_blank']").append("<span class='ui-icon ui-icon-extlink rup_external_link'></span>");

						//Se comienza a crear el menu segun el tipo
						if (settings.display === "horizontal"){

							//Se asocian los estilos específicos del menú horizontal
							selectorSelf.addClass("rup_menu_horizontal").addClass("ui-widget-header");
							selectorSelf.children().addClass("rup_menu_horizontal_children");
							selectorSelf.children().children("a").addClass("rup_menu_horizontal_children_entry");

							selectorSelf.rupMenu(settings);

							//Se borran las entradas separadoras. En el menu horizontal no tienen sentido.
							selectorSelf.children(".ui-menu-divider").remove();

							//Ajustes de estilos para la primera capa del menu horizontal
							selectorSelf.children(".ui-state-disabled").css({'margin-top': '0em', 'margin-bottom': '0em'});
							$("#"+menuId+" .rup_menu_horizontal_children .rup_menu_horizontal_children_entry .ui-icon-carat-1-e").removeClass("ui-icon-carat-1-e").addClass("ui-icon-carat-1-s").addClass("rup-menu_horizontalIcon");
							selectorSelf.children().children("a").css("font-weight", "bold");
							selectorSelf.children().each(function (position, object){
								var iconsWidth = 0;
								$(object).children(".rup_menu_horizontal_children_entry:has(span:not(.rup-menu_horizontalIcon))").each(function (position, object){
									if ($(object).find("span").size() === 1){
										iconsWidth = $(object).find("span").width();
									} else {
										iconsWidth = $(object).find("span:not(.rup-menu_horizontalIcon)").width()/2;
									}
								});
								$(object).css("width",$(object).width()+iconsWidth);
							});
							selectorSelf.children().children("a").css("font-weight", '');
							selectorSelf.children(":has(.rup_menu_horizontal_children_entry span:not(.rup-menu_horizontalIcon))").addClass("rup_menu_horizontal_childrenIcon");
							selectorSelf.find(".rup_menu_horizontal_children_entry span:not(.rup-menu_horizontalIcon)").addClass("rup_menu_horizontal_children_icon");
							selectorSelf.children(":has(.rup_menu_horizontal_children_entry span.rup-menu_horizontalIcon)").addClass("rup_menu_horizontal_childrenMenuIcon");
							selectorSelf.children(":has(.rup_menu_horizontal_children_entry span.rup_menu_horizontal_children_icon):has(span.rup-menu_horizontalIcon)").addClass("rup_menu_horizontal_children_double");
							selectorSelf.children(":last-child").addClass("rup_menu_horizontal_children_last");

							//Asignación de los menús desplegables de primer menú
							selectorSelf.children().children("a[aria-haspopup='true']").parent().attr('rupMenu_firsLevel', 'true');
							$("#"+menuId+" [rupmenu_firslevel='true'] [role='menu']").addClass("rup_menu_vertical_horizontal");
							if (settings.verticalWidth === undefined){
								$("#"+menuId+" [rupmenu_firslevel='true'] [role='menu']").css("white-space","nowrap");
							} else {
								$("#"+menuId+" [rupmenu_firslevel='true'] [role='menu']").css("width",settings.verticalWidth);
							}

							//Enlaces externos en primer nivel: editar estilos
							selectorSelf.find("a[target='_blank'] span.rup_menu_horizontal_children_icon").each(function (span_pos, span){
								//Cambiarlo en span con enlace externo (puede que haya otros span con iconos)
								if ($(span).is(".ui-icon-extlink")){
									$(span).addClass("ui-menu-icon").removeClass("rup_menu_horizontal_children_icon");
								}
							});

							//Si tiene enlace externo y otro enlace, se debe ampliar el LI y cambiar el margen del ext_link
							var twoIconsLI = selectorSelf.find("a[target='_blank'] span.rup_menu_horizontal_children_icon").parents("li");
							twoIconsLI.css("width", twoIconsLI.width()+16);
							twoIconsLI.find("span.ui-icon-extlink").css("margin-left","-1em");


						} else if (settings.display === "vertical"){

							//Se le especifica el tamaño del menu
							selectorSelf.addClass("rup_menu_vertical");
							if (settings.verticalWidth === undefined){
								selectorSelf.css("white-space","nowrap");
							} else {
								selectorSelf.css("width",settings.verticalWidth);
							}
							selectorSelf.children().addClass("rup_menu_vertical_children");

							//Se invoca a la generacion del menu
							selectorSelf.rupMenu(settings);

							//Se ajustan los tamaños de las sub-entradas del menú
							if (settings.verticalWidth !== undefined){
								$("#"+menuId+" .ui-menu .ui-menu-item").css('width', settings.verticalWidth);
							}

						} else {
							$.rup.errorGestor($.rup.i18n.base.rup_menu.displayMenuError);
						}

						//Ajuste margen iconos
						var icon = false;
						//Buscar ULs verticales
						$("ul.rup_menu_vertical, ul.rup_menu_vertical ul, ul.rup_menu_vertical_horizontal").each(function (ul_pos, ul){
							//Localizar SPANS
							$(ul).children("li").children("a").children("span").each(function (span_pos, span){
								//Comprobar que el SPAN tiene un icono propio
								if (!$(span).is(".ui-icon.ui-icon-extlink, .ui-icon.ui-icon-carat-1-e")){
									icon = true;
									return false;
								}
							});
							//Si tiene icono propio se aplica estilo a todos enlaces (margen)
							if (icon){
								$(ul).children("li").children("a").css("padding-left","2em");
							}
							//Restablecer variable
							icon = false;
						});

						//Ajuste de estilos para cubrir arista
						$("#"+menuId+" [role = 'menuitem']").not($("[aria-haspopup = 'true']")).css("text-decoration","underline");

						//Se deshabilitan los botones desconectados
						selectorSelf.find("a").bind("click", function(event){
							if($(event.currentTarget).hasClass("ui-state-disabled")){
								event.preventDefault();
								event.stopImmediatePropagation();
							}
						});

						//Se asocia un "tabIndex=-1" a todos los enlaces deshabilitados
//						selectorSelf.find(".ui-state-disabled").attr("tabindex","-1");
					}
				}
			},

			_parseJSON: function (json, json_i18n, self, force) {
				var submenu, element, objectUrl = "", entry;

				//Se transforma el objeto base del menu
				if(self.attr("uda-submenu") === 'true'){
					self.attr("uda-submenu",'');
				} else {
					self.replaceWith($('<ul>').attr('id', self.attr('id')).attr('style', self.attr('style')).attr('class', self.attr('class')));
					self = $("#"+self.attr('id'));
				}

				//Recorrer json para añadir elementos
				for (var i = json.length; i--; ) {
					element = json[i];
					entry = $('<a>');
					if (element!== undefined){
						if (element.divider !== null && element.divider !== true){
							if((element.pathUrl !== undefined) || (element.url !== undefined)){
								if (element.pathUrl !== undefined){
									if ((force === true)||(element.forceAbs === true)){
										objectUrl = $.rup_utils.relToAbsUrl(element.pathUrl);
									} else {
										objectUrl = element.pathUrl;
									}
								} else {
									objectUrl = $.rup.CTX_PATH+element.url;
								}


								if (element.newWindow !== true){
									if(element.icon !== undefined){
										self.prepend($('<li>').append(
											entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).attr('href', objectUrl).css('text-decoration', 'underline').append(
													$('<span>').addClass("ui-icon").addClass(element.icon)
											)
										));
									} else {
										self.prepend($('<li>').append(
											entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).attr('href', objectUrl).css('text-decoration', 'underline')
										));
									}
								} else {
									if(element.icon !== undefined){
										self.prepend($('<li>').append(
											entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).attr('href', objectUrl).attr('target',"_blank").css('text-decoration', 'underline').append(
													$('<span>').addClass("ui-icon").addClass(element.icon)
											)
										));
									} else {
										self.prepend($('<li>').append(
											entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).attr('href', objectUrl).attr('target',"_blank").css('text-decoration', 'underline')
										));
									}
								}

							} else {
								//Si no tiene enlace es submenu
								if(element.icon !== undefined){
									self.prepend($('<li>').append(
										entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).css('cursor','default').append($('<span>').addClass("ui-icon").addClass(element.icon))
									).append($('<ul>').attr("uda-submenu", "true")));
								} else {
									self.prepend($('<li>').append(
										entry.text($.rup.i18nParse(json_i18n,element.i18nCaption)).css('cursor','default')
									).append($('<ul>').attr("uda-submenu", "true")));
								}
								//Obtener el elemento que va a ser el submenu
								submenu = $("[uda-submenu = 'true']");
								//Llamada recursiva para añadir subelementos del submenu
								submenu.append(this._parseJSON(element.submenu, json_i18n, submenu));
								delete submenu;
							}

							if (element.disabled === true){
								entry.parent().addClass("ui-state-disabled");
							}
						} else {
							if (element.i18nCaption === undefined){
								self.prepend($('<li>').addClass("ui-widget-content ui-menu-divider"));
							} else {
								self.prepend($('<li>').append($('<strong>').text($.rup.i18nParse(json_i18n,element.i18nCaption))));
							}
						}
					}
					delete element;
				}
			}
		});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	$.fn.rup_menu.defaults = {
		verticalWidth: undefined,
		display: 'horizontal',
		forceAbs: false,
		i18nId: undefined,
		menus: 'ul'

	};


})(jQuery, widgetMenu);
});
