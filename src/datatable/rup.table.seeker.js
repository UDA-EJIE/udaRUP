/**
  * Buscador interno del datatable
  *
  * @summary 		Extensión del componente RUP Datatable
  * @module			"rup.table.seeker"
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

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


// Version information for debugger
DataTable.seeker = {};

DataTable.seeker.version = '1.2.4';

/**
 * 
* Se inicializa el componente seeker
*
* @name init
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
*
*/
DataTable.seeker.init = function ( dt ) {

	var ctx = dt.settings()[0];
	//Se inicializa por cada instancia 1 tabla 1 instancia
	ctx.seeker = {};
	_createFilterColumn(dt,ctx);

	var ajaxOptions = {
			url : ctx.oInit.urlBase+'/search',
			accepts: {'*':'*/*','html':'text/html','json':'application/json, text/javascript',
				'script':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
				'text':'text/plain','xml':'application/xml, text/xml'},
			type : 'POST',
			data : _getDatos(ctx),
			dataType : 'json',
			showLoading : false,
			contentType : 'application/json',
			async : true,
			success : function(data, status, xhr) {
				$('#'+ctx.sTableId).triggerHandler('tableSeekerSearchSucess');
				ctx.seeker.search.funcionParams = data;
				ctx.seeker.search.pos = 0;// se inicializa por cada busqueda.
				_processData(dt,ctx,data);
			},
			error : function(xhr, ajaxOptions,thrownError) {
				console.log('Errors '+thrownError+ ": "+xhr.responseText);
				$('#'+ctx.sTableId).triggerHandler('tableSeekerSearchError');

			},
			complete:function(xhr,status){
				$('#'+ctx.sTableId).triggerHandler('tableSeekerSearchComplete');
			}
		};

	ctx.seeker.ajaxOption = ajaxOptions;

	//Ver el buscador interno de la tabla.
	if(ctx.fnRecordsTotal() === 0){
		ctx.seeker.search.$searchRow.hide();
	}else{
		ctx.seeker.search.$searchRow.show();
	}
	
	$('#'+ctx.sTableId).triggerHandler('tableSeekerAfterCreateToolbar');
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Local functions
 */

function _eventTrigger ( api, type, args, any )
{
	if ( any && ! api.flatten().length ) {
		return;
	}

	if ( typeof type === 'string' ) {
		type = type +'.dt';
	}

	args.unshift( api );

	$(api.table().node()).trigger( type, args );
}
/**
* Crea los componentes principales del buscador.
*
* @name createFilterColumn
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
* @param {object} ctx - Es el contecto del datatable donde esta la configuración del mismo.
*
*/
function _createFilterColumn(dt,ctx){

	var idTabla = ctx.sTableId;
	$('#'+idTabla+' tfoot').css('display','table-header-group');
		$('#'+idTabla+' tfoot th').each( function () {
			var title = $(this).text();
			var index = $(this).index();
			
			if(index > 0 || ctx.oInit.multiSelect === undefined){
				
				var colModelIndex = index;
				var position = index + 1;
				
				if(ctx.oInit.multiSelect != undefined) {
					colModelIndex--;
				}
				
				// Comprobamos si queremos deshabilitar la búsqueda de la columna
				if(ctx.oInit.seeker.colModel != undefined && ctx.oInit.seeker.colModel[colModelIndex].hidden) {
					$(this).empty();
				} else {
					var nombre = $('#'+idTabla+' thead th:nth-child('+position+')').attr('data-col-prop');
					$(this).html( '<input type="text" placeholder="'+title+'" name="'+nombre+'" id="'+nombre+'_seeker"/>' );
				}
			}
		} );


	   dt.columns().eq(0).each(function(colIdx) {
		   if(colIdx > 0){
		        $( 'input', $('#'+idTabla+' tfoot')[0].rows[0].cells[colIdx] ).on( 'keypress', function (ev) {
		        	this.focus();
		        	if (ev.keyCode === 13 && this.value !== '') { //Se hace la llamada de busqueda.
		        		ctx.seeker.ajaxOption.data = _getDatos(ctx);
		        		var ajaxOptions =  $.extend(true, [], ctx.seeker.ajaxOption);
		        		//Se pasa sin el internalFeedback ya que no es necesario.
		        		if(ajaxOptions.data.multiselection !== undefined && ajaxOptions.data.multiselection.internalFeedback !== undefined){
		        			ajaxOptions.data.multiselection.internalFeedback = [];
		        		}
		        		$('#'+ctx.sTableId).triggerHandler('tableSeekerBeforeSearch');
		        		$('#'+idTabla+'_search_searchForm').rup_form('ajaxSubmit', ajaxOptions);
		        		$('#'+ctx.sTableId).triggerHandler('tableSeekerAfterSearch');

		        	}
		        } );
		   }
	   });

	   _createSearchRow(dt,ctx);
	   ctx.seeker.searchForm = $('#'+idTabla+' tfoot tr:nth-child(2)');
	   ctx.seeker.searchForm.hide();
	   _createRupComponent(dt,ctx);
}
/**
* Genera la barra de controles para gestionar la búsqueda..
*
* @name createSearchRow
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
* @param {object} ctx - Es el contexto del datatable donde esta la configuración del mismo.
*
*/
function _createSearchRow (dt,ctx){
		var idTabla = ctx.sTableId;
		var	$gridHead = jQuery('tfoot','#'+idTabla),
			// Templates
			searchRowHeaderTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.searchRowHeader'),
			collapseLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.collapseLayer'),
			collapseIconTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.collapseIcon'),
			collapseLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.collapseLabel'),
			matchedLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.matchedLayer'),
			matchedLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.matchedLabel'),
			navLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.navLayer'),
			navButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.navButton'),
			navSearchButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.navSearchButton'),
			navClearButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.navClearButton'),

			// Objetos
			$searchRow = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.templates.search.searchRow')),
			$searchRowHeader = $(jQuery.jgrid.format(searchRowHeaderTmpl, $gridHead.find('th').length)),
			// Capa que controla el colapso del formualario
			$collapseLayer = $(jQuery.jgrid.format(collapseLayerTmpl, 'searchCollapseLayer_'+idTabla)),
			$collapseIcon = $(jQuery.jgrid.format(collapseIconTmpl, 'searchCollapseIcon_'+idTabla)),
			$collapseLabel = $(jQuery.jgrid.format(collapseLabelTmpl, 'searchCollapsLabel_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.plugins.search.searchCriteria'))),
			// Capa que muestra el número de ocurrencias
			$matchedLayer = $(jQuery.jgrid.format(matchedLayerTmpl, 'matchedLayer_'+idTabla)),
			$matchedLabel = $(jQuery.jgrid.format(matchedLabelTmpl, 'matchedLabel_'+idTabla, jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.plugins.search.matchedRecords'),0))),

			// Capa que controla la navegación entre las diferentes ocurrencias
			$navLayer = $(jQuery.jgrid.format(navLayerTmpl, 'searchNavLayer_'+idTabla)),
			$firstNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_first_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.first'))),
			$backNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_back_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.previous'))),
			$forwardNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_forward_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.next'))),
			$lastNavButton = $(jQuery.jgrid.format(navButtonTmpl, 'search_nav_last_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.last'))),
			$navSearchButton = $(jQuery.jgrid.format(navSearchButtonTmpl, 'search_nav_button_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.search.Find'))),
			$navClearButton = $(jQuery.jgrid.format(navClearButtonTmpl, 'search_nav_clear_button'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.search.Reset')));

		// Construcción del objeto final
		$collapseLayer.append($collapseIcon).append($collapseLabel);
		$matchedLayer.append($matchedLabel);
		$navLayer.append($firstNavButton).append($backNavButton).append($forwardNavButton).append($lastNavButton).append($navSearchButton).append($navClearButton);

		$searchRowHeader.append($collapseLayer);
		$searchRowHeader.append($matchedLayer);
		$searchRowHeader.append($navLayer);

		$searchRow.append($searchRowHeader);

		$gridHead.prepend($searchRow);
		jQuery('tfoot tr.search_row','#'+idTabla+'').addClass('ui-state-default');

		ctx.seeker.search = ctx.seeker.search  || {};

		ctx.seeker.search.created = false;

		ctx.seeker.search.$collapseIcon = $collapseIcon;
		ctx.seeker.search.$searchRow = $searchRow;
		ctx.seeker.search.$matchedLabel = $matchedLabel;
		ctx.seeker.search.$firstNavButton = $firstNavButton;
		ctx.seeker.search.$backNavButton = $backNavButton;
		ctx.seeker.search.$forwardNavButton = $forwardNavButton;
		ctx.seeker.search.$lastNavButton = $lastNavButton;

		// Creacion del enlace de mostrar/ocultar el formulario
		$collapseIcon.add($collapseLabel).on('click', function(){
			if (!ctx.seeker.search.created){
				ctx.seeker.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
				ctx.seeker.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				ctx.seeker.search.created = true;
				ctx.seeker.searchForm.show();
				$navLayer.show();
			}else{
				ctx.seeker.search.$collapseIcon.removeClass('ui-icon-triangle-1-s');
				ctx.seeker.search.$collapseIcon.addClass('ui-icon-triangle-1-e');
				ctx.seeker.search.created = false;
				ctx.seeker.searchForm.hide();
				$navLayer.hide();
			}
		});

		// Evento de búsqueda asociado al botón
		$navSearchButton.on('click', function(){
			$('#'+ctx.sTableId).triggerHandler('tableSeekerBeforeSearch');
			ctx.seeker.ajaxOption.data = _getDatos(ctx);
    		var ajaxOptions =  $.extend(true, [], ctx.seeker.ajaxOption);
    		//Se pasa sin el internalFeedback ya que no es necesario.
    		if(ajaxOptions.data.multiselection !== undefined && ajaxOptions.data.multiselection.internalFeedback !== undefined){
    			ajaxOptions.data.multiselection.internalFeedback = [];
    		}
    		$('#'+ctx.sTableId).triggerHandler('tableSeekerBeforeSearch');
    		$('#'+idTabla+'_search_searchForm').rup_form('ajaxSubmit',ajaxOptions);
    		$('#'+ctx.sTableId).triggerHandler('tableSeekerAfterSearch');
		});

		// Evento asociado a limpiar el fomulario de búsqueda
		$navClearButton.on('click', function(){
			_limpiarSeeker(dt,ctx);
		});

		$navLayer.hide();

		function doSearchButtonNavigation($button, buttonId){
			if (!$button.hasClass('ui-state-disabled')){
				$self.rup_table('navigateToMatchedRow', buttonId);
			}
		}

		// Elemento primero
		$firstNavButton.on('click', function(){
			ctx.seeker.search.pos = 0;
			_processData(dt,ctx,ctx.seeker.search.funcionParams);
		});

		// Elemento anterior
		$backNavButton.on('click', function(){
			ctx.seeker.search.pos--;
			_processData(dt,ctx,ctx.seeker.search.funcionParams);
		});

		// Elemento siguiente
		$forwardNavButton.on('click', function(){
			ctx.seeker.search.accion = 'next';
			ctx.seeker.search.pos++;
			_processData(dt,ctx,ctx.seeker.search.funcionParams);
		});

		// Elemento ultimo
		$lastNavButton.on('click', function(){
			ctx.seeker.search.pos = ctx.seeker.search.funcionParams.length-1;
			_processData(dt,ctx,ctx.seeker.search.funcionParams);
		});

		// Se recubre con un form
		var $searchForm = jQuery('<form>').attr('id',idTabla+'_search_searchForm');

		ctx.seeker.search.$searchForm = jQuery('#'+idTabla+'_search_searchForm');
		ctx.seeker.search.$searchRow.hide();
        $('#'+idTabla).wrapAll($searchForm);
        ctx.seeker.search.pos = 0;
        ctx.seeker.search.accion = '';
}

/**
* Selecciona con la lupa los rows seleccionados. Una vez se han encontrado.
*
* @name selectSearch
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
* @param {object} ctx - Es el contecto del datatable donde esta la configuración del mismo.
* @param {object} rows - Filas del datatable de la página actual.
*
*/
function _selectSearch(dt,ctx,rows){
	//Se limina el lapicero indicador.
	$('#'+ctx.sTableId+' tbody tr td.select-checkbox span.ui-icon-search').remove();
	$('#'+ctx.sTableId+' tbody tr td span.ui-icon-search').remove();

	//se añade el span con la lupa
	if(rows.length > 0 && ctx.fnRecordsTotal() > 0){
		//Se selecciona el primero y se limpian los datos.
		var rowSelected = '';

		$.each(ctx.json.rows, function( idx ,value) {
			if(rows[ctx.seeker.search.pos].pageLine-1 === idx){
				rowSelected = dt.rows().nodes()[idx];
			}
			var result = $.grep(rows, function(v) {
				return DataTable.Api().rupTable.getIdPk(v.pk) === DataTable.Api().rupTable.getIdPk(value);
			});
			if(result.length === 1){
				var spanSearch = $("<span/>").addClass('ui-icon ui-icon-rupInfoCol ui-icon-search filtered-row');
				if(ctx.oInit.multiSelect !== undefined){
					$($('#'+ctx.sTableId+' tbody tr td.select-checkbox')[idx]).append(spanSearch);
				}else if(ctx.oInit.select !== undefined){
					$($('#'+ctx.sTableId+' tbody tr td:nth-child(1)')[idx]).append(spanSearch);
				}
			}
		});
		var rowUnique = rows[ctx.seeker.search.pos];
		var rowList = ctx.json.rows[rowUnique.pageLine-1];
		if(rowSelected !== '' && rowSelected.className.indexOf('selected') < 0 && rowUnique.page === Number(ctx.json.page)
				&& DataTable.Api().rupTable.getIdPk(rowUnique.pk) === DataTable.Api().rupTable.getIdPk(rowList) &&
				(ctx.oInit.formEdit === undefined || ctx.oInit.formEdit.$navigationBar.funcionParams === undefined || ctx.oInit.formEdit.$navigationBar.funcionParams.length === undefined)){//si no esta ya seleccionada.
			if(ctx.oInit.multiSelect !== undefined){
				dt['row'](rowUnique.pageLine-1).multiSelect();
			}else if(ctx.oInit.select !== undefined){
				DataTable.Api().select.selectRowIndex(dt,rowUnique.pageLine);
			}
		}
		ctx.seeker.search.accion = '';
	}
	$('#'+ctx.sTableId).trigger('selected.rup.dt');
}

/**
* Metodo para saber si hay que paginar o no.
*
* @name paginar
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} ctx - Es el contexto del datatable donde esta la configuración del mismo.
* @param {object} dato - Son los datos de las filas que viene del controller..
*
*/
function _paginar(ctx,dato){
	var paginar = false;
	if(dato !== undefined && dato.page !== Number(ctx.json.page)){
		paginar = true;
	}

	return paginar;
}

/**
* Actualiza la navegación del seeker.
*
* @name updateDetailSeekPagination
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {integer} currentRowNum - Número de la posción actual del registro selecionado.
* @param {integer} totalRowNum - Número total de registros seleccionados.
*
*/
function _updateDetailSeekPagination(currentRowNum,totalRowNum,ctx){

	if (currentRowNum === 1) {
		ctx.seeker.search.$firstNavButton.addClass('ui-state-disabled');
		ctx.seeker.search.$backNavButton.addClass('ui-state-disabled');
	} else {
		ctx.seeker.search.$firstNavButton.removeClass('ui-state-disabled');
		ctx.seeker.search.$backNavButton.removeClass('ui-state-disabled');
	}
	if (currentRowNum === totalRowNum) {
		ctx.seeker.search.$forwardNavButton.addClass('ui-state-disabled');
		ctx.seeker.search.$lastNavButton.addClass('ui-state-disabled');
	} else {
		ctx.seeker.search.$forwardNavButton.removeClass('ui-state-disabled');
		ctx.seeker.search.$lastNavButton.removeClass('ui-state-disabled');
	}

	ctx.seeker.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.plugins.search.matchedRecordsCount'),Number(currentRowNum), Number(totalRowNum)));
}

/**
* Metodo para procesar los datos provinientes del controller.
*
* @name processData
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
* @param {object} ctx - Es el contecto del datatable donde esta la configuración del mismo.
* @param {object} dato - Son los datos de las filas que viene del controller.
*
*/
function _processData(dt,ctx,data){
	if(ctx.oInit.multiSelect !== undefined){
		DataTable.Api().multiSelect.deselectAll(dt);
	}else if(ctx.oInit.select !== undefined){
		DataTable.Api().select.deselect(ctx);
	}
	if(!_paginar(ctx,data[ctx.seeker.search.pos])){
		_selectSearch(dt,ctx,data);
	}else{
		var tabla = $('#'+ctx.sTableId);
		tabla.dataTable().fnPageChange( data[ctx.seeker.search.pos].page-1 );
	}

	if (data.length === 0){
		ctx.seeker.search.$firstNavButton.add(ctx.seeker.search.$backNavButton).add(ctx.seeker.search.$forwardNavButton).add(ctx.seeker.search.$lastNavButton).addClass('ui-state-disabled');
		ctx.seeker.search.$matchedLabel.html(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_datatable.plugins.search.matchedRecords'),'0'));
	}else{
		_updateDetailSeekPagination(ctx.seeker.search.pos + 1,data.length,ctx);
	}
}

/**
* Se obtienen los datos del formulario del seeker.
*
* @name getDatos
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} ctx - Es el contecto del datatable donde esta la configuración del mismo.
* 
* @return {object} Devuelve el objeto mapeado de todos los campos.
*
*/
function _getDatos(ctx){
	var datos = ctx.aBaseJson;
	if(datos !== undefined){
		datos.search = form2object($(ctx.seeker.search.$searchForm.selector)[0]);
	}
	return datos;
}

/**
* Partiendo de los inputs del seeker, se convierten en componentes rup dependiendo del tipo..
*
* @name createRupComponent
* @function
* @since UDA 3.4.0 // Datatable 1.0.0
* 
* @param {object} dt - Es el objeto datatable.
* @param {object} ctx - Es el contecto del datatable donde esta la configuración del mismo.
*
*/
function _createRupComponent(dt,ctx){
	var colModel = ctx.oInit.colModel, searchEditOptions;
	if(colModel !== undefined){
		$('#' + ctx.sTableId + ' tfoot tr:eq(1) th:not(.select-checkbox)').each(function (i) { // El primer tr corresponde al desplegable de filtros

				var cellColModel = colModel[i];
				var searchRupType = (cellColModel.searchoptions!==undefined && cellColModel.searchoptions.rupType!==undefined)?cellColModel.searchoptions.rupType:cellColModel.rupType;
	
				var colModelName = cellColModel.name;
				var $elem = $('[name=\''+colModelName+'\']',ctx.seeker.searchForm);
				// Se añade el title de los elementos de acuerdo al colname
				$elem.attr({
					'title': ctx.aoColumns[i].sTitle,
					'class': 'editable customelement'
				}).removeAttr('readOnly');
	
				// En caso de tratarse de un componente rup, se inicializa de acuerdo a la configuracón especificada en el colModel
				if(searchRupType!==undefined) {
					searchEditOptions = cellColModel.searchoptions || cellColModel.editoptions;
	
					/*
					 * PRE Configuración de los componentes RUP
					 */
					if(searchRupType === 'combo'){
						searchEditOptions = $.extend({},{menuWidth:$elem.width()}, searchEditOptions, {width:'97%'});
					} else if(searchRupType === 'date'){
						$elem.css('width','86%');
						$elem.css('max-width','80px');
						$elem.css('min-width','75px');
					}
	
					// Invocación al componente RUP
					$elem['rup_'+searchRupType](searchEditOptions);
				}

		});
	}

}

function _limpiarSeeker(dt,ctx){
	$('#'+ctx.sTableId).triggerHandler('tableSeekerBeforeClear');
	jQuery('input,textarea','#'+ctx.sTableId+' tfoot').val('');
	jQuery('tfoot [ruptype=\'combo\']','table tfoot').rup_combo('clear');
	jQuery('.ui-selectmenu-status','table tfoot').text('--');
	ctx.seeker.search.funcionParams = {};
	ctx.seeker.search.pos = 0;
	_processData(dt,ctx,[]);
	$('#'+ctx.sTableId).triggerHandler('tableSeekerAfterClear');
}
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables API
 *
 * For complete documentation, please refer to the docs/api directory or the
 * DataTables site
 */

// Local variables to improve compression
var apiRegister = DataTable.Api.register;

apiRegister( 'seeker.eventTrigger()', function ( api, type, args, any ) {
	DataTable.seeker._eventTrigger(api, type, args, any );
} );

apiRegister( 'seeker.selectSearch()', function ( dt,ctx,rows ) {
	_selectSearch(dt,ctx,rows );
} );

apiRegister('seeker.limpiarSeeker()', function ( dt,ctx) {
	_limpiarSeeker(dt,ctx);
});

apiRegister('seeker.updateDetailSeekPagination()', function ( currentRowNum,totalRowNum,ctx) {
	_updateDetailSeekPagination(currentRowNum,totalRowNum,ctx);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialization
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'plugin-init.dt', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}
	if(ctx.oInit.seeker !== undefined){
		DataTable.seeker.init( new DataTable.Api( ctx ) );
	}else{
		$('tfoot').hide();
	}

} );


return DataTable.seeker;
}));
