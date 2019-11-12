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
 * Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.
 *
 * @summary Plugin de search del componente RUP Table.
 * @module rup_jqtable/search
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["search"],
 * 	search:{
 * 		// Propiedades de configuración del plugin search
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
	jQuery.rup_jqtable.registerPlugin('search',{
		loadOrder:9,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureSearch', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureSearch', settings);

		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la búsqueda de registros.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureSearch(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureSearch(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin search del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureSearch
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureSearch: function(settings){
			// Añadimos la columna por defecto para mostrar la información de registros encontrados
			//			settings.colNames = $.merge([""], settings.colNames);
			//			settings.colModel = $.merge([settings.search.defaultSearchInfoCol], settings.colModel);

			// Se configura la url de filtrado
			if (settings.search.url === null){
				settings.search.url = settings.baseUrl +'/search';
			}

		},
		/**
		* Metodo que realiza la post-configuración del plugin search del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureSearch
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureSearch: function(settings){
			var $self = this;

			$self.rup_jqtable('createSearchRow', settings);
			$self._initializeSearchProps(settings);

			$self.on({
				'jqGridLoadComplete.rupTable.search': function(data){
					var page = parseInt($self.rup_jqtable('getGridParam', 'page'),10);


					if($self._hasPageMatchedElements(page)){
						$self.rup_jqtable('highlightMatchedRowsInPage', page);
						//						// TODO: Generalizar
						//						$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
						//						for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
						//							newIndexPos = settings.search.matchedRowsPerPage[page][i];
						//							$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
						//						}
					}

					$self.rup_jqtable('updateSearchPagination');
				},
				'jqGridSelectRow.rupTable.search rupTable_setSelection.search': function(event, id, status, obj){
					$self.rup_jqtable('updateSearchPagination', id);
				},
				'jqGridGridComplete.rup_jqtable.search': function(event){
					var $self = $(this), settings = $self.data('settings');

					if ($self.rup_jqtable('getGridParam','records')===0){
						settings.search.$searchRow.hide();
					}else{
						settings.search.$searchRow.show();
					}
				},
				'rupTable_searchAfterCreateToolbar': function(event, $searchRow){
					var props = $self[0].p, colModel = props.colModel, cellColModel, $elem, editOptions, searchRupType, searchEditOptions;

					$('th[role=\'columnheader\']',$searchRow).each( function(i) {
						cellColModel = colModel[i];
						searchRupType = (cellColModel.searchoptions!==undefined && cellColModel.searchoptions.rupType!==undefined)?cellColModel.searchoptions.rupType:cellColModel.rupType;

						var colModelName = cellColModel.name;
						$elem = $('[name=\''+colModelName+'\']',$searchRow);
						// Se añade el title de los elementos de acuerdo al colname
						$elem.attr({
							'title': props.colNames[i],
							'class': 'editable customelement'
						}).removeAttr('readOnly');

						// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
						if(searchRupType!==undefined) {
							searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions;

							/*
							 * PRE Configuración de los componentes RUP
							 */
							switch(searchRupType){
							case 'combo':
								searchEditOptions = $.extend({},{menuWidth:$elem.width()}, searchEditOptions, {width:'97%'});
								break;
							}

							// Invocación al componente RUP
							$elem['rup_'+searchRupType](searchEditOptions);

							/*
							 * POST Configuración de los componentes RUP
							 */
							switch(searchRupType){
							case 'date':
								// TODO: Aplicarlo con estilos
								$elem.css('width','86%');
								break;
							}
						}
					});

				}
			});

		}
	});

	/**
	 * Métodos públicos del plugin search.
	 *
	 * Los métodos implementados son:
	 *
	 * toggleSearchForm(): Método que gestiona el mostrar/ocultar el formulario de búsqueda.
	 * createSearchRow(settings): Genera el formulario de búsqueda.
	 * navigateToMatchedRow(matchedRow): Se posiciona en el registro indicado que se corresponde con los criterios de búsqueda.
	 * doSearch(): Realiza la búsqueda de acuerdo a los criterios especificados.
	 * goToFirstMatched(paramPage): Navega hasta el primer resgistro que se corresponde con la búsqueda.
	 * fncGetSearchNavigationParams(buttonType): Devuelve los parámetros de navegación correspondientes al botón de navegación indicado.
	 * doSearchNavigation(arrParams, execute, changePage, index, npos, newPage, newPageIndex): Realiza la navegación entre los resultados de la búsqueda.
	 * clearSearch(): Realiza un borrado de los resultados de la búsqueda.
	 * clearHighlightedMatchedRows(): Elimina el resaltado de los registros
	 * highlightMatchedRowsInPage(page): Realiza el resaltado de los resultados de los registros para la página indicada.
	 * highlightMatchedRow($row): Resalta la línea indicada.
	 * updateSearchPagination(paramRowId): Actualiza los controles de paginación del formulario de búsqueda.
	 * getSearchCurrentRowCount(): Devuelve el resgistro actual en el que se encuentra el registro seleccionado respecto al conjunto de resultados.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     *  Muestra/Oculta el formulario de búsqueda.
     *
     * @function toggleSearchForm
     * @example
     * $("#idTable").rup_jqtable("toggleSearchForm");
     */
		toggleSearchForm: function(){
			var $self = this, settings = $self.data('settings'), prop = $self[0].p, trow, trow2;

			if (!settings.search.created){
				$self.rup_jqtable('createSearchToolbar');
				settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
				settings.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				jQuery('#searchNavLayer_'+settings.id).show();
				settings.search.created = true;
				jQuery('input','table thead tr.ui-search-toolbar').keypress(function(e){
					var key = e.charCode || e.keyCode || 0;
					if(key == 13){
						$self.rup_jqtable('search');
						return false;
					}
					return this;
				});
			}else{
				trow = jQuery('tr.ui-search-toolbar',$self[0].grid.hDiv);
				trow2 = prop.frozenColumns === true ?  jQuery('tr.ui-search-toolbar', $self[0].grid.fhDiv) : false;
				if(jQuery('tr.ui-search-toolbar','#gview_'+settings.id).is(':visible')){
					trow.hide(settings.search.transitionConfig);
					if(trow2) {
						trow2.hide(settings.search.transitionConfig);
					}
					jQuery('#searchNavLayer_'+settings.id).hide(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-s');
					settings.search.$collapseIcon.addClass('ui-icon-triangle-1-e');
				}else{
					trow.show(settings.search.transitionConfig);
					if(trow2) {
						trow2.show(settings.search.transitionConfig);
					}
					jQuery('#searchNavLayer_'+settings.id).show(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
					settings.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				}

			}
		},
		/**
     * Genera la barra de controles para gestionar la búsqueda.
     *
     * @function createSearchToolbar
		 * @fires module:rup_jqtable#rupTable_searchAfterCreateToolbar
     * @example
     * $("#idTable").rup_jqtable("createSearchToolbar");
     */
		createSearchToolbar: function(){
			var $self = this, settings =  $self.data('settings'), prop = $self[0].p,
				$searchRow = jQuery('<tr>').attr({
					'class':'ui-search-toolbar',
					'role':'rowheader'
				});


			if (jQuery('table thead tr:first th[id=\''+settings.id+'_cb\']',$self[0].grid.hDiv).length!==0){
				$searchRow.append(jQuery('<th>').attr({
					'role':'columnheader',
					'class':'search_row_header ui-th-column ui-th-'+prop.direction
				}));
			}
			$searchRow.append(jQuery('<th>').attr({
				'role':'columnheader',
				'class':'search_row_header ui-th-column ui-th-'+prop.direction
			}));

			$.each(prop.colModel,function(index, colM){
				var $searchHeader = jQuery('<th>').attr({
						'role':'columnheader',
						'class':'search_row_header ui-th-column ui-th-'+prop.direction
					}), elc, $elc;

				if(colM.hidden===true) {
					$searchHeader.css('display','none');
				}
				colM.search = colM.search === false ? false : true;
				if(colM.stype === undefined) {
					colM.stype= colM.edittype!==undefined?colM.edittype:'text';
					if (colM.searchoptions !== undefined && colM.searchoptions.rupType==='combo'){
						colM.stype = 'text';
					}
				}
				var soptions = $.extend({},colM.searchoptions || colM.editoptions || {}, {id:colM.name,name:colM.name});
				if(colM.search){
					elc = $.jgrid.createEl.call($self[0],colM.stype!==undefined?colM.stype:colM.edittype,soptions,'',true,$.extend({},$.jgrid.ajaxOptions,soptions.ajaxSelectOptions || {}));
					$elc=jQuery(elc);
					$elc.css('width','97%');
					//					$searchCol.append($elc);
					$searchHeader.append($elc);
				}
				if (colM.name !==settings.defaultGridInfoCol.name && colM.name !== settings.defaultGridMultiplePkCol.name && colM.name !== 'cb'){
					$searchRow.append($searchHeader);
				}
			});
			$('table thead',$self[0].grid.hDiv).append($searchRow);

			settings.search.$searchRowInputs = jQuery('table thead tr.ui-search-toolbar','#gview_'+settings.id);
			settings.search.$searchRowInputs.attr({
				'id':settings.id+'_search_rowInputs',
				'form':settings.id+'_search_rowInputs'
			});


			// Configuración de validaciones
			if (settings.search.validate!==undefined){
				settings.search.$searchForm.rup_validate(settings.search.validate);

				$self.on({
					'rupTable_beforeSearch.search.validate': function(){
						return settings.search.$searchForm.valid();
					}
				});
			}

			$self.triggerHandler('rupTable_searchAfterCreateToolbar', [$searchRow]);

			$self[0].ftoolbar = true;


		},
		/**
     * Genera la barra de controles para gestionar la búsqueda.
     *
     * @function createSearchRow
		 * @param {object} settings - Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas.
     * @example
     * $("#idTable").rup_jqtable("createSearchRow", settings);
     */
		createSearchRow: function(settings){
			var $self = this,
				$gridHead = jQuery('table thead','#gview_'+settings.id),
				searchForm,
				// Templates
				searchRowHeaderTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.searchRowHeader'),
				collapseLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseLayer'),
				collapseIconTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseIcon'),
				collapseLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.collapseLabel'),
				matchedLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.matchedLayer'),
				matchedLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.matchedLabel'),
				navLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navLayer'),
				navButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navButton'),
				navSearchButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navSearchButton'),
				navClearButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.navClearButton'),

				// Objetos
				$searchRow = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.templates.search.searchRow')),
				$searchRowHeader = $(jQuery.jgrid.format(searchRowHeaderTmpl, $gridHead.find('th').length-$gridHead.find('th:hidden').length)),
				// Capa que controla el colapso del formualario
				$collapseLayer = $(jQuery.jgrid.format(collapseLayerTmpl, 'searchCollapseLayer_'+settings.id)),
				$collapseIcon = $(jQuery.jgrid.format(collapseIconTmpl, 'searchCollapseIcon_'+settings.id)),
				$collapseLabel = $(jQuery.jgrid.format(collapseLabelTmpl, 'searchCollapsLabel_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.searchCriteria'))),
				// Capa que muestra el número de ocurrencias
				$matchedLayer = $(jQuery.jgrid.format(matchedLayerTmpl, 'matchedLayer_'+settings.id)),
				$matchedLabel = $(jQuery.jgrid.format(matchedLabelTmpl, 'matchedLabel_'+settings.id, jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),0))),

				// Capa que controla la navegación entre las diferentes ocurrencias
				$navLayer = $(jQuery.jgrid.format(navLayerTmpl, 'searchNavLayer_'+settings.id)),
				$firstNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_first_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.first'))),
				$backNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_back_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.previous'))),
				$forwardNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_forward_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.next'))),
				$lastNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_last_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.last'))),
				$navSearchButton = $(jQuery.jgrid.format(navSearchButtonTmpl, 'search_nav_button_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.search.Find'))),
				$navClearButton = $(jQuery.jgrid.format(navClearButtonTmpl, 'search_nav_clear_button'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.search.Reset')));

			// Construcción del objeto final
			$collapseLayer.append($collapseIcon).append($collapseLabel);
			$matchedLayer.append($matchedLabel);
			$navLayer.append($firstNavButton).append($backNavButton).append($forwardNavButton).append($lastNavButton).append($navSearchButton).append($navClearButton);

			$searchRowHeader.append($collapseLayer);
			$searchRowHeader.append($matchedLayer);
			$searchRowHeader.append($navLayer);

			$searchRow.append($searchRowHeader);

			$gridHead.append($searchRow);

			settings.search = settings.search || {};

			settings.search.created = false;
			//			settings.search.url = settings.search.url || settings.url+"../search";

			settings.search.$collapseIcon = $collapseIcon;
			settings.search.$searchRow = $searchRow;
			settings.search.$matchedLabel = $matchedLabel;
			settings.search.$firstNavButton = $firstNavButton;
			settings.search.$backNavButton = $backNavButton;
			settings.search.$forwardNavButton = $forwardNavButton;
			settings.search.$lastNavButton = $lastNavButton;

			// Creacion del enlace de mostrar/ocultar el formulario
			$collapseIcon.add($collapseLabel).on('click', function(){
				$self.rup_jqtable('toggleSearchForm');
			});

			// Evento de búsqueda asociado al botón
			$navSearchButton.on('click', function(){
				$self.rup_jqtable('search');
			});

			// Evento asociado a limpiar el fomulario de búsqueda
			$navClearButton.on('click', function(){
				$self.rup_jqtable('clearSearch');
			});

			$navLayer.hide();

			function doSearchButtonNavigation($button, buttonId){
				if (!$button.hasClass('ui-state-disabled')){
					$self.rup_jqtable('navigateToMatchedRow', buttonId);
				}
			}

			// Elemento primero
			$firstNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'first');
			});

			// Elemento anterior
			$backNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'prev');
			});

			// Elemento siguiente
			$forwardNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'next');
			});

			// Elemento ultimo
			$lastNavButton.on('click', function(){
				doSearchButtonNavigation(jQuery(this), 'last');
			});

			// Se recubre con un form
			var $searchForm = jQuery('<form>').attr('id',settings.id+'_search_searchForm');
			settings.search.$searchRow.parent().parent().wrap($searchForm);
			settings.search.$searchForm = jQuery('#'+settings.id+'_search_searchForm');
			settings.search.$searchRow.hide();

		},
		/**
     *  Navega hasta el elemento indicado que se ajusta a los criterios de búsqueda indicados.
     *
     * @function navigateToMatchedRow
		 * @param {string} matchedRow - Identificador de la línea a la cual se quiere navegar.
     * @example
     * $("#idTable").rup_jqtable("navigateToMatchedRow", matchedRow);
     */
		navigateToMatchedRow: function(matchedRow){
			var $self = this, retNavParams  = $self.rup_jqtable('fncGetSearchNavigationParams', matchedRow);
			$self.rup_jqtable('doSearchNavigation', retNavParams);
		},
		/**
     * Lanza la operación de búsqueda además del evento previo.
     *
     * @function search
		 * @fires module:rup_jqtable#rupTable_beforeSearch
     * @example
     * $("#idTable").rup_jqtable("search");
     */
		search : function(){
			var $self = this,
				settings = $self.data('settings');

			var bfr = $self.triggerHandler('rupTable_beforeSearch');
			if (bfr === false || bfr === 'stop') { return; }

			if ($.isFunction(settings.search.beforeSearch)) {
				bfr = settings.search.beforeSearch.call($self);
				if(bfr === undefined) { bfr = true; }
				if ( bfr === false ) { return; }
			}

			$self.rup_jqtable('doSearch');
		},
		/**
     *  Lanza la operación de búsqueda.
     *
     * @function navigateToMatchedRow
		 * @fires module:rup_jqtable#rupTable_searchBeforeSubmit.rupTable.masterDetail
     * @example
     * $("#idTable").rup_jqtable("doSearch");
     */
		doSearch: function(){
			var $self = this, settings = $self.data('settings'),ret, jsonData={},
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				postData =$self.rup_jqtable('getGridParam','postData');
			//			jsonData.filterParams =$self.rup_jqtable("getGridParam","postData"),
			jsonData.filter = $self.rup_jqtable('getFilterParams');
			jsonData.search = form2object(settings.search.$searchRowInputs[0]);
			$self._initializeSearchProps(settings);

			ret = $self.triggerHandler('rupTable_searchBeforeSubmit.rupTable.masterDetail',[postData, jsonData]);

			if (ret===false){return false;}

			jQuery.rup_ajax({
				url: settings.search.url,
				type:'POST',
				dataType:'json',
				data: jQuery.toJSON($.extend(true, {}, postData, jsonData)),
				contentType: 'application/json',
				success: function(xhr,b,c){
					var rowsPerPage = parseInt($self.rup_jqtable('getGridParam', 'rowNum'),10);

					if (xhr.length===0){
						$self._initializeSearchProps(settings);
						$self.rup_jqtable('updateSearchPagination');
						$self.rup_jqtable('clearHighlightedMatchedRows');
					}else{
						jQuery.each(xhr, function(index, elem){
							//							if (settings.primaryKey.length>1){
							var retValue='';
							for (var i=0;i<settings.primaryKey.length;i++){
								retValue+=elem.pk[settings.primaryKey[i]]+settings.multiplePkToken;
							}
							elem['id'] = retValue.substr(0, retValue.length-1);
							//							}

							elem.page = Math.ceil(elem.tableLine / rowsPerPage);
							elem.pageLine = elem.tableLine - ((elem.page-1)*rowsPerPage);
							$self._processMatchedRow(settings, elem);
						});
						$self.trigger('rupTableSearchSuccess');
						$self.rup_jqtable('goToFirstMatched', page);
					}
				}
			});
		},
		/**
     * Navega hasta el primer elemento que se ajusta a los criterios de búsqueda. En caso de no existir elementos adecuados en la página actual se navega hasta el primer elemento.
     *
     * @function goToFirstMatched
		 * @param {paramPage} paramPage - En caso de indicarse una página se utilizará en vez de la página actual.
     * @example
     * $("#idTable").rup_jqtable("goToFirstMatched", paramPage);
     */
		goToFirstMatched: function(paramPage){
			var $self = this, settings = $self.data('settings'),
				page = (typeof paramPage ==='string'?parseInt(paramPage,10):paramPage);

			if ($self._hasPageMatchedElements(page)){
				// TODO: Generalizar
				//				$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
				//				for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
				//					newIndexPos = settings.search.matchedRowsPerPage[page][i];
				//					$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
				//				}

				$self.rup_jqtable('setSelection', settings.search.matchedRowsPerPage[page][0], true);
				$self.rup_jqtable('highlightMatchedRowsInPage', page);

			}else{
				$self.rup_jqtable('navigateToMatchedRow', 'first');
			}


		},
		/**
     * Devuelve los parámetros correspondientes al tipo de enlace de navegación indicado por parámetro.
     *
     * @function fncGetSearchNavigationParams
		 * @param {paramPage} buttonType - Tipo de parámetro first, prev, next o last.-
		 * @return {object} - Parametros de configuración asociados al tipo de enlace.
     * @example
     * $("#idTable").rup_jqtable("fncGetSearchNavigationParams", buttonType);
     */
		fncGetSearchNavigationParams : function(buttonType){
			var $self = this, settings = $self.data('settings'), execute = false, changePage = false, index=0, newPageIndex=0,
				npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				newPage=page,
				activeLineId,
				//			lastPage = parseInt(Math.ceil($self.rup_jqtable("getGridParam", "records")/$self.rup_jqtable("getGridParam", "rowNum")),10),
				currentArrayIndex, selectedLines, pageArrayIndex;

			$self.trigger('rupTableAfterSearchNav',[buttonType]);

			npos[0] = parseInt(npos[0],10);

			activeLineId = $self.rup_jqtable('getActiveLineId');

			$('#'+settings.formEdit.feedbackId, settings.$detailForm).hide();
			switch (buttonType){
			case 'first':
				// Navegar al primer elemento
				execute = true;
				// Si no se han seleccionado todos los elementos
				// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
				if (settings.search.matchedPages[0]!==page){
					// Marcamos el flag changePage para indicar que se debe de realizar una paginación
					changePage = true;
					// La nueva página será la primera página en la que se ha realizado una selección de registros
					newPage = settings.search.matchedPages[0];
				}
				// Recuperamos el primer registro seleccionado del la página
				index = settings.search.matchedLinesPerPage[newPage][0];
				newPageIndex = index;
				break;
			case 'prev':
				// Navegar al anterior elemento seleccionado
				execute = true;
				// Obtenemos un array con los index de los registros seleccionados en la página actual
				selectedLines = settings.search.matchedLinesPerPage[page] || [];
				// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
				currentArrayIndex = $.inArray(activeLineId+1,selectedLines);

				// La línea no se encuentra entre los registros que se corresponden a la búsqueda
				if (currentArrayIndex===-1){
					currentArrayIndex = $.rup_utils.insertSorted($.merge([],selectedLines), activeLineId+1);
					//						if(currentArrayIndex>1){
					//							currentArrayIndex--;
					//						}
				}

				// Se comprueba si ocupa el lugar del primer elemento seleccionado
				if (currentArrayIndex===0){
					// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
					changePage = true;
					pageArrayIndex = $.inArray(page, settings.search.matchedPages);

					// En caso de no estar posicionados en una página en la que se encuentran ocurrencias de registros
					if (pageArrayIndex ===-1){
						// Se obtiene la posición en la que se encontraría la página
						pageArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page);
					}

					// Recorremos las páginas anteriores
					newPage = settings.search.matchedPages[pageArrayIndex-1];
					// Obtenemos los identificadores de los registros seleccionados de la nueva página
					selectedLines = settings.search.matchedLinesPerPage[newPage];
					// Obtenemos el último registro seleccionado
					index = selectedLines[selectedLines.length-1];
				}else{
					// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
					index = selectedLines[currentArrayIndex-1];
				}

				newPageIndex = index;
				break;
			case 'next':
				// Navegar al siguiente elemento seleccionado
				execute = true;
				// Obtenemos un array con los index de los registros seleccionados en la página actual
				selectedLines = settings.search.matchedLinesPerPage[page]  || [];
				// Obtenemos la posición que ocupa el elemento actual en el array de seleccionados
				currentArrayIndex = $.inArray(activeLineId+1,selectedLines);

				// La línea no se encuentra entre los registros que se corresponden a la búsqueda
				if (currentArrayIndex===-1){
					currentArrayIndex = $.rup_utils.insertSorted($.merge([],selectedLines), activeLineId+1);
					currentArrayIndex--;
				}

				// Se comprueba si ocupa el lugar del último elemento seleccionado
				if (currentArrayIndex===selectedLines.length-1){
					// En caso de tratarse del primer elemento seleccionado de la página, se deberá de realizar una navegación a la página anterior que disponga de elementos seleccionados
					changePage = true;
					pageArrayIndex = $.inArray(page, settings.search.matchedPages);

					// En caso de no estar posicionados en una página en la que se encuentran ocurrencias de registros
					if (pageArrayIndex ===-1){
						// Se obtiene la posición en la que se encontraría la página
						pageArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)-1;
					}

					// Recorremos las páginas anteriores
					newPage = settings.search.matchedPages[pageArrayIndex+1];
					// Obtenemos los identificadores de los registros seleccionados de la nueva página
					selectedLines = settings.search.matchedLinesPerPage[newPage];
					// Obtenemos el primer registro de la página
					index = selectedLines[0];
				}else{
					// En caso de no tratarse del último elemento de la página, recuperamos el elemento anterior que haya sido seleccionado también
					index = selectedLines[currentArrayIndex+1];
				}

				newPageIndex = index;
				break;
			case 'last':
					// Navegar al primer elemento
				execute = true;
					// Si no se han seleccionado todos los elementos
					// Se comprueba si la página en la que nos encontramos es la primera en la que se han seleccionado registros
				if (settings.search.matchedPages[settings.search.matchedPages.length-1]!==page){
						// Marcamos el flag changePage para indicar que se debe de realizar una paginación
					changePage = true;
						// La nueva página será la primera página en la que se ha realizado una selección de registros
					newPage = settings.search.matchedPages[settings.search.matchedPages.length-1];
				}
					// Recuperamos el primer registro seleccionado del la página
				index = settings.search.matchedLinesPerPage[newPage][settings.search.matchedLinesPerPage[newPage].length-1];
				newPageIndex = index;
				break;
			}

			return [buttonType, execute, changePage, index-1, npos, newPage, newPageIndex-1];
		},
		/**
     * Realiza la navegación entre los elementos que se ajustan a los criterios de bús
     *
     * @function fncGetSearchNavigationParams
		 * @param {object[]} arrParams - Array de parámetros que determinan la navegación.
     * @example
     * $("#idTable").rup_jqtable("doSearchNavigation", arrParams);
     */
		doSearchNavigation: function(arrParams){
			var $self = this,
				settings = $self.data('settings'),
				buttonType, execute, changePage, index, npos, newPage, newPageIndex, indexAux, ret, actualRowId, rowId, pagePos, $row;

			if ($.isArray(arrParams)){
				buttonType = arrParams[0];
				execute = arrParams[1];
				changePage = arrParams[2];
				index = arrParams[3];
				npos = arrParams[4];
				newPage = arrParams[5];
				newPageIndex = arrParams[6];

				if (execute){
					$self.rup_jqtable('hideFormErrors', settings.formEdit.$detailForm);
					//					$self.triggerHandler("jqGridAddEditClickPgButtons", [buttonType, settings.$detailForm, npos[1][npos[index]]]);
					pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();

					//					actualRowId = npos[1][npos[0]];
					actualRowId = $self.rup_jqtable('getActiveRowId');

					//					ret = $self.triggerHandler("rupTable_searchNavigation_deselect", actualRowId);
					//					if (ret!==false){
					$row = jQuery($self.jqGrid('getInd', actualRowId, true));
					if ($row.data('tmp.search.notToDeselect')!=='true'){
						$self.rup_jqtable('setSelection', actualRowId, false);
						if ($row.data('tmp.search.notToDeselect')!==undefined){
							delete $row.data('tmp.search.notToDeselect');
						}
					}

					if (changePage){
						//						$self.jqGrid("setSelection", pagePos[1][pagePos[0]], false);
						$self.trigger('reloadGrid',[{page: newPage}]);
						$self.on('jqGridAfterLoadComplete.rupTable.serach.pagination',function(event,data){
							indexAux = jQuery.inArray(newPageIndex+1, settings.search.matchedLinesPerPage[newPage]);

							rowId = settings.search.matchedRowsPerPage[parseInt(data.page,10)][indexAux];

							$row = jQuery($self.jqGrid('getInd', rowId, true));
							if ($row.attr('aria-selected')==='true'){
								$row.data('tmp.search.notToDeselect','true');
							}

							$self.rup_jqtable('setSelection', rowId, true);

							$self.off('jqGridAfterLoadComplete.rupTable.serach.pagination');
						});
					}else{
						indexAux = jQuery.inArray(index+1, settings.search.matchedLinesPerPage[newPage]);

						rowId = settings.search.matchedRowsPerPage[newPage][indexAux];

						$row = jQuery($self.jqGrid('getInd', rowId, true));
						if ($row.attr('aria-selected')==='true'){
							$row.data('tmp.search.notToDeselect','true');
						}

						$self.rup_jqtable('setSelection', rowId, true);
					}
				}
			}
		},
		/**
     * Limpia los criterios de búsqueda introducidos por el usuario.
     *
     * @function clearSearch
     * @example
     * $("#idTable").rup_jqtable("clearSearch");
     */
		clearSearch: function(){
			var $self = this, settings = $self.data('settings');
			$self._initializeSearchProps(settings);
			$self.rup_jqtable('updateSearchPagination');
			$self.rup_jqtable('clearHighlightedMatchedRows');
			jQuery('input,textarea','#gview_'+settings.id+' table thead tr.ui-search-toolbar').val('');
			jQuery('table thead tr.ui-search-toolbar [ruptype=\'combo\']','#gview_'+settings.id).rup_combo('clear');
		},
		/**
     * Elimina el resaltado de los registros que se ajustan a los criterios de busqueda.
     *
     * @function clearHighlightedMatchedRows
     * @example
     * $("#idTable").rup_jqtable("clearHighlightedMatchedRows");
     */
		clearHighlightedMatchedRows: function(){
			var $self = this, settings = $self.data('settings');
			$self.find('td[aria-describedby=\''+settings.id+'_rupInfoCol\'] span.ui-icon.ui-icon-search').removeClass('ui-icon-search');
		},
		/**
     * Resalta los registros que se ajustan a los criterios de búsqueda.
     *
     * @function highlightMatchedRowsInPage
		 * @param {string} page - Identificador de la página en la que se desean resaltar los registos.
     * @example
     * $("#idTable").rup_jqtable("highlightMatchedRowsInPage", page);
     */
		highlightMatchedRowsInPage:function(page){
			var $self = this, settings = $self.data('settings'), internalProps = $self[0].p, $row;

			$self.rup_jqtable('clearHighlightedMatchedRows');


			for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
				var newIndexPos = settings.search.matchedRowsPerPage[page][i];
				$row = $($self.jqGrid('getInd',newIndexPos, true));
				$self.rup_jqtable('highlightMatchedRow', $row);
				//				if (i==0){
				//					internalProps.selarrrow.push($row[0].id);
				//					internalProps.selrow = $row[0].id;
				//				}
			}
		},
		/**
     * Resalta como ocurrencia de la búsqueda la línea especificada.
     *
     * @function highlightMatchedRow
		 * @param {string} $row - Objeto jQuery que referencia la línea de la tabla que se quiere resaltar.
     * @example
     * $("#idTable").rup_jqtable("highlightMatchedRow", $("#idRow"));
     */
		highlightMatchedRow: function($row){
			var $self = this, settings = $self.data('settings');
			$row.find('td[aria-describedby=\''+settings.id+'_rupInfoCol\'] span').addClass('ui-icon ui-icon-rupInfoCol ui-icon-search');
		},
		/**
     * Actualiza los valores de la navegación entre registros.
     *
     * @function updateSearchPagination
		 * @param {string} paramRowId - Identificador de la página.
     * @example
     * $("#idTable").rup_jqtable("updateSearchPagination", paramRowId);
     */
		updateSearchPagination:function(paramRowId){
			var $self = this, settings = $self.data('settings'),
				rowId, pagePos, currentArrayIndex,
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				numMatched, formatter = $.jgrid.formatter.integer;

			if (paramRowId!==undefined){
				rowId = paramRowId;
			}else{
				pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
				rowId = (pagePos[0]!==-1?pagePos[1][pagePos[0]-1]:-1);
			}

			if (settings.search.numMatched===0){
				settings.search.$firstNavButton.add(settings.search.$backNavButton).add(settings.search.$forwardNavButton).add(settings.search.$lastNavButton).addClass('ui-state-disabled');
				settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),'0'));
			}else if (rowId!==-1){
				// Comprobamos si el registro seleccionado es uno de los resultados de la busqueda
				if (jQuery.inArray(rowId, settings.search.matchedRowsPerPage[page])!==-1){
					// Calculamos el
					numMatched = $self.rup_jqtable('getSearchCurrentRowCount', rowId);

					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecordsCount'),$.fmatter.util.NumberFormat(numMatched,formatter), $.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}

					if (numMatched===1){
						settings.search.$firstNavButton.addClass('ui-state-disabled');
						settings.search.$firstNavButton.attr('disabled', 'disabled');
						settings.search.$backNavButton.addClass('ui-state-disabled');
						settings.search.$backNavButton.attr('disabled', 'disabled');
					}else{
						settings.search.$firstNavButton.removeClass('ui-state-disabled');
						settings.search.$firstNavButton.removeAttr("disabled");
						settings.search.$backNavButton.removeClass('ui-state-disabled');
						settings.search.$backNavButton.removeAttr("disabled");
					}

					if (numMatched===settings.search.numMatched){
						settings.search.$lastNavButton.addClass('ui-state-disabled');
						settings.search.$lastNavButton.attr('disabled', 'disabled');
						settings.search.$forwardNavButton.addClass('ui-state-disabled');
						settings.search.$forwardNavButton.attr('disabled', 'disabled');
					}else{
						settings.search.$lastNavButton.removeClass('ui-state-disabled');
						settings.search.$lastNavButton.removeAttr("disabled");
						settings.search.$forwardNavButton.removeClass('ui-state-disabled');
						settings.search.$forwardNavButton.removeAttr("disabled");
					}

				}else{
					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_jqtable.plugins.search.matchedRecords'),$.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}
					settings.search.$firstNavButton.removeClass('ui-state-disabled');
					settings.search.$backNavButton.removeAttr("disabled");
					settings.search.$forwardNavButton.removeClass('ui-state-disabled');
					settings.search.$lastNavButton.removeAttr("disabled");

					// Miramos a ver si desde la posición actual hay anterior
					if (jQuery.inArray(settings.search.matchedPages, page) > 0){
						settings.search.$backNavButton.removeClass('ui-state-disabled');
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)===0){
						// Anterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$backNavButton.addClass('ui-state-disabled');
						settings.search.$firstNavButton.addClass('ui-state-disabled');
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)>=settings.search.matchedPages.length){
						// Posterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$forwardNavButton.addClass('ui-state-disabled');
						settings.search.$lastNavButton.addClass('ui-state-disabled');
					}else{
						pagePos = $self.rup_jqtable('getActiveLineId');
						if(settings.search.matchedLinesPerPage[page] !== undefined){
							currentArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedLinesPerPage[page]), pagePos+1);
						}
						if (currentArrayIndex===0){
							settings.search.$backNavButton.addClass('ui-state-disabled');
						}
						if (settings.search.matchedLinesPerPage[page] !== undefined && 
								currentArrayIndex === settings.search.matchedLinesPerPage[page].length){
							settings.search.$forwardNavButton.addClass('ui-state-disabled');
						}
					}
				}
			}
		},
		/**
     *  Devuelve, para una linea determinada, la posición en que se encuentra dentro del total de registros que se ajustan a los criterios de búsqueda
     *
     * @function getSearchCurrentRowCount
		 * @param {string} selectedRowId - Identificador del registro.
     * @example
     * $("#idTable").rup_jqtable("getSearchCurrentRowCount", "05");
     */
		getSearchCurrentRowCount : function(selectedRowId){
			var $self = this, settings = $self.data('settings'),
				page = parseInt($self.rup_jqtable('getGridParam', 'page'),10),
				currentPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
				selectedRows = $self.rup_jqtable('getSelectedRows'),
				//			rowsPerPage = parseInt($self.rup_jqtable("getGridParam", "rowNum"),10),
				selectedPagesArrayIndex,
				currentRow = jQuery.inArray(selectedRowId!==undefined?selectedRowId:selectedRows[0],currentPos[1]),
				cont=0;


			// En caso de que no se hayan seleccionado
			// Se obtiene el indice de la página actual dentro del array de páginas deseleccionadas para
			selectedPagesArrayIndex = jQuery.inArray(page, settings.search.matchedPages);

			for (var i=0;i<selectedPagesArrayIndex;i++){
				cont+=settings.search.matchedLinesPerPage[settings.search.matchedPages[i]].length;
			}

			cont+=$.inArray(currentRow+1, settings.search.matchedLinesPerPage[settings.search.matchedPages[selectedPagesArrayIndex]])+1;

			return cont;
		}
	});

	/**
	 * Métodos públicos del plugin search.
	 *
	 * Los métodos implementados son:
	 *
	 * _hasPageMatchedElements(paramPage): Devuelve true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
	 * _initializeSearchProps(settings): Se realiza la inicialización de los componentes del plugin search.
	 * _processMatchedRow(settings, matchedElem): Se gestiona el registro indicado.
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     *
     * @function _hasPageMatchedElements
		 * @private
		 * @param {string} paramPage - Identificador del registro.
		 * @return {boolean} - true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     * @example
     * $self._hasPageMatchedElements("1");
     */
		_hasPageMatchedElements: function(paramPage){
			var $self = this, settings = $self.data('settings'),
				page = (typeof paramPage ==='string'?parseInt(paramPage,10):paramPage);
			// Se comprueba si se han seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha encontrado un elemento
			return (jQuery.inArray(page, settings.search.matchedPages)!== -1);
		},
		/**
     * Se realiza la inicialización de los componentes del plugin search.
     *
     * @function _initializeSearchProps
		 * @private
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @return {boolean} - true/false dependiendo si la página tiene registros que coinciden con los criterios de búsqueda o no.
     * @example
     * $self._initializeSearchProps(settings);
     */
		_initializeSearchProps: function(settings){
			// Se almacenan en los settings internos las estructuras de control de los registros seleccionados
			if (settings.search===undefined){
				settings.search={};
			}
			// Numero de registros encontrados
			settings.search.numMatched=0;
			// Propiedades
			settings.search.matchedRowsPerPage=[];
			settings.search.matchedLinesPerPage=[];
			settings.search.matchedRows=[];
			settings.search.matchedIds=[];
			settings.search.matchedPages=[];
		},
		/**
     * Se gestiona el registro indicado.
     *
     * @function _processMatchedRow
		 * @private
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @param {object} - Referencia al elemento.
     * @example
     * $self._processMatchedRow(settings, matchedElem);
     */
		_processMatchedRow: function(settings, matchedElem){
			var lineIndex;

			if (settings.search.matchedRowsPerPage[matchedElem.page]===undefined){
				settings.search.matchedRowsPerPage[matchedElem.page]=[];
				settings.search.matchedLinesPerPage[matchedElem.page]=[];
			}
			// Se almacena el Id del registro seleccionado
			if (jQuery.inArray(matchedElem.id, settings.search.matchedIds)===-1){
				settings.search.matchedIds.push(matchedElem.id);
				settings.search.matchedRows.push({id:matchedElem.id, page:matchedElem.page});
				lineIndex = $.rup_utils.insertSorted(settings.search.matchedLinesPerPage[matchedElem.page], matchedElem.pageLine);
				settings.search.matchedRowsPerPage[matchedElem.page].splice(lineIndex,0,matchedElem.id);
				if (settings.search.matchedRowsPerPage[matchedElem.page].length>0
						&& jQuery.inArray(parseInt(matchedElem.page,10), settings.search.matchedPages)===-1){
					$.rup_utils.insertSorted(settings.search.matchedPages, parseInt(matchedElem.page,10));
				}
				settings.search.numMatched++;
			}
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************



	/**
 	* @description Propiedades de configuración del plugin search del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {string} [url=null] - Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /search).
	* @property {object} [validate] - Mediante esta propiedad es posible especificar reglas de validación que se especifican en la guía de uso del componente RUP validation.
 	*/
	jQuery.fn.rup_jqtable.plugins.search = {};
	jQuery.fn.rup_jqtable.plugins.search.defaults = {
		showGridInfoCol:true,
		search:{
			url: null,
			autosearch: false,
			beforeSearch:function(){
				return true;
			},
			defaultSearchInfoCol:{
				name: 'infoSearch', index: 'infoSearch', editable:false, width:'15em', search:false
			},
			searchOnEnter:false,
			transitionConfig:{
				duration: 0
			}
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   *  Se lanza al finalizar la creación de la linea de búsqueda de la tabla.
   *
   * @event module:rup_jqtable#rupTable_searchAfterCreateToolbar
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} $searchRow - Linea de la tabla destinada a la búsqueda.
   * @example
   * $("#idComponente").on("rupTable_searchAfterCreateToolbar", function(event, $searchRow){ });
   */

	/**
    * Evento lanzado antes de realizarse la búsqueda.
    *
    * @event module:rup_jqtable#rupTable_beforeSearch
    * @property {Event} event - Objeto Event correspondiente al evento disparado.
    * @example
    * $("#idComponente").on("rupTable_beforeSearch", function(event){ });
    */

	/**
    * Evento lanzado antes de realizarse la petición de búsqueda al servidor
    *
    * @event module:rup_jqtable#rupTable_searchBeforeSubmit.rupTable.masterDetail
    * @property {Event} event - Objeto Event correspondiente al evento disparado.
		* @property {object} postData - Objeto data que va a ser enviado en la petición.
		* @property {object} jsonData - Objeto json con los parámetros de búsqueda.
    * @example
    * $("#idComponente").on("rupTable_searchBeforeSubmit.rupTable.masterDetail", function(event, postData, jsonData){ });
    */


})(jQuery);
