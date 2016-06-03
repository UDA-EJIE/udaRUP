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

(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 * 
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 * 
	 */
	jQuery.rup_table.registerPlugin("search",{
		loadOrder:9,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("preConfigureSearch", settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("postConfigureSearch", settings);
			
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	/**
	 * Extensión del componente rup_table para permitir la gestión de la búsqueda de registros. 
	 * 
	 * Los métodos implementados son:
	 * 
	 * preConfigureSearch(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureSearch(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 * 
	 */
	jQuery.fn.rup_table("extend",{
		preConfigureSearch: function(settings){
			// Añadimos la columna por defecto para mostrar la información de registros encontrados
//			settings.colNames = $.merge([""], settings.colNames);
//			settings.colModel = $.merge([settings.search.defaultSearchInfoCol], settings.colModel);
			
			// Se configura la url de filtrado
			if (settings.search.url === null){
				settings.search.url = settings.baseUrl +"/search";
			}
			
		},
		/*
		 * Realiza la configuración interna necesaria para la gestión correcta de la edición mediante un formulario.
		 * 
		 * TODO: internacionalizar mensajes de error.
		 */
		postConfigureSearch: function(settings){
			var $self = this;
			
			$self.rup_table("createSearchRow", settings);
			$self._initializeSearchProps(settings);
			
			$self.on({
				"jqGridLoadComplete.rupTable.search": function(data){
					var page = parseInt($self.rup_table("getGridParam", "page"),10);
					
					
					if($self._hasPageMatchedElements(page)){
						$self.rup_table("highlightMatchedRowsInPage", page);
//						// TODO: Generalizar
//						$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
//						for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
//							newIndexPos = settings.search.matchedRowsPerPage[page][i];
//							$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
//						}
					}
					
					$self.rup_table("updateSearchPagination");
				},
				"jqGridSelectRow.rupTable.search rupTable_setSelection.search": function(event, id, status, obj){
					$self.rup_table("updateSearchPagination", id);
				},
				"jqGridGridComplete.rup_table.search": function(event){
					var $self = $(this), settings = $self.data("settings");
					
					if ($self.rup_grid("getGridParam","records")===0){
						settings.search.$searchRow.hide();
					}else{
						settings.search.$searchRow.show();
					}
				},
				"rupTable_searchAfterCreateToolbar": function(event, $searchRow){
					var props = $self[0].p, colModel = props.colModel, cellColModel, $elem, editOptions, searchRupType, searchEditOptions;
					
					$("th[role='columnheader']",$searchRow).each( function(i) {
						cellColModel = colModel[i];
						searchRupType = (cellColModel.searchoptions!==undefined && cellColModel.searchoptions.rupType!==undefined)?cellColModel.searchoptions.rupType:cellColModel.rupType;
						
						colModelName = cellColModel.name;
						$elem = $("[name='"+colModelName+"']",$searchRow);
						// Se añade el title de los elementos de acuerdo al colname
						$elem.attr({
							"title": props.colNames[i],
							"class": "editable customelement"
						}).removeAttr("readOnly");
				
						// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
						if(searchRupType!==undefined) {
							searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions;
							
							/*
							 * PRE Configuración de los componentes RUP
							 */ 
							switch(searchRupType){
							case "combo":
								searchEditOptions = $.extend({},{menuWidth:$elem.width()}, searchEditOptions, {width:"97%"});
								break;
							}
							
							// Invocación al componente RUP
							$elem["rup_"+searchRupType](searchEditOptions);
							
							/*
							 * POST Configuración de los componentes RUP
							 */
							switch(searchRupType){
							case "date":
								// TODO: Aplicarlo con estilos
								$elem.css("width","86%");
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
	 * fncGetSearchNavigationParams(linkType): Devuelve ls parámetros de navegación correspondientes al enlace de navegación indicado.
	 * doSearchNavigation(arrParams, execute, changePage, index, npos, newPage, newPageIndex): Realiza la navegación entre los resultados de la búsqueda.
	 * clearSearch(): Realiza un borrado de los resultados de la búsqueda.
	 * clearHighlightedMatchedRows(): Elimina el resaltado de los registros 
	 * highlightMatchedRowsInPage(page): Realiza el resaltado de los resultados de los registros para la página indicada.
	 * highlightMatchedRow($row): Resalta la línea indicada.
	 * updateSearchPagination(paramRowId): Actualiza los controles de paginación del formulario de búsqueda. 
	 * getSearchCurrentRowCount(): Devuelve el resgistro actual en el que se encuentra el registro seleccionado respecto al conjunto de resultados.
	 * 
	 */
	jQuery.fn.rup_table("extend",{
		toggleSearchForm: function(){
			var $self = this, settings = $self.data("settings"), prop = $self[0].p, trow, trow2;
			
			if (!settings.search.created){
				$self.rup_table("createSearchToolbar");
				settings.search.$collapseIcon.removeClass("ui-icon-triangle-1-e");
				settings.search.$collapseIcon.addClass("ui-icon-triangle-1-s");
				jQuery("#searchNavLayer_"+settings.id).show();
				settings.search.created = true;
				jQuery("input","table thead tr.ui-search-toolbar").keypress(function(e){
					var key = e.charCode || e.keyCode || 0;
					if(key == 13){
						$self.rup_table("search");
						return false;
					}
					return this;
				});
			}else{
				trow = jQuery("tr.ui-search-toolbar",$self[0].grid.hDiv);
				trow2 = prop.frozenColumns === true ?  jQuery("tr.ui-search-toolbar", $self[0].grid.fhDiv) : false;
				if(jQuery("tr.ui-search-toolbar","#gview_"+settings.id).is(":visible")){
					trow.hide(settings.search.transitionConfig); 
					if(trow2) {
						trow2.hide(settings.search.transitionConfig);
					}
					jQuery("#searchNavLayer_"+settings.id).hide(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass("ui-icon-triangle-1-s");
					settings.search.$collapseIcon.addClass("ui-icon-triangle-1-e");
				}else{
					trow.show(settings.search.transitionConfig); 
					if(trow2) {
						trow2.show(settings.search.transitionConfig);
					}
					jQuery("#searchNavLayer_"+settings.id).show(settings.search.transitionConfig);
					settings.search.$collapseIcon.removeClass("ui-icon-triangle-1-e");
					settings.search.$collapseIcon.addClass("ui-icon-triangle-1-s");
				}
				
			}
		},
		createSearchToolbar: function(){
			var $self = this, settings =  $self.data("settings"), prop = $self[0].p,
			$searchRow = jQuery("<tr>").attr({
				"class":"ui-search-toolbar",
				"role":"rowheader"
			});
			
			
			if (jQuery("table thead tr:first th[id='"+settings.id+"_cb']",$self[0].grid.hDiv).length!==0){
				$searchRow.append(jQuery("<th>").attr({
					"role":"columnheader",
					"class":"search_row_header ui-th-column ui-th-"+prop.direction
				}));
			}
			$searchRow.append(jQuery("<th>").attr({
				"role":"columnheader",
				"class":"search_row_header ui-th-column ui-th-"+prop.direction
			}));
			
			$.each(prop.colModel,function(index, colM){
				var $searchHeader = jQuery("<th>").attr({
					"role":"columnheader",
					"class":"search_row_header ui-th-column ui-th-"+prop.direction
				}), elc, $elc;
				
				if(colM.hidden===true) { 
					$searchHeader.css("display","none");
				}
				colM.search = colM.search === false ? false : true;
				if(colM.stype === undefined) {
					colM.stype= colM.edittype!==undefined?colM.edittype:"text";
					if (colM.searchoptions !== undefined && colM.searchoptions.rupType==="combo"){
						colM.stype = "text";
					}
				}
				soptions = $.extend({},colM.searchoptions || colM.editoptions || {}, {id:colM.name,name:colM.name});
				if(colM.search){
					elc = $.jgrid.createEl.call($self[0],colM.stype!==undefined?colM.stype:colM.edittype,soptions,"",true,$.extend({},$.jgrid.ajaxOptions,soptions.ajaxSelectOptions || {}));
					$elc=jQuery(elc);
					$elc.css("width","97%");
//					$searchCol.append($elc);
					$searchHeader.append($elc);
				}
				if (colM.name !==settings.defaultGridInfoCol.name && colM.name !== settings.defaultGridMultiplePkCol.name && colM.name !== 'cb'){
					$searchRow.append($searchHeader);
				}
			});
			$("table thead",$self[0].grid.hDiv).append($searchRow);
			
			settings.search.$searchRowInputs = jQuery("table thead tr.ui-search-toolbar","#gview_"+settings.id);
			settings.search.$searchRowInputs.attr({
				"id":settings.id+"_search_rowInputs",
				"form":settings.id+"_search_rowInputs"
			});
			
			
			// Configuración de validaciones
			if (settings.search.validate!==undefined){
				settings.search.$searchForm.rup_validate(settings.search.validate);
				
				$self.on({
					"rupTable_beforeSearch.search.validate": function(){
						return settings.search.$searchForm.valid();
					}
				});
			}
			
			$self.triggerHandler("rupTable_searchAfterCreateToolbar", [$searchRow]);
			
			$self[0].ftoolbar = true;
			
			
		},
		createSearchRow: function(settings){
			var $self = this, 
			$gridHead = jQuery("table thead","#gview_"+settings.id),
			searchForm,
			// Templates
			searchRowHeaderTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.searchRowHeader"),
			collapseLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.collapseLayer"),
			collapseIconTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.collapseIcon"),
			collapseLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.collapseLabel"),
			matchedLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.matchedLayer"),
			matchedLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.matchedLabel"),
			navLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.navLayer"),
			navLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.navLink"),
			navSearchButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.navSearchButton"),
			navClearLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.navClearLink"),
			
			// Objetos
			$searchRow = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.templates.search.searchRow")),
			$searchRowHeader = $(jQuery.jgrid.format(searchRowHeaderTmpl, $gridHead.find("th").length)),
			// Capa que controla el colapso del formualario
			$collapseLayer = $(jQuery.jgrid.format(collapseLayerTmpl, "searchCollapseLayer_"+settings.id)),
			$collapseIcon = $(jQuery.jgrid.format(collapseIconTmpl, "searchCollapseIcon_"+settings.id)),
			$collapseLabel = $(jQuery.jgrid.format(collapseLabelTmpl, "searchCollapsLabel_"+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.plugins.search.searchCriteria")));
			// Capa que muestra el número de ocurrencias
			$matchedLayer = $(jQuery.jgrid.format(matchedLayerTmpl, "matchedLayer_"+settings.id)),
			$matchedLabel = $(jQuery.jgrid.format(matchedLabelTmpl, "matchedLabel_"+settings.id, jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.plugins.search.matchedRecords"),0))),
			
			// Capa que controla la navegación entre las diferentes ocurrencias
			$navLayer = $(jQuery.jgrid.format(navLayerTmpl, "searchNavLayer_"+settings.id)),
			$firstNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_first_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.first"))),
			$backNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_back_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.previous"))),
			$forwardNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_forward_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.next"))),
			$lastNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_last_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.last"))),
			$navSearchButton = $(jQuery.jgrid.format(navSearchButtonTmpl, 'search_nav_button_'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.search.Find")));
			$navClearLink = $(jQuery.jgrid.format(navClearLinkTmpl, 'search_nav_clear_link'+settings.id, jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.search.Reset")));

			// Construcción del objeto final
			$collapseLayer.append($collapseIcon).append($collapseLabel);
			$matchedLayer.append($matchedLabel);
			$navLayer.append($firstNavLink).append($backNavLink).append($forwardNavLink).append($lastNavLink).append($navSearchButton).append($navClearLink);
			
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
			settings.search.$firstNavLink = $firstNavLink;
			settings.search.$backNavLink = $backNavLink;
			settings.search.$forwardNavLink = $forwardNavLink;
			settings.search.$lastNavLink = $lastNavLink;
			
			// Creacion del enlace de mostrar/ocultar el formulario
			$collapseIcon.add($collapseLabel).on("click", function(){
				$self.rup_table("toggleSearchForm");
			});
			
			// Evento de búsqueda asociado al botón
			$navSearchButton.on("click", function(){
				$self.rup_table("search");
			});
			
			// Evento asociado a limpiar el fomulario de búsqueda
			$navClearLink.on("click", function(){
				$self.rup_table("clearSearch");
			});
			
			$navLayer.hide();
			
			function doSearchLinkNavigation($link, linkId){
				if (!$link.hasClass("ui-state-disabled")){
					$self.rup_table("navigateToMatchedRow", linkId);
				}
			}
			
			// Elemento primero
			$firstNavLink.on("click", function(){
				doSearchLinkNavigation(jQuery(this), 'first');
			});
			
			// Elemento anterior
			$backNavLink.on("click", function(){
				doSearchLinkNavigation(jQuery(this), 'prev');
			});
			
			// Elemento siguiente
			$forwardNavLink.on("click", function(){
				doSearchLinkNavigation(jQuery(this), 'next');
			});
			
			// Elemento ultimo
			$lastNavLink.on("click", function(){
				doSearchLinkNavigation(jQuery(this), 'last');
			});
			
			// Se recubre con un form
			$searchForm = jQuery("<form>").attr("id",settings.id+"_search_searchForm");
			settings.search.$searchRow.parent().parent().wrap($searchForm);
			settings.search.$searchForm = jQuery("#"+settings.id+"_search_searchForm");
			settings.search.$searchRow.hide();
			
		},
		navigateToMatchedRow: function(matchedRow){
			var $self = this, retNavParams  = $self.rup_table("fncGetSearchNavigationParams", matchedRow);
			$self.rup_table("doSearchNavigation", retNavParams);
		},
		search : function(){
			var $self = this,
			settings = $self.data("settings"); 
			
			var bfr = $self.triggerHandler("rupTable_beforeSearch");
			if (bfr === false || bfr === 'stop') { return; }
			
			if ($.isFunction(settings.search.beforeSearch)) {
				bfr = settings.search.beforeSearch.call($self);
				if(bfr === undefined) { bfr = true; }
				if ( bfr === false ) { return; }
			}
			
			$self.rup_table("doSearch");
		},
		doSearch: function(){
			var $self = this, settings = $self.data("settings"),ret, jsonData={},
			page = parseInt($self.rup_table("getGridParam", "page"),10),
			postData =$self.rup_table("getGridParam","postData");
//			jsonData.filterParams =$self.rup_table("getGridParam","postData"),
			jsonData.filter = $self.rup_table("getFilterParams");
			jsonData.search = form2object(settings.search.$searchRowInputs[0]);
			$self._initializeSearchProps(settings);
			
			ret = $self.triggerHandler("rupTable_searchBeforeSubmit.rupTable.masterDetail",[postData, jsonData]);	
			
			if (ret===false){return false;}
			
			jQuery.rup_ajax({
				url: settings.search.url,
				type:"POST",
				dataType:"json",
				data: jQuery.toJSON($.extend(true, {}, postData, jsonData)),
				contentType: 'application/json', 
				success: function(xhr,b,c){
					rowsPerPage = parseInt($self.rup_table("getGridParam", "rowNum"),10);
					
					if (xhr.length===0){
						$self._initializeSearchProps(settings);
						$self.rup_table("updateSearchPagination");
						$self.rup_table("clearHighlightedMatchedRows");
					}else{
						jQuery.each(xhr, function(index, elem){
//							if (settings.primaryKey.length>1){
								var retValue="";
								for (var i=0;i<settings.primaryKey.length;i++){
									retValue+=elem.pk[settings.primaryKey[i]]+settings.multiplePkToken;
								}
								elem["id"] = retValue.substr(0, retValue.length-1);
//							}
							
							elem.page = Math.ceil(elem.tableLine / rowsPerPage);
							elem.pageLine = elem.tableLine - ((elem.page-1)*rowsPerPage);
							$self._processMatchedRow(settings, elem);
						});
						$self.trigger("rupTableSearchSuccess");
						$self.rup_table("goToFirstMatched", page);
					}
				}
			});
		},
		goToFirstMatched: function(paramPage){
			var $self = this, settings = $self.data("settings"),
			page = (typeof paramPage ==="string"?parseInt(paramPage,10):paramPage);
			
			if ($self._hasPageMatchedElements(page)){
				// TODO: Generalizar
//				$self.find("td[aria-describedby='"+settings.id+"_infoSearch'] img.ui-icon.ui-icon-search").remove();
//				for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
//					newIndexPos = settings.search.matchedRowsPerPage[page][i];
//					$($self.jqGrid("getInd",newIndexPos, true)).find("td[aria-describedby='"+settings.id+"_infoSearch']").html($("<img/>").addClass("ui-icon ui-icon-search")[0]);
//				}
				
				$self.rup_table("setSelection", settings.search.matchedRowsPerPage[page][0], true);
				$self.rup_table("highlightMatchedRowsInPage", page);
				
			}else{
				$self.rup_table("navigateToMatchedRow", 'first');
			}
			
			
		},
		fncGetSearchNavigationParams : function(linkType){
			var $self = this, settings = $self.data("settings"), execute = false, changePage = false, index=0, newPageIndex=0,
			npos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
			page = parseInt($self.rup_table("getGridParam", "page"),10),
			newPage=page,
			activeLineId,
//			lastPage = parseInt(Math.ceil($self.rup_table("getGridParam", "records")/$self.rup_table("getGridParam", "rowNum")),10),
			currentArrayIndex, selectedLines, pageArrayIndex;
			
			$self.trigger("rupTableAfterSearchNav",[linkType]);
			
			npos[0] = parseInt(npos[0],10);
			
			activeLineId = $self.rup_table("getActiveLineId");
			
			$("#"+settings.formEdit.feedbackId, settings.$detailForm).hide();
			switch (linkType){
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
			
			return [linkType, execute, changePage, index-1, npos, newPage, newPageIndex-1];
		},
		doSearchNavigation: function(arrParams, execute, changePage, index, npos, newPage, newPageIndex ){
			var $self = this, settings = $self.data("settings"), execute, changePage, index, newPage, newPageIndex, indexAux, ret, actualRowId, rowId;
			
			if ($.isArray(arrParams)){
				linkType = arrParams[0];
				execute = arrParams[1];
				changePage = arrParams[2];
				index = arrParams[3];
				npos = arrParams[4];
				newPage = arrParams[5];
				newPageIndex = arrParams[6];
				
				if (execute){
					$self.rup_table("hideFormErrors", settings.$detailForm);
//					$self.triggerHandler("jqGridAddEditClickPgButtons", [linkType, settings.$detailForm, npos[1][npos[index]]]);
					pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
					
//					actualRowId = npos[1][npos[0]];
					actualRowId = $self.rup_table("getActiveRowId");
					
//					ret = $self.triggerHandler("rupTable_searchNavigation_deselect", actualRowId);
//					if (ret!==false){
					$row = jQuery($self.jqGrid("getInd", actualRowId, true));
					if ($row.data("tmp.search.notToDeselect")!=="true"){
						$self.rup_table("setSelection", actualRowId, false);
						if ($row.data("tmp.search.notToDeselect")!==undefined){
							delete $row.data("tmp.search.notToDeselect");
						}
					}
					
					if (changePage){
//						$self.jqGrid("setSelection", pagePos[1][pagePos[0]], false);
						$self.trigger("reloadGrid",[{page: newPage}]);
						$self.on("jqGridAfterLoadComplete.rupTable.serach.pagination",function(event,data){
							indexAux = jQuery.inArray(newPageIndex+1, settings.search.matchedLinesPerPage[newPage]);
							
							rowId = settings.search.matchedRowsPerPage[parseInt(data.page,10)][indexAux];
							
							$row = jQuery($self.jqGrid("getInd", rowId, true));
							if ($row.attr("aria-selected")==="true"){
								$row.data("tmp.search.notToDeselect","true");
							}
							
							$self.rup_table("setSelection", rowId, true);

							$self.off("jqGridAfterLoadComplete.rupTable.serach.pagination");
						});
					}else{
						indexAux = jQuery.inArray(index+1, settings.search.matchedLinesPerPage[newPage]);
						
						rowId = settings.search.matchedRowsPerPage[newPage][indexAux];
						
						$row = jQuery($self.jqGrid("getInd", rowId, true));
						if ($row.attr("aria-selected")==="true"){
							$row.data("tmp.search.notToDeselect","true");
						}
						
						$self.rup_table("setSelection", rowId, true);
					}
				}
			}
		},
		clearSearch: function(){
			var $self = this, settings = $self.data("settings");
			$self._initializeSearchProps(settings);
			$self.rup_table("updateSearchPagination");
			$self.rup_table("clearHighlightedMatchedRows");
			jQuery("input,textarea","#gview_"+settings.id+" table thead tr.ui-search-toolbar").val("");
			jQuery("table thead tr.ui-search-toolbar [ruptype='combo']","#gview_"+settings.id).rup_combo("clear");
		},
		clearHighlightedMatchedRows: function(){
			var $self = this, settings = $self.data("settings");
			$self.find("td[aria-describedby='"+settings.id+"_rupInfoCol'] span.ui-icon.ui-icon-search").removeClass("ui-icon-search");
		},
		highlightMatchedRowsInPage:function(page){
			var $self = this, settings = $self.data("settings"), internalProps = $self[0].p, $row;
			
			$self.rup_table("clearHighlightedMatchedRows");
			
			
			for (var i=0;i<settings.search.matchedRowsPerPage[page].length;i++){
				newIndexPos = settings.search.matchedRowsPerPage[page][i];
				$row = $($self.jqGrid("getInd",newIndexPos, true));
				$self.rup_table("highlightMatchedRow", $row);
//				if (i==0){
//					internalProps.selarrrow.push($row[0].id);
//					internalProps.selrow = $row[0].id;
//				}
			}
		}, 
		highlightMatchedRow: function($row){
			var $self = this, settings = $self.data("settings");
			$row.find("td[aria-describedby='"+settings.id+"_rupInfoCol'] span").addClass("ui-icon ui-icon-rupInfoCol ui-icon-search");
		},
		updateSearchPagination:function(paramRowId){
			var $self = this, settings = $self.data("settings"),
			rowId, pagePos, currentArrayIndex,
			page = parseInt($self.rup_table("getGridParam", "page"),10),
			numMatched, formatter = $.jgrid.formatter.integer;
			
			if (paramRowId!==undefined){
				rowId = paramRowId;
			}else{
				pagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
				rowId = (pagePos[0]!==-1?pagePos[1][pagePos[0]-1]:-1);
			}
			
			if (settings.search.numMatched===0){
				settings.search.$firstNavLink.add(settings.search.$backNavLink).add(settings.search.$forwardNavLink).add(settings.search.$lastNavLink).addClass("ui-state-disabled");
				settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.plugins.search.matchedRecords"),"0"));
			}else if (rowId!==-1){
				// Comprobamos si el registro seleccionado es uno de los resultados de la busqueda
				if (jQuery.inArray(rowId, settings.search.matchedRowsPerPage[page])!==-1){
					// Calculamos el 
					numMatched = $self.rup_table("getSearchCurrentRowCount", rowId);
					
					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.plugins.search.matchedRecordsCount"),$.fmatter.util.NumberFormat(numMatched,formatter), $.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}
					
					if (numMatched===1){
						settings.search.$firstNavLink.addClass("ui-state-disabled");
						settings.search.$backNavLink.addClass("ui-state-disabled");
					}else{
						settings.search.$firstNavLink.removeClass("ui-state-disabled");
						settings.search.$backNavLink.removeClass("ui-state-disabled");
					}
					
					if (numMatched===settings.search.numMatched){
						settings.search.$lastNavLink.addClass("ui-state-disabled");
						settings.search.$forwardNavLink.addClass("ui-state-disabled");
					}else{
						settings.search.$lastNavLink.removeClass("ui-state-disabled");
						settings.search.$forwardNavLink.removeClass("ui-state-disabled");
					}
					
				}else{
					if (settings.search && settings.search.numMatched){
						settings.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_table.plugins.search.matchedRecords"),$.fmatter.util.NumberFormat(settings.search.numMatched,formatter)));
					}
					settings.search.$firstNavLink.removeClass("ui-state-disabled");
					settings.search.$backNavLink.removeClass("ui-state-disabled");
					settings.search.$forwardNavLink.removeClass("ui-state-disabled");
					settings.search.$lastNavLink.removeClass("ui-state-disabled");
					
					// Miramos a ver si desde la posición actual hay anterior
					if (jQuery.inArray(settings.search.matchedPages, page) > 0){
						settings.search.$backNavLink.removeClass("ui-state-disabled");
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)===0){
						// Anterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$backNavLink.addClass("ui-state-disabled");
						settings.search.$firstNavLink.addClass("ui-state-disabled");
					}else if (jQuery.inArray(page, settings.search.matchedPages) === -1 && $.rup_utils.insertSorted($.merge([],settings.search.matchedPages), page)>=settings.search.matchedPages.length){
						// Posterior a las páginas en las que se han encontrado ocurrencias
						settings.search.$forwardNavLink.addClass("ui-state-disabled");
						settings.search.$lastNavLink.addClass("ui-state-disabled");
					}else{
						pagePos = $self.rup_table("getActiveLineId");
						currentArrayIndex = $.rup_utils.insertSorted($.merge([],settings.search.matchedLinesPerPage[page]), pagePos+1);
						if (currentArrayIndex===0){
							settings.search.$backNavLink.addClass("ui-state-disabled");
						}
						if (currentArrayIndex === settings.search.matchedLinesPerPage[page].length){
							settings.search.$forwardNavLink.addClass("ui-state-disabled");
						}
					}
				}
			}
		},
		getSearchCurrentRowCount : function(selectedRowId){
			var $self = this, settings = $self.data("settings"),
			page = parseInt($self.rup_table("getGridParam", "page"),10),
			currentPos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])(),
			selectedRows = $self.rup_table("getSelectedRows"),
//			rowsPerPage = parseInt($self.rup_table("getGridParam", "rowNum"),10),
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
	jQuery.fn.rup_table("extend",{
		_hasPageMatchedElements: function(paramPage){
			var $self = this, settings = $self.data("settings"),
			page = (typeof paramPage ==="string"?parseInt(paramPage,10):paramPage);
			// Se comprueba si se han seleccionado todos los registros de la tabla
				// Comprobamos si en la página indicada se ha encontrado un elemento
			return (jQuery.inArray(page, settings.search.matchedPages)!== -1);
		},
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
	
		
	// Parámetros de configuración por defecto para la acción de eliminar un registro.
	jQuery.fn.rup_table.plugins.search = {};
	jQuery.fn.rup_table.plugins.search.defaults = {
			showGridInfoCol:true,
			search:{
				url: null,
				autosearch: false,
				beforeSearch:function(){
					return true;
				},
				defaultSearchInfoCol:{
					name: "infoSearch", index: "infoSearch", editable:false, width:"15em", search:false
				},
				searchOnEnter:false,
				transitionConfig:{
					duration: 0
				}
			}
	};
	
	
})(jQuery);