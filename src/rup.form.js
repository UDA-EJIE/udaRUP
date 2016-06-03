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
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */
(function ($) {
	
	

	//*********************************************
	// ESPECIFICACÍON DE LOS TIPOS BASE DEL PATRÓN 
	//*********************************************
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	
	var rup_form = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_form", rup_form));
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.fn.rup_form("extend",{
		ajaxFormSubmit:function(options){
			var $self = this;
			// Actiavamos la gestión de las peticiones AJAX mediante la función $.rup_ajax.
			$.set_uda_ajax_mode_on();
			$self.ajaxSubmit(options);
		},
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
		destroy:function(){
			var $self = this;
			$.removeData($self[0]);
			$self.ajaxFormUnbind();
			$self.unbind();
		},
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
		formToJson:function(){
			return form2object(this[0]);
		},
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
		resetForm:function(){
			return this.each(function() {
				$(this).resetForm();
			});
		},
		clearForm:function(includeHidden){
			return this.each(function() {
				$('input,select,textarea', this).rup_form("clearFields",includeHidden);
			});
		},
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
								$self.validate().settings.feedback.rup_feedback("set", $.rup_utils.printMsg(json.rupFeedback.message), (json.rupFeedback.imgClass!==undefined?json.rupFeedback.imgClass:null));
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
				$self.data($self[0], "settings", settings);
			}
		});
		
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.fn.rup_form.defaults = {
			ajaxForm:null,
			feedback:null,
			multimodel:null,
			useJsonIfPossible:true // En caso de ser posible realizar en envío mediante json se enviarán los datos en este formato.
	};		
	

})(jQuery);