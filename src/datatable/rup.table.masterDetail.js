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
DataTable.masterDetail = {};

DataTable.masterDetail.version = '1.2.4';

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
DataTable.masterDetail.init = function ( dt ) {
	var ctx = dt.settings()[0];
	//se crear el hidden en el formulario. 
	var idHidden = ctx.oInit.masterDetail.master+'_selector_'+ctx.sTableId;
	idHidden = idHidden.replace("#","");
	$('<input>').val('-1').attr({
	    type: 'hidden',
	    id: idHidden,
	    name: ctx.oInit.masterDetail.masterPrimaryKey
	}).appendTo(ctx.oInit.$filterForm)
	var rowsBody = $(ctx.oInit.masterDetail.master + " > tbody");
	//Se edita el row/fila.
	rowsBody.on( 'click.DT','tr[role="row"]',  function () {
		var tableMaster = $(ctx.oInit.masterDetail.master).DataTable();
		var rowSelected = tableMaster.rows( '.selected' ).indexes();
		var row = tableMaster.rows( rowSelected ).data();
		var id = DataTable.Api().rupTable.getIdPk(row[0]);
		$("#"+idHidden).val(""+id);
		$('#'+ctx.sTableId+'_filter_filterButton').click();

	} );
	
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */


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

apiRegister( 'masterDetail()', function () {
	return this.iterator( 'table', function ( ctx ) {
		DataTable.select.init( new DataTable.Api( ctx ) );
	} );
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
	if(ctx.oInit.masterDetail !== undefined){
		DataTable.masterDetail.init( new DataTable.Api( ctx ) );
	}
} );


return DataTable.masterDetail;
}));
