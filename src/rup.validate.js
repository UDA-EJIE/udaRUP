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
	
	var rup_validate = {};
	$.rup_validate ={};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_validate", rup_validate));
	
	// Se configuran los mensajes idiomaticos.
	var messages = {};
	
	// Es necesario identificar los mensajes parametrizables. Para ello se buscan los fragmentos de tipo {i} para ser tratados por la funcion format del validador.
	var regularExpr = new RegExp("\\{\\d\\}");
	$.each($.rup.i18n.base.rup_validate.messages, function(key,value){
		
		if (value.match(regularExpr)!==null){
			messages[key]=jQuery.validator.format(value);
		}else{
			messages[key]=value;
		}
	});
	
	// Inicializacion de las expresiones regulares
	var rup_validate_number_regexpr = new RegExp($.rup.i18n.base.rup_validate.regexp.decimal);
	
	// Se configruran los mensajes de las reglas de validacion a partir de los definidos en los ficheros idiomaticos.
	$.extend($.validator.messages, messages);
	
	/*
	 * VALIDACIONES
	 */
	//sobreescritura
	jQuery.validator.addMethod("dni", function(value, element) {
	return this.optional(element) || euroNif(value);
	});

	function nif(dni) {
		if (dni.length === 9) {
			var numero = dni.substr(0, 8);
			var ss = typeof numero;
			var ss2 = typeof dni.substr(dni.length - 1, dni.length);
			numero = numero % 23;
			var letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
			letra = letra.substring(numero, numero + 1);
			if (letra != (dni.substr(dni.length - 1, dni.length)).toUpperCase()) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	function stripHtml(value) {
		// remove html tags and space chars
		return value.replace(/<.[^<>]*?>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ')
		// remove numbers and punctuation
		.replace(/[0-9.(),;:!?%#$'"_+=\/-]*/g,'');
	}
	
	// Dni
	jQuery.validator.addMethod("dni", function(value, element) {
		return this.optional(element) || nif(value);
	});
	
	// Numero maximo de palabras
	jQuery.validator.addMethod("maxWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length < params;
	});

	// Numero minimo de palabras
	jQuery.validator.addMethod("minWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
	});

	// Intervalo de palabras
	jQuery.validator.addMethod("rangeWords", function(value, element, params) {
	    return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
	});
	
	// Letras y caracteres de puntuacion
	jQuery.validator.addMethod("letterswithbasicpunc", function(value, element) {
		return this.optional(element) || /^[a-z-.,()'\"\s]+$/i.test(value);
	});

	// Letras, numeros, espacios o guiones bajos
	jQuery.validator.addMethod("alphanumeric", function(value, element) {
		return this.optional(element) || /^\w+$/i.test(value);
	});

	// Solo letras
	jQuery.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	});

	// Espacios no permitidos
	jQuery.validator.addMethod("nowhitespace", function(value, element) {
		return this.optional(element) || /^\S+$/i.test(value);
	});

	// Entero positivo o negativo
	jQuery.validator.addMethod("integer", function(value, element) {
		return this.optional(element) || /^-?\d+$/.test(value);
	});
	
	// Patron
	jQuery.validator.addMethod("pattern", function(value, element, param) {
	    return this.optional(element) || param.test(value);
	});
	
	// Validacion de campo numerico. Tiene en cuenta el formato dependiendo de la locale 
	jQuery.validator.addMethod("number", function(value, element) {
		var expr = new RegExp($.rup.i18n.base.rup_validate.regexp.decimal);
		return this.optional(element) || expr.test(value);
	});
	
	// Validacion de fecha. Tiene en cuanta el formato dependiendo de la locale
	jQuery.validator.addMethod("date", function(value, element, param) {
		var format;
		if (typeof param === "boolean"){
			if (param===true){
				format = $.rup.i18n.base.rup_validate.format.date;
			}else{
				return true;
			}
		}else{
			format = param;
		}
		
		return this.optional(element) || $.rup_validate.checkDate(format,value);
	});
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.extend($.rup_validate,{
		// Metodo que valida una fecha de acuerdo al formato indicado 
		checkDate : function (format, date) {
			var daysInFebruary = function(year){
				return (((year % 4 === 0) && ( year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28 );
			},
			DaysArray = function(n) {
				for (var i = 1; i <= n; i++) {
					this[i] = 31;
					if (i==4 || i==6 || i==9 || i==11) {this[i] = 30;}
					if (i==2) {this[i] = 29;}
				}
				return this;
			};

			var tsp = {}, sep;
			format = format.toLowerCase();
			// Se busca el separador de fecha entre los caracteres "/","-","." 
			if(format.indexOf("/") != -1) {
				sep = "/";
			} else if(format.indexOf("-") != -1) {
				sep = "-";
			} else if(format.indexOf(".") != -1) {
				sep = ".";
			} else {
				sep = "/";
			}
			format = format.split(sep);
			date = date.split(sep);
			if (date.length != 3) { return false; }
			var j=-1,yln, dln=-1, mln=-1;
			for(var i=0;i<format.length;i++){
				var dv =  isNaN(date[i]) ? 0 : parseInt(date[i],10);
				tsp[format[i]] = dv;
				yln = format[i];
				if(yln.indexOf("y") != -1) { j=i; }
				if(yln.indexOf("m") != -1) { mln=i; }
				if(yln.indexOf("d") != -1) { dln=i; }
			}
			if (format[j] == "y" || format[j] == "yyyy") {
				yln=4;
			} else if(format[j] =="yy"){
				yln = 2;
			} else {
				yln = -1;
			}
			var daysInMonth = DaysArray(12),
			strDate;
			if (j === -1) {
				return false;
			} else {
				strDate = tsp[format[j]].toString();
				if(yln == 2 && strDate.length == 1) {yln = 1;}
				if (strDate.length != yln || (tsp[format[j]]===0 && date[j]!="00")){
					return false;
				}
			}
			if(mln === -1) {
				return false;
			} else {
				strDate = tsp[format[mln]].toString();
				if (strDate.length<1 || tsp[format[mln]]<1 || tsp[format[mln]]>12){
					return false;
				}
			}
			if(dln === -1) {
				return false;
			} else {
				strDate = tsp[format[dln]].toString();
				if (strDate.length<1 || tsp[format[dln]]<1 || tsp[format[dln]]>31 || (tsp[format[mln]]==2 && tsp[format[dln]]>daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]){
					return false;
				}
			}
			return true;
		}
	});
	
	$.fn.rup_validate("extend",{
		// Se eliminan todos los objetos y eventos credos por el componente. 
		destroy:function(){
			var self = this;
			
			// Se eliminan los mensajes de error.
			self.rup_validate("resetForm");
			// Se elimina la informacion almacenada en el objeto.
			$.removeData(self[0]);
			// Se eliminan los eventos asociados al objeto.
			self.unbind();
		},
		// Se eliminan los menssajes de error de las reglas de validacion. 
		resetForm:function(){
			var self = this, settings =	self.data("settings");

			// En caso de mostrarse el feedback de error se oculta.
			if (settings!=null && settings.feedback !== undefined && settings.showErrorsInFeedback){
				settings.feedback.rup_feedback("hide");
			}
			
			// Se reinician los mensajes de error.
			self.validate().resetForm();
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************
	$.fn.rup_validate("extend",{
	});
	
	
	//*****************************
	// INICIALIZACION DE VARIABLES
	//*****************************
	
	// Propiedades de configuracion predeterminadas para cada una de las posibles parametrizaciones de los errores.
	var presetSettings = {
		// Configruacion del componente por defecto
		defaultPresetSettings:{
			showErrors:function(errors){
				var self = this, invalid, errorText, feedback, field, errorKey, fieldError, fieldErrorMsg, error, label;
				
				// Se comprueba si el parametro que contiene los errores está vacío. En este caso se
				if (self.currentElements.length===1){
					if ($.isEmptyObject(errors)){
						delete self.invalid[self.currentElements.attr("name")];
					}
				}
				
				/*
				 * Mostrar mensaje de error de validaciones en el feedback
				 */
				feedback = self.settings.feedback;
				if (self.settings.showErrorsInFeedback && feedback!==undefined && feedback!==null){
					errorText = $("<ul>").addClass("rup-maint_feedbackUL").prepend(self.settings.feedbackErrorConfig.errorMsg);
					
					if (jQuery.isEmptyObject(self.invalid)){
							feedback.rup_feedback("close");
					}else{
					
						if (self.settings.showFieldErrorsInFeedback){
							$.each((!jQuery.isEmptyObject(self.submitted)?self.submitted:self.invalid), function(key,value){
								
								if (self.invalid[key]!==undefined){
									field = self.settings.feedbackErrorConfig.getField(self, self.currentForm, key);
									errorKey = self.settings.feedbackErrorConfig.getFieldName(self, self.currentForm, field);
									fieldError = self.settings.feedbackErrorConfig.getFieldErrorLabel(self, self.currentForm, field, errorKey);
									
									fieldErrorMsg = self.settings.feedbackErrorConfig.getFieldErrorMsg(self, self.currentForm, field, value);
									fieldError.append(fieldErrorMsg);
									errorText.append(fieldError);
								}
								
							});
						}
						feedback.rup_feedback("option",self.settings.feedbackOptions);
						feedback.rup_feedback("set", errorText, "error");
					}
				}
				
				/*
				 * Mostrar detalle de errores en el feedback
				 */
				if (self.settings.showFieldErrorAsDefault){
					for ( var i = 0; self.errorList[i]; i++ ) {
						
						error = self.errorList[i];
						
						if (error.element!==undefined){
						
							label = self.errorsFor( error.element );
							if ( label.length ) {
								label.remove();
							}
						}
					} 
				}
				
				/* En caso de utilizar el tratamiento por defecto del componente de jquery.validate, 
				 * no es posible indicarle varios mensajes de error para un campo.
				 * Por ello deberemos concatenar estos mensajes de error en caso de que se de el caso.
				 */
				for (var i=0;i<self.errorList.length;i++){
//					if (self.settings.showFieldErrorAsDefault){
//						self.errorList[i].message="";
//					}else 
					if (self.errorList[i].element===undefined){
						alert("El campo validado no existe en el formulario");
					}
					if ($.isArray(self.errorList[i].message)){
						// En caso de que el mensaje de error sea un array de mensajes, se debera de recorrer y concatenar
						var newMessage="";
						for (var j=0;j<self.errorList[i].message.length;j++){
							newMessage+=self.errorList[i].message[j];
							if (j!==self.errorList[i].message.length-1){
								newMessage+=", ";
							}
						}
						self.errorList[i].message=newMessage;
					} 
				}
				// Se eliminan los etilos de error previos
				$("."+self.settings.errorClass+":not(.rup-maint_validateIcon)",self.currentForm).removeClass(self.settings.errorClass);
				// Se invoca al metodo por defecto del plugin subyacente
				self.defaultShowErrors();
			},
			showErrorsInFeedback:function(errors){
				
			},
			errorPlacement:function(label,element){
				
				if (element.attr("ruptype")==='combo'){
					var comboElem = $("#"+element.attr("id")+"-button");
					if (comboElem){
						label.insertAfter(comboElem);
					}
				}else{
					label.insertAfter(element);
				}
			}
		},
		// Configuracion de las propiedades a aplicar en caso de que se deban mostrar los errores mediante la visualizacion por defecto.
		showFieldErrorAsDefault:{
			errorElement:"img",
			errorPlacement: function(error, element) {
				var errorElem = error.attr("src",this.errorImage).addClass("rup-maint_validateIcon").html('').rup_tooltip({"applyToPortal": true});
				
				if (element.attr("ruptype")==='combo'){
					var comboElem = $("#"+element.attr("id")+"-button");
					if (comboElem){
						errorElem.insertAfter(comboElem);
					}
				}else{
					errorElem.insertAfter(element);
				}
			}
		}
	};
	
	$.fn.rup_validate("extend",{
		_init : function(args){
				
			var self=this, 
			settings = $.extend(true,{},$.fn.rup_validate.defaults, presetSettings.defaultPresetSettings, args[0]);
//			settings = $.extend(true, {}, defaultSettings, args[0]);
			
				
			// Anadimos al formulario el class rup_validate para identificarlo como componente formulario.
			self.addClass("rup_validate");
			// Anadimos el ruptype validate
			self.attr("ruptype","validate");
			
			/*
			 * Configuracion del componente de validaciones.
			 */
				
			// En caso de que se deban mostrar los errores mediante la visualizacion predeterminada se configuran los presets correspondientes.
			if (settings.showFieldErrorAsDefault){
				settings = $.extend(true,settings,presetSettings.showFieldErrorAsDefault);
			}
			settings = $.extend(true, {}, settings, args[0]);
			// Se realiza la invocacion al plugin jquery.validate
			self.validate(settings);
			
			if (settings.showFieldErrorAsDefault){
				self.validate().showLabel = function(element, message){
					var label = this.errorsFor( element );
					if ( label.length ) {
						// refresh error/success class
						label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

						// check if we have a generated label, replace the message then
						label.attr("generated") && label.html(message);
					} else {
						// create label
						if (settings.showFieldErrorAsDefault){
							label = $("<" + this.settings.errorElement + "/>")
							.attr({"for":  this.idOrName(element), generated: true})
							.addClass(this.settings.errorClass)
							.attr("title",message || "");
						}else{
							label = $("<" + this.settings.errorElement + "/>")
								.attr({"for":  this.idOrName(element), generated: true})
								.addClass(this.settings.errorClass)
								.html(message || "");
						}
						if ( this.settings.wrapper ) {
							// make sure the element is visible, even in IE
							// actually showing the wrapped element is handled elsewhere
							label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
						}
						if ( !this.labelContainer.append(label).length )
							this.settings.errorPlacement
								? this.settings.errorPlacement(label, $(element) )
								: label.insertAfter(element);
					}
					if ( !message && this.settings.success ) {
						label.text("");
						typeof this.settings.success == "string"
							? label.addClass( this.settings.success )
							: this.settings.success( label );
					}
					this.toShow = this.toShow.add(label);
				};
			}
				
			// Si se ha configurado el componente para que no se realicen validaciones al vuelo de los campos, se eliminan los eventos correspondientes.
			if (!settings.liveCheckingErrors){
				self.unbind("click").unbind("focusin").unbind("focusout").unbind("keyup");
			}
			
			// Se captura el evento invalid-form del plugin subyacente para generar un evento propio
			self.on("invalid-form.rupValidate_formValidationError", function(event){
				self.off("invalid-form.rupValidate_formValidationError");
				self.triggerHandler("rupValidate_formValidationError",[this]);
			});
			
			// Se almacena la configuracion del componente en el objeto dom para poder recuperarla en sucesivas invocaciones a los metodos del componente.
			self.data("settings", settings);
		}
	});
		
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.fn.rup_validate.defaults = {
			ignore:":hidden[ruptype!='autocomplete'][ruptype!='combo']",
			feedbackOptions: {gotoTop: false, fadeSpeed: null, delay: null},
			feedbackErrorConfig:{
				errorMsg:$.rup.i18nParse($.rup.i18n.base,"rup_maint.validateError"),
				getField:function(self, form, fieldName){
					return $("[name='" + fieldName+"']",form);
				},
				getFieldName: function(self, form, field){
			        var ruptype = field.attr("ruptype"), labelForName, labelElem, fieldTmp, labelForName, labelForId;
			        
			        fieldTmp = jQuery(field.length>1?field[0]:field);
			        
			        labelForName = fieldTmp.attr("name");
			        labelForId = fieldTmp.attr("id");
			        
			        if (ruptype!==undefined){
			        	
			        	if(ruptype==="combo"){
			        		labelForId = labelForId+"-button";
			        	}
			        	
			        	if(ruptype==="autocomplete"){
				            labelForId = labelForId+"_label";
				        }
			        }
			        
			        labelElem = fieldTmp.parent().find("label[for='"+labelForName+"']");
			        
			        if (labelElem.length>0){
			            return labelElem.text();
			        }
			        
			        labelElem = fieldTmp.parent().find("label[for='"+labelForId+"']");
			        
			        if (labelElem.length>0){
			            return labelElem.text();
			        }
			        
			        return fieldTmp.attr("title");
			    },
				getFieldErrorLabel: function(self, form, field, errorLabel){
					return $("<li>").append("<b>" + errorLabel + ":</b>");
				},
				getFieldErrorMsg: function(self, form, field, errorMsg){
					/* En caso de utilizar el tratamiento por defecto del componente de jquery.validate, 
					 * no es posible indicarle varios mensajes de error para un campo.
					 * Por ello deberemos concatenar estos mensajes de error en caso de que se de el caso.
					 */
					if ($.isArray(errorMsg)){
						// En caso de que el mensaje de error sea un array de mensajes, se debera de recorrer y concatenar
						var baseUl = $("<ul>");
						for (var i=0;i<errorMsg.length;i++){
							baseUl.append($("<li>").append(errorMsg[i]));
						}
						return baseUl;
					}else{
						return $("<ul>").append($("<li>").append(errorMsg));
					}
				}
			},
			liveCheckingErrors:false,
			showErrorsInFeedback:true,
			showFieldErrorAsDefault:true,
			showFieldErrorsInFeedback:true,
			errorImage:$.rup.STATICS+"/rup/basic-theme/images/exclamation.png"
	};		
	

})(jQuery);