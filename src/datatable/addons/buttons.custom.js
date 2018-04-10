/**
  * Establece el tipo de llamada necesario para obtener los datos según lo seleccionado
  * e inicia la gestión para finalmente obtenerlos
  *
  * @summary 		Extensión del componente RUP Datatable
  * @module			"buttons.custom"
  * @version     1.0.0
  * @license
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
  * @copyright   Copyright 2018 E.J.I.E., S.A.
  *
  */

(function(factory){
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'datatables.net'], function ($) {
			return factory($, window, document);
		});
	}
	else if (typeof exports === 'object') {
		// CommonJS
		module.exports = function (root, $) {
			if (! root) {
				root = window;
			}

			if (! $ || ! $.fn.dataTable) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory($, root, root.document);
		};
	}
	else {
		// Browser
		factory(jQuery, window, document);
	}
}(function($, window, document) {
'use strict';
var DataTable = $.fn.dataTable;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Funciones locales (privadas)
 */


/**
	* Establece el tipo de llamada necesario para obtener los datos según lo seleccionado
	* e inicia la gestión para finalmente obtenerlos
	*
	* @name _reportsCopyData
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} dt Instancia del datatable
	* @param {object} that Objeto del boton
	* @param {object} config Configuracion del boton
	*
  */
var _reportsCopyData = function (dt, that, config)
{
	var ctx = dt.settings()[0];
	var info = dt.buttons.exportInfo(config);
	var type;
	var multiselection = DataTable.multiSelect.multiselection;
	var selectedAll = multiselection.selectedAll;
	var deselectedIds = multiselection.deselectedIds;

	if (selectedAll) {
		if (deselectedIds.length > 0) {
			// Este caso es para cuando se selecciona todo y despues se
			// deseleccionan algunos registros
			type = "all-deselected";
		} else {
			// Este caso es para cuando se seleccionan todos los registros
			type = "all";
		}
	} else {
		// Este caso para cuando hay determinados registros seleccionados manualmente
		type = "selected";
	}

	$.when(_reportsTypeOfCopy(dt, type, multiselection, selectedAll, deselectedIds)).then(function (exportData) {
		var exportDataRows = exportData.length;
		var exportDataParsed = JSON.stringify(exportData);

		var hiddenDiv = $('<div/>')
			.css({
				height: 1,
				width: 1,
				overflow: 'hidden',
				position: 'fixed',
				top: 0,
				left: 0
			});

		var textarea = $('<textarea readonly/>')
			.val(exportDataParsed)
			.appendTo(hiddenDiv);

		_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea);
	});
};

/**
	* Según el tipo de función de copia solicitada, realiza unas u otras comprobaciones
	* antes de solicitar los datos al servidor
	*
	* @name _reportsTypeOfCopy
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} dt Instancia del datatable
	* @param {string} type Tipo de funcion de copia a ejecutar
	* @param {object} multiselection Propiedades de la multiseleccion
	* @param {boolean} selectedAll Cuando es true significa que todas las filas estan marcadas
	* @param {array} [deselectedIds] ID's de las filas deseleccionadas
	*
	* @return {object}
	*
  */
var _reportsTypeOfCopy = function (dt, type, multiselection, selectedAll, deselectedIds)
{
	var ctx = dt.settings()[0];
	var deferred = $.Deferred();
	var exportData;
	var selectedIds = multiselection.selectedIds;
	var selectedRows = multiselection.selectedRowsPerPage;
	var ajaxOptions = {};
	var urlAjax;
	var typeAjax;
	var contentTypeAjax = 'application/json';
	var dataTypeAjax = 'json';

	switch (type) {
		case 'selected':
			var localAccess = true;
			var exportData = [];

			// Comprueba si todos los valores seleccionados estan en la misma pagina
			$.each(selectedRows, function(key, value) {
				if (ctx.json.page != value.page) {
					localAccess = false;
					return false;
				}
			});
			if (localAccess) {
				// Puede acceder a los valores seleccionados localmente
				$.each(selectedRows, function(key, value) {
					var idPadre = value.id;
					$.each(ctx.json.rows, function(key, value) {
						if (value.id === idPadre) {
							exportData.push(value);
						}
					});
				});
				deferred.resolve(exportData);
			} else {
				// Accede a los datos mediante el servidor ya que se ha hecho uso de la paginacion
				// Parametros necesarios para configurar la llamada AJAX
				urlAjax = '/clipboardReport';
				typeAjax = 'POST';
				ajaxOptions = _reportsPrepareRequestData(ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, deselectedIds, selectedIds);

				$.when(_reportsRequestData(ajaxOptions)).then(function (data) {
					exportData = data;
					deferred.resolve(exportData);
				});
			}
			break;
		case 'all':
			// Parametros necesarios para configurar la llamada AJAX
			typeAjax = 'GET';
			ajaxOptions = _reportsPrepareRequestData(ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, deselectedIds, selectedIds);

			$.when(_reportsRequestData(ajaxOptions)).then(function (data) {
				ctx.oInit.buttons.allData = data;
				exportData = ctx.oInit.buttons.allData;
				deferred.resolve(exportData);
			});
			break;
		case 'all-deselected':
			// Parametros necesarios para configurar la llamada AJAX
			urlAjax = '/clipboardReport';
			typeAjax = 'POST';
			ajaxOptions = _reportsPrepareRequestData(ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, deselectedIds, selectedIds);

			$.when(_reportsRequestData(ajaxOptions)).then(function (data) {
				exportData = data;
				deferred.resolve(exportData);
			});
			break;
	}

	return deferred.promise();
};

/**
	* Se encarga de generar las opciones de configuración con las que se llamara a la API
	*
	* @name _reportsPrepareRequestData
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} ajaxOptions Parametros de la llamada Ajax
	* @param {string} urlAjax Parametro para la URL
	* @param {string} typeAjax Tipo de llamada a la API
	* @param {string} contentTypeAjax Formato de datos enviados
	* @param {string} dataTypeAjax Formato de datos esperados
	* @param {object} ctx Contexto
	* @param {boolean} selectedAll Cuando es true significa que todas las filas estan marcadas
	* @param {array} [deselectedIds] ID's de las filas deseleccionadas
	* @param {array} [selectedIds] ID's de las filas seleccionadas
	*
	* @return {object}
	*
  */
var _reportsPrepareRequestData = function (ajaxOptions, urlAjax, typeAjax, contentTypeAjax, dataTypeAjax, ctx, selectedAll, deselectedIds, selectedIds)
{
	var row = {};
	row.core =  {
		'pkToken': ctx.oInit.multiplePkToken,
		'pkNames': ctx.oInit.primaryKey
	};
	row.multiselection = {};
	row.multiselection.selectedAll = selectedAll;
	if (row.multiselection.selectedAll) {
		row.multiselection.selectedIds = deselectedIds;
	} else {
		row.multiselection.selectedIds = selectedIds;
	}
	// Completa el objeto 'ajaxOptions' con los parametros necesarios para la
	// llamada que se realizara al servidor
	ajaxOptions.contentType = contentTypeAjax;
	ajaxOptions.dataType = dataTypeAjax;
	if (urlAjax !== undefined) {
		ajaxOptions.url = ctx.oInit.urlBase + urlAjax;
	} else {
		ajaxOptions.url = ctx.oInit.urlBase;
	}
	ajaxOptions.type = typeAjax;
	if (typeAjax === 'POST') {
			ajaxOptions.data = JSON.stringify(row);
	}

	return ajaxOptions;
};

/**
	* Se encarga de llamar a la API y de devolver los datos recibidos
	*
	* @name _reportsRequestData
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} ajaxOptions Parametros de la llamada Ajax
	*
	* @return {object}
	*
  */
var _reportsRequestData = function (ajaxOptions)
{
	var deferred = $.Deferred();
	$.ajax(ajaxOptions)
		.done(function(data) {
			deferred.resolve(data);
		});
	return deferred.promise();
};

/**
	* Gestiona la apertura/cierre del mensaje de confirmación de copia
	*
	* @name _reportsOpenMessage
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} dt Instancia del datatable
	* @param {object} ctx Contexto
	* @param {object} that Objeto del boton
	* @param {int} exportDataRows Numero de filas a ser exportadas
	* @param {object} hiddenDiv Elemento del DOM
	* @param {object} textarea Elemento del DOM
	*
  */
var _reportsOpenMessage = function (dt, ctx, that, exportDataRows, hiddenDiv, textarea)
{
	$.rup_messages('msgConfirm', {
		title: dt.i18n('rup_datatable.changes', 'Copia de registros en clipboard'),
		message: dt.i18n('rup_datatable.saveAndContinue', {
			_: '¿Desea copiar %d registros?',
			1: '¿Desea copiar un registro?'
		}, exportDataRows),
		OKFunction: function () {
			ctx.oInit.formEdit.okCallBack = true;
			_reportsCopyDataToClipboard(dt, that, exportDataRows, hiddenDiv, textarea);
			ctx.oInit.formEdit.detailForm.rup_dialog("close");
		},
		beforeClose: function (){
			ctx.oInit.formEdit.okCallBack = false
			// Si es llamado desde el contextMenu este paso es innecesario y la condicion
			// del if evita un error
			if (that.processing !== undefined) {
				that.processing(false);
			}
		}
	});
};

/**
	* Copia los datos recibidos al portapapeles
	*
	* @name _reportsCopyDataToClipboard
	* @function
	* @since UDA 3.4.0 // Datatable 1.0.0
	*
	* @param {object} dt Instancia del datatable
	* @param {object} that Objeto del boton
	* @param {int} exportDataRows Numero de filas a ser exportadas
	* @param {object} hiddenDiv Elemento del DOM
	* @param {object} textarea Elemento del DOM
	*
  */
var _reportsCopyDataToClipboard = function (dt, that, exportDataRows, hiddenDiv, textarea)
{
	// Para los navegadores que soportan el comando de copia 'execCommand'
	if (document.queryCommandSupported('copy')) {
		hiddenDiv.appendTo(dt.table().container());
		textarea[0].focus();
		textarea[0].select();

		try {
			var successful = document.execCommand('copy');
			hiddenDiv.remove();

			if (successful) {
				dt.buttons.info(
					dt.i18n('rup_datatable.changes', 'Copia de registros en portapapeles'),
					dt.i18n('rup_datatable.saved', {
						_: 'Copiados %d registros al portapapeles',
						1: 'Copiado un registro al portapapeles'
					}, exportDataRows),
					2000
				);
				// Si es llamado desde el contextMenu este paso es innecesario y la condicion
				// del if evita un error
				if (that.processing !== undefined) {
					that.processing(false);
				}
				return;
			}
		}
		catch (t) {}
	}

	// Si no soportan la copia mediante 'execCommand', se mostrara un text box
	// con las instrucciones de como copiar los elementos seleccionados
	var message = $('<span>' + dt.i18n('rup_datatable.copyKeys',
		'Presiona ctrl o ⌘ + C para copiar los datos de la tabla al portapapeles.' +
		'Para cancelar, haz click sobre este mensaje o pulsa el botón escape.') + '</span>'
	)
	.append(hiddenDiv);

	dt.buttons.info(dt.i18n('copyTitle', 'Copiar al portapapeles'), message, 0);

	// Selecciona el texto para cuando el usuario accione la copia al portapapeles
	// se le pegue ese texto
	textarea[0].focus();
	textarea[0].select();

	// Evento que oculta el mensaje cuando el usuario ha terminado con la copia
	var container = $(message).closest('.dt-button-info');
	var close = function () {
		container.off('click.buttons-copy');
		$(document).off('.buttons-copy');
		dt.buttons.info(false);
		// Si es llamado desde el contextMenu este paso es innecesario y la condicion
		// del if evita un error
		if (that.processing !== undefined) {
			that.processing(false);
		}
	};

	container.on('click.buttons-copy', close);
	$(document)
		.on('keydown.buttons-copy', function (e) {
			if (e.keyCode === 27) { // esc
				close();
			}
		})
		.on('copy.buttons-copy cut.buttons-copy', function () {
			close();
			// Si es llamado desde el contextMenu este paso es innecesario y la condicion
			// del if evita un error
			if (that.processing !== undefined) {
				that.processing(false);
			}
		});
};


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */

//
// Copia al portapapeles
//
DataTable.ext.buttons.copyButton = {
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.reports.copyButton');
	},
	className: 'buttons-copyButton',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	insideContextMenu: true,
	type: 'copyButton',
	init: function (dt, node, config) {
		DataTable.ext.buttons.copyButton.eventDT = dt;
	},
	action: function (e, dt, button, config) {
		// Si es llamado desde el contextMenu este paso es innecesario y la condicion
		// del if evita un error
		if (this.processing !== undefined) {
			this.processing(true);
		}
		var that = this;
		_reportsCopyData(dt, that, config);
	}
};

