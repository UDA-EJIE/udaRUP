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
	
	dt.on( 'responsive-display', function ( e, datatable, row, showHide) {//si se crea el tr hijo
	    if(showHide && row.child() !== undefined){
	    	row.child().on( 'dblclick.DT',  function () {
	    		idRow = row.index();
	    		_editInline(dt,ctx,idRow);
	    	} );
	 
	    	if(ctx.oInit.inlineEdit.rowDefault !== undefined && ctx.oInit.inlineEdit.rowDefault === 'estadoFinal'){
	    		ctx.oInit.inlineEdit.rowDefault = undefined;
	    		_restaurarFila(ctx,true);;
	    		_editInline(dt,ctx,row.index());
	    	}
	    }
	} );
	
	$(window).on( 'resize.dtr', DataTable.util.throttle( function () {//Se calcula el responsive
		dt.responsive.recalc();
	} ) );
	
	//Crear feedback;
	ctx.inlineEdit.nameFeedback = ctx.sTableId+'_inlineEditFeedback';
	$('#'+ctx.sTableId+'_containerToolbar').prepend($('<div />').attr('id',ctx.inlineEdit.nameFeedback));
	
	//se cambia el nombre de los validadores.
	if(ctx.oInit.inlineEdit.validate !== undefined && ctx.oInit.inlineEdit.validate.rules !== undefined){
		var rulesAux = ctx.oInit.inlineEdit.validate.rules;
		 ctx.oInit.inlineEdit.validate.rules = {};
		$.each(rulesAux,function(name,rule) {
			ctx.oInit.inlineEdit.validate.rules[name+"_inline"] = rule;
			ctx.oInit.inlineEdit.validate.rules[name+"_inline_child"] = rule;
		});
		//en inicio se cambian inline x child si hay alguno.
		
	/*	$.each(ctx.responsive.s.current,function(index,col) {
			if(col === false){
				var nameColumns = ctx.aoColumns[index].mData;
				var rule = ctx.oInit.inlineEdit.validate.rules[nameColumns+"_inline"];
				delete ctx.oInit.inlineEdit.validate.rules[nameColumns+"_inline"];
				ctx.oInit.inlineEdit.validate.rules[nameColumns+"_inline_child"] = rule;
				
			}
		}); */
	}
	
	var idForm = $('#'+ctx.sTableId+'_search_searchForm');
	//sino existe se crea
	if(idForm.length === 0){
		var $searchForm = jQuery('<form>').attr('id',ctx.sTableId+'_search_searchForm');
        $('#'+ctx.sTableId).wrapAll($searchForm);
	}
	
	// Creacion del Context Menu
	if (ctx.oInit.buttons !== undefined) {
		var botonesToolbar = ctx._buttons[0].inst.s.buttons;
		var items = {};
		$.when(
			$.each(botonesToolbar, function (i) {
				// Entra si tiene marcada la opcion para habilitarlo dentro del contextMenu
				if (this.conf.insideContextMenu) {
					// Poblamos el objeto 'items' con los botones habilitados
					items[this.conf.id] =
					{
						id: this.conf.id + '_contextMenuToolbar',
						name: this.conf.text(dt),
						icon: this.conf.icon,
						inCollection: this.inCollection,
						idCollection: undefined
					}
				}
				// Comprueba si tiene botones hijos
				if (this.buttons.length > 0) {
					var idCollection = this.conf.id;
					$.each(this.buttons, function (i) {
						// Entra si tiene marcada la opcion para habilitarlo dentro del contextMenu
						if (this.conf.insideContextMenu) {
							// Poblamos el objeto 'items' con los botones habilitados
							items[this.conf.id] =
							{
								id: this.conf.id + '_contextMenuToolbar',
								name: this.conf.text(dt),
								icon: this.conf.icon,
								inCollection: this.inCollection,
								idCollection: idCollection
							}
						}
					});
				}
			})
		).done(function () {
			var tableTr = $('#' + ctx.sTableId + ' > tbody > tr');
			tableTr.rup_contextMenu({
				callback: function(key, options) {
					var selector = items[key];
					// Recogemos el id de la accion pulsada en el context menu
					var contextMenuActionId = selector.id;
					// Le quitamos la extension '_contextMenuToolbar' para tener asi
					// el id del boton que queremos accionar
					var buttonId = contextMenuActionId.replace('_contextMenuToolbar', '');
					// Variable que nos dira si esta dentro de una coleccion
					var inCollection = selector.inCollection;
					// Variable que almacena el id de la coleccion (si no pertenece a una
					// siempre sera 'undefined')
					var idCollection = selector.idCollection;
					// Comprobamos si existe el elemento con este id
					if (inCollection && idCollection !== undefined) {
						// Obtenemos la info necesaria del boton y la guardamos en variables
						var buttonName;
						var eventDT;
						var eventConfig;

						$.each( ctx.ext.buttons, function( key ) {
							var buttonObject = ctx.ext.buttons[key];
							if (buttonObject.id === buttonId) {
								buttonName = key;
								eventDT = buttonObject.eventDT;
								eventConfig = buttonObject;
							}
						});

						// Llamamos directamente al action para no hacer aparecer y desaparecer
						// el boton, empeorando la UX
						ctx.ext.buttons[buttonName].action(undefined, eventDT, undefined, eventConfig);
					} else {
						$('#' + buttonId).trigger('click');
					}
					
			  },
				items
			});
		});
	}
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

