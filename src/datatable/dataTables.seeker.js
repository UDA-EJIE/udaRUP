/*! seeker for DataTables 1.2.4
 * 2015-2017 SpryMedia Ltd - datatables.net/license/mit
 */

/**
 * @summary     Seeker for DataTables
 * @description A collection of API methods, events and buttons for DataTables
 *   that provides selection options of the items in a DataTable
 * @version     1.2.4
 * @file        dataTables.seeker.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     datatables.net/forums
 * @copyright   Copyright 2015-2017 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net/extensions/select
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

DataTable.seeker.init = function ( dt ) {
	
	var ctx = dt.settings()[0];
	
	_createFilterColumn(dt,ctx);
	
	//Ver el buscador interno de la tabla.
	if(ctx.fnRecordsTotal() === 0){
		DataTable.seeker.search.$searchRow.hide();
	}else{
		DataTable.seeker.search.$searchRow.show();
	}
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


function _createFilterColumn(dt,ctx){

	var idTabla = ctx.sTableId;
	$('#'+idTabla+' tfoot').css('display','table-header-group');
	   $('#'+idTabla+' tfoot th').each( function () {
	        var title = $(this).text();
	        if($(this).index() > 0){
	        	$(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	        }
	    } );
	   

	   dt.columns().eq(0).each(function(colIdx) {
		   if(colIdx > 0){
		        $( 'input', $('#'+idTabla+' tfoot')[0].rows[0].cells[colIdx] ).on( 'keypress', function (ev) {
		        	this.focus();
		        	if (ev.keyCode === 13) { //Se hace la llamada de busqueda.
		        		var datos = $self._ajaxRequestData;
		        		var ajaxOptions = {
		        				url : ctx.oInit.urlBase+'/search',
		        				accepts: {'*':'*/*','html':'text/html','json':'application/json, text/javascript',
		        					'script':'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
		        					'text':'text/plain','xml':'application/xml, text/xml'},
		        				type : 'POST',
		        				data : datos,
		        				dataType : 'json',
		        				showLoading : false,
		        				contentType : 'application/json',
		        				async : true,
		        				success : function(data, status, xhr) {
		        					
		        						
		        					
		        				},
		        				error : function(xhr, ajaxOptions,thrownError) {
		        					console.log('Errors '+thrownError+ ": "+xhr.responseText);

		        				}
		        			};
		        			
		        		$('#'+idTabla+'_search_searchForm').rup_form('ajaxSubmit', ajaxOptions);

		        	}
		        } );
		   }
	   });
	   
	   _createSearchRow(dt,ctx);
	   DataTable.seeker.searchForm = $('#'+idTabla+' tfoot tr:nth-child(2)');
	   DataTable.seeker.searchForm.hide();
}
/**
 * Genera la barra de controles para gestionar la búsqueda.
 *
 * @function createSearchRow
	 * @param {object} settings - Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas.
 * @example
 * $("#idTable").rup_table("createSearchRow", settings);
 */
