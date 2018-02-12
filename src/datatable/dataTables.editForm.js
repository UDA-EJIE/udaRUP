/*! FormEdit for DataTables 1.2.4
 * 2015-2017 SpryMedia Ltd - datatables.net/license/mit
 */

/**
 * @summary     Select for DataTables
 * @description A collection of API methods, events and buttons for DataTables
 *   that provides selection options of the items in a DataTable
 * @version     1.2.4
 * @file        dataTables.multiSelect.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net/forums
 * @copyright   Copyright 2015-2017 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net/extensions/select
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
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Version information for debugger
DataTable.editForm = {};

DataTable.editForm.version = '1.2.4';

DataTable.editForm.init = function ( dt ) {
	DataTable.editForm.iniciado = '';
	var ctx = dt.settings()[0];
	var init = ctx.oInit.multiSelect;
	var defaults = DataTable.defaults.multiSelect;
	var opts = init === undefined ?
		defaults :
		init;
	
	var rowsBody = $( ctx.nTBody);
	//Se edita el row/fila.
	rowsBody.on( 'dblclick.DT','tr',  function () {
		var idTableDetail = '#table_detail_div';//ira en una propiedad o por defecto o pasada por el usuario.
		var idForm = $(idTableDetail).find('form');
		var row = ctx.json.rows[this._DT_RowIndex];
		$.rup_utils.populateForm(row, idForm);
		$(idTableDetail).rup_dialog("open");
		save(ctx,row,idTableDetail,idForm);
	} );

};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */

/**
 * Initialisation of a new table. Attach event handlers and callbacks to allow
 * Select to operate correctly.
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered, if there is ajax data
 *
 * @param  {DataTable.settings} ctx Settings object to operate on
 * @private
 */
function init ( ctx ) {
	var api = new DataTable.Api( ctx );

	// Row callback so that classes can be added to rows and cells if the item
	// was selected before the element was created. This will happen with the
	// `deferRender` option enabled.
	// 
	// This method of attaching to `aoRowCreatedCallback` is a hack until
	// DataTables has proper events for row manipulation If you are reviewing
	// this code to create your own plug-ins, please do not do this!
	ctx.aoRowCreatedCallback.push( {
		fn: function ( row, data, index ) {
			var i, ien;
			var d = ctx.aoData[ index ];

			// Row
			if ( d._multiSelect_selected ) {
				$( row ).addClass( ctx._multiSelect.className );
			}

			// Cells and columns - if separated out, we would need to do two
			// loops, so it makes sense to combine them into a single one
			for ( i=0, ien=ctx.aoColumns.length ; i<ien ; i++ ) {
				if ( ctx.aoColumns[i]._multiSelect_selected || (d._selected_cells && d._selected_cells[i]) ) {
					$(d.anCells[i]).addClass( ctx._multiSelect.className );
				}
			}
		},
		sName: 'select-deferRender'
	} );

	// On Ajax reload we want to reselect all rows which are currently selected,
	// if there is an rowId (i.e. a unique value to identify each row with)
	api.on( 'preXhr.dt.dtSelect', function () {
		// note that column selection doesn't need to be cached and then
		// reselected, as they are already selected
		var rows = api.rows( { selected: true } ).ids( true ).filter( function ( d ) {
			return d !== undefined;
		} );

		var cells = api.cells( { selected: true } ).eq(0).map( function ( cellIdx ) {
			var id = api.row( cellIdx.row ).id( true );
			return id ?
				{ row: id, column: cellIdx.column } :
				undefined;
		} ).filter( function ( d ) {
			return d !== undefined;
		} );

		// On the next draw, reselect the currently selected items
		api.one( 'draw.dt.dtSelect', function () {
			api.rows( rows ).multiSelect();

			// `cells` is not a cell index selector, so it needs a loop
			if ( cells.any() ) {
				cells.each( function ( id ) {
					api.cells( id.row, id.column ).multiSelect();
				} );
			}
		} );
	} );

	// Update the table information element with selected item summary
	api.on( 'draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt', function () {
		info( api );
		_drawSelectId(api);
	} );

	// Clean up and release
	api.on( 'destroy.dtSelect', function () {
		disableMouseSelection( api );
		api.off( '.dtSelect' );
	} );
}

function eventTrigger ( api, type, args, any )
{
	if ( any && ! api.flatten().length ) {
		return;
	}

	if ( typeof type === 'string' ) {
		type = type +'.dt';
	}

	args.unshift( api );

	$(api.table().node()).trigger( type, args );
}

function save(ctx,row,idTableDetail,idForm){
	var button = $(idTableDetail).find('#table_detail_button_save');
	button.unbind( "click" );
	button.bind('click', function() {
	//Comprobar si row ha sido modificada
	row = $.rup_utils.queryStringToJson(idForm.formSerialize());
	callSaveAjax(ctx,row)
	});
}

function callSaveAjax(ctx,row){
	// add Filter
	$.rup_ajax({
		url : ctx.oInit.urlBase,
		type : 'PUT',
		data : $.toJSON(row),
		dataType : 'json',
		showLoading : false,
		contentType : 'application/json',
		async : false,
		beforeSend : function(xhr, options) {
			//return $self.triggerHandler('rupTable_multifilter_beforeAdd',[xhr, options]);
		},
		success : function(data, status, xhr) {

			alert('Correcto');

		},
		error : function(xhr, ajaxOptions,thrownError) {
			alert('Errors');

		}
	});
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;
var apiRegisterPlural = DataTable.Api.registerPlural;

apiRegister( 'multiSelect()', function () {
	return this.iterator( 'table', function ( ctx ) {
		DataTable.multiSelect.init( new DataTable.Api( ctx ) );
	} );
} );

apiRegister( 'multiSelect.blurable()', function ( flag ) {
	if ( flag === undefined ) {
		return this.context[0]._multiSelect.blurable;
	}

	return this.iterator( 'table', function ( ctx ) {
		ctx._multiSelect.blurable = flag;
	} );
} );

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'init.dt plugin-init.dt', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	if(DataTable.editForm.iniciado === undefined){
		DataTable.editForm.init( new DataTable.Api( ctx ) );
		$('#table_detail_div').rup_dialog($.extend({}, {
			type: $.rup.dialog.DIV,
			autoOpen: false,
			modal: true,
			resizable: '',
			title: 'Titulo cualquiera',
			width: 569
		}, {}));
	}

} );


return DataTable.editForm;
}));
