/*! MultiSelect for DataTables 3.0.0
 * © SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     MultiSelect
 * @description MultiSelect for DataTables
 * @module      "rup.table.multiSelect"
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
    DataTable.multiSelect = {};
    
	DataTable.multiSelect.classes = {
		checkbox: 'dt-select-checkbox'
	};

    DataTable.multiSelect.version = '3.0.0';

    /**
     * Se inicializa el componente multiselect
     *
     * @name init
     * @function
     * @since UDA 3.4.0
     * 
     * @param {object} dt - Es el objeto table.
     *
     */
    DataTable.multiSelect.init = function (dt) {
        var ctx = dt.settings()[0];
        
		if (!DataTable.versionCheck('2')) {
			throw 'Warning: MultiSelect requires DataTables 2 or newer';
		}
        
		if (ctx._multiSelect) {
			return;
		}
		
		var savedSelected = dt.state.loaded();

		var selectAndSave = function(e, settings, data) {
			if (data === null || data.multiSelect === undefined) {
				return;
			}

			// Clear any currently selected rows, before restoring state
			// None will be selected on first initialisation
			if (dt.rows({ selected: true }).any()) {
				dt.rows().deselect();
			}
			if (data.multiSelect.rows !== undefined) {
				dt.rows(data.multiSelect.rows).select();
			}

			if (dt.columns({ selected: true }).any()) {
				dt.columns().deselect();
			}
			if (data.multiSelect.columns !== undefined) {
				dt.columns(data.multiSelect.columns).select();
			}

			if (dt.cells({ selected: true }).any()) {
				dt.cells().deselect();
			}
			if (data.multiSelect.cells !== undefined) {
				for (var i = 0; i < data.multiSelect.cells.length; i++) {
					dt.cell(data.multiSelect.cells[i].row, data.multiSelect.cells[i].column).select();
				}
			}

			dt.state.save();
		};

		dt.on('stateSaveParams', function(e, settings, data) {
			data.multiSelect = {};
			data.multiSelect.rows = dt.rows({ selected: true }).ids(true).toArray();
			data.multiSelect.columns = dt.columns({ selected: true })[0];
			data.multiSelect.cells = dt.cells({ selected: true })[0].map(function(coords) {
				return { row: dt.row(coords.row).id(true), column: coords.column };
			});
		})
			.on('stateLoadParams', selectAndSave)
			.one('init', function() {
				selectAndSave(undefined, undefined, savedSelected);
			});
        
        var init = ctx.oInit.multiSelect;
        var defaults = DataTable.defaults.multiSelect;
        var opts = init === undefined ? defaults : init;

        // Set defaults
        var items = 'row';
        var style = 'api';
        var info = true;
        var selector = 'td';
        var className = 'selected tr-highlight';
        var setStyle = false;
		var keys = false;

		ctx._multiSelect = {
			infoEls: []
		};

        if (init.hideMultiselect === undefined) {
            init.hideMultiselect = false;
        }

        if (init.enableMouseSelection === undefined) {
            init.enableMouseSelection = true;
        }

        if (init.enableKeyboardSelection === undefined) {
            init.enableKeyboardSelection = true;
        }

        _paintCheckboxSelect(ctx);

        // Initialisation customisations
        if (opts === true) {
            style = 'os';
            setStyle = true;
        } else if (typeof opts === 'string') {
            style = opts;
            setStyle = true;
        } else if ($.isPlainObject(opts)) {
			if (opts.info !== undefined) {
                info = opts.info;
            }

            if (opts.items !== undefined) {
                items = opts.items;
            }

            if (opts.style !== undefined) {
                style = opts.style;
                setStyle = true;
            }

            if (ctx.oInit.selector !== undefined) {
                selector = opts.selector;
            }

            if (opts.className !== undefined) {
                className = opts.className;
            }

			if (opts.keys !== undefined) {
				keys = opts.keys;
			}
        }

        dt.multiSelect.selector(selector);
        dt.multiSelect.items(items);
        dt.multiSelect.style(style);
        dt.multiSelect.info(info);
		dt.multiSelect.keys(keys);
        ctx._multiSelect.className = className;

        // Sort table based on selected rows. Requires Select Datatables extension
        $.fn.dataTable.ext.order['select-checkbox'] = function (settings, col) {
            return this.api().column(col, {
                order: 'index'
            }).nodes().map(function (td) {
                if (settings._multiSelect.items === 'row') {
                    return $(td).parent().hasClass(settings._multiSelect.className);
                } else if (settings._multiSelect.items === 'cell') {
                    return $(td).hasClass(settings._multiSelect.className);
                }
                return false;
            });
        };

        // If the init options haven't enabled select, but there is a selectable
        // class name, then enable
        if (!setStyle && $(dt.table().node()).hasClass('selectable')) {
            dt.multiSelect.style('os');
        }
    };

	/*
	
	Select is a collection of API methods, event handlers, event emitters and
	buttons (for the `Buttons` extension) for DataTables. It provides the following
	features, with an overview of how they are implemented:
	
	## Selection of rows, columns and cells. Whether an item is selected or not is
	   stored in:
	
	* rows: a `_multiSelect_selected` property which contains a boolean value of the
	  DataTables' `aoData` object for each row
	* columns: a `_multiSelect_selected` property which contains a boolean value of the
	  DataTables' `aoColumns` object for each column
	* cells: a `_selected_cells` property which contains an array of boolean values
	  of the `aoData` object for each row. The array is the same length as the
	  columns array, with each element of it representing a cell.
	
	This method of using boolean flags allows Select to operate when nodes have not
	been created for rows / cells (DataTables' defer rendering feature).
	
	## API methods
	
	A range of API methods are available for triggering selection and de-selection
	of rows. Methods are also available to configure the selection events that can
	be triggered by an end user (such as which items are to be selected). To a large
	extent, these of API methods *is* Select. It is basically a collection of helper
	functions that can be used to select items in a DataTable.
	
	Configuration of select is held in the object `_multiSelect` which is attached to the
	DataTables settings object on initialisation. Select being available on a table
	is not optional when Select is loaded, but its default is for selection only to
	be available via the API - so the end user wouldn't be able to select rows
	without additional configuration.
	
	The `_multiSelect` object contains the following properties:
	
	```
	{
		items:string       - Can be `rows`, `columns` or `cells`. Defines what item 
		                     will be selected if the user is allowed to activate row
		                     selection using the mouse.
		style:string       - Can be `none`, `single`, `multi` or `os`. Defines the
		                     interaction style when selecting items
		info:boolean       - If the selection summary should be shown in the table
		                     information elements
		infoEls:element[]  - List of HTML elements with info elements for a table
	}
	```
	
	In addition to the API methods, Select also extends the DataTables selector
	options for rows, columns and cells adding a `selected` option to the selector
	options object, allowing the developer to select only selected items or
	unselected items.
	
	## Mouse selection of items
	
	Clicking on items can be used to select items. This is done by a simple event
	handler that will select the items using the API methods.
	
	 */
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Local functions
	 */

    /**
     * Attach mouse listeners to the table to allow mouse selection of items
     *
     * @name enableMouseSelection
     * @function
     * @since UDA 4.2.0
     * 
     * @param {DataTable.Api} dt DataTable
     * 
     */
    function enableMouseSelection(dt, ctx) {
		var ctx = dt.settings()[0];
		var container = $(ctx.nTBody);

		if (ctx.oInit.selectFilaDer) {
			container.on('click contextmenu', function(event) {
				if (event.target !== undefined && event.target.className.indexOf('openResponsive') > -1) {
					return false;
				}

				var ctx = dt.settings()[0];
				var row = $(event.target);

				row.triggerHandler('tableSelectBeforeSelectRow', ctx);

				if ((event.shiftKey || event.ctrlKey || event.shiftKey && event.which === 32) && ctx.multiselection.selectedRowsPerPage.length > 0) {
					rangeSelection(dt, event);
				} else if (ctx.multiselection.lastSelectedIsRange) {
					if (event.target.type !== 'checkbox') {
						deselectAllPage(dt);
						dt.row($(event.target).closest('tr').index()).multiSelect();
					} else {
						$(event.target).parent('').find('input').prop('checked', function() {
							return !this.checked;
						});
					}
				} else {
					if (event.target.type !== 'checkbox') {
						rowSelection(dt, event);
					} else if (!$(event.target).hasClass('editable')) {
						$(event.target).parent('').find('input').prop('checked', function() {
							return !this.checked;
						});
					}
				}

				row.triggerHandler('tableSelectAfterSelectRow', ctx);
			});

		} else {
			container.on('click', function(event) {
					if (event.target !== undefined && event.target.className.indexOf('openResponsive') > -1) {
						return false;
					}

					var ctx = dt.settings()[0];
					var row = $(event.target);

					row.triggerHandler('tableSelectBeforeSelectRow', ctx);

					if ((event.shiftKey || event.ctrlKey || event.shiftKey && event.which === 32) && ctx.multiselection.selectedRowsPerPage.length > 0) {
						rangeSelection(dt, event);
					} else if (ctx.multiselection.lastSelectedIsRange) {
						if (event.target.type !== 'checkbox') {
							deselectAllPage(dt);
							dt.row($(event.target).closest('tr').index()).multiSelect();
						} else {
							$(event.target).parent('').find('input').prop('checked', function() {
								return !this.checked;
							});
						}
					} else {
						if (event.target.type !== 'checkbox') {
							rowSelection(dt, event);
						} else if (!$(event.target).hasClass('editable')) {
							$(event.target).parent('').find('input').prop('checked', function() {
								return !this.checked;
							});
						}
					}

					row.triggerHandler('tableSelectAfterSelectRow', ctx);
				});
		}
	}

    /**
     * Attach keyboard listeners to the table to allow keyboard selection of items
     *
     * @name enableKeyboardSelection
     * @function
     * @since UDA 4.2.0
     * 
     * @param {DataTable.Api} dt DataTable
     * 
     */
    function enableKeyboardSelection(dt) {
        var ctx = dt.settings()[0];
        var container = $(ctx.nTBody);

        container
            .on('keydown.dtSelect', function (event) {
                if (event.which === 32) {
                    if (event.target !== undefined && event.target.className.indexOf('openResponsive') > -1) {
                        return false;
                    }

                    var ctx = dt.settings()[0];
                    var row = $(event.target);

                    row.triggerHandler('tableSelectBeforeSelectRow',ctx);

                    if (event.shiftKey && event.which === 32 || event.ctrlKey && event.which === 32) {
                        rangeSelection(dt, event);
                    } else if (ctx.multiselection.lastSelectedIsRange) {
                        deselectAllPage(dt);
                        dt.row($(event.target).closest('tr').index()).multiSelect();
                    } else {
                        // Se selecciona una fila si la propiedad 'hideMultiselect' es true
                        if (ctx.oInit.multiSelect.hideMultiselect) {
                            // Solo selecciona si se pulsa sobre la barra espaciadora
                            if (event.which === 32) {
                                if (event.target.className.indexOf('openResponsive') > -1 ||
                                    row.hasClass('editable')) {
                                    return false;
                                }
                                var idRow = row.index();

                                // Se deselecciona
                                if (row.hasClass('tr-highlight')) {
                                    ctx.multiselection.accion = 'uncheck';
                                    dt.row(idRow).deselect();
                                }
                                // Se selecciona
                                else {
                                    dt.row(idRow).multiSelect();
                                }
                            }
                        }
                        rowSelection(dt, event);
                    }

                    row.triggerHandler('tableSelectAfterSelectRow',ctx);
                }
            });
    }

    /**
     * Select a range of rows in a DataTable
     *
     * @name rangeSelection
     * @function
     * @since UDA 4.2.0
     * 
     * @param  {DataTable.Api} dt   DataTable
     * 
     */
    function rangeSelection(dt, event) {
        var ctx = dt.settings()[0];

        if (event.ctrlKey) {
            let cell = dt.cell($(event.target).closest('td, th'));
            let idx = cell.index().row;

            let isSelected = dt.row(idx, {
                selected: true
            }).any();

            dt.row(idx).multiSelect(!isSelected);
        } else {
            // Desde / Hasta
            let fromIndex;
            if (dt.rows({
                selected: true
            }).any()) {
                fromIndex = ctx.multiselection.selectedRowsPerPage[$.inArray(ctx.multiselection.lastSelectedId, ctx.multiselection.selectedIds)].line;
            } else {
                fromIndex = $(event.target).closest('tr').index();
            }
            let toIndex = $(event.target).closest('tr').index();

            // Guardar id desde
            let idBase = ctx.multiselection.lastSelectedId;

            deselectAllPage(dt);

            if (fromIndex < toIndex) {
                toIndex++;
                for (let i = fromIndex; i < toIndex; i++) {
                    dt.row(i).multiSelect();
                }
            } else if (fromIndex > toIndex) {
                toIndex--;
                for (let i = fromIndex; i > toIndex; i--) {
                    dt.row(i).multiSelect();
                }
            } else {
                dt.row(fromIndex).multiSelect();
                idBase = ctx.multiselection.lastSelectedId;
            }

            ctx.multiselection.lastSelectedId = idBase;
            ctx.multiselection.lastSelectedIsRange = true;
        }
    }

    /**
     * Select a row in a DataTable
     *
     * @name rowSelection
     * @function
     * @since UDA 4.2.0
     * 
     * @param  {DataTable.Api} dt   DataTable
     * @param  {object}        event  Event information
     * 
     */
    function rowSelection(dt, event) {
        var ctx = dt.settings()[0];
        var items = dt.multiSelect.items();

        // If text was selected (click and drag), then we shouldn't change
        // the row's selected state
        if (window.getSelection) {
            var selection = window.getSelection();

            // If the element that contains the selection is not in the table, we can ignore it
            // This can happen if the developer selects text from the click event
            if (!selection.anchorNode || $(selection.anchorNode).closest('table')[0] === dt.table().node()) {
                if (selection.toString().trim() !== '') {
                    return;
                }
            }
        }

        // Ignore clicks inside a sub-table
        if ($(event.target).closest('div.dt-container')[0] != dt.table().container()) {
            return;
        }

        var cell = dt.cell($(event.target).closest('td, th'));

        // Check the cell actually belongs to the host DataTable (so child
        // rows, etc, are ignored)
        if (!cell.any()) {
            return;
        }

        var newEvent = $.Event('user-select.dt');
        eventTrigger(dt, newEvent, [items, cell, newEvent]);

        if (event.isDefaultPrevented()) {
            return;
        }

        var cellIndex = cell.index();
        var idx = cellIndex.row;

        var isSelected = dt.row(idx, {
            selected: true
        }).any();

        dt.row(idx).multiSelect(!isSelected);

        ctx._multiSelect_lastCell = cellIndex;
    }

    /**
     * Trigger an event on a DataTable
     *
     * @name eventTrigger
     * @function
     * @since UDA 3.4.0
     * 
     * @param {DataTable.Api} api      DataTable to trigger events on
     * @param  {boolean}      selected true if selected, false if deselected
     * @param  {string}       type     Item type acting on
     * @param  {boolean}      any      Require that there are values before triggering
     * 
     */
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

    /**
     * Update the information element of the DataTable showing information about the
     * items selected. This is done by adding tags to the existing text
     *
     * @name info
     * @function
     * @since UDA 3.4.0
     *
     * @param {DataTable.Api} api DataTable to update
     * 
     */
    function info(api, node) {
		if (api.multiSelect.style() === 'api' || api.multiSelect.info() === false) {
			return;
		}
		
		var ctx = api.settings()[0];
		var rowSetLength = ctx._multiSelect_set.length;
		var rows = rowSetLength ? rowSetLength : api.rows({ selected: true }).count();
		var columns = api.columns({ selected: true }).count();
		var cells = api.cells({ selected: true }).count();
		
		// If subtractive selection, then we need to take the number of rows and
		// subtract those that have been deselected
		if (ctx._multiSelect_mode === 'subtractive') {
			rows = api.page.info().recordsDisplay - rowSetLength;
		}

        var add = function (el, name, num) {
            name = jQuery.rup.i18nTemplate(ctx.oLanguage, 'rup_table.fila');
            var sels = jQuery.rup.i18nTemplate(ctx.oLanguage, 'rup_table.seleccionadas');
            var sel = jQuery.rup.i18nTemplate(ctx.oLanguage, 'rup_table.seleccionada');
            if (ctx.oInit.showMultiSelectedZero) { //se muestra el mensaje
            	if ($.rup.lang !== 'eu') {
            		el.append($('<span class="select-item"></span>').append(api.i18n(
                    	'select.filas', {
                    		_: '%d ' + name + 's ' + sels + '',
                    		1: '1 ' + name + ' ' + sel + ''
                    	},
                    	num
                    )));
                } else {
                	el.append($('<span class="select-item"></span>').append(api.i18n(
                		'select.filas', {
                			_: sel + ' %d ' + name ,
                			0: sel + ' inongo ' + name + 'rik',
                			1: sel + ' ' + name + ' 1'
                		},
                		num
                	)));
                	el.attr("style", "white-space: nowrap;");
                }
            } else { // no se muestra.
            	if ($.rup.lang !== 'eu') {
	                el.append($('<span class="select-item"></span>').append(api.i18n(
	                    'select.filas', {
	                        _: '%d ' + name + 's ' + sels + '',
	                        0: '',
	                        1: '1 ' + name + ' ' + sel + ''
	                    },
	                    num
	                )));
            	} else {
            		el.append($('<span class="select-item"></span>').append(api.i18n(
	                    'select.filas', {
	                        _: sel + ' %d ' + name ,
	                        0: '',
	                        1: sel + ' ' + name + ' 1'
	                    },
	                    num
	                )));
            	}
            }
        };

        rows = ctx.multiselection.numSelected;
        
		//Antes de mostrar la info se ha de ordenar.
		var el = $('#' + ctx.sTableId + '_wrapper').find('#select_info');
		var output = $('<span class="select-info"></span>');

		add(output, 'row', rows);

		var existing = el.children('span.select-info');

		if (existing.length) {
			existing.remove();
		}

		if (output.text() !== '') {
			el.append(output);
		}

        $('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableMultiSelectionRowNumberUpdate',ctx);
    }
    
	function keysSet(dt) {
		var ctx = dt.settings()[0];
		var flag = ctx._multiSelect.keys;
		var namespace = 'dts-keys-' + ctx.sTableId;

		if (flag) {
			// Need a tabindex of the `tr` elements to make them focusable by the browser
			$(dt.rows({ page: 'current' }).nodes()).attr('tabindex', 0);

			dt.on('draw.' + namespace, function() {
				$(dt.rows({ page: 'current' }).nodes()).attr('tabindex', 0);
			});

			// Listen on document for tab, up and down
			$(document).on('keydown.' + namespace, function(e) {
				var key = e.keyCode;
				var active = document.activeElement;

				// Can't use e.key as it wasn't widely supported until 2017
				// 9 Tab
				// 13 Return
				// 32 Space
				// 38 ArrowUp
				// 40 ArrowDown
				if (![9, 13, 32, 38, 40].includes(key)) {
					return;
				}

				var nodes = dt.rows({ page: 'current' }).nodes().toArray();
				var idx = nodes.indexOf(active);
				var preventDefault = true;

				// Only take an action if a row has focus
				if (idx === -1) {
					return;
				}

				if (key === 9) {
					// Tab focus change
					if (e.shift === false && idx === nodes.length - 1) {
						keysPageDown(dt);
					}
					else if (e.shift === true && idx === 0) {
						keysPageUp(dt);
					}
					else {
						// Browser will do it for us
						preventDefault = false;
					}
				}
				else if (key === 13 || key === 32) {
					// Row selection / deselection
					var row = dt.row(active);

					if (row.selected()) {
						row.deselect();
					}
					else {
						row.select();
					}
				}
				else if (key === 38) {
					// Move up
					if (idx > 0) {
						nodes[idx - 1].focus();
					}
					else {
						keysPageUp(dt);
					}
				}
				else {
					// Move down
					if (idx < nodes.length - 1) {
						nodes[idx + 1].focus();
					}
					else {
						keysPageDown(dt);
					}
				}

				if (preventDefault) {
					e.stopPropagation();
					e.preventDefault();
				}
			});
		}
		else {
			// Stop the rows from being able to gain focus
			$(dt.rows().nodes()).removeAttr('tabindex');

			// Nuke events
			dt.off('draw.' + namespace);
			$(document).off('keydown.' + namespace);
		}
	}

	/**
	 * Change to the next page and focus on the first row
	 *
	 * @param {DataTable.Api} dt DataTable instance
	 */
	function keysPageDown(dt) {
		// Is there another page to turn to?
		var info = dt.page.info();

		if (info.page < info.pages - 1) {
			dt
				.one('draw', function() {
					dt.row(':first-child').node().focus();
				})
				.page('next')
				.draw(false);
		}
	}

	/**
	 * Change to the previous page and focus on the last row
	 *
	 * @param {DataTable.Api} dt DataTable instance
	 */
	function keysPageUp(dt) {
		// Is there another page to turn to?
		var info = dt.page.info();

		if (info.page > 0) {
			dt
				.one('draw', function() {
					dt.row(':last-child').node().focus();
				})
				.page('previous')
				.draw(false);
		}
	}

    /**
     * Initialisation of a new table. Attach event handlers and callbacks to allow
     * Select to operate correctly.
     *
     * This will occur _after_ the initial DataTables initialisation, although
     * before Ajax data is rendered, if there is ajax data
     *
     * @name init
     * @function
     * @since UDA 3.4.0
     * 
     * @param  {DataTable.settings} ctx Settings object to operate on
     * 
     */
    function init(ctx) {
        var api = new DataTable.Api(ctx);
        ctx._multiSelect_init = true;
        
		// When `additive` then `_multiSelect_set` contains a list of the row ids that
		// are selected. If `subtractive` then all rows are selected, except those
		// in `_multiSelect_set`, which is a list of ids.
		ctx._multiSelect_mode = 'additive';
		ctx._multiSelect_set = [];

        // Row callback so that classes can be added to rows and cells if the item
        // was selected before the element was created. This will happen with the
        // `deferRender` option enabled.
        //
        // This method of attaching to `aoRowCreatedCallback` is a hack until
        // DataTables has proper events for row manipulation If you are reviewing
        // this code to create your own plug-ins, please do not do this!
		ctx.aoRowCreatedCallback.push(function(row, data, index) {
			var i, ien;
			var d = ctx.aoData[index];
			var id = api.row(index).id();

			// Row
			if (
				d._multiSelect_selected ||
				(ctx._multiSelect_mode === 'additive' && ctx._multiSelect_set.includes(id)) ||
				(ctx._multiSelect_mode === 'subtractive' && !ctx._multiSelect_set.includes(id))
			) {
				d._multiSelect_selected = true;
				$(row)
					.addClass(ctx._multiSelect.className)
					.find('input.' + checkboxClass(true)).prop('checked', true);
			}

			// Cells and columns - if separated out, we would need to do two
			// loops, so it makes sense to combine them into a single one
			for (i = 0, ien = ctx.aoColumns.length; i < ien; i++) {
				if (ctx.aoColumns[i]._multiSelect_selected || (d._selected_cells && d._selected_cells[i])) {
					$(d.anCells[i]).addClass(ctx._multiSelect.className)
				}
			}
		});

		_cumulativeEvents(api);

		// Update the table information element with selected item summary
		api.on('info.dt', function(e, ctx, node) {
			// Store the info node for updating on select / deselect
			if (!ctx._multiSelect.infoEls.includes(node)) {
				ctx._multiSelect.infoEls.push(node);
			}

			info(api, node);

			_drawSelectId(api, ctx);
			
			//Comprobar si hay algun feedback activado
			const feedback = ctx.oInit.feedback.$feedbackContainer;
			if (feedback.type !== undefined && feedback.type === 'eliminar') {
				feedback.rup_feedback('set', feedback.msgFeedBack, 'ok');
				feedback.rup_feedback('show');
			}
		});

		api.on('select.dtSelect.dt deselect.dtSelect.dt', function() {
			ctx._multiSelect.infoEls.forEach(function(el) {
				info(api, el);
			});

			api.state.save();
		});
		
		// Clean up and release
		api.on('destroy.dtSelect', function() {
			// Remove class directly rather than calling deselect - which would trigger events
			$(api.rows({ selected: true }).nodes()).removeClass(api.settings()[0]._multiSelect.className);

			$('input.' + checkboxClass(true), api.table().header()).remove();

			disableMouseSelection(api);
			api.off('.dtSelect');
			$('body').off('.dtSelect' + _safeId(api.table().node()));
		});

        if (ctx.oInit.inlineEdit === undefined && ctx.oInit.formEdit === undefined) {
            $(window).on('resize.dtr', DataTable.util.throttle(function () { //Se calcula el responsive
                DataTable.Api().editForm.addchildIcons(ctx);
            }));
        }
    }

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
     * @param  {DataTable.api} ctx
     * 
     */
    function _drawSelectId(api, ctx) {
        var DataTable = $.fn.dataTable;
        var pos = -1;

        $.each(ctx.multiselection.selectedIds, function (index, value) {
            var idx = -1;
            $.each(api.context[0].json.rows, function (indexData, valueData) {
                if (value === DataTable.Api().rupTable.getIdPk(valueData, ctx.oInit)) {
                    idx = indexData;
                    return false;
                }
            });
            if (idx >= 0) {
                api.context[0].aoData[idx]._multiSelect_selected = true;
                $(api.context[0].aoData[idx].nTr).addClass(api.context[0]._multiSelect.className);
                if (api.row(idx).child() !== undefined) {
                    api.row(idx).child().addClass(ctx._multiSelect.className);
                }
                // Marcamos el checkbox
                $($(ctx.aoData[idx].anCells).filter('.select-checkbox')).find(':input').prop('checked', true);
                $(api.context[0].aoData[idx].nTr).triggerHandler('tableHighlightRowAsSelected',ctx);
                if (ctx.multiselection.lastSelectedId === value) {
                    pos = idx;
                }
                if (pos === -1 && ctx.multiselection.lastSelectedId === '') { //En caso de que no hay ninguna coincidencia se pone el ultimo.
                    pos = idx;
                }
            }
        });
        if (pos >= 0) {
            //si hay mas columnas porque aun no ha refrescado al crear y clonar.
            if (ctx._iDisplayLength < ctx.json.rows.length && !$('#' + $.escapeSelector(ctx.sTableId) + ' tbody tr').hasClass('new')) {
                pos--;
            }
            DataTable.Api().rupTable.selectPencil(api.context[0], pos);
        }
    }

    /**
     * Pinta la cabecera y pie del table con el checkbox all.
     *
     * @name paintCheckboxexSelect
     * @function
     * @since UDA 3.4.0
     *
     * @param  {DataTable.ctx} ctx Settings object to operate on
     *
     */
    function _paintCheckboxSelect(ctx) {
        var columnDefs = ctx.oInit.aoColumnDefs;
        if (columnDefs !== undefined && columnDefs[0].className !== undefined && columnDefs[0].className.indexOf('select-checkbox') > -1) {
            //Se rellena todo, la columna select.
            //si metes esta propiedad se oculta el div:
            if (ctx.oInit.multiSelect === undefined || !ctx.oInit.multiSelect.hideMultiselect) {
                var input = $('<div>')
                    .attr('id', 'divSelectTableHead_' + ctx.sTableId)
                    .attr('class', 'divSelectTableHead checkbox-material checkbox-material-inline')
                    .append(
                        $('<input/>')
                            .attr('id', 'inputSelectTableHead_' + ctx.sTableId)
                            .attr('type', 'checkbox')
                    ).append(
                        $('<label></label>')
                    );


                var link = $('<a></a>')
                    .addClass('ui-icon rup-table_checkmenu_arrow')
                    .attr('id', 'linkSelectTableHead' + ctx.sTableId);

                input.click(function () {
                    var dt = new DataTable.Api(ctx);
                    if ($(this).find('input').is(':checked')) {
                        deselectAllPage(dt);
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);
                    } else {
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);
                        selectAllPage(dt);
                    }
                });


                link.click(function () {
                    var dt = new DataTable.Api(ctx);
                    //Marcar todos
                    if (ctx.multiselection.selectedAll && ctx.multiselection.deselectedIds.length === 0) {
                        $('#contextMenu1 li.context-menu-icon-check').addClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-check_all').addClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck_all').removeClass('disabledButtonsTable');
                        // Marcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);
                    }
                    //Desmarcar todos
                    if (!ctx.multiselection.selectedAll && ctx.multiselection.selectedIds.length === 0) {
                        $('#contextMenu1 li.context-menu-icon-check').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-check_all').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck').addClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck_all').addClass('disabledButtonsTable');
                        // Desmarcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);
                    }
                    if (ctx.multiselection.selectedIds.length > 0) {
                        $('#contextMenu1 li.context-menu-icon-uncheck_all').removeClass('disabledButtonsTable');
                    }
                    if (ctx.multiselection.deselectedIds.length > 0) {
                        $('#contextMenu1 li.context-menu-icon-check_all').removeClass('disabledButtonsTable');
                    }
                    //Si la pagina esta completamente seleccionada
                    if (checkPageSelectedAll(dt, true)) {
                        $('#contextMenu1 li.context-menu-icon-uncheck_all').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-check').addClass('disabledButtonsTable');
                        // Marcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);
                    } else {
                        $('#contextMenu1 li.context-menu-icon-check_all').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-check').removeClass('disabledButtonsTable');
                        // Desmarcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);
                    }

                    //Si la pagina esta completamente deseleccionada
                    if (checkPageSelectedAll(dt, false)) {
                        $('#contextMenu1 li.context-menu-icon-check_all').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-check').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck').addClass('disabledButtonsTable');
                        // Desmarcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);
                    } else {
                        $('#contextMenu1 li.context-menu-icon-uncheck_all').removeClass('disabledButtonsTable');
                        $('#contextMenu1 li.context-menu-icon-uncheck').removeClass('disabledButtonsTable');
                        // Marcamos el check del tHead
                        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);
                    }

                });

                if (ctx.nTable.tHead !== null) {
                    var th = $(ctx.nTable.tHead.rows[0].cells[0]);
                    th.append(input, link);
                }

                if (ctx.oInit.headerContextMenu.show) { //Se mira si se quiere mostrar el menuContext
                    _createContexMenuSelect(link[0].id, ctx);
                }

            }

            //Se aseguro que no sea orderable
            columnDefs[0].orderable = false;
        }
    }

    /**
     * Metodo que comprueba que todos los checks de la página están seleccionados
     *
     * @name checkPageSelectedAll
     * @function
     * @since UDA 3.4.0
     *
     * @param {object} dt - Es el objeto table.
     * @param {boolean} selected - Es true o false para saber cual de los 2 quieres buscar.
     *
     */
    function checkPageSelectedAll(dt, selected) {
        var count = 0;

        $.each(dt.rows().nodes().flatten(), function (idx, value) {
            if (selected && value.className.indexOf('selected') >= 0) {
                count++;
            } else if (!selected && value.className.indexOf('selected') < 0) {
                count++;
            }
        });
        if (dt.rows().nodes().flatten().length === count) {
            return true;
        }

        return false;
    }

    /**
     * Metodo que crea el contexMenu de la tabla
     *
     * @name createContexMenuSelect
     * @function
     * @since UDA 3.4.0
     * 
     * @param {string} id - Es el identificador del table.
     * @param {object} ctx - table.settings.
     *
     */
    function _createContexMenuSelect(id, ctx) {
        var items = {};
        var options = ctx.oInit;
        var dt = new DataTable.Api(ctx);

        if (options.headerContextMenu.selectAllPage) {
            jQuery.extend(items, {
                'selectAllPage': {
                    name: $.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.multiselection.selectAllPage'),
                    icon: 'check',
                    disabled: function () {},
                    callback: function () {
                        selectAllPage(dt);
                    }
                }
            });

        }
        if (options.headerContextMenu.deselectAllPage) {
            jQuery.extend(items, {
                'deselectAllPage': {
                    name: $.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.multiselection.deselectAllPage'),
                    icon: 'uncheck',
                    disabled: function () {},
                    callback: function () {
                        deselectAllPage(dt);
                    }
                }
            });
        }
        if (options.headerContextMenu.separator) {
            jQuery.extend(items, {
                'separator': ''
            });
        }
        if (options.headerContextMenu.selectAll) {
            jQuery.extend(items, {
                'selectAll': {
                    name: $.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.multiselection.selectAll'),
                    icon: 'check_all',
                    disabled: function () {},
                    callback: function () {
                        selectAll(dt);
                    }
                }
            });
        }
        if (options.headerContextMenu.deselectAll) {
            $.extend(items, {
                'deselectAll': {
                    name: $.rup.i18nParse($.rup.i18n.base, 'rup_table.plugins.multiselection.deselectAll'),
                    icon: 'uncheck_all',
                    disabled: function () {},
                    callback: function () {
                        deselectAll(dt);
                    }
                }
            });
        }

        dt.on('init.dt', function () {
        	$('#' + $.escapeSelector(id)).rup_contextMenu({
        		selector: '#' + id,
        		trigger: 'left',
        		items: items,
        		position: function (contextMenu) {
        			contextMenu.$menu.css({
        				top: this.parent().offset().top + this.parent().height(),
        				left: this.parent().parent().offset().left
        			});
        		}
        	});
        });
    }

    /**
     * Metodo que selecciona todos los elementos de una misma página.
     *
     * @name selectAllPage
     * @function
     * @since UDA 3.4.0
     *
     * @param {object} dt - Datatable.
     *
     */
    function selectAllPage(dt) {
        var ctx = dt.settings()[0];
        ctx.multiselection.accion = 'checkAll';
        dt.rows().multiSelect();

        $('#contextMenu1 li.context-menu-icon-check').addClass('disabledButtonsTable');
        // Marcamos el check del tHead
        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);

        //FeedBack
        var countPage = dt.page() + 1;
        var selectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.selectMsg', '<span class="font-weight-bold">' + dt.rows()[0].length + '</span>', '<span class="font-weight-bold">' + countPage + '</span>');
        var countRegister = ctx.json.recordsTotal - ctx.multiselection.selectedIds.length;
        var selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.selectRestMsg', countRegister);
        var remainingSelectButton = '<button id=\'rup_table_' + dt.context[0].sTableId + '_selectAll\' class=\'btn-material btn-material-secondary-low-emphasis\'><span>' + selectRestMsg + '</span></button>';
        if (countRegister > 0 && !ctx.multiselection.selectedAll ||
            (ctx.multiselection.selectedAll && ctx.multiselection.deselectedIds.length > 0)) {
            ctx.oInit.feedback.$feedbackContainer.rup_feedback('set', selectMsg + remainingSelectButton, 'alert');
            ctx.oInit.feedback.type = 'fijo';
            $('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableMultiSelectFeedbackSelectAll',ctx);
        }
        $('#' + $.escapeSelector($(remainingSelectButton)[0].id)).on('click', function () {
            selectAll(dt);
        });

        //Se deja marcado el primero de la pagina.
        ctx.multiselection.lastSelectedId = dt.data()[0][ctx.oInit.primaryKey[0]];
        DataTable.Api().rupTable.selectPencil(ctx, 0);
    }

    /**
     * Metodo que deselecciona todos los elementos de una misma página.
     *
     * @name deselectAllPage
     * @function
     * @since UDA 3.4.0
     * 
     * @param {object} dt - Datatable.
     *
     */
    function deselectAllPage(dt) {
        var ctx = dt.settings()[0];
        ctx.multiselection.accion = 'uncheck';
        dt.rows().deselect();

        $('#contextMenu1 li.context-menu-icon-uncheck').addClass('disabledButtonsTable');
        // Desmarcamos el check del tHead
        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);

        //FeedBack
        var countPage = dt.page() + 1;
        var deselectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.deselectMsg', '<span class="font-weight-bold">' + dt.rows()[0].length + '</span>', '<span class="font-weight-bold">' + countPage + '</span>');
        var selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_table.deselectRestMsg', ctx.multiselection.numSelected);
        var remainingDeselectButton = '<button id=\'rup_table_' + dt.context[0].sTableId + '_deselectAll\' class=\'btn-material btn-material-secondary-low-emphasis\'><span>' + selectRestMsg + '</span></button>';
        if (ctx.multiselection.numSelected > 0) {
            ctx.oInit.feedback.$feedbackContainer.rup_feedback('set', deselectMsg + remainingDeselectButton, 'alert');
            ctx.oInit.feedback.$feedbackContainer.rup_feedback('show');
            ctx.oInit.feedback.$feedbackContainer.type = 'fijo';
            $('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableMultiSelectFeedbackDeselectAll',ctx);
        }
        $('#' + $.escapeSelector($(remainingDeselectButton)[0].id)).on('click', function () {
            deselectAll(dt);
        });
        $('#' + $.escapeSelector(ctx.sTableId) + ' tbody tr td.select-checkbox i.selected-pencil').remove();

        ctx.multiselection.lastSelectedIsRange = false;
    }

    /**
     * Metodo que selecciona todos los elementos.
     *
     * @name selectAll
     * @function
     * @since UDA 3.4.0
     *
     * @param {object} dt - Datatable.
     *
     */
    function selectAll(dt) {
        var ctx = dt.settings()[0];
        ctx.multiselection.selectedAll = true;
        ctx.multiselection.deselectedIds = [];
        ctx.multiselection.deselectedRowsPerPage = [];
        ctx.multiselection.numSelected = ctx.json.recordsTotal;
        ctx.multiselection.accion = 'checkAll';
        $('#contextMenu1 li.context-menu-icon-check_all').addClass('disabledButtonsTable');
        $('#contextMenu1 li.context-menu-icon-check').addClass('disabledButtonsTable');
        // Marcamos el check del tHead
        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', true);

        dt.rows().multiSelect();
        if (dt.page() === 0) {
            DataTable.Api().rupTable.selectPencil(ctx, 0);
            ctx.multiselection.lastSelectedId = DataTable.Api().rupTable.getIdPk(dt.data()[0], ctx.oInit);
        } else {
            DataTable.Api().rupTable.selectPencil(ctx, -1);
            ctx.multiselection.lastSelectedId = '';
        }

        $('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableMultiSelectSelectAll',ctx);
    }


    /**
     * Metodo que deselecciona todos los elementos.
     *
     * @name deselectAll
     * @function
     * @since UDA 3.4.0
     *
     * @param {object} dt - Datatable.
     *
     */
    function deselectAll(dt) {
        var ctx = dt.settings()[0];
        ctx.multiselection = _initializeMultiselectionProps(ctx);
        ctx.multiselection.accion = 'uncheckAll';
        $('#' + $.escapeSelector(ctx.sTableId) + ' tbody tr td.select-checkbox i.selected-pencil').remove();
        dt.rows().deselect();
        $('#' + $.escapeSelector(ctx.sTableId)).trigger('rupTable_deselectAll',ctx);
    }

    /**
     * Clear all selected items
     *
     * @name clear
     * @function
     * @since UDA 3.4.0
     * 
     * @param  {DataTable.settings} ctx Settings object of the host DataTable
     * @param  {boolean} [force=false] Force the de-selection to happen, regardless
     *     of selection style
     * 
     */
    function clear(ctx, force) {
        if (force || ctx._multiSelect.style === 'single') {
            var api = new DataTable.Api(ctx);

            api.rows({ selected: true }).deselect();
            api.columns({ selected: true }).deselect();
            api.cells({ selected: true }).deselect();
        }
    }

	function _safeId(node) {
		return node.id.replace(/[^a-zA-Z0-9\-\_]/g, '-');
	}
	
	/**
	 * Set up event handlers for cumulative selection
	 *
	 * @param {*} api DT API instance
	 */
	function _cumulativeEvents(api) {
		// Add event listeners to add / remove from the _multiSelect_set
		api.on('select', function(e, dt, type, indexes) {
			// Only support for rows at the moment
			if (type !== 'row') {
				return;
			}

			var ctx = api.settings()[0];

			if (ctx._multiSelect_mode === 'additive') {
				// Add row to the selection list if it isn't already there
				_add(api, ctx._multiSelect_set, indexes);
			}
			else {
				// Subtractive - if a row is selected it should not in the list
				// as in subtractive mode the list gives the rows which are not
				// selected
				_remove(api, ctx._multiSelect_set, indexes);
			}
		});

		api.on('deselect', function(e, dt, type, indexes) {
			// Only support for rows at the moment
			if (type !== 'row') {
				return;
			}

			var ctx = api.settings()[0];

			if (ctx._multiSelect_mode === 'additive') {
				// List is of those rows selected, so remove it
				_remove(api, ctx._multiSelect_set, indexes);
			}
			else {
				// List is of rows which are deselected, so add it!
				_add(api, ctx._multiSelect_set, indexes);
			}
		});
	}
	
	function _add(api, arr, indexes) {
		for (var i = 0; i < indexes.length; i++) {
			var id = api.row(indexes[i]).id();

			if (id && id !== 'undefined' && !arr.includes(id)) {
				arr.push(id);
			}
		}
	}

	function _remove(api, arr, indexes) {
		for (var i = 0; i < indexes.length; i++) {
			var id = api.row(indexes[i]).id();
			var idx = arr.indexOf(id);

			if (idx !== -1) {
				arr.splice(idx, 1);
			}
		}
	}

    /**
     * Metodo que inicializa las propiedades para el multiselect.
     *
     * @name initializeMultiselectionProps
     * @function
     * @since UDA 3.4.0
     *
     *
     */
    function _initializeMultiselectionProps(ctx) {
        var $self = {};
        // Se almacenan en los settings internos las estructuras de control de los registros seleccionados
        if ($self.multiselection === undefined) {
            $self.multiselection = {};
        }
        // Flag indicador de selección de todos los registros
        $self.multiselection.selectedAll = false;
        // Numero de registros seleccionados
        $self.multiselection.numSelected = 0;
        // Propiedades de selección de registros
        $self.multiselection.selectedRowsPerPage = [];
        $self.multiselection.selectedIds = [];
        $self.multiselection.lastSelectedId = '';
        $self.multiselection.deselectedRowsPerPage = [];
        $self.multiselection.deselectedIds = [];
        $self.multiselection.accion = ''; //uncheckAll,uncheck
        $('#contextMenu1 li.context-menu-icon-uncheck').addClass('disabledButtonsTable');
        $('#contextMenu1 li.context-menu-icon-uncheck_all').addClass('disabledButtonsTable');
        // Desmarcamos el check del tHead
        $('#inputSelectTableHead' + $.escapeSelector(ctx.sTableId)).prop('checked', false);

        DataTable.Api().rupTable.selectPencil(ctx, -1);
        return $self.multiselection;
    }

    /**
     * Metodo que añade y quita los seleccionados.
     *
     * @name maintIdsRows
     * @function
     * @since UDA 3.4.0
     * 
     * @param  {DataTables.Api}     DataTable   DataTable
     * @param  {string}     id   - id seleccionado
     * @param  {boolean}    select   si es seleccionado o no
     * @param  {integer}    pagina   página en la que se encuentra el seleccionado
     * @param  {integer}    line   linea en la que se encuentra el seleccionado
     *
     */
    //1 select, 0 deselect
    function maintIdsRows(DataTable, id, select, pagina, line, ctx) {
        var indexInArray = -1;

        if (select) { // se elimina de los deselecionados
            indexInArray = jQuery.inArray(id, ctx.multiselection.deselectedIds);
            if (indexInArray > -1 && !pagina) { //Si se encuentra y además no se está paginando.
                ctx.multiselection.deselectedIds.splice(indexInArray, 1);
                ctx.multiselection.deselectedRowsPerPage.splice(indexInArray, 1);
                if (ctx.multiselection.numSelected === ctx.json.recordsTotal) {
                    ctx.multiselection.selectedAll = true;
                }
            }
            if (id !== undefined && ctx.multiselection.selectedIds.indexOf(id) < 0) {
                var pos = 0;
                var arra = {
                    id: id,
                    page: Number(ctx.json.page),
                    line: line
                };

                //Inicio de ordenacion, Se ordena los selected ids.

                $.each(ctx.multiselection.selectedRowsPerPage, function (index, p) {
                    if (arra.page < p.page) {
                        pos = index;
                        return false;
                    } else if (arra.page === p.page) {
                        // mirar linea
                        if (arra.line < p.line) {
                            pos = index;
                            return false;
                        } else {
                            pos = index + 1; //Posible
                        }
                    } else if (arra.page > p.page) {
                        pos = index + 1; //Posible
                    }
                });

                ctx.multiselection.selectedIds.splice(pos, 0, id);
                ctx.multiselection.selectedRowsPerPage.splice(pos, 0, arra);


                //Fin ordenacion
            }
        } else { //Deselect
            indexInArray = jQuery.inArray(id, ctx.multiselection.selectedIds); //Se elimina el ids

            if (indexInArray > -1) { //se borra
                ctx.multiselection.selectedIds.splice(indexInArray, 1);
                ctx.multiselection.selectedRowsPerPage.splice(indexInArray, 1);
                if (ctx.multiselection.lastSelectedId === id) {
                    ctx.multiselection.lastSelectedId = getLastSelectedId(ctx.multiselection.selectedRowsPerPage);
                }
                DataTable.Api().rupTable.selectPencil(ctx, -1);
                if (ctx.multiselection.numSelected === 0) {
                    ctx.multiselection.selectedAll = false;
                }
            }
            //Se mete el id para mantener el selectAll o no.
            if (id !== undefined && ctx.multiselection.deselectedIds.indexOf(id) < 0) {
                if (line === undefined) {
                    $.each(ctx.json.rows, function (index, value) {
                        if (DataTable.Api().rupTable.getIdPk(value, ctx.oInit) === id) {
                            line = index;
                            return false;
                        }
                    });

                }
                var posDeselect = 0;
                var arraDeselect = {
                    id: id,
                    page: Number(ctx.json.page),
                    line: line
                };

                //Inicio de ordenacion, Se ordena los selected ids.
                $.each(ctx.multiselection.deselectedRowsPerPage, function (index, p) {
                    if (arraDeselect.page < p.page) {
                        posDeselect = index;
                        return false;
                    } else if (arraDeselect.page === p.page) {
                        // mirar linea
                        if (arraDeselect.line < p.line) {
                            posDeselect = index;
                            return false;
                        } else {
                            posDeselect = index + 1; //Posible
                        }
                    } else if (arraDeselect.page > p.page) {
                        posDeselect = index + 1; //Posible
                    }
                });

                ctx.multiselection.deselectedIds.splice(posDeselect, 0, id);
                ctx.multiselection.deselectedRowsPerPage.splice(posDeselect, 0, arraDeselect);
                if (ctx.multiselection.lastSelectedId === id) {
                    ctx.multiselection.lastSelectedId = '';
                }
                DataTable.Api().rupTable.selectPencil(ctx, -1);
            }
        }
    }
    
    /**
     * Devuelve el identificador de la última fila seleccionada.
     *
     * @function getLastSelectedId
     * @since UDA 5.0.4
     * @param {Object[]} selectedRowsPerPage - Array de las filas seleccionadas.
     * @return {string} Identificador del último registro seleccionado.
     */
    function getLastSelectedId(selectedRowsPerPage) {
    	const lastElementId = selectedRowsPerPage[0]?.id;
    	return lastElementId ? lastElementId : '';
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables selectors
     */

    // row and column are basically identical just assigned to different properties
    // and checking a different array, so we can dynamically create the functions to
    // reduce the code size
    $.each(
		[
			{ type: 'row', prop: 'aoData' },
    		{ type: 'column', prop: 'aoColumns'}
    	],
    	function (i, o) {
	        DataTable.ext.selector[o.type].push(function (settings, opts, indexes) {
	            var selected = opts.selected;
	            var data;
	            var out = [];
	
	            if (selected === undefined) {
	                return indexes;
	            }
	
	            for (var i = 0, ien = indexes.length; i < ien; i++) {
	                data = settings[o.prop][indexes[i]];
	
					if (data && (
						(selected === true && data._multiSelect_selected === true) ||
						(selected === false && !data._multiSelect_selected)
					)) {
	                    out.push(indexes[i]);
	                }
	            }
	
	            return out;
	        });
		}
    );

    DataTable.ext.selector.cell.push(function (settings, opts, cells) {
        var selected = opts.selected;
        var rowData;
        var out = [];

        if (selected === undefined) {
            return cells;
        }

        for (var i = 0, ien = cells.length; i < ien; i++) {
            rowData = settings.aoData[cells[i].row];

            if (rowData && (
				(selected === true && rowData._selected_cells && rowData._selected_cells[cells[i].column] === true) ||
                (selected === false && (!rowData._selected_cells || !rowData._selected_cells[cells[i].column]))
            )) {
                out.push(cells[i]);
            }
        }

        return out;
    });



    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * DataTables API
     *
     * For complete documentation, please refer to the docs/api directory or the
     * DataTables site
     */

    // Local variables to improve compression
    var apiRegister = DataTable.Api.register;
    var apiRegisterPlural = DataTable.Api.registerPlural;

    apiRegister('multiSelect()', function () {
        return this.iterator('table', function (ctx) {
            DataTable.multiSelect.init(new DataTable.Api(ctx));
        });
    });

    apiRegister('multiSelect.info()', function (flag) {
        if (info === undefined) {
            return this.context[0]._multiSelect.info;
        }

        return this.iterator('table', function (ctx) {
            ctx._multiSelect.info = flag;
        });
    });

    apiRegister('multiSelect.items()', function (items) {
        if (items === undefined) {
            return this.context[0]._multiSelect.items;
        }

        return this.iterator('table', function (ctx) {
            ctx._multiSelect.items = items;

            eventTrigger(new DataTable.Api(ctx), 'selectItems', [items]);
        });
    });
    
	apiRegister('multiSelect.keys()', function(flag) {
		if (flag === undefined) {
			return this.context[0]._multiSelect.keys;
		}

		return this.iterator('table', function(ctx) {
			if (!ctx._multiSelect) {
				DataTable.multiSelect.init(new DataTable.Api(ctx));
			}

			ctx._multiSelect.keys = flag;

			keysSet(new DataTable.Api(ctx));
		});
	});

    // Takes effect from the _next_ selection. None disables future selection, but
    // does not clear the current selection. Use the `deselect` methods for that
    apiRegister('multiSelect.style()', function (style) {
        if (style === undefined) {
            return this.context[0]._multiSelect.style;
        }

        return this.iterator('table', function (ctx) {
			if (!ctx._multiSelect) {
				DataTable.multiSelect.init(new DataTable.Api(ctx));
			}
			if (!ctx._multiSelect_init) {
				init(ctx);
			}

            ctx._multiSelect.style = style;

            // Add mouse event handlers. They aren't required when only
            // API selection is available
            var dt = new DataTable.Api(ctx);

            if (style !== 'api') {
                if (ctx.oInit.multiSelect.enableMouseSelection) {
                    enableMouseSelection(dt, ctx);
                }

                if (ctx.oInit.multiSelect.enableKeyboardSelection) {
                    enableKeyboardSelection(dt);
                }
            }

            $('#' + $.escapeSelector(ctx.sTableId)).trigger('selectStyle', [style,ctx]);
        });
    });

    apiRegister('multiSelect.selector()', function (selector) {
        if (selector === undefined) {
            return this.context[0]._multiSelect.selector;
        }

        return this.iterator('table', function (ctx) {
            ctx._multiSelect.selector = selector;
        });
    });
    
	apiRegister('multiSelect.selectable()', function(set) {
		let ctx = this.context[0];

		if (set) {
			ctx._multiSelect.selectable = set;
			return this;
		}

		return ctx._multiSelect.selectable;
	});

	apiRegister('multiSelect.last()', function(set) {
		let ctx = this.context[0];

		if (set) {
			ctx._multiSelect_lastCell = set;
			return this;
		}

		return ctx._multiSelect_lastCell;
	});

	apiRegister('multiSelect.cumulative()', function(mode) {
		if (mode) {
			return this.iterator('table', function(ctx) {
				if (ctx._multiSelect_mode === mode) {
					return;
				}

				var dt = new DataTable.Api(ctx);

				// Convert from the current mode, to the new
				if (mode === 'subtractive') {
					// For subtractive mode we track the row ids which are not selected
					var unselected = dt.rows({ selected: false }).ids().toArray();

					ctx._multiSelect_mode = mode;
					ctx._multiSelect_set.length = 0;
					ctx._multiSelect_set.push.apply(ctx._multiSelect_set, unselected);
				}
				else {
					// Switching to additive, so selected rows are to be used
					var selected = dt.rows({ selected: true }).ids().toArray();

					ctx._multiSelect_mode = mode;
					ctx._multiSelect_set.length = 0;
					ctx._multiSelect_set.push.apply(ctx._multiSelect_set, selected);
				}
			}).draw(false);
		}

		let ctx = this.context[0];

		if (ctx && ctx._multiSelect_set) {
			return {
				mode: ctx._multiSelect_mode,
				rows: ctx._multiSelect_set
			};
		}

		return null;
	});

    apiRegister('multiSelect.deselectAll()', function (dt) {
        deselectAll(dt);
    });
    
    apiRegister('multiSelect.defaultsIds()', function (ctx) {

    	let defaultsIds = ctx.oInit.multiSelect.defaultsIds;
    	//defaultsIds[0] Lista de IDS
    	//defaultsIds[1] Lista si se filtra siempre o solo la primera vez(true/false)
    	
        if(defaultsIds !== undefined){
        	if(defaultsIds[0] !== undefined){
        		let listIds = defaultsIds[0];
        		let always = defaultsIds[1];
        		if(always === true){
    		    	$.each(listIds, function () {
    		    		let id = this;
    			        let indexInArray = jQuery.inArray(id, ctx.multiselection.selectedIds);
    			        if(indexInArray < 0){//no esta ya seleccioando
    			        	ctx.multiselection.selectedIds.push(id);
    			        }
    		    	});
        		} 
        		if(always === false || always === undefined){
    		    	$.each(listIds, function () {
    		    		let id = this;
    			        let indexInArray = jQuery.inArray(id, ctx.multiselection.selectedIds);
    			        if(indexInArray < 0){//no esta ya seleccioando
    			        	ctx.multiselection.selectedIds.push(id);
    			        }
    		    	});
    		    	ctx.oInit.multiSelect.defaultsIds[1] = null;
        		}

        	}
        }

    });

    apiRegisterPlural('rows().multiSelect()', 'row().multiSelect()', function (multiSelect) {
        var api = this;
        var DataTable = $.fn.dataTable;
        var pagina = true;
        var ctx = api.context[0];

        if (ctx.multiselection === undefined) {
            return false;
        }
        //Al pagina comprobar el checkGeneral.

        //Se mira si hay feedback y en ese caso se elimina.
        var feedBack = ctx.oInit.feedback;
        if (feedBack.$feedbackContainer.children().length > 1 && feedBack.type && feedBack.type === 'fijo') {
            feedBack.$feedbackContainer.rup_feedback('hide');
        }

        if (multiSelect === false) {
            maintIdsRows(DataTable, DataTable.Api().rupTable.getIdPk(api.data(), ctx.oInit), 0, pagina, undefined, ctx);
            //Cuando se resta de 1 en 1 la accion es empty
            ctx.multiselection.accion = '';
            var deselectes = this.deselect();
            return deselectes;

        }

        this.iterator('row', function (ctx, idx) {
            // si es en edicion en linea,
            if (!ctx.oInit.noEdit && ctx.oInit.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined &&
                ctx.inlineEdit.lastRow.idx !== idx) {

                DataTable.Api().inlineEdit.restaurarFila(ctx, true);
            }
            $(ctx.aoData[idx].nTr).triggerHandler('tableMultiSelectBeforeSelectRow',ctx);
            
            clear(ctx);
            
			// There is a good amount of knowledge of DataTables internals in
			// this function. It _could_ be done without that, but it would hurt
			// performance (or DT would need new APIs for this work)
			var dtData = ctx.aoData[idx];
			var dtColumns = ctx.aoColumns;

			if (ctx._multiSelect.selectable) {
				var result = ctx._multiSelect.selectable(dtData._aData, dtData.nTr, idx);

				if (result === false) {
					// Not selectable - do nothing
					return;
				}
			}

			// Añadimos el fondo amarillo
            $(dtData.nTr).addClass(ctx._multiSelect.className);
            if (api.row(idx).child() !== undefined) {
                api.row(idx).child().addClass(ctx._multiSelect.className);
            }
			dtData._multiSelect_selected = true;

            pagina = false;

            // Marcamos el checkbox
            $($(ctx.aoData[idx].anCells).filter('.select-checkbox')).find(':input').prop('checked', true);

            var id = DataTable.Api().rupTable.getIdPk(ctx.aoData[idx]._aData, ctx.oInit);

            //Se mira el contador para sumar seleccionados
            if (ctx.multiselection !== undefined && ctx.json !== undefined) {
	            if (ctx.multiselection.numSelected < ctx.json.recordsTotal &&
	                id !== undefined && ctx.multiselection.selectedIds.indexOf(id) < 0) {
	                ctx.multiselection.numSelected++;
	            }
            }

            //para seleccionar todos los de la pagina actual.
            maintIdsRows(DataTable, id, 1, pagina, idx, ctx);
            //Se marca el ultimo.
            ctx.multiselection.lastSelectedId = id;
            $(ctx.aoData[idx].nTr).triggerHandler('tableMultiSelectAfterSelectRow',ctx);

        });
        
        if (pagina) { //Cuando se pagina, se filtra, o se reordena.
            if (ctx.multiselection.selectedAll) { //Si pagina y están todos sleccionados se pintan.
                let ctx = api.settings()[0];
                $.each(api.context[0].aoData, function (idx) {
                    var id = DataTable.Api().rupTable.getIdPk(ctx.aoData[idx]._aData, ctx.oInit);
                    //Si esta en la lista de deselecionados, significa que no debería marcarse.
                    if (jQuery.inArray(id, ctx.multiselection.deselectedIds) === -1) {
                        ctx.aoData[idx]._multiSelect_selected = true;
                        // Añadimos el fondo amarillo
                        $(ctx.aoData[idx].nTr).addClass(ctx._multiSelect.className);
                        if (api.row(idx).child() !== undefined) {
                            api.row(idx).child().addClass(ctx._multiSelect.className);
                        }
                        // Marcamos el checkbox
                        $($(ctx.aoData[idx].anCells).filter('.select-checkbox')).find(':input').prop('checked', true);

                        //para seleccionar todos los de la pagina actual.
                        maintIdsRows(DataTable, id, 1, pagina, undefined, ctx);
                    }
                });
            }
            if (ctx.oInit.buttons !== undefined) {
                //Mirar la propiedad para el contextMenu y dejar la clase marcada.
                $('#' + $.escapeSelector(ctx.sTableId) + ' > tbody > tr').addClass('context-menu-cursor');
            }
        }
        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'select', ['row', api[i]], true);
        });

        //al paginar
        var input = $(ctx.nTable.tHead.rows[0].cells[0]).find(':input');

        if (checkPageSelectedAll(api, true)) {
            input.prop('checked', true);
        } else {
            input.prop('checked', false);
        }

        return this;
    });
    
	apiRegister('row().selected()', function() {
		var ctx = this.context[0];
		if (ctx && this.length && ctx.aoData[this[0]] && ctx.aoData[this[0]]._multiSelect_selected) {
			return true;
		}
		return false;
	});
	
	apiRegister('row().focus()', function() {
		var ctx = this.context[0];

		if (ctx && this.length && ctx.aoData[this[0]] && ctx.aoData[this[0]].nTr) {
			ctx.aoData[this[0]].nTr.focus();
		}
	});

	apiRegister('row().blur()', function() {
		var ctx = this.context[0];

		if (ctx && this.length && ctx.aoData[this[0]] && ctx.aoData[this[0]].nTr) {
			ctx.aoData[this[0]].nTr.blur();
		}
	});

    apiRegisterPlural('columns().multiSelect()', 'column().multiSelect()', function (multiSelect) {
        var api = this;

        if (multiSelect === false) {
            return this.deselect();
        }

        this.iterator('column', function (ctx, idx) {
            clear(ctx);

            ctx.aoColumns[idx]._multiSelect_selected = true;

            var column = new DataTable.Api(ctx).column(idx);

            $(column.header()).addClass(ctx._multiSelect.className);
            $(column.footer()).addClass(ctx._multiSelect.className);

            column.nodes().to$().addClass(ctx._multiSelect.className);
        });

        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'multiSelect', ['column', api[i]], true);
        });

        return this;
    });
    
	apiRegister('column().selected()', function() {
		var ctx = this.context[0];
		if (ctx && this.length && ctx.aoColumns[this[0]] && ctx.aoColumns[this[0]]._multiSelect_selected) {
			return true;
		}
		return false;
	});

    apiRegisterPlural('cells().multiSelect()', 'cell().multiSelect()', function (multiSelect) {
        var api = this;

        if (multiSelect === false) {
            return this.deselect();
        }

        this.iterator('cell', function (ctx, rowIdx, colIdx) {
            clear(ctx);

            var data = ctx.aoData[rowIdx];

            if (data._selected_cells === undefined) {
                data._selected_cells = [];
            }

            data._selected_cells[colIdx] = true;

            if (data.anCells) {
                $(data.anCells[colIdx]).addClass(ctx._multiSelect.className);
            }
        });

        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'multiSelect', ['cell', api[i]], true);
        });

        return this;
    });

	apiRegister('cell().selected()', function() {
		var ctx = this.context[0];
		if (ctx && this.length) {
			var row = ctx.aoData[this[0][0].row];
			if (row && row._multiSelect_cells && row._multiSelect_cells[this[0][0].column]) {
				return true;
			}
		}
		return false;
	});

    apiRegisterPlural('rows().deselect()', 'row().deselect()', function () {
        var api = this;
        var DataTable = $.fn.dataTable;
        var ctx = api.context[0];
        //Se mira si hay feedback y en ese caso se elimina.
        var feedback = ctx.oInit.feedback;
        if (feedback.$feedbackContainer.children().length > 1 && feedback.type && feedback.type === 'fijo') {
            feedback.$feedbackContainer.rup_feedback('hide');
        }

        this.iterator('row', function (ctx, idx) {
			// Like the select action, this has a lot of knowledge about DT internally
			var dtData = ctx.aoData[idx];
			var dtColumns = ctx.aoColumns;

			$(dtData.nTr).removeClass(ctx._multiSelect.className);
			dtData._multiSelect_selected = false;
			ctx._multiSelect_lastCell = null;

            // Quitamos el fondo amarillo
            $(ctx.aoData[idx].nTr).removeClass(ctx._multiSelect.className);
            if (api.row(idx).child() !== undefined) {
                api.row(idx).child().removeClass(ctx._multiSelect.className);
            }

            // Desmarcamos el checkbox (salvo cuando ha sido definido que esten ocultos)
            if (!ctx.oInit.multiSelect.hideMultiselect) {
                $($(ctx.aoData[idx].anCells).filter('.select-checkbox')).find(':input').prop('checked', false);
            }

            var id = DataTable.Api().rupTable.getIdPk(ctx.aoData[idx]._aData, ctx.oInit);

            //Se mira el contador para restar deselecionados.
            if (ctx.multiselection.numSelected > 0 &&
                id !== undefined && ctx.multiselection.deselectedIds.indexOf(id) < 0) {
                ctx.multiselection.numSelected--;
            }

            //para deseleccionar todos los de la pagina actual.
            if ((ctx.multiselection.numSelected > 0 && ctx.multiselection.accion === 'uncheckAll') ||
                (ctx.multiselection.numSelected >= 0 && ctx.multiselection.accion === 'uncheck')) {
                maintIdsRows(DataTable, id, 0, false, undefined, ctx);
            } else if (ctx.multiselection.accion === '') { //es que se resta uno solo.
                ctx.multiselection.numSelected--;
            }

            //Si es en edicion en linea, no hacer nada
            if (!ctx.oInit.noEdit && ctx.oInit.inlineEdit !== undefined && DataTable.Api().inlineEdit.editSameLine(ctx, idx)) {
                //Seleccionar la fila otra vez.
                api.rows(idx).multiSelect();
            }
        });

        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'deselect', ['row', api[i]], true);
        });

        //al paginar
        var input = $(ctx.nTable.tHead.rows[0].cells[0]).find(':input');

        if (checkPageSelectedAll(api, true)) {
            input.prop('checked', true);
        } else {
            input.prop('checked', false);
        }

        return this;
    });

    apiRegisterPlural('columns().deselect()', 'column().deselect()', function () {
        var api = this;

        this.iterator('column', function (ctx, idx) {
            ctx.aoColumns[idx]._multiSelect_selected = false;

            var api = new DataTable.Api(ctx);
            var column = api.column(idx);

            $(column.header()).removeClass(ctx._multiSelect.className);
            $(column.footer()).removeClass(ctx._multiSelect.className);

            // Need to loop over each cell, rather than just using
            // `column().nodes()` as cells which are individually selected should
            // not have the `selected` class removed from them
            api.cells(null, idx).indexes().each(function (cellIdx) {
                var data = ctx.aoData[cellIdx.row];
                var cellSelected = data._selected_cells;

                if (data.anCells && (!cellSelected || !cellSelected[cellIdx.column])) {
                    $(data.anCells[cellIdx.column]).removeClass(ctx._multiSelect.className);
                }
            });
        });

        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'deselect', ['column', api[i]], true);
        });

        return this;
    });

    apiRegisterPlural('cells().deselect()', 'cell().deselect()', function () {
        var api = this;

        this.iterator('cell', function (ctx, rowIdx, colIdx) {
            var data = ctx.aoData[rowIdx];

            data._selected_cells[colIdx] = false;

            // Remove class only if the cells exist, and the cell is not column
            // selected, in which case the class should remain (since it is selected
            // in the column)
            if (data.anCells && !ctx.aoColumns[colIdx]._multiSelect_selected) {
                $(data.anCells[colIdx]).removeClass(ctx._multiSelect.className);
            }
        });

        this.iterator('table', function (ctx, i) {
            eventTrigger(api, 'deselect', ['cell', api[i]], true);
        });

        return this;
    });



    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Buttons
     */
    function i18n(label, def) {
        return function (dt) {
            return dt.i18n('buttons.' + label, def);
        };
    }

    // Common events with suitable namespaces
    function namespacedEvents(config) {
        var unique = config._eventNamespace;

        return 'draw.dt.DT' + unique + ' multiSelect.dt.DT' + unique + ' deselect.dt.DT' + unique;
    }

    var _buttonNamespace = 0;

    $.extend(DataTable.ext.buttons, {
        selected: {
            text: i18n('selected', 'Selected'),
            className: 'buttons-selected',
            init: function (dt, node, config) {
                var that = this;
                config._eventNamespace = '.multiSelect' + (_buttonNamespace++);

                // .DT namespace listeners are removed by DataTables automatically
                // on table destroy
                dt.on(namespacedEvents(config), function () {
                    var enable = that.rows({
                        selected: true
                    }).any() ||
                        that.columns({
                            selected: true
                        }).any() ||
                        that.cells({
                            selected: true
                        }).any();

                    that.enable(enable);
                });

                this.disable();
            },
            destroy: function (dt, node, config) {
                dt.off(config._eventNamespace);
            }
        },
        selectedSingle: {
            text: i18n('selectedSingle', 'Selected single'),
            className: 'buttons-selected-single',
            init: function (dt, node, config) {
                var that = this;
                config._eventNamespace = '.multiSelect' + (_buttonNamespace++);

                dt.on(namespacedEvents(config), function () {
                    var count = dt.rows({
                        selected: true
                    }).flatten().length +
                        dt.columns({
                            selected: true
                        }).flatten().length +
                        dt.cells({
                            selected: true
                        }).flatten().length;

                    that.enable(count === 1);
                });

                this.disable();
            },
            destroy: function (dt, node, config) {
                dt.off(config._eventNamespace);
            }
        },
        selectAll: {
            text: i18n('selectAll', 'Select all'),
            className: 'buttons-select-all',
            action: function () {
                var items = this.multiSelect.items();
                this[items + 's']().select();
            }
        },
        selectNone: {
            text: i18n('selectNone', 'Deselect all'),
            className: 'buttons-select-none',
            action: function () {
                clear(this.settings()[0], true);
            },
            init: function (dt, node, config) {
                var that = this;
                config._eventNamespace = '.multiSelect' + (_buttonNamespace++);

                dt.on(namespacedEvents(config), function () {
                    var count = dt.rows({
                        selected: true
                    }).flatten().length +
                        dt.columns({
                            selected: true
                        }).flatten().length +
                        dt.cells({
                            selected: true
                        }).flatten().length;

                    that.enable(count > 0);
                });

                this.disable();
            },
            destroy: function (dt, node, config) {
                dt.off(config._eventNamespace);
            }
        },
        showSelected: {
			text: i18n('showSelected', 'Show only selected'),
			className: 'buttons-show-selected',
			action: function (e, dt) {
				if (dt.search.fixed('dt-select')) {
					// Remove existing function
					dt.search.fixed('dt-select', null);
	
					this.active(false);
				}
				else {
					// Use a fixed filtering function to match on selected rows
					// This needs to reference the internal aoData since that is
					// where Select stores its reference for the selected state
					var dataSrc = dt.settings()[0].aoData;
	
					dt.search.fixed('dt-select', function (text, data, idx) {
						// _multiSelect_selected is set by Select on the data object for the row
						return dataSrc[idx]._multiSelect_selected;
					});
	
					this.active(true);
				}
	
				dt.draw();
			}
		}
    });

    $.each(['Row', 'Column', 'Cell'], function (i, item) {
        var lc = item.toLowerCase();

        DataTable.ext.buttons['multiSelect' + item + 's'] = {
            text: i18n('multiSelect' + item + 's', 'multiSelect ' + lc + 's'),
            className: 'buttons-select-' + lc + 's',
            action: function () {
                this.select.items(lc);
            },
            init: function (dt) {
                var that = this;
                
				this.active(dt.select.items() === lc);

                dt.on('selectItems.dt.DT', function (e, ctx, items) {
                    that.active(items === lc);
                });
            }
        };
    });

	// Note that DataTables 2.1 has more robust type detection, but we retain
	// backwards compatibility with 2.0 for the moment.
	DataTable.type('select-checkbox', {
		className: 'dt-select',
		detect: DataTable.versionCheck('2.1')
			? {
				oneOf: function () {
					return false; // no op
				},
				allOf: function () {
					return false; // no op
				},
				init: function () {
					return false;
				}
			}
			: function (data) {
				// Rendering function will tell us if it is a checkbox type
				return data === 'select-checkbox' ? data : false;
			},
		order: {
			pre: function (d) {
				return d === 'X' ? -1 : 0;
			}
		}
	});
	
	$.extend(true, DataTable.defaults.oLanguage, {
		select: {
			aria: {
				rowCheckbox: 'Select row'
			}
		}
	});
	
	DataTable.render.select = function (valueProp, nameProp) {
		var valueFn = valueProp ? DataTable.util.get(valueProp) : null;
		var nameFn = nameProp ? DataTable.util.get(nameProp) : null;
	
		var fn = function (data, type, row, meta) {
			var dtRow = meta.settings.aoData[meta.row];
			var selected = dtRow._multiSelect_selected;
			var ariaLabel = meta.settings.oLanguage.select.aria.rowCheckbox;
			var selectable = meta.settings._multiSelect.selectable;
	
			if (type === 'display') {
				// Check if the row is selectable before showing the checkbox
				if (selectable) {
					var result = selectable(row, dtRow.nTr, meta.row);
		
					if (result === false) {
						return '';
					}
				}
	
				return $('<input>')
					.attr({
						'aria-label': ariaLabel,
						class: checkboxClass(),
						name: nameFn ? nameFn(row) : null,
						type: 'checkbox',
						value: valueFn ? valueFn(row) : null,
						checked: selected
					})
					.on('input', function (e) {
						// Let Select 100% control the state of the checkbox
						e.preventDefault();
	
						// And make sure this checkbox matches it's row as it is possible
						// to check out of sync if this was clicked on to deselect a range
						// but remains selected itself
						this.checked = $(this).closest('tr').hasClass('selected');
					})[0];
			}
			else if (type === 'type') {
				return 'select-checkbox';
			}
			else if (type === 'filter') {
				return '';
			}
	
			return selected ? 'X' : '';
		}
	
		// Workaround so uglify doesn't strip the function name. It is used
		// for the column type detection.
		fn._name = 'selectCheckbox';
	
		return fn;
	}
	
	// Legacy checkbox ordering
	DataTable.ext.order['select-checkbox'] = function (settings, col) {
		return this.api()
			.column(col, { order: 'index' })
			.nodes()
			.map(function (td) {
				if (settings._multiSelect.items === 'row') {
					return $(td).parent().hasClass(settings._multiSelect.className).toString();
				}
				else if (settings._multiSelect.items === 'cell') {
					return $(td).hasClass(settings._multiSelect.className).toString();
				}
				return false;
			});
	};
	
	$.fn.DataTable.multiSelect = DataTable.multiSelect;

    /* * * ** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     * Initialisation
     */

    // DataTables creation - we need this to run _before_ data is read in, but
	// for backwards compat. we also run again on preInit. If it happens twice
	// it will simply do nothing the second time around.
    $(document).on('i18n.dt.dtSelect preInit.dt.dtSelect', function (e, ctx) {
        if (e.namespace !== 'dt') {
            return;
        }
        if (ctx.oInit.multiSelect !== undefined && ctx.oInit.multiSelect.activate !== false) {
            DataTable.multiSelect.init(new DataTable.Api(ctx));
        }
    });


    return DataTable.multiSelect;
}));