function _onResponsiveResize(dt){
	dt.on( 'responsive-resize', function (e,settingsTable) {//si hay responsive. Param:: e,settingsTable,columns
		_addChildIcons(settingsTable.context[0]);
	});
}

function _add(dt,ctx){
	if(ctx.multiselection.numSelected > 0){
		$.rup_messages('msgConfirm', {
			message: $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.checkSelectedElems'),
			title: $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.changes'),
			OKFunction: function () {
				_restaurarFila(ctx,true);
				// Abrimos el formulario
				if(ctx.oInit.seeker !== undefined){
					DataTable.Api().seeker.limpiarSeeker(dt, ctx);// Y deselecionamos los checks y seekers
				}else{
					if(ctx.oInit.multiSelect !== undefined){
						DataTable.Api().multiSelect.deselectAll(dt);// Y deselecionamos los checks y seekers
					}else if(ctx.oInit.select !== undefined){
						DataTable.Api().select.deselect(ctx);// Y deselecionamos los checks y seekers
					}
				}
				//Crear tr ficticio
				ctx.oInit.inlineEdit.alta = true;
				dt.ajax.reload( function (  ) {
					ctx.oInit.inlineEdit.alta = undefined;
					$('#'+ctx.sTableId+' tbody tr:eq(0)').addClass('new');
					_editInline(dt,ctx,0);
				} );
				
			}
		});
	}else{
		//Crear tr ficticio
		ctx.oInit.inlineEdit.alta = true;
		dt.ajax.reload( function (  ) {
			ctx.oInit.inlineEdit.alta = undefined;
			$('#'+ctx.sTableId+' tbody tr:eq(0)').addClass('new');
			_editInline(dt,ctx,0);
		} );

	}

}

function _addChildIcons(ctx){
	var count = ctx.responsive.s.current.reduce( function (a,b) {return b === false ? a+1 : a;}, 0 );
	if(ctx.responsive.c.details.target === 'td span.openResponsive'){//por defecto
		$('#'+ctx.sTableId).find("tbody td:first-child span.openResponsive").remove();
		if(count > 0){//añadir span ala primera fila
			$.each($('#'+ctx.sTableId).find("tbody td:first-child:not(.child):not(.dataTables_empty)"),function( ){
				var $span = $('<span/>');
				if($(this).find('span.openResponsive').length === 0){
					$(this).prepend($span.addClass('openResponsive'));
				}else{//si ya existe se asigna el valor.
					$span = $(this).find('span.openResponsive');
				}
				if($(this).parent().next().hasClass('child')){
					$span.addClass('closeResponsive');
				}
				var $fila = $(this).parent();
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
				if(ctx.inlineEdit !== undefined && $fila.hasClass('editable')){
					setTimeout(_comprobarFila(ctx,$fila), 500);
				}
			});
		}else{//si la edicion en linea esta activada
			
		}
		//si hay inputs guardadoas se machancn los cambios por el responsive.
		if(ctx.inlineEdit !== undefined && 
				ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.rupValues !== undefined){
			var table = $('#'+ctx.sTableId).DataTable( );
			ctx.inlineEdit.lastRow.columnsHidden = table.columns().responsiveHidden();
			var $row = $('#'+ctx.sTableId+' tbody tr.editable:not(.child)');
			_asignarInputsValues(ctx,$row);
		}
	}
}

