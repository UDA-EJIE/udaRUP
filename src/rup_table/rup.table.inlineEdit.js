/**
  * Módulo que habilita la edicción mediante un formulario.
  *
  * @summary	Extensión del componente RUP Datatable
  * @module		"rup.table.inlineEdit"
  * @version	1.0.0
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
    } else if (typeof exports === 'object') {
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
    } else {
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
* Se inicializa el componente editInline
*
* @name init
* @function
* @since UDA 3.4.0 // Table 1.0.0
*
* @param {object} dt - Es el objeto table.
*
*/
DataTable.inlineEdit.init = function ( dt ) {
	var ctx = dt.settings()[0];
	ctx.inlineEdit = {};
	var idRow;
	// Se edita el row/fila.
	var rowsBody = $( ctx.nTBody);
	rowsBody.on( 'dblclick.DT keypress','tr:not(.group)',  function (e) {
		// Solo selecciona si se pulsa sobre el enter o se hace click izquierdo col raton
            if (e.type == 'keypress' && e.which == 13 || e.type === 'dblclick') {
			if($(this).hasClass('editable')){
				return false;
			}
			idRow = this._DT_RowIndex;
			_editInline(dt,ctx,idRow);
			$('#'+ctx.sTableId).triggerHandler('tableEditInlineClickRow',ctx);
		}
	} );
	
	dt.on( 'responsive-display', function ( e, table, row, showHide) {//si se crea el tr hijo
	    if(showHide && row.child() !== undefined){
	    	row.child().on( 'dblclick.DT',  function () {
	    		idRow = row.index();
	    		_editInline(dt,ctx,idRow);
	    	} );
	 
	    	if(ctx.oInit.inlineEdit.rowDefault !== undefined && ctx.oInit.inlineEdit.rowDefault === 'estadoFinal'){
	    		ctx.oInit.inlineEdit.rowDefault = undefined;
	    		_restaurarFila(ctx,true);
	    		_editInline(dt,ctx,row.index());
	    		if(ctx.oInit.inlineEdit.currentPos !== null && ctx.oInit.inlineEdit.currentPos.actionType === 'CLONE'){
	    			$('#' + ctx.sTableId + ' tbody tr:not(.group)').eq(0).addClass('new');
	    			DataTable.Api().rupTable.selectPencil(ctx,0);
	    		}
	    	}
			if($(row.node()).hasClass('selected')){
                    row.child().addClass('selected tr-highlight');
			}
	    }
	} );
	
	$(window).on( 'resize.dtr', DataTable.util.throttle( function () {//Se calcula el responsive
		dt.responsive.recalc();
	} ) );
	
	//se cambia el nombre de los validadores.
	if(ctx.oInit.inlineEdit.validate !== undefined && ctx.oInit.inlineEdit.validate.rules !== undefined){
		var rulesAux = ctx.oInit.inlineEdit.validate.rules;
		 ctx.oInit.inlineEdit.validate.rules = {};
		$.each(rulesAux,function(name,rule) {
                ctx.oInit.inlineEdit.validate.rules[name + '_inline'] = rule;
                ctx.oInit.inlineEdit.validate.rules[name + '_inline_child'] = rule;
		});

	}
	
	var idForm = $('#'+ctx.sTableId+'_search_searchForm');
	// Si no existe se crea
	if(idForm.length === 0){
		var $searchForm = jQuery('<form>').attr('id',ctx.sTableId+'_search_searchForm');
        $('#'+ctx.sTableId).wrapAll($searchForm);
	}
	
	// Se añaden las validaciones
    let feed = ctx.oInit.feedback.$feedbackContainer;
    let validaciones;
    if(ctx.oInit.inlineEdit.validate !== undefined){
    	validaciones = ctx.oInit.inlineEdit.validate.rules;
    }
    
    let propertiesDefault = {
        liveCheckingErrors: false,
        showFieldErrorAsDefault: true,
        showErrorsInFeedback: true,
        showFieldErrorsInFeedback:true
    };
    let propertiesValidate = $.extend(true, {}, propertiesDefault,ctx.oInit.inlineEdit.propertiesValidate);
    propertiesValidate.feedback = feed;
    propertiesValidate.rules = validaciones;
	
    $('#' + ctx.sTableId + '_search_searchForm').rup_validate(propertiesValidate);
    
    let borrarGuardar = false;
    let borrarCancelar = false;
	if (ctx.oInit.buttons !== undefined && ctx.oInit.buttons.blackListButtons !== undefined){
		if (ctx.oInit.buttons.blackListButtons === 'all'){
			 borrarGuardar = true;
			 borrarCancelar = true;
		}else if(ctx.oInit.buttons.blackListButtons && ctx.oInit.buttons.blackListButtons.length > 0){
			$.each(ctx.oInit.buttons.blackListButtons, function () {
				let name = this;
				if(name === 'saveButton'){
					borrarGuardar = true;
				}
				if(name === 'cancelButton'){
					borrarCancelar = true;
				}
			});
		}
	}
    
    // Crear botones Guardar y Cancelar
	ctx.oInit.inlineEdit.myButtons = {};
    // Boton Guardar
	if(!borrarGuardar){
		ctx.oInit.inlineEdit.myButtons.guardar = {
			 text: function (dt) {
	                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.save');
	         },
	         id: ctx.sTableId+'saveButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
	         className: 'btn-material-primary-high-emphasis table_toolbar_btnSave order-5',
	         icon: 'mdi-content-save',
	         displayRegex: /asss/, // Se muestra siempre que sea un numero positivo o neutro
	         insideContextMenu: true, // Independientemente de este valor, sera 'false' si no tiene un id definido
	         type: 'save',
	         action: function ( e, dt, button, config ) {
	        	 var $selector = $('#'+ctx.sTableId+' tbody tr.editable:not(.child)');
	        	 _guardar(ctx,$selector,false);
	         }
	    };
	}
  
	if(!borrarCancelar){
		// Boton Cancelar
		ctx.oInit.inlineEdit.myButtons.cancelar = {
			text: function (dt) {
				return $.rup.i18nParse($.rup.i18n.base, 'rup_table.cancel');
			},
			id: ctx.sTableId+'cancelButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
			className: 'btn-material-primary-high-emphasis table_toolbar_btnCancel order-6',
			icon: 'mdi-cancel',
			displayRegex: /asss/, // Se muestra siempre que sea un numero positivo o neutro
			insideContextMenu: true, // Independientemente de este valor, sera 'false' si no tiene un id definido
			type: 'cancel',
			action: function () {
				let _cancelRow = function () {
					$('#' + ctx.sTableId+'saveButton_1').prop('disabled', true);
					$('#' + ctx.sTableId+'saveButton_1_contextMenuToolbar').addClass('disabledButtonsTable');
				 	$('#' + ctx.sTableId+'cancelButton_1').prop('disabled', true);
					$('#' + ctx.sTableId+'cancelButton_1_contextMenuToolbar').addClass('disabledButtonsTable');
					ctx.inlineEdit.lastRow = undefined;
					ctx.oInit.inlineEdit.alta = undefined;
			        dt.ajax.reload(undefined, false);
				}
				
	        	if (ctx.oInit.inlineEdit.settings.cancelDialog) {
					$.rup_messages('msgConfirm', {
					    message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.saveAndContinue'),
					    title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
					    OKFunction: function () {
					    	_cancelRow();
					        $('#' + ctx.sTableId).triggerHandler('tableMessageOk', ctx);
					    },
					    CANCELFunction: function () {
					        $('#' + ctx.sTableId).triggerHandler('tableMessageCancel', ctx);
					    }
					    ,
					    CLOSEFunction: function () {
					        $('#' + ctx.sTableId).triggerHandler('tableMessageClose', ctx);
					    }
					});
	        	} else {
	        		_cancelRow();
	        	}
	        }
	    };
	}
	
	ctx.oInit.inlineEdit.settings = {
        saveDialog: (ctx.oInit.inlineEdit.confirmDialogs !== undefined && ctx.oInit.inlineEdit.confirmDialogs.saveDialog !== undefined) ? ctx.oInit.inlineEdit.confirmDialogs.saveDialog : true,
        cancelDialog: (ctx.oInit.inlineEdit.confirmDialogs !== undefined && ctx.oInit.inlineEdit.confirmDialogs.cancelDialog !== undefined) ? ctx.oInit.inlineEdit.confirmDialogs.cancelDialog : true,
        deleteDialog: (ctx.oInit.inlineEdit.confirmDialogs !== undefined && ctx.oInit.inlineEdit.confirmDialogs.deleteDialog !== undefined) ? ctx.oInit.inlineEdit.confirmDialogs.deleteDialog : true
    };

    $(window).on('resize.dtr', DataTable.util.throttle(function () { //Se calcula el responsive
        _addChildIcons(ctx);
    }));
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
 * @since UDA 3.7.0 // Table 1.0.0
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
            var rows = api.rows({
                selected: true
            }).ids(true).filter(function (d) {
			return d !== undefined;
		} );

            var cells = api.cells({
                selected: true
            }).eq(0).map(function (cellIdx) {
			var id = api.row( cellIdx.row ).id( true );
                return id ? {
                    row: id,
                    column: cellIdx.column
                } :
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

    function eventTrigger(api, type, args, any) {
	if ( any && ! api.flatten().length ) {
		return;
	}

	if ( typeof type === 'string' ) {
		type = type +'.dt';
	}

	args.unshift( api );

	$(api.table().node()).trigger( type, args );
}

/**
* Función ejecutada cuando se activa el responsive.
*
* @name _onResponsiveResize
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - Es el objeto table.
*
*/
function _onResponsiveResize(dt){
	dt.on( 'responsive-resize', function (e,settingsTable) {//si hay responsive. Param:: e,settingsTable,columns
		_addChildIcons(settingsTable.context[0]);
	});
}

/**
* Se añade un nuevo registro.
*
* @name _add
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - Es el objeto table.
* @param {object} ctx - Contexto del Datatable.
*
*/
function _add(dt,ctx){
	if(ctx.multiselection.numSelected > 0){
		$.rup_messages('msgConfirm', {
			message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.checkSelectedElems'),
			title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
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
					$('#' + ctx.sTableId + ' tbody tr:not(.group)').eq(0).addClass('new');
					_editInline(dt,ctx,0);
				} );
				
			}
		});
	}else{
		//Crear tr ficticio
		ctx.oInit.inlineEdit.alta = true;
		dt.ajax.reload( function (  ) {
			ctx.oInit.inlineEdit.alta = undefined;
			$('#' + ctx.sTableId + ' tbody tr:not(.group)').eq(0).addClass('new');
			_editInline(dt,ctx,0);
		} );

	}
	$('#'+ctx.sTableId).triggerHandler('tableEditInlineAddRow',ctx);
}

