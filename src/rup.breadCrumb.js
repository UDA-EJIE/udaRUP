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
 * El componente de migas muestra a los usuarios la ruta de navegación que ha seguido por la aplicación permitiéndoles volver hacia niveles superiores hasta la página de inicio.
 *
 * @summary Componente RUP BeadCrumb.
 * @module rup_breadCrumb
 * @example
 * var properties = {
 *   logOutUrl: "/x21aAppWar/logout",
 *   breadCrumb: {
 *       "patrones" : {
 *           // Literal
 *		    "i18nCaption" : "patrones",
 *		    "tabsMixto" : {"i18nCaption":"tabsMixto"},
 *		    "grid" : { "i18nCaption" : "grid" },
 *		    // Submenu
 *		    "subLevel":[
 *			   {"i18nCaption":"all", "url": "/x21aAppWar/patrones/all" },
 *			   {"i18nCaption":"accordion", "url": "/x21aAppWar/patrones/accordion" }
 *		    ]
 *	     },
 *	     "experimental" : {
 *		    // Literal
 *		    "i18nCaption" : "experimental",
 *		    "maestro_detalle" : { "i18nCaption" : "maestro_detalle" },
 *		    "mant_multi_entidad": { "i18nCaption" : "mant_multi_entidad" },"
 *        }
 *	}
 * };
 * jQuery("#x21aAppWar_migas").rup_breadCrumb(properties);
 */