function _editInline ( dt,ctx, idRow ){
	if(ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.idx !== idRow){//si no es la mismafila.
		_restaurarFila(ctx,false);
	}
	var $rowSelect = $('#'+ctx.sTableId+' > tbody > tr:eq('+idRow+')'); 
	if(!$rowSelect.hasClass("editable")){
		_changeInputsToRup(ctx,idRow);
		//se deshabilita los botones de la tabla.
		DataTable.Api().buttons.disableAllButtons(ctx);
	}
	if(ctx.seeker !== undefined){
		$('#'+ctx.sTableId+' tfoot input').attr('disabled', true);
		$('#'+ctx.sTableId+' tfoot select').attr('disabled', true);
	}
	$('#'+ctx.sTableId).triggerHandler('tableInlineEditDoubleClickRow');
	var selectores = {};
	var $selectorTr = $('#'+ctx.sTableId+' > tbody > tr:not(".child"):eq('+idRow+')'); 
	selectores[0] = $selectorTr;
	if($selectorTr.next().find(".child").length === 1){
		selectores[1] = $selectorTr.next().find(".child");
	}
	
	$.each(selectores,function() {//se crea eventor para los selectores creados.
		_crearEventos(ctx,this);
	});
	//Añadir la seleccion del mismo.
	if (ctx.oInit.multiSelect !== undefined) {
		dt['row'](idRow).multiSelect();
	}else{
		var rowsBody = $( ctx.nTBody);
		$('tr',rowsBody).removeClass('selected tr-highlight');
		DataTable.Api().select.selectRowIndex(dt,idRow,true);
	}
	
	dt.responsive.recalc();
}

/**
* Metodo que obtiene la fila siguiente seleccionada.
*
* @name getRowSelected
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {object} dt - Es el objeto datatable.
* @param {string} actionType - Es el objeto datatable.
*
* @return {object} que contiene  el identificador, la pagina y la linea de la fila seleccionada
*
*/
function _getRowSelected(dt,actionType){
	var ctx = dt.settings()[0];
	var rowDefault = {id:0,page:1,line:0};
	var lastSelectedId = ctx.multiselection.lastSelectedId;
	if(!ctx.multiselection.selectedAll){
		//Si no hay un ultimo señalado se coge el ultimo;

		if(lastSelectedId === undefined || lastSelectedId === ''){
			ctx.multiselection.lastSelectedId = ctx.multiselection.selectedRowsPerPage[0].id;
		}
		$.each(ctx.multiselection.selectedRowsPerPage,function(index,p) {
			if(p.id === ctx.multiselection.lastSelectedId){
				rowDefault.id = p.id;
				rowDefault.page = p.page;
				rowDefault.line = p.line;
				rowDefault.indexSelected = index;
				if(ctx.oInit.inlineEdit !== undefined){
					ctx.oInit.inlineEdit.currentPos = rowDefault;
				}
				return false;
			}
		});
	}else{
		if(ctx.oInit.inlineEdit !== undefined){
			ctx.oInit.inlineEdit.numPosition = 0;//variable para indicar los mostrados cuando es selectAll y no se puede calcular,El inicio es 0.
		}
		if(lastSelectedId === undefined || lastSelectedId === ''){
			rowDefault.page = _getNextPageSelected (ctx,1,'next');//Como arranca de primeras la pagina es la 1.
			rowDefault.line = _getLineByPageSelected(ctx,-1);
		}else{
			//buscar la posicion y pagina
			var result = $.grep(ctx.multiselection.selectedRowsPerPage, function(v) {
				return v.id === ctx.multiselection.lastSelectedId;
			});
			rowDefault.page = result[0].page;
			rowDefault.line = result[0].line;
			var index = ctx._iDisplayLength * (Number(rowDefault.page)-1);
			index = index+1+rowDefault.line;
			//Hay que restar los deselecionados.
			 result = $.grep(ctx.multiselection.deselectedRowsPerPage, function(v) {
					return Number(v.page) < Number(rowDefault.page) || (Number(rowDefault.page) === Number(v.page) && Number(v.line) < Number(rowDefault.line));
				});
			rowDefault.indexSelected = index-result.length;//Buscar indice
			if(ctx.oInit.inlineEdit !== undefined){
				ctx.oInit.inlineEdit.numPosition = rowDefault.indexSelected-1;
			}
		}
		if(ctx.oInit.inlineEdit !== undefined){
			ctx.oInit.inlineEdit.currentPos = rowDefault;
		}
	}

	//En caso de estar en una pagina distinta , navegamos a ella
	if(dt.page()+1 !== Number(rowDefault.page)){
		var table = $('#'+ctx.sTableId).DataTable();
		table.page( rowDefault.page-1 ).draw( 'page' );
		if(ctx.oInit.inlineEdit !== undefined){
			ctx.oInit.inlineEdit.rowDefault = rowDefault;
		}
	}else{
		_editInline(dt,ctx,rowDefault.line);
	}

	return rowDefault;
}