/**
* Se añaden los iconos al responsive.
*
* @name _addChildIcons
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Contexto del Datatable.
*
*/
function _addChildIcons(ctx){
        let hasHidden = false;
        let columnsVisiblity = ctx.responsive._columnsVisiblity();
        for (let i = 0; i < columnsVisiblity.length; i++) {
            if (!columnsVisiblity[i]) {
                if (!ctx.aoColumns[i].className || ctx.aoColumns[i].className.indexOf('never') < 0) {
                    hasHidden = true;
                }
            }
        }

	if(ctx.responsive.c.details.target === 'td span.openResponsive'){//por defecto
            $('#' + ctx.sTableId).find('tbody td:first-child span.openResponsive').remove();
            if (hasHidden) { //añadir span ala primera fila
                $.each($('#' + ctx.sTableId).find('tbody td:first-child:not(.child):not(.dataTables_empty)'), function () {
				var $span = $('<span></span>');
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
					if($fila.hasClass('editable') && $fila.find('.closeResponsive').length){// No se hace nada si esta editando
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
					//setTimeout(_comprobarFila(ctx,$fila), 500);
					_comprobarFila(ctx,$fila);
					//console.log('entro al TIMEOUT --------- ---------');
				}
			});
		}else{//si la edicion en linea esta activada
			
		}
		//si hay inputs guardados se reemplazan los cambios por el responsive.
		if(ctx.inlineEdit !== undefined && 
				ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.rupValues !== undefined){
			var table = $('#'+ctx.sTableId).DataTable( );
			ctx.inlineEdit.lastRow.columnsHidden = table.columns().responsiveHidden();
			var $row = $('#'+ctx.sTableId+' tbody tr.editable:not(.child)');
			_asignarInputsValues(ctx,$row);
		}
	}
	$('#'+ctx.sTableId).triggerHandler('tableEditLineAddChildIcons',ctx);
}

/**
* Método principal para la edición en línea.
*
* @name _add
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - Es el objeto table.
* @param {object} ctx - Contexto del Datatable.
* @param {integer} idRow - Número con la posición de la fila que hay que obtener.
*
*/
function _editInline ( dt,ctx, idRow ){
	if(ctx.inlineEdit.lastRow !== undefined && ctx.inlineEdit.lastRow.idx !== idRow){//si no es la misma fila.
		_restaurarFila(ctx,false);
	}
	const $rowSelect = $('#' + ctx.sTableId + ' > tbody > tr:not(.group)').eq(idRow);
        if (!$rowSelect.hasClass('editable')) {
		_changeInputsToRup(ctx,idRow);
		// Se deshabilitan los botones predefinidos de la tabla.
		DataTable.Api().buttons.disableAllButtons(ctx, ctx.ext.buttons.custom);
	}
	
	// Habilitamos en la botonera y contextMenu
	$('#' + ctx.sTableId+'saveButton_1').prop('disabled', false);
	$('#' + ctx.sTableId+'saveButton_1_contextMenuToolbar').removeClass('disabledButtonsTable');
	$('#' + ctx.sTableId+'cancelButton_1').prop('disabled', false);
	$('#' + ctx.sTableId+'cancelButton_1_contextMenuToolbar').removeClass('disabledButtonsTable');
	
	// Cuando sea añadir registro no hay que habilitar el boton de informes
        if (!$rowSelect.hasClass('odd new')) {
		$('#' + ctx.sTableId+'informes_01').prop('disabled', false);
	}

	DataTable.Api().seeker.enabledButtons(ctx);
	
	$('#'+ctx.sTableId).triggerHandler('tableInlineEdit',ctx);
	var selectores = {};
	selectores[0] = $rowSelect;
        if ($rowSelect.next().find('.child').length === 1) {
            selectores[1] = $rowSelect.next().find('.child');
	}
	
	$.each(selectores,function() {//se crea evento para los selectores creados.
		_crearEventos(ctx,this);
	});
	
	if(ctx.oInit.inlineEdit.clone !== true){
		//Añadir la seleccion del mismo.
		if (ctx.oInit.multiSelect !== undefined) {
			dt['row'](idRow).multiSelect();
		}else{
			var rowsBody = $( ctx.nTBody);
			$('tr',rowsBody).removeClass('selected tr-highlight');
			DataTable.Api().select.selectRowIndex(dt,idRow,true);
			if(ctx.multiselection.selectedIds == ""){//es nuevo
				ctx.multiselection.selectedIds = [];
			}
		}
	}
	
	dt.responsive.recalc();
        if (ctx.oInit.inlineEdit.currentPos !== undefined && ctx.oInit.inlineEdit.currentPos.actionType !== undefined &&
            ctx.oInit.inlineEdit.currentPos.actionType === 'CLONE' && $rowSelect.find('span.openResponsive').length === 0) { //revisar cuando es clone por si el responsive falla
		 _addChildIcons(ctx);
	}
}

