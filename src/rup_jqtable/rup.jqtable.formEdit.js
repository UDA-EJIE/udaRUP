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
 * Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra dentro de un diálogo y ofrece las siguientes funcionalidades:
 * - Añadir un nuevo registro o modificar uno ya existente.
 * - Cancelar la inserción o edición de un registro.
 * - Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre losdiferentes elementos.
 *
 * @summary Plugin de edición en formulario del componente RUP Table.
 * @module rup_jqtable/formEdit
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["formEdit"],
 * 	formEdit:{
 * 		// Propiedades de configuración del plugin formEdit
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
	jQuery.rup_jqtable.registerPlugin('formEdit', {
		loadOrder: 6,
		preConfiguration: function (settings) {
			var $self = this;

			return $self.rup_jqtable('preConfigureFormEdit', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;

			return $self.rup_jqtable('postConfigureFormEdit', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
     * Extensión del componente rup_jqtable para permitir la edición de los registros mediante un formulario.
     *
     * Los métodos implementados son:
     *
     * preConfigureFormEdit(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
     * postConfigureFormEdit(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
     *
     * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
     *
     * settings.formEdit.$detailForm : Referencia al formulario de detalle mediante el que se realizan las modificaciones e inserciones de registros.
     * settings.formEdit.$detailFormDiv : Referencia al div que arropa el formulario de detalle y sobre el que se inicializa el componente rup_dialog.
     *
     */
	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin formEdit del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureFormEdit
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureFormEdit: function (settings) {
			var $self = this,
				self = this[0],
				colModel = settings.colModel, colModelObj;


			settings.formEdit.navigationBarId = settings.formEdit.navigationBarId !== undefined ? settings.formEdit.navigationBarId : settings.id + '_detail_navigation';
			settings.formEdit.saveButtonId = settings.formEdit.saveButtonId !== undefined ? settings.formEdit.saveButtonId : settings.id + '_detail_button_save';
			settings.formEdit.saveRepeatButtonId = settings.formEdit.saveRepeatButtonId !== undefined ? settings.formEdit.saveRepeatButtonId : settings.id + '_detail_button_save_repeat';
			settings.formEdit.cancelButtonId = settings.formEdit.cancelButtonId !== undefined ? settings.formEdit.cancelButtonId : settings.id + '_detail_button_cancel';
			settings.formEdit.feedbackId = settings.formEdit.feedbackId !== undefined ? settings.formEdit.feedbackId : settings.id + '_detail_feedback';

			settings.formEdit.$navigationBar = jQuery('#' + settings.formEdit.navigationBarId);
			settings.formEdit.$saveButton = jQuery('#' + settings.formEdit.saveButtonId);
			settings.formEdit.$saveRepeatButton = jQuery('#' + settings.formEdit.saveRepeatButtonId);
			settings.formEdit.$cancelButton = jQuery('#' + settings.formEdit.cancelButtonId);
			settings.formEdit.$feedback = jQuery('#' + settings.formEdit.feedbackId);


			/*
             * Inicialización de propiedades del componente para simplificar su configuración
             */
			// En caso de no especificarse una url para la edición de un elemento, se utiliza por defecto la indicada en la propiedad url.
			if (settings.formEdit.editurl === undefined) {
				settings.formEdit.editurl = settings.baseUrl;
				settings.formEdit.editOptions.ajaxEditOptions.url = settings.baseUrl;
				settings.formEdit.addOptions.ajaxEditOptions.url = settings.baseUrl;
			}


			if (settings.formEdit.detailOptions.ajaxDetailOptions.url === undefined) {
				settings.formEdit.detailOptions.ajaxDetailOptions.url = settings.baseUrl;
			}


			settings.ondblClickRow = function (rowid, iRow, iCol, e) {
				$self.rup_jqtable('editElement', rowid);
				return false;
			};


			settings.formEdit.deleteOptions.ajaxDelOptions = jQuery.extend(true, settings.formEdit.deleteOptions.ajaxDelOptions, {
				success: function (data, st, xhr) {
					$self.triggerHandler('rupTableAfterDelete', [data, st, xhr]);
					$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.deletedOK'), 'ok');
				}
			});

			// Se comprueba si se ha especificado un formulario propio por parte del usuario.
			if (settings.formEdit.detailForm === undefined) {
				for (var i = 0; i < colModel.length; i++) {
					colModelObj = colModel[i];
					colModelObj.id = 'detailForm_' + settings.id + '_' + colModelObj.name.replace(/[.]/g, '_');
				}
			}

			/* DEFINICION DE OPERACIONES BASICAS CON LOS REGISTROS */

			settings.core.defaultOperations = {
				'add': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.new'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.add.icon,
					enabled: function () {
						return true;
					},
					callback: function (key, options) {
						$self.rup_jqtable('newElement');
					}
				},
				'edit': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modify'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.edit.icon,
					enabled: function () {
						var $self = this,
							settings = $self.data('settings');
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('editElement');
					}
				},
				//				"save": {
				//					name: "Guardar",
				//					icon: "save",
				//					enabled: function(){
				//						return false;
				//					}},
				//					callback: function(key, options){
				//						$self.rup_jqtable("newElement");
				//					}},
				'clone': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.clone'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.clone.icon,
					enabled: function () {
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('cloneElement');
					}
				},
				//				"cancel": {
				//					name: "Cancel",
				//					icon: "cancel",
				//					enabled: function(){
				//						return false;
				//					}},
				'delete': {
					name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.delete'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations['delete'].icon,
					enabled: function () {
						var $self = this,
							settings = $self.data('settings');
						return jQuery.proxy(settings.fncHasSelectedElements, $self)();
					},
					callback: function (key, options) {
						$self.rup_jqtable('deleteElement');
					}
				}
			};

			$.extend(true, settings.core.operations, settings.core.defaultOperations);

			// Configuración de edit/add
			settings.formEdit.addOptions = $.extend(true, {}, settings.formEdit.addEditOptions, settings.formEdit.addOptions);
			settings.formEdit.editOptions = $.extend(true, {}, settings.formEdit.addEditOptions, settings.formEdit.editOptions);
		},
		
		/**
	 * Metodo que realiza la post-configuración del plugin formEdit del componente RUP Table.
	 * Este método se ejecuta antes de la incialización del plugin.
	 *
	 * @name postConfigureFormEdit
	 * @function
	 * @param {object} settings - Parámetros de configuración del componente.
	 */
		postConfigureFormEdit: function (settings) {
			var $self = this,
				$objDetailForm;

			// Se comprueba si se ha especificado un formulario propio por parte del usuario.
			if (settings.formEdit.detailForm) {
				// Se comprueba que el identificador especificado para el diálogo sea válido
				if (jQuery(settings.formEdit.detailForm).length === 0) {
					alert('El identificador especificado para el fomulario de detalle no existe.');
				} else {
					$objDetailForm = $(settings.formEdit.detailForm);
					if ($objDetailForm.is('form')) {
						if ($objDetailForm.parent().is('div')) {
							settings.formEdit.$detailFormDiv = $objDetailForm.parent();
							settings.formEdit.$detailForm = $objDetailForm;
						} else {
							alert('El formulario no está incluido dentro de un div');
						}
					} else if ($objDetailForm.is('div')) {
						var $objFormAux = $objDetailForm.find('form');
						if ($objFormAux.length === 1) {
							settings.formEdit.$detailFormDiv = $objDetailForm;
							settings.formEdit.$detailForm = $objFormAux;
						} else {
							alert('El div indicado no contiene un único formulario');
						}
					}

					// Inicialización del componente rup_form sobre del formulario de detalle
					settings.formEdit.$detailForm.rup_form(settings.formEdit.editOptions);
					settings.formEdit.ownFormEdit = true;
				}
			}
			//			else{
			// No se configura un formulario de detalle
			var beforeSendUserEvent = settings.beforeSend;
			var defaultBeforeSend = function (jqXHR, ajaxOptions) {
				ajaxOptions.beforeSend = beforeSendUserEvent;
				ajaxOptions.validate = settings.formEdit.validate;
				ajaxOptions.feedback = settings.$detailFeedback;
				// Se elimina el valor de la propiedad contentType para que la gestione automáticamente el componente rup.form
				delete ajaxOptions.contentType;
				if (jQuery.isPlainObject(ajaxOptions.data) && settings.masterDetail === undefined) {
					ajaxOptions.data = $.rup_utils.unnestjson(ajaxOptions.data);
				}
				ajaxOptions.beforeSubmit = function (a, $form, options) {
					var hasFileInputs = jQuery('input:file', $form).length > 0;
					if ((!$.rup.browser.xhrFileUploadSupport && hasFileInputs) || options.iframe === true) {
						options.extraData = {};
					}
					// TODO : Comprobar si se puede elimianr el delete
					a = undefined;
					//delete a;
				};
				ajaxOptions.propperFormSerialization = false;
				settings.formEdit.$detailForm.rup_form('ajaxSubmit', ajaxOptions);
				rp_ge[settings.id].processing = false;
				return false;
			};

			settings.formEdit.editOptions.ajaxEditOptions.beforeSend = defaultBeforeSend;
			settings.formEdit.addOptions.ajaxEditOptions.beforeSend = defaultBeforeSend;
			//			}

			settings.getDetailTotalRowCount = function () {
				var $self = this;
				return $self.rup_jqtable('getGridParam', 'records');
			};

			settings.getDetailCurrentRowCount = function () {
				var $self = this,
					page, rowNum, rowId, rowsPerPage, cont;

				// Obtenemos la pagina actual
				page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);
				// Obtenemos el identificador del registro seleccionado
				rowId = $self.rup_jqtable('getGridParam', 'selrow');
				// Obtenemos el numero de linea
				//				rowNum = $self.jqGrid("getInd", rowId);
				rowNum = jQuery.inArray(rowId, jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])()[1]) + 1;
				// Numero de registros por pagina que se visualizan
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				// Flag de todos los registros seleccionados
				cont = (page * rowsPerPage) - rowsPerPage + rowNum;

				return cont;
			};



			settings.getRowForEditing = function () {
				var $self = this,
					selrow = $self.jqGrid('getGridParam', 'selrow');

				return (selrow === null ? false : selrow);
			};

			settings.fncHasSelectedElements = function () {
				var $self = this;
				return jQuery.proxy(settings.getRowForEditing, $self)() !== false;
			};

			settings.fncGetNavigationParams = function getNavigationParams(linkType) {
				var $self = this,
					execute = false,
					changePage = false,
					index = 0,
					newPage = 0,
					newPageIndex = 0,
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10),
					lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records') / $self.rup_jqtable('getGridParam', 'rowNum')), 10);

				npos[0] = parseInt(npos[0], 10);

				switch (linkType) {
				case 'first':
					if (!(page === 1 && npos[0] === 0)) {
						execute = true;
						index = 0;
						if (page > 1) {
							changePage = true;
							newPage = 1;
							newPageIndex = 0;
						}
					}
					break;
				case 'prev':
					if (!(page === 1 && npos[0] === 0)) {
						execute = true;
						index = npos[0] - 1;
						if (index < 0) {
							changePage = true;
							newPage = page - 1;
							newPageIndex = rowsPerPage;
						}
					}
					break;
				case 'next':
					if (!(page === lastPage && npos[0] === npos[1].length - 1)) {
						execute = true;
						index = npos[0] + 1;
						if (index > npos[1].length - 1) {
							changePage = true;
							newPage = page + 1;
							newPageIndex = 0;
						}
					}
					break;
				case 'last':
					if (!(page === lastPage && npos[0] === npos[1].length - 1)) {
						execute = true;
						index = npos[1].length - 1;
						if (page < lastPage) {
							changePage = true;
							newPage = lastPage;
							newPageIndex = rowsPerPage;
						}
					}
					break;
				}

				return [linkType, execute, changePage, index, npos, newPage, newPageIndex];
			};

			settings.doNavigation = function (arrParams, execute, changePage, index, npos, newPage, newPageIndex) {
				var $self = this,
					settings = $self.data('settings'),
					props = rp_ge[$self.attr('id')],
					linkType, execute, changePage, index, npos, newPage, newPageIndex;

				if ($.isArray(arrParams)) {
					linkType = arrParams[0];
					execute = arrParams[1];
					changePage = arrParams[2];
					index = arrParams[3];
					npos = arrParams[4];
					newPage = arrParams[5];
					newPageIndex = arrParams[6];

					if (execute) {
						$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
						$self.triggerHandler('jqGridAddEditClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (changePage) {
							$self.trigger('reloadGrid', [{
								page: newPage
							}]);
							$self.on('jqGridAfterLoadComplete.pagination', function (event, data) {
								var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
									newIndexPos = (newPageIndex < nextPagePos[1].length ? newPageIndex : nextPagePos[1].length - 1);
								$self.jqGrid('setSelection', nextPagePos[1][newIndexPos]);
								jQuery.proxy(jQuery.jgrid.fillData, $self[0])(nextPagePos[1][newIndexPos], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
								jQuery.proxy(jQuery.jgrid.updateNav, $self[0])(nextPagePos[1][newIndexPos], npos[1].length - 1);
								$self.off('jqGridAfterLoadComplete.pagination');
							});
						} else {
							jQuery.proxy(jQuery.jgrid.fillData, $self[0])(npos[1][index], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
							$self.jqGrid('setSelection', npos[1][index]);
							jQuery.proxy(jQuery.jgrid.updateNav, $self[0])(npos[1][index], npos[1].length - 1);
						}
						$self.triggerHandler('jqGridAddEditAfterClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (jQuery.isFunction(props.afterclickPgButtons)) {
							props.afterclickPgButtons.call($self, 'next', settings.formEdit.$detailForm, npos[1][npos[index]]);
						}
					}
				}
			};


			// Campturador del evento jqGridInlineAfterSaveRow.
			$self.on({
				'jqGridLoadComplete.rupTable.formEditing': function (data) {
					var $self = $(this),
						settings = $self.data('settings'),
						nPos;

					if (settings.formEdit.autoselectFirstRecord) {
						nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
						$self.jqGrid('setSelection', nPos[1][0], false);
					}

				},
				'jqGridAddEditInitializeForm.rupTable.formEditing': function (event, $form, modo) {

					/*
                     * Creación de los componentes rup
                     */
					var $self = $(this),
						settings = $self.data('settings'),
						colModel = settings.colModel;

					if (settings.formEdit.ownFormEdit === false) {
						jQuery.each(colModel, function (index, colObj) {
							if (colObj.rupType) {

								if (colObj.editoptions && colObj.editoptions.i18nId === undefined) {
									colObj.editoptions.i18nId = $self.attr('id') + '##' + this.name;
								}

								$('#' + (colObj.id !== null ? colObj.id : name), $form)['rup_' + colObj.rupType](colObj.editoptions);
							}
						});
					}

					//Se crea el toolbar de error mediante un componente rup_tooltip
					settings.$detailFeedback = settings.formEdit.$feedback.rup_feedback({
						closeLink: true,
						gotoTop: false,
						block: false,
						fadeSpeed: 500
						//						delay: 1000,
					}).attr('ruptype', 'feedback');
				},
				'jqGridAddEditAfterSubmit.rupTable.formEditing': function (event, res, postData, oper) {
					// Una vez se haya realizado el guardado del registro se muestra el mensaje correspondiente en el feedback dependiendo del modo en el que se encuentra.
					var settings = $self.data('settings'),
						formEditSaveType = $self.data('tmp.formEditSaveType'),
						id, compositeId = '',
						$fieldRupCombo, labelProperty = null, responseJson;
					$self.removeData('tmp.formEditSaveType');

					// Tratamiento concreto para los componentes RUP
					// Combo
					jQuery.each(settings.colModel, function (i, elem) {
						if (elem.rupType === 'combo') {
							$fieldRupCombo = jQuery('[name=\'' + elem.name + '\']', settings.$detailForm);

							if (elem.editoptions.labelProperty !== undefined) {
								labelProperty = elem.editoptions.labelProperty;
							} else if (elem.editoptions.sourceParam !== undefined) {
								labelProperty = elem.name.substring(0, elem.name.lastIndexOf('.') + 1) + elem.editoptions.sourceParam.label;
							}

							if (labelProperty !== null) {
								postData[labelProperty] = $fieldRupCombo.rup_combo('label');
							}
						}
					});




					// Dependiendo del boton de guardado seleccionado se realiza el comportamiento correspondiente
					if (formEditSaveType === 'SAVE') {
						if (oper === 'edit') {
							$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modifyOK'), 'ok');
						} else {
							$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.insertOK'), 'ok');
						}
						settings.formEdit.$detailFormDiv.rup_dialog('close');
					} else if (formEditSaveType === 'SAVE_REPEAT') {
						if (oper === 'edit') {
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.modifyOK'), 'ok');
						} else {
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.insertOK'), 'ok');
						}
					}

					// Se obtiene el json de respuesta
					try {
						responseJson = $.parseJSON(res.responseText);
					} catch (e) {
						responseJson = postData;
					}

					// Tratamiento de la primary key compuesta
					if (settings.primaryKey && typeof settings.primaryKey === 'object' && settings.primaryKey.length > 1) {

						for (var i = 0; i < settings.primaryKey.length; i++) {
							compositeId += responseJson[settings.primaryKey[i]] + settings.multiplePkToken;
						}
						id = compositeId.substr(0, compositeId.length - 1);

					} else {
						id = responseJson[settings.primaryKey ? settings.primaryKey : $self[0].p.prmNames.id];
					}
					return [true, '', id];
				},
				'jqGridAddEditErrorTextFormat.rupTable.formEditing': function (event, data, oper) {
					var responseJSON;
					if (data.status === 406 && data.responseText !== '') {
						try {
							responseJSON = jQuery.parseJSON(data.responseText);
							if (responseJSON.rupErrorFields) {
								$self.rup_jqtable('showServerValidationFieldErrors', settings.formEdit.$detailForm, responseJSON);
							}
						} catch (e) {
							// El mensaje JSON
							$self.rup_jqtable('showFeedback', settings.$detailFeedback, data.responseText, 'error');
						}

					}
				},
				//				 "jqGridDblClickRow.rupTable.formEditing": function (event, rowid, iRow, iCol, e){
				//					$self.rup_jqtable('editElement', rowid);
				//				 },
				'jqGridAddEditBeforeShowForm.rupTable.formEditing': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings'),
						$title = jQuery('#ui-dialog-title-' + settings.formEdit.$detailFormDiv.attr('id'), settings.formEdit.$detailFormDiv.parent()),
						colModel = $self[0].p.colModel;

					// Se ocultan los errores de validación mostrados en el formulario de detalle
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					if (frmoper === 'add' || frmoper === 'clone' || frmoper === 'clone_clear') {
						$title.text(rp_ge[$self[0].p.id].addCaption);
						$('#pagination_' + settings.id + ',#pag_' + settings.id).hide();
					} else {
						$title.text(rp_ge[$self[0].p.id].editCaption);
						$('#pagination_' + settings.id + ',#pag_' + settings.id).show();
					}
				},
				'jqGridAddEditBeforeShowForm.rupTable.formEditing.readOnlyPks': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings'),
						colModel = $self[0].p.colModel;

					// Controlar los campos editables en modo edición
					for (var i = 0; i < colModel.length; i++) {

						if (settings.formEdit.ownFormEdit !== true || (settings.formEdit.ownFormEdit === true && (jQuery.inArray(colModel[i].name, settings.primaryKey) !== -1))) {
							if (frmoper === 'add' || frmoper === 'clone' || frmoper === 'clone_clear') {
								if (colModel[i].editableOnAdd === false) {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).attr('readonly', 'readonly');
								} else {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).removeAttr('readonly');
								}
							} else {
								if (colModel[i].editableOnEdit === false) {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).attr('readonly', 'readonly');
								} else {
									jQuery('[name=\'' + colModel[i].name + '\']', settings.formEdit.$detailFormDiv).removeAttr('readonly');
								}
							}

						}
					}
				},
				'jqGridAddEditAfterShowForm.rupTable.formEditing': function (event, $detailForm, frmoper) {
					var $self = $(this),
						settings = $self.data('settings');
					// Ubicamos el foco en el primer elemento del formulario
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					jQuery(':focusable:enabled:not([readonly]):first', $detailForm).focus();
				}
			});
		}
	});


	/**
     * Métodos públicos del plugin formEdit.
     *
     * Los métodos implementados son:
     *
     * createDetailNavigation(settings): Crea la barra de navegación del formulario de detalle.
     * deleteElement(rowId, options): Realiza el borrado de un registro determinado.
     * editElement(rowId, options): Lanza la edición de un registro medainte un formulario de detalle.
     * newElement(): Inicia el proceso de inserción de un nuevo registro.
     *
     * s($form): Oculta los mensaje de error visualizado en el
     *
     */
	jQuery.fn.rup_jqtable('extend', {
		/**
     * Devuelve la template HTML correspondiente a la capa de navegación del fomulario de filtrado.
     *
     * @function  createDetailNavigation
		 * @return {object} - Template correspondiente a la capa de navegación.
     * @example
     * $("#idTable").rup_jqtable("createDetailNavigation");
     */
		createDetailNavigation: function () {
			var $self = $(this);

			return $.proxy($self[0]._ADAPTER.createDetailNavigation, $self)();

		},
		/**
		 * Elimina el registro correspondiente al identificador indicado y utilizando las opciones de borrado especificadas.
		 *
		 * @function  deleteElement
		 * @param {string} rowId - Identificador del registro que se desea eliminar.
		 * @param {object} options - Opciones de configuración de la operación de borrado.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_deleteAfterSubmit
		 * @fires module:rup_jqtable#rupTable_afterDeleteRow
		 * @fires module:rup_jqtable#rupTable_beforeDeleteRow
		 * @example
		 * $("#idComponente").rup_jqtable("deleteElement", rowId, options);
		 */
		deleteElement: function (rowId, options) {
			var $self = this,
				settings = $self.data('settings'),
				deleteOptions = jQuery.extend(true, {}, settings.formEdit.deleteOptions, options),
				selectedRow = (rowId === undefined ? $self.rup_jqtable('getSelectedRows') : rowId);

			// En caso de especificarse el uso del método HTTP DELETE, se anyade el identificador como PathParameter
			if (selectedRow.length === 1) {
				if (deleteOptions.mtype === 'DELETE') {
					deleteOptions.url = settings.formEdit.editurl + '/' + $self.rup_jqtable('getPkUrl', selectedRow);
				}
			} else {
				deleteOptions.mtype = 'POST';
				deleteOptions.ajaxDelOptions.contentType = 'application/json';
				deleteOptions.ajaxDelOptions.type = 'POST';
				deleteOptions.ajaxDelOptions.dataType = 'json';
				deleteOptions.url = settings.formEdit.editurl + '/deleteAll';
				deleteOptions.serializeDelData = function (ts, postData) {
					return jQuery.toJSON({
						'core': {
							'pkToken': settings.multiplePkToken,
							'pkNames': settings.primaryKey
						},
						'multiselection': $self.rup_jqtable('getSelectedIds'),
						'filter': $self.rup_jqtable('getFilterParams')
					});
				};
			}

			deleteOptions.afterSubmit = function () {
				$self.triggerHandler('rupTable_deleteAfterSubmit');
				return true;
			};

			deleteOptions.afterComplete = function () {
				$self.triggerHandler('rupTable_afterDeleteRow');
			};

			if ($self.triggerHandler('rupTable_beforeDeleteRow', [deleteOptions, selectedRow]) !== false) {
				$self.jqGrid('delGridRow', selectedRow, deleteOptions);
			}

			return $self;
		},
		/**
		 * Edita el registro correspondiente al identificador indicado y utilizando las opciones de edición especificadas.
		 *
		 * @function  editElement
		 * @param {string} rowId - Identificador del registro que se desea editar.
		 * @param {object} options - Opciones de configuración de la operación de edición.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeEditRow
		 * @example
		 * $("#idComponente").rup_jqtable("editElement", rowId, options);
		 */
		editElement: function (rowId, options) {
			var $self = this,
				settings = $self.data('settings'),
				//				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);
				selectedRow = (rowId === undefined ? $.proxy(settings.getRowForEditing, $self)() : rowId),
				colModel = $self[0].p.colModel;

			if (selectedRow !== false) {

				// Controlar los campos editables en modo edición
				for (var i = 0; i < colModel.length; i++) {
					if (colModel[i].editable === true && colModel[i].editableOnEdit === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}

				if ($self.triggerHandler('rupTable_beforeEditRow', [settings.formEdit.editOptions, selectedRow]) !== false) {
					$self.jqGrid('editGridRow', selectedRow, settings.formEdit.editOptions);
				}
			}

			return $self;
		},
		/**
		 * Muestra el formulario de detalle para permitir al usuario insertar un nuevo registro.
		 *
		 * @function  newElement
		 * @param {boolean} addEvent - Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeAddRow.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeAddRow
		 * @example
		 * $("#idComponente").rup_jqtable("newElement", true);
		 */
		newElement: function (addEvent) {
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel,
				eventRet;

			// Controlar los campos editables en modo edición
			for (var i = 0; i < colModel.length; i++) {
				if (colModel[i].editable === true && colModel[i].editableOnAdd !== false) {
					if (colModel[i].editable === true && colModel[i].editableOnAdd === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if (addEvent === false || (addEvent !== false && $self.triggerHandler('rupTable_beforeAddRow', [settings.formEdit.addOptions]) !== false)) {
				$self.jqGrid('editGridRow', 'new', settings.formEdit.addOptions);
			}

			return $self;
		},
		/**
		 * Clona el registro correspondiente al identificador indicado y utilizando las opciones de clonado especificadas.
		 *
		 * @function  cloneElement
		 * @param {string} rowId - Identificador del registro que se desea clonar.
		 * @param {object} options - Opciones de configuración de la operación de clonado.
		 * @param {boolean} cloneEvent - Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeCloneRow.
		 * @return {object} - Referencia al propio objecto jQuery.
		 * @fires module:rup_jqtable#rupTable_beforeCloneRow
		 * @example
		 * $("#idComponente").rup_jqtable("cloneElement", rowId, options, cloneEvent);
		 */
		cloneElement: function (rowId, options, cloneEvent) {
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel,
				selectedRow = (rowId === undefined ? $.proxy(settings.getRowForEditing, $self)() : rowId);

			// Controlar los campos editables en modo edición
			for (var i = 0; i < colModel.length; i++) {
				if (colModel[i].editable === true && colModel[i].editableOnAdd !== false) {
					if (colModel[i].editable === true && colModel[i].editableOnAdd === false) {
						if (colModel[i].editoptions === undefined) {
							colModel[i].editoptions = {};
						}
						colModel[i].editoptions.readonly = 'readonly';
					} else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined) {
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if (cloneEvent === false || (cloneEvent !== false && $self.triggerHandler('rupTable_beforeCloneRow', [settings, selectedRow]) !== false)) {
				$self.jqGrid('editGridRow', 'cloned', settings.formEdit.addOptions);
				jQuery.proxy(jQuery.jgrid.fillData, $self[0])(selectedRow, $self[0], settings.formEdit.$detailForm, 'clone');
				jQuery('#id_g', settings.formEdit.$detailForm).val('_empty');
			}

			return $self;
		},
		/**
		 *  Oculta los mensajes de error del formulario indicado.
		 *
		 * @function  hideFormErrors
		 * @param {object} $form - Formulario del que se desea ocultar los mensajes de error.
		 * @example
		 * $("#idComponente").rup_jqtable("hideFormErrors", $form);
		 */
		hideFormErrors: function ($form) {
			var $self = this,
				settings = $self.data('settings');
			// Ocultamos el feedback de error
			if(settings.formEdit !== undefined && settings.formEdit.$feedback !== undefined){
				settings.formEdit.$feedback.hide();
			}
			if($form !== undefined){
				jQuery('.rup-maint_validateIcon', $form).remove();
				jQuery('input.error', $form).removeClass('error');
	
				if ($form.data('validator')){
					$form.rup_validate('resetElements');
				}
			}

		}
	});


	/**
     * Sobreescrituras del componente jqGrid
     */
	$.extend($.jgrid, {
		createData: function (rowid, obj, tb, maxcols) {
			/*ADD*/
			var $form = tb.parent();
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				nmId, nm, hc, trdata, cnt = 0,
				tmp, dc, elc, retpos = [],
				ind = false,
				// 			tdtmpl = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>", tmpl="", i;
				/*ADD*/
				tmpl = '<label class=\'CaptionTD\'></label>',
				i;

			for (i = 1; i <= maxcols; i++) {
				tb.append($('<div>')
					.attr('id', 'col_' + parseInt((parseInt(i, 10) || 1) * 2, 10))
					.addClass('floating_left_pad_right')
					.width((100 / maxcols) * 0.95 + '%')
				);
			}
			if (rowid != '_empty') {
				ind = $(obj).jqGrid('getInd', rowid);
			}

			$(obj.p.colModel).each(function (i) {
				nm = this.name;
				nmId = this.id;
				// hidden fields are included in the form
				if (this.editrules && this.editrules.edithidden === true) {
					hc = false;
				} else {
					hc = this.hidden === true ? true : false;
				}
				dc = hc ? 'style=\'display:none\'' : '';
				if (nm !== 'cb' && nm !== 'subgrid' && this.editable === true && nm !== 'rn') {
					if (ind === false) {
						tmp = '';
					} else {
						if (nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
							tmp = $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).text();
						} else {
							try {
								tmp = $.unformat.call(obj, $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]), {
									rowId: rowid,
									colModel: this
								}, i);
							} catch (_) {
								tmp = (this.edittype && this.edittype == 'textarea') ? $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).text() : $('td[role=\'gridcell\']:eq(' + i + ')', obj.rows[ind]).html();
							}
							if (!tmp || tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length == 1 && tmp.charCodeAt(0) == 160)) {
								tmp = '';
							}
						}
					}
					var opt = $.extend({}, this.editoptions || {}, {
							id: nmId,
							name: nm
						}),
						frmopt = $.extend({}, {
							elmprefix: '',
							elmsuffix: '',
							rowabove: false,
							rowcontent: ''
						}, this.formoptions || {}),
						rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
						cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
					if (rowid == '_empty' && opt.defaultValue) {
						tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
					}
					if (!this.edittype) {
						this.edittype = 'text';
					}
					if ($t.p.autoencode) {
						tmp = $.jgrid.htmlDecode(tmp);
					}
					elc = $.jgrid.createEl.call($t, this.edittype, opt, tmp, false, $.extend({}, $.jgrid.ajaxOptions, obj.p.ajaxSelectOptions || {}));
					if (tmp === '' && this.edittype == 'checkbox') {
						tmp = $(elc).attr('offval');
					}
					if (tmp === '' && this.edittype == 'select') {
						tmp = $('option:eq(0)', elc).text();
					}
					/* MODIFICADO */
					if (this.edittype === 'custom') {
						elc = $(elc).children()[0];
					}
					$(elc).addClass('FormElement');

					/* TODO : Permitir la personalización de los estilos de los campos de texto */
					//					if( $.inArray(this.edittype, ['text','textarea','password','select']) > -1) {
					//						$(elc).addClass("ui-widget-content ui-corner-all");
					//					}

					trdata = $(tb).find('tr[rowpos=' + rp + ']');
					if (frmopt.rowabove) {
						var newdata = $('<div><span class=\'contentinfo\'>' + frmopt.rowcontent + '</span></div>');
						$(tb).append(newdata);
						newdata[0].rp = rp;
					}
					if (trdata.length === 0) {
						/*MOD trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);*/
						trdata = $('<div ' + dc + ' rowpos=\'' + rp + '\'></div>').addClass('FormData floating_left_pad_right one-column').attr('id', 'tr_' + nm);
						/*MOD END */
						$(trdata).append(tmpl);
						$(tb).find('#col_' + cp).append(trdata);
						trdata[0].rp = rp;
					}
					var $formField = $('label', trdata[0]).attr('for', nmId).html(typeof frmopt.label === 'undefined' ? obj.p.colNames[i] : frmopt.label);
					$formField.parent().append(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
					retpos[cnt] = i;
					cnt++;
				}
			});
			if (cnt > 0) {
				/*MOD trdata var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD '><input class='FormElement' id='id_g' type='text' name='"+obj.p.id+"_id' value='"+rowid+"'/></td></tr>");*/
				var idrow = $('<div class=\'FormData\' style=\'display:none\'><span class=\'CaptionTD\'></span><span class=\'DataTD \'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\'' + obj.p.id + '_id\' value=\'' + rowid + '\'/></span></div>');
				idrow[0].rp = cnt + 999;
				$(tb).append(idrow);
				if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
					rp_ge[$t.p.id]._savedData[obj.p.id + '_id'] = rowid;
				}
			}
			return retpos;
		},
		fillDataClientSide: function (rowid, obj, fmid, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				nm, id, cnt = 0,
				tmp, fld, opt, vl, vlc;
			if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
				rp_ge[$t.p.id]._savedData = {};
				rp_ge[$t.p.id]._savedData[obj.p.id + '_id'] = rowid;
			}
			var cm = obj.p.colModel;
			if (rowid == '_empty') {
				$self.rup_jqtable('resetForm', settings.formEdit.$detailForm);
				$(cm).each(function () {
					nm = this.name;
					id = this.id !== undefined ? this.id : nm;
					opt = $.extend({}, this.editoptions || {});
					fld = $('#' + $.jgrid.jqID(id), settings.formEdit.$detailForm);

					if (fld.length === 0) {
						fld = $('[name=\'' + id + '\']', settings.formEdit.$detailForm);
					}

					if (fld && fld.length && fld[0] !== null) {
						vl = '';
						if (opt.defaultValue) {
							vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
							if (fld[0].type == 'checkbox' || fld[0].type == 'radio') {
								vlc = vl.toLowerCase();
								if (vlc.search(/(false|0|no|off|undefined)/i) < 0 && vlc !== '') {
									fld[0].checked = true;
									fld[0].defaultChecked = true;
									fld[0].value = vl;
								} else {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
								}
							} else {
								fld.val(vl);
							}
						} else {
							if (fld[0].type == 'checkbox' || fld[0].type == 'radio') {
								fld[0].checked = false;
								fld[0].defaultChecked = false;
								vl = $(fld).attr('offval');
							} else if (fld[0].type && fld[0].type.substr(0, 6) == 'select') {
								if (fld.attr('ruptype') === 'combo') {
									fld.rup_combo('reset');
								} else {
									fld[0].selectedIndex = 0;
								}
							} else {
								fld.val(vl);
							}
						}
						if (rp_ge[$t.p.id].checkOnSubmit === true || rp_ge[$t.p.id].checkOnUpdate) {
							rp_ge[$t.p.id]._savedData[nm] = vl;
						}
					}
				});
				$('#id_g', settings.formEdit.$detailForm).val(rowid);
				return;
			}
			var tre = $(obj).jqGrid('getInd', rowid, true);
			if (!tre) {
				return;
			}
			$('td[role="gridcell"]', tre).each(function (i) {
				nm = cm[i].name;
				id = this.id !== undefined ? this.id : nm;
				// hidden fields are included in the form
				if (nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable === true) {
					if (nm == obj.p.ExpandColumn && obj.p.treeGrid === true) {
						tmp = $(this).text();
					} else {
						try {
							tmp = $.unformat.call(obj, $(this), {
								rowId: rowid,
								colModel: cm[i]
							}, i);
						} catch (_) {
							tmp = cm[i].edittype == 'textarea' ? $(this).text() : $(this).html();
						}
					}
					if ($t.p.autoencode) {
						tmp = $.jgrid.htmlDecode(tmp);
					}
					if (rp_ge[$t.p.id].checkOnSubmit === true || rp_ge[$t.p.id].checkOnUpdate) {
						rp_ge[$t.p.id]._savedData[nm] = tmp;
					}
					nm = $.jgrid.jqID(nm);
					switch (cm[i].edittype) {
					case 'password':
					case 'text':
					case 'button':
					case 'image':
					case 'textarea':
						if (tmp == '&nbsp;' || tmp == '&#160;' || (tmp.length == 1 && tmp.charCodeAt(0) == 160)) {
							tmp = '';
						}
						$('#' + id, '#' + fmid).val(tmp);
						break;
					case 'select':
						var opv = tmp.split(',');
						opv = $.map(opv, function (n) {
							return $.trim(n);
						});
						$('#' + id + ' option', '#' + fmid).each(function () {
							if (!cm[i].editoptions.multiple && ($.trim(tmp) == $.trim($(this).text()) || opv[0] == $.trim($(this).text()) || opv[0] == $.trim($(this).val()))) {
								this.selected = true;
							} else if (cm[i].editoptions.multiple) {
								if ($.inArray($.trim($(this).text()), opv) > -1 || $.inArray($.trim($(this).val()), opv) > -1) {
									this.selected = true;
								} else {
									this.selected = false;
								}
							} else {
								this.selected = false;
							}
						});
						break;
					case 'checkbox':

						tmp = String(tmp);
						if (cm[i].editoptions && cm[i].editoptions.value) {
							var cb = cm[i].editoptions.value.split(':');
							if (cb[0] == tmp) {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', true);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', true); //ie
							} else {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', false);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', false); //ie
							}
						} else {
							tmp = tmp.toLowerCase();
							if (tmp.search(/(false|0|no|off|undefined)/i) < 0 && tmp !== '') {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', true);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', true); //ie
							} else {
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('checked', false);
								$('#' + id, '#' + fmid)[$t.p.useProp ? 'prop' : 'attr']('defaultChecked', false); //ie
							}
						}
						break;
					case 'custom':
						try {
							if (cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
								cm[i].editoptions.custom_value.call($t, $('#' + id, '#' + fmid), 'set', tmp);
							} else {
								throw 'e1';
							}
						} catch (e) {
							if (e == 'e1') {
								$.jgrid.info_dialog($.jgrid.errors.errcap, 'function \'custom_value\' ' + $.jgrid.edit.msg.nodefined, $.jgrid.edit.bClose);
							} else {
								$.jgrid.info_dialog($.jgrid.errors.errcap, e.message, $.jgrid.edit.bClose);
							}
						}
						break;
					}
					cnt++;
				}
			});
			if (cnt > 0) {
				$('#id_g', frmtb).val(rowid);
			}
		},
		fillDataServerSide: function (rowid, $form, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings'),
				postdata = {},
				$detailFormToPopulate = ($form !== undefined ? $form : settings.formEdit.$detailForm);

			if (rowid == '_empty') {
				$self.rup_jqtable('resetForm', settings.formEdit.$detailForm);

				$.proxy($.jgrid.getFormData, $t)(postdata, {});
				rp_ge[$t.p.id]._savedData = $.rup_utils.unnestjson(postdata);
				if (frmoper !== 'clone_clear') {
					$self.triggerHandler('jqGridAddEditAfterFillData', [$form, frmoper]);
				}
				$('#id_g', $form).val(rowid);
				return;
			}

			var ajaxOptions = $.extend({
				success: function (xhr, ajaxOptions) {
					var xhrArray;

					if (xhr.id && xhr.id instanceof Object) { //estamos en JPA
						if (xhr.id instanceof Object) { //es que estamos en jpa y traemos una clave compuesta
							xhr['JPA_ID'] = xhr.id;
							delete xhr.id;
						}
					}
					xhrArray = $.rup_utils.jsontoarray(xhr);

					$.rup_utils.populateForm(xhrArray, $detailFormToPopulate);

					rp_ge[$t.p.id]._savedData = $.rup_utils.unnestjson(xhr);
					rp_ge[$t.p.id]._savedData[settings.id + '_id'] = rowid;
					$('#id_g', $form).val(rowid);

					$self.triggerHandler('rupTable_afterFormFillDataServerSide', [xhr, $detailFormToPopulate, ajaxOptions]);

				},
				error: function (xhr, ajaxOptions, thrownError) {
					settings.$feedback.rup_feedback('option', 'delay', null);
					settings.$feedback.rup_feedback('set', xhr.responseText, 'error');
					settings.$feedback.rup_feedback('option', 'delay', 1000);
				}
			}, settings.formEdit.detailOptions.ajaxDetailOptions);

			ajaxOptions.url += '/' + $self.rup_jqtable('getPkUrl', rowid);
			$.when($.rup_ajax(ajaxOptions)).then(function (success, statusText, xhr) {
				$self.triggerHandler('jqGridAddEditAfterFillData', [$form, frmoper]);
			});
		},
		fillData: function (rowid, obj, fmid, frmoper) {
			var $t = this,
				$self = $($t),
				settings = $self.data('settings');

			//switch ((rowid == '_empty'?"clientSide":settings.formEdit.editOptions.fillDataMethod)){
			switch (settings.formEdit.editOptions.fillDataMethod) {
			case 'clientSide':
				$.proxy($.jgrid.fillDataClientSide, $t)(rowid, obj, fmid, frmoper);
				break;
			case 'serverSide':
			default:
				$.proxy($.jgrid.fillDataServerSide, $t)(rowid, settings.formEdit.$detailForm, frmoper);
				break;
			}
		},
		getFormData: function (postdata, extpost) {
			var $t = this,
				$self = $(this),
				settings = $self.data('settings'),
				formParams;

			formParams = form2object(settings.formEdit.$detailForm[0], null, false);

			jQuery.extend(true, postdata, formParams);

			return true;

		},
		postIt: function (postdata, extpost, frmoper) {
			var $t = this,
				self = $t,
				$self = jQuery(self),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				copydata, ret = [true, '', ''],
				onCS = {},
				opers = $t.p.prmNames,
				idname, oper, key, selr, i;

			var retvals = $($t).triggerHandler('jqGridAddEditBeforeCheckValues', [$('#' + frmgr), frmoper]);
			if (retvals && typeof retvals === 'object') {
				postdata = retvals;
			}

			if ($.isFunction(rp_ge[$t.p.id].beforeCheckValues)) {
				retvals = rp_ge[$t.p.id].beforeCheckValues.call($t, postdata, $('#' + frmgr), postdata[$t.p.id + '_id'] == '_empty' ? opers.addoper : opers.editoper);
				if (retvals && typeof retvals === 'object') {
					postdata = retvals;
				}
			}
			for (key in postdata) {
				if (postdata.hasOwnProperty(key)) {
					ret = $.jgrid.checkValues.call($t, postdata[key], key, $t);
					if (ret[0] === false) {
						break;
					}
				}
			}
			$.proxy($.jgrid.setNulls, $t)();
			if (ret[0]) {
				onCS = $($t).triggerHandler('jqGridAddEditClickSubmit', [rp_ge[$t.p.id], postdata, frmoper]);
				if (onCS === undefined && $.isFunction(rp_ge[$t.p.id].onclickSubmit)) {
					onCS = rp_ge[$t.p.id].onclickSubmit.call($t, rp_ge[$t.p.id], postdata) || {};
				}
				ret = $($t).triggerHandler('jqGridAddEditBeforeSubmit', [postdata, $('#' + frmgr), frmoper]);
				if (ret === undefined) {
					ret = [true, '', ''];
				}
				if (ret[0] && $.isFunction(rp_ge[$t.p.id].beforeSubmit)) {
					ret = rp_ge[$t.p.id].beforeSubmit.call($t, postdata, $('#' + frmgr));
				}
			}

			//			if(ret[0] && !rp_ge[$t.p.id].processing) {
			if (ret[0]) {
				rp_ge[$t.p.id].processing = true;
				$('#sData', frmtb + '_2').addClass('ui-state-active');
				oper = opers.oper;
				idname = opers.id;
				// we add to pos data array the action - the name is oper
				postdata[oper] = ($.trim(postdata[$t.p.id + '_id']) == '_empty') ? opers.addoper : opers.editoper;
				if (postdata[oper] != opers.addoper) {
					postdata[idname] = postdata[$t.p.id + '_id'];
				} else {
					// check to see if we have allredy this field in the form and if yes lieve it
					if (postdata[idname] === undefined) {
						postdata[idname] = postdata[$t.p.id + '_id'];
					}
				}
				delete postdata[$t.p.id + '_id'];
				postdata = $.extend(postdata, rp_ge[$t.p.id].editData, onCS);
				if ($t.p.treeGrid === true) {
					if (postdata[oper] == opers.addoper) {
						selr = $($t).jqGrid('getGridParam', 'selrow');
						var tr_par_id = $t.p.treeGridModel == 'adjacency' ? $t.p.treeReader.parent_id_field : 'parent_id';
						postdata[tr_par_id] = selr;
					}
					for (i in $t.p.treeReader) {
						if ($t.p.treeReader.hasOwnProperty(i)) {
							var itm = $t.p.treeReader[i];
							if (postdata.hasOwnProperty(itm)) {
								if (postdata[oper] == opers.addoper && i === 'parent_id_field') {
									continue;
								}
								delete postdata[itm];
							}
						}
					}
				}

				postdata[idname] = $.jgrid.stripPref($t.p.idPrefix, postdata[idname]);
				var ajaxOptions = $.extend({
					url: rp_ge[$t.p.id].url || $($t).jqGrid('getGridParam', 'editurl'),
					type: rp_ge[$t.p.id].mtype,
					data: $.isFunction(rp_ge[$t.p.id].serializeEditData) ? rp_ge[$t.p.id].serializeEditData.call($t, postdata) : postdata,
					complete: function (data, status) {
						var key, xhr;
						postdata[idname] = $t.p.idPrefix + postdata[idname];
						if (status != 'success') {
							ret[0] = false;
							ret[1] = $($t).triggerHandler('jqGridAddEditErrorTextFormat', [data, frmoper]);
							if ($.isFunction(rp_ge[$t.p.id].errorTextFormat)) {
								ret[1] = rp_ge[$t.p.id].errorTextFormat.call($t, data);
							} else {
								ret[1] = status + ' Status: \'' + data.statusText + '\'. Error code: ' + data.status;
							}
						} else {
							// data is posted successful
							// execute aftersubmit with the returned data from server
							ret = $($t).triggerHandler('jqGridAddEditAfterSubmit', [data, postdata, frmoper]);
							if (ret === undefined) {
								ret = [true, '', ''];
							}
							if (ret[0] && $.isFunction(rp_ge[$t.p.id].afterSubmit)) {
								ret = rp_ge[$t.p.id].afterSubmit.call($t, data, postdata);
							}
						}
						if (ret[0] === false) {
							$('#' + settings.formEdit.feedbackId + '>td', frmtb).html(ret[1]);
							$('#' + settings.formEdit.feedbackId, frmtb).show();
						} else {
							// remove some values if formattaer select or checkbox
							xhr = $.parseJSON(data.responseText);
							$.each($t.p.colModel, function () {
								if (extpost[this.name] && this.formatter && this.formatter == 'select') {
									try {
										delete extpost[this.name];
									} catch (e) {}
								}
								if (this.formatter == 'checkbox' && postdata[this.name] == undefined) {
									postdata[this.name] = null;
								}
								if (this.formatter && (this.formatter !== 'checkbox' && this.formatter !== 'select')) {
									if (postdata[this.name] === undefined) {
										postdata[this.name] = this.formatter.call($($t), ret[2], undefined, xhr, postdata[oper]);
									}
								}
								if (this.formatterOnUpdate) {
									postdata[this.name] = this.formatterOnUpdate.call($($t), $('#' + frmgr));
								}
								if (this.updateFromDetail) {
									postdata[this.name] = this.updateFromDetail.call($($t), $('#' + frmgr));
								}
							});
							postdata = $.extend(postdata, extpost);
							if ($t.p.autoencode) {
								$.each(postdata, function (n, v) {
									postdata[n] = $.jgrid.htmlDecode(v);
								});
							}
							//rp_ge[$t.p.id].reloadAfterSubmit = rp_ge[$t.p.id].reloadAfterSubmit && $t.p.datatype != "local";
							// the action is add
							if (postdata[oper] == opers.addoper) {
								//id processing
								// user not set the id ret[2]
								if (!ret[2]) {
									ret[2] = $.jgrid.randId();
								}
								postdata[idname] = ret[2];
								if (rp_ge[$t.p.id].closeAfterAdd) {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
											$($t).jqGrid('setSelection', ret[2]);
										}
									}
									$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
										gb: '#gbox_' + $.jgrid.jqID(gID),
										jqm: rp_ge[$t.p.id].jqModal,
										onClose: rp_ge[$t.p.id].onClose
									});
								} else if (rp_ge[$t.p.id].clearAfterAdd) {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
											// TODO : Añadido para que seleccione el registro insertado. Tratar de hacerlo en el evento jqGridAfterInsertRow
											$($t).jqGrid('setSelection', ret[2]);
										}
									}
									$.proxy($.jgrid.fillData, $t)('_empty', $t, frmgr);
								} else {
									if (rp_ge[$t.p.id].reloadAfterSubmit) {
										$($t).trigger('reloadGrid');
									} else {
										if ($t.p.treeGrid === true) {
											$($t).jqGrid('addChildNode', ret[2], selr, postdata);
										} else {
											$($t).jqGrid('addRowData', ret[2], postdata, rp_ge[$t.p.id].addedrow);
										}
									}
								}
							} else {
								// the action is update
								if (rp_ge[$t.p.id].reloadAfterSubmit) {
									$($t).trigger('reloadGrid');
									if (!rp_ge[$t.p.id].closeAfterEdit) {
										setTimeout(function () {
											$($t).jqGrid('setSelection', postdata[idname]);
										}, 1000);
									}
								} else {
									if ($t.p.treeGrid === true) {
										$($t).jqGrid('setTreeRow', postdata[idname], postdata);
									} else {
										$($t).jqGrid('setRowData', postdata[idname], postdata);
									}
								}
								if (rp_ge[$t.p.id].closeAfterEdit) {
									$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
										gb: '#gbox_' + $.jgrid.jqID(gID),
										jqm: rp_ge[$t.p.id].jqModal,
										onClose: rp_ge[$t.p.id].onClose
									});
								}
							}
							if ($.isFunction(rp_ge[$t.p.id].afterComplete)) {
								copydata = data;
								setTimeout(function () {
									$($t).triggerHandler('jqGridAddEditAfterComplete', [copydata, postdata, $('#' + frmgr), frmoper]);
									rp_ge[$t.p.id].afterComplete.call($t, copydata, postdata, $('#' + frmgr));
									copydata = null;
								}, 500);
							}
							if (rp_ge[$t.p.id].checkOnSubmit || rp_ge[$t.p.id].checkOnUpdate) {
								$('#' + frmgr).data('disabled', false);
								if (rp_ge[$t.p.id]._savedData[$t.p.id + '_id'] != '_empty') {
									for (key in rp_ge[$t.p.id]._savedData) {
										if (rp_ge[$t.p.id]._savedData.hasOwnProperty(key) && postdata[key]) {
											rp_ge[$t.p.id]._savedData[key] = postdata[key];
										}
									}
								}
							}
						}
						rp_ge[$t.p.id].processing = false;
						$('#sData', frmtb + '_2').removeClass('ui-state-active');
						try {
							$(':input:visible', '#' + frmgr)[0].focus();
						} catch (e) {}
					}
				}, $.jgrid.ajaxOptions, rp_ge[$t.p.id].ajaxEditOptions);

				if (!ajaxOptions.url && !rp_ge[$t.p.id].useDataProxy) {
					if ($.isFunction($t.p.dataProxy)) {
						rp_ge[$t.p.id].useDataProxy = true;
					} else {
						ret[0] = false;
						ret[1] += ' ' + $.jgrid.errors.nourl;
					}
				}
				if (ret[0]) {
					if (rp_ge[$t.p.id].useDataProxy) {
						var dpret = $t.p.dataProxy.call($t, ajaxOptions, 'set_' + $t.p.id);
						if (dpret === undefined) {
							dpret = [true, ''];
						}
						if (dpret[0] === false) {
							ret[0] = false;
							ret[1] = dpret[1] || 'Error deleting the selected row!';
						} else {
							if (ajaxOptions.data.oper == opers.addoper && rp_ge[$t.p.id].closeAfterAdd) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: rp_ge[$t.p.id].jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
							if (ajaxOptions.data.oper == opers.editoper && rp_ge[$t.p.id].closeAfterEdit) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: rp_ge[$t.p.id].jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
						}
					} else {
						$.ajax(ajaxOptions);
					}
				}
			}
			if (ret[0] === false) {
				$('#' + settings.formEdit.feedbackId + '>td', frmtb).html(ret[1]);
				$('#' + settings.formEdit.feedbackId, frmtb).show();
				// return;
			}
		},
		setNulls: function () {
			var $t = this, postdata;
			$.each($t.p.colModel, function (i, n) {
				if (n.editoptions && n.editoptions.NullIfEmpty === true) {
					if (postdata.hasOwnProperty(n.name) && postdata[n.name] === '') {
						postdata[n.name] = 'null';
					}
				}
			});

		},
		compareData: function (nObj, oObj) {
			var ret = false,
				key,
				unnestNObj = jQuery.rup_utils.unnestjson(nObj),
				unnestOObj = jQuery.rup_utils.unnestjson(oObj);

			for (key in unnestNObj) {
				if (unnestNObj.hasOwnProperty(key) && String(unnestNObj[key]) !== String(unnestOObj[key])) {
					ret = true;
					// Descomentar para debug
					//					console.log(" Compare data: "+ key+ " new: "+String(unnestNObj[key]) + " old: "+String(unnestOObj[key]));
					break;
				}
			}
			return ret;
		},
		checkUpdates: function (extpost, okCallback) {
			var $self = $(this),
				settings = $self.data('settings'),
				postdata, newData,
				$t = this,
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				stat = true,
				diff = false;
			//			$("#"+settings.formEdit.feedbackId,frmtb).hide();
			if (rp_ge[$t.p.id].checkOnUpdate) {
				postdata = {};
				extpost = {};
				$.proxy($.jgrid.getFormData, $t)(postdata, extpost);
				newData = $.extend({}, postdata, extpost);

				if (settings.formEdit.addEditOptions.defaultCompareData === true) {
					diff = $.proxy($.jgrid.compareData, $t)(newData, rp_ge[$t.p.id]._savedData);
				}

				var compareDataEvent = jQuery.Event('rupTable_formEditCompareData');
				compareDataEvent.isDifferent = diff;

				$self.triggerHandler(compareDataEvent, [rp_ge[$t.p.id]._savedData, newData]);

				if (compareDataEvent.isDifferent) {
					$.rup_messages('msgConfirm', {
						message: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.saveAndContinue'),
						title: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.changes'),
						OKFunction: function () {

							if (jQuery.isFunction(okCallback)) {
								jQuery.proxy(okCallback, $self)();
							}
						}
					});
					//					$("#"+frmgr).data("disabled",true);
					//					$(".confirm","#"+IDs.themodal).show();
					stat = false;
				}
			}
			return stat;
		},
		restoreInline: function (rowid) {
			var $t = this,
				i;
			if (rowid !== '_empty' && typeof ($t.p.savedRow) !== 'undefined' && $t.p.savedRow.length > 0 && $.isFunction($.fn.jqGrid.restoreRow)) {
				for (i = 0; i < $t.p.savedRow.length; i++) {
					if ($t.p.savedRow[i].id == rowid) {
						$($t).jqGrid('restoreRow', rowid);
						break;
					}
				}
			}
		},
		getCurrPos: function () {
			var $t = this,
				$self = $(this),
				settings = $self.data('settings'),
				gID = $t.p.id,
				frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
				frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
				frmtb = '#' + $.jgrid.jqID(frmtborg),
				rowsInGrid = $($t).jqGrid('getDataIDs'),
				idGval = $('#id_g', settings.formEdit.$detailForm).val(),
				selrow = idGval !== undefined && idGval !== '_empty' ? idGval : $self.jqGrid('getGridParam', 'selrow'),
				pos = $.inArray(selrow, rowsInGrid);

			return [pos, rowsInGrid];
		},
		updateNav: function (cr, posarr) {
			var $self = $(this),
				totr;
			if (posarr !== undefined && posarr[1] !== undefined) {
				totr = posarr[1].length - 1;
				if (cr === 0) {
					$('#pData', frmtb + '_2').addClass('ui-state-disabled');
				} else if (posarr[1][cr - 1] !== undefined && $('#' + $.jgrid.jqID(posarr[1][cr - 1])).hasClass('ui-state-disabled')) {
					$('#pData', frmtb + '_2').addClass('ui-state-disabled');
				} else {
					$('#pData', frmtb + '_2').removeClass('ui-state-disabled');
				}

				if (cr == totr) {
					$('#nData', frmtb + '_2').addClass('ui-state-disabled');
				} else if (posarr[1][cr + 1] !== undefined && $('#' + $.jgrid.jqID(posarr[1][cr + 1])).hasClass('ui-state-disabled')) {
					$('#nData', frmtb + '_2').addClass('ui-state-disabled');
				} else {
					$('#nData', frmtb + '_2').removeClass('ui-state-disabled');
				}
			}
			$self.rup_jqtable('updateDetailPagination');
		}
	});


	/*
     * MODIFICACIONES
     * Funciones extendidas (MODIFICADAS) del componente jqGrid.
     *
     * Los métodos aquí indicados han sido extendidos partiendo de la implementación original.
     * Las modificaciones han sido realizadas debido a la incompatibilidad de su implementación con los requisitos exigidos.
     *
     * Los métodos extendidos para su modificación son los siguientes:
     *
     * - editGridRow
     */
	$.jgrid.extend({
		editGridRow: function (rowid, p) {
			p = $.extend({
				top: 0,
				left: 0,
				width: 300,
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				url: null,
				mtype: 'POST',
				clearAfterAdd: true,
				closeAfterEdit: false,
				reloadAfterSubmit: true,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons: null,
				afterclickPgButtons: null,
				editData: {},
				recreateForm: false,
				jqModal: true,
				closeOnEscape: false,
				addedrow: 'first',
				topinfo: '',
				bottominfo: '',
				saveicon: [],
				closeicon: [],
				savekey: [false, 13],
				navkeys: [false, 38, 40],
				checkOnSubmit: false,
				checkOnUpdate: false,
				_savedData: {},
				processing: false,
				onClose: null,
				ajaxEditOptions: {},
				serializeEditData: null,
				viewPagerButtons: true
			}, $.jgrid.edit, p || {});
			rp_ge[$(this)[0].p.id] = p;
			return this.each(function () {
				var $t = this,
					$self = $($t),
					settings = $self.data('settings');
				if (!$t.grid || !rowid) {
					return;
				}
				var gID = $t.p.id,
					frmgr = $.fn.jqGrid.rup.edit.detail.detailFormId + gID,
					frmtborg = $.fn.jqGrid.rup.edit.detail.detailBodyId + gID,
					frmtb = '#' + $.jgrid.jqID(frmtborg),
					IDs = {
						themodal: $.fn.jqGrid.rup.edit.detail.detailDivId + gID,
						modalhead: 'edithd' + gID,
						modalcontent: 'editcnt' + gID,
						scrollelm: frmgr
					},
					onBeforeShow = $.isFunction(rp_ge[$t.p.id].beforeShowForm) ? rp_ge[$t.p.id].beforeShowForm : false,
					onAfterShow = $.isFunction(rp_ge[$t.p.id].afterShowForm) ? rp_ge[$t.p.id].afterShowForm : false,
					onBeforeInit = $.isFunction(rp_ge[$t.p.id].beforeInitData) ? rp_ge[$t.p.id].beforeInitData : false,
					onInitializeForm = $.isFunction(rp_ge[$t.p.id].onInitializeForm) ? rp_ge[$t.p.id].onInitializeForm : false,
					showFrm = true,
					maxCols = 1,
					maxRows = 0,
					postdata, extpost, newData, diff, frmoper;
				frmgr = $.jgrid.jqID(frmgr);
				if (rowid === 'new') {
					rowid = '_empty';
					frmoper = 'add';
					p.caption = rp_ge[$t.p.id].addCaption;
				} else if (rowid === 'cloned') {
					p.caption = rp_ge[$t.p.id].addCaption;
					rowid = '_empty';
					frmoper = 'clone_clear';
				} else {
					p.caption = rp_ge[$t.p.id].editCaption;
					frmoper = 'edit';
				}
				settings.opermode = frmoper;
				//				if(p.recreateForm===true && $("#"+$.jgrid.jqID(IDs.themodal))[0] !== undefined) {
				//					$("#"+$.jgrid.jqID(IDs.themodal)).remove();
				//				}
				if (p.recreateForm === true && settings.formEdit.detailFormCreated === true) {
					settings.formEdit.$detailFormDiv.remove();
				}

				var closeovrl = true;
				if (p.checkOnUpdate && p.jqModal && !p.modal) {
					closeovrl = false;
				}

				if (settings.formEdit.detailFormCreated === true) {
					IDs.themodal = settings.formEdit.$detailFormDiv.attr('id');
					showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (showFrm === undefined) {
						showFrm = true;
					}
					if (showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
					if (showFrm === false) {
						return;
					}
					$.proxy($.jgrid.restoreInline, $t)(rowid);
					$('.ui-jqdialog-title', '#' + $.jgrid.jqID(IDs.modalhead)).html(p.caption);
					$('#' + settings.formEdit.feedbackId, frmtb).hide();
					if (rp_ge[$t.p.id].topinfo) {
						$('.topinfo', frmtb).html(rp_ge[$t.p.id].topinfo);
						$('.tinfo', frmtb).show();
					} else {
						$('.tinfo', frmtb).hide();
					}
					if (rp_ge[$t.p.id].bottominfo) {
						$('.bottominfo', frmtb + '_2').html(rp_ge[$t.p.id].bottominfo);
						$('.binfo', frmtb + '_2').show();
					} else {
						$('.binfo', frmtb + '_2').hide();
					}
					$.proxy($.jgrid.fillData, $t)(rowid, $t, frmgr, frmoper);
					///
					if (rowid == '_empty' || !rp_ge[$t.p.id].viewPagerButtons) {
						$('#pData, #nData', frmtb + '_2').hide();
					} else {
						$('#pData, #nData', frmtb + '_2').show();
					}
					if (rp_ge[$t.p.id].processing === true) {
						rp_ge[$t.p.id].processing = false;
						$('#sData', frmtb + '_2').removeClass('ui-state-active');
					}
					if ((settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)).data('disabled') === true) {
						$('.confirm', '#' + $.jgrid.jqID(IDs.themodal)).hide();
						(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)).data('disabled', false);
					}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (onBeforeShow) {
						onBeforeShow.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
					$('#' + $.jgrid.jqID(IDs.themodal)).data('onClose', rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#' + $.jgrid.jqID(IDs.themodal), {
						gbox: '#gbox_' + $.jgrid.jqID(gID),
						jqm: p.jqModal,
						jqM: false,
						overlay: p.overlay,
						modal: p.modal
					});
					if (!closeovrl) {
						$('.jqmOverlay').click(function () {
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [(settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)), frmoper]);
					if (onAfterShow) {
						onAfterShow.call($t, (settings.formEdit.$detailForm ? settings.formEdit.$detailForm : $('#' + frmgr)));
					}
				} else {
					var dh = isNaN(p.dataheight) ? p.dataheight : p.dataheight + 'px',
						dw = isNaN(p.datawidth) ? p.datawidth : p.datawidth + 'px',
						frm = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.form', frmgr, dh)).data('disabled', false),
						tbl = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.body', frmtborg)),
						showFrm = $($t).triggerHandler('jqGridAddEditBeforeInitData', [$('#' + frmgr), frmoper]), flr;
					if (typeof (showFrm) == 'undefined') {
						showFrm = true;
					}
					if (showFrm && onBeforeInit) {
						showFrm = onBeforeInit.call($t, $('#' + frmgr));
					}
					if (showFrm === false) {
						return;
					}
					$.proxy($.jgrid.restoreInline, $t)(rowid);
					$($t.p.colModel).each(function () {
						var fmto = this.formoptions;
						maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
						maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
					});
					$(frm).append(tbl);
					flr = $(jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.detailForm.errorFeedback', settings.formEdit.feedbackId));
					flr[0].rp = 0;
					$(tbl).append(flr);
					/* ADD	*/
					flr = $('<div class=\'tinfo\' style=\'display:none\'><span class=\'topinfo\'>' + rp_ge[$t.p.id].topinfo + '</span></div>');
					/*MOD END*/
					flr[0].rp = 0;
					$(tbl).append(flr);
					// set the id.
					// use carefull only to change here colproperties.
					// create data
					var rtlb = $t.p.direction == 'rtl' ? true : false,
						bp = rtlb ? 'nData' : 'pData',
						bn = rtlb ? 'pData' : 'nData';
					/* DEL				createData(rowid,$t,tbl,maxCols); */
					if (settings.formEdit.$detailForm === undefined) {
						settings.formEdit.$detailForm = tbl.parent();
						$.proxy($.jgrid.createData, $t)(rowid, $t, tbl, maxCols);
					} else {
						settings.formEdit.$detailForm.append($('<div class=\'FormData\' style=\'display:none\'><span class=\'CaptionTD\'></span><span class=\'DataTD \'><input class=\'FormElement\' id=\'id_g\' type=\'text\' name=\'' + $t.p.id + '_id\' value=\'' + rowid + '\'/></span></div>'));
					}


					frm = settings.formEdit.$detailForm[0];

					$.proxy($.jgrid.fillData, $t)(rowid, $t, frmgr, frmoper);


					// buttons at footer
					var bP = '<a href=\'javascript:void(0)\' id=\'' + bp + '\' class=\'fm-button ui-state-default ui-corner-left\'><span class=\'ui-icon ui-icon-triangle-1-w\'></span></a>',
						bN = '<a href=\'javascript:void(0)\' id=\'' + bn + '\' class=\'fm-button ui-state-default ui-corner-right\'><span class=\'ui-icon ui-icon-triangle-1-e\'></span></a>',
						bS = '<a href=\'javascript:void(0)\' id=\'sData\' class=\'fm-button ui-state-default ui-corner-all\'>' + p.bSubmit + '</a>',
						bC = '<a href=\'javascript:void(0)\' id=\'cData\' class=\'fm-button ui-state-default ui-corner-all\'>' + p.bCancel + '</a>';
					var bt = '<table border=\'0\' cellspacing=\'0\' cellpadding=\'0\' class=\'EditTable\' id=\'' + frmtborg + '_2\'><tbody><tr><td colspan=\'2\'><hr class=\'ui-widget-content\' style=\'margin:1px\'/></td></tr><tr id=\'Act_Buttons\'><td class=\'navButton\'>' + (rtlb ? bN + bP : bP + bN) + '</td><td class=\'EditButton\'>' + bS + bC + '</td></tr>';
					bt += '<tr style=\'display:none\' class=\'binfo\'><td class=\'bottominfo\' colspan=\'2\'>' + rp_ge[$t.p.id].bottominfo + '</td></tr>';
					bt += '</tbody></table>';

					/*
                     * MODIFICADO POR UDA.
                     * Adaptar la ordenación a la nueva disposición mediante divs en vez de table.
                     */
					if (settings.formEdit.ownFormEdit === false) {

						if (maxRows > 0) {
							for (var i = 1; i <= maxCols; i++) {
								// Por cada columna
								var $colLayer = tbl.find('#col_' + parseInt((parseInt(i, 10) || 1) * 2, 10));
								var sd = [];
								$.each($colLayer.find('div'), function (i, r) {
									sd[i] = r;
								});
								sd.sort(function (a, b) {
									if (a.rp > b.rp) {
										return 1;
									}
									if (a.rp < b.rp) {
										return -1;
									}
									return 0;
								});
								$.each(sd, function (index, row) {
									$colLayer.append(row);
								});
							}
						}
					}
					/*
                     * FIN MODIFICACION
                     */

					p.gbox = '#gbox_' + $.jgrid.jqID(gID);
					var cle = false;
					if (p.closeOnEscape === true) {
						p.closeOnEscape = false;
						cle = true;
					}

					/*
                     * MODIFICADO POR UDA
                     * Añadida barra de navegación entre elementos
                     */

					var barraNavegacion = $self.rup_jqtable('createDetailNavigation'),
						tms;




					function saveData() {
						postdata = {};
						extpost = {};
						$('#' + settings.formEdit.feedbackId, frmtb).hide();

						// all depend on ret array
						//ret[0] - succes
						//ret[1] - msg if not succes
						//ret[2] - the id  that will be set if reload after submit false
						$.proxy($.jgrid.getFormData, $t)(postdata);
						if (postdata[$t.p.id + '_id'] == '_empty') {
							$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
						} else if (p.checkOnSubmit === true) {
							newData = $.extend({}, postdata, extpost);
							diff = compareData(newData, rp_ge[$t.p.id]._savedData);
							if (diff) {
								$('#' + frmgr).data('disabled', true);
								$('.confirm', '#' + $.jgrid.jqID(IDs.themodal)).show();
							} else {
								$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
							}
						} else {
							$.proxy($.jgrid.postIt, $t)(postdata, extpost, settings.opermode);
						}
						return false;
					}

					function fncSaveButton() {
						$self.data('tmp.formEditSaveType', 'SAVE');
						if (!saveData()) {
							return false;
						}
					}

					function fncSaveAndRepeatButton() {
						$self.data('tmp.formEditSaveType', 'SAVE_REPEAT');
						if (!saveData()) {
							return false;
						}
					}

					function fncCancelLink() {
						if (!$.proxy($.jgrid.checkUpdates, $t)(extpost, function () {
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
						})) {
							return false;
						}
						$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
							gb: '#gbox_' + $.jgrid.jqID(gID),
							jqm: p.jqModal,
							onClose: rp_ge[$t.p.id].onClose
						});
						return false;
					}

					if (settings.formEdit.ownFormEdit === true) {
						if (!settings.formEdit.$detailFormDiv.is(':visible')) {
							settings.formEdit.$detailFormDiv.show();
						}


						/* TODO : Añadir los parametros de configruación que puedan añadirse al rup_dialog. */
						settings.formEdit.$detailFormDiv.rup_dialog($.extend({}, {
							type: $.rup.dialog.DIV,
							autoOpen: false,
							modal: true,
							resizable: p.resize,
							title: p.caption,
							width: p.width
						}, settings.formEdit.dialogOptions));

						settings.formEdit.detailFormCreated = true;
						settings.formEdit.$navigationBar.append(barraNavegacion);

						if (settings.formEdit.$saveButton.length > 0) {
							settings.formEdit.$saveButton.button().click(function () {
								jQuery.proxy(fncSaveButton, $self)();
							});
						}
						if (settings.formEdit.$saveRepeatButton.length > 0) {
							settings.formEdit.$saveRepeatButton.button().click(function () {
								jQuery.proxy(fncSaveAndRepeatButton, $self)();
							});
						}
						if (settings.formEdit.$cancelButton.length > 0) {
							settings.formEdit.$cancelButton.on('click', function () {
								jQuery.proxy(fncCancelLink, $self)();
							});
						}

						if (!jQuery.isFunction(p.onClose)) {
							p.onClose = fncCancelLink;
						}

						jQuery('.ui-dialog-titlebar-close, a:has(#closeText_' + settings.formEdit.$detailFormDiv.first()[0].id + ')', settings.formEdit.$detailFormDiv.parent()).off('click').on('click', function (event) {
							p.onClose.call(event);
						});

						IDs.themodal = settings.formEdit.$detailFormDiv.attr('id');
					} else {
						var tms = barraNavegacion.after(frm);
						var saveButton = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.save'),
							click: fncSaveButton
						};

						var saveAndRepeatButton = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.save_repeat'),
							click: fncSaveAndRepeatButton
						};

						var cancelLink = {
							text: $.rup.i18nParse($.rup.i18n.base, 'rup_global.cancel'),
							btnType: $.rup.dialog.LINK,
							click: fncCancelLink
						};

						p.buttons = [saveButton, saveAndRepeatButton, cancelLink];
						p.onClose = fncCancelLink;

						$.jgrid.createModal(IDs, tms, p, '#gview_' + $.jgrid.jqID($t.p.id), $('#gbox_' + $.jgrid.jqID($t.p.id))[0]);
						settings.formEdit.detailFormCreated = true;
					}

					if (settings.formEdit.$detailFormDiv === undefined) {
						settings.formEdit.$detailFormDiv = $('#' + $.jgrid.jqID(IDs.themodal));
					}

					/*
                     * Creacion rup_form
                     */

					if (rtlb) {
						$('#pData, #nData', frmtb + '_2').css('float', 'right');
						$('.EditButton', frmtb + '_2').css('text-align', 'left');
					}
					if (rp_ge[$t.p.id].topinfo) {
						$('.tinfo', frmtb).show();
					}
					if (rp_ge[$t.p.id].bottominfo) {
						$('.binfo', frmtb + '_2').show();
					}
					tms = null;
					bt = null;
					$('#' + $.jgrid.jqID(IDs.themodal)).keydown(function (e) {
						var wkey = e.target;
						if ($('#' + frmgr).data('disabled') === true) {
							return false;
						} //??
						if (rp_ge[$t.p.id].savekey[0] === true && e.which == rp_ge[$t.p.id].savekey[1]) { // save
							if (wkey.tagName != 'TEXTAREA') {
								$('#sData', frmtb + '_2').trigger('click');
								return false;
							}
						}
						if (e.which === 27) {
							/* DEL 						if(!checkUpdates()) {return false;} */
							/* ADD */
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							if (cle) {
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: p.gbox,
									jqm: p.jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
							}
							return false;
						}
						if (rp_ge[$t.p.id].navkeys[0] === true) {
							if ($('#id_g', frmtb).val() == '_empty') {
								return true;
							}
							if (e.which == rp_ge[$t.p.id].navkeys[1]) { //up
								$('#pData', frmtb + '_2').trigger('click');
								return false;
							}
							if (e.which == rp_ge[$t.p.id].navkeys[2]) { //down
								$('#nData', frmtb + '_2').trigger('click');
								return false;
							}
						}
					});
					if (p.checkOnUpdate) {
						$('a.ui-jqdialog-titlebar-close span', '#' + $.jgrid.jqID(IDs.themodal)).removeClass('jqmClose');
						$('a.ui-jqdialog-titlebar-close', '#' + $.jgrid.jqID(IDs.themodal)).unbind('click')
							.click(function () {
								/* DEL 						if(!checkUpdates()) {return false;} */
								/* ADD */
								if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
									return false;
								}
								$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
									gb: '#gbox_' + $.jgrid.jqID(gID),
									jqm: p.jqModal,
									onClose: rp_ge[$t.p.id].onClose
								});
								return false;
							});
					}
					p.saveicon = $.extend([true, 'left', 'ui-icon-disk'], p.saveicon);
					p.closeicon = $.extend([true, 'left', 'ui-icon-close'], p.closeicon);
					// beforeinitdata after creation of the form
					if (p.saveicon[0] === true) {
						$('#sData', frmtb + '_2').addClass(p.saveicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon ' + p.saveicon[2] + '\'></span>');
					}
					if (p.closeicon[0] === true) {
						$('#cData', frmtb + '_2').addClass(p.closeicon[1] == 'right' ? 'fm-button-icon-right' : 'fm-button-icon-left')
							.append('<span class=\'ui-icon ' + p.closeicon[2] + '\'></span>');
					}
					// here initform - only once
					$($t).triggerHandler('jqGridAddEditInitializeForm', [settings.formEdit.$detailForm, frmoper]);
					if (onInitializeForm) {
						onInitializeForm.call($t, settings.formEdit.$detailForm);
					}
					if (rowid == '_empty' || !rp_ge[$t.p.id].viewPagerButtons) {
						$('#pData,#nData', frmtb + '_2').hide();
					} else {
						$('#pData,#nData', frmtb + '_2').show();
					}
					$($t).triggerHandler('jqGridAddEditBeforeShowForm', [settings.formEdit.$detailForm, frmoper]);
					if (onBeforeShow) {
						onBeforeShow.call($t, settings.formEdit.$detailForm);
					}
					$('#' + $.jgrid.jqID(IDs.themodal)).data('onClose', rp_ge[$t.p.id].onClose);
					$.jgrid.viewModal('#' + $.jgrid.jqID(IDs.themodal), {
						gbox: '#gbox_' + $.jgrid.jqID(gID),
						jqm: p.jqModal,
						overlay: p.overlay,
						modal: p.modal
					});
					if (!closeovrl) {
						$('.jqmOverlay').click(function () {
							/* DEL 						if(!checkUpdates()) {return false;} */
							/* ADD */
							if (!$.proxy($.jgrid.checkUpdates, $t)(extpost)) {
								return false;
							}
							$.jgrid.hideModal('#' + $.jgrid.jqID(IDs.themodal), {
								gb: '#gbox_' + $.jgrid.jqID(gID),
								jqm: p.jqModal,
								onClose: rp_ge[$t.p.id].onClose
							});
							return false;
						});
					}
					$($t).triggerHandler('jqGridAddEditAfterShowForm', [settings.formEdit.$detailForm, frmoper]);
					if (onAfterShow) {
						onAfterShow.call($t, settings.formEdit.$detailForm);
					}
					$('.fm-button', '#' + $.jgrid.jqID(IDs.themodal)).hover(
						function () {
							$(this).addClass('ui-state-hover');
						},
						function () {
							$(this).removeClass('ui-state-hover');
						}
					);

				}
				var posInit = $.proxy($.jgrid.getCurrPos, $t)();
				$self.rup_jqtable('updateDetailPagination');
				$.proxy($.jgrid.updateNav, $t)(posInit[0], posInit[1].length - 1);
			});
		}
	});

	$.fn.jqGrid.rup = {};
	$.fn.jqGrid.rup.edit = {
		detail: {
			detailDivId: 'detailDiv_',
			detailBodyId: 'detailBody_',
			detailFormId: 'detailForm_'
		},
		navigation: {
			forward: {
				id: '#nData'
			},
			back: {
				id: '#pData'
			}
		}
	};


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	* @description Propiedades de configuración del plugin formEdit del componente RUP Table.
	* @see Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.
	* @name options
	*
	* @property {object} [addEditOptions] - Propiedades de configuración comunes a las acciones de edición e inserciónde un registro.
	* @property {object} [addOptions] - Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [editOptions] - Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	* @property {object} [detailOptions] - Propiedades de configuración de la acción de mostrar un registro mediante el formulario de detalle.
	* @property {boolean} [defaultCompareData] - Determina si se debe de realizar la comparación por defecto en el control de cambios del formulario de edición. Por defecto a true.
	* @property {object} [dialogOptions] - Permite especificar opciones de configuración para el diálogo que contiene el formulario de detalle. Las opciones de configuración se pueden consultar en la guía de desarrollo del componente RUP Diálogo.
	*/
	jQuery.fn.rup_jqtable.plugins.formEdit = {};
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults = {
		toolbar: {
			defaultButtons: {
				add: true,
				edit: true,
				cancel: false,
				save: false,
				clone: true,
				'delete': true,
				filter: false
			}
		},
		contextMenu: {
			defaultRowOperations: {
				add: true,
				edit: true,
				cancel: false,
				save: false,
				clone: true,
				'delete': true,
				filter: false
			}
		},
		formEdit: {
			autoselectFirstRecord: true,
			ownFormEdit: false,
			detailFormCreated: false,
			dialogOptions: {}
		}
	};


	// Parámetros de configuración por defecto para la acción de eliminar un registro.
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.deleteOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_message.aceptar'),
		cancelicon: [false, 'left', 'icono_cancelar'],
		delicon: [false],
		linkStyleButtons: ['#eData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deleteAll') + '</div>',
		mtype: 'DELETE',
		width: 320,
		reloadAfterSubmit: false,
		resize: false,
		useDataProxy: true

	};

	// Parámetros de configuración por defecto para la acción de añadir y editar un registro.
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.addEditOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_message.aceptar'),
		closeicon: [false],
		checkOnUpdate: true,
		defaultCompareData: true,
		fillDataMethod: 'serverSide', // clientSide || serverSide
		saveicon: [false],
		linkStyleButtons: ['#cData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deleteAll') + '</div>',
		mtype: 'PUT',
		reloadAfterSubmit: false,
		resize: false,
		viewPagerButtons: false, // TODO: no permitir el habilitarlo
		width: 569,
		ajaxEditOptions: {
			type: 'PUT',
			dataType: 'json',
			processData: false
		}
	};

	// Parámetros de configruación específicos para la acción de añadir un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.addOptions = {
		mtype: 'POST',
		ajaxEditOptions: {
			type: 'POST'
		}
	};

	// Parámetros de configruación específicos para la acción de editar un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.editOptions = {
		mtype: 'PUT',
		ajaxEditOptions: {
			type: 'PUT'
		}
	};

	// Parámetros de configuración por defecto para la obtención del detalle de un registro
	jQuery.fn.rup_jqtable.plugins.formEdit.defaults.formEdit.detailOptions = {
		ajaxDetailOptions: {
			dataType: 'json',
			type: 'GET',
			contentType: 'application/json'
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} deleteOptions - Opciones de configuración de la operación de borrado.
	* @property {string} selectedRow - Identificador de la fila que se desea eliminar.
	* @example
	* $("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeEditRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} editOptions - Opciones de configuración de la operación de edición.
	* @property {string} selectedRow - Identificador de la fila que se desea editar.
	* @example
	* $("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo después de realizarse la petición de borrado de un registro.
	*
	* @event module:rup_jqtable#rupTable_deleteAfterSubmit
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.
	*
	* @event module:rup_jqtable#rupTable_beforeAddRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} addOptions -  Opciones de configuración de la acción de insertar un elemento.
	* @example
	* $("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/
	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/


	/**
	*  Evento lanzado después de que ha finalizado correctamente el proceso de eliminar un registro..
	*
	* @event module:rup_jqtable#rupTable_afterDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_afterDeleteRow", function(event){ });
	*/

	/**
	*  Evento lanzado después de que ha finalizado correctamente el proceso de carga de datos en el formulario de edición a partir de una petición al servidor de aplicaciones.
	*
	* @event module:rup_jqtable#rupTable_afterFormFillDataServerSide
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} xhr - Objeto enviado como respuesta desde el servidor.
	* @property {object} $detailFormToPopulate - Referencia al formulario de detalle.
	* @property {object} ajaxOptions - Opciones de configuración de la petición AJAX.
	* @example
	* $("#idComponente").on("rupTable_afterFormFillDataServerSide", function(event, xhr, $detailFormToPopulate, ajaxOptions){ });
	*/
	/**
	*  : Permite asociar manejadores de eventos para ejecutar
	código que indique al proceso de control de cambios si se han producido modificaciones o no.

	*
	* @event module:rup_jqtable#rupTable_formEditCompareData
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} savedData - Objeto que contiene los valores iniciales del formulario a partir de la serialización del mismo.
	* @property {object} newData - Objeto que contiene los valores actuales del formulario a partir de la serialización del mismo.
	* @example
	* $("#idComponente").on("rupTable_formEditCompareData ", function(event,	savedData, newData){
	*		// Se realizan las comprobaciones necesarias para determinar si se han producido cambios en el formulario de detalle
	*		event.isDifferent = true; // En caso de que se hayan producido cambios.
	*  	event.isDifferent = false; // En caso de que no hayan producido cambios.
	* });
	*/

})(jQuery);
