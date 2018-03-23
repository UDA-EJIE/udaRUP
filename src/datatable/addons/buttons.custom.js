/*!
 * TODO
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document ) {
'use strict';
var DataTable = $.fn.dataTable;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local (private) functions
 */

/**
* TODO: descripcion
*
*/
var _reportsOpenMessage = function (dt, ctx, that, exportDataRows, hiddenDiv, textarea)
{
	$.rup_messages('msgConfirm', {
		title: dt.i18n( 'changes', 'Copia de registros en clipboard' ),
		message: dt.i18n( 'saveAndContinue', {
			1: '¿Desea copiar un registro?',
			_: '¿Desea copiar %d registros?'

		}, exportDataRows ),
		OKFunction: function () {
			ctx.oInit.formEdit.okCallBack = true;

			// TODO: controlar los diferentes casos de uso
			_reportsCopyAllDataToClipBoard(dt, that, exportDataRows, hiddenDiv, textarea);

			ctx.oInit.formEdit.detailForm.rup_dialog("close");
		},
		beforeClose: function (){
			ctx.oInit.formEdit.okCallBack = false
			// Si es llamado desde el contextMenu este paso es innecesario y la condicion
			// del if evita un error
			if (that.processing !== undefined) {
				that.processing( false );
			}
		}
	});
};

/**
 * TODO: descripcion
 *
 */
var _reportsRequestAllData = function ( ctx )
{
	var deferred = $.Deferred();
	$.ajax({
		method: "GET",
		dataType: "json",
		url: ctx.oInit.urlBase
	})
		.done(function( data ) {
			deferred.resolve(data);
		});
	return deferred.promise();
};

/**
 * TODO: descripcion
 *
 */
var _reportsTypeOfCopy = function (ctx, type, selectedRows)
{
	var deferred = $.Deferred();
	var exportData;

	switch (type) {
		case 'selected':
			console.log("SELECTED");
			exportData = selectedRows;
			deferred.resolve(exportData);
			break;
		case 'all':
			console.log("ALL");
			$.when(_reportsRequestAllData(ctx)).then(function (data) {
				ctx.oInit.buttons.allData = data;
				exportData = ctx.oInit.buttons.allData;
				deferred.resolve(exportData);
			});
			break;
		// TODO: hacer el case que necesitara un filtro
		case 'all-deselected':
			console.log("ALL - DESELECTED");

			//////////////// PROBANDO ////////////////
			console.log("////////////////////////////////");
			var datos = $self._ajaxRequestData;
			var ajaxOptions = {
				url : ctx.oInit.urlBase,
				usePlugins:["filter"],
				filter:{
					// Propiedades de configuración del plugin filter
					id: ["05"],
					nombre: ["as"],
					fechaAlta: ["13/03/2018"]
				},
				success : function(data, status, xhr) {
					console.log("SUCCESS");
					deferred.resolve(data);
					console.log(data);
				},
				error : function(xhr, ajaxOptions,thrownError) {
					console.log('Errors '+thrownError+ ": "+xhr.responseText);

				}
			};
			$('#id_filter_table').rup_form('ajaxSubmit', ajaxOptions);
			console.log("////////////////////////////////");
			//////////////// PROBANDO ////////////////

			break;
		default:
			// TODO: falta dar accion por defecto
			console.log("DEFAULT");
	}

	return deferred.promise();
};

/**
 * TODO: descripcion
 *
 */
var _reportsCopyData = function ( dt, that, config, type, selectedIds, selectedRows )
{
	var ctx = dt.settings()[0];
	var info = dt.buttons.exportInfo( config );

	$.when(_reportsTypeOfCopy(ctx, type, selectedRows)).then(function (exportData) {
		var exportDataRows = exportData.length;

		var hiddenDiv = $('<div/>')
			.css( {
				height: 1,
				width: 1,
				overflow: 'hidden',
				position: 'fixed',
				top: 0,
				left: 0
			} );

		var textarea = $('<textarea readonly/>')
			.val( exportData )
			.appendTo( hiddenDiv );

		_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea);
	});
};

/**
 * TODO: descripcion
 *
 */
