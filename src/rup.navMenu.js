/*!
 * Copyright 2014 E.J.I.E., S.A.
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

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'rcarousel'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {


    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var rup_navMenu = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    jQuery.extend(jQuery.rup.iniRup, jQuery.rup.rupSelectorObjectConstructor('rup_navMenu', rup_navMenu));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************


    jQuery.fn.rup_navMenu('extend', {
        //Función encargada de pasar a la siguiente página
        next: function () {
            jQuery(this).rcarousel('next');
        },
        //Función encargada de pasar a la anterior página
        prev: function () {
            jQuery(this).rcarousel('prev');
        },
        //Función encargada de ir a la página especificada
        goToPage: function (args) {
            jQuery(this).rcarousel('goToPage', args.position);
        },
        //Función que devuelve el número de páginas del menu
        getTotalPages: function () {
            return jQuery(this).rcarousel('getTotalPages');
        },
        //Función que devuelve el número de páginas actual
        getCurrentPage: function () {
            return jQuery(this).rcarousel('getCurrentPage');
        }

    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    jQuery.fn.rup_navMenu('extend', {
        //Funcion que marca las clases antes de convertirlas en pestañas
        _markTabs: function (pId) {


            //marco las pestanas con una clase
            jQuery('#' + pId + '>li').each(function () {
                //if ($(this).attr('class')===""){
                $(this).addClass('itemTab');
                //}
            });
            var windowHref = window.location.href.substr(window.location.href.lastIndexOf('#'));
            var liHref;
            //marco la pestana seleccionada
            $('#' + pId + '  li a').each(function (index, element) {
                liHref = element.href.substr(element.href.lastIndexOf('#'));
                if (liHref === windowHref) {
                    $(element).parent().addClass('actualTab');
                }
            });

            jQuery('.itemTab').each(function () {
                $(this).addClass('ui-state-default ui-corner-top');
            });


            $('.itemTab').hover(function () {
                $(this).addClass('ui-tabs-active ui-state-active');
            }, function () {
                $(this).removeClass('ui-tabs-active ui-state-active');
            });


            jQuery('.itemTab a').each(function () {
                $(this).addClass('ui-tabs-anchor');
            });

        },
        //Función que añade un contenedor
        _createContainer: function () {

            var settings = this.data('settings');



            //añado un div que engloba todo el menu, hará de contenedor
            jQuery('#' + settings.id).wrapAll('<nav class="rup_navMenu">');


        },

        //función que añade los botones de navegación
        _addNavButtons: function () {

            var settings = this.data('settings');


            //añado los botones de Next y previous
            jQuery('.rup_navMenu').prepend('<li class="ui-state-default ui-corner-top" id="prvButton"><a class="ui-tabs-anchor" href="#" id="ui-carousel-prev"><span class="ui-icon  ui-icon-caret-1-w"></span></a></li>');
            jQuery('.rup_navMenu').append('<li class="ui-state-default ui-corner-top" id="nxtButton"><a class="ui-tabs-anchor" href="#" id="ui-carousel-next"><span class="ui-icon  ui-icon-caret-1-e"></span></a></li>');


            //dejo invisible el botón previous hasta que pase de la primera página
            var pagActual = jQuery('#' + settings.id).rcarousel('getCurrentPage');
            var pagTotal = jQuery('#' + settings.id).rcarousel('getTotalPages');
            //si estamos en la ultima página ocultamos el botón para que no pueda seguir cambiando hacia adelante
            if (pagActual === pagTotal) {
                jQuery('#nxtButton').hide();
            }
            if (pagActual !== 1) {
                jQuery('#prvButton').show();
            } else {
                jQuery('#prvButton').hide();
            }
            //bindings de los clicks
            jQuery('#ui-carousel-next').on('click', function () {
                jQuery('#' + settings.id).rcarousel('next');
                var pagActual = jQuery('#' + settings.id).rcarousel('getCurrentPage');
                var pagTotal = jQuery('#' + settings.id).rcarousel('getTotalPages');
                //si estamos en la ultima página ocultamos el botón para que no pueda seguir cambiando hacia adelante
                if (pagActual === pagTotal) {
                    jQuery('#nxtButton').hide();
                }
                jQuery('#prvButton').show();
            });

            jQuery('#ui-carousel-prev').on('click', function () {
                jQuery('#' + settings.id).rcarousel('prev');

                var pagActual = jQuery('#' + settings.id).rcarousel('getCurrentPage');
                //si estamos en la ultima primera ocultamos el botón para que no pueda seguir cambiando hacia atras
                if (pagActual === 1) {
                    jQuery('#prvButton').hide();
                }
                jQuery('#nxtButton').show();
            });

        },
        //Función que añade los estilos
        _addCSS: function (settings) {

            jQuery('.rup_navMenu').addClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');

            jQuery('#' + settings.id).css({
                'margin-left': '30px'
            });


        },
        //Funcion que calcula la pagina donde esta el item del menu
        _calculatePageOfActualTab: function (settings) {
            var item = 0;
            var page = 0;
            var menuSize = $('#' + settings.id + ' li').length;
            var maxItemVisible = item + settings.visible;
            var auxItem;
            while (maxItemVisible <= menuSize) {
                for (var tabVisible = item; tabVisible < maxItemVisible; tabVisible++) {
                    //auxItem = $('.rup_navMenu .itemTab:nth(' + tabVisible + ')');
                    auxItem = $('#' + settings.id + ' li:nth(' + tabVisible + ')');

                    if (auxItem.hasClass('actualTab')) {
                        return page;
                    }
                }
                page = page + 1;
                item = item + settings.step;
                maxItemVisible = item + settings.visible;
            }
            return 0;
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    jQuery.fn.rup_navMenu('extend', {
        _init: function (args) {
            if (args.length > 1) {
                jQuery.rup.errorGestor(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_global.initError') + jQuery(this).attr('id'));
            } else {
                //Se recogen y cruzan las paremetrizaciones del objeto
                var settings = jQuery.extend({}, jQuery.fn.rup_navMenu.defaults, args[0]);

                settings.id = jQuery(this).attr('id');




                //si navigation==true establezco que el paso de página es igual a los items visibles
                if (undefined !== settings.navigation) {
                    if (settings.navigation === true) {
                        settings.step = settings.visible;

                    }
                }



                //marco las pestañas con una clase
                this._markTabs(settings.id, settings.actualTab);

                //calcular pagina de la pestana activa
                if (settings.startAtPage === undefined) {
                    settings.startAtPage = this._calculatePageOfActualTab(settings);
                }




                //inicializo el objeto rcarousel
                jQuery('#' + settings.id).rcarousel({
                    startAtPage: settings.startAtPage,
                    visible: settings.visible,
                    step: settings.step,
                    height: settings.height,
                    speed: settings.speed,
                    margin: settings.margin,
                    width: 150
                });


                //Se almacenan los settings en el data del objeto
                this.data('settings', settings);

                //crea un contenedor que engloba el menú
                this._createContainer();


                if (undefined !== settings.height) {
                    jQuery('.rup_navMenu').css('height', settings.height);
                } else {
                    jQuery('.rup_navMenu').css('height', 30);
                }
                if (undefined !== settings.width) {
                    jQuery('.rup_navMenu').css('width', settings.width);
                } else {
                    jQuery('.rup_navMenu').css('width', 700);
                }

                //si la option de navigation==true añade botones de navegación
                if (settings.navigation === true) {
                    this._addNavButtons();
                }
                //aplica estilos
                this._addCSS(settings);





            }
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    jQuery.fn.rup_navMenu.defaults = {
        visible: 3,
        step: 3,
        width: null,
        height: 30,
        speed: 500,
        margin: 1


    };



}));
