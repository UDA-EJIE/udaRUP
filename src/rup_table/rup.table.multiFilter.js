/**
 * Módulo que permite toda multiFilter
 *
 * @summary 		Extensión del componente RUP Datatable
 * @module			"rup.table.multiFilter"
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
    DataTable.multiFilter = {};

    DataTable.multiFilter.version = '1.2.4';

    /**
     * Se inicializa el componente multiFilter
     *
     * @name init
     * @function
     * @since UDA 3.4.0
     * 
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.multiFilter.init = function (dt) {
        var ctx = dt.settings()[0];
        var settings = ctx.oInit;
        
        // Definir URL para petición de guardado
        if (settings.multiFilter != undefined && settings.multiFilter.url == undefined) {
        	settings.multiFilter.url = '/multiFilter';
        }

        //definincion de variables con los selectores
        settings.multiFilter.$dropdownDialog = $('#' + ctx.sTableId + '_multifilter_dropdownDialog');

        //definicion de variables con ids
        settings.multiFilter.dropdownDialogId = ctx.sTableId + '_multifilter_dropdownDialog';

        $.when(getMultifilterDialogTemplate(ctx)).then(function () {
        	$('#' + ctx.sTableId).triggerHandler('tableMultiFilterBeforeConfigureMultifilter',ctx);
	        configureMultifilter(ctx);
	        $('#' + ctx.sTableId).triggerHandler('tableMultiFilterAfterConfigureMultifilter',ctx);
	
	        // configuracion del resumen del filtro para que
	        // apareza el nombre del filtro
	        settings.multiFilter.getName = function (searchString) {
	        	if (settings.multiFilter.$selectLabel.val() !== '' && settings.multiFilter.$filterWithName) {
	                settings.multiFilter.$filterWithName = false;
	                searchString = settings.multiFilter.$selectLabel.val() + '  {' + searchString + '}   ';
	
	            }
	            return searchString;
	        };
	        
	        var dropdownButtonConfig = $.rup.adapter[jQuery.fn.rup_table.defaults.adapter].multifilter.dropdown;

	        $('#' + ctx.sTableId + '_filter_filterButton').rup_button({
	        	dropdown: {
	                dropdownIcon: dropdownButtonConfig.dropdownIcon,
	                dropdownDialog: settings.multiFilter.dropdownDialogId,
	                dropdownDialogConfig: {
	                    title: dropdownButtonConfig.dropdownDialogConfig.title + $.rup.i18n.base.rup_table.plugins.multifilter.tittle,
	                    width: '450px',
	                    buttons: [{
	                        id: ctx.sTableId + '_multifilter_BtnSave',
	                        text: $.rup.i18n.base.rup_table.plugins.multifilter.save,
	                        click: function () {
	                            if (_checkLabel(ctx)) {
									settings.multiFilter.$dropdownDialogForm = $('#' + ctx.sTableId + '_add_multiFilter_form');
	                                // creo objeto Filter con los datos del formulario del filtro
	                                var filter = _createFilterFromForm(ctx);

	                                var bfr = _validForm(ctx);
	                                if (bfr === false || bfr === 'stop') {
	                                    settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.errorValidate, 'error');
	                                    return;
	                                }

	                                // añado el filtro
	                                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterBeforeAddFilter',ctx);
	                                _addFilter(filter, ctx);
	                                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterAfterAddFilter',ctx);
	                            }
	                        }
	                    },
	                    {
	                        id: ctx.sTableId + '_multifilter_BtnApply',
	                        text: $.rup.i18n.base.rup_table.plugins.multifilter.apply,
	                        click: function () {
	                            //Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
	                            if (settings.$firstStartUp) {

	                                settings.$firstStartUp = false;
	                            }
	                            if (_checkLabel(ctx)) {
	                                settings.multiFilter.$filterWithName = true;

	                                var valorFiltro = _searchFilterInSelect(ctx);
	                                if (valorFiltro !== undefined) {
	                                    //limpiamos el filtro
	                                    $('#' + ctx.sTableId).triggerHandler('tableMultiFilterBeforeCleanFilterForm',ctx);
	                                    _cleanFilterForm(ctx);
	                                    $('#' + ctx.sTableId).triggerHandler('tableMultiFilterAfterCleanFilterForm',ctx);

	                                    //Cargamos de nuevo el filtro en el formulario del filtro
	                                    // rellenar el formulario del filtro

	                                    _fillForm(valorFiltro, ctx);
	                                    $('#' + ctx.sTableId + '_filter_filterButton').click();
	                                    settings.multiFilter.$closeDialog.click();
	                                } else {
	                                    settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.errorNoexiste, 'error');
	                                }
	                            }
	                        }
	                    },
	                    {
	                        id: ctx.sTableId + '_multifilter_BtnRemove',
	                        text: $.rup.i18n.base.rup_table.plugins.multifilter.remove,
	                        click: function () {
	                            if (_checkLabel(ctx)) {
									settings.multiFilter.$dropdownDialogForm = $('#' + ctx.sTableId + '_delete_multiFilter_form');
	                                // creo objeto Filter con los datos del formulario del filtro
	                                var filter = _createFilterFromForm(ctx);

	                                // borro el filtro
	                                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterBeforeDeleteFilter',ctx);
	                                deleteFilter(filter, ctx);
	                                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterAfterDeleteFilter',ctx);
	                            }
	                        }
	                    },
	                    {
	                        text: $.rup.i18n.base.rup_table.plugins.multifilter.cancel,
	                        click: function () {
	                            var filtroAnterior = settings.multiFilter.filtroAnterior;
	                            if (filtroAnterior !== null) {
	                                _fillForm(filtroAnterior, ctx);
	                            }
	                            //limpio el filtro del dropdownDIalog
	                            settings.multiFilter.$selectLabel.val('');
	                            settings.multiFilter.$closeDialog.click();
	                        },
	                        btnType: $.rup.dialog.LINK
	                    }
	                    ]
	                }
	            }

	        });

	        //definincion de variables con los selectores
	        settings.multiFilter.$dropdownButton = $('#' + ctx.sTableId + '_filter_filterButton_dropdown');
	        settings.multiFilter.$select = $('#' + ctx.sTableId + '_multifilter_select');
	        settings.multiFilter.$selectLabel = $('#' + ctx.sTableId + '_multifilter_combo_label');
	        settings.multiFilter.$defaultCheck = $('#' + ctx.sTableId + '_multifilter_activeFilter');
	        settings.multiFilter.$feedback = $('#' + ctx.sTableId + '_multifilter_dropdownDialog_feedback');
	        settings.multiFilter.$closeDialog = $('#' + ctx.sTableId + '_multifilter_dropdownDialog_close');

	        // dialog modal para no cambiar el filtro mientras
	        // se gestionan los mismos
	        $('#' + settings.multiFilter.dropdownDialogId).rup_dialog('setOption', 'modal', true);
	        $('#' + settings.multiFilter.dropdownDialogId).rup_dialog('setOption', 'draggable', false);
	        $('#' + settings.multiFilter.dropdownDialogId).rup_dialog('setOption', 'resizable', false);

	        $('#' + settings.multiFilter.dropdownDialogId).parent().css('width', '500px');

	        settings.multiFilter.$dropdownButton.on('click', function () {
	            //guardo el filtroAnterior
	            var valorFiltro = form2object(settings.filter.$filterContainer[0]);
	            settings.multiFilter.filtroAnterior = valorFiltro;
	        });

	        settings.multiFilter.$feedback.rup_feedback({
	            block: false,
	            delay: 2000
	        });

	        //gesión por filtroPorDefecto

	        //la primera vez que cancelas el filtroAnterior es el filtroPorDefecto
	        var valorFiltro = form2object(settings.filter.$filterContainer[0]);

	        settings.multiFilter.filtroAnterior = valorFiltro;
	        /*
	        this.on({
	        	'rupTable_beforeAdd.multifilter.validate': function(){
	        
	        		//filterSettings.$filterContainer.rup_validate("resetForm");
	        		if (multifilterSettings!==undefined){
	        			if(!settings.$firstStartUp){
	        				return settings.filter.$filterContainer.valid();
	        			}else{
	        				return null;
	        			}
	        		}else{
	        			return settings.filter.$filterContainer.valid();
	        		}
	        	}
	        
	        });*/
    	});
    };

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Local functions
     */

    /**
     * Función que elimina un filtro del multifiltro.
     *
     * @function  deleteFilter
     * @param {object} filter - Objeto json con la información del filtro a eliminar.
     * @example
     * deleteFilter, filter
     */
    function deleteFilter(filter, ctx) {

        var settings = ctx.oInit;

        //reiniciar filter salvado
        settings.multiFilter.$savedText = undefined;
        settings.multiFilter.$savedValue = undefined;

        if (settings.multiFilter.idFilter != null) {
            filter.selector = settings.multiFilter.idFilter;
        }

        // delete
        $.rup_ajax({
            url: settings.urlBase + settings.multiFilter.url + '/delete',
            type: 'DELETE',
            data: $.toJSON(filter),
            dataType: 'json',
            showLoading: false,
            contentType: 'application/json',
            async: false,
            success: function (data, status, xhr) {
                settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.ok, 'ok');
                settings.multiFilter.$selectLabel.data('tmp.loadObjects.term', null);
                settings.multiFilter.$selectLabel.data('loadObjects', {});
				settings.multiFilter.$selectLabel.data('tmp.data', {});
				
				settings.multiFilter.$select.rup_select('setRupValue', '');

				if (data.feedback == 'no_records') {
					settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.noRecords, 'error');
				}

				if (data.active) {
					ctx.oInit.multiFilter.defaultId = '';
				}
				
                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterSuccessDeleteFilter',ctx);
            },
            complete: function () {
                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterCompleteDeleteFilter',ctx);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.error, 'error');
                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterErrorDeleteFilter',ctx);
            }
        });
    }

    /**
     * Función que añade un filtro al multifiltro
     *
     * @function  addFilter
     * @param {object} filter - Objeto json con la información del filtro a añadir.
     * @fires module:rup_table#rupTable_multifilter_beforeAdd
     * @example
     * $("#idComponente").rup_table("addFilter", filter);
     */
    function _addFilter(filter, ctx) {
        var settings = ctx.oInit;

        if (settings.multiFilter.idFilter != null) {
            filter.selector = settings.multiFilter.idFilter;
        }

        // add Filter
        $.rup_ajax({
            url: settings.urlBase + settings.multiFilter.url + '/add',
            type: 'POST',
            data: $.toJSON(filter),
            dataType: 'json',
            showLoading: false,
            contentType: 'application/json',
            async: false,
            beforeSend: function (xhr, options) {
				return $('#' + ctx.sTableId).triggerHandler('rupTable_multifilter_beforeAdd',[xhr, options]);
            },
            success: function (data, status, xhr) {
				settings.multiFilter.$savedText = data.text;
				settings.multiFilter.$savedValue = data.data;

				settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.ok, 'ok');

				settings.multiFilter.$selectLabel.data('tmp.loadObjects.term', null);
				settings.multiFilter.$selectLabel.data('loadObjects', {});
				settings.multiFilter.$selectLabel.data('tmp.data', {});

				settings.multiFilter.$select.rup_select('reload');

				if (data.active) {
					if (data.id) {
						ctx.oInit.multiFilter.defaultId = String(data.id);
					} else {
						_setDefaultFilter(ctx);
					}
				}
				
				$('#' + ctx.sTableId).triggerHandler('tableMultiFilterSuccessAddFilter', ctx);
            },
            complete: function () {
                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterCompleteAddFilter',ctx);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.error, 'error');
                $('#' + ctx.sTableId).triggerHandler('tableMultiFilterErrorAddFilter',ctx);
            }
        });
    }
    
	function _setDefaultFilter(ctx) {
		$.rup_ajax({
			url: ctx.oInit.urlBase +
				ctx.oInit.multiFilter.url + '/getDefault?selector=' +
				ctx.oInit.multiFilter.idFilter + '&user=' +
				ctx.oInit.multiFilter.userFilter,
			type: 'GET',
			dataType: 'json',
			showLoading: false,
			contentType: 'application/json',
			complete: function(data) {
				ctx.oInit.multiFilter.defaultId = data.responseJSON?.id ? data.responseJSON.id : '';
			}
		});
	}

    function _validForm(ctx) {

        var settings = ctx.oInit;
        if (settings.multiFilter !== undefined) {
            if (!settings.$firstStartUp) {
                return settings.filter.$filterContainer.valid();
            } else {
                return null;
            }
        } else {
            return settings.filter.$filterContainer.valid();
        }
    }

    /**
     * Genera el objeto json de datos de filtrado correspondiente al formulario empleado.
     *
     * @function _createFilterFromForm
     * @private
     * @param {object} settings - Propiedades de configuración del componente.
     * @return {object} - Objeto json con la información de filtrado del formulario.
     * @example
     * $self._createFilterFromForm(settings);
     */
    function _createFilterFromForm(ctx) {
		var settings = ctx.oInit;
		var dataForm = form2object(settings.filter.$filterContainer[0]);
		var filter = {
			selector: ctx.sTableId,
			text: settings.multiFilter.$selectLabel.val(),
			active: settings.multiFilter.$defaultCheck.is(':checked')
		};

		// Cambiar la fecha a milisegundos para su almacenamiento en BBDD
		var fecha;
		$.each($('[ruptype=\'date\']', settings.filter.$filterContainer), function(index, item) {
			fecha = $(item).datepicker('getDate');
			if (fecha != null)
				dataForm[item.name] = fecha.getTime().toString();
		});

		filter.data = $.toJSON(dataForm);

		var objetoJSON = JSON.parse(filter.data);

		// Crear una nueva cadena con comillas simples por dentro
		var nuevaCadena = ''
			+ Object.keys(objetoJSON).map(function(key) {
				return key + ':' + objetoJSON[key];
			}).join(', ');

		filter.data = nuevaCadena;

		if (settings.multiFilter.userFilter != null) {
			filter.user = settings.multiFilter.userFilter;
		} else {
			filter.user = LOGGED_USER;
		}

		return filter;
    }

    /**
     * Valida el label que se introduce asociado al filtrado que se va a añadir.
     *
     * @function _checkLabel
     * @private
     * @param {object} settings - Propiedades de configuración del componente.
     * @return {boolean} - Devuelve si es válido o no el nombre introducido para el filtro.
     * @example
     * $self._checkLabel(settings);
     */
    function _checkLabel(ctx) {
        var settings = ctx.oInit;

        if (settings.multiFilter.$selectLabel.val().trim() === '') {
            settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.emptyName, 'error');
            return false;
        } else if (settings.multiFilter.$selectLabel.val().length > settings.multiFilter.labelSize) {
            settings.multiFilter.$feedback.rup_feedback('set', $.rup.i18n.base.rup_table.plugins.multifilter.tooLong, 'error');
            return false;
        }
        return true;

    }

    /**
     * Inicializa los campos del formulario con los valores correspondientes al filtro seleccionado.
     *
     * @function _fillForm
     * @private
     * @param {object} filtroNuevo - Objeto json con los valores de filtrado.
     * @example
     * $self._fillForm(data);
     */
    function _fillForm(filtroNuevo, ctx) {
        var settings = ctx.oInit;
        $('#' + ctx.sTableId).triggerHandler('tableMultiFilterFillForm',ctx);
        //cambiar milisengudos a fecha (el formato de bd del  fecha es milisegundos)
        $('[ruptype=\'date\']', settings.filter.$filterContainer).each(function (index, elem) {

            var $campo = jQuery(elem);

            var fechaString;

            var jsonFecha = filtroNuevo[elem.name];
            if (jsonFecha !== undefined) {
                if (jsonFecha.search('/') == -1) {
                    var dateFromJson = new Date(parseInt(jsonFecha));

                    var dateFormat = $campo.data('datepicker').settings.dateFormat;

                    if ($campo.data('datepicker').settings.datetimepicker) {
                        // Cuando es fecha-hora
                        var dateObj = {
                            hour: dateFromJson.getHours(),
                            minute: dateFromJson.getMinutes(),
                            second: dateFromJson.getSeconds()
                        };
                        fechaString = $.datepicker.formatDate(dateFormat, dateFromJson) + ' ' + $.timepicker._formatTime(dateObj, 'hh:mm:ss');
                    } else {
                        // Solo fecha

                        fechaString = $.datepicker.formatDate(dateFormat, dateFromJson);
                    }

                    filtroNuevo[elem.name] = fechaString;
                }
            }
        });

        // Formatear datos

        var xhrArray = $.rup_utils.jsontoarray(filtroNuevo);

        // rellenar el formulario
        $.rup_utils.populateForm(xhrArray, $('#' + ctx.sTableId + '_filter_form'));


    }

    /**
     * Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.
     *
     * @function  getMultifilterDialogTemplate
     * @param {object} settings - Propiedades de configuración del componente.
     * @return {object} - Objeto jQuery con el contenido html de la template.
     * @example
     * $("#idComponente").rup_table("getMultifilterDialogTemplate", settings);
     */
    function getMultifilterDialogTemplate(ctx) {
        // Preparar la información a enviar al servidor. Como mínimo se enviará el identificador de la tabla.
		let defaultData = {
				'tableID': ctx.sTableId,
				'containerClass': $.rup.adapter[$.fn.rup_table.defaults.adapter].multifilter.classes.container,
				'labelClass': $.rup.adapter[$.fn.rup_table.defaults.adapter].multifilter.classes.label,
				'defaultContainerClass': $.rup.adapter[$.fn.rup_table.defaults.adapter].multifilter.classes.activeFilter.container,
				'defaultCheckboxClass': $.rup.adapter[$.fn.rup_table.defaults.adapter].multifilter.classes.activeFilter.checkBox
			};
		let data = ctx.oInit.multiFilter.data !== undefined ? $.extend({}, defaultData, ctx.oInit.multiFilter.data) : defaultData;
        
        return $.post(ctx.oInit.multiFilter.formURL !== undefined ? ctx.oInit.multiFilter.formURL : ctx.oInit.urlBase + ctx.oInit.multiFilter.url, data, function (dropdownDiaglog) {			
			// Añade al DOM el HTML recibido
        	ctx.oInit.filter.$filterContainer.after(dropdownDiaglog);
			// Guarda la referencia al formulario de multiFilter
			ctx.oInit.multiFilter.$dropdownDialogForm = $('#' + $(dropdownDiaglog).find('form').attr('id'));
    	}, 'html');
    }

    /**
     * Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.
     *
     * @function  configureMultifilter
     * @param {object} settings - Propiedades de configuración del componente.
     * @example
     * $("#idComponente").rup_table("configureMultifilter", settings);
     */
    function configureMultifilter(ctx) {
        var settings = ctx.oInit;
        settings.multiFilter.$filterForm = $('#' + settings.sTableId + '_filter_form');


        var selector;
        if (settings.multiFilter.idFilter != null) {
            selector = settings.multiFilter.idFilter;
        } else {
            selector = ctx.sTableId;
        }

        var usuario;
        if (settings.multiFilter.userFilter != null) {
            usuario = settings.multiFilter.userFilter;
        } else {
            usuario = LOGGED_USER;
        }

        var getDefault;
        if (settings.multiFilter.getDefault != null) {
            getDefault = settings.multiFilter.getDefault;
        } else {
            getDefault = true;
        }
        
		settings.multiFilter.sourceParam = {
			text: 'text',
			id: 'id',
			data: 'data',
			category: 'filter'
		};
        
		global.initTableMultiFilter.then(() => {
			$('#' + ctx.sTableId + '_multifilter_select').rup_select({
				url: settings.urlBase +
					settings.multiFilter.url + '/getAll?selector=' +
					selector + '&user=' +
					usuario,
				sourceParam: settings.multiFilter.sourceParam,
				contains: false,
				allowClear: true,
				autocomplete: true,
				combo: true,
				selected: ctx.oInit.multiFilter.defaultId,
				placeholder: $.rup.i18n.base.rup_table.plugins.multifilter.input,
				onLoadSuccess: function() {
					settings.multiFilter.$selectLabel = $('#' + ctx.sTableId + '_multifilter_select + span input.border-0');
				},
				select: function() {
					if (settings.multiFilter.defaultId != $('#' + ctx.sTableId + '_multifilter_select').rup_select('getRupValue')) {
						$('#' + ctx.sTableId + '_multifilter_activeFilter').prop('checked', false);
					} else {
						$('#' + ctx.sTableId + '_multifilter_activeFilter').prop('checked', true);
					}
					
					// Es necesario volverlo a definir para que no falle al llamar a _searchFilterInSelect.
					settings.multiFilter.$selectLabel = $('#' + ctx.sTableId + '_multifilter_select + span input.border-0');

					var valorFiltro = _searchFilterInSelect(ctx);

					//limpiar Filtro
					$('#' + ctx.sTableId).triggerHandler('tableMultiFilterBeforeCleanFilterForm', ctx);
					_cleanFilterForm(ctx);
					$('#' + ctx.sTableId).triggerHandler('tableMultiFilterAfterCleanFilterForm', ctx);

					// rellenar el formulario del filtro
					_fillForm(valorFiltro, ctx);
				}
			});

			$('#' + ctx.sTableId + '_multifilter_select').on('selectAjaxSuccess', function() {
				if (settings.multiFilter.defaultId == $('#' + ctx.sTableId + '_multifilter_select').rup_select('getRupValue')) {
					$('#' + ctx.sTableId + '_multifilter_activeFilter').prop('checked', true);
				}
				$(this).off('selectAjaxSuccess');
			});

			$('#' + ctx.sTableId + '_filter_cleanButton').on('click', function() {
				settings.multiFilter.$select.rup_select('setRupValue', '');
				settings.filter.$filterSummary.html('<i></i>');
			});
		});

		$('.jstree').on('rup_filter_treeLoaded', function(event, data) {
			$(this).rup_tree('setRupValue', data);
		});
    }
    
    /**
     * Limpia el filtro
     *
     * @name _clearFilter
     * @function
     * @since UDA 3.4.0
     *
     * @param {object} options Opciones del componente
     *
     */
    function _cleanFilterForm(ctx) {
        var options = ctx.oInit;
        options.filter.$filterContainer.resetForm();

        options.filter.$filterSummary.html(' <i></i>');
        jQuery('input,textarea', options.filter.$filterContainer).val('');
        jQuery('.ui-selectmenu-status', '.rup-table-filter-fieldset').text('--');
        $.rup_utils.populateForm([], options.filter.$filterContainer)

    }

    /**
     * Devuelve el json de filtrado asociado al filtro seleccionado en el combo.
     *
     * @function _searchFilterInSelect
     * @private
     * @param {object} settings - Propiedades de configuración del componente.
     * @return {object} - Json de filtrado asociado al filtro seleccionado en el combo.
     * @example
     * $self._searchFilterInSelect(settings);
     */
    function _searchFilterInSelect(ctx) {
        var settings = ctx.oInit;
        var name = settings.multiFilter.$selectLabel.val();
        var listaFiltros = settings.multiFilter.$selectLabel.data('tmp.data');

        // Verificamos si la lista esta vacia. En caso de estarla sera necesario pedirsela al servidor.
        if ($.isEmptyObject(listaFiltros)) {
            // Parametros consulta
            var selector = settings.multiFilter.idFilter;
            var usuario = settings.multiFilter.userFilter;

            $.rup_ajax({
                url: settings.urlBase +
                	settings.multiFilter.url + '/getAll?selector=' +
                    selector + '&user=' +
                    usuario,
                type: 'GET',
                async: false,
                success: function (data) {
                    // Añadimos a la lista todos los filtros del usuario
                    listaFiltros = data;
                }
            });
        }

        // Busco el valor del filtro
        var objFiltro = $.grep(listaFiltros, function (obj, i) {
            if (obj.text === name) return obj;
        });

        // si es filtro por defecto,
        // checkeo el check "Filtro
        // por defecto"
        if (objFiltro.length !== 0) {
            settings.multiFilter.$defaultCheck.attr('checked', objFiltro[0].data);
            var valorFiltro = objFiltro[0].data ? JSON.parse(objFiltro[0].data) : {};
        }

        if (valorFiltro === undefined && settings.multiFilter.$savedText !== undefined &&
            settings.multiFilter.$savedText === name) {
            valorFiltro = JSON.parse(settings.multiFilter.$savedValue);
        }
        
        return valorFiltro;
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

    apiRegister('multiFilter()', function () {
        return this.iterator('table', function (ctx) {
            DataTable.multiFilter.init(new DataTable.Api(ctx));
        });
    });

    apiRegister('multiFilter.fillForm()', function (valorFiltro, ctx) {
        return _fillForm(valorFiltro, ctx);
    });


    // Common events with suitable namespaces
    function namespacedEvents(config) {
        var unique = config._eventNamespace;

        return 'draw.dt.DT' + unique + ' select.dt.DT' + unique + ' deselect.dt.DT' + unique;
    }


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
        if (ctx.oInit.multiFilter !== undefined && ctx.oInit.multiFilter.activate !== false) {
            DataTable.multiFilter.init(new DataTable.Api(ctx));
        }
    });


    return DataTable.multiFilter;
}));
