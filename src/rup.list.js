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

/**
 * Ccomponente de list.
 *
 * @summary Componente RUP List.
 * @module rup_list
 *
 * $("#idList").rup_list(properties);
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
	var settingsInit;

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************
	
	$.extend($.rup, {
		/**
     *  Lista creada a partir de un texto.
     * @typedef {string} module:rup_list~JSON
     * @example
     * $.rup.list.JSON
     */
		/**
     *  Lista creado a partir de la respuesta de una petición AJAX.
     * @typedef {string} module:rup_list~AJAX
     * @example
     * $.rup.list.AJAX
     */

		list: {
			JSON: 'jsonList',
			AJAX: 'ajaxList'
		}
	});

	var rup_list = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_list', rup_list));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	// 
	// $("#idLista).rup_list("foo");
	// $("#idLista).rup_list("getNumElems");
	// $("#idLista).rup_list("setElem", 2, {});
	$.fn.rup_list('extend',{
		inicio: function(paramJson) {
			var $self = this;
			var settings = settingsInit,
				json = $.extend(true, {}, paramJson);

			if(settings.type !== undefined && settings.type !== null){
				if($.rup.list.JSON === settings.type){
					$self._jsonLoad(settings,json);
				}else if($.rup.list.AJAX === settings.type){
					$self._ajaxLoad(settings);
				}else{
					$.rup_messages("msgAlert", {						
						message: "Tipo de lista Incompatible"
					});
				}
			}else{
				$.rup_messages("msgAlert", {						
					message: "El tipo de lista es obligatorio"
				});
			}

			return $self;
		},
		setElem: function(id, obj,json) {
			return $self;
		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_list('extend',{
		_bar: function() {
			return this;
		},
		/**
	     * Realiza la carga del contenido de la lista a partir de una petición AJAX.
	     *
	     * @function  _ajaxLoad
	     * @private
	     * @param {object} settings - Propiedades de configuración del componente.
	     */
			_ajaxLoad: function (settings) {
				var $self = this;
				//Si el tipo de dialogo es AJAX y no se establece url se muestra un error y se devuelve el control
				if (!settings.url || settings.url === null || settings.url === '') {
					$.rup.msgAlert({
						title: $.rup.i18nParse($.rup.i18n.base, 'rup_global.error'),
						message: $.rup.i18nParse($.rup.i18n.base, 'rup_dialog.noURL')
					});
					return false;
				}

				//Peticion ajax para obtener los datos a mostrar
				$.rup_ajax({
					type: 'GET',
					contentType : 'application/json',
					dataType: 'json',
					url: settings.url,
					success: function(data) {
						$self._jsonLoad(settings,data);
					},
					error: function (){
						alert('Se ha producido un error al recuperar los datos del servidor');
					}
				});
			},
			/**
		     * Realiza la carga del contenido de la lista a partir de un Json.
		     *
		     * @function  _jsonLoad
		     * @private
		     * @param {object} settings - Propiedades de configuración del componente.
		     */
				_jsonLoad: function (settings,json) {
					var $self = this;
					$self.text("");
					//Si el tipo de dialogo es AJAX y no se establece url se muestra un error y se devuelve el control
					if (!json || json === null || json === '') {
						$.rup_messages("msgAlert", {						
							message: "Json incorrecto"
						});
						return false;
					}
					var cadena = "";
					var $ul = $('<ul>', {class: "list-group"});
					$.each( json, function( j, jsonObj ) {
						//Se establece el orden por defecto;
						var listDefault = settings.template.split(",");
						$.each(listDefault, function( idx, obj ) {
							if(jsonObj[obj] !== undefined){
								cadena += jsonObj[obj]+" ";
								delete jsonObj[obj];
							}
						});
						//Se lista  el resto
						$.each(jsonObj, function(idx, obj) {
						    cadena += obj+" ";
						});
						$('<li/>')
					        .addClass('list-group-item')
					        .attr('role', 'menuitem')
					        .text(cadena)
					        .appendTo($ul);
						cadena = "";
					});
					$self.append($ul);
				}
	});

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	// <ul id="idLista">...</ul>
	// $("#idLista).rup_list({
	//  	template:"zspna
	//});
	$.fn.rup_list('extend', {
		_init : function(args){
			settingsInit = $.extend({}, $.fn.rup_list.defaults, args[0]);

			var $self = this;
			 if($.rup.list.AJAX === settingsInit.type){
					$self._ajaxLoad(settingsInit);
			 }
		
			//Se audita el componente
			$.rup.auditComponent('rup_list', 'init');

			return $self;

		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	$.fn.rup_list.defaults = {
		ajaxCache: true,
		template: "nombre,apellido1,apellido2",
		type: null,
		url: null
	};

}));