/*! Select for DataTables 3.0.0
 * © SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     Select
 * @description Select for DataTables
 * @module      "rup.table.select"
 * @version     3.0.0
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net
 * @copyright   SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'datatables.net', '../rup.contextMenu', '../rup.feedback'], function ($) {
            return factory($, window, document);
        });
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = function (root, $) {
            if (!root) {
                root = window;
            }

            if (!$ || !$.fn.dataTable) {
                $ = require('datatables.net')(root, $).$;
            }

            return factory($, root, root.document);
        };
    } else {
        // Browser
        factory(jQuery, window, document);
    }
}(function ($, window, document) {
    'use strict';
    var DataTable = $.fn.dataTable;

    // Version information for debugger
    DataTable.select = {};

    DataTable.select.version = '3.0.0';

    /**
     * Se inicializa el componente select
     *
     * @name init
     * @function
     * @since UDA 3.4.0
     * 
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.select.init = function (dt) {
		var ctx = dt.settings()[0];

		if (!DataTable.versionCheck('2')) {
			throw 'Warning: Select requires DataTables 2 or newer';
		}
		
		ctx.select = [];

		if (ctx._select) {
			return;
		}

		var rowsBody = $(ctx.nTBody);
		
		// Se selecciona una fila
		if (ctx.oInit.selectFilaDer) {
			rowsBody.on('click.DT contextmenu keydown', 'tr:not(.dtrg-group)', function(e) {
				// Solo selecciona si se pulsa sobre la barra espaciadora o se hace click izquierdo col raton
				if (e.which == 1 || e.which == 32 || e.which == 3) {
					if (e.target.className.indexOf('openResponsive') > -1 || $(this).hasClass('editable')) {// no hacer nada
						//no se devuelve nada para los checkbox funcionen.
					} else {//selecionar
						$(this).triggerHandler('tableSelectBeforeSelectRow', ctx);
						var idRow = this._DT_RowIndex;
						_selectRowIndex(dt, idRow, $(this));
						$(this).triggerHandler('tableSelectAfterSelectRow', ctx);
					}
				}
			});
		} else {
			rowsBody.on('click.DT keydown', 'tr:not(.dtrg-group)', function(e) {
				// Solo selecciona si se pulsa sobre la barra espaciadora o se hace click izquierdo col raton
				if (e.which == 1 || e.which == 32 || e.which == 3) {
					if (e.target.className.indexOf('openResponsive') > -1 || $(this).hasClass('editable')) {// no hacer nada
						//no se devuelve nada para los checkbox funcionen.
					} else {//selecionar
						$(this).triggerHandler('tableSelectBeforeSelectRow', ctx);
						var idRow = this._DT_RowIndex;
						_selectRowIndex(dt, idRow, $(this));
						$(this).triggerHandler('tableSelectAfterSelectRow', ctx);
					}
				}
			});
		}

		if (ctx.oInit.inlineEdit === undefined && ctx.oInit.formEdit === undefined) {
			$(window).on('resize.dtr', DataTable.util.throttle(function() { //Se calcula el responsive
				DataTable.Api().editForm.addchildIcons(ctx);
			}));
		}
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
     * @since UDA 3.4.0
     *
     * 
     */
    function _drawSelectId(ctx) {

        if (ctx.multiselection.selectedRowsPerPage.length === 1) {
            var row = ctx.multiselection.selectedRowsPerPage[0];
            var rowSelectAux = ctx.json.rows[row.line];

            if (rowSelectAux !== undefined && row.id === DataTable.Api().rupTable.getIdPk(rowSelectAux, ctx.oInit)) {
                var rowsBody = $(ctx.nTBody);
                $('tr:not(.dtrg-group)', rowsBody).eq(row.line).addClass('selected tr-highlight');
            }
        }
    }

    function _selectRowIndex(dt, index, tr) {
        var ctx = dt.settings()[0];
        ctx.multiselection.selectedRowsPerPage = [];
        ctx.oInit.select.funcionParams = '';
        var rowsBody = $(ctx.nTBody);
        if (tr.hasClass('tr-highlight')) { //se deselecciona
            tr.removeClass('selected tr-highlight');
            if (tr.next('.child').length >= 1) {
                tr.next('.child').removeClass('selected tr-highlight');
            }
            ctx.multiselection.numSelected = 0;
            ctx.multiselection.selectedIds = [];
            ctx.multiselection.lastSelectedId = '';
            //Si es en edicion en linea, no hacer nada
            if (!ctx.oInit.noEdit && ctx.oInit.inlineEdit !== undefined && DataTable.Api().inlineEdit.editSameLine(ctx, index)) {
                //Seleccionar la fila otra vez.
                _selectRowIndex(dt, index, tr);
            }
        } else { //se selecciona
            $('tr', rowsBody).removeClass('selected tr-highlight');
            tr.addClass('selected tr-highlight');
            if (tr.next('.child').length >= 1) {
                tr.next('.child').addClass('selected tr-highlight');
            }
            tr.triggerHandler('tableHighlightRowAsSelected',ctx);
            var row = ctx.json.rows[index];
            if (row !== undefined) {
                var arra = {
                    id: DataTable.Api().rupTable.getIdPk(row, ctx.oInit),
                    page: dt.page() + 1,
                    line: index
                };
                ctx.multiselection.selectedRowsPerPage.splice(0, 0, arra);
                ctx.multiselection.numSelected = 1;
                ctx.multiselection.selectedIds = [DataTable.Api().rupTable.getIdPk(row, ctx.oInit)];
                ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
            }
            // si es en edicion en linea,
            if (!ctx.oInit.noEdit && ctx.oInit.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined &&
                ctx.inlineEdit.lastRow.idx !== index) {
                DataTable.Api().inlineEdit.restaurarFila(ctx, true);
            }
        }
        if (ctx.oInit.buttons !== undefined) {
            DataTable.Api().buttons.display(ctx);
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

    apiRegister('select()', function () {
        return this.iterator('table', function (ctx) {
            DataTable.select.init(new DataTable.Api(ctx));
        });
    });


    apiRegister('select.drawSelectId()', function (ctx) {
        _drawSelectId(ctx);
    });

    apiRegister('select.deselect()', function (ctx) {
        var rowsBody = $(ctx.nTBody);
        $('tr', rowsBody).removeClass('selected tr-highlight');
        ctx.multiselection.numSelected = 0;
        ctx.multiselection.selectedIds = [];
        DataTable.Api().buttons.display(ctx);
        $('#' + $.escapeSelector(ctx.sTableId)).trigger('rupTable_deselect',ctx);
    });

    apiRegister('select.selectRowIndex()', function (dt, index, isDoubleClick) {
        const ctx = dt.settings()[0];
        const rowsBody = $(ctx.nTBody);
        var countTr = index;
        if (isDoubleClick !== undefined) {
            countTr = countTr + 1;
        }
        _selectRowIndex(dt, index, $('tr:not(.dtrg-group)', rowsBody).eq(index));
    });
    
    apiRegister('select.defaultId()', function (ctx) {

    	let defaultId = ctx.oInit.select.defaultId;
    	
        if(defaultId !== undefined){
	        let indexInArray = jQuery.inArray(defaultId, ctx.multiselection.selectedIds);
 	        if(indexInArray < 0){//no esta ya seleccioando
	        	ctx.multiselection.selectedIds.push(defaultId);
	        	ctx.oInit.select.defaultId = undefined;
 	        }
        }
    });


    /* * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     */

    // DataTables creation - check if select has been defined in the options. Note
    // this required that the table be in the document! If it isn't then something
    // needs to trigger this method unfortunately. The next major release of
    // DataTables will rework the events and address this.
    $(document).on('preInit.dt.dtSelect', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (ctx.oInit.select !== undefined && ctx.oInit.select.activate !== false) {
            DataTable.select.init(new DataTable.Api(ctx));
        }
    });


    return DataTable.select;
}));