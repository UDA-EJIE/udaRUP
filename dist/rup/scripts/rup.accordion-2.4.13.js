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
 * SIN GARANT�?AS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/**
 * @fileOverview Implementa el patrón RUP Accordion.
 * @author EJIE
 * @version 2.4.13
 */
(function ($) {

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************

    /**
    * Tiene como objetivo presentar un contenido donde conceptos relacionados pueden agruparse (ej. secciones) de manera que el usuario puede mostrar u ocultar información sin perder el contexto del contenido principal.
    *
    * @summary Componente RUP Accordion.
    * @namespace jQuery.rup_accordion
    * @memberOf jQuery
    * @tutorial rup_accordion
    * @example
    * $(".rup_accordion").rup_accordion({
	*   animated: "bounceslide",
	*	active: false,
	*	autoHeight: false,
	*	collapsible: true
	* });
    */
	var rup_accordion = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_accordion", rup_accordion));


	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	$.fn.rup_accordion("extend",{
    /**
    * Elimina completamente la funcionalidad del Accordion. Como resultado, se devuelven los
objetos html, tal y como estaban, antes de aplicar el componente Accordion.
    *
    * @name jQuery.rup_accordion#destroy
    * @function
    * @example
    * $("#idAccordion").rup_accordion("destroy");
    */
		destroy : function(){
			$(this).removeData("settings");
			$(this).accordion("destroy");
		},
    /**
     * Deshabilita el componente Accordion.
     *
     * @name jQuery.rup_accordion#disable
     * @function
     * @example
     * $("#idAccordion").rup_accordion("disable");
     */
		disable : function(){
			$(this).accordion("disable");
		},
    /**
     * Habilita el componente Accordion.
     *
     * @name jQuery.rup_accordion#enable
     * @function
     * @example
     * $("#idAccordion").rup_accordion("enable");
     */
		enable : function(){
			$(this).accordion("enable");
		},
    /**
     * Dependiendo de si se informa un valor asociado a una parámetro o se introduce un json con relaciones variable-valor o no se pasan parámetros asociados a la opción especificada, la función asigna el nuevo valor al parámetro asociado o asigna el nuevo conjunto de valores a los parámetros asociados o devuelve el valor actual del parámetro especificado (actuando como un get), respectivamente..
     *
     * @name jQuery.rup_accordion#option
     * @function
     * @param {String | Object} opt - Nombre de la propiedad u objeto con varias propiedades.
     * @param {*} [value] - Valor a asignar a la propiedad especificada por su nombre en el primer parámetro.
     * @example
     * // Asignar el valor "bounceslide" a la propiedad "animated"
     * $("#idAccordion").rup_accordion("option", "animated", "bounceslide");
     * // Se asignan valores a varias propiedades por medio de un objeto json.
     * $("#idAccordion").rup_accordion("option",{active: false, collapsible : true});
     * // Se recupera el valor de la propiedad "animated"
     * $("#idAccordion").rup_accordion("option", "animated");
     */
		option : function(opt, value){//Se establecen la propiedad o propiedades que reciben como parametro y se leen las que no vienen con una asignación.
			if (value !== undefined){
				$(this).accordion("option", opt, value);
			} else {
				if (opt !== undefined){
					return $(this).accordion("option", opt);
				}else{
					return $(this).accordion("option");
				}
			}
		},
    /**
     * Devuelve el elemento .ui-accordion:.
     *
     * @name jQuery.rup_accordion#widget
     * @function
     * @returns {object} - Objeto jQuery que contiene el accordion.
     * @example
     * $("#idAccordion").rup_accordion("widget");
     */
		widget : function(){
			return $(this).accordion("widget");
		},
    /**
     * Activación programática de la sección especificada por parámetro.
     *
     * @name jQuery.rup_accordion#activate
     * @function
     * @param {number | object | boolean} - Valor numérico diferente de cero que indique la sección seleccionada o un selector que determine el elemento activado. En caso de tener el collapsible activado, es posible pasar el valor false para que se cierren todas las secciones.
     * @example
     * // Activar la seción tercera.
     * $("#idAccordion").rup_accordion("activate", 3);
     * // Activar la seción identificada con el selector seccion3.
     * $("#idAccordion").rup_accordion("activate", "#seccion3");
     * // Colapsar todas las secciones.
     * $("#idAccordion").rup_accordion("activate", false);
     */
		activate : function(index){
			$(this).accordion("activate",index);
		},
	  /**
	   * La función provoca el reajuste de los height (tamaño vertical) de las distintas secciones del Accordion. La ejecución de esta función solo tiene sentido si la opción fillSpace está activada y el height del contenedor cambia.
	   *
	   * @name jQuery.rup_accordion#resize
	   * @function
		 * @deprecated desde la version 2.5.0. Utilizar en su lugar el método refresh.
	   * @example
	   * $("#idAccordion").rup_accordion("resize");
	   */
		resize : function(){
			$(this).accordion("resize");
		}
	});


	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.fn.rup_accordion("extend", {
		_init : function(args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18n.base.rup_global.initError + $(this).attr("id"));
			}
			else {
				var elements = this.children(), elementsNum = (elements.length)/2,
				settings = $.extend({}, $.fn.rup_accordion.defaults, args[0]);
				//Se recogen y cruzan las paremetrizaciones del objeto
				//Se tapa la creación del accordion para evitar visualizaciones inapropiadas
				//Se recomienda que el componente, inicialmente, sea invisible. Para ello se dispone del estilo rup_accordion
				this.removeClass("rup_accordion");



				//Se almacenan los settings en el data del objeto
				this.data("settings",settings);

				//Se sobreescribe uno de los eventos para hacer reaparecer, una vez creado, el accordion
				createUserEvent = settings.create;
				settings.create = function (event, ui) {
					if (createUserEvent !== undefined) {
						if (createUserEvent(event, ui) === false) {
							return false;
						}
					}
					//Comportamiento por defecto del evento
					create_default(event, ui);
				};

				function create_default(event, ui){
					$(event.target).addClass("rup_accordion_create");
				}

				//Se comprueba la corrección del html con el que se creara el accordion
				if(settings.validation){
					if(parseInt(elementsNum) !== elementsNum){
						$.rup.errorGestor($.rup.i18n.base.rup_accordion.strucPairError);
						return false;
					} else {
						elements.each(function(index,object){
							if ((parseInt(index/2) === index/2) && ($(object).find("a").length === 0)){
								$.rup.errorGestor($.rup.i18n.base.rup_accordion.headFormatError);
								return false;
							}
						});
					}
				}

				//Se invoca la creacion del accordion
				this.accordion(settings);
			}
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

    /**
     * @description Opciones por defecto de configuración del componente.
     *
     * @name jQuery.rup_accordion#defaults
     *
     * @property {boolean} [validation=true] - Parámetro de configuración que determina la aplicación de la validación estructural asociada a las necesidades estructurales del Accordion.
     */
	$.fn.rup_accordion.defaults = {
		validation: true
	};

})(jQuery);
