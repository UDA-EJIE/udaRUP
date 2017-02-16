(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["jquery", "./rup.base"], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function($) {

    var rup_navbar = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_navbar", rup_navbar));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_navbar("extend", {

    });

    $.fn.rup_navbar("extend", {
        _init: function(args) {
            var $self = this,
                settings = $.extend({}, $.fn.rup_navbar.defaults, args[0]);

            var changed = false;
            var headerSize = $('header').outerHeight(true) - $('header').offset().top;
            var headerNavSize = $('header').outerHeight(true) + $('nav').outerHeight(true);

            window.scrollHeight = 0;
            $(window).scroll(function() {

                if ($(this).scrollTop() === 0) {
                    changed = false;
                    $('header').removeAttr('style');
                    $('.rup-navbar.navbar').removeAttr('style');
                    $('.content').removeAttr('style');
                } else if ($(this).scrollTop() >= headerSize && !changed) {
                    changed = true;
                    $('header').css('margin-top', -headerSize);
                    $('.rup-navbar.navbar').css({
                        'position': 'fixed',
                        'width': '100%'
                    });
                    $('.content').css('margin-top', function(index, curValue) {
                        return parseInt(curValue, 10) + headerNavSize + 'px';
                    });
                } else if ($(this).scrollTop() < headerSize && changed) {
                    changed = false;
                    $('header').css('margin-top', 0);
                    $('.rup-navbar.navbar').css({
                        'position': 'relative',
                        'width': '100%'
                    });
                    $('.content').css('margin-top', function(index, curValue) {
                        return parseInt(curValue, 10) - headerNavSize + 'px';
                    });
                }

                var height = $(window).scrollTop();

                if (height > headerNavSize) {
                    $('nav .scrollTop').addClass('on');
                } else {
                    $('nav .scrollTop').removeClass('on');
                }
            });

            // El reescalado de la pantalla navega al inicio del contenido
            $(window).resize(function() {
                headerSize = $('header').outerHeight(true) - $('header').offset().top;
                headerNavSize = $('header').outerHeight(true) + $('nav').outerHeight(true);
                $.rup_utils.swing2Top();
            });

            // El botón de volver a la parte superior del contenido
            $('nav .scrollTop')
                .off('click')
                .on('click tap', function() {
                    $('.navbar-toggler:visible').click();
                    $.rup_utils.swing2Top();
                });

            // Hacer click fuera de menú lo cierra
            $('#overlay').on('click tap', function() {
                $('.navbar-toggler:visible').click();
            });

            // Funcionamiento de apertura del menú
            $('.navbar-toggler').on('click tap', function() {
                $('#overlay').toggleClass('on');
                $('.navbar-toggleable-md .rup-open').removeClass('rup-open');
            });

            // Cierre de menú al navegar a un item
            $('nav .dropdown-item').not('.dropdown-toggle').on('click', function() {
                $('.navbar-toggler:visible').click();
            });

            // Funcionamiento acordeón entre desplegables en el menú
            $('nav .dropdown>a').on('click tap', function() {
                $('nav .dropdown>a').not($(this)).parent().removeClass('rup-open');
                $(this).parent().toggleClass('rup-open');
            });

            // Funcionamiento de apertura de sub-desplegables en el menú
            $('nav .dropdown-submenu a').on('click tap', function() {
                $('nav .dropdown-submenu a').not($(this)).parent().removeClass('rup-open');
                $(this).parent().toggleClass('rup-open');
            });
        }
    });

    $.fn.rup_navbar.defaults = {

    };
}));