/**
* Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.
*
* @name getNextPageSelected
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {object} ctx - Settings object to operate on.
* @param {integer} pageInit - Página a partir de la cual hay que mirar, en general serà la 1.
* @param {string} orden - Pueder ser pre o next, en función de si necesitar ir hacia adelante o hacia atrás.
*
* @return integer - devuele la página
*
*/
function _getNextPageSelected(ctx,pageInit,orden){
	var pagina = pageInit;
	var pageTotals = ctx.json.total;
	if(orden === 'prev'){//Si es previo se resta.
		pageTotals = 1;
	}
	if(ctx.multiselection.deselectedRowsPerPage.length > 0){
		var maxPagina = ctx.json.rows.length;
		var count = 0;
		//Buscar la pagina donde va estar el seleccionado.
		for (var page=pageInit; page<pageTotals;) {
			$.each(ctx.multiselection.deselectedRowsPerPage,function(index,p) {
				if(page === Number(p.page)){
					count++;
				}
				if(count === maxPagina){
					return false;
				}
			});
			if(count < maxPagina){
				pagina = page;
				page = ctx.json.total;//Se pone el total para salir del bucle.
			}
			count = 0;
			if(orden === 'next'){
				page++;
			}else if(orden === 'prev'){
				page--;
			}
		}
	}
	return pagina;
}

/**
* Metodo que obtiene la linea siguiente donde esta el primer elemento o elemento seleccionado.
*
* @name getLineByPageSelected
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {object} ctx - Settings object to operate on.
* @param {integer} lineInit - Linea a partir de la cual hay que mirar, en general será la 1.
*
* @return integer - devuele la linea
*
*/
function _getLineByPageSelected(ctx,lineInit){
	var line = -1;
	var rows = ctx.json.rows;

	$.each(rows, function( index, row ) {
		if(index > lineInit){
			var indexInArray = jQuery.inArray(DataTable.Api().rupTable.getIdPk(row), ctx.multiselection.deselectedIds);
			if(indexInArray === -1){
				line = index;
				var arra = {id:DataTable.Api().rupTable.getIdPk(row),page:ctx.json.page,line:index};
				if(ctx.oInit.inilineEdit !== undefined){
					ctx.oInit.inilineEdit.currentPos = arra;
				}
				return false;
			}
		}
	});
	return line;
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
		if(ctx.seeker !== undefined){
			$('#'+ctx.sTableId+' tfoot input').removeAttr('disabled');
			$('#'+ctx.sTableId+' tfoot select').removeAttr('disabled');
		}
		if($('#'+ctx.inlineEdit.nameFeedback).find('#'+ctx.inlineEdit.nameFeedback+'_content').length){
			$('#'+ctx.inlineEdit.nameFeedback).rup_feedback('close');
		}
		if($fila !== undefined && $fila.hasClass("new")){// se elimna el tr, porque no se guardo
			$fila.next('.child').remove();
			$fila.remove();
			//se asegura resturar multiselection
			ctx.multiselection.numSelected = 0;
			ctx.multiselection.selectedIds = [];
			ctx.multiselection.selectedRowsPerPage = [];
		}
		//se habilitan los botones.
		ctx._buttons[0].inst.s.disableAllButttons = undefined;
		DataTable.Api().buttons.displayRegex(ctx);
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
		ctx.inlineEdit.lastRow.submit = 0;
		
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
	var child = "";
	if($fila.hasClass('child')){
		child = "_child";
	}
	var ocultos = 0;
	$celdas.each( function() {
		var celda = $(this);
		var $celda = $(celda);
		
		if(!$celda.hasClass("select-checkbox")){
			var cellColModel = colModel[cont];
			if(cellColModel.editable===true){
				var $input = $('<input />').val($celda.text()).attr('name', cellColModel.name+'_inline'+child);
				var title = cellColModel.name.charAt(0).toUpperCase() + cellColModel.name.slice(1);
				$input.attr('id', cellColModel.name+'_inline'+child).attr("oldtitle",title);
				var resol = $celda.width() - 10;
				$input.css('max-width',resol+'px');
				//si es el primero dejar el focus
				if(ctx.inlineEdit.lastRow.cellValues[0] === undefined){
					ctx.inlineEdit.lastRow.ponerFocus = true;
				}
				
				ctx.inlineEdit.lastRow.cellValues[cont] = $celda.html();
				$celda.html($input);
				
				//Convertir a input.
				var searchRupType = (cellColModel.searchoptions!==undefined && cellColModel.searchoptions.rupType!==undefined)?cellColModel.searchoptions.rupType:cellColModel.rupType;
				var colModelName = cellColModel.name;
				var $elem = $('#'+colModelName+'_inline'+child,ctx.nTBody);
				// Se añade el title de los elementos de acuerdo al colname

				var columns = jQuery.grep(ctx.aoColumns, function( n) {
					  return ( n.className !== 'select-checkbox' );
				});
				$elem.attr({
					'title': columns[cont].sTitle,
					'class': 'editable customelement'
				}).removeAttr('readOnly');
				// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
				if(searchRupType!==undefined) {
					var searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions;
	
					/*
					 * PRE Configuración de los componentes RUP
					 */
					if(searchRupType === 'combo'){
						searchEditOptions = $.extend({},{menuWidth:$elem.width()}, searchEditOptions, {width:'97%'});
						$elem.val('');
					} else if(searchRupType === 'date'){
						$elem.css('width','86%');
						$elem.css('max-width','80px');
						$elem.css('min-width','75px');
					}
	
					// Invocación al componente RUP
					$elem['rup_'+searchRupType](searchEditOptions);
					if(searchRupType === 'combo'){//asignar el valor
						$('#'+$elem.attr('id')).rup_combo('setRupValue',ctx.inlineEdit.lastRow.cellValues[cont]);
					}
				}else if(cellColModel.edittype === 'checkbox'){
					$elem.prop('type', 'checkbox');
					var valueCelda = ctx.inlineEdit.lastRow.cellValues[cont];
					if($(valueCelda).find('i.fa-times').length === 1){
						$elem.prop('checked', false);
					}else if($(valueCelda).find('i.fa-check').length === 1){
						$elem.prop('checked', true);
					}
				}
				//Fin conversion
				
				//NOs aseguramos de que el input existe
				if(ctx.inlineEdit.lastRow.ponerFocus){
					$input.focus();
					ctx.inlineEdit.lastRow.ponerFocus = false;
				}
			}
			cont++;
			if($celda.css('display') === 'none'){
				ocultos++;
			}
		}
	});
	
	return cont - ocultos;
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
	 _crearEventos(ctx,$filaChild);
	var tabla = $('#'+ctx.sTableId).DataTable();
	tabla.responsive.recalc();
}