/**
* Método que obtiene la fila siguiente seleccionada.
*
* @name getRowSelected
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - Instancia de la tabla.
* @param {string} actionType - Acción a ajecutar en el formulario para ir al controller, basado en REST.
*
* @return {object} Contiene el identificador, la página y la línea de la fila seleccionada.
*
*/
function _getRowSelected(dt, actionType){
	var ctx = dt.settings()[0];
	var rowDefault = {
			id: 0,
			page: 1,
			line: 0
		};
	var lastSelectedId = ctx.multiselection.lastSelectedId;
	if (!ctx.multiselection.selectedAll) {
		let staticID = $.fn.getStaticHdivID(ctx.multiselection.lastSelectedId);
		$.each(ctx.multiselection.selectedRowsPerPage, function(index, p) {
			// Obtener el último seleccionado para tener el identificador actualizado (solamente es necesario cuando se usa Hdiv porque cambia el cifrado entre peticiones)
			if ($.fn.isHdiv(p.id) && staticID === $.fn.getStaticHdivID(p.id)) {
				ctx.multiselection.lastSelectedId = p.id;
			}
			
			if (p.id == ctx.multiselection.lastSelectedId) {
				rowDefault.id = p.id;
				rowDefault.page = p.page;
				rowDefault.line = p.line;
				rowDefault.indexSelected = index;
				if (ctx.oInit.inlineEdit !== undefined) {
					ctx.oInit.inlineEdit.currentPos = rowDefault;
				}
				return false;
			}
		});
	} else {
		if (ctx.oInit.inlineEdit !== undefined) {
			// Indica los mostrados cuando es selectAll y no se puede calcular. El inicio es 0.
			ctx.oInit.inlineEdit.numPosition = 0;
		}
		if (lastSelectedId === undefined || lastSelectedId === '') {
			// Como arranca de primeras, la página es la 1
			rowDefault.page = _getNextPageSelected(ctx, 1, 'next');
			rowDefault.line = _getLineByPageSelected(ctx, -1);
		} else {
			// Buscar la posición y la página
			var result = $.grep(ctx.multiselection.selectedRowsPerPage, function(v) {
				return v.id == ctx.multiselection.lastSelectedId;
			});
			rowDefault.page = result[0].page;
			rowDefault.line = result[0].line;
			var index = ctx._iDisplayLength * (Number(rowDefault.page) -1);
			index = index + 1 + rowDefault.line;
			// Restar los deselecionados
			result = $.grep(ctx.multiselection.deselectedRowsPerPage, function(v) {
				return Number(v.page) < Number(rowDefault.page) || (Number(rowDefault.page) === Number(v.page) && Number(v.line) < Number(rowDefault.line));
			});
			// Buscar índice
			rowDefault.indexSelected = index - result.length;
			if (ctx.oInit.inlineEdit !== undefined) {
				ctx.oInit.inlineEdit.numPosition = rowDefault.indexSelected - 1;
			}
		}
		if (ctx.oInit.inlineEdit !== undefined) {
			ctx.oInit.inlineEdit.currentPos = rowDefault;
		}
	}

	// En caso de estar en una página distinta, navegamos a ella
	if (dt.page() + 1 !== Number(rowDefault.page)) {
		var table = $('#' + ctx.sTableId).DataTable();
		table.page(rowDefault.page - 1).draw('page');
		if (ctx.oInit.inlineEdit !== undefined) {
			rowDefault.actionType = actionType;
			ctx.oInit.inlineEdit.rowDefault = rowDefault;
		}
	} else {
		if (actionType === 'PUT') {
			_editInline(dt, ctx, rowDefault.line);
		} else if (actionType === 'CLONE') {
			dt.ajax.reload(undefined, false);
			rowDefault.actionType = actionType;
			ctx.oInit.inlineEdit.rowDefault = rowDefault;
		}
	}

	return rowDefault;
}

/**
* Método que clona el elemento seleccionado.
*
* @name cloneLine
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
*
* @param {object} dt - Objeto table.
* @param {object} ctx - Contexto del Datatable.
* @param {integer} line - Número de la fila.
*
*/
function _cloneLine(dt, ctx, line){
	$('#' + ctx.sTableId).triggerHandler('tableEditInlineClone', ctx);
	
	dt.row(0).data(dt.row(line + 1).data());
	
	if (ctx.oInit.inlineEdit.rowDefault !== undefined) {
		ctx.oInit.inlineEdit.rowDefault.line = 0;
	}
        
	// Añadir clase necesaria para su futura gestión a la hora de guardar el registro
	$('#' + ctx.sTableId + ' tbody tr').eq(0).addClass('new');
}

/**
* Método que obtiene la página siguiente donde está el primer elemento o elemento seleccionado.
*
* @name getNextPageSelected
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Contexto del Datatable.
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
* Método que obtiene la linea siguiente donde está el primer elemento o elemento seleccionado.
*
* @name getLineByPageSelected
* @function
* @since UDA 3.7.0 // Table 1.0.0
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
			var indexInArray = jQuery.inArray(DataTable.Api().rupTable.getIdPk(row,ctx.oInit), ctx.multiselection.deselectedIds);
			if(indexInArray === -1){
				line = index;
                    var arra = {
                        id: DataTable.Api().rupTable.getIdPk(row, ctx.oInit),
                        page: ctx.json.page,
                        line: index
                    };
				if(ctx.oInit.inilineEdit !== undefined){
					ctx.oInit.inilineEdit.currentPos = arra;
				}
				return false;
			}
		}
	});
	return line;
}

/**
* Se restaura la línea(fila) en la edición.
*
* @name _restaurarFila
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Contexto del Datatable.
* @param {boolean} limpiar - Si es true limpia e inicializa todo y si es false solo restaura la línea.
*
*/
function _restaurarFila(ctx,limpiar){
	$('#'+ctx.sTableId).triggerHandler('tableEditInlineRestaurarFilaInit',ctx);
	if(ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined){
		var positionLastRow = ctx.inlineEdit.lastRow.idx;

		var $fila = $('#' + ctx.sTableId + ' > tbody > tr:not(.group)').eq(positionLastRow);
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
		const $selectorTr = $('#' + ctx.sTableId + ' > tbody > tr:not(.group)').eq(positionLastRow);
		ctx.inlineEdit.lastRow = undefined;
            if ($selectorTr.data('events') !== undefined) {
			$selectorTr.off('keydown');
		}
		
		DataTable.Api().seeker.disabledButtons(ctx);
		
		ctx.oInit.feedback.$feedbackContainer.rup_feedback('hide');
		
		if ($fila !== undefined && $fila.hasClass('new')) { // se elimna el tr, porque no se guardo
			$fila.next('.child').remove();
			$fila.remove();
			//se asegura resturar multiselection
			ctx.multiselection.numSelected = 0;
			ctx.multiselection.selectedIds = [];
			ctx.multiselection.selectedRowsPerPage = [];
		}
		//se habilitan los botones.
		ctx._buttons[0].inst.s.disableAllButtons = undefined;
		DataTable.Api().buttons.displayRegex(ctx);
	}
	$('#'+ctx.sTableId).triggerHandler('tableEditLineRestaurarFilaEnd',ctx);
}