function _createSearchRow (dt,ctx){
		var idTabla = ctx.sTableId;
		var	$gridHead = jQuery('tfoot','#'+idTabla),
			// Templates
			searchRowHeaderTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.searchRowHeader'),
			collapseLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.collapseLayer'),
			collapseIconTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.collapseIcon'),
			collapseLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.collapseLabel'),
			matchedLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.matchedLayer'),
			matchedLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.matchedLabel'),
			navLayerTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.navLayer'),
			navLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.navLink'),
			navSearchButtonTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.navSearchButton'),
			navClearLinkTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.navClearLink'),

			// Objetos
			$searchRow = $(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.search.searchRow')),
			$searchRowHeader = $(jQuery.jgrid.format(searchRowHeaderTmpl, $gridHead.find('th').length)),
			// Capa que controla el colapso del formualario
			$collapseLayer = $(jQuery.jgrid.format(collapseLayerTmpl, 'searchCollapseLayer_'+idTabla)),
			$collapseIcon = $(jQuery.jgrid.format(collapseIconTmpl, 'searchCollapseIcon_'+idTabla)),
			$collapseLabel = $(jQuery.jgrid.format(collapseLabelTmpl, 'searchCollapsLabel_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.plugins.search.searchCriteria'))),
			// Capa que muestra el número de ocurrencias
			$matchedLayer = $(jQuery.jgrid.format(matchedLayerTmpl, 'matchedLayer_'+idTabla)),
			$matchedLabel = $(jQuery.jgrid.format(matchedLabelTmpl, 'matchedLabel_'+idTabla, jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.plugins.search.matchedRecords'),0))),

			// Capa que controla la navegación entre las diferentes ocurrencias
			$navLayer = $(jQuery.jgrid.format(navLayerTmpl, 'searchNavLayer_'+idTabla)),
			$firstNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_first_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.first'))),
			$backNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_back_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.previous'))),
			$forwardNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_forward_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.next'))),
			$lastNavLink = $(jQuery.jgrid.format(navLinkTmpl, 'search_nav_last_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.last'))),
			$navSearchButton = $(jQuery.jgrid.format(navSearchButtonTmpl, 'search_nav_button_'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.search.Find'))),
			$navClearLink = $(jQuery.jgrid.format(navClearLinkTmpl, 'search_nav_clear_link'+idTabla, jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.search.Reset')));

		// Construcción del objeto final
		$collapseLayer.append($collapseIcon).append($collapseLabel);
		$matchedLayer.append($matchedLabel);
		$navLayer.append($firstNavLink).append($backNavLink).append($forwardNavLink).append($lastNavLink).append($navSearchButton).append($navClearLink);

		$searchRowHeader.append($collapseLayer);
		$searchRowHeader.append($matchedLayer);
		$searchRowHeader.append($navLayer);

		$searchRow.append($searchRowHeader);

		$gridHead.prepend($searchRow);

		DataTable.seeker.search = DataTable.seeker.search  || {};

		DataTable.seeker.search.created = false;
		//			settings.search.url = settings.search.url || settings.url+"../search";

		DataTable.seeker.search.$collapseIcon = $collapseIcon;
		DataTable.seeker.search.$searchRow = $searchRow;
		DataTable.seeker.search.$matchedLabel = $matchedLabel;
		DataTable.seeker.search.$firstNavLink = $firstNavLink;
		DataTable.seeker.search.$backNavLink = $backNavLink;
		DataTable.seeker.search.$forwardNavLink = $forwardNavLink;
		DataTable.seeker.search.$lastNavLink = $lastNavLink;

		// Creacion del enlace de mostrar/ocultar el formulario
		$collapseIcon.add($collapseLabel).on('click', function(){
			if (!DataTable.seeker.search.created){
				DataTable.seeker.search.$collapseIcon.removeClass('ui-icon-triangle-1-e');
				DataTable.seeker.search.$collapseIcon.addClass('ui-icon-triangle-1-s');
				DataTable.seeker.search.created = true;
				DataTable.seeker.searchForm.show();
				$navLayer.show();
			}else{
				DataTable.seeker.search.$collapseIcon.removeClass('ui-icon-triangle-1-s');
				DataTable.seeker.search.$collapseIcon.addClass('ui-icon-triangle-1-e');
				DataTable.seeker.search.created = false;
				DataTable.seeker.searchForm.hide();
				$navLayer.hide();
			}
		});

		// Evento de búsqueda asociado al botón
		$navSearchButton.on('click', function(){
			$self.rup_table('search');
		});

		// Evento asociado a limpiar el fomulario de búsqueda
		$navClearLink.on('click', function(){
			jQuery('input,textarea','#'+idTabla+' tfoot').val('');
			jQuery('tfoot [ruptype=\'combo\']','#'+idTabla).rup_combo('clear');
		});

		$navLayer.hide();

		function doSearchLinkNavigation($link, linkId){
			if (!$link.hasClass('ui-state-disabled')){
				$self.rup_table('navigateToMatchedRow', linkId);
			}
		}

		// Elemento primero
		$firstNavLink.on('click', function(){
			doSearchLinkNavigation(jQuery(this), 'first');
		});

		// Elemento anterior
		$backNavLink.on('click', function(){
			doSearchLinkNavigation(jQuery(this), 'prev');
		});

		// Elemento siguiente
		$forwardNavLink.on('click', function(){
			doSearchLinkNavigation(jQuery(this), 'next');
		});

		// Elemento ultimo
		$lastNavLink.on('click', function(){
			doSearchLinkNavigation(jQuery(this), 'last');
		});

		// Se recubre con un form
		var $searchForm = jQuery('<form>').attr('id',idTabla+'_search_searchForm');
		
		DataTable.seeker.search.$searchForm = jQuery('#'+idTabla+'_search_searchForm');
		DataTable.seeker.search.$searchRow.hide();
        $('#'+idTabla).wrapAll($searchForm);
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


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 */

// DataTables creation - check if select has been defined in the options. Note
// this required that the table be in the document! If it isn't then something
// needs to trigger this method unfortunately. The next major release of
// DataTables will rework the events and address this.
$(document).on( 'plugin-init.dt', function (e, ctx) {
	if ( e.namespace !== 'dt' ) {
		return;
	}

	DataTable.seeker.init( new DataTable.Api( ctx ) );

} );


return DataTable.seeker;
}));