var _reportsCopyAllDataToClipBoard = function ( dt, that, exportDataRows, hiddenDiv, textarea )
{
	// For browsers that support the copy execCommand, try to use it
	if ( document.queryCommandSupported('copy') ) {
		hiddenDiv.appendTo( dt.table().container() );
		textarea[0].focus();
		textarea[0].select();

		try {
			var successful = document.execCommand( 'copy' );
			hiddenDiv.remove();

			if (successful) {
				dt.buttons.info(
					dt.i18n( 'changes', 'Copia de registros en clipboard' ),
					dt.i18n( 'saved', {
						1: 'Copiado un registro al portapapeles',
						_: 'Copiados %d registros al portapapeles'
					}, exportDataRows ),
					2000
				);
				// Si es llamado desde el contextMenu este paso es innecesario y la condicion
				// del if evita un error
				if (that.processing !== undefined) {
					that.processing( false );
				}
				return;
			}
		}
		catch (t) {}
	}

	// Otherwise we show the text box and instruct the user to use it
	var message = $('<span>'+dt.i18n( 'copyKeys',
		'Presiona <i>ctrl</i> o <i>\u2318</i> + <i>C</i> para copiar los datos de la tabla<br>al portapapeles.<br><br>'+
    'Para cancelar, haz click sobre este mensaje o pulsa el botón escape.' )+'</span>'
	)
	.append( hiddenDiv );

	dt.buttons.info( dt.i18n( 'copyTitle', 'Copiar al portapapeles' ), message, 0 );

	// Select the text so when the user activates their system clipboard
	// it will copy that text
	textarea[0].focus();
	textarea[0].select();

	// Event to hide the message when the user is done
	var container = $(message).closest('.dt-button-info');
	var close = function () {
		container.off( 'click.buttons-copy' );
		$(document).off( '.buttons-copy' );
		dt.buttons.info( false );
		// Si es llamado desde el contextMenu este paso es innecesario y la condicion
		// del if evita un error
		if (that.processing !== undefined) {
			that.processing( false );
		}
	};

	container.on( 'click.buttons-copy', close );
	$(document)
		.on( 'keydown.buttons-copy', function (e) {
			if ( e.keyCode === 27 ) { // esc
				close();
			}
		} )
		.on( 'copy.buttons-copy cut.buttons-copy', function () {
			close();
			// Si es llamado desde el contextMenu este paso es innecesario y la condicion
			// del if evita un error
			if (that.processing !== undefined) {
				that.processing( false );
			}
		} );
};



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Buttons
 */

//
// Copy to clipboard
//
DataTable.ext.buttons.copyCustom = {
	text: function ( dt ) {
		return dt.i18n( 'toolbar.reports.copyCustom', 'Copiar' );
	},
	className: 'buttons-copyCustom',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	insideContextMenu: true,
	type: 'copyCustom',
	init: function ( dt, node, config ) {
		DataTable.ext.buttons.copyCustom.eventDT = dt;
	},
	action: function ( e, dt, button, config ) {
		// Si es llamado desde el contextMenu este paso es innecesario y la condicion
		// del if evita un error
		if (this.processing !== undefined) {
			this.processing( true );
		}

		var that = this;
		var multiselection = DataTable.multiSelect.multiselection;
		var selectedRows = multiselection.selectedRowsPerPage;
		var numOfSelectedRows = multiselection.numSelected;
		var selectedAll = multiselection.selectedAll;
		var selectedIds = multiselection.selectedIds;
		var deselectedIds = multiselection.deselectedIds;

		if (selectedAll) {
			console.log("SELECTALL = TRUE");
			if (deselectedIds.length > 0) {
				// TODO: Este caso es para cuando se selecciona todo y despues se
				// deseleccionan algunos registros
				console.log("TODO - ALGO");
				console.log(deselectedIds);
				var type = "all-deselected";
				_reportsCopyData(dt, that, config, type, selectedIds, selectedRows);
			} else {
				// Este caso es para cuando se seleccionan todos los registros
				console.log("TODO");
				var type = "all";
				_reportsCopyData(dt, that, config, type, selectedIds, selectedRows);
			}
		} else {
			// Este caso para cuando hay determinados registros seleccionados manualmente
			console.log("SELECTALL = FALSE");
			var type = "selected";
			_reportsCopyData(dt, that, config, type, selectedIds, selectedRows);
		}
	}
};


return DataTable.Buttons;
}));
