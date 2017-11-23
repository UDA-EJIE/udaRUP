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

(function (jQuery) {
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	
	var rup_tree = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	jQuery.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_tree", rup_tree));
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	jQuery.fn.rup_tree("extend", {
		/* Metodos publicos del core */
		getRupValue: function(){
			var $self = this, settings = $self.data("settings"), selectedItems, tmpId, name = $self.attr("name"), wrapObj;
			
			if (jQuery.inArray("checkbox", settings.plugins) !==-1){
				selectedItems = $self.rup_tree("get_checked", null, true)
			}else{
				selectedItems = $self.rup_tree("get_selected");
			}
			
			var returnArray =  jQuery.map(selectedItems, function(item, index){
				var $item = jQuery(item);

				if (jQuery.isFunction(settings.core.getValue)){
					return jQuery.proxy(settings.core.getValue, $self)($item, $item.data());
				}
				
				tmpId = $item.attr("id");
				return tmpId?tmpId:$item.text();
			});
			
			if (settings.core.submitAsJSON){
				return jQuery.rup_utils.getRupValueAsJson(name, returnArray);
			}else{
				
				if (settings.core.submitAsString){
					return jQuery.rup_utils.getRupValueWrapped(name, returnArray.toString());
				}else{
					return jQuery.rup_utils.getRupValueWrapped(name, returnArray);
				}
				
			}
		},
		setRupValue: function(valuesArray){
			var $self = this, settings = $self.data("settings"), $items, $item, itemValue, tmpId, dataArray;
			
			$self.rup_tree("uncheck_all");
			
			$items = $self.get_container_ul().find("li");
			
			dataArray = settings.core.readAsString===true?valuesArray.split(","):valuesArray;
			
			jQuery.each($items, function(index, item){
				$item = jQuery(item);
				
				if (jQuery.isFunction(settings.core.getValue)){
					itemValue = jQuery.proxy(settings.core.getValue, $self)($item, $item.data());
				}else{
					tmpId = $item.attr("id");
					itemValue = tmpId?tmpId:$item.text();
				}
				
				if (jQuery.inArray(itemValue, dataArray)!==-1){
					$self.rup_tree("check_node", item);	
				}
			});
			
			
		},
		rollback: function(rollback_object){			
			jQuery.jstree.rollback (rollback_object);
		},
		get_container: function (){
			return($(this).jstree('get_container'));
		},
		get_container_ul: function (){
			return($(this).jstree('get_container_ul'));
		},
		destroy: function (){
			$(this).jstree('destroy');
		},
		refresh: function (node) {
			$(this).jstree('refresh', node);
		},
		set_focus: function (){
			$(this).jstree('set_focus');
		},
		unset_focus: function (){
			$(this).jstree('unset_focus');
		},
		is_focused: function (){
			return($(this).jstree('is_focused'));
		},
		lock: function (){
			$(this).jstree('lock');
		},
		unlock: function (){
			$(this).jstree('unlock');
		},
		is_locked: function (){
			return($(this).jstree('is_locked'));
		},
		get_path: function (node, id_mode){
			return($(this).jstree('get_path', node, id_mode));
		},
		open_node: function (node, callback, skip_animation){
			$(this).jstree('open_node', node, callback, skip_animation);
		},
		close_node: function (node, skip_animation){
			$(this).jstree('close_node', node, skip_animation);
		},
		toggle_node: function(node){
			return($(this).jstree('toggle_node', node));
		},
		open_all: function (node, do_animation){
			$(this).jstree('open_all', node, do_animation);
		},
		close_all: function (node, do_animation){
			$(this).jstree('close_all', node, do_animation);
		},
		is_open: function(node){
			return($(this).jstree('is_open', node));
		},
		is_closed: function(node){
			return($(this).jstree('is_closed', node));
		},
		is_leaf: function(node){
			return($(this).jstree('is_leaf', node));
		},
		get_rollback: function(){
			return($(this).jstree('get_rollback'));	
		},
		create_node: function(node , position , js , callback){
			return($(this).jstree('create_node', node , position , js , callback));
		},
		get_text: function(node){
			return($(this).jstree('get_text', node));
		},
		rename_node: function(node, text){
			$(this).jstree('rename_node', node, text);
		},		
		delete_node: function(node){
			$(this).jstree('delete_node', node);
		},
		check_move: function(){
			return ($(this).jstree('check_move'));
		},
		move_node : function (obj, ref, position, is_copy, is_prepared, skip_check){
			return ($(this).jstree('move_node', obj, ref, position, is_copy, is_prepared, skip_check));
		},
		
		/* Metodos publicos del theme */
		get_theme: function() {
			var theme = $(this).jstree('get_theme');
			if (typeof theme !== "string"){
				return "rup-default";
			} else {
				return theme;
			}
		},
		set_theme: function(name , url) {
			if (name !== "rup-default"){
				if($(this).rup_tree("get_theme") === "rup-default"){
					$(this).removeClass("jstree-rup-default");
				}
				var settings = this.data("settings");
				settings.actualThemeUrl = url;
				this.data("settings",settings);
				$(this).jstree('set_theme', name, url);
			} else {
				$(this).jstree('set_theme', "rup-default", this.data("settings").actualThemeUrl);
			}
		},
		show_dots: function() {
			$(this).jstree('show_dots');
		},
		hide_dots: function() {
			$(this).jstree('hide_dots');
		},
		toggle_dots: function() {
			$(this).jstree('toggle_dots');
		},
		show_icons: function() {
			$(this).jstree('show_icons');
		},
		hide_icons: function() {
			$(this).jstree('hide_icons');
		},
		toggle_icons: function() {
			$(this).jstree('toggle_icons');
		},
		
		/* Metodos publicos de la selección */
		save_selected: function() {
			$(this).jstree('save_selected');
		},
		reselect: function() {
			$(this).jstree('reselect');
		},
		refresh: function (node){
			return($(this).jstree('refresh', node));
		},
		hover_node: function (node){
			$(this).jstree('hover_node', node);
		},
		dehover_node: function() {
			$(this).jstree('dehover_node');
		},
		select_node: function(node , check , event){
			$(this).jstree('select_node', node, check , event);
		},
		deselect_node: function(node){
			$(this).jstree('deselect_node', node);
		}, 
		toggle_select: function(node){
			$(this).jstree('toggle_select', node);
		},
		deselect_all: function(context){
			$(this).jstree('deselect_all', context);
		},
		get_selected: function(context){
			return($(this).jstree('get_selected', context));
		},
		is_selected: function(node){
			return($(this).jstree('is_selected', node));
		},
		
		/* Metodos publicos del hotkeys */
		enable_hotkeys: function(){
			$(this).jstree('enable_hotkeys');
		},
		disable_hotkeys:  function(){
			$(this).jstree('disable_hotkeys');
		},
		
		/* Metodos  publicos del checkbox */
		change_state: function(node , uncheck){
			$(this).jstree('change_state', node, uncheck);
		},
		check_node:  function(node){
			$(this).jstree('check_node', node);
		},
		uncheck_node:  function(node){
			$(this).jstree('uncheck_node', node);
		},
		check_all:  function(){
			$(this).jstree('check_all');
		},
		uncheck_all:  function(){
			$(this).jstree('uncheck_all');
		},
		is_checked:  function(node){
			return($(this).jstree('is_checked', node));
		},
		get_checked:  function(context, get_all){
			return($(this).jstree('get_checked', context, get_all));
		},
		get_unchecked:  function(context, get_all){
			return($(this).jstree('is_checked', context, get_all));
		},
		show_checkboxes:  function(){
			$(this).jstree('show_checkboxes');
		},
		hide_checkboxes: function(){
			$(this).jstree('hide_checkboxes');
		},
		
		/* Metodos  publicos del crrm */
		rename: function(node){
			$(this).jstree('rename',node);
		},
		create: function(node , position , js , callback , skip_rename){
			return($(this).jstree('create', node , position , js , callback , skip_rename));
		},
		remove: function(node){
			$(this).jstree('remove', node);
		},
		cut: function(node){
			$(this).jstree('cut', node);
		},
		copy: function(node){
			$(this).jstree('copy', node);
		},
		paste : function(node){
			$(this).jstree('paste', node);
		},
		
		/* Metodos publicos del contextmenu */
		show_contextmenu : function(node, x, y){
			$(this).jstree('show_contextmenu', node, x, y);
		},
		
		/* Metodos publicos de la especificación de types */
		set_type: function (type, node){
			$(this).jstree('set_type', type, node);
		}
	});
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************
	
	jQuery.fn.rup_tree("extend", {
		_init : function(args) {
			if (args.length > 1) {
				jQuery.rup.errorGestor(jQuery.rup.i18n.base.rup_global.initError + jQuery(this).attr("id"));
			}
			else {		
				//Se recogen y cruzan las paremetrizaciones del objeto
				if (args.length > 0){ 
					if (args[0].select){
						args[0].ui = args[0].select;
						delete args[0].select;					
					}
					if (args[0].jQueryUIStyles){
						args[0].themeroller = args[0].jQueryUIStyles;
						delete args[0].jQueryUIStyles;					
					}
				}
				
				var settings = jQuery.extend(true, {}, jQuery.fn.rup_tree.defaults, args[0]), self = this[0], selectorSelf = this;
				
				// Se guarda la referencia al $self
				settings.$self = $(this);
				settings.$self.attr("ruptype","tree");
				
				//validacion de carga por defecto
				if(settings.ui === undefined || settings.ui.enable !== false){
					settings.plugins[settings.plugins.length]="ui";
				}
				
				if(settings.crrm === undefined || settings.crrm.enable !== false){
					settings.plugins[settings.plugins.length]="crrm";
					
					//Se añaden los evento para gestionar el objeto cortado
					selectorSelf.bind("cut.jstree", $.proxy(function (event, eventArgs) {
						$(this).find(".rup_tree_cutNode.ui-state-disabled").removeClass("rup_tree_cutNode ui-state-disabled");
						eventArgs.args[0].children("a").addClass("rup_tree_cutNode ui-state-disabled");
					}, this));
					selectorSelf.bind("copy.jstree", $.proxy(function (event, eventArgs) {
						$(this).find(".rup_tree_cutNode.ui-state-disabled").removeClass("rup_tree_cutNode ui-state-disabled");
					}, this));
					selectorSelf.bind("paste.jstree", $.proxy(function (event, eventArgs) {
						$(this).find(".rup_tree_cutNode.ui-state-disabled").removeClass("rup_tree_cutNode ui-state-disabled");
					}, this));
				}

				if(settings.hotkeys === undefined || settings.hotkeys.enable !== false){
					settings.plugins[settings.plugins.length]="hotkeys";	
					
					if(settings.crrm === undefined || settings.crrm.enable !== false){
						jQuery.jstree.defaults.hotkeys["esc"] = $.proxy(function (event) {
							if(event.target.tagName === "BODY" ){
								$(this).jstree('cleanCut');
								$(this).find(".rup_tree_cutNode.ui-state-disabled").removeClass("rup_tree_cutNode ui-state-disabled");
							}
						}, this);
					}
				}
				
				//Gestión de los evento para su posterior carga en el orden correcto
				selectorSelf._eventRecollector(settings, selectorSelf);				
				
				//Se tapa la creación del arbol para evitar visualizaciones inapropiadas
				//Se recomienda que el componente, inicialmente, sea invisible. Para ello se dispone del estilo rup_tree
				selectorSelf.addClass("rup_tree");
				
				//Se determina, a partir de la configuración, el tipo de origen de datos utilizado 
				if(settings.xml_data !== undefined){
					settings.plugins[settings.plugins.length]="xml_data";
				} else if (settings.json_data !== undefined){
					settings.plugins[settings.plugins.length]="json_data";
				} else {
					settings.plugins[settings.plugins.length]="html_data";
				}
				
				//Se activa y configura, si fuera necesario, el modulo del menu contextual
				if(settings.contextmenu !== undefined && settings.contextmenu.enable === true){
					settings.plugins[settings.plugins.length]="contextmenu";
				} else {
					delete settings.contextmenu;
				}
				
				//Se activa, si fuera necesario, el modulo de ordenación
				if(settings.sort !== undefined){
					if (settings.sort.enable === true){
						settings.plugins[settings.plugins.length]="sort";
						if (settings.sort.sortFunction !== undefined){
							settings.sort = settings.sort.sortFunction;
						} else {
							delete settings.sort;
						}
					} else {
						 delete settings.sort;
					}
				}
				
				//Se activa, si fuera necesario, el modulo checkbox
				if(settings.checkbox !== undefined && settings.checkbox.enable === true){
					settings.plugins[settings.plugins.length]="checkbox";
					delete settings.checkbox.enable;
				} else {
					delete settings.checkbox;
				}
				
				//Si fuera necesario, se activa el plugin wholerow (fila entera)
				if(settings.wholerow !== undefined && settings.wholerow === true){
					settings.plugins[settings.plugins.length]="wholerow";
				}
				
				//Si fuera necesario, se activa el plugin unique
				if(settings.unique !== undefined && settings.unique.enable === true){
					settings.plugins[settings.plugins.length]="unique";
					delete settings.unique.enable;
				} else {
					delete settings.unique;
				}
				
				//Si fuera necesario, se activa el plugin types
				if(settings.types !== undefined){
					settings.plugins[settings.plugins.length]="types";
					
					//Se ajusta el jsTree a la convivencia con portales
					if($.rup_utils.aplicatioInPortal()){
						this.get_container().bind("loaded.jstree", $.proxy(function () { 
							$(this).jstree("types_portal_css");
						},this));
					}
				}
				
				//Si fuera necesario, se activa el plugin Drag and Drop 
				if(settings.dnd !== undefined && settings.dnd.enable === true){
					settings.plugins[settings.plugins.length]="dnd";
					delete settings.dnd.enable;
				} else {
					delete settings.dnd;
				}
				
				//Se valora la gestión de estilos. El plugin de themeRoller (estilos jQueryUI) siempre debe ser el ultimo y es excluyente al plugin themes
				if(settings.themeroller !== undefined){
					if(settings.themeroller.enable === true){
						settings.plugins[settings.plugins.length]="themeroller";
						delete settings.themeroller.enable;
					} else {
						settings.plugins[settings.plugins.length]="themes";
						delete settings.themeroller;
					}
				} else {
					settings.plugins[settings.plugins.length]="themes";
				}
				
				
				//Se almacenan los settings en el data del objeto 
				selectorSelf.data("settings",settings);
				
				//Se crea el árbol
				selectorSelf.jstree(settings);

				//Evento de inicializacion
				selectorSelf.bind("loaded.jstree", $.proxy(function () {
					//Una vez creado, se libera la visualización del componente
					this.removeClass("rup_tree");
				}, this));
				
				//Se ajustan los estilos por defecto
				if (settings.themeroller === undefined && !settings.themes.theme){
					selectorSelf.addClass("jstree-rup-default");
					$(this).jstree("set_theme_data","rup-default");
				}
				
				//Se configura, si fuera necesario, el modulo del menu contextual
				if(settings.contextmenu !== undefined && settings.contextmenu.enable === true){
					delete settings.contextmenu.enable;
					if(settings.contextmenu.defaultOptions !== undefined){
						var contextmenuItems = this.jstree("get_settings").contextmenu.items;
						var defaultOptions = settings.contextmenu.defaultOptions;
						for(option in defaultOptions){
							if(defaultOptions[option] === false){
								contextmenuItems[option] = null;
							} else if (option === "ccp"){
								var ccpOptions = defaultOptions.ccp;
								for(ccpOption in ccpOptions){
									if(ccpOptions[ccpOption] === false){
										contextmenuItems.ccp.submenu[ccpOption] = null;
									}
								}
							}
						}
						$(this).jstree("set_contextmenu_items",contextmenuItems);
						delete settings.contextmenu.defaultOptions;
					}
				} else {
					delete settings.contextmenu;
				}
				
				
				
				/* REVISION (encuentrame) */
				
				//Se sobreescribe uno de los eventos para hacer reaparecer, una vez creado, el accordion
//				createUserEvent = settings.create;
//				settings.create = function (event, ui) {
//					if (createUserEvent !== undefined) {
//						if (createUserEvent(event, ui) === false) {
//							return false;
//						}
//					}
					//Comportamiento por defecto del evento
//					create_default(event, ui);
//				};
				
//				function create_default(event, ui){
//					$(event.target).addClass("rup_accordion_create");
//				}
				
				//Se comprueba la corrección del html con el que se creara el accordion
//				if(settings.validation){
//					if(parseInt(elementsNum) !== elementsNum){
//						$.rup.errorGestor($.rup.i18n.base.rup_accordion.strucPairError);
//						return false;
//					} else {
//						elements.each(function(index,object){
//							if ((parseInt(index/2) === index/2) && ($(object).find("a").length === 0)){
//								$.rup.errorGestor($.rup.i18n.base.rup_accordion.headFormatError);
//								return false;
//							} 
//						});
//					}
//				}
				
				//Se invoca la creacion del accordion
//				this.accordion(settings);
			}
		},
		/* revisar funcionamiento */
		_eventRecollector : function(settings, selectorSelf){
			
			var aux;
			
			for (var i in settings){
				aux = i.split("_event");
				if (aux.length >1){
					this.bind(aux[0]+".jstree", settings[i]);
				} 
			}
		}
	});
	
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	jQuery.fn.rup_tree.defaults = {
		"plugins" : ["rup_extend"],
		"actualThemeUrl" : "",
		
		//Pruebas de configuracion (todos los parametros)
		//CORE
//		"core" : {
//			"html_titles" : false,
//			"animation" : 500,
//			"initially_open" : [],
//			"open_parents" : true,
//			"initially_load" : [],
//			"load_open" : false,
//			"notify_plugins" : true,
//			"rtl" : false,
//			"strings" : { loading : "Loading ...", new_node : "New node" }
//		},		
		//THEMES PLUGIN
		"core" : {
			"strings" : {
				"loading" : $.rup.i18nParse($.rup.i18n.base,"rup_tree.loading"),
				"new_node" : $.rup.i18nParse($.rup.i18n.base,"rup_tree.new_node")
			},
			"getValue":undefined,
			"submitAsJSON":false,
			"submitAsString":false,
			"readAsString":false
		},
		"themes" : {
			"theme" : ""
		},
		"checkbox" : {
			"override_ui" : true
		},
		"crrm" : {
			"input_width_limit" : 200
		}
	};
	
	//*************************************************
	// AJUSTES GENERALES DEL FUNCIONAMIENTO DEL PÁTRON  
	//*************************************************
	
	//Gestion de los literales del menu contextual
	jQuery.jstree.defaults.contextmenu.items.create.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.create");
	jQuery.jstree.defaults.contextmenu.items.rename.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.rename");
	jQuery.jstree.defaults.contextmenu.items.remove.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.remove");
	jQuery.jstree.defaults.contextmenu.items.ccp.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.ccp.label");
	jQuery.jstree.defaults.contextmenu.items.ccp.submenu.cut.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.ccp.cut");
	jQuery.jstree.defaults.contextmenu.items.ccp.submenu.copy.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.ccp.copy");
	jQuery.jstree.defaults.contextmenu.items.ccp.submenu.paste.label = $.rup.i18nParse($.rup.i18n.base,"rup_tree.ccp.paste");
	
	//Se extienden las funcionalidades del jstree para ajustar prestaciones, de manejo de teclado, que funcionaban erráticamente 
	jQuery.extend(jQuery.jstree.defaults.hotkeys, $.rup.compatibility.jstree.hotkeys);
	$.jstree.plugin("rup_extend", $.rup.compatibility.jstree.rup_extend);
	
})(jQuery);