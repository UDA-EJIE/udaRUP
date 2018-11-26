/**
  * Módulo que habilita la edicción mediante un formulario.
  *
  * @summary 		Extensión del componente RUP Datatable
  * @module			"rup.table.inlineEdit"
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
DataTable.inlineEdit = {};

DataTable.inlineEdit.version = '1.2.4';

/**
* Se inicializa el componente editForm
*
* @name init
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {object} dt - Es el objeto datatable.
*
*/
DataTable.inlineEdit.init = function ( dt ) {
	var ctx = dt.settings()[0];
	ctx.inlineEdit = {};
	var idRow;
	//Se edita el row/fila.
	var rowsBody = $( ctx.nTBody);
	rowsBody.on( 'dblclick.DT','tr[role="row"]',  function () {
		idRow = this._DT_RowIndex;
		_editInline(dt,ctx,idRow);
	} );
	
	rowsBody.on( 'click.DT','tr[role="row"]',  function () {
		var idRow = this._DT_RowIndex;
		if(ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.idx !== idRow){
			_restaurarFila(ctx,true);
		}
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
 * @name init
 * @function
 * @since UDA 3.4.0 // Datatable 1.0.0
 *
 * @param  {DataTable.settings} ctx Settings object to operate on
 *
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

function _add(ctx){
	
}

function _editInline ( dt,ctx, idRow ){
	if(ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.idx !== idRow){//si no es la mismafila.
		_restaurarFila(ctx,false);
	}
	
	if(ctx.inlineEdit.lastRow === undefined || 
			(ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.idx !== idRow)){
		_changeInputsToRup(ctx,idRow);
	}
	$('#'+ctx.sTableId).triggerHandler('tableInlineEditDoubleClickRow');
	//Añadir la seleccion del mismo.
	if (ctx.oInit.multiSelect !== undefined) {
		dt['row'](idRow).multiSelect();
	}else{
		var rowsBody = $( ctx.nTBody);
		$('tr',rowsBody).removeClass('selected tr-highlight');
		DataTable.Api().select.selectRowIndex(dt,idRow,true);
	}
}

function _restaurarFila(ctx,limpiar){
	var positionLastRow = ctx.inlineEdit.lastRow.idx;
	if($(ctx.aoData[ positionLastRow ].nTr).hasClass("editable")){
		var colModel = ctx.oInit.seeker.colModel;
		$(ctx.aoData[ positionLastRow ].nTr).removeClass("editable");
		var cont = 0;
		$(ctx.aoData[ positionLastRow ].nTr.cells).each( function(i) {
			var celda = $(ctx.aoData[ positionLastRow ].nTr.cells[i]);
			var $celda = $(celda);
	
			if(!$celda.hasClass("select-checkbox")){
				var cellColModel = colModel[cont];
				if(cellColModel.editable===true){
					$celda.html(ctx.inlineEdit.lastRow.cellValues[cont]);
				}
				cont++;
			}
		});
	}
	if(limpiar){//si se limpia, no queda ninguna marcada
		ctx.inlineEdit.lastRow = undefined;
	}
}

function _changeInputsToRup(ctx,idRow){
	// Se procesan las celdas editables
	var colModel = ctx.oInit.seeker.colModel, searchEditOptions;
	if(colModel !== undefined){
		var cont = 0;
		ctx.inlineEdit.lastRow = ctx.aoData[ idRow ];
		ctx.inlineEdit.lastRow.cellValues = {};
		$(ctx.aoData[ idRow ].nTr).addClass('editable');
		$(ctx.aoData[ idRow ].nTr.cells).each( function(i) {
			var celda = $(ctx.aoData[ idRow ].nTr.cells[i]);
			var $celda = $(celda);
	
			if(!$celda.hasClass("select-checkbox")){
				var cellColModel = colModel[cont];
				if(cellColModel.editable===true){
					//Convertir a input.
					ctx.inlineEdit.lastRow.cellValues[cont] = $celda.html();
					var $input = $('<input />').val($celda.text());
					var resol = $celda.width() - 10;
					$input.css('max-width',resol+'px');
					$celda.html($input);
					
				}
				cont++;
			}
		});
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;

apiRegister( 'inlineEdit.add()', function ( ctx ) {
	_add(ctx);
} );

apiRegister( 'inlineEdit.editInline()', function (dt, ctx, idRow ) {
	_editInline(dt,ctx,idRow);
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'plugin-init.dt', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	if(ctx.oInit.inlineEdit !== undefined){
		DataTable.inlineEdit.init( new DataTable.Api( ctx ) );
	}

} );


return DataTable.inlineEdit;
}));
