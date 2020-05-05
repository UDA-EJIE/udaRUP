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

/**
 * Tiene como objetivo proporcionar al componente RUP Table de las funcionalidades que ofrece el uso de un menú contextual.
 *
 * @summary Plugin de menú contextual del componente RUP Table.
 * @module rup_jqtable/contextMenu
 * @example
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 *	usePlugins:["contextMenu"],
 *	contextMenu:{
 * 		// Propiedades de configuración del plugin contextMenu
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
/*global jQuery */

	jQuery.rup_jqtable.registerPlugin('contextMenu',{
		loadOrder:4,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureContextMenu', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureContextMenu', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del diseño líquido del componente.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.$fluidBaseLayer : Referencia a la capa que se tomará como base para aplicar el diseño líquido.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		 * Metodo que realiza la pre-configuración del plugin contextMenu del componente RUP Table.
		 * Este método se ejecuta antes de la incialización del plugin.
		 *
		 * @name preConfigureContextMenu
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		preConfigureContextMenu: function(settings){
			var $self = this,  contextMenuSettings = settings.contextMenu;

			// Se unifican los parámetros de configuración de mostrar/ocultar los botones de la toolbar
			if (contextMenuSettings.createDefaultRowOperations===true) {
				contextMenuSettings.showOperations = jQuery.extend(true, {}, contextMenuSettings.defaultRowOperations, settings.core.showOperations, contextMenuSettings.showOperations);
			}

		},
		/**
		 * Metodo que realiza la post-configuración del plugin contextMenu del componente RUP Table.
		 * Este método se ejecuta después de la incialización del plugin.
		 *
		 * @name postConfigureContextMenu
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		postConfigureContextMenu: function(settings){
			var $self = this, contextMenuSettings = settings.contextMenu;

			function getTdIndex(thArray, name){

				for(var i=0;i<thArray.length;i++){
				    if (jQuery(thArray[i]).attr('id')===settings.id+'_'+name){
				        return i+1;
				    }
				}

				return -1;
			}


			$self.one({
				'jqGridLoadComplete.rupTable.contextMenu': function(data){
					var tbodyTr = '[id=\'' + $self.attr('id') + '\'] tbody:first tr[role=\'row\'].jqgrow',
						$tbodyTr = jQuery(tbodyTr),
						contextRowItems = {},
						cellLevelContextMenu=false, globalCellLevelContextMenu = Array.isArray(settings.contextMenu.colNames), itemsPerColumn={}, colItem,
						thArray, $contextMenuSelector;

					//					jQuery.each(settings.contextMenu.defaultRowOperations, function(buttonId, value){
					jQuery.each(settings.contextMenu.showOperations, function(buttonId, value){
						var operationCfg;
						if (value!==false){
							operationCfg = settings.core.operations[buttonId];
							if (operationCfg!==undefined){
								contextRowItems[buttonId]={
									name: operationCfg.name,
									id:settings.id+'_contextMenu_'+buttonId,
									cssSprite:operationCfg.icon,
									disabled: function(){
										return !jQuery.proxy(operationCfg.enabled,$self)();
									},
									callback: function(key, options){
										jQuery.proxy(operationCfg.callback,$self)(key, options);
									},
									className:operationCfg.className
								};
								if (Array.isArray(value)===true){
									cellLevelContextMenu=true;
									contextRowItems[buttonId].colNames=value;
								}
							}
						}
					});

					jQuery.each(settings.contextMenu.items,function(index, oper){
						if (Array.isArray(oper.colNames)){
							cellLevelContextMenu=true;
						}
					});
					jQuery.extend(true, contextRowItems, settings.contextMenu.items);

					// En caso de especificar solo para unas columnas
					thArray = jQuery('[id=\'gview_'+settings.id+'\'] '+settings.contextMenu.theadThSelector);

					// Eliminamos los contextMenu creados previamente
					$('ul.context-menu-list', $tbodyTr).remove();

					if (globalCellLevelContextMenu && !cellLevelContextMenu){
						for (var i=0;i< contextMenuSettings.colNames.length;i++){
							let contextMenuSelector = '[id=\'' + $self.attr('id') + '\'] ' + contextMenuSettings.tbodyTdSelector + ':nth-child(' + getTdIndex(thArray, contextMenuSettings.colNames[i]) + ')';
							$contextMenuSelector = jQuery(contextMenuSelector);
							if ($contextMenuSelector.length > 0) {
								$.contextMenu('destroy', $contextMenuSelector);
								$contextMenuSelector.rup_contextMenu({
									selector: contextMenuSelector,
									items: contextRowItems
								});
							}
						}
					}else if (cellLevelContextMenu){

						//						// En caso de no especificarse un valor de colnames para indicar sobre cuales se debe de mostrar el menú contextual, se toman todas las visibles.
						if (!Array.isArray(contextMenuSettings.colNames)){
							contextMenuSettings.colNames = jQuery.map(settings.colModel, function(elem, index){
							    if (elem.hidden!==true){
							        return elem.name;
							    }
							});
						}


						jQuery.each(contextRowItems, function(index, item){
							var colNamesAux;
							if (Array.isArray(item.colNames)){
								colNamesAux = item.colNames;
							}else{
								colNamesAux = contextMenuSettings.colNames;
							}

							for (var i=0;i<colNamesAux.length;i++){
								colItem={};
								colItem[colNamesAux[i]]={};
								jQuery.extend(true, itemsPerColumn, colItem);
								var itemAux = {};
								itemAux[index] = item;
								jQuery.extend(true, itemsPerColumn[colNamesAux[i]], itemAux);
							}
						});

						jQuery.each(itemsPerColumn, function(index, item){
							let contextMenuSelector = '[id=\'' + $self.attr('id') + '\'] ' + contextMenuSettings.tbodyTdSelector + ':nth-child(' + getTdIndex(thArray, contextMenuSettings.colNames[i]) + ')';
							$contextMenuSelector = jQuery(contextMenuSelector);
							$.contextMenu( 'destroy', $contextMenuSelector );
							if ($contextMenuSelector.length > 0) {
								$contextMenuSelector.rup_contextMenu({
									selector: contextMenuSelector,
									items: item
								});
							}
						});

					}else{
						$.contextMenu( 'destroy', $tbodyTr );
						if ($tbodyTr.length > 0) {
							$tbodyTr.rup_contextMenu({
								selector: tbodyTr,
								items: contextRowItems
							});
						}
					}

				}
			});
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
   * @description Propiedades de configuración del plugin contextMenu del componente RUP Table.
   *
   * @name options
   *
   * @property {string[]} [colNames=null] - Mediante un array se puede configurar las columnas para las cuales se va a mostrar el menú contextual. En caso de especificar el valor null se mostrará en todas las columnas.
   * @property {boolean} [createDefaultRowOperations=true] - Propiedad que indica si el componente va a mostrar las operaciones por defecto como opciones dentro del menú contextual.
   * @property {string} [tbodySelector='tbody:first tr[role=\'row\'].jqgrow'] - Selector de jQuery que identifica el tbody de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de tabla.
	 * @property {string} [tbodyTdSelector='tbody:first tr.jqgrow td'] - Selector de jQuery que identifica las columnas de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de columna.
	 * @property {string} [theadThSelector='thead:first th'] - Selector de jQuery que identifica las cabeceras de las columnas de la tabla.
   * @property {object} [items={}}] - Se especifica la configuración de los diferentes items que se van a mostrar en el menú contextual para los registros.
	 * @property {rup_jqtable~Operations[]} [showOperations] - Permite indicar que operaciones definidas de manera global van a ser mostradas como opciones en el menú contextual.
   */

	jQuery.fn.rup_jqtable.plugins.contextMenu = {};
	jQuery.fn.rup_jqtable.plugins.contextMenu.defaults = {
		contextMenu:{
			colNames: null,
			createDefaultRowOperations:true,
			defaultRowOperations:{},
			rowOperations:{},
			tbodySelector:'tbody:first tr[role=\'row\'].jqgrow',
			tbodyTdSelector:'tbody:first tr.jqgrow td',
			theadThSelector:'thead:first th',
			items:{}
		}
	};


})(jQuery);
