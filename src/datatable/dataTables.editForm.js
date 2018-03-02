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
	var opts = init === undefined ?	defaults :	init;
	
	//DetailForm se convierte en function
	//Se inicializan los botones
	ctx.oInit.formEdit.detailForm = $(ctx.oInit.formEdit.detailForm);
	ctx.oInit.formEdit.idForm = ctx.oInit.formEdit.detailForm.find('form');
	ctx.oInit.formEdit.id = ctx.oInit.formEdit.detailForm[0].id.replace('_detail_div','');
	
	//Se coge el adapter, y se crea la barra de navegación
	_callNavigationBar(dt);
	//Se inicializa el editFrom la info
	_updateDetailPagination(ctx,1,1);
		
	//se añade el boton de cancelar
	ctx.oInit.formEdit.buttoCancel = ctx.oInit.formEdit.detailForm.find('#table_detail_link_cancel');
	ctx.oInit.formEdit.buttoCancel.bind('click', function() {
		ctx.oInit.formEdit.okCallBack = false;
		var feedback = ctx.oInit.formEdit.detailForm.find('#table_detail_feedback');

		//Se cierra el dialog
		ctx.oInit.formEdit.detailForm.rup_dialog("close");
		//Despues de cerrar
		//Se limpia los elementos.
		if(ctx.oInit.formEdit.idForm.find('.error').length > 0){
			ctx.oInit.formEdit.idForm.rup_validate("resetElements");
		}
		//Se cierran los mensajes del feedback
		if(feedback[0].className !== ''){
			feedback.rup_feedback('hide');
		}
	});
	var idRow;
	var rowsBody = $( ctx.nTBody);
	//Se edita el row/fila.
	rowsBody.on( 'dblclick.DT','tr',  function () {
		idRow = this._DT_RowIndex;
		//Añadir la seleccion del mismo.
		dt['row'](idRow).multiSelect();		
		DataTable.editForm.fnOpenSaveDialog('PUT',dt,idRow);
	} );
	
	//Se captura evento de cierre
	ctx.oInit.formEdit.detailForm.on( "dialogbeforeclose", function( event, ui ) {
		// si es igual no hacer nada.
		var formSerializado = ctx.oInit.formEdit.idForm.formSerialize();
		if(ctx.oInit.formEdit.dataOrigin === formSerializado){
			return true;
		}
		if(ctx.oInit.formEdit.dataOrigin !== formSerializado && !ctx.oInit.formEdit.okCallBack){
			
			$.rup_messages('msgConfirm', {
				message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.saveAndContinue'),
				title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
				OKFunction: function () {
					ctx.oInit.formEdit.okCallBack = true;
					ctx.oInit.formEdit.detailForm.rup_dialog("close");
					},
				CANCELFunction: function (){
					ctx.oInit.formEdit.okCallBack = false
					} 	
			});
			
			
		}
		//En caso de aceptar se cierrar y se limpia.
		if(!ctx.oInit.formEdit.okCallBack || ctx.oInit.formEdit.okCallBack === undefined){
			return false;
		}
		
	} );
	ctx.oInit.formEdit.detailForm.settings = {type: $.rup.dialog.DIV};
	
	var api = new DataTable.Api( ctx );
	api.on( 'draw.dtSelect.dt select.dtSelect.dt', function () {//Si lleva parametros es que estamos en la navegacion interna.
		if(ctx.oInit.formEdit.$navigationBar.funcionParams !== undefined && ctx.oInit.formEdit.$navigationBar.funcionParams.length > 0){
			var params = ctx.oInit.formEdit.$navigationBar.funcionParams;
			//Se hay selectAll, comprobar la linea ya que puede variar.al no tener ningún selected.Se recoore el json.
			if(DataTable.multiSelect.multiselection.selectedAll){
				var linea = -1;
				if(params[3] !== undefined && (params[3] === 'prev' || params[3] === 'last')){
					linea = ctx.json.rows.length;
					params[2] = _getLineByPageSelectedReverse(ctx,linea);
				}else{
					params[2] = _getLineByPageSelected(ctx,linea);//Se inicia en -1 para que coja desde la primera linea.next y prev.
				}
				
			}
			DataTable.editForm.fnOpenSaveDialog(params[0],params[1],params[2]);
			ctx.oInit.formEdit.$navigationBar.funcionParams = {};
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

DataTable.editForm.fnOpenSaveDialog = function _openSaveDialog(actionType,dt,idRow){
	var ctx = dt.settings()[0];
	var idForm = ctx.oInit.formEdit.idForm;

	var row = ctx.json.rows[idRow];
	var rowArray = $.rup_utils.jsontoarray(row);
	
	if (actionType === 'PUT') {
		$.rup_utils.populateForm(rowArray, idForm);
		var multiselection = DataTable.multiSelect.multiselection;
		var indexInArray = jQuery.inArray(row.id, multiselection.selectedIds);
		if(DataTable.multiSelect.multiselection.selectedAll){//Si es selecAll recalcular el numero de los selects.,solo la primera vez es necesario.
			indexInArray = ctx.oInit.formEdit.$navigationBar.numPosition;
		}
		_updateDetailPagination(ctx,indexInArray+1,multiselection.numSelected);
		//Se limina el lapicero indicador.
		$('#'+ctx.sTableId+' tbody tr td.select-checkbox span.ui-icon-pencil').remove();
		//se añade el span con el lapicero
		var spanPencil = $("<span/>").addClass('ui-icon ui-icon-rupInfoCol ui-icon-pencil');
		$($('#'+ctx.sTableId+' tbody tr td.select-checkbox')[idRow]).append(spanPencil)
		//Se guarda el ultimo id editado.
		DataTable.multiSelect.multiselection.lastSelectedId = row.id;
		//Se muestra el dialog.
		ctx.oInit.formEdit.$navigationBar.show();
	} else if(actionType === 'POST'){
		$.rup_utils.populateForm(null, idForm);
		ctx.oInit.formEdit.$navigationBar.hide();
	}
	
	ctx.oInit.formEdit.detailForm.rup_dialog(ctx.oInit.formEdit.detailForm.settings);
	ctx.oInit.formEdit.detailForm.rup_dialog("open");
	
	//Se guardan los datos originales
	ctx.oInit.formEdit.dataOrigin = idForm.formSerialize();
	ctx.oInit.formEdit.okCallBack = false
	
	//se añade el boton de guardar
	var button = ctx.oInit.formEdit.detailForm.find('#table_detail_button_save');
	button.unbind( "click" );
	button.bind('click', function() {
		//Comprobar si row ha sido modificada
		//Se serializa el formulario con los cambios
		row = idForm.formSerialize();
		//Verificar los checkbox vacíos.
		row = _returnCheckEmpty(idForm,idForm.formSerialize());
		//Se transforma
		row = $.rup_utils.queryStringToJson(row);	
		ctx.oInit.formEdit.okCallBack = true;
		ctx.oInit.formEdit.detailForm.rup_dialog("close");
		_callSaveAjax(actionType,dt,row,idRow,false,ctx.oInit.formEdit.detailForm);
	});
	
	//se añade el boton de guardar y continuar
	var buttonContinue = ctx.oInit.formEdit.detailForm.find('#table_detail_button_save_repeat');
	buttonContinue.unbind( "click" );
	buttonContinue.bind('click', function() {
		//Comprobar si row ha sido modificada
		//Se serializa el formulario con los cambios
		row = idForm.formSerialize();
		//Verificar los checkbox vacíos.
		row = _returnCheckEmpty(idForm,idForm.formSerialize());
		//Se transforma
		row = $.rup_utils.queryStringToJson(row);
		_callSaveAjax(actionType,dt,row,idRow,true,ctx.oInit.formEdit.detailForm)
	});


}

function _callSaveAjax(actionType,dt,row,idRow,continuar,idTableDetail){
	var ctx = dt.settings()[0];
	// add Filter
	var feed = idTableDetail.find('#table_detail_feedback');
	var ajaxOptions = {
		url : ctx.oInit.urlBase,
		accepts: {'*':'*/*','html':'text/html','json':'application/json, text/javascript',
			'script':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
			'text':'text/plain','xml':'application/xml, text/xml'},
		type : actionType,
		data : row,
		dataType : 'json',
		showLoading : false,
		contentType : 'application/json',
		async : true,
		beforeSend : function(xhr, options) {
			//return $self.triggerHandler('rupTable_multifilter_beforeAdd',[xhr, options]);
		},
		success : function(data, status, xhr) {
			if(continuar){//Se crea un feddback_ok,para que no se pise con el de los errores
				var divOkFeedback = idTableDetail.find('#'+feed[0].id + '_ok');
				if(divOkFeedback.length === 0){
					divOkFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed)
				}
				_callFeedbackOk(ctx,divOkFeedback);//Se informa
			}else{
				_callFeedbackOk(ctx,DataTable.multiSelect.multiselection.internalFeedback);//Se informa
			}
			dt.row(idRow).data(row);// se actualiza
			ctx.json.rows[idRow] = row;
		},
		error : function(xhr, ajaxOptions,thrownError) {
			console.log('Errors '+thrownError);

		},
		validate:ctx.oInit.formEdit.validate,
		feedback:feed.rup_feedback({type:"ok",block:false})
	};
	
	ctx.oInit.formEdit.idForm.rup_form('ajaxSubmit', ajaxOptions);
}

function _callFeedbackOk(ctx,feedback){
	var confDelay = ctx.oInit.feedback.okFeedbackConfig.delay;
	feedback.rup_feedback({message:$.rup.i18nParse($.rup.i18n.base, 'rup_table.modifyOK'),type:"ok",block:false});
	//Aseguramos que el estilo es correcto.
	setTimeout(function(){
		feedback.rup_feedback('destroy');
		feedback.css('width','100%');
	}, confDelay);
}

function _returnCheckEmpty(idForm,values){
	var maps = jQuery(idForm.selector+' input[type=checkbox]:not(:checked)').map(
                    function() {
                        return "&"+this.name+"=0"
                    }).get().toString();
	return values+maps;
}

function _updateDetailPagination(ctx,currentRowNum,totalRowNum){
	var formId = ctx.oInit.formEdit.id;
	var tableId = ctx.oInit.formEdit.$navigationBar[0].id;
	if (currentRowNum === 1) {
		$('#first_' + tableId + ', #back_' + tableId, ctx.oInit.formEdit.detailForm).addClass('ui-state-disabled');
	} else {
		$('#first_' + tableId + ', #back_' + tableId, ctx.oInit.formEdit.detailForm).removeClass('ui-state-disabled');
	}
	if (currentRowNum === totalRowNum) {
		$('#forward_' + tableId + ', #last_' + tableId, ctx.oInit.formEdit.detailForm).addClass('ui-state-disabled');
	} else {
		$('#forward_' + tableId + ', #last_' + tableId, ctx.oInit.formEdit.detailForm).removeClass('ui-state-disabled');
	}

	$('#rup_table_selectedElements_' + formId).text(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.defaults.detailForm_pager'), currentRowNum, totalRowNum));
}

function _callNavigationBar(dt){
	var ctx = dt.settings()[0];
	ctx.oInit._ADAPTER = $.rup.adapter[jQuery.fn.rup_table.plugins.core.defaults.adapter];
	ctx.oInit.formEdit.$navigationBar = ctx.oInit.formEdit.detailForm.find('#table_detail_navigation');
	var settings = {};
	//Funcion para obtener los parametros de navegacion.
	settings.fncGetNavigationParams = function getNavigationParams_multiselection(linkType) {
		var $self = this,
			execute = false,
			changePage = false,
			index = 0,
			newPageIndex = 0,
			npos = ctx.oInit.formEdit.$navigationBar.currentPos,
			page = dt.page()+1,
			newPage = page,
			lastPage = ctx.json.total;
		var multiselection = DataTable.multiSelect.multiselection;
		npos[0] = parseInt(npos[0], 10);
		var rowSelected;
		
		switch (linkType) {
		case 'first':
			// Si no se han seleccionado todos los elementos
			if (!multiselection.selectedAll) {
				rowSelected = multiselection.selectedRowsPerPage[0];
				rowSelected.indexSelected = 0; 
			} else {
				// En el caso de que se hayan seleccionado todos los elementos de la tabla
				// Recorremos las páginas buscando la primera en la que existan elementos seleccionados
				ctx.oInit.formEdit.$navigationBar.numPosition = 0;
				rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
				rowSelected.page = _getNextPageSelected (ctx,1,'next');
				if(Number(rowSelected.page) === page){//Si es la misma pagina.buscar la linea
					rowSelected.line = _getLineByPageSelected(ctx,-1);
				}
			}
			break;
		case 'prev':
			// Si no se han seleccionado todos los elementos
			if (!multiselection.selectedAll) {
				var indexPrev = ctx.oInit.formEdit.$navigationBar.currentPos.indexSelected-1;
				rowSelected = multiselection.selectedRowsPerPage[indexPrev];
				rowSelected.indexSelected = indexPrev; 
			}else{
				ctx.oInit.formEdit.$navigationBar.numPosition--;
				var linea = _getLineByPageSelectedReverse(ctx,ctx.oInit.formEdit.$navigationBar.currentPos.line);
				if(linea === -1){//Es que hay que cambiar de pagina.
					//buscarPAgina.
					rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
					rowSelected.page = _getNextPageSelected (ctx,page-1,'prev');
				}else{
					rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
				}
			}

			break;
		case 'next':
			// Si no se han seleccionado todos los elementos
			if (!multiselection.selectedAll) {
				var indexNext = ctx.oInit.formEdit.$navigationBar.currentPos.indexSelected+1;
				rowSelected = multiselection.selectedRowsPerPage[indexNext];
				rowSelected.indexSelected = indexNext; 
			}else{
				ctx.oInit.formEdit.$navigationBar.numPosition++;
				//2 casos: Si hay que navegar o no.
				var lineaNext = _getLineByPageSelected(ctx,ctx.oInit.formEdit.$navigationBar.currentPos.line);
				if(lineaNext === -1){//Es que hay que cambiar de pagina.
					//buscarPAgina.
					rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
					rowSelected.page = _getNextPageSelected (ctx,page+1,'next');
				}else{
					rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
				}
			}

			break;
		case 'last':
				// Si no se han seleccionado todos los elementos
			if (!multiselection.selectedAll) {
				var indexLast = multiselection.selectedRowsPerPage.length-1;
				rowSelected = multiselection.selectedRowsPerPage[indexLast];
				rowSelected.indexSelected = indexLast;
			} else {
				ctx.oInit.formEdit.$navigationBar.numPosition = DataTable.multiSelect.multiselection.numSelected - 1;
				rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
				rowSelected.page = _getNextPageSelected (ctx,lastPage,'prev');
				if(Number(rowSelected.page) === page){//Si es la misma pagina.buscar la linea
					rowSelected.line = _getLineByPageSelectedReverse(ctx,-1);
				}
			}
			
		}
		if(Number(rowSelected.page) !== page){
			var table = $('#'+ctx.sTableId).DataTable();						 
			table.page( rowSelected.page-1 ).draw( 'page' );
			//Se añaden los parametros para luego ejecutar, la funcion del dialog.
			ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT',dt,rowSelected.line,linkType];
		}else{//Si nose pagina se abre directamente la funcion.
			DataTable.editForm.fnOpenSaveDialog('PUT',dt,rowSelected.line);
		}
		//Se actualiza la ultima posicion movida.
		ctx.oInit.formEdit.$navigationBar.currentPos = rowSelected;
		//Se añade un parametro respecto el rup.table para permitir la convivencia.
		return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1,''];
		
	};


	ctx.oInit.formEdit.$navigationBar.data('settings', settings);
	var barraNavegacion = $.proxy(ctx.oInit._ADAPTER.createDetailNavigation,ctx.oInit.formEdit.$navigationBar);
	ctx.oInit.formEdit.$navigationBar.append(barraNavegacion);
}

function _getRowSelected(dt){
	var ctx = dt.settings()[0];
	var rowDefault = {id:0,page:1,line:0};
	if(!DataTable.multiSelect.multiselection.selectedAll){
		$.each(DataTable.multiSelect.multiselection.selectedRowsPerPage,function(index,p) {
			if(p.id === DataTable.multiSelect.multiselection.lastSelectedId){
				rowDefault.id = p.id;
				rowDefault.page = p.page;
				rowDefault.line = p.line;
				rowDefault.indexSelected = index;
				ctx.oInit.formEdit.$navigationBar.currentPos = rowDefault;
				return false;
			}
		});	
	}else{
		ctx.oInit.formEdit.$navigationBar.numPosition = 0;//variable para indicar los mostrados cuando es selectAll y no se puede calcular,El inicio es 0.
		
		rowDefault.page = _getNextPageSelected (ctx,1,'next');//Como arranca de primeras la pagina es la 1.
		rowDefault.line = _getLineByPageSelected(ctx,-1);
		
		ctx.oInit.formEdit.$navigationBar.currentPos = rowDefault;
	}
	
	//En caso de estar en una pagina distinta , navegamos a ella
	if(dt.page()+1 !== rowDefault.page){
		var table = $('#'+ctx.sTableId).DataTable();						 
		table.page( rowDefault.page-1 ).draw( 'page' );
		ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT',dt,rowDefault.line];
	}

	return rowDefault;
}

function _getNextPageSelected(ctx,pageInit,orden){
	var pagina = pageInit;
	var pageTotals = ctx.json.total;
	if(orden === 'prev'){//Si es previo se resta.
		pageTotals = 1;
	}
	if(DataTable.multiSelect.multiselection.deselectedRowsPerPage.length > 0){
		var maxPagina = ctx.json.rows.length;
		var count = 0;
		//Buscar la pagina donde va estar el seleccionado.
		for (var page=pageInit; page<pageTotals;) {
			$.each(DataTable.multiSelect.multiselection.deselectedRowsPerPage,function(index,p) {
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

function _getLineByPageSelected(ctx,lineInit){
	var line = -1;
	var rows = ctx.json.rows;

	$.each(rows, function( index, row ) {
		if(index > lineInit){
			var indexInArray = jQuery.inArray(row.id, DataTable.multiSelect.multiselection.deselectedIds);
			if(indexInArray === -1){
				line = index;
				var arra = {id:row.id,page:DataTable.settings[0].json.page,line:index};
				ctx.oInit.formEdit.$navigationBar.currentPos = arra;
				return false;
			}
		}
	});
	return line;
}

function _getLineByPageSelectedReverse(ctx,lineInit){
	var line = -1;
	var rows = ctx.json.rows;

	for (var index=rows.length-1; index>=0;index--) {
		var row = rows[index];
		if(index < lineInit){
			var indexInArray = jQuery.inArray(row.id, DataTable.multiSelect.multiselection.deselectedIds);
			if(indexInArray === -1){
				line = index;
				var arra = {id:row.id,page:DataTable.settings[0].json.page,line:index};
				ctx.oInit.formEdit.$navigationBar.currentPos = arra;
				index = -1;
			}
		}
	};
	return line;
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;

apiRegister( 'editForm.openSaveDialog()', function ( actionType,dt,idRow ) {//Se declara el la variable del editForm para que puede ser invocada desde cualquier sitio.
	DataTable.editForm.fnOpenSaveDialog(actionType,dt,idRow );
} );

apiRegister( 'editForm.updateDetailPagination()', function ( ctx,currentRowNum,totalRowNum ) {
	_updateDetailPagination(ctx,currentRowNum,totalRowNum)
} );

apiRegister( 'editForm.getRowSelected()', function ( dt ) {
	return _getRowSelected(dt);
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
