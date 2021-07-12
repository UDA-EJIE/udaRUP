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

(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */

	/**
	 * Permite la edición de los registros de la tabla mostrando los campos de edición sobre la propia línea del registro.
	 *
	 * @summary Plugin de edición en línea del componente RUP Table.
	 * @module rup_jqtable/inlineEdit
	 * @example
	 *
	 * $("#idComponente").rup_jqtable({
	 * 	url: "../jqGridUsuario",
	 * 	usePlugins:["inlineEdit"],
	 * 	inlineEdit:{
	 * 		// Propiedades de configuración del plugin inlineEdit
	 * 	}
	 * });
	 */
	jQuery.rup_jqtable.registerPlugin('inlineEdit',{
		loadOrder:7,
		preConfiguration: function(settings){
			var $self = this;

			$self.rup_jqtable('preConfigureInlineEdit',settings);
		},
		postConfiguration: function(settings){
			var $self = this;

			$self.rup_jqtable('postConfigureInlineEdit',settings);
		}
	});

	/**
	 * Extensión del componente rup_jqtable para permitir la edición en línea de los registros visualizados.
	 *
	 * Los métodos implementados son:
	 *
	 * configureInlineEdit(settings): Realiza la configuración interna necesaria para la gestión correcta de la edición en línea.
	 * editRow(rowId, options): Activa el modo edicón en línea para un registro determinado.
	 * saveRow(rowId, options): Realiza el guardado de un registo modificado mediante la edición en línea.
	 *
	 * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
	 *
	 * settings.$inlineForm : Referencia al formulario utilizado para enviar los datos del registro que está siendo editado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin inlineEdit del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureInlineEdit
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureInlineEdit: function(settings){
			var $self = $(this), self = $self[0],
				//				formId = "inlineForm_" + settings.id,
				userBeforeSend;
			//				$inlineForm =$("<form>").attr({"id":"inlineForm_" + settings.id});

			settings.editable = true;
			//			// Arropamos la estructura de la tabla en un formulario para poder realizar el envío de los campos
			//			$self.wrap($inlineForm);
			//			// Almacenamos la referencia al formulario.
			//			settings.inlineEdit.$inlineForm = $("#"+formId);

			if (settings.inlineEdit.addEditOptions.url===undefined){
				settings.inlineEdit.addEditOptions.url=settings.baseUrl;
			}

			settings.inlineEdit.deleteOptions.ajaxDelOptions = $.extend(true, settings.inlineEdit.deleteOptions.ajaxDelOptions, {
				success: function(data,st, xhr){
					$self.triggerHandler('rupTableAfterDelete', [data,st, xhr]);
					$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.deletedOK'), 'ok');
				}
			});

			/*
			 * Configuración del evetno beforeSend. Se sustituye el existente (en caso de haber)
			 * por el implementado a continuación. El objetivo es realizar la operación AJAX mediante
			 * el componente rup_formulario en vez del sistema por defecto del jqGrid.
			 *
			 * El método beforeSend indicado por el usuario se seguirá ejecutanto de manera normal.
			 */
			// Se almacena en una variable temporal el método beforeSend especificado por el usuario
			userBeforeSend = settings.inlineEdit.beforeSend;
			settings.inlineEdit.addEditOptions.restoreAfterError = false;
			settings.inlineEdit.addEditOptions.errorfunc = function(rowid, data, stat, err, o){
				 var responseJSON;
				 if (data.status === 406 && data.responseText!== ''){
					 try{
						 responseJSON = jQuery.parseJSON(data.responseText);
						 if (responseJSON.rupErrorFields){
							 $self.rup_jqtable('showServerValidationFieldErrors',settings.inlineEdit.$inlineForm, responseJSON);
						 }
					 }catch(e){
						 // El mensaje JSON
						 $self.rup_jqtable('showFeedback', settings.$feedback, data.responseText, 'error');
					 }
				 }
			};

			settings.inlineEdit.addEditOptions.ajaxRowOptions.beforeSend = function(jqXHR, ajaxOptions){
				// Se añade la configuración de validaciones, la función userBeforeSend indicada por el usuario y el feedback utilizado por el componente.
				jQuery.extend(true, ajaxOptions, {
					validate: settings.validate,
					beforeSend:(jQuery.isFunction(userBeforeSend)?userBeforeSend:null),
					feedback: settings.$feedback

				});

				// Handler del evento rupValidate_formValidationError. Se lanza cuando se produce un error de validación en el formulario.
				settings.inlineEdit.$inlineForm.on('rupValidate_formValidationError.inlineEditing', function(event, obj){
					$self.off('rupValidate_formValidationError.inlineEditing');
					// Se elimina la capa de bloqueo de la tabla.
					$('#lui_'+$.jgrid.jqID(settings.id)).hide();
				});

				// Se realiza el envío del fomulario
				settings.inlineEdit.$inlineForm.rup_form('ajaxSubmit', ajaxOptions);

				// Se retorna false para evitar que se realice la petición AJAX del plugin subyacente.
				return false;
			};

			// Fuerza la configuración para que solo se pueda seleccionar mediante el checkbox
			settings.multiboxonly = true;

			settings.getRowForEditing = function(){
				var $self = this,
					selrow=$self.jqGrid('getGridParam','selrow');

				return (selrow===null?false:selrow);
			};

			/* DEFINICION DE OPERACIONES BASICAS CON LOS REGISTROS */

			settings.core.defaultOperations = {
				'add': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.new'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.add.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length===0;
					},
					callback: function(key, options){
						var $self = this;
						$self.rup_jqtable('addRow');
					}
				},
				'edit': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.modify'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.edit.icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow'),
							newRow;

						// Existe una fila seleccionada?
						selrow = (selrow===null?false:selrow);
						selrow = selrow && (selrow.indexOf('jqg')===-1);

						// Existe una fila en modo nuevo?
						newRow = jQuery('tr[editable=\'1\'].jqgrid-new-row', $self).length===0;

						return selrow && newRow;
					},
					callback: function(key, options){
						$self.rup_jqtable('editRow', jQuery.proxy(settings.getRowForEditing,$self)());
					}
				},
				'save': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.save'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.save.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length>0;
					},
					callback: function(object,event){
						if(event.type === 'click'){
							$self.rup_jqtable('saveRow');
						}
					}
				},
				'clone': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.clone'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.clone.icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow'),
							newRow;

						// Existe una fila seleccionada?
						selrow = (selrow===null?false:selrow);
						selrow = selrow && (selrow.indexOf('jqg')===-1);

						// Existe una fila en modo nuevo?
						newRow = jQuery('tr[editable=\'1\'].jqgrid-new-row', $self).length===0;

						return selrow && newRow;

						//						if (settings.inlineEdit.autoEditRow===true){
						//							return $self.rup_jqtable("getSelectedRows").length === 1;
						//						}else{
						//							return $self.rup_jqtable("getSelectedRows").length === 1 && jQuery("tr[editable='1']", $self).length===0;
						//						}

					},
					callback: function(key, options){
						if (jQuery('tr[editable=\'1\']', $self).length>0){
							$self.rup_jqtable('restoreRow');
						}
						$self.rup_jqtable('cloneRow');
					}
				},
				'cancel': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.cancel'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations.cancel.icon,
					enabled: function(){
						var $self = this;
						return jQuery('tr[editable=\'1\']', $self).length>0;
					},
					callback: function(key, options){
						$self.rup_jqtable('restoreRow');
					}
				},
				'delete': {
					name: $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.delete'),
					icon: self._ADAPTER.CONST.core.operations.defaultOperations['delete'].icon,
					enabled: function(){
						var $self = this,
							selrow=$self.jqGrid('getGridParam','selrow');

						selrow = (selrow===null || selrow.indexOf('jqg')!==-1?false:selrow);

						return jQuery('tr[editable=\'1\']:not(.jqgrid-new-row)', $self).length>0 || selrow;
					},
					callback: function(key, options){
						$self.rup_jqtable('deleteRow');
					}
				}
			};
			
			$.extend(true, settings.core.operations, settings.core.defaultOperations);
			
			// Configuración de edit/add
			// Se procede a añadir sobre los settings de configuración los correspondientes a la edición en línea.
			settings.inlineEdit.addOptions = $.extend(true,{}, settings.inlineEdit.addEditOptions, settings.inlineEdit.addOptions);
			settings.inlineEdit.editOptions = $.extend(true,{}, settings.inlineEdit.addEditOptions, settings.inlineEdit.editOptions);


			/* =======
			 * EVENTOS
			 * =======
			 */
			// Campturador del evento jqGridInlineAfterSaveRow.
			$self.on({
				//				"jqGridAfterInsertRow.rupTable.inlineEditing": function(event, rowid, data, data){
				//					jQuery($self.getInd(rowid, true)).attr("editmode","add");
				//
				//				},
				'jqGridInlineErrorSaveRow.rupTable.inlineEditing': function(event, rowid, data){
					jQuery($self.getInd(rowid,true)).attr('id',settings.inlineEditingRow);
					$self.rup_jqtable('setSelection',settings.inlineEditingRow);
				},
				'jqGridInlineAfterSaveRow.rupTable.inlineEditing': function(event, rowid, res, tmp, options){

					// Una vez introducida la fila se elimina el estilo jqgrid-new-row para evitar que se elimine al utilizar el cancelar sobre esa fila.
					jQuery('#'+jQuery.jgrid.jqID(rowid)+'.jqgrid-new-row', $self).removeClass('jqgrid-new-row');

					// Una vez se haya realizado el guardado del registro se muestra el mensaje correspondiente en el feedback dependiendo del modo en el que se encuentra.
					if (options.oper === 'edit') {
						$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.modifyOK'), 'ok');
					} else {
						$self.rup_jqtable('showFeedback', settings.$feedback, $.rup.i18nParse($.rup.i18n.base,'rup_jqtable.insertOK'), 'ok');
					}
				},
				'jqGridInlineEditRow.rupTable.inlineEditing': function oneditfunc_default(event, rowId){
					var self = this, $self = $(self),
						settings = $self.data('settings'),
						colModel = self.p.colModel,
						ind = $self.jqGrid('getInd', rowId, true),
						cellColModel, colModelName, editOptions, $elem;

					// Se procesan las celdas editables
					$('td[role=\'gridcell\']',ind).each( function(i) {
						cellColModel = colModel[i];

						if(cellColModel.editable===true){
							colModelName = cellColModel.name;
							$elem = $('[name=\''+colModelName+'\']',ind);



							// Se añade el title de los elementos de acuerdo al colname
							$elem.attr({
								'oldtitle': self.p.colNames[i],
								'class': 'editable customelement'
							});

							// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
							if(cellColModel.rupType!==undefined) {
								editOptions = cellColModel.editoptions;

								/*
								 * PRE Configuración de los componentes RUP
								 */
								switch(cellColModel.rupType){
								case 'combo':
									editOptions = $.extend({menuWidth:$elem.width()}, editOptions, {width:'100%'});
									break;
								}

								// Invocación al componente RUP
								$elem['rup_'+cellColModel.rupType](editOptions);

								/*
								 * POST Configuración de los componentes RUP
								 */
								switch(cellColModel.rupType){
								case 'date':
									// TODO: Aplicarlo con estilos
									$elem.css('width','88%');
									break;
								}
							}
						}
					});

					settings.inlineEditingRow = rowId;

					function addNextRow (rowId, iCol){
						$self.on('jqGridInlineAfterSaveRow.inlineEditing.addNextRow', function(event){
							$self.rup_jqtable('addRow');
							jQuery($self.getInd($self[0].p.selrow, true)).find(':not([readonly]):focusable:first').focus();
							$self.off('jqGridInlineAfterSaveRow.inlineEditing.addNextRow');
						});

						$self.rup_jqtable('saveRow', rowId);
						return true;
					}

					function editNextRow (rowId, iCol){
						var idsArray, rowIndex, rowsPerPage, page, lastPage, $focusableElem;
						idsArray = $self.getDataIDs();
						rowIndex = $self.getInd(rowId)-1;
						rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'),10);


						if (rowIndex===rowsPerPage-1){
							// Cambio de página
							page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);
							lastPage = parseInt(Math.ceil($self.rup_jqtable('getGridParam', 'records')/$self.rup_jqtable('getGridParam', 'rowNum')),10);
							if (page<lastPage){
								$self.trigger('reloadGrid',[{page: page+1}]);
								$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
									idsArray = $self.getDataIDs();
									$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
										if (iCol === undefined || iCol === -1){
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:first');
										}else{
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:first');
										}
										$focusableElem.trigger('focus');
										$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
									});
									jQuery($self.getInd(idsArray[0],true)).trigger('click');
									$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
								});
								return false;
							}

						}else{
							$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
								if (iCol === undefined || iCol === -1){
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:first');
								}else{
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:first');
								}
								$focusableElem.trigger('focus');
								$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
							});
							jQuery($self.getInd(idsArray[rowIndex+1],true)).trigger('click');
							return false;
						}
						return true;
					}

					function editPreviousRow (rowId, iCol){
						var idsArray, rowIndex, page, $focusableElem;
						idsArray = $self.getDataIDs();
						rowIndex = $self.getInd(rowId)-1;

						if (rowIndex===0){
							// Cambio de página
							page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);

							if (page>1){
								$self.trigger('reloadGrid',[{page: page-1}]);
								$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
									idsArray = $self.getDataIDs();
									$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
										if (iCol === undefined || iCol === -1){
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:last');
										}else{
											$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:last');
										}
										$focusableElem.trigger('focus');
										$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
									});
									jQuery($self.getInd(idsArray[idsArray.length-1],true)).trigger('click');

									$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
								});
								return false;
							}

						}else{
							$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rId){
								if (iCol === undefined || iCol === -1){
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td :not([readonly]):focusable:last');
								}else{
									$focusableElem = jQuery($self.jqGrid('getInd',rId, true)).find('td:eq('+iCol+') :not([readonly]):focusable:last');
								}
								$focusableElem.trigger('focus');
								$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
							});
							jQuery($self.getInd(idsArray[rowIndex-1],true)).trigger('click');

							return false;
						}
					}


					// Se almacena el contenido del los campos de la línea editable
					// TODO: Externalizar la obtención de los datos para comprobar los cambios
					$self.data('initialFormData',settings.inlineEdit.$inlineForm.rup_form('formSerialize'));
					// Se añaden los eventos de teclado
					jQuery(ind).on({
						'keydown': function(event) {
							if (event.keyCode === 27) {
								$self.rup_jqtable('restoreRow',$(this).attr('id'), settings.afterrestorefunc);
								return false;
							}
							if (event.keyCode === 13) {
								var ta = event.target;
								if(ta.tagName == 'TEXTAREA') {
									return true;
								}
								$self.rup_jqtable('saveRow');
								return false;
							}
						}
					});

					jQuery('td', jQuery(ind)).on({
						'keydown': function(event) {
							var iCol, nameArray;

							if (event.keyCode === 38) {
								nameArray = $.map($self.rup_jqtable('getColModel'),function(elem, index){
									   return elem.name;
								});
								iCol = jQuery.inArray($(this).attr('aria-describedby').split(settings.id+'_')[1], nameArray);
								editPreviousRow($(ind).attr('id'), iCol);
								return false;
							}
							if (event.keyCode === 40) {
								nameArray = $.map($self.rup_jqtable('getColModel'),function(elem, index){
								   return elem.name;
								});
								iCol = jQuery.inArray($(this).attr('aria-describedby').split(settings.id+'_')[1], nameArray);
								editNextRow($(ind).attr('id'), iCol);
								return false;
							}
						}
					});

					jQuery('input,select', jQuery(ind)).on({
						'focus': function(event){
							//							var $row = $(this).parent().parent();
							//
							//							settings.inlineEditingRow  = $row.attr("id");
							//							$self.rup_jqtable("setSelection",$row.attr("id"));
						}
					});

					jQuery('input, textarea, select,a.rup_combo', jQuery(ind)).filter('.editable:visible:last').on({
						'keydown': function(event){
							if (event.keyCode == 9 && !event.shiftKey) {
								if (jQuery(ind).attr('id').indexOf('jqg')!==-1){
									if(addNextRow(jQuery(ind).attr('id'))===false){
										return false;
									}
								}else{
									if(editNextRow(jQuery(ind).attr('id'))===false){
										return false;
									}
								}
							}
						}
					});

					jQuery('input, textarea, select,a.rup_combo', jQuery(ind)).filter('.editable:visible:first').on({
						'keydown': function(event){
							var idsArray, rowIndex, page;
							if (event.keyCode == 9) {
								if (event.shiftKey) {

									idsArray = $self.getDataIDs();
									rowIndex = $self.getInd(rowId)-1;

									if (rowIndex===0){
										// Cambio de página
										page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);

										if (page>1){
											$self.trigger('reloadGrid',[{page: page-1}]);
											$self.on('jqGridAfterLoadComplete.rupTable.inlineEdit',function(event,data){
												idsArray = $self.getDataIDs();
												$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rowId){
													jQuery($self.jqGrid('getInd',rowId, true)).find('td :focusable:last').trigger('focus');
													$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
												});
												jQuery($self.getInd(idsArray[idsArray.length-1],true)).trigger('click');

												$self.off('jqGridAfterLoadComplete.rupTable.inlineEdit');
											});
											return false;
										}

									}else{
										$self.on('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected', function (event, rowId){
											jQuery($self.jqGrid('getInd',rowId, true)).find('td :focusable:last').trigger('focus');
											$self.off('jqGridInlineEditRow.rupTable.inlineEditing.tabKeyNav.cellSelected');
										});
										jQuery($self.getInd(idsArray[rowIndex-1],true)).trigger('click');

										return false;
									}

								}
							}
						}
					});

				},
				'jqGridDblClickRow.rupTable.inlineEdit': function (rowid, iRow, iCol, e){
					if (!settings.inlineEdit.autoEditRow){
						$self.rup_jqtable('editRow', iRow);
					}else{
						return false;
					}
				},
				'jqGridInlineAfterRestoreRow.inlineEditing.processRupObjects': function(event, rowid){
					var self = this, $self = $(this),
						json = self.p.savedRow[0];

					$self.rup_jqtable('restoreInlineRupFields', rowid, json);
				},
				'rupTable_beforeSaveRow.inlineEditing.processRupObjects': function(event, rowid, options){
					var self = this, $self = $(this), $row, $cell, ruptypeObj;

					$(self.p.colModel).each(function(i){

						$row= $(self.rows.namedItem(rowid));
						$cell = $row.find('td:eq('+i+')');
						ruptypeObj =  $cell.find('[ruptype]:not([autocomplete])');

						if (ruptypeObj.attr('ruptype')==='combo'){

							if ($self.data('rup.jqtable.formatter')!==undefined){
								$self.data('rup.jqtable.formatter')[rowid][this.name]['rup_'+ruptypeObj.attr('rupType')]= {
									'label':ruptypeObj.rup_combo('label'),
									'value':ruptypeObj.rup_combo('getRupValue')
								};
							}
						} else if (ruptypeObj.attr('ruptype')==='autocomplete' && ruptypeObj.attr('rup_autocomplete_label')){
							if ($self.data('rup.jqtable.formatter')!==undefined){
								$self.data('rup.jqtable.formatter')[rowid][this.name]['rup_'+ruptypeObj.attr('rupType')]= {
									'label':$('[id="'+ruptypeObj.attr('id')+'_label"]').val(),
									'value':ruptypeObj.rup_autocomplete('getRupValue')
								};
							}
						}
					});
				},
				'jqGridInlineSuccessSaveRow.rupTable.inlineEditing.processRupObjects': function(event, res, rowid, o){

					var json = jQuery.parseJSON(res.responseText),
						self = this, $self = $(self);

					$self.rup_jqtable('restoreInlineRupFields', rowid, json);

					return [true, json, rowid];
				},
				'jqGridBeforeSelectRow.rupTable.inlineEditing': function(event, rowid, obj){
					var $self = $(this),
						settings = $self.data('settings'),
						editableRows = $('tr[editable=1]', $self);
					/*
					 * Se comprueba si existen registros que estén siendo editados en línea.
					 * Del mismo modo se comprueba si el registro seleccionado es diferente del que se está editando en ese momento.
					 */
					if (editableRows.length > 0 && (settings.inlineEditingRow!== undefined && settings.inlineEditingRow !== rowid)){
						// Se comprueba si se han realizado cambios en el registro en edición
						// TODO: Utilizar un método para comprobar los cambios en el formulario
						if ($self.data('initialFormData') !== settings.inlineEdit.$inlineForm.rup_form('formSerialize')){
							// En caso de que se hayan realizado cambios se debera de realizar el guardado de los mismos.

							// Se confiura un handler para el evento jqGridInlineSuccessSaveRow que indica que se ha completado con exito el guardado del registro modificado.
							$self.on('jqGridInlineSuccessSaveRow.inlineEditing_beforeSelectRow', function(event){
								// Una vez se haya realizado correctamente el guardado del registo se procede a seleccionar el registro solicitado por el usuario.
								$self.rup_jqtable('setSelection',rowid);
								// Se elimina el handler del evento para evitar duplicidades
								$self.off('jqGridInlineSuccessSaveRow.inlineEditing_beforeSelectRow');
							});

							// Se procede a realizar el guardado de los registros editados
							for (var i=0; i<editableRows.length;i++){
								$self.rup_jqtable('saveRow', editableRows[0].id);
							}

							// Se retorna un false para deterner la selección del registro y permitir que se realice antes la gestión del guardado.
							return false;
						}
					}

					// En caso de no necesitarse guardar el registro en edición se continúa con la gestión de la selección de manera normal.
					return true;
				},
				'jqGridSelectRow.rupTable.inlineEditing': function (event, rowid, status, obj){
					var $self = $(this), editableRows;
					editableRows = $('tr[editable=1]', $self);

					// En caso de que existan registros en modo edición se restauran
					if (editableRows.length > 0){
						jQuery.each($('tr[editable=1]', $self), function(index, elem){
							if ($(elem).attr('id')!==rowid){
								$self.jqGrid('restoreRow', $(elem).attr('id'));
							}
						});
					}

					if (settings.inlineEdit.autoEditRow){
						// Se procede a entrar en modo edición en la línea seleccionada.
						$self.rup_jqtable('editRow', rowid);
					}
				},
				'rupTable_checkOutOfGrid.rupTable.inlineEditing': function(event, $target){
					var $self = $(this), settings = $self.data('settings'),
						operationCfg = settings.core.defaultOperations['save'];
					if (jQuery.proxy(operationCfg.enabled, $self)()){
						jQuery.proxy(operationCfg.callback,$self)($self, event);
					}
				}
			});
			if (settings.inlineEdit.autoEditRow){
				$self.on({
					'jqGridCellSelect.rupTable.inlineEditing': function (event, rowid, iCol, cellcontent, obj){
						var $self = $(this);
						if (iCol!==-1){
							$self.on(
								'jqGridInlineEditRow.rupTable.inlineEditing.cellSelected', function (event, rowId){
									jQuery($self.jqGrid('getInd',rowid, true)).find('td:eq('+iCol+') :focusable:first').trigger('focus');
									$self.off('jqGridInlineEditRow.rupTable.inlineEditing.cellSelected');
								}
							);
						}
					}
				});
			}

		},
		/**
	 * Metodo que realiza la post-configuración del plugin inlineEdit del componente RUP Table.
	 * Este método se ejecuta antes de la incialización del plugin.
	 *
	 * @name postConfigureInlineEdit
	 * @function
	 * @param {object} settings - Parámetros de configuración del componente.
	 */
		postConfigureInlineEdit:function(settings){
			var $self = this,
				formId = 'inlineForm_' + settings.id,
				$inlineForm =$('<form>').attr({'id':'inlineForm_' + settings.id});

			// Arropamos la estructura de la tabla en un formulario para poder realizar el envío de los campos
			$self.wrap($inlineForm);
			// Almacenamos la referencia al formulario.
			settings.inlineEdit.$inlineForm = $('#'+formId);

			settings.inlineEdit.$inlineForm.on('rupValidate_formValidationError.inlineEditing', function(event, obj){
				var rowid = $self.jqGrid('getGridParam','selrow');

				jQuery($self.getInd(rowid,true)).attr('id',settings.inlineEditingRow);
				$self.rup_jqtable('setSelection',settings.inlineEditingRow);
			});

			$self.on({
				'jqGridLoadComplete.rupTable.formEditing': function(data){
					var $self = $(this), settings = $self.data('settings'), nPos;

					if (settings.inlineEdit.autoselectFirstRecord){
						nPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
						$self.rup_jqtable('highlightRowAsSelected', jQuery($self.jqGrid('getInd', nPos[1][0],true)));
					}
				}
			});
		}
	});


	/**
	 * Métodos públicos del plugin inlineEdit.
	 *
	 * Los métodos implementados son:
	 *
	 * addRow(options): Muestra una nueva línea para inserción.
	 * editRow(rowId, options): Activa el modo edicón en línea para un registro determinado.
	 * deleteRow(rowId, options): Realiza el borrado de un registro.
	 * saveRow(rowId, options): Realiza el guardado de un registo modificado mediante la edición en línea.
	 * restoreRow(rowId): Restaura la línea indicada
	 *
	 * Las propiedades de esta extensión almacenadas en el settings son las siguientes:
	 *
	 * settings.$inlineForm : Referencia al formulario utilizado para enviar los datos del registro que está siendo editado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Añade una nueva línea en blanco al mantenimiento para permitir introducir los datos del nuevo registro.
     *
     * @function addRow
		 * @param {object} options - Opciones de configuración de la acción de inserción.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeAddRow
     * @example
     * $("#idTable").rup_jqtable("addRow", options);
     */
		addRow: function(options){
			var $self = this,
				settings = $self.data('settings'),
				colModel = $self[0].p.colModel;

			/*
			 * TODO: Ajustar el paso de parámetros
			 */
			var auxOptions = {addRowParams:$.extend({},settings.inlineEdit.addOptions,options)};

			// Controlar los campos editables en modo nuevo
			for (var i=0;i<colModel.length;i++){
				if (colModel[i].editable === true && colModel[i].editableOnAdd!==false){
					if (colModel[i].editable === true && colModel[i].editableOnAdd===false){
						if (colModel[i].editoptions=== undefined){
							colModel[i].editoptions={};
						}
						colModel[i].editoptions.readonly='readonly';
					}else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if ($self.triggerHandler('rupTable_beforeAddRow', [auxOptions])!==false){
				$self.jqGrid('addRow', $.extend({},auxOptions));
			}

			return $self;
		},
		/**
		 * Clona un registro determinado. Añade una nueva línea con el contenido del registro a partir del cual se desea clonar.
     *
     * @function cloneRow
		 * @param {string} rowId -  Identificador del registro a partir del cual se desea realizar el clonado.
		 * @param {object} options - Opciones de configuración de la acción de clonado.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeCloneRow
     * @example
     * $("#idTable").rup_jqtable("cloneRow", rowId, options);
     */
		cloneRow: function(rowId, options){
			var $self = this,
				settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId),
				colModel = $self[0].p.colModel,
				rowdata, clonedRowId;

			if ($self.triggerHandler('rupTable_beforeCloneRow',[settings, rowId])!==false){
				rowdata = $self.jqGrid('getRowData',selectedRow);
				$self.rup_jqtable('addRow');
				clonedRowId = jQuery('tbody:first tr[id*=\'jqg\']',$self).attr('id');
				$self.jqGrid('setRowData',clonedRowId, rowdata);
				jQuery($self.jqGrid('getInd',clonedRowId,true)).attr('editable','0');

				// Controlar los campos editables en modo nuevo
				for (var i=0;i<colModel.length;i++){
					if (colModel[i].editable === true && colModel[i].editableOnAdd!==false){
						if (colModel[i].editable === true && colModel[i].editableOnAdd===false){
							if (colModel[i].editoptions=== undefined){
								colModel[i].editoptions={};
							}
							colModel[i].editoptions.readonly='readonly';
						}else {
							if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
								delete colModel[i].editoptions.readonly;
							}
						}
					}
				}

				$self.rup_jqtable('editRow', clonedRowId, {}, true);
			}
		},
		/**
     * Pone el registro indicado en modo edición para permitir la edición de sus datos.
     *
     * @function editRow
		 * @param {string} rowId - Identificador del registro que se desea editar.
		 * @param {object} options - Opciones de configuración de la acción de modificación.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeEditRow
     * @example
     * $("#idTable").rup_jqtable("editRow", rowId, options, true);
     */
		editRow: function (rowId, options, skipFieldCheck){
			var $self = this,
				settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId),
				colModel = $self[0].p.colModel;

			if (skipFieldCheck!==true){
				// Controlar los campos editables en modo edición
				for (var i=0;i<colModel.length;i++){
					if (colModel[i].editable === true && colModel[i].editableOnEdit===false){
						if (colModel[i].editoptions=== undefined){
							colModel[i].editoptions={};
						}
						colModel[i].editoptions.readonly='readonly';
					}else {
						if (colModel[i].editoptions !== undefined && colModel[i].editoptions.readonly !== undefined){
							delete colModel[i].editoptions.readonly;
						}
					}
				}
			}

			if ($self.triggerHandler('rupTable_beforeEditRow',[settings.inlineEdit.editOptions, selectedRow])!==false){
				$self.jqGrid('editRow', selectedRow, $.extend({},settings.inlineEdit.editOptions,options));
			}

			return $self;
		},
		/**
     * Elimina el registro indicado.
     *
     * @function deleteRow
		 * @param {string} rowId - Identificador del registro que se desea eliminar.
		 * @param {object} options - Opciones de configuración de la acción de borrado..
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_deleteAfterSubmit
		 * @fires module:rup_jqtable#rupTable_deleteAfterComplete
		 * @fires module:rup_jqtable#rupTable_beforeDeleteRow
     * @example
     * $("#idTable").rup_jqtable("deleteRow", rowId, options);
     */
		deleteRow: function (rowId, options){


			var $self = this,
				settings = $self.data('settings'),
				//			deleteOptions = jQuery.extend(true, {}, jQuery.fn.rup_jqtable.defaults.deleteOptions, options),
				deleteOptions = jQuery.extend(true, {}, settings.inlineEdit.deleteOptions, options),
				selectedRow = (rowId===undefined?$self.rup_jqtable('getSelectedRows'):rowId);

			// En caso de especificarse el uso del método HTTP DELETE, se anyade el identificador como PathParameter
			if (selectedRow.length===1){
				if (deleteOptions.mtype==='DELETE'){
					deleteOptions.url = settings.baseUrl+'/'+$self.rup_jqtable('getPkUrl',selectedRow);
				}
			}else{
				deleteOptions.mtype = 'POST';
				deleteOptions.ajaxDelOptions.contentType = 'application/json';
				deleteOptions.ajaxDelOptions.type = 'POST';
				deleteOptions.ajaxDelOptions.dataType = 'json';
				deleteOptions.url = settings.baseUrl+'/deleteAll';
				deleteOptions.serializeDelData = function(ts,postData){
					//					$self.rup_jqtable("getFilterParams")
					return jQuery.toJSON({
						'core':{
							'pkToken':settings.multiplePkToken,
							'pkNames':settings.primaryKey
						},
						'multiselection':$self.rup_jqtable('getSelectedIds')
					});
				};
			}

			deleteOptions.afterSubmit = function(data, postd){
				$self.triggerHandler('rupTable_deleteAfterSubmit', [data, postd]);
				return [true];
			};

			deleteOptions.afterComplete = function(data, postd){
				$self.triggerHandler('rupTable_deleteAfterComplete', [data, postd]);
			};

			if ($self.triggerHandler('rupTable_beforeDeleteRow',[deleteOptions, selectedRow])!==false){
				$self.jqGrid('delGridRow',selectedRow, deleteOptions);
			}

			return $self;
		},
		/**
     *  Guarda el registro modificado. Se almacenan los datos introducidos en la línea en modo edición.
     *
     * @function saveRow
		 * @param {string} rowId - Identificador del registro que se desea guardar.
		 * @param {object} options - Opciones de configuración de la acción de guardado..
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeSaveRow
     * @example
     * $("#idTable").rup_jqtable("saveRow", rowId, options);
     */
		saveRow : function(rowId, options){
			var $self = this, settings = $self.data('settings'),
				selectedRow = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);

			$self.triggerHandler('rupTable_beforeSaveRow', [selectedRow, options]);
			if(selectedRow.indexOf('jqg')!==-1){
				$self[0].p.ajaxRowOptions = settings.inlineEdit.addOptions.ajaxRowOptions;
				$self.jqGrid('saveRow', selectedRow, settings.inlineEdit.addOptions);
			}else{
				$self[0].p.ajaxRowOptions = settings.inlineEdit.editOptions.ajaxRowOptions;
				$self.jqGrid('saveRow', selectedRow, settings.inlineEdit.editOptions);
			}

			return $self;
		},
		/**
     * Restaura la fila indicada al estado anterior a habilitarse el modo edición.
     *
     * @function restoreRow
		 * @param {string} rowId - Identificador de la línea que se desea guardar.
		 * @param {function} afterrestorefunc - Función de callback que se ejecuta después de restaurar la fila.
		 * @return {object} - Referencia jQuery a la propia tabla.
		 * @fires module:rup_jqtable#rupTable_beforeRestoreRow
     * @example
     * $("#idTable").rup_jqtable("restoreRow", rowId, function(){});
     */
		restoreRow: function(rowId, afterrestorefunc){
			var $self = this,
				rowToRestore = (rowId===undefined?$self.jqGrid('getGridParam','selrow'):rowId);

			$self.triggerHandler('rupTable_beforeRestoreRow', [rowId]);
			$self.jqGrid('restoreRow', rowToRestore, afterrestorefunc);

			return $self;
		},
		/**
     * Restaura los campos RUP existentes en una fila de edición en línea.
     *
     * @function restoreRow
		 * @param {string} rowId - Identificador de la línea que se desea guardar.
		 * @return {object} - Referencia jQuery a la propia tabla.
     * @example
     * $("#idTable").rup_jqtable("restoreRow", rowId, options);
     */
		restoreInlineRupFields: function (rowid){
			var $self = this, self = this[0], $row, $cell, val;


			$(self.p.colModel).each(function(i){

				$row= $(self.rows.namedItem(rowid));
				let $tempRowId = $self.data('settings').inlineEditingRow;
				$cell = $row.find('td:eq('+i+')');
				//ruptypeObj = $cell.find("[ruptype]");
				//				ruptypeObj = this.editoptions.ruptype;
				if ( this.rupType){
					if (this.rupType==='combo'){
						if ($self.data('rup.jqtable.formatter')!==undefined){
							val =  $self.data('rup.jqtable.formatter')[$tempRowId][this.name]['rup_'+this.rupType]['label'];
							$cell.html(val);
						}
					} else if (this.rupType==='autocomplete'){
						if ($self.data('rup.jqtable.formatter')!==undefined){
							val =  $self.data('rup.jqtable.formatter')[$tempRowId][this.name]['rup_'+this.rupType]['label'];
							$cell.html(val);
						}
					}
				}
			});

			return $self;
		}
	});





	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	/**
	 * Parametros de configuración de los settings para el caso particular de configuración del componente en el caso de funcionar en modo edición en linea.
	 *
	 * Los métodos para los que se proporciona una implementación son los siguientes.
	 *
	 * beforeSelectRow:
	 * onCellSelect:
	 * onSelectRow:
	 */

	/**
	* @description Propiedades de configuración del plugin inlineEdit del componente RUP Table.
	* @see Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.
	* @name options
	*
	* @property {object} [addEditOptions] - Propiedades de configuración comunes a las acciones de edición e inserciónde un registro.
	* @property {object} [addOptions] - Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [editOptions] - Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions.
	* @property {object} [deleteOptions] - Propiedades de configuración de la acción de borrado de un registro.
	*/

	jQuery.fn.rup_jqtable.plugins.inlineEdit = {};
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults = {
		toolbar:{
			defaultButtons:{
				add : true,
				edit : true,
				cancel : true,
				save : true,
				clone : true,
				'delete' : true,
				filter : false
			}
		},
		contextMenu:{
			defaultRowOperations:{
				add : true,
				edit : true,
				cancel : true,
				save : true,
				clone : true,
				'delete' : true,
				filter : false
			}
		},
		inlineEdit:{
			autoselectFirstRecord: true,
			autoEditRow:false
		},
		formEdit:{
		}
	};

	// Parámetros de configruación comunes para las acciónes de añadir y editar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.addEditOptions = {
		contentType: 'application/json',
		type:'PUT',
		dataType: 'json',
		ajaxRowOptions:{
			contentType: 'application/json',
			dataType: 'json',
			processData:false
		}
	};

	// Parámetros de configruación específicos para la acción de añadir un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.addOptions = {
		mtype: 'POST',
		ajaxRowOptions:{
			type:'POST'
		}
	};

	// Parámetros de configruación específicos para la acción de editar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.editOptions = {
		mtype: 'PUT',
		ajaxRowOptions:{
			type:'PUT'
		}
	};

	// Parámetros de configruación específicos para la acción de eliminar un registro
	jQuery.fn.rup_jqtable.plugins.inlineEdit.defaults.inlineEdit.deleteOptions = {
		bSubmit: jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_message.aceptar'),
		cancelicon:[false, 'left', 'icono_cancelar'],
		delicon:[false],
		linkStyleButtons: ['#eData'],
		msg: '<div id="rup_msgDIV_msg_icon" class="rup-message_icon-confirm"></div><div id="rup_msgDIV_msg" class="rup-message_msg-confirm white-space-normal">'+jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.deleteAll')+'</div>',
		mtype:'DELETE',
		width: 320,
		reloadAfterSubmit:false,
		resize:false
	};

	/**
	 * Extensión de las propiedades por defecto del jqGrid para el modo de edición en línea
	 */
	jQuery.jgrid.inlineEdit = {
		keys:false
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
	*  Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeDeleteRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} deleteOptions - Opciones de configuración de la operación de borrado.
	* @property {string} selectedRow - Identificador de la fila que se desea eliminar.
	* @example
	* $("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.
	*
	* @event module:rup_jqtable#rupTable_beforeEditRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} editOptions - Opciones de configuración de la operación de edición.
	* @property {string} selectedRow - Identificador de la fila que se desea editar.
	* @example
	* $("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
	*/

	/**
	*  Evento que se lanza justo después de realizarse la petición de borrado de un registro.
	*
	* @event module:rup_jqtable#rupTable_deleteAfterSubmit
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @example
	* $("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.
	*
	* @event module:rup_jqtable#rupTable_beforeAddRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} addOptions -  Opciones de configuración de la acción de insertar un elemento.
	* @example
	* $("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
	*/

	/**
	*  Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.
	*
	* @event module:rup_jqtable#rupTable_beforeCloneRow
	* @property {Event} event - Objeto Event correspondiente al evento disparado.
	* @property {object} cloneOptions - Opciones de configuración de la operación de clonado.
	* @property {string} selectedRow - Identificador de la fila que se desea clonar.
	* @example
	* $("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
	*/
	

})(jQuery);
