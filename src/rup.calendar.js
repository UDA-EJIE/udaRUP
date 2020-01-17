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

/* eslint-env jquery,amd */
/* eslint-disable no-console */

import underscore from 'underscore';
import 'jquery';
import 'rup.base';
import 'popper.js';
import './external/bootstrap-calendar';

/**
 * Componente de calendario para la visualización de eventos sobre una interfaz dinámica y personalizable.
 *
 * @summary Componente RUP Calendar.
 * @module rup_calendar
 * @example
 * var properties = {
 *  day: 'now',
 * 	classes: {
 *		months: {
 *			inmonth: 'cal-day-inmonth',
 *			outmonth: 'cal-day-outmonth',
 *			saturday: 'cal-day-weekend',
 *			sunday: 'cal-day-weekend',
 *			holidays: 'cal-day-holiday',
 *			today: 'cal-day-today'
 *		},
 *		week: {
 *			workday: 'cal-day-workday',
 *			saturday: 'cal-day-weekend',
 *			sunday: 'cal-day-weekend',
 *			holidays: 'cal-day-holiday',
 *			today: 'cal-day-today'
 *		}
 *  },
 *  weekbox: true
 * };
 *
 * $('#calendar').rup_calendar(properties);
 */

//****************************************************************************************************************
// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
//****************************************************************************************************************

