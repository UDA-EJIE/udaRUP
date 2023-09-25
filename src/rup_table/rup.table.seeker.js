/**
 * Buscador interno del table
 *
 * @summary 		Extensión del componente RUP Datatable
 * @module			"rup.table.seeker"
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
        define(['jquery', 'datatables.net'], function ($) {
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
    DataTable.seeker = {};

    DataTable.seeker.version = '1.2.4';

    /**
     * 
     * Se inicializa el componente seeker
     *
     * @name init
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.seeker.init = function (dt) {

        var ctx = dt.settings()[0];
        //Se inicializa por cada instancia 1 tabla 1 instancia
        ctx.seeker = {};
        _createFilterColumn(dt, ctx);

        var ajaxOptions = {
            url: ctx.oInit.urlBase + '/search',
            accepts: {
                '*': '*/*',
                'html': 'text/html',
                'json': 'application/json, text/javascript',
                'script': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
                'text': 'text/plain',
                'xml': 'application/xml, text/xml'
            },
            type: 'POST',
            data: _getDatos(ctx),
            dataType: 'json',
            showLoading: false,
            contentType: 'application/json',
            async: true,
            success: function (data, status, xhr) {
                $('#' + ctx.sTableId).triggerHandler('tableSeekerSearchSuccess',ctx);
                ctx.seeker.search.funcionParams = data;
                ctx.seeker.search.pos = 0; // se inicializa por cada busqueda.
                _processData(dt, ctx, data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                ctx.oInit.feedback.$feedbackContainer.rup_feedback('set', thrownError + ': ' + xhr.responseText, 'error');
                ctx.oInit.feedback.$feedbackContainer.rup_feedback('show');
                $('#' + ctx.sTableId).triggerHandler('tableSeekerSearchError',ctx);

            },
            complete: function (xhr, status) {
                $('#' + ctx.sTableId).triggerHandler('tableSeekerSearchComplete',ctx);
            }
        };

        ctx.seeker.ajaxOption = ajaxOptions;

        //Ver el buscador interno de la tabla.
        if (ctx.fnRecordsTotal() === 0) {
            ctx.seeker.search.$searchRow.hide();
        } else {
            ctx.seeker.search.$searchRow.show();
        }

        $('#' + ctx.sTableId).triggerHandler('tableSeekerAfterCreateToolbar',ctx);
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Local functions
     */

    function _eventTrigger(api, type, args, any) {
        if (any && !api.flatten().length) {
            return;
        }

        if (typeof type === 'string') {
            type = type + '.dt';
        }

        args.unshift(api);

        $(api.table().node()).trigger(type, args);
    }
    /**
     * Crea los componentes principales del buscador.
     *
     * @name createFilterColumn
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     * @param {object} ctx - Es el contecto del table donde esta la configuración del mismo.
     *
     */
    function _createFilterColumn(dt, ctx) {

        let idTabla = ctx.sTableId;
        $('#' + idTabla + ' tfoot').css('display', 'table-header-group');
        $('#' + idTabla + ' tfoot th').each(function () {
            let title = this.innerText;
            let index = $(this).index();
            let colModel = ctx.oInit.colModel;            

            if (index > 0 || ctx.oInit.multiSelect === undefined) {

                let position = index + 1;
                let nombre = $('#' + idTabla + ' thead th:nth-child(' + position + ')').attr('data-col-prop')

                let result = $.grep(colModel, function (v) {
                    return v.index.toUpperCase() === nombre.toUpperCase();
                });

                // Comprobamos si queremos deshabilitar la búsqueda de la columna
                if (colModel != undefined && result[0].hidden) {
                    $(this).empty();
                } else if (result[0].rupType == 'select' || result[0].searchoptions?.rupType == 'select') {
                    $(this).html('<select name="' + nombre + '" id="' + nombre + '_' + idTabla + '_seeker"></select>');
                } else {
                    $(this).html('<input type="text" placeholder="' + title + '" name="' + nombre + '" id="' + nombre + '_' + idTabla + '_seeker"/>');
                }
            }
        });

      dt.columns().eq(0).each(function (colIdx) {
    	  	
            if (colIdx > 0 || ctx.oInit.multiSelect === undefined) {//evitar el checkbox
            	let celda = $('#' + idTabla + ' tfoot')[0].rows[0].cells[colIdx];
            	if(celda !== undefined){
	                $('input', celda).on('keypress', function (ev) {
	                    this.focus();
	                    if (ev.keyCode === 13 && this.value !== '') { //Se hace la llamada de busqueda.
	                    	let customBuscar = ctx.oInit.validarBuscar;
	                    	if(typeof customBuscar === "function" && customBuscar(ctx)){
	                    		return false;
	                    	}
	                        ctx.seeker.ajaxOption.data = _getDatos(ctx);
	                        var ajaxOptions = $.extend(true, [], ctx.seeker.ajaxOption);
	                        $('#' + ctx.sTableId).triggerHandler('tableSeekerBeforeSearch',ctx);
	                        if (!jQuery.isEmptyObject(ajaxOptions.data.search)) {
	                            $('#' + idTabla + '_search_searchForm').rup_form();
	                            $('#' + idTabla + '_search_searchForm').rup_form('ajaxSubmit', ajaxOptions);
	                        }
	                        $('#' + ctx.sTableId).triggerHandler('tableSeekerAfterSearch',ctx);
	
	                    }
	                });
            	}
            }
        });

        _createSearchRow(dt, ctx);
        ctx.seeker.searchForm = $('#' + idTabla + ' tfoot tr:nth-child(2)');
        ctx.seeker.searchForm.hide();
        _createRupComponent(dt, ctx);
    }
    /**
     * Genera la barra de controles para gestionar la búsqueda..
     *
     * @name createSearchRow
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     * @param {object} ctx - Es el contexto del table donde esta la configuración del mismo.
     *
     */
    function _createSearchRow(dt, ctx) {
        var idTabla = ctx.sTableId;
        var $gridHead = jQuery('tfoot', '#' + idTabla),
            // Templates
            searchRowHeaderTmpl = "<th class='search_row_header' colspan='{0}'></th>",
            collapseLayerTmpl = "<div id='{0}' class='search_collapse_layer'></div>",
            collapseIconTmpl = "<span id='{0}' class='collapse_icon mdi mdi-chevron-right'></span>",
            collapseLabelTmpl = "<a id='{0}' class='text-primary text-decoration-underline' href='#0'>{1}:</a>",
            matchedLayerTmpl = "<div id='{0}' class='matched_layer mr-3'></div>",
            matchedLabelTmpl = "<span id='{0}' class='ml-2'>{1}</span>",
            navLayerTmpl = "<div id='{0}' class='search_nav_layer row no-gutters'></div>",
            navButtonTmpl = "<button id='{0}' class='btn-material btn-material-sm btn-material-secondary-low-emphasis col-3 col-sm-auto mr-sm-2' type='button' alt='{1}' disabled>{1}</button>",
            navClearButtonTmpl = "<button id='{0}' class='btn-material btn-material-sm btn-material-primary-low-emphasis col-5 ml-4 mt-2 col-sm-auto ml-sm-0 mt-sm-auto mr-sm-2' type='button' alt='{1}'><i class='mdi mdi-eraser'></i><span class='ui-button-text'>{1}</span></button>",
            navSearchButtonTmpl = "<button id='{0}' class='btn-material btn-material-sm btn-material-primary-low-emphasis col-5 ml-4 mt-2 col-sm-auto ml-sm-0 mt-sm-auto mr-sm-2' type='button'><i class='mdi mdi-magnify'></i><span class='ui-button-text'>{1}</span></button>",

            // Objetos
            $searchRow = $("<tr class='search_row'></tr>"),
            $searchRowHeader = $($.rup_utils.format(searchRowHeaderTmpl, $gridHead.find('th').length)),
            // Capa que controla el colapso del formulario
            $collapseLayer = $($.rup_utils.format(collapseLayerTmpl, 'searchCollapseLayer_' + idTabla)),
            $collapseIcon = $($.rup_utils.format(collapseIconTmpl, 'searchCollapseIcon_' + idTabla)),
            $collapseLabel = $($.rup_utils.format(collapseLabelTmpl, 'searchCollapsLabel_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.plugins.search.searchCriteria'))),
            // Capa que muestra el número de ocurrencias
            $matchedLayer = $($.rup_utils.format(matchedLayerTmpl, 'matchedLayer_' + idTabla)),
            $matchedLabel = $($.rup_utils.format(matchedLabelTmpl, 'matchedLabel_' + idTabla, $.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.plugins.search.matchedRecords'), 0))),

            // Capa que controla la navegación entre las diferentes ocurrencias
            $navLayer = $($.rup_utils.format(navLayerTmpl, 'searchNavLayer_' + idTabla)),
            $firstNavButton = $($.rup_utils.format(navButtonTmpl, 'search_nav_first_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.first'))),
            $backNavButton = $($.rup_utils.format(navButtonTmpl, 'search_nav_back_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.previous'))),
            $forwardNavButton = $($.rup_utils.format(navButtonTmpl, 'search_nav_forward_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.next'))),
            $lastNavButton = $($.rup_utils.format(navButtonTmpl, 'search_nav_last_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.last'))),
            $navClearButton = $($.rup_utils.format(navClearButtonTmpl, 'search_nav_clear_button' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.search.Reset'))),
            $navSearchButton = $($.rup_utils.format(navSearchButtonTmpl, 'search_nav_button_' + idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.search.Find')));

        // Construcción del objeto final
        $collapseLayer.append($collapseIcon).append($collapseLabel);
        $matchedLayer.append($matchedLabel);
        $navLayer.append($firstNavButton).append($backNavButton).append($forwardNavButton).append($lastNavButton).append($navClearButton).append($navSearchButton);

        $searchRowHeader.append($collapseLayer);
        $searchRowHeader.append($matchedLayer);
        $searchRowHeader.append($navLayer);

        $searchRow.append($searchRowHeader);

        $gridHead.prepend($searchRow);
        jQuery('tfoot tr.search_row', '#' + idTabla + '').addClass('ui-state-default');

        ctx.seeker.search = ctx.seeker.search || {};

        ctx.seeker.search.created = false;

        ctx.seeker.search.$collapseIcon = $collapseIcon;
        ctx.seeker.search.$searchRow = $searchRow;
        ctx.seeker.search.$matchedLabel = $matchedLabel;
        ctx.seeker.search.$firstNavButton = $firstNavButton;
        ctx.seeker.search.$backNavButton = $backNavButton;
        ctx.seeker.search.$forwardNavButton = $forwardNavButton;
        ctx.seeker.search.$lastNavButton = $lastNavButton;

        // Creacion del enlace de mostrar/ocultar el formulario
        $collapseIcon.add($collapseLabel).on('click', function () {
    		if (!ctx.seeker.search.created) {
                ctx.seeker.search.$collapseIcon.removeClass('mdi-chevron-right');
                ctx.seeker.search.$collapseIcon.addClass('mdi-chevron-down');
                ctx.seeker.search.created = true;
                ctx.seeker.searchForm.show();
                $navLayer.show();
            } else {
                ctx.seeker.search.$collapseIcon.removeClass('mdi-chevron-down');
                ctx.seeker.search.$collapseIcon.addClass('mdi-chevron-right');
                ctx.seeker.search.created = false;
                ctx.seeker.searchForm.hide();
                $navLayer.hide();
            }
        });

        // Evento de búsqueda asociado al botón
        $navSearchButton.on('click', function () {
            $('#' + ctx.sTableId).triggerHandler('tableSeekerBeforeSearch',ctx);
        	let customBuscar = ctx.oInit.validarBuscar;
        	if(typeof customBuscar === "function" && customBuscar(ctx)){
        		return false;
        	}
            ctx.seeker.ajaxOption.data = _getDatos(ctx);
            var ajaxOptions = $.extend(true, [], ctx.seeker.ajaxOption);
            $('#' + ctx.sTableId).triggerHandler('tableSeekerBeforeSearch',ctx);
            if (!jQuery.isEmptyObject(ajaxOptions.data.search)) {
                $('#' + idTabla + '_search_searchForm').rup_form();
                var tmp = ajaxOptions.success;
                ajaxOptions.success = function () {
                    tmp(arguments[0], arguments[1], arguments[2]);
                    ajaxOptions.success = tmp;
                    $('#' + ctx.sTableId).triggerHandler('tableSeekerAfterSearch',ctx);
                };
                $('#' + idTabla + '_search_searchForm').rup_form('ajaxSubmit', ajaxOptions);
            }
        });

        // Evento asociado a limpiar el fomulario de búsqueda
        $navClearButton.on('click', function () {
            _limpiarSeeker(dt, ctx);
        });

        $navLayer.hide();

        function doSearchButtonNavigation($button, buttonId) {
            if (!$button.prop('disabled')) {
                $self.rup_jqtable('navigateToMatchedRow', buttonId);
            }
        }

        // Elemento primero
        $firstNavButton.on('click', function () {
            ctx.seeker.search.pos = 0;
            _processData(dt, ctx, ctx.seeker.search.funcionParams);
        });

        // Elemento anterior
        $backNavButton.on('click', function () {
            ctx.seeker.search.pos--;
            _processData(dt, ctx, ctx.seeker.search.funcionParams);
        });

        // Elemento siguiente
        $forwardNavButton.on('click', function () {
            ctx.seeker.search.accion = 'next';
            ctx.seeker.search.pos++;
            _processData(dt, ctx, ctx.seeker.search.funcionParams);
        });

        // Elemento ultimo
        $lastNavButton.on('click', function () {
            ctx.seeker.search.pos = ctx.seeker.search.funcionParams.length - 1;
            _processData(dt, ctx, ctx.seeker.search.funcionParams);
        });

        // Se recubre con un form
        var $searchForm = jQuery('<form>').attr('id', idTabla + '_search_searchForm');

        $('#' + idTabla).wrapAll($searchForm);

        ctx.seeker.search.$searchForm = $('#' + idTabla + '_search_searchForm');
        ctx.seeker.search.$searchRow.hide();
        ctx.seeker.search.pos = 0;
        ctx.seeker.search.accion = '';
    }

    /**
     * Selecciona con la lupa los rows seleccionados. Una vez se han encontrado.
     *
     * @name selectSearch
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     * @param {object} ctx - Es el contecto del table donde esta la configuración del mismo.
     * @param {object} rows - Filas del table de la página actual.
     *
     */
    function _selectSearch(dt, ctx, rows) {
        //Se limina el lapicero indicador.
        $('#' + ctx.sTableId + ' tbody tr td.select-checkbox i.filtered-row').remove();
        $('#' + ctx.sTableId + ' tbody tr td i.filtered-row').remove();

        //se añade el span con la lupa
        if (rows.length > 0 && ctx.fnRecordsTotal() > 0) {
            //Se selecciona el primero y se limpian los datos.
            var rowSelected = '';

            $.each(ctx.json.rows, function (idx, value) {
                if (rows[ctx.seeker.search.pos].pageLine - 1 === idx) {
                    rowSelected = dt.rows().nodes()[idx];
                }
                var result = $.grep(rows, function (v) {
                	return DataTable.Api().rupTable.comparePKs(v.pk, value);
                });
                if (result.length === 1) {
                    var searchIcon = $('<i></i>').addClass('mdi mdi-magnify ui-icon-rupInfoCol filtered-row');

                    $($('#' + ctx.sTableId + ' tbody tr td:nth-child(1)')[idx]).append(searchIcon);

                }
            });
            var rowUnique = rows[ctx.seeker.search.pos];
            var rowList = ctx.json.rows[rowUnique.pageLine - 1];
            if (rowSelected !== '' && rowSelected.className.indexOf('selected') < 0 && rowUnique.page === Number(ctx.json.page) && DataTable.Api().rupTable.comparePKs(rowUnique.pk, rowList) 
            		&& (ctx.oInit.formEdit === undefined || ctx.oInit.formEdit.$navigationBar.funcionParams === undefined || ctx.oInit.formEdit.$navigationBar.funcionParams.length === undefined)) { //si no esta ya seleccionada.
                if (ctx.oInit.multiSelect !== undefined) {
                    dt['row'](rowUnique.pageLine - 1).multiSelect();
                } else if (ctx.oInit.select !== undefined) {
                    DataTable.Api().select.selectRowIndex(dt, rowUnique.pageLine - 1, true);
                }
            }
            ctx.seeker.search.accion = '';
        }
        $('#' + ctx.sTableId).trigger('selected.rup.dt',ctx);
    }

    /**
     * Metodo para saber si hay que paginar o no.
     *
     * @name paginar
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} ctx - Es el contexto del table donde esta la configuración del mismo.
     * @param {object} dato - Son los datos de las filas que viene del controller..
     *
     */
    function _paginar(ctx, dato) {
        var paginar = false;
        if (dato !== undefined && dato.page !== Number(ctx.json.page)) {
            paginar = true;
        }

        return paginar;
    }

    /**
     * Actualiza la navegación del seeker.
     *
     * @name updateDetailSeekPagination
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {integer} currentRowNum - Número de la posción actual del registro selecionado.
     * @param {integer} totalRowNum - Número total de registros seleccionados.
     *
     */
    function _updateDetailSeekPagination(currentRowNum, totalRowNum, ctx) {

        if (currentRowNum === 1) {
            ctx.seeker.search.$firstNavButton.prop('disabled', true);
            ctx.seeker.search.$backNavButton.prop('disabled', true);
        } else {
            ctx.seeker.search.$firstNavButton.prop('disabled', false);
            ctx.seeker.search.$backNavButton.prop('disabled', false);
        }
        if (currentRowNum === totalRowNum) {
            ctx.seeker.search.$forwardNavButton.prop('disabled', true);
            ctx.seeker.search.$lastNavButton.prop('disabled', true);
        } else {
            ctx.seeker.search.$forwardNavButton.prop('disabled', false);
            ctx.seeker.search.$lastNavButton.prop('disabled', false);
        }

        ctx.seeker.search.$matchedLabel.html($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.plugins.search.matchedRecordsCount'), Number(currentRowNum), Number(totalRowNum)));
    }

    /**
     * Metodo para procesar los datos provinientes del controller.
     *
     * @name processData
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     * @param {object} ctx - Es el contecto del table donde esta la configuración del mismo.
     * @param {object} dato - Son los datos de las filas que viene del controller.
     *
     */
    function _processData(dt, ctx, data) {
        if (ctx.oInit.multiSelect !== undefined) {
            DataTable.Api().multiSelect.deselectAll(dt);
        } else if (ctx.oInit.select !== undefined) {
            DataTable.Api().select.deselect(ctx);
        }
        if (!_paginar(ctx, data[ctx.seeker.search.pos])) {
            _selectSearch(dt, ctx, data);
        } else {
            var tabla = $('#' + ctx.sTableId);
            tabla.dataTable().fnPageChange(data[ctx.seeker.search.pos].page - 1);
        }

        if (data.length === 0) {
            ctx.seeker.search.$firstNavButton.add(ctx.seeker.search.$backNavButton).add(ctx.seeker.search.$forwardNavButton).add(ctx.seeker.search.$lastNavButton).prop('disabled', true);
            ctx.seeker.search.$matchedLabel.html($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.plugins.search.matchedRecords'), '0'));
        } else {
            _updateDetailSeekPagination(ctx.seeker.search.pos + 1, data.length, ctx);
        }
    }

    /**
     * Se obtienen los datos del formulario del seeker.
     *
     * @name getDatos
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} ctx - Es el contexto del table donde esta la configuración del mismo.
     * 
     * @return {object} Devuelve el objeto mapeado de todos los campos.
     *
     */
    function _getDatos(ctx) {
        var datos = ctx.aBaseJson;
        if (datos !== undefined && ctx.seeker.search.$searchForm[0] !== undefined) {
            datos.search = form2object(ctx.seeker.search.$searchForm[0]);
        }
        return datos;
    }

    /**
     * Partiendo de los inputs del seeker, se convierten en componentes rup dependiendo del tipo.
     *
     * @name createRupComponent
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     * 
     * @param {object} dt - Es el objeto table.
     * @param {object} ctx - Es el contecto del table donde esta la configuración del mismo.
     *
     */
    function _createRupComponent(dt, ctx) {
        var colModel = ctx.oInit.colModel,
            searchEditOptions;
        if (colModel !== undefined) {
        	var idTabla = ctx.sTableId;
            $('#' + idTabla + ' tfoot tr').eq(1).find('th:not(.select-checkbox)').each(function () { // El primer tr corresponde al desplegable de filtros

                // Se añade la clase necesaria para mostrar los inputs con estilos material
                $(this).addClass('form-groupMaterial');
                
                let nombre = $(this).find('input, select').attr('name');
                let cellColModel = $.grep(colModel, function (v) {
                    return v.index.toUpperCase() === nombre.toUpperCase();
                });

                if(cellColModel !== undefined){
                	cellColModel = cellColModel[0];
	                var searchRupType = (cellColModel.searchoptions !== undefined && cellColModel.searchoptions.rupType !== undefined) ? cellColModel.searchoptions.rupType : cellColModel.rupType;
	
	                var colModelName = cellColModel.name;
	                var $elem = $('[name=\'' + colModelName + '\']', ctx.seeker.searchForm);
	                
	                if($elem.length == 1){
	                	// Se añade el title de los elementos de acuerdo al colname
	                	$elem.attr({
	                		'title': $('#' + cellColModel.name + '_' + idTabla + '_seeker').attr('placeholder'),
	                		'class': 'editable customelement form-control-customer'
	                	}).removeAttr('readOnly');
	                	
	                	// Añadir label oculto que se usará principalmente para la gestión de los combos enlazados.
	                	$('<label></label>', {
	                		'for': $elem.attr('id'), 
	                		'class': "d-none", 
	                		'text': $elem.attr('placeholder')
	                	}).insertAfter($elem);
	                	
	                	// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
	                	if (searchRupType !== undefined && cellColModel.searchoptions) {
	                		searchEditOptions = cellColModel.searchoptions;
	                		
	                		// Invocación al componente RUP
	                		$elem['rup_' + searchRupType](searchEditOptions);
	                	}
	                }
            	}
            });
        }

    }

    function _limpiarSeeker(dt, ctx) {
    	$('#' + ctx.sTableId).triggerHandler('tableSeekerBeforeClear',ctx);
        
        const $form = $('#' + ctx.sTableId + '_search_searchForm');
        
        // Reinicia el formulario.
        $form.resetForm();
        
        // Limpia los rup_autocomplete, rup_combo y rup_select.
        jQuery.each($('input[rupType=autocomplete], select.rup_combo, select[rupType=select]', $form), function (index, elem) {
			const elemSettings = jQuery(elem).data('settings');
			
			if (elemSettings != undefined) {
				const elemRuptype = jQuery(elem).attr('ruptype');
				
				if (elemSettings.parent == undefined) {
					if (elemRuptype == 'autocomplete') {
						jQuery(elem).rup_autocomplete('setRupValue', '');
					} else if (elemRuptype == 'combo') {
						jQuery(elem).rup_combo('reload');
					} else if (elemRuptype == 'select') {
						jQuery(elem).rup_select('clear');
					}
				}
				
				if (elemRuptype == 'select') {
					// Necesario para garantizar que pierda el foco.
					jQuery(elem).rup_select('reload');
				}
			}
        });
        ctx.seeker.search.funcionParams = {};
        ctx.seeker.search.pos = 0;
        _processData(dt, ctx, []);
        $('#' + ctx.sTableId).triggerHandler('tableSeekerAfterClear',ctx);
    }

    function _enabledButtons(ctx) {
        if (ctx.seeker !== undefined) {
            $.each($('#' + ctx.sTableId + ' tfoot [id*="seeker"]:not(a)'), function (key, id) {
                if ($(this).attr('ruptype') === 'date') {
                    $(this).rup_date('disable');
                    $(this).next().addClass('form-control-customer');
                } else if ($(this).attr('ruptype') === 'combo') {
                    $(this).rup_combo('disable');
                    $(this).next().find('a').addClass('form-control-customer').attr('readonly', true);
                } else if ($(this).attr('ruptype') === 'time') {
                    $(this).rup_time('disable');
                } else {
                    $(this).prop('disabled', true);
                }
            });
        }
    }

    function _disabledButtons(ctx) {
        if (ctx.seeker !== undefined) {
            $.each($('#' + ctx.sTableId + ' tfoot [id*="seeker"]:not(a)'), function (key, id) {
                if ($(this).attr('ruptype') === 'date') {
                    $(this).rup_date('enable');
                } else if ($(this).attr('ruptype') === 'combo') {
                    $(this).rup_combo('enable');
                    $(this).next().find('a').attr('readonly', false);
                } else if ($(this).attr('ruptype') === 'time') {
                    $(this).rup_time('enable');
                } else {
                    $(this).prop('disabled', false);
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

    apiRegister('seeker.eventTrigger()', function (api, type, args, any) {
        DataTable.seeker._eventTrigger(api, type, args, any);
    });

    apiRegister('seeker.selectSearch()', function (dt, ctx, rows) {
        _selectSearch(dt, ctx, rows);
    });

    apiRegister('seeker.limpiarSeeker()', function (dt, ctx) {
        _limpiarSeeker(dt, ctx);
    });

    apiRegister('seeker.updateDetailSeekPagination()', function (currentRowNum, totalRowNum, ctx) {
        _updateDetailSeekPagination(currentRowNum, totalRowNum, ctx);
    });

    apiRegister('seeker.disabledButtons()', function (ctx) {
        _disabledButtons(ctx);
    });

    apiRegister('seeker.enabledButtons()', function (ctx) {
        _enabledButtons(ctx);
    });
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialization
     */

    // DataTables creation - check if select has been defined in the options. Note
    // this required that the table be in the document! If it isn't then something
    // needs to trigger this method unfortunately. The next major release of
    // DataTables will rework the events and address this.
    $(document).on('plugin-init.dt', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (ctx.oInit.seeker !== undefined && ctx.oInit.seeker.activate !== false ) {
            DataTable.seeker.init(new DataTable.Api(ctx));
        } else {
            $('tfoot').hide();
        }

    });


    return DataTable.seeker;
}));
