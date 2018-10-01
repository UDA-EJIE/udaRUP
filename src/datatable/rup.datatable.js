/**
  * Genera un datatable
  *
  * @summary 		Componente RUP Datatable
  * @module			"rup.datatable"
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

/*global define */
/*global jQuery */

( function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','./rup.table.request','datatables.net-bs4','datatables.net-responsive-bs4','./rup.table.multiselect','./rup.table.buttons','./rup.table.editForm','./rup.table.seeker','./rup.table.colReorder','./rup.table.select','./rup.table.rowGroup','./rup.table.masterDetail','./rup.table.multiFilter'], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function( $ , TableRequest) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var DataTable = $.fn.dataTable;
	var rup_datatable = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_datatable', rup_datatable));

	//*******************************
	// DEFINICIÓN DE MÉTODOS RUP
	//*******************************
	$.fn.rup_datatable('extend',{
		getRupValue: function() {
			return null;
		},
		setRupValue: function(value) {

		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_datatable('extend',{
		foo: function() {
			return this;
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_datatable('extend',{

		/**
			* Inicializa ciertas opciones del componente
			*
			* @name _initOptions
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
		_initOptions: function(options) {
			var $self = this;


			options.processing = true;
			options.serverSide = true;
			options.columns = options.columns || $self._getColumns(options);


			//filter

			// options.filterForm = $self.attr('data-filter-form');
			options.$filterForm = $(options.filterForm);

			options.$filterButton = options.$filterForm.find('.rup-filtrar');
			options.$clearButton = options.$filterForm.find('.rup-limpiar');
			options.$filterButton.on('click', function(){ $self._doFilter(options);});
			options.$clearButton.on('click', function(){$self._clearFilter(options);});




			// Urls
			var baseUrl = options.urlBase;
			options.urls = {
				base : baseUrl,
				filter : baseUrl + '/filter'
			};

			options.ajax = this._ajaxOptions(options);

			options.language = {
				'url': $.rup.RUP + '/resources/rup.i18n_' + $.rup.lang + '.json'
			};


			//Extend 
			/*{targets:   4,data: "download_link",render: function (  ) {
		         return '<a href="">Download</a>';
		     }}*/
			var defes = {};
			var columnDefs = $.extend({}, options.columnDefs, defes);
			//options.columnDefs = columnDefs;
			
			//Se cargan los metodos en la API, Se referencia al Register
			var apiRegister = DataTable.Api.register;
			
			 DataTable.Api.register( 'rupTable.selectPencil()', function ( ctx,idRow ) {
					//Se limina el lapicero indicador.
					$('#'+ctx.sTableId+' tbody tr td.select-checkbox span.ui-icon-pencil').remove();
					//se añade el span con el lapicero
					if(idRow >= 0){
						var spanPencil = $("<span/>").addClass('ui-icon ui-icon-rupInfoCol ui-icon-pencil selected-pencil');
						$($('#'+ctx.sTableId+' tbody tr td.select-checkbox')[idRow]).append(spanPencil);
					}
			} );
			 
			apiRegister( 'rupTable.reorderDataFromServer()', function ( json,ctx ) {
					//Se mira la nueva reordenacion y se ordena.

					ctx.multiselection.selectedIds = [];
					ctx.multiselection.selectedRowsPerPage = [];
					//Viene del servidor por eso la linea de la pagina es 1 menos.
					$.each(json.reorderedSelection,function(index,p) {
						var arra = {id:DataTable.Api().rupTable.getIdPk(p.pk),page:p.page,line:p.pageLine-1};
						ctx.multiselection.selectedIds.splice(index,0,arra.id);
						ctx.multiselection.selectedRowsPerPage.splice(index,0,arra);
					});
					if(!ctx.multiselection.selectedAll){
						ctx.multiselection.numSelected = ctx.multiselection.selectedIds.length;
					}
					// Detecta cuando se pulsa sobre el boton de filtrado o de limpiar lo filtrado
					if(options.buttons !== undefined){
						DataTable.Api().buttons.displayRegex(ctx);
					}
			} );
			
			apiRegister( 'rupTable.getIdPk()', function ( json ) {

				var id = '';

				$.each(options.primaryKey,function(index,key) {
					id = id + json[key];
					if(options.primaryKey.length > 1 && index < options.primaryKey.length-1){
						id = id+options.multiplePkToken;
					}
				});
				
				return id;
		} );

			return options;
		},

		/**
			* Obtiene las columnas
			*
			* @name _getColumns
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
		_getColumns(options) {
			$self = this;
			//Se crea la columna del select.
			if(options.columnDefs !== undefined && options.columnDefs.length > 0 &&
					options.columnDefs[0].className !== undefined && options.columnDefs[0].className === 'select-checkbox' &&
					(options.multiSelect !== undefined)){
				//Se crear el th thead, se añade la columnal.
				
				var th = $("<th/>").attr('data-col-prop','');

				if($self[0].tHead !== null){
					$(th).insertBefore($self[0].tHead.rows[0].cells[0])
				}
				//se crea el th tfoot
				if($self[0].tFoot !== null){
					$('<th/>').insertBefore($self[0].tFoot.rows[0].cells[0])
				}
				//Se aseguro que no sea orderable
				if(options.columnDefs.length > 0){
					options.columnDefs[0].orderable = false;
				}
			}
			var columns = this.find('th[data-col-prop]').map((i, e) => {
				if(e.getAttribute('data-col-type') === 'Checkbox'){
					options.columnDefs.push({targets:i,data: "",render: function (data, visibility, object, colRows ) {
						var iconCheck = 'fa fa-times';
						if(data === '1'){
							iconCheck = 'fa fa-check';
						}
				    return '<div class="datatable_checkbox"><i class="' + iconCheck + '"></i></div>';
			    }});
				}
				return {
					data: e.getAttribute('data-col-prop'),sidx:e.getAttribute('data-col-sidx')
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
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
		_doFilter(options) {
			var $self = this;
			$self._showSearchCriteria();
			$self.DataTable().ajax.reload();

		},

		/**
			* Prepara el objeto necesario para la consulta de registros al servidor
			*
			* @name _ajaxOptions
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
		_ajaxOptions(options) {
			options.id = this[0].id;
			var ajaxData = {
				'url': options.urls.filter,
				'dataSrc': function ( json ) {
					var ret = {};

					json.recordsTotal = json.records;
					json.recordsFiltered = json.records;

					ret.recordsTotal = json.records;
					ret.recordsFiltered = json.records;
					ret.data = json.rows;

		     		var table = $('#'+options.id).DataTable();
					var ctx = table.context[0];

					var settings = $(ctx.nTable).data('settings'+ctx.sTableId);
					if(settings !== undefined && (settings.multiSelect !== undefined || settings.select !== undefined)){
						DataTable.Api().rupTable.reorderDataFromServer(json,ctx);
					}
					if(ctx.seeker !== undefined && ctx.seeker.search !== undefined 
							&& json.reorderedSeeker !== undefined){
						ctx.seeker.search.funcionParams = json.reorderedSeeker;
					}

					return ret.data;
				},
				'type': 'POST',
				'data': this._ajaxRequestData,
				'contentType': 'application/json',
				'dataType': 'json'

			};


			return ajaxData;
		},
		/**
			* Solicita los datos al servidor
			*
			* @name _ajaxRequestData
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} data Opciones del datatable
			* @param {object} ctx contexto  del componente table
			*
		  */
		_ajaxRequestData(data, ctx) {

			//PAra añadir un id de busqueda distinto al value, como por ejemplo la fecha.
			data.columns[data.order[0].column].colSidx = ctx.aoColumns[data.order[0].column].colSidx;
			//el data viene del padre:Jqueru.datatable y como no tiene el prefijo de busqueda se añade.
			data.filter = form2object($(ctx.nTable).data('settings'+ctx.sTableId).$filterForm[0]);
			data.multiselection = undefined;
			if(ctx.multiselection !== undefined && ctx.multiselection.selectedIds.length > 0){
				data.multiselection = ctx.multiselection;
			}
			if(ctx.seeker !== undefined && ctx.seeker.search !== undefined 
					&& ctx.seeker.search.funcionParams !== undefined && ctx.seeker.search.funcionParams.length > 0){
				data.seeker = {};
				data.seeker.selectedIds = [];
				$.each(ctx.seeker.search.funcionParams,function(index,p) {
					data.seeker.selectedIds.splice(index,0,DataTable.Api().rupTable.getIdPk(p.pk));
				});
			}
			var tableRequest = new TableRequest(data);
			var json = $.extend({}, data, tableRequest.getData());

			json.core.pkNames = ctx.oInit.primaryKey;

			ctx.aBaseJson = json;
			return JSON.stringify(json);


		},

		/**
			* Gestiona la paginación
			*
			* @name _createSearchPaginator
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} tabla Objeto que contiene la tabla
			* @param {object} settingsT Opciones del componente
			*
		  */
		_createSearchPaginator(tabla,settingsT){
			//buscar la paginación.
			if($('#'+tabla[0].id+'_paginate').length === 1){
				var liSearch = $('<li/>').addClass('paginate_button page-item pageSearch searchPaginator');
				var textPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'pagina',settingsT.json.total);
				var toPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'toPagina',settingsT.json.total);
				var input = $('<input/>').attr({type: "text", size: "3",value:settingsT.json.page,maxlength:"3"})
							.addClass('ui-pg-input')
				liSearch.append(textPagina);
				liSearch.append(input);
				liSearch.append(toPagina);
				$('#'+tabla[0].id+'_previous').after(liSearch);
				input.keypress(function (e) {
					 if(e.which === 13)  // the enter key code
					  {
						 var page = parseInt(this.value);
						 if($.isNumeric(page) && page > 0){
							 tabla.dataTable().fnPageChange( page-1 );
						 }
					    return false;
					  }
					});
			}else{
				//Sacar un error
			}
			
			// Crea un div que albergara la lista de botones de paginacion
			$('#'+tabla[0].id+'_paginate').prepend(
					"<div id='" + tabla[0].id + "_buttons' class='recolocatedPagination_buttons' />"
			);
			
			// Añade iconos para versiones moviles/tablets
			$('#'+tabla[0].id+'_first')
				.addClass('recolocatedPagination_iconButton')
				.append("<i class='fa fa-angle-double-left'/>");
			$('#'+tabla[0].id+'_previous')
				.addClass('recolocatedPagination_iconButton')
				.append("<i class='fa fa-angle-left'/>");
			$('#'+tabla[0].id+'_next')
				.addClass('recolocatedPagination_iconButton')
				.append("<i class='fa fa-angle-right'/>");
			$('#'+tabla[0].id+'_last')
				.addClass('recolocatedPagination_iconButton')
				.append("<i class='fa fa-angle-double-right'/>");
			
			// Inserta la lista de botones de paginacion al div anteriormente creado
			$('#'+tabla[0].id+'_paginate ul').detach().appendTo($('#'+tabla[0].id+'_buttons'));
			
			// Añadimos clases para acabar con la recolocacion
			$('#'+tabla[0].id+'_paginate').addClass('recolocatedPagination_container');
			$('#'+tabla[0].id+'_buttons').addClass('recolocatedPagination_rellenoCtr');
			$('#'+tabla[0].id+'_info').addClass('recolocatedPagination_rellenoDrc');
			$('#'+tabla[0].id+'_length').addClass('recolocatedPagination_length');

		},

		/**
			* Limpia el filtro
			*
			* @name _clearFilter
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
		_clearFilter(options) {
			var $self = this;

			options.$filterForm.resetForm();
			$self.DataTable().ajax.reload();
			options.filter.$filterSummary.html(' <i></i>');
			jQuery('input,textarea').val('');
			jQuery('.ui-selectmenu-status','.rup-table-filter-fieldset').text('--');
			$.rup_utils.populateForm([], options.$filterForm)

		},
		/**
		* Metodo que realiza la configuración del plugin filter del componente RUP DataTable.
		*
		* @name preConfigureFilter
		* @function
		*
		* @param {object} settings - Parámetros de configuración del componente.
		*
		*/
		_ConfigureFiltern(settings){
			var $self = this, tableId = this[0].id, filterSettings = settings.filter,
				toggleIcon1Tmpl,toggleLabelTmpl,filterSummaryTmpl,toggleIcon2Tmpl,$toggleIcon1,$toggleLabel,$filterSummary,$toggleIcon2;

			/*
			 * Inicialización de los identificadores y componentes por defecto de los componentes de filtrado
			 */
			filterSettings.id = (filterSettings.id!==undefined?filterSettings.id:tableId+'_filter_form');
			filterSettings.filterToolbarId = (filterSettings.filterToolbar!==undefined?filterSettings.filterToolbar:tableId+'_filter_toolbar');

			filterSettings.collapsableLayerId = (filterSettings.collapsableLayerId!==undefined?filterSettings.collapsableLayerId:tableId+'_filter_fieldset');

			filterSettings.toggleIcon1Id = (filterSettings.toggleIcon1!==undefined?filterSettings.toggleIcon1:tableId+'_filter_toggle_icon1');
			filterSettings.toggleLabelId = (filterSettings.toggleLabelId!==undefined?filterSettings.toggleLabelId:tableId+'_filter_toggle_label');
			filterSettings.filterSummaryId = (filterSettings.filterSummaryId!==undefined?filterSettings.filterSummaryId:tableId+'_filter_summary');
			filterSettings.toggleIcon2Id = (filterSettings.toggleIcon2!==undefined?filterSettings.toggleIcon2:tableId+'_filter_toggle_icon2');

			filterSettings.$filterContainer = jQuery('#'+filterSettings.id);
			filterSettings.$filterToolbar = jQuery('#'+filterSettings.filterToolbarId);

			settings.filter.showHidden = false;


			if (filterSettings.$filterContainer.length===0){
				alert('El identificador especificado para el fomulario de búsqueda no existe.');
			}else if (filterSettings.$filterToolbar.length===0){
				alert('El identificador especificado para la barra de controles del formulario de filtrado no existe.');
			}else{
				/*
				 * Se almacena la referencia de los diferentes componentes
				 *
				 * $filterContainer : Contenedor del formulario de filtrado
				 * $filterButton : Botón que realiza el filtrado
				 * $cleanLink : Enlace para limpiar el formulario
				 * $collapsableLayer : Capa que puede ser ocultada/mostrada
				 * $toggleIcon1Id : Control que oculta muestra el fomulario
				 * $filterSummary : Contenedor donde se especifican los criterios de filtrado
				 */
				toggleIcon1Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleIcon1');
				toggleLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleLabel');
				filterSummaryTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.filterSummary');
				toggleIcon2Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleIcon2');

				$toggleIcon1 = $(jQuery.jgrid.format(toggleIcon1Tmpl, filterSettings.toggleIcon1Id));
				$toggleLabel = $(jQuery.jgrid.format(toggleLabelTmpl, filterSettings.toggleLabelId, $.rup.i18n.base.rup_table.plugins.filter.filterCriteria));
				$filterSummary = $(jQuery.jgrid.format(filterSummaryTmpl, filterSettings.filterSummaryId));
				$toggleIcon2 = $(jQuery.jgrid.format(toggleIcon2Tmpl, filterSettings.toggleIcon2Id));

				filterSettings.$filterToolbar.append($toggleIcon1).append($toggleLabel).append($filterSummary).append($toggleIcon2);

				filterSettings.$filterContainer = jQuery('#'+filterSettings.id);

				filterSettings.$collapsableLayer = jQuery('#'+filterSettings.collapsableLayerId);

				filterSettings.$toggleIcon1 = $toggleIcon1;
				filterSettings.$toggleLabel = $toggleLabel;
				filterSettings.$filterSummary = $filterSummary;
				filterSettings.$toggleIcon2 = $toggleIcon2;



				// Se asigna a la tecla ENTER la funcion de busqueda.
				filterSettings.$filterContainer.bind('keydown', function(evt) {
					if (evt.keyCode === 13) {
						$self._doFilter(settings);
					}
				});

				filterSettings.$filterToolbar.addClass('cursor_pointer').on({
					'click':function(){
						if(settings.filter.showHidden === false){
							filterSettings.$collapsableLayer.hide();
							filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
							filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-s').addClass('ui-icon-circle-triangle-n');
							settings.filter.showHidden = true;
						} else{
							filterSettings.$collapsableLayer.show();
							filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
							filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-n').addClass('ui-icon-circle-triangle-s');
							settings.filter.showHidden = false;
						}
					}
				});

				if (settings.filter.showHidden === true){
					filterSettings.$collapsableLayer.hide();
					filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');
					filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-s').addClass('ui-icon-circle-triangle-n');
					settings.filter.showHidden = true;
				} else {
					filterSettings.$collapsableLayer.show();
					filterSettings.$toggleIcon1.removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s');
					filterSettings.$toggleIcon2.removeClass('ui-icon-circle-triangle-n').addClass('ui-icon-circle-triangle-s');
					settings.filter.showHidden = false;
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
			_showSearchCriteria(){
				var $self = this, settings = $self.data('settings'+$self[0].id),
					searchString = ' ', label, numSelected,
					field, fieldId, fieldName, fieldValue,
					aux = settings.filter.$filterContainer.serializeArray(),
					searchForm = settings.filter.$filterContainer,
					filterMulticombo = new Array();
				var obj;

				//añadir arbol

				var arboles=	$('.jstree',settings.filter.$filterContainer);
				$.each(arboles,function( index,item ){
					obj= new Object();
					obj.name=$(item).attr('name');
					obj.value=$(item).rup_tree('getRupValue').length;
					obj.type='rup_tree';
					aux.push(obj);
				});

				for (var i = 0; i < aux.length; i++) {
					if (aux[i].value !== ''  && $.inArray(aux[i].name,settings.filter.excludeSummary)!== 0) {

						//CAMPO a tratar
						field = $('[name=\'' + aux[i].name + '\']',searchForm);

						//Comprobar si se debe excluir el campo
						if ($.inArray(field.attr('id'), settings.filter.filterExclude) !== -1){
							continue;
						}

						//Seleccionar radio
						if (field.length > 1){
							field = $('[name=\'' + aux[i].name + '\']:checked',searchForm);
						}
						//Omitir campos hidden
						if ($(field).attr('type') === 'hidden'){
							continue;
						}

						//ID del campo
						fieldId = $(field).attr('id');
						//ID para elementos tipo rup.combo
						if ($(field).attr('ruptype') === 'combo' && field.next('.ui-multiselect').length === 0){
								fieldId += '-button';
						}
						//ID para elementos tipo rup.autocomplete
						if ($(field).attr('ruptype') === 'autocomplete'){
							fieldId = fieldId.substring(0, fieldId.indexOf('_label'));
						}

						//NAME
						label = $('label[for^=\'' + fieldId + '\']',searchForm);
						if (label.length>0){
							// <label for='xxx' />
							fieldName = label.html();
						} else {
							// <div />
							// <div />
							if ($(field).attr('ruptype') !== 'combo'){
								fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).prev('div').find('label').first().html();
							} else {

								// Buscamos el label asociado al combo
								// Primero por id
								var $auxField = $('[name=\'' + aux[i].name + '\']',searchForm), $labelField;

								$labelField = jQuery('[for=\''+$auxField.attr('id')+'\']');

								if ($labelField.length>0){
									fieldName = $labelField.first().text();
								}else{

									fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).parent().prev('div').find('label').first().html();

								}
							}
						}
						if (fieldName === null || fieldName === undefined){
							fieldName = '';
						}

						//VALUE
						fieldValue = ' = ';
						switch($(field)[0].tagName){
						case 'INPUT':
							fieldValue = fieldValue + $(field).val();
							if ($(field)[0].type === 'checkbox' || $(field)[0].type === 'radio'){
								fieldValue = '';
							}
							break;
							//Rup-tree
						case 'DIV':
							$.each(aux,function( index,item ){
								if (item.name===field.attr('id')){
									if (item.value!=0){
										fieldValue +=' = '+ item.value;
									}
								} else {
									fieldValue = '';
								}


							});
							if (fieldValue===''){
								fieldName = '';
							}
							break;
						case 'SELECT':
							if (field.next('.ui-multiselect').length===0){
								fieldValue = fieldValue + $('option[value=\''+aux[i].value+'\']',field).html();
							} else {
								if ($.inArray($(field).attr('id'), filterMulticombo)===-1){
									numSelected = field.rup_combo('value').length;
									if (numSelected !== 0){
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
						var parseableChars = new Array(':','=');
						for (var j=0; j<parseableChars.length; j++){
							if (fieldName !== '' && fieldName.indexOf(parseableChars[j])!== -1){
								fieldName = fieldName.substring(0,fieldName.indexOf(parseableChars[j]));
								break;
							}
						}

						//Controlar rup.combo con valor vacío
						while (fieldValue.indexOf('&amp;nbsp;')!==-1){
							fieldValue = fieldValue.replace ('&amp;nbsp;','');
						}

						//Si no tiene NAME sacar solo el valor
						if (fieldName === '' && fieldValue.indexOf(' = ')!==-1){
							fieldValue = fieldValue.substring(2, fieldValue.length);
						}


						//Si no tiene NAME ni VALUE omitir
						if (fieldName === '' && $.trim(fieldValue) === ''){
							continue;
						}
						searchString = searchString + fieldName + fieldValue + ', ';
					}
				}

					//Añadir criterios
				if (settings.multiFilter !== undefined && jQuery.isFunction(settings.multiFilter.fncFilterName)) {
					searchString = jQuery.proxy(settings.multiFilter.fncFilterName, $self, searchString)();
				}
				
				settings.filter.$filterSummary.html(' <i>' + searchString + '</i>');


			},
			/**
		     * Crea un evente para mantener la multiseleccion, el seeker y el select ya que accede a bbdd.
		     *
		     * @name createEventSelect
		     * @function
		     *
		     * @param {object} tabla - La configuración de la tabla.
		     *
		     */
			_createEventSelect(tabla){
				tabla.on( 'draw.dtSelect.dt select.dtSelect.dt', function () {//Si lleva parametros es que estamos en la navegacion interna.
					var ctx = tabla.context[0];
					if(ctx.oInit.formEdit !== undefined && ctx.oInit.formEdit.$navigationBar !== undefined &&
							ctx.oInit.formEdit.$navigationBar.funcionParams !== undefined && ctx.oInit.formEdit.$navigationBar.funcionParams.length > 0){
						var params = ctx.oInit.formEdit.$navigationBar.funcionParams;
						//Si hay selectAll, comprobar la linea ya que puede variar al no tener ningún selected.Se recorre el json.
						if(ctx.multiselection.selectedAll){
							var linea = -1;
							if(params[3] !== undefined && (params[3] === 'prev' || params[3] === 'last')){
								linea = ctx.json.rows.length;
								params[2] = DataTable.Api().editForm.getLineByPageSelectedReverse(ctx,linea);
							}else{
								if(params[2] !== undefined && params[2] > 0){
									linea = params[2]-1;
								}
								params[2] = DataTable.Api().editForm.getLineByPageSelected(ctx,linea);//Se inicia en -1 para que coja desde la primera linea.next y prev.
							}

						}
						DataTable.editForm.fnOpenSaveDialog(params[0],params[1],params[2]);
						ctx.oInit.formEdit.$navigationBar.funcionParams = {};
					}

				} );
			},
			/**
			* Metodo que inicialida las propiedades para el multiselect y el Select.
			*
			* @name initializeMultiselectionProps
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			*
			*/
			_initializeMultiselectionProps ( ctx ) {
				
				var multi = {};
				// Se almacenan en los settings internos las estructuras de control de los registros seleccionados
				if (multi.multiselection === undefined) {
					multi.multiselection = {};
				}
				if(ctx.multiselection !== undefined){
					multi.multiselection.internalFeedback = ctx.multiselection.internalFeedback;
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
				multi.multiselection.lastSelectedId = "";
				//$self.multiselection.selectedPages = [];
				// Propiedades de deselección de registros
				multi.multiselection.deselectedRowsPerPage = [];
				//$self.multiselection.deselectedLinesPerPage = [];
				//$self.multiselection.deselectedRows = [];
				multi.multiselection.deselectedIds = [];
				multi.multiselection.accion = "";//uncheckAll,uncheck
				//$self.multiselection.deselectedPages = [];
				$("#contextMenu1 li.context-menu-icon-uncheck").addClass('disabledDatatable');
				$("#contextMenu1 li.context-menu-icon-uncheck_all").addClass('disabledDatatable');
				// Desmarcamos el check del tHead
				$("#labelSelectTableHead" + ctx.sTableId).removeClass('selectTableHeadCheck');
				$("#linkSelectTableHead" + ctx.sTableId).removeClass('rup-datatable_checkmenu_arrow_margin');

				DataTable.Api().rupTable.selectPencil(DataTable.settings[0],-1);
				if (ctx.multiselection === undefined) {
					ctx.multiselection = {};
				}
				ctx.multiselection =  multi.multiselection;
			}, _createTooltip (id) {
				if(id !== undefined && id.text() !== undefined && id.text() !== ''){
					id.rup_tooltip({
						content: {
							text: id.text()
						},
						show: {
							event: 'hover'
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
	$.fn.rup_datatable('extend', {
		_init : function(args){
			var $self = this,
				settings = $.extend({}, $.fn.rup_datatable.defaults, $self[0].dataset, args[0]);

			// Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
			$self.attr('ruptype', 'datatable');
			
			if(args[0].primaryKey !== undefined){
				settings.primaryKey = args[0].primaryKey.split(";");
			}
			
			//Comprobar plugin dependientes
			if(settings.multiSelect !== undefined){
				settings.columnDefs.push({
			        orderable: false,
			        className: 'select-checkbox',
			        targets:   0
			    	});
				//Modulo incompatible
				settings.select = undefined;
			}
			
			
			if(settings.formEdit === undefined){
				settings.buttons = undefined;
			}

			// getDefault multifilter
			if (settings.multiFilter !== undefined && settings.multiFilter.getDefault === undefined){
				var usuario;
				if (settings.multiFilter.userFilter!=null){
					usuario=settings.multiFilter.userFilter;
				}else{
					usuario=LOGGED_USER;
				}
				var ctx = {};
				ctx.oInit = settings;
				ctx.sTableId = $self[0].id;
				$.rup_ajax({
					url : settings.urlBase
												+ '/multiFilter/getDefault?filterSelector='
												+ settings.multiFilter.idFilter + '&user='
												+ usuario,
					type : 'GET',
					dataType : 'json',
					showLoading : false,
					contentType : 'application/json',
					//async : false,
					complete : function(jqXHR,
						textStatus) {

					},
					success : function(data, status,
						xhr) {
						if (data != null) {
							var valorFiltro = $
								.parseJSON(data.filterValue);


							DataTable.Api().multiFilter.fillForm(valorFiltro,ctx);
							$self._doFilter(data);
							$(settings.filter.$filterSummary , 'i').prepend(data.filterName+'{');
							$(settings.filter.$filterSummary , 'i').append('}');

						}

					},
					error : function(xhr, ajaxOptions,
						thrownError) {

					}
				});


			}
			
			$self._initOptions(settings);
			
			var tabla = $self.DataTable(settings);

			settings.sTableId = $self[0].id;
			$self._initializeMultiselectionProps(tabla.context[0]);
			
			//Crear tooltips cabecera;
			$.each($('#'+$self[0].id+' thead th'),function( ){
				$self._createTooltip($(this));
			});
			
			tabla.on( 'draw', function (e,settingsTable) {
				if(settings.searchPaginator){//Mirar el crear paginador
					$self._createSearchPaginator($(this),settingsTable);
					//Si el seeker esta vacio ocultarlo
					if(settingsTable.seeker !== undefined && 
							settingsTable.seeker.search !== undefined && settingsTable.seeker.search.$searchRow !== undefined){
						if(settingsTable._iRecordsDisplay > 0){
							settingsTable.seeker.search.$searchRow.show();
						}else{
							settingsTable.seeker.search.$searchRow.hide();
						}
					}
				}

				if(settings.select !== undefined || settings.multiSelect !== undefined){//AL repintar vigilar el select.
					if(settings.select !== undefined){//AL repintar vigilar el select.
						if(settingsTable.select.selectedRowsPerPage !== undefined){
							//viene de la navegacion buscar el id.
							var line = 0;
							var ctx = tabla.context[0];
							if(settingsTable.select.selectedRowsPerPage.cambio === 'prev' || settingsTable.select.selectedRowsPerPage.cambio === 'last'){
								line = ctx.json.rows.length-1;
							}
							
							ctx.multiselection.selectedRowsPerPage = [];
							var rowSelectAux = ctx.json.rows[line];
							var id = DataTable.Api().rupTable.getIdPk(rowSelectAux);
							ctx.multiselection.selectedRowsPerPage.push({line:line,page:ctx.select.selectedRowsPerPage.page,id:id});
							settingsTable.select.selectedRowsPerPage = undefined;
							var numTotal = ctx.json.recordsTotal;
							var index = (Number(ctx.json.page)-1) * 10;
							index = index + line + 1;
							DataTable.Api().editForm.updateDetailPagination(ctx,index,numTotal);
						}
						DataTable.Api().select.drawSelectId(tabla.context[0]);
					}
					if(settingsTable.seeker !== undefined 
							&& settingsTable.seeker.search !== undefined){
						var ctx = tabla.context[0];
						if(settingsTable.seeker.search.funcionParams !== undefined && settingsTable.seeker.search.funcionParams.length > 0 &&//Paginar para el seek y que siempre selecione
									ctx.json.page !== settingsTable.seeker.search.funcionParams[settingsTable.seeker.search.pos].page && ctx.fnRecordsTotal() > 0){//ver si hay cambio de pagina.
								DataTable.Api().seeker.selectSearch(tabla,ctx,settingsTable.seeker.search.funcionParams);
						}
					}
				}
				
				//Crear tooltips tds;
				$.each($('#'+settingsTable.sTableId+' tbody td'),function( ){
					$self._createTooltip($(this));
				});
			  });
			
			
			if(settings.buttons !== undefined){
				// Toolbar por defecto del datatable
				new $.fn.dataTable.Buttons(
					tabla,
					DataTable.Buttons.defaults.buttons
				).container().insertBefore($('#'+$self[0].id+'_filter_form'));
			}

			// Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
			$self.data('settings'+$self[0].id, settings);
			if(settings.multiSelect !== undefined){
				$self._createEventSelect(tabla);				
			}
			$self._ConfigureFiltern(settings);
			
		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
$.fn.rup_datatable.defaults = {
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
	feedback:{
			okFeedbackConfig:{
				closeLink: true,
				delay:1000
			}
		},
    dom: 't<"paginationContainer"pli>r',//i: Info, t: table, p:pagination, r: procesing , l:length:
    multiplePkToken: '~',
    primaryKey:["id"],
		responsive: true,
    searchPaginator:true,
    pagingType: "full",
    columnDefs: [],
    filter:{
  	  id:"table_filter_form",
  	  filterToolbar:"table_filter_toolbar",
  	  collapsableLayerId:"table_filter_fieldset"
     },
		// adapter: "datatable_jqueryui",
	adapter: 'datatable_bootstrap',
    order: [[ 1, 'asc' ]]
	};

}));