var rup_calendar = {};
var calObj = {};
var errorstr = (str) => {
    let estr = 'Cannot call methods on rup_calendar before init. tried to call method ' + str;
    throw ReferenceError(estr);
};
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
         * Si el parámetro es un string las únicas opciones son:
         *  - next
         *  - prev
         *  - today
         *
         * @name navigate
         * @param {(string|Date)} navigation Hacia dónde navegar
         * @function
         * @example
         * $("#calendar").rup_calendar('navigate','next');
         */
    navigate: function (navigation) {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('navigate');
        }
        // Si el valor es un objeto Date en función navegamos hasta la posición indicada
        if( navigation instanceof Date ) {
            if($(ctx).data('cal').options.date_range_start !== undefined ) {
                if (navigation.getTime() < $(ctx).data('cal').options.date_range_start.getTime()) {
                    console.warn('Can´t navigate to an out of range time.');
                    return;
                }
            }
            if($(ctx).data('cal').options.date_range_end !== undefined ) {
                if (navigation.getTime() > $(ctx).data('cal').options.date_range_end.getTime()) {
                    console.warn('Can´t navigate to an out of range time.');
                    return;
                }
            }

            let pos = $.extend({}, $(ctx).data('cal').options.position);

            pos.start.setTime(navigation.getTime());
            $(ctx).data('cal').options.day = pos.start.getFullYear() + '-' +
                                    pos.start.getMonthFormatted() + '-' +
                                    pos.start.getDateFormatted();
            $(ctx).data('cal').view();
            return;
        }
        // Si no hay valor se considera que por defecto es "today"
        navigation = navigation ? navigation : 'today';
        if ($.inArray(navigation, ['next', 'prev', 'today']) < 0) {
            throw Error('Parámetro inválido');
        }
        $(ctx).data('cal').navigate(navigation);
    },
    /**
         * Confirma si en la vista está el día actual.
         * @name isToday
         * @returns {boolean} true si el dia actual está en la vista. false en caso contrario
         * @function
         * @example
         * $("#calendar").rup_calendar('isToday');
         */
    isToday: function() {
        var ctx = this;
        if (!$(ctx).data('cal').options) {
            errorstr('isToday');
        }
        return $(ctx).data('cal').isToday();
    },
    /**
         * Devuelve la instancia del subyacente bootstrap-calendar
         * 
         * @name instance
         * @returns {object} instancia del calendar subyacente
         * @function
         * @example
         * $("#calendar").rup_calendar('instance');
         */
    instance: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('instance');
        }
        return $(ctx).data('cal');
    },
    /**
         * Oculta el menú contextual.
         *
         * @name setView
         * @param {string} viewmode El modo de visualizacion a establecer
         * @function
         * @example
         * $("#calendar").rup_calendar('setView','day');
         */
    setView: function (viewmode) {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('setView');
        }
        // El valor por defecto es month.
        viewmode = viewmode ? viewmode : 'month';
        if ($.inArray(viewmode, ['year', 'month', 'week', 'day']) < 0) {
            throw Error('Parámetro inválido');
        }
        $(ctx).data('cal').view(viewmode);
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
    getView: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getView');
        }
        return $(ctx).data('cal').options.view;
    },
    /**
         * Obtiene el año del calendario
         * @name getYear
         * @returns {number} el año del calendario
         * @example
         * $('#calendar').rup_calendar('getYear');
         */
    getYear: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getYear');
        }
        return $(ctx).data('cal').getYear();
    },
    /**
         * Obtiene el mes del calendario (Enero, Febrero, ..., Diciembre)
         * @name getMonth
         * @returns {string} el mes del calendario
         * @example
         * $('#calendar').rup_calendar('getMonth');
         */
    getMonth: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getMonth');
        }
        return $(ctx).data('cal').getMonth();
    },
    /**
         * Obtiene la semana del calendario
         * @name getWeek
         * @returns {number} la semana del calendario
         * @example
         * $('#calendar').rup_calendar('getWeek');
         */
    getWeek: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getWeek');
        }
        let date = new Date($(ctx).data('cal').getStartDate());
        return date.getWeek();
    },
    /**
         * Obtiene el día de la semana (Lunes - Domingo)
         * @name getDay
         * @returns {string} el día de la semana
         * @example
         * $('#calendar').rup_calendar('getDay');
         */
    getDay: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getDay');
        }
        return $(ctx).data('cal').getDay();
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
    'getTitle': function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getTitle');
        }
        return $(ctx).data('cal').getTitle();
    },
    /**
         * Obtiene la fecha desde la que se muestra el calendario
         * @name getStartDate
         * @function
         * @returns {Date} fecha
         * @example
         * $("#calendar").rup_calendar("getStartDate");
         */
    getStartDate:function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getStartDate');
        }
        return $(ctx).data('cal').getStartDate();
    },
    /**
         * Obtiene la fecha hasta la que se muestra el calendario
         * @name getEndDate
         * @function
         * @returns {Date} fecha
         * @example
         * $("#calendar").rup_calendar("getEndDate");
         */
    getEndDate:function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getEndDate');
        }
        return $(ctx).data('cal').getEndDate();
    },
    /**
         * Método que establece y recarga las opciones
         * 
         * @name option
         * @function
         * @param {string|object} opción Opcion a consultar/establecer u objeto para establecer las propiedades
         * @param {any} value Si el primer parametro asigna este valor a la opción especificada
         * @example
         * $('#calendar').rup_calendar('weekbox', true);
         * $('#calendar').rup_calendar({weekbox:true, view:'month'});
         */
    option: function(opt, val) {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('option');
        }
        if(typeof opt === 'object'){
            let optNames = Object.keys(opt);
            $.each(optNames, (i,e) => {
                $(ctx).data('cal').options[e] = opt[e];
                $(ctx).data('cal')._render();
            });
            return;
        }
        if(val === undefined) {
            return $(ctx).data('cal').options[opt];
        }
        else {
            $(ctx).data('cal').options[opt] = val;
            $(ctx).data('cal')._render();
        }
    },
    /**
         * Devuelve un listado de eventos entre las dos fechas introducidas
         * 
         * @name getEventsBetween
         * @function
         * @param {Date} fechaDesde
         * @param {Date} fechaHasta
         * @returns {Array} listado de Eventos entre las fechas
         */
    getEventsBetween: function(desde, hasta) {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('getEventsBetween');
        }
        return $(ctx).data('cal').getEventsBetween(desde,hasta);
    },
    /**
         * Muestra los eventos de la casilla con la fecha especificada.
         * @name showCell
         * @function
         * @param {Date} fecha fecha a consultar
         * @returns {boolean} true si había eventos. false en caso contrario.
         * @example
         * $('#calendar').rup_calendar('showCell', new Date('2000-01-01'));
         */
    showCell : function(date) {
        var ctx = this;
        if (!$(ctx).data('cal').options) {
            errorstr('showCell');
        }
        if (!(date instanceof Date)) {
            throw TypeError('Se requiere un Date como parámetro');
        }
        var getCell = (date) => {
            let ts = date.getTime();
            let col = $('.events-list');
            let sel = col.filter( (i, e) => {
                return $(e).attr('data-cal-start') <= ts && $(e).attr('data-cal-end') > ts;
            });
            if(sel.length === 0) {
                return false;
            }
            return $(sel).parent();
        };
        let cell = getCell(date);
        if( cell ) {
            if ($('#cal-slide-box').css('display') === undefined ||
                    $('#cal-slide-box').css('display') === 'none' ){
                $(ctx).trigger('beforeShowCell');
                cell.mouseover();
                cell.click();
            }
        }
        else {
            return false;
        }
    },
    /**
         * Oculta el div con los eventos si está desplegado
         * @name hideCells
         * @function
         * @example
         * $('#calendar').rup_calendar('hideCells');
         */
    hideCells: function() {
        var ctx = this;
        if (!$(ctx).data('cal').options) {
            errorstr('showCell');
        }
        $(ctx).trigger('beforeHideCell');
        $('#cal-slide-box').css('display','none');
        $(ctx).trigger('afterHideCell');
    },
    /**
         * Recarga los eventos y aplica las opciones cambiadas
         * 
         * @name refresh
         * @function
         * @example
         * $('#calendar').rup_calendar('refresh');
         */
    refresh: function() {
        var ctx = this;
        if( !$(ctx).data('cal').options) {
            errorstr('refresh');
        }
        //Primero actualizamos las opciones (Por si se cambia events_source)
        $(ctx).data('cal')._render();
        //Actualizamos los eventos
        $(ctx).data('cal')._loadEvents();
        $(ctx).data('cal')._render();
        setTimeout(function () {
            $(ctx).trigger('afterRefresh');
        }, 400);
    },
    /**
         * Elimina el calendario y retorna a la estructura HTML anterior a la creación del calendario.
         *
         * @name destroy
         * @function
         * @example
         * $("#contextMenu").rup_calendar("destroy");
         */
    destroy: function () {
        var ctx = this;
        if($(ctx).data('cal') === undefined) {
            errorstr('destroy');
        }
        if( !$(ctx).data('cal').options) {
            errorstr('destroy');
        }
        $(ctx).data('cal').options.selector = undefined;
        $(ctx).removeClass('cal-context');
        $(ctx).removeData();
        $(ctx).children().remove();
        $(ctx).trigger('afterDestroy');
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
            self._ADAPTER = $.rup.adapter[settings.adapter];
            settings.onAfterEventsLoad = function (...args) {
                self._callIfFunction.call(this, $.fn.rup_calendar.defaults.onAfterEventsLoad, args);
                self._callIfFunction.call(this, customSettings.rupAfterEventsLoad, args);
                $(self).trigger('afterEventsLoad');
            };
            settings.onAfterViewLoad = function (...args) {
                self._callIfFunction.call(this, $.fn.rup_calendar.defaults.onAfterViewLoad, args);
                self._callIfFunction.call(this, customSettings.rupAfterViewLoad, args);
                $(self).trigger('afterViewLoad');
            };
                
            // if ($.rup_utils.aplicatioInPortal()) {
            // 	settings.appendTo = '.r01gContainer';
            // }

            //El componente subyacente requiere i18n en una variable del scope de window
            if (!window.calendar_languages) {
                window.calendar_languages = {};
            }
            window.calendar_languages[settings.language] = $.rup.i18n.base.rup_calendar;

            //Lanzar el plugin subyaciente
            calObj = new $(self).calendar(settings);
            this.data('cal',calObj);
            this.trigger('afterInitCalendar');
            // Se audita el componente
            $.rup.auditComponent('rup_calendar', 'init');
        }
    }
});

