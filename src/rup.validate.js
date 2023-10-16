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
 * Permite al usuario validar los datos introducidos en los campos que se presentan en la aplicación.
 *
 * @summary Componente RUP Validate.
 * @module rup_validate
 * @see El componente está basado en el plugin {@link http://jqueryvalidation.org/|jQuery Validation Plugin}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://jqueryvalidation.org/|aquí}.
 * @example
 * var properties={
 *   rules:{
 *       "campoObligatorio":{required:true},
 *       "dni":{required:true,dni:true}
 *   }
 * };
 * $("#formValidaciones").rup_validate(properties);
 */


(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'jquery-validation', 'jquery-validation/dist/additional-methods'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function (jQuery) {

	global.initRupI18nPromise.then(() => {

        //*********************************************
        // ESPECIFICACÍON DE LOS TIPOS BASE DEL PATRÓN
        //*********************************************

        //*****************************************************************************************************************
        // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
        //*****************************************************************************************************************


        var rup_validate = {};
        $.rup_validate = {};

        //Se configura el arranque de UDA para que alberge el nuevo patrón
        $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_validate', rup_validate));

        // Se configuran los mensajes idiomaticos.
        var messages = {};

        // Es necesario identificar los mensajes parametrizables. Para ello se buscan los fragmentos de tipo {i} para ser tratados por la funcion format del validador.
        var regularExpr = new RegExp('\\{\\d\\}');
        $.each($.rup.i18n.base.rup_validate.messages, function (key, value) {

            if (value.match(regularExpr) !== null) {
                messages[key] = jQuery.validator.format(value);
            } else {
                messages[key] = value;
            }
        });

        // Se configruran los mensajes de las reglas de validacion a partir de los definidos en los ficheros idiomaticos.
        $.extend($.validator.messages, messages);

        /*
         * VALIDACIONES
         */
        //sobreescritura
        //

        //
        jQuery.validator.addMethod('dni', function (value, element) {
            return this.optional(element) || window.euroNif(value);
        });

        function nif(dni) {
            if (dni.length === 9) {
                var numero = dni.substr(0, 8);
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
                .replace(/[0-9.(),;:!?%#$'"_+=/-]*/g, '');
        }

        // Dni
        jQuery.validator.addMethod('dni', function (value, element) {
            return this.optional(element) || nif(value);
        });

        // Numero maximo de palabras
        jQuery.validator.addMethod('maxWords', function (value, element, params) {
            return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length < params;
        });

        // Numero minimo de palabras
        jQuery.validator.addMethod('minWords', function (value, element, params) {
            return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
        });

        // Intervalo de palabras
        jQuery.validator.addMethod('rangeWords', function (value, element, params) {
            return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params[0] && value.match(/bw+b/g).length < params[1];
        });

        // Letras y caracteres de puntuacion
        jQuery.validator.addMethod('letterswithbasicpunc', function (value, element) {
            return this.optional(element) || /^[a-z-.,()'"\s]+$/i.test(value);
        });
        
        // Letras (unicode), tildes y caracteres de puntuación.
        jQuery.validator.addMethod('lettersunicodewithbasicpunc', function (value, element) {
        	return this.optional(element) || /^[\p{L}.,()'"\s]+$/iu.test(value);
        });

        // Letras, numeros, espacios o guiones bajos
        jQuery.validator.addMethod('alphanumeric', function (value, element) {
            return this.optional(element) || /^\w+$/i.test(value);
        });

        // Solo letras
        jQuery.validator.addMethod('lettersonly', function (value, element) {
            return this.optional(element) || /^[a-z]+$/i.test(value);
        });

        // Solo letras (unicode) y tildes.
        jQuery.validator.addMethod('lettersunicodeonly', function (value, element) {
            return this.optional(element) || /^[\p{L}]+$/iu.test(value);
        });

        // Solo letras y permite espacios.
        jQuery.validator.addMethod('letters', function (value, element) {
            return this.optional(element) || /^[a-z\s]+$/i.test(value);
        });

        // Solo letras (unicode), tildes y permite espacios.
        jQuery.validator.addMethod('lettersunicode', function (value, element) {
            return this.optional(element) || /^[\p{L}\s]+$/iu.test(value);
        });

        // Espacios no permitidos
        jQuery.validator.addMethod('nowhitespace', function (value, element) {
            return this.optional(element) || /^\S+$/i.test(value);
        });

        // Entero positivo o negativo
        jQuery.validator.addMethod('integer', function (value, element) {
            return this.optional(element) || /^-?\d+$/.test(value);
        });

        // Patron
        jQuery.validator.addMethod('pattern', function (value, element, param) {
            return this.optional(element) || param.test(value);
        });

        // Validacion de campo numerico. Tiene en cuenta el formato dependiendo de la locale
        jQuery.validator.addMethod('number', function (value, element) {
            var expr = new RegExp($.rup.i18n.base.rup_validate.regexp.decimal);
            return this.optional(element) || expr.test(value);
        });

        // Validacion de fecha. Tiene en cuanta el formato dependiendo de la locale
        jQuery.validator.addMethod('date', function (value, element, param) {
            var format;
            if (typeof param === 'boolean') {
                if (param === true) {
                    format = $.rup.i18n.base.rup_validate.format.date;
                } else {
                    return true;
                }
            } else {
                format = param;
            }

            return this.optional(element) || $.rup_validate.checkDate(format, value);
        });

        // Validacion email.De acuerdo a la oficial RFC 5322 http://www.ietf.org/rfc/rfc5322.txt
        jQuery.validator.addMethod('email', function (value, element) {
            var expr = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return this.optional(element) || expr.test(value);
        });


        //********************************
        // DEFINICIÓN DE MÉTODOS PÚBLICOS
        //********************************

        $.extend($.rup_validate, {
            // Metodo que valida una fecha de acuerdo al formato indicado
            checkDate: function (format, date) {
                var daysInFebruary = function (year) {
                        return (((year % 4 === 0) && (year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28);
                    },
                    DaysArray = function (n) {
                        var rdo = [];
                        for (var i = 1; i <= n; i++) {
                            rdo[i] = 31;
                            if (i == 4 || i == 6 || i == 9 || i == 11) {
                                rdo[i] = 30;
                            }
                            if (i == 2) {
                                rdo[i] = 29;
                            }
                        }
                        return rdo;
                    };

                var tsp = {},
                    sep;
                format = format.toLowerCase();
                // Se busca el separador de fecha entre los caracteres "/","-","."
                if (format.indexOf('/') != -1) {
                    sep = '/';
                } else if (format.indexOf('-') != -1) {
                    sep = '-';
                } else if (format.indexOf('.') != -1) {
                    sep = '.';
                } else {
                    sep = '/';
                }
                format = format.split(sep);
                date = date.split(sep);
                if (date.length != 3) {
                    return false;
                }
                var j = -1,
                    yln, dln = -1,
                    mln = -1;
                for (var i = 0; i < format.length; i++) {
                    var dv = (date[i] === null || date[i] === '' || isNaN(date[i])) ? 0 : parseInt(date[i], 10);
                    tsp[format[i]] = dv;
                    yln = format[i];
                    if (yln.indexOf('y') != -1) {
                        j = i;
                    }
                    if (yln.indexOf('m') != -1) {
                        mln = i;
                    }
                    if (yln.indexOf('d') != -1) {
                        dln = i;
                    }
                }
                if (format[j] == 'y' || format[j] == 'yyyy') {
                    yln = 4;
                } else if (format[j] == 'yy') {
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
                    if (yln == 2 && strDate.length == 1) {
                        yln = 1;
                    }
                    if (strDate.length != yln || (tsp[format[j]] === 0 && date[j] != '00')) {
                        return false;
                    }
                }
                if (mln === -1) {
                    return false;
                } else {
                    strDate = tsp[format[mln]].toString();
                    if (strDate.length < 1 || tsp[format[mln]] < 1 || tsp[format[mln]] > 12) {
                        return false;
                    }
                }
                if (dln === -1) {
                    return false;
                } else {
                    strDate = tsp[format[dln]].toString();
                    if (strDate.length < 1 || tsp[format[dln]] < 1 || tsp[format[dln]] > 31 || (tsp[format[mln]] == 2 && tsp[format[dln]] > daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]) {
                        return false;
                    }
                }
                return true;
            }
        });

        $.fn.rup_validate('extend', {
            /**
             * Se eliminan todos los objetos y eventos credos por el componente.
             *
             * @function destroy
             * @example
             * $("#formValidaciones").rup_validate("destroy");
             */
            destroy: function () {
                var self = this;

                // Se eliminan los mensajes de error.
                self.rup_validate('resetForm');
                // Se elimina la informacion almacenada en el objeto.
                $.removeData(self[0]);
                // Se eliminan los eventos asociados al objeto.
                self.off();
            },
            /**
             * Se realiza un reset del formulario y se eliminan los mensajes de error de las reglas de validacion.
             *
             * @function resetForm
             * @example
             * $("#formValidaciones").rup_validate("resetForm");
             */
            resetForm: function () {
            	const self = this,
                	settings = self.data('settings'),
                    combos = $('[ruptype=\'combo\']', self);

                // En caso de mostrarse el feedback de error se oculta.
                if (settings != null && settings.feedback !== undefined && settings.showErrorsInFeedback) {
                	settings.feedback.rup_feedback('hide');
                }
                
                // Limpiar los combos por completo. Es importante hacerlo antes de la llamada a "resetForm" porque si no la limpieza de los labels no es llevada a cabo.
                if (combos.length > 0) {
                	combos.rup_combo('clear');
                }

                // Se reinician los mensajes de error.
                self.validate().resetForm();
            },
            /**
             * Se eliminan los menssajes de error de las reglas de validacion.
             *
             * @function resetForm
             * @example
             * $("#formValidaciones").rup_validate("resetElements");
             */
            resetElements: function () {
                var self = this,
                    validator = self.validate();

                validator.resetElements(validator.elements());
            }
        });
        
        // Corrección para el establecimiento del foco tras las validaciones del combo y autocomplete.
        $.extend($.validator.prototype, {
        	focusInvalid: function focusInvalid() {
        		if (this.settings.focusInvalid) {
        			try {
        				let $element = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []);

        				if ($element.attr('rupType') === 'combo') {
        					$element = $('#' + $element.attr('id') + '-button');
        				} else if ($element.attr('rupType') === 'autocomplete') {
        					$element = $('#' + $element.attr('id') + '_label');
        				}
        				// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
        				$element.filter(":visible").focus().trigger("focusin");
        			} catch (e) {
        				// Ignore IE throwing errors when focusing hidden elements
        			}
        		}
        	}
        });

        //********************************
        // DEFINICIÓN DE MÉTODOS PRIVADOS
        //********************************
        $.fn.rup_validate('extend', {});


        //*****************************
        // INICIALIZACION DE VARIABLES
        //*****************************

        // Propiedades de configuracion predeterminadas para cada una de las posibles parametrizaciones de los errores.
        var presetSettings = {
            // Configruacion del componente por defecto
            defaultPresetSettings: {
                showErrors: function (errors) {
                    var self = this,
                        errorText, feedback, field, errorKey, fieldError, fieldErrorMsg, error, label;

                    // Se comprueba si el parametro que contiene los errores está vacío. En este caso se
                    if (self.currentElements.length === 1) {
                        if ($.isEmptyObject(errors)) {
                            delete self.invalid[self.currentElements.attr('name')];
                        }
                    }

                    /*
                     * Mostrar mensaje de error de validaciones en el feedback
                     */
                    feedback = self.settings.feedback;
                    if (self.settings.showErrorsInFeedback && feedback !== undefined && feedback !== null) {
                        errorText = $('<ul>').addClass('rup-maint_feedbackUL').prepend(self.settings.feedbackErrorConfig.errorMsg);

                        if (jQuery.isEmptyObject(self.invalid)) {
                            feedback.rup_feedback('close');
                        } else {

                            if (self.settings.showFieldErrorsInFeedback) {
                                $.each((!jQuery.isEmptyObject(self.submitted) ? self.submitted : self.invalid), function (key, value) {

                                    if (self.invalid[key] !== undefined) {
                                        field = self.settings.feedbackErrorConfig.getField(self, self.currentForm, key);
                                        errorKey = self.settings.feedbackErrorConfig.getFieldName(self, self.currentForm, field);
                                        fieldError = self.settings.feedbackErrorConfig.getFieldErrorLabel(self, self.currentForm, field, errorKey);

                                        fieldErrorMsg = self.settings.feedbackErrorConfig.getFieldErrorMsg(self, self.currentForm, field, value);
                                        fieldError.append(fieldErrorMsg);
                                        errorText.append(fieldError);
                                    }

                                });
                            }
                            feedback.rup_feedback('option', self.settings.feedbackOptions);
                            feedback.rup_feedback('set', errorText, 'error');
                        }
                    }

                    /*
                     * Mostrar detalle de errores en el feedback
                     */
                    if (self.settings.showFieldErrorAsDefault) {
                        for (var i = 0; self.errorList[i]; i++) {

                            error = self.errorList[i];

                            if (error.element !== undefined) {

                                label = self.errorsFor(error.element);
                                if (label.length) {
                                    label.remove();
                                }
                            }
                        }
                    }

                    /* En caso de utilizar el tratamiento por defecto del componente de jquery.validate,
                     * no es posible indicarle varios mensajes de error para un campo.
                     * Por ello deberemos concatenar estos mensajes de error en caso de que se de el caso.
                     */
                    for (let i = 0; i < self.errorList.length; i++) {
                        if (self.errorList[i].element === undefined) {
                        	$.rup.errorGestor(
                        			$.rup.i18nParse($.rup.i18n.base, 'rup_validate.messages.fieldError'),
                        			$.rup.i18nParse($.rup.i18n.base, 'rup_validate.messages.validationErrorTitle'));
                        }
                        if (Array.isArray(self.errorList[i].message)) {
                            // En caso de que el mensaje de error sea un array de mensajes, se debera de recorrer y concatenar
                            var newMessage = '';
                            for (var j = 0; j < self.errorList[i].message.length; j++) {
                                newMessage += self.errorList[i].message[j];
                                if (j !== self.errorList[i].message.length - 1) {
                                    newMessage += ', ';
                                }
                            }
                            self.errorList[i].message = newMessage;
                        }
                    }
                   
                    //Se eliminan los iconos duplicados
                    var elements = self.currentForm.getElementsByClassName('rup-validate-error-icon');
                    while (elements !== undefined && elements.length > 0) {
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                    // Se invoca al metodo por defecto del plugin subyacente
                    self.defaultShowErrors();
                },
                showErrorsInFeedback: function () {
                },
                errorPlacement: function (label, element) {

                    if (element.attr('ruptype') === 'combo') {
                        var comboElem = $('#' + element.attr('id') + '-button');
                        if (comboElem) {
                            label.insertAfter(comboElem);
                        }
                    } else {
                        label.insertAfter(element);
                    }
                }
            },
            // Configuracion de las propiedades a aplicar en caso de que se deban mostrar los errores mediante la visualizacion por defecto.
            showFieldErrorAsDefault: {
                errorElement: 'img',
                errorPlacement: function (error, element) {
                    var errorElem = error.attr('src', this.errorImage).addClass('rup-maint_validateIcon').html('').rup_tooltip({
                        'applyToPortal': true
                    });

                    if (element.attr('ruptype') === 'combo') {
                        var comboElem = $('#' + element.attr('id') + '-button');
                        if (comboElem) {
                            errorElem.insertAfter(comboElem);
                        }
                    } else {
                        errorElem.insertAfter(element);
                    }
                }
            }
        };

        $.fn.rup_validate('extend', {
            _init: function (args) {

                var self = this,
                    settingsAdapter,
                    defaultPresetSettings,
                    settings;

                settingsAdapter = $.extend(true, {}, {
                    adapter: $.fn.rup_validate.defaults.adapter
                }, {
                    adapter: presetSettings.defaultPresetSettings.adapter
                }, {
                    adapter: args[0].adapter
                });
                self[0]._ADAPTER = $.rup.adapter[settingsAdapter.adapter];

                defaultPresetSettings = $.extend(true, {}, presetSettings.defaultPresetSettings, {
                    showFieldErrorAsDefault: {
                        highlight: self[0]._ADAPTER.highlight,
                        unhighlight: self[0]._ADAPTER.unhighlight,
                        errorElement: self[0]._ADAPTER.errorElement,
                        errorPlacement: self[0]._ADAPTER.errorPlacement
                    }
                });
                // settings = $.extend(true,{},$.fn.rup_validate.defaults, presetSettings.defaultPresetSettings, args[0]);

                settings = $.extend(true, {}, $.fn.rup_validate.defaults, defaultPresetSettings, args[0]);

                // settings = $.extend(true, {}, defaultSettings, args[0]);


                // Anadimos al formulario el class rup_validate para identificarlo como componente formulario.
                self.addClass('rup_validate');
                // Anadimos el ruptype validate
                self.attr('ruptype', 'validate');

                /*
                 * Configuracion del componente de validaciones.
                 */




                // En caso de que se deban mostrar los errores mediante la visualizacion predeterminada se configuran los presets correspondientes.
                if (settings.showFieldErrorAsDefault) {
                    settings = $.extend(true, settings, defaultPresetSettings.showFieldErrorAsDefault);
                }
                settings = $.extend(true, {}, settings, args[0]);
                if (settings.onSubmitHandler !== undefined) {
                    settings.submitHandler = settings.onSubmitHandler;
                }
                // Se realiza la invocacion al plugin jquery.validate
                self.validate(settings);

                if (settings.showFieldErrorAsDefault) {
                    self.validate().showLabel = self[0]._ADAPTER.showLabel;
                }

                // Si se ha configurado el componente para que no se realicen validaciones al vuelo de los campos, se eliminan los eventos correspondientes.
                if (!settings.liveCheckingErrors) {
                    self.off('click').off('focusin').off('focusout').off('keyup');
                }

                // Se captura el evento invalid-form del plugin subyacente para generar un evento propio
                self.on('invalid-form.rupValidate_formValidationError', function () {
                    self.off('invalid-form.rupValidate_formValidationError');
                    self.triggerHandler('rupValidate_formValidationError', [this]);
                });

                // Se almacena la configuracion del componente en el objeto dom para poder recuperarla en sucesivas invocaciones a los metodos del componente.
                self.data('settings', settings);

                //Se audita el componente
                $.rup.auditComponent('rup_validate', 'init');
                self.trigger('load');
            }
        });

        //*******************************************************
        // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
        //*******************************************************

        $.fn.rup_validate.defaults = {
            adapter: 'validate_material',
            ignore: ':hidden[ruptype!=\'autocomplete\'][ruptype!=\'combo\']',
            feedbackOptions: {
                gotoTop: false,
                fadeSpeed: null,
                delay: null
            },
            feedbackErrorConfig: {
                errorMsg: $.rup.i18nParse($.rup.i18n.base, 'rup_jqtable.validateError'),
                getField: function (self, form, fieldName) {
                    return $('[name=\'' + fieldName + '\']', form);
                },
                getFieldName: function (self, form, field) {
                    var fieldTmp, labelAttributes, labelElem;

                    fieldTmp = jQuery(field.length > 1 ? field[0] : field);

                    labelAttributes = {
                        labelForId: fieldTmp.attr('id'),
                        labelForName: fieldTmp.attr('name'),
                        labelForTitle: fieldTmp.attr('oldtitle')
                    };

                    labelElem = $.rup.adapter[$.fn.rup_validate.defaults.adapter];

                    if ($.fn.rup_validate.defaults.adapter === 'validate_bootstrap' || 'validate_material') {
                        labelElem = labelElem.forLabelElement(form, labelAttributes);
                    } else {
                        if (labelAttributes.labelForTitle === undefined || labelAttributes.labelForTitle === '') {
                            labelElem = labelElem.forLabelElement(form, labelAttributes);
                        } else {
                            return labelElem.forLabelElement(fieldTmp, labelAttributes);
                        }
                    }

                    if (labelElem !== undefined && labelElem !== '') {
                        return labelElem.replace(':', '');
                    } else {
                        labelElem = $.rup.adapter[$.fn.rup_validate.defaults.adapter].forInputIdElement(form, labelAttributes);

                        if (labelElem !== undefined && labelElem !== '') {
                            return labelElem.id;
                        }

                        labelElem = $.rup.adapter[$.fn.rup_validate.defaults.adapter].forInputNameElement(form, labelAttributes);

                        if (labelElem !== undefined && labelElem !== '') {
                            return labelElem.name;
                        }
                    }

                    return fieldTmp.attr('title');
                },
                getFieldErrorLabel: function (self, form, field, errorLabel) {
                    return $('<li>').append('<b>' + errorLabel + ':</b>');
                },
                getFieldErrorMsg: function (self, form, field, errorMsg) {
                    /* En caso de utilizar el tratamiento por defecto del componente de jquery.validate,
                     * no es posible indicarle varios mensajes de error para un campo.
                     * Por ello deberemos concatenar estos mensajes de error en caso de que se de el caso.
                     */
                    if (Array.isArray(errorMsg)) {
                        // En caso de que el mensaje de error sea un array de mensajes, se debera de recorrer y concatenar
                        var baseUl = $('<ul>');
                        for (var i = 0; i < errorMsg.length; i++) {
                            baseUl.append($('<li>').append(errorMsg[i]));
                        }
                        return baseUl;
                    } else {
                        return $('<ul>').append($('<li>').append(errorMsg));
                    }
                }
            },
            liveCheckingErrors: false,
            showErrorsInFeedback: true,
            showFieldErrorAsDefault: true,
            showFieldErrorsInFeedback: true,
            errorImage: $.rup.STATICS + '/rup/css/images/exclamation.png'
        };


        /**
		  * Función de callback que se ejecutará cuando el formulario sea válido.
		  *
		  * @callback module:rup_validate~onSubmitHandler
		  * @param {Element} form - Referencia al objeto DOM del formulario que está siendo validado.
		  * @example <caption>Envia el formulario cuando este es válido.</caption>
		  * $("#idFormulario").rup_tooltip({
		  *   onSubmitHandler: function(form){
		  *       $(form).ajaxSubmit();
		  *   }
		  * });
		  * @example <caption>Realizar otras operaciones cuando el formulario es válido.</caption>
		  * $("#idFormulario").rup_tooltip({
		  *   onSubmitHandler: function(form){
		          // Operaciones extra
		  *       $(form).ajaxSubmit();
		  *   }
		  * });
		  */

        /**
         * Función que se ejecutará cuando el formulario presente errores de validación.
         *
         * @callback module:rup_validate~onInvalidHandler
         * @param {Event} event - Objeto event asociado al evento lanzado.
         * @param {object} validator - Instancia del validador asociada al formulario actual.
         * @example
         * $(".selector").validate({
         *   invalidHandler: function(event, validator) {
         *    // 'this' refers to the form
         *    var errors = validator.numberOfInvalids();
         *    if (errors) {
         *      var message = errors == 1
         *        ? 'You missed 1 field. It has been highlighted'
         *        : 'You missed ' + errors + ' fields. They have been highlighted';
         *      $("div.error span").html(message);
         *      $("div.error").show();
         *    } else {
         *      $("div.error").hide();
         *    }
         *  }
         * });
         */

        /**
         * Función que se ejecutará cuando se produzca la validación de los datos permitiendo personalizar los errores de validación.
         *
         * @callback module:rup_validate~onShowErrors
         * @param {Object} errorMap - Pares de clave/valor, donde el key se corresponde con el name del campo del formulario y el value con el mensaje que se va a mostrar para ese campo.
         * @param {Object[]} errorList - Array de objetos correspondientes a los campos validados.
         * @param {String} errorList.message - Mensaje que va mostrarse para ese campo.
         * @param {Element} errorList.element - Objeto del DOM correspondiente a ese campo.
         * @example
         * $(".selector").validate({
         *  showErrors: function(errorMap, errorList) {
         *    $("#summary").html("Your form contains "
         *      + this.numberOfInvalids()
         *      + " errors, see details below.");
         *    this.defaultShowErrors();
         *  }
         * });
         */

        /**
         * Función de callback que permite personalizar el lugar en el que se posicionarán los mensajes de error.
         *
         * @callback module:rup_validate~onErrorPlacement
         * @param {jQuery} error - Referencia al objeto label que va a ser insertado en el DOM para visualizar los errores.
         * @param {jQuery} element - Referencia al campo validado.
         * @example
         * $("#myform").validate({
         *   errorPlacement: function(error, element) {
         *       error.appendTo( element.parent("td").next("td") );
         *   }
         * });
         */

        /**
         * Función de callback para determinar como se debe resaltar los campos inválidos.
         *
         * @callback module:rup_validate~onHighlight
         * @param {jQuery} element - Referencia al campo validado.
         * @param {String} errorClass - Valor actual del parámetro errorClass.
         * @param {String} validClass - Valor actual del parámetro validClass.
         * @example
         * $(".selector").validate({
         *   highlight: function(element, errorClass, validClass) {
         *        $(element).fadeOut(function() {
         *            $(element).fadeIn();
         *        });
         *   }
         * });
         */

        /**
         * Función de callback para determinar como se debe resaltar los campos inválidos.
         *
         * @callback module:rup_validate~onUnhighlight
         * @param {jQuery} element - Referencia al campo validado.
         * @param {String} errorClass - Valor actual del parámetro errorClass.
         * @param {String} validClass - Valor actual del parámetro validClass.
         * @example
         * $(".selector").validate({
         *  highlight: function(element, errorClass, validClass) {
         *    $(element).addClass(errorClass).removeClass(validClass);
         *    $(element.form).find("label[for=" + element.id + "]")
         *      .addClass(errorClass);
         *  },
         *  unhighlight: function(element, errorClass, validClass) {
         *    $(element).removeClass(errorClass).addClass(validClass);
         *    $(element.form).find("label[for=" + element.id + "]")
         *      .removeClass(errorClass);
         *  }
         * });
         */


        /**
         * @description Propiedades de configuración del componente.
         * @see Para mas información consulte la documentación acerca de las opciones de configuración del plugin {@link http://jqueryvalidation.org/validate/|jQuery Validation Plugin}.
         *
         * @name options
         * @property {boolean} [debug=false] - Activa el modo debug. En caso de estar activado el formulario no se envía el formulario y los errores de ejecución que se hayan producido se visualizan en la consola. Requiere Firebug o Firebug lite.
         * @property {module:rup_validate~onSubmitHandler} [submitHandler] - Método callback utilizado para capturar el evento submit cuando el formulario es válido. Reemplaza el submit por defecto. Es el método utilizado para realizar un submit mediante AJAX después de ser validado.
         * @property {module:rup_validate~onInvalidHandler} [invalidHandler] - Método callback que se ejecuta cuando un formulario presenta errores de validación.
         * @property {Selector} [ignore] - Selector jQuery que identifica los elementos del formulario que van a ser ignorados al realizarse las validaciones.
         * @property {object} [messages] - Utilizado para indicar mensajes propios para las validaciones. Estos se especifican mediante pares de clave/valor. La clave es el nombre del elemento mientras que el valor es el texto que se ha de mostrar en caso de producirse un error en la validación.
         * @property {object} [groups] - Se utiliza para realizar agrupamientos de mensajes de error.
         * @property {boolean} [onsubmit=true] - Determina si se valida el formulario al realizarse el submit. Marcar como false para realizar las validaciones mediante el resto de eventos.
         * @property {boolean} [ofocusout=true] - Determina si se realiza la validación de los campos (excepto los checkbox y radio) al lanzarse los eventos blur. Estas validaciones se realizan únicamente una vez que un campo ha sido marcado como inválido.
         * @property {boolean} [okeyup=true] - Determina si se realiza la validación de los campos (excepto los checkbox y radio) al lanzarse los eventos keyup. Las validaciones se realizan únicamente una vez que un campo ha sido marcado como inválido.
         * @property {boolean} [onclick=true] - Determina si se realizan las validaciones de los checkbox y radio al realizar un click sobre los mismos.
         * @property {boolean} [focusInvalid=true] - Posiciona el foco en el último campo activo o en el primer campo inválido la realizarse la validación de los campos. En caso de encontrarse el foco en un campo al realizarse la validación se mantiene en dicho campo. En caso de no encontrarse el foco en un campo, se posicionará en el primer campo inválido existente.
         * @property {boolean} [focusCleanup=false] - En caso de activarse, elimina el errorClass correspondiente y oculta los mensajes de error de los campos que reciben el foco. Evitar utilizar esta propiedad en conjunción con focusInvalid.
         * @property {Selector} [meta] - En caso de utilizar metainformación en los campos que sea utilizada por otros plugins, es posible indicar un identificador para envolver la metadata correspondiente al el componente validate dentro de un objeto propio.
         * @property {String} [errorClass=error] - Determina el nombre del class que va a aplicarse a los campos que presenten errores de validación.
         * @property {String} [validClass=valid] - Determina el nombre del class que va a aplicarse a los campos que han sido validados y no presenten errores.
         * @property {String} [errorElement=label] - Determina el tipo del elemento que va a utilizarse para generar los mensajes de error.
         * @property {String} [wrapper=window] - Recubre los mensajes de error con el elemento especificado. Util en conjunción la propiedad errorLabelContainer para crear listado de errores.
         * @property {Selector} [errorLabelContainer] - Determina el objeto contenedor en el que se van a mostrar los mensajes de error.
         * @property {Selector} [errorContainer] - Determina un contenedor adicional para los mensajes de error.
         * @property {boolean} [ignoreTitle=false] - Determina si se evita el obtener los mensajes a partir del atributo title.
         * @property {module:rup_validate~onShowErrors} [showErrors] - Función callback para realizar un tratamiento  personalizado de los errores de validación.
         * @property {module:rup_validate~onErrorPlacement} [errorPlacement] - Función de callback que permite personalizar el lugar en el que se posicionarán los mensajes de error.
         * @property {module:rup_validate~onHighlight} [highlight] - Función de callback para determinar como se debe resaltar los campos inválidos.
         * @property {module:rup_validate~onUnhighlight} [unhighlight] - Función de callback para restaurar los cambios realizados por la función indicada en la propiedad highlight.
         */


        /* **********/
        /* EVENTOS */
        /* **********/

        /**
         * Este evento es lanzado cuando se produce alguna violación entre las reglas de validación especificadas para ser aplicadas sobre los campos del formulario.
         *
         * @event module:rup_validate#rupValidate_formValidationError
         * @property {Event} e - Objeto Event correspondiente al evento disparado.
         * @example
         * $("#idFormulario").on("rupValidate_formValidationError", function(event){
         * });
         */

    }).catch((error) => {
        console.error('Error al inicializar el componente:\n', error);
    });

}));
