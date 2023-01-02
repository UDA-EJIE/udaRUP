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
 * Se les presenta a los usuarios una barra de botones con diversas funcionalidades relacionadas a elementos de la página. Gracias a este componente se presentan, ordenan y agrupan las distintas funcionalidades gestionadas por las aplicaciones.
 *
 * @summary Componente RUP Tooltip.
 * @module rup_tooltip
 * @see El componente está basado en el plugin {@link http://qtip2.com/options|qTip2}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://qtip2.com/options|aquí}.
 * @example
 * $("[title]").rup_tooltip({});
 */


(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'qtip2'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************


    var rup_tooltip = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_tooltip', rup_tooltip));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_tooltip('extend', {
        /**
         * Muestra el tooltip.
         *
         * @function open
         * @example
         * $("#idTooltip").rup_tooltip("open");
         */
        open: function () {
            $(this).qtip('show', true);
        },
        /**
         * Oculta el tooltip.
         *
         * @function close
         * @example
         * $("#idTooltip").rup_tooltip("close");
         */
        close: function () {
            $(this).qtip('hide', true);
        },
        /**
         * Habilita el tooltip.
         *
         * @function  enable
         * @example
         * $("#idTooltip").rup_tooltip("enable");
         */
        enable: function () {
            $(this).qtip('enable', true);
        },
        /**
         * Deshabilita el tooltip.
         *
         * @function  disable
         * @example
         * $("#idTooltip").rup_tooltip("disable");
         */
        disable: function () {
            $(this).rup_tooltip('close');
            $(this).qtip('disable', true);
        },
        /**
         * Elimina el tooltip.
         *
         * @function  destroy
         * @example
         * $("#idTooltip").rup_tooltip("destroy");
         */
        destroy: function () {
            $(this).rup_tooltip('disable');
            $(this).qtip('destroy');
        },
        /**
         * Obtiene o establece la configuración del tooltip.
         *
         * @param {string} option - Nombre de la propiedad que se desea gestionar.
         * @param {*} [value] - Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro.
         * @function  option
         * @example
         * // Obtener el valor de la posición
         * $("#idTooltip").rup_tooltip("option", "position");
         * // Establecer el valor de la posición
         * $("#idTooltip").rup_tooltip("option", "position", {offset: "15 15"});
         */
        option: function (option, value) {
            return $(this).qtip('option', option, value);
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_tooltip('extend', {
        _init: function (args) {
            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {
                if ($(this).length > 0) { //Evitar invocaciones sin objetos (grid)

                    var settings = $.extend({}, $.fn.rup_tooltip.defaults, args[0]),
                        isGrid = this[0].className.indexOf('rup-grid') !== -1;

                    //Identificador de la capa del tooltip
                    if (settings.id === undefined) {
                        settings.id = $(this).attr('id');
                    }

                    if (isGrid) {
                        $(this)
                            //Modificar atributo 'title' por 'rup_tooltip'
                            .each(function (index, element) {
                                $.attr(this, 'rup_tooltip', $.attr(this, 'title'));
                                if (element.localName === 'img') {
                                    $(element).parents('td').attr('rup_tooltip', $(element).attr('rup_tooltip'));
                                }
                            })
                            //Eliminar atributo 'title'
                            .removeAttr('title');

                        settings = {
                            content: ' ',
                            position: {
                                target: 'event',
                                effect: false
                            },
                            show: {
                                delay: settings.show.delay
                            },
                            hide: {
                                delay: 0 //Para que funcione correctamente en las tablas
                            },
                            events: {
                                show: function (event, api) {
                                    var target = $(event.originalEvent.target);
                                    if (target.length) {
                                        //Recorrer hasta encontrar atributo o ser columna
                                        while (target.attr('rup_tooltip') === undefined && target[0].nodeName !== 'TD') {
                                            target = $(target).parent();
                                        }

                                        //Correción para datos vacíos
                                        api.set('content.text', (target.attr('rup_tooltip') === '') ? ' ' : target.attr('rup_tooltip'));
                                        if (target.attr('rup_tooltip') === '' || target.attr('rup_tooltip') === ' ') {
                                            target.qtip('destroy');
                                        }

                                        //Si es última columna que comience en la izquierda
                                        //Obtenemos la columna (puede que el target sea A, IMG, ...)
                                        if (target[0].nodeName !== 'TD') {
                                            target = $(target).parents('td');
                                        }
                                        //Cambiamos posición tooltip
                                        if (target.nextAll('td:visible').length == 0) {
                                            api.set('position.my.x', 'right'); //Última columna
                                        } else {
                                            api.set('position.my.x', 'left'); //Otra columna
                                        }

                                        //Cambiamos el objetivo del tooltip (puede que el target sea A, IMG, ...)
                                        api.set('position.target', target);
                                    }
                                },
                                render: function () {
                                    if ($.rup_utils.aplicatioInPortal()) {
                                        $('div.r01gContainer').append($(this));
                                        if (($('#qtip-overlay').length !== 0)) {
                                            $('div.r01gContainer').append($('#qtip-overlay'));
                                        }
                                    }
                                }
                            }
                        };

                        //Unificar en una capa el TOOLTIP
                        $(this).qtip(settings);
                    } else {
                        var thisPortal;

                        thisPortal = this;

                        if (settings.open !== undefined) {
                            settings.events.show = settings.open;
                        }

                        if (settings.close !== undefined) {
                            settings.events.hide = settings.close;
                        }

                        settings.events.render = function () {
                            if ($.rup_utils.aplicatioInPortal()) {
                                $('div.r01gContainer').append($(this));
                                if (($('#qtip-overlay').length !== 0)) {
                                    $('div.r01gContainer').append($('#qtip-overlay'));
                                }
                            }
                        };

                        $(thisPortal).qtip(settings);

                        if (settings.disabled) {
                            $(thisPortal).qtip('disable');
                        }
                    }
                }
                //Se audita el componente
                //$.rup.auditComponent('rup_tooltip', 'init');
            }
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_tooltip.defaults = {
        disabled: false,
        applyToPortal: false,
        show: {
            delay: 0
        },
        //tooltip
        position: {
            my: 'top left',
            at: 'bottom right',
            target: 'event',
            effect: false
        },
        events: {}
    };

    /**
     * Función que se ejecutará cuando se muestre el tooltip.
     *
     * @callback jQuery.rup_tooltip~onOpen
     * @example
     * $("#idTooltip").rup_tooltip({
     *   open: function(){
     *   }
     * });
     */

    /**
     * Función que se ejecutará cuando se oculte el tooltip.
     *
     * @callback jQuery.rup_tooltip~onClose
     * @example
     * $("#idTooltip").rup_tooltip({
     *   close: function(){
     *   }
     * });
     */

    /**
     * @description Propiedades de configuración del componente.
     * @see Para mas información consulte la documentación acerca de las opciones de configuración del plugin {@link http://qtip2.com/options|qTip2}.
     *
     * @name jQuery.rup_tooltip#options
     * @property {boolean} [disabled=false] - booleano que indica si el tooltip está habilitado o no.
     * @property {boolean} [applyToPortal=false] - Parámetro encargado de determinar si el componente tooltip se aplica, también, al código html adscrito a los portales de la infraestructura de EJIE. El parámetro acepta el valor true, para indicar que se aplique al portal, y el valor false, para indicar que no se aplique al portal.
     * @property {object} [content] - Configura el texto del tooltip (si no se ha definido en el title).
     * @property {string} [content.text] - Texto del tooltip.
     * @property {string} [content.title] - Tooltip en formato diálogo y este parámetro define el título del mismo.
     * @property {object} [position] - Configura la posición del tooltip y tiene (entre otros) los siguientes parámetros.
     * @property {string} position.my=top left - Posición en la que es colocado el tooltip a mostrar parámetros.
     * @property {string} position.at=bottom left - Posición respecto al objeto al que se aplica el tooltip.
     * @property {string} position.target - Si se quiere definir sobre qué elemento debe aplicarse el tooltip. parámetros.
     * @property {object} [show] - Configura el modo/evento en el que se despliega el tooltip.
     * @property {string} show.event=mouseenter - Evento con el que se muestra el tooltip.
     * @property {object} show.modal - Configura el modo/evento en el que se despliega el tooltip.
     * @property {object} [hide] - Configura el modo/evento en el que se oculta el tooltip.
     * @property {object} hide.event=mouseleave - Evento con el que se oculta el tooltip.
     * @property {jQuery.rup_tooltip~onOpen} [open] - Permite asociar una función que se ejecutará cuando se muestre el tooltip.
     * @property {jQuery.rup_tooltip~onClose} [close] - Permite asociar una función que se ejecutará cuando se oculte el tooltip.
     */

}));
