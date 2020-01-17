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

    var rup_empty = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_empty', rup_empty));

    //*******************************
    // DEFINICIÓN DE MÉTODOS RUP
    //*******************************
    $.fn.rup_empty('extend',{
        getRupValue: function() {
            return null;
        },
        setRupValue: function() {

        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_empty('extend',{
        foo: function() {
            return this;
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_empty('extend',{
        _bar: function() {
            return this;
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_empty('extend', {
        _init : function(args){
            var $self = this,
                settings = $.extend({}, $.fn.rup_empty.defaults, args[0]);


            // Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
            $self.attr('ruptype', 'empty');

            // TODO : Invocación al plugin

            // Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
            $self.data('settings', settings);

        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_empty.defaults = {
        foobar: false
    };

}));