/*global define */
/*global jQuery */
/*global DESTROY_XLNETS_SESSION */
/*global LOGGED_USER */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery','./core/utils/xbreadcrumbs'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }

}(function ($) {


    $.widget('$.rup_breadCrumb', {
        /**
         * @description Opciones por defecto de configuración del widget.
         *
         * @name options
         *
         * @property {string}  [showSpeed=fast] - Propiedad que indica la velocidad de despliegue del subnivel en milisegundos o en términos de jQuery (posibles valores: “normal”,”slow”)..
         * @property {string}  [hideSpeed=''] - Propiedad que indica la velocidad de colapso del subnivel en milisegundos o en términos de jQuery (posibles valores: “normal”,”slow”)..
         * @property {boolean}  [collapsible=false] - Propiedad que indica si el primer nivel es plegable.
         * @property {Number}  [collapsedWidth=10] - Propiedad de indica el tamaño del texto cuando está colapsado (en pixeles).
         * @property {module:rup_breadCrumb~breadCrumb} breadCrumb - La estructura de las migas se define mediante un array en notación json cuyo nombre será el mismo que el identificador del elemento sobre el que se aplica el componente.
         * @property {string} [initURL] -  Define la ruta a seguir cuando se pulse sobre el primer elemento (ej. “Inicio”). Tomará como valor la ruta del contexto (contextPath) y le concatenará el literal indicado. El literal se definirá sin barra ‘/’ inicial.
         * @property {string} [i18nId] - Indica el identificador del objeto JSON para la resolución de los literales del componente. En caso de no definirse se tomará el ID del objeto sobre el que se crea el componente.
         */

        /**
         * @description Configuración de la estructura de las migas
         * @typedef breadCrumb
         *
         * @property {string}  [i18nCaption] - Texto que se mostrará como miga. Obtenido del fichero de literales de la aplicación.
         * @property {string}  [literal] - Submiga (mapeada mediante la URL). Internamente tendrá una estructura definida con los atributos i18nCaption, literales (submigas) y sublevel.
         * @property {module:rup_breadCrumb~sublevel}  [sublevel] - Define un submenú para la miga a la que se asocia.
         */

        /**
         * @description Define un submenú para la miga a la que se asocia.
         * @typedef sublevel
         *
         * @property {string} [i18nCaption] - Texto que se mostrará como elemento del menú obtenido del fichero de literales de la aplicación.
         * @property {string} [url] - Define la ruta a seguir cuando se pulse sobre el elemento.
         */
        options: {
            showSpeed: 'fast',
            hideSpeed: '',
            collapsible: false,
            collapsedWidth: 10,
            breadCrumb: $.rup.APP_RESOURCES + '.breadCrumb'
        },
        /**
         * Función encargada de crear los elementos visuales e inicializar el componente.
         *
         * @name _create
         * @function
         * @private
         */
        _create: function () {
            window.initRupI18nPromise.then(() => {

                var pathname = window.location.pathname,
                    breadCrumbEntry = pathname.substring($.rup.CTX_PATH.length),
                    breadCrumbElems = breadCrumbEntry.split('/'),
                    breadCrumbSpan = $('<div>').addClass('d-inline-flex col-auto p-0 mr-3'),
                    ulBreadCrumb = $('<ul>').addClass('rup-breadCrumb_main d-inline-flex'),
                    breadCrumbStruct = null,
                    lastCrum = null,
                    initURL = (this.options.initUrl !== undefined) ? $.rup.CTX_PATH + this.options.initUrl : $.rup.CTX_PATH,
                    i18nId = (this.options.i18nId === undefined) ? this.element.attr('id') : this.options.i18nId,
                    idBreadCrumb = this.element[0].id,
                    logoutUrl = $("div.rup-breadCrumb_root").data("logoutUrl");
                
                this.element.append("<div class='row'></div>");
                    
                //Obtenemos la estructura del fichero que se recibe como parametro o el de por defecto del patrón
                if (this.options.breadCrumb instanceof Object) {
                    breadCrumbStruct = this.options.breadCrumb;
                } else {
                    $.rup.getFile(this.options.breadCrumb);
                    breadCrumbStruct = $.rup.i18n[this.options.breadCrumb];
                }

                if (!window.LOGGED_USER || window.LOGGED_USER === 'NULL') {
                    window.LOGGED_USER = '';
                }
                if (!window.DESTROY_XLNETS_SESSION) {
                    window.DESTROY_XLNETS_SESSION = 'false';
                }
                if (LOGGED_USER !== '') {
                	//Se añade el boton de desconexion si este fuera necesario
                    if (logoutUrl !== undefined) {

                        if (DESTROY_XLNETS_SESSION === 'false') {

                            //función encargada de poner el icono y el literal de salida
                        	$(this.element.children()[0]).append($('<div class=\'rup-breadCrumb_logoutDiv col-2 order-last text-right\'>')
                                .append($('<a>').addClass('rup-breadCrumb_link').attr('logOutHref', logoutUrl).on('click',
                                    function () {
                                        $.rup_messages('msgConfirm', {
                                            message: $.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.menuDisconnectMessage'),
                                            title: $.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.menuDisconnectTitle'),
                                            OKFunction: function () {
                                                $(window).attr('location', $('#' + idBreadCrumb + ' .rup-breadCrumb_link').attr('logOutHref'));
                                            }
                                        });
                                    }).html($.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.exit')).append($('<span>').addClass('ui-icon rup-icon rup-icon-door-out rup-breadCrumb_exitImg'))));
                        } else {

                            //función encargada de poner el icono y el literal de desconexion
                        	$(this.element.children()[0]).append($('<div class=\'rup-breadCrumb_logoutDiv col-12 col-sm-3 order-last text-sm-right\'>')
                                .append($('<a>').addClass('rup-breadCrumb_link').attr('logOutHref', logoutUrl).on('click',
                                    function () {
                                        $.rup_messages('msgConfirm', {
                                            message: $.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.menuSecuritySystemDisconnectMessage'),
                                            title: $.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.menuDisconnectTitle'),
                                            OKFunction: function () {
                                                $(window).attr('location', $('#' + idBreadCrumb + ' .rup-breadCrumb_link').attr('logOutHref'));
                                            }
                                        });
                                    }).mouseover(
                                    function () {
                                        $(this).find('i.mdi').removeClass('mdi-lock-open').addClass('mdi-lock');
                                    }).mouseleave(
                                    function () {
                                        $(this).find('i.mdi').removeClass('mdi-lock').addClass('mdi-lock-open');
                                    })
                                    .html($.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.disconnect'))
                                    .prepend(
                                        $('<i class="mdi mdi-lock-open align-baseline" aria-hidden="true"></i>')
                                    )
                                )
                            );
                        }
                    }
                    // Se añade el span con el texto de "xxx esta aqui"
                    breadCrumbSpan.append($('<span>').addClass('rup-breadCrumbs_span').text(LOGGED_USER + $.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.userAre')));
                } else {
                	// Se añade el span con el texto de "Usted esta aqui"
                    breadCrumbSpan.append($('<span>').addClass('rup-breadCrumbs_span').text($.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.youAre')));
                }

                //se le añade el link de Inicio
                ulBreadCrumb.append(this._createLI($.rup.i18nParse($.rup.i18n.base, 'rup_breadCrumb.start'), initURL));
                //nos recorremos los elementos del path y los buscamos en el fichero json de migas para crear los enlaces
                for (var i = 0; i < breadCrumbElems.length; i++) {
                    //Si encontramos dentro del fichero de estructura de las migas el parte de la url
                    if (breadCrumbStruct[breadCrumbElems[i]]) {
                        //Generamos su miga de actualimos la estructura en la que buscar, devolviendo las estructura del nivel que se ha añadido
                        breadCrumbStruct = this._createBreadCrumb(breadCrumbStruct[breadCrumbElems[i]], breadCrumbElems[i], ulBreadCrumb, i18nId);
                    }
                }
                
                //se le añade al ultimo elemento el estilo current
                //$("li:last-child", ulBreadCrumb).addClass("rup-breadCrumb_current");
                //$(ulBreadCrumb).find("li").last().addClass("rup-breadCrumb_current");
                $(ulBreadCrumb.children()[ulBreadCrumb.children().length - 1]).addClass('rup-breadCrumb_current').find('img.rup-icon, span.mdi').remove();
                //el último elemento no es navegable
                //lastCrum = $(ulBreadCrumb).find("li").last().find("a");
                lastCrum = $(ulBreadCrumb.children()[ulBreadCrumb.children().length - 1]).find('a').first();

                lastCrum.replaceWith($('<span>').text(lastCrum.text()).css({
                    'font-weight': 'bold',
                    'color': '#333333'
                }));
                // delete lastCrum;
                //y por ultimo se añade el span, todo el ul a un nuevo div que lo contenga
                $(this.element.children()[0]).append('<div class="breadCrumb_where_is col-12 col-sm-9 order-first"></div>');
                $('#' + idBreadCrumb + ' .breadCrumb_where_is').append([breadCrumbSpan, ulBreadCrumb]);
                
                $(ulBreadCrumb).wrap($('<div>').addClass('d-inline-flex col-auto px-0 pb-1'));
                
                ulBreadCrumb.xBreadcrumbs();
                
                $(this.element).trigger('afterInit');

                //Se audita el componente
                $.rup.auditComponent('rup_breadCrumb', 'init');

            });
        },
        /**
         * Funcion que crea el li correspondiente de la miga accediendo al fichero de lenguage correspondiente.
         *
         * @name _createLI
         * @function
         * @private
         * @param {string} i18nCaption - Key del recurso i18n a buscar en los ficheros idiomáticos correspondientes.
         * @param {string} href - Url a la que debe navegar la miga.
         * @param {boolean} [separator] - Indica si se debe de pintar un separador posterior a la miga actual.
         * @return {object} - Devuelve el li resultante correspondiente a la miga que se está procesando.
         */
        _createLI: function (i18nCaption, href, separator) {
            var li = $('<li>'),
                a = $('<a>').attr('href', /*$.rup.CTX_PATH + */ href).text(i18nCaption);
            li.append(a);
            if (separator !== false) {
                li.append($('<span>').addClass('mdi mdi-chevron-right pr-1 pl-1'));
            }
            return li;
        },
        /**
         * Funcion que añade al ul el li correspondiente en cada nivel y devuelve la nueva entructura en la que seguir iterando.
         *
         * @name _createBreadCrumb
         * @function
         * @private
         * @param {object} breadCrumbStruct - Objeto que contiene la estructura de migas de pan que se están creando.
         * @param {object} elem - Elemento actual que se está procesando.
         * @param {object} parentUl - Referencia al ul padre donde insertar la li correspondiente.
         * @param {string} i18nId - Key del recurso i18n a buscar en los ficheros idiomáticos correspondientes.
         * @return {object} - Devuelve la nueva entructura en la que seguir iterando.
         */
        _createBreadCrumb: function (breadCrumbStruct, elem, parentUl, i18nId) { //nos recorremos la entrada correspondiente
            var createdLI, subLevelUL = $('<ul>');
            if (breadCrumbStruct.i18nCaption) { //si tengo i18nCaption es que es elemento final
                createdLI = this._createLI($.rup.i18nParse($.rup.i18n.app[i18nId], breadCrumbStruct.i18nCaption), (breadCrumbStruct.url ? $.rup.CTX_PATH + breadCrumbStruct.url : '#'));
            }
            //si tengo subLevel se crearan hijo como si fuesen un menu
            if (breadCrumbStruct.subLevel) {
                //nos recorremos todos los submenus
                for (var i = 0; i < breadCrumbStruct.subLevel.length; i++) {
                	// Definir URL a usar en los enlaces
                	let breadCrumbLinkURL = '#';
                	if (breadCrumbStruct.subLevel[i].url) {
                    	breadCrumbLinkURL = breadCrumbStruct.subLevel[i].url;
                		
                    	let menuLinkURL = $('nav.rup-navbar ul.nav a[href^="' + breadCrumbStruct.subLevel[i].url + '"]');
                    	
                    	// Comprobar si más de un elemento contiene la URL buscada. Se busca al comienzo para evitar que no encuentre nada cuando las URLs contienen parámetros
                    	if (menuLinkURL.length > 1) {
                    		$.each(menuLinkURL, function (key, element) {
                    			let elementURL = $(element).attr('href');
                    			
                    			// Comprobar la URL obtenida con la definida por el usuario. Cuando la URL obtenida contiene parámetros, se eliminan para poder hacer una correcta comparación
                    			if ((elementURL.indexOf('?') != -1 ? elementURL.substring(0, elementURL.indexOf('?')) : elementURL) === breadCrumbLinkURL) {
                    				menuLinkURL = elementURL;
                        			return false;
                    			}
                    		});
                    	} else {
                    		menuLinkURL = menuLinkURL.attr('href');
                    	}
                    	
                		if (menuLinkURL != undefined) {
                			breadCrumbLinkURL = menuLinkURL;
                		}
                	}
                    //creamos cada li y se lo añadimos al ul nuevo
                    subLevelUL.append(this._createLI($.rup.i18nParse($.rup.i18n.app[i18nId], breadCrumbStruct.subLevel[i].i18nCaption), breadCrumbLinkURL, false).css('background', 'none'));
                }
                //añadimos al li padre el nuevo ul con todos li de los sublevels
                createdLI.append(subLevelUL);
                $(createdLI).on('mouseover', function () {
                    $(this).find('a').eq(1).focus();
                });
                createdLI.on('keydown', function (event) {
                    switch (event.keyCode) {
                    case $.ui.keyCode.UP:
                        var enlaces = $(this).find('li > a');
                        for (var i = 0; i <= enlaces.length; i++) {
                            if (enlaces[i].text === $(event.target).text()) {
                                break;
                            }
                        }
                        if ($(enlaces[i - 1]).length > 0) {
                            $(enlaces[i - 1]).focus();
                        } else {
                            $(this).find('li > a').last().focus();
                        }
                        break;
                    case $.ui.keyCode.DOWN:
                        // var enlaces = $(this).find('li > a');
                        for (var j = 0; j <= enlaces.length; j++) {
                            if (enlaces[j].text === $(event.target).text()) {
                                break;
                            }
                        }
                        if ($(enlaces[i + 1]).length > 0) {
                            $(enlaces[i + 1]).focus();
                        } else {
                            $(this).find('li > a').first().focus();
                        }
                        break;
                    case $.ui.keyCode.ESCAPE:
                        $(this).children('ul').hide();
                        break;
                    default:
                    }
                });
            }
            parentUl.append(createdLI);
            return breadCrumbStruct;
        },
        /**
         * Modifica las opciones de configuración del componente.
         *
         * @name _setOption
         * @function
         * @private
         * @param {string} key - Nombre de la propiedad.
         * @param {*} value - Valor que se desea asignar a la propiedad.
         */
        _setOption: function () {
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        /**
         * Elimina los componenes visuales generados para el widget así como las estructuras internas.
         *
         * @name destroy
         * @function
         * @example
         * // Elimina el feedback
         * jQuery("#breadCrumb").rup_breadCrumb("destroy");
         */
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
        }
    });
}));
