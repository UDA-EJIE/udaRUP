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
 * Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.
 *
 * @summary Plugin de reporting del componente RUP Table.
 * @module rup_jqtable/report
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["report"],
 * 	report:{
 * 		// Propiedades de configuración del report inlineEdit
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('report',{
		loadOrder:11,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureReport', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureReport', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la generaciónd de informes.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * postConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 */
	jQuery.fn.rup_jqtable('extend',{
		/**
		* Metodo que realiza la pre-configuración del plugin report del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureReport
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureReport: function(settings){
			var $self = this;


		},
		/**
		* Metodo que realiza la post-configuración del plugin report del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureReport
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		* @fires module:rup_jqtable#rupTable_serializeReportData
		*/
		postConfigureReport: function(settings){
			var $self = this,
				colModel = $self.rup_jqtable('getColModel'),
				reportsColums,
				reportSettings = settings.report;

			reportsColums = $self._getReportColumns(colModel, settings);


			/*
			 * INICIALIZACION DE VALORES POR DEFECTO
			 */

			// Inicialización de la toolbar del componente jqtable en caso de que no se especifique
			if (reportSettings.appendTo===undefined){
				reportSettings.appendTo = settings.toolbar.id;
			}

			// Se toman los parámetros columns globales como base para los específicos
			jQuery.each(reportSettings.buttons[0].buttons, function(index, element){

				element.columns = $.extend(true, {}, reportSettings.columns, element.columns);
				if (element.columns.grid===undefined){
					element.columns.grid = settings.id;
				}

				if (element.columns.customNames===undefined){
					element.columns.customNames = reportsColums;
				}

				if (element.columns.click===undefined){
					element.columns.click = function(){};
				}
			});


			reportSettings.fncGetGridParam = function(){
				var $self = this, settings = $self.data('settings'),
					data={}, filterData = {};

				jQuery.each($self.jqGrid('getGridParam', 'postData'), function(index, elem){
					if  (jQuery.inArray(index, settings.report.sendPostDataParams)!==-1){
						data[index] = elem;
					}
				});

				if (settings.filter !== undefined && settings.filter.$filterContainer!== undefined){
					filterData = $self.rup_jqtable('getFilterParams');
				}

				jQuery.extend(true, data, filterData);

				$self.triggerHandler('rupTable_serializeReportData', [data]);

				return $.rup_utils.unnestjson(data);
			};

			/*
			 * FIN DE INICIALIZACION DE VALORES POR DEFECTO
			 */


			jQuery.rup_report(reportSettings);
		}
	});


	jQuery.fn.rup_jqtable('extend',{
		/**
     * Devuelve las columnas de la tabla para las que se va a generar el informe.
     *
     * @function _processMatchedRow
		 * @private
		 * @param {object} colModel - colModel correspondiente a la tabla.
		 * @param {object} settings - Parámetros de configuración de la página.
		 * @return {string[]} - Array con el nombre de las columnas.
     * @example
     * $self._getReportColumns(colModel, settings);
     */
		_getReportColumns: function(colModel, settings){
			return jQuery.map(colModel, function(elem, index){
				if (jQuery.inArray(elem.name, settings.report.excludeColumns) === -1){
					return elem.name;
				}else{
					return null;
				}
			});
		}
	});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************



	/**
	* @description Propiedades de configuración del plugin report del componente RUP Table.
	*
	* @name options
	*
	* @property {object} [columns] - Permite especificar mediante un array, los identificadores de las columnas que van a ser mostradas en el informe.
	* @property {string[]} [excludeColumns] - Determina las columnas que van a ser excluidas de la generación del informe.
	* @property {string[]} [sendPostDataParams] - Parámetros del jqGrid que van a ser enviados en la petición de generación del informe.
	*/
	jQuery.fn.rup_jqtable.plugins.report = {};
	jQuery.fn.rup_jqtable.plugins.report.defaults = {
		report:{
			columns:{},
			excludeColumns:['rupInfoCol','cb'],
			sendPostDataParams: ['_search','core','nd','page','rows','sidx','sord']
		}
	};


	/* ********* */
	/* EVENTOS
  /* ********* */

	/**
   * Permite asociar un manejador al evento que se produce en el momento en el que se construye el objeto que se envía al servidor para solicitar la generación del informe. Permite la modificación del objeto postData para añadir, modificar o eliminar los parámetros que van a ser enviados.
   *
   * @event module:rup_jqtable#rupTable_serializeReportData
   * @property {Event} event - Objeto Event correspondiente al evento disparado.
	 * @property {Event} dta - Linea de la tabla destinada a la búsqueda.
   * @example
   * $("#idComponente").on("rupTable_serializeReportData", function(event, data){ });
   */


})(jQuery);
