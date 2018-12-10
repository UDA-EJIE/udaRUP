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
	var selectores = {};
	var $selectorTr = $('#'+ctx.sTableId+' > tbody > tr:not(".child"):eq('+idRow+')'); 
	selectores[0] = $selectorTr;
	if($selectorTr.next().find(".child").length === 1){
		selectores[1] = $selectorTr.next().find(".child");
	}
	
	$.each(selectores,function() {//se crea eventor para los selectores creados.
		if(this.data( "events" ) === undefined || this.data( "events" ).keydown === undefined){
			this.keydown(function(e) {
			    if (e.keyCode === 27) {
			    	_restaurarFila(ctx,true);
			    }
			});
		}
	});
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
	if(ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined){
		var positionLastRow = ctx.inlineEdit.lastRow.idx;

		var $fila = $(ctx.aoData[ positionLastRow ].nTr);
		//Sin responsive
		_restaurarCeldas(ctx,$fila,$fila.find('td'),0);
		var contRest = $fila.find('td:not([style*="display: none"])').length;
		if($fila.find('td.select-checkbox').length > 0){
			contRest--;
		}
		
		//con responsive, desplegado
		_restaurarCeldas(ctx,$fila.next('.child'),$fila.next('.child').find(ctx.oInit.responsive.selectorResponsive),contRest);
	}
	if(ctx.inlineEdit !== undefined && limpiar){//si se limpia, no queda ninguna marcada
		var $selectorTr = $('#'+ctx.sTableId+' > tbody > tr:eq('+positionLastRow+')');
		ctx.inlineEdit.lastRow = undefined;
		if($selectorTr.data( "events" ) !== undefined){
			$selectorTr.off('keydown');
		}
	}
}

function _changeInputsToRup(ctx,idRow){
	// Se procesan las celdas editables

	if(ctx.oInit.colModel !== undefined){
		var table = $('#'+ctx.sTableId).DataTable( );
		var cont = 0;
		ctx.inlineEdit.lastRow = ctx.aoData[ idRow ];
		ctx.inlineEdit.lastRow.cellValues = {};
		ctx.inlineEdit.lastRow.columnsHidden = table.columns().responsiveHidden();
		
		ctx.inlineEdit.lastRow.ponerFocus = false;
		var $fila = $(ctx.aoData[ idRow ].nTr);
		//Si existe el responsive
		//Campos sin responsive
		var $target = $fila.find(ctx.oInit.responsive.details.target);
		if($target.length > 0 && $fila.next().find(".child").length === 0){
			$target.click();
		}
		cont = _recorrerCeldas(ctx,$fila,$fila.find('td'),cont);
		//Mirar los campos que estan en responsive.
		_recorrerCeldas(ctx,$fila.next('.child'),$fila.next('.child').find(ctx.oInit.responsive.selectorResponsive),cont);

	}
}

function _recorrerCeldas(ctx,$fila,$celdas,cont){
	$fila.addClass('editable');
	var colModel = ctx.oInit.colModel;
	$celdas.each( function() {
		var celda = $(this);
		var $celda = $(celda);
		
		if(!$celda.hasClass("select-checkbox") && $celda.css('display') !== 'none'){
			var cellColModel = colModel[cont];
			if(cellColModel.editable===true){
				//Convertir a input.
				
				var $input = $('<input />').val($celda.text());
				var resol = $celda.width() - 10;
				$input.css('max-width',resol+'px');
				//si es el primero dejar el focus
				if(ctx.inlineEdit.lastRow.cellValues[0] === undefined){
					ctx.inlineEdit.lastRow.ponerFocus = true;
				}
				
				ctx.inlineEdit.lastRow.cellValues[cont] = $celda.html();
				$celda.html($input);
				//NOs aseguramos de que el input existe
				if(ctx.inlineEdit.lastRow.ponerFocus){
					$input.focus();
					ctx.inlineEdit.lastRow.ponerFocus = false;
				}
			}
			cont++;
		}
	});
	
	return cont;
}

function _restaurarCeldas(ctx,$fila,$celdas,contRest){

	if($fila.hasClass("editable")){
		var colModel = ctx.oInit.colModel;
		$fila.removeClass("editable");
	
		$celdas.each( function() {
			var celda = $(this);
			var $celda = $(celda);
	
			if(!$celda.hasClass("select-checkbox")){
				var cellColModel = colModel[contRest];
				if(cellColModel.editable===true){
					$celda.html(ctx.inlineEdit.lastRow.cellValues[contRest]);
					if($celda.find('span.openResponsive').length){// si esta volverle a dar la funcionalidad
						var $span = $celda.find('span.openResponsive');
						$span.click(function(event){
							if($fila.hasClass('editable') && $fila.find('.closeResponsive').length){//nose hace nada. si esta editando
								event.stopPropagation();
							}else{
								if($span.hasClass('closeResponsive')){
									$span.removeClass('closeResponsive');
								}else{
									$span.addClass('closeResponsive');
								}
							}
						});
					}
				}
				contRest++;
			}
		});
	}
	
	return contRest;
}

function _comprobarFila(ctx,$fila){
	var count = ctx.responsive.s.current.reduce(function (a,b) {return b === false ? a+1 : a;}, 0 );
	var $span = $fila.find('span.openResponsive');
	if($fila.next('.child').length === 0){
		$span.click();
	}else{
		$span.addClass('closeResponsive');
	}
	var $filaChild = $fila.next('.child');
	var contFields = ctx.responsive.s.current.length - count;
	if($fila.find('td.select-checkbox').length){
		contFields--;
	}
	_recorrerCeldas(ctx,$filaChild,$filaChild.find(ctx.oInit.responsive.selectorResponsive),contFields);
	//Se crea el evento para el tr child de escape
	if($filaChild.data( "events" ) === undefined || $filaChild.data( "events" ).keydown === undefined){
		$filaChild.keydown(function(e) {
		    if (e.keyCode === 27) {
		    	_restaurarFila(ctx,true);
		    }
		});
	}
	var tabla = $('#'+ctx.sTableId).DataTable();
	tabla.responsive.recalc();
}

function _inResponsiveChangeInputsValues(ctx,$fila){
	var table = $('#'+ctx.sTableId).DataTable( );
	ctx.inlineEdit.lastRow.rupValues = [];
	table.columns().responsiveHidden().each( function(valor,i) {
		if(valor !== ctx.inlineEdit.lastRow.columnsHidden[i] && ctx.oInit.columns[i].editable){//Si hay cambio meter el valor al input
			var value = "";
			if(valor){//se coge el valor del child.
				var cont = ctx.inlineEdit.lastRow.columnsHidden.reduce( function (a,b) {return b === false ? a+1 : a;}, 0 );
				var total = ctx.inlineEdit.lastRow.columnsHidden.length;
				cont = cont + i - total;
				value = $fila.next('.child').find('li:eq('+cont+') input').val();

			}else{//se coge el valor de los inputs ocultos.
				value = $fila.find('td:eq('+i+') input').val();
			}
			
		}else{
			var contar = ctx.inlineEdit.lastRow.columnsHidden.reduce( function (a,b) {return b === false ? a+1 : a;}, 0 );
			var totalContar = ctx.inlineEdit.lastRow.columnsHidden.length;
			contar = contar + i - totalContar;
			// se asigna valor normal
			
			if(valor){
				value = $fila.find('td:eq('+i+') input').val();
			}else{
				value = $fila.next('.child').find('li:eq('+contar+') input').val();
			}
		}
		//Guardar los inputs
		ctx.inlineEdit.lastRow.rupValues.push({idCell: i, value: value, visible:valor});
	});
}

function _asignarInputsValues(ctx,$fila){
	var contChild = 0;
	$.each(ctx.inlineEdit.lastRow.rupValues,function(i,celda) {
		if(celda.visible){// se asignan a los inputs ocultos
			$fila.find('td:eq('+celda.idCell+') input').val(celda.value);
		}else{//se asignan alos child
			 $fila.next('.child').find('li:eq('+contChild+') input').val(celda.value);
			 contChild++;
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

apiRegister( 'inlineEdit.add()', function ( ctx ) {
	_add(ctx);
} );

apiRegister( 'inlineEdit.editInline()', function (dt, ctx, idRow ) {
	_editInline(dt,ctx,idRow);
} );

apiRegister( 'inlineEdit.restaurarFila()', function (ctx, limpiar ) {
	_restaurarFila(ctx, limpiar);
} );

apiRegister( 'inlineEdit.editSameLine()', function (ctx, idx ) {
	var mismaLinea = false;
	
	if(ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined
			&& ctx.inlineEdit.lastRow.idx === idx){
		mismaLinea = true;
	}
	
	return mismaLinea;
} );

apiRegister( 'inlineEdit.recorrerCeldas()', function (ctx,$fila,$celdas,cont) {
	_recorrerCeldas(ctx,$fila,$celdas,cont);
} );

apiRegister( 'inlineEdit.comprobarFila()', function (ctx, $fila) {
	_comprobarFila(ctx,$fila);
} );

apiRegister( 'inlineEdit.inResponsiveChangeInputsValues()', function (ctx, $fila) {
	_inResponsiveChangeInputsValues(ctx,$fila);
} );

apiRegister( 'inlineEdit.asignarInputsValues()', function (ctx, $fila) {
	_asignarInputsValues(ctx,$fila);
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