//******************************************************
// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
//******************************************************

/**
     * @description Propiedades de configuración del componente. Todas son opcionales. Se puede crear un calendario con la funcionalidad básica sin especificar ninguna de estas opciones.
     *
     * @name defaults
     * @property {string} tooltip_container - Container al que se le añade el tooltip.
     * @property {(string|function|object)} events_source - Origen de los eventos a añadir en el calendario.
     * @property {string} width - Ancho que ocupara el calendario.
     * @property {string} view - vista que se mostrara por defecto (year/month/week/day).
     * @property {string} day - Punto de inicio del calendario. puede ser 'now' o una fecha en formato (yyyy-mm-dd).
     * @property {string} time_start - La hora a la que empieza la vista de día.
     * @property {string} time_end - La hora a la que acaba la vista de day.
     * @property {string} time_split - Cada cuantos minutos se muestra un separador en la vista de día.
     * @property {boolean} format12 - Especifica si se usa o no el formato de 12H en lugar del de 24H.
     * @property {string} am_suffix - En el formato de 12H especifica el sufijo para la mañana (default: AM).
     * @property {string} pm_suffix - En el formato de 12H especifica el sufijo para la tarde (default: PM).
     * @property {string} tmpl_path - Path a la ubicación de las tempaltes de calendar (Debe terminar en '/').
     * @property {boolean} tmpl_cache - Indica si cachea o no las templates (default: true).
     * @property {object} classes - Establece las clases para cada celda en funcion de la vista.
     * @property {(string|null)} modal - ID de la ventana modal. Si se establece las url en los eventos se abrirán en la modal.
     * @property {string} modal_type - Modo en el que aparece el modal (iframe/ajax/template).
     * @property {function} modal_title - Función para establecer el título del modal. Recibe el evento como parámetro.
     * @property {object} views - configuración de las vistas.
     * @property {boolean} merge_holidays - Añade al calendario algunas festividades como año nuevo o el día de la independencia americana.
     * @property {boolean} display_week_numbers - Determina si se muestra el número de la semana.
     * @property {boolean} weekbox - Determina si se muestra o no un div con el número de la semana en la vista de mes.
     * @property {object} headers - Cabeceras para las llamadas ajax realizadas desde el calendario.
     * @property {boolean} cell_navigation - Determina si se cambia la vista al día o mes haciendo doble click en la celda o click en el número de dia o nombre de mes.
     * @property {number} date_range_start - Indica la fecha mínima del rango de operación permitido del calendario. Para retirar esta opcion mediante el método 'options' hay que pasar el valor null.
     * @property {number} date_range_end - Indica la fecha máxima del rango de operación permitido del calendario. Para retirar esta opcion mediante el método 'options' hay que padar el valor null.
     * @property {function} onAfterEventsLoad - Callback que se ejecuta tras cargar los eventos (Recibe los eventos como parámetros).
     * @property {function} onBeforeEventsLoad - Callback que se ejecuta antes de cargar los eventos.
     * @property {function} onAfterViewLoad - Callback que se ejecuta tras cargar una nueva vista (Recibe la vista como parámetro).
     * @property {function} onAfterModalShow - Callback que se ejecuta tras mostrar el modal (Recibe los eventos como parámetros).
     * @property {function} onAfterModalHidden - Callback que se ejecuta tras esconder el modal.(Recibe los eventos como parámetros).
     */

