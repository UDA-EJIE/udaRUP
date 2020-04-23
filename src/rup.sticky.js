/**
  * Encargado de aplicar la propiedad sticky a los componentes
  *
  * @summary 		Componente RUP Sticky
  * @module			"rup.sticky"
  * @version     1.0.0
  * @license
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
  * @copyright   Copyright 2018 E.J.I.E., S.A.
  *
  */

( function( factory ) {
    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( ['jquery','./rup.base'], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
} ( function( $ ) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var rup_sticky = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_sticky', rup_sticky));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_sticky('extend',{
        /**
        * Gestiona las inicializaciones de componentes en modo 'sticky'
        *
        * @name stickyManager
          * @function
          * @since UDA 3.3.0 // Sticky 1.0.0
            *
        */
        stickyManager: function() {
            var self = this;
            var settings = $.extend({}, $.fn.rup_sticky.defaults);

            if (settings.sticky_nav) {
                self._navbarSticky();
            }

            if (settings.sticky_wizard) {
                self._wizardSticky();
            }
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_sticky('extend',{
        /**
            * Aplica el modo 'sticky' al navbar
            *
        * @name _navbarSticky
          * @function
          * @since UDA 3.3.0 // Sticky 1.0.0
            *
            */
        _navbarSticky() {
            if($('.rup-navbar')[0]){
                let headerOuterHeight = $('header').length !=0 ? $('header').outerHeight(true) : 0,
                    parent,
                    shadowElem = $('<div>', {id: 'shadow-elem-sticky'});
    
                window.scrollHeight = 0;
                $(window).scroll(function () {
                    headerOuterHeight = $('header').outerHeight();
        
                    parent = $('.rup-navbar.navbar').parent();
                    parent.append(shadowElem);
    
                    if ($(this).scrollTop() <= headerOuterHeight) {
                        if ($('.rup-navbar.navbar').hasClass('rup-navbar-sticky')) {
                            $('.rup-navbar.navbar').removeClass('rup-navbar-sticky');
                            $('#shadow-elem-sticky').css({'padding-top': 0});
                        }
                    } else if ($(this).scrollTop() > headerOuterHeight) {
                        $('#shadow-elem-sticky').css({'padding-top': $('.rup-navbar.navbar')[0].offsetHeight});
                        $('.rup-navbar.navbar').addClass('rup-navbar-sticky');
                    }
                });
            }
        },
        /**
            * Aplica el modo 'sticky' al menu del wizard
            *
        * @name _wizardSticky
          * @function
          * @since UDA 3.3.0 // Sticky 1.0.0
            *
            */
        _wizardSticky() {
            let headerOuterHeight = $('header').outerHeight();

            $(window).scroll(function () {
                headerOuterHeight = $('header').outerHeight();

                if ($(this).scrollTop() < headerOuterHeight * 2) {
                    if ($('.rup-wizard_stepsDescContainer').hasClass('rup-wizard_stepsDescContainer-sticky')) {
                        $('.rup-wizard_stepsDescContainer').removeClass('rup-wizard_stepsDescContainer-sticky');
                    }
                } else if ($(this).scrollTop() >= headerOuterHeight * 2) {
                    $('.rup-wizard_stepsDescContainer').addClass('rup-wizard_stepsDescContainer-sticky');
                }
            });
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_sticky.defaults = {
        sticky_nav: true,
        sticky_wizard: true
    };

    // Inicializamos la gestión de las propiedades 'sticky'
    $.fn.rup_sticky('stickyManager');
}));
