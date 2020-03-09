/* eslint-env jquery,amd */
/**
 * Módulo que habilita la edicción mediante un formulario.
 *
 * @summary 		Extensión del componente RUP Datatable
 * @module			"rup.table.editForm"
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

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', '../core/utils/jquery.form', '../rup.form', '../rup.combo', 'datatables.net'], function ($) {
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
}(function ($, window, document, undefined) {
    'use strict';
    var DataTable = $.fn.dataTable;


    // Version information for debugger
    DataTable.editForm = {};

    DataTable.editForm.version = '1.2.4';

    /**
     * Se inicializa el componente editForm
     *
     * @name init
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.editForm.init = function (dt) {
        var ctx = dt.settings()[0];
        var init = ctx.oInit.multiSelect;
        var defaults = DataTable.defaults.multiSelect;

        if (init === undefined) {
            init = defaults;
        }

        //DetailForm se convierte en function
        //Se inicializan los botones
        ctx.oInit.formEdit.detailForm = $(ctx.oInit.formEdit.detailForm);
        ctx.oInit.formEdit.idForm = ctx.oInit.formEdit.detailForm.find('form');
        ctx.oInit.formEdit.id = ctx.oInit.formEdit.detailForm[0].id.replace('_detail_div', '');
        if (ctx.oInit.formEdit.detailForm !== undefined &&
            $('body').find('[aria-describedby=\'' + ctx.oInit.formEdit.detailForm[0].id + '\']').length > 0) {
            $('body').find('[aria-describedby=\'' + ctx.oInit.formEdit.detailForm[0].id + '\']').remove();
        }

        //Se coge el adapter, y se crea la barra de navegación
        if (ctx.oInit.multiSelect === undefined) { // si es de select
            _callNavigationSelectBar(dt);
        } else { //si es de multiselect
            _callNavigationBar(dt);
        }
        //Se inicializa el editFrom la info
        _updateDetailPagination(ctx, 1, 1);

        //se añade el boton de cancelar
        ctx.oInit.formEdit.buttoCancel = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_cancel');
        ctx.oInit.formEdit.buttoCancel.bind('click', function () {
            cancelPopup(ctx);
            //Se cierra el dialog
            ctx.oInit.formEdit.detailForm.rup_dialog('close');
        });
        var idRow;
        var rowsBody = $(ctx.nTBody);
        //Se edita el row/fila.
        if (ctx.oInit.multiSelect !== undefined || ctx.oInit.select !== undefined) {
            var sel = ctx.oInit.multiSelect;
            if (sel === undefined) {
                sel = ctx.oInit.select;
            }
            if (!sel.deleteDoubleClick) { //Propiedad para desactivar el doble click.
                rowsBody.on('dblclick.DT keypress', 'tr[role="row"]', function (e) {
                    // Solo selecciona si se pulsa sobre el enter o se hace click izquierdo col raton
                    if (e.type == 'keypress' && e.which == 13 || e.type === 'dblclick') {
                        idRow = this._DT_RowIndex;
                        // Añadir la seleccion del mismo.
                        if (ctx.oInit.multiSelect !== undefined) {
                            dt['row'](idRow).multiSelect();
                        } else {
                            $('tr', rowsBody).removeClass('selected tr-highlight');
                            DataTable.Api().select.selectRowIndex(dt, idRow, true);
                        }
                        _getRowSelected(dt, 'PUT');
                        DataTable.editForm.fnOpenSaveDialog('PUT', dt, idRow, null);
                        $('#' + ctx.sTableId).triggerHandler('tableEditFormClickRow');
                    }
                });
            }
            //Opcion de usar el colModel
            if(ctx.oInit.colModel !== undefined){
            	$.each(ctx.oInit.colModel, function () {
            		 var cellColModel = this;
            	        if (cellColModel.editable === true) {
            	            var searchRupType = cellColModel.searchoptions !== undefined && cellColModel.searchoptions.rupType !== undefined ? cellColModel.searchoptions.rupType : cellColModel.rupType;
            	            var colModelName = cellColModel.index;
            	            var $elem = $('#' + colModelName); // Se añade el title de los elementos de acuerdo al colname
            	            // Si ya existe el div necesario para dar los estilos material al input, evitamos duplicarlo.

            	            $elem.attr({'title': colModelName}).removeAttr('readOnly'); // En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel

            	            if (searchRupType !== undefined) {
            	              var searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions; // Invocación al componente RUP

            	              $elem['rup_' + searchRupType](searchEditOptions);

            	              if (searchRupType === 'combo') {
            	                //asignar el valor
            	              //  $('#' + $elem.attr('id')).rup_combo('setRupValue', ctx.inlineEdit.lastRow.cellValues[cont]);
            	              }
            	            } 
            	          }
            	 });
            }
        }

        //Se captura evento de cierre
        ctx.oInit.formEdit.detailForm.on('dialogbeforeclose', function (event) {
            if (event.originalEvent !== undefined) { //el evento es cerrado por el aspa
                ctx.oInit.formEdit.okCallBack = false;
            }
            // si es igual no hacer nada.
            var formSerializado = _editFormSerialize(ctx.oInit.formEdit.idForm);
            if (ctx.oInit.formEdit.dataOrigin === formSerializado) {
                cancelPopup(ctx);
                return true;
            }
            if (ctx.oInit.formEdit.dataOrigin !== formSerializado && !ctx.oInit.formEdit.okCallBack) {

                $.rup_messages('msgConfirm', {
                    message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.saveAndContinue'),
                    title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
                    OKFunction: function () {
                        cancelPopup(ctx);
                        ctx.oInit.formEdit.okCallBack = true;
                        ctx.oInit.formEdit.detailForm.rup_dialog('close');
                    },
                    CANCELFunction: function () {
                        ctx.oInit.formEdit.okCallBack = false;
                    }
                });


            }
            //En caso de aceptar se cierra y se limpia.
            if (!ctx.oInit.formEdit.okCallBack || ctx.oInit.formEdit.okCallBack === undefined) {
                return false;
            }

        });
        ctx.oInit.formEdit.detailForm.settings = {
            type: $.rup.dialog.DIV
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
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param  {DataTable.settings} ctx Settings object to operate on
     *
     */
    function init(ctx) {
        var api = new DataTable.Api(ctx);

        // Row callback so that classes can be added to rows and cells if the item
        // was selected before the element was created. This will happen with the
        // `deferRender` option enabled.
        //
        // This method of attaching to `aoRowCreatedCallback` is a hack until
        // DataTables has proper events for row manipulation If you are reviewing
        // this code to create your own plug-ins, please do not do this!
        ctx.aoRowCreatedCallback.push({
            fn: function (row, data, index) {
                var i, ien;
                var d = ctx.aoData[index];

                // Row
                if (d._multiSelect_selected) {
                    $(row).addClass(ctx._multiSelect.className);
                }

                // Cells and columns - if separated out, we would need to do two
                // loops, so it makes sense to combine them into a single one
                for (i = 0, ien = ctx.aoColumns.length; i < ien; i++) {
                    if (ctx.aoColumns[i]._multiSelect_selected || (d._selected_cells && d._selected_cells[i])) {
                        $(d.anCells[i]).addClass(ctx._multiSelect.className);
                    }
                }
            },
            sName: 'select-deferRender'
        });

        // On Ajax reload we want to reselect all rows which are currently selected,
        // if there is an rowId (i.e. a unique value to identify each row with)
        api.on('preXhr.dt.dtSelect', function () {
            // note that column selection doesn't need to be cached and then
            // reselected, as they are already selected
            var rows = api.rows({
                selected: true
            }).ids(true).filter(function (d) {
                return d !== undefined;
            });

            var cells = api.cells({
                selected: true
            }).eq(0).map(function (cellIdx) {
                var id = api.row(cellIdx.row).id(true);
                return id ? {
                    row: id,
                    column: cellIdx.column
                } :
                    undefined;
            }).filter(function (d) {
                return d !== undefined;
            });

            // On the next draw, reselect the currently selected items
            api.one('draw.dt.dtSelect', function () {
                api.rows(rows).multiSelect();

                // `cells` is not a cell index selector, so it needs a loop
                if (cells.any()) {
                    cells.each(function (id) {
                        api.cells(id.row, id.column).multiSelect();
                    });
                }
            });
        });

        // Clean up and release
        api.on('destroy.dtSelect', function () {
            disableMouseSelection(api);
            api.off('.dtSelect');
        });
    }

    function eventTrigger(api, type, args, any) {
        if (any && !api.flatten().length) {
            return;
        }

        if (typeof type === 'string') {
            type = type + '.dt';
        }

        args.unshift(api);

        $(api.table().node()).trigger(type, args);
    }

    function cancelPopup(ctx) {
        ctx.oInit.formEdit.okCallBack = false;
        var feedback = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_feedback');

        //Despues de cerrar
        //Se limpia los elementos.
        if (ctx.oInit.formEdit.idForm.find('.error').length > 0) {
            ctx.oInit.formEdit.idForm.rup_validate('resetElements');
        }


        //Se cierran los mensajes del feedback
        if (feedback[0].className !== '') {
            feedback.rup_feedback('hide');
        }
    }

    /**
     * Función que lleva todo el comportamiento para abrir el dialog y editar un registro.
     *
     * @name openSaveDialog
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} actionType - Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest.
     * @param {object} dt - Es el objeto table.
     * @param {integer} idRow - Número con la posición de la fila que hay que obtener.
     * @param {string} customTitle - Título personalizado.
     *
     */
    DataTable.editForm.fnOpenSaveDialog = function _openSaveDialog(actionType, dt, idRow, customTitle) {
        var loadPromise = $.Deferred();
        var ctx = dt.settings()[0];
        var idForm = ctx.oInit.formEdit.idForm;

        //Se limpia los errores. Si hubiese
        var feed = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_feedback');
        var divErrorFeedback = ctx.oInit.formEdit.detailForm.find('#' + feed[0].id + '_ok');
        if (divErrorFeedback.length > 0) {
            divErrorFeedback.hide();
        }

        //se añade el boton de guardar
        var button = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_save');
        //se añade el boton de guardar y continuar
        var buttonContinue = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_save_repeat');

        if (actionType === 'CLONE') { //En caso de ser clonado, solo se debe guardar.
            actionType = 'POST';
            buttonContinue.hide();
        } else {
            buttonContinue.show();
        }

        if (idRow < 0) {
            idRow = 1;
        }
        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditBeforeInitData');
        var row = ctx.json.rows[idRow];
        var rowArray = $.rup_utils.jsontoarray(row);
        
        let title = customTitle != (undefined && null) ? customTitle : "";

        if (actionType === 'PUT') {
            if (ctx.oInit.formEdit.direct === undefined) { //Si existe esta variable, no accedemos a bbdd a por el registro.
                //se obtiene el row entero de bbdd, meter parametro opcional.
                var pk = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
                //se evita slash en la url GET como parámetros.Formateo de fecha.
                var regexSlash = new RegExp('/', 'g');
                pk = pk.replace(regexSlash, '-');
                var regex = new RegExp(ctx.oInit.multiplePkToken, 'g');
                pk = pk.replace(regex, '/');

                var ajaxOptions = {
                    url: ctx.oInit.urlBase + '/' + pk,
                    accepts: {
                        '*': '*/*',
                        'html': 'text/html',
                        'json': 'application/json, text/javascript',
                        'script': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                        'text': 'text/plain',
                        'xml': 'application/xml, text/xml'
                    },
                    type: 'GET',
                    data: [],
                    dataType: 'json',
                    showLoading: false,
                    contentType: 'application/json',
                    async: false,
                    success: function (data) {
                        row = data;
                    },
                    error: function (xhr) {
                        var divErrorFeedback = feed; //idTableDetail.find('#'+feed[0].id + '_ok');
                        if (divErrorFeedback.length === 0) {
                            divErrorFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                        }
                        _callFeedbackOk(ctx, divErrorFeedback, xhr.responseText, 'error');
                        $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax');
                    },
                    complete: () => {
                        if (ctx.oInit.formEdit.$navigationBar.funcionParams && ctx.oInit.formEdit.$navigationBar.funcionParams.length >= 4) {
                            _showOnNav(dt, ctx.oInit.formEdit.$navigationBar.funcionParams[3]);
                        }
                    }
                };
                loadPromise = $.rup_ajax(ajaxOptions);
                //Se carga desde bbdd y se actualiza la fila
                dt.row(idRow).data(row);
                ctx.json.rows[idRow] = row;
                //Se mantiene el checked sin quitar.
                var identy = idRow + 1;
                $('#' + ctx.sTableId + ' > tbody > tr:nth-child(' + identy + ') > td.select-checkbox input[type="checkbox"]').prop('checked', true);
                rowArray = $.rup_utils.jsontoarray(row);
            }
            $.rup_utils.populateForm(rowArray, idForm);
            var multiselection = ctx.multiselection;
            var indexInArray = jQuery.inArray(DataTable.Api().rupTable.getIdPk(row, ctx.oInit), multiselection.selectedIds);
            if (ctx.multiselection.selectedAll) { //Si es selecAll recalcular el numero de los selects. Solo la primera vez es necesario.
                indexInArray = ctx.oInit.formEdit.$navigationBar.numPosition;
            }
            if (indexInArray === undefined) {
                indexInArray = 0;
                ctx.oInit.formEdit.$navigationBar.numPosition = 0;
            }
            var numTotal = multiselection.numSelected;
            if (ctx.oInit.multiSelect === undefined) {
                numTotal = ctx.json.recordsTotal;
                indexInArray = (Number(ctx.json.page) - 1) * 10;
                indexInArray = indexInArray + idRow;
            }
            $('#' + ctx.sTableId).triggerHandler('tableEditFormAfterFillData');
            _updateDetailPagination(ctx, indexInArray + 1, numTotal);
            DataTable.Api().rupTable.selectPencil(ctx, idRow);
            // Se guarda el ultimo id editado.
            ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
            // Se muestra el dialog.
            ctx.oInit.formEdit.$navigationBar.show();
            // Si no se ha definido un 'customTitle' asignamos un valor a la variable del título del formulario
            if(customTitle === (undefined || null)) {
            	title = $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.editCaption');
            }
            // Comprobamos si se desea bloquear la edicion de las claves primarias
            DataTable.Api().rupTable.blockPKEdit(ctx, actionType);
        } else if (actionType === 'POST') {
            $.rup_utils.populateForm(rowArray, idForm);
            ctx.oInit.formEdit.$navigationBar.hide();
            // Si no se ha definido un 'customTitle' asignamos un valor a la variable del título del formulario
            if(customTitle === (undefined || null)) {
            	title = $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.addCaption');
            }
            // Comprobamos si hay claves primarias bloqueadas y las desbloqueamos
            DataTable.Api().rupTable.blockPKEdit(ctx, actionType);
        }

        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditBeforeShowForm');
        // Establecemos el título del formulario

        ctx.oInit.formEdit.detailForm.rup_dialog(ctx.oInit.formEdit.detailForm.settings);
        ctx.oInit.formEdit.detailForm.rup_dialog('setOption', 'title', title);
        ctx.oInit.formEdit.detailForm.rup_dialog('open');

        // Establecemos el foco al primer elemento input o select que se
        // encuentre habilitado en el formulario
        $(idForm[0]).find('input,select').filter(':not([readonly]):first').focus();

        // Se guardan los datos originales
        ctx.oInit.formEdit.dataOrigin = _editFormSerialize(idForm);
        ctx.oInit.formEdit.okCallBack = false;


        button.unbind('click');
        button.bind('click', function () {
            // Comprobar si row ha sido modificada
            // Se serializa el formulario con los cambios
            row = _editFormSerialize(idForm);

            // Verificar los checkbox vacíos.
            row = _returnCheckEmpty(idForm, _editFormSerialize(idForm));
            
            // Se transforma
            row = $.rup_utils.queryStringToJson(row);
            
        	let idTableDetail = ctx.oInit.formEdit.detailForm;
            
            // Muestra un feedback de error por caracter ilegal
            if(!row) {
            	ctx.oInit.formEdit.okCallBack = false;
            	let feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
            	let divErrorFeedback = feed;
                if (divErrorFeedback.length === 0) {
                    divErrorFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                }
                _callFeedbackOk(ctx, divErrorFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_global.charError'), 'error');
                $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax');
            } else {
            	ctx.oInit.formEdit.okCallBack = true;
            	_callSaveAjax(actionType, dt, row, idRow, false, idTableDetail, '');
            }
        });


        ctx.oInit.formEdit.detailForm.buttonSaveContinue = buttonContinue;
        ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType = actionType;
        buttonContinue.unbind('click');
        buttonContinue.bind('click', function () {
            var actionSaveContinue = ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType;
            // Comprobar si row ha sido modificada
            // Se serializa el formulario con los cambios
            row = _editFormSerialize(idForm);

            // Verificar los checkbox vacíos.
            row = _returnCheckEmpty(idForm, _editFormSerialize(idForm));

            // Se transforma
            row = $.rup_utils.queryStringToJson(row);
            
            let idTableDetail = ctx.oInit.formEdit.detailForm;
            
            // Muestra un feedback de error por caracter ilegal
            if(!row) {
            	ctx.oInit.formEdit.okCallBack = false;
            	let feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
            	let divErrorFeedback = feed;
                if (divErrorFeedback.length === 0) {
                    divErrorFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                }
                _callFeedbackOk(ctx, divErrorFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_global.charError'), 'error');
                $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax');
            } else {
            	ctx.oInit.formEdit.okCallBack = true;
            	_callSaveAjax(actionSaveContinue, dt, row, idRow, true, idTableDetail, '');
            }
        });

        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditAfterShowForm');

        return loadPromise;
    };


    /**
     * Llamada al servidor con los datos de edición.
     *
     * @name _callSaveAjax
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} actionType - Es la acción que se va a ajecutar en el formulario para ir al controller, basado en rest.
     * @param {object} dt - Es el objeto table.
     * @param {object} row - Son los datos que se cargan.
     * @param {integer} idRow - Número con la posición de la fila que hay que obtener.
     * @param {boolean} continuar - Si es true guarda la pagina y se queda en el dialog , si es false guarda y cierra el dialog.
     * @param {string} idTableDetail - Identificdor del detail de la table.
     * @param {string} url - Url que se añade para llamar  al controller.
     *
     */
    function _callSaveAjax(actionType, dt, row, idRow, continuar, idTableDetail, url) {
        var ctx = dt.settings()[0];
        $('#' + ctx.sTableId).triggerHandler('tableEditFormBeforeCallAjax');
        // add Filter
        var feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
        var msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_table.modifyOK');
        var validaciones = ctx.oInit.formEdit.validate;
        if (url === '/deleteAll' || actionType === 'DELETE') {
            msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_table.deletedOK');
            if (validaciones !== undefined) {
                validaciones.rules = {};
            }
        }

        if (ctx.oInit.masterDetail !== undefined) { //Asegurar que se recoge el idPadre
            var masterPkObject = DataTable.Api().masterDetail.getMasterTablePkObject(ctx);
            jQuery.extend(true, masterPkObject, row);
            row = masterPkObject;
        }
        if (ctx.oInit.formEdit.multiPart) { //si es multiPart el row se coje solo.
            row = {};
        }
        var ajaxOptions = {
            url: ctx.oInit.urlBase + url,
            accepts: {
                '*': '*/*',
                'html': 'text/html',
                'json': 'application/json, text/javascript',
                'script': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                'text': 'text/plain',
                'xml': 'application/xml, text/xml'
            },
            type: actionType,
            data: row,
            dataType: 'json',
            showLoading: false,
            contentType: 'application/json',
            async: true,
            success: function () {

                if (url !== '/deleteAll' && actionType !== 'DELETE') {
                    if (continuar) { //Se crea un feedback_ok, para que no se pise con el de los errores
                        var divOkFeedback = idTableDetail.find('#' + feed[0].id + '_ok');
                        if (divOkFeedback.length === 0) {
                            divOkFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                        }
                        _callFeedbackOk(ctx, divOkFeedback, msgFeedBack, 'ok'); //Se informa, feedback del formulario
                    } else {
                        ctx.oInit.formEdit.detailForm.rup_dialog('close');
                        _callFeedbackOk(ctx, ctx.multiselection.internalFeedback, msgFeedBack, 'ok'); //Se informa feedback de la tabla
                    }

                    if (actionType === 'PUT') { //Modificar
                        dt.row(idRow).data(row); // se actualiza al editar
                        ctx.json.rows[idRow] = row;
                        // Actualizamos el ultimo id seleccionado (por si ha sido editado)
                        var posicion = 0;
                        $.each(ctx.multiselection.selectedRowsPerPage, function (index, p) {
                            if (p.id === ctx.multiselection.lastSelectedId) {
                                posicion = index;
                                return;
                            }
                        });
                        if (ctx.seeker !== undefined && ctx.seeker.ajaxOption.data.search.value &&
                            ctx.seeker.search.funcionParams.length > 0) {
                            _comprobarSeeker(row, ctx, idRow);
                        }
                        ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
                        ctx.multiselection.selectedRowsPerPage[posicion].id = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
                        ctx.multiselection.internalFeedback.type = undefined; //se recarga el type no esta definido.
                    } else {
                        // Se actualiza la tabla temporalmente. y deja de ser post para pasar a put(edicion)
                        if (ctx.oInit.select !== undefined) {
                            DataTable.Api().select.deselect(ctx);
                        }
                        var rowAux = row;
                        $.each(ctx.json.rows, function (index, r) {
                            var rowNext = r;
                            dt.row(index).data(rowAux);
                            rowAux = rowNext;
                        });
                        ctx.json.rows.pop();
                        ctx.json.rows.splice(0, 0, row);

                        //Se guardan los datos para pasar de nuevo a editable.
                        if (ctx.oInit.formEdit.saveContinueEdit) {
                            ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType = 'PUT';
                            DataTable.Api().rupTable.blockPKEdit(ctx, 'PUT');
                        } else { //mantener y borrar
                            var idForm = ctx.oInit.formEdit.idForm;
                            idForm.resetForm();
                            jQuery('.ui-selectmenu-status', idForm).text('--');
                            jQuery('[ruptype=\'combo\']', idForm).rup_combo('clear');
                        }

                        ctx.oInit.formEdit.dataOrigin = _editFormSerialize(ctx.oInit.formEdit.idForm);
                        if (ctx.oInit.multiSelect !== undefined) {
                            ctx.multiselection.internalFeedback.type = 'noBorrar';
                            dt.row().multiSelect();
                        }
                        // Se actualiza la linea
                        if (ctx.json.reorderedSelection !== null && ctx.json.reorderedSelection !== undefined) {
                            ctx.multiselection.selectedRowsPerPage[0].line = ctx.json.reorderedSelection[0].pageLine;
                        }
                        $('#' + ctx.sTableId).triggerHandler('tableEditFormAfterInsertRow');
                    }

                    dt.ajax.reload(function () {
                        $('#' + ctx.sTableId).trigger('tableEditFormSuccessCallSaveAjax');
                    }, false);

                } else { // Eliminar
                    ctx.multiselection.internalFeedback.type = 'eliminar';
                    ctx.multiselection.internalFeedback.msgFeedBack = msgFeedBack;
                    var reloadDt = function () {
                        dt.ajax.reload(function () {
                            $('#' + ctx.sTableId).trigger('tableEditFormSuccessCallSaveAjax');
                        }, false);
                    };
                    if (ctx.oInit.multiSelect !== undefined) {
                        $('#' + ctx.sTableId).on('rupTable_deselectAll', function () {
                            reloadDt();
                        });
                        DataTable.Api().multiSelect.deselectAll(dt);
                    } else if (ctx.oInit.select !== undefined) {
                        $('#' + ctx.sTableId).on('rupTable_deselect', function () {
                            reloadDt();
                        });
                        DataTable.Api().select.deselect(ctx);
                        _callFeedbackOk(ctx, ctx.multiselection.internalFeedback, msgFeedBack, 'ok'); //Se informa feedback de la tabla
                    }
                }
            },
            complete: function () {
                $('#' + ctx.sTableId).triggerHandler('tableEditFormCompleteCallSaveAjax');
            },
            error: function (xhr) {
                var divErrorFeedback = idTableDetail.find('#' + feed[0].id + '_ok');
                if (divErrorFeedback.length === 0) {
                    divErrorFeedback = $('<div/>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                }
                _callFeedbackOk(ctx, divErrorFeedback, xhr.responseText, 'error');
                // debugger;
                $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax');
            },
            validate: validaciones,
            feedback: feed.rup_feedback({
                type: 'error',
                block: false
            })
        };

        if (url !== '/deleteAll' && actionType !== 'DELETE') {
            ctx.oInit.formEdit.idForm.rup_form();
            ctx.oInit.formEdit.idForm.rup_form('ajaxSubmit', ajaxOptions);
        } else {
            //Se cambia el data
            if (ajaxOptions.data == '') {
                delete ajaxOptions.data;
            } else {
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
            }
            $.rup_ajax(ajaxOptions);
        }
    }

    /**
     * Llamada para crear el feedback dentro del dialog.
     *
     * @name callFeedbackOk
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {object} feedback - Div donde se va ejecutar el feedback.
     * @param {string} msgFeedBack - Mensaje para el feedback.
     * @param {string} type - Tipos del feedback, mirar en el rup.feedback..
     *
     */
    function _callFeedbackOk(ctx, feedback, msgFeedBack, type) {
        $('#' + ctx.sTableId).triggerHandler('tableEditFormFeedbackShow');
        var confDelay = ctx.oInit.feedback.okFeedbackConfig.delay;

        try {
            feedback.rup_feedback('destroy');
        } catch (ex) {
         
        }

        feedback.rup_feedback({
            message: msgFeedBack,
            type: type,
            block: false,
            gotoTop: false,
            delay: confDelay
        });
    }


    /**
     * Se verifican los check vacios dentro de un formulario.
     *
     * @name returnCheckEmpty
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} idForm - Identificador del formulario.
     * @param {string} values - Values ya añadidos al formulario.
     *
     */
    function _returnCheckEmpty(idForm, values) {
        var maps = jQuery(idForm.selector + ' input[type=checkbox]:not(:checked)').map(
            function () {
                return '&' + this.name + '=0';
            }).get().toString();
        return values + maps;
    }

    /**
     * Actualiza la navegación del dialogo.
     *
     * @name updateDetailPagination
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {integer} currentRowNum - Número de la posición actual del registro selecionado.
     * @param {integer} totalRowNum - Número total de registros seleccionados.
     *
     */
    function _updateDetailPagination(ctx, currentRowNum, totalRowNum) {
        var tableId = ctx.oInit.formEdit.$navigationBar[0].id;
        if (currentRowNum === 1) {
            $('#first_' + tableId + ', #back_' + tableId, ctx.oInit.formEdit.detailForm).prop('disabled', true);
        } else {
            $('#first_' + tableId + ', #back_' + tableId, ctx.oInit.formEdit.detailForm).prop('disabled', false);
        }
        if (currentRowNum === totalRowNum) {
            $('#forward_' + tableId + ', #last_' + tableId, ctx.oInit.formEdit.detailForm).prop('disabled', true);
        } else {
            $('#forward_' + tableId + ', #last_' + tableId, ctx.oInit.formEdit.detailForm).prop('disabled', false);
        }

        $('#rup_jqtable_selectedElements_' + tableId).text($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.defaults.detailForm_pager'), currentRowNum, totalRowNum));
    }

    /**
     * Constructor de la barra de navegación.
     *
     * @name callNavigatorBar
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     *
     */
    function _callNavigationBar(dt) {
        var ctx = dt.settings()[0];
        ctx.oInit._ADAPTER = $.rup.adapter[jQuery.fn.rup_table.defaults.adapter];
        ctx.oInit.formEdit.$navigationBar = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_navigation');
        var settings = {};
        // Funcion para obtener los parametros de navegacion.
        settings.fncGetNavigationParams = function getNavigationParams_multiselection(linkType) {
            var execute = false,
                changePage = false,
                index = 0,
                newPageIndex = 0,
                npos = ctx.oInit.formEdit.$navigationBar.currentPos,
                page = dt.page() + 1,
                newPage = page,
                lastPage = ctx.json.total;
            var multiselection = ctx.multiselection;
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
                    rowSelected.page = _getNextPageSelected(ctx, 1, 'next');
                    if (Number(rowSelected.page) === page) { //Si es la misma pagina.buscar la linea
                        rowSelected.line = _getLineByPageSelected(ctx, -1);
                    } else {
                        rowSelected.line = 0; // luego hay que buscar la linea
                    }
                }
                break;
            case 'prev':
                // Si no se han seleccionado todos los elementos
                if (!multiselection.selectedAll) {
                    var indexPrev = ctx.oInit.formEdit.$navigationBar.currentPos.indexSelected - 1;
                    rowSelected = multiselection.selectedRowsPerPage[indexPrev];
                    rowSelected.indexSelected = indexPrev;
                } else {
                    ctx.oInit.formEdit.$navigationBar.numPosition--;
                    var linea = _getLineByPageSelectedReverse(ctx, ctx.oInit.formEdit.$navigationBar.currentPos.line);
                    if (linea === -1) { //Es que hay que cambiar de pagina.
                        //buscarPAgina.
                        rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
                        rowSelected.page = _getPrevPageSelected(ctx, page - 1);

                    } else {
                        rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
                    }
                }
                break;
            case 'next':
                // Si no se han seleccionado todos los elementos
                if (!multiselection.selectedAll) {
                    var indexNext = ctx.oInit.formEdit.$navigationBar.currentPos.indexSelected + 1;
                    rowSelected = multiselection.selectedRowsPerPage[indexNext];
                    rowSelected.indexSelected = indexNext;
                } else {
                    ctx.oInit.formEdit.$navigationBar.numPosition++;
                    //2 casos: Si hay que navegar o no.
                    var lineaNext = _getLineByPageSelected(ctx, ctx.oInit.formEdit.$navigationBar.currentPos.line);
                    if (lineaNext === -1) { //Es que hay que cambiar de pagina.
                        //buscarPAgina.
                        rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
                        rowSelected.page = _getNextPageSelected(ctx, page + 1, 'next');
                        rowSelected.line = 0; // luego hay que buscar la linea
                    } else {
                        rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
                    }
                }
                break;
            case 'last':
                // Si no se han seleccionado todos los elementos
                if (!multiselection.selectedAll) {
                    var indexLast = multiselection.selectedRowsPerPage.length - 1;
                    rowSelected = multiselection.selectedRowsPerPage[indexLast];
                    rowSelected.indexSelected = indexLast;
                } else {
                    ctx.oInit.formEdit.$navigationBar.numPosition = ctx.multiselection.numSelected - 1;
                    rowSelected = ctx.oInit.formEdit.$navigationBar.currentPos;
                    rowSelected.page = _getPrevPageSelected(ctx, lastPage);
                    if (Number(rowSelected.page) === page) { //Si es la misma pagina.buscar la linea
                        rowSelected.line = _getLineByPageSelectedReverse(ctx, -1);
                    }
                }
            }

            _hideOnNav(dt, linkType, () => {
                if (Number(rowSelected.page) !== page) {
                    var table = $('#' + ctx.sTableId).DataTable();
                    table.page(rowSelected.page - 1).draw('page');
                    //Se añaden los parametros para luego ejecutar, la funcion del dialog.
                    ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT', dt, rowSelected.line, linkType];
                } else { //Si nose pagina se abre directamente la funcion.
                    DataTable.editForm.fnOpenSaveDialog('PUT', dt, rowSelected.line, null).then(() => {
                        _showOnNav(dt, linkType);
                    });
                }
            });

            //Se actualiza la ultima posicion movida.
            ctx.oInit.formEdit.$navigationBar.currentPos = rowSelected;
            // Se añade el parametro 7 mientras esten en convivencia el rup.jqtable(entrar) y rup.table
            return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1, ''];

        };

        ctx.oInit.formEdit.$navigationBar.data('settings', settings);

        var barraNavegacion = $.proxy(ctx.oInit._ADAPTER.createDetailNavigation, ctx.oInit.formEdit.$navigationBar);
        ctx.oInit.formEdit.$navigationBar.append(barraNavegacion);
    }

    function _hideOnNav(dt, linkType, callback) {
        const ctx = dt.settings()[0];
        const direction = (linkType === 'prev' || linkType === 'first') ? 'right' : 'left';
        const $dialogContent = $('#' + ctx.sTableId + '_detail_div .dialog-content-material');
        $dialogContent.parent().css('overflow-x', 'hidden');
        $dialogContent.hide('slide', {
            direction: direction
        }, 100, () => {
            $dialogContent.after('<span id="' + ctx.sTableId + '_detail_div_loading" style="font-size: 5rem;"><i class="mdi mdi-spin mdi-loading" aria-hidden="true"/></span>');
            callback();
        });
    }

    function _showOnNav(dt, linkType) {
        const ctx = dt.settings()[0];
        const direction = (linkType === 'prev' || linkType === 'first') ? 'left' : 'right';
        const $dialogContent = $('#' + ctx.sTableId + '_detail_div .dialog-content-material');
        $('#' + ctx.sTableId + '_detail_div_loading').remove();
        $dialogContent.show('slide', {
            direction: direction
        }, 100, () => {
            $dialogContent.parent().css('overflow-x', 'auto');
        });
    }

    /**
     * Constructor de la barra de navegación.
     *
     * @name callNavigatorSelectBar
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     *
     */
    function _callNavigationSelectBar(dt) {
        var ctx = dt.settings()[0];
        ctx.oInit._ADAPTER = $.rup.adapter[jQuery.fn.rup_table.defaults.adapter];
        ctx.oInit.formEdit.$navigationBar = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_navigation');
        var settings = {};

        // Funcion para obtener los parametros de navegacion.
        settings.fncGetNavigationParams = function getNavigationParams_multiselection(linkType) {
            var execute = false,
                changePage = false,
                index = 0,
                newPageIndex = 0,
                npos = ctx.oInit.formEdit.$navigationBar.currentPos,
                page = dt.page() + 1,
                newPage = page,
                lastPage = ctx.json.total;
            var futurePage = page;

            switch (linkType) {
            case 'first':
                futurePage = 1;
                ctx.multiselection.selectedRowsPerPage[0].line = 0;
                break;
            case 'prev':
                ctx.multiselection.selectedRowsPerPage[0].line = ctx.multiselection.selectedRowsPerPage[0].line - 1;
                if (ctx.json.rows[ctx.multiselection.selectedRowsPerPage[0].line] === undefined) {
                    futurePage = futurePage - 1;
                }
                break;
            case 'next':
                ctx.multiselection.selectedRowsPerPage[0].line = ctx.multiselection.selectedRowsPerPage[0].line + 1;
                if (ctx.json.rows[ctx.multiselection.selectedRowsPerPage[0].line] === undefined) {
                    futurePage = futurePage + 1;
                }
                break;
            case 'last':
                futurePage = lastPage;
                ctx.multiselection.selectedRowsPerPage[0].line = ctx.json.rows.length - 1;

            }
            // Cambio de pagina
            if (Number(futurePage) !== page) {
                var table = $('#' + ctx.sTableId).DataTable();
                ctx.select.selectedRowsPerPage = {};
                ctx.select.selectedRowsPerPage.cambio = linkType;
                ctx.select.selectedRowsPerPage.page = futurePage;
                table.page(futurePage - 1).draw('page');
            } else { //Si no se pagina se abre directamente la funcion.
                DataTable.editForm.fnOpenSaveDialog('PUT', dt, ctx.multiselection.selectedRowsPerPage[0].line, null);
                var rowSelectAux = ctx.json.rows[ctx.multiselection.selectedRowsPerPage[0].line];
                ctx.multiselection.selectedRowsPerPage[0].id = DataTable.Api().rupTable.getIdPk(rowSelectAux, ctx.oInit);
                DataTable.Api().select.deselect(ctx);
                DataTable.Api().select.drawSelectId(ctx);
            }
            //Se actualiza la ultima posicion movida.
            //ctx.oInit.formEdit.$navigationBar.currentPos = rowSelected;
            // Se añade el parametro 7 mientras esten en convivencia el rup.jqtable(entrar) y rup.table
            return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1, ''];

        };


        ctx.oInit.formEdit.$navigationBar.data('settings', settings);

        var barraNavegacion = $.proxy(ctx.oInit._ADAPTER.createDetailNavigation, ctx.oInit.formEdit.$navigationBar);
        ctx.oInit.formEdit.$navigationBar.append(barraNavegacion);
    }

    /**
     * Metodo que obtiene la fila siguiente seleccionada.
     *
     * @name getRowSelected
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     * @param {string} actionType - Es el objeto table.
     *
     * @return {object} que contiene  el identificador, la pagina y la linea de la fila seleccionada
     *
     */
    function _getRowSelected(dt, actionType) {
        var ctx = dt.settings()[0];
        var rowDefault = {
            id: 0,
            page: 1,
            line: 0
        };
        var lastSelectedId = ctx.multiselection.lastSelectedId;
        if (!ctx.multiselection.selectedAll) {
            //Si no hay un ultimo señalado se coge el ultimo;

            if (lastSelectedId === undefined || lastSelectedId === '') {
                ctx.multiselection.lastSelectedId = ctx.multiselection.selectedRowsPerPage[0].id;
            }
            $.each(ctx.multiselection.selectedRowsPerPage, function (index, p) {
                if (p.id === ctx.multiselection.lastSelectedId) {
                    rowDefault.id = p.id;
                    rowDefault.page = p.page;
                    rowDefault.line = p.line;
                    rowDefault.indexSelected = index;
                    if (ctx.oInit.formEdit !== undefined) {
                        ctx.oInit.formEdit.$navigationBar.currentPos = rowDefault;
                    }
                    return false;
                }
            });
        } else {
            if (ctx.oInit.formEdit !== undefined) {
                ctx.oInit.formEdit.$navigationBar.numPosition = 0; //variable para indicar los mostrados cuando es selectAll y no se puede calcular,El inicio es 0.
            }
            if (lastSelectedId === undefined || lastSelectedId === '') {
                rowDefault.page = _getNextPageSelected(ctx, 1, 'next'); //Como arranca de primeras la pagina es la 1.
                rowDefault.line = _getLineByPageSelected(ctx, -1);
            } else {
                //buscar la posicion y pagina
                var result = $.grep(ctx.multiselection.selectedRowsPerPage, function (v) {
                    return v.id === ctx.multiselection.lastSelectedId;
                });
                rowDefault.page = result[0].page;
                rowDefault.line = result[0].line;
                var index = ctx._iDisplayLength * (Number(rowDefault.page) - 1);
                index = index + 1 + rowDefault.line;
                //Hay que restar los deselecionados.
                result = $.grep(ctx.multiselection.deselectedRowsPerPage, function (v) {
                    return Number(v.page) < Number(rowDefault.page) || (Number(rowDefault.page) === Number(v.page) && Number(v.line) < Number(rowDefault.line));
                });
                rowDefault.indexSelected = index - result.length; //Buscar indice
                if (ctx.oInit.formEdit !== undefined) {
                    ctx.oInit.formEdit.$navigationBar.numPosition = rowDefault.indexSelected - 1;
                }
            }
            if (ctx.oInit.formEdit !== undefined) {
                ctx.oInit.formEdit.$navigationBar.currentPos = rowDefault;
            }
        }

        //En caso de estar en una pagina distinta , navegamos a ella
        if (dt.page() + 1 !== Number(rowDefault.page)) {
            var pageActual = dt.page() + 1;
            var table = $('#' + ctx.sTableId).DataTable();
            table.page(rowDefault.page - 1).draw('page');
            if (ctx.oInit.formEdit !== undefined) {
                ctx.oInit.formEdit.$navigationBar.funcionParams = [actionType, dt, rowDefault.line, undefined, pageActual];
            }
        }

        return rowDefault;
    }

    /**
     * Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.
     *
     * @name getNextPageSelected
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {integer} pageInit - Página a partir de la cual hay que mirar, en general serà la 1.
     * @param {string} orden - Pueder ser pre o next, en función de si necesitar ir hacia adelante o hacia atrás.
     *
     * @return integer - devuele la página
     *
     */
    function _getNextPageSelected(ctx, pageInit, orden) {
        var pagina = pageInit;
        var pageTotals = ctx.json.total;
        if (orden === 'prev') { //Si es previo se resta.
            pageTotals = 1;
        }
        if (ctx.multiselection.deselectedRowsPerPage.length > 0) {
            var maxPagina = ctx.json.rows.length;
            var count = 0;
            //Buscar la pagina donde va estar el seleccionado.
            for (var page = pageInit; page < pageTotals;) {
                $.each(ctx.multiselection.deselectedRowsPerPage, function (index, p) {
                    if (page === Number(p.page)) {
                        count++;
                    }
                    if (count === maxPagina) {
                        return false;
                    }
                });
                if (count < maxPagina) {
                    pagina = page;
                    page = ctx.json.total; //Se pone el total para salir del bucle.
                }
                count = 0;
                if (orden === 'next') {
                    page++;
                } else if (orden === 'prev') {
                    page--;
                }
            }
        }
        return pagina;
    }

    /**
     * Metodo que obtiene la página siguiente donde esta el primer elemento o elemento seleccionado.
     *
     * @name getPrevPageSelected
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {integer} pageInit - Página a partir de la cual hay que mirar, en general serà la 1.
     *
     * @return integer - devuele la página
     *
     */
    function _getPrevPageSelected(ctx, pageInit) {
        var pagina = pageInit;
        var pageTotals = 1;
        if (ctx.multiselection.deselectedRowsPerPage.length > 0) {
            var maxPagina = ctx.json.rows.length;
            if (ctx.json.total === pagina) { //Es ultima pagina, calcular los registros{
                maxPagina = ctx.json.records % ctx._iDisplayLength;
            }
            var count = 0;
            //Buscar la pagina donde va estar el seleccionado.
            for (var page = pageInit; pageTotals <= page;) {
                $.each(ctx.multiselection.deselectedRowsPerPage, function (index, p) {
                    if (Number(page) === Number(p.page)) {
                        count++;
                    }
                    if (count === maxPagina) {
                        return false;
                    }
                });
                if (count < maxPagina) {
                    pagina = page;
                    pageTotals = ctx.json.total; //Se pone el total para salir del bucle.
                }
                count = 0;
                page--;
            }
        }
        return pagina;
    }


    /**
     * Metodo que obtiene la linea siguiente donde esta el primer elemento o elemento seleccionado.
     *
     * @name getLineByPageSelected
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {integer} lineInit - Linea a partir de la cual hay que mirar, en general será la 1.
     *
     * @return integer - devuele la linea
     *
     */
    function _getLineByPageSelected(ctx, lineInit) {
        var line = -1;
        var rows = ctx.json.rows;

        $.each(rows, function (index, row) {
            if (index > lineInit) {
                var indexInArray = jQuery.inArray(DataTable.Api().rupTable.getIdPk(row, ctx.oInit), ctx.multiselection.deselectedIds);
                if (indexInArray === -1) {
                    line = index;
                    var arra = {
                        id: DataTable.Api().rupTable.getIdPk(row, ctx.oInit),
                        page: ctx.json.page,
                        line: index
                    };
                    if (ctx.oInit.formEdit !== undefined) {
                        ctx.oInit.formEdit.$navigationBar.currentPos = arra;
                    }
                    return false;
                }
            }
        });
        return line;
    }

    /**
     * Metodo que obtiene la última linea siguiente donde esta el primer elemento o elemento seleccionado.
     *
     * @name getLineByPageSelectedReverse
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {integer} lineInit - Linea a partir de la cual hay que mirar.
     *
     * @return integer - devuele la linea
     *
     */
    function _getLineByPageSelectedReverse(ctx, lineInit) {
        var line = -1;
        var rows = ctx.json.rows;

        for (var index = rows.length - 1; index >= 0; index--) {
            var row = rows[index];
            if (index < lineInit) {
                var indexInArray = jQuery.inArray(DataTable.Api().rupTable.getIdPk(row, ctx.oInit), ctx.multiselection.deselectedIds);
                if (indexInArray === -1) {
                    line = index;
                    var arra = {
                        id: DataTable.Api().rupTable.getIdPk(row, ctx.oInit),
                        page: ctx.json.page,
                        line: index
                    };
                    ctx.oInit.formEdit.$navigationBar.currentPos = arra;
                    index = -1;
                }
            }
        }
        return line;
    }

    /**
     * Metodo que elimina todos los registros seleccionados.
     *
     * @name _deleteAllSelects
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     *
     */
    function _deleteAllSelects(dt) {
        var ctx = dt.settings()[0];
        var idRow = 0;
        var regex = new RegExp(ctx.oInit.multiplePkToken, 'g');
        $.rup_messages('msgConfirm', {
            message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.deleteAll'),
            title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.delete'),
            OKFunction: function () {
                var row = {};
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
                    _callSaveAjax('POST', dt, row, idRow, false, ctx.oInit.formEdit.detailForm, '/deleteAll');
                } else {
                    row = ctx.multiselection.selectedIds[0];
                    row = row.replace(regex, '/');
                    _callSaveAjax('DELETE', dt, '', idRow, false, ctx.oInit.formEdit.detailForm, '/' + row);
                }
            },
            CANCELFunction: ctx.oInit.formEdit.cancelDeleteFunction
        });
    }

    /**
     * Metodo que serializa los datos del formulario.
     *
     * @name _editFormSerialize
     * @function
     * @since UDA 3.6.0 // Table 1.2.0
     *
     * @param {object} idForm - Formulario que alberga los datos.
     *
     * @return {string} - Devuelve los datos del formulario serializados
     *
     */
    function _editFormSerialize(idForm) {
        var serializedForm = '';
        var idFormArray = idForm.formToArray();
        var length = idFormArray.length;

        $.each(idFormArray, function (key, obj) {
            serializedForm += (obj.name + '=' + obj.value);

            if (key < length - 1) {
                serializedForm += '&';
            }
        });

        return serializedForm;
    }

    /**
     * Metodo que comprueba el seeker.
     *
     * @name _comprobarSeeker
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} row - Son los datos que se cargan.
     * @param {object} ctx - Settings object to operate on.
     * @param {number} idRow - Identificador de la fila.
     *
     */
    function _comprobarSeeker(row, ctx, idRow) {
        var cumple = true;
        $.each(ctx.seeker.ajaxOption.data.search, function (key, obj) {
            if (row[key].indexOf(obj) === -1) {
                cumple = false;
                return false;
            }
        });
        if (!cumple) { // eliminar del seeker, por pagina y linea		
            ctx.seeker.search.funcionParams = jQuery.grep(ctx.seeker.search.funcionParams, function (search) {
                return (search.page !== Number(ctx.json.page) || search.pageLine !== idRow + 1);
            });
            // se borra el icono

            $('#' + ctx.sTableId + ' tbody tr:eq(' + idRow + ') td.select-checkbox i.filtered-row').remove();
            $('#' + ctx.sTableId + ' tbody tr:eq(' + idRow + ') td i.filtered-row').remove();
            DataTable.Api().seeker.updateDetailSeekPagination(1, ctx.seeker.search.funcionParams.length, ctx);
        }
    }

    /**
     * Método que gestiona el bloqueo de la edición de las claves primarias.
     *
     * @name _blockPKeditForm
     * @function
     * @since UDA 3.7.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on.
     * @param {string} actionType - Método de operación CRUD.
     *
     */
    function _blockPKeditForm(ctx, actionType) {
        var blockPK = ctx.oInit.blockPKeditForm;
        var idForm = ctx.oInit.formEdit.idForm;

        if (blockPK) {
            // En caso de ser edición bloqueamos la modificación
            if (actionType === 'PUT') {
                $.each(ctx.oInit.primaryKey, function (key, id) {
                    var input = $(idForm[0]).find(':input[name=\'' + id + '\']');

                    // Comprobamos si es un componente rup o no. En caso de serlo usamos el metodo disable.
                    if (input.attr('ruptype') === 'date' && !input.rup_date('isDisabled')) {
                        input.rup_date('disable');
                    } else if (input.attr('ruptype') === 'combo' && !input.rup_combo('isDisabled')) {
                        input.rup_combo('disable');
                    } else if (input.attr('ruptype') === 'time' && !input.rup_time('isDisabled')) {
                        input.rup_time('disable');
                    } else if (input.attr('type') === 'checkbox') {
                        if (!input.hasClass('checkboxPKBloqueado')) {
                            input.addClass('checkboxPKBloqueado');
                        }

                        var valorCheck = input.is(':checked') ? 1 : 0;
                        var selectorInputSustituto = $('#' + id + '_bloqueado');

                        // Comprobamos si es necesario cambiar el check
                        if (selectorInputSustituto.attr('valor') !== valorCheck) {
                            if (selectorInputSustituto.attr('valor') !== undefined) {
                                selectorInputSustituto.remove();
                            }

                            if (valorCheck === 1) {
                                input.after('<i id=\'' + id + '_bloqueado\' class=\'mdi mdi-check sustitutoCheckboxPKBloqueadoGeneral\' valor=\'1\' aria-hidden=\'true\'/>');
                            } else {
                                input.after('<i id=\'' + id + '_bloqueado\' class=\'mdi mdi-close sustitutoCheckboxPKBloqueadoGeneral sustitutoCheckboxPKBloqueadoCross\' valor=\'0\' aria-hidden=\'true\'/>');
                            }
                        }
                    } else {
                        input.prop('readOnly', true);
                    }

                    // Quitamos el foco del elemento
                    input.on('mousedown', function (event) {
                        event.preventDefault();
                    });
                });
            }
            // En caso de ser clonación permitimos la edición
            else if (actionType === 'POST') {
                $.each(ctx.oInit.primaryKey, function (key, id) {
                    var input = $(idForm[0]).find(':input[name=\'' + id + '\']');

                    // Comprobamos si es un componente rup o no. En caso de serlo usamos el metodo enable.
                    if (input.attr('ruptype') === 'date' && input.rup_date('isDisabled')) {
                        input.rup_date('enable');
                    } else if (input.attr('ruptype') === 'combo' && input.rup_combo('isDisabled')) {
                        input.rup_combo('enable');
                    } else if (input.attr('ruptype') === 'time' && input.rup_time('isDisabled')) {
                        input.rup_time('enable');
                    } else if (input.attr('type') === 'checkbox') {
                        input.removeClass('checkboxPKBloqueado');
                        $('#' + id + '_bloqueado').remove();
                    } else {
                        input.prop('readOnly', false);
                    }

                    // Devolvemos el foco al elemento
                    input.on('mousedown', function (event) {
                        $(this).unbind(event.preventDefault());
                        input.focus();
                    });
                });
            }
        }
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
    function _addChildIcons(ctx) {
        try {
            let hasHidden = false;
            let columnsVisiblity = ctx.responsive._columnsVisiblity();
            for (let i = 0; i < columnsVisiblity.length; i++) {
                if (!columnsVisiblity[i]) {
                    if (!ctx.aoColumns[i].className || ctx.aoColumns[i].className.indexOf('never') < 0) {
                        hasHidden = true;
                    }
                }
            }

            if (ctx.responsive.c.details.target === 'td span.openResponsive') { //por defecto
                $('#' + ctx.sTableId).find('tbody td:first-child span.openResponsive').remove();
                if (hasHidden) { //añadir span ala primera fila
                    $.each($('#' + ctx.sTableId).find('tbody td:first-child:not(.child):not(.dataTables_empty)'), function () {
                        var $span = $('<span/>');
                        if ($(this).find('span.openResponsive').length === 0) {
                            $(this).prepend($span.addClass('openResponsive'));
                        } else { //si ya existe se asigna el valor.
                            $span = $(this).find('span.openResponsive');
                        }
                        if ($(this).parent().next().hasClass('child')) {
                            $span.addClass('closeResponsive');
                        }
                        var $fila = $(this).parent();
                        $span.click(function (event) {
                            if ($fila.hasClass('editable') && $fila.find('.closeResponsive').length) { //no se hace nada. si esta editando
                                event.stopPropagation();
                            } else {
                                if ($span.hasClass('closeResponsive')) {
                                    $span.removeClass('closeResponsive');
                                } else {
                                    $span.addClass('closeResponsive');
                                }
                            }
                        });
                    });
                }
            }

            $('#' + ctx.sTableId).triggerHandler('tableEditFormAddChildIcons');
        } catch (error) {}
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables API
     *
     * For complete documentation, please refer to the docs/api directory or the
     * DataTables site
     */

    // Local variables to improve compression
    var apiRegister = DataTable.Api.register;

    apiRegister('editForm.openSaveDialog()', function (actionType, dt, idRow, customTitle) { //Se declara la variable del editForm para que puede ser invocada desde cualquier sitio.
        DataTable.editForm.fnOpenSaveDialog(actionType, dt, idRow, customTitle);
    });

    apiRegister('editForm.updateDetailPagination()', function (ctx, currentRowNum, totalRowNum) {
        _updateDetailPagination(ctx, currentRowNum, totalRowNum);
    });

    apiRegister('editForm.getRowSelected()', function (dt, actionType) {
        return _getRowSelected(dt, actionType);
    });

    apiRegister('editForm.deleteAllSelects()', function (dt) {
        return _deleteAllSelects(dt);
    });

    apiRegister('editForm.getLineByPageSelected()', function (ctx, linea) {
        return _getLineByPageSelected(ctx, linea);
    });

    apiRegister('editForm.getLineByPageSelectedReverse()', function (ctx, linea) {
        return _getLineByPageSelectedReverse(ctx, linea);
    });

    apiRegister('editForm.addchildIcons()', function (ctx) {
        _addChildIcons(ctx);
    });

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     */

    // DataTables creation - check if select has been defined in the options. Note
    // this required that the table be in the document! If it isn't then something
    // needs to trigger this method unfortunately. The next major release of
    // DataTables will rework the events and address this.
    $(document).on('plugin-init.dt', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }

        if (ctx.oInit.formEdit !== undefined) {
            DataTable.editForm.init(new DataTable.Api(ctx));
            $(ctx.oInit.formEdit.detailForm).rup_dialog($.extend({}, {
                type: $.rup.dialog.DIV,
                autoOpen: false,
                modal: true,
                resizable: '',
                width: 569,
                create: function () {
                    /* Se encarga de eliminar la clase que oculta los campos del formEdit. Esta clase esta presente
                     * en el formEdit para evitar un bug visual en el que hacia que sus campos apareciesen 
                     * bajo la tabla y fueran visibles previa a la inicializacion del componente rup.dialog.
                     */
                    $('div.rup-table-formEdit-detail').removeClass('d-none');
                }
            }, {}));
            if (ctx.oInit.formEdit.cancelDeleteFunction === undefined) {
                ctx.oInit.formEdit.cancelDeleteFunction = function cancelClicked() {};
            }
        }

    });


    return DataTable.editForm;
}));