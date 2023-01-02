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
//require(["jquery", "require-jqueryui"],function (jQuery, widgetMenu) {

/**
 * Menú de la aplicación mantenido a lo largo de todas las páginas de forma consistente que muestra entradas directas a secciones clave de la aplicación.
 *
 * @summary Componente RUP Menu.
 * @module rup_menu
 * @example
 * var properties={
 *   // Propiedades de configuración
 * };
 *
 * $("#idMenu").rup_menu(properties);
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



    //*****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //*****************************************************************************************************************


    var rup_menu = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_menu', rup_menu));

    //********************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //********************************

    $.fn.rup_menu('extend', {
        /**
         * Deshabilita una opción de menú.
         *
         * @function disable
         * @param {string} entryMenuId - Identificador de la opción de menú que se desea deshabilitar.
         * @example
         * $("#idlanguage").rup_menu("disable","opAdmin);
         */
        disable: function (entryMenuId) {
            var entryMenu = $('#' + entryMenuId);
            entryMenu.addClass('ui-state-disabled');
            //			entryMenu.on("click", function(event){event.preventDefault(); event.stopImmediatePropagation();});
        },
        /**
         * Habilita una opción de menú.
         *
         * @name enable
         * @function
         * @param {string} entryMenuId - Identificador de la opción de menú que se desea habilitar.
         * @example
         * $("#idlanguage").rup_menu("enable","opAdmin);
         */
        enable: function (entryMenuId) {
            var entryMenu = $('#' + entryMenuId);
            entryMenu.removeClass('ui-state-disabled');
            //			entryMenu.off("click");
        }
    });

    //********************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //********************************

    $.fn.rup_menu('extend', {
        /**
         * Método de inicialización del componente.
         *
         * @function  _init
         * @private
         * @param {string} args - Opciones de configuración del componente.
         */
        _init: function (args) {

            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError' + $(this).attr('id')));
            } else {
                if (this.length > 0) {

                    //Se recogen y cruzan las paremetrizaciones del objeto
                    var settings = $.extend(true, {}, $.fn.rup_menu.defaults, args[0]),
                        self = this,
                        selectorSelf = this,
                        menuId = self[0].id,
                        json, json_i18n;

                    //visualizacion de los menus
                    //Se oculta la capa para que no aparezca deformada
                    selectorSelf.removeClass('rup_invisible_menu');

                    //Se determina el identificador de los literales y se cargan los mismos
                    if (settings.i18nId === undefined) {
                        settings.i18nId = menuId;
                    }

                    json_i18n = $.rup.i18n.app[settings.i18nId];

                    //Obtener estructura y literales
                    if (settings.menu !== undefined) {
                        json = settings.menu;
                    } else if (settings.json !== undefined) {
                        json = settings.json;
                    }

                    //Se extienden las funcionalidades del menú para ajustarlas a las necesidades de funcionamiento del rup_menu
                    //						widgetMenu.widget( "ui.rupMenu", widgetMenu.ui.menu, $.rup.compatibility.menu );

                    //En caso de ser necesario, se secra el objeto que compondra la estructura del menu
                    if (json !== undefined) {
                        //Generar estructura de menu
                        self._parseJSON(json, json_i18n, selectorSelf, settings.forceAbs);
                        selectorSelf = window.widgetMenu('#' + self.attr('id'));
                    }

                    //Se trata el evento de selección para que se produzca una redirección de menú automática
                    var selectUserEvent = settings.select;
                    settings.select = function (event, ui) {
                        if (selectUserEvent !== undefined && selectUserEvent !== null) {
                            if (typeof selectUserEvent === 'function') {
                                if (selectUserEvent(event, ui) === false) {
                                    return false;
                                }
                            }
                        }
                        //Comportamiento por defecto del evento
                        if (/^keydown/.test(event.originalEvent.type)) {
                            event.stopImmediatePropagation();

                            var redirectObject = $(ui.item.children());

                            if (redirectObject.attr('target') !== '_blank') {
                                $(location).attr('href', redirectObject.attr('href'));
                            } else {
                                if ($.rup.browser.isFF) {
                                    var wm = window.Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(window.Components.interfaces.nsIWindowMediator);
                                    var recentWindow = wm.getMostRecentWindow('navigator:browser');
                                    recentWindow.delayedOpenTab(redirectObject.attr('href'), null, null, null, null);
                                } else if ($.rup.browser.isChrome) {
                                    window.chrome.tabs.create({
                                        'url': redirectObject.attr('href')
                                    });
                                } else {
                                    window.open(redirectObject.attr('href'), '_blank');
                                }
                            }
                        }

                        return false;
                    };


                    //Enlaces externos (add icon)
                    selectorSelf.find('a[target=\'_blank\']').append('<span class=\'ui-icon ui-icon-extlink rup_external_link\'></span>');

                    //Se comienza a crear el menu segun el tipo
                    if (settings.display === 'horizontal') {

                        //							selectorSelf.on("mouseenter", ".rup_menu_horizontal_children.ui-menu-item", function( event ) {
                        //								event.stopImmediatePropagation();
                        //								event.preventDefault();
                        //								event.stopPropagation();
                        //								return false;
                        //							});

                        selectorSelf.on('mouseenter', '.ui-menu-item', function (event) {
                            // Ignore mouse events while typeahead is active, see #10458.
                            // Prevents focusing the wrong item when typeahead causes a scroll while the mouse
                            // is over an item in the menu
                            var $uiMenu = selectorSelf.data().uiMenu;

                            if ($uiMenu.previousFilter) {
                                return;
                            }
                            var target = $(event.currentTarget);
                            //								console.log("rup-this:");
                            //								console.log($uiMenu);
                            //								console.log("rup-taget:");
                            //								console.log(target);
                            //								console.log("position:");
                            //								console.log($uiMenu.options.position);

                            if (target.hasClass('rup_menu_horizontal_children')) {
                                $uiMenu.options.position = {
                                    my: 'left top',
                                    at: 'left bottom',
                                    collision: 'none none',
                                    of: this
                                };
                            } else {
                                $uiMenu.options.position = {
                                    my: 'left bottom',
                                    at: 'right bottom'
                                };
                            }

                            // Remove ui-state-active class from siblings of the newly focused menu item
                            // to avoid a jump caused by adjacent elements both having a class with a border
                            target.siblings('.ui-state-active').removeClass('ui-state-active');
                            $uiMenu.focus(event, target);
                            event.stopImmediatePropagation();
                            event.preventDefault();
                            event.stopPropagation();
                            return false;
                        });

                        //							selectorSelf.on("mouseenter", " .rup_menu_vertical_horizontal.ui-menu", function( event ) {
                        //
                        //								$(this).addClass(".ui-state-active");
                        //
                        //								event.stopImmediatePropagation();
                        //								event.preventDefault();
                        //								event.stopPropagation();
                        //								return false;
                        //							});

                        //							selectorSelf.on("mouseleave",".rup_menu_horizontal_children.ui-menu-item,.rup_menu_vertical_horizontal.ui-menu",function(event){
                        //
                        //								$(this).parents(".ui-state-active").removeClass("ui-state-active");
                        //
                        //								return false;
                        //							});
                        selectorSelf.on('keydown', function (event) {

                            var $uiMenu = selectorSelf.data().uiMenu;
                            //								console.log($uiMenu.active);

                            switch (event.keyCode) {
                            case $.ui.keyCode.UP:
                                $uiMenu.previous(event);
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case $.ui.keyCode.DOWN:
                                if ($uiMenu.active && !$uiMenu.active.is('.ui-state-disabled')) {
                                    if ($uiMenu.active.hasClass('rup_menu_horizontal_children')) {
                                        $uiMenu.options.position = {
                                            my: 'left top',
                                            at: 'left bottom',
                                            collision: 'none none',
                                            of: $uiMenu.active
                                        };
                                        $uiMenu.expand(event);
                                    } else {
                                        $uiMenu.next(event);
                                    }

                                }
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case $.ui.keyCode.LEFT:
                                if (!$uiMenu.active.hasClass('rup_menu_horizontal_children')) {
                                    $uiMenu.collapse(event);
                                } else {
                                    $uiMenu.previous(event);
                                }
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case $.ui.keyCode.RIGHT:
                                if (!$uiMenu.active.hasClass('rup_menu_horizontal_children') && $uiMenu.active.is('[aria-haspopup=\'true\']')) {
                                    $uiMenu.options.position = {
                                        my: 'left bottom',
                                        at: 'right bottom'
                                    };
                                    $uiMenu.expand(event);
                                } else {
                                    $uiMenu.next(event);

                                }
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            case $.ui.keyCode.HOME:
                                $uiMenu._move('first', 'first', event);
                                event.stopImmediatePropagation();
                                event.preventDefault();
                                event.stopPropagation();
                                break;
                            }
                        });

                        //
                        //							selectorSelf.on("click", ".rup_menu_horizontal_children.ui-menu-item", function( event ) {
                        //								event.stopImmediatePropagation();
                        //								event.preventDefault();
                        //								event.stopPropagation();
                        //								this.focus();
                        //								return false;
                        //							});

                        //							selectorSelf.on("click", ".rup_menu_horizontal_children.rup_menu_horizontal_children_double.ui-menu-item", function( event ) {
                        //								console.log(this);
                        ////								$(this).removeClass("ui-state-active");
                        //
                        //								var $uiMenu = selectorSelf.data().uiMenu;
                        //
                        //
                        ////								var $submenu = $(this).children("ul");
                        //								$uiMenu.options.position = { my: "left top", at: "left bottom", collision:"none none", of: this };
                        //
                        //								if ( $uiMenu.previousFilter ) {
                        //									return;
                        //								}
                        //								var target = $( this);
                        //								// Remove ui-state-active class from siblings of the newly focused menu item
                        //								// to avoid a jump caused by adjacent elements both having a class with a border
                        //								target.siblings( ".ui-state-active" ).removeClass( "ui-state-active" );
                        //								$uiMenu.focus( event, target );
                        //
                        ////								$submenu
                        ////									.show()
                        ////									.removeAttr( "aria-hidden" )
                        ////									.attr( "aria-expanded", "true" )
                        ////									.position($uiMenu.options.position);
                        ////								$(this).removeClass("ui-state-active");
                        ////								event.stopImmediatePropagation();
                        ////								event.preventDefault();
                        ////								event.stopPropagation();
                        ////								return false;
                        //							});

                        //Se asocian los estilos específicos del menú horizontal
                        selectorSelf.addClass('rup_menu_horizontal').addClass('ui-widget-header');
                        selectorSelf.children().addClass('rup_menu_horizontal_children');
                        selectorSelf.children().children('a').addClass('rup_menu_horizontal_children_entry');

                        selectorSelf.menu(settings);

                        //Se borran las entradas separadoras. En el menu horizontal no tienen sentido.
                        selectorSelf.children('.ui-menu-divider').remove();

                        //Ajustes de estilos para la primera capa del menu horizontal
                        selectorSelf.children('.ui-state-disabled').css({
                            'margin-top': '0em',
                            'margin-bottom': '0em'
                        });
                        $('#' + menuId + ' li.rup_menu_horizontal_children > a .ui-icon-caret-1-e').removeClass('ui-icon-caret-1-e').addClass('ui-icon-caret-1-s').addClass('rup-menu_horizontalIcon');
                        selectorSelf.children().children('a').css('font-weight', 'bold');
                        selectorSelf.children().each(function (position, object) {
                            var iconsWidth = 0;
                            $(object).children('.rup_menu_horizontal_children_entry:has(span:not(.rup-menu_horizontalIcon))').each(function (position, object) {
                                if ($(object).find('span').length === 1) {
                                    iconsWidth = $(object).find('span').width();
                                } else {
                                    iconsWidth = $(object).find('span:not(.rup-menu_horizontalIcon)').width() / 2;
                                }
                            });
                            $(object).css('width', $(object).width() + iconsWidth);
                        });
                        selectorSelf.children().children('a').css('font-weight', '');
                        selectorSelf.children(':has(.rup_menu_horizontal_children_entry span:not(.rup-menu_horizontalIcon))').addClass('rup_menu_horizontal_childrenIcon');
                        selectorSelf.find('.rup_menu_horizontal_children_entry span:not(.rup-menu_horizontalIcon)').addClass('rup_menu_horizontal_children_icon');
                        selectorSelf.children(':has(.rup_menu_horizontal_children_entry span.rup-menu_horizontalIcon)').addClass('rup_menu_horizontal_childrenMenuIcon');
                        selectorSelf.children(':has(.rup_menu_horizontal_children_entry span.rup_menu_horizontal_children_icon):has(span.rup-menu_horizontalIcon)').addClass('rup_menu_horizontal_children_double');
                        selectorSelf.children(':last-child').addClass('rup_menu_horizontal_children_last');

                        //Asignación de los menús desplegables de primer menú

                        selectorSelf.children().children('[aria-haspopup=\'true\']').parent().attr('rupMenu_firsLevel', 'true');
                        $('#' + menuId + ' [rupmenu_firslevel=\'true\'] [role=\'menu\']').addClass('rup_menu_vertical_horizontal');
                        if (settings.verticalWidth === undefined) {
                            $('#' + menuId + ' [rupmenu_firslevel=\'true\'] [role=\'menu\']').css('white-space', 'nowrap');
                        } else {
                            $('#' + menuId + ' [rupmenu_firslevel=\'true\'] [role=\'menu\']').css('width', settings.verticalWidth);
                        }

                        //Enlaces externos en primer nivel: editar estilos
                        selectorSelf.find('a[target=\'_blank\'] span.rup_menu_horizontal_children_icon').each(function (span_pos, span) {
                            //Cambiarlo en span con enlace externo (puede que haya otros span con iconos)
                            if ($(span).is('.ui-icon-extlink')) {
                                $(span).addClass('ui-menu-icon').removeClass('rup_menu_horizontal_children_icon');
                            }
                        });

                        //Si tiene enlace externo y otro enlace, se debe ampliar el LI y cambiar el margen del ext_link
                        var twoIconsLI = selectorSelf.find('a[target=\'_blank\'] span.rup_menu_horizontal_children_icon').parents('li');
                        twoIconsLI.css('width', twoIconsLI.width() + 16);
                        twoIconsLI.find('span.ui-icon-extlink').css('margin-left', '-1em');


                    } else if (settings.display === 'vertical') {

                        //Se le especifica el tamaño del menu
                        selectorSelf.addClass('rup_menu_vertical');
                        if (settings.verticalWidth === undefined) {
                            selectorSelf.css('white-space', 'nowrap');
                        } else {
                            selectorSelf.css('width', settings.verticalWidth);
                        }
                        selectorSelf.children().addClass('rup_menu_vertical_children');

                        //Se invoca a la generacion del menu
                        selectorSelf.menu(settings);

                        //Se ajustan los tamaños de las sub-entradas del menú
                        if (settings.verticalWidth !== undefined) {
                            $('#' + menuId + ' .ui-menu .ui-menu-item').css('width', settings.verticalWidth);
                        }

                    } else {
                        $.rup.errorGestor($.rup.i18n.base.rup_menu.displayMenuError);
                    }

                    // Ajuste estilos
                    selectorSelf.addClass('ui-corner-all');
                    selectorSelf.find('ul.rup_menu_vertical_horizontal').addClass('ui-corner-all');


                    //Ajuste margen iconos
                    var icon = false;
                    //Buscar ULs verticales
                    $('ul.rup_menu_vertical, ul.rup_menu_vertical ul, ul.rup_menu_vertical_horizontal').each(function (ul_pos, ul) {
                        //Localizar SPANS
                        $(ul).children('li').children('a').children('span').each(function (span_pos, span) {
                            //Comprobar que el SPAN tiene un icono propio
                            if (!$(span).is('.ui-icon.ui-icon-extlink, .ui-icon.ui-icon-carat-1-e')) {
                                icon = true;
                                return false;
                            }
                        });
                        //Si tiene icono propio se aplica estilo a todos enlaces (margen)
                        if (icon) {
                            $(ul).children('li').children('a').css('padding-left', '2em');
                        }
                        //Restablecer variable
                        icon = false;
                    });

                    //Ajuste de estilos para cubrir arista
                    //						$("#"+menuId+" [role = 'menuitem']").not($("[aria-haspopup = 'true']")).css("text-decoration","underline");

                    //Se deshabilitan los botones desconectados
                    selectorSelf.find('a').on('click', function (event) {
                        if ($(event.currentTarget).hasClass('ui-state-disabled')) {
                            event.preventDefault();
                            event.stopImmediatePropagation();
                        }
                    });

                    //Se asocia un "tabIndex=-1" a todos los enlaces deshabilitados
                    //						selectorSelf.find(".ui-state-disabled").attr("tabindex","-1");
                }
            }
            //Se audita el componente
            $.rup.auditComponent('rup_menu', 'init');
        },
        /**
         * Parsea un objeto json para generar la estructura de menú de acuerdo a la información contenida en el.
         *
         * @function  _parseJSON
         * @private
         */
        _parseJSON: function (json, json_i18n, self, force) {
            var submenu, element, objectUrl = '',
                entry;

            //Se transforma el objeto base del menu
            if (self.attr('uda-submenu') === 'true') {
                self.attr('uda-submenu', '');
            } else {
                self.replaceWith($('<ul>').attr('id', self.attr('id')).attr('style', self.attr('style')).attr('class', self.attr('class')));
                self = $('#' + self.attr('id'));
            }

            //Recorrer json para añadir elementos
            for (var i = json.length; i--;) {
                element = json[i];
                entry = $('<a>');
                if (element !== undefined) {
                    if (element.divider !== null && element.divider !== true) {
                        if ((element.pathUrl !== undefined) || (element.url !== undefined)) {
                            if (element.pathUrl !== undefined) {
                                if ((force === true) || (element.forceAbs === true)) {
                                    objectUrl = $.rup_utils.relToAbsUrl(element.pathUrl);
                                } else {
                                    objectUrl = element.pathUrl;
                                }
                            } else {
                                objectUrl = $.rup.CTX_PATH + element.url;
                            }


                            if (element.newWindow !== true) {
                                if (element.icon !== undefined) {
                                    self.prepend($('<li>').append(
                                        entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).attr('href', objectUrl).css('text-decoration', 'underline').append(
                                            $('<span>').addClass('ui-icon').addClass(element.icon)
                                        )
                                    ));
                                } else {
                                    self.prepend($('<li>').append(
                                        entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).attr('href', objectUrl).css('text-decoration', 'underline')
                                    ));
                                }
                            } else {
                                if (element.icon !== undefined) {
                                    self.prepend($('<li>').append(
                                        entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).attr('href', objectUrl).attr('target', '_blank').css('text-decoration', 'underline').append(
                                            $('<span>').addClass('ui-icon').addClass(element.icon)
                                        )
                                    ));
                                } else {
                                    self.prepend($('<li>').append(
                                        entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).attr('href', objectUrl).attr('target', '_blank').css('text-decoration', 'underline')
                                    ));
                                }
                            }

                        } else {
                            //Si no tiene enlace es submenu
                            if (element.icon !== undefined) {
                                self.prepend($('<li>').append(
                                    entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).css('cursor', 'default').append($('<span>').addClass('ui-icon').addClass(element.icon))
                                ).append($('<ul>').attr('uda-submenu', 'true')));
                            } else {
                                self.prepend($('<li>').append(
                                    entry.text($.rup.i18nParse(json_i18n, element.i18nCaption)).css('cursor', 'default')
                                ).append($('<ul>').attr('uda-submenu', 'true')));
                            }
                            //Obtener el elemento que va a ser el submenu
                            submenu = $('[uda-submenu = \'true\']');
                            //Llamada recursiva para añadir subelementos del submenu
                            submenu.append(this._parseJSON(element.submenu, json_i18n, submenu));
                        }

                        if (element.disabled === true) {
                            entry.parent().addClass('ui-state-disabled');
                        }
                    } else {
                        if (element.i18nCaption === undefined) {
                            self.prepend($('<li>').addClass('ui-widget-content ui-menu-divider'));
                        } else {
                            self.prepend($('<li>').append($('<strong>').text($.rup.i18nParse(json_i18n, element.i18nCaption))));
                        }
                    }
                }
            }
        }
    });

    //*******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //*******************************************************
    /**
     * Opciones por defecto de configuración del componente.
     * @name defaults
     *
     * @property {string} [verticalWidth=undefined] - Valor asociado a cada menú que determinara la anchura vertical del mismo. Este parámetro tiene cabida, tanto, en menús verticales, como, en menús horizontales (al fin y al cabo los dos tienen partes verticales). En caso de no especificar ningún valor, cada uno de los submenús verticales se ajustara al ancho máximo de sus literales.
     * @property {string} [display=horizontal] - Orientación del menú: horizontal o vertical.
     * @property {string} [i18nId] - Indica el identificador del objeto JSON para la resolución de los literales del componente. En caso de no definirse se tomará el ID del objeto sobre el que se crea el componente.
     * @property {string} [menus=ul] - Parámetro que determina el tag de html que hará de padre para determinar las entradas del menú (tanto para las entradas normales como para las de los submenús).
     * @property {boolean} [forceAbs=false] - Parámetro de configuración que activa el uso de la función relToAbsUrl. Dicha función hace que todas las llamadas relativas se transformen a absolutas. El uso de este parámetro responde a situaciones en el que el navegador, por diferentes cuestiones funcionales, no gestiona bien las urls relativas (se tratan todas las urls relativas como urls absolutas para evitar el posible problema. Por ejemplo: problemas con portales). Este parámetro se puede aplicar tanto a nivel de entrada como a nivel general del menú.
     *
     * @property {object} [menu] - Estructura del menú se define mediante un array en notación JSON cuyo nombre será el mismo que el identificador del elemento sobre el que se aplica el componente. No se limita el número de submenús. Por coherencia se ha decidido que los elementos que contengan submenús no serán enlaces y viceversa.
     * @property {string} menu.i18nCaption - Define la ruta (url) a seguir cuando se pulse sobre el elemento, en caso de no tener submenú. La especificación de las rutas (urls), se puede hacer de forma relativa o de forma absoluta. (véase el capítulo 11. Formato de las urls).
     * @property {object} menu.submenu - Define una estructura JSON submenú.
     * @property {boolean} [menu.newWindow=false] - Si el valor es true, el enlace del menú se abrirá en una nueva ventana del navegador, en caso contrario (false), se aplicará sobre la ventana que alberga el menu. Todas las entradas de este tipo, serán indicadas mediante el icono “external link”.
     * @property {boolean} [menu.divider=false] - Parámetro encargado de indicar si la entrada del menú es un elemento de división o un objeto del menú. Cuando el valor de “divider” sea true, la entrada en cuestión, es un divisor. Existen dos tipos de divisores que se diferencian en la presencia del parámetro "i18nCaption". En caso de no tenerlo, el divisor es únicamente una línea divisora de entradas. En caso contrario, el divisor es una cabecera. En ambos casos, el resto de parámetros no tienen importancia y no serán tomados en cuanta a la hora de componer el menú. Su valor por defecto es false.
     * @property {boolean} menu.disabled - Determina si la entrada del menú esta habilitada o deshabilitada. El valor por defecto del campo es false. Dicho estado puede ser variado mediante las funciones enable y disable del componente.
     * @property {string} menu.icon - Especifica el class que tiene asociado el icono que regirá la entrada de menú.
     */
    $.fn.rup_menu.defaults = {
        verticalWidth: undefined,
        display: 'horizontal',
        forceAbs: false,
        i18nId: undefined,
        menus: 'ul',
        position: {
            my: 'left bottom',
            at: 'right bottom'
        }
    };



}));
