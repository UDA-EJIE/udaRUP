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
 * Un menú contextual consta de un menú dentro de una interfaz gráfica que se muestra a partir de una interacción del usuario. El menú contextual muestra una serie de opciones disponibles en el contexto o estado actual de la aplicación.
 *
 * @summary Componente RUP ContextMenu.
 * @module rup_contextMenu
 * @example
 * var properties = {
 *  items : {
 *       "edit": {name: "Edit", icon: "edit"},
 *       "cut": {name: "Cut", icon: "cut"},
 *       "copy": {name: "Copy", icon: "copy"},
 *       "paste": {name: "Paste", icon: "paste"},
 *       "delete": {name: "Delete", icon: "delete"},
 *       "sep1": "---------",
 *       "quit": {name: "Quit", icon: "quit"}
 *   }
 * };
 *
 * $('#contextMenu').rup_contextMenu(properties);
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'jquery-contextmenu'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************


    var rup_contextMenu = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_contextMenu', rup_contextMenu));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_contextMenu('extend', {
        /**
       * Muestra el menú contextual.
       *
       * @name show
       * @function
       * @example
       * $("#contextMenu").rup_contextMenu("show");
       */
        show: function (position) {
            $(this).contextMenu(position);
        },
        /**
       * Oculta el menú contextual.
       *
       * @name jQuery.rup_contextMenu#hide
       * @function
       * @example
       * $("#contextMenu").rup_contextMenu("hide");
       */
        hide: function () {
            $(this).contextMenu('hide');
        },
        /**
       * Habilita el menú contextual. El menú se mostrará al lanzarse el evento asociado.
       *
       * @name enable
       * @function
       * @example
       * $("#contextMenu").rup_contextMenu("enable");
       */
        enable: function () {
            $(this).contextMenu(true);
        },
        /**
       * Deshabilita el menú contextual. El menú no se mostrará aunque se lance el evento asociado.
       *
       * @name disable
       * @function
       * @example
       * $("#contextMenu").rup_contextMenu("disable");
       */
        disable: function () {
            $(this).contextMenu(false);
        },
        /**
       * Elimina el menú contextual.
       *
       * @name destroy
       * @function
       * @param {string} selector - Selector a usar en la eliminación del componente.
       * @example
       * $("#contextMenu").rup_contextMenu("destroy", "#contextMenu");
       */
        destroy: function (selector) {
            $.contextMenu('destroy', selector);
        }
    });


    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_contextMenu('extend', {
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
                var $self = this,
                    settings = $.extend({}, $.fn.rup_contextMenu.defaults, args[0]);

                //Asociar el selector - DEPRECATED - Ahora debe validarse su especificación al crear el componente           
                //settings.selector = $self.selector;
                if (!settings.selector || $(settings.selector).length === 0) {
                    $.rup_messages('msgAlert', {
                        message: $.rup.i18nParse($.rup.i18n.base, 'rup_global.selectorError')
                    });
                    return;
                }

                //TODO:ejemplo de title en el contextMenu
                //Procesar items para i18n

                if ($.rup_utils.aplicatioInPortal()) {
                    settings.appendTo = '.r01gContainer';
                }

                //Lanzar el plugin subyaciente
                jQuery.contextMenu(settings);

                /* Añadir el estilo para la modificación del estilo del puntero del ratón */
                $self.addClass('context-menu-cursor');
                if (jQuery.rup.browser.isIE) {
                    $self.css('cursor', settings.msieCursorCss);
                }


                /* Adecuar los cssSprites */
                $.each($('.context-menu-list.context-menu-root'), function (index, elem) {
                    var $elem = jQuery(elem);
                    if ($elem.data('contextMenuRoot').selector === settings.selector) {
                        $elem.attr('id', $elem.data('contextMenuRoot').ns.substring(1));
                        $.each($('.context-menu-item'), function (index, item) {
                            var $item = jQuery(item),
                                contextMenuKey = $item.data('contextMenuKey'),
                                cssSprite, itemCfg;
                            if (contextMenuKey !== undefined) {
                                itemCfg = settings.items[contextMenuKey];
                                if (itemCfg !== undefined) {
                                    cssSprite = itemCfg.cssSprite;
                                    if (cssSprite !== undefined && !$item.hasClass('rup-css-sprite')) {
                                        $item.addClass('rup-css-sprite');
                                        $item.prepend($('<span>').addClass(cssSprite));
                                    }
                                    if (itemCfg.id !== undefined) {
                                        $item.attr('id', itemCfg.id);
                                    }
                                    // Añade el icono especificado en su configuracion
                                    if (itemCfg.icon != undefined) {
                                        // Para cuando son iconos de la liberia @mdi/font
                                        if (itemCfg.icon.indexOf('mdi') >= 0) {
                                            $item.prepend('<i class="mdi ' + itemCfg.icon + ' mr-2"></i>');
                                        }
                                        // Para cuando se usan otras librerias de iconos
                                        else {
                                            $item.prepend('<i class="' + itemCfg.icon + ' mr-2"></i>');
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
                //Se audita el componente
                $.rup.auditComponent('rup_contextMenu', 'init');
            }
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************

    /**
    * Función de callback a ejecutar cuando se muestra el menú contextual.
    *
    * @callback jQuery.rup_contextMenu~onShowEvent
    * @param {object} opt - Opciones de configuración.
    * @return {boolean} - En caso de devolver false no se termina mostrando el menú.
    */

    /**
    * Función de callback a ejecutar cuando se oculta el menú contextual.
    *
    * @callback jQuery.rup_contextMenu~onHideEvent
    * @param {object} opt - Opciones de configuración.
    * @return {boolean} - En caso de devolver false no se termina ocultando el menú.
    */

    /**
    * Función de callback a ejecutar a partir de los eventos indicados en la propiedad trigger.
    *
    * @callback jQuery.rup_contextMenu~position
    * @param {jQuery} $menu - Referencia jQuery al objeto propio.
    * @param {number} x - Coordenada x proporcionada por el evento de mostrar el menú.
    * @param {number} y - Coordenada y proporcionada por el evento de mostrar el menú.
    */

    /**
    * Esta propiedad permite especificar una función de callback por defecto para aquellos ítems que no hayan especificado una función propia.
    *
    * @callback jQuery.rup_contextMenu~callback
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
    * @callback jQuery.rup_contextMenu~build
    * @param {jQuery} $trigger - Referencia jQuery del objeto disparador del callback.
    * @param {object} e - Objeto event correspondiente al evento que desencadena el callback.
    * @return {object} - Objeto de configuración del componente.
    * @example
    * $(".contextMenu-other").rup_contextMenu({
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
    * @property {jQuery.rup_contextMenu~onShowEvent} events.show - Función a ejecutar antes de que se muestre el menú.
    * @property {jQuery.rup_contextMenu~onHideEvent} events.hide - Función a ejecutar antes de que se oculte el menú.
    * @property {jQuery.rup_contextMenu~position} position - Función de callback que se ejecuta a partir de los eventos indicados en la propiedad trigger.
    * @property {string} determinePosition - Determina la posición del menú contextual de acuerdo al elemento disparador.
    * @property {jQuery.rup_contextMenu~callback} [callback] - Esta propiedad permite especificar una función de callback por defecto para aquellos ítems que no hayan especificado una función propia.
    * @property {jQuery.rup_contextMenu~build} [build] - Función de callback que devuelve el objeto de configuración del componente. En caso de especificar una función para la propiedad build la creación del menú no se realiza inicialmente sino que se demora hasta que se ejecuta el evento que lo muestra.
    * @property {boolean} [showCursor=true] - Determina si se va a modificar el estilo del puntero del ratón al posicionarse sobre el elemento que dispone de menú contextual. El tipo de puntero se determina mediante la clase CSS context-menu-cursor.
    * @property {string} [msieCursorCss="url("+$.rup.RUP+"/css/cursors/context-menu.cur),default"] - Esta propiedad se emplea para poder modificar la apariencia del cursor en Internet Explorer al posicionarse sobre un elemento que dispone de un menú contextual. Esto es debido a que el modo en el que hay que realizar la asignación del nuevo cursor no se puede realizar mediante un class
    */

    $.fn.rup_contextMenu.defaults = {
        autoHide: true,
        showCursor: true,
        msieCursorCss: 'url(' + $.rup.RUP + '/css/cursors/context-menu.cur),default'
    };

}));