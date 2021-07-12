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
 * Gestiona las operaciones de filtrado múltiple de datos sobre el origen de datos que utiliza el componente.
 *
 * @summary Plugin de filtrado múltiple del componente RUP Table.
 * @module rup_jqtable/multifilter
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["multifilter"],
 * 	filter:{
 * 		// Propiedades de configuración del plugin multifilter
 * 	}
 * });
 */
(function($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización
	 * del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del
	 * componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('multifilter', {
		loadOrder : 15,
		preConfiguration : function(settings) {
			var $self = this;
			return $self.rup_jqtable('preConfigureMultifilter', settings);
		},
		postConfiguration : function(settings) {
			var $self = this;
			return $self.rup_jqtable('postConfigureMultifilter', settings);
		}

	});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del filtrado
	 * de registros de la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración
	 * necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.filter.$filterContainer : Contenedor del formulario de filtrado
	 * settings.filter.$filterButton : Botón que realiza el filtrado
	 * settings.filter.$cleanButton : Enlace para limpiar el formulario
	 * settings.filter.$collapsableLayer : Capa que puede ser ocultada/mostrada
	 * settings.filter.$toggleIcon1Id : Control que oculta muestra el fomulario
	 * settings.filter.$filterSummary : Contenedor donde se especifican los
	 * criterios de filtrado
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
			* Metodo que realiza la pre-configuración del plugin de filtrado múltiple del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name preConfigureMultifilter
			* @function
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		preConfigureMultifilter : function(settings) {
			var $self = this, tableId = settings.id, multifilterSettings = settings.multifilter, dropdownDialogId, $dropdownDialog, $dropdownDiaglogTemplate;

			//definicion de variables con los selectores
			multifilterSettings.$dropdownDialog=$('#'+settings.id+'_multifilter_dropdownDialog');

			//definicion de variables con ids
			multifilterSettings.dropdownDialogId = settings.id+'_multifilter_dropdownDialog';



			$dropdownDiaglogTemplate = $self.rup_jqtable('getMultifilterDialogTemplate', settings);

			settings.filter.$filterContainer
				.after($dropdownDiaglogTemplate);

			$self.rup_jqtable('configureMultifilter', settings);

			// configuracion del resumen del filtro para que
			// apareza el nombre del filtro
			settings.multifilter.fncFilterName = function(searchString) {



				if (multifilterSettings.$comboLabel==undefined){ //&& settings.$firstStartUp  && multifilterSettings.$filterDefaultName!=undefined){
					if (multifilterSettings.$filterDefaultName!==undefined)
						searchString = multifilterSettings.$filterDefaultName+ '  {' + searchString + '}   ';

				}
				else if (multifilterSettings.$comboLabel!=undefined && settings.$firstStartUp){
					if(multifilterSettings.$comboLabel.val()==''  && multifilterSettings.$filterDefaultName!=undefined){
						if (multifilterSettings.$filterDefaultName!==undefined)
							searchString = multifilterSettings.$filterDefaultName+ '  {' + searchString + '}   ';
					}
				}else if (multifilterSettings.$comboLabel.val()!='' &&  multifilterSettings.$filterWithName){
									 multifilterSettings.$filterWithName=false;
					searchString = multifilterSettings.$comboLabel.val()+ '  {' + searchString + '}   ';

				}
				return searchString;
			};




		},



		/**
			* Metodo que realiza la post-configuración del plugin de filtrado múltiple del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name postConfigureMultifilter
			* @function
			* @fires module:rup_jqtable#rupTable_multifilter_fillForm
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		postConfigureMultifilter : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter, filterSettings,$dropdownButton, $combo,$comboLabel
				,$defaultCheck,$feedback,$comboButton,$closeDialog, dropdownButtonConfig, xhrArray=[];


			/*
							 * $("#"+settings.id+"_multifilter_combo_label").on("change",
							 * function(){
							 *
							 * if
							 * ($("#"+settings.id+"_multifilter_combo_label").val()==""){
							 * $self._toggleButtons(settings.id,false); }else{
							 * $self._toggleButtons(settings.id,true); } });
							 */

							 dropdownButtonConfig =  $self[0]._ADAPTER.multifilter.dropdown;

			settings.filter.$filterButton
				.rup_button({
					dropdown : {
						dropdownIcon : dropdownButtonConfig.dropdownIcon,
						dropdownDialog : multifilterSettings.dropdownDialogId,
						dropdownDialogConfig : {
							title : dropdownButtonConfig.dropdownDialogConfig.title + $.rup.i18n.base.rup_jqtable.plugins.multifilter.tittle,
							width : '450px',
							buttons : [
								{
									id : settings.id+ '_multifilter_BtnSave',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.save,
									click : function() {

										if ($self._checkLabel(settings)) {

											// creo objeto Filter con los datos del formulario del filtro
											var filter = $self._createFilterFromForm(settings);

											var bfr = $self.triggerHandler('rupTable_beforeAdd');
											if (bfr === false || bfr === 'stop') {
												multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.errorValidate,'error');
												return; }


											// añado el filtro
											$self.rup_jqtable('addFilter',filter);


										}

									}

								},
								{
									id : settings.id+ '_multifilter_BtnApply',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.apply,
									click : function() {

										//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
										if (settings.$firstStartUp){

											settings.$firstStartUp=false;
										}

										if ($self._checkLabel(settings)) {
											multifilterSettings.$filterWithName=true;





											var valorFiltro= $self._searchFilterInCombo(settings);
											if (valorFiltro!=undefined){
												//limpiamos el filtro
												$self.rup_jqtable('cleanFilterForm');

												//Cargamos de nuevo el filtro en el formulario del filtro
												// rellenar el formulario del filtro
												$self.triggerHandler('rupTable_multifilter_fillForm',valorFiltro);
												$self._fillForm(valorFiltro);
												$self.rup_jqtable('filter');
												multifilterSettings.$closeDialog.click();
											}



											else{
												multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.errorNoexiste,'error');

											}


											//






											//$self.rup_jqtable("filter");
											// crea el tooptip del resumen del filtro
											//var filterCriteria = $self._createTooltip();



										}

									}
								},
								{
									id : settings.id+ '_multifilter_BtnRemove',
									"class" : 'btn-outline-primary',
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.remove,
									click : function() {


										if ($self._checkLabel(settings)) {

											// creo objeto Filter con los datos del formulario del filtro
											var filter = $self._createFilterFromForm(settings);

											// borro el filtro
											$self.rup_jqtable('deleteFilter',filter);
										}
									}
								},
								{
									text : $.rup.i18n.base.rup_jqtable.plugins.multifilter.cancel,
									click : function() {

										var filtroAnterior= $self.data('filtroAnterior');
										if (filtroAnterior!=null){
											//var xhrArray=$.rup_utils.jsontoarray(filtroAnterior);
											$self.rup_jqtable('cleanFilterForm');
											//$.rup_utils.populateForm(filtroAnterior,settings.filter.$filterForm);
											$self.triggerHandler('rupTable_multifilter_fillForm',filtroAnterior);
											$self._fillForm(filtroAnterior);

										}
										//limpio el filtro del dropdownDIalog
										multifilterSettings.$comboLabel.val('');
										multifilterSettings.$closeDialog.click();
									},
									btnType : $.rup.dialog.LINK
								} ]
						}
					}

				});


			//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
			$self.on('rupTable_beforeFilter', function(event){
				/*if (settings.$firstStartUp){

									settings.$firstStartUp=false;
								}*/

			});



			//definincion de variables con los selectores
			multifilterSettings.$dropdownButton=$('#'+settings.id+'_filter_filterButton_dropdown');
			multifilterSettings.$combo=$('#' + settings.id	+ '_multifilter_combo');
			multifilterSettings.$comboLabel=$('#' + settings.id	+ '_multifilter_combo_label');
			multifilterSettings.$comboButton=$('#' + settings.id+'_multifilter_dropdownDialog .rup-combobox-toggle');
			multifilterSettings.$defaultCheck=$('#' + settings.id	+  '_multifilter_defaultFilter');
			multifilterSettings.$feedback=$('#' + settings.id	+ '_multifilter_dropdownDialog_feedback');
			multifilterSettings.$closeDialog=$('#closeText_'+settings.id+'_multifilter_dropdownDialog');




			// dialog modal para no cambiar el filtro mientras
			// se gestionan los mismos
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'modal', true);
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'draggable', false);
			$('#' + multifilterSettings.dropdownDialogId).rup_dialog('setOption', 'resizable', false);


			// $('#'+multifilterSettings.dropdownDialogId).parent().addClass("rup_multifilter_container");
			$('#' + multifilterSettings.dropdownDialogId).parent().css('width', '500px');

			multifilterSettings.$dropdownButton.on('click', function(){
				//guardo el filtroAnterior
				var valorFiltro= form2object(settings.filter.$filterContainer[0]);
				xhrArray=$.rup_utils.jsontoarray(valorFiltro);
				$self.data('filtroAnterior',valorFiltro);


				//Foco al label al entrar al dialog
				multifilterSettings.$comboLabel.focus();


			});

			$self._configCombo(settings);

			multifilterSettings.$feedback.rup_feedback({
				block : false
			});

			//gesión por filtroPorDefecto

			//$self.rup_jqtable("showSearchCriteria");

			//if(filtroDefault!=null)
			//$("#"+settings.id+"_filter_summary").prepend(filtroDefault.filterName +" "+ $("#"+settings.id+"_filter_summary").val() );

			//bug IE que al cerrar el dialog con el combo desplegado , la lista del combo sigue abierta
			$('.rup-dropdown-dialog').on('dialogclose',function (){
				multifilterSettings.$comboLabel.autocomplete('widget').hide();
			});

			//la primera vez que cancelas el filtroAnterior es el filtroPorDefecto
			var valorFiltro=form2object(settings.filter.$filterContainer[0]);
			xhrArray=$.rup_utils.jsontoarray(valorFiltro);

			$self.data('filtroAnterior',valorFiltro);

			//$self.rup_jqtable("filter");

			//settings.filter.$filterButton.trigger("click");
			//$self.triggerHandler("rupTable_multifilter_fillForm",form2object(settings.filter.$filterContainer[0]));

			$self.on({
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

			});

		}
	});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Métodos públicos del plugin filter.
	 *
	 * cleanFilterForm: Realiza una limpieza de los campos del formulario.
	 * filter: Lanza el filtrado de la tabla de acuerdo a los criterios
	 * indicados en el formulario. toggleFilterForm: Método encargado de ocultar
	 * y mostrar el formulario de filtrado.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.
     *
     * @function  getMultifilterDialogTemplate
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {object} - Objeto jQuery con el contenido html de la template.
     * @example
     * $("#idComponente").rup_jqtable("getMultifilterDialogTemplate", settings);
     */
		getMultifilterDialogTemplate : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter;

			var $dropdownDiaglogTemplate = jQuery('<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '" style="display:none" class="rup_multifilter_dropdown">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_feedback"></div>'
				+ '<form>'
				+ '<fieldset class="dropdownButton-inputs">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_columna_cnt">'
				+ '<div class="form-row">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_lineaCombo"  class="form-group fix-align col-sm">'
				+ '<label for="'
				+ settings.id
				+ '_multifilter_combo" class="formulario_linea_label">'
				+ $.rup.i18n.base.rup_jqtable.plugins.multifilter.filters
				+ '</label>'
				+ '<input id="'
				+ settings.id
				+ '_multifilter_combo" class="rup_multifilter_selector" />'
				+ '</div>'
				+ '</div>'
				+ '<div class="form-row">'
				+ '<div id="'
				+ multifilterSettings.dropdownDialogId
				+ '_lineaDefault" class="form-group col-sm">'
				+ '<label for="'
				+ settings.id
				+ '_multifilter_defaultFilter" class="formulario_linea_label">'
				+ $.rup.i18n.base.rup_jqtable.plugins.multifilter.defaultFilter
				+ '</label>'
				+ '<input type="checkbox" id="'
				+ settings.id
				+ '_multifilter_defaultFilter" class="formulario_linea_input form-control"/>'
				+ '</div>' 
				+ '</div>'	
				+ '</div>'
				+ '</fieldset>' + '</form>' + '</div>');

			return $dropdownDiaglogTemplate;
		},
		/**
     * Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.
     *
     * @function  configureMultifilter
		 * @param {object} settings - Propiedades de configuración del componente.
     * @example
     * $("#idComponente").rup_jqtable("configureMultifilter", settings);
     */
		configureMultifilter : function(settings) {
			var $self = this, multifilterSettings = settings.multifilter,$filterForm ;
			$self.data('settings', settings);



			settings.filter.$filterForm = $('#' + settings.id + '_filter_form');

			var options_ejie_combo = {
				source : [ {
					label : 'Si',
					value : '0'
				}, {
					label : 'No',
					value : '1'
				} ],
				width : 120,
				blank : ''
			};

			// jQuery("#"+settings.id+"_multifilter_combo").rup_combo(options_ejie_combo);

			var selector;
			if (multifilterSettings.idFilter != null) {
				selector = multifilterSettings.idFilter;
			} else {
				selector = settings.id;
			}

			var usuario;
			if (multifilterSettings.userFilter!=null){
				usuario=multifilterSettings.userFilter;
			}else{
				usuario=LOGGED_USER;
			}

			var getDefault;
			if (multifilterSettings.getDefault!=null){
				getDefault = multifilterSettings.getDefault;
			}else{
				getDefault = true;
			}



			jQuery('#' + settings.id + '_multifilter_combo').rup_autocomplete(
				{
					source : settings.baseUrl
														+ '/multiFilter/getAll?filterSelector='
														+ selector + '&user='
														+ usuario,
					sourceParam : {
						label : 'filterName',
						value : 'filterDefault',
						data : 'filterValue',
						category: 'filter'
					},
					method : 'GET',
					contains : false,
					combobox : true,
					menuAppendTo : $('#' + multifilterSettings.dropdownDialogId).parent(),
					appendTo : $('#' + multifilterSettings.dropdownDialogId).parent(),

					select : function() {



						var valorFiltro=$self._searchFilterInCombo(settings);

						//limpiar Filtro
						//$self.rup_jqtable("resetForm",settings.filter.$filterForm);
						$self.rup_jqtable('cleanFilterForm');


						// rellenar el formulario del filtro
						//$.rup_utils.populateForm(xhrArray,settings.filter.$filterForm);
						$self.triggerHandler('rupTable_multifilter_fillForm',valorFiltro);
						$self._fillForm(valorFiltro);

						//



					}
				});

			jQuery('#' + settings.id + '_multifilter_combo_label').on('autocompleteopen', function(){
				$(this).data('uiAutocomplete').menu.element.css('zIndex',Number($('#' + multifilterSettings.dropdownDialogId).parent().css('zIndex'))+1);
				if($(this).data('tmp.data') !== undefined){
					var data = $(this).data('tmp.data');
					var count = -1;
					var objeto = $.grep(data, function(obj,i) {
						if (obj.filterDefault){
							count = i;
							return obj;
						}
					});
					if(objeto !== undefined){
						
						var link = $('#'+settings.id+'_multifilter_combo_menu a:eq('+count+')');
						link.css('font-weight', 'bold');
					}
				}
			});

			$('.jstree').on('rup_filter_treeLoaded',function(event,data){
				$(this).rup_tree('setRupValue',data);
				//$self.rup_jqtable("showSearchCriteria");
			});


			settings.filter.$cleanButton.on('click',function() {
				multifilterSettings.$combo.rup_autocomplete('set', '', '');
				settings.filter.$filterSummary.html('<i></i>');

			});
		},
		/**
     * Función que añade un filtro al multifiltro
     *
     * @function  addFilter
		 * @param {object} filter - Objeto json con la información del filtro a añadir.
		 * @fires module:rup_jqtable#rupTable_multifilter_beforeAdd
     * @example
     * $("#idComponente").rup_jqtable("addFilter", filter);
     */
		addFilter : function(filter) {
			var $self=this;
			var settings = $self.data('settings');

			var multifilterSettings= settings.multifilter;


			// self.data("settings");
			if (multifilterSettings.idFilter != null) {
				filter.filtro.filterSelector = multifilterSettings.idFilter;
			}

			// add Filter
			$.rup_ajax({
				url : settings.baseUrl+ '/multiFilter/add',
				type : 'POST',
				data : $.toJSON(filter),
				dataType : 'json',
				showLoading : false,
				contentType : 'application/json',
				async : false,
				beforeSend : function(xhr, options) {
					return $self.triggerHandler('rupTable_multifilter_beforeAdd',[xhr, options]);
				},
				success : function(data, status, xhr) {

					multifilterSettings.$savedFilterName=data.filterName;
					multifilterSettings.$savedFilterValue=data.filterValue;

					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.ok,'ok');

					//multifilterSettings.$combo.rup_autocomplete("set","", "");
					multifilterSettings.$comboLabel.data('tmp.loadObjects.term',null);
					multifilterSettings.$comboLabel.data('loadObjects', {});
					// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);

					multifilterSettings.$comboLabel.data('tmp.data', {});

					if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
						multifilterSettings.$comboLabel.autocomplete('widget').hide();
					}

				},
				error : function(xhr, ajaxOptions,thrownError) {
					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.error,'error');

				}
			});

		},

		/**
		 * Función que elimina un filtro del multifiltro.
		 *
		 * @function  deleteFilter
		 * @param {object} filter - Objeto json con la información del filtro a eliminar.
		 * @example
		 * $("#idComponente").rup_jqtable("deleteFilter", filter);
		 */
		deleteFilter : function(filter) {

			var $self=this;
			var settings = $self.data('settings');




			var multifilterSettings = settings.multifilter;

			//reiniciar filter salvado
			multifilterSettings.$savedFilterName =undefined;
			multifilterSettings.$savedFilterValue =undefined;

			if (multifilterSettings.idFilter != null) {
				filter.filtro.filterSelector = multifilterSettings.idFilter;
			}

			// delete
			$.rup_ajax({
				url : settings.baseUrl+ '/multiFilter/delete',
				type : 'POST',
				data : $.toJSON(filter),
				dataType : 'json',
				showLoading : false,
				contentType : 'application/json',
				async : false,
				success : function(data, status, xhr) {
					multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.ok,'ok');
					multifilterSettings.$combo.rup_autocomplete('set','', '');
					multifilterSettings.$comboLabel.data('tmp.loadObjects.term',null);
					multifilterSettings.$comboLabel.data('loadObjects', {});
					// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);
					multifilterSettings.$comboLabel.data('tmp.data', {});

					if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
						multifilterSettings.$comboLabel.autocomplete('widget').hide();
					}

					if (data.filterFeedback == 'no_records') {
						multifilterSettings.$feedback.rup_feedback('set',	$.rup.i18n.base.rup_jqtable.plugins.multifilter.noRecords,'error');

					}

				},
				error : function(xhr, ajaxOptions,	thrownError) {
					multifilterSettings.$feedback.rup_feedback(	'set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.error,'error');

				}
			});
		}
	});

	// *******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	// *******************************

	jQuery.fn.rup_jqtable('extend',{

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
		_createFilterFromForm : function(settings) {
			var multifilterSettings= settings.multifilter;
			var dataForm = form2object(settings.filter.$filterContainer[0]);




			//cambiar la fecha a milisegundos para guardar en bd
			var fecha ;
			$.each($('[ruptype=\'date\']', settings.filter.$filterContainer), function(index,item){
				fecha = $(item).datepicker('getDate');
				if (fecha!=null)
					dataForm[item.name]=fecha.getTime().toString();
			});



			var dataFormJson = $.toJSON(dataForm);

			var usuario;
			if (multifilterSettings.userFilter!=null){
				usuario=multifilterSettings.userFilter;
			}else{
				usuario=LOGGED_USER;
			}



			var filter = {

				filtro : {
					filterSelector : settings.id,
					filterName :multifilterSettings.$comboLabel.val(),
					filterValue : dataFormJson,
					filterDefault : multifilterSettings.$defaultCheck.is(':checked'),
					filterUser : usuario
				}
			};

			return filter;
		},

		/**
     * Inicializa el combo de selección de filtrado a aplicar en el fomulario.
     *
     * @function _configCombo
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
     * @example
     * $self._configCombo(settings);
     */
		_configCombo: function (settings){
			var multifilterSettings= settings.multifilter;

			multifilterSettings.$comboLabel.on('change',function() {
				settings.filter.$filterSummary.html('<i></i>');

			});



			// si el filtro es el predefinido que aparezca en negrita
			multifilterSettings.$comboLabel.data('uiAutocomplete')._renderItem = function(ul,	item) {

					return $('<li></li>').data(
						'item.autocomplete', item).append(
						'<a>' + item.label + '</a>')
						.appendTo(ul);

			};
			
			jQuery('#' + settings.id + '_multifilter_combo_label').on('rupAutocomplete_loadComplete', function(event, data){
				var count = -1;
				var objeto = $.grep(data, function(obj,i) {
					if (obj.filterDefault){
						count = i;
						return obj;
					}
				});
				if(objeto !== undefined){
					var link = $('#'+settings.id+'_multifilter_combo_menu a:eq('+count+')');
					link.css('font-weight', 'bold');
				}
				
			});



			multifilterSettings.$comboLabel.off('blur click');

			multifilterSettings.$comboLabel.attr('placeholder',$.rup.i18n.base.rup_jqtable.plugins.multifilter.input);

			multifilterSettings.$comboLabel.on('blur',function(event) {

				// Obtener datos de si viene de
				// seleccionar elemento o si el
				// menú de selección está
				// desplegado
				var selected =
													multifilterSettings.$combo.data('selected'), isShowingMenu = $('.ui-autocomplete:visible').length > 0 ? true
						: false;
				// Borrar índicador de que viene
				// de seleccionar elemento
				multifilterSettings.$combo.data('selected', false);
				// Si es un evento de teclado
				// pero no es ENTER, omitir esta
				// función
				if (event.type === 'keydown'
														&& event.keyCode !== 13) {
					return true;
				}

				if (isShowingMenu === true
														&& event.type === 'keydown') {
					multifilterSettings.$combo
						.focus();
					event.stopPropagation();
					return true;
				}

				var autoCompObject = $(event.currentTarget), loadObjects =
														multifilterSettings.$comboLabel.data('loadObjects');

				if (settings.getText == true) {
					if (loadObjects[autoCompObject.val()] !== undefined) {
						multifilterSettings.$combo.val(autoCompObject.val());
						multifilterSettings.$combo.attr('rup_autocomplete_label',autoCompObject.val());
					} else {
						multifilterSettings.$combo.val(autoCompObject.val());
						multifilterSettings.$combo.attr('rup_autocomplete_label',autoCompObject.val());
					}
				} else {
					if (loadObjects[autoCompObject.val()] !== undefined) {
						multifilterSettings.$combo.val(loadObjects[autoCompObject.val()]);
						multifilterSettings.$combo.attr('rup_autocomplete_label',loadObjects[autoCompObject.val()]);

					} else {

						autoCompObject.autocomplete('close');
					}
				}
				// Si el evento es ENTER y viene
				// de seleccionar un elemento o
				// el menú se estaba mostrando,
				// omitir resto de funciones
				// (ej. buscar)
				if (event.type === 'keydown'
														&& event.keyCode === 13
														&& (selected || isShowingMenu)) {
					return false;
				}

			});

			multifilterSettings.$comboButton.off('click mousedown');

			multifilterSettings.$comboButton.on('blur',function() {
				if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
					multifilterSettings.$comboLabel.autocomplete('widget').hide();
				}
			});

			multifilterSettings.$comboButton.on('click',function() {
				if (multifilterSettings.$comboLabel.autocomplete('widget').is(':visible')) {
					multifilterSettings.$comboLabel.autocomplete('widget').hide();
				} else {
					multifilterSettings.$comboLabel.autocomplete('search','');
					multifilterSettings.$comboLabel.autocomplete('widget').show();
					multifilterSettings.$comboLabel.autocomplete('widget').trigger('focus');
				}
			});

		},
		//						_toggleButtons : function(id, visibles) {
		//
		//							if (visibles == false) {
		//								$("#" + id + "_multifilter_BtnSave").button(
		//										"disable");
		//								$("#" + id + "_multifilter_BtnApply").button(
		//										"disable");
		//								$("#" + id + "_multifilter_BtnRemove").button(
		//										"disable");
		//
		//							} else {
		//								$("#" + id + "_multifilter_BtnSave").button(
		//										"enable");
		//								$("#" + id + "_multifilter_BtnApply").button(
		//										"enable");
		//								$("#" + id + "_multifilter_BtnRemove").button(
		//										"enable");
		//							}
		//						},

		/**
     * Valida el label que se introduce asociado al filtrado que se va a añadir.
     *
     * @function _checkLabel
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {boolean} - Devuelve si es válido o no el nombre introducido para el filtro.
     * @example
     * $self._configCombo(settings);
     */
		_checkLabel : function(settings) {

			var multifilterSettings= settings.multifilter;

			if ($.trim(multifilterSettings.$comboLabel.val()) == '') {

				multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.emptyName,'error');
				return false;
			} else if (multifilterSettings.$comboLabel.val().length > settings.multifilter.labelSize) {
				multifilterSettings.$feedback.rup_feedback('set',$.rup.i18n.base.rup_jqtable.plugins.multifilter.tooLong,	'error');

				return false;
			}
			return true;

		},
		/**
     * Devuelve el json de filtrado asociado al filtro seleccionado en el combo.
     *
     * @function _searchFilterInCombo
		 * @private
		 * @param {object} settings - Propiedades de configuración del componente.
		 * @return {object} - Json de filtrado asociado al filtro seleccionado en el combo.
     * @example
     * $self._searchFilterInCombo(settings);
     */
		_searchFilterInCombo : function(settings) {
			var multifilterSettings = settings.multifilter, xhrArray=[];

			var name = $('#' + settings.id	+ '_multifilter_combo_label').val();
			// var listaFiltros = $("#" + this.id+
			// "_label").data("tmp.data");
			var listaFiltros = $('#' + settings.id+ '_multifilter_combo_label').data('tmp.data');
			// Busco el valor del filtro
			var objFiltro = $.grep(listaFiltros, function(obj,i) {
				if (obj.label == name)
					return obj;
			});

			// si es filtro por defecto,
			// checkeo el check "Filtro
			// por defecto"
			if (objFiltro.length != 0) {
				multifilterSettings.$defaultCheck.attr('checked', objFiltro[0].filterDefault);

				var valorFiltro = $.parseJSON(objFiltro[0].value);

				// $.map(valorFiltro,function(item) {
				// xhrArray[item.name] = item.value;
				// });
				xhrArray = $.rup_utils.jsontoarray(valorFiltro);
			}

			if (valorFiltro==undefined &&  multifilterSettings.$savedFilterName!=undefined){
				if (multifilterSettings.$savedFilterName===name)
					var valorFiltro = $.parseJSON(multifilterSettings.$savedFilterValue);

			}
			return valorFiltro;


		},
		/**
		 * Inicializa los campos del formulario con los valores correspondientes al filtro seleccionado.
		 *
		 * @function _fillForm
		 * @private
		 * @param {object} filtroNuevo - Objeto json con los valores de filtrado.
		 * @example
		 * $self._fillForm(data);
		 */
		_fillForm : function(filtroNuevo) {

			var $self = this;
			var settings= $self.data('settings');

			//cambiar milisengudos a fecha (el formato de bd del  fecha es milisegundos)
			$('[ruptype=\'date\']', settings.filter.$filterContainer).each(function(index, elem){

								  var $campo = jQuery(elem);

				var fechaString;

				var jsonFecha = filtroNuevo[elem.name];
				if (jsonFecha!=undefined){
					if( jsonFecha.search('/')==-1){
						var dateFromJson = new Date(parseInt(jsonFecha));

						var dateFormat = $campo.data('datepicker').settings.dateFormat;

						if ($campo.data('datepicker').settings.datetimepicker){
									                // Cuando es fecha-hora
									                var dateObj={hour:dateFromJson.getHours(),minute:dateFromJson.getMinutes(),second:dateFromJson.getSeconds()};
									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson)+' '+$.timepicker._formatTime(dateObj, 'hh:mm:ss');
						}else{
									                // Solo fecha

									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson);
						}

						filtroNuevo[elem.name]=fechaString;
					}
				}
			});

			// Formatear datos
			// var valorFiltro = $.parseJSON(filtroNuevo);
			var xhrArray = $.rup_utils.jsontoarray(filtroNuevo);

			// evento antes de rellenar el form
			// $self.triggerHandler("rupTable_multifilter_fillForm",filtroNuevo);

			// rellenar el formulario
			$.rup_utils.populateForm(xhrArray, $(this.selector+ '_filter_form'));
			// $self._fillForm(filtroNuevo);
			// $self.rup_jqtable("filter");

		}




	});

	// *******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	// *******************************************************

	/**
	 * Parámetros de configuración por defecto para el plugin filter.
	 *
	 */
	/**
	* @description Propiedades de configuración del plugin multifilter del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [idFilter] - Permite asignar un identificador al filtro. Debe ser único para toda la aplicación. En caso de no asignar un id, se asigna el selector del rup_jqtable.
	* @property {string} labelSize - Permite especificar el tamaño máximo permitido para el nombre del filtro. Es una propiedad obligatoria.
	* @property {string} [userFilter] - En caso de que la aplicación donde se tiene que implementar el multifiltro no implemente la variable LOGGED_USER, para conservar el usuario identificado, con este parámetro permite asignar un identificador de usuario alternativo.
	* @property {boolean} [getDefault=true] - Determina si el multifiltro debe de cargar el filtro por defecto al cargar la página.
	*/
	jQuery.fn.rup_jqtable.plugins.multifilter = {};
	jQuery.fn.rup_jqtable.plugins.multifilter.defaults = {
		multifilter : {}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   *  Evento lanzado justo antes de añadir un filtro.
   *
   * @event module:rup_jqtable#rupTable_multifilter_beforeAdd
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} xhr - Objecto XHR empleado en la petición AJAX de nuevo filtro.
	 * @property {Event} options - Opciones de comfiguración de la petición AJAX de nuevo filtro.
   * @example
   * $("#idComponente").on("rupTable_multifilter_beforeAdd", function(event, xhr, options){ });
   */

	/**
		* Evento ejecutado cuando se rellenar el formulario del filtro. Cada vez que se cancela, limpia o se selecciona un filtro se lanza este evento.
		*
		* @event module:rup_jqtable#rupTable_multifilter_fillForm:
		* @property {Event} event - Objeto Event correspondiente al evento disparado.
		* @property {Event} filterData - Valor del filtro.
		* @example
		* $("#idComponente").on("rupTable_multifilter_fillForm:", function(event, filterData){ });
		*/

})(jQuery);
