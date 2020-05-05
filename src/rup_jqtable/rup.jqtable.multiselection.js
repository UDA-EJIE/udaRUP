/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
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
 */

/*global jQuery */

/**
 * Permite realizar una selección múltiple de los registros que se muestran en la tabla.
 *
 * @summary Plugin de multiselection del componente RUP Table.
 * @module rup_jqtable/multiselection
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["multiselection"],
 * 	multiselection:{
 * 		// Propiedades de configuración del plugin multiselection
 * 	}
 * });
 */
(function ($) {

	/**
   * Definición de los métodos principales que configuran la inicialización del plugin.
   *
   * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
   * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
   *
   */
	jQuery.rup_jqtable.registerPlugin('multiselection', {
		loadOrder: 8,
		preConfiguration: function (settings) {
			var $self = this;
			$self.rup_jqtable('preConfigureMultiselection', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;

			if (settings.multiselect === true) {
				$self.rup_jqtable('postConfigureMultiselection', settings);
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	/**
   * Extensión del componente rup_jqtable para permitir la gestión de la multiselección.
   *
   * Los métodos implementados son:
   *
   * preConfigureMultiselection(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
   * postConfigureMultiselection(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
   *
   */
	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureMultiselection
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureMultiselection: function (settings) {
			var $self = this;
			// Añadimos la columna por defecto para mostrar la información del registro en edición
			//			settings.colNames = jQuery.merge([""], settings.colNames);
			//			settings.colModel = jQuery.merge([settings.multiselection.defaultEditableInfoCol], settings.colModel);

			// Se configura la propiedad multiselecta true para que el plugin subyacente se configure en modo multiseleccion
			settings.multiselect = true;
			settings.multiselectWidth = 40;
			//
			//			settings.ondblClickRow=function(){
			//				return false;
			//			};

			$.extend(true, settings.core.operations, {
				clone:{
					enabled : function () {
						return settings.multiselection.numSelected === 1;
					}
				}
			});

			settings.getActiveLineId = function () {
				var $self = this,
					settings = $self.data('settings'),
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();

				return jQuery.inArray(settings.multiselection.rowForEditing, npos[1]);
			};

			settings.getActiveRowId = function () {
				var $self = this,
					settings = $self.data('settings');

				return settings.multiselection.rowForEditing;
			};

			settings.getSelectedRows = function () {
				var $self = this,
					settings = $self.data('settings');

				if (settings.multiselection.selectedAll !== true) {
					return settings.multiselection.selectedIds;
				} else {
					return settings.multiselection.deselectedIds;
				}
			};

			settings.getSelectedLines = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);

				if (settings.multiselection.selectedAll !== true) {
					return settings.multiselection.selectedLinesPerPage[page];
				} else {
					return settings.multiselection.deselectedLinesPerPage[page];
				}
			};


			/*
       * Definición del método serializeGridData para que añada al postData la información relativa a la multiseleccion.
       */
			$self.on({
				'rupTable_serializeGridData.multiselection': function (events, postData) {
					var multiselectionObj = {},
						tmpLastSearch;

					function getLastSearchStr(postData) {
						return postData.rows + postData.sidx + postData.sord + postData.filter !== undefined ? jQuery.param(jQuery.extend({}, postData.filter, {
							rows: postData.rows,
							sidx: postData.sidx,
							sord: postData.sord
						})) : '';
					}

					tmpLastSearch = $self.data('tmp.lastSearch');
					if (tmpLastSearch !== undefined && tmpLastSearch !== getLastSearchStr(postData)) {
						if (settings && settings.multiselection && settings.multiselection.numSelected > 0) {
							multiselectionObj = $self.rup_jqtable('getSelectedIds');
							jQuery.extend(true, postData, {
								'multiselection': multiselectionObj
							});
						}
					}

					$self.data('tmp.lastSearch', getLastSearchStr(postData));
				},
				'rupTable_setSelection.multiselection': function (events, selectedRows, status, reorderSelection) {
					var page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);

					if (Array.isArray(selectedRows)) {
						for (var i = 0; i < selectedRows.length; i++) {
							$self._processSelectedRow(settings, selectedRows[i], status);
						}
					} else {
						$self._processSelectedRow(settings, selectedRows, status);
					}

					// En caso de que se solicite la reordenación de los identificadores seleccionados
					if (reorderSelection === true) {
						$self.on('rupTable_serializeGridData.multiselection.reorderSelection', function (events, postData) {
							$self.off('rupTable_serializeGridData.multiselection.reorderSelection');

							jQuery.extend(true, postData, {
								'multiselection': $self.rup_jqtable('getSelectedIds')
							});
						});
					}

					$self.triggerHandler('rupTable_multiselectionUpdated');

					$self.triggerHandler('jqGridSelectRow.rupTable.multiselection', [selectedRows, status]);

					return false;
				}
			});

		},
		/**
		* Metodo que realiza la post-configuración del plugin multiselection del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureMultiselection
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureMultiselection: function (settings) {
			var $self = this;

			// Inicialización de las propiedades asociadas a la gestión de los registros seleccionados
			$self._initializeMultiselectionProps(settings);
			// Se almacena la referencia del check de (de)seleccionar todos los registros
			settings.$selectAllCheck = jQuery('#cb_' + settings.id);

			settings.fncHasSelectedElements = function () {
				return settings.multiselection.numSelected > 0;
			};

			settings.getRowForEditing = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					index, retNavParams;

				if ($self._hasPageSelectedElements(page)) {
					if (settings.multiselection.rowForEditing !== undefined) {
						return settings.multiselection.rowForEditing;
					}
					index = $self._getSelectedLinesOfPage(page)[0];
					return nPos[1][index - 1];
				} else {
					retNavParams = jQuery.proxy(settings.fncGetNavigationParams, $self)('first');

					execute = retNavParams[1];
					newPage = retNavParams[5];
					newPageIndex = retNavParams[6];

					if (execute) {
						$self.trigger('reloadGrid', [{
							page: newPage
						}]);
						$self.on('jqGridAfterLoadComplete.multiselection.editRow', function (event, data) {
							var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
								//newIndexPos = nextPagePos[1][$self._getSelectedLinesOfPage(newPage)[0]-1];
								newIndexPos = $self.getActiveRowId();
							$self.jqGrid('editGridRow', newIndexPos, settings.editOptions);
							$self.off('jqGridAfterLoadComplete.multiselection.editRow');
						});
					}

					return false;
				}
			};

			settings.getDetailTotalRowCount = function () {
				var $self = this,
					settings = $self.data('settings');
				return settings.multiselection.numSelected;
			};

			settings.getDetailCurrentRowCount = function () {
				var $self = this,
					settings = $self.data('settings'),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					currentRow = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10),
					selectedPagesArrayIndex, tmpSelectedPage,
					cont = 0;

				// Comprobamos si se han seleccionado todos los registros de la tabla
				if (!settings.multiselection.selectedAll) {
					// En caso de que no se hayan seleccionado
					// Se obtiene el indice de la página actual dentro del array de páginas deseleccionadas para
					selectedPagesArrayIndex = jQuery.inArray(page, settings.multiselection.selectedPages);
					tmpSelectedPage = settings.multiselection.selectedPages[selectedPagesArrayIndex];
					for (var i = 1; i < tmpSelectedPage; i++) {
						if (settings.multiselection.selectedLinesPerPage[i] !== undefined) {
							cont += settings.multiselection.selectedLinesPerPage[i].length;
						}
					}

					cont += jQuery.inArray(currentRow[0] + 1, settings.multiselection.selectedLinesPerPage[tmpSelectedPage]) + 1;
				} else {
					cont = (page > 1 ? ((page - 1) - settings.multiselection.deselectedPages.length) * rowsPerPage : 0);
					for (var i = 0; i < settings.multiselection.deselectedPages.length && settings.multiselection.deselectedPages[i] !== page; i++) {
						cont += rowsPerPage - settings.multiselection.deselectedLinesPerPage[settings.multiselection.deselectedPages[i]].length;
					}
					cont += jQuery.inArray(currentRow[0] + 1, $self._getSelectedLinesOfPage(page)) + 1;
				}

				return cont;
			};

			settings.fncGetNavigationParams = function getNavigationParams_multiselection(linkType) {
				var $self = this,
					settings = $self.data('settings'),
					execute = false,
					changePage = false,
					index = 0,
					newPageIndex = 0,
					npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
					page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
					newPage = page,
					lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records') / $self.rup_jqtable('getGridParam', 'rowNum')), 10),
					currentArrayIndex, selectedLines;

				npos[0] = parseInt(npos[0], 10);
				$('#' + settings.formEdit.feedbackId, settings.formEdit.$detailForm).hide();
				switch (linkType) {
				case 'first':
					// Navegar al primer elemento seleccionado
					execute = true;
					// Si no se han seleccionado todos los elementos
					if (!settings.multiselection.selectedAll) {
						// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
						if (settings.multiselection.selectedPages[0] !== page) {
							// Marcamos el flag changePage para indicar que se debe de realizar una paginación
							changePage = true;
							// La nueva página será la primera página en la que se ha realizado una selección de registros
							newPage = settings.multiselection.selectedPages[0];
						}
					} else {
						// En el caso de que se hayan seleccionado todos los elementos de la tabla
						// Recorremos las páginas buscando la primera en la que existan elementos seleccionados
						for (var pageAux = 1; pageAux <= lastPage; pageAux++) {
							if ($self._hasPageSelectedElements(pageAux)) {
								if (pageAux !== page) {
									newPage = pageAux;
									changePage = true;
								}
								break;
							}
						}
					}
					// Recuperamos el primer registro seleccionado del la página
					index = $self._getFirstSelectedElementOfPage(newPage);
					newPageIndex = index;
					break;
				case 'prev':
					// Navegar al anterior elemento seleccionado
					execute = true;
					// Obtenemos un array con los index de los registros seleccionados en la página actual
					selectedLines = $self._getSelectedLinesOfPage(page);
					// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
					currentArrayIndex = jQuery.inArray(npos[0] + 1, selectedLines);
					// Se comprueba si ocupa el lugar del primer elemento seleccionado
					if (currentArrayIndex === 0) {
						// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
						changePage = true;
						// Recorremos las páginas anteriores
						for (var pageAux = page - 1; pageAux >= 0; pageAux--) {
							// En caso de que la página disponga de elementos selecciondados.
							if ($self._hasPageSelectedElements(pageAux)) {
								newPage = pageAux;
								// Obtenemos los identificadores de los registros seleccionados de la nueva página
								selectedLines = $self._getSelectedLinesOfPage(pageAux);
								// Obtenemos el último registro seleccionado
								index = selectedLines[selectedLines.length - 1];
								break;
							}
						}
					} else {
						// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
						index = selectedLines[currentArrayIndex - 1];
					}

					newPageIndex = index;
					break;
				case 'next':
					// Navegar al siguiente elemento seleccionado
					execute = true;
					// Obtenemos un array con los index de los registros seleccionados en la página actual
					selectedLines = $self._getSelectedLinesOfPage(page);
					// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
					currentArrayIndex = jQuery.inArray(npos[0] + 1, selectedLines);
					// Se comprueba si ocupa el lugar del último elemento seleccionado
					if (currentArrayIndex === selectedLines.length - 1) {
						// En caso de tratarse del último elemento seleccionado de la página, se deberá de realizar una navegación a la página siguiente que disponga de elementos seleccionados
						changePage = true;
						// Recorremos las páginas siguientes
						for (var pageAux = page + 1; pageAux <= lastPage; pageAux++) {
							// En caso de que la página disponga de elementos selecciondados.
							if ($self._hasPageSelectedElements(pageAux)) {
								newPage = pageAux;
								// Obtenemos los identificadores de los registros seleccionados de la nueva página
								selectedLines = $self._getSelectedLinesOfPage(pageAux);
								// Obtenemos el primer registro seleccionado
								index = selectedLines[0];
								break;
							}
						}
					} else {
						// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
						index = selectedLines[currentArrayIndex + 1];
					}

					newPageIndex = index;
					break;
				case 'last':
										// Navegar al ultimo elemento seleccionado
					execute = true;
										// Si no se han seleccionado todos los elementos
					if (!settings.multiselection.selectedAll) {
												// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
						if (settings.multiselection.selectedPages[settings.multiselection.selectedPages.length - 1] !== page) {
														// Marcamos el flag changePage para indicar que se debe de realizar una paginación
							changePage = true;
														// La nueva página será la primera página en la que se ha realizado una selección de registros
							newPage = settings.multiselection.selectedPages[settings.multiselection.selectedPages.length - 1];
						}
					} else {
												// En el caso de que se hayan seleccionado todos los elementos de la tabla
												// Recorremos las páginas buscando la primera en la que existan elementos seleccionados
						for (var pageAux = lastPage; pageAux > 0; pageAux--) {
							if ($self._hasPageSelectedElements(pageAux)) {
								if (pageAux !== page) {
									newPage = pageAux;
									changePage = true;
								}
								break;
							}
						}
					}
					selectedLines = $self._getSelectedLinesOfPage(newPage);
										// Recuperamos el último registro seleccionado del la página
					index = selectedLines[selectedLines.length - 1];
					newPageIndex = index;
				}

				return [linkType, execute, changePage, index - 1, npos, newPage, newPageIndex - 1];
			};

			settings.doNavigation = function (arrParams, execute, changePage, index, npos, newPage, newPageIndex) {
				var $self = this,
					settings = $self.data('settings'),
					props = rp_ge[$self.attr('id')],
					linkType, execute, changePage, index, npos, newPage, newPageIndex, fncAfterclickPgButtons;

				if (Array.isArray(arrParams)) {
					linkType = arrParams[0];
					execute = arrParams[1];
					changePage = arrParams[2];
					index = arrParams[3];
					npos = arrParams[4];
					newPage = arrParams[5];
					newPageIndex = arrParams[6];

					if (execute) {
						$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
						$self.triggerHandler('jqGridAddEditClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						if (changePage) {
							$self.trigger('reloadGrid', [{
								page: newPage
							}]);
							$self.on('jqGridAfterLoadComplete.pagination', function (event, data) {
								var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
									newIndexPos = nextPagePos[1][newPageIndex];
								//								$self.jqGrid("setSelection", nextPagePos[1][newIndexPos]);
								jQuery.proxy(jQuery.jgrid.fillData, $self[0])(newIndexPos, $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
								jQuery.proxy(jQuery.jgrid.updateNav, $self[0])();

								//								$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
								settings.multiselection.rowForEditing = newIndexPos;

								$self.rup_jqtable('clearHighlightedEditableRows');
								$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', newIndexPos, true));
								//								$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);

								$self.off('jqGridAfterLoadComplete.pagination');
							});
						} else {
							jQuery.proxy(jQuery.jgrid.fillData, $self[0])(npos[1][index], $self[0], settings.formEdit.$detailForm.attr('id'), settings.opermode);
							//							$self.jqGrid("setSelection", npos[1][index]);
							jQuery.proxy(jQuery.jgrid.updateNav, $self[0])();
							//							$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
							settings.multiselection.rowForEditing = npos[1][index];

							$self.rup_jqtable('clearHighlightedEditableRows');
							$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', npos[1][index], true));
							//							$($self.jqGrid("getInd",npos[1][index], true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);

						}
						$self.triggerHandler('jqGridAddEditAfterClickPgButtons', [linkType, settings.formEdit.$detailForm, npos[1][npos[index]]]);
						fncAfterclickPgButtons = (props !== undefined ? props.afterclickPgButtons : settings.afterclickPgButtons);
						if (jQuery.isFunction(fncAfterclickPgButtons)) {
							props.fncAfterclickPgButtons.call($self, linkType, settings.formEdit.$detailForm, npos[1][npos[index]]);
						}
					}
				}
			};

			// Configuracion de los handler de los eventos
			$self.on({
				/*
         * Capturador del evento jqGridSelectRow.
         * Se ejecuta cuando se selecciona una fila.
         * Realiza la gestión interna sobre la acción de (de)selección del usuario.
         *
         * 	event: Objeto event.
         * 	id: Identificador de la línea.
         *  status: true en caso de selección, false en caso de deselección.
         *  obj: Objeto interno del jqGrid.
         */
				'jqGridSelectRow.rupTable.multiselection': function (event, id, status, obj) {
					var page, firstSelectedId, firstSelectedLine, activeLineId, selectedLineId, toLine, fromLine, idsArr;
					if (obj !== false) {
						if (obj !== undefined && jQuery(obj.target).hasClass('treeclick')) {
							return false;
						}

						if (jQuery.rup.isCtrlPressed() === true || jQuery.rup.isShiftPressed() === true) {
							window.getSelection().removeAllRanges();
						}

						if (!(jQuery.rup.isCtrlPressed() || jQuery.rup.isShiftPressed()) && (settings.multiboxonly === true && obj !== undefined && !(obj.originalEvent !== undefined && jQuery(obj.originalEvent.target).is(':checkbox') && jQuery(obj.originalEvent.target).attr('id').indexOf('jqg_') !== -1))) {
							$self.rup_jqtable('deselectRemainingRows');
						}

						// Shift presed

						if (jQuery.rup.isShiftPressed() === true) {
							selectedLineId = $self.jqGrid('getInd', id, false);
							activeLineId = $self.rup_jqtable('getActiveLineId');
							if (activeLineId < selectedLineId) {
								toLine = selectedLineId - 1;
								fromLine = activeLineId + 1;
							} else {
								toLine = activeLineId;
								fromLine = selectedLineId;
							}

							idsArr = $self.jqGrid('getDataIDs');

							for (var i = fromLine; i < toLine; i++) {
								$self._processSelectedRow(settings, idsArr[i], status);
								$self.rup_jqtable('highlightRowAsSelected', jQuery($self.jqGrid('getInd', idsArr[i], true)));
							}

						}

						// Se gestiona la selección o deselección del registro indicado
						$self._processSelectedRow(settings, id, status);
						// Actualización del número de registros seleccionados
						$self.rup_jqtable('updateSelectedRowNumber');
						// Se cierra el feedback para (de)seleccionar el resto de registros
						$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

						// Se gestiona el icono de linea editable
						$self.rup_jqtable('clearHighlightedEditableRows');
						//						$self.find("td[aria-describedby='"+settings.id+"_infoEditable'] img.ui-icon.ui-icon-pencil").remove();
						if (status) {
							settings.multiselection.rowForEditing = id;
							$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', id, true));
							//							$($self.jqGrid("getInd",id, true)).find("td[aria-describedby='"+settings.id+"_infoEditable']").html($("<img/>").addClass("ui-icon ui-icon-pencil")[0]);
						} else {
							page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10);
							if ($self._hasPageSelectedElements(page)) {
								$self.rup_jqtable('highlightFirstEditableRow');
								//								firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
								//								firstSelectedId = $self.jqGrid("getDataIDs")[firstSelectedLine-1];
								//								settings.multiselection.rowForEditing=firstSelectedId;
								//								$self.rup_jqtable("highlightEditableRow", $self.jqGrid("getInd",firstSelectedId, true));
							}
						}
					}
				},
				'jqGridDblClickRow.rupTable.multiselection': function (event, rowid, iRow, iCol, e) {
					$self.rup_jqtable('setSelection', rowid, true);
					$self.rup_jqtable('clearHighlightedEditableRows');
					$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', rowid, true));
				},
				'jqGridGridComplete.rup_jqtable.multiselection': function (event) {
					var $self = $(this),
						settings = $self.data('settings');

					if ($self.rup_jqtable('getGridParam', 'records') === 0) {
						jQuery(jQuery('#cb_' + $self.attr('id'), settings.core.$tableDiv)[0]).attr('disabled', 'disabled');
					} else {
						jQuery(jQuery('#cb_' + $self.attr('id'), settings.core.$tableDiv)[0]).removeAttr('disabled');
					}
				},
				/*
         * Capturador del evento jqGridLoadComplete.
         * Se ejecuta una vez se haya completado la carga de la tabla.
         *
         * 	data: Objeto que contiene la carga de la tabla.
         *
         */
				'jqGridLoadComplete.rupTable.multiselection': function (data, xhr) {
					var self = $self[0],
						internalProps = self.p,
						page = $self.rup_jqtable('getGridParam', 'page'),
						rowNum = $self.rup_jqtable('getGridParam', 'rowNum'),
						rows,
						selectedRows = settings.multiselection.selectedRowsPerPage[page],
						deselectedRows = settings.multiselection.deselectedRowsPerPage[page] || [],
						reorderedRow, reorderedRowPage, reorderedRowLine, reorderedRowId,
						arrayAuxRowsPerPage, arrayAuxLinesPerPage, arrayAuxIds, arrayAuxRows, arrayAuxPages, firstSelectedLine, firstSelectedId, indexAux, idAux;

					/*
           * REORDENAR LA SELECCION
           */
					if (xhr.reorderedSelection !== undefined && xhr.reorderedSelection !== null) {
						$self._initializeMultiselectionProps(settings);

						settings.multiselection.selectedAll = xhr.selectedAll;

						if (settings.multiselection.selectedAll === true) {
							arrayAuxRowsPerPage = settings.multiselection.deselectedRowsPerPage;
							arrayAuxLinesPerPage = settings.multiselection.deselectedLinesPerPage;
							arrayAuxIds = settings.multiselection.deselectedIds;
							arrayAuxRows = settings.multiselection.deselectedRows;
							arrayAuxPages = settings.multiselection.deselectedPages;
							settings.multiselection.numSelected = xhr.records - xhr.reorderedSelection.length;
						} else {
							arrayAuxRowsPerPage = settings.multiselection.selectedRowsPerPage;
							arrayAuxLinesPerPage = settings.multiselection.selectedLinesPerPage;
							arrayAuxIds = settings.multiselection.selectedIds;
							arrayAuxRows = settings.multiselection.selectedRows;
							arrayAuxPages = settings.multiselection.selectedPages;
							settings.multiselection.numSelected = xhr.reorderedSelection.length;
						}

						for (var i = 0; i < xhr.reorderedSelection.length; i++) {

							reorderedRow = xhr.reorderedSelection[i];
							reorderedRowPage = reorderedRow.page;
							reorderedRowLine = reorderedRow.pageLine;

							var retValue = '';
							for (var j = 0; j < settings.primaryKey.length; j++) {
								retValue += reorderedRow.pk[settings.primaryKey[j]] + settings.multiplePkToken;
							}
							reorderedRowId = retValue.substr(0, retValue.length - 1);

							if (arrayAuxRowsPerPage[reorderedRowPage] === undefined) {
								arrayAuxRowsPerPage[reorderedRowPage] = [];
								arrayAuxLinesPerPage[reorderedRowPage] = [];
							}
							// Se almacena el Id del registro seleccionado
							if (jQuery.inArray(reorderedRowId, arrayAuxIds) === -1) {
								arrayAuxIds.push(reorderedRowId);
								arrayAuxRows.push({
									id: reorderedRowId,
									page: reorderedRowPage
								});
								//								arrayAuxRowsPerPage[reorderedRowPage].splice(reorderedRowLine,0,reorderedRowId);
								arrayAuxRowsPerPage[reorderedRowPage].push(reorderedRowId);
								arrayAuxLinesPerPage[reorderedRowPage].push(reorderedRowLine);
								if (arrayAuxRowsPerPage[reorderedRowPage].length > 0 &&
																		jQuery.inArray(reorderedRowPage, arrayAuxPages) === -1) {
									jQuery.rup_utils.insertSorted(arrayAuxPages, reorderedRowPage);
								}
							}
						}
						//						$self.rup_jqtable("updateSelectedRowNumber");
					}

					// Se genera el evento que indica la modificación de los elementos seleccionados.
					$self.triggerHandler('rupTable_multiselectionUpdated');

					// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
					$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

					// Se gestiona el icono de linea editable
					if ($self._hasPageSelectedElements(page)) {

						if (settings.multiselection.rowForEditing !== undefined && jQuery.inArray(settings.multiselection.rowForEditing, $self.jqGrid('getDataIDs')) !== -1) {
							$self.rup_jqtable('highlightEditableRow', jQuery($self.jqGrid('getInd', settings.multiselection.rowForEditing, true)), true);
						} else {
							$self.rup_jqtable('highlightFirstEditableRow');
						}

						//						firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
						//						firstSelectedId = $self.jqGrid("getDataIDs")[firstSelectedLine-1];
						//						settings.multiselection.rowForEditing=firstSelectedId;
						//						$self.rup_jqtable("highlightEditableRow", $self.jqGrid("getInd",firstSelectedId, true));
					}


					/**
           * ARROW
           */
					//Cabecera
					var $checkAllTH = jQuery('[id=\'' + settings.id + '_cb\']');
					if (settings.multiselection.headerContextMenu_enabled && $checkAllTH.find('a').length === 0) {
						//Añadir solo una vez
						$checkAllTH.find('input').css('margin-right', '1em');
						$self._addArrow($checkAllTH.find('input'));
					}

					//Fila
					$self.find('.cbox').css('margin-right', '1em');
					if (settings.multiselection.rowContextMenu_enabled) {
						var isJerarquia = settings.jerarquia !== undefined ? true : false,
							defaultOptions = jQuery.isEmptyObject(settings.multiselection.rowContextMenu.items);
						//Recorrer todas las filas
						$.each($self.find('.cbox'), function (index, value) {
							//Añadir flecha
							$self._addArrow(jQuery(value));
							//Deshabilitar flecha: Jerarquía + solo opciones por defecto + no tiene hijos
							if (isJerarquia && defaultOptions && $(value).parents('tr').find('.treeclick').hasClass('tree-leaf')) {
								jQuery(this).next('a').addClass('ui-state-disabled').off('click');
							}
						});
					}
				},
				/*
         * Capturador del evento jqGridSelectAll.
         * Se ejecuta cuando se realice una selección de todos los elementos de la página.
         *
         * 	event: Objeto event de jQuery
         *  selectedRows: Array con los identificadores de los registros seleccionados en la página
         *  status: true en caso de selección, false en caso de deselección.
         */
				'jqGridSelectAll.rupTable.multiselection': function (event, selectedRows, status) {
					var page = $self.rup_jqtable('getGridParam', 'page'),
						selectMsg, deselectMsg, elementosRestantes, selectRestMsg, remainingSelectButton, remainingDeselectButton, cont;

					// Se oculta el posible mensaje de feedback que se muestre
					$self.triggerHandler('rupTable_internalFeedbackClose');

					// Se gestiona la selección de todos los registros de la página
					cont = 0;
					for (var i = 0; i < selectedRows.length; i++) {
						if (selectedRows[i].indexOf(settings.id + 'ghead_') === -1) {
							$self._processSelectedRow(settings, selectedRows[i], status);
							cont++;
						}
					}


					selectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.selectMsg', '<b>' + cont + '</b>', '<b>' + page + '</b>');
					deselectMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.deselectMsg', '<b>' + cont + '</b>', '<b>' + page + '</b>');

					// Se comprueba el valor de status para determinar si se está seleccionando (true) o deseleccionando (false) todos los registos de la página
					if (status) {
						// Se obtienen el número de registros restantes que quedan por seleccionar
						elementosRestantes = $self._getRemainingRecordNum(settings, selectedRows);
						if (elementosRestantes !== 0) {
							// En caso de existir registros sin seleccionar se muestra el mensaje junto con un botón para permitir la selecón de dichos elementos
							selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.selectRestMsg', elementosRestantes);
							remainingSelectButton = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.multiselection.selectRemainingRecords', $self[0].id, selectRestMsg, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.selectAll'));
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, selectMsg + remainingSelectButton, 'alert']);
						} else {
							// Si no hay elementos restantes por seleccionar se muestra solo un mensaje informativo
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, selectMsg, 'alert']);
						}

						// Se asocia el handler al evento click del botón de seleccionar el resto de registros
						$('#rup_jqtable_' + $self[0].id + '_selectAll').on('click', function (event) {
							$self.rup_jqtable('selectRemainingRows');
						});
						$self.rup_jqtable('highlightFirstEditableRow');
					} else {
						$self.rup_jqtable('clearHighlightedEditableRows');
						// En caso de existir elementos seleccionados se muestra un mensaje que incluye un botón para permitir la deselección del todos los elementos seleccionados
						if (settings.multiselection.numSelected > 0) {
							selectRestMsg = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.deselectRestMsg', settings.multiselection.numSelected);
							remainingDeselectButton = jQuery.rup.i18nTemplate(jQuery.rup.i18n.base, 'rup_jqtable.templates.multiselection.deselectRemainingRecords', $self[0].id, selectRestMsg, jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.deSelectAll'));
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, deselectMsg + remainingDeselectButton, 'alert']);
						} else {
							// Si no hay elementos restantes por deseleccionar se muestra solo un mensaje informativo
							$self.trigger('rupTable_feedbackShow', [settings.$internalFeedback, deselectMsg, 'alert']);
						}

						// Se asocia el handler al evento click del botón de deseleccionar el resto de registros
						$('#rup_jqtable_' + $self[0].id + '_deselectAll').on('click', function (event) {
							$self.rup_jqtable('deselectRemainingRows');
						});
					}

					// Se actualiza el contador de elementos seleccionados
					$self.rup_jqtable('updateSelectedRowNumber');
				},
				'rupTableAfterSearchNav.rupTable.multiselection rupTableSearchSuccess.rupTable.multiselection rupTableAfterDelete.rupTable.multiselection': function () {
					var $self = $(this);
					$self.rup_jqtable('resetSelection');
				},
				'rupTable_multiselectionUpdated.multiselection': function () {
					var $self = $(this),
						self = $self[0],
						page = $self.rup_jqtable('getGridParam', 'page'),
						settings = $self.data('settings'),
						internalProps = self.p,
						rowNum = $self.rup_jqtable('getGridParam', 'rowNum'),
						rows,
						selectedRows = settings.multiselection.selectedRowsPerPage[page],
						deselectedRows = settings.multiselection.deselectedRowsPerPage[page] || [];

					// Se oculta el posible mensaje de feedback que se muestre
					$self.triggerHandler('rupTable_internalFeedbackClose');

					/*
           * Gestión de la persistencia de la multiselección entre páginas.
           *
           * El siguiente algoritmo permite mantener la selección de registros mientras se pagina.
           * Los registros seleccionados se mantienen almacenando sus identificadores.
           * En caso de seleccionar todos los elementos de la tabla se trabaja mediante lógica inversa, de modo que se almacenan los registros deseleccionados.
           */
					// Se comprueba si se han seleccionado todos los registros de la tabla.
					if (settings.multiselection.selectedAll) {
						internalProps.selarrrow = [];
						rows = self.rows;
						// Para cada línea que muestra la tabla:
						for (var i = 0; i < rows.length; i++) {

							// Se comprueba si el registro se encuentra en el array de deseleccionados.
							if (jQuery.inArray(rows[i].id, deselectedRows) === -1) {
								// En caso de no ser un elemento deseleccionado se marca como seleccionado.
								$self.rup_jqtable('highlightRowAsSelected', $(rows[i]));
							} else {
								// En caso de ser un elemento deseleccionado se desmarca.
								$self.rup_jqtable('clearHighlightedRowAsSelected', $(rows[i]));
							}
						}

						// En caso de estar todos los elementos de la página seleccionados marcamos el check general

						if (deselectedRows.length === 0) {
							settings.$selectAllCheck[internalProps.useProp ? 'prop' : 'attr']('checked', true);
						}

					} else {
						// No se han seleccionado todos los resgistros de la página.
						if (selectedRows) {
							rows = self.rows;
							internalProps.selarrrow = [];
							// Para cada línea que muestra la tabla:
							for (var i = 0; i < rows.length; i++) {
								// Se comprueba si el registro se encuentra en el array de seleccionados
								if (jQuery.inArray(rows[i].id, selectedRows) !== -1) {
									// En caso de ser un elemento seleccionado, se marca como tal.
									$self.rup_jqtable('highlightRowAsSelected', $(rows[i]));
								} else {
									// En caso de no ser un elemento seleccionado se desmarca.
									$self.rup_jqtable('clearHighlightedRowAsSelected', $(rows[i]));
								}
							}

							// En caso de estar todos los elementos de la página seleccionados marcamos el check general
							if (selectedRows.length === rowNum) {
								settings.$selectAllCheck[internalProps.useProp ? 'prop' : 'attr']('checked', true);
							}
						}
					}
					$self.rup_jqtable('updateSelectedRowNumber');
				},
				'rupTable_beforeAddRow.multiselection': function (event, addCloneOptions) {
					// Si la edición en línea no está activada, no comprobamos los elementos seleccionados y devolvemos true
					if ($self[0].p.inlineEdit) {
						return true;
					}
					$self._checkSelectedElements(function () {
						$self.jqGrid('editGridRow', 'new', addCloneOptions);
						$self.rup_jqtable('resetSelection');
						$self.rup_jqtable('clearHighlightedEditableRows');
					});

					return false;
				},
				'jqGridAddEditAfterSubmit.rupTable.formEditing': function (event, res, postData, oper) {
					if (oper !== 'edit') {
						$self.rup_jqtable('resetSelection');
						$self.rup_jqtable('clearHighlightedEditableRows');
					}
				}
			});

			if (settings.multiboxonly === true) {
				settings.multiselection.multiboxonly = true;
			}

			// Control del uso de Ctrl y Shift
			jQuery('body').on({
				'rup_ctrlKeyDown rup_shiftKeyDown': function () {
					if (settings.multiselection.multiboxonly === true) {
						$self[0].p.multiboxonly = false;
					}
					return false;
				},
				'rup_ctrlKeyUp rup_shiftKeyUp': function () {
					if (settings.multiselection.multiboxonly === true) {
						$self[0].p.multiboxonly = true;
					}
					return false;
				}
			});

			/**
       * MENUS CONTEXTUALES
       */
			jQuery.contextMenu('destroy', '[id=\'' + settings.id + '_cb\']');
			let selector = '[id=\'' + settings.id + '_cb\']';
			if (jQuery(selector).length>0){
				jQuery(selector).rup_contextMenu({
					selector: selector,
					trigger: 'none',
					callback: settings.multiselection.headerContextMenu.callback,
					items: $self._headerContextMenuItems(settings.multiselection.headerContextMenu, settings),
					position: function (contextMenu, x, y) {
						var offset = this.offset();
						contextMenu.$menu.css({
							top: offset.top + this.height(),
							left: offset.left
						});
					}
				});
			}
			if (settings.multiselection.rowContextMenu_enabled) {
				let selector = 'td[aria-describedby=\'' + settings.id + '_cb\']';
				jQuery.contextMenu('destroy', selector);
				if (jQuery(selector).length > 0) {
					jQuery(selector).rup_contextMenu({
						selector: selector,
						trigger: 'none',
						callback: settings.multiselection.rowContextMenu.callback,
						items: $self._rowContextMenuItems(settings.multiselection.rowContextMenu, settings),
						position: function (contextMenu, x, y) {
							var offset = this.offset();
							contextMenu.$menu.css({
								top: offset.top + this.height(),
								left: offset.left
							});
						}
					});
				}
			}
		}
	});

	/**
   * Métodos públicos del plugin multiselection.
   *
   * Los métodos implementados son:
   *
   * resetSelection(): Limpia a selección realizada por el usuario.
   * updateSelectedRowNumber(): Refresca el identificador de resgistros seleccionados
   */
	jQuery.fn.rup_jqtable('extend', {
		getSelectedIds: function () {
			var $self = this,
				settings = $self.data('settings'),
				multiselectionObj = {};

			if (!settings.multiselection.selectedAll) {
				if (settings.multiselection.selectedIds != undefined) {
					if (settings.multiselection.selectedIds.length > 0) {
						jQuery.extend(true, multiselectionObj, {
							'selectedIds': settings.multiselection.selectedIds
						});
					}
				}
				jQuery.extend(true, multiselectionObj, {
					'selectedAll': false
				});
			} else {
				if (settings.multiselection.deselectedIds.length > 0) {
					jQuery.extend(true, multiselectionObj, {
						'selectedIds': settings.multiselection.deselectedIds
					});
				}
				jQuery.extend(true, multiselectionObj, {
					'selectedAll': true
				});
			}

			return multiselectionObj;
		},
		clearHighlightedEditableRows: function () {
			var $self = this,
				settings = $self.data('settings');
			$self.find('td[aria-describedby=\'' + settings.id + '_rupInfoCol\'] span.ui-icon.ui-icon-pencil').removeClass('ui-icon-pencil');
		},
		highlightFirstEditableRow: function () {
			var $self = this,
				settings = $self.data('settings'),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'), 10),
				firstSelectedLine, firstSelectedId;

			$self.rup_jqtable('clearHighlightedEditableRows');

			if ($self._hasPageSelectedElements(page)) {
				firstSelectedLine = $self._getFirstSelectedElementOfPage(page);
				firstSelectedId = $self.jqGrid('getDataIDs')[firstSelectedLine - 1];
				settings.multiselection.rowForEditing = firstSelectedId;
				$self.rup_jqtable('highlightEditableRow', $self.jqGrid('getInd', firstSelectedId, true));
			}
		},
		highlightEditableRow: function ($row) {
			var $self = this,
				settings = $self.data('settings');
			$row = jQuery($row);
			$row.find('td[aria-describedby=\'' + settings.id + '_rupInfoCol\'] span').addClass('ui-icon ui-icon-rupInfoCol ui-icon-pencil');
		},
		refreshSelection: function () {
			var $self = this;
			$self.triggerHandler('rupTable_multiselectionUpdated');
		},
		resetSelection: function () {
			var $self = this,
				settings = $self.data('settings');

			$self.jqGrid('resetSelection');
			$self._initializeMultiselectionProps(settings);
			$self.triggerHandler('rupTable_multiselectionUpdated');
		},
		selectAllRows: function (event) {
			var $self = this,
				settings = $self.data('settings'),
				arr, $row;

			$self.rup_jqtable('selectRemainingRows');

			jQuery('#cb_' + settings.id).attr('checked', 'checked');

			// Se marcan los registros de la tabla como marcados
			arr = $self.jqGrid('getDataIDs');

			for (var i = 0; i < arr.length; i++) {
				$row = jQuery($self.jqGrid('getInd', arr[i], true));
				$self.rup_jqtable('highlightRowAsSelected', $row);
			}

			$self.rup_jqtable('highlightFirstEditableRow');
		},
		selectRemainingRows: function (event) {
			var $self = this,
				settings = $self.data('settings');

			$self._initializeMultiselectionProps(settings);
			// Se marca el flag de todos seleccionados a true
			settings.multiselection.selectedAll = true;
			// Numero de registros seleccionados
			settings.multiselection.numSelected = $self.rup_jqtable('getGridParam', 'records');
			// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
			$self.rup_jqtable('updateSelectedRowNumber');

			$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);

		},
		deselectAllRows: function (event) {
			var $self = this,
				settings = $self.data('settings'),
				arr, $row,
				internalProps = $self[0].p;

			$self.rup_jqtable('deselectRemainingRows');
			$self.rup_jqtable('clearHighlightedEditableRows');

			jQuery('#cb_' + settings.id).removeAttr('checked');

			// Se marcan los registros de la tabla como marcados
			arr = $self.jqGrid('getDataIDs');
			internalProps.selarrrow = [];

			for (var i = 0; i < arr.length; i++) {
				$row = jQuery($self.jqGrid('getInd', arr[i], true));
				$self.rup_jqtable('clearHighlightedRowAsSelected', $row);
			}
		},
		deselectRemainingRows: function (event) {
			var $self = this,
				settings = $self.data('settings');

			$self._initializeMultiselectionProps(settings);
			// Se cierra el feedback para seleccionar/deseleccionar el resto de registros
			$self.rup_jqtable('updateSelectedRowNumber');
			$self.trigger('rupTable_feedbackClose', settings.$internalFeedback);
		},
		/*
     * Actualiza el contador de la tabla que indica los registros seleccionados.
     */
		updateSelectedRowNumber: function () {
			var $self = $(this),
				settings = $self.data('settings');
			$('div .ui-paging-selected', settings.$pager).html(settings.multiselection.numSelected + ' ' + jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_jqtable.pager.selected'));
			$self.triggerHandler('rupTableSelectedRowNumberUpdated');
		}

	});

	//*******************************************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************************************

	/**
   * Métodos privados del plugin multiselection.
   *
   * Los métodos implementados son:
   *
   * _addArrow (object): Añade flecha para desplegar menú contextual.
   * _headerContextMenuItems(options, settings): Configura el menú contextual del check de la cabecera.
   * _rowContextMenuItems(options, settings): Configura el menú contextual del check de cada línea (contiene configuración para Jerarquía).
   * _hasPageSelectedElements(paramPage): Determina (true/false) si la página indicada contiene registros seleccionados.
   * _initializeMultiselectionProps(settings): Inicializa los parámetros internos de control para la multiselección.
   * _getFirstSelectedElementOfPage(paramPage): Devuelve el primer registro seleccionado de la página indicada.
   * _getRemainingRecordNum(settings, selectedRows): Devuelve el número de elementos restantes que pueden ser seleccionados.
   * _getSelectedLinesOfPage(page): Devuelve el número de registros seleccionados de que dispone la página indicada por parámetro.
   * _processSelectedRow(settings, rowId, status): Gestióna la acción de seleción/deselección del registro indicado.
   */
	jQuery.fn.rup_jqtable('extend', {
		//Añade flecha contextMenu
		_addArrow: function (object) {
			jQuery(object).after(
				jQuery('<a></a>')
					.attr('href', 'javascript:void(0)')
					.addClass('ui-icon rup-jerarquia_checkmenu_arrow')
					.on('click', function (e) {
						$(this).parents('th, td').contextMenu();
					})
			);
		},
		_checkSelectedElements: function (okCallback) {
			var $self = $(this),
				self = $self[0],
				page = $self.rup_jqtable('getGridParam', 'page'),
				settings = $self.data('settings');

			//if(prop.showMultiselectAlerts && selectedRows && selectedRows.length>0){
			if (settings.multiselection.numSelected > 0) {
				$.rup_messages('msgConfirm', {
					message: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.checkSelectedElems'),
					title: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.changes'),
					OKFunction: function () {
						okCallback.call();
					}
				});
			} else {
				okCallback.call();
			}
		},
		//Crear contextMenu cabecera
		_headerContextMenuItems: function (options, settings) {
			var $self = this,
				items = {};
			if (options.selectAllPage) {
				jQuery.extend(items, {
					'selectAllPage': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.selectAllPage'),
						icon: 'check',
						disabled: function (key, opt) {
							return $self._getSelectedLinesOfPage(parseInt($self.rup_jqtable('getGridParam', 'page'))).length === $self.jqGrid('getGridParam', 'reccount');
						},
						callback: function (key, options) {
							$('[id=\'cb_' + settings.id + '\']').attr('checked', 'checked').click().attr('checked', 'checked');
						}
					}
				});
			}
			if (options.deselectAllPage) {
				jQuery.extend(items, {
					'deselectAllPage': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.deselectAllPage'),
						icon: 'uncheck',
						disabled: function (key, opt) {
							return $self._getSelectedLinesOfPage(parseInt($self.rup_jqtable('getGridParam', 'page'))).length === 0;
						},
						callback: function (key, options) {
							$('[id=\'cb_' + settings.id + '\']').removeAttr('checked').click().removeAttr('checked');
						}
					}
				});
			}
			if (options.separator) {
				jQuery.extend(items, {
					'separator': ''
				});
			}
			if (options.selectAll) {
				jQuery.extend(items, {
					'selectAll': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.selectAll'),
						icon: 'check_all',
						disabled: function (key, opt) {
							return settings.multiselection.numSelected === $self.rup_jqtable('getGridParam', 'records');
						},
						callback: function (key, options) {
							$self.rup_jqtable('selectAllRows');
						}
					}
				});
			}
			if (options.deselectAll) {
				jQuery.extend(items, {
					'deselectAll': {
						name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.multiselection.deselectAll'),
						icon: 'uncheck_all',
						disabled: function (key, opt) {
							return settings.multiselection.numSelected === 0;
						},
						callback: function (key, options) {
							$self.rup_jqtable('deselectAllRows');
						}
					}
				});
			}

			if (!jQuery.isEmptyObject(options.items)) {
				jQuery.extend(items, options.items);
			}
			return items;
		},
		_rowContextMenuItems: function (options, settings) {
			var $self = this,
				items = {};
			if (settings.jerarquia !== undefined && settings.jerarquia.contextMenu) {
				if (options.selectChild) {
					jQuery.extend(items, {
						'selectChild': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.selectChild'),
							icon: 'child',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.selectDescendent) {
					jQuery.extend(items, {
						'selectDescendent': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.selectDescendent'),
							icon: 'descendent',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.separator) {
					jQuery.extend(items, {
						'separator': ''
					});
				}
				if (options.deselectChild) {
					jQuery.extend(items, {
						'deselectChild': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.deselectChild'),
							icon: 'uncheck',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
				if (options.deselectDescendent) {
					jQuery.extend(items, {
						'deselectDescendent': {
							name: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.plugins.jerarquia.deselectDescendent'),
							icon: 'uncheck',
							callback: function (key, options) {
								$self._getJerarquiaChildren(this, key, options);
							}
						}
					});
				}
			}
			if (!jQuery.isEmptyObject(options.items)) {
				jQuery.extend(items, options.items);
			}
			return items;
		},
		_refreshSelectedElements: function (settings, status, rowPK, tableRow) {
			//Variables para referenciar selección normal o inversa
			var rowsPerPage, linesPerPage, ids, rows, pages;
			if (settings.multiselection.selectedAll !== true) {
				rowsPerPage = settings.multiselection.selectedRowsPerPage;
				linesPerPage = settings.multiselection.selectedLinesPerPage;
				ids = settings.multiselection.selectedIds;
				rows = settings.multiselection.selectedRows;
				pages = settings.multiselection.selectedPages;
			} else {
				rowsPerPage = settings.multiselection.deselectedRowsPerPage;
				linesPerPage = settings.multiselection.deselectedLinesPerPage;
				ids = settings.multiselection.deselectedIds;
				rows = settings.multiselection.deselectedRows;
				pages = settings.multiselection.deselectedPages;
				status = !status;
			}

			//Si no estaba seleccionado
			if (status) {
				if (jQuery.inArray(rowPK, ids) === -1) {
					//Añadir el elemento a los seleccionados
					if (settings.multiselection.selectedAll !== true) {
						settings.multiselection.numSelected++;
					} else { //Quitar el elemento de los no seleccionados (inversa)
						settings.multiselection.numSelected--;
					}
					//Controlar si no existe array para la página
					if (rowsPerPage[tableRow.page] === undefined) {
						rowsPerPage[tableRow.page] = [];
						linesPerPage[tableRow.page] = [];
					}
					//id
					ids.push(rowPK);
					//PAGINA [líneas]
					jQuery.rup_utils.insertSorted(linesPerPage[tableRow.page], tableRow.pageLine);
					//{ id : PK, page : PAGINA }
					rows.push({
						id: rowPK,
						page: tableRow.page
					});
					//PAGINA [ids]
					rowsPerPage[tableRow.page].splice(tableRow.pageLine, 0, rowPK);
					//PAGINA
					if (rowsPerPage[tableRow.page].length > 0 &&
												jQuery.inArray(tableRow.page, pages) === -1) {
						jQuery.rup_utils.insertSorted(pages, tableRow.page);
					}
				}
			} else {
				if (jQuery.inArray(rowPK, ids) !== -1) {
					//Quitar el elemento a los seleccionados
					if (settings.multiselection.selectedAll !== true) {
						settings.multiselection.numSelected--;
					} else { //añadir el elemento de los no seleccionados (inversa)
						settings.multiselection.numSelected++;
					}
					//id
					ids.splice(jQuery.inArray(rowPK, ids), 1);
					//PAGINA [líneas]
					linesPerPage[tableRow.page].splice(jQuery.inArray(tableRow.pageLine, linesPerPage[tableRow.page]), 1);
					//{ id : PK, page : PAGINA }
					var selectedRowObjStr = JSON.stringify({
							id: rowPK,
							page: tableRow.page
						}),
						indexInArray = null;
					jQuery.grep(rows, function (element, index) {
						if (JSON.stringify(element) === selectedRowObjStr) {
							indexInArray = index;
						}
					});
					rows.splice(indexInArray, 1);
					//PAGINA [ids]
					rowsPerPage[tableRow.page].splice(jQuery.inArray(rowPK, rowsPerPage[tableRow.page]), 1);
					//PAGINA
					if (rowsPerPage[tableRow.page].length == 0 &&
												jQuery.inArray(tableRow.page, pages) !== -1) {
						pages.splice(jQuery.inArray(tableRow.page, pages), 1);
					}
				}
			}
		},

		_hasPageSelectedElements: function (paramPage) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage,
				page = (typeof paramPage === 'string' ? parseInt(paramPage, 10) : paramPage);
			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				return (jQuery.inArray(page, settings.multiselection.selectedPages) !== -1);

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Generamos un array inicializado con los index de las lineas de las tablas
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);

				// Obtenemos el número de registro por página que se visualizan
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay elementos seleccionados
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) !== -1 && settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return false;
				}

				return true;
			}
		},
		_initializeMultiselectionProps: function (settings) {
			// Se almacenan en los settings internos las estructuras de control de los registros seleccionados
			if (settings.multiselection === undefined) {
				settings.multiselection = {};
			}
			// Flag indicador de selección de todos los registros
			settings.multiselection.selectedAll = false;
			// Numero de registros seleccionados
			settings.multiselection.numSelected = 0;
			// Propiedades de selección de registros
			settings.multiselection.selectedRowsPerPage = [];
			settings.multiselection.selectedLinesPerPage = [];
			settings.multiselection.selectedRows = [];
			settings.multiselection.selectedIds = [];
			settings.multiselection.selectedPages = [];
			// Propiedades de deselección de registros
			settings.multiselection.deselectedRowsPerPage = [];
			settings.multiselection.deselectedLinesPerPage = [];
			settings.multiselection.deselectedRows = [];
			settings.multiselection.deselectedIds = [];
			settings.multiselection.deselectedPages = [];

		},
		_getFirstSelectedElementOfPage: function (paramPage) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage,
				page = (typeof paramPage === 'string' ? parseInt(paramPage, 10) : paramPage);

			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				if (jQuery.inArray(page, settings.multiselection.selectedPages) === -1) {
					return false;
				}
				// En caso de que se haya seleccionado un elemento en la página indicada se devuelve el primero
				return settings.multiselection.selectedLinesPerPage[page][0];

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Si no se han deseleccionado registros en la página se devuelve el primer indice
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) === -1) {
					return 1;
				}
				// Obtenemos el número de registro por página que se visualizan
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay eleme
				if (settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return false;
				}

				// Obtenemos el primer elemento de la página que no ha sido deseleccionado
				for (var i = 1; i <= rowsPerPage; i++) {
					if (jQuery.inArray(i, settings.multiselection.deselectedLinesPerPage[page]) === -1) {
						return i;
					}
				}
			}
		},
		_getRemainingRecordNum: function (settings, selectedRows) {
			var $self = this,
				totalRegistros = $self.rup_jqtable('getGridParam', 'records'),
				registrosPagina = $self.rup_jqtable('getGridParam', 'reccount'),
				registrosSelPagina = selectedRows.length,
				registrosSelTotal = settings.multiselection.numSelected,
				elementosRestantes = ((totalRegistros - registrosPagina) !== 0) ?
					totalRegistros - registrosPagina - (registrosSelTotal - registrosSelPagina) : 0;

			return elementosRestantes;
		},
		_getSelectedLinesOfPage: function (page) {
			var $self = this,
				settings = $self.data('settings'),
				rowsPerPage, records, lastPage, inverseArray = [];

			// Se comprueba si se han seleccionado todos los registros de la tabla
			if (!settings.multiselection.selectedAll) {
				// En caso de no haberse seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha seleccionado un elemento
				if (jQuery.inArray(page, settings.multiselection.selectedPages) === -1) {
					return [];
				}
				// En caso de que se haya seleccionado un elemento en la página indicada se devuelve el array de seleccionados
				return settings.multiselection.selectedLinesPerPage[page];

			} else {
				// En caso de haberse seleccionado todos los registros de la tabla
				// Generamos un array inicializado con los index de las lineas de las tablas
				rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'), 10);
				records = $self.rup_jqtable('getGridParam', 'records');
				lastPage = parseInt(Math.ceil(records / rowsPerPage, 10));

				// En caso de ser la última página se recalcula el número de elementos que se muestran en ella
				if (page === lastPage) {
					rowsPerPage = records - ((lastPage - 1) * rowsPerPage);
				}

				for (var i = 1; i <= rowsPerPage; i++) {
					inverseArray[i - 1] = i;
				}
				// Si no se han deseleccionado registros en la página se devuelve el array al completo
				if (jQuery.inArray(page, settings.multiselection.deselectedPages) === -1) {
					return inverseArray;
				}
				// Obtenemos el número de registro por página que se visualizan
				// Se comprueba si el número de registros deseleccionados es igual al número de registros por página, en cuyo caso significará que no hay elementos seleccionados
				if (settings.multiselection.deselectedLinesPerPage[page].length === rowsPerPage) {
					return [];
				}
				// Se eliminan del array inicializado con todos los identificadores de las lineas, las que han sido deseleccionadas
				return jQuery.grep(inverseArray, function (elem) {
					return (jQuery.inArray(elem, settings.multiselection.deselectedLinesPerPage[page]) === -1);
				});
			}
		},
		_processSelectedRow: function (settings, rowId, status) {
			var $self = this,
				page = $self.rup_jqtable('getGridParam', 'page'),
				pageInt = parseInt(page),
				lineIndex, indexInArray, indexAtPage, indexPage;
			// Se selecciona o deselecciona el elemento en los arrays que almacenan los registros seleccionados.
			if (status) {
				if (settings.multiselection.selectedAll) {
					// Se ha deseleccionado un elemento
					// Se almacena el Id del registro seleccionado
					indexInArray = jQuery.inArray(rowId, settings.multiselection.deselectedIds);
					if (indexInArray != -1) {
						settings.multiselection.deselectedIds.splice(indexInArray, 1);
						settings.multiselection.deselectedRows.splice(indexInArray, 1);
						indexAtPage = jQuery.inArray(rowId, settings.multiselection.deselectedRowsPerPage[page]);
						settings.multiselection.deselectedRowsPerPage[page].splice(indexAtPage, 1);
						settings.multiselection.deselectedLinesPerPage[page].splice(indexAtPage, 1);
						if (settings.multiselection.deselectedRowsPerPage[page].length === 0) {
							indexPage = jQuery.inArray(pageInt, settings.multiselection.deselectedPages);
							if (indexPage !== -1) {
								settings.multiselection.deselectedPages.splice(indexPage, 1);
							}
						}
						settings.multiselection.numSelected++;
					}
				} else {
					// Se ha seleccionado un elemento
					// Se comprueba si está creado el array correspondiente para la página actual
					if (settings.multiselection.selectedRowsPerPage[page] === undefined) {
						settings.multiselection.selectedRowsPerPage[page] = [];
						settings.multiselection.selectedLinesPerPage[page] = [];
					}
					// Se almacena el Id del registro seleccionado
					if (jQuery.inArray(rowId, settings.multiselection.selectedIds) === -1) {
						settings.multiselection.selectedIds.push(rowId);
						settings.multiselection.selectedRows.push({
							id: rowId,
							page: page
						});
						//						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.selectedLinesPerPage[page], $self.jqGrid("getInd",rowId));
						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.selectedLinesPerPage[page], $self._getLineIndex(rowId));
						settings.multiselection.selectedRowsPerPage[page].splice(lineIndex, 0, rowId);
						if (settings.multiselection.selectedRowsPerPage[page].length > 0 &&
														jQuery.inArray(pageInt, settings.multiselection.selectedPages) === -1) {
							jQuery.rup_utils.insertSorted(settings.multiselection.selectedPages, pageInt);
						}
						settings.multiselection.numSelected++;
					}
				}
			} else {
				if (settings.multiselection.selectedAll) {
					// Se ha seleccionado un elemento
					// Se comprueba si está creado el array correspondiente para la página actual
					if (settings.multiselection.deselectedRowsPerPage[page] === undefined) {
						settings.multiselection.deselectedRowsPerPage[page] = [];
						settings.multiselection.deselectedLinesPerPage[page] = [];
					}
					// Se almacena el Id del registro seleccionado
					if (jQuery.inArray(rowId, settings.multiselection.deselectedIds) === -1) {
						settings.multiselection.deselectedIds.push(rowId);
						settings.multiselection.deselectedRows.push({
							id: rowId,
							page: page
						});
						//						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.deselectedLinesPerPage[page], $self.jqGrid("getInd",rowId));
						lineIndex = jQuery.rup_utils.insertSorted(settings.multiselection.deselectedLinesPerPage[page], $self._getLineIndex(rowId));
						settings.multiselection.deselectedRowsPerPage[page].splice(lineIndex, 0, rowId);
						if (settings.multiselection.deselectedRowsPerPage[page].length > 0 &&
														jQuery.inArray(pageInt, settings.multiselection.deselectedPages) === -1) {
							jQuery.rup_utils.insertSorted(settings.multiselection.deselectedPages, pageInt);
						}
						settings.multiselection.numSelected--;
					}
				} else {
					// Se ha deseleccionado un elemento
					// Se almacena el Id del registro seleccionado
					index = jQuery.inArray(rowId, settings.multiselection.selectedIds);
					if (index != -1) {
						settings.multiselection.selectedIds.splice(index, 1);
						settings.multiselection.selectedRows.splice(index, 1);
						indexAtPage = jQuery.inArray(rowId, settings.multiselection.selectedRowsPerPage[page]);
						settings.multiselection.selectedRowsPerPage[page].splice(indexAtPage, 1);
						settings.multiselection.selectedLinesPerPage[page].splice(indexAtPage, 1);
						if (settings.multiselection.selectedRowsPerPage[page].length === 0) {
							indexPage = jQuery.inArray(pageInt, settings.multiselection.selectedPages);
							if (indexPage !== -1) {
								settings.multiselection.selectedPages.splice(indexPage, 1);
							}
						}
						settings.multiselection.numSelected--;
					}
				}
			}
			$self.rup_jqtable('updateSelectedRowNumber');
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************
	jQuery.fn.rup_jqtable.plugins.multiselection = jQuery.fn.rup_jqtable.plugins.multiselection || {};
	jQuery.fn.rup_jqtable.plugins.multiselection.defaults = {
		showGridInfoCol: true,
		formEdit: {
			autoselectFirstRecord: false
		},
		inlineEdit: {
			autoselectFirstRecord: false
		},
		multiselection: {
			defaultEditableInfoCol: {
				name: 'infoEditable',
				index: 'infoEditable',
				editable: false,
				width: '15em',
				search: false
			},
			headerContextMenu_enabled: true,
			headerContextMenu: {
				selectAllPage: true,
				deselectAllPage: true,
				separator: true,
				selectAll: true,
				deselectAll: true,
				items: {}
			},
			rowContextMenu_enabled: false,
			rowContextMenu: {
				selectChild: true,
				selectDescendent: true,
				separator: true,
				deselectChild: true,
				deselectDescendent: true,
				items: {}
			}
		}
	};

	jQuery.fn.rup_jqtable.defaults.multiselection = {
		loadBeforeSend: function rup_jqtable_defaults_loadBeforeSend(xhr, settings) {
			// Se modifica la request para incluir las siguientes cabeceras:
			// Se añade la cabecera JQGridModel para indicar que la petición ha sido realizada por el componente rup_jqtable
			xhr.setRequestHeader('JQGridModel', 'true');
			// Se indica que el tipo de contenido enviado en la cabecera es application/jsons
			xhr.setRequestHeader('Content-Type', 'application/json');
		}
	};


})(jQuery);
