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


/**
 * Tiene como objetivo mostrar al usuario de manera gráfica el estado de avance de una tarea o proceso.
 *
 * @summary Componente RUP ProgressBar.
 * @module rup_progressbar
 * @see El componente está basado en el plugin {@link https://jqueryui.com/progressbar/|jQuery UI ProgressBar}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://api.jqueryui.com/progressbar/|aquí}.
 * @example
 * var properties = {
 *		value: 50
 *	};
 * $("#idProgressbar").rup_progressbar(properties);
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var rup_progressbar = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_progressbar', rup_progressbar));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_progressbar('extend', {
        /**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor de la barra de progreso.
         *
         * @name getRupValue
         * @function
         * @return {number} - Devuelve el valor actual del componente. El valor retornado se corresponderá con el progreso actual.
         * @example
         * $("#idProgressbar").rup_progressbar("getRupValue");
         */
        getRupValue: function () {
            var $self = this;
            return $self.progressbar('value');
        },
        /**
         * Método utilizado para asignar el valor al componente. Este método es el utilizado por
el resto de componentes RUP para estandarizar la asignación del valor a la barra de progreso.
         *
         * @name setRupValue
         * @function
         * @param {number} param - Valor que se va a asignar al componente.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * $("#idProgressbar").rup_progressbar("setRupValue", 50);
         */
        setRupValue: function (param) {
            var $self = this;

            $self.progressbar('value', param);

            return $self;
        },
        /**
         * Elimina las modificaciones realizadas sobre elemento del DOM.
         *
         * @name destroy
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * // Elimina la barra de progreso
         * jQuery("#idProgressbar").rup_progressbar("destroy");
         */
        destroy: function () {
            var $self = this;

            $self.removeClass('rup_progressbar');
            $self.removeAttr('ruptype');
            $self.progressbar('destroy');
            $self.find('div.rup-progressbar-label').remove();

            return $self;
        },
        /**
         * Deshabilita la barra de progreso.
         *
         * @name disable
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("disable");
         */
        disable: function () {
            this.progressbar('disable');
            this.addClass('rup-progressbar-disabled');
            return this;
        },
        /**
         * Habilita la barra de progreso.
         *
         * @name enable
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("enable");
         */
        enable: function () {
            this.progressbar('enable');
            this.removeClass('rup-progressbar-disabled');
            return this;
        },
        /**
         * Devuelve la instancia de jQueryUI asociada a la barra de progreso. Si no ha sido inicializada retorna undefined.
         *
         * @name instance
         * @function
         * @return {object} - Instancia de jQueryUI asociada.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("instance");
         */
        instance: function () {
            return this.progressbar('instance');
        },
        /**
         * Devuelve un objeto clave/valor que contiene las propiedades de configuración de la barra de progreso.
         *
         * @name option
         * @function
         * @return {object} - Objeto clave/valor con las propiedades de configuración.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("option");
         */
        /**
         * Devuelve el valor asociado a la propiedad identificada por parámetro.
         *
         * @name option
         * @function
         * @param {string} paramName - Nombre de la propiedad.
         * @return {object} - Valor asociado a la propiedad.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("option", "value");
         */
        /**
         * Asigna un valor a la propiedad indentificada por parámetro.
         *
         * @name option
         * @function
         * @param {string} paramName - Nombre de la propiedad.
         * @param {object} paramValue - Valor de la propiedad.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("option", "value", 50);
         */
        /**
         * Permite asignar el valor de una o varias propiedades de configuración.
         *
         * @name option
         * @function
         * @param {object} param - Objeto clave/valor con las propiedades de configuración y sus valores.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("option", {value:50, max:0});
         */
        option: function () {
            if (arguments.length === 0) {
                return this.progressbar('option');
            } else if (arguments.length === 1) {
                return this.progressbar('option', arguments[0]);
            } else {
                return this.progressbar('option', arguments[0], arguments[1]);
            }
        },
        /**
         * Devuelve el valor actual de la barra de progreso.
         *
         * @name value
         * @function
         * @return {number} - Valor actual de la barra de progreso.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("value");
         */
        /**
         * Asigna un valor a la barra de progreso.
         *
         * @name value
         * @function
         * @param {number} value - Valor a asignar.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("value", 50);
         */
        value: function (args) {
            return this.progressbar('value', args);
        },
        /**
         * Devuelve el objeto widget de jQuery que contiene la barra de progreso.
         *
         * @name widget
         * @function
         * @return {jQuery} - Objeto widget jQuery.
         * @example
         * jQuery("#idProgressbar").rup_progressbar("widget");
         */
        widget: function () {
            return this.progressbar('widget');
        }
    });


    $.fn.rup_progressbar('extend', {
        _printLabel: function () {
        }
    });


    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_progressbar('extend', {
        _init: function (args) {
            var $self = this,
                settings = $.extend({}, $.fn.rup_progressbar.defaults, args[0]);

            $self.addClass('rup-progressbar');
            $self.attr('ruptype', 'progressbar');





            $self.progressbar(settings);

            if (settings.label) {
                settings.$label = $('<div>').addClass('rup-progressbar-label');
                $self.append(settings.$label);
                settings.$label.html(settings.label.replace('${value}', $self.rup_progressbar('getRupValue')).replace('${max}', $self.rup_progressbar('option', 'max')));
                $self.on('progressbarchange', function () {
                    settings.$label.html(settings.label.replace('${value}', $self.rup_progressbar('getRupValue')).replace('${max}', $self.rup_progressbar('option', 'max')));
                });
            }

            //Se audita el componente
            $.rup.auditComponent('rup_progressbar', 'init');
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    /**
     * @description Propiedades de configuración del componente.
     *
     * @name defaults
     * @property {boolean} [disabled=false] - Determina si la barra de progreso está habilitada o deshabilitada.
     * @property {number} [max=100] - Indica el valor máximo que determinará el 100% de progreso.
     * @property {number} [value=0] - Determina el valor de progreso con el que se incializará la barra de progreso.
     */
    $.fn.rup_progressbar.defaults = {
        disabled: false,
        max: 100,
        value: 0,
        label: undefined
    };

}));