function _crearEventos(ctx,$selector){
	if($selector.data( "events" ) === undefined || $selector.data( "events" ).keydown === undefined){
		$selector.keydown(function(e) {
		    if (e.keyCode === 27) {//Esc
		    	if($selector.hasClass("new")){//si se da alta y se cancela.
		    		var dt = $('#'+ctx.sTableId).DataTable();
		    		ctx.inlineEdit.lastRow = undefined;
		    		dt.ajax.reload();
		    	}else{//si se modifica
		    		_restaurarFila(ctx,true);
		    	}
		    }else if (e.keyCode === 13 || 
		    		(e.keyCode === 9 && _lastIndexEditable(ctx,$(e.target)))) {//Intro 13, //Tabulador 9
		    	var child = false;
		    	if($selector.find('.child').length === 1){
		    		child = true;;
		    	}
		    	_guardar(ctx,$selector,child);
		    }
		});
	}
}

function _lastIndexEditable(ctx,$target){
	var indexTarget = $target.closest('td').index();
	//Se recooren las columnas a la inversa, si es editable, se devuelve la posicion
	//Si llama el hijo calcalur index
	if($target.closest('tr.child').length === 1){
		indexTarget = ctx.aoColumns.length - $target.closest('ul').find('li').length + $target.closest('li').index();
	}
	var index = 0;
	for (var i = ctx.aoColumns.length-1; i >= 0; i--) {
		var nombreColumna = ctx.aoColumns[i].data;
		for (var j = 0 ; j <= ctx.oInit.colModel.length ; j++ ) {
			  var nombreAux = ctx.oInit.colModel[j].name;
			  var editable = ctx.oInit.colModel[j].editable;
			  if ( editable === true && nombreAux === nombreColumna ){
				  index = i;
				  break;
			  }
		}
		if(index !== 0){
			break;
		}
	}
	if(indexTarget === index){
		return true;
	}
	return false;
}
/**
* Metodo que serializa los datos del formulario.
*
* @name _inlineFormSerialize
* @function
* @since UDA 3.6.0 // Datatable 1.2.0
*
* @param {object} idForm - Formulario que alberga los datos.
*
* @return {string} - Devuelve los datos del formulario serializados
*
*/
function _editFormSerialize($fila,ctx,child){
	var serializedForm = {};
	var selectores = {};

	//añadir columans child
	if(child === false){
		selectores[0] = $fila;
		if($fila.next().find('.child').length === 1){
			selectores[1] = $fila.next();
		}
	}else{//existe child
		selectores[0] = $fila.prev();
		selectores[1] = $fila;
	}
	//Se vacian las reglas.
	$.each(selectores,function() {
		//añadir las columnas parents y child
		var busqueda = 'td:not([style*="display: none"]):not(".select-checkbox") input,td:not([style*="display: none"]):not(".select-checkbox") select';
		if(this.hasClass("child")){//si es el hijo solo buscar los select e inputs que hay.
			busqueda = "select,input";
		}
		$.each( this.find(busqueda), function( i, obj ) {
			var nombre = obj.id.replace('_inline','').replace('_child','');
			_aplicarValidaciones(ctx,obj.id);
			var value = $(obj).val();
			if($(obj).prop('type') !== undefined && $(obj).prop('type') === 'checkbox'){
				value = "0";
				if($(obj).prop('checked')){
					value = "1";
				}
			}
			serializedForm[nombre] = value;
		});
	});
	
	//añadir los no editables
	jQuery.grep(ctx.oInit.colModel, function( n,i) {
		  if ( n.editable !== true ){
			  var text = ctx.json.rows[$fila.index()][n.name];
			  serializedForm[n.name] = text;
			  return n;
		  }
	});
	
	return serializedForm;
}

function _guardar(ctx,$fila,child){

	//Se serializa el formulario con los cambios
	var row = _editFormSerialize($fila,ctx,child);
	var actionType = "PUT";
	if($fila.hasClass('new') || (child && $fila.prev().hasClass('new'))){//si ejecurar el child, hay que buscar el padre para saver si es nuevo.
		actionType = "POST";
	}
	_callSaveAjax(actionType,ctx,$fila,row,'');
}

/**
* Llamada al servidor con los datos de edición.
*
* @name _callSaveAjax
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {string} actionType - Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest.
* @param {object} dt - Es el objeto datatable.
* @param {object} row - Son los datos que se cargan.
* @param {integer} idRow - Número con la posición de la fila que hay que obtener.
* @param {boolean} continuar - Si es true guarda la pagina y se queda en el dialog , si es false guarda y cierra el dialog.
* @param {string} idTableDetail - Identificdor del detail de la table.
* @param {string} url - Url que se añade para llamar  al controller.
*
*/
function _callSaveAjax(actionType,ctx,$fila,row,url){
	var idTableDetail = $(ctx.oInit.inlineEdit.detailForm);
	$('#'+ctx.sTableId).triggerHandler('tableEditFormBeforeCallAjax');
	// add Filter
	var feed = $('#'+ctx.inlineEdit.nameFeedback);
	var msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.modifyOK');
	if(url === '/deleteAll' || actionType === 'DELETE'){
		msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.deletedOK');
	}

	var ajaxOptions = {
		url : ctx.oInit.urlBase+url,
		accepts: {'*':'*/*','html':'text/html','json':'application/json, text/javascript',
			'script':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
			'text':'text/plain','xml':'application/xml, text/xml'},
		type : actionType,
		data : row,
		dataType : 'json',
		showLoading : false,
		contentType : 'application/json',
		async : true,
		success : function(data, status, xhr) {
			var dt = $('#'+ctx.sTableId).DataTable();
			if(url !== '/deleteAll' && actionType !== 'DELETE'){

				_callFeedbackOk(ctx,ctx.multiselection.internalFeedback,msgFeedBack,'ok');//Se informa feedback de la tabla
				
				if(actionType === 'PUT'){//Modificar
					dt.row($fila.index()).data(row);// se actualiza al editar
					ctx.json.rows[$fila.index()] = row;
					// Actualizamos el ultimo id seleccionado (por si ha sido editado)
					var posicion = 0;
					$.each(ctx.multiselection.selectedRowsPerPage,function(index,p) {
						if(p.id === ctx.multiselection.lastSelectedId){
							posicion = index;
							return;
						}
					});
					if(ctx.seeker !== undefined && !jQuery.isEmptyObject(ctx.seeker.ajaxOption.data.search)
							&& ctx.seeker.search.funcionParams.length > 0){
						_comprobarSeeker(row,ctx,$fila.index());
					}
					ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row);
					ctx.multiselection.selectedRowsPerPage[posicion].id = DataTable.Api().rupTable.getIdPk(row);
				}else{// dar alta
					var idPk = DataTable.Api().rupTable.getIdPk(row);
					ctx.multiselection.selectedIds = [idPk];
					ctx.multiselection.lastSelectedId = idPk;
					ctx.multiselection.numSelected = 1;
				}
				ctx.inlineEdit.row = row;
			}else{// Eliminar
				ctx.multiselection.internalFeedback.type = 'eliminar';
				ctx.multiselection.internalFeedback.msgFeedBack = msgFeedBack;
				if(ctx.oInit.multiSelect !== undefined){
					DataTable.Api().multiSelect.deselectAll(dt);
				}else if(ctx.oInit.select !== undefined){
					DataTable.Api().select.deselect(ctx);
				}
				$('#' + ctx.sTableId).triggerHandler('tableEditFormAfterDelete');
			}
			ctx.inlineEdit.lastRow = undefined;
			ctx._buttons[0].inst.s.disableAllButttons = undefined;
			if(ctx.seeker !== undefined){
				$('#'+ctx.sTableId+' tfoot input').removeAttr('disabled');
				$('#'+ctx.sTableId+' tfoot select').removeAttr('disabled');
			}
			
				// Recargar datos
			dt.ajax.reload( function (  ) {
				_addChildIcons(ctx);
			} );
			
			$('#' + ctx.sTableId).triggerHandler('tableEditLineSuccessCallSaveAjax');
		},
		complete : function() {
			$('#' + ctx.sTableId).triggerHandler('tableEditFormCompleteCallSaveAjax');
		},
		error : function(xhr, ajaxOptions,thrownError) {
			var divErrorFeedback = $('#'+ctx.inlineEdit.nameFeedback);
			if(divErrorFeedback.length === 0){
				divErrorFeedback = $('<div/>').attr('id', ctx.sTableId+'feedback_ok').insertAfter('#'+ctx.sTableId);
			}
			_callFeedbackOk(ctx,divErrorFeedback,xhr.responseText,'error');
			$('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax');
		},
		validate:ctx.oInit.inlineEdit.validate,
		feedback:feed.rup_feedback({type:"ok",block:false})
	};
	
	var idForm = $('#'+ctx.sTableId+'_search_searchForm');
	if(ctx.inlineEdit.lastRow !== undefined){
		ctx.inlineEdit.lastRow.submit = 1;
	}
	idForm.rup_form('ajaxSubmit', ajaxOptions);
}

function _aplicarValidaciones(ctx,id){
	//se añaden las nuevas reglas
	if(ctx.inlineEdit.lastRow.submit === undefined || ctx.inlineEdit.lastRow.submit === 0){
		var idForm = $('#'+ctx.sTableId+'_search_searchForm');
		//idForm.validate();
	}
	/*	$.each(ctx.oInit.inlineEdit.validate.rules,function(rule) {
			var idReplace = id.replace('_child','');
			if(rule.replace('_child','') === idReplace){
				$("#"+id).rules("remove");
				$("#"+idReplace).rules("remove");
				$("#"+id).rules("add", this);
				return false;
			}
		
		});*/

}

/**
* Llamada para crear el feedback dentro del dialog.
*
* @name callFeedbackOk
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
*
* @param {object} ctx - Settings object to operate on.
* @param {object} feedback - Div donde se va ejecutar el feedback.
* @param {string} msgFeedBack - Mensaje para el feedback.
* @param {string} type - Tipos del feedback, mirar en el rup.feedback..
*
*/
function _callFeedbackOk(ctx,feedback,msgFeedBack,type){
	$('#' + ctx.sTableId).triggerHandler('tableEditFormFeedbackShow');
	var confDelay = ctx.oInit.feedback.okFeedbackConfig.delay;
	feedback.rup_feedback({message:msgFeedBack,type:type,block:false, gotoTop:false});
	feedback.rup_feedback('set',msgFeedBack);
	//Aseguramos que el estilo es correcto.
	if(type === 'ok'){
		setTimeout(function(){
			feedback.rup_feedback('destroy');
			feedback.css('width','100%');
			$('#' + ctx.sTableId).triggerHandler('tableEditFormInternalFeedbackClose');
		}, confDelay);
	}
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
				var $inputChild = $fila.next('.child').find('li:eq('+cont+')').find('select,input');
				value = $inputChild.val();
				$inputChild.prop('disabled', false);

			}else{//se coge el valor de los inputs ocultos.
				var $input = $fila.find('td:eq('+i+')').find('select,input');
				value = $input.val();
				$input.prop('disabled', true);
			}
			
		}else{
			var contar = ctx.inlineEdit.lastRow.columnsHidden.reduce( function (a,b) {return b === false ? a+1 : a;}, 0 );
			var totalContar = ctx.inlineEdit.lastRow.columnsHidden.length;
			contar = contar + i - totalContar;
			// se asigna valor normal
			
			if(valor){
				value = $fila.find('td:eq('+i+')').find('select,input').val();
			}else{
				value = $fila.next('.child').find('li:eq('+contar+')').find('select,input').val();
			}
		}
		//Guardar los inputs
		ctx.inlineEdit.lastRow.rupValues.push({idCell: i, value: value, visible:valor});
	});
}

function _asignarInputsValues(ctx,$fila){
	var contChild = 0;
	$.each(ctx.inlineEdit.lastRow.rupValues,function(i,celda) {
		if(celda.visible && celda.value !== undefined ){// se asignan a los inputs ocultos
			if($fila.find('td:eq('+celda.idCell+')').find('select').length > 0){
				$fila.find('td:eq('+celda.idCell+')').find('select').rup_combo('setRupValue',celda.value);
			}else{
				$fila.find('td:eq('+celda.idCell+') input').val(celda.value);
			}
		}else{//se asignan alos child
			if($fila.next('.child').find('li:eq('+contChild+')').find('select').length > 0){
				$fila.next('.child').find('li:eq('+contChild+')').find('select').rup_combo('setRupValue',celda.value);
			}else{
				$fila.next('.child').find('li:eq('+contChild+') input').val(celda.value);
			}
			 contChild++;
		}
	});
}

function  _createTr(dt,ctx,columns){
	var row = {};
	jQuery.grep(ctx.oInit.colModel, function( n) {
		row[n.name] = '';
	});
	columns.unshift(row);
	return columns;
}

function _drawInlineEdit(tabla,ctx){
	_addChildIcons(ctx);
	var row = ctx.inlineEdit.row;
	if(ctx.inlineEdit.row !== undefined  && _notExistOnPage(ctx)){
		var rowAux = row;
									
		$.each(ctx.json.rows,function(index,r) {
			var rowNext = r;
			tabla.row(index).data(rowAux);
			rowAux = rowNext;
		});
		ctx.json.rows.pop();
		ctx.json.rows.splice(0,0,row);
	}
}

function _notExistOnPage(ctx){
	var pk = DataTable.Api().rupTable.getIdPk(ctx.inlineEdit.row);
	var encontrado = true;
	$.each(ctx.json.rows,function(index,r) {
		if(DataTable.Api().rupTable.getIdPk(r) === pk){
			encontrado = false;
			return false;
		}
	});
	ctx.inlineEdit.row = undefined;
	return encontrado;
}

/**
* Metodo que elimina todos los registros seleccionados.
*
* @name _deleteAllSelects
* @function
* @since UDA 3.7.0 // Datatable 1.0.0
*
* @param {object} dt - Es el objeto datatable.
*
*/
function _deleteAllSelects(dt){
	var ctx = dt.settings()[0];
	
	var idRow = 0;
	$.rup_messages('msgConfirm', {
		message: $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.deleteAll'),
		title: $.rup.i18nParse($.rup.i18n.base, 'rup_datatable.delete'),
		OKFunction: function () {
			if(ctx.multiselection.selectedIds.length > 1){
				var row = {};
				row.core =  {'pkToken': ctx.oInit.multiplePkToken,'pkNames': ctx.oInit.primaryKey};
				row.multiselection = {};
				row.multiselection.selectedAll = ctx.multiselection.selectedAll;
				if(row.multiselection.selectedAll){
					row.multiselection.selectedIds = ctx.multiselection.deselectedIds;
				}else{
					row.multiselection.selectedIds = ctx.multiselection.selectedIds;
				}
				_callSaveAjax('POST',ctx,idRow,row,'/deleteAll');
			}else{
				row = ctx.multiselection.selectedIds[0];
				row = row.replace(ctx.oInit.multiplePkToken,'/');
				_callSaveAjax('DELETE',ctx,'',idRow,'/'+row);
			}
		}
	});
}

/**
* Metodo que comprueba el seeker.
*
* @name _comprobarSeeker
* @function
* @since UDA 3.6.0 // Datatable 1.0.0
*
* @param {object} row - Son los datos que se cargan.
* @param {object} ctx - Settings object to operate on.
* @param {number} idRow - Identificador de la fila.
*
*/
function _comprobarSeeker(row,ctx,idRow){
	var cumple = true;
	$.each( ctx.seeker.ajaxOption.data.search, function( key, obj ) {
		if(row[key].indexOf(obj)  === -1){
			cumple = false;
			return false;
		}
	});
	if(!cumple){// eliminar del seeker, por pagina y linea		
		ctx.seeker.search.funcionParams = jQuery.grep(ctx.seeker.search.funcionParams, function(search) {
			  return (search.page !== Number(ctx.json.page) || search.pageLine !== idRow+1);
			});
		// se borra el icono
		
		$('#'+ctx.sTableId+' tbody tr:eq('+idRow+') td.select-checkbox span.ui-icon-search').remove();
		$('#'+ctx.sTableId+' tbody tr:eq('+idRow+') td span.ui-icon-search').remove();
		DataTable.Api().seeker.updateDetailSeekPagination(1,ctx.seeker.search.funcionParams.length,ctx);
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

apiRegister( 'inlineEdit.add()', function ( dt,ctx ) {
	_add(dt,ctx);
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

apiRegister( 'inlineEdit.onResponsiveResize()', function (dt) {
	_onResponsiveResize(dt);
} );

apiRegister( 'inlineEdit.addchildIcons()', function (ctx) {
	_addChildIcons(ctx);
} );

apiRegister( 'inlineEdit.createTr()', function (dt,ctx,columns) {
	return _createTr(dt,ctx,columns);
} );

apiRegister( 'inlineEdit.drawInlineEdit()', function (tabla,ctx) {
	return _drawInlineEdit(tabla,ctx);
} );

apiRegister( 'inlineEdit.getRowSelected()', function ( dt,actionType ) {
	return _getRowSelected(dt,actionType);
} );

apiRegister( 'inlineEdit.deleteAllSelects()', function ( dt ) {
	return _deleteAllSelects(dt);
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
