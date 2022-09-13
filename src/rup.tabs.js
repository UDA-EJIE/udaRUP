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

/**
 * Permiten dar acceso de forma compacta a grupos de contenidos mutuamente excluyentes pudiendo ser integradas en zonas muy reducidas de la interfaz.
 *
 * @summary Componente RUP Tabs.
 * @module rup_tabs
 * @see El componente está basado en el plugin {@link https://jqueryui.com/tabs/|jQuery UI Tabs}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://api.jqueryui.com/tabs/|aquí}.
 * @example
 * $("#ejemploArbolDiv").rup_tabs(properties);
 *
 */


(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './templates', 'jquery.scrollto', './rup.base', './rup.tooltip'], factory);
    } else {

        // Browser globals
        factory(jQuery, window.Rup);
    }
}(function (jQuery, Rup) {


    //*****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //*****************************************************************************************************************

    var rup_tabs = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_tabs', rup_tabs));

    //********************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //********************************

    $.fn.rup_tabs('extend', {
        /**
         * Función encargada de deshabilitar una o un conjunto de pestañas de un mismo sub-nivel
         * @function
         * @name disableTabs
         * @param  {string} args.idTab - Selector del componente pestaña
         * @param {integer|object} args.position - Posición de las pestañas a deshabilitar
         * @example
         * //Una única pestaña:
         * $("#tabs").rup_tabs("disableTabs",{
         *    idTab: "tabs",
         *    position: 1
         *    });
         * //Un conjunto de pestañas:
         * $("#tabs").rup_tabs("disableTabs",{
         *    idTab: "tabs",
         *    position: [0,1,2]
         * });
         */
        disableTabs: function (args) {
            var tab;

            if (typeof args.position === 'number') {
                $('#' + args.idTab).tabs('disable', args.position);
                this.trigger('disable', null, tab, $('#' + args.idTab));
            } else if (typeof args.position === 'object') {
                for (var i in args.position) {
                    $('#' + args.idTab).tabs('disable', args.position[i]);
                    this.trigger('disable', null, tab, $('#' + args.idTab));

                }
            } else if (typeof args.position === 'undefined') {
                //deshabilitacion de toda la pestanya del nivel (de momento no se aplica por errores en el plug-in subyacente).
                $('#' + args.idTab).tabs('disable');
                var lengthTab = $('#' + args.idTab).find('.ui-tabs-nav li').length;
                for (var j = 1; j <= lengthTab; j++) {
                    tab = $('#' + args.idTab).find('.ui-tabs-nav li').eq(j);
                    this.trigger('disable', null, tab, $('#' + args.idTab));

                }
            }
        },
        /**
         * Función encargada de habilitar una o un conjunto de pestañas de un mismo subnivel.
         * @function
         * @name enableTabs
         * @param  {string} args.idTab - Selector del componente pestaña
         * @param {integer|object} args.position - Posición de las pestañas a habilitar
         * @example
         * //Una única pestaña:
         * $("#tabs").rup_tabs("enableTabs ",{
         *    idTab: "tabs",
         *    position: 1
         *  });
         * //Un conjunto de pestañas:
         *  $("#tabs").rup_tabs("enableTabs",{
         *    idTab: "tabs",
         *    position: [0,1,2]
         *  });
         */
        enableTabs: function (args) {
            var tab;

            if (typeof args.position === 'number') {
                tab = $('#' + args.idTab).find('.ui-tabs-nav li').eq(args.position);


                $('#' + args.idTab).tabs('enable', args.position);
                this.trigger('enable', null, tab, $('#' + args.idTab));
            } else if (typeof args.position === 'object') {
                for (var i in args.position) {
                    tab = $('#' + args.idTab).find('.ui-tabs-nav li').eq(args.position[i]);

                    $('#' + args.idTab).tabs('enable', args.position[i]);
                    this.trigger('enable', null, tab, $('#' + args.idTab));
                }
            } else if (typeof args.position === 'undefined') {
                //deshabilitacion de toda la pestanya del nivel (de momento no se aplica por errores en el plug-in subyacente).
                $('#' + args.idTab).tabs('enable');
                var lengthTab = $('#' + args.idTab).find('.ui-tabs-nav li').length;
                for (var j = 1; j <= lengthTab; j++) {
                    tab = $('#' + args.idTab).find('.ui-tabs-nav li').eq(j);
                    this.trigger('enable', null, tab, $('#' + args.idTab));

                }
            }
        },
        /**
         * Función que fuerza la recarga de una pestaña. Si se especifica una nueva url, además de recargar la página con la nueva url, se inserta ésta como nueva url de la pestaña
         * @function  Función que fuerza la recarga de una pestaña. Si se especifica una nueva url, además de recargar la página con la nueva url, se inserta ésta como nueva url de la pestaña
         * @name	loadTab
         * @param  {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de la pestaña a recargar
         * @param {string} args.url - Nueva url a cargar.
         * @example
         * //	Recarga simple:
         * $("#tabs").rup_tabs("loadTab",{
         *    idTab: "tabs",
         *    position: 2
         *  });
         * //	Recarga con cambio de url:
         * $("#tabs").rup_tabs("loadTab", {
         *   idTab: "tabs",
         *   position: 2,
         *   url: "/nuevoFragmento" *
         * });
         */
        loadTab: function (args) {
            if (!args.url) {
                $('#' + args.idTab).tabs('load', args.position);
            } else {
                this._changeUrlTab({
                    idTab: args.idTab,
                    position: args.position,
                    url: $.rup_utils.setNoPortalParam(args.url)
                });
            }
        },
        /**
         *
         *  Función encargada de actualizar la url de invocación de una pestaña determinada
         * @function
         * @name changeUrlTab
         * @param  {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de la pestaña a cambiar
         * @param {string} args.url - Nueva url a cargar.
         * @example
         * $("#tabs").rup_tabs("changeUrlTab",{
         *    idTab: "tabs",
         *     position: 1,
         *    url: "nuevaUrl"
         *  });
         */
        changeUrlTab: function (args) {
            //$("#" + args.idTab).tabs("url", args.position, $.rup_utils.setNoPortalParam(args.url));

            // $("#" + args.idTab + ' > ul > li').eq(args.position).attr('href',$.rup_utils.setNoPortalParam(args.url));
            // $("#" + args.idTab).tabs('load', args.position);
            this._changeUrlTab({
                idTab: args.idTab,
                position: args.position,
                url: $.rup_utils.setNoPortalParam(args.url)
            });
        },
        /**
         * Función encargada de actualizar la capa html, previamente cargada, que se muestra en la pestaña determinada
         * @function
         * @name  changeLayerTab
         * @param {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de la pestaña a cambiar
         * @param {string} args.layer - Selector de la capa a cargar.
         * @example
         * $("#tabs").rup_tabs("changeLayerTab",{
         *    idTab: "tabs",
         *   position: 2,
         *   layer: "nuevaSelector"
         * });
         */
        changeLayerTab: function (args) {
            this._includeLayer($('#' + args.idTab + ' ul:first-child'), args.layer, $($('#' + args.idTab + ' ul li a').get(args.position)));
        },
        /**
         * Función encargada de seleccionar una pestaña determinada. El comportamiento es idéntico al click con el ratón.
         * @function
         * @name  selectTab
         * @param {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de la pestaña a seleccionar
         * @example
         * $("#tabs").rup_tabs("selectTab",{
         *    idTab: "tabs",
         *    position: 1,
         *  });
         */
        selectTab: function (args) {
            $('#' + args.idTab).tabs('option', 'active', args.position);
        },

        /**
         * Función encargada de añadir una nueva pestaña cuando el componente ya está creado. Es posible añadir una nueva pestaña al final o entre otras pestañas.
         * @function
         * @name addTab
         * @param {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de las pestaña a añadir
         * @param {string} args.url - la url a añadir a la pestaña.
         * @param {string} args.label - Literal a mostrar en la pestaña.
         * @example
         * $("#tabs").rup_tabs("addTab",{
         *    idTab: "tabs",
         *  position: 2,
         *   url: "fragmento3"
         *  });
         */
        addTab: function (args) {
            var newTab, auxTabName, nameLiteral = 'rup-tabs-',
                insertIndex = 0,
                title = '';

            //limitacion de numero de pestañas abiertas
            if (args.maxNumberTabs !== undefined) {
                var numPestanas = $('#' + args.idTab + ' li').length;
                //si sobrepasamos numero de pestañas lanzamos limitTabs
                if (numPestanas + 1 > args.maxNumberTabs) {
                    $('#' + args.idTab).trigger('limitTabs');
                    return false;
                }
            }
            // para acortar a n caracteres el literalal de la pestana

            if (args.lengthLiteral !== undefined) {
                title = args.label;
                if (args.label.length > args.lengthLiteral) {
                    args.label = args.label.substr(0, args.lengthLiteral).concat('...');
                }
            }

            if (args.tabs !== undefined) {
                if ((args.idNewTab !== undefined) && ($('#' + args.idNewTab).length === 0)) {
                    newTab = $('<div>').attr('id', args.idNewTab);
                    newTab.appendTo('body');
                    auxTabName = this._includeLayer($('#' + args.idTab + ' > ul:first-child'), '#' + args.idNewTab, null);
                    newTab.rup_tabs(args);
                    //$("#" + args.idTab).tabs("add", "#" + args.idNewTab, args.label, args.position);
                    this._addTab({
                        idTab: args.idTab,
                        url: args.idNewTab,
                        label: args.label,
                        position: args.position,
                        orientation: args.orientation
                    });
                    $(auxTabName).remove();
                } else {
                    $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.parameterError'));
                    return false;
                }
            } else if (args.layer !== undefined) {

                //LAYER => Recoge una capa ya cargada de la Jsp
                args.layer = this._includeLayer($('#' + args.idTab + ' > ul:first-child'), args.layer, null);

                //$("#" + args.idTab).tabs("add", args.layer, args.label, args.position);
                this._addTab({
                    idTab: args.idTab,
                    url: args.layer,
                    label: args.label,
                    position: args.position,
                    orientation: args.orientation
                });
                $.each($('#' + args.idTab + ' div[id*=\'' + nameLiteral + '\']'), function (index, object) {
                    if (insertIndex < parseFloat(object.id.split(nameLiteral)[1])) {
                        insertIndex = object.id.split(nameLiteral)[1];
                    }
                });
                //$("#"+args.idTab+" div[id='rup-tabs-"+insertIndex+"']").addClass("ui-tabs-hide");

            } else {
                //$("#" + args.idTab).tabs("add", $.rup_utils.setNoPortalParam(args.url), args.label, args.position);
                this._addTab({
                    idTab: args.idTab,
                    url: $.rup_utils.setNoPortalParam(args.url),
                    label: args.label,
                    position: args.position,
                    orientation: args.orientation
                });
                $.each($('#' + args.idTab + ' div[id*=\'' + nameLiteral + '\']'), function (index, object) {
                    if (insertIndex < parseFloat(object.id.split(nameLiteral)[1])) {
                        insertIndex = object.id.split(nameLiteral)[1];
                    }
                });

                $('#' + args.idTab + ' div[id=\'rup-tabs-' + insertIndex + '\']').addClass('ui-tabs-hide');
                //altura fija
                if (undefined !== args.fixedHeight) {
                    $('#' + args.idTab + ' div[id=\'rup-tabs-' + insertIndex + '\']').css('height', args.fixedHeight);
                }

            }

            $('#' + args.idTab + ' ul').first().find('li:nth-child(' + (args.position + 1) + ') a').attr('title', title).rup_tooltip({});


            if (args.tabsAtBottom) {
                var loadLi = $('#' + args.idTab + ' ul li').last().not('.rup-tabs_loading');
                loadLi.removeClass('ui-corner-top').addClass('ui-corner-botttom');
            }

            var pos = args.position;
            if (args.orientation !== undefined) {
                pos = pos - 1;
            }
            var loadSpan = $('#' + args.idTab + ' ul li a').eq(pos);
            if (args.close === true) {
                loadSpan.text('');
                var texto = $.rup.i18nParse($.rup.i18n.app[$(this).attr('id')], args.label);
                if (args.label !== undefined && args.label !== '') {
                    texto = args.label;
                }
                loadSpan.append($('<div>').addClass('rup-tabs_title').text(texto))
                    .append($('<span>').addClass('rup-tabs_loading'))
                    .append('<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>');


                //evento close
                $('span.ui-icon-close').on('click', function () {
                    var div = $(this).parent().parent().parent().parent();
                    var tabContentId = $(this).parent().attr('href');
                    $(this).parent().parent().remove(); //remove li of tab
                    $(tabContentId).remove(); //remove respective tab content

                    (div).tabs('refresh');
                });


                //efecto hover del boton cerrar
                $('span.ui-icon-close').addClass('rup-tabs-close');
                $('span.ui-icon-close').on({
                    mouseenter: function () {
                        $(this).addClass('rup-tabs-close-hover');
                    },

                    mouseleave: function () {
                        $(this).removeClass('rup-tabs-close-hover');
                    }
                });

            } else {
                loadSpan.text('');
                var textoNoClose = $.rup.i18nParse($.rup.i18n.app[$(this).attr('id')], args.label);
                if (args.label !== undefined && args.label !== '') {
                    textoNoClose = args.label;
                }
                loadSpan.append($('<div>').addClass('rup-tabs_title').text(textoNoClose))
                    .append($('<span>').addClass('rup-tabs_loading'));
            }



            //loadSpan.remove();

        },
        /**
         * Función encargada de eliminar una nueva pestaña cuando el componente ya está creado
         * @param {string} args.idTab - Selector del componente pestaña
         * @param {integer} args.position - Posición de las pestaña a eliminar
         */
        removeTab: function (args) {
            //$("#" + args.idTab).tabs("remove", args.position);
            this._removeTab({
                idTab: args.idTab,
                position: args.position
            });
        },
        selected: 0
    });

    //********************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //********************************

    $.fn.rup_tabs('extend', {
        _init: function (args) {
            var $self = $(this);

            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {
                //Se recogen y cruzan las paremetrizaciones del objeto
                var settings = $.extend({}, $.fn.rup_tabs.defaults, args[0]);

                settings.id = $(this).attr('id');
                settings.iniLoad = false;

                this.on('tabsload', () => {
                    setTimeout(function () {
                        $self.trigger('afterTabDataLoad');
                    }, 300);
                });
                //Establecemos el ancho general de las pestañas en caso de venir informado
                if (undefined !== settings.width) {
                    $('#' + settings.id).css('width', settings.width).addClass('rup-tabs_overflow');
                }
                //Establecemos la altura general de las pestañas en caso de venir informada
                if (undefined !== settings.height) {
                    $('#' + settings.id).css('height', settings.height).addClass('rup-tabs_overflow');
                }

                var structure = settings.tabs,
                    profun = 0;

                while (structure !== undefined) {
                    profun = profun + 1;
                    structure = structure[0].tabs;
                }

                settings.profun = profun;
                //Generar estructura
                this._parseJSON(settings.tabs, $.rup.i18n.app[settings.id], $('#' + settings.id), '', 1, settings);

                //Una vez creadas todas las pestanyas, se permite la carga normal de las mismas
                settings.iniLoad = true;

                //Convertir en pestanyas
                this._tabify($('#' + settings.id), settings);

                //altura
                if (undefined !== settings.fixedHeight) {
                    $('#' + settings.id + '>.ui-tabs-panel').css('height', settings.fixedHeight);
                }


                //Añadir evento de conversión a pestanyas en los enlaces
                //$('#'+settings.id).find("a[rupLevel]").click ({disabled: settings.disabled}, tabClick);

                //evento limite de numero de pestañas
                $('#' + settings.id).on('limitTabs', function () {
                	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_tabs.tabLimitError'));
                });

                //Deshabilitar las pestanyas indicadas
                if (settings.disabled !== undefined) {
                    for (var i in settings.disabled) {
                        $('#' + settings.id).rup_tabs('disableTabs', {
                            idTab: i,
                            position: settings.disabled[i]
                        });
                    }
                }
                $('#' + settings.id).triggerHandler('load');
            }

            //Se audita el componente
            $.rup.auditComponent('rup_tabs', 'init');
        },
        //Funcion encargada de crear los distintos tab's
        _tabify: function (div, settings) {

            //Se especifica el estilo asociado a la pestanya contenedora de pestanyas
            div.addClass('rup-tabs_container');

            //Se cargan los Setting de cada objeto en su campo "data" correspondiente
            div.data('settings', settings);



            //Se especifica el control del evento "select" por parte del patron
            var select = function (event, ui) {

                //Se gestiona la primera carga de la primera pestanya de cada tab
                if ($(ui.panel).data('cargado') !== undefined && $(ui.panel).data('cargado') === false && $(ui.panel).length > 0) {
                    $(ui.panel).tabs('load', settings.selected);
                    $(ui.panel).data('cargado', true);
                }
                if (settings.select !== undefined && settings.select !== null && typeof settings.select === 'function') {
                    settings.select(event, ui);
                }
                //Nuevos cargar para la versión jquery 1.12, es la primera vez
                // if ($(ui.newPanel).data('cargado') !== undefined){
                // 	ui.newTab.children('a').attr('href',ui.newTab.children('a').attr('id'));
                // }
                $(ui.newPanel).data('cargado', true);
            };

                //se cargan las extensiones de los usuarios en los eventos de las peticiones Ajax
            var ajaxOptions = $.extend({}, settings.ajaxOptions);

            ajaxOptions.beforeSend = function () {
                if (settings.ajaxOptions.beforeSend !== undefined && settings.ajaxOptions.beforeSend !== null && typeof settings.ajaxOptions.beforeSend === 'function') {
                    settings.ajaxOptions.beforeSend.call();
                }

                if (!settings.iniLoad) {
                    div.data('cargado', false);
                    return (false);
                }
            };
            ajaxOptions.complete = function (XMLHttpRequest, textStatus) {
                //se elimina el objeto de visualizacion de carga
                div.find('span.rup-tabs_loading_img').remove();

                if (settings.ajaxOptions.complete !== undefined && settings.ajaxOptions.complete !== null && typeof settings.ajaxOptions.complete === 'function') {
                    settings.ajaxOptions.complete(XMLHttpRequest, textStatus);
                }
            };
            ajaxOptions.success = function (data, textStatus, XMLHttpRequest) {
                if (settings.ajaxOptions.success !== undefined && settings.ajaxOptions.success !== null && typeof settings.ajaxOptions.success === 'function') {
                    settings.ajaxOptions.success(data, textStatus, XMLHttpRequest);
                }
            };
            ajaxOptions.error = function (xhr, s, t) {
                var userFunction;

                if (settings.ajaxOptions.error !== undefined && settings.ajaxOptions.error !== null && typeof settings.ajaxOptions.error === 'function') {
                    userFunction = function () {
                        settings.ajaxOptions.error(xhr, s, t);
                    };
                }
                $.rup_messages('msgError', {
                    title: $.rup.i18nParse($.rup.i18n.base, 'rup_global.developerError'),
                    message: '<p>' + $.rup.i18nParse($.rup.i18n.base, 'rup_tabs.serverError') + '<b> ' + s + ':  ' + xhr.status + ' - ' + xhr.statusText + '.</b>' + '</p>',
                    width: '40%',
                    beforeClose: userFunction
                });
            };
            //if (settings.navigation!==true){
            $(div).tabs({
                ajaxOptions: settings.cache === false ? $.extend(ajaxOptions, {
                    cache: false
                }) : ajaxOptions,
                cache: settings.cache,
                cookie: null,
                //cookie: settings.cookie, //Se deja para una mejora
                //disabled: true, //Bajo funcionalidades
                show: settings.fx ? settings.fx[0] : null, //son los efectos que se aplican al presentar  una pestanya
                hide: settings.fx ? settings.fx[1] : null, //son los efectos que se aplican al ocultar una pestanya
                idPrefix: 'rup-tabs-',
                panelTemplate: settings.panelTemplate,
                active: settings.selected, //deprecado en jquery ui 1.10, ahora es active
                spinner: '<span class=\'rup-tabs_loading_img\'></span>',
                //eventos
                create: settings.create,
                beforeActivate: select, //deprecado en jquery ui 1.10, ahora es beforeActivate
                load: settings.load,
                activate: settings.show, //deprecated show como evento desde jquery ui 1.10
                add: settings.add,
                remove: settings.remove
                //enable: settings.enable,
                //disable: settings.disable
            });
            //}

            if (settings.scrollable === true) {
                this._scrollable(settings);
            }

            // Tabs at bottoms
            if (settings.tabsAtBottom === true) {
                $(div).addClass('tabs-bottom');
                $(div).find('.tabs-spacer').css('float', 'left').css('height', '200px');
                $('.ui-tabs-nav, .ui-tabs-nav > *', $(div))
                    .removeClass('ui-corner-all ui-corner-top')
                    .addClass('ui-corner-bottom');

                $('.ui-tabs-panel.ui-widget-content.ui-corner-bottom', $(div)).removeClass('ui-corner-bottom').addClass('ui-corner-top');

                // move the nav to the bottom
                $('.ui-tabs-nav', $(div)).appendTo('.tabs-bottom');

            }


        },

        _parseJSON: function (json, json_i18n, tabs, pos, profundidad, settings) {
            var element, rupLevel, label, title = '';

            // Añadir contenedor de pestanyas
            var $tabsContainer = $(Rup.Templates.rup.tabs.container());
            tabs.append($tabsContainer);
            tabs = $(tabs).children('ul');

            function closeLinkClick() {
                var tabContentId = $(this).parent().attr('href');
                $(this).parent().parent().remove(); // remove li of
                // tab
                $(tabContentId).remove(); // remove respective tab
                // content
                (tabs.parent()).tabs('refresh');
            }

            function closeLinkMouseEnter() {
                $(this).addClass('rup-tabs-close-hover');
            }

            function closeLinkMouseLeave() {
                $(this).removeClass('rup-tabs-close-hover');
            }

            // pestanyas
            for (var i = 0; i < json.length; i++) {
                rupLevel = pos + i; // Indicador de nivel de la pestanya
                element = json[i];
                if (i === 0 && profundidad === settings.profun) {
                    settings.iniLoad = true;
                } else {
                    settings.iniLoad = false;
                }

                label = $.rup.i18nParse(json_i18n, element.i18nCaption);

                if (settings.lengthLiteral !== undefined) {
                    title = label;
                    if (label.length > settings.lengthLiteral) {
                        label = label.substr(0, settings.lengthLiteral).concat('...');
                    }

                }

                if (element.layer !== undefined) {
                    // LAYER => Recoge una capa ya cargada de la Jsp
                    element.layer = this._includeLayer(tabs, element.layer, null);

                    $tabsContainer.append(Rup.Templates.rup.tabs.tab({
                        'id': element.i18nCaption,
                        'href': element.layer,
                        'rupLevel': rupLevel,
                        'title': title,
                        'aria-controls': title,
                        'alt': title,
                        'label': label,
                        'btnClose': settings.close
                    }));


                    // evento close
                    $('span.ui-icon-close').on('click', closeLinkClick);

                    // efecto hover del boton cerrar
                    $('span.ui-icon-close').addClass('rup-tabs-close');
                    $('span.ui-icon-close').on({
                        mouseenter: closeLinkMouseEnter,
                        mouseleave: closeLinkMouseLeave
                    });

                } else if (element.url !== undefined) {
                    // URL => Cargar contenido al pulsar
                    $tabsContainer.append(Rup.Templates.rup.tabs.tab({
                        'id': '#' + element.i18nCaption,
                        'href': $.rup_utils.setNoPortalParam(element.url),
                        'rupLevel': rupLevel,
                        'title': title,
                        'aria-controls': title,
                        'alt': title,
                        'label': label,
                        'btnClose': settings.close
                    }));

                } else if (element.tabs !== undefined) {
                    // TABS => Subpestanyas
                    $tabsContainer.append(Rup.Templates.rup.tabs.tab({
                        'id': '#' + element.i18nCaption,
                        'href': '#' + element.i18nCaption,
                        'rupLevel': rupLevel,
                        'title': title,
                        'aria-controls': title,
                        'alt': title,
                        'label': label,
                        'btnClose': settings.close,
                        'tabs': element.tabs
                    }));

                    // Gestionar capa contenedora subpestanyas
                    tabs = $(tabs).parent();
                    // Añadir contenedor de capa asociada a pestanya
                    var capaId = 'rupRandomLayerId-' + $.rup_utils.autoGenerateIdNum++;
                    var $capa = $(Rup.Templates.rup.tabs.subtab({
                        'rupRandomLayerId': capaId,
                        'id': element.i18nCaption,
                        'actualTab': true
                    }));
                    tabs.append($capa);

                    // tabs.append(capa); //Añadir contenedor de capa
                    // asociada a pestanya
                    tabs = $(tabs).children('#' + capaId); //Seleccionar
                    // capa contenedora

                    // Gestionar capa de la subpestanya
                    tabs.prepend($('<div>').attr('id',
                        element.i18nCaption).attr('actualTab', true));
                    // //Añadir capa asociada a la pestanya
                    tabs = $(tabs).children('div:first-child'); // Seleccionar
                    // capa

                    // Subpestanyas
                    var subsettings = jQuery.extend(true, {}, settings);
                    subsettings.selected = element.selected;
                    // tabs.append(this._parseJSON(element.tabs, json_i18n,
                    // tabs, rupLevel, profundidad+1, subsettings));
                    tabs.append(this._parseJSON(element.tabs, json_i18n, tabs, rupLevel, profundidad + 1, subsettings));

                    this._tabify(tabs, subsettings); // Si no tiene 1
                    // es que es el
                    // primer
                    // elemento y lo
                    // convertimos a
                    // pestanyas


                }
            }

        },

        //Funcion encargada de gestionar el objeto definido por el usuario (se parsea el JSon y se actua en consecuencia)
        // _parseJSON : function (json, json_i18n, tabs, pos, profundidad, settings) {
        // 	var element, rupLevel, label, title="";
        //
        // 	tabs.append($('<ul>'));  //Añadir contenedor de pestanyas
        // 	tabs = $(tabs).children('ul'); //Seleccionar pestanya
        //
        // 	//pestanyas
        // 	for (var i = json.length; i--; ) {
        // 		rupLevel = pos+i; //Indicador de nivel de la pestanya
        // 		element = json[i];
        // 		if (i === 0 && profundidad === settings.profun){
        // 			settings.iniLoad = true;
        // 		} else {
        // 			settings.iniLoad = false;
        // 		}
        //
        // 		label = $.rup.i18nParse(json_i18n,element.i18nCaption);
        //
        // 		if (settings.lengthLiteral!==undefined){
        // 			title = label;
        // 			if(label.length>settings.lengthLiteral){
        // 				label = label.substr(0,settings.lengthLiteral).concat("...");
        // 			}
        //
        // 		}
        //
        // 		if (element.layer !== undefined){
        // 			//LAYER => Recoge una capa ya cargada de la Jsp
        // 			element.layer = this._includeLayer(tabs, element.layer, null);
        // 			//si quiero con boton de cerrar pestana
        // 			if (settings.close===true){
        // 				tabs.prepend($('<li>').append(
        // 					$('<a>').attr('href',element.layer)
        // 					.attr({
        // 						'rupLevel':rupLevel,
        // 						'title':title,
        // 						'alt':title
        // 					}).rup_tooltip({})
        // 					.css('padding-left', '1.4em')
        // 					.css('padding-right', '0.3em')
        // 					.append ($('<div>').addClass('rup-tabs_title').text(label))
        // 					.append ($('<span>').addClass('rup-tabs_loading'))
        // 					.append('<span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span>')
        // 			));
        //
        // 			//evento close
        // 			$("span.ui-icon-close").on( "click", function() {
        //
        // 				var tabContentId = $(this).parent().attr("href");
        // 		        $(this).parent().parent().remove(); //remove li of tab
        // 		        $(tabContentId).remove(); //remove respective tab content
        //
        // 				 tabs.tabs( "refresh" );
        // 				 });
        //
        // 			//efecto hover del boton cerrar
        // 			$("span.ui-icon-close").addClass('rup-tabs-close');
        // 			$("span.ui-icon-close").on({
        // 				mouseenter: function () {
        // 					$(this).addClass('rup-tabs-close-hover');
        // 				},
        //
        // 				mouseleave: function () {
        // 					$(this).removeClass('rup-tabs-close-hover');
        // 				}
        // 			});
        //
        // 			}else{
        // 				tabs.prepend($('<li>').append(
        // 						$('<a>').attr('href',element.layer)
        // 						.attr({
        // 							'rupLevel':rupLevel,
        // 							'title':title,
        // 							'alt':title
        // 						}).rup_tooltip({})
        // 						.css('padding-left', '1.4em')
        // 						.css('padding-right', '0.3em')
        // 						.append ($('<div>').addClass('rup-tabs_title').text(label))
        // 						.append ($('<span>').addClass('rup-tabs_loading'))
        // 				));
        // 			}
        //
        // 		} else if (element.url !== undefined){
        // 			//URL => Cargar contenido al pulsar
        // 			tabs.prepend($('<li>').append(
        // 				$('<a>').attr('href',$.rup_utils.setNoPortalParam(element.url))
        // 					.attr({
        // 						'rupLevel':rupLevel,
        // 						'title':title,
        // 						'alt':title
        // 					}).rup_tooltip({})
        // 					.css('padding-left', '1.4em')
        // 					.css('padding-right', '0.3em')
        // 					.append ($('<div>').addClass('rup-tabs_title').text(label))
        // 					.append ($('<span>').addClass('rup-tabs_loading'))
        // 			));
        // 		} else if (element.tabs !== undefined){
        // 			//TABS => Subpestanyas
        // 			tabs.prepend($('<li>').append(
        // 				$('<a>').attr('id','#'+element.i18nCaption)
        // 					.attr('href','#'+element.i18nCaption)
        // 					.attr({
        // 						'rupLevel':rupLevel,
        // 						'title':title,
        // 						'alt':title
        // 					}).rup_tooltip({})
        // 					.css('padding-left', '1.4em')
        // 					.css('padding-right', '0.3em')
        // 					.append ($('<div>').addClass('rup-tabs_title').text(label))
        // 					.append ($('<span>').addClass('rup-tabs_loading'))
        // 			));
        //
        // 			//Gestionar capa contenedora subpestanyas
        // 			tabs = $(tabs).parent();
        //
        // 			var capa = $('<div>'),
        // 				capaId = $.rup_utils.randomIdGenerator(capa);
        // 			tabs.append(capa); 						//Añadir contenedor de capa asociada a pestanya
        // 			tabs = $(tabs).children("#"+capaId); 	//Seleccionar capa contenedora
        //
        // 			//Gestionar capa de la subpestanya
        // 			tabs.prepend($('<div>').attr('id', element.i18nCaption).attr('actualTab',true)); //Añadir capa asociada a la pestanya
        // 			tabs = $(tabs).children('div:first-child'); //Seleccionar capa
        //
        // 			//Subpestanyas
        // 			var subsettings = jQuery.extend(true, {}, settings);
        // 			subsettings.selected = element.selected;
        // 			tabs.append(this._parseJSON(element.tabs, json_i18n, tabs, rupLevel, profundidad+1, subsettings));
        //
        // 			this._tabify(tabs,subsettings); //Si no tiene 1 es que es el primer elemento y lo convertimos a pestanyas
        //
        // 			//Reposicionar 'puntero' para siguiente pasada del bucle
        // 			tabs = $(tabs).parents("div[actualTab=true]").find("ul").first();
        // 			if (tabs.length===0){
        // 				tabs = $("#"+settings.id).find("ul").first();
        // 			}
        //
        // 		}
        // 	}
        // 	$(tabs).parents("div[actualTab=true]").first().removeAttr("actualTab");
        // 	delete tabs;
        // },

        //Función encargada de validar e incluir la capa que contendrá la pestanya. De no tener identificador se le asocia uno.
        _includeLayer: function (tabs, layerSelector, pestanya) {
            var content, selectObject;
            if ($(layerSelector).length > 0) {
                if ($(layerSelector).length === 1) {
                    selectObject = $(layerSelector).css('display', '');
                } else {
                    selectObject = $('<div>').append($(layerSelector).css('display', ''));
                }

                if (pestanya === null) {
                    content = $('<div>').append(selectObject);
                    tabs.parent().append(content);
                    layerSelector = '#' + $.rup_utils.randomIdGenerator(content);
                } else {
                    layerSelector = pestanya.attr('href');
                    content = $(pestanya.attr('href'));
                    content.children().remove();
                    content.append(selectObject);
                }
            } else {

                layerSelector = '#load-tab-error';

                if (pestanya === null) {
                    tabs.parent().append($('<div>').attr('id', 'load-tab-error')
                        .append($('<div>').addClass('rup-loading_tab_error')
                            .append($.rup.i18nParse($.rup.i18n.base, 'rup_global.selectorError'))
                        ));
                } else {
                    layerSelector = pestanya.attr('href');
                    content = $(pestanya.attr('href'));
                    content.children().remove();
                    content.append($('<div>').attr('id', 'load-tab-error')
                        .append($('<div>').addClass('rup-loading_tab_error')
                            .append($.rup.i18nParse($.rup.i18n.base, 'rup_global.selectorError'))
                        ));
                }
            }
            return layerSelector;
        },
        _scrollable: function (settings) {
            var o = $.extend({}, settings),
                $tabs = $(this),
                $tabsNav = $tabs.find('.ui-tabs-nav'),
                $nav; //referencia al wrapper

                //ajuste del css
            $tabs.css({
                'padding': 2,
                'position': 'relative'
            });

            //wrapper del contenido
            $tabs.wrap('<div id="stTabswrapper" class="stTabsMainWrapper" style="position:relative"></div>')
                .find('.ui-tabs-nav').css('overflow', 'hidden')
                .wrapInner('<div class="stTabsInnerWrapper" style="width:30000px"><span class="stWidthChecker"></span></div>');

            var $tabsWrapper = $tabs.parents('#stTabswrapper').width($tabs.outerWidth(true));
            //correción de bug en safari
            if ($.browser.safari) {
                $tabsWrapper.width($tabs.width() + 6);
            }
            //alert($tabsWrapper.width());
            if (o.resizable) {
                if ($.fn.resizable) {
                    $tabsWrapper.resizable({
                        minWidth: $tabsWrapper.width(),
                        maxWidth: $tabsWrapper.width() * 2,
                        minHeight: $tabsWrapper.height(),
                        maxHeight: $tabsWrapper.height() * 2,
                        handles: o.resizeHandles,
                        alsoResize: $tabs,
                        //start : function(){  },
                        resize: function () {
                            $tabs.trigger('resized');
                        }
                        //stop: function(){ $tabs.trigger('scrollToTab',$tabsNav.find('li.ui-tabs-active')); }
                    });
                } else {
                	$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_tabs.resizeError'));
                }
            }


            //añade iconos de navegación
            //console.log(parseInt($tabsNav.innerHeight(true)));
            //Total height of nav/2 - total height of arrow/2
            //var arrowsTopMargin = (parseInt(parseInt($tabsNav.innerHeight(true)/2)-8)),
            //	arrowsCommonCss={'cursor':'pointer','z-index':1000,'position':'absolute','top':3,'height':$tabsNav.outerHeight()-($.browser.safari ? 2 : 1)};
            var arrowsTopMargin = (parseInt(parseInt($tabsNav.innerHeight() / 2) - 8)),
                arrowsCommonCss = {
                    'cursor': 'pointer',
                    'z-index': 1000,
                    'position': 'absolute',
                    'top': 3,
                    'height': $tabsNav.outerHeight() - ($.browser.safari ? 2 : 1)
                };
            $tabsWrapper.prepend(
                $nav = $('<div></div>')
                    .disableSelection()
                    .css({
                        'position': 'relative',
                        'z-index': 3000,
                        'display': 'block'
                    })
                    .append(
                        $('<span></span>')
                            .disableSelection()
                            .attr('title', 'Previous tab')
                            .css(arrowsCommonCss)
                            .addClass('ui-state-active ui-corner-tl ui-corner-bl stPrev stNav')
                            .css('left', 3)
                            .append($('<span/>').disableSelection().addClass('ui-icon ui-icon-carat-1-w').html('Previous tab').css('margin-top', arrowsTopMargin))
                            .click(function () {
                            //comprueba si esta deshabilitado
                                if ($(this).hasClass('ui-state-disabled')) return;
                                //selecciona el tab anterior y lanza el evento scrollToTab
                                var prevIndex = $tabsNav.find('li.ui-tabs-active').prevAll().length - 1;
                                //seleeciona el tab
                                $tabsNav.find('li').eq(prevIndex).find('a').trigger('click');
                                return false;
                            }),
                        $('<span></span>')
                            .disableSelection()
                            .attr('title', 'Next tab')
                            .css(arrowsCommonCss)
                            .addClass('ui-state-active ui-corner-tr ui-corner-br stNext stNav')
                            .css({
                                'right': 3
                            })
                            .append($('<span></span>').addClass('ui-icon ui-icon-carat-1-e').html('Next tab').css('margin-top', arrowsTopMargin))
                            .click(function () {
                            //selecciona el tab anterior y lanza el evento scrollToTab
                                var nextIndex = $tabsNav.find('li.ui-tabs-active').prevAll().length + 1;
                                //selecciona el tab
                                $tabsNav.find('li').eq(nextIndex).find('a').trigger('click');
                                return false;
                            })
                    )
            );

            //Binding de los eventos con las pestañas
            $tabs.on('navEnabler', function () {
                setTimeout(function () {
                    //comprueba si la ultima o la primera  pestaña esta seleccionada y en ese caso deshabilita las flechas
                    var isLast = $tabsNav.find('.ui-tabs-active').is(':last-child'),
                        isFirst = $tabsNav.find('.ui-tabs-active').is(':first-child'),
                        $ntNav = $tabsWrapper.find('.stNext'),
                        $pvNav = $tabsWrapper.find('.stPrev');
                    //debug('isLast = '+isLast+' - isFirst = '+isFirst);
                    if (isLast) {
                        $pvNav.removeClass('ui-state-disabled');
                        $ntNav.addClass('ui-state-disabled');
                    } else if (isFirst) {
                        $ntNav.removeClass('ui-state-disabled');
                        $pvNav.addClass('ui-state-disabled');
                    } else {
                        $ntNav.removeClass('ui-state-disabled');
                        $pvNav.removeClass('ui-state-disabled');
                    }
                }, o.animationSpeed);
            })
            //Comprueba si hace face falta la navegacion (si hay demasiadas pestañas visibles)
                .on('navHandler', function () {
                    //Si $widthCheker es mayor tabnav  lo oculto
                    //console.log($widthChecker.width());
                    //console.log($tabsNav.width());

                    //if($widthChecker.width()>$tabsNav.width())
                    if ($('.stWidthChecker').children().length > 5) {
                        $nav.show();
                        //añade cierto margen  a la primera pestaña para hacerla visible si esta seleccionada
                        $tabsNav.find('li').first().css('margin-left', $nav.find('.stPrev').outerWidth(true));
                    } else {
                        $nav.hide();
                        //elima el margen del primer elemento
                        $tabsNav.find('li').first().css('margin-left', 0);
                    }
                })
            //Bind el evento de mover el scroll
                .on('scrollToTab', function (event, $tabToScrollTo, clickedFrom, hiddenOnSide) {
                    //Si no se provee una pestaña como parametro ,scroll a la ultima pestaña
                    $tabToScrollTo = (typeof $tabToScrollTo != 'undefined') ? $($tabToScrollTo) : $tabsNav.find('li.ui-tabs-active');

                    var navWidth = $nav.is(':visible') ? $nav.find('.stPrev').outerWidth(true) : 0;
                    //debug($tabToScrollTo.prevAll().length)

                    var offsetLeft = -($tabs.width() - ($tabToScrollTo.outerWidth(true) + navWidth + parseInt($tabsNav.find('li').last().css('margin-right'), 10)));
                    offsetLeft = (clickedFrom == 'tabClicked' && hiddenOnSide == 'left') ? -navWidth : offsetLeft;
                    offsetLeft = (clickedFrom == 'tabClicked' && hiddenOnSide == 'right') ? offsetLeft : offsetLeft;
                    //debug(offsetLeft);
                    var scrollSettings = {
                        'axis': 'x',
                        'margin': true,
                        'offset': {
                            'left': offsetLeft
                        },
                        'easing': o.easing || ''
                    };
                        //debug(-($tabs.width()-(116+navWidth)));
                    $tabsNav.scrollTo($tabToScrollTo, o.animationSpeed, scrollSettings);
                })
                .on('bindTabClick', function () {
                    //Controla el scroll cuando un usuario clickea manualmente en la pestaña
                    $tabsNav.find('a').click(function () {
                        var $liClicked = $(this).parents('li');
                        var navWidth = $nav.find('.stPrev').outerWidth(true);
                        //debug('left='+($liClicked.offset().left)+' and tabs width = '+ ($tabs.width()-navWidth));
                        if (($liClicked.position().left - navWidth) < 0) {
                            $tabs.trigger('scrollToTab', [$liClicked, 'tabClicked', 'left']);
                        } else if (($liClicked.outerWidth() + $liClicked.position().left) > ($tabs.width() - navWidth)) {
                            $tabs.trigger('scrollToTab', [$liClicked, 'tabClicked', 'right']);
                        }
                        //Des/habilita las flechas de navegacion
                        $tabs.trigger('navEnabler');
                        return false;
                    });
                })
                .on('resized', function () {
                    $tabs.trigger('navHandler');
                    $tabs.trigger('scrollToTab', $tabsNav.find('li.ui-tabs-active'));
                })

            //triggers
                .trigger('navHandler')
                .trigger('navEnabler')
                .trigger('bindTabClick');
        },
        /* deprecado el metodo "add" en jquery ui 1.10
             * Este método sustituye su utilidad
             * */
        _addTab: function (args) {

            if (args.url === undefined) {
                args.url = '#';
            }
            var previousTab = $('#' + args.idTab).find('.ui-tabs-nav li').eq(args.position - 1);
            if (args.orientation !== undefined) {
                $('<li><a href=\'' + args.url + '\'>' + args.label + '</a></li>').insertBefore(previousTab);
            } else {
                $('<li><a href=\'' + args.url + '\'>' + args.label + '</a></li>').insertAfter(previousTab);
            }

            $('#' + args.idTab).tabs('refresh');
        },
        /* deprecado el metodo "remove" en jquery ui 1.10
             * Este método sustituye su utilidad
             * */
        _removeTab: function (args) {
            // Remove the tab
            $('#' + args.idTab).find('.ui-tabs-nav li').eq(args.position - 1).remove();

            // Refresh the tabs widget
            $('#' + args.idTab).tabs('refresh');
        },

        /* deprecado el metodo "url" en jquery ui 1.10
             * Este método sustituye su utilidad
             * */
        _changeUrlTab: function (args) {
            // if(args.idTab == 'mockTab') {
            // 	debugger;
            // }
            var tab = $('#' + args.idTab).find('ul > li').eq(args.position).find('> a');
            $(tab).attr('href', args.url);
        }
    }

    );

    //*******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //*******************************************************
    /**
     * @name options
     * @property {object}  disabled - Permite especificar el conjunto de pestañas que, inicialmente, estarán deshabilitadas
     * @property {boolean} [close=false] - Determina si se debe mostrar un icono de cerrar pestaña junto al label de las mismas.
     * @property {integer} 	fixedHeight - Permite especificar una altura fija para el contenedor de las pestañas
     * @property {integer}  [lengthLiteral=undefined] - Permite especificar un número máximo de caracteres a mostrar en el label de la pestaña antes de aplicar ellipsis.
     * @property {integer} maxNumberTabs - Parámetro que determina el número máximo de pestañas que va a permitir el componente que se añadan de manera dinámica
     * @property {boolean} [scrollable=false] - Determina si la pestaña permite el mostrar scroll en la capa contenedora
     * @property {string} layer - Parámetro que permite especificar fragmentos html previamente cargados para el contenido de una pestaña. El parámetro acepta cualquier tipo de selector válido de JQuery para determinar que fragmento html se ubica en la pestaña. En caso de precisarse un selector de JQuery que devuelva más de un elemento, éstos se incluirán en la pestaña correspondiente dispuestos verticalmente (esta forma de trabajar no es muy ortodoxa pero es factible).
     * @property {integer} width - Permite definir la anchura del componente.
     * @property {integer} height - Permite difinir la altura del componente.
     * @property {boolean} [tabsAtBottom=false] - Parámetro que determina si las pestañas se van a mostrar en la parte inferior en vez de en la superior
     *
     *
     */

    $.fn.rup_tabs.defaults = {
        ajaxOptions: {},
        cache: true,
        cookie: null,
        show: null,
        hide: null,
        panelTemplate: '<div></div>',
        profun: 0,
        active: 0, //deprecated selected option, ahora es active
        //eventos
        create: null,
        beforeActivate: null,
        load: null,
        activate: null, //deprecated show event, ahora es activate
        add: null,
        remove: null,
        enable: null,
        disable: null,
        tabsAtBottom: false
    };
    /* **********/
    /* EVENTOS */
    /* **********/

    /**
     * Se lanza cada vez que se crea una pestaña
     * @event module:rup_tabs#create
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ create: function(){...} });
     */

    /**
     * Se lanza el evento cada vez que se hace click sobre una pestaña
     * @event module:rup_tabs#select
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ select: function(){...} });
     */

    /**
     * Este evento se desencadena después de que el contenido de una pestaña se ha cargado.
     * @event module:rup_tabs#load
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ load: function(){...} });
     */

    /**
     * Este evento ocurre cuando una pestaña está preparada para ser mostrada.
     * @event module:rup_tabs#activate
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ activate: function(){...} });
     */

    /**
     * Este evento se desencadena cuando se añade una pestaña
     * @event module:rup_tabs#add
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ add: function(){...} });
     */

    /**
     * Este evento se desencadena cuando se elimina una pestaña
     * @event module:rup_tabs#remove
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ remove: function(){...} });
     */

    /**
     * Este evento se desencadena cuando se habilita una pestaña
     * @event module:rup_tabs#enable
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ enable: function(){...} });
     */


    /**
     * Este evento se desencadena cuando se deshabilita una pestaña
     * @event module:rup_tabs#disable
     * @property {Event} e - Objeto Event correspondiente al evento disparado.
     * @example
     * $(selector).rup_tabs ({ disable: function(){...} });
     */








}));