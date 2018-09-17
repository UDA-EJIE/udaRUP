/**
  * Módulo que permite toda la seleción simple
  *
  * @summary 		Extensión del componente RUP Datatable
  * @module			"dataTables.select"
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
		define( ['jquery', 'datatables.net','../rup.contextMenu','../rup.feedback'], function ( $ ) {
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
DataTable.select = {};

DataTable.select.version = '1.2.4';

/**
* Se inicializa el componente select
*
* @name init
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
*
*/
DataTable.select.init = function ( dt ) {
	var ctx = dt.settings()[0];
	DataTable.select[ctx.sTableId] = [];
	var rowsBody = $( ctx.nTBody);
	//Se edita el row/fila.
	rowsBody.on( 'click.DT','tr[role="row"]',  function () {
		var idRow = this._DT_RowIndex;
		 _selectRowIndex(dt,idRow,$(this));

	} );
	
	//Se genera el div para el feedback del datatable.
	var divFeedback = $('<div/>').attr('id', 'rup_feedback_' + ctx.sTableId).insertBefore('#' + ctx.sTableId).css('width','100%');
	DataTable.multiselection[ctx.sTableId].internalFeedback = divFeedback;
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */


/**
 * Pinta los elementos selecionables, porque tiene los ids almacenados y mete la clase que se le indica.
 *
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered
 *
 * @name drawSelectId
 * @function
 * @since UDA 3.4.0 // Datatable 1.0.0
 *
 * 
 */
function _drawSelectId(ctx){
	
	if(DataTable.multiselection[ctx.sTableId].selectedRowsPerPage.length === 1){
		var row = DataTable.multiselection[ctx.sTableId].selectedRowsPerPage[0];
		var rowSelectAux = ctx.json.rows[row.line];

		if(rowSelectAux !== undefined && row.id === DataTable.Api().rupTable.getIdPk(rowSelectAux)){
			var rowsBody = $( ctx.nTBody);
			var line = row.line + 1;
			$('tr:nth-child('+line+')',rowsBody).addClass('selected tr-highlight');
		}
	}
}

/**
 * Pinta los elementos selecionables, porque tiene los ids almacenados y mete la clase que se le indica.
 *
 *
 * This will occur _after_ the initial DataTables initialisation, although
 * before Ajax data is rendered
 *
 * @name drawSelectId
 * @function
 * @since UDA 3.4.0 // Datatable 1.0.0
 *
 * 
 */
function _selectRowIndex(dt,index,tr){
	var ctx = dt.settings()[0];
	DataTable.multiselection[ctx.sTableId].selectedRowsPerPage = [];
	ctx.oInit.select.funcionParams = '';
	var rowsBody = $( ctx.nTBody);
	if(tr.hasClass( "tr-highlight" )){
		tr.removeClass('selected tr-highlight');
		DataTable.multiselection[ctx.sTableId].numSelected = 0;
		DataTable.multiselection[ctx.sTableId].selectedIds = [];
		DataTable.multiselection[ctx.sTableId].lastSelectedId = '';
	}else{
		$('tr',rowsBody).removeClass('selected tr-highlight');
		tr.addClass('selected tr-highlight');
		var row = ctx.json.rows[index];
		if(row !== undefined){
			var arra = {id:DataTable.Api().rupTable.getIdPk(row),page:dt.page()+1,line:index};
			DataTable.multiselection[ctx.sTableId].selectedRowsPerPage.splice(0,0,arra);
			DataTable.multiselection[ctx.sTableId].numSelected = 1;
			DataTable.multiselection[ctx.sTableId].selectedIds = [DataTable.Api().rupTable.getIdPk(row)];
			DataTable.multiselection[ctx.sTableId].lastSelectedId = DataTable.Api().rupTable.getIdPk(row);
		}
	}
	if(ctx.oInit.buttons !== undefined){
		DataTable.Api().buttons.displayRegex(ctx);
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables selectors
 */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;

apiRegister( 'select()', function () {
	return this.iterator( 'table', function ( ctx ) {
		DataTable.select.init( new DataTable.Api( ctx ) );
	} );
} );


apiRegister( 'select.drawSelectId()', function (ctx ) {
	_drawSelectId(ctx);
} );

apiRegister( 'select.deselect()', function (ctx ) {
	var rowsBody = $( ctx.nTBody);
	$('tr',rowsBody).removeClass('selected tr-highlight');
	DataTable.multiselection[ctx.sTableId].numSelected = 0;
	DataTable.multiselection[ctx.sTableId].selectedIds = [];
} );

apiRegister( 'select.selectRowIndex()', function (dt,index, isDoubleClick ) {
	var ctx = dt.settings()[0];
	var rowsBody = $( ctx.nTBody);
	var countTr = index;
	if(isDoubleClick !== undefined){
		countTr = countTr+1;
	}
	var tr = $('tr:nth-child('+countTr+')',rowsBody);
	_selectRowIndex(dt,index,tr);
} );


// Common events with suitable namespaces
function namespacedEvents ( config ) {
	var unique = config._eventNamespace;

	return 'draw.dt.DT'+unique+' select.dt.DT'+unique+' deselect.dt.DT'+unique;
}


/* * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'preInit.dt.dtSelect', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}
	if(ctx.oInit.select !== undefined){
		DataTable.select.init( new DataTable.Api( ctx ) );
	}
} );


return DataTable.select;
}));
