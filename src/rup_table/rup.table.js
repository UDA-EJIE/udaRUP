/**
 * Genera un table
 *
 * @summary 		Componente RUP Datatable
 * @module			"rup.table"
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

/* eslint-disable no-console */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery',
            './rup.table.request',
            'datatables.net',
            'datatables.net-bs4',
            './rup.table.responsive',
            './rup.table.multiSelect',
            './rup.table.seeker',
            './rup.table.inlineEdit',
            './rup.table.editForm',
            './rup.table.buttons',
            './rup.table.colReorder',
            './rup.table.select',
            './rup.table.rowGroup',
            './rup.table.masterDetail',
            './rup.table.multiFilter',
            '../core/utils/form2object'
        ], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($, TableRequest) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var DataTable = $.fn.dataTable;
    var rup_table = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_table', rup_table));

    //*******************************
    // DEFINICIÓN DE MÉTODOS RUP
    //*******************************
    $.fn.rup_table('extend', {
    	getRupValue: function () {
        	return console.warn($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.warnings.methodNotAvailable')));
        },
        setRupValue: function () {
        	return console.warn($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.warnings.methodNotAvailable')));
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_table('extend', {
        foo: function () {
            return this;
        },
        /**
         * Indica si un rup_table ya ha sido inicializado sobre el elemento con el identificador provisto.
         *
         * @function isInitialized
         * @since UDA 5.0.3
         * @return {boolean} - Indica si ya ha sido inicializada una tabla sobre el elemento.
         * @example
         * $("#idTable").rup_table("isInitialized");
         */
        isInitialized: function () {
        	return $(this).attr('ruptype') === 'table' ? true : false;
        },
        /**
         * Crea y añade un botón en la botonera de la tabla.
         *
         * @function createButton
         * @since UDA 3.7.1
         * @param {Object} - Propiedades del botón.
         * @param {number} - Posición en la que situar el botón.
         * @example
         * $("#idTable").rup_table("createButton", {
				text: function (dt) {
					return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.edit');
				},
				id: idTable + 'editButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
				className: 'btn-material-primary-high-emphasis table_toolbar_btnEdit order-2',
				displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
				insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
				type: 'edit',
				init: function (dt, button, config) {
					ctx.ext.buttons.editButton.eventDT = dt;
				},
				action: function (e, dt, button, config) {
					$('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeEditClick', [dt, button, config]);
					DataTable.Api().buttons.actions(dt, config);
					$('#' + ctx.sTableId).triggerHandler('tableButtonsAfterEditClick', [dt, button, config]);
				}
			}, 0);
         */
        createButton: function (props, pos = 0) {
            const dt = $(this).DataTable();
            const ctx = dt.context[0];
            
            if (ctx.oInit.buttons !== undefined && props !== undefined) {
                if (props.custom === undefined) {
                    props.custom = true;
                }
                // Añadimos el boton genérico
                dt.button().add(pos, {
                    text: () => {
                        return props.text;
                    },
                    id: props.id, // Campo obligatorio si se quiere usar desde el contextMenu
                    className: props.className,
                    icon: props.icon,
                    displayRegex: props.regex, // Se muestra siempre que sea un numero positivo o neutro
                    insideContextMenu: props.insideContextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
                    action: props.action,
                    custom: props.custom
                });
            } else {
            	console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.errors.wrongParams')));
            }
        },
        /**
         * Elimina el botón especificado.
         *
         * @function removeButton
         * @since UDA 3.7.1
         * @param {Object} - Selector que contenga un botón de la tabla.
         * @example
         * $("#idTable").rup_table("removeButton", $('#exampleeditButton_1'));
         */
        removeButton: function (selector) {
        	const dt = $(this).DataTable();
        	const ctx = dt.context[0];

            if (ctx.oInit.buttons !== undefined && selector !== undefined) {
                dt.buttons(selector).remove();
            } else {
            	console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.errors.wrongParam')));
            }
        },
        /**
         * Deshabilita el botón especificado.
         *
         * @function disableButton
         * @since UDA 3.7.1
         * @param {Object} - Selector que contenga un botón de la tabla.
         * @param {boolean} - Permite deshabilitar el botón del menú contextual.
         * @example
         * $("#idTable").rup_table("disableButton", $('#exampleeditButton_1'), true);
         */
        disableButton: function (selector, contextMenu) {
        	const dt = $(this).DataTable();
        	const ctx = dt.context[0];

            if (ctx.oInit.buttons !== undefined && selector !== undefined && contextMenu !== undefined) {
                dt.buttons(selector).disable(contextMenu);
            } else {
            	console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.errors.wrongParams')));
            }
        },
        /**
         * Habilita el botón especificado.
         *
         * @function enableButton
         * @since UDA 3.7.1
         * @param {Object} - Selector que contenga un botón de la tabla.
         * @param {boolean} - Permite habilitar o deshabilitar el botón de la botonera.
         * @param {boolean} - Permite habilitar el botón del menú contextual.
         * @example
         * $("#idTable").rup_table("enableButton", $('#exampleeditButton_1'), true, false);
         */
        enableButton: function (selector, flag, contextMenu) {
        	const dt = $(this).DataTable();
        	const ctx = dt.context[0];

            if (ctx.oInit.buttons !== undefined && selector !== undefined && flag !== undefined && contextMenu !== undefined) {
                dt.buttons(selector).enable(flag, contextMenu);
            } else {
            	console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.errors.wrongParams')));
            }
        },
        /**
         * Permite obtener el contexto de la tabla. 
         *
         * @function getContext
         * @since UDA 3.7.1
         * @return {Object} - Contexto de la tabla.
         * @example
         * $("#idTable").rup_table("getContext");
         */
        getContext: function () {
            return $(this).DataTable().context[0];
        },
        /**
         * Devuelve los identificadores de los elementos seleccionados.
         *
         * @function getSelectedIds
         * @since UDA 4.2.1
         * @return {Object[]} - Identificadores de los elementos seleccionados.
         * @example
         * $("#idTable").rup_table("getSelectedIds");
         */
        getSelectedIds: function () {
            return $(this).DataTable().context[0].multiselection.selectedIds;
        },
        /**
         * Devuelve el identificador de la última fila seleccionada.
         *
         * @function getLastSelectedId
         * @since UDA 5.0.3
         * @return {string} - Identificador del último registro seleccionado.
         * @example
         * $("#idTable").rup_table("getLastSelectedId");
         */
        getLastSelectedId: function () {
        	return $(this).DataTable().context[0].multiselection.lastSelectedId;
        },
        /**
         * Devuelve los campos y valores de las filas seleccionadas.
         *
         * @function getSelectedRows
         * @since UDA 4.2.1
         * @return {Object[]} - Objeto con los campos y valores de las filas seleccionadas.
         * @example
         * $("#idTable").rup_table("getSelectedRows");
         */
        getSelectedRows: function () {
        	const dt = $(this).DataTable();
        	const ctx = dt.context[0];
        	const page = dt.page() + 1;
            let rows = [];
            
            if (ctx.json !== undefined && ctx.json.rows !== undefined && ctx.json.rows.length > 0) {
            	const selecteds = $.grep(ctx.multiselection.selectedRowsPerPage, function (v) {
                    return v.page === page;
                });
            	if (selecteds.length === 1) {
            		rows = ctx.json.rows[selecteds[0].line];
            	} else if (selecteds.length > 1) {
            		rows = [];
                    $.each(selecteds, function (index) {
                    	rows.push(ctx.json.rows[selecteds[index].line]);
                    });
            	}
            }
            return rows;
        },
        /**
         * Devuelve las posiciones de todas las filas seleccionadas en la tabla.
         *
         * @function getSelectedRowPerPage
         * @since UDA 4.2.1
         * @return {Object[]} - Objeto con la posición de cada fila seleccionada en la tabla.
         * @example
         * $("#idTable").rup_table("getSelectedRowPerPage");
         */
        getSelectedRowPerPage: function () {
        	return $(this).DataTable().context[0].multiselection.selectedRowsPerPage;
        },
        /**
         * Limpia todas las filas de la tabla y la deja vacía.
         *
         * @function clear
         * @since UDA 4.3.0
         * @example
         * $("#idTable").rup_table("clear");
         */
        clear: function () {
        	$('#' + this[0].id + ' tbody').empty();
        },
        /**
         * Recarga la tabla.
         *
         * @function reload
         * @since UDA 4.3.0
         * @example
         * $("#idTable").rup_table("reload");
         */
        reload: function () {
        	$(this).DataTable().ajax.reload();
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_table('extend', {

        /**
         * Inicializa ciertas opciones del componente
         *
         * @name _initOptions
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} options Opciones del componente
         *
         */
        _initOptions: function (options) {
            var $self = this;
            
            options.processing = true;
            options.serverSide = true;
            options.columns = options.columns || $self._getColumns(options);
            
            // Urls
            var baseUrl = options.urlBase;
            options.urls = {
                base: baseUrl,
                filter: baseUrl + '/filter'
            };

            options.ajax = this._ajaxOptions(options);

            options.language = {
                'url': $.rup.RUP + '/resources/rup.i18n_' + $.rup.lang + '.json'
            };

            //Se cargan los metodos en la API, Se referencia al Register
            var apiRegister = DataTable.Api.register;

            apiRegister('rupTable.selectPencil()', function (ctx, idRow) {
                //Se elimina el lapicero indicador.
                $('#' + ctx.sTableId + ' tbody tr td.select-checkbox i.selected-pencil').remove();
                //se añade el span con el lapicero
                if (idRow >= 0) {
                    var spanPencil = $('<i></i>').addClass('mdi mdi-pencil ui-icon-rupInfoCol selected-pencil');
                    $($('#' + ctx.sTableId + ' tbody tr td.select-checkbox')[idRow]).append(spanPencil);
                }
            });

            apiRegister('rupTable.reorderDataFromServer()', function (json, ctx) {
                //Se mira la nueva reordenacion y se ordena.
            	if(ctx.multiselection !== undefined){
            		ctx.multiselection.selectedIds = [];
            		ctx.multiselection.selectedRowsPerPage = [];
            	}
            	
            	let posibleLastselection = "";
                //Viene del servidor por eso la linea de la pagina es 1 menos.
                $.each(json.reorderedSelection, function (index, p) {
                	let idEntity = DataTable.Api().rupTable.getIdPk(p.pk, ctx.oInit);
                	if(ctx.oInit.formEdit !== undefined){                	
	                	var hdivStateParamValue = $.fn.getHDIV_STATE(undefined, ctx.oInit.formEdit.idForm);
	                	if(ctx.multiselection.lastSelectedId != '' && idEntity != ''){
	                		//Se actualiza el last, con el id de hdiv cifrado.
	                		ctx.multiselection.lastSelectedId = idEntity;
	                	}
	                	//Se marcaría el primero, en caso de no encontrar.
	                	if (hdivStateParamValue !== '' && index == 0) {
	                		posibleLastselection = idEntity;
	                    }
                	}
                    var arra = {
                        id: idEntity,
                        page: p.page,
                        line: p.pageLine - 1
                    };
                    ctx.multiselection.selectedIds.splice(index, 0, arra.id);
                    ctx.multiselection.selectedRowsPerPage.splice(index, 0, arra);
                });
                //Si viene reordenación, debe de tener un último seleccionado.                
                if(json.reorderedSelection != null && json.reorderedSelection.length > 0 && ctx.multiselection.lastSelectedId == ''){
                	ctx.multiselection.lastSelectedId = posibleLastselection;
                }
                if (ctx.multiselection !== undefined && !ctx.multiselection.selectedAll) {
                    ctx.multiselection.numSelected = ctx.multiselection.selectedIds.length;
                }

                // Detecta cuando se pulsa sobre el boton de filtrado o de limpiar lo filtrado
                if (options.buttons !== undefined && ctx._buttons !== undefined) {
                    ctx._buttons[0].inst.s.disableAllButtons = undefined;
                    DataTable.Api().buttons.displayRegex(ctx);
                }
                $('#' + ctx.sTableId).triggerHandler('tableAfterReorderData',ctx);
            });

            apiRegister('rupTable.getIdPk()', function (json = {}, optionsParam) {
                var opts = options;
                if (optionsParam !== undefined) {
                    opts = optionsParam;
                }

                var id = '';

                $.each(opts.primaryKey, function (index, key) {
                    // Comprueba si la primaryKey es un subcampo
                	if (Object.prototype.hasOwnProperty.call(json, key)) {
                		id = id + json[key];
                	} else if (key.indexOf('.') !== -1) {
                	    id = $self._getDescendantProperty(json, key);
                	}

                    if (opts.primaryKey.length > 1 && index < opts.primaryKey.length - 1) {
                        id = id + opts.multiplePkToken;
                    }
                });

                return id;
            });
            
            /**
             * Comprueba si dos claves primarias son iguales.
             *
             * @name comparePKs
             * @function
             * @since UDA 5.0.0 // Table 1.0.0
             * 
             * @param {object} firstRow - Fila de la tabla a comparar.
             * @param {object} secondRow - Fila de la tabla a comparar.
             *
             * @return {boolean}
             */
            apiRegister('rupTable.comparePKs()', function (firstRow, secondRow) {
            	let firstRowPK = DataTable.Api().rupTable.getIdPk(firstRow);
            	let secondRowPK = DataTable.Api().rupTable.getIdPk(secondRow);
            	
            	// Si Hdiv está activado se comprueba el parámetro nid en vez de la PK (es lo mismo pero sin cifrar)
            	if ($.fn.isHdiv(firstRowPK) && $.fn.isHdiv(secondRowPK)) {
            		return firstRow.nid === secondRow.nid;
            	} else {
            		return firstRowPK === secondRowPK;
            	}
            });

            /**
             * Método que gestiona el bloqueo de la edición de las claves primarias.
             *
             * @name blockPKEdit
             * @function
             * @since UDA 3.7.0 // Table 1.0.0
             *
             * @param {object} ctx - Settings object to operate on.
             * @param {string} actionType - Método de operación CRUD.
             *
             */
            apiRegister('rupTable.blockPKEdit()', function (ctx, actionType, sufijo) {

                var blockPK = ctx.oInit.blockPKeditForm;
                var idForm = '';
                if (ctx.oInit.formEdit !== undefined) {
                    idForm = ctx.oInit.formEdit.idForm;
                } else {
                    idForm = $('#' + ctx.sTableId + '_search_searchForm');
                }
                var primaryKey = ctx.oInit.primaryKey;

                // Comprobamos si el bloqueo de claves primarias esta activo y la tabla tiene alguna columna definida como clave primaria.
                if (blockPK && primaryKey.length > 0) {
                    // En caso de ser edición bloqueamos la modificación
                    if (actionType === 'PUT') {
                        $.each(primaryKey, function (key, id) {
                            var input = $(idForm[0]).find(':input[name=\'' + id + '\']');
                            if (sufijo !== undefined) {
                                input = $(idForm[0]).find(':input[name=\'' + id + sufijo + '\']');
                            }

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
                                        input.after(`
                                            <i id="${id}_bloqueado" 
                                                class="mdi mdi-check sustitutoCheckboxPKBloqueadoGeneral" 
                                                valor="1" aria-hidden="true"></i>
                                        `);
                                    } else {
                                        input.after(`
                                            <i id="${id}_bloqueado" 
                                                class="mdi mdi-close sustitutoCheckboxPKBloqueadoGeneral sustitutoCheckboxPKBloqueadoCross" 
                                                valor="0" aria-hidden="true"></i>
                                        `);
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
                        $.each(primaryKey, function (key, id) {
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
                                $(this).off(event.preventDefault());
                                input.focus();
                            });
                        });
                    }
                }

            });
            
            apiRegister('rupTable.getDescendantProperty()', function (json, key) {
            	$self._getDescendantProperty(json, key);
            });

            if (options.inlineEdit !== undefined) {
                //RESPONSIVO CON EDITLINE
                var renderer = function (api, rowIdx, columns) {
                    var data = $.map(columns, function (col) {
                        var colShow = col.hidden ? `
                            <li data-dtr-index="${col.columnIndex}" data-dt-row="${col.rowIndex}" data-dt-column="${col.columnIndex}">
                                <span class="dtr-title">${col.title}</span>
                                <span class="dtr-data">${col.data}</span>
                            </li>
                            ` : '';
                        return colShow;
                    }).join('');

                    var value = data ? $('<ul data-dtr-index="' + rowIdx + '" class="dtr-details"></ul>').append(data) : false;
                    var ctx = api.context[0];
                    var $row = $('#' + ctx.sTableId + ' tbody tr:not(.child)').eq(rowIdx);
                    if ($row.hasClass('editable')) {
                        DataTable.Api().inlineEdit.inResponsiveChangeInputsValues(ctx, $row);
                        if (ctx.oInit.inlineEdit.rowDefault !== undefined && ctx.oInit.inlineEdit.rowDefault === 'cambioEstado') {
                            ctx.oInit.inlineEdit.rowDefault = 'estadoFinal';
                        }
                    }
                    return value;
                };
                options.responsive.details.renderer = renderer;
            }

            return options;
        },

        /**
         * Obtiene el subcampo
         *
         * @name _getDescendantProperty
         * @function
         * @since UDA 4.1.0 // Table 1.0.0
         *
         * @param {object} obj - Valores de la fila
         * @param {string} key - Clave para extraer el valor
         *
         */
        _getDescendantProperty(obj, key) {
            var indexes = key.split('.');

            while (indexes.length && obj) {
                var index = indexes.shift();
                var match = new RegExp('(.+)\\[([0-9]*)\\]').exec(index);

                // Comprueba si es un array y aplica la logica necesaria para obtener el valor
                if ((match !== null) && (match.length == 3)) {
                    var arrayData = {
                        arrayName: match[1],
                        arrayIndex: match[2]
                    };
                    if (obj[arrayData.arrayName] != undefined) {
                        obj = obj[arrayData.arrayName][arrayData.arrayIndex];
                    } else {
                        obj = undefined;
                    }
                } else {
                    obj = obj[index];
                }
            }

            return obj;
        },

        /**
         * Obtiene las columnas
         *
         * @name _getColumns
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} options Opciones del componente
         *
         */
        _getColumns(options) {
            var $self = this;
            
            // Indica si la primera columna ha sido generada por el componente RUP
            let rupSelectColumn = false;
            
            //Se crea la columna del select.
            if (options.columnDefs !== undefined && options.columnDefs.length > 0 &&
                options.columnDefs[0].className !== undefined && options.columnDefs[0].className.indexOf('select-checkbox') > -1 &&
                (options.multiSelect !== undefined)) {
                //Se crea el th thead, se añade la columna.

                var th = $('<th></th>').attr('data-col-prop', '');

                if ($self[0].tHead !== null) {
                    $(th).insertBefore($self[0].tHead.rows[0].cells[0]);
                }

                //Se aseguro que no sea orderable
                if (options.columnDefs.length > 0) {
                    options.columnDefs[0].orderable = false;
                }
                //Se oculta la columna por decision del usuario
                if (options.multiSelect !== undefined && options.multiSelect.hideMultiselect) {
                    options.columnDefs[0].visible = false;
                }
                
                rupSelectColumn = true;
            }
            
            $.each(options.colModel, function (index, column) {
            	// Se ocultan las columnas que así hayan sido definidas en el colModel.
            	if (column.hidden) {
            		options.columnDefs.push({
            			targets: rupSelectColumn ? index + 1 : index,
            			visible: false,
            			className: 'never'
            		})
            	} else if (column.orderable === false) {
            		// Se bloquea la ordenación de las columnas que así hayan sido definidas en el colModel. Solo se hace esta comprobación cuando la columna no ha sido ocultada.
            		options.columnDefs.push({
            			targets: rupSelectColumn ? index + 1 : index,
            			orderable: false
            		})
            	}
            });
            
            $.each(options.colModel, function (index, column) {
            });

            //se crea el tfoot
            var $tfoot = $('<tfoot>').appendTo($self[0]);
            var $tr = $('<tr>').appendTo($tfoot);

            var columns = this.find('th[data-col-prop]').map((i, e) => {
                //se añaden las columnas al tfoot
                var $th = $('<th>').appendTo($tr);
                $th.text($(e).text());

                if (/^checkbox$/i.test(e.getAttribute('data-col-type'))) {
                    options.columnDefs.push({
                        targets: i,
                        data: '',
                        render: function (data) {
                            var iconCheck = 'mdi-close';
                            if (data == '1') {
                                iconCheck = 'mdi-check';
                            }
                            return `
                                <div class="centerOnResponsiveContainer">
                                    <i class="mdi ${iconCheck} mx-auto"></i>
                                </div>`;
                        }
                    });
                }
                return {
                    data: e.getAttribute('data-col-prop'),
                    sidx: e.getAttribute('data-col-sidx'),
                    editable: e.getAttribute('data-col-edit') !== 'false'
                };
            });

            columns[0].sDefaultContent = '';

            return columns;
        },

        /**
         * Filtrado
         *
         * @name _doFilter
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} options Opciones del componente
         *
         */
        _doFilter(options) {
            var $self = this;
            let reloadTable = () => {
                $self.DataTable().ajax.reload(() => {
                    $('#' + options.id).trigger('tableFilterSearch',options);
                });
            };

            if (options.filter && options.filter.$filterContainer) {
                $self._showSearchCriteria();
                if(options.filter.collapsableLayerHide){//se oculta el collapsable al filtrar.
                	options.filter.hideLayer();
                }

                if (options.filter.$filterContainer.valid()) {
                    reloadTable();
                }
            } else {
                reloadTable();
            }
        },

        /**
         * Prepara el objeto necesario para la consulta de registros al servidor
         *
         * @name _ajaxOptions
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} options Opciones del componente
         *
         */
        _ajaxOptions(options) {

            options.id = this[0].id;
            $('#' + options.id).triggerHandler('tableFilterInitialize',options);

            let ajaxData = {
                'url': options.urls.filter,
                'dataSrc': function (json) {
                    let ret = {};
                    $('#' + options.id).triggerHandler('tableFilterBeforeShow',options);
                    json.recordsTotal = json.records;
                    json.recordsFiltered = json.records;

                    ret.recordsTotal = json.records;
                    ret.recordsFiltered = json.records;
                    ret.data = json.rows;

                    let table = $('#' + options.id).DataTable();
                    let ctx = table.context[0];

                    if (options !== undefined && (options.multiSelect !== undefined || options.select !== undefined)) {
                        DataTable.Api().rupTable.reorderDataFromServer(json, ctx);
                    }
                    if (ctx.seeker !== undefined && ctx.seeker.search !== undefined &&
                        json.reorderedSeeker !== undefined) {
                        ctx.seeker.search.funcionParams = json.reorderedSeeker;
                    }

                    if (ctx.oInit.inlineEdit !== undefined) {
                        if (ctx.oInit.inlineEdit.alta && !$('#' + ctx.sTableId + ' tbody tr').eq(0).hasClass('new')) {
                            ret.data = DataTable.Api().inlineEdit.createTr(table, ctx, ret.data);
                        } else {
                            ctx.oInit.inlineEdit.alta = undefined;
                        }
                        DataTable.Api().seeker.disabledButtons(ctx);
                        if (ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined) {
                            ctx.inlineEdit.lastRow.idx = -1;
                        }
                    }
                    return ret.data;
                },
                'type': 'POST',
                'data': this._ajaxRequestData,
                'contentType': 'application/json',
                'dataType': 'json'
            };

            if (options.customError !== undefined) {
                ajaxData.error = options.customError;
            }

            return ajaxData;
        },
        /**
         * Solicita los datos al servidor
         *
         * @name _ajaxRequestData
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} data Opciones del table
         * @param {object} ctx contexto  del componente table
         *
         */
        _ajaxRequestData(data, ctx) {

			//Guardar los valores de sidx
        	if (ctx.oInit.ordering) {
	        	for (var i = 0; i < data.order.length; i++) {
	        		if(data.order[i] != undefined && data.order[i].column != undefined){
						data.columns[data.order[i].column].colSidx = ctx.aoColumns[data.order[i].column].colSidx;
					}
				}
        	}    	
        	
            //El data viene del padre:Jquery.table y como no tiene el prefijo de busqueda se añade.
            if (ctx.oInit.filter.$filterContainer) {
                data.filter = window.form2object(ctx.oInit.filter.$filterContainer[0]);
            }
            data.multiselection = undefined;
            //Se pueden meter ids seleccionados por defecto
            if(ctx.oInit.multiSelect !== undefined){
            	DataTable.Api().multiSelect.defaultsIds(ctx);
            }else if(ctx.oInit.select !== undefined){
            	DataTable.Api().select.defaultId(ctx);
            }
            if (ctx.multiselection !== undefined && ctx.multiselection.selectedIds.length > 0) {
                data.multiselection = $.rup_utils.deepCopy(ctx.multiselection, 4);
            }
            if (ctx.seeker !== undefined && ctx.seeker.search !== undefined &&
                ctx.seeker.search.funcionParams !== undefined && ctx.seeker.search.funcionParams.length > 0) {
                data.seeker = {};
                data.seeker.selectedIds = [];
                $.each(ctx.seeker.search.funcionParams, function (index, p) {
                    data.seeker.selectedIds.splice(index, 0, DataTable.Api().rupTable.getIdPk(p.pk, ctx.oInit));
                });
            }
            
            // Elimina los campos _label generados en los autocompletes del filtro
            $.fn.deleteAutocompleteLabelFromObject(data.filter);
            
            // Elimina del filtro los campos autogenerados por los multicombos que no forman parte de la entidad
            $.fn.deleteMulticomboLabelFromObject(data.filter, ctx.oInit.filter.$filterContainer);
			
			// Fuerza el mostrado de la primera página cuando se pagina y los criterios de filtrado han cambiado.
			const newCriteria = ctx.oInit.filter.$filterContainer.serializeArray();
						
			if (!_.isEqual(ctx.oInit.filter.oldCriteria, newCriteria)) {
				ctx.oInit.filter.oldCriteria = newCriteria;
				ctx._iDisplayStart = 0;
				data.start = 0;
			}
			
            let tableRequest = new TableRequest(data);
            let json = $.extend({}, data, tableRequest.getData());//Mantenemos todos los valores, por si se quieren usar.

            json.core.pkNames = ctx.oInit.primaryKey;

            ctx.aBaseJson = json;

            // Posibles referencias circulares en json
            let cache = [];
            let strJson = JSON.stringify(json, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Si se encuentra una key duplicada se descarta
                        return;
                    }
                    // Se almacena para ver que no se repita
                    cache.push(value);
                }
                return value;
            });
            cache = null; // Enable garbage collection
            return strJson;
        },

        /**
         * Gestiona la paginación
         *
         * @name _createSearchPaginator
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} tabla Objeto que contiene la tabla
         * @param {object} settingsT Opciones del componente
         *
         */
        _createSearchPaginator(tabla, settingsT) {
            //buscar la paginación.
            if ($('#' + tabla[0].id + '_paginate').length === 1 && settingsT.json !== undefined && settingsT.json.total !== '0') {
                var liSearch = $('<li></li>').addClass('paginate_button page-item pageSearch searchPaginator align-self-center');
                var textPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'pagina', settingsT.json.total);
                var toPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'toPagina', settingsT.json.total);
                var input = $('<input/>').attr({
                    type: 'text',
                    size: '3',
                    value: settingsT.json.page,
                    maxlength: '3'
                }).addClass('ui-pg-input text-center');

                liSearch.append(textPagina);
                liSearch.append(input);
                liSearch.append(toPagina);

                $('#' + tabla[0].id + '_previous').after(liSearch);
                input.keypress(function (e) {
                    if (e.which === 13) // the enter key code
                    {
                        var page = parseInt(this.value);
                        if ($.rup_utils.isNumeric(page) && page > 0) {
                            tabla.dataTable().fnPageChange(page - 1);
                        }
                        return false;
                    }
                });
            } else {
                //Sacar un error
            }

            // Añade iconos para versiones moviles/tablets
            $('<i class="mdi mdi-page-first d-sm-none"></i>')
                .insertAfter($('#' + tabla[0].id + '_first')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function () {
                        return '<span></span>';
                    })
                );
            $('<i class="mdi mdi-chevron-left d-sm-none"></i>')
                .insertAfter($('#' + tabla[0].id + '_previous')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function () {
                        return '<span></span>';
                    })
                );
            $('<i class="mdi mdi-chevron-right d-sm-none"></i>')
                .insertAfter($('#' + tabla[0].id + '_next')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function () {
                        return '<span></span>';
                    })
                );
            $('<i class="mdi mdi-page-last d-sm-none"></i>')
                .insertAfter($('#' + tabla[0].id + '_last')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function () {
                        return '<span></span>';
                    })
                );

            // Inserta la lista de botones de paginacion al div anteriormente creado
            $('#' + tabla[0].id + '_paginate ul').detach().appendTo($('#' + tabla[0].id + '_paginate'));

        },

        /**
         * Limpia el filtro
         *
         * @name _clearFilter
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} options Opciones del componente
         *
         */
        _clearFilter(options) {
			$('#' + options.sTableId).triggerHandler('tableFilterBeforeReset', options);

			const $form = $('#' + options.sTableId + '_filter_form');
			jQuery.each($('input[rupType=autocomplete], select.rup_combo, select[rupType=select], input:not([rupType]), select:not([rupType]), input[rupType=date]', $form), function(index, elem) {
				const elemSettings = jQuery(elem).data('settings');

				if (elemSettings != undefined) {
					const elemRuptype = jQuery(elem).attr('ruptype');

					if (elemSettings.parent == undefined) {
						if (elemRuptype == 'autocomplete') {
							jQuery(elem).rup_autocomplete('setRupValue', '');
							elem.defaultValue = "";
						} else if (elemRuptype == 'combo') {
							jQuery(elem).rup_combo('reload');
							elem.defaulSelected = false;
						} else if (elemRuptype == 'select') {
							jQuery(elem).rup_select('clear');
							elem.defaultValue = "";
						} else if (elemRupType == 'date') {
							jQuery(elem).rup_select('clear');
							elem.defaultValue = "";
						}
					}
				} else {
					elem.defaultValue = "";
					elem.value = "";
				}
			});

			// Reinicia por completo los autocomplete porque sino siguen filtrando.
			$.fn.resetAutocomplete('hidden', options.filter.$filterContainer);

			// Si es Maestro-Detalle restaura el valor del maestro.
			if (options.masterDetail !== undefined) {
				const tableMaster = $(options.masterDetail.master).DataTable();
				const rowSelected = tableMaster.rows('.selected').indexes();
				const row = tableMaster.rows(rowSelected).data();
				const id = DataTable.Api().rupTable.getIdPk(row[0], tableMaster.context[0].oInit);
				$('#' + options.id + '_filter_masterPK').val('' + id);
			}

			options.filter.$filterSummary.html(' <i></i>');

			jQuery.each($('select.rup_combo', options.filter.$filterContainer), function(index, elem) {
				jQuery(elem).rup_combo('refresh');
			});

			$.rup_utils.populateForm([], options.filter.$filterContainer);
			
			$(this).DataTable().ajax.reload();

			$('#' + options.sTableId).triggerHandler('tableFilterAfterReset', options);
        },
        
        /**
         * Metodo que realiza la configuración del plugin filter del componente RUP DataTable.
         *
         * @name preConfigureFilter
         * @function
         *
         * @param {object} options - Parámetros de configuración del componente.
         *
         */
        _initFeedback(options) {
            var $self = this,
                tableId = $self[0].id,
                feedbackOpts = options.feedback;
                
            if (feedbackOpts && feedbackOpts.id && $('#' + feedbackOpts.id).length > 0) {
                feedbackOpts.$feedbackContainer = $('#' + feedbackOpts.id);
                feedbackOpts.$feedbackContainer.rup_feedback(feedbackOpts);
            } else {
                feedbackOpts.id = 'rup_feedback_' + tableId;
                feedbackOpts.$feedbackContainer = $('<div></div>').attr('id', feedbackOpts.id).insertBefore('#' + tableId);
                feedbackOpts.$feedbackContainer.rup_feedback(options.feedback);
            }
        },

        /**
         * Metodo que realiza la configuración del plugin filter del componente RUP DataTable.
         *
         * @name preConfigureFilter
         * @function
         *
         * @param {object} options - Parámetros de configuración del componente.
         *
         */
        _initFilter(options) {
            var $self = this,
                tableId = this[0].id,
                filterOpts = options.filter,
                toggleIcon1Tmpl, toggleLabelTmpl, filterSummaryTmpl, toggleIcon2Tmpl, $toggleIcon1, $toggleLabel, $filterSummary, $toggleIcon2;

            /*
             * Inicialización de los identificadores y componentes por defecto de los componentes de filtrado
             *
             * Se almacena la referencia de los diferentes componentes:
             *
             * $filterContainer : Contenedor del formulario de filtrado
             * $filterButton : Botón que realiza el filtrado
             * $cleanLink : Enlace para limpiar el formulario
             * $collapsableLayer : Capa que puede ser ocultada/mostrada
             * $toggleIcon1Id : Control que oculta muestra el fomulario
             * $filterSummary : Contenedor donde se especifican los criterios de filtrado
             */
            
            // Se define el selector del formulario de filtrado por preferencia "JSP > JS > Default"
            if (options.filterForm) {
                filterOpts.id = $(options.filterForm).attr('id');
            } else if (!filterOpts.id) {
                filterOpts.id = tableId + '_filter_form';
            }
            filterOpts.$filterContainer = jQuery('#' + filterOpts.id);
            filterOpts.filterToolbarId = (filterOpts.filterToolbar !== undefined ? filterOpts.filterToolbar : tableId + '_filter_toolbar');
            filterOpts.$filterToolbar = jQuery('#' + filterOpts.filterToolbarId);
            
            if (filterOpts.$filterContainer.length === 0) {
                if (options.filterMessage === true) {
                	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.filter.filterContainerError'));
                }
            } else if (filterOpts.$filterToolbar.length === 0) {
            	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.filter.filterToolbarError'));
            } else {
                filterOpts.collapsableLayerId = (filterOpts.collapsableLayerId !== undefined ? filterOpts.collapsableLayerId : tableId + '_filter_fieldset');
                filterOpts.toggleIcon1Id = (filterOpts.toggleIcon1 !== undefined ? filterOpts.toggleIcon1 : tableId + '_filter_toggle_icon1');
                filterOpts.toggleLabelId = (filterOpts.toggleLabelId !== undefined ? filterOpts.toggleLabelId : tableId + '_filter_toggle_label');
                filterOpts.filterSummaryId = (filterOpts.filterSummaryId !== undefined ? filterOpts.filterSummaryId : tableId + '_filter_summary');
                filterOpts.toggleIcon2Id = (filterOpts.toggleIcon2 !== undefined ? filterOpts.toggleIcon2 : tableId + '_filter_toggle_icon2');
                
                filterOpts.$filterButton = filterOpts.$filterContainer.find('#' + tableId + '_filter_filterButton');
                filterOpts.$filterButton.on('click', function () {
                    let customFiltrar = options.validarFiltrar;
                    if (typeof customFiltrar === "function" && customFiltrar(options)) {
                        return false;
                    }
                    $self._doFilter(options);
                });
                filterOpts.$clearButton = filterOpts.$filterContainer.find('#' + tableId + '_filter_cleanButton');
                filterOpts.$clearButton.on('click', function () {
                    $self._clearFilter(options);
                });
                
                if (filterOpts.showHidden === undefined || typeof filterOpts.showHidden !== "boolean") {
                	filterOpts.showHidden = false;
                }

                toggleIcon1Tmpl = "<span id='{0}' class='collapse_icon mdi mdi-arrow-down-drop-circle'></span>";
                toggleLabelTmpl = "<a id='{0}' class='text-primary text-decoration-underline font-weight-bold' href='#0'>{1}:</a>";
                filterSummaryTmpl = "<span id='{0}'></span>";
                toggleIcon2Tmpl = "<span id='{0}' class='collapse_icon_right mdi mdi-arrow-up-drop-circle'></span>";

                $toggleIcon1 = $($.rup_utils.format(toggleIcon1Tmpl, filterOpts.toggleIcon1Id));
                $toggleLabel = $($.rup_utils.format(toggleLabelTmpl, filterOpts.toggleLabelId, $.rup.i18n.base.rup_table.plugins.filter.filterCriteria));
                $filterSummary = $($.rup_utils.format(filterSummaryTmpl, filterOpts.filterSummaryId));
                $toggleIcon2 = $($.rup_utils.format(toggleIcon2Tmpl, filterOpts.toggleIcon2Id));

                filterOpts.$filterToolbar.append($toggleIcon1).append($toggleLabel).append($filterSummary).append($toggleIcon2);

                filterOpts.$filterContainer = jQuery('#' + filterOpts.id);

                filterOpts.$collapsableLayer = jQuery('#' + filterOpts.collapsableLayerId);

                filterOpts.$toggleIcon1 = $toggleIcon1;
                filterOpts.$toggleLabel = $toggleLabel;
                filterOpts.$filterSummary = $filterSummary;
                filterOpts.$toggleIcon2 = $toggleIcon2;
                
                // Se asigna a la tecla ENTER la función de búsqueda
                filterOpts.$collapsableLayer.on('keydown', function (evt) {
                    if (evt.keyCode === 13) {
                        let customFiltrar = options.validarFiltrar;
                        if (typeof customFiltrar === "function" && customFiltrar(options)) {
                            return false;
                        }
                        $self._doFilter(options);
                    }
                });
                
                filterOpts.showLayer = function(){
                    filterOpts.$collapsableLayer.show();
                    filterOpts.$toggleIcon1.removeClass('mdi-chevron-right').addClass('mdi-chevron-down');
                    filterOpts.$toggleIcon2.removeClass('mdi-arrow-up-drop-circle').addClass('mdi-arrow-down-drop-circle');
                    filterOpts.$filterToolbar.addClass('formulario_opened');
                    filterOpts.showHidden = false;
                };
                
                filterOpts.hideLayer = function(){
                    filterOpts.$collapsableLayer.hide();
                    filterOpts.$toggleIcon1.removeClass('mdi-chevron-down').addClass('mdi-chevron-right');
                    filterOpts.$toggleIcon2.removeClass('mdi-arrow-down-drop-circle').addClass('mdi-arrow-up-drop-circle');
                    filterOpts.$filterToolbar.removeClass('formulario_opened');
                    filterOpts.showHidden = true;
                };

                filterOpts.$filterToolbar.addClass('cursor_pointer').on({
                    'click': function () {
                        if (filterOpts.showHidden === false) {
                        	filterOpts.hideLayer();
                        } else {
                        	filterOpts.showLayer();
                        }
                    }
                });

                if (filterOpts.showHidden === true) {
                	filterOpts.hideLayer();
                } else {
                	filterOpts.showLayer();
                }

                // Validaciones 
                if (filterOpts.rules) {
                    filterOpts.$filterContainer.rup_validate({
                        feedback: options.feedback.$feedbackContainer,
                        rules: filterOpts.rules
                    });
                }
            }

        },
        /**
         * Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.
         *
         * @name showSearchCriteria
         * @function
         *
         */
        _showSearchCriteria() {
            var $self = this,
                settings = $('#' + $self[0].id).data('settings' + $self[0].id),
                searchString = ' ',
                label, numSelected,
                field, fieldId, fieldName, fieldValue,
                aux = settings.filter.$filterContainer.serializeArray(),
                searchForm = settings.filter.$filterContainer,
                filterMulticombo = [];
            var obj;
            let fieldIteration = 0;
            let isRadio;
            let isCheckbox;

            //añadir arbol
            var arboles = $('.jstree', settings.filter.$filterContainer);
            $.each(arboles, function (index, item) {
                obj = {};
                obj.name = $(item).attr('name');
                obj.value = $(item).rup_tree('getRupValue').length;
                obj.type = 'rup_tree';
                aux.push(obj);
            });

            let forEachDiv = (index, item) => {
                if (item.name === field.attr('id')) {
                    if (item.value != 0) {
                        fieldValue += ' = ' + item.value;
                    }
                } else {
                    fieldValue = '';
                }
            };

            for (var i = 0; i < aux.length; i++) {
                if (aux[i].value !== '' && $.inArray(aux[i].name, settings.filter.excludeSummary) !== 0) {
                    //CAMPO a tratar
                    field = $('[name=\'' + aux[i].name + '\']', searchForm);

                    //Comprobar si se debe excluir el campo
                    if ($.inArray(field.attr('id'), settings.filter.filterExclude) !== -1) {
                        continue;
                    }

                    //Seleccionar radio
                    if (field.length > 1) {
                        field = $('[name=\'' + aux[i].name + '\']:checked', searchForm);
                        switch (field.prop('type')) {
                        	case 'radio':
                                isRadio = true;
                        		break;
                        	case 'checkbox':
                        		isCheckbox = true;
                        		break;
                        }
                    }
                    //Omitir campos hidden
                    if ($(field).attr('type') === 'hidden') {
                        continue;
                    }

                    //ID del campo
                    fieldId = $(field[fieldIteration++]).attr('id');
                    
                    // Reinicia el contador porque ya se han iterado todos los campos
                    if (fieldIteration === field.length) {
                    	fieldIteration = 0;
                    }
                    
                    //ID para elementos tipo rup.combo
                    if ($(field).attr('ruptype') === 'combo' && field.next('.ui-multiselect').length === 0) {
                        fieldId += '-button';
                    }
                    //ID para elementos tipo rup.autocomplete
                    if ($(field).attr('ruptype') === 'autocomplete') {
                        fieldId = fieldId.substring(0, fieldId.indexOf('_label'));
                    }

                    //NAME
                    label = $('label[for^=\'' + fieldId + '\']', searchForm);
                    if (isRadio && settings.adapter === 'table_material') {
                    	fieldName = $('#' + fieldId).closest('.form-radioGroupMaterial').children('label').html();
                    	isRadio = false;
                    } else if (isCheckbox && settings.adapter === 'table_material') {
                		fieldName = $('#' + fieldId).closest('.form-checkboxGroupMaterial').children('label').html();
                    	if (searchString !== '' && searchString !== undefined && new RegExp(fieldName, 'i').test(searchString)) {
                    		searchString = searchString.replace(/.{2}$/,","); 
                    		fieldName = '';
                    	}
                    	isCheckbox = false;
                    } else if (label.length > 0) {
                        fieldName = label.html();
                    } else {
                        if ($(field).attr('ruptype') !== 'combo') {
                        	//Mirar si es masterDetail
                            fieldName = $('[name=\'' + aux[i].name + '\']', searchForm).prev('div').find('label').first().html();
                            if(settings.masterDetail !== undefined && settings.masterDetail.masterPrimaryKey === aux[i].name){
                            	let md = settings.masterDetail;
                            	fieldName = (md.masterPrimaryLabel !== undefined) ? md.masterPrimaryLabel : md.masterPrimaryKey;
                            }
                        } else {
                            // Buscamos el label asociado al combo
                            // Primero por id
                            var $auxField = $('[name=\'' + aux[i].name + '\']', searchForm),
                                $labelField;

                            $labelField = jQuery('[for=\'' + $auxField.attr('id') + '\']');

                            if ($labelField.length > 0) {
                                fieldName = $labelField.first().text();
                            } else {

                                fieldName = $('[name=\'' + aux[i].name + '\']', searchForm).parent().prev('div').find('label').first().html();

                            }
                        }
                    }
                    if (fieldName === null || fieldName === undefined) {
                        fieldName = '';
                    }

                    //VALUE
                    fieldValue = ' = ';

                    switch ($(field)[0].tagName) {
	                    case 'INPUT':
	                        if ($(field)[0].type === 'checkbox' || $(field)[0].type === 'radio') {
	                            fieldValue += label.html();
	                        } else {
	                        	//Mirar si es masterDetail
	                            
	                            if(settings.masterDetail !== undefined && settings.masterDetail.masterPrimaryKey === aux[i].name){
	                            	let md = settings.masterDetail;
	                            	fieldValue += (md.masterPrimaryNid) ? field.data('nid') : $(field).val();
	                            }else{
	                            	fieldValue += $(field).val();
	                            }
	                        }
	                        break;
	                        //Rup-tree
	                    case 'DIV':
	                        $.each(aux, forEachDiv);
	                        if (fieldValue === '') {
	                            fieldName = '';
	                        }
	                        break;
	                    case 'SELECT':
	                        if (field.next('.ui-multiselect').length === 0) {
	                            fieldValue = fieldValue + $('option[value=\'' + aux[i].value + '\']', field).html();
	                        } else {
	                            if ($.inArray($(field).attr('id'), filterMulticombo) === -1) {
	                                numSelected = field.rup_combo('value').length;
	                                if (numSelected !== 0) {
	                                    fieldValue += numSelected;
	                                } else {
	                                    fieldName = '';
	                                    fieldValue = '';
	                                }
	                                filterMulticombo.push($(field).attr('id'));
	                            } else {
	                                fieldName = '';
	                                fieldValue = '';
	                            }
	                        }
	                        break;
                    }

                    //Parsear NAME
                    var parseableChars = new Array(':', '=');
                    for (var j = 0; j < parseableChars.length; j++) {
                        if (fieldName !== '' && fieldName.indexOf(parseableChars[j]) !== -1) {
                            fieldName = fieldName.substring(0, fieldName.indexOf(parseableChars[j]));
                            break;
                        }
                    }

                    //Controlar rup.combo con valor vacío
                    while (fieldValue.indexOf('&amp;nbsp;') !== -1) {
                        fieldValue = fieldValue.replace('&amp;nbsp;', '');
                    }

                    //Si no tiene NAME sacar solo el valor
                    if (fieldName === '' && fieldValue.indexOf(' = ') !== -1) {
                        fieldValue = fieldValue.substring(2, fieldValue.length);
                    }


                    //Si no tiene NAME ni VALUE omitir
                    if (fieldName === '' && fieldValue.trim() === '') {
                        continue;
                    }
                    //Miramos si el elemento es es un checkbox o un radio, en caso de serlo revisamos fieldName para quitar los inputs
		            if($(field)[0].type === 'checkbox' || $(field)[0].type === 'radio'){
						let fValue=fieldValue.split('<span>')[1];
						fieldValue='<span> '+fValue;
	          		} 
                    searchString = searchString + fieldName + fieldValue + '; ';
                }
            }

            //Añadir criterios
            if (settings.multiFilter !== undefined && typeof settings.multiFilter.fncFilterName === "function") {
                searchString = settings.multiFilter.fncFilterName.bind($self, searchString)();
            }

            settings.filter.$filterSummary.html(' <i>' + searchString + '</i>');
        },

        /**
         * Crea un evento para mantener la multiseleccion, el seeker y el select ya que accede a bbdd.
         *
         * @name createEventSelect
         * @function
         *
         * @param {object} tabla - La configuración de la tabla.
         *
         */
        _createEventSelect(tabla) {
            tabla.on('draw.dtSelect.dt select.dtSelect.dt', function () { //Si lleva parametros es que estamos en la navegacion interna.
                var ctx = tabla.context[0];
                if (ctx.oInit.formEdit !== undefined && ctx.oInit.formEdit.$navigationBar !== undefined &&
                    ctx.oInit.formEdit.$navigationBar.funcionParams !== undefined && ctx.oInit.formEdit.$navigationBar.funcionParams.length > 0) {
                    var params = ctx.oInit.formEdit.$navigationBar.funcionParams;
                    //Si hay selectAll, comprobar la linea ya que puede variar al no tener ningún selected.Se recorre el json.
                    if (ctx.multiselection.selectedAll) {
                        var linea = -1;
                        if (params[3] !== undefined && (params[3] === 'prev' || params[3] === 'last')) {
                            linea = ctx.json.rows.length;
                            params[2] = DataTable.Api().editForm.getLineByPageSelectedReverse(ctx, linea);
                        } else {
                            if (params[2] !== undefined && params[2] > 0) {
                                linea = params[2] - 1;
                            }
                            params[2] = DataTable.Api().editForm.getLineByPageSelected(ctx, linea); //Se inicia en -1 para que coja desde la primera linea.next y prev.
                        }

                    }
                      
                    $.when(DataTable.editForm.fnOpenSaveDialog(params[0], params[1], params[2], ctx.oInit.formEdit.customTitle)).then(function () {
                    	var row = ctx.json.rows[params[2]];
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
        	                indexInArray = (Number(ctx.json.page) - 1) * ctx.aBaseJson.length;
        	                indexInArray = indexInArray + params[2];
        	            }
        	            
        	            DataTable.Api().editForm.updateDetailPagination(ctx, indexInArray + 1, numTotal);
                    });
                }
            });
        },
        /**
         * Metodo que inicialida las propiedades para el multiselect y el Select.
         *
         * @name initializeMultiselectionProps
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         *
         */
        _initializeMultiselectionProps(ctx) {

            var multi = {};
            // Se almacenan en los settings internos las estructuras de control de los registros seleccionados
            if (multi.multiselection === undefined) {
                multi.multiselection = {};
            }
            // Flag indicador de selección de todos los registros
            multi.multiselection.selectedAll = false;
            // Numero de registros seleccionados
            multi.multiselection.numSelected = 0;
            // Propiedades de selección de registros
            multi.multiselection.selectedRowsPerPage = [];
            //$self.multiselection.selectedLinesPerPage = [];
            //$self.multiselection.selectedRows = [];
            multi.multiselection.selectedIds = [];
            multi.multiselection.lastSelectedId = '';
            //$self.multiselection.selectedPages = [];
            // Propiedades de deselección de registros
            multi.multiselection.deselectedRowsPerPage = [];
            //$self.multiselection.deselectedLinesPerPage = [];
            //$self.multiselection.deselectedRows = [];
            multi.multiselection.deselectedIds = [];
            multi.multiselection.accion = ''; //uncheckAll,uncheck
            //$self.multiselection.deselectedPages = [];
            $('#contextMenu1 li.context-menu-icon-uncheck').addClass('disabledButtonsTable');
            $('#contextMenu1 li.context-menu-icon-uncheck_all').addClass('disabledButtonsTable');
            // Desmarcamos el check del tHead
            $('#inputSelectTableHead' + ctx.sTableId).prop('checked', false);

            DataTable.Api().rupTable.selectPencil(ctx, -1);
            if (ctx.multiselection === undefined) {
                ctx.multiselection = {};
            }
            ctx.multiselection = multi.multiselection;
        },
        _createTooltip(id) {
            if (id !== undefined && id.text() !== undefined && id.text() !== '') {
                id.rup_tooltip({
                    content: {
                        text: id.text()
                    },
                    show: {
                        event: 'mouseover'
                    },
                    position: {
                        viewport: $(window),
                        adjust: {
                            method: 'flip'
                        }
                    }

                });
            }
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_table('extend', {
        _init: function (args) {
            global.initRupI18nPromise.then(() => {
                var $self = this;

                if (args[0].buttons != undefined && args[0].buttons.contextMenu === undefined) {
                    args[0].buttons.contextMenu = true;
                }
                
                //si es maestro detalle el feedback se queda por defecto con goToTop a false.
                if(args[0].masterDetail !== undefined){
                	$.fn.rup_table.defaults.feedback.gotoTop = false;
                }

                var options = $.extend(true, {}, $.fn.rup_table.defaults, $self[0].dataset, args[0]);
                
                //Se valida que se haya definido una ordenacion de columnas, por defecto 
                if(!options.defaultOrder){
                	options.order = [];
                 }

                $self.triggerHandler('tableBeforeInit',options);

                // Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
                $self.attr('ruptype', 'table');
                $self.triggerHandler('tableInit',options);
                if (args[0].primaryKey !== undefined) {
                    options.primaryKey = args[0].primaryKey.split(';');
                }
                
                //Si vienen los columnsDefs con columnas ocultas,se asegura la clase para que no se vean.
                if( options.columnDefs !== undefined &&  options.columnDefs.length > 0){
                	$.each(options.columnDefs, function () {
	                    if(this.visible === false){
	                    	this.className = 'never';
	                    }
	                });
                }

                //Comprobar plugin dependientes
                if (options.multiSelect !== undefined) {
                    let clase = 'select-checkbox';
                    if (options.multiSelect.hideMultiselect) {
                        clase = 'select-checkbox never';
                    }
                    options.columnDefs.unshift({
                        orderable: false,
                        className: clase,
                        targets: 0,
                        render: function () {
                            return '<div class="checkbox-material checkbox-material-inline"><input type="checkbox"><label></label></div>';
                        }
                    });
                    //Modulo incompatible
                    options.select = undefined;
                }

                if (options.formEdit !== undefined) {
                    options.inlineEdit = undefined;
                }

                if (options.filter === undefined) {
                    options.multiFilter = undefined;
                }

                // getDefault multifilter
                if (options.multiFilter !== undefined && options.multiFilter.getDefault === undefined) {
                    var usuario;
                    if (options.multiFilter.userFilter != null) {
                        usuario = options.multiFilter.userFilter;
                    } else {
                        usuario = window.LOGGED_USER;
                    }
                    var ctx = {};
                    ctx.oInit = options;
                    ctx.sTableId = $self[0].id;
                    $.rup_ajax({
                        url: options.urlBase +
                        	options.multiFilter.url + '/getDefault?filterSelector=' +
                            options.multiFilter.idFilter + '&user=' +
                            usuario,
                        type: 'GET',
                        dataType: 'json',
                        showLoading: false,
                        contentType: 'application/json',
                        //async : false,
                        complete: function () {
                            $('#' + ctx.sTableId).triggerHandler('tableMultiFilterCompleteGetDefaultFilter',ctx);
                        },
                        success: function (data) {
                            if (data != null) {
                                var valorFiltro = JSON.parse(data.filterValue);


                                DataTable.Api().multiFilter.fillForm(valorFiltro, ctx);
                                $self._doFilter(data);
                                $(options.filter.$filterSummary, 'i').prepend(data.filterName + '{');
                                $(options.filter.$filterSummary, 'i').append('}');

                            }
                            $('#' + ctx.sTableId).triggerHandler('tableMultiFilterSuccessGetDefaultFilter',ctx);
                        },
                        error: function () {
                            $('#' + ctx.sTableId).triggerHandler('tableMultiFilterErrorGetDefaultFilter',ctx);
                        }
                    });
                }

                if (args[0].responsive === undefined) { //si el usuario no cambia el selector
                    var responsive = {
                        details: {
                            type: 'column',
                            target: 'td span.openResponsive'
                        },
                        selectorResponsive: 'td span.dtr-data'
                    };

                    options.responsive = responsive;
                }

                // Se añaden las clases CSS de los títulos y flechas de las columnas.
                const displayStyle = {
                	'block': 'd-block',
                	'inline': 'd-inline ml-1',
                	'none': 'd-none',
                	'default': 'd-block'
                };
                const arrowsStyle = displayStyle[options.columnOrderArrows.display] || displayStyle['default'];
                $.each($('#' + $self[0].id + ' thead th'), function () {
                	const $this = $(this);
                	
                	// Reubicar título de la columna.
                	const $columnTitle = $('<span></span>').addClass('d-inline').text($this.text());
                	
                	// Si se activó la opción, se mostrarán únicamente las flechas que estén ordenando los datos.
                	if (options.columnOrderArrows.showOnlyActive) $this.addClass('sorting_active_only');
                	
                	// Crear elementos para las flechas de ordenación.
                	const $columnDownArrow = $('<span></span>').addClass('mdi mdi-arrow-down mr-2 mr-xl-0');
                	const $columnUpArrow = $('<span></span>').addClass('mdi mdi-arrow-up');
                	const $columnArrowsContainer = $('<div></div>').addClass(arrowsStyle).append($columnDownArrow, $columnUpArrow);

                	$this.text('');
                	$this.append($columnTitle);
                	$this.append($columnArrowsContainer);
                });

                // Se completan las opciones de configuración del componente
                $self._initOptions(options);

                // Se inicializa el feedback del componente
                $self._initFeedback(options);

                // Se inicializa el filtro de la tabla
            	let filterOptions = args[0].filter;
            	let hasOptions = false;
            	
            	if (filterOptions !== undefined && filterOptions !== 'noFilter') {
            		hasOptions = true;
            	}
            	
                // Añadir filter por defecto o el definido por el usuario
                $.fn.rup_table.defaults.filter = {
                    id: hasOptions ? filterOptions.id : $self[0].id + '_filter_form',
                    filterToolbar: hasOptions ? filterOptions.filterToolbar : $self[0].id + '_filter_toolbar',
                    collapsableLayerId: hasOptions ? filterOptions.collapsableLayerId : $self[0].id + '_filter_fieldset'
                };
                
                // Gestionar la inicialización del formulario de filtrado
                if (filterOptions !== 'noFilter') {
                	// En caso de que no haya sido definido por el usuario, se usa el por defecto
                	if (filterOptions === undefined) {
                		options.filter = $.fn.rup_table.defaults.filter;
                	}
                	$self._initFilter(options);
                } else if (filterOptions === 'noFilter' && options.filterForm !== undefined) {
                	// Garantizar la posibilidad del envío del parámetro HDIV_STATE cuando el formulario de filtrado no esté habilitado
                	options.filter = {};
                	if (options.filterForm) {
                		options.filter.id = $(options.filterForm).attr('id');
                    } else {
                    	options.filter.id = $self[0].id + '_filter_form';
                    }
                	options.filter.$filterContainer = jQuery('#' + options.filter.id);
                } else {
                	// Para casos en los que no se quiera usar el formulario de filtrado y Hdiv no esté activado
                	args[0].filter = undefined;
                }

                if (options.loadOnStartUp !== undefined && !options.loadOnStartUp) {
                    options.deferLoading = 0;
                }

                var tabla = $self.DataTable(options);

                options.sTableId = $self[0].id;
                
                // Cuando el seeker esté activo, se mueve bajo la cabecera de la tabla (necesario desde DataTables 1.10.25).
                if (options.seeker?.activate) {
                	$('#' + options.sTableId + ' tfoot').insertBefore('#' + options.sTableId + ' tbody');
                }
                
                $self._initializeMultiselectionProps(tabla.context[0]);
                
               if(options.createTooltipHead !== false){
	                //Crear tooltips cabecera;
	                $.each($('#' + $self[0].id + ' thead th'), function () {
	                    $self._createTooltip($(this));
	                });
               }
                tabla.on('draw', function (e, settingsTable) {
                    var ctx = tabla.context[0];
                    
                    if (options.searchPaginator) { //Mirar el crear paginador
                        $self._createSearchPaginator($(this), settingsTable);
                        // Deshabilitamos los botones de paginacion si es necesario
                        $.each($('ul.pagination li.recolocatedPagination_iconButton'), function () {
                            if ($(this).hasClass('disabled')) {
                                $('#' + this.id + ' a').prop('tabindex', '-1');
                            } else {
                                $('#' + this.id + ' a').prop('tabindex', '0');
                            }
                        });
                        //Si el seeker esta vacio ocultarlo
                        if (settingsTable.seeker !== undefined &&
                            settingsTable.seeker.search !== undefined && settingsTable.seeker.search.$searchRow !== undefined) {
                            if (settingsTable._iRecordsDisplay > 0) {
                                settingsTable.seeker.search.$searchRow.show();
                            } else {
                                settingsTable.seeker.search.$searchRow.hide();
                            }
                        }
                    }

                    if (options.select !== undefined || options.multiSelect !== undefined) { //AL repintar vigilar el select.
                        if (options.select !== undefined) { //AL repintar vigilar el select.
                            if (settingsTable.select !== undefined && settingsTable.select.selectedRowsPerPage !== undefined) {
                                //viene de la navegacion buscar el id.
                                var line = 0;
                                if (settingsTable.select.selectedRowsPerPage.cambio === 'prev' || settingsTable.select.selectedRowsPerPage.cambio === 'last') {
                                    line = ctx.json.rows.length - 1;
                                }

                                // Se añaden los parametros para que funcione bien la paginación
                                ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT', tabla, line, settingsTable.select.selectedRowsPerPage.cambio];

                                ctx.multiselection.selectedRowsPerPage = [];
                                var rowSelectAux = ctx.json.rows[line];
                                var id = DataTable.Api().rupTable.getIdPk(rowSelectAux, ctx.oInit);
                                ctx.multiselection.selectedRowsPerPage.push({
                                    line: line,
                                    page: ctx.select.selectedRowsPerPage.page,
                                    id: id
                                });
                                settingsTable.select.selectedRowsPerPage = undefined;
                                var numTotal = ctx.json.recordsTotal;
                                var index = (Number(ctx.json.page) - 1) * ctx.aBaseJson.length;
                                index = index + line + 1;
                                DataTable.Api().editForm.updateDetailPagination(ctx, index, numTotal);
                            }
                            DataTable.Api().select.drawSelectId(tabla.context[0]);
                            if (tabla.context[0].oInit.inlineEdit !== undefined) {
                                DataTable.Api().inlineEdit.addchildIcons(tabla.context[0]);
                            }
                        }
                        if (settingsTable.seeker !== undefined &&
                            settingsTable.seeker.search !== undefined) {
                            if (settingsTable.seeker.search.funcionParams !== undefined && settingsTable.seeker.search.funcionParams.length > 0 && //Paginar para el seek y que siempre selecione
                                ctx.json.page !== settingsTable.seeker.search.funcionParams[settingsTable.seeker.search.pos].page && ctx.fnRecordsTotal() > 0) { //ver si hay cambio de pagina.
                                DataTable.Api().seeker.selectSearch(tabla, ctx, settingsTable.seeker.search.funcionParams);
                            }
                        }
                    }
                    
                    if(options.createTooltipBody !== false){
	                    //Crear tooltips tds;
	                    $.each($('#' + settingsTable.sTableId + ' tbody td'), function () {
	                        $self._createTooltip($(this));
	                    });
                    }

                    if (settingsTable.inlineEdit !== undefined) {
                        DataTable.Api().inlineEdit.drawInlineEdit(tabla, ctx);
                        if (ctx.oInit.inlineEdit.rowDefault !== undefined) { //editando cuando se pagina
                            if (ctx.oInit.inlineEdit.rowDefault.actionType === 'CLONE') {
                                DataTable.Api().inlineEdit.cloneLine(tabla, ctx, ctx.oInit.inlineEdit.rowDefault.line);
                            } //else{
                            DataTable.Api().inlineEdit.editInline(tabla, ctx, ctx.oInit.inlineEdit.rowDefault.line, ctx.oInit.inlineEdit.rowDefault.actionType === 'CLONE' ? 'POST' : ctx.oInit.inlineEdit.rowDefault.actionType);
                            var count = tabla.columns().responsiveHidden().reduce(function (a, b) {
                                return b === false ? a + 1 : a;
                            }, 0);
                            if (count > 0) {
                                ctx.oInit.inlineEdit.rowDefault = 'cambioEstado';
                            } else {
                                ctx.oInit.inlineEdit.rowDefault = undefined;
                            }
                            //	}
                        } else if (ctx.oInit.select !== undefined && ctx.multiselection.selectedRowsPerPage.length > 0) {
                            var rowsBody = $(ctx.nTBody);
                            var $tr = $('tr:nth-child(1)', rowsBody);
                            if (DataTable.Api().rupTable.getIdPk(ctx.json.rows[0], ctx.oInit) === ctx.multiselection.selectedRowsPerPage[0].id) {
                                $tr.addClass('selected tr-highlight');
                            }
                        }
                    }

                    if (settingsTable.oInit.formEdit !== undefined){
                    	if(	settingsTable.oInit.responsive !== undefined && settingsTable.oInit.responsive.selectorResponsive !== undefined) { //si el selector es por defecto.selectorResponsive: 'td span.dtr-data'
                    		DataTable.Api().editForm.addchildIcons(settingsTable);
                    	}
                    	if(typeof settingsTable.oInit.formEdit.detailForm === 'object' && ctx.oInit.formEdit.detailForm.isOpen !== undefined && ctx.oInit.formEdit.detailForm.isOpen() ){//si dialog esta abierto
                    		// Ejecutar fixComboAutocompleteOnEditForm como callback para garantizar la actualización de las filas.
                    		DataTable.Api().editForm.fixComboAutocompleteOnEditForm(ctx);
                    	}
                    }
                    if (options.inlineEdit === undefined && options.formEdit === undefined) {
                        DataTable.Api().editForm.addchildIcons(settingsTable);
                    }

                });

                tabla.on('responsive-resize.dt', function (event, dt) {
                    let ctx = dt.context[0];

                    if (ctx.oInit.formEdit !== undefined && ctx.oInit.responsive !== undefined &&
                        ctx.oInit.responsive.selectorResponsive !== undefined) { //si el selector es por defecto.selectorResponsive: 'td span.dtr-data'
                        DataTable.Api().editForm.addchildIcons(ctx);
                    }

                    if (options.inlineEdit === undefined && options.formEdit === undefined) {
                        DataTable.Api().editForm.addchildIcons(ctx);
                    }
                });

                tabla.on('destroy', function (e, settingsTable) {
                    if(options.filter && options.filter.$filterToolbar){
                        options.filter.$filterToolbar.empty();
                    }
                    $('#' + settingsTable.sTableId + '_detail_navigation').empty();

                });
                
                // En caso de reordenación se revisa para mantener los iconos.
                tabla.on('column-reorder', function (e, settings, details) {
                	if (settings._multiSelect !== undefined && settings.multiselection.numSelected > 0) {
                		tabla.ajax.reload();
                	} else {
                		DataTable.Api().editForm.addchildIcons(settings);
                	}		
                });

                if (options.inlineEdit !== undefined) {
                    DataTable.Api().inlineEdit.onResponsiveResize(tabla);
                }


                if (options.multiSelect !== undefined || options.select !== undefined) {
                    $self._createEventSelect(tabla);
                }

                // Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
                $self.data('settings' + $self[0].id, options);

                $self.triggerHandler('tableAfterInit',tabla.context[0]);

                if (options.inlineEdit === undefined && options.formEdit === undefined &&
                    options.multiselect === undefined && options.select === undefined) {
                    $(window).on('resize.dtr', DataTable.util.throttle(function () { //Se calcula el responsive
                        DataTable.Api().editForm.addchildIcons(tabla.context[0]);
                    }));
                }

                //Se audita el componente
                $.rup.auditComponent('rup_table', 'init');

            }).catch((error) => {
                console.error('Error al inicializar el componente:\n', error);
            });
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_table.defaults = {
        foobar: false,
        headerContextMenu: {
            show: true,
            selectAllPage: true,
            deselectAllPage: true,
            separator: true,
            selectAll: true,
            deselectAll: true,
            items: {}
        },
        fixedHeader: {
            header: false,
            footer: true
        },
        feedback: {
            closeLink: true,
            delay: 2000,
            block: false
        },
        responsive: {
            details: {
                type: 'column',
                target: 'tr'
            },
            selectorResponsive: 'td span.dtr-data'
        },
        dom: //i: Info, t: table, p:pagination, r: procesing , l:length 
            't<"container-fluid paginationContainer"' +
            '<"row"' +
            '<"col-6 order-3 text-right align-self-center col-sm-5 order-sm-2 col-xl-2 order-xl-1 text-xl-left">' +
            '<"order-1 align-self-center col-sm-12 order-sm-1 col-xl-7 order-xl-2"p>' +
            '<"col-12 order-2 text-center align-self-center col-sm-2 order-sm-3 col-xl-1 p-0"l>' +
            '<"col-6 order-4 text-left align-self-center col-sm-5 order-sm-4 col-xl-2 text-xl-center"i>' +
            '>' +
            '>' +
            'r',
        multiplePkToken: '~',
        primaryKey: ['id'],
        blockPKeditForm: true,
        enableDynamicForms: true,
        searchPaginator: true,
        pagingType: 'full',
        createdRow: function (row) {
            var ctx = $('#' + this[0].id).rup_table('getContext');

            if (ctx.oInit.select != undefined || (ctx.oInit.multiSelect != undefined && ctx.oInit.multiSelect.hideMultiselect)) {
                $(row).attr('tabindex', '0');
            }
        },
        columnDefs: [],
        columnOrderArrows: {
        	showOnlyActive: false,
        	display: 'block'
        },
        adapter: 'table_material',
        order: [
            [1, 'asc']
        ],
        ordering: true,
        defaultOrder: true,
        showMultiSelectedZero: true,
        filterMessage: true,
        noEdit: false
    };

}));
