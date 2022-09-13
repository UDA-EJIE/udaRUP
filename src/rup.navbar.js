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
 * Proporciona una herramienta para navegar a través de las aplicación web.
 * 
 * @summary Componente RUP Navbar
 * @module rup_navbar
 * @example
 * var html = '<nav class="rup-navbar navbar">\
                <button type="button" class="navbar-toggler hidden-lg-up navbar-toggle" \
                    type="button" data-toggle="rup-collapse" data-target="#navbarResponsive"\
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">\
                </button>\
                <a class="navbar-brand" href="#">Uda</a>\
                    <ul class="nav navbar-nav">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre1\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem11</a>\
                                <a href="#" class="dropdown-item">Elem12</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre2\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem21</a>\
                                    <a href="#" class="dropdown-item">Elem22</a>\
                                </div>\
                            </li>\
                    </ul>\
                    <ul class="nav navbar-nav float-md-right rup-nav-tools">\
                        <li class="nav-item dropdown">\
                            <a class="nav-link dropdown-toggle" href="#"\
                                id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                Padre3\
                            </a>\
                            <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                <a href="#" class="dropdown-item">Elem31</a>\
                                <a href="#" class="dropdown-item">Elem32</a>\
                            </div>\
                        </li>\
                        <li class="nav-item dropdown">\
                                <a class="nav-link dropdown-toggle" href="#"\
                                    id="navDropdownUno" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                    Padre4\
                                </a>\
                                <div class="collapse dropdown-toggle" aria-labelledby="navDropdownUno">\
                                    <a href="#" class="dropdown-item">Elem41</a>\
                                    <a href="#" class="dropdown-item">Elem42</a>\
                                </div>\
                            </li>\
                    </ul>\
              </nav>';
        $('#content').append(html);
        $('nav').rup_navbar(); 
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './external/util', './external/dropdown', './rup.sticky'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var rup_navbar = {};

    const Dimension = {
        WIDTH  : 'width',
        HEIGHT : 'height'
    };

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_navbar', rup_navbar));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_navbar('extend', {

    });

    $.fn.rup_navbar('extend', {
        /**
         * Funcion que alterna el estado del navbar entre desplegado y oculto.
         * @function
         * @name toggle
         * @example
         * $('nav').rup_navbar('toggle');
         */
        toggle: function() {
            this.click();
        },
        /**
         * Funcion que despliega el navbar.
         * @function
         * @name show
         * @example
         * $('nav').rup_navbar('show');
         */
        show: function() {
            if(!$('[aria-labelledby="'+this.attr('id')+'"]').is(':visible')) {
                this.rup_navbar('toggle');
            }
        },
        /**
         * Funcion que oculta el navbar.
         * @function
         * @name hide
         * @example
         * $('nav').rup_navbar('hide');
         */
        hide: function () {
            if($('[aria-labelledby="'+this.attr('id')+'"]').is(':visible')) {
                this.rup_navbar('toggle');
            }
        },
        /**
         * Define si habrá o no transición al desplegar y ocultar el navbar
         * @function
         * @name setTransitioning
         * @param {boolean} transición -True: hay transicion; False: no hay transicion
         * @example
         * $('nav').rup_navbar('setTransitioning', true);
         */
        setTransitioning: function(isTransitioning) {
            this._isTransitioning = isTransitioning;
        },
        _getDimension() {
            let hasWidth = $(this._element).hasClass(Dimension.WIDTH);
            return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
        },
        _init: function () {
            var $self = this;

            $self._isTransitioning = false;
            $self._element         = $self[0];
            $self._triggerArray    = $.makeArray($(
                `[data-toggle="rup-colapse"][href="#${$self._element.id}"],` +
                                `[data-toggle="rup-colapse"][data-target="#${$self._element.id}"]`
            ));
            //Lo añadimos a data para mantenerlo
            $self.data('_triggerArray',$self._triggerArray);
            $self.data('_element', $self._element);

            // El botón de volver a la parte superior del contenido
            $('nav .swingTop')
                .off('click')
                .on('click', function () {
                    $('.navbar-toggler:visible').click();
                    $.rup_utils.swing2Top();
                });

            // Hacer click fuera de menú lo cierra
            $('#overlay').on('click tap', function () {
                $('.navbar-toggler:visible').click();
            });

            // Funcionamiento de apertura del menú
            $('.navbar-toggler').on('click tap', function () {
                $self.toggle();
                $('#overlay').toggleClass('on');
                $('.navbar-toggleable-md .rup-open').removeClass('rup-open');
            });

            // Cierre de menú al navegar a un item
            $('nav .dropdown-item').not('.dropdown-toggle').on('click', function () {
                $('.navbar-toggler:visible').click();
            });

            // Funcionamiento acordeón entre desplegables en el menú
            $('nav .dropdown>a').on('click tap', function () {
                $('nav .dropdown>a').not($(this)).parent().removeClass('rup-open');
                $(this).parent().toggleClass('rup-open');
              //Al pinchar deben estar todos ocultos de primeras.
                $('.navbar-toggleable-md div.dropdown-submenu.open').removeClass('open');
            });

            $('.dropdown-toggle', $self).dropdown($('.dropdown-toggle', $self));

            // Funcionamiento de apertura de sub-desplegables en el menú
            $('nav .dropdown-submenu a').on('click tap', function () {
              ///  $('nav .dropdown-submenu a').not($(this)).parent().removeClass('rup-open');
                $(this).parent().toggleClass('rup-open');

                var menuScrollPos = 0;
                var end = $(this).parent().index();
                $(this).parent().siblings().each(function (i, e) {
                    if (i < end) {
                        if ($(e).children('.dropdown-menu').length > 0) {
                            menuScrollPos += $(e).children('.dropdown-item').first().outerHeight(true);
                        } else {
                            menuScrollPos += $(e).outerHeight(true);
                        }
                    }
                });
                $(this).parent().parent().animate({
                    scrollTop: menuScrollPos
                }, 500);
            });

            //Se audita el componente
            $.rup.auditComponent('rup_navbar', 'init');
            
            //Añadimos un handler para cuando esté en modo responsive
            $('button.navbar-toggler', $(this).parent()).on('click', function () {
                $('div.navbar-toggleable-md', $(this).parent()).toggleClass('collapse');
            });
        }
    });

}));
