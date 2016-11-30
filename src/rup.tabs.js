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

 (function( factory ) {
  if ( typeof define === "function" && define.amd ) {

 		// AMD. Register as an anonymous module.
 		define( ["jquery","./templates","jquery.scrollTo","./rup.base"], factory );
  } else {

 		// Browser globals
 		factory( jQuery, Rup);
  }
} ( function( jQuery, Rup) {


	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************

	var rup_tabs = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_tabs", rup_tabs));

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	$.fn.rup_tabs("extend",{
		//Funcion encargada de deshabilitar una o un conjunto de pestanyas
		disableTabs : function(args){
			if (typeof args.position === "number") {
				$('#' + args.idTab).tabs('disable', args.position);
			} else if(typeof args.position === "object"){
				for (var i in args.position){
					$('#' + args.idTab).tabs('disable',args.position[i]);
				};
			} else if(typeof args.position === "undefined"){
				//deshabilitacion de toda la pestanya del nivel (de momento no se aplica por errores en el plug-in subyacente).
				$('#' + args.idTab).tabs('disable');
			}
		},
		//Funcion encargada de habilitar una o un conjunto de pestanyas
		enableTabs : function(args){
			if (typeof args.position === "number") {
				$('#' + args.idTab).tabs('enable', args.position);
			} else if(typeof args.position === "object"){
				for (var i in args.position){
					$('#' + args.idTab).tabs('enable',args.position[i]);
				};
			} else if(typeof args.position === "undefined"){
				//deshabilitacion de toda la pestanya del nivel (de momento no se aplica por errores en el plug-in subyacente).
				$('#' + args.idTab).tabs('enable');
			}
		},
		//Funcion que fuerza la recarga de una pestanya
		//Si se le especifica una nueva url, ademas de recargar la pagina con la nueva url, se inserta esta como nueva url de la pestanya
		loadTab : function(args){
			$("#"+args.idTab).tabs("load",args.position);
		},
		//Funcion encargada de actualizar la url de invocacion de una pestanya determinada
		changeUrlTab : function(args){
			$("#"+args.idTab).tabs("url",args.position,$.rup_utils.setNoPortalParam(args.url));
		},
		//Funcion encargada de actualizar el layer de una pestanya determinada
		changeLayerTab : function(args){
			this._includeLayer($("#"+args.idTab+" ul:first-child"), args.layer, $($("#"+args.idTab+" ul li a").get(args.position)));
		},
		//Funcion encargada de seleccionar una pestanya determinada. El comportamiento es identico al click con el raton del mismo
		selectTab : function(args){
			$("#"+args.idTab).tabs("select",args.position);
		},
		//Funcion encargada de añadir una nueva pestanya cuando el componente ya esta creado
		addTab : function(args){
			var newTab, auxTabName, nameLiteral= "rup-tabs-", insertIndex = 0, label, title="";

			//limitacion de numero de pestañas abiertas
			if (args.maxNumberTabs!== undefined){
				var numPestanas= $('#'+args.idTab+' li').size();
				//si sobrepasamos numero de pestañas lanzamos limitTabs
				if (numPestanas+1>args.maxNumberTabs){
					$('#'+args.idTab).trigger('limitTabs');
					return false;
				}
			}
			// para acortar a n caracteres el literalal de la pestana

			if (args.lengthLiteral!==undefined){
				title = args.label;
				if (args.label.length>args.lengthLiteral){
					args.label = args.label.substr(0,args.lengthLiteral).concat("...");
				}
			}

			if (args.tabs !== undefined){
				if ((args.idNewTab !== undefined) && ($("#"+args.idNewTab).length === 0)){
					newTab = $('<div>').attr('id', args.idNewTab);
					newTab.appendTo('body');
					auxTabName = this._includeLayer($("#"+args.idTab+" > ul:first-child"), "#"+args.idNewTab, null);
					newTab.rup_tabs(args);
					$("#"+args.idTab).tabs("add","#"+args.idNewTab,args.label,args.position);
					$(auxTabName).remove();
				} else {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.parameterError"));
					return false;
				}
			}else if(args.layer!==undefined){

				//LAYER => Recoge una capa ya cargada de la Jsp
				args.layer = this._includeLayer($("#"+args.idTab+" > ul:first-child"), args.layer, null);

				$("#"+args.idTab).tabs("add",args.layer,args.label,args.position);

				$.each($("#"+args.idTab+" div[id*='"+nameLiteral+"']"), function(index, object) {
					if(insertIndex < parseFloat(object.id.split(nameLiteral)[1])){
						insertIndex = object.id.split(nameLiteral)[1];
					}
				});
				//$("#"+args.idTab+" div[id='rup-tabs-"+insertIndex+"']").addClass("ui-tabs-hide");

			} else {
				$("#"+args.idTab).tabs("add",$.rup_utils.setNoPortalParam(args.url),args.label,args.position);

				$.each($("#"+args.idTab+" div[id*='"+nameLiteral+"']"), function(index, object) {
					if(insertIndex < parseFloat(object.id.split(nameLiteral)[1])){
						insertIndex = object.id.split(nameLiteral)[1];
					}
				});

				$("#"+args.idTab+" div[id='rup-tabs-"+insertIndex+"']").addClass("ui-tabs-hide");
				//altura fija
				if(undefined !== args.fixedHeight){
					$("#"+args.idTab+" div[id='rup-tabs-"+insertIndex+"']").css('height', args.fixedHeight);
				}

			}

			$("#"+args.idTab+" ul:first li:nth-child("+(args.position+1)+") a").attr("title", title).rup_tooltip({});


			if (args.tabsAtBottom){
				loadLi =$("#"+args.idTab+" ul li:last").not(".rup-tabs_loading");
				loadLi.removeClass("ui-corner-top").addClass("ui-corner-botttom");
			}

			loadSpan = $("#"+args.idTab+" ul li a span:last").not(".rup-tabs_loading");
			if (args.close===true){
				loadSpan.parent().append ($('<div>').addClass('rup-tabs_title').text($.rup.i18nParse($.rup.i18n.app[$(this).attr("id")],args.label)))
				.append($('<span>').addClass('rup-tabs_loading'))
				.append('<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>');


				//evento close
				$("span.ui-icon-close").on( "click", function() {

					var tabContentId = $(this).parent().attr("href");
			        $(this).parent().parent().remove(); //remove li of tab
			        $(tabContentId).remove(); //remove respective tab content

					 tabs.tabs( "refresh" );
					 });


				//efecto hover del boton cerrar
				$("span.ui-icon-close").addClass('rup-tabs-close');
				$("span.ui-icon-close").on({
					mouseenter: function () {
						$(this).addClass('rup-tabs-close-hover');
					},

					mouseleave: function () {
						$(this).removeClass('rup-tabs-close-hover');
					}
				});

			}else{
				loadSpan.parent().append ($('<div>').addClass('rup-tabs_title').text($.rup.i18nParse($.rup.i18n.app[$(this).attr("id")],args.label)))
				.append ($('<span>').addClass('rup-tabs_loading'));
			}



			loadSpan.remove();


		},
		//Funcion encargada de añadir una nueva pestanya cuando el componnete ya esta creado
		removeTab : function(args){
			$("#"+args.idTab).tabs("remove",args.position);
		},
		selected : 0
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.fn.rup_tabs("extend",{
			_init : function(args){

				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				}
				else {
					//Se recogen y cruzan las paremetrizaciones del objeto
					var settings = $.extend({}, $.fn.rup_tabs.defaults, args[0]), json_i18n;

					settings.id = $(this).attr("id");
					settings.iniLoad = false;

					//Establecemos el ancho general de las pestañas en caso de venir informado
					if(undefined !== settings.width){
						$('#' + settings.id).css("width", settings.width).addClass("rup-tabs_overflow");
					}
					//Establecemos la altura general de las pestañas en caso de venir informada
					if(undefined !== settings.height){
						$('#' + settings.id).css("height", settings.height).addClass("rup-tabs_overflow");
					}

					var structure = settings.tabs, profun = 0;

					while (structure !== undefined) {
						profun = profun + 1;
						structure = structure[0].tabs;
					}

					settings.profun = profun;
					//Generar estructura
					this._parseJSON(settings.tabs, $.rup.i18n.app[settings.id], $('#' + settings.id), "", 1, settings);

					//Una vez creadas todas las pestanyas, se permite la carga normal de las mismas
					settings.iniLoad = true;

					//Convertir en pestanyas
					this._tabify($('#' + settings.id), settings);

					//altura
					if(undefined !== settings.fixedHeight){
						$('#' + settings.id+">.ui-tabs-panel").css('height', settings.fixedHeight);
					}


					//Añadir evento de conversión a pestanyas en los enlaces
					//$('#'+settings.id).find("a[rupLevel]").click ({disabled: settings.disabled}, tabClick);

					//evento limite de numero de pestañas
					$('#'+settings.id).on('limitTabs',function() {
						alert("limite de pestañas alcanzado");
					});

					//Deshabilitar las pestanyas indicadas
					if (settings.disabled !== undefined) {
						for (var i in settings.disabled) {
							$("#" + settings.id).rup_tabs("disableTabs", {
								idTab: i,
								position: settings.disabled[i]
							});
						};
					}
				}
			},
			//Funcion encargada de crear los distintos tab's
			_tabify : function (div, settings) {

				//Se especifica el estilo asociado a la pestanya contenedora de pestanyas
				div.addClass("rup-tabs_container");

				//Se cargan los Setting de cada objeto en su campo "data" correspondiente
				div.data("settings",settings);

				//Se especifica el control del evento "select" por parte del patron
				var select = function(event, ui){

					//Se gestiona la primera carga de la primera pestanya de cada tab
					if ($(ui.panel).data("cargado") !== undefined && $(ui.panel).data("cargado") === false && $(ui.panel).length > 0){
							$(ui.panel).tabs("load", settings.selected);
							$(ui.panel).data("cargado", true);
					}
					if(settings.select !== undefined && settings.select !== null && typeof settings.select === "function"){
						settings.select(event, ui);
					}
				};

				//se cargan las extensiones de los usuarios en los eventos de las peticiones Ajax
				var ajaxOptions =  $.extend({},settings.ajaxOptions);

				ajaxOptions.beforeSend = function(XMLHttpRequest, sets){
					if(settings.ajaxOptions.beforeSend !== undefined && settings.ajaxOptions.beforeSend !== null && typeof settings.ajaxOptions.beforeSend === "function"){
						settings.ajaxOptions.beforeSend.call();
					}

					if (!settings.iniLoad) {
						div.data("cargado",false);
						return (false);
					}
				};
				ajaxOptions.complete = function(XMLHttpRequest, textStatus){
					//se elimina el objeto de visualizacion de carga
					div.find("span.rup-tabs_loading_img").remove();

					if(settings.ajaxOptions.complete !== undefined && settings.ajaxOptions.complete !== null && typeof settings.ajaxOptions.complete === "function"){
						settings.ajaxOptions.complete(XMLHttpRequest, textStatus);
					}
				};
				ajaxOptions.success = function (data, textStatus, XMLHttpRequest){
					if(settings.ajaxOptions.success !== undefined && settings.ajaxOptions.success !== null && typeof settings.ajaxOptions.success === "function"){
						settings.ajaxOptions.success(data, textStatus, XMLHttpRequest);
					}
				};
				ajaxOptions.error = function (xhr, s, t){
					var userFunction;

					if(settings.ajaxOptions.error !== undefined && settings.ajaxOptions.error !== null && typeof settings.ajaxOptions.error === "function"){
						userFunction = function(){
							settings.ajaxOptions.error(xhr, s, t);
						};
					}
					$.rup_messages("msgError", {
						title: $.rup.i18nParse($.rup.i18n.base,"rup_global.developerError"),
						message: "<p>"+$.rup.i18nParse($.rup.i18n.base,"rup_tabs.serverError")+"<b> "+s+":  "+xhr.status+" - "+xhr.statusText+".</b>"+"</p>",
						width: "40%",
						beforeClose: userFunction
					});
				};
				//if (settings.navigation!==true){
				$(div).tabs({
					ajaxOptions: settings.cache===false?$.extend(ajaxOptions,{cache:false}):ajaxOptions,
					cache: settings.cache,
					cookie: null,
					//cookie: settings.cookie, //Se deja para una mejora
					//disabled: true, //Bajo funcionalidades
					fx: settings.fx, //son los efectos que se aplican al presentar u ocultar una pestanya
					idPrefix: 'rup-tabs-',
					panelTemplate: settings.panelTemplate,
					selected : settings.selected,
					spinner : "<span class='rup-tabs_loading_img' />",
					//eventos
					create : settings.create,
					select : select,
					load : settings.load,
					show : settings.show,
					add : settings.add,
					remove : settings.remove,
					enable : settings.enable,
					disable : settings.disable
				});
				//}

				if (settings.scrollable===true){
						this._scrollable(settings);
				}

				// Tabs at bottoms
				if (settings.tabsAtBottom===true){
					$(div).addClass("tabs-bottom");
					$(div).find(".tabs-spacer").css("float", "left").css("height", "200px");
					$(".ui-tabs-nav, .ui-tabs-nav > *",$(div))
					.removeClass( "ui-corner-all ui-corner-top" )
					.addClass( "ui-corner-bottom" );

					$(".ui-tabs-panel.ui-widget-content.ui-corner-bottom",$(div)).removeClass("ui-corner-bottom").addClass("ui-corner-top");

					// move the nav to the bottom
					$(".ui-tabs-nav",$(div)).appendTo( ".tabs-bottom" );

				}


			},

      _parseJSON : function (json, json_i18n, tabs, pos, profundidad, settings) {
				var $self = this, element, rupLevel, label, title="";

        //Añadir contenedor de pestanyas
        var $tabsContainer = $(Rup.Templates.rup.tabs.container());
        tabs.append($tabsContainer);


				//pestanyas
				for (var i = 0; i< json.length; i++) {
					rupLevel = pos+i; //Indicador de nivel de la pestanya
					element = json[i];
					if (i === 0 && profundidad === settings.profun){
						settings.iniLoad = true;
					} else {
						settings.iniLoad = false;
					}

					label = $.rup.i18nParse(json_i18n,element.i18nCaption);

					if (settings.lengthLiteral!==undefined){
						title = label;
						if(label.length>settings.lengthLiteral){
							label = label.substr(0,settings.lengthLiteral).concat("...");
						}

					}

					if (element.layer !== undefined){
						//LAYER => Recoge una capa ya cargada de la Jsp
						element.layer = this._includeLayer($tabsContainer, element.layer, null);

            $tabsContainer.append(Rup.Templates.rup.tabs.tab({
              'id': element.i18nCaption,
              'href': element.layer,
              'rupLevel': rupLevel,
              'title': title,
              'alt': title,
              'label': label,
              'btnClose': settings.close
            }));


						//evento close
						$("span.ui-icon-close").on( "click", function() {

							var tabContentId = $(this).parent().attr("href");
					        $(this).parent().parent().remove(); //remove li of tab
					        $(tabContentId).remove(); //remove respective tab content

							 tabs.tabs( "refresh" );
							 });

						//efecto hover del boton cerrar
						$("span.ui-icon-close").addClass('rup-tabs-close');
						$("span.ui-icon-close").on({
							mouseenter: function () {
								$(this).addClass('rup-tabs-close-hover');
							},

							mouseleave: function () {
								$(this).removeClass('rup-tabs-close-hover');
							}
						});

					} else if (element.url !== undefined){
						//URL => Cargar contenido al pulsar
						$tabsContainer.append(Rup.Templates.rup.tabs.tab({
              'id': '#'+element.i18nCaption,
              'href': $.rup_utils.setNoPortalParam(element.url),
              'rupLevel': rupLevel,
              'title': title,
              'alt': title,
              'label': label,
              'btnClose': settings.close
            }));

					} else if (element.tabs !== undefined){
						//TABS => Subpestanyas
            $tabsContainer.append(Rup.Templates.rup.tabs.tab({
              'id': '#'+element.i18nCaption,
              'href': '#'+element.i18nCaption,
              'rupLevel': rupLevel,
              'title': title,
              'alt': title,
              'label': label,
              'btnClose': settings.close,
              'tabs': element.tabs
            }));

						//Gestionar capa contenedora subpestanyas
						// tabs = $(tabs).parent();
						//Añadir contenedor de capa asociada a pestanya
						var capaId = "rupRandomLayerId-"+$.rup_utils.autoGenerateIdNum++;
            var $capa = $(Rup.Templates.rup.tabs.subtab({
              'rupRandomLayerId': capaId,
              'id': element.i18nCaption,
              'actualTab': true
            }));
						$self.append($capa);

            var $subTabsDiv = $("[id='"+element.i18nCaption+"']", $capa);


						// tabs.append(capa); 						//Añadir contenedor de capa asociada a pestanya
						// tabs = $(tabs).children("#"+capaId); 	//Seleccionar capa contenedora

						//Gestionar capa de la subpestanya
						// tabs.prepend($('<div>').attr('id', element.i18nCaption).attr('actualTab',true)); //Añadir capa asociada a la pestanya
						// tabs = $(tabs).children('div:first-child'); //Seleccionar capa

						//Subpestanyas
						var subsettings = jQuery.extend(true, {}, settings);
						subsettings.selected = element.selected;
						// tabs.append(this._parseJSON(element.tabs, json_i18n, tabs, rupLevel, profundidad+1, subsettings));
            tabs.append(this._parseJSON(element.tabs, json_i18n, $subTabsDiv, rupLevel, profundidad+1, subsettings));

						this._tabify($subTabsDiv, subsettings); //Si no tiene 1 es que es el primer elemento y lo convertimos a pestanyas


					}
				}

			},

			//Funcion encargada de gestionar el objeto definido por el usuario (se parsea el JSon y se actua en consecuencia)
			// _parseJSON : function (json, json_i18n, tabs, pos, profundidad, settings) {
			// 	var element, rupLevel, label, title="";
      //
			// 	tabs.append($('<ul>'));  //Añadir contenedor de pestanyas
			// 	tabs = $(tabs).children('ul'); //Seleccionar pestanya
      //
			// 	//pestanyas
			// 	for (var i = json.length; i--; ) {
			// 		rupLevel = pos+i; //Indicador de nivel de la pestanya
			// 		element = json[i];
			// 		if (i === 0 && profundidad === settings.profun){
			// 			settings.iniLoad = true;
			// 		} else {
			// 			settings.iniLoad = false;
			// 		}
      //
			// 		label = $.rup.i18nParse(json_i18n,element.i18nCaption);
      //
			// 		if (settings.lengthLiteral!==undefined){
			// 			title = label;
			// 			if(label.length>settings.lengthLiteral){
			// 				label = label.substr(0,settings.lengthLiteral).concat("...");
			// 			}
      //
			// 		}
      //
			// 		if (element.layer !== undefined){
			// 			//LAYER => Recoge una capa ya cargada de la Jsp
			// 			element.layer = this._includeLayer(tabs, element.layer, null);
			// 			//si quiero con boton de cerrar pestana
			// 			if (settings.close===true){
			// 				tabs.prepend($('<li>').append(
			// 					$('<a>').attr('href',element.layer)
			// 					.attr({
			// 						'rupLevel':rupLevel,
			// 						'title':title,
			// 						'alt':title
			// 					}).rup_tooltip({})
			// 					.css('padding-left', '1.4em')
			// 					.css('padding-right', '0.3em')
			// 					.append ($('<div>').addClass('rup-tabs_title').text(label))
			// 					.append ($('<span>').addClass('rup-tabs_loading'))
			// 					.append('<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>')
			// 			));
      //
			// 			//evento close
			// 			$("span.ui-icon-close").on( "click", function() {
      //
			// 				var tabContentId = $(this).parent().attr("href");
			// 		        $(this).parent().parent().remove(); //remove li of tab
			// 		        $(tabContentId).remove(); //remove respective tab content
      //
			// 				 tabs.tabs( "refresh" );
			// 				 });
      //
			// 			//efecto hover del boton cerrar
			// 			$("span.ui-icon-close").addClass('rup-tabs-close');
			// 			$("span.ui-icon-close").on({
			// 				mouseenter: function () {
			// 					$(this).addClass('rup-tabs-close-hover');
			// 				},
      //
			// 				mouseleave: function () {
			// 					$(this).removeClass('rup-tabs-close-hover');
			// 				}
			// 			});
      //
			// 			}else{
			// 				tabs.prepend($('<li>').append(
			// 						$('<a>').attr('href',element.layer)
			// 						.attr({
			// 							'rupLevel':rupLevel,
			// 							'title':title,
			// 							'alt':title
			// 						}).rup_tooltip({})
			// 						.css('padding-left', '1.4em')
			// 						.css('padding-right', '0.3em')
			// 						.append ($('<div>').addClass('rup-tabs_title').text(label))
			// 						.append ($('<span>').addClass('rup-tabs_loading'))
			// 				));
			// 			}
      //
			// 		} else if (element.url !== undefined){
			// 			//URL => Cargar contenido al pulsar
			// 			tabs.prepend($('<li>').append(
			// 				$('<a>').attr('href',$.rup_utils.setNoPortalParam(element.url))
			// 					.attr({
			// 						'rupLevel':rupLevel,
			// 						'title':title,
			// 						'alt':title
			// 					}).rup_tooltip({})
			// 					.css('padding-left', '1.4em')
			// 					.css('padding-right', '0.3em')
			// 					.append ($('<div>').addClass('rup-tabs_title').text(label))
			// 					.append ($('<span>').addClass('rup-tabs_loading'))
			// 			));
			// 		} else if (element.tabs !== undefined){
			// 			//TABS => Subpestanyas
			// 			tabs.prepend($('<li>').append(
			// 				$('<a>').attr('id','#'+element.i18nCaption)
			// 					.attr('href','#'+element.i18nCaption)
			// 					.attr({
			// 						'rupLevel':rupLevel,
			// 						'title':title,
			// 						'alt':title
			// 					}).rup_tooltip({})
			// 					.css('padding-left', '1.4em')
			// 					.css('padding-right', '0.3em')
			// 					.append ($('<div>').addClass('rup-tabs_title').text(label))
			// 					.append ($('<span>').addClass('rup-tabs_loading'))
			// 			));
      //
			// 			//Gestionar capa contenedora subpestanyas
			// 			tabs = $(tabs).parent();
      //
			// 			var capa = $('<div>'),
			// 				capaId = $.rup_utils.randomIdGenerator(capa);
			// 			tabs.append(capa); 						//Añadir contenedor de capa asociada a pestanya
			// 			tabs = $(tabs).children("#"+capaId); 	//Seleccionar capa contenedora
      //
			// 			//Gestionar capa de la subpestanya
			// 			tabs.prepend($('<div>').attr('id', element.i18nCaption).attr('actualTab',true)); //Añadir capa asociada a la pestanya
			// 			tabs = $(tabs).children('div:first-child'); //Seleccionar capa
      //
			// 			//Subpestanyas
			// 			var subsettings = jQuery.extend(true, {}, settings);
			// 			subsettings.selected = element.selected;
			// 			tabs.append(this._parseJSON(element.tabs, json_i18n, tabs, rupLevel, profundidad+1, subsettings));
      //
			// 			this._tabify(tabs,subsettings); //Si no tiene 1 es que es el primer elemento y lo convertimos a pestanyas
      //
			// 			//Reposicionar 'puntero' para siguiente pasada del bucle
			// 			tabs = $(tabs).parents("div[actualTab=true]").find("ul").first();
			// 			if (tabs.length===0){
			// 				tabs = $("#"+settings.id).find("ul").first();
			// 			}
      //
			// 		}
			// 	}
			// 	$(tabs).parents("div[actualTab=true]").first().removeAttr("actualTab");
			// 	delete tabs;
			// },

			//Función encargada de validar e incluir la capa que contendrá la pestanya. De no tener identificador se le asocia uno.
			_includeLayer : function(tabs, layerSelector, pestanya){
				var content, selectObject;
				if($(layerSelector).length > 0){
					if ($(layerSelector).length === 1){
						selectObject = $(layerSelector).css("display","");
					} else {
						selectObject = $('<div>').append($(layerSelector).css("display",""));
					}

					if(pestanya === null){
						content = $('<div>').append(selectObject);
						tabs.parent().append(content);
						layerSelector = "#"+$.rup_utils.randomIdGenerator(content);
					} else {
						layerSelector = pestanya.attr("href");
						content = $(pestanya.attr("href"));
						content.children().remove();
						content.append(selectObject);
					}
				} else {

					layerSelector = "#load-tab-error";

					if(pestanya === null){
						tabs.parent().append($('<div>').attr('id',"load-tab-error")
							.append($('<div>').addClass("rup-loading_tab_error")
							.append($.rup.i18nParse($.rup.i18n.base,"rup_global.selectorError"))
						));
					} else {
						layerSelector = pestanya.attr("href");
						content = $(pestanya.attr("href"));
						content.children().remove();
						content.append($('<div>').attr('id',"load-tab-error")
							.append($('<div>').addClass("rup-loading_tab_error")
							.append($.rup.i18nParse($.rup.i18n.base,"rup_global.selectorError"))
						));
					}
				}
				return layerSelector;
			},
			_scrollable:function(settings){
				var	o = $.extend({}, settings),
				$tabs = $(this),
				$tabsNav = $tabs.find('.ui-tabs-nav'),
				$nav;//referencia al wrapper

				//ajuste del css
				$tabs.css({'padding':2, 'position':'relative'});

				//wrapper del contenido
				$tabs.wrap('<div id="stTabswrapper" class="stTabsMainWrapper" style="position:relative"/>').find('.ui-tabs-nav').css('overflow','hidden').wrapInner('<div class="stTabsInnerWrapper" style="width:30000px"><span class="stWidthChecker"/></div>');

				var $widthChecker = $tabs.find('.stWidthChecker'),
					$itemContainer = $tabs.find('.stTabsInnerWrapper'),
					$tabsWrapper = $tabs.parents('#stTabswrapper').width($tabs.outerWidth(true));
					//correción de bug en safari
					if($.browser.safari)
					{
						$tabsWrapper.width($tabs.width()+6);
					}
					//alert($tabsWrapper.width());
				if(o.resizable)
				{
					if(!!$.fn.resizable)
					{
						$tabsWrapper.resizable({
							minWidth : $tabsWrapper.width(),
							maxWidth : $tabsWrapper.width()*2,
							minHeight : $tabsWrapper.height(),
							maxHeight : $tabsWrapper.height()*2,
							handles : o.resizeHandles,
							alsoResize: $tabs,
							//start : function(){  },
							resize: function(){
								$tabs.trigger('resized');
							}
							//stop: function(){ $tabs.trigger('scrollToTab',$tabsNav.find('li.ui-tabs-selected')); }
						});
					}
					else
					{
						alert('Error:\nCannot be resizable because "jQuery.resizable" plugin is not available.');
					}
				}


				//añade iconos de navegación
				//console.log(parseInt($tabsNav.innerHeight(true)));
				//Total height of nav/2 - total height of arrow/2
				//var arrowsTopMargin = (parseInt(parseInt($tabsNav.innerHeight(true)/2)-8)),
				//	arrowsCommonCss={'cursor':'pointer','z-index':1000,'position':'absolute','top':3,'height':$tabsNav.outerHeight()-($.browser.safari ? 2 : 1)};
				var arrowsTopMargin = (parseInt(parseInt($tabsNav.innerHeight()/2)-8)),
				arrowsCommonCss={'cursor':'pointer','z-index':1000,'position':'absolute','top':3,'height':$tabsNav.outerHeight()-($.browser.safari ? 2 : 1)};
				$tabsWrapper.prepend(
				$nav = $('<div/>')
				  		.disableSelection()
						.css({'position':'relative','z-index':3000,'display':'block'})
						.append(
							$('<span/>')
								.disableSelection()
								.attr('title','Previous tab')
								.css(arrowsCommonCss)
								.addClass('ui-state-active ui-corner-tl ui-corner-bl stPrev stNav')
								.css('left',3)
								.append($('<span/>').disableSelection().addClass('ui-icon ui-icon-carat-1-w').html('Previous tab').css('margin-top',arrowsTopMargin))
								.click(function(){
									//comprueba si esta deshabilitado
									if($(this).hasClass('ui-state-disabled')) return;
									//selecciona el tab anterior y lanza el evento scrollToTab
									prevIndex = $tabsNav.find('li.ui-tabs-selected').prevAll().length-1
									//seleeciona el tab
									$tabsNav.find('li').eq(prevIndex).find('a').trigger('click');
									return false;
								}),
							$('<span/>')
								.disableSelection()
								.attr('title','Next tab')
								.css(arrowsCommonCss)
								.addClass('ui-state-active ui-corner-tr ui-corner-br stNext stNav')
								.css({'right':3})
								.append($('<span/>').addClass('ui-icon ui-icon-carat-1-e').html('Next tab').css('margin-top',arrowsTopMargin))
								.click(function(){
									//selecciona el tab anterior y lanza el evento scrollToTab
									nextIndex = $tabsNav.find('li.ui-tabs-selected').prevAll().length+1
									//selecciona el tab
									$tabsNav.find('li').eq(nextIndex).find('a').trigger('click');
									return false;
								})
						)
				);

				//Binding de los eventos con las pestañas
				$tabs.on('navEnabler',function(){
					setTimeout(function(){
						//comprueba si la ultima o la primera  pestaña esta seleccionada y en ese caso deshabilita las flechas
						var isLast = $tabsNav.find('.ui-tabs-selected').is(':last-child'),
							isFirst = $tabsNav.find('.ui-tabs-selected').is(':first-child'),
							$ntNav = $tabsWrapper.find('.stNext'),
							$pvNav = $tabsWrapper.find('.stPrev');
						//debug('isLast = '+isLast+' - isFirst = '+isFirst);
						if(isLast)
						{
							$pvNav.removeClass('ui-state-disabled');
							$ntNav.addClass('ui-state-disabled');
						}
						else if(isFirst)
						{
							$ntNav.removeClass('ui-state-disabled');
							$pvNav.addClass('ui-state-disabled');
						}
						else
						{
							$ntNav.removeClass('ui-state-disabled');
							$pvNav.removeClass('ui-state-disabled');
						}
					},o.animationSpeed);
				})
				//Comprueba si hace face falta la navegacion (si hay demasiadas pestañas visibles)
				.on('navHandler',function(){
					//Si $widthCheker es mayor tabnav  lo oculto
				//console.log($widthChecker.width());
				//console.log($tabsNav.width());

				//if($widthChecker.width()>$tabsNav.width())
					if($('.stWidthChecker').children().length>5)
					{
						$nav.show();
						//añade cierto margen  a la primera pestaña para hacerla visible si esta seleccionada
						$tabsNav.find('li:first').css('margin-left',$nav.find('.stPrev').outerWidth(true));
					}
					else
					{
						$nav.hide();
						//elima el margen del primer elemento
						$tabsNav.find('li:first').css('margin-left',0);
					}
				})
				//Bind el evento de mover el scroll
				.on('scrollToTab',function(event,$tabToScrollTo,clickedFrom,hiddenOnSide){
					//Si no se provee una pestaña como parametro ,scroll a la ultima pestaña
					$tabToScrollTo = (typeof $tabToScrollTo!='undefined') ? $($tabToScrollTo) : $tabsNav.find('li.ui-tabs-selected');

					var navWidth = $nav.is(':visible') ? $nav.find('.stPrev').outerWidth(true) : 0;
					//debug($tabToScrollTo.prevAll().length)

					offsetLeft = -($tabs.width()-($tabToScrollTo.outerWidth(true)+navWidth+parseInt($tabsNav.find('li:last').css('margin-right'),10)));
					offsetLeft = (clickedFrom=='tabClicked' && hiddenOnSide=='left') ? -navWidth : offsetLeft;
					offsetLeft = (clickedFrom=='tabClicked' && hiddenOnSide=='right') ? offsetLeft : offsetLeft;
					//debug(offsetLeft);
					var scrollSettings = { 'axis':'x', 'margin':true, 'offset': {'left':offsetLeft}, 'easing':o.easing||'' }
					//debug(-($tabs.width()-(116+navWidth)));
					$tabsNav.scrollTo($tabToScrollTo,o.animationSpeed,scrollSettings);
				})
				.on('bindTabClick',function(){
					//Controla el scroll cuando un usuario clickea manualmente en la pestaña
					$tabsNav.find('a').click(function(){
						var $liClicked = $(this).parents('li');
						var navWidth = $nav.find('.stPrev').outerWidth(true);
						//debug('left='+($liClicked.offset().left)+' and tabs width = '+ ($tabs.width()-navWidth));
						if(($liClicked.position().left-navWidth)<0)
						{
							$tabs.trigger('scrollToTab',[$liClicked,'tabClicked','left'])
						}
						else if(($liClicked.outerWidth()+$liClicked.position().left)>($tabs.width()-navWidth))
						{
							$tabs.trigger('scrollToTab',[$liClicked,'tabClicked','right'])
						}
						//Des/habilita las flechas de navegacion
						$tabs.trigger('navEnabler');
						return false;
						});
				})
				.on('resized', function() {
					$tabs.trigger('navHandler');
					$tabs.trigger('scrollToTab',$tabsNav.find('li.ui-tabs-selected'));
				})

				//triggers
				.trigger('navHandler')
				.trigger('navEnabler')
				.trigger('bindTabClick');
			}
		});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	$.fn.rup_tabs.defaults = {
		ajaxOptions: {},
		cache: true,
		cookie: null,
		fx: null,
		panelTemplate: '<div></div>',
		profun: 0,
		selected : 0,
		//eventos
		create : null,
		select : null,
		load : null,
		show : null,
		add : null,
		remove : null,
		enable : null,
		disable : null,
		tabsAtBottom:false
	};


}));

// ;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
