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
     * Configura el componente editForm para su inicialización
     *
     * @name preConfigure
     * @function
     * @since UDA 5.0.0 // Table 1.0.0
     *
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.editForm.preConfigure = function (dt) {
        var ctx = dt.settings()[0];
        var init = ctx.oInit.multiSelect;
        var defaults = DataTable.defaults.multiSelect;

        if (init === undefined) {
            init = defaults;
        }

        // DetailForm se convierte en función y se inicializan los botones
        ctx.oInit.formEdit.detailForm = $(ctx.oInit.formEdit.detailForm);
        ctx.oInit.formEdit.idForm = ctx.oInit.formEdit.detailForm.find('form').first();
        ctx.oInit.formEdit.id = ctx.oInit.formEdit.detailForm[0].id.replace('_detail_div', '');
        if (ctx.oInit.formEdit.detailForm !== undefined &&
            $('body').find('[aria-describedby=\'' + ctx.oInit.formEdit.detailForm[0].id + '\']').length > 0) {
            $('body').find('[aria-describedby=\'' + ctx.oInit.formEdit.detailForm[0].id + '\']').remove();
        }

        // Obtiene el adapter y crea la barra de navegación en función de si la multiselección está o no activada
        if (ctx.oInit.multiSelect === undefined) {
            _callNavigationSelectBar(dt);
        } else {
            _callNavigationBar(dt);
        }
        // Inicializa el paginador del formulario de edición
        _updateDetailPagination(ctx, 1, 1);

        // Añade el botón de cancelar
        ctx.oInit.formEdit.buttoCancel = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_cancel');
        ctx.oInit.formEdit.buttoCancel.on('click', function () {
            _cancelPopup(ctx);
            // Cierra el dialog
            ctx.oInit.formEdit.detailForm.rup_dialog('close');
        });
        var idRow;
        var rowsBody = $(ctx.nTBody);
        // Gestiona la creación del evento de doble click para editar una fila
        if (ctx.oInit.multiSelect !== undefined || ctx.oInit.select !== undefined) {
            var sel = ctx.oInit.multiSelect;
            if (sel === undefined) {
                sel = ctx.oInit.select;
            }
            // Propiedad que no genera el evento de doble click en caso de existir y tener un valor true
            if (!sel.deleteDoubleClick) {
                rowsBody.on('dblclick.DT keypress', 'tr:not(.group)', function (e) {
                    // Sólo selecciona si se pulsa sobre el enter o se hace click izquierdo con el ratón
                    if (e.type == 'keypress' && e.which == 13 || e.type === 'dblclick') {
                        idRow = this._DT_RowIndex;
                        // Añadir la selección del mismo
                        if (ctx.oInit.multiSelect !== undefined) {
                            dt['row'](idRow).multiSelect();
                        } else {
                            $('tr', rowsBody).removeClass('selected tr-highlight');
                            DataTable.Api().select.selectRowIndex(dt, idRow, true);
                        }
                        _getRowSelected(dt, 'PUT');
                        DataTable.editForm.fnOpenSaveDialog('PUT', dt, idRow, ctx.oInit.formEdit.customTitle);
                        $('#' + ctx.sTableId).triggerHandler('tableEditFormClickRow',ctx);
                    }
                });
            }
        }
        
        // Establece el valor de las propiedades del formulario de edición.
        ctx.oInit.formEdit.loadSpinner = typeof ctx.oInit.formEdit.loadSpinner === 'boolean' ? ctx.oInit.formEdit.loadSpinner : true;
        
        ctx.oInit.formEdit.detailForm.settings = {
            type: ctx.oInit.formEdit.type !== undefined ? ctx.oInit.formEdit.type : $.rup.dialog.DIV,
            width: ctx.oInit.formEdit.width !== undefined ? ctx.oInit.formEdit.width : 569,
            saveDialog: (ctx.oInit.formEdit.confirmDialogs !== undefined && ctx.oInit.formEdit.confirmDialogs.saveDialog !== undefined) ? ctx.oInit.formEdit.confirmDialogs.saveDialog : true,
            cancelDialog: (ctx.oInit.formEdit.confirmDialogs !== undefined && ctx.oInit.formEdit.confirmDialogs.cancelDialog !== undefined) ? ctx.oInit.formEdit.confirmDialogs.cancelDialog : true,
            deleteDialog: (ctx.oInit.formEdit.confirmDialogs !== undefined && ctx.oInit.formEdit.confirmDialogs.deleteDialog !== undefined) ? ctx.oInit.formEdit.confirmDialogs.deleteDialog : true
        };
        
        // Calcula el responsive
        $(window).on('resize.dtr', DataTable.util.throttle(function () {
            _addChildIcons(ctx);
        }));
    };
    
    /**
     * Inicializa el componente editForm
     *
     * @name init
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ctx - Contexto del Datatable.
     *
     */
    DataTable.editForm.init = function (ctx) {
    	// Capturar evento de cierre
        ctx.oInit.formEdit.detailForm.on('dialogbeforeclose', function (event) {
            if (event.originalEvent !== undefined) { //el evento es cerrado por el aspa
                ctx.oInit.formEdit.okCallBack = false;
            }
            // Si es igual no se debe hacer nada
            var formSerializado = _editFormSerialize(ctx.oInit.formEdit.idForm, ctx.oInit.formEdit.serializerSplitter);
            if (ctx.oInit.formEdit.dataOrigin === formSerializado || !ctx.oInit.formEdit.detailForm.settings.cancelDialog) {
                _cancelPopup(ctx);
                return true;
            }
            if (ctx.oInit.formEdit.dataOrigin !== formSerializado && !ctx.oInit.formEdit.okCallBack) {
                $.rup_messages('msgConfirm', {
                    message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.saveAndContinue'),
                    title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
                    OKFunction: function () {
                        _cancelPopup(ctx);
                        ctx.oInit.formEdit.okCallBack = true;
                        ctx.oInit.formEdit.detailForm.rup_dialog('close');
                        $('#' + ctx.sTableId).triggerHandler('tableMessageOk', ctx);
                    },
                    CANCELFunction: function () {
                        ctx.oInit.formEdit.okCallBack = false;
                        $('#' + ctx.sTableId).triggerHandler('tableMessageCancel', ctx);
                    }
                    ,
                    CLOSEFunction: function () {
                        ctx.oInit.formEdit.okCallBack = false;
                        $('#' + ctx.sTableId).triggerHandler('tableMessageClose', ctx);
                    }
                });
            }
            
            // En caso de aceptar, se cierra y se limpia
            if (!ctx.oInit.formEdit.okCallBack || ctx.oInit.formEdit.okCallBack === undefined) {
                return false;
            }
        });
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

    function _cancelPopup(ctx) {
        ctx.oInit.formEdit.okCallBack = false;
        var feedback = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_feedback');

        //Despues de cerrar
        //Se limpia los elementos.
        if (ctx.oInit.formEdit.idForm.find('.error').length > 0) {
            ctx.oInit.formEdit.idForm.rup_validate('resetElements');
            //nos aseguramos de borrar todo
            ctx.oInit.formEdit.idForm.find('.error').not('input').remove();
            ctx.oInit.formEdit.idForm.find('.rup-validate-field-error').removeClass('rup-validate-field-error');
        }


        //Se cierran los mensajes del feedback
        if (feedback[0].className !== '') {
            feedback.rup_feedback('hide',0);
        }
    }
    
    /**
     * Función que añade las validaciones a un formulario.
     *
     * @name addValidation
     * @function
     * @since UDA 5.0.0 // Table 1.0.0
     *
     * @param {object} ctx - Contexto del Datatable.
     *
     */
    function _addValidation(ctx) {
        let idTableDetail = ctx.oInit.formEdit.detailForm;
        let feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
        let validaciones;
        if (ctx.oInit.formEdit.validate !== undefined) {
        	validaciones = ctx.oInit.formEdit.validate.rules;
        }
        
        if (feed.length === 0) {
        	feed = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
        }
        
    	feed.rup_feedback(ctx.oInit.feedback);
          
        let propertiesDefault = {
            liveCheckingErrors: false,
            showFieldErrorAsDefault: true,
            showErrorsInFeedback: true,
            showFieldErrorsInFeedback: true
        };
        
        let propertiesValidate = $.extend(true, {}, propertiesDefault, ctx.oInit.formEdit.propertiesValidate);
        propertiesValidate.feedback = feed;
        propertiesValidate.rules = validaciones;
        
        ctx.oInit.formEdit.idForm.rup_validate(propertiesValidate);
    }
    
    /**
     * Función que gestiona la carga del diálogo de añadir o editar.
     *
     * @name loadSaveDialogForm
     * @function
     * @since UDA 5.0.0 // Table 1.0.0
     *
     * @param {object} ctx - Contexto de la tabla.
     * @param {string} actionType - Acción a ajecutar en el formulario para ir al controller, basado en REST.
     * @param {object} row - Datos para alimentar los campos del formulario.
     *
     * @return {object}
     */
    function _loadSaveDialogForm(ctx, actionType, row) {
    	var idForm = ctx.oInit.formEdit !== undefined ? ctx.oInit.formEdit.idForm : undefined;
    	
    	// Servirá para saber si la última llamada a editForm fue para añadir, editar o si aún no ha sido inicializado
    	let lastAction = ctx.oInit.formEdit.actionType;
		
		// Botón de guardar y continuar
        let buttonContinue = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_save_repeat');
        
        // En caso de ser clonado el method ha de ser POST
        if (actionType === 'CLONE') {
            actionType = 'POST';
            buttonContinue.hide();
        } else {
            buttonContinue.show();
        }
    	
    	// Si el usuario ha activado los formularios dinámicos y la última acción no es la misma que la actual, es necesario volver a obtener el formulario
		if (ctx.oInit.enableDynamicForms && lastAction !== actionType) {
			// Preparar la información a enviar al servidor. Como mínimo se enviará el actionType.
			const defaultData = {'actionType': actionType};
			let data = ctx.oInit.formEdit.data !== undefined ? $.extend({}, defaultData, ctx.oInit.formEdit.data) : defaultData;
			
			$('#' + ctx.sTableId).triggerHandler('tableEditFormBeforeLoad', ctx);
			
			return $.post(ctx.oInit.formEdit.url !== undefined ? ctx.oInit.formEdit.url : ctx.oInit.urlBase + '/editForm', data, function (form) {				
				// Guardar anterior formulario para poder comprobarlo con el recién recibido
				let tempForm = idForm !== undefined ? idForm : undefined;
				
				// Guardar referencia del formulario recibido
				let receivedForm = $(form).find("form").addBack('form');
				
				// Si existe un formulario previo con el mismo identificador que el recibido, se elimina
				if (tempForm !== undefined && tempForm.length === 1 && tempForm.attr("id") === receivedForm.attr("id")) {
					tempForm.remove();
				}
				
				// Insertar formulario recibido dentro del contenedor especificado
				let formContainerID = '#' + ctx.sTableId + '_detail_form_container';
				$(formContainerID).prepend(receivedForm);
				
				ctx.oInit.formEdit.actionType = actionType;
				ctx.oInit.formEdit.idForm = $(ctx.oInit.formEdit.detailForm).find('form').first();
				
				// Si el diálogo no ha sido inicializado, se inicializa
				if (lastAction === undefined) {
					$('#' + ctx.sTableId).triggerHandler('tableEditFormInitialize', ctx);
				}
				
				// Detectar componentes RUP e inicializarlos
				_formInitializeRUP(ctx, row, $(formContainerID + ' #' + receivedForm.attr("id")));
				
				// Añadir validaciones
				_addValidation(ctx);
								
				$('#' + ctx.sTableId).triggerHandler('tableEditFormAfterLoad', ctx);
	    	}, 'html');
        } else if (!ctx.oInit.enableDynamicForms && lastAction === undefined) {
        	// Entrará por aquí cuando los formularios dinámicos hayan sido desactivados (comportamiento por defecto) y se necesite inicializar el formulario por ser la primera llamada
        	ctx.oInit.formEdit.actionType = actionType;
        	$.when($('#' + ctx.sTableId).triggerHandler('tableEditFormInitialize', ctx)).then(function () {
        		let deferred = $.Deferred();
        		
        		// Detectar componentes RUP e inicializarlos
        		_formInitializeRUP(ctx, row, idForm);
				
				// Añadir validaciones
				_addValidation(ctx);
				
            	deferred.resolve();
        		return deferred.promise();
        	});
        } else {
        	// Para cuando el formulario actual sigue siendo válido (ya sea dinámico o no)
        	let deferred = $.Deferred();
        	ctx.oInit.formEdit.actionType = actionType;
        	deferred.resolve();
    		return deferred.promise();
        }
    }
    
    /**
     * Detecta los componentes RUP del formulario y los inicializa.
     *
     * @name formInitializeRUP
     * @function
     * @since UDA 5.0.2 // Table 1.0.0
     *
     * @param {object} ctx - Contexto de la tabla.
     * @param {object} row - Datos para alimentar los campos del formulario.
     * @param {object} form - Formulario en el que hay que inicializar los componentes.
     */
    function _formInitializeRUP(ctx, row, form) {
    	if (ctx.oInit.colModel !== undefined && (ctx.oInit.multiSelect !== undefined || ctx.oInit.select !== undefined)) {
    		$.each(ctx.oInit.colModel, function (key, column) {
    			const element = form.find('[name="' + column.name + '"]');
    			// Comprobar que es un componente RUP y editable. En caso de no ser editable, se añade la propiedad readonly.
    			if (column.rupType && column.editable) {
    				if (column.editoptions !== undefined) {
    					if (column.rupType === 'combo') {
    						// Si se recibe una fila con valores, se establece el valor del campo correspondiente como el registro seleccionado en el combo.
    						if (row !== undefined) {
    							column.editoptions.selected = column.name.includes('.') ? $.fn.flattenJSON(row)[column.name] : row[column.name];    							
    						}
    						// Cuando no se haya definido un elemento al que hacer el append del menú del combo, se hace al "body" para evitar problemas de CSS.
    						if (column.editoptions.appendTo === undefined) {
    							column.editoptions.appendTo = 'body';
    						}
    					} else if (column.rupType === 'autocomplete') {
    						// Establece el valor por defecto.
    						if (row !== undefined) {
    							column.editoptions.defaultValue = row[column.name];
    						}
    						
    						if (column.editoptions.menuAppendTo === undefined) {
    							// Cuando no se haya definido un elemento al que hacer el append del menú del autocomplete, se hace al "body" para evitar problemas de CSS.
    							column.editoptions.menuAppendTo = 'body';
    						}
    					} else if (column.rupType === 'select') {
    						// Si se recibe una fila con valores, se establece el valor del campo correspondiente como el registro seleccionado en el select.
    						if (row !== undefined) {
    							let rowName = $.fn.getStaticHdivID(row[column.name]);
    							let flatter	= $.fn.getStaticHdivID($.fn.flattenJSON(row)[column.name]);
    							column.editoptions.selected = column.name.includes('.') ? flatter : rowName;    							
    						}
    					}
    					// Inicializar componente.
    					element['rup_' + column.rupType](column.editoptions);
    				} else if (column.searchoptions === undefined) {
    					console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.errors.wrongColModel'), column.name));
    				}
    			} else if (!column.editable) {
    				element.prop('readonly', true);
    			}
    		});
    	}
    }

    /**
     * Función que gestiona el comportamiento de abrir el dialog para añadir o editar un registro.
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
        var ctx = dt.settings()[0];

    	// Mostrar spinner de carga hasta que el formulario sea visible (sólo si fue activado). La segunda comprobación, evita que aparezca el spinner cuando se pagina dentro de editForm entre registros porque para ese caso, ya existe otro spinner
    	if (ctx.oInit.formEdit.loadSpinner && $('#' + ctx.sTableId + '_detail_div_loading').length == 0) {
    		$('body').append(
    				'<div id="' + ctx.sTableId + '_formEdit_dialog_loading" class="formEdit_dialog_loading_container">' +
    					'<div></div>' +
    					'<span><i class="mx-auto mdi mdi-spin mdi-loading" aria-hidden="true"></i></span>' +
    				'</div>'
    			);
    	}
        
        if (idRow == null || idRow == undefined || idRow < 0) {
            idRow = 1;
        }
        let row;
        if(ctx.json !== undefined && actionType !== 'POST'){//si acción es add, no hace falta coger el row.
        	row = ctx.json.rows[idRow];
        }
        
        // Comprobar si existe un formulario, en caso de no existir o de no contener el action requerido, lo crea
        $.when(_loadSaveDialogForm(ctx, actionType,row)).then(function () {
            let loadPromise = $.Deferred();
        	var idForm = ctx.oInit.formEdit.idForm;
        	// Limpiar los errores en caso de haberlos
	        var feed = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_feedback');
	        var divErrorFeedback = ctx.oInit.formEdit.detailForm.find('#' + feed[0].id);
	        if (divErrorFeedback.length > 0) {
	            divErrorFeedback.hide();
	        }
	        // Limpiar los elementos
	        if (idForm.find('.error').length > 0) {
	        	idForm.rup_validate('resetElements');
	        }
	
	        // Botón de guardar
	        var button = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_save');
	        // Botón de guardar y continuar
	        var buttonContinue = ctx.oInit.formEdit.detailForm.find('#' + ctx.sTableId + '_detail_button_save_repeat');
	

	        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditBeforeInitData',ctx);

	        let rowArray = $.rup_utils.jsontoarray(row);
	        
	        let title = customTitle != (undefined && null) ? customTitle : "";
	        
	        // Actualizar el valor de la variable por si ha sufrido cambios en la función _loadSaveDialogForm() ya que en caso de ser un CLONE, habrá sido convertido a POST
	        actionType = ctx.oInit.formEdit.actionType;
	
	        if (actionType === 'PUT') {
	        	// Si la opción 'direct' es verdadera, no se solicita el registro a BBDD, en su lugar, se obtiene de la tabla directamente.
	        	if (!ctx.oInit.formEdit.direct) {
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
	                    	if(ctx.oInit.primaryKey !== undefined && ctx.oInit.primaryKey.length === 1){//si hdiv esta activo.
		                        // Actualizar el nuevo id que viene de HDIV.
	                    		let idHdiv = "" + data[ctx.oInit.primaryKey];
		                        if (pk == ctx.multiselection.lastSelectedId) {
		                            ctx.multiselection.lastSelectedId = idHdiv;
		                        }
		                        let pos = jQuery.inArray(pk, ctx.multiselection.selectedIds);
		                        if (pos >= 0) {
		                            ctx.multiselection.selectedIds[pos] = idHdiv;
		                        }
		                        let result = $.grep(ctx.multiselection.selectedRowsPerPage, function (v) {
		                                return v.id == pk;
		                            });
		                        if (result !== undefined && result.length > 0) {
		                            result[0].id = idHdiv;
		                        }
	                    	}
	                    },
	                    error: function (xhr) {
	                        var divErrorFeedback = feed; //idTableDetail.find('#'+feed[0].id + '_ok');
	                        if (divErrorFeedback.length === 0) {
	                            divErrorFeedback = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
	                            divErrorFeedback.rup_feedback(ctx.oInit.feedback);
	                        }
	                        _callFeedbackOk(ctx, divErrorFeedback, xhr.responseText, 'error');
	                        $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjaxGet',ctx);
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
	                // Recrear iconos del responsive en caso de ser necesario.
	                _addChildIcons(ctx);
	                //Se mantiene el checked sin quitar.
	                $('#' + ctx.sTableId + ' > tbody > tr:not(.group)').eq(idRow).find('td.select-checkbox input[type="checkbox"]').prop('checked', true);
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
	                indexInArray = (Number(ctx.json.page) - 1) * ctx.aBaseJson.length;
	                indexInArray = indexInArray + idRow;
	            }
	            $('#' + ctx.sTableId).triggerHandler('tableEditFormAfterFillData',ctx);
	            if(ctx.oInit.formEdit.$navigationBar.funcionParams == undefined || ctx.oInit.formEdit.$navigationBar.funcionParams.length == undefined){
	            	_updateDetailPagination(ctx, indexInArray + 1, numTotal);
	            }
	            DataTable.Api().rupTable.selectPencil(ctx, idRow);
	            // Se guarda el ultimo id editado.
	            ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
	            // Se muestra el dialog.
	            ctx.oInit.formEdit.$navigationBar.show();
	            // Si no se ha definido un 'customTitle' asignamos un valor a la variable del título del formulario
	            if(customTitle == (undefined || null)) {
	            	title = $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.editCaption');
	            }
	            // Comprobamos si se desea bloquear la edicion de las claves primarias
	            DataTable.Api().rupTable.blockPKEdit(ctx, actionType);
	        } else if (actionType === 'POST') {
	        	//al ser add, s elimpian los combos
	        	jQuery.each($('select.rup_combo', idForm), function (index, elem) {
	                jQuery(elem).rup_combo('setRupValue','')
	            });
	            $.rup_utils.populateForm(rowArray, idForm);
	            ctx.oInit.formEdit.$navigationBar.hide();
	            // Si no se ha definido un 'customTitle' asignamos un valor a la variable del título del formulario
	            if(customTitle == (undefined || null)) {
	            	title = $.rup.i18nParse($.rup.i18n.base, 'rup_table.edit.addCaption');
	            }
	            // Comprobamos si hay claves primarias bloqueadas y las desbloqueamos
	            DataTable.Api().rupTable.blockPKEdit(ctx, actionType);
	        }
	
	        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditBeforeShowForm',ctx);
	        
	        // Establecemos el título del formulario
	        ctx.oInit.formEdit.detailForm.rup_dialog(ctx.oInit.formEdit.detailForm.settings);
	        ctx.oInit.formEdit.detailForm.rup_dialog('setOption', 'title', title);
	        ctx.oInit.formEdit.detailForm.rup_dialog('open');
	        
	        // Quitar spinner de carga porque el formulario ya es visible (si fue activado)
	    	if ($('#' + ctx.sTableId + '_formEdit_dialog_loading').length > 0) {
	    		$('#' + ctx.sTableId + '_formEdit_dialog_loading').remove();
	    	}
	
	        // Establecemos el foco al primer elemento input o select que se
	        // encuentre habilitado en el formulario
	        $(idForm[0]).find('input,select').filter(':not([readonly])').first().focus();
	
	        // Se guardan los datos originales
	        ctx.oInit.formEdit.dataOrigin = _editFormSerialize(idForm, ctx.oInit.formEdit.serializerSplitter);
	        ctx.oInit.formEdit.okCallBack = false;
	
	
	        button.off('click');
	        button.on('click', function () {
	        	//Funcion de validacion
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
	            // Comprobar si row ha sido modificada
	            // Se serializa el formulario con los cambios
	            row = _editFormSerialize(idForm, ctx.oInit.formEdit.serializerSplitter);
	            
	            // Se transforma
	            row = $.rup_utils.queryStringToJson(row, ctx.oInit.formEdit.serializerSplitter, ctx.oInit.formEdit.allowAllCharacters);
	            
	            //listas checkbox
	            row = _addListType(idForm,row);
	            
	            if (actionType === 'PUT') {//Solo al modificar
	                $.each(ctx.oInit.primaryKey, function (index, key) {
	                	row[key] = ctx.json.rows[idRow][key];
	                });   
	            }
	            
	        	let idTableDetail = ctx.oInit.formEdit.detailForm;
	            
	            // Muestra un feedback de error por caracter ilegal
	            if(!row) {
	            	ctx.oInit.formEdit.okCallBack = false;
	            	let feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
	            	let divErrorFeedback = feed;
	                if (divErrorFeedback.length === 0) {
	                    divErrorFeedback = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
	                    divErrorFeedback.rup_feedback(ctx.oInit.feedback);
	                }
	                _callFeedbackOk(ctx, divErrorFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_global.charError'), 'error');
	                $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjaxNotRow',ctx);
	            } else {
	            	let url = actionType == 'POST' ? '/add' : '/edit';
	            	
	            	// Comprobar si se ha definido otra URL en las propiedades, en caso afirmativo, se aplica.
	            	const property = url.substring(1) + 'Url';
	            	if (ctx.oInit.formEdit[property]) {
	            		url = ctx.oInit.formEdit[property];
	            	}
	            	
	            	_callSaveAjax(actionType, dt, row, idRow, false, idTableDetail, url, false);
	            }
	            $('#' + ctx.sTableId).triggerHandler('tableButtonSave',ctx);
	        });
	
	
	        ctx.oInit.formEdit.detailForm.buttonSaveContinue = buttonContinue;
	        ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType = actionType;
	        buttonContinue.off('click');
	        buttonContinue.on('click', function () {
	        	//Funcion de validacion
	        	if (actionType === 'PUT') {
		        	let customModificar = ctx.oInit.validarModificarContinuar;
		        	if(typeof customModificar === "function" && customModificar(ctx)){
		        		return false;
		        	}
	        	}else if (actionType === 'POST') {
	        	
		        	let customAlta = ctx.oInit.validarAltaContinuar;
		        	if(typeof customAlta === "function" && customAlta(ctx)){
		        		return false;
		        	}
	        	}
	        	
	            var actionSaveContinue = ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType;
	            // Comprobar si row ha sido modificada
	            // Se serializa el formulario con los cambios
	            row = _editFormSerialize(idForm, ctx.oInit.formEdit.serializerSplitter);
	
	            // Se transforma
	            row = $.rup_utils.queryStringToJson(row, ctx.oInit.formEdit.serializerSplitter, ctx.oInit.formEdit.allowAllCharacters);
	            
	            //listas checkbox
	            row = _addListType(idForm,row);
	            
	            if (actionType === 'PUT') {//Solo al modificar
	                $.each(ctx.oInit.primaryKey, function (index, key) {
	                	row[key] = ctx.json.rows[idRow][key];
	                });
	            }
                
	            let idTableDetail = ctx.oInit.formEdit.detailForm;
	            
	            // Muestra un feedback de error por caracter ilegal
	            if(!row) {
	            	ctx.oInit.formEdit.okCallBack = false;
	            	let feed = idTableDetail.find('#' + ctx.sTableId + '_detail_feedback');
	            	let divErrorFeedback = feed;
	                if (divErrorFeedback.length === 0) {
	                    divErrorFeedback = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
	                    divErrorFeedback.rup_feedback(ctx.oInit.feedback);
	                }
	                _callFeedbackOk(ctx, divErrorFeedback, $.rup.i18nParse($.rup.i18n.base, 'rup_global.charError'), 'error');
	                $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjaxNotRow',ctx);
	            } else {
	            	let url = actionType == 'POST' ? '/add' : '/edit';
	            	
	            	// Comprobar si se ha definido otra URL en las propiedades, en caso afirmativo, se aplica.
	            	const property = url.substring(1) + 'Url';
	            	if (ctx.oInit.formEdit[property]) {
	            		url = ctx.oInit.formEdit[property];
	            	}
	            	
	            	_callSaveAjax(actionSaveContinue, dt, row, idRow, true, idTableDetail, url, false);
	            }
	            $('#' + ctx.sTableId).triggerHandler('tableButtonSaveContinue', ctx);
	        });
	
	        $('#' + ctx.sTableId).triggerHandler('tableEditFormAddEditAfterShowForm', ctx);
	
	        return loadPromise;
        });
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
     * @param {boolean} isDeleting - Evita mostrar el diálogo de confirmación porque la función _deleteAllSelects() tiene el suyo propio.
     *
     */
    function _callSaveAjax(actionType, dt, row, idRow, continuar, idTableDetail, url, isDeleting) {
        var ctx = dt.settings()[0];
        
        let _makeAjaxCall = function () {
        	$('#' + ctx.sTableId).triggerHandler('tableEditFormBeforeCallAjax', [ctx, actionType, url]);
        	
        	// Añadir filtro
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
                $('#' + ctx.sTableId+'_detail_masterPK').val($('#' + ctx.sTableId + '_filter_masterPK').val());
                row = jQuery.extend(true, row,masterPkObject);
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
                success: function (valor) {
                	ctx.oInit.formEdit.okCallBack = true;
                	ctx.oInit.formEdit.lastValue = valor;
                    if (url !== '/deleteAll' && actionType !== 'DELETE') {
                        if (continuar) { //Se crea un feedback_ok, para que no se pise con el de los errores
                            var divOkFeedback = idTableDetail.find('#' + feed[0].id + '_ok');
                            if (divOkFeedback.length === 0) {
                                divOkFeedback = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                                divOkFeedback.rup_feedback(ctx.oInit.feedback);
                            }
                            _callFeedbackOk(ctx, divOkFeedback, msgFeedBack, 'ok'); //Se informa, feedback del formulario
                        } else {
                            ctx.oInit.formEdit.detailForm.rup_dialog('close');
                            _callFeedbackOk(ctx, ctx.oInit.feedback.$feedbackContainer, msgFeedBack, 'ok'); //Se informa feedback de la tabla
                        }

                        if (actionType === 'PUT') { //Modificar
                        	// Sobrescribir valores anteriores con los recibidos desde el servidor
                        	row = $.extend({}, row, valor);
                        	dt.row(idRow).data(row); // se actualiza al editar
                            ctx.json.rows[idRow] = row;
                            // Actualizamos el ultimo id seleccionado (por si ha sido editado)
                            var posicion = 0;
                            $.each(ctx.multiselection.selectedRowsPerPage, function (index, p) {
                                if (p.id == ctx.multiselection.lastSelectedId) {
                                    posicion = index;
                                    return;
                                }
                            });
                            if (ctx.seeker !== undefined && ctx.seeker.ajaxOption.data !== undefined &&
                            		ctx.seeker.ajaxOption.data.search !== undefined && ctx.seeker.search.funcionParams !== undefined &&
                                ctx.seeker.search.funcionParams.length > 0) {
                                _comprobarSeeker(row, ctx, idRow);
                            }
                            ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
                            ctx.multiselection.selectedRowsPerPage[posicion].id = DataTable.Api().rupTable.getIdPk(row, ctx.oInit);
                            ctx.oInit.feedback.type = undefined; //se recarga el type no esta definido.
                        } else {
                        	// Asegura a cargar los nuevos IDS.
                            $.each(ctx.oInit.primaryKey, function (index, key) {
                            	let posibleId = row[key];
                                // Comprueba si la primaryKey es un subcampo
                                if (key.indexOf('.') !== -1) {
                                    row[key] = DataTable.Api().rupTable.getDescendantProperty(valor, key);
                                } else {
                                	row[key] = valor[key];
                                }
                                if(row[key] === undefined){
                                	row[key]  = posibleId;
                                }

                            });
                            // Se actualiza la tabla temporalmente. y deja de ser post para pasar a put(edicion)
                            if (ctx.oInit.select !== undefined) {
                                DataTable.Api().select.deselect(ctx);
                            }
                            var rowAux = row;
                            if (ctx.json !== undefined) {
    	                        $.each(ctx.json.rows, function (index, r) {
    	                            var rowNext = r;
    	                            dt.row(index).data(rowAux);
    	                            rowAux = rowNext;
    	                        });
    	                        ctx.json.rows.pop();
    	                        ctx.json.rows.splice(0, 0, row);
                            }else{//es el primer registro
                            	dt.row.add(rowAux).draw( false );
                            	ctx.json = {};
                              	ctx.json.rows = [];
                            	ctx.json.rows.push(rowAux);
                            }

                            // Se guardan los datos para pasar de nuevo a editable.
                            if (ctx.oInit.formEdit.saveContinueEdit) {
                                ctx.oInit.formEdit.detailForm.buttonSaveContinue.actionType = 'PUT';
                                DataTable.Api().rupTable.blockPKEdit(ctx, 'PUT');
                            } else { //mantener y borrar
                            	ctx.oInit.formEdit.idForm.resetForm();
                            }

                            ctx.oInit.formEdit.dataOrigin = _editFormSerialize(ctx.oInit.formEdit.idForm, ctx.oInit.formEdit.serializerSplitter);
                            if (ctx.oInit.multiSelect !== undefined) {
                                ctx.oInit.feedback.type = 'noBorrar';
                                dt.row().multiSelect();
                            }
                            
                            // Se actualiza la linea
                            if (ctx.json.reorderedSelection !== null && ctx.json.reorderedSelection !== undefined) {
    	                        try
    	                        {
    	                          ctx.multiselection.selectedRowsPerPage[0].line = ctx.json.reorderedSelection[0].pageLine;
    	                          
    	                        }
    	                        catch(err) {
    	                          console.log(err.message);
    	                        }
                            }
                            
                            /* 
                             * Filtrar para colocar cada registro en su lugar correspondiente. 
                             * Si no se filtra, aparece un error visual en la selección de registros y otro en el paginador del formulario de edición.
                             */
                            dt.ajax.reload();
                            
                            $('#' + ctx.sTableId).triggerHandler('tableEditFormAfterInsertRow',actionType,ctx);
                        }
                        if(actionType === 'PUT'){
	                        dt.ajax.reload(function () {
	                            $('#' + ctx.sTableId).trigger('tableEditFormSuccessCallSaveAjax',actionType,ctx);
	                        }, false);
                        } else {
                        	if (ctx.oInit.multiSelect === undefined) {
                        		let arra = {
                        				id: DataTable.Api().rupTable.getIdPk(row, ctx.oInit),
                        				page: Number(ctx.json.page),
                        				line: 0
                        	    	};
                        		ctx.multiselection.selectedRowsPerPage[0] = arra;
                        		DataTable.Api().select.drawSelectId(ctx);
                        	}
                        	$('#' + ctx.sTableId).trigger('tableAddFormSuccessCallSaveAjax',actionType,ctx);
                        }

                    } else { // Eliminar
                        ctx.oInit.feedback.type = 'eliminar';
                        ctx.oInit.feedback.msgFeedBack = msgFeedBack;

                        if (ctx.oInit.multiSelect !== undefined) {
                            dt.ajax.reload(function () {
                                $('#' + ctx.sTableId).trigger('tableEditFormSuccessCallSaveAjax',actionType,ctx);
                                DataTable.Api().multiSelect.deselectAll(dt);
                            }, false);                        
                        } else if (ctx.oInit.select !== undefined) {
                            dt.ajax.reload(function () {
                                $('#' + ctx.sTableId).trigger('tableEditFormSuccessCallSaveAjax',actionType,ctx);
                                DataTable.Api().select.deselect(ctx);
                            }, false);                        
                        }
                        _callFeedbackOk(ctx, ctx.oInit.feedback.$feedbackContainer, msgFeedBack, 'ok'); //Se informa feedback de la tabla
                    }
                },
                complete: function () {
                    $('#' + ctx.sTableId).triggerHandler('tableEditFormCompleteCallSaveAjax',actionType,ctx);
                },
                error: function (xhr) {
                	let divErrorFeedback;
                	
                	// Si es una petición de tipo DELETE o no existe la referencia al feedback de editForm, el feedback utilizado será el de la tabla, en los demás casos, se usará el del editForm.
                	if (actionType === 'DELETE' || feed[0] == undefined) {
                		divErrorFeedback = ctx.oInit.feedback.$feedbackContainer;
                	} else {
                		divErrorFeedback = idTableDetail.find('#' + feed[0].id + '_ok');
                	}
                    
                    if (divErrorFeedback.length === 0) {
                        divErrorFeedback = $('<div></div>').attr('id', feed[0].id + '_ok').insertBefore(feed);
                        divErrorFeedback.rup_feedback(ctx.oInit.feedback);
                    }
                    
    				if (xhr.status === 406 && xhr.responseText !== '') {
    					try {
    						let responseJSON = JSON.parse(xhr.responseText);
    						if (responseJSON.rupErrorFields) {
    							if (responseJSON.rupErrorFields !== undefined || responseJSON.rupFeedback !== undefined) {
    								let $form = ctx.oInit.formEdit.idForm;
    								$form.validate().submitted = $.extend(true, $form.validate().submitted, responseJSON.rupErrorFields);
    								$form.validate().invalid = responseJSON.rupErrorFields;
    								$form.validate().showErrors(responseJSON.rupErrorFields);
    							} else if (errors.rupFeedback !== undefined) {
    								let mensajeJSON = $.rup_utils.printMsg(responseJSON.rupFeedback.message);
    								_callFeedbackOk(ctx, divErrorFeedback, mensajeJSON, 'error');
    							}

    						}
    					} catch (e) {
    						// El mensaje NO es JSON
    						_callFeedbackOk(ctx, divErrorFeedback, xhr.responseText, 'error');
    					}
    				} else {//cualquier error se devuelve el texto
                        _callFeedbackOk(ctx, divErrorFeedback, xhr.responseText, 'error');
    				}

                    $('#' + ctx.sTableId).triggerHandler('tableEditFormErrorCallSaveAjax',actionType,ctx);
                },
                validate: validaciones,
                feedback: feed.rup_feedback({
                    type: 'error',
                    block: false
                })
            };

            // Se cambia el data
            if (ajaxOptions.data == '') {
                delete ajaxOptions.data;
                $.rup_ajax(ajaxOptions);
            } else if (isDeleting || ctx.oInit.formEdit.idForm.valid()) {
            	// Obtener el valor del parámetro HDIV_STATE (en caso de no estar disponible se devolverá vacío) siempre y cuando no se trate de un deleteAll porque en ese caso ya lo contiene el filtro
                if (url.indexOf('deleteAll') === -1) {
                	// Elimina los campos _label generados por los autocompletes que no forman parte de la entidad
                    $.fn.deleteAutocompleteLabelFromObject(ajaxOptions.data);
                    
                    // Elimina los campos autogenerados por los multicombos que no forman parte de la entidad
                    $.fn.deleteMulticomboLabelFromObject(ajaxOptions.data, ctx.oInit.formEdit.detailForm);
                    
                	var hdivStateParamValue = $.fn.getHDIV_STATE(undefined, ctx.oInit.formEdit.idForm);
                    if (hdivStateParamValue !== '') {
                    	ajaxOptions.data._HDIV_STATE_ = hdivStateParamValue;
                    }
                }
                
                ajaxOptions.data = JSON.stringify(ajaxOptions.data);
                $.rup_ajax(ajaxOptions);
            }
        }
        
        if (ctx.oInit.formEdit.detailForm.settings.saveDialog && !isDeleting) {
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
    	if(ctx.oInit.formEdit.disabledFeedback){//no muestra el feedback
    		return false;
    	}
        $('#' + ctx.sTableId).triggerHandler('tableEditFormFeedbackShow',ctx);
        feedback.rup_feedback('set', msgFeedBack, type);
        feedback.rup_feedback('show');
    }


    /**
     * Se añade el tipo de la lista.
     *
     * @name addListType
     * @function
     * @since UDA 4.2.0 // Table 1.0.0
     *
     * @param {object} idForm - Identificador del formulario.
     * @param {string} row - Values ya añadidos al formulario.
     *
     */
    function _addListType(idForm, row) {
    	//Listas de checkbox
    	$.each(idForm.find('[data-lista]'), function () {
    		let name = this.dataset.lista;
    		let prop = '';
    		let propSplit = this.name.split(".");
    		if(propSplit !== undefined && propSplit.length === 2){
    			prop = propSplit[1];
    		}
    		
    		if(row[name] === undefined || !Array.isArray(row[name])){//si no existe se crea o // si no es de tipo array
    			row[name] = [];
    		}
    		let array = {};
    		if(prop !== undefined){
    			
    			let clave = this.dataset.clave;
	    		if(clave !== undefined){//si tiene clave es porque es objeto
	    			var label = this.dataset.valor;//se manda el valor id.
	    			array[clave] = label;
	    			array[prop] = $(this).is(':checked');
	    		}else{//si no tiene clave es porque es string
	    			array = $(this).is(':checked');
	    		}
	    		row[name].push(array);
    		}
    	});
    	
    	//Se buscan los array para que sean listas.combos con multiselect
    	$.each(row, function (name) {
    		if(this !== undefined && this.toString() === '[object Object]'){
    			if($.rup_utils.isNumeric(Object.keys(this)[0])){//se asegura, que no es una lista de objetos.
    				row[name] = Object.values(this);
    			}
    		}
    	});
    	return row;
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
        
        if (currentRowNum === 1 || currentRowNum === totalRowNum) {
        	let focusedElement = document.activeElement;
            
        	// Eliminar foco del elemento porque va a ser deshabilitado a continuación
        	if ($(ctx.oInit.formEdit.detailForm).find(focusedElement).length > 0) {
        		focusedElement.blur();
        	}
        }
        
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

        $('#rup_table_selectedElements_' + tableId).text($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_table.defaults.detailForm_pager'), currentRowNum, totalRowNum));
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
                        rowSelected.line = _getLineByPageSelectedReverse(ctx, ctx.aBaseJson.length);
                    }
                }
            }

            _hideOnNav(dt, linkType, function () {
                const tableId = ctx.sTableId;
                if (Number(rowSelected.page) !== page) {
                    var table = $('#' + tableId).DataTable();
                    // Ejecutar _fixComboAutocompleteOnEditForm como callback para garantizar la actualización de las filas.
                    table.on('draw', function(event, ctx) {
                    	_fixComboAutocompleteOnEditForm(ctx);
                    });
                    table.page(rowSelected.page - 1).draw('page');
                    // Se añaden los parámetros para luego ejecutar la función del dialog
                    ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT', dt, rowSelected.line, linkType];
                } else {
                	// Llamar directamente a la función
                	$.when(DataTable.editForm.fnOpenSaveDialog('PUT', dt, rowSelected.line, ctx.oInit.formEdit.customTitle)).then(function () {
                        _showOnNav(dt, linkType);
                    });
                    // Solventar problemas de los componentes combo y autocomplete en los formularios de edición.
                    _fixComboAutocompleteOnEditForm(ctx);
                }
                $('#first_' + tableId+'_detail_navigation' + 
                		', #back_' + tableId+'_detail_navigation' +
                		', #forward_' + tableId+'_detail_navigation' +
                		', #last_' + tableId+'_detail_navigation', ctx.oInit.formEdit.detailForm).prop('disabled', true);
            });

            // Actualizar la última posición movida
            ctx.oInit.formEdit.$navigationBar.currentPos = rowSelected;
            
            return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1];
        };

        ctx.oInit.formEdit.$navigationBar.data('settings', settings);

        var barraNavegacion = ctx.oInit._ADAPTER.createDetailNavigation.bind(ctx.oInit.formEdit.$navigationBar);
        ctx.oInit.formEdit.$navigationBar.append(barraNavegacion);
    }
    
    function _fixComboAutocompleteOnEditForm(ctx) {
    	// Solventar problemas de los componentes combo y autocomplete en los formularios de edición.
        if (ctx.oInit.colModel !== undefined) {
        	$.each(ctx.oInit.colModel, function (key, column) {
        		if (column.editable) {
        			if (column.rupType === 'combo') {
        				// Realizar una limpieza total para asegurar un buen funcionamiento.
        				ctx.oInit.formEdit.idForm.find('[name="' + column.name + '"]')['rup_combo']('hardReset');
        			} else if (column.rupType === 'autocomplete') {
        				// Establecer el valor por defecto del componente.
        				const newDefaultValue = ctx.json.rows.find(row => $.fn.getStaticHdivID(row.id) === $.fn.getStaticHdivID(ctx.oInit.formEdit.$navigationBar.currentPos.id))[column.name];
        				column.editoptions.defaultValue = newDefaultValue;
        				ctx.oInit.formEdit.idForm.find('[name="' + column.name + '"]').data('rup.autocomplete').$labelField.data('settings').defaultValue = newDefaultValue;
        			}
        		}
        	});
        }
    }

    function _hideOnNav(dt, linkType, callback) {
        const ctx = dt.settings()[0];
        const direction = (linkType === 'prev' || linkType === 'first') ? 'right' : 'left';
        const $dialogContent = $('#' + ctx.sTableId + '_detail_div .dialog-content-material');
        $dialogContent.parent().css('overflow-x', 'hidden');
        $dialogContent.hide('slide', {
            direction: direction
        }, 100, () => {
        	$dialogContent.after('<span id="' + ctx.sTableId + '_detail_div_loading" class="d-flex font-size-5rem"><i class="mx-auto mdi mdi-spin mdi-loading" aria-hidden="true"></i></span>');
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
                DataTable.editForm.fnOpenSaveDialog('PUT', dt, ctx.multiselection.selectedRowsPerPage[0].line, ctx.oInit.formEdit.customTitle);
                var rowSelectAux = ctx.json.rows[ctx.multiselection.selectedRowsPerPage[0].line];
                ctx.multiselection.selectedRowsPerPage[0].id = DataTable.Api().rupTable.getIdPk(rowSelectAux, ctx.oInit);
                DataTable.Api().select.deselect(ctx);
                DataTable.Api().select.drawSelectId(ctx);
            }
            //Se actualiza la ultima posicion movida.
            //ctx.oInit.formEdit.$navigationBar.currentPos = rowSelected;
            let tableId = ctx.sTableId;
            $('#first_' + tableId+'_detail_navigation' + 
            		', #back_' + tableId+'_detail_navigation' +
            		', #forward_' + tableId+'_detail_navigation' +
            		', #last_' + tableId+'_detail_navigation', ctx.oInit.formEdit.detailForm).prop('disabled', true);
            
            return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1];
        };


        ctx.oInit.formEdit.$navigationBar.data('settings', settings);

        var barraNavegacion = ctx.oInit._ADAPTER.createDetailNavigation.bind(ctx.oInit.formEdit.$navigationBar);
        ctx.oInit.formEdit.$navigationBar.append(barraNavegacion);
    }

    /**
     * Método que obtiene la fila siguiente seleccionada.
     *
     * @name getRowSelected
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt - Instancia de la tabla.
     * @param {string} actionType - Acción a ajecutar en el formulario para ir al controller, basado en REST.
     *
     * @return {object} Contiene el identificador, la página y la línea de la fila seleccionada.
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
        	$.each(ctx.multiselection.selectedRowsPerPage, function (index, p) {
                if (p.id == ctx.multiselection.lastSelectedId) {
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
            	// Indica los mostrados cuando es selectAll y no se puede calcular. El inicio es 0.
                ctx.oInit.formEdit.$navigationBar.numPosition = 0;
            }
            if (lastSelectedId === undefined || lastSelectedId === '') {
            	// Como arranca de primeras, la página es la 1
                rowDefault.page = _getNextPageSelected(ctx, 1, 'next');
                rowDefault.line = _getLineByPageSelected(ctx, -1);
            } else {
                // Buscar la posición y la página
                var result = $.grep(ctx.multiselection.selectedRowsPerPage, function (v) {
                    return v.id == ctx.multiselection.lastSelectedId;
                });
                rowDefault.page = result[0].page;
                rowDefault.line = result[0].line;
                var index = ctx._iDisplayLength * (Number(rowDefault.page) - 1);
                index = index + 1 + rowDefault.line;
                // Restar los deselecionados
                result = $.grep(ctx.multiselection.deselectedRowsPerPage, function (v) {
                    return Number(v.page) < Number(rowDefault.page) || (Number(rowDefault.page) === Number(v.page) && Number(v.line) < Number(rowDefault.line));
                });
                // Buscar índice
                rowDefault.indexSelected = index - result.length;
                if (ctx.oInit.formEdit !== undefined) {
                    ctx.oInit.formEdit.$navigationBar.numPosition = rowDefault.indexSelected - 1;
                }
            }
            if (ctx.oInit.formEdit !== undefined) {
                ctx.oInit.formEdit.$navigationBar.currentPos = rowDefault;
            }
        }

        // En caso de estar en una página distinta, navegamos a ella
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
     * @return integer - devuelve la página
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
                _callSaveAjax(actionType, dt, row, idRow, false, ctx.oInit.formEdit.detailForm, '/deleteAll', true);
            } else {
                row = ctx.multiselection.selectedIds[0];
                row = row.replace(regex, '/');
                _callSaveAjax(actionType, dt, '', idRow, false, ctx.oInit.formEdit.detailForm, '/' + row, true);
            }
        };
        
        if (ctx.oInit.formEdit.detailForm.settings.deleteDialog) {
        	$.rup_messages('msgConfirm', {
                message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.deleteAll'),
                title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.delete'),
                OKFunction: function () {
                	_doDelete();
                    $('#' + ctx.sTableId).triggerHandler('tableMessageOk', ctx);
                },
                CANCELFunction: ctx.oInit.formEdit.cancelDeleteFunction
            });
        } else {
        	_doDelete();
        }
    }

    /**
     * Método que serializa los datos del formulario.
     *
     * @name _editFormSerialize
     * @function
     * @since UDA 3.6.0 // Table 1.2.0
     *
     * @param {object} idForm - Formulario que alberga los datos.
     * @param {string} [serializerSplitter=&] - Cadena a usar para separar los campos.
     *
     * @return {string} - Devuelve los datos del formulario serializados
     *
     */
    function _editFormSerialize(idForm, serializerSplitter = '&') {
        let serializedForm = '';
        let idFormArray = idForm.formToArray();
        let ultimo = '';
        let count = 0;

        $.each(idFormArray, function (key, obj) {
        	if (ultimo != obj.name) {
        		count = 0;
    		}
        	let element = idForm.find('[name="' + obj.name + '"]');
        	let ruptype = element.attr('ruptype');
        	if (ruptype === undefined) {
        		ruptype = element.data('ruptype');
        	}
        	if ((obj.type === 'hidden' && element.attr('id') !== undefined) || obj.type !== 'hidden' || ruptype === 'autocomplete' || ruptype === 'custom') {
        		let valor = '';
        		if ($(idForm).find('[name="' + obj.name + '"]').prop('multiple')) {
        			valor = '[' + count++ + ']';
        		}
        		else if (ultimo === obj.name) {//Se mete como lista
        			//se hace replace del primer valor
        			serializedForm = serializedForm.replace(ultimo + '=', ultimo + '[' + count++ + ']=');
        			valor = '[' + count++ + ']'; //y se mete el array
        		}
	            serializedForm += (obj.name + valor + '=' + obj.value);
                serializedForm += serializerSplitter;
                ultimo = obj.name;
        	}
        });
        // Evitar que el último carácter sea "&" o el separador definido por el usuario.
        serializedForm = serializedForm.substring(0, serializedForm.length - serializerSplitter.length);
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

            $('#' + ctx.sTableId + ' tbody tr').eq(idRow).find('td.select-checkbox i.filtered-row').remove();
            $('#' + ctx.sTableId + ' tbody tr').eq(idRow).find('td i.filtered-row').remove();
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
                    } else if (input.attr('ruptype') === 'select' && !input.rup_select('isDisabled')) {
                        input.rup_select('disable');
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
                                input.after('<i id=\'' + id + '_bloqueado\' class=\'mdi mdi-check sustitutoCheckboxPKBloqueadoGeneral\' valor=\'1\' aria-hidden=\'true\'></i>');
                            } else {
                                input.after('<i id=\'' + id + '_bloqueado\' class=\'mdi mdi-close sustitutoCheckboxPKBloqueadoGeneral sustitutoCheckboxPKBloqueadoCross\' valor=\'0\' aria-hidden=\'true\'></i>');
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
                    } else if (input.attr('ruptype') === 'select' && input.rup_select('isDisabled')) {
                        input.rup_select('enable');
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
                        var $span = $('<span></span>');
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

            $('#' + ctx.sTableId).triggerHandler('tableEditFormAddChildIcons',ctx);
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
    
    // Se declara la variable de editForm para que pueda ser invocada desde cualquier sitio
    apiRegister('editForm.openSaveDialog()', function (actionType, dt, idRow, customTitle) {
    	DataTable.editForm.fnOpenSaveDialog(actionType, dt, idRow, customTitle);
    });

    apiRegister('editForm.updateDetailPagination()', function (ctx, currentRowNum, totalRowNum) {
        _updateDetailPagination(ctx, currentRowNum, totalRowNum);
    });
    
    apiRegister('editForm.loadSaveDialogForm()', function (ctx, actionType, row) {
    	return _loadSaveDialogForm(ctx, actionType, row);
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

        if (!ctx.oInit.noEdit && ctx.oInit.formEdit !== undefined && ctx.oInit.formEdit.activate !== false) {
	        DataTable.editForm.preConfigure(new DataTable.Api(ctx));
	        
        	$('#' + ctx.sTableId).on('tableEditFormInitialize', function(event, ctx) {
        		let deferred = $.Deferred();
    	        DataTable.editForm.init(ctx);
	            
		        $(ctx.oInit.formEdit.detailForm).rup_dialog($.extend({}, {
	                type: $.rup.dialog.DIV,
	                autoOpen: false,
	                modal: true,
	                resizable: '',
	                width: ctx.oInit.formEdit.detailForm.settings.width,
	                create: function () {
	                    /* Se encarga de eliminar la clase que oculta los campos del formEdit. Esta clase esta presente
	                     * en el formEdit para evitar un bug visual en el que hacia que sus campos apareciesen 
	                     * bajo la tabla y fueran visibles previa a la inicializacion del componente rup.dialog.
	                     */
	                    $('#'+ctx.sTableId+'_detail_div.rup-table-formEdit-detail').removeClass('d-none');
	                }
	            }, {}));
	            if (ctx.oInit.formEdit.cancelDeleteFunction === undefined) {
	                ctx.oInit.formEdit.cancelDeleteFunction = function cancelClicked() {};
	            }
	            
	            deferred.resolve();
	            return deferred.promise();
        	});
        }

    });


    return DataTable.editForm;
}));