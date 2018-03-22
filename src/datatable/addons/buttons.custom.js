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
var _reportsRequestAllData = function ()
{
	var deferred = $.Deferred();
	$.ajax({
		method: "GET",
		dataType: "json",
		url: window.location.origin + "/x21aAppWar/jqGridUsuario"
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
					dt.i18n( 'buttons.copyTitle', 'Copy to clipboard' ),
					dt.i18n( 'buttons.copySuccess', {
						1: 'Copied one row to clipboard',
						_: 'Copied %d rows to clipboard'
					}, exportDataRows ),
					2000
				);

				that.processing( false );
				return;
			}
		}
		catch (t) {}
	}
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
	}
	className: 'buttons-copyCustom',
	displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
	insideContextMenu: true,
	type: 'copyCustom',
	init: function ( dt, node, config ) {
		DataTable.ext.buttons.copyCustom.eventDT = dt;
	},
	action: function ( e, dt, button, config ) {
		// TODO: hay que controlar el caso de copia, si es multiple, todos, etc.
		if (this.processing !== undefined) {
			this.processing( true );
		}

		var that = this;
		var ctx = dt.settings()[0];
		var info = dt.buttons.exportInfo( config );

		$.when(_reportsRequestAllData()).then(function (data) {
			ctx.oInit.buttons.allData = data;
			var exportData = ctx.oInit.buttons.allData;
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

			$.rup_messages('msgConfirm', {
				//message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.saveAndContinue'),
				//title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
				message: "¿Desea copiar " + exportDataRows + " registros?",
				title: "Copia de registros en clipboard",
				OKFunction: function () {
					ctx.oInit.formEdit.okCallBack = true;

					_reportsCopyAllDataToClipBoard(dt, that, exportDataRows, hiddenDiv, textarea);

					ctx.oInit.formEdit.detailForm.rup_dialog("close");
				},
				CANCELFunction: function (){
					ctx.oInit.formEdit.okCallBack = false

					if (this.processing !== undefined) {
						this.processing( false ); // FIXME: si cerramos con el aspa no lo hace
					}
				}
			});
		});

	}
};


return DataTable.Buttons;
}));
