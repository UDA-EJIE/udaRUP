/**
 * Genera los botones del table
 *
 * @summary 		Extensión del componente RUP Datatable
 * @module			"rup.table.buttons"
 * @version     1.5.1
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


    // Used for namespacing events added to the document by each instance, so they
    // can be removed on destroy
    var _instCounter = 0;

    // Button namespacing counter for namespacing events on individual buttons
    var _buttonCounter = 0;

    // Default ID naming counter
    var _buttonIdCounter = 1;

    var _dtButtons = DataTable.ext.buttons;

    /**
     * Botones
     *
     * @name Buttons
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt
     * @param {object} config
     *
     */
    var Buttons = function (dt, config) {
        var idTable = dt.context[0].sTableId;
        var ctx = dt.context[0];
        ctx.ext = DataTable.ext;
        ctx.ext.buttons = {};
        ctx.ext.buttons.defaults = {
            buttons: ['addButton', 'editButton', 'cloneButton', 'deleteButton', 'reportsButton'],
            name: 'main',
            tabIndex: 0,
            dom: {
                container: {
                    tag: 'div',
                    className: 'dt-buttons row'
                },
                collection: {
                    tag: 'div',
                    className: 'dt-button-collection'
                },
                button: {
                    tag: 'button',
                    className: 'col-12 col-sm-auto btn-material',
                    active: 'active',
                    disabled: 'disabled'
                },
                buttonLiner: {
                    tag: 'span',
                    className: ''
                }
            }
        };
        ctx.ext.buttons.copyButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.copyButton');
            },
            id: idTable + 'copyButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-low-emphasis buttons-copyButton',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'copyButton',
            request: {
	        	url: '/clipboardReport',
	            method: 'POST',
	            contentType: 'application/json',
        		dataType: 'json',
        		reportsExportAllColumns: false
            },
            init: function (dt, node, config) {
                ctx.ext.buttons.copyButton.eventDT = dt;
            },
            action: function (e, dt, button, config) {
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (this.processing !== undefined) {
                    this.processing(true);
                }
                let that = this;
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeCopyClick');
                _reports(dt, that, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterCopyClick');
            }
        };

        ctx.ext.buttons.excelButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.excelButton');
            },
            id: idTable + 'excelButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-low-emphasis buttons-copyButton',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'excelButton',
            request: {
	        	url: '/xlsxReport',
	            method: 'POST',
	            contentType: 'application/json',
        		dataType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        		reportsExportAllColumns: false,
        		fileName: 'x21aExcel',
        		sheetTitle: 'Usuario'
            },
            action: function (e, dt, button, config) {
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (this.processing !== undefined) {
                    this.processing(true);
                }
                let that = this;
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeExcelClick');
                _reports(dt, that, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterExcelClick');
            }
        };

        ctx.ext.buttons.pdfButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.pdfButton');
            },
            id: idTable + 'pdfButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-low-emphasis buttons-copyButton',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'pdfButton',
            request: {
	        	url: '/pdfReport',
	            method: 'POST',
	            contentType: 'application/json',
        		dataType: 'application/pdf',
        		reportsExportAllColumns: false,
        		fileName: 'x21aPDF'
            },
            action: function (e, dt, button, config) {
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (this.processing !== undefined) {
                    this.processing(true);
                }
                let that = this;
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforePdfClick');
                _reports(dt, that, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterPdfClick');
            }
        };

        ctx.ext.buttons.odsButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.odsButton');
            },
            id: idTable + 'odsButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-low-emphasis buttons-copyButton',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'odsButton',
            request: {
	        	url: '/odsReport',
	            method: 'POST',
	            contentType: 'application/json',
        		dataType: 'application/vnd.oasis.opendocument.spreadsheet',
        		reportsExportAllColumns: false,
        		fileName: 'x21aODS',
        		sheetTitle: 'Usuario'
            },
            action: function (e, dt, button, config) {
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (this.processing !== undefined) {
                    this.processing(true);
                }
                let that = this;
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeOdsClick');
                _reports(dt, that, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterOdsClick');
            }
        };

        ctx.ext.buttons.csvButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.csvButton');
            },
            id: idTable + 'csvButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-low-emphasis buttons-copyButton',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'csvButton',
            request: {
	        	url: '/csvReport',
	            method: 'POST',
	            contentType: 'application/json',
        		dataType: 'text/csv',
        		reportsExportAllColumns: false,
        		fileName: 'x21aCSV',
        		sheetTitle: 'Usuario'
            },
            action: function (e, dt, button, config) {
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (this.processing !== undefined) {
                    this.processing(true);
                }
                let that = this;
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeCsvClick');
                _reports(dt, that, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterCsvClick');
            }
        };

        ctx.ext.buttons.addButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.add');
            },
            id: idTable + 'addButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-high-emphasis table_toolbar_btnAdd',
            displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'add',
            init: function (dt, node, config) {
                ctx.ext.buttons.addButton.eventDT = dt;
            },
            action: function (e, dt, node, config) {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeAddClick');
                DataTable.Api().buttons.actions(dt, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterAddClick');
            }
        };

        ctx.ext.buttons.editButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.edit');
            },
            id: idTable + 'editButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-high-emphasis table_toolbar_btnEdit',
            displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'edit',
            init: function (dt, node, config) {
                ctx.ext.buttons.editButton.eventDT = dt;
            },
            action: function (e, dt, node, config) {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeEditClick');
                DataTable.Api().buttons.actions(dt, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterEditClick');
            }
        };

        ctx.ext.buttons.cloneButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.clone');
            },
            id: idTable + 'cloneButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-high-emphasis table_toolbar_btnClone',
            displayRegex: /^1$/, // Se muestra solo cuando sea igual a 1
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'clone',
            init: function (dt, node, config) {
                ctx.ext.buttons.cloneButton.eventDT = dt;
            },
            action: function (e, dt, node, config) {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeCloneClick');
                DataTable.Api().buttons.actions(dt, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterCloneClick');
            }
        };

        ctx.ext.buttons.deleteButton = {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.delete');
            },
            id: idTable + 'deleteButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
            className: 'btn-material-primary-high-emphasis table_toolbar_btnDelete',
            displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
            insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
            type: 'delete',
            init: function (dt, node, config) {
                ctx.ext.buttons.deleteButton.eventDT = dt;
            },
            action: function (e, dt, node, config) {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeDeleteClick');
                DataTable.Api().buttons.actions(dt, config);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterDeleteClick');
            }
        };

        var listadoExports = ['copyButton', 'excelButton', 'pdfButton', 'odsButton', 'csvButton'];

        ctx.ext.buttons.reportsButton = {
                extend: 'collection',
                text: function (dt) {
                    return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.reports.main');
                },
                id: idTable + 'informes_01',
                className: 'btn-material-primary-medium-emphasis order-last ml-1 ml-lg-auto',
                displayRegex: /^\d+$/, // Se muestra siempre que sea un numero positivo o neutro
                autoClose: true,
                type: 'reports',
                reportsExportAllColumns: false,
                buttons: listadoExports
            };

		// Ajusta el tamaño de los botones por defecto en caso de que haya sido especificado en las preferencias
        if (ctx.oInit.buttons.size !== undefined) {
        	$.each(ctx.ext.buttons, function (name, item) {
				if (item.className !== undefined) {
	                if (ctx.oInit.buttons.size === 'lg') {
	                	item.className += " btn-material-lg";
	                } else if (ctx.oInit.buttons.size === 'sm') {
	                	item.className += " btn-material-sm";
	                }
				}
			});
        }
        
    	if (ctx.oInit.buttons.blackListButtons !== undefined){
    		if (ctx.oInit.buttons.blackListButtons === 'all'){//si no se quiere ninguno se elimina
    			listadoExports = [];
    			ctx.ext.buttons.defaults.buttons = [];
    		} else if (ctx.oInit.buttons.blackListButtons && ctx.oInit.buttons.blackListButtons.length > 0){
    			$.each(ctx.oInit.buttons.blackListButtons, function () {
    				let name = this;
    				let pos = $.inArray(name, listadoExports);
    				if(pos >= 0){
    					listadoExports.splice(pos, 1);
    				}
    				//Resto de botones
    				let posBoton = $.inArray(name, ctx.ext.buttons.defaults.buttons);
    				if(posBoton >= 0){
    					ctx.ext.buttons.defaults.buttons.splice(posBoton, 1);
    				}
    			});
    			
    		}
    	}


        if (ctx.oInit.inlineEdit !== undefined) { // añadir botones edición en linea
            $.extend(ctx.ext.buttons, ctx.oInit.inlineEdit.myButtons);
            for (let nameButton in ctx.oInit.inlineEdit.myButtons) {
                ctx.ext.buttons.defaults.buttons.push(nameButton);
            }
        }
        // Añadir botones personalizados / Se almacenan en plugin de buttons
        if (ctx.oInit.buttons.myButtons !== undefined) { // Añadir botones edición en linea
        	// Se asegura que todos sean custom
            $.extend(ctx.ext.buttons, ctx.oInit.buttons.myButtons);
            for (let nameButton in ctx.oInit.buttons.myButtons) {
                ctx.ext.buttons.defaults.buttons.push(nameButton);
            }
        }
        // If there is no config set it to an empty object
        if (typeof (config) === 'undefined') {
            config = {};
        }

        // Allow a boolean true for defaults
        if (config === true) {
            config = {};
        }

        // For easy configuration of buttons an array can be given
        if ($.isArray(config)) {
            config = {
                buttons: config
            };
        }

        this.c = $.extend(true, {}, ctx.ext.buttons.defaults, config);

        // Don't want a deep copy for the buttons
        if (config.buttons) {
            this.c.buttons = config.buttons;
        }

        this.s = {
            dt: new DataTable.Api(dt),
            buttons: [],
            listenKeys: '',
            namespace: 'dtb' + (_instCounter++)
        };

        this.dom = {
            container: $('<' + this.c.dom.container.tag + '></' + this.c.dom.container.tag + '>')
                .addClass(this.c.dom.container.className).attr('id', ctx.sTableId + '_containerToolbar')
        };

        this._constructor();
    };


    $.extend(Buttons.prototype, {
        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Public methods
         */

        /**
         * Get the action of a button
         *
         * @name action
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {int|string} Button index
         * @return {function}
         *
         */
        /**
         * Set the action of a button
         *
         * @name action
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button element
         * @param  {function} action Function to set
         * @return {Buttons} Self for chaining
         *
         */
        action: function (node, action) {
            var button = this._nodeToButton(node);

            if (action === undefined) {
                return button.conf.action;
            }

            button.conf.action = action;

            return this;
        },

        /**
         * Add an active class to the button to make to look active or get current
         * active state.
         *
         * @name active
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button element
         * @param  {boolean} [flag] Enable / disable flag
         * @return {Buttons} Self for chaining or boolean for getter
         *
         */
        active: function (node, flag) {
            var button = this._nodeToButton(node);
            var klass = this.c.dom.button.active;
            var jqNode = $(button.node);

            if (flag === undefined) {
                return jqNode.hasClass(klass);
            }

            jqNode.toggleClass(klass, flag === undefined ? true : flag);

            return this;
        },

        /**
         * Add a new button
         *
         * @name add
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} config Button configuration object, base string name or function
         * @param {int|string} [idx] Button index for where to insert the button
         * @return {Buttons} Self for chaining
         *
         */
        add: function (config, idx) {
            var buttons = this.s.buttons;

            if (typeof idx === 'string') {
                var split = idx.split('-');
                var base = this.s;

                for (var i = 0, ien = split.length - 1; i < ien; i++) {
                    base = base.buttons[split[i] * 1];
                }

                buttons = base.buttons;
                idx = split[split.length - 1] * 1;
            }

            this._expandButton(buttons, config, false, idx);
            this._draw();

            return this;
        },

        /**
         * Get the container node for the buttons
         *
         * @name container
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @return {jQuery} Buttons node
         *
         */
        container: function () {
            return this.dom.container;
        },

        /**
         * Disable a button
         *
         * @name disable
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @return {Buttons} Self for chaining
         *
         */
        disable: function (node, contextMenu) {
            var button = this._nodeToButton(node);

            $(button.node).addClass(this.c.dom.button.disabled);
            if (contextMenu) {
                $('#' + button.node.id + '_contextMenuToolbar').addClass(this.c.dom.button.disabled);
            }

            return this;
        },

        /**
         * Destroy the instance, cleaning up event handlers and removing DOM
         * elements
         *
         * @name destroy
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @return {Buttons} Self for chaining
         *
         */
        destroy: function () {
            // Key event listener
            $('body').off('keyup.' + this.s.namespace);

            // Individual button destroy (so they can remove their own events if
            // needed). Take a copy as the array is modified by `remove`
            var buttons = this.s.buttons.slice();
            var i, ien;

            for (i = 0, ien = buttons.length; i < ien; i++) {
                this.remove(buttons[i].node);
            }

            // Container
            this.dom.container.remove();

            // Remove from the settings object collection
            var buttonInsts = this.s.dt.settings()[0];

            for (i = 0, ien = buttonInsts.length; i < ien; i++) {
                if (buttonInsts.inst === this) {
                    buttonInsts.splice(i, 1);
                    break;
                }
            }

            return this;
        },

        /**
         * Enable / disable a button
         *
         * @name enable
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @param  {boolean} [flag=true] Enable / disable flag
         * @return {Buttons} Self for chaining
         *
         */
        enable: function (node, flag, contextMenu) {
            if (flag === false) {
                return this.disable(node);
            }

            var button = this._nodeToButton(node);
            $(button.node).removeClass(this.c.dom.button.disabled);
            if (contextMenu) {
                $('#' + button.node.id + '_contextMenuToolbar').removeClass(this.c.dom.button.disabled);
            }

            return this;
        },

        /**
         * Get the instance name for the button set selector
         *
         * @name name
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @return {string} Instance name
         *
         */
        name: function () {
            return this.c.name;
        },

        /**
         * Get a button's node
         *
         * @name node
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @return {jQuery} Button element
         *
         */
        node: function (node) {
            var button = this._nodeToButton(node);
            return $(button.node);
        },

        /**
         * Set / get a processing class on the selected button
         *
         * @name processing
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {boolean} flag true to add, false to remove, undefined to get
         * @return {boolean|Buttons} Getter value or this if a setter.
         *
         */
        processing: function (node, flag) {
            var button = this._nodeToButton(node);

            if (flag === undefined) {
                return $(button.node).hasClass('processing');
            }

            $(button.node).toggleClass('processing', flag);

            return this;
        },

        /**
         * Remove a button.
         *
         * @name remove
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @return {Buttons} Self for chaining
         *
         */
        remove: function (node) {
            var button = this._nodeToButton(node);
            var host = this._nodeToHost(node);
            var dt = this.s.dt;

            // Remove any child buttons first
            if (button.buttons.length) {
                for (var i = button.buttons.length - 1; i >= 0; i--) {
                    this.remove(button.buttons[i].node);
                }
            }

            // Allow the button to remove event handlers, etc
            if (button.conf.destroy) {
                button.conf.destroy.call(dt.button(node), dt, $(node), button.conf);
            }

            this._removeKey(button.conf);

            $(button.node).remove();

            var idx = $.inArray(button, host);
            host.splice(idx, 1);

            return this;
        },

        /**
         * Get the text for a button
         *
         * @name text
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {int|string} node Button index
         * @return {string} Button text
         *
         */
        /**
         * Set the text for a button
         *
         * @name text
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {int|string|function} node Button index
         * @param  {string} label Text
         * @return {Buttons} Self for chaining
         *
         */
        text: function (node, label) {
            var button = this._nodeToButton(node);
            var buttonLiner = this.c.dom.collection.buttonLiner;
            var linerTag = button.inCollection && buttonLiner && buttonLiner.tag ?
                buttonLiner.tag :
                this.c.dom.buttonLiner.tag;
            var dt = this.s.dt;
            var jqNode = $(button.node);
            var text = function (opt) {
                return typeof opt === 'function' ?
                    opt(dt, jqNode, button.conf) :
                    opt;
            };

            if (label === undefined) {
                return text(button.conf.text);
            }

            button.conf.text = label;

            if (linerTag) {
                jqNode.children(linerTag).html(text(label));
            } else {
                jqNode.html(text(label));
            }

            return this;
        },


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Constructor
         */

        /**
         * Buttons constructor
         *
         * @name _constructor
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         */
        _constructor: function () {
            var that = this;
            var dt = this.s.dt;
            var dtSettings = dt.settings()[0];
            var buttons = this.c.buttons;

            if (!dtSettings._buttons) {
                dtSettings._buttons = [];
            }

            dtSettings._buttons.push({
                inst: this,
                name: this.c.name
            });

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                this.add(buttons[i]);
            }

            dt.on('destroy', function () {
                that.destroy();
            });

            // Global key event binding to listen for button keys
            $('body').on('keyup.' + this.s.namespace, function (e) {
                if (!document.activeElement || document.activeElement === document.body) {
                    // SUse a string of characters for fast lookup of if we need to
                    // handle this
                    var character = String.fromCharCode(e.keyCode).toLowerCase();

                    if (that.s.listenKeys.toLowerCase().indexOf(character) !== -1) {
                        that._keypress(character, e);
                    }
                }
            });
        },


        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
         * Private methods
         */

        /**
         * Add a new button to the key press listener
         *
         * @name _addKey
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param {object} conf Resolved button configuration object
         *
         */
        _addKey: function (conf) {
            if (conf.key) {
                this.s.listenKeys += $.isPlainObject(conf.key) ?
                    conf.key.key :
                    conf.key;
            }
        },

        /**
         * Insert the buttons into the container. Call without parameters!
         *
         * @name _draw
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} [container] Recursive only - Insert point
         * @param  {array} [buttons] Recursive only - Buttons array
         *
         */
        _draw: function (container, buttons) {
            if (!container) {
                container = this.dom.container;
                buttons = this.s.buttons;
            }

            container.children().detach();

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                container.append(buttons[i].inserter);
                container.append(' ');

                if (buttons[i].buttons && buttons[i].buttons.length) {
                    this._draw(buttons[i].collection, buttons[i].buttons);
                }
            }
        },

        /**
         * Create buttons from an array of buttons
         *
         * @name _expandButton
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {array} attachTo Buttons array to attach to
         * @param  {object} button Button definition
         * @param  {boolean} inCollection true if the button is in a collection
         *
         */
        _expandButton: function (attachTo, button, inCollection, attachPoint) {
            var dt = this.s.dt;
            var buttonCounter = 0;
            var buttons = !$.isArray(button) ? [button] :
                button;

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                var conf = this._resolveExtends(buttons[i]);

                if (!conf) {
                    continue;
                }

                // If the configuration is an array, then expand the buttons at this
                // point
                if ($.isArray(conf)) {
                    this._expandButton(attachTo, conf, inCollection, attachPoint);
                    continue;
                }

                var built = this._buildButton(conf, inCollection);
                if (!built) {
                    continue;
                }

                if (attachPoint !== undefined) {
                    attachTo.splice(attachPoint, 0, built);
                    attachPoint++;
                } else {
                    attachTo.push(built);
                }

                if (built.conf.buttons) {
                    var collectionDom = this.c.dom.collection;
                    built.collection = $('<' + collectionDom.tag + '></' + collectionDom.tag + '>')
                        .addClass(collectionDom.className)
                        .attr('role', 'menu');
                    built.conf._collection = built.collection;

                    this._expandButton(built.buttons, built.conf.buttons, true, attachPoint);
                }

                // init call is made here, rather than buildButton as it needs to
                // be selectable, and for that it needs to be in the buttons array
                if (conf.init) {
                    conf.init.call(dt.button(built.node), dt, $(built.node), conf);
                }

                buttonCounter++;
            }
        },

        /**
         * Create an individual button
         *
         * @name _buildButton
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {object} config            Resolved button configuration
         * @param  {boolean} inCollection `true` if a collection button
         * @return {jQuery} Created button node (jQuery)
         *
         */
        _buildButton: function (config, inCollection) {
            var buttonDom = this.c.dom.button;
            var linerDom = this.c.dom.buttonLiner;
            var collectionDom = this.c.dom.collection;
            var dt = this.s.dt;
            var ctx = dt.settings()[0];
            var text = function (opt) {
                return typeof opt === 'function' ?
                    opt(dt, button, config) :
                    opt;
            };

            if (inCollection && collectionDom.button) {
                buttonDom = collectionDom.button;
            }

            if (inCollection && collectionDom.buttonLiner) {
                linerDom = collectionDom.buttonLiner;
            }

            // Make sure that the button is available based on whatever requirements
            // it has. For example, Flash buttons require Flash
            if (config.available && !config.available(dt, config)) {
                return false;
            }

            var action = function (e, dt, button, config) {
                config.action.call(dt.button(button), e, dt, button, config);

                $(dt.table().node()).triggerHandler('buttons-action.dt', [
                    dt.button(button), dt, button, config
                ]);
            };

            var button = $('<' + buttonDom.tag + '></' + buttonDom.tag + '>')
                .addClass(buttonDom.className)
                .attr('tabindex', this.s.dt.settings()[0].iTabIndex)
                .attr('aria-controls', this.s.dt.table().node().id)
                .on('click.dtb', function (e) {
                    e.preventDefault();

                    if (!button.hasClass(buttonDom.disabled) && config.action) {
                        action(e, dt, button, config);
                    }

                    button.blur();
                });

            // Make `a` tags act like a link
            if (buttonDom.tag.toLowerCase() === 'a') {
                button.attr('href', '#');
            }

            if (linerDom.tag) {
                var liner = $('<' + linerDom.tag + '></' + linerDom.tag + '>')
                    .html(text(config.text))
                    .addClass(linerDom.className);

                if (linerDom.tag.toLowerCase() === 'a') {
                    liner.attr('href', '#');
                }

                button.append(liner);
            } else {
                button.html(text(config.text));
            }

            if (config.id) {
                button.attr('id', config.id);
            } else {
                // Se desactiva el acceso desde el contextMenu por no tener un id establecido
                config.insideContextMenu = false;
                // Se asigna un id dinamico en funcion del nombre del table al que pertenece
                config.id = ctx.sTableId + '_button_' + (_buttonIdCounter++);
                button.attr('id', config.id);
            }

            if (config.className) {
                button.addClass(config.className);
            }

            if (config.titleAttr) {
                button.attr('title', text(config.titleAttr));
            }

            if (config.attr) {
                button.attr(config.attr);
            }

            if (!config.namespace) {
                config.namespace = '.dt-button-' + (_buttonCounter++);
            }

            if (!config.icon) {
                // Comprueba si es alguno de los botones con iconos definidos por defecto
                switch (config.type) {
                case 'add':
                    config.icon = 'mdi-plus';
                    break;
                case 'edit':
                    config.icon = 'mdi-playlist-edit';
                    break;
                case 'clone':
                    config.icon = 'mdi-content-copy';
                    break;
                case 'delete':
                    config.icon = 'mdi-trash-can-outline';
                    break;
                case 'reports':
                    config.icon = 'mdi-file-export';
                    break;
                case 'copyButton':
                    config.icon = 'mdi-clipboard-text-outline';
                    break;
                case 'excelButton':
                    config.icon = 'mdi-file-excel';
                    break;
                case 'pdfButton':
                    config.icon = 'mdi-file-pdf';
                    break;
                case 'odsButton':
                    config.icon = 'mdi-file';
                    break;
                case 'csvButton':
                    config.icon = 'mdi-file';
                    break;
                default:
                    config.icon = 'mdi-settings';
                }
            }

            var buttonContainer = this.c.dom.buttonContainer;
            var inserter;
            if (buttonContainer && buttonContainer.tag) {
                inserter = $('<' + buttonContainer.tag + '></' + buttonContainer.tag + '>')
                    .addClass(buttonContainer.className)
                    .append(button);
            } else {
                inserter = button;
            }

            this._addKey(config);

            return {
                conf: config,
                node: button.get(0),
                inserter: inserter,
                buttons: [],
                inCollection: inCollection,
                collection: null
            };
        },

        /**
         * Get the button object from a node (recursive)
         *
         * @name _nodeToButton
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @param  {array} [buttons] Button array, uses base if not defined
         * @return {object} Button object
         *
         */
        _nodeToButton: function (node, buttons) {
            if (!buttons) {
                buttons = this.s.buttons;
            }

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                if (buttons[i].node === node) {
                    return buttons[i];
                }

                if (buttons[i].buttons.length) {
                    var ret = this._nodeToButton(node, buttons[i].buttons);

                    if (ret) {
                        return ret;
                    }
                }
            }
        },

        /**
         * Get container array for a button from a button node (recursive)
         *
         * @name _nodeToHost
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {node} node Button node
         * @param  {array} [buttons] Button array, uses base if not defined
         * @return {array} Button's host array
         *
         */
        _nodeToHost: function (node, buttons) {
            if (!buttons) {
                buttons = this.s.buttons;
            }

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                if (buttons[i].node === node) {
                    return buttons;
                }

                if (buttons[i].buttons.length) {
                    var ret = this._nodeToHost(node, buttons[i].buttons);

                    if (ret) {
                        return ret;
                    }
                }
            }
        },

        /**
         * Handle a key press - determine if any button's key configured matches
         * what was typed and trigger the action if so.
         *
         * @name _keypress
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {string} character The character pressed
         * @param  {object} e Key event that triggered this call
         *
         */
        _keypress: function (character, e) {
            // Check if this button press already activated on another instance of Buttons
            if (e._buttonsHandled) {
                return;
            }

            var run = function (conf, node) {
                if (!conf.key) {
                    return;
                }

                if (conf.key === character) {
                    e._buttonsHandled = true;
                    $(node).click();
                } else if ($.isPlainObject(conf.key)) {
                    if (conf.key.key !== character) {
                        return;
                    }

                    if (conf.key.shiftKey && !e.shiftKey) {
                        return;
                    }

                    if (conf.key.altKey && !e.altKey) {
                        return;
                    }

                    if (conf.key.ctrlKey && !e.ctrlKey) {
                        return;
                    }

                    if (conf.key.metaKey && !e.metaKey) {
                        return;
                    }

                    // Made it this far - it is good
                    e._buttonsHandled = true;
                    $(node).click();
                }
            };

            var recurse = function (a) {
                for (var i = 0, ien = a.length; i < ien; i++) {
                    run(a[i].conf, a[i].node);

                    if (a[i].buttons.length) {
                        recurse(a[i].buttons);
                    }
                }
            };

            recurse(this.s.buttons);
        },

        /**
         * Remove a key from the key listener for this instance (to be used when a
         * button is removed)
         *
         * @name _removeKey
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {object} conf Button configuration
         *
         */
        _removeKey: function (conf) {
            if (conf.key) {
                var character = $.isPlainObject(conf.key) ?
                    conf.key.key :
                    conf.key;

                // Remove only one character, as multiple buttons could have the
                // same listening key
                var a = this.s.listenKeys.split('');
                var idx = $.inArray(character, a);
                a.splice(idx, 1);
                this.s.listenKeys = a.join('');
            }
        },

        /**
         * Resolve a button configuration
         *
         * @name _resolveExtends
         * @function
         * @since UDA 3.4.0 // Table 1.0.0
         *
         * @param  {string|function|object} conf Button config to resolve
         * @return {object} Button configuration
         *
         */
        _resolveExtends: function (conf) {
            var dt = this.s.dt;
            var i, ien;
            var ctx = dt.context[0];
            var _dtButtonsTable = ctx.ext.buttons;
            _dtButtonsTable.collection = _dtButtons.collection;
            var toConfObject = function (base) {
                var loop = 0;

                // Loop until we have resolved to a button configuration, or an
                // array of button configurations (which will be iterated
                // separately)
                while (!$.isPlainObject(base) && !$.isArray(base)) {
                    if (base === undefined) {
                        return;
                    }

                    if (typeof base === 'function') {
                        base = base(dt, conf);

                        if (!base) {
                            return false;
                        }
                    } else if (typeof base === 'string') {
                        if (!_dtButtonsTable[base]) {
                            throw 'Unknown button type: ' + base;
                        }

                        base = _dtButtonsTable[base];
                    }

                    loop++;
                    if (loop > 30) {
                        // Protect against misconfiguration killing the browser
                        throw 'Buttons: Too many iterations';
                    }
                }

                return $.isArray(base) ?
                    base :
                    $.extend({}, base);
            };

            conf = toConfObject(conf);

            while (conf && conf.extend) {
                // Use `toConfObject` in case the button definition being extended
                // is itself a string or a function
                if (!_dtButtonsTable[conf.extend]) {
                    throw 'Cannot extend unknown button type: ' + conf.extend;
                }

                var objArray = toConfObject(_dtButtonsTable[conf.extend]);
                if ($.isArray(objArray)) {
                    return objArray;
                } else if (!objArray) {
                    // This is a little brutal as it might be possible to have a
                    // valid button without the extend, but if there is no extend
                    // then the host button would be acting in an undefined state
                    return false;
                }

                // Stash the current class name
                var originalClassName = objArray.className;

                conf = $.extend({}, objArray, conf);

                // The extend will have overwritten the original class name if the
                // `conf` object also assigned a class, but we want to concatenate
                // them so they are list that is combined from all extended buttons
                if (originalClassName && conf.className !== originalClassName) {
                    conf.className = originalClassName + ' ' + conf.className;
                }

                // Buttons to be added to a collection  -gives the ability to define
                // if buttons should be added to the start or end of a collection
                var postfixButtons = conf.postfixButtons;
                if (postfixButtons) {
                    if (!conf.buttons) {
                        conf.buttons = [];
                    }

                    for (i = 0, ien = postfixButtons.length; i < ien; i++) {
                        conf.buttons.push(postfixButtons[i]);
                    }

                    conf.postfixButtons = null;
                }

                var prefixButtons = conf.prefixButtons;
                if (prefixButtons) {
                    if (!conf.buttons) {
                        conf.buttons = [];
                    }

                    for (i = 0, ien = prefixButtons.length; i < ien; i++) {
                        conf.buttons.splice(i, 0, prefixButtons[i]);
                    }

                    conf.prefixButtons = null;
                }

                // Although we want the `conf` object to overwrite almost all of
                // the properties of the object being extended, the `extend`
                // property should come from the object being extended
                conf.extend = objArray.extend;
            }

            return conf;
        }
    });



    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Statics
     */

    /**
     * Show / hide a background layer behind a collection
     *
     * @name Buttons.background
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param  {boolean} Flag to indicate if the background should be shown or
     *   hidden
     * @param  {string} Class to assign to the background
     *
     * @static
     *
     */
    Buttons.background = function (show, className, fade) {
        if (fade === undefined) {
            fade = 400;
        }

        if (show) {
            $('<div></div>')
                .addClass(className)
                .css('display', 'none')
                .appendTo('body')
                .fadeIn(fade);
        } else {
            $('body > div.' + className)
                .fadeOut(fade, function () {
                    $(this)
                        .removeClass(className)
                        .remove();
                });
        }
    };

    /**
     * Instance selector - select Buttons instances based on an instance selector
     * value from the buttons assigned to a DataTable. This is only useful if
     * multiple instances are attached to a DataTable.
     *
     * @name Buttons.instanceSelector
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param  {string|int|array} Instance selector - see `instance-selector`
     *   documentation on the DataTables site
     * @param  {array} Button instance array that was attached to the DataTables
     *   settings object
     * @return {array} Buttons instances
     *
     * @static
     *
     */
    Buttons.instanceSelector = function (group, buttons) {
        if (!group) {
            return $.map(buttons, function (v) {
                return v.inst;
            });
        }

        var ret = [];
        var names = $.map(buttons, function (v) {
            return v.name;
        });

        // Flatten the group selector into an array of single options
        var process = function (input) {
            if ($.isArray(input)) {
                for (var i = 0, ien = input.length; i < ien; i++) {
                    process(input[i]);
                }
                return;
            }

            if (typeof input === 'string') {
                if (input.indexOf(',') !== -1) {
                    // String selector, list of names
                    process(input.split(','));
                } else {
                    // String selector individual name
                    var idx = $.inArray($.trim(input), names);

                    if (idx !== -1) {
                        ret.push(buttons[idx].inst);
                    }
                }
            } else if (typeof input === 'number') {
                // Index selector
                ret.push(buttons[input].inst);
            }
        };

        process(group);

        return ret;
    };

    /**
     * Button selector - select one or more buttons from a selector input so some
     * operation can be performed on them.
     *
     * @name Buttons.buttonSelector
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param  {array} Button instances array that the selector should operate on
     * @param  {string|int|node|jQuery|array} Button selector - see
     *   `button-selector` documentation on the DataTables site
     * @return {array} Array of objects containing `inst` and `idx` properties of
     *   the selected buttons so you know which instance each button belongs to.
     *
     * @static
     *
     */
    Buttons.buttonSelector = function (insts, selector) {
        var ret = [];
        var nodeBuilder = function (a, buttons, baseIdx) {
            var button;
            var idx;

            for (var i = 0, ien = buttons.length; i < ien; i++) {
                button = buttons[i];

                if (button) {
                    idx = baseIdx !== undefined ?
                        baseIdx + i :
                        i + '';

                    a.push({
                        node: button.node,
                        name: button.conf.name,
                        idx: idx
                    });

                    if (button.buttons) {
                        nodeBuilder(a, button.buttons, idx + '-');
                    }
                }
            }
        };

        var run = function (selector, inst) {
            var i, ien;
            var buttons = [];
            nodeBuilder(buttons, inst.s.buttons);

            var nodes = $.map(buttons, function (v) {
                return v.node;
            });

            if ($.isArray(selector) || selector instanceof $) {
                for (i = 0, ien = selector.length; i < ien; i++) {
                    run(selector[i], inst);
                }
                return;
            }

            if (selector === null || selector === undefined || selector === '*') {
                // Select all
                for (i = 0, ien = buttons.length; i < ien; i++) {
                    ret.push({
                        inst: inst,
                        node: buttons[i].node
                    });
                }
            } else if (typeof selector === 'number') {
                // Main button index selector
                ret.push({
                    inst: inst,
                    node: inst.s.buttons[selector].node
                });
            } else if (typeof selector === 'string') {
                if (selector.indexOf(',') !== -1) {
                    // Split
                    var a = selector.split(',');

                    for (i = 0, ien = a.length; i < ien; i++) {
                        run($.trim(a[i]), inst);
                    }
                } else if (selector.match(/^\d+(\-\d+)*$/)) {
                    // Sub-button index selector
                    var indexes = $.map(buttons, function (v) {
                        return v.idx;
                    });

                    ret.push({
                        inst: inst,
                        node: buttons[$.inArray(selector, indexes)].node
                    });
                } else if (selector.indexOf(':name') !== -1) {
                    // Button name selector
                    var name = selector.replace(':name', '');

                    for (i = 0, ien = buttons.length; i < ien; i++) {
                        if (buttons[i].name === name) {
                            ret.push({
                                inst: inst,
                                node: buttons[i].node
                            });
                        }
                    }
                } else {
                    // jQuery selector on the nodes
                    $(nodes).filter(selector).each(function () {
                        ret.push({
                            inst: inst,
                            node: this
                        });
                    });
                }
            } else if (typeof selector === 'object' && selector.nodeName) {
                // Node selector
                var idx = $.inArray(selector, nodes);

                if (idx !== -1) {
                    ret.push({
                        inst: inst,
                        node: nodes[idx]
                    });
                }
            }
        };


        for (var i = 0, ien = insts.length; i < ien; i++) {
            var inst = insts[i];

            run(selector, inst);
        }

        return ret;
    };

    /**
     * Version information
     *
     * @name Buttons.version
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @type {string}
     *
     * @static
     *
     */
    Buttons.version = '1.5.1';


    $.extend(_dtButtons, {
        collection: {
            text: function (dt) {
                return $.rup.i18nParse($.rup.i18n.base, 'rup_table.collection');
            },
            className: 'buttons-collection',
            action: function (e, dt, button, config) {
                var host = button;
                var collectionParent = $(button).parents('div.dt-button-collection');
                var hostPosition = {
                    top: host.position().top + parseInt(host.css('marginTop'), 10),
                    left: host.position().left + parseInt(host.css('marginLeft'), 10)
                };
                var tableContainer = $(dt.table().container());
                var multiLevel = false;
                var insertPoint = host;

                // Remove any old collection
                if (collectionParent.length) {
                    multiLevel = $('.dt-button-collection').position();
                    insertPoint = collectionParent;
                    $('body').trigger('click.dtb-collection');
                }

                config._collection
                    .addClass(config.collectionLayout)
                    .css('display', 'none')
                    .insertAfter(insertPoint)
                    .fadeIn(config.fade);


                var position = config._collection.css('position');

                if (multiLevel && position === 'absolute') {
                    config._collection.css({
                        top: multiLevel.top,
                        left: multiLevel.left
                    });
                } else if (position === 'absolute') {
                    config._collection.css({
                        top: hostPosition.top + host.outerHeight(),
                        left: hostPosition.left
                    });

                    // calculate overflow when positioned beneath
                    var tableBottom = tableContainer.offset().top + tableContainer.height();
                    var listBottom = hostPosition.top + host.outerHeight() + config._collection.outerHeight();
                    var bottomOverflow = listBottom - tableBottom;

                    // calculate overflow when positioned above
                    var listTop = hostPosition.top - config._collection.outerHeight();
                    var tableTop = tableContainer.offset().top;
                    var topOverflow = tableTop - listTop;

                    // if bottom overflow is larger, move to the top because it fits better
                    if (bottomOverflow > topOverflow) {
                        config._collection.css('top', hostPosition.top - config._collection.outerHeight() - 5);
                    }

                    var listRight = hostPosition.left + config._collection.outerWidth();
                    var tableRight = tableContainer.offset().left + tableContainer.width();
                    if (listRight > tableRight) {
                        config._collection.css('left', hostPosition.left - (listRight - tableRight));
                    }
                } else {
                    // Fix position - centre on screen
                    var top = config._collection.height() / 2;
                    if (top > $(window).height() / 2) {
                        top = $(window).height() / 2;
                    }

                    config._collection.css('marginTop', top * -1);
                }

                if (config.background) {
                    // Si la tabla se encuentra en un dialogo insertamos el background dentro del dialogo
                    if ($('div.rup-dialog').has('#' + dt.context[0].sTableId + '_wrapper').length ? true : false) {
                        $('div.rup-dialog #' + dt.context[0].sTableId + '_wrapper').append('<div class="dt-button-background"></div>');
                    }
                    // Si no usamos el funcionamiento por defecto
                    else {
                        Buttons.background(true, config.backgroundClassName, config.fade);
                    }
                }

                // Need to break the 'thread' for the collection button being
                // activated by a click - it would also trigger this event
                setTimeout(function () {
                    // This is bonkers, but if we don't have a click listener on the
                    // background element, iOS Safari will ignore the body click
                    // listener below. An empty function here is all that is
                    // required to make it work...
                    $('div.dt-button-background').on('click.dtb-collection', function () {});

                    $('body').on('click.dtb-collection', function (e) {
                        // andSelf is deprecated in jQ1.8, but we want 1.7 compat
                        var back = $.fn.addBack ? 'addBack' : 'andSelf';

                        if (!$(e.target).parents()[back]().filter(config._collection).length) {
                            config._collection
                                .fadeOut(config.fade, function () {
                                    config._collection.detach();
                                });

                            $('div.dt-button-background').off('click.dtb-collection');

                            // Si la tabla se encuentra en un dialogo eliminamos el background de dentro del dialogo
                            if ($('div.rup-dialog').has('#' + dt.context[0].sTableId + '_wrapper').length ? true : false) {
                                $('div.dt-button-background').remove();
                            }
                            // Si no usamos el funcionamiento por defecto
                            else {
                                Buttons.background(false, config.backgroundClassName, config.fade);
                            }

                            $('body').off('click.dtb-collection');
                            dt.off('buttons-action.b-internal');
                        }
                    });
                }, 10);

                // Como el boton se posiciona de manera absoluta hay que establecerle la posicion
                // cada vez que se cambia el tamaño de la pantalla.
                $(window).on('resize.ajustarCollection', (function () {
                    if (!$('div.dt-button-collection').is(':visible')) {
                        $(window).off('resize.ajustarCollection');
                    } else {
                        hostPosition = {
                            top: host.position().top + parseInt(host.css('marginTop'), 10),
                            left: host.position().left + parseInt(host.css('marginLeft'), 10)
                        };

                        config._collection.css({
                            top: hostPosition.top + host.outerHeight(),
                            left: hostPosition.left
                        });
                    }
                }));

                if (config.autoClose) {
                    dt.on('buttons-action.b-internal', function () {
                        $('div.dt-button-background').click();
                    });
                }
            },
            background: true,
            collectionLayout: '',
            backgroundClassName: 'dt-button-background',
            autoClose: false,
            fade: 400,
            attr: {
                'aria-haspopup': true
            }
        },
        addButton: function (dt, conf) {
            var ctx = dt.context[0];
            var collection = _dtButtons['collection'];
            _dtButtons = ctx.ext.buttons;
            _dtButtons.collection = collection;
            if (_dtButtons.addButton) {
                return 'addButton';
            }
        },
        editButton: function (dt, conf) {
            if (_dtButtons.editButton) {
                return 'editButton';
            }
        },
        cloneButton: function (dt, conf) {
            if (_dtButtons.cloneButton) {
                return 'cloneButton';
            }
        },
        deleteButton: function (dt, conf) {
            if (_dtButtons.deleteButton) {
                return 'deleteButton';
            }
        },
        reportsButton: function (dt, conf) {
            if (_dtButtons.reportsButton) {
                return 'reportsButton';
            }
        },
        pageLength: function (dt) {
            var lengthMenu = dt.settings()[0].aLengthMenu;
            var vals = $.isArray(lengthMenu[0]) ? lengthMenu[0] : lengthMenu;
            var lang = $.isArray(lengthMenu[0]) ? lengthMenu[1] : lengthMenu;
            var text = function (dt) {
                return dt.i18n('rup_table.pageLength', {
                    '-1': 'Show all rows',
                    _: 'Show %d rows'
                }, dt.page.len());
            };

            return {
                extend: 'collection',
                text: text,
                className: 'buttons-page-length',
                autoClose: true,
                buttons: $.map(vals, function (val, i) {
                    return {
                        text: lang[i],
                        className: 'button-page-length',
                        action: function (e, dt) {
                            dt.page.len(val).draw();
                        },
                        init: function (dt, node, conf) {
                            var that = this;
                            var fn = function () {
                                that.active(dt.page.len() === val);
                            };

                            dt.on('length.dt' + conf.namespace, fn);
                            fn();
                        },
                        destroy: function (dt, node, conf) {
                            dt.off('length.dt' + conf.namespace);
                        }
                    };
                }),
                init: function (dt, node, conf) {
                    var that = this;
                    dt.on('length.dt' + conf.namespace, function () {
                        that.text(text(dt));
                    });
                },
                destroy: function (dt, node, conf) {
                    dt.off('length.dt' + conf.namespace);
                }
            };
        }
    });


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables API
     *
     * For complete documentation, please refer to the docs/api directory or the
     * DataTables site
     */

    // Buttons group and individual button selector
    DataTable.Api.register('buttons()', function (group, selector) {
        // Argument shifting
        if (selector === undefined) {
            selector = group;
            group = undefined;
        }

        this.selector.buttonGroup = group;

        var res = this.iterator(true, 'table', function (ctx) {
            if (ctx._buttons) {
                return Buttons.buttonSelector(
                    Buttons.instanceSelector(group, ctx._buttons),
                    selector
                );
            }
        }, true);

        res._groupSelector = group;
        return res;
    });

    // Individual button selector
    DataTable.Api.register('button()', function (group, selector) {
        // just run buttons() and truncate
        var buttons = this.buttons(group, selector);

        if (buttons.length > 1) {
            buttons.splice(1, buttons.length);
        }

        return buttons;
    });

    // Active buttons
    DataTable.Api.registerPlural('buttons().active()', 'button().active()', function (flag) {
        if (flag === undefined) {
            return this.map(function (set) {
                return set.inst.active(set.node);
            });
        }

        return this.each(function (set) {
            set.inst.active(set.node, flag);
        });
    });

    // Get / set button action
    DataTable.Api.registerPlural('buttons().action()', 'button().action()', function (action) {
        if (action === undefined) {
            return this.map(function (set) {
                return set.inst.action(set.node);
            });
        }

        return this.each(function (set) {
            set.inst.action(set.node, action);
        });
    });

    // Enable / disable buttons
    DataTable.Api.register(['buttons().enable()', 'button().enable()'], function (flag, contextMenu) {
        return this.each(function (set) {
            set.inst.enable(set.node, flag, contextMenu);
        });
    });

    // Disable buttons
    DataTable.Api.register(['buttons().disable()', 'button().disable()'], function (contextMenu) {
        return this.each(function (set) {
            set.inst.disable(set.node, contextMenu);
        });
    });

    // Get button nodes
    DataTable.Api.registerPlural('buttons().nodes()', 'button().node()', function () {
        var jq = $();

        // jQuery will automatically reduce duplicates to a single entry
        $(this.each(function (set) {
            jq = jq.add(set.inst.node(set.node));
        }));

        return jq;
    });

    // Get / set button processing state
    DataTable.Api.registerPlural('buttons().processing()', 'button().processing()', function (flag) {
        if (flag === undefined) {
            return this.map(function (set) {
                return set.inst.processing(set.node);
            });
        }

        return this.each(function (set) {
            set.inst.processing(set.node, flag);
        });
    });

    // Get / set button text (i.e. the button labels)
    DataTable.Api.registerPlural('buttons().text()', 'button().text()', function (label) {
        if (label === undefined) {
            return this.map(function (set) {
                return set.inst.text(set.node);
            });
        }

        return this.each(function (set) {
            set.inst.text(set.node, label);
        });
    });

    // Trigger a button's action
    DataTable.Api.registerPlural('buttons().trigger()', 'button().trigger()', function () {
        return this.each(function (set) {
            set.inst.node(set.node).trigger('click');
        });
    });

    // Get the container elements
    DataTable.Api.registerPlural('buttons().containers()', 'buttons().container()', function () {
        var jq = $();
        var groupSelector = this._groupSelector;

        // We need to use the group selector directly, since if there are no buttons
        // the result set will be empty
        this.iterator(true, 'table', function (ctx) {
            if (ctx._buttons) {
                var insts = Buttons.instanceSelector(groupSelector, ctx._buttons);

                for (var i = 0, ien = insts.length; i < ien; i++) {
                    jq = jq.add(insts[i].container());
                }
            }
        });

        return jq;
    });

    // Add a new button
    DataTable.Api.register('button().add()', function (idx, conf) {
        var ctx = this.context;
        var api = new DataTable.Api(ctx);

        // Don't use `this` as it could be empty - select the instances directly
        if (ctx.length) {
            var inst = Buttons.instanceSelector(this._groupSelector, ctx[0]._buttons);

            if (inst.length) {
                inst[0].add(conf, idx);
                // Nuevo botón al contextMenu
                _updateContextMenu(this[0].inst.s.buttons, api, ctx[0]);
            }
        }

        return this.button(this._groupSelector, idx);
    });

    // Destroy the button sets selected
    DataTable.Api.register('buttons().destroy()', function () {
        this.pluck('inst').each(function (inst) {
            inst.destroy();
        });

        return this;
    });

    // Remove a button
    DataTable.Api.registerPlural('buttons().remove()', 'buttons().remove()', function () {
        this.each(function (set) {
            set.inst.remove(set.node);
        });

        return this;
    });

    // Information box that can be used by buttons
    var _infoTimer;
    DataTable.Api.register('buttons.info()', function (title, message, time) {
        var that = this;

        if (title === false) {
            $('#table_buttons_info').fadeOut(function () {
                $(this).remove();
            });
            clearTimeout(_infoTimer);
            _infoTimer = null;

            return this;
        }

        if (_infoTimer) {
            clearTimeout(_infoTimer);
        }

        if ($('#table_buttons_info').length) {
            $('#table_buttons_info').remove();
        }

        title = title ? '<h2>' + title + '</h2>' : '';

        $('<div id="table_buttons_info" class="dt-button-info"></div>')
            .html(title)
            .append($('<div></div>')[typeof message === 'string' ? 'html' : 'append'](message))
            .css('display', 'none')
            .appendTo('body')
            .fadeIn();

        if (time !== undefined && time !== 0) {
            _infoTimer = setTimeout(function () {
                that.buttons.info(false);
            }, time);
        }

        return this;
    });

    // Get data from the table for export - this is common to a number of plug-in
    // buttons so it is included in the Buttons core library
    DataTable.Api.register('buttons.exportData()', function (options) {
        if (this.context.length) {
            return _exportData(new DataTable.Api(this.context[0]), options);
        }
    });

    // Get information about the export that is common to many of the export data
    // types (DRY)
    DataTable.Api.register('buttons.exportInfo()', function (conf) {
        if (!conf) {
            conf = {};
        }

        return {
            filename: _filename(conf),
            title: _title(conf),
            messageTop: _message(this, conf.message || conf.messageTop, 'top'),
            messageBottom: _message(this, conf.messageBottom, 'bottom')
        };
    });

    // Gestiona las acciones de los botones
    DataTable.Api.register('buttons.actions()', function (dt, config) {
        var ctx = dt.settings()[0];
        // Añade aquí las funciones de tus botones
        switch (config.type) {
        case 'add':
        	ctx.oInit.buttons.myLastAction = 'add';
            if (ctx.oInit.formEdit !== undefined) {
                let idTableDetail = ctx.oInit.formEdit.detailForm;
                // Limpiamos el formulario
                if($(idTableDetail).find('form')[0] !== undefined) {
                	$(idTableDetail).find('form')[0].reset();
                    jQuery.each($('select.rup_combo',$(idTableDetail)), function (index, elem) {
        				jQuery(elem).rup_combo('refresh');
                    });
                    if (ctx.multiselection.numSelected > 0) {
                        $.rup_messages('msgConfirm', {
                            message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.checkSelectedElems'),
                            title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.changes'),
                            OKFunction: function () {
                                // Abrimos el formulario
                                if (ctx.oInit.seeker !== undefined) {
                                    DataTable.Api().seeker.limpiarSeeker(dt, ctx); // Y deselecionamos los checks y seekers
                                } else {
                                    if (ctx.oInit.multiSelect !== undefined) {
                                        DataTable.Api().multiSelect.deselectAll(dt); // Y deselecionamos los checks y seekers
                                    } else if (ctx.oInit.select !== undefined) {
                                        DataTable.Api().select.deselect(ctx); // Y deselecionamos los checks y seekers
                                    }
                                }
                                DataTable.Api().editForm.openSaveDialog('POST', dt, null, null);
                            }
                        });
                    } else {
                        DataTable.Api().editForm.openSaveDialog('POST', dt, null, null);
                    }
                } else {
                	$.rup_messages('msgError', {
                        title: 'Error grave',
                        message: '<p>Falta definir "detailForm" en la inicialización de la tabla.</p>'
                    });
                }
            } else { //edicion en linea
                ctx.oInit.inlineEdit.currentPos = undefined;
                DataTable.Api().inlineEdit.add(dt, ctx);
            }
            break;
        case 'edit':
            // Abrimos el formulario
        	ctx.oInit.buttons.myLastAction = 'edit'
            if (ctx.oInit.formEdit !== undefined) {
                //Se busca el idRow con el ultimó seleccionado en caso de no existir será el primero.
                var idRow = DataTable.Api().editForm.getRowSelected(dt, 'PUT').line;
                if (ctx.oInit.formEdit.$navigationBar === undefined || ctx.oInit.formEdit.$navigationBar.funcionParams === undefined ||
                        ctx.oInit.formEdit.$navigationBar.funcionParams[4] === undefined ||
                        dt.page() + 1 === Number(ctx.oInit.formEdit.$navigationBar.funcionParams[4])) {
                    DataTable.Api().editForm.openSaveDialog('PUT', dt, idRow, null);
                }
            } else { //edicion en linea
                //Se busca el idRow con el ultimó seleccionado en caso de no existir será el primero.
                ctx.oInit.inlineEdit.currentPos = undefined;
                ctx.oInit.inlineEdit.alta = undefined;
                var idRowInline = DataTable.Api().inlineEdit.getRowSelected(dt, 'PUT').line;
            }
            break;
        case 'clone':
        	ctx.oInit.buttons.myLastAction = 'clone'
            // Abrimos el formulario
            if (ctx.oInit.formEdit !== undefined) {
                var idRow = DataTable.Api().editForm.getRowSelected(dt, 'CLONE').line;
                DataTable.Api().editForm.openSaveDialog('CLONE', dt, idRow, null);
            } else { //edicion en linea
                ctx.oInit.inlineEdit.alta = true;
                ctx.oInit.inlineEdit.currentPos = undefined;
                var idRowInline = DataTable.Api().inlineEdit.getRowSelected(dt, 'CLONE').line;
            }
            break;
        case 'delete':
        	let customEliminar = ctx.oInit.validarEliminar;
        	if($.isFunction(customEliminar) && customEliminar(ctx)){
        		return false;
        	}
        	ctx.oInit.buttons.myLastAction = 'delete'
            // borramos todos los seleccionados.
            if (ctx.oInit.formEdit !== undefined) {
                DataTable.Api().editForm.deleteAllSelects(dt);
            } else if (ctx.oInit.inlineEdit !== undefined){ //edicion en linea
                DataTable.Api().inlineEdit.deleteAllSelects(dt);
            }else{//Delete sin formulario
            	 _deleteAllSelects(dt);
            }
            break;
        }
    });

    // Detecta el numero de filas seleccionadas y en funcion a eso muestra u oculta
    // los botones
    DataTable.Api.register('buttons.displayRegex()', function (ctx) {
        if (ctx._buttons[0].inst.s.disableAllButttons === undefined) {
            var opts = ctx._buttons[0].inst.s.buttons;
            var collectionObject;
            $.each(opts, function (i) {
                collectionObject = null;
                var numOfSelectedRows = ctx.multiselection.numSelected;
                if (ctx.oInit.masterDetail !== undefined && this.conf.id === ctx.sTableId + 'addButton_1') {
                    //si es maestro detalle para el boton add ,solo se renderiza cuando hay selección en el padre.
                    var table = $(ctx.oInit.masterDetail.master).DataTable();
                    numOfSelectedRows = table.context[0].multiselection.numSelected; //Nums del padre
                    this.conf.displayRegex = /^[1-9][0-9]*$/; //se cambia expresion regular
                }
                _manageButtonsAndButtonsContextMenu(opts[i], numOfSelectedRows, collectionObject, ctx);
                // Comprueba si tiene botones hijos
                if (this.buttons.length > 0) {
                    collectionObject = this;
                    _manageButtonsAndButtonsContextMenu(opts[i], numOfSelectedRows, collectionObject, ctx);
                }
            });
        }
    });

    DataTable.Api.register('buttons.disableAllButtons()', function (ctx, exception) {
        var opts = ctx._buttons[0].inst.s.buttons;
        $.each(opts, function () {
            if (exception === undefined) {
                $(this.node).prop('disabled', true); //para el toolbar
                $('#' + this.node.id + '_contextMenuToolbar').addClass('disabledButtonsTable'); //para el contextmenu
            } else if (this.node.id !== exception) { //ponemos los regex a cero menos la excepcion
                this.conf.displayRegex = undefined;
            }
        });
        ctx._buttons[0].inst.s.disableAllButttons = true;
    });

    DataTable.Api.register('buttons.initButtons()', function (ctx, opts) {
        _initButtons(ctx, opts);
    });
    
    DataTable.Api.register('buttons.deleteNotForm()', function (dt) {
    	 _deleteAllSelects(dt);
    });



    /**
     * Get the file name for an exported file.
     *
     * @name _filename
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object}	config Button configuration
     * @param {boolean} incExtension Include the file name extension
     *
     */
    var _filename = function (config) {
        // Backwards compatibility
        var filename = config.filename === '*' && config.title !== '*' && config.title !== undefined && config.title !== null && config.title !== '' ?
            config.title :
            config.filename;

        if (typeof filename === 'function') {
            filename = filename();
        }

        if (filename === undefined || filename === null) {
            return null;
        }

        if (filename.indexOf('*') !== -1) {
            filename = $.trim(filename.replace('*', $('head > title').text()));
        }

        // Strip characters which the OS will object to
        filename = filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, '');

        var extension = _stringOrFunction(config.extension);
        if (!extension) {
            extension = '';
        }

        return filename + extension;
    };

    /**
     * Simply utility method to allow parameters to be given as a function
     *
     * @name _stringOrFunction
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {undefined|string|function} option Option
     *
     * @return {null|string} Resolved value
     *
     */
    var _stringOrFunction = function (option) {
        if (option === null || option === undefined) {
            return null;
        } else if (typeof option === 'function') {
            return option();
        }
        return option;
    };

    /**
     * Get the title for an exported file.
     *
     * @name _title
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} config	Button configuration
     *
     */
    var _title = function (config) {
        var title = _stringOrFunction(config.title);

        return title === null ?
            null : title.indexOf('*') !== -1 ?
                title.replace('*', $('head > title').text() || 'Exported data') :
                title;
    };

    var _message = function (dt, option, position) {
        var message = _stringOrFunction(option);
        if (message === null) {
            return null;
        }

        var caption = $('caption', dt.table().container()).eq(0);
        if (message === '*') {
            var side = caption.css('caption-side');
            if (side !== position) {
                return null;
            }

            return caption.length ?
                caption.text() :
                '';
        }

        return message;
    };







    var _exportTextarea = $('<textarea></textarea>')[0];
    var _exportData = function (dt, inOpts) {
        var config = $.extend(true, {}, {
            rows: null,
            columns: '',
            modifier: {
                search: 'applied',
                order: 'applied'
            },
            orthogonal: 'display',
            stripHtml: true,
            stripNewlines: true,
            decodeEntities: true,
            trim: true,
            format: {
                header: function (d) {
                    return strip(d);
                },
                footer: function (d) {
                    return strip(d);
                },
                body: function (d) {
                    return strip(d);
                }
            }
        }, inOpts);

        var strip = function (str) {
            if (typeof str !== 'string') {
                return str;
            }

            // Always remove script tags
            str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

            if (config.stripHtml) {
                str = str.replace(/<[^>]*>/g, '');
            }

            if (config.trim) {
                str = str.replace(/^\s+|\s+$/g, '');
            }

            if (config.stripNewlines) {
                str = str.replace(/\n/g, ' ');
            }

            if (config.decodeEntities) {
                _exportTextarea.innerHTML = str;
                str = _exportTextarea.value;
            }

            return str;
        };


        var header = dt.columns(config.columns).indexes().map(function (idx) {
            var el = dt.column(idx).header();
            return config.format.header(el.innerHTML, idx, el);
        }).toArray();

        var footer = dt.table().footer() ?
            dt.columns(config.columns).indexes().map(function (idx) {
                var el = dt.column(idx).footer();
                return config.format.footer(el ? el.innerHTML : '', idx, el);
            }).toArray() :
            null;

        // If Select is available on this table, and any rows are selected, limit the export
        // to the selected rows. If no rows are selected, all rows will be exported. Specify
        // a `selected` modifier to control directly.
        var modifier = $.extend({}, config.modifier);
        if (dt.select && typeof dt.select.info === 'function' && modifier.selected === undefined) {
            if (dt.rows(config.rows, $.extend({
                selected: true
            }, modifier)).any()) {
                $.extend(modifier, {
                    selected: true
                })
            }
        }

        var rowIndexes = dt.rows(config.rows, modifier).indexes().toArray();
        var selectedCells = dt.cells(rowIndexes, config.columns);
        var cells = selectedCells
            .render(config.orthogonal)
            .toArray();
        var cellNodes = selectedCells
            .nodes()
            .toArray();

        var columns = header.length;
        var rows = columns > 0 ? cells.length / columns : 0;
        var body = [rows];
        var cellCounter = 0;

        for (var i = 0, ien = rows; i < ien; i++) {
            var row = [columns];

            for (var j = 0; j < columns; j++) {
                row[j] = config.format.body(cells[cellCounter], i, j, cellNodes[cellCounter]);
                cellCounter++;
            }

            body[i] = row;
        }

        return {
            header: header,
            footer: footer,
            body: body
        };
    };

    /**
     * Activa la coleccion
     *
     * @name _enableCollection
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} id	Id of the button
     *
     */
    var _enableCollection = function (id) {
        $('#' + id).prop('disabled', false);
    };

    /**
     * Desactiva la coleccion
     *
     * @name _disableCollection
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} id	Id of the button
     *
     */
    var _disableCollection = function (id) {
        $('#' + id).prop('disabled', true);
    };

    /**
     * Activa el boton y su opcion dentro del context menu
     *
     * @name _enableButtonAndContextMenuOption
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} id	Id of the button
     *
     */
    var _enableButtonAndContextMenuOption = function (id) {
        $('#' + id).prop('disabled', false);
        $('#' + id + '_contextMenuToolbar').removeClass('disabledButtonsTable');
    };

    /**
     * Desactiva el boton y su opcion dentro del context menu
     *
     * @name _disableButtonAndContextMenuOption
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {string} id	Id of the button
     *
     */
    var _disableButtonAndContextMenuOption = function (id) {
    	$('#' + id).prop('disabled', true);
    	$('#' + id + '_contextMenuToolbar').addClass('disabledButtonsTable');
    };

    /**
     * Gestiona la propiedad de activado/desactivado de los botones y de sus opciones
     * dentro del context menu.
     *
     * @name _manageButtonsAndButtonsContextMenu
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} opts	Buttons properties
     * @param {int} numOfSelectedRows	Number of selected rows
     * @param {null|object} collectionObject	Collection button properties
     *
     */
    var _manageButtonsAndButtonsContextMenu = function (opts, numOfSelectedRows, collectionObject, ctx) {
        if (opts.conf.custom === undefined || !opts.conf.custom) {
            // Si pertenece a un collection o es un collection
            if (opts.collection !== null && collectionObject) {
                var collectionId = collectionObject.conf.id;
                var collectionDisplayRegex = collectionObject.conf.displayRegex;
                var alreadyExecuted = false;
                // Recorre todos los botones dentro del collection
                $.each(collectionObject.buttons, function (key, value) {
                    // Activa/desactiva en funcion de la propiedad 'displayRegex' del padre y los hijos
                    if (collectionDisplayRegex !== undefined && value.conf.displayRegex !== undefined) {
                        if (collectionDisplayRegex.test(numOfSelectedRows) && value.conf.displayRegex.test(numOfSelectedRows)) {
                            _enableButtonAndContextMenuOption(value.conf.id);
                        } else {
                            _disableButtonAndContextMenuOption(value.conf.id);
                        }
                    }
                    // Activa/desactiva en funcion de la propiedad 'displayRegex' de sus hijos
                    else if (collectionDisplayRegex === undefined && value.conf.displayRegex !== undefined) {
                        // Habilita la coleccion si cumple el regex (solo se ejecuta una vez como
                        // maximo gracias al booleano 'alreadyExecuted')
                        if (value.conf.displayRegex.test(numOfSelectedRows) && !alreadyExecuted) {
                            _enableCollection(collectionId);
                            alreadyExecuted = true;
                        }
                        // Habilita el boton si cumple el displayRegex
                        if (value.conf.displayRegex.test(numOfSelectedRows)) {
                            _enableButtonAndContextMenuOption(value.conf.id);
                        }
                        // Como este boton no cumple el 'displayRegex' para ser habilitado, se deshabilitan
                        // tanto el boton como su opcion en el contextMenu
                        else {
                            _disableButtonAndContextMenuOption(value.conf.id);
                        }
                        // En caso de que ningun regex cumpliese, se fuerza la deshabilitacion
                        if (!alreadyExecuted) {
                            _disableCollection(collectionId);
                        }
                    }
                    // Desactiva todo si ni el collection ni los hijos tienen la propiedad 'displayRegex'
                    // o simplemente si los hijos no tienen la propiedad
                    else {
                        _disableButtonAndContextMenuOption(value.conf.id);
                        if (!alreadyExecuted) {
                            _disableCollection(collectionId);
                            alreadyExecuted = true;
                        }
                    }
                });
                // Genera un evento encargado de ocultar los botones dentro del collection.
                // Se comprueba mediante una clase si ya tiene o no el evento, mejorando asi
                // el rendimiento
                $('#' + collectionId + ':not(.listening)').addClass('listening').on('click', function (e) {
                    // Se establece el valor de 'numOfSelectedRows' porque sino siempre tendria
                    // el valor recibido cuando se creo el evento
                    var numOfSelectedRows = ctx.multiselection.numSelected;
                    $.each(collectionObject.buttons, function (key, value) {
                        // Habilita el boton dentro del collection
                        if (value.conf.displayRegex.test(numOfSelectedRows)) {
                            _enableButtonAndContextMenuOption(value.conf.id);
                        }
                        // Deshabilita el boton dentro del collection
                        else {
                            _disableButtonAndContextMenuOption(value.conf.id);
                        }
                    });
                });
            }
            // Si el boton no tiene un regex definido, permanecera siempre desactivado
            else if (opts.conf.displayRegex === undefined) {
                // Deshabilita el boton y su opcion dentro del context menu
                _disableButtonAndContextMenuOption(opts.conf.id);
            }
            // Si tiene un regex definido, lo activa y desactiva en funcion de este
            else if (opts.conf.displayRegex !== undefined) {
                // Si el regex recibido de cada boton cumple la sentencia al probarlo contra
                // el numero de filas seleccionadas, se mostrara, en caso contrario, permanecera
                // oculto
                if (opts.conf.displayRegex.test(numOfSelectedRows)) {
                    // Habilita el boton y su opcion dentro del context menu
                    _enableButtonAndContextMenuOption(opts.conf.id);
                } else {
                    // Deshabilita el boton y su opcion dentro del context menu
                    _disableButtonAndContextMenuOption(opts.conf.id);
                }
            }
        }
    };

    /**
     * Establece el tipo de llamada necesario para obtener los datos según lo seleccionado
     * e inicia la gestión para finalmente obtenerlos
     *
     * @name _reports
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {object} that Objeto del boton
     * @param {object} config Configuracion del boton
     *
     */
    var _reports = function (dt, that, config) {
        var ctx = dt.settings()[0];
        let info = dt.buttons.exportInfo(config);
        let type;
        let multiselection = ctx.multiselection;
        let selectedAll = multiselection.selectedAll;
        let deselectedIds = multiselection.deselectedIds;

        if (selectedAll) {
            if (deselectedIds.length > 0) {
                // Este caso es para cuando se selecciona todo y despues se
                // deseleccionan algunos registros
                type = 'all-deselected';
            } else {
                // Este caso es para cuando se seleccionan todos los registros
                type = 'all';
            }
        } else if (multiselection.selectedIds.length > 0) {
            // Este caso para cuando hay determinados registros seleccionados manualmente
            type = 'selected';
        } else {
            // Este caso para cuando no hay registros seleccionados
            type = 'all';
            selectedAll = true;
        }

        $.when(_reportsTypeOfCopy(dt, type, config.request, multiselection, selectedAll, deselectedIds)).then(function (exportData, ajaxOptions) {
            // Si exportData cumple la siguiente condicion significa que los datos se van a copiar al portapapeles
        	if(exportData !== undefined) {
        		let exportDataRows = exportData.length;
        		let exportDataParsed = JSON.stringify(exportData);
        		let hiddenDiv = $('<div></div>')
                    .css({
                        height: 1,
                        width: 1,
                        overflow: 'hidden',
                        position: 'fixed',
                        top: 0,
                        left: 0
                    });
        		
        		if (typeof ajaxOptions.data == 'string') {
        			ajaxOptions.data = JSON.parse(ajaxOptions.data);
        		}

        		exportDataParsed = _convertToTabulador(ajaxOptions.reportsExportAllColumns, ajaxOptions.data.columns, exportDataParsed, true);
                
        		let textarea = $('<textarea readonly></textarea>')
                    .val(exportDataParsed)
                    .appendTo(hiddenDiv);
                
        		_reportsOpenMessage(dt, ctx, that, exportDataRows, hiddenDiv, textarea);
        	} else {
        		// Descargara un fichero
        		_reportsRequestFile(ctx, ajaxOptions);
        	}
        });
    };

    /**
     * Se encarga de mapear los datos de json a datos separados por el tabulador.
     *
     * @name ConvertToTabulador
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {boolean} reportsExportAllColumns true en caso de querer mostrar todas las columnas (incluidas las ocultas)
     * @param {object} columns Objeto que contiene las columnas a mostrar
     * @param {object} objArray Objeto que contiene los datos a exportar
     * @param {boolean} true en caso de querer que se mueste la cabecera
     *
     * @return {object}
     *
     */
    var _convertToTabulador = function (reportsExportAllColumns, columns, objArray, showLabel) {
        let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let separator = ";";
        let str = '';
        let checkColumns = false;
        
        // Separador de campos dependiendo del idioma
        if ($.rup.lang === 'en') {
        	separator = ",";
        }
        
        if (!reportsExportAllColumns && columns != undefined) {
        	checkColumns = true;
        }

        if (showLabel) {
        	// Comprueba si solo se quieren mostrar las columnas definidas/visibles o todas
            if (checkColumns) {
            	str = '\"' + columns.toString().replace(/,/g, '\"' + separator + '\"') + '\"\r\n';
            } else {
            	let row = '';
                // Se asignan los nombres de las columnas
                $.each(array[0], function (key, value) {
                    // Comprobar si es un objeto, en caso afirmativo lo recorremos y lo concatenamos
                    if ($.isPlainObject(value)) {
                    	let objectName = key;
                        $.each(this, function (key, value) {
                        	let keyToCamelKeys = key.substring(0, 1).toLocaleUpperCase() + key.substring(1);
                            row += '\"' + objectName + keyToCamelKeys + '\"' + separator;
                        });
                    } else {
                        row += '\"' + key + '\"' + separator;
                    }
                });
                row = row.slice(0, -1);
                str += row + '\r\n';
            }
        }
        
        // Se asignan los valores
        $.each(array, function () {
        	let line = '';
            $.each(this, function (key, value) {
            	// Comprueba si solo se quieren mostrar los valores de las columnas definidas/visibles y evita la insercion de las no que no lo estan
            	if (checkColumns && columns.indexOf(key) == -1) {
            		return;
            	}
            	// Comprobar si es un objeto, en caso afirmativo lo recorremos y lo concatenamos
                if ($.isPlainObject(value)) {
                    $.each(this, function (key, value) {
                        line += '\"' + value + '\"' + separator;
                    });
                } else {
                    line += '\"' + value + '\"' + separator;
                }
            });
            line = line.slice(0, -1);
            str += line + '\r\n';
        });

        return str;
    }

    /**
     * Según el tipo de función de copia solicitada, realiza unas u otras comprobaciones
     * antes de solicitar los datos al servidor
     *
     * @name _reportsTypeOfCopy
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {string} type Tipo de funcion de copia a ejecutar
     * @param {object} request Contiene todos los parametros de la petición AJAX
     * @param {object} multiselection Propiedades de la multiseleccion
     * @param {boolean} selectedAll Cuando es true significa que todas las filas estan marcadas
     * @param {array} [deselectedIds] ID's de las filas deseleccionadas
     *
     * @return {object}
     *
     */
    var _reportsTypeOfCopy = function (dt, type, request, multiselection, selectedAll, deselectedIds) {
        var ctx = dt.settings()[0];
        let deferred = $.Deferred();
        let exportData;
        let selectedIds = multiselection.selectedIds;
        let selectedRows = multiselection.selectedRowsPerPage;
        let ajaxOptions = {};

        if (type === 'selected') {
        	let exportData = [];
        	
        	if (request.dataType === 'json') {
        		let localAccess = true;
        		
        		// Comprueba si todos los valores seleccionados estan en la misma pagina
                $.each(selectedRows, function (key, value) {
                    if (ctx.json.page != value.page) {
                        localAccess = false;
                        return false;
                    }
                });
                
                if (localAccess) {
                    // Puede acceder a los valores seleccionados localmente
                    $.each(selectedRows, function (key, value) {
                    	let idPadre = value.id;
                        $.each(ctx.json.rows, function (key, value) {
                            if (DataTable.Api().rupTable.getIdPk(value) === idPadre) {
                                exportData.push(value);
                            }
                        });
                    });
                    
                    ajaxOptions.data = {};
                    ajaxOptions.data.columns = _loadDefinedColums(dt, ctx, request);
                    ajaxOptions.reportsExportAllColumns = request.reportsExportAllColumns;
                    
                    deferred.resolve(exportData, ajaxOptions);
                    return deferred.promise();
                }
        	}
        } 
        
        if (request.dataType === 'json') {
        	// Accede a los datos mediante el servidor ya que se ha hecho uso de la paginacion
            // Parametros necesarios para configurar la llamada AJAX
        	ajaxOptions = _reportsPrepareRequestData(dt, ajaxOptions, request, ctx, selectedAll, deselectedIds, selectedIds);

            $.when(_reportsRequestData(ajaxOptions, ctx)).then(function (data) {
                exportData = data;
                deferred.resolve(exportData, ajaxOptions);
            });
        } else {
        	// Parametros necesarios para configurar la llamada AJAX
            ajaxOptions = _reportsPrepareRequestData(dt, ajaxOptions, request, ctx, selectedAll, deselectedIds, selectedIds);

            deferred.resolve(undefined, ajaxOptions);
        }
        
        return deferred.promise();
    };

    /**
     * Se encarga de generar las opciones de configuración con las que se llamara a la API
     *
     * @name _reportsPrepareRequestData
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {object} ajaxOptions Parametros de la llamada AJAX
     * @param {object} request Contiene todos los parametros de la petición ajax
     * @param {object} ctx Contexto
     * @param {boolean} selectedAll Cuando es true significa que todas las filas estan marcadas
     * @param {array} [deselectedIds] ID's de las filas deseleccionadas
     * @param {array} [selectedIds] ID's de las filas seleccionadas
     *
     * @return {object}
     *
     */
    var _reportsPrepareRequestData = function (dt, ajaxOptions, request, ctx, selectedAll, deselectedIds, selectedIds) {
        let data = {};
        
        data.columns = _loadDefinedColums(dt, ctx, request);
        
        data.core = {
            'pkToken': ctx.oInit.multiplePkToken,
            'pkNames': ctx.oInit.primaryKey
        };
        
        // Solo se enviara el filtro si contiene algun valor. 
        // Esto facilita la labor de exportacion al servidor ya que no tiene que iterar el filtro para comprobar si todos los campos son nulos.
        if (ctx.oInit.filter.$filterContainer != undefined && !jQuery.isEmptyObject(window.form2object(ctx.oInit.filter.$filterContainer[0]))) {
        	data.filter = window.form2object(ctx.oInit.filter.$filterContainer[0]);
        }
        
        data.multiselection = {};
        data.multiselection.selectedAll = selectedAll;
        
        if (data.multiselection.selectedAll) {
        	data.multiselection.selectedIds = deselectedIds;
        } else {
        	data.multiselection.selectedIds = selectedIds;
        }
        
        data.reportsParams = [];
        // Se añaden los parametros definidos por el usuario (solo en caso de haber definido alguno)
        if (ctx.oInit.buttons.report !== undefined && ctx.oInit.buttons.report.reportsParams.length > 0) {
        	data.reportsParams = ctx.oInit.buttons.report.reportsParams;
        }
        
        // Completa el objeto 'ajaxOptions' con los parametros necesarios para la llamada que se realizara al servidor
        ajaxOptions.contentType = request.contentType;
        ajaxOptions.dataType = request.dataType;
        
        if (request.url !== undefined) {
            ajaxOptions.url = ctx.oInit.urlBase + request.url;
        } else {
            ajaxOptions.url = ctx.oInit.urlBase;
        }
        
        ajaxOptions.reportsExportAllColumns = request.reportsExportAllColumns;
        
        ajaxOptions.type = request.method;
        
        if (request.fileName !== undefined) {
        	data.fileName = request.fileName;
        }
        
        if (request.sheetTitle !== undefined) {
        	data.sheetTitle = request.sheetTitle;
        }
        
        ajaxOptions.data = $.toJSON(data);

        return ajaxOptions;
    };
    
    /**
     * Se encarga de devolver las columnas
     *
     * @name _loadDefinedColums
     * @function
     * @since UDA 4.2.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {object} ctx Contexto
     * @param {object} request Contiene todos los parametros de la petición AJAX
     *
     * @return {object}
     *
     */
    var _loadDefinedColums = function (dt, ctx, request) {
    	let columns = [];
    	
    	if (request.reportsExportAllColumns == undefined) {
    		request.reportsExportAllColumns = ctx.ext.buttons.reportsButton.reportsExportAllColumns;
        }
        
        if (!request.reportsExportAllColumns) {
        	// Se obtienen las columnas a mostrar definidas por el usuario
            if (ctx.oInit.buttons.report !== undefined && ctx.oInit.buttons.report.columns !== undefined) {
            	columns = ctx.oInit.buttons.report.columns;
            } else {
            	// En caso contrario se obtienen las columnas de la tabla
            	$.each(ctx.oInit.columns, function(position, name) {
                	// Se comprueba que el name.data no este vacio para evitar añadir
                	// la columna del checkbox de multiseleccion. Tambien se comprueba
                	// que la columna sea visible
                	if(name.data !== "" && dt.column(position).visible()) {
                		columns.push(name.data);
                	}
                });
            }
        }
        	
        return columns;
    };

    /**
     * Se encarga de llamar a la API y de devolver los datos recibidos
     *
     * @name _reportsRequestData
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} ajaxOptions Parametros de la llamada AJAX
     * @param {object} ctx Contexto
     *
     * @return {object}
     *
     */
    var _reportsRequestData = function (ajaxOptions, ctx) {
    	let deferred = $.Deferred();
        $.ajax(ajaxOptions)
            .done(function (data) {
                deferred.resolve(data);
                $('#' + ctx.sTableId).triggerHandler('tableButtonsSuccessReportsRequestData');
            })
            .complete(function () {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsCompleteReportsRequestData');
            })
            .error(function () {
                $('#' + ctx.sTableId).triggerHandler('tableButtonsErrorReportsRequestData');
            });
        return deferred.promise();
    };
    
    /**
     * Se encarga de llamar a la API y de devolver el fichero recibido
     *
     * @name _reportsRequestFile
     * @function
     * @since UDA 4.2.0 // Table 1.0.0
     *
     * @param {object} ctx Contexto
     * @param {object} ajaxOptions Parametros de la llamada AJAX
     *
     * @return {object}
     *
     */
    var _reportsRequestFile = function (ctx, ajaxOptions) {	
    	// Dialogo de espera
        var $reportFileWait = $('#' + ctx.sTableId + 'reportFileWait');
        $reportFileWait.rup_dialog({
            type: $.rup.dialog.TEXT,
            autoOpen: false,
            modal: true,
            resizable: false,
        });
        
        // Titulo
        let title = $.rup.i18nParse($.rup.i18n.base, 'rup_report.waitTitle');
        let message = $.rup.i18nParse($.rup.i18n.base, 'rup_report.waitMsg');
        if (ctx.oInit.buttons.report !== undefined) {
            if (ctx.oInit.buttons.report.title !== undefined) {
                title = ctx.oInit.buttons.report.title;
            }
            if (ctx.oInit.buttons.report.message !== undefined) {
                message = ctx.oInit.buttons.report.message;
            }
        }
        $reportFileWait.rup_dialog('setOption', 'title', title);
        
        // Contenido
        let content = $reportFileWait.html().split($reportFileWait.text()),
            html = '';
        for (let i = 0; i < content.length; i++) {
            if (content[i] === '') {
                html += message;
            } else {
                html += content[i];
            }
        }
        $reportFileWait.html(html);
	        
        $reportFileWait.rup_dialog('open');
        
        let url = ajaxOptions.url;

        // Lanzar peticion 
        let request = new XMLHttpRequest();
        request.open(ajaxOptions.type, url, true);
        request.responseType = "blob";
        request.send(ajaxOptions.data);

        request.onload = function (event) {
        	if (this.status == 200) {
        		let blob = request.response;
            	let fileName = null;
            	let contentType = request.getResponseHeader("content-type");
            	let element;

            	// Parece que IE y EDGE no devuelven la misma cabecera en la respuesta
            	if (request.getResponseHeader("content-disposition")) {
            		let contentDisposition = request.getResponseHeader("content-disposition");
            		fileName = contentDisposition.substring(contentDisposition.indexOf("=") + 1);
            	} else {
            		fileName = "report." + contentType.substring(contentType.indexOf("/") + 1);
            	}

            	if (window.navigator.msSaveOrOpenBlob) {
            		// IE y EDGE
            		window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
            	} else {
            		// Para los demas navegadores
            		if (!$("a#rupTableButtonsReportsExport").length) {
            			$("div#" + $.rup.WAR_NAME + "War_content").append("<a id='rupTableButtonsReportsExport' class='d-none'>rupTableButtonsReportsExport</a>");
            		}
            		element = $("a#rupTableButtonsReportsExport")[0];
            		element.href = window.URL.createObjectURL(blob);
            		element.download = fileName;
            		element.click();
                    // Eliminamos el ObjectURL y el elemento de DOM generado ya que han sido generados de manera temporal
            		window.URL.revokeObjectURL(element.href);
            		element.remove();
            	}
            	
            	if ($('#' + $reportFileWait.attr('id')).length > 0) {
                    $reportFileWait.rup_dialog('close');
                }
            } else {
            	if ($('#' + $reportFileWait.attr('id')).length > 0) {
                    $reportFileWait.rup_dialog('close');
                    console.info('----------- ERROR -----------');
                }
            }
        };
        request.send();
        
        return false;
    };

    /**
     * Gestiona la apertura/cierre del mensaje de confirmación de copia
     *
     * @name _reportsOpenMessage
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {object} ctx Contexto
     * @param {object} that Objeto del boton
     * @param {int} exportDataRows Numero de filas a ser exportadas
     * @param {object} hiddenDiv Elemento del DOM
     * @param {object} textarea Elemento del DOM
     *
     */
    var _reportsOpenMessage = function (dt, ctx, that, exportDataRows, hiddenDiv, textarea) {
        $.rup_messages('msgConfirm', {
            title: dt.i18n('rup_table.copyButton.changes', 'Copia de registros en clipboard'),
            message: dt.i18n('rup_table.copyButton.saveAndContinue', {
                _: '¿Desea copiar %d registros?',
                1: '¿Desea copiar un registro?'
            }, exportDataRows),
            open: function () {
                $('#' + dt.context[0].sTableId).trigger('rupTable_confirmMsgOpen');
            },
            OKFunction: function () {
                if (ctx.oInit.formEdit !== undefined) {
                    ctx.oInit.formEdit.okCallBack = true;
                }
                _reportsToClipboard(dt, that, exportDataRows, hiddenDiv, textarea);
                if (ctx.oInit.formEdit !== undefined) {
                    ctx.oInit.formEdit.detailForm.rup_dialog('close');
                }
            },
            beforeClose: function () {
                if (ctx.oInit.formEdit !== undefined) {
                    ctx.oInit.formEdit.okCallBack = false
                }
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (that.processing !== undefined) {
                    that.processing(false);
                }
            }
        });
    };

    /**
     * Copia los datos recibidos al portapapeles
     *
     * @name _reportsToClipboard
     * @function
     * @since UDA 3.4.0 // Table 1.0.0
     *
     * @param {object} dt Instancia del table
     * @param {object} that Objeto del boton
     * @param {int} exportDataRows Numero de filas a ser exportadas
     * @param {object} hiddenDiv Elemento del DOM
     * @param {object} textarea Elemento del DOM
     *
     */
    var _reportsToClipboard = function (dt, that, exportDataRows, hiddenDiv, textarea) {
        // Para los navegadores que soportan el comando de copia 'execCommand'
        if (document.queryCommandSupported('copy')) {
            hiddenDiv.appendTo(dt.table().container());
            textarea[0].focus();
            textarea[0].select();

            try {
            	let successful = document.execCommand('copy');
                hiddenDiv.remove();

                if (successful) {
                    dt.buttons.info(
                        dt.i18n('rup_table.copyButton.changes', 'Copia de registros en portapapeles'),
                        dt.i18n('rup_table.copyButton.saved', {
                            _: 'Copiados %d registros al portapapeles',
                            1: 'Copiado un registro al portapapeles'
                        }, exportDataRows),
                        2000
                    );
                    // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                    // del if evita un error
                    if (that.processing !== undefined) {
                        that.processing(false);
                    }
                    $('#' + dt.context[0].sTableId).trigger('rupTable_copied');
                    return;
                }
            } catch (t) {}
        }

        // Si no soportan la copia mediante 'execCommand', se mostrara un text box
        // con las instrucciones de como copiar los elementos seleccionados
        let message = $('<span>' + dt.i18n('rup_table.copyButton.copyKeys',
            'Presiona ctrl o ⌘ + C para copiar los datos de la tabla al portapapeles.' +
                'Para cancelar, haz click sobre este mensaje o pulsa el botón escape.') + '</span>')
            .append(hiddenDiv);

        dt.buttons.info(dt.i18n('rup_table.copyButton.copyTitle', 'Copiar al portapapeles'), message, 0);

        // Selecciona el texto para cuando el usuario accione la copia al portapapeles
        // se le pegue ese texto
        textarea[0].focus();
        textarea[0].select();

        // Evento que oculta el mensaje cuando el usuario ha terminado con la copia
        let container = $(message).closest('.dt-button-info');
        let close = function () {
            container.off('click.buttons-copy');
            $(document).off('.buttons-copy');
            dt.buttons.info(false);
            // Si es llamado desde el contextMenu este paso es innecesario y la condicion
            // del if evita un error
            if (that.processing !== undefined) {
                that.processing(false);
            }
        };

        container.on('click.buttons-copy', close);
        $(document)
            .on('keydown.buttons-copy', function (e) {
                if (e.keyCode === 27) { // esc
                    close();
                }
            })
            .on('copy.buttons-copy cut.buttons-copy', function () {
                close();
                // Si es llamado desde el contextMenu este paso es innecesario y la condicion
                // del if evita un error
                if (that.processing !== undefined) {
                    that.processing(false);
                }
            });
    };

    var _initContextMenu = function (ctx, api) {
        // Creacion del Context Menu
        if (ctx.oInit.buttons !== undefined) {
        	let botonesToolbar = ctx._buttons[0].inst.s.buttons;
            _updateContextMenu(botonesToolbar, api, ctx);
        }
    };
    
    var _deleteAllSelects = function (dt) {
    	var ctx = dt.settings()[0];
    	let idRow = 0;
    	let regex = new RegExp(ctx.oInit.multiplePkToken, 'g');
    	$.rup_messages('msgConfirm', {
    		message: $.rup.i18nParse($.rup.i18n.base, 'rup_table.deleteAll'),
    		title: $.rup.i18nParse($.rup.i18n.base, 'rup_table.delete'),
    		OKFunction: function () {
    			if (ctx.multiselection.selectedIds.length > 1){
    				let row = {};
    				row.core =  {'pkToken': ctx.oInit.multiplePkToken, 'pkNames': ctx.oInit.primaryKey};
    				row.multiselection = {};
    				row.multiselection.selectedAll = ctx.multiselection.selectedAll;
    				if (row.multiselection.selectedAll){
    					row.multiselection.selectedIds = ctx.multiselection.deselectedIds;
    				} else {
    					row.multiselection.selectedIds = ctx.multiselection.selectedIds;
    				}
    				_callDelete('POST',dt,ctx,row,'/deleteAll');
    			} else {
    				row = ctx.multiselection.selectedIds[0];
    				row = row.replace(regex, '/');
    				_callDelete('DELETE', dt, ctx, idRow, '/' + row);
    			}
    		}
    	});
    };
    
    var _callDelete = function (actionType, dt, ctx, row, url) {
        $('#' + ctx.sTableId).triggerHandler('tableBeforeCallDelete');

        let _callFeedbackDelete = function (ctx, msgFeedBack, type) {
            $('#' + ctx.sTableId).triggerHandler('tableFeedbackShowDelete');
            ctx.oInit.feedback.$feedbackContainer.rup_feedback('set', msgFeedBack, type);
            ctx.oInit.feedback.$feedbackContainer.rup_feedback('show');
        };

        if (ctx.oInit.masterDetail !== undefined) { //Asegurar que se recoge el idPadre
        	let masterPkObject = DataTable.Api().masterDetail.getMasterTablePkObject(ctx);
            jQuery.extend(true, masterPkObject, row);
            row = masterPkObject;
        }

        let msgFeedBack = $.rup.i18nParse($.rup.i18n.base, 'rup_table.deletedOK');

        let ajaxOptions = {
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
                // Eliminar
                if (ctx.oInit.multiSelect !== undefined) {
                    DataTable.Api().multiSelect.deselectAll(dt);
                } else if (ctx.oInit.select !== undefined) {
                    DataTable.Api().select.deselect(ctx);
                }
                $('#' + ctx.sTableId).triggerHandler('tablefterDelete');

                ctx._buttons[0].inst.s.disableAllButttons = undefined;

                DataTable.Api().seeker.disabledButtons(ctx);

                // Recargar datos
                // Primer parametro para mandar una funcion a ejecutar, segundo parametro bloquear la pagina si pones false
                dt.ajax.reload(function () {
                    _callFeedbackDelete(ctx, msgFeedBack, 'ok');
                }, false);


                $('#' + ctx.sTableId).triggerHandler('tableSuccessCallDelete');
            },
            complete: function () {
                $('#' + ctx.sTableId).triggerHandler('tableCompleteCallDelete');
            },
            error: function (xhr) {
                _callFeedbackDelete(ctx, xhr.responseText, 'error');
                $('#' + ctx.sTableId).triggerHandler('tableErrorCallDelete');
            },
            feedback: () => {
                _callFeedbackDelete(ctx, msgFeedBack, 'ok');
            }
        };

        ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        $.rup_ajax(ajaxOptions);
    };

    var _updateContextMenu = function (botones, api, ctx) {
        let items = {};
        let tableId = ctx.sTableId;
        $.each(botones, function () {
            // Entra si tiene marcada la opcion para habilitarlo dentro del contextMenu
            if (this.conf.insideContextMenu) {
                // Poblamos el objeto 'items' con los botones habilitados
                items[this.conf.id] = {
                    id: this.conf.id + '_contextMenuToolbar',
                    name: this.conf.text(api),
                    icon: this.conf.icon,
                    inCollection: this.inCollection,
                    idCollection: undefined
                };
            }
            // Comprueba si tiene botones hijos
            if (this.buttons.length > 0) {
                var idCollection = this.conf.id;
                $.each(this.buttons, function (i) {
                    // Entra si tiene marcada la opcion para habilitarlo dentro del contextMenu
                    if (this.conf.insideContextMenu) {
                        // Poblamos el objeto 'items' con los botones habilitados
                        items[this.conf.id] = {
                            id: this.conf.id + '_contextMenuToolbar',
                            name: this.conf.text(api),
                            icon: this.conf.icon,
                            inCollection: this.inCollection,
                            idCollection: idCollection
                        };
                    }
                });
            }
        });

        var tableTrSelector = '#' + tableId + ' > tbody > tr';
        var tableTr = $(tableTrSelector);
        tableTr.selector = tableTrSelector;
        if (!jQuery.isEmptyObject(items)) {
            tableTr.rup_contextMenu('destroy');
            tableTr.rup_contextMenu({
                selector: tableTrSelector,
                callback: function (key, options) {
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
                        var dt = $('#' + ctx.sTableId).DataTable();
                        var eventConfig;
                        $.each(ctx.ext.buttons, function (key) {
                            var buttonObject = ctx.ext.buttons[key];
                            if (buttonObject.id === buttonId) {
                                buttonName = key;
                                eventConfig = buttonObject;
                            }
                        });
                        // Llamamos directamente al action para no hacer aparecer y desaparecer
                        // el boton, empeorando la UX
                        ctx.ext.buttons[buttonName].action(undefined, dt, undefined, eventConfig);
                    } else {
                        $('#' + buttonId).trigger('click');
                    }
                },
                items
            });
        }
    };

    /**
     * Inicializa los botones
     *
     * @name _initButtons
     * @function
     * @since UDA 3.7.0 // Table 1.0.0
     *
     * @param {object} ctx - Settings object to operate on
     * @param {List<object>} opts Lista de botones
     *
     */
    var _initButtons = function (ctx, opts) {
        $.each(opts, function (i) {
            // Activa/desactiva los botones en el inicio en funcion de la propiedad
            // 'displayRegex' que tengan asociada
            var collectionObject = null;
            var numOfSelectedRows = ctx.multiselection.numSelected;
            if (ctx.oInit.masterDetail !== undefined && this.conf.id === ctx.sTableId + 'addButton_1') {
                //si es maestro detalle para el boton add ,solo se renderiza cuando hay selección en el padre.
                var table = $(ctx.oInit.masterDetail.master).DataTable();
                numOfSelectedRows = table.context[0].multiselection.numSelected; //Nums del padre
                this.conf.displayRegex = /^[1-9][0-9]*$/; //se cambia expresion regular
            }
            _manageButtonsAndButtonsContextMenu(opts[i], numOfSelectedRows, collectionObject, ctx);
            // Comprueba si tiene botones hijos
            if (this.buttons.length > 0) {
                collectionObject = this;
                _manageButtonsAndButtonsContextMenu(opts[i], numOfSelectedRows, collectionObject, ctx);
            }
            // Comprueba si tiene un icono asociado
            if (this.conf.icon !== undefined) {
                // Establece el icono de los botones
                if ($(this.node).find('i').length === 0) {
                    $('#' + this.conf.id).prepend('<i class="mdi ' + this.conf.icon + '" aria-hidden="true"></i>');
                }

                // Comprueba si tiene botones hijos
                if (this.buttons.length > 0 && $('#' + this.conf.id).length > 0) {
                    // Añadimos un evento para cuando se pulse sobre el boton padre, se le
                    // asignen los iconos a los hijos
                    $('#' + this.conf.id)[0].addEventListener('click', function eventHandler() {
                        var that = this;
                        $.each(opts[i].buttons, function (i) {
                            var selectorCollection = $('#' + this.conf.id);

                            // Establece el icono de los botones hijos
                            if ($(this.node).find('i').length === 0) {
                                selectorCollection.prepend('<i class="mdi ' + this.conf.icon + '" aria-hidden="true"></i>');
                            }

                            that.removeEventListener('click', eventHandler);
                        });
                    }, false);
                }
            }
        });

        //Añadir dialogo por defecto
        var $defaultDialog_wait = $('<div></div>')
                .attr('id', ctx.sTableId + 'reportFileWait')
                .attr('title', 'Tittle Prueba')
                .text('prueba')
                .addClass('rup_report')
                .hide()
            //progressbar
                .append($('<div></div>').addClass('ui-progressbar ui-progressbar-value ui-corner-left ui-corner-right')),
            $defaultDialog_error = $('<div></div>')
                .attr('id', ctx.sTableId + 'reportFileError')
                .attr('title', 'Error')
                .text('error')
                .addClass('rup_report')
                .hide(),
            $defaultDialog = $('<div></div>')
                .attr('id', ctx.sTableId + 'rup_report_dialogsContainer')
                .append($defaultDialog_wait)
                .append($defaultDialog_error);
        $('#' + ctx.sTableId).after($defaultDialog);
    };


    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables interface
     */

    // Attach to DataTables objects for global access
    $.fn.dataTable.Buttons = Buttons;
    $.fn.DataTable.Buttons = Buttons;

    function inicio(ctx) {
        var api = new DataTable.Api(ctx);
        var defaultButtons = api.init().buttons || DataTable.defaults.buttons;
        var numOfSelectedRows = ctx.multiselection.numSelected;
        var collectionObject;
        
        $('#' + ctx.sTableId).triggerHandler('tableButtonsBeforeToolbarInit');
        
        if ($('#' + ctx.sTableId + '_filter_form').length > 0) {
            new Buttons(api, defaultButtons).container().insertBefore($('#' + ctx.sTableId + '_filter_form'));
        } else {
            new Buttons(api, defaultButtons).container().insertBefore($('#' + ctx.sTableId + '_wrapper'));
        }

        var opts = ctx._buttons[0].inst.s.buttons;
        DataTable.Api().buttons.initButtons(ctx, opts);
        _initContextMenu(ctx, api);

        // Detecta cuando se selecciona o se deselecciona una fila en el table
        $('#' + ctx.sTableId).DataTable().on('select deselect contextmenu', function (event) {
            DataTable.Api().buttons.displayRegex(ctx);
        });

        if (!ctx.oInit.noEdit && ctx.oInit.formEdit === undefined && ctx.oInit.inlineEdit === undefined) {
            // se deja solo el boton de informes
            DataTable.Api().buttons.disableAllButtons(ctx, ctx.sTableId + 'informes_01');
            ctx._buttons[0].inst.s.disableAllButttons = undefined;
            DataTable.Api().buttons.displayRegex(ctx);
        }
        
        $('#' + ctx.sTableId).triggerHandler('tableButtonsAfterToolbarInit');
    }

    // DataTables `dom` feature option
    DataTable.ext.feature.push({
        fnInit: function (settings) {
            var api = new DataTable.Api(settings);
            var opts = api.init().buttons || DataTable.defaults.buttons;

            return new Buttons(api, opts).container();
        },
        cFeature: 'B'
    });

    //DataTables creation - check if the buttons have been defined for this table,
    //they will have been if the `B` option was used in `dom`, otherwise we should
    //create the buttons instance here so they can be inserted into the document
    //using the API. Listen for `init` for compatibility with pre 1.10.10, but to
    //be removed in future.
    $(document).on('plugin-init.dt', function (e, settings) {
        if (e.namespace !== 'dt') {
            return;
        }

        if (settings.oInit.buttons !== undefined) {
            inicio(settings);
        }
    });

    return Buttons;
}));