/**
*Cambia los inputs por los componentes rup.
*
* @name _changeInputsToRup
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Contexto del Datatable.
* @param {integer} idRow - Número con la posición de la fila que hay que obtener.
*
*/
function _changeInputsToRup(ctx,idRow){
	// Se procesan las celdas editables

	if(ctx.oInit.colModel !== undefined){
		var table = $('#'+ctx.sTableId).DataTable( );
		var cont = 0;
		ctx.inlineEdit.lastRow = $('#' + ctx.sTableId + ' > tbody > tr:not(.group)').eq(idRow);
		ctx.inlineEdit.lastRow.cellValues = {};
		ctx.inlineEdit.lastRow.columnsHidden = table.columns().responsiveHidden();
		ctx.inlineEdit.lastRow.submit = 0;
		ctx.inlineEdit.lastRow.idx = idRow;
		
		ctx.inlineEdit.lastRow.ponerFocus = false;
		//Si existe el responsive
		//Campos sin responsive
		var $target = ctx.inlineEdit.lastRow.find(ctx.oInit.responsive.details.target);
            if ($target.length > 0 && ctx.inlineEdit.lastRow.next().find('.child').length === 0) {
			$target.click();
		}
		cont = _recorrerCeldas(ctx,ctx.inlineEdit.lastRow,ctx.inlineEdit.lastRow.find('td'),cont);
		if(!ctx.inlineEdit.lastRow.hasClass('new') && !ctx.oInit.inlineEdit.alta){
			DataTable.Api().rupTable.blockPKEdit(ctx, 'PUT', '_inline');
		}
		//Mirar los campos que estan en responsive.
		var $filaChild = ctx.inlineEdit.lastRow.next('.child');
		_recorrerCeldas(ctx,$filaChild,$filaChild.find(ctx.oInit.responsive.selectorResponsive),cont);
		if($filaChild.length > 0 && !$filaChild.hasClass('new') && !ctx.oInit.inlineEdit.alta){
			DataTable.Api().rupTable.blockPKEdit(ctx, 'PUT', '_inline_child');
		}

	}
}

/**
* Método que recorre las celdas y las procesa.
*
* @name _recorrerCeldas
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - fila que se está editando.
* @param {object} $celdas - Todas las celdas a recorrer.
* @param {integer} cont - Contador para saber en que celda nos movemos, sobre todo en el responsive.
*
*/
function _recorrerCeldas(ctx,$fila,$celdas,cont){
	$fila.addClass('editable');
	var colModel = ctx.oInit.colModel;
        var child = '';
	if($fila.hasClass('child')){
            child = '_child';
		$fila = $fila.prev();
	}
	var ocultos = 0;
	var edicion = true;
	if($fila.hasClass('new') || ctx.oInit.inlineEdit.alta){
		edicion = false;
	}
	$celdas.each( function() {
		var celda = $(this);
		var $celda = $(celda);
		
		if (!$celda.hasClass('select-checkbox')) {
			// Si la columna a usar está oculta, se aumenta el contador para usar la siguiente que no lo esté
			while (colModel[cont].hidden) {
				cont++;
			}
			
			var cellColModel = colModel[cont];
			
			if (cellColModel.editable === true || !edicion) {
				var $input = $('<input />').val($celda.text()).attr('name', cellColModel.name+'_inline'+child);
				var title = cellColModel.name.charAt(0).toUpperCase() + cellColModel.name.slice(1);
                    $input.attr('id', cellColModel.name + '_inline' + child).attr('oldtitle', title);
				
				// Si es el primero dejar el focus
				if(ctx.inlineEdit.lastRow.cellValues[0] === undefined){
					ctx.inlineEdit.lastRow.ponerFocus = true;
				}
				
				ctx.inlineEdit.lastRow.cellValues[cont] = $celda.html();
				var $span = $celda.find('.openResponsive');

				$celda.html($input);
				if($span.length >= 1){
					$span.click(function(event){
						event.stopPropagation();
					});
					$celda.prepend($span);
				}
				
				//Convertir a input.
				var searchRupType = (cellColModel.editoptions !== undefined && cellColModel.editoptions.rupType !== undefined) ? cellColModel.editoptions.rupType : cellColModel.rupType;
				var colModelName = cellColModel.name;
				var $elem = $('#'+colModelName+'_inline'+child,ctx.nTBody);
				// Se añade el title de los elementos de acuerdo al colname
				
				// Si ya existe el div necesario para dar los estilos material al input, evitamos duplicarlo.
				if(!$('#'+colModelName+'_inline').parent().hasClass('form-groupMaterial')) {
                        $('#' + colModelName + '_inline').wrap('<div class=\'form-groupMaterial\'></div>');
				}
				// Lo mismo que el anterior pero cuando se ha aplicado el responsivo.
				if(!$('#'+colModelName+'_inline_child').parent().hasClass('form-groupMaterial')) {
                        $('#' + colModelName + '_inline_child').wrap('<div class=\'form-groupMaterial\'></div>');
				}


				$elem.attr({
					'title': '',
					'class': 'editable customelement form-control-customer'
				}).removeAttr('readOnly');
				// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
				if(searchRupType !== undefined && cellColModel.editoptions) {
					var searchEditOptions = cellColModel.editoptions;
					if(searchRupType === 'combo'){//se marca el selected
						searchEditOptions.selected = ctx.inlineEdit.lastRow.cellValues[cont]
						searchEditOptions.inlineEditFieldName = cellColModel.name;
					} else if (searchRupType === 'autocomplete') {
						const cellValue = ctx.inlineEdit.lastRow.cellValues[cont];
						searchEditOptions.loadValue = cellValue;
						if(cellValue != null){
							searchEditOptions.loadObjectsAuto = {[cellValue]:cellValue};
						}
					}
					
					//Se Comprueba que los elemnetos menu estan eliminados.
					if( $('#'+$elem.attr('id')+'-menu').length > 0){
						$('#'+$elem.attr('id')+'-menu').remove('ul');
					}
					
					// Invocación al componente RUP
					$elem['rup_'+searchRupType](searchEditOptions);
				}else if(cellColModel.edittype === 'checkbox'){
					$elem
						.prop('type', 'checkbox')
						.parent().toggleClass('form-groupMaterial checkbox-material checkbox-material-inline')
						.append('<label for="' + $elem.attr('name') + '"></label>')
						.closest('td').addClass('text-center');
					
					var valueCelda = ctx.inlineEdit.lastRow.cellValues[cont];
					
					if($(valueCelda).find('i.mdi-close').length === 1){
						$elem.prop('checked', false);
					}else if($(valueCelda).find('i.mdi-check').length === 1){
						$elem.prop('checked', true);
					}
				}
				//Fin conversion
				
				//Nos aseguramos de que el input existe
				if(ctx.inlineEdit.lastRow.ponerFocus){
					$input.focus();
					ctx.inlineEdit.lastRow.ponerFocus = false;
					//Realizar comprobaciones por si el id es NO editable
					if(edicion && ctx.oInit.blockPKeditForm && ctx.oInit.primaryKey.length > 0){
						$.each(ctx.oInit.primaryKey,function(key,id) {
							if(id == cellColModel.name){
								ctx.inlineEdit.lastRow.ponerFocus = true;
							}
						});
					}
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

/**
* Método para restaurar las celdas.
*
* @name _restaurarCeldas
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - Fila que se está editando.
* @param {object} $celdas - Todas las celdas a recorrer.
* @param {integer} contRest - Contador para saber en que celda nos movemos, sobre todo en el responsive.
*
*/
function _restaurarCeldas(ctx, $fila, $celdas, contRest) {
    if ($fila.hasClass('editable')) {
    	var colModel = ctx.oInit.colModel;
        $fila.removeClass('editable');
	
		$celdas.each( function() {
			var celda = $(this);
			var $celda = $(celda);
	
			if (!$celda.hasClass('select-checkbox')) {
				// Si la columna a usar está oculta, se aumenta el contador para usar la siguiente que no lo esté
				while (colModel[contRest].hidden) {
					contRest++;
				}
    			
				var cellColModel = colModel[contRest];
				if(cellColModel.editable===true){
					$celda.html(ctx.inlineEdit.lastRow.cellValues[contRest]);
					if($celda.find('span.openResponsive').length){// si esta volverle a dar la funcionalidad, y es responsive
                            var count = ctx.responsive.s.current.reduce(function (a, b) {
                                return b === false ? a + 1 : a;
                            }, 0);
					
						if(count > 0){// si hay responsive	
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
						}else{//si NO hay responsive
							$celda.find('span.openResponsive').remove();
						}
					}
				}
				
				if (cellColModel.edittype === 'checkbox') {
					$celda.closest('td').removeClass('text-center');
				}
				
				contRest++;
			}
		});
    }
	
	return contRest;
}

/**
* Comprueba que si la fila está en responsive mantenga el diseño.
*
* @name _comprobarFila
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - fila que se está editando.
*
*/
function _comprobarFila(ctx,$fila){
        var count = ctx.responsive.s.current.reduce(function (a, b) {
            return b === false ? a + 1 : a;
        }, 0);
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
	if($filaChild.length > 0 && !$filaChild.hasClass('new') && !ctx.oInit.inlineEdit.alta){
		DataTable.Api().rupTable.blockPKEdit(ctx, 'PUT', '_inline_child');
	}
	//Se crea el evento para el tr child de escape
	 _crearEventos(ctx,$filaChild);
	var tabla = $('#'+ctx.sTableId).DataTable();
	tabla.responsive.recalc();
}

/**
* Crea los eventos asociados a la fila.
*
* @name _crearEventos
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $selector - fila que se está editando.
*
*/
function _crearEventos(ctx,$selector){
        if ($selector.data('events') === undefined || $selector.data('events').keydown === undefined) {
		$selector.keydown(function(e) {
		    if (e.keyCode === 27) {//Esc
                    if ($selector.hasClass('new')) { //si se da alta y se cancela.
		    		var dt = $('#'+ctx.sTableId).DataTable();
		    		ctx.inlineEdit.lastRow = undefined;
		    		ctx.oInit.inlineEdit.alta = undefined;
		    		//primer parametro para mandar una funcion a ejecutar, segundo parametro bloquear la pagina si pones false
		    		dt.ajax.reload(undefined,false);
		    	}else{//si se modifica
		    		_restaurarFila(ctx,true);
		    	}
		    }else if (e.keyCode === 13 || 
		    		(e.keyCode === 9 && _lastIndexEditable(ctx,$(e.target)))) {//Intro 13, //Tabulador 9
		    	var child = false;
		    	if($selector.parent('tr').length > 0){//si es mayor que cero la seleccion es en el td,hay que pasar al tr.
		    		$selector = $selector.parent('tr');
		    	}
		    	if($selector.find('.child').length === 1 || $selector.hasClass('child')){
                        child = true;
		    	}
		    	_guardar(ctx,$selector,child);
		    	return false;
		    }
		});
	}
	$('#'+ctx.sTableId).triggerHandler('tableEditLineCrearEventos',ctx);
}

/**
* Método para recorre las celdas y las procesa.
*
* @name _lastIndexEditable
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $target - fila que se está editando.
*
* @return devuelve si es el último index editado
*/
function _lastIndexEditable(ctx,$target){
	var indexTarget = $target.closest('td').index();
	//Se recorren las columnas a la inversa, si es editable, se devuelve la posicion
	//Si llama el hijo calcular index
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
* @name _inlineEditFormSerialize
* @function
* @since UDA 3.7.0 // Table 1.2.0
*
* @param {object} $fila - Fila la cual estamos editando.
* @param {object} ctx - Contexto del table.
* @param {boolean} child - boolean para saber si tiene hijos en el responsive.
*
*
*/
function _inlineEditFormSerialize($fila,ctx,child){
	var serializedForm = {};
	var selectores = {};

	//añadir columnas child
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
		// Añadir las columnas parent y child.
		let busqueda = 'td:not([style*="display: none"]):not(".select-checkbox") input:not([disabled]),' +
			'td:not([style*="display: none"]):not(".select-checkbox") select:not([disabled]),' +
			'td:not([style*="display: none"]):not(".select-checkbox") textarea:not([disabled])';

		// Si es el hijo, solo buscar los select, input y textarea que haya.
		if (this.hasClass('child')) {
			busqueda = 'select,input,textarea';
		}
		$.each( this.find(busqueda), function( i, obj ) {
			var nombre = obj.id.replace('_inline','').replace('_child','');
			var value = $(obj).val();
			// Comprobar si contiene un caracter invalido
			if(value.includes("%")){
				serializedForm = false;
				return false;
			}
			if($(obj).prop('type') !== undefined && $(obj).prop('type') === 'checkbox'){
                    value = '0';
				if($(obj).prop('checked')){
                        value = '1';
				}
			}
			serializedForm[nombre] = value;
		});
	});
	
	//añadir los no editables,en caso de SOLO edición, 
	if(!selectores[0].hasClass('new') && typeof serializedForm !== "boolean"){
		jQuery.grep(ctx.oInit.colModel, function( n,i) {
			  if ( n.editable !== true ){
				  var text = ctx.json.rows[$fila.index()][n.name];
				  serializedForm[n.name] = text;
				  return n;
			  }
		});
	}
	
	return serializedForm;
}

/**
* Método para llamar al ajax de guardado y nuevo.
*
* @name _guardar
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - fila que se está editando.
* @param {boolean} $child - boolean para decir si la llamada es del hijo o del padre
*
*/
function _guardar(ctx,$fila,child){

	//Se serializa el formulario con los cambios
	var row = _inlineEditFormSerialize($fila,ctx,child);
	
    $.each(ctx.oInit.primaryKey, function (index, key) {
    	row[key] = ctx.json.rows[$fila.index()][key];
    });
	
	if(!row) {
    	_callFeedbackOk(ctx, $.rup.i18nParse($.rup.i18n.base, 'rup_global.charError'), 'error');
		$('#' + ctx.sTableId).triggerHandler('tableEditInLineErrorCallSaveAjax',ctx);
    } else {
        var actionType = 'PUT';
		if($fila.hasClass('new') || (child && $fila.prev().hasClass('new'))){//si ejecurar el child, hay que buscar el padre para saver si es nuevo.
	            actionType = 'POST';
		}
		
		if (actionType === 'PUT') {
	    	let customModificar = ctx.oInit.validarModificar;
	    	if(typeof customModificar === "function" && customModificar(ctx)){
	    		return false;
	    	}
		}else if (actionType === 'POST') {
		
	    	let customAlta = ctx.oInit.validarAlta;
	    	if(typeof customAlta === "function" && customAlta(ctx)){
	    		return false;
	    	}
		}
		let url = actionType == 'POST' ? '/add' : '/edit';
    	
    	// Comprobar si se ha definido otra URL en las propiedades, en caso afirmativo, se aplica.
		const property = url.substring(1) + 'Url';
    	if (ctx.oInit.inlineEdit[property]) {
    		url = ctx.oInit.inlineEdit[property];
    	}
    	
		_callSaveAjax(actionType, ctx, $fila, row, url, false);
		$('#'+ctx.sTableId).triggerHandler('tableEditlineGuardar',ctx);
    }
}

/**
* Llamada al servidor con los datos de edición.
*
* @name _callSaveAjax
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {string} actionType - Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest.
* @param {object} ctx - Es el contexto table.
* @param {object} $fila - Fila que se está editando.
* @param {object} $row - Son los datos que se cargan.
* @param {string} url - Url que se añade para llamar  al controller. Añadir, editar o borrar.
* @param {boolean} isDeleting - Evita mostrar el diálogo de confirmación porque la función _deleteAllSelects() tiene el suyo propio.
*
*/
function _callSaveAjax(actionType, ctx, $fila, row, url, isDeleting){
	let _makeAjaxCall = function () {
		$('#' + ctx.sTableId).triggerHandler('tableEditInLineBeforeCallAjax', [ctx, actionType, url]);
		
		// add Filter
		var feed = ctx.oInit.feedback.$feedbackContainer;
		var msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_table.modifyOK');
		if(url === '/deleteAll' || actionType === 'DELETE'){
			msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_table.deletedOK');
		}
		
		if(ctx.oInit.masterDetail !== undefined){//Asegurar que se recoge el idPadre
			var masterPkObject = DataTable.Api().masterDetail.getMasterTablePkObject(ctx);
			row = jQuery.extend(true, row, masterPkObject);
		}
	
		var ajaxOptions = {
			url: ctx.oInit.urlBase + url,
            accepts: {
                '*': '*/*',
                'html': 'text/html',
                'json': 'application/json, text/javascript',
                'script':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                'text': 'text/plain',
                'xml': 'application/xml, text/xml'
            },
			type: actionType,
			data: row,
			dataType: 'json',
			showLoading: false,
			contentType: 'application/json',
			async: true,
			success: function(data, status, xhr) {
				$('#' + ctx.sTableId+'saveButton_1').prop('disabled', true);
				$('#' + ctx.sTableId+'saveButton_1_contextMenuToolbar').addClass('disabledButtonsTable');
				$('#' + ctx.sTableId+'cancelButton_1').prop('disabled', true);
				$('#' + ctx.sTableId+'cancelButton_1_contextMenuToolbar').addClass('disabledButtonsTable');
				ctx.oInit.inlineEdit.alta = undefined;
				var dt = $('#' + ctx.sTableId).DataTable();
				var idPk = DataTable.Api().rupTable.getIdPk(data, ctx.oInit);
				
				if (url !== '/deleteAll' && actionType !== 'DELETE') {
					// Se informa al feedback de la tabla
					_callFeedbackOk(ctx, msgFeedBack, 'ok');
					
					if(actionType === 'PUT'){
						// Modificar
						dt.row($fila.index()).data(data);
						ctx.json.rows[$fila.index()] = data;
						
						// Actualizamos el último id seleccionado (por si ha sido editado)
						let posicion = 0;
						$.each(ctx.multiselection.selectedRowsPerPage, function(index, p) {
							if (p.id == ctx.multiselection.lastSelectedId) {
								posicion = index;
								return;
							}
						});
						
						if (ctx.seeker !== undefined && !jQuery.isEmptyObject(ctx.seeker.ajaxOption.data.search) && ctx.seeker.search.funcionParams !== undefined && ctx.seeker.search.funcionParams.length > 0) {
							_comprobarSeeker(data, ctx, $fila.index());
						}
						
						ctx.multiselection.lastSelectedId = idPk;
						ctx.multiselection.selectedRowsPerPage[posicion].id = idPk;
					} else {
						// Alta o clonado
						if (ctx.oInit.inlineEdit.currentPos !== undefined && ctx.oInit.inlineEdit.currentPos.actionType === 'CLONE') {
							// Clonado (se mantiene seleccionado el registro original)
							ctx.multiselection.selectedIds.push(idPk);
							// Si la multiselección está activada se suma el nuevo registro seleccionado, en los demás casos, se establece a uno los registros seleccionados
							ctx.multiselection.numSelected = ctx.oInit.multiSelect ? ctx.multiselection.numSelected + 1 : 1;
						} else {
							// Alta nueva
							ctx.multiselection.selectedIds = [idPk];
							ctx.multiselection.numSelected = 1;
						}
						ctx.multiselection.lastSelectedId = idPk;
						ctx.multiselection.selectedRowsPerPage[0].id = idPk;
					}
					ctx.inlineEdit.row = data;
				} else {
					// Eliminar
				    ctx.oInit.feedback.type = 'eliminar';
				    ctx.oInit.feedback.msgFeedBack = msgFeedBack;
				    if (ctx.oInit.multiSelect !== undefined) {
				        DataTable.Api().multiSelect.deselectAll(dt);
				    } else if (ctx.oInit.select !== undefined) {
				        DataTable.Api().select.deselect(ctx);
				        _callFeedbackOk(ctx, msgFeedBack, 'ok'); //Se informa feedback de la tabla
				    }
				    $('#' + ctx.sTableId).triggerHandler('tableEditInLineAfterDelete', ctx);
				}
				ctx.inlineEdit.row = undefined;
				ctx.inlineEdit.lastRow = undefined;
				ctx._buttons[0].inst.s.disableAllButtons = undefined;
	
				DataTable.Api().seeker.disabledButtons(ctx);
			
				// Recargar datos (el primer parámetro es el callback y el segundo permite permanecer en la página actual cuando es false)
				dt.ajax.reload(function() {
					_addChildIcons(ctx);
				}, false);
			},
			complete: function() {
				$('#' + ctx.sTableId).triggerHandler('tableEditInLineCompleteCallSaveAjax', ctx);
			},
			error: function (xhr) {
				if (xhr.status === 406 && xhr.responseText !== '') {
					try {
						let responseJSON = JSON.parse(xhr.responseText);
						if (responseJSON.rupErrorFields) {
							if (responseJSON.rupErrorFields !== undefined || responseJSON.rupFeedback !== undefined) {
								//se transforma a inline
								var rulesAux = responseJSON.rupErrorFields;
							     $.each(rulesAux, function (name, rule) {
							    	 if($('#'+name+'_inline').length === 1){
							    		 responseJSON.rupErrorFields[name + '_inline'] = rule;
							    	 }
							    	 if($('#'+name+'_inline_child').length === 1){
							    		 responseJSON.rupErrorFields[name + '_inline_child'] = rule;
							    	 }
							    	 delete responseJSON.rupErrorFields[name];
							     });
								let $form = $('#' + ctx.sTableId + '_search_searchForm');
								$form.validate().submitted = $.extend(true, $form.validate().submitted, responseJSON.rupErrorFields);
								$form.validate().invalid = responseJSON.rupErrorFields;
								$form.validate().showErrors(responseJSON.rupErrorFields);
							} else if (errors.rupFeedback !== undefined) {
								let mensajeJSON = $.rup_utils.printMsg(responseJSON.rupFeedback.message);
								_callFeedbackOk(ctx, mensajeJSON, 'error');
							}
	
						}
					} catch (e) {
						// El mensaje NO es JSON
						_callFeedbackOk(ctx, xhr.responseText, 'error');
					}
	
				}else{//cualquier error se devuelve el texto
	                _callFeedbackOk(ctx, xhr.responseText, 'error');
				}
	
			    $('#' + ctx.sTableId).triggerHandler('tableEditInLineErrorCallSaveAjax',ctx);
			},
			validate:ctx.oInit.inlineEdit.validate,
	        feedback: feed
		};
		
		if(ctx.inlineEdit.lastRow !== undefined){
			ctx.inlineEdit.lastRow.submit = 1;
		}
		
		// Se cambia el data
        if (ajaxOptions.data == '') {
            delete ajaxOptions.data;
            $.rup_ajax(ajaxOptions);
        } else if (isDeleting || $('#' + ctx.sTableId + '_search_searchForm').valid()) {
        	// Obtener el valor del parámetro HDIV_STATE (en caso de no estar disponible se devolverá vacío) siempre y cuando no se trate de un deleteAll porque en ese caso ya lo contiene el filtro
            if (url.indexOf('deleteAll') === -1) {
            	// Elimina los campos _label generados por los autocompletes que no forman parte de la entidad
            	$.fn.deleteAutocompleteLabelFromObject(ajaxOptions.data);
                
                // Elimina los campos autogenerados por los multicombos que no forman parte de la entidad
                $.fn.deleteMulticomboLabelFromObject(ajaxOptions.data, $fila);
            	
            	$.when(_loadAuxForm(ctx, actionType)).then(function () {
	            	var hdivStateParamValue = $.fn.getHDIV_STATE(undefined, ctx.oInit.inlineEdit.idForm);
	                if (hdivStateParamValue !== '') {
	                	ajaxOptions.data._HDIV_STATE_ = hdivStateParamValue;
	                }
	                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
	                $.rup_ajax(ajaxOptions);
            	});
            } else {
            	ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            	$.rup_ajax(ajaxOptions);
            }
        }
	}
    
    if (ctx.oInit.inlineEdit.settings.saveDialog && !isDeleting) {
    	$.rup_messages('msgConfirm', {
            title: actionType == 'POST' ? $.rup.i18nParse($.rup.i18n.base, 'rup_table.add.save') : $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.save'),
            message: actionType == 'POST' ? $.rup.i18nParse($.rup.i18n.base, 'rup_table.add.saveData') : $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.saveData'),
            OKFunction: function () {
            	_makeAjaxCall();
            	$('#' + ctx.sTableId).triggerHandler('tableMessageOk', ctx);
            },
            CANCELFunction: function () {
            	$('#' + ctx.sTableId).triggerHandler('tableMessageCancel', ctx);
            },
            CLOSEFunction: function () {
            	$('#' + ctx.sTableId).triggerHandler('tableMessageClose', ctx);
            }
        });
    } else {
    	_makeAjaxCall();
    }    
}

/**
 * Función que gestiona la carga del formulario del que se obtendrá el parámetro HDIV_STATE en función del tipo de method, POST o PUT.
 *
 * @name loadAuxForm
 * @function
 * @since UDA 5.0.0 (backported) // Table 1.0.0
 *
 * @param {object} ctx - Contexto del Datatable.
 * @param {string} actionType - Acción a ajecutar en el formulario para ir al controller, basado en REST.
 *
 * @return {object}
 */
function _loadAuxForm(ctx, actionType) {
	var idForm = ctx.oInit.inlineEdit !== undefined ? ctx.oInit.inlineEdit.idForm : undefined;
	
	// Servirá para saber si la última llamada a inlineEdit fue para añadir, editar o si aún no ha sido inicializado
	let lastAction = ctx.oInit.inlineEdit.actionType;
	
	// Si el usuario ha activado los formularios dinámicos y la última acción no es la misma que la actual, es necesario volver a obtener el formulario
	if (ctx.oInit.enableDynamicForms && lastAction !== actionType) {
		// Preparar la información a enviar al servidor. Como mínimo se enviará el actionType y el identificador de la tabla.
		let defaultData = {
				'actionType': actionType,
				'tableID': ctx.sTableId
			};
		let data = ctx.oInit.inlineEdit.data !== undefined ? $.extend({}, defaultData, ctx.oInit.inlineEdit.data) : defaultData;
		
		return $.post(ctx.oInit.inlineEdit.url !== undefined ? ctx.oInit.inlineEdit.url : ctx.oInit.urlBase + '/inlineEdit', data, function (form) {
			// Guardar anterior formulario para poder comprobarlo con el recién recibido
			let tempForm = idForm !== undefined ? idForm : undefined;
			
			// Guardar referencia del formulario recibido
			let receivedForm = $(form).find("form").addBack('form');
			
			// Si existe un formulario previo con el mismo identificador que el recibido, se elimina
			if (tempForm !== undefined && tempForm.length === 1 && tempForm.attr("id") === receivedForm.attr("id")) {
				tempForm.remove();
			}
			
			let tableWrapper = $('#' + ctx.sTableId + '_wrapper');
			tableWrapper.prepend(receivedForm);
			ctx.oInit.inlineEdit.actionType = actionType;
			ctx.oInit.inlineEdit.idForm = tableWrapper.find("form").first();
    	}, 'html');
    } else {
    	// Para cuando el formulario actual sigue siendo válido o los formularios dinámicos están desactivados
    	let deferred = $.Deferred();
    	ctx.oInit.inlineEdit.actionType = actionType;
    	deferred.resolve();
		return deferred.promise();
    }
}

/**
 * Llamada para crear el feedback dentro del dialog.
 *
 * @name callFeedbackOk
 * @function
 * @since UDA 3.7.0 // Table 1.0.0
 *
 * @param {object} ctx - Settings object to operate on.
 * @param {object} feedback - Div donde se va ejecutar el feedback.
 * @param {string} msgFeedBack - Mensaje para el feedback.
 * @param {string} type - Tipos del feedback, mirar en el rup.feedback..
 *
 */
function _callFeedbackOk(ctx, msgFeedBack, type) {
	if(ctx.oInit.inlineEdit.disabledFeedback){//no muestra el feedback
		return false;
	}
    $('#' + ctx.sTableId).triggerHandler('tableEditInLineFeedbackShow',ctx);
    ctx.oInit.feedback.$feedbackContainer.rup_feedback('set', msgFeedBack, type);
    ctx.oInit.feedback.$feedbackContainer.rup_feedback('show');
}

/**
* Cambiar los valores de los inputs de responsive a normal y viciversa.
*
* @name _inResponsiveChangeInputsValues
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - fila que se está editando.
*
*/
function _inResponsiveChangeInputsValues(ctx,$fila){
	var table = $('#'+ctx.sTableId).DataTable( );
	ctx.inlineEdit.lastRow.rupValues = [];
	table.columns().responsiveHidden().each( function(valor,i) {
		if(!$fila.find('td').eq(i).hasClass('select-checkbox')){//si la primera columna es de seleccion no entrar.
			if(valor !== ctx.inlineEdit.lastRow.columnsHidden[i] && ctx.oInit.columns[i].editable){//Si hay cambio meter el valor al input
                    var value = '';
				if(valor){//se coge el valor del child.
                        var cont = ctx.inlineEdit.lastRow.columnsHidden.reduce(function (a, b) {
                            return b === false ? a + 1 : a;
                        }, 0);
					var total = ctx.inlineEdit.lastRow.columnsHidden.length;
					cont = cont + i - total;
					var $inputChild = $fila.next('.child').find('li').eq(cont).find('select,input');
					value = $inputChild.val();
					if($inputChild.length > 0){
                            $('#' + $inputChild[0].id.replace('_child', '')).prop('disabled', false);
					}
					if($inputChild.is(':checkbox')){//x si es checkbox
						if($inputChild.prop('checked')){
							value = true;
						}else{
							value = false;
						}
					} 
	
				}else{//se coge el valor de los inputs ocultos.
					var $input = $fila.find('td').eq(i).find('select,input');
					value = $input.val();
					$input.prop('disabled', true);
					if($input.is(':checkbox')){//x si es checkbox
						if($input.prop('checked')){
							value = true;
						}else{
							value = false;
						}
					}
				}
				
			}else{
                    var contar = ctx.inlineEdit.lastRow.columnsHidden.reduce(function (a, b) {
                        return b === false ? a + 1 : a;
                    }, 0);
				var totalContar = ctx.inlineEdit.lastRow.columnsHidden.length;
				contar = contar + i - totalContar;
				// se asigna valor normal
				
				if(valor || $fila.next('.child').find('li').eq(contar).find('select,input').length === 0){
					var $input2 = $fila.find('td').eq(i).find('select,input');
					value = $input2.val();
					if($input2.is(':checkbox')){//x si es checkbox
						if($input2.prop('checked')){
							value = true;
						}else{
							value = false;
						}
					}
				}else{
					var $inputChild2 = $fila.next('.child').find('li').eq(contar).find('select,input');
					value = $inputChild2.val();
					if($inputChild2.is(':checkbox')){//x si es checkbox
						if($inputChild2.prop('checked')){
							value = true;
						}else{
							value = false;
						}
					}
				}
			}
			//Guardar los inputs
                ctx.inlineEdit.lastRow.rupValues.push({
                    idCell: i,
                    value: value,
                    visible: valor
                });
		}
	});
}

/**
* Asignar los valores de los inputs en responsive.
*
* @name _asignarInputsValues
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $fila - fila que se está editando.
*
*/
function _asignarInputsValues(ctx,$fila){
	var contChild = 0;
	$.each(ctx.inlineEdit.lastRow.rupValues,function(i,celda) {
		if(celda.value !== undefined ){
			if(celda.visible){// se asignan a los inputs ocultos
				if($fila.find('td').eq(celda.idCell).find('select').length > 0){
					$fila.find('td').eq(celda.idCell).find('select').rup_combo('setRupValue',celda.value);
				}else{
					$fila.find('td').eq(celda.idCell).find('input').val(celda.value);
					if($fila.find('td').eq(celda.idCell).find('input').is(':checkbox')){
						if(celda.value){
							$fila.find('td').eq(celda.idCell).find('input').prop('checked',true);
						}else{
							$fila.find('td').eq(celda.idCell).find('input').prop('checked',false);
						}
					}
				}
			}else{//se asignan alos child
				if($fila.next('.child').find('li').eq(contChild).find('select').length > 0){
					$fila.next('.child').find('li').eq(contChild).find('select').rup_combo('setRupValue',celda.value);
				}else{
					$fila.next('.child').find('li').eq(contChild).find('input').val(celda.value);
					if($fila.next('.child').find('li').eq(contChild).find('input').is(':checkbox')){
						if(celda.value){
							$fila.next('.child').find('li').eq(contChild).find('input').prop('checked',true);
						}else{
							$fila.next('.child').find('li').eq(contChild).find('input').prop('checked',false);
						}
					}
				}
				 contChild++;
			}
		}else if(!celda.visible){//si esta oculto, es un child no editable por lo que hay que contarlo.
			contChild++;
		}
	});
}

/**
* Se crear un tr ficticio cuando se va a añadir un registro.
*
* @name _createTr
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - table
* @param {object} ctx - Es el contexto de cada tabla.
* @param {object} $columns - Módelo de columnas de la tabla.
*
*/
function  _createTr(dt,ctx,columns){
	var row = {};
	if(ctx.oInit.colModel !== undefined){
		jQuery.grep(ctx.oInit.colModel, function( n) {
			row[n.name] = '';
		});
		columns.unshift(row);
	}
	return columns;
}

/**
* Dibujar los iconos del responsive.
*
* @name _drawInLineEdit
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} tabla - Api de la tabla
* @param {object} ctx - Es el contexto de cada tabla.
*
*/
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

/**
* Para saber si hay paginación o no.
*
* @name _notExistOnPage
* @function
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} ctx - Es el contexto de cada tabla.
*
*
*@return {boolean} si existe paginación o no.
*/
function _notExistOnPage(ctx){
	var pk = DataTable.Api().rupTable.getIdPk(ctx.inlineEdit.row,ctx.oInit);
	var encontrado = true;
	$.each(ctx.json.rows,function(index,r) {
		if(DataTable.Api().rupTable.getIdPk(r,ctx.oInit) == pk){
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
* @since UDA 3.7.0 // Table 1.0.0
*
* @param {object} dt - Es el objeto table.
*
*/
function _deleteAllSelects(dt){
	var ctx = dt.settings()[0];
	let idRow = 0;
	let regex = new RegExp(ctx.oInit.multiplePkToken, 'g');
    let actionType = ctx.multiselection.selectedIds.length > 1 ? 'POST' : 'DELETE';
    
	let _doDelete = function () {
		let row = {};
        row.filter = window.form2object(ctx.oInit.filter.$filterContainer[0]);
		if (ctx.multiselection.selectedIds.length > 1) {
            row.core = {
                'pkToken': ctx.oInit.multiplePkToken,
                'pkNames': ctx.oInit.primaryKey
            };
			row.multiselection = {};
			row.multiselection.selectedAll = ctx.multiselection.selectedAll;
			if (row.multiselection.selectedAll) {
				row.multiselection.selectedIds = ctx.multiselection.deselectedIds;
			} else {
				row.multiselection.selectedIds = ctx.multiselection.selectedIds;
			}
			_callSaveAjax(actionType, ctx, idRow, row, '/deleteAll', true);
		} else {
			row = ctx.multiselection.selectedIds[0];
			row = row.replace(regex,'/');
			_callSaveAjax(actionType, ctx, '', idRow, '/' + row, true);
		}
    };
    
	if (ctx.oInit.inlineEdit.settings.deleteDialog) {
		$.rup_messages('msgConfirm', {
			message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.deleteAll'),
			title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.delete'),
			OKFunction: function () {
				_doDelete();
	            $('#' + ctx.sTableId).triggerHandler('tableMessageOk', ctx);
			},
			CANCELFunction: ctx.oInit.inlineEdit.cancelDeleteFunction
		});
    } else {
    	_doDelete();
    }
}

/**
* Metodo que comprueba el seeker.
*
* @name _comprobarSeeker
* @function
* @since UDA 3.7.0 // Table 1.0.0
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
		
		$('#'+ctx.sTableId+' tbody tr').eq(idRow).find('td.select-checkbox i.filtered-row').remove();
		$('#'+ctx.sTableId+' tbody tr').eq(idRow).find('td i.filtered-row').remove();
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
	
        if (ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined &&
            ctx.inlineEdit.lastRow.idx == idx) {
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

apiRegister( 'inlineEdit.cloneLine()', function (dt, ctx, idRow ) {
	_cloneLine(dt,ctx,idRow);
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

	if(!ctx.oInit.noEdit && ctx.oInit.inlineEdit !== undefined && ctx.oInit.inlineEdit.activate !== false){
		DataTable.inlineEdit.init( new DataTable.Api( ctx ) );
		
		if (ctx.oInit.inlineEdit.cancelDeleteFunction === undefined) {
            ctx.oInit.inlineEdit.cancelDeleteFunction = function cancelClicked() {};
        }
	}

} );


return DataTable.inlineEdit;
}));