DataTable.ext.buttons.addButton = {
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.add');
	},
	id: 'addButton_1',
	className: 'datatable_toolbar_btnAdd',
	displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
	insideContextMenu: true,
	type: 'add',
	action: function (e, dt, node, config) {
		DataTable.Api().buttons.actions(dt, config);
	}
};

DataTable.ext.buttons.editButton = {
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.edit');
	},
	id: 'editButton_1',
	className: 'datatable_toolbar_btnEdit',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	insideContextMenu: true,
	type: 'edit',
	action: function (e, dt, node, config) {
		DataTable.Api().buttons.actions(dt, config);
	}
};

DataTable.ext.buttons.cloneButton = {
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.clone');
	},
	id: 'cloneButton_1',
	className: 'datatable_toolbar_btnClone',
	displayRegex: /^1$/, // Se muestra solo cuando sea igual a 1
	insideContextMenu: true,
	type: 'clone',
	action: function (e, dt, node, config) {
		DataTable.Api().buttons.actions(dt, config);
	}
};

DataTable.ext.buttons.deleteButton = {
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.delete');
	},
	id: 'deleteButton_1',
	className: 'datatable_toolbar_btnDelete',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	insideContextMenu: true,
	type: 'delete',
	action: function (e, dt, node, config) {
		DataTable.Api().buttons.actions(dt, config);
	}
};

DataTable.ext.buttons.reportsButton = {
	extend: 'collection',
	text: function (dt) {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.toolbar.reports.main');
	},
	id: 'informes_01',
	className: 'align-right',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	autoClose: true,
	type: 'reports',
	buttons: [
		'copyButton'
	]
};


return DataTable.Buttons;
}));