/**
     * @description Propiedades del objeto 'classes'
     * 
     * @name classes
     * 
     * @property {object} classes.month - Establece las clases en la vista de mes.
     * @property {string} classes.month.inmonth - Establece las clases para las celdas que representan días del mes actual.
     * @property {string} classes.month.outmonth - Establece las clases para las celdas que representan días ajenos al mes actual.
     * @property {string} classes.month.saturday - Establece las clases para las celdas que representan los sábados.
     * @property {string} classes.month.sunday - Establece las clases para las celdas que representan los domingos.
     * @property {string} classes.month.holidays - Establece las clases para las celdas que representan los festivos.
     * @property {string} classes.month.today - Establece las clases para la celda que representan el día actual.
     * @property {object} classes.week - Establece las clases en la vista de semana.
     * @property {string} classes.week.workday - Establece las clases para las celdas que representan días entre semana.
     * @property {string} classes.week.saturday - Establece las clases para las celdas que representan los sábados.
     * @property {string} classes.week.sunday - Establece las clases para las celdas que representan los domingos.
     * @property {string} classes.week.holidays - Establece las clases para las celdas que representan los festivos.
     * @property {string} classes.week.today - Establece las clases para la celda que representan el día actual.
     */

/**
     * @description Propiedades del objeto 'views'
     * 
     * @name views
     * 
     * @property {object} views.year - Establece las opciones para la vista anual.
     * @property {integer} views.year.slide_events - Si el valor es 1 permite desplegar los eventos desde las celdas.
     * @property {integer} views.year.enable - Si el valor es 1 habilita la vista.
     * @property {object} views.month - Establece las opciones para la vista mensual.
     * @property {integer} views.month.slide_events - Si el valor es 1 permite desplegar los eventos desde las celdas.
     * @property {integer} views.month.enable - Si el valor es 1 habilita la vista.
     * @property {object} views.week - Establece las opciones para la vista semanal.
     * @property {integer} views.week.enable - Si el valor es 1 habilita la vista.
     * @property {object} views.day - Establece las opciones para la vista diaria.
     * @property {integer} views.day.enable - Si el valor es 1 habilita la vista.
     */

/**
      * @description Ya sea desde local o remoto el JSON con los eventos es un array de objetos en el que
      *  cada objeto tiene las siguientes propiedades:
      * 
      * @name Eventos
      * 
      * @property {string} id identificador único del evento.
      * @property {string} title texto o html que aparecerá al desplegar la celda con el evento.
      * @property {string} start la fecha en la que inicia el evento (En milisegundos).
      * @property {string} class clase a añadir al evento (Sirve para la visualización del evento).
      * @property {string} end la fecha en la que finaliza el evento.
      * @property {string} url ruta a la que llevar cuando se haga click sobre el evento.
      * 
      */

$.fn.rup_calendar.defaults = {
    events_source: () => {
        return [];
    },
    language: $.rup.lang,
    view: 'month',
    tmpl_path: global.STATICS + '/rup/html/templates/rup_calendar/',
    tmpl_cache: false,
    day: 'now',
    weekbox: false,
    classes: {
        months: {
            general: 'label'
        }
    },
    onAfterEventsLoad: () => {},
    onAfterViewLoad: () => {},
    adapter: 'calendar_bootstrap'
};
