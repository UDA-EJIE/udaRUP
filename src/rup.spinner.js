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

 ;(function( factory ) {
 	 if ( typeof define === "function" && define.amd ) {

 		 // AMD. Register as an anonymous module.
 		 define(["jquery","./rup.base"], factory );
 	 } else {

 		 // Browser globals
 		 factory(jQuery);
 	 }
}(function ($) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var rup_spinner = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_spinner", rup_spinner));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_spinner("extend",{
		getRupValue: function() {
			var $self = this, value;
			value = this.spinner("value");

			return value;
		},
		setRupValue: function(value){
			var $self = this;

			$self.spinner("value", 5 );

			return $self;
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_spinner("extend",{
		_bar: function() {
			return this;
		}
	});

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	$.fn.rup_spinner("extend", {
		_init : function(args){
			var $self = this, settings = $.extend({}, $.fn.rup_spinner.defaults, args[0]);


			$self.addClass("rup_spinner");
			$self.attr("ruptype","spinner");
			$self.spinner(settings);

		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	$.fn.rup_spinner.defaults = {
		foobar: false
	};

}));
