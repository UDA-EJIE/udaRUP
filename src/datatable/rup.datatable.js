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
		define( ['jquery','./datatable.request','datatables.net-bs4','datatables.net-responsive-bs4','./dataTables.multiselect','./dataTables.buttons','./dataTables.editForm','./dataTables.seeker', './addons/buttons.custom'], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} ( function( $ , DataTableRequest) {

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

			options.$filterButton = options.$filterForm.find('button');
			options.$clearButton = options.$filterForm.find('.rup-enlaceCancelar');
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
			if(options.columnDefs !== undefined && options.columnDefs[0].className !== undefined && options.columnDefs[0].className === 'select-checkbox'){
				//Se crear el th thead, se añade la columnal.
				$self = this;
				var th = $("<th/>").attr('data-col-prop','');

				if($self[0].tHead !== null){
					$(th).insertBefore($self[0].tHead.rows[0].cells[0])
				}
				//se crea el th tfoot
				if($self[0].tFoot !== null){
					$('<th/>').insertBefore($self[0].tFoot.rows[0].cells[0])
				}
				//Se aseguro que no sea orderable
				options.columnDefs[0].orderable = false;
			}

			var columns = this.find('th[data-col-prop]').map((i, e) => {
				return {
					data: e.getAttribute('data-col-prop'),sidx:e.getAttribute('data-col-sidx')
				};
			});

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

			// $self.DataTable().settings().ajax.filter = form2object(options.$filterForm);
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
			var ajaxData = {
				'url': options.urls.filter,
				'dataSrc': this._ajaxSuccessData,
				'type': 'POST',
				'data': this._ajaxRequestData,
				'contentType': 'application/json',
				'dataType': 'json'

			};


			return ajaxData;
		},

		/**
			* Obtiene los datos devueltos por el servidor de manera ordenada
			*
			* @name _ajaxSuccessData
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} json Información de los registros de la página actual
			*
		  */
		_ajaxSuccessData(json) {
			var ret = {};

			json.recordsTotal = json.records;
			json.recordsFiltered = json.records;

			ret.recordsTotal = json.records;
			ret.recordsFiltered = json.records;
			ret.data = json.rows;
			DataTable.Api().multiSelect.reorderDataFromServer(json);

			return ret.data;

		},

		/**
			* Solicita los datos al servidor
			*
			* @name _ajaxRequestData
			* @function
			* @since UDA 3.4.0 // Datatable 1.0.0
			*
			* @param {object} data Opciones del datatable
			* @param {object} options Opciones del componente
			*
		  */
		_ajaxRequestData(data, options) {
			//PAra añadir un id de busqueda distinto al value, como por ejemplo la fecha.
			data.columns[data.order[0].column].colSidx = options.aoColumns[data.order[0].column].colSidx;
			//el data viene del padre:Jqueru.datatable y como no tiene el prefijo de busqueda se añade.
			data.filter = form2object($(options.nTable).data('settings').$filterForm[0]);
			data.multiselection = undefined;
			if(DataTable.multiSelect.multiselection !== undefined && DataTable.multiSelect.multiselection.selectedIds.length > 0){
				data.multiselection = DataTable.multiSelect.multiselection;
			}
			var datatableRequest = new DataTableRequest(data);
			var json = $.extend({}, data, datatableRequest.getData());
			options.aBaseJson = json;
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
			if($($self.selector+'_paginate').length === 1){
				var liSearch = $('<li/>').addClass('paginate_button page-item pageSearch searchPaginator');
				var textPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'pagina',settingsT.json.total);
				var toPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'toPagina',settingsT.json.total);
				var input = $('<input/>').attr({type: "text", size: "3",value:settingsT.json.page,maxlength:"3"})
							.addClass('ui-pg-input')
				liSearch.append(textPagina);
				liSearch.append(input);
				liSearch.append(toPagina);
				$($self.selector+'_paginate ul').prepend(liSearch);
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

			$self._initOptions(settings);

			var tabla = $self.DataTable(settings);
			if(settings.searchPaginator){
				tabla.on( 'draw', function (e,settingsTable) {
					$self._createSearchPaginator($(this),settingsTable);
					//Si el seeker esta vacio ocultarlo
					if(DataTable.seeker !== undefined && DataTable.seeker.search !== undefined && DataTable.seeker.search.$searchRow !== undefined){
						if(settingsTable._iRecordsDisplay > 0){
							DataTable.seeker.search.$searchRow.show();
						}else{
							DataTable.seeker.search.$searchRow.hide();
						}
					}
				  });
			}

			// Toolbar por defecto del datatable
			new $.fn.dataTable.Buttons(
				tabla,
				DataTable.Buttons.defaults.buttons
			).container().insertBefore($('#table_filter_form'));

			// Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
			$self.data('settings', settings);

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
    dom: 'itprl',
    multiplePkToken: '~',
    primaryKey:["id"],
		responsive: true,
    searchPaginator:true,
		formEdit:{//Revisar si se mete en el plugin
      detailForm: "#table_detail_div",
      tittleForm: "Edición"
    }
	};

}));
