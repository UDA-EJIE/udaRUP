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

                if ($(this).scrollTop() >= headerSize && !changed) {
                    changed = true;
                    $('#divLogin a').popover('hide');


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
                        'position': 'inherit',
                        'width': '100%'
                    });
                    $('.content').css('margin-top', function(index, curValue) {
                        return parseInt(curValue, 10) - headerNavSize + 'px';
                    });
                }
            });

        }
    });

    $.fn.rup_navbar.defaults = {

    };
}));
