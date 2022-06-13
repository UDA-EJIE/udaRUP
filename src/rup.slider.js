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
 * Tiene como objetivo permitir al usuario introducir datos mediante un control que se desplaza dentro de un rango de valores.
 *
 * @summary Componente RUP Slider.
 * @module rup_slider
 * @see El componente está basado en el plugin {@link https://jqueryui.com/slider/|jQuery UI Slider}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://api.jqueryui.com/slider/|aquí}.
 * @example
 * var properties = {
 *		min: 0,
 *		max: 500
 *	};
 * $("#idSlider").rup_slider(properties);
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


    var rup_slider = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_slider', rup_slider));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_slider('extend', {
        /**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor del componente Slider.
         *
         * @name getRupValue
         * @function
         * @return {number} - Devuelve el valor actual del componente.
         * @example
         * $("#idSlider").rup_slider("getRupValue");
         */
        getRupValue: function () {
            var $self = this,
                value;

            value = $self.slider('values');

            if (value.length === 0) {
                return $self.slider('value');
            } else {
                return value;
            }
        },
        /**
         * Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor al componente Slider.
         *
         * @name setRupValue
         * @function
         * @param {number} param - Valor que se va a asignar al componente.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * // Un único desplazador
         * $("#idSlider").rup_slider("setRupValue", 40);
         * // Varios desplazadores
         * $("#idSlider").rup_slider("setRupValue", [10,60]);
         */
        setRupValue: function (value) {
            var $self = this;

            if (Array.isArray(value)) {
                $self.slider('values', value);
            } else {
                $self.slider('value', value);
            }
            return $self;
        },
        /**
         * Elimina las modificaciones realizadas sobre elemento del DOM.
         *
         * @name destroy
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * // Elimina el control slider
         * jQuery("#idSlider").rup_slider("destroy");
         */
        destroy: function () {
            var $self = this;

            $self.slider('destroy');
            $self.removeClass('rup-slider');
            $self.removeAttr('ruptype');

            return $self;
        },
        /**
         * Habilita el control.
         *
         * @name enable
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idSlider").rup_slider("enable");
         */
        enable: function () {
            var $self = this;

            $self.slider('enable');
            $self.removeClass('rup-slider-disabled');

            return $self;
        },
        /**
         * Deshabilita el control.
         *
         * @name disable
         * @function
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idSlider").rup_slider("disable");
         */
        disable: function () {
            var $self = this;

            $self.slider('disable');
            $self.addClass('rup-slider-disabled');

            return $self;
        },
        /**
         * Devuelve la instancia de jQueryUI asociada al control. Si no ha sido inicializada retorna undefined.
         *
         * @name instance
         * @function
         * @return {object} - Instancia de jQueryUI asociada.
         * @example
         * jQuery("#idSlider").rup_slider("instance");
         */
        instance: function () {
            return this.slider('instance');
        },
        /**
         * Devuelve un objeto clave/valor que contiene las propiedades de configuración del control.
         *
         * @name option
         * @function
         * @return {object} - Objeto clave/valor con las propiedades de configuración.
         * @example
         * jQuery("#idSlider").rup_slider("option");
         */
        /**
         * Devuelve el valor asociado a la propiedad identificada por parámetro.
         *
         * @name option
         * @function
         * @param {string} paramName - Nombre de la propiedad.
         * @return {object} - Valor asociado a la propiedad.
         * @example
         * jQuery("#idSlider").rup_slider("option", "min");
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
         * jQuery("#idSlider").rup_slider("option", "min", 50);
         */
        /**
         * Permite asignar el valor de una o varias propiedades de configuración.
         *
         * @name option
         * @function
         * @param {object} param - Objeto clave/valor con las propiedades de configuración y sus valores.
         * @return {jQuery} - Retorna la referencia al elemento.
         * @example
         * jQuery("#idSlider").rup_slider("option", {min:10, max:60});
         */
        option: function () {
            if (arguments.length === 0) {
                return this.slider('option');
            } else if (arguments.length === 1) {
                return this.slider('option', arguments[0]);
            } else {
                return this.slider('option', arguments[0], arguments[1]);
            }
        },
        value: function (args) {
            return this.slider('value', args);
        },
        values: function (args) {
            return this.slider('values', args);
        },
        widget: function () {
            return this.slider('widget');
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_slider('extend', {
        _bar: function () {
            return this;
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_slider('extend', {
        _init: function (args) {
            var $self = this,
                settings = $.extend({}, $.fn.rup_slider.defaults, args[0]);


            $self.addClass('rup-slider');
            $self.attr('ruptype', 'slider');
            $self.slider(settings);

            //Se audita el componente
            $.rup.auditComponent('rup_slider', 'init');

            // TODO : Invocación al plugin
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_slider.defaults = {
        foobar: false
    };

}));
