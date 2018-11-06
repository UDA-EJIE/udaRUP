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
 * @fileOverview Implementa el patrón RUP Form.
 * @author EJIE
 * @version 2.4.13
 */
(function ($) {



	//*********************************************
	// ESPECIFICAC�?ON DE LOS TIPOS BASE DEL PATRÓN
	//*********************************************

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
    /**
    * Permite al usuario introducir datos en una serie de campos para ser enviados al servidor y ser procesados.
    *
    * @summary Componente RUP Form.
    * @namespace jQuery.rup_form
    * @memberOf jQuery
    * @tutorial rup.form
    * @example
    * var properties={
    *   // Propiedades de configuración
    * };
    *
    * $("#formulario").rup_form(properties);
    */
	var rup_form = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_form", rup_form));

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	$.fn.rup_form("extend",{
        /**
        * Realiza la misma función que ajaxSubmit. Se mantiene para asegurar la retrocompatibilidad con versiones anteriores.
        *
        * @name jQuery.rup_form#ajaxFormSubmit
        * @function
        * @param {object} options - Opciones de configuración.
        * @example
        * var options = {};
        * jQuery("#form").rup_form("ajaxFormSubmit", options);
        */
		ajaxFormSubmit:function(options){
			var $self = this;
			// Actiavamos la gestión de las peticiones AJAX mediante la función $.rup_ajax.
			$.set_uda_ajax_mode_on();
			$self.ajaxSubmit(options);
		},
        /**
        * Realiza el envío del formulario. La configuración de este método es la misma que la de ajaxForm.
        *
        * @name jQuery.rup_form#ajaxSubmit
        * @function
        * @param {object} argOptions - Opciones de configuración.
        * @example
        * var options = {};
        * jQuery("#form").rup_form("ajaxSubmit", options);
        */
		ajaxSubmit:function(argOptions){
			var $self = this,
			options = $.extend(true, {}, $.fn.rup_form.defaults, argOptions);
			// Actiavamos la gestión de las peticiones AJAX mediante la función $.rup_ajax.
			$.set_uda_ajax_mode_on();
			$self.rup_form("configureOptions",options);
			if (options.formValidationRequired){
				$self.rup_validate(options.validate);
				if ($self.valid()){
					$(this).ajaxSubmit(options);
				}
			}else{
				// Necesario utilizar $(this) para invocar al ajaxSubmit del plugin subyacente
				$(this).ajaxSubmit(options);
			}
		},
        /**
        * Elimina la configuración realizada por el componente sobre el formulario html.
        *
        * @name jQuery.rup_form#destroy
        * @function
        * @example
        * var options = {};
        * jQuery("#form").rup_form("destroy");
        */
		destroy:function(){
			var $self = this;
			$.removeData($self[0]);
			$self.ajaxFormUnbind();
			$self.unbind();
		},
        /**
        * Serializa el contenido del formulario en un query string.
        *
        * @name jQuery.rup_form#formSerialize
        * @function
        * @return {string} - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.
        * @example
        * jQuery("#form").rup_form("formSerialize");
        */
		formSerialize:function(){
			var $self = this, fieldArray, element, ruptype, fieldArray = [];

			$.each($self.formToArray(), function(key, obj){
				element = $("[name='"+obj.name+"']",self);

				ruptype = element.attr("ruptype");
				if (ruptype!==undefined){
					obj.value=element["rup_"+ruptype]("getRupValue");
					fieldArray.push(obj);
				}else{
					fieldArray.push(obj);
				}

			});

			return $.param(fieldArray);
		},
        /**
        * Realiza la serialización de campos del formulario en un objeto json.
        *
        * @name jQuery.rup_form#formToJson
        * @function
        * @return {string} - Retorna un objeto con el formato {nombre1:valor1, nombre2:valor2…nombreN:valorN}.
        * @example
        * jQuery("#form").rup_form("formToJson");
        */
		formToJson:function(){
			return form2object(this[0]);
		},
        /**
        * Realiza la serialización de campos del formulario en un query string
        *
        * @name jQuery.rup_form#fieldSerialize
        * @function
        * @return {string} - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.
        * @example
        * jQuery("#form .specialFields").rup_form("fieldSerialize");
        */
		fieldSerialize:function(){
			var a = [];
			this.each(function() {
				var n = $(this).attr("name");
				if (!n) {
					return;
				}
				var v = $(this).rup_form("fieldValue");
				if (v && v.constructor == Array) {
					for (var i=0,max=v.length; i < max; i++) {
						a.push({name: n, value: v[i]});
					}
				}
				else if (v !== null && typeof v != 'undefined') {
					a.push({name: $(this).attr("name"), value: v});
				}
			});
			return $.param(a);
		},
        /**
        * Devuelve un array con el valor de los campos indicados.
        *
        * @name jQuery.rup_form#fieldSerialize
        * @function
        * @return {string[]} - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.
        * @example
        * jQuery("#form .specialFields").rup_form("fieldValue");
        */
		fieldValue:function(){
			var valuesArray=[], value;
			this.each(function() {
				var ruptype = $(this).attr("ruptype");

				if (ruptype!==undefined){
					value = $(this)["rup_"+ruptype]("getRupValue");
					valuesArray.push(value);
				}else{
					$.merge(valuesArray,$(this).fieldValue());
				}
			});

			return valuesArray;
		},
        /**
        * Inicializa el formulario con su estado inicial invocando al método reset nativo.
        *
        * @name jQuery.rup_form#resetForm
        * @function
        * @return {jQuery} - Retorna el propio componente.
        * @example
        * jQuery("#form").rup_form("resetForm");
        */
		resetForm:function(){
			return this.each(function() {
				$(this).resetForm();
			});
		},
        /**
        * Limpia los elementos del formulario.
        *
        * @name jQuery.rup_form#clearForm
        * @function
        * @param {boolean} includeHidden - Determina si se deben de limpiar también los elementos hidden que existen en el formulario.
        * @return {jQuery} - Retorna el propio componente.
        * @example
        * // Limpiar los campos del formulario
        * jQuery("#form").rup_form("clearForm");
        * // Limpiar los campos del formulario inlcuyendo los campos hidden
        * jQuery("#form").rup_form("clearForm", true);
        */
		clearForm:function(includeHidden){
			return this.each(function() {
				$('input,select,textarea', this).rup_form("clearFields",includeHidden);
			});
		},
        /**
        * Limpia los campos especificados mediante el selector de jQuery.
        *
        * @name jQuery.rup_form#clearFields
        * @function
        * @param {boolean} includeHidden - Determina si se deben de limpiar también los elementos hidden que existen en el formulario.
        * @return {jQuery} - Retorna el propio componente.
        * @example
        * // Limpiar los campos del formulario
        * jQuery("#form .specialFields").rup_form("clearFields");
        * // Limpiar los campos del formulario inlcuyendo los campos hidden
        * jQuery("#form .specialFields").rup_form("clearFields", true);
        */
		clearFields:function(includeHidden){
			return this.each(function() {
				var ruptype = $(this).attr("ruptype");

				if (ruptype === undefined || ruptype!=="combo"){
					$(this).clearFields(includeHidden);
				}else{
					$(this).rup_combo("clear");
				}
			});
		},
        /**
        * Función de inicialización del componente. Es un método de uso interno. No debería de invocarse de manera directa.
        *
        * @name jQuery.rup_form#configureOptions
        * @function
        * @param {object} settings - Propiedades de configuración
        */
		configureOptions:function(settings){
			var $self = this, hasFileInputs, beforeSendUserEvent, beforeSubmitUserEvent;

			if (settings.url!==null){
				$self.attr("action", settings.url);
			}

			hasFileInputs = $('input:file', $self).length > 0;

			if (settings.useJsonIfPossible && !hasFileInputs){
				settings.contentType='application/json';
			}

			// BeforeSend
			beforeSendUserEvent = settings.beforeSend;
			settings.beforeSend = function (xhr, ajaxOptions) {
				var ret = true;
				if($.isFunction(beforeSendUserEvent)){
					ret = beforeSendUserEvent.call(this,xhr, ajaxOptions);
				}

				if (ret === false){
					return false;
				}else if (ret !== "skip"){
					if(ajaxOptions.contentType.indexOf("application/json")!==-1){
						var jsonData = $self.rup_form("formToJson");
						if (settings.multimodel!==null){
							xhr.setRequestHeader("RUP_MULTI_ENTITY", "true");
							jsonData["rupEntityMapping"]=settings.multimodel;
						}
						if (ajaxOptions.extraData!==undefined && ajaxOptions.extraData!==null){
							$.extend(jsonData, ajaxOptions.extraData);
						}
						ajaxOptions.data=$.toJSON(jsonData);
					}
				}
			};

			// BeforeSubmit
			beforeSubmitUserEvent = settings.beforeSubmit;
			settings.beforeSubmit = function (arr, $form, options) {
				var httpMethod, error_user, hasFileInputs;
				if($.isFunction(beforeSubmitUserEvent)){
					if (beforeSubmitUserEvent.call(this,arr, $form, options)===false){
						return false;
					}
				}

				hasFileInputs = jQuery('input:file', $form).length > 0;
				// Implementacion para realizar la emulacion de xhr al utilizar iframes
				if ((!$.rup.browser.xhrFileUploadSupport && hasFileInputs) || options.iframe===true){

					// Configuracion necesaria para permitir con iframes el uso de metodos http diferentes a GET o POST
					httpMethod = settings.type!==undefined ? settings.type : options.type;
					if ($.inArray(httpMethod.toUpperCase(),$.rup.IFRAME_ONLY_SUPPORTED_METHODS) === -1){
						options.extraData = $.extend({}, options.extraData, {"_method":httpMethod.toUpperCase()});
					}

					//Se valida la presencia de portal y, llegados al caso, se adecuan las llamadas ajax para trabajar con portales
					options.url=$.rup_utils.setNoPortalParam(options.url);
					// Envio del parametro emulate_iframe_http_status para activar la emulacion en el lado servidor
					options.extraData = $.extend({}, options.extraData, {"_emulate_iframe_http_status":"true"});
					options.url = options.url + (options.url.match("\\?") === null ? "?" : "&") + "_emulate_iframe_http_status=true";

					// Callback de error por defecto a ejecutar cuando se produzca un error al utilizar la emulacion
					error_user = options.error;
					options.error = function(xhr, textStatus, errorThrown){
						var errorText = $.rup.rupAjaxDefaultError(xhr, textStatus, errorThrown);

						// Si se ha producido un error de los tratados lo mostramos
						if (error_user!=null){
							$(error_user(xhr, textStatus, errorThrown));
						}else{
							if(errorText){
								$.rup.showErrorToUser(errorText);
							}
						}
					};
				}
			};

			settings.formValidationRequired = (settings.validate!==undefined);

			// Configruacion de las validaciones
			if (settings.formValidationRequired){
				if (settings.error===undefined){
					settings.error = function(a,b,c,d){
						try{
							var json = jQuery.parseJSON(a.responseText);
							$self.validate().invalid=json.rupErrorFields;
							$self.validate().submited=json.rupErrorFields;
							$self.validate().showErrors(json.rupErrorFields);
							if (json.rupFeedback!==undefined && $self.validate().settings.feedback!==undefined){
								$self.validate().settings.feedback.rup_feedback("set", $.rup_utils.printMsg(json.rupFeedback.message), (json.rupFeedback.style!==undefined?json.rupFeedback.style:null));
							}
						}catch(ex){
							$self.validate().settings.feedback.rup_feedback("set", a.responseText, "error");
						}
					};
				}
				settings.validate.submitHandler = function(form) {
					jQuery(form).ajaxSubmit($(form).data("ajaxSettings"));
				};

				settings.validate.feedback=settings.feedback;
			}
			$self.data("ajaxSettings", settings);
			$self.data("settings", settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************
	$.fn.rup_form("extend",{
	});

	$.fn.rup_form("extend",{
        /**
        * Función de inicialización del componente.
        *
        * @name jQuery.rup_form#_init
        * @function
        * @private
        * @param {object} args - Propiedades de configuración.
        */
			_init : function(args){
				var $self = this, realizarValidacion, settings, ajaxFormSettings={}, userSettings={};

				// Determinamos si se ha introducido configuracion para el componente validacion.
				// Settings de configuracion
				settings = $.extend(true, {}, $.fn.rup_form.defaults, args[0]);

				// Anadimos al formulario el class rup_form para identificarlo como componente formulario.
				$self.addClass("rup_form");
				$self.attr("ruptype","form");

				$self.rup_form("configureOptions",settings);
				// En caso de que no sehaya configurado el componente validacion se realiza la llamada al plugin jquery.form.
				if (settings.formValidationRequired){
					$self.rup_validate(settings.validate);
				}else{
					$self.ajaxForm(settings);
				}
			}
		});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

    /**
    * Función de callback que será invocada antes de realizarse la serialización del formulario.
    *
    * @callback jQuery.rup_form~beforeSerialize
    * @param {jQuery} $form - Referencia del objeto jQuery del formulario.
    * @param {object} options - Opciones de configuración con las que se ha inicializado el componente.
    * @return {boolean} - En caso de devolver false se cancela el envío del formulario.
    * @example
    * $("#form").rup_form({
    *  beforeSerialize: function($form, options) { ... }
    * });
    */

    /**
    * Función de callback que será invocada antes de realizarse el envío del formulario.
    *
    * @callback jQuery.rup_form~beforeSubmit
    * @param {object[]} arr - Array que contiene la información introducida en el formulario. El array tiene el siguiente formato : [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
    * @param {jQuery} $form - Referencia del objeto jQuery del formulario.
    * @param {object} options - Opciones de configuración con las que se ha inicializado el componente.
    * @return {boolean} - En caso de devolver false se cancela el envío del formulario.
    * @example
    * $("#form").rup_form({
    *  beforeSubmit: function(arr, $form, options) { ... }
    * });
    */

    /**
    * Función de callback que será invocada cuando se produzca un error.
    *
    * @callback jQuery.rup_form~error
    * @example
    * $("#form").rup_form({
    *  error: function() { ... }
    * });
    */

    /**
    * Función de callback que será invocado cuando se reciba la respuesta del formulario.
    *
    * @callback jQuery.rup_form~suceess
    * @param {string} responseText - Texto identificador de la respuesta obtenida.
    * @param {string} statusText - Código de respuesta http.
    * @param {object} xhr - Objeto xhr con la respuesta enviada del servidor.
    * @param {jQuery} $form - Referencia jQuery al componente formulario.
    * @example
    * $("#form").rup_form({
    *  suceess: function(responseText, statusText, xhr, $form) { ... }
    * });
    */

    /**
    * Función de callback que será invocado cuando se reciba la respuesta del formulario.
    *
    * @callback jQuery.rup_form~uploadProgress
    * @param {Event} event - Objeto Event procedente del navegador.
    * @param {Integer} position - Numero que determina el contenido enviado.
    * @param {Integer} total - Numero que identifica el total del contenido a enviar.
    * @param {Integer} percentComplete - Numero que identifica el porcentaje actual completado en el proceso de envío.
    * @example
    * $("#form").rup_form({
    *  uploadProgress: function(event, position, total, percentComplete) { ... }
    * });
    */

    /**
    * Opciones por defecto de configuración del componente.
    * @name jQuery.rup_form#options
    *
    * @property {jQuery.rup_form~beforeSerialize} [beforeSerialize=null] - Función de callback que será invocada antes de realizarse la serialización del formulario. Permite la modificación de los datos del formulario antes de que estos sean recuperados para su procesado por el componente.
    * @property {jQuery.rup_form~beforeSubmit} [beforeSubmit=null] - Función de callback que será invocada antes de realizarse el envío del formulario. Permite acceder a la información que será enviada al formulario. En caso de retornar false no se realizará en envío.
    * @property {boolean} [clearForm=null] - Propiedad booleana que determina si el formulario debe de limpiarse después de realizar el envío.
    * @property {object} [data] - Mediante esta propiedad es posible especificar parámetros extra que sean enviados alservidor.
    * @property {string} [dataType] - Tipo de datos esperados en la respuesta. Los valores posibles son null, xml, json y script.
    * @property {jQuery.rup_form~error} [error] - Función de callback que será invocada cuando se produzca un error.
    * @property {boolean} [forceSync=false] - Propiedad booleana. En caso de ser true elimina la corta espera que se produce antes de enviar el formulario cuando se envían ficheros o se utiliza la opción de iframe. La espera se utiliza para permitir al navegador actualizar modificaciones realizadas en el DOM antes de que se realice el
envío de los datos.
    * @property {boolean} [iframe=false] - Determina si el formulario debe de ser enviado siempre mediante un iframe.
    * @property {string} [iframeSrc] - Propiedad de texto que deberá ser utlizada siempre en conjunción con la propiedad iframe. Por defecto, about:blank. Por defecto para páginas que utlicen el protocolo https, javascript:false.
    * @property {string} [iframeTarget=null] - Identifica el iframe que será utilizado como target en la respuesta en los envíos de ficheros. Por defecto, el componente creará un iframe temporal para capturar la respuesta del envío de ficheros.
    * @property {boolean | object} [multimodel=false] - Permite especificar la configuración que se deberá de aplicar a la hora de realizar el envío de varias entidades en la misma petición. La configuración de este parámetro se detalla en el apartado 9.2.
    * @property {boolean} [replaceTarget=false] - Opcionalmente se utililiza junto con la opción target. En caso de ser true el elemento identificado en la opción target será reemplazado. En caso de ser false solo su contenido será reemplazado.
    * @property {boolean} [resetForm=false] - Propiedad booleana que determina si el formulario debe ser inicializado al realizarse el envío del mismo.
    * @property {bolean} [semantic=false] - Propiedad booleana que determina si los campos del formulario deben ser enviado en estricto orden semántico. Por defecto la serialización normal del formulario se realiza en orden semántico exceptuando los campos img.
    * @property {jQuery.rup_form~suceess} [suceess] - Método callback que será invocado cuando se reciba la respuesta del formulario.
    * @property {string | jQuery | Element} [target] - Identifica los elementos de la página que deberán ser actualizados con la respuesta del servidor. El target puede ser indicado mediante un selector de jQuery, un objeto de jQuery o un objeto DOM.
    * @property {string} [type] - Detemina el método con el que se enviará el formulario, GET o POST. Por defecto el valor de la propiedad method indicada en el formulario o GET en caso de no encontrarse.
    * @property {jQuery.rup_form~uploadProgress} [uploadProgress=null] - Método que será invocado con información de progreso del envío del formulario (en caso de estar soportado por el navegador).
    * @property {string} [url] - URL a la cual se realizará en envío del formulario. Por defecto el valor indicado en la propiedad action del formulario.
    * @property {boolean} [useJsonIfPossible=true] - Mediante este parámetro se especifica al componente que debe de utilizar el formato application/json como prioridad (siempre que sea posible) al realizar el envío del formulario.
    */


	$.fn.rup_form.defaults = {
			ajaxForm:null,
			feedback:null,
			multimodel:null,
			useJsonIfPossible:true // En caso de ser posible realizar en envío mediante json se enviarán los datos en este formato.
	};


})(jQuery);
