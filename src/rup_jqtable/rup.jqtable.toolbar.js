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

/*global jQuery */

/**
 * Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.
 *
 * @summary Plugin de toolbar del componente RUP Table.
 * @module rup_jqtable/toolbar
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["toolbar"],
 * 	toolbar:{
 * 		// Propiedades de configuración del plugin toolbar
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('toolbar',{
		loadOrder:3,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureToolbar', settings);

		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureToolbar', settings);

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureToolbar(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureToolbar(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin toolbar del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureToolbar
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureToolbar: function(settings){
			var $self = this, toolbarSettings = settings.toolbar;

			/*
			 * Inicialización de los identificadores por defecto de los componentes del toolbar
			 */
			toolbarSettings.id = toolbarSettings.id!==null?toolbarSettings.id:settings.id+'_toolbar';

			/*
			 * Inicialización del componente rup_toolbar
			 */
			if (jQuery('#'+toolbarSettings.id).length>0){
				settings.$toolbar=(toolbarSettings.id[0]==='#'?$(toolbarSettings.id):$('#'+toolbarSettings.id));
				if (!settings.$toolbar.hasClass('rup-toolbar')){
					settings.$toolbar.rup_toolbar({
						 width: toolbarSettings.width
					});
				}

				//				toolbarSettings.self=$(toolbarSettings);
			}else{
				// En caso de no indicarse un toolbar, se crea un toolbar por defecto.
				// FIXME: Contemplar la posibilidad de no generar una toolbar por defecto
				toolbarSettings = {};
				toolbarSettings.id = 'rup-maint_toolbar-' + settings.id;
				toolbarSettings.self = $('<div></div>').attr('id', toolbarSettings.id);
				$self.prepend(toolbarSettings.self);
				toolbarSettings.self.rup_toolbar({
					 width: toolbarSettings.width
				});
			}

			toolbarSettings.$toolbar = settings.$toolbar;

			// autoAjustToolbar: Realiza el autoajuste del toolbar al tamanyo del grid.
			if (toolbarSettings.autoAjustToolbar) {
				settings.$toolbar.css('width', $self.rup_jqtable('getGridParam', 'width') - 5);//-5 para ajustar el ancho
			}

			// createDefaultToolButtons: Determina la creacion de los botones basicos por defecto del toolbar.
			// Se unifican los parámetros de configuración de mostrar/ocultar los botones de la toolbar
			if (toolbarSettings.createDefaultToolButtons===true) {
				toolbarSettings.showOperations = jQuery.extend(true, {}, toolbarSettings.defaultButtons, settings.core.showOperations, toolbarSettings.showOperations);
			}

			// Retrocompatibilidad: se mantiene el antiguo parámetro newButtons
			toolbarSettings.buttons = jQuery.extend(true, {}, toolbarSettings.newButtons, toolbarSettings.buttons);

		},
		/**
		* Metodo que realiza la post-configuración del plugin toolbar del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureToolbar
		* @function
		* @fires module:rup_jqtable#rupTable_feedbackClose
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureToolbar: function(settings){
			var $self = this, toolbarSettings = settings.toolbar, counter=1;

			// Se generan los botones de la toolbar en base a las operaciones
			jQuery.each(settings.toolbar.showOperations, function(buttonId, value){
				var operationCfg;
				if (value===true){
					operationCfg = settings.core.operations[buttonId];
					if (operationCfg!==undefined){
						toolbarSettings['btn'+buttonId.capitalize()] = settings.$toolbar.addButton({
							id:'btn'+buttonId.capitalize(),
							i18nCaption: operationCfg.name,
							css: operationCfg.icon,
							index: counter++,
							dropdown: operationCfg.dropdown,
							right: operationCfg.right
						}, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable')).bind('click', function(event){
							jQuery.proxy(operationCfg.callback,$self)($self, event);
						});
					}
				}
			});

			//Se comprueba si hay nuevos botones definidos y se ejecuta la función addButton con la parametrizacion de los nuevos botones
			if (toolbarSettings.buttons !== undefined && toolbarSettings.buttons !== null){
				jQuery.each(toolbarSettings.buttons, function (index, object){
					if (object.json_i18n === undefined){
						object.json_i18n = {};
					}
					//					if (object.obj===undefined)


					if (object.obj !== undefined && object.click !== undefined){
						settings.$toolbar.addButton(object.obj, object.json_i18n).bind('click', object.click);
					} else if (object.buttons !== undefined){
					 	 var mButton = settings.$toolbar.addMButton(object, object.json_i18n).bind('click', settings.$toolbar.showMButton);
					 	 settings.$toolbar.addButtonsToMButton(object.buttons, mButton, object.json_i18n);
					}else{
						$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,'rup_jqtable.toolbarNewButtonError'));
					}
				});
			}

			/*
			 * EVENTOS
			 */
			$self.on({
				'jqGridSelectRow.rupTable.toolbar jqGridLoadComplete.rupTable.toolbar jqGridInlineEditRow.rupTable.toolbar jqGridInlineAfterRestoreRow.rupTable.toolbar rupTableHighlightRowAsSelected.rupTable.toolbar rupTableSelectedRowNumberUpdated jqGridInlineAfterSaveRow rupTable_toolbarButtonsStateRefresh rupTable_afterDeleteRow.rupTable.toolbar rupTable_coreConfigFinished.toolbar rupTable_deleteAfterComplete.rupTable.toolbar': function(event, id, status, obj){
					var $self = jQuery(this), settings = $self.data('settings');
					// Existe elementos seleccionados para ser editados

					function processButton($button, enable){
						if ($button!==undefined){
							if (enable){
								$button.button('enable');
							}else{
								$button.button('disable');
							}
						}
					}

					jQuery.each(settings.core.operations, function(buttonId, operationCfg){

						//						if (value===true){
						if (settings.toolbar.showOperations[buttonId]===true){
							//							operationCfg = settings.core.operations[buttonId];
							if (operationCfg!==undefined){
								processButton(settings.toolbar['btn'+buttonId.capitalize()], jQuery.proxy(operationCfg.enabled, $self)());
							}
						}
					});

				},
				'rupTable_internalFeedbackClose': function(){
					var $self = jQuery(this), settings = $self.data('settings');
					$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);
					// if ($self.rup_jqtable('isPluginLoaded', 'feedback')){
					// 	settings.$internalFeedback.rup_feedback('close');
					// }
				}
			});

		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	* @description Propiedades de configuración del plugin toolbar del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [id] - En caso de que se vaya a utilizar un identificador diferente al esperado por defecto, se deberá de indicar mediante esta propiedad.
	* @property {boolean} [createDefaultToolButtons=true] - Determina (true/false) si se deben visualizar los botones correspondientes a las operaciones por defecto del componente.
	* @property {object} [showOperations] - Permite indicar que operaciones definidas de manera global van a ser mostradas como botones. Cada operación puede tomar uno de los siguientes valores:  true: Valor por defecto. Se mostrará la operación como opción en la botonera.  true: Valor por defecto. Se mostrará la operación como opción en la  false: La operación no se mostrará como opción en la botonera.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	* @property {object} [buttons] - Permite definir nuevos botones que se mostrarán en la toolbar. Los nuevos botones se especificarán del mismo modo que se describe en el componente rup_toolbar.
	*/
	jQuery.fn.rup_jqtable.plugins.toolbar = {};
	jQuery.fn.rup_jqtable.plugins.toolbar.defaults = {
		toolbar:{
			id: null,
			autoAjustToolbar: true,
			createDefaultToolButtons: true,
			defaultAdd : true,
			defaultEdit : true,
			defaultSave : true,
			defaultClone : true,
			defaultCancel : true,
			defaultDelete : true,
			defaultFilter : false,
			defaultButtons:{},
			showOperations:{},
			width: 796
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza cuando se cierra el feedback.
	*
	* @event module:rup_jqtable#rupTable_feedbackClose
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} $feedback - Referencia jQuery al feedback interno.
	* @example
	* $("#idComponente").on("rupTable_feedbackClose", function(event, $internalFeedback){ });
	*/



})(jQuery);
