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
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 * 
	 */
	jQuery.rup_table.registerPlugin("report",{
		loadOrder:11,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("preConfigureReport", settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("postConfigureReport", settings);
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	/**
	 * Extensión del componente rup_table para permitir la gestión de la generaciónd de informes. 
	 * 
	 * Los métodos implementados son:
	 * 
	 * preConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * 
	 * postConfigureReport(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 */
	jQuery.fn.rup_table("extend",{
		preConfigureReport: function(settings){
			var $self = this;
			
			
		},
		postConfigureReport: function(settings){
			var $self = this,
				colModel = $self.rup_table("getColModel"),
				reportsColums,
				reportSettings = settings.report;
			
			reportsColums = $self._getReportColumns(colModel, settings);
		
			
			/*
			 * INICIALIZACION DE VALORES POR DEFECTO 
			 */
			
			// Inicialización de la toolbar del componente table en caso de que no se especifique
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
				var $self = this, settings = $self.data("settings"),
				data={}, filterData = {};
				
				jQuery.each($self.jqGrid("getGridParam", "postData"), function(index, elem){
					if  (jQuery.inArray(index, settings.report.sendPostDataParams)!==-1){
						data[index] = elem;
					}
				});
				
				if (settings.filter !== undefined && settings.filter.$filterContainer!== undefined){
					filterData = $self.rup_table("getFilterParams");
				}

				jQuery.extend(true, data, filterData);
				
				$self.triggerHandler("rupTable_serializeReportData", [data]);
				
				return $.rup_utils.unnestjson(data);
			};
			
			/*
			 * FIN DE INICIALIZACION DE VALORES POR DEFECTO 
			 */
			
			
			jQuery.rup_report(reportSettings);
		}
	});
	
	
	jQuery.fn.rup_table("extend",{
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
	 * Parámetros de configuración por defecto para el plugin report.
	 * 
	 */
	jQuery.fn.rup_table.plugins.report = {};
	jQuery.fn.rup_table.plugins.report.defaults = {
			report:{
				columns:{},
				excludeColumns:['rupInfoCol','cb'],
				sendPostDataParams: ["_search","core","nd","page","rows","sidx","sord"]
			}
	};
	
	
})(jQuery);