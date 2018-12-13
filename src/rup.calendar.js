/*!
 * Copyright 2016 E.J.I.E., S.A.
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

/* jshint -W117 */

import * as underscore from 'underscore';
import { Exception, Utils } from 'handlebars';

/**
 * TODO: Descripción del componente de calendario.
 *
 * @summary Componente RUP Calendar.
 * @module rup_calendar
 * @example
 * var properties = {
 *  TODO: Objeto JSON de configuración
 * };
 *
 * $('#calendar').rup_calendar(properties);
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './rup.base', 'popper', './external/bootstrap-calendar'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var rup_calendar = {};
	var calObj;
	var self;

	////El componente subyacente requiere underscore en el scope de window
	window._ = underscore;

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_calendar', rup_calendar));


	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_calendar('extend', {
		/**
		 * Navega en el calendario al punto especificado
		 *
		 * @name navigate
		 * @param {(string|Date)} [navigation] Hacia dónde navegar
		 * @function
		 * @example
		 * $("#calendar").rup_calendar('navigate','next');
		 */
		navigate: function (navigation) {
			// Si el valor es un objeto Date en función navegamos hasta la posición indicada
			if( navigation instanceof Date ) {
				let pos = $.extend({}, calObj.options.position);

				pos.start.setTime(navigation.getTime());
				calObj.options.day = pos.start.getFullYear() + '-' +
									 pos.start.getMonthFormatted() + '-' +
									 pos.start.getDateFormatted();
				calObj.view();
				$(calObj.options.selector).trigger('afterRender');
				return;
			}
			// Si no hay valor se considera que por defecto es "today"
			navigation = navigation ? navigation : 'today';
			if($.inArray(navigation,['next','prev','today']) < 0 ) {
				$(calObj.options.selector).trigger('afterRender');
				throw Error('Parámetro inválido');
			}
			calObj.navigate(navigation);
			$(calObj.options.selector).trigger('afterRender');
		},
		/**
		 * Confirma si en la vista está el día actual.
		 * @name isToday
		 * @returns {boolean} true si el dia actual está en la vista. false en caso contrario
		 * @function
		 * @example
		 * $("#calendar").rup_calendar('isToday');
		 */
		isToday: () => {
			return calObj.isToday();
		},
		instance: () => {
			return calObj;
		},
		/**
		 * Oculta el menú contextual.
		 *
		 * @name setView
		 * @param {string} [viewmode] El modo de visualizacion a establecer
		 * @function
		 * @example
		 * $("#calendar").rup_calendar('setView','day');
		 */
		setView: function (viewmode) {
			// El valor por defecto es month.
			viewmode = viewmode ? viewmode : 'month';
			if( $.inArray(viewmode,['year','month','week', 'day']) < 0 ) {
				throw Error('Parámetro inválido');
			}
			calObj.view(viewmode);
			$(calObj.options.selector).trigger('afterRender');
		},
		/**
		 * Obtiene el modo de visualización actual.
		 * 
		 * @name getView
		 * @returns {string} modo de visualización
		 * @function
		 * @example
		 * $('#calendar').rup_calendar('getView');
		 */
		getView: () => {
			return calObj.options.view;
		},
		/**
		 * Obtiene el año del calendario
		 * @name getYear
		 * @returns {number} el año del calendario
		 * @example
		 * $('#calendar').rup_calendar('getYear');
		 */
		getYear: () => {
			return calObj.getYear();
		},
		/**
		 * Obtiene el mes del calendario (1 - 12)
		 * @name getMonth
		 * @returns {number} el mes del calendario
		 * @example
		 * $('#calendar').rup_calendar('getMonth');
		 */
		getMonth: () => {
			return calObj.getMonth();
		},
		/**
		 * Obtiene la semana del calendario
		 * @name getWeek
		 * @returns {number} la semana del calendario
		 * @example
		 * $('#calendar').rup_calendar('getMonth');
		 */
		getWeek: () => {
			let date = new Date(calObj.getStartDate());
			return date.getWeek();
		},
		/**
		 * Obtiene el día del calendario
		 * @name getDay
		 * @returns {number} el día del calendario
		 * @example
		 * $('#calendar').rup_calendar('getMonth');
		 */
		getDay: () => {
			return calObj.getDay();
		},
		/**
		 * Obtiene el título de la vista de calendario.
		 *
		 * @name getTitle
		 * @function
		 * @returns {string} título de la vista
		 * @example
		 * $("#calendar").rup_calendar("getTitle");
		 */
		'getTitle': () => {
			calObj.getTitle();
		},
		/**
		 * Obtiene la fecha desde la que se muestra el calendario
		 * @name getStartDate
		 * @function
		 * @returns {Date} fecha
		 * @example
		 */
		getStartDate:() => {
			return calObj.getStartDate();
		},
		/**
		 * Obtiene la fecha hasta la que se muestra el calendario
		 * @name getEndDate
		 * @function
		 * @returns {Date} fecha
		 * @example
		 */
		getEndDate:() => {
			return calObj.getEndDate();
		},
		/**
		 * Elimina el calendario
		 *
		 * @name destroy
		 * @function
		 * @example
		 * $("#contextMenu").rup_calendar("destroy");
		 */
		destroy: function () {
			calObj.destroy();
		}
	});


	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_calendar('extend', {
		_callIfFunction: function (...args) {
			if (args.length === 0) return false;
			if (args.length > 1) {
				let fnc = args[0];
				let params = args.slice(1);
				if (fnc !== undefined && typeof fnc === 'function') {
					return fnc.apply(this, params);
				} else {
					return false;
				}
			} else {
				if (args !== undefined && typeof (args) === 'function') {
					return args.call(this);
				}
			}
		},

		/**
		 * Método de inicialización del componente.
		 *
		 * @name _init
		 * @function
		 * @private
		 * @param {object} args - Parámetros de inicialización del componente.
		 */
		_init: function (args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
			} else {
				//Se recogen y cruzan las paremetrizaciones del objeto
				self = this;
				var customSettings = args[0];
				var settings = $.extend({}, $.fn.rup_calendar.defaults, customSettings);
				settings.onAfterEventsLoad = function (...args) {
					self._callIfFunction.call(this, $.fn.rup_calendar.defaults.onAfterEventsLoad, args);
					self._callIfFunction.call(this, customSettings.rupAfterEventsLoad, args);
				};
				settings.onAfterViewLoad = function (...args) {
					self._callIfFunction.call(this, $.fn.rup_calendar.defaults.onAfterViewLoad, args);
					self._callIfFunction.call(this, customSettings.rupAfterViewLoad, args);
				};

				//Asociar el selector
				settings.selector = self.selector;

				if ($.rup_utils.aplicatioInPortal()) {
					settings.appendTo = '.r01gContainer';
				}

				//El componente subyacente requiere i18n en una variable del scope de window
				if (!window.calendar_languages) {
					window.calendar_languages = {};
				}
				window.calendar_languages[settings.language] = $.rup.i18n.base.rup_calendar;

				//Lanzar el plugin subyaciente
				calObj = $(self).calendar(settings);
			}
		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************

	/**
	 * Función de callback a ejecutar cuando se muestra el menú contextual.
	 *
	 * @callback jQuery.rup_calendar~onShowEvent
	 * @param {object} opt - Opciones de configuración.
	 * @return {boolean} - En caso de devolver false no se termina mostrando el menú.
	 */

	/**
	 * Función de callback a ejecutar cuando se oculta el menú contextual.
	 *
	 * @callback jQuery.rup_calendar~onHideEvent
	 * @param {object} opt - Opciones de configuración.
	 * @return {boolean} - En caso de devolver false no se termina ocultando el menú.
	 */

	/**
	 * Función de callback a ejecutar a partir de los eventos indicados en la propiedad trigger.
	 *
	 * @callback jQuery.rup_calendar~position
	 * @param {jQuery} $menu - Referencia jQuery al objeto propio.
	 * @param {number} x - Coordenada x proporcionada por el evento de mostrar el menú.
	 * @param {number} y - Coordenada y proporcionada por el evento de mostrar el menú.
	 */

	/**
	 * Esta propiedad permite especificar una función de callback por defecto para aquellos ítems que no hayan especificado una función propia.
	 *
	 * @callback jQuery.rup_calendar~callback
	 * @param {string} key - Key de la opción seleccionada.
	 * @param {number} options - Opciones de configuración con los que se ha inicializado el componente.
	 * @example
	 * callback: function(key, options) {
	 *    alert("clicked: " + key);
	 * }
	 */

	/**
	 * Función de callback que devuelve el objeto de configuración del componente.
	 *
	 * @callback jQuery.rup_calendar~build
	 * @param {jQuery} $trigger - Referencia jQuery del objeto disparador del callback.
	 * @param {object} e - Objeto event correspondiente al evento que desencadena el callback.
	 * @return {object} - Objeto de configuración del componente.
	 * @example
	 * $(".contextMenu-other").rup_calendar({
	 *      trigger: 'none',
	 *      build: function($trigger, e) {
	 *          return {
	 *              callback: function(key, options) {
	 *              alert("clicked: " + key);
	 *          },
	 *          items: {
	 *              "edit": {name: "Edit", icon: "edit"},
	 *              "cut": {name: "Cut", icon: "cut"},
	 *              "copy": {name: "Copy", icon: "copy"},
	 *              "paste": {name: "Paste", icon: "paste"},
	 *              "delete": {name: "Delete", icon: "delete"},
	 *              "sep1": "---------",
	 *              "quit": {name: "Quit", icon: "quit"}
	 *          }
	 *      };
	 *  }
	 * });
	 */

	/**
	 * @description Propiedades de configuración del componente.
	 *
	 * @name defaults
	 * @property {object} items - Objeto que define los elementos que van a mostrarse en el menú contextual. En el siguiente apartado se explicará más en detalle como realizar esta definición.
	 * @property {string} [appendTo] - Selector de jQuery que identifica el elemento del DOM a partir del cual se va a añadir el menú contextual generado.
	 * @property {string} [trigger] - Determina el evento que va a lanzar la visualización del menú contextual. ("right","left", "hover", "none").
	 * @property {boolean} [reposition] - Determina si un menú debe ser reposicionado (true) o reconstruido (false) en el caso de que el evento que lanza la visualización del menú contextual se ejecute por segunda vez.
	 * @property {number} [delay=200] - Determina el tiempo de retardo antes de mostrar el menú contextual. Solo se aplica sobre el evento “hover”.
	 * @property {boolean} [autoHide=false] - Indica si el menú contextual debe de ocultarse automáticamente cuando el cursor del ratón abandona la posición del menú contextual y el elemento que lo lanza.
	 * @property {number} [zIndex=1] - Especifica el desplazamiento de zIndex que se aplica al calculado.
	 * @property {string} [className] - Nombres de clases adicionales que se van a aplicar al menú contextual.
	 * @property {object} animation - Determina la animación que se va a aplicar a la hora de mostrar/ocultar el menúcontextual. La configuración es la misma que la que utiliza para realizar la de los métodos show y hide de jQuery.
	 * @property {object} [events] - Los eventos show y hide se ejecutan antes de el menú se muestre o se oculte. Mediante esta propiedad es posible indicar funciones de callback para ser ejecutadas en estos casos. Permiten devolver false para evitar continuar con el evento.
	 * @property {jQuery.rup_calendar~onShowEvent} events.show - Función a ejecutar antes de que se muestre el menú.
	 * @property {jQuery.rup_calendar~onHideEvent} events.hide - Función a ejecutar antes de que se oculte el menú.
	 * @property {jQuery.rup_calendar~position} position - Función de callback que se ejecuta a partir de los eventos indicados en la propiedad trigger.
	 * @property {string} determinePosition - Determina la posición del menú contextual de acuerdo al elemento disparador.
	 * @property {jQuery.rup_calendar~callback} [callback] - Esta propiedad permite especificar una función de callback por defecto para aquellos ítems que no hayan especificado una función propia.
	 * @property {jQuery.rup_calendar~build} [build] - Función de callback que devuelve el objeto de configuración del componente. En caso de especificar una función para la propiedad build la creación del menú no se realiza inicialmente sino que se demora hasta que se ejecuta el evento que lo muestra.
	 * @property {boolean} [showCursor=true] - Determina si se va a modificar el estilo del puntero del ratón al posicionarse sobre el elemento que dispone de menú contextual. El tipo de puntero se determina mediante la clase CSS context-menu-cursor.
	 * @property {string} [msieCursorCss="url("+$.rup.RUP+"/css/cursors/context-menu.cur),default"] - Esta propiedad se emplea para poder modificar la apariencia del cursor en Internet Explorer al posicionarse sobre un elemento que dispone de un menú contextual. Esto es debido a que el modo en el que hay que realizar la asignación del nuevo cursor no se puede realizar mediante un class
	 */

	$.fn.rup_calendar.defaults = {
		events_source: () => {
			return [];
		},
		language: $.rup.lang,
		view: 'month',
		tmpl_path: STATICS + '/rup/html/templates/rup_calendar/',
		tmpl_cache: false,
		weekbox: false,
		classes: {
			months: {
				general: 'label'
			}
		},
		onAfterEventsLoad: (...args) => {},
		onAfterViewLoad: (...args) => {
			$('*[data-toggle="tooltip"]').rup_tooltip('destroy');
			$('*[data-toggle="tooltip"]').rup_tooltip({
				container: 'body',
				html: true
			});
		}
	};

}));