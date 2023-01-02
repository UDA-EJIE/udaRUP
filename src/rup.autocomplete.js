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
 * Permite al usuario recuperar un elemento de una gran lista de elementos o de varias listas dependientes de forma sencilla y ocupando poco espacio en la interfaz.
 *
 * @summary Componente RUP Autocomplete.
 * @module rup_autocomplete
 * @see El componente está basado en el plugin {@link https://jqueryui.com/autocomplete/|jQuery UI Autocomplete}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://api.jqueryui.com/autocomplete/|aquí}.
 * @example
 * $("#idAutocomplete").rup_autocomplete({
 *	source : "autocomplete/remote",
 *	sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code"}
 * });
 */

/*global define */
/*global jQuery */
/*global $ */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', './rup.base','./rup.tooltip','./rup.button'], factory);

	} else {

		// Browser globals
		factory(jQuery);
	}
}(function (jQuery) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	var rup_autocomplete = {};

	$.extend($.ui.autocomplete.prototype, {
		_renderMenu: function (ul, items) {
			var settings = this.options;

			if (settings.category) {
				//categorización de los resultados
				var that = this,
					currentCategory = '';
				$.each(items, function (index, item) {
					var li;
					if (item.category != currentCategory) {
						ul.append('<li class=\'ui-autocomplete-category\'>' + item.category + '</li>');
						currentCategory = item.category;
					}
					li = that._renderItemData(ul, item);
					if (item.category) {
						li.attr('aria-label', item.category + ' : ' + item.label);
					}
				});
			} else {
				var self = this;
				$.each(items, function (index, item) {
					self._renderItemData(ul, item);
				});
			}
		},
		_renderItem: function (ul, item) {

			// Replace the matched text with a custom span. This
			// span uses the class found in the "highlightClass" option.
			var re = new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(this.term) + ')(?![^<>]*>)(?![^&;]+;)', 'gi'),
				cls = 'matched-text',
				template = '<span class=\'' + cls + '\'>$1</span>',
				label = item.label.replace(re, template),
				$li = $('<li></li>').appendTo(ul);

			// Create and return the custom menu item content.
			$('<a></a>').attr('href', '#')
				.html(label)
				.appendTo($li);
			var settings = this.options;
			$li.find('a').mousedown(function(event){
				var ui = {item:{label:item.label,value:item.value}};
			    settings.select(event,ui);
			 });
			return $li;

		}
	});

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_autocomplete', rup_autocomplete));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_autocomplete('extend', {
		/**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado
        por el resto de componentes RUP para estandarizar la obtención del valor del Autocomplete.
         *
         * @function getRupValue
         * @return {string | number} - Devuelve el valor actual del componente seleccionado por el usuario.
         * @example
         * $("#idAutocomplete").rup_autocomplete("getRupValue");
         */
		getRupValue: function () {
			return $(this).val();
		},
		/**
     * Método utilizado para asignar el valor al componente. Este método es el utilizado por
el resto de componentes RUP para estandarizar la asignación del valor al Autocomplete.
     *
     * @function setRupValue
     * @param {string | number} param - Valor que se va a asignar al componente.
     * @example
     * $("#idAutocomplete").rup_autocomplete("setRupValue", "Si");
     */
		setRupValue: function (value) {
			var $self = this,
				data = $self.data('rup.autocomplete'),
				loadObjects, newObject = {};
			
			if ($self[0] != undefined) {
				let id = $self[0].id;
	
				if (data) {
	
					// Comprobamos si tiene la referencia al campo hidden
					if (data.$hiddenField) {
						data.$hiddenField.attr({ rup_autocomplete_label: value, value: value });
	
						loadObjects = $self.data('loadObjects');
						newObject[value] = data.$hiddenField.val();
						$self.data('loadObjects', jQuery.extend(true, {}, loadObjects, newObject));
						let labelFound = '';
						let loadObjectsLabels = $('#' + data.$hiddenField.attr('id')).data('rup.autocomplete').$labelField.data('loadObjectsLabels');
						$.each(loadObjectsLabels, function (label, key) {
							if(key !== undefined){
								if(value === value){
									labelFound = label;
									return;
								}
							}
		                });
						if(labelFound !== ''){
							$('#' + id + '_label').val(labelFound);
						}
					}
	
					if (data.$labelField) {
						loadObjects = data.$labelField.data('loadObjects');
						newObject[$self.attr('rup_autocomplete_label')] = value;
						data.$labelField.data('loadObjects', jQuery.extend(true, {}, loadObjects, newObject));
						let loadObjectsLabels = data.$labelField.data('loadObjectsLabels');
						let labelFound = '';
						$.each(loadObjectsLabels, function (label, key) {
							if(key !== undefined){
								if(value === key){
									labelFound = label;
									return;
								}
							}
		                });
						let settings = data.$labelField.data('settings');
						if(labelFound !== ''){
							$('#' + id + '_label').val(labelFound);
						}else if(settings.showDefault){
							$('#' + id + '_label').val(value);
						}
					}
				}
	
				$(this).val(value);
				
				if (id.includes('_label')) {
					if (value == "") {
						$('#' + id.substring(0, id.lastIndexOf('_label'))).val(value);
					}
					$self.triggerHandler('rupAutocomplete_change');
				} else {
					if (value == "") {
						$('#' + id + '_label').val(value);
					}
					$('#' + id + '_label').triggerHandler('rupAutocomplete_change');
				}
			}
		},
		/**
         * Elimina el autocomplete.
         *
         * @function destroy
         * @example
         * $("#idAutocomplete").rup_autocomplete("destroy");
         */
		destroy: function () {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}

			self.autocomplete('destroy');
		},
		/**
         * Deshabilita el autocomplete (solo la parte de sugerencias, el input sigue habilitado).
         *
         * @function off
         * @example
         * $("#idAutocomplete").rup_autocomplete("off");
         */
		off: function () {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}

			self.storeEvents();
		},
		/**
         * Habilita el autocomplete (solo la parte de sugerencias).
         *
         * @function on
         * @example
         * $("#idAutocomplete").rup_autocomplete("on");
         */
		on: function () {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}
            self.restoreEvents();
		},
		/**
         * Deshabilita el autocomplete. Internamente invoca al método {@link module:rup_autocomplete~off}.
         *
         * @function disable
         * @example
         * $("#idAutocomplete").rup_autocomplete("disable");
         */
		disable: function () {
			var self, settings;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}

			settings = self.data('settings');

			if (settings.combobox) {
				settings.$comboboxToogle.button('disable');
			}

			self.attr('disabled', 'disabled');
		},
		/**
         * Habilita el autocomplete. Internamente invoca al método {@link module:rup_autocomplete~on}.
         *
         * @function enable
         * @example
         * $("#idAutocomplete").rup_autocomplete("enable");
         */
		enable: function () {
			var self, settings;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}

			settings = self.data('settings');

			if (settings.combobox) {
				settings.$comboboxToogle.button('enable');
			}

			self.removeAttr('disabled');
		},
		/**
         * Permite consultar y modificar la configuración del componente.
         *
         * @param {string | object} optionName - Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades.
         * @param {*} [value] - Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro.
         * @param {*} aux - Parámetro extra de confirguración para la propiedad "source".
         * @function option
         * @example
         * // Establecer una propiedad
         * $("#idAutocomplete").rup_autocomplete("option", "minLegth", 2);
         * // Establecer varias propiedad
         * $("#idAutocomplete").rup_autocomplete("option", {minLegth:2, delay:1000});
         */
		option: function (optionName, value, aux) {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}

			var settings = self.data('settings');
			if (optionName === 'source') {
				if (typeof value === 'object') {
					//LOCAL
					if (aux !== undefined) {
						settings.i18nId = aux;
					} else {
						settings.i18nId = settings.id;
					}
					self.autocomplete('option', optionName, this._sourceLOCAL);
					self.autocomplete('option', 'minLength', settings.minLength !== undefined ? settings.minLength : 0);
				} else {
					if (aux !== undefined) {
						if (optionName == 'data') {
							self.autocomplete('option', 'data', aux);
						} else {
							//REMOTO
							settings.sourceParam = aux;
							//Nos aseguramos que el número mínimo de teclas para búsquedas sea 3
							self.autocomplete('option', optionName, this._sourceREMOTE);
							self.autocomplete('option', 'minLength', settings.minLength > 3 ? settings.minLength : 3);
						}
					} else {
						return undefined;
					}
				}
				settings.data = value;
				self.data('settings', settings);
			}else if ( optionName === 'combobox' ) {
				let spanParent = self.parent();
				if (value === true) {
					if (!spanParent.hasClass('rup-combobox')) {
						self.addClass('rup-combobox-input ui-corner-left');
						var wasOpen = false;
						self.wrap(jQuery('<span>').addClass('rup-combobox'));
						var $wrapper = self.parent();
						var $button = $('<a>').attr('tabIndex', -1).attr('title', $.rup.i18n.base.rup_autocomplete.showAllItems)
						.rup_tooltip().rup_button({icons: {primary: 'ui-icon-triangle-1-s'}, text: false })
						.removeClass('ui-corner-all').addClass('rup-combobox-toggle ui-corner-right')
						.mousedown(function () {wasOpen = self.autocomplete('widget').is(':visible');})
								.click(function () {
								self.focus();
								if (wasOpen) {
									return true;
								}
								self.autocomplete('search', '');
							});

						$button.appendTo($wrapper);
						settings.$comboboxToogle = $button;
						self.rup_autocomplete('option','minLength', 0);
					}
				}else{
					if (spanParent.hasClass('rup-combobox')) {
						self.removeClass('rup-combobox-input ui-corner-left');
						self.addClass('ui-autocomplete-input');
						self.insertBefore(spanParent);
						spanParent.remove();
					}
				}
			}else if ( optionName === 'contains' ) {
				if (value === true) {
					self.data('settings').contains = true;
				} else {
					self.data('settings').contains = false;
				}
			} else {
				settings[optionName] = value;
				self.data('settings', settings);
				self.autocomplete('option', optionName, value);
			}
		},
		/**
     * Lanza una búsqueda en el autocomplete con el parámetro indicado y el foco va a parar al
input.
     *
     * @param {string} term - Cadena de texto utilizada para realizar la búsqueda.
     * @function search
     * @example
     * $("#idAutocomplete").rup_autocomplete("search", "java");
     */
		search: function (term) {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0 ) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
				//Si esta inicializado con una busqueda por defecto
				if (self.length === 0) {
					self = $(this);
				}
			}

			//Si tiene eventos (no está deshabilitado) se hace búsqueda	
			if ($._data(self[0], 'events') !== undefined) {
				self.focus();
				self.val(term);
				self.autocomplete('search', term);
			}
		},
		/**
         * Oculta el autocomplete.
         *
         * @function close
         * @example
         * $("#idAutocomplete").rup_autocomplete("close");
         */
		close: function () {
			var self;

			if ($(this).attr('id').indexOf('_label') >= 0 ) {
				self = $(this);
			} else {
				self = $('#' + $(this).attr('id') + '_label');
			}
			self.autocomplete('close');
		},
		/**
         * Devuelve el valor del autocomplete. Este es el valor que se guarda en el campo oculto antes descrito al final del apartado 7.Para obtener la descripción (dato que se muestra en el input) se invocará a la función estándar de jQuery.
         *
         * @function val
         * @example
         * // Recuperar el valor
         * $("#idAutocomplete").rup_autocomplete("val");
         * // Recuperar la descripción
         * $("#idAutocomplete").val();
         */
		val: function () {
			return $('#' + $(this).attr('id')).val();
		},
		/**
         * Método utilizado para asignar el valor y el literal al componente. El valor se almacena en el campo hidden creado por el componente. El contenido indicado en la propiedad label se mostrará en el campo input del componente.
         *
         * @function set
         * @param {string | number} value - Valor que se va a almacenar en el campo hidden y que se corresponde con el value seleccionado.
         * @param {string} label - Texto que se va a mostrar en el campo de texto del componente.
         * @example
         * $("#idAutocomplete").rup_autocomplete("set", "48", "Bizkaia");
         */
		set: function (value, label) {
            var $self;
				if ($(this).attr('id').indexOf('_label') >= 0 ) {
					var array = $(this).attr('id').split('_label');
                $self = $('#'+array[0]);
				} else {
                $self = $(this);
				}
				var $selfLabel = jQuery('[id=\'' + $self.attr('id') + '_label\']'),
				loadObjects, newObject = {};

			$self.val(value);
			$self.attr('rup_autocomplete_label', label);
			$selfLabel.val(label);
			loadObjects = $selfLabel.data('loadObjects');
			newObject[label] = value;
			$selfLabel.data('loadObjects', jQuery.extend(true, {}, loadObjects, newObject));

		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_autocomplete('extend', {
		/**
         * Procesa los elementos recibidos en la respuesta de la petición de búsqueda realizada.
         *
         * @function _parseResponse
         * @private
         * @param {string} term - Cadena de texto empleada para realizar la búsqueda.
         * @param {string} label - Texto a mostrar del elemento enviado en la respuesta.
         * @param {string | number} value - Valor del elemento enviado en la respuesta.
         * @param {string} [category] - Texto identificador de la categoría del elemento en el caso de que exista.
         */
		_parseResponse: function (term, label, value, category) {
			if (category === undefined) {
				return {

					label: label.replace(
						new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(term) + ')(?![^<>]*>)(?![^&;]+;)', 'gi'),
						'<strong>$1</strong>'
					),
					value: value
				};

			} else {
				return {

					label: label.replace(
						new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + $.ui.autocomplete.escapeRegex(term) + ')(?![^<>]*>)(?![^&;]+;)', 'gi'),
						'<strong>$1</strong>'
					),
					value: value,
					category: category
				};
			}

		},
		/**
         * Procesa la respuesta a partir de una petición de búsqueda sobre una fuente de datos local.
         *
         * @function _sourceLOCAL
         * @private
         * @param {object} request - Objeto que contiene la petición de búsqueda.
         * @param {object} response - Objeto que contiene la respuesta a partir de la fuente de datos local.
         */
		_sourceLOCAL: function (request, response) {
			var settings, loadObjects = {},
				returnValue, stock,loadObjectsLabels = {};

			if (this.element.data('settings') !== undefined) {
				settings = this.element.data('settings');
			} else {
				settings = this.options;
			}

			if (settings.loadObjects !== undefined) {
				stock = settings.loadObjects;
			} else {
				stock = settings.id;
			}

			var textoOrigen = request.term;
			if(settings.accentFolding){
				textoOrigen = $.rup_utils.normalize(request.term);
			}
			var data, matcher = settings.contains ? $.ui.autocomplete.escapeRegex(textoOrigen) : '^' + $.ui.autocomplete.escapeRegex(textoOrigen),
				json_i18n = $.rup.i18n.app[settings.i18nId];

			matcher = new RegExp(matcher, 'i');
			
			// Detecta si es enlazado o no y lo gestiona
			let dataSource = settings.data;
			
			if (settings.parent) {	
				let parentsValues = settings.$self._getParentsValues(settings);
				
				if (parentsValues.selectedSource in settings.data) {
					dataSource = settings.data[parentsValues.selectedSource];
				}
			}
			
			data = $.map(dataSource, function (item) {
				var label = item,
					value = item,
					category;
				if (typeof item === 'object') { //multi-idioma
					if (item.i18nCaption !== undefined) {
						label = $.rup.i18nParse(json_i18n, item.i18nCaption);
					} else if (item.label !== undefined) {
						label = item.label;
					} else {
						label = item.value;
					}
					value = item.value;
					if (settings.category)
						category = item.category;
				}
				var labelLimpio = label;
				
				if(settings.accentFolding){
					labelLimpio = $.rup_utils.normalize(label);
				}
				if (!request.term || matcher.test(labelLimpio)) {
					var termLimpio = $.rup_utils.normalize(request.term);
					if (settings.category)
						returnValue = settings._parseResponse(termLimpio, labelLimpio, value, category);
					else
						returnValue = settings._parseResponse(termLimpio, labelLimpio, value);
					loadObjects[returnValue.label.replace(/<strong>/g, '').replace(/<\/strong>/g, '')] = returnValue.value;
					loadObjectsLabels[label] = returnValue.value;
					if(settings.accentFolding && labelLimpio !== label){//limpiar acentos y mayúsculas
						//parte delantera
						//returnValue.label = literal.substr(0,nDelante)+label.substr(0,termLimpio.length)+literal.substr(nDelante+termLimpio.length);
						
						var literal = returnValue.label;
						var nDelante = literal.indexOf(termLimpio);
						var n = labelLimpio.indexOf(termLimpio);
						returnValue.label = literal.substr(0, nDelante) + label.substr(n, termLimpio.length) + literal.substr(nDelante + termLimpio.length);
						//parte trasera
						//var nAtras = literal.indexOf(labelLimpio.substr(termLimpio.length));
						
                        var nAtras = literal.indexOf('</strong>')+9;
						literal = returnValue.label;
						returnValue.label = literal.substr(0,nAtras)+label.substr(n+termLimpio.length);
						let nStrong = literal.indexOf('<strong>');
						returnValue.label = item.label.substr(0, nStrong) + '<strong>' 
											+ item.label.substr(nStrong,termLimpio.length) 
											+ '</strong>' + item.label.substr(nStrong + 
													termLimpio.length);
					}
					return returnValue;
				}
			});

			// Se almacenan los datos cargados
			$('#' + stock).data('loadObjects', loadObjects);
			$('#' + stock).data('loadObjectsLabels', loadObjectsLabels);

			// Eliminar elementos vacíos
			data = $.grep(data, function (value) {
				return value != undefined;
			});
			response(data);
		},
		/**
         * Procesa la respuesta a partir de una petición de búsqueda sobre una fuente de datos remota.
         *
         * @function _sourceREMOTE
         * @private
         * @param {object} request - Objeto que contiene la petición de búsqueda.
         * @param {object} response - Objeto que contiene la respuesta a partir de la fuente de datos remota.
         */
		_sourceREMOTE: function (request, response) {
			//Se escapan los comodines/wildcards de BD
			var $self = this.element,
				settings, loadObjects = {},
				returnValue, stock, term, data, lastTerm, bckData, $stock, loadObjectsLabels = {};

			if (this.element.data('settings') !== undefined) {
				settings = this.element.data('settings');
			} else {
				settings = this.options;
			}

			if (settings.loadObjects !== undefined) {
				stock = settings.loadObjects;
			} else {
				stock = settings.id;
			}

			$stock = jQuery('#' + stock);
			
			// Si tiene parent, envía su valor como parámetro extra
			if (settings.parent) {
				if (settings.extraParams === undefined) {
					settings.extraParams = {};
				}
				
				$.each(settings.parent, function (position, item) {
					let entityName = $('#' + item).attr('name');
					
					if (entityName !== undefined && entityName !== '') {
						settings.extraParams[entityName] = $('#' + item).rup_autocomplete('getRupValue');
					}
				});
			}

			term = request.term.replace(/%/g, '\\%').replace(/_/g, '\\_');
			data = $.extend({
				q: term,
				c: settings.contains
			}, settings.extraParams);

			// Comprobar si se puede cachear
			lastTerm = $stock.data('tmp.loadObjects.term');

			if (!settings.disabledCache && term.indexOf(lastTerm) === 0) {

				$stock.data('tmp.loadObjects.term', term);

				bckData = settings.data;

				settings.data = $stock.data('tmp.data');
				settings.$self._sourceLOCAL.bind(this, request, response)();
				settings.data = bckData;

			} else {

				$.rup_ajax({
					url: settings.data,
					data: data,
					dataType: 'json',
					contentType: 'application/json',
					//Cabecera RUP
					beforeSend: function (xhr) {
						//LOADING...
						$('#' + settings.id + '_label').addClass('rup-autocomplete_loading');

						xhr.setRequestHeader('RUP', $.toJSON(settings.sourceParam));
					},
					/**
                     *
                     * @fires  {[event]} rupAutocomplete_beforeLoadComplete [description]
                     */
					success: function (data) {

						$self.triggerHandler('rupAutocomplete_beforeLoadComplete', [data]);
						//Si no hay datos en el autocomplete que se cierre
						if (data.length === 0) {
							jQuery('#' + settings.id + '_label').autocomplete('close');
							return null;
						}
						response($.map(data, function (item) {
							// Si se define un sourceParam se serializan los parámetros desde el cliente en vez de desde el bean.
							if (settings.sourceParam !== undefined) {
								if (settings.sourceParam.category === 'filter') {
									if (settings.sourceParam.label !== undefined) {
										item.label = item[settings.sourceParam.label];
									}
									if (settings.sourceParam.data !== undefined) {
										item.value = item[settings.sourceParam.data];
									}
									if (settings.sourceParam.category !== undefined) {
										item.category = item[settings.sourceParam.category];
									}
								} else if (item.label === undefined && item[settings.sourceParam.label] !== undefined) {
									item.label = item[settings.sourceParam.label];
								}
							}
							var labelLimpio = item.label;
							
							if(settings.accentFolding){
								labelLimpio = $.rup_utils.normalize(item.label);
							}
							var termLimpio = $.rup_utils.normalize(request.term);
							if (settings.category) {
								returnValue = settings._parseResponse(termLimpio, labelLimpio, item.value, item.category);
							} else {
								returnValue = settings._parseResponse(termLimpio, labelLimpio, item.value);
							}
							
							// Limpiar tildes
							if (settings.accentFolding && labelLimpio !== item.label) {
								// Parte delantera
								let regex = new RegExp(termLimpio, 'i');
								var literal = returnValue.label;
								var nDelante = literal.search(regex);
								var n = labelLimpio.search(regex);
								returnValue.label = literal.substr(0, nDelante) + item.label.substr(n, termLimpio.length) + literal.substr(nDelante + termLimpio.length);
								
								// Parte trasera
                                var nAtras = literal.indexOf('</strong>') + 9;
								literal = returnValue.label;
								returnValue.label = literal.substr(0, nAtras) + item.label.substr(n + termLimpio.length);
								let nStrong = literal.indexOf('<strong>');
								returnValue.label = item.label.substr(0, nStrong) + '<strong>' 
													+ item.label.substr(nStrong, termLimpio.length) 
													+ '</strong>' + item.label.substr(nStrong + termLimpio.length);
								loadObjectsLabels[returnValue.label] = returnValue.value;
								loadObjects[$.rup_utils.normalize(returnValue.label.replace(/<strong>/g, '').replace(/<\/strong>/g, ''))] = returnValue.value;
							} else {
								loadObjectsLabels[item.label] = returnValue.value;
								loadObjects[returnValue.label.replace(/<strong>/g, '').replace(/<\/strong>/g, '')] = returnValue.value;
							}
							
							return returnValue;
						}));

						//se almacenan los datos cargados
						$stock.data('loadObjects', loadObjects);
						$stock.data('loadObjectsLabels', loadObjectsLabels);
						$stock.data('tmp.loadObjects.term', term);
						$stock.data('tmp.data', data);

						$self.triggerHandler('rupAutocomplete_loadComplete', [data]);
					},
					error: function (xhr, textStatus, errorThrown) {
						if (settings.onLoadError !== null && typeof settings.onLoadError === 'function') {
							jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
						} else {
							$.rup.showErrorToUser($.rup.i18n.base.rup_autocomplete.ajaxError);
						}
					},
					complete: function () {
						//UNLOADING...
						$('#' + settings.id + '_label').removeClass('rup-autocomplete_loading');
					}
				});

			}
		},
		/**
         * Función encargada de crear el control encargado de mostrar todos los resultados cuando el componente tiene activado el modo de funcionamiento combobox.
         *
         * @function _createShowAllButton
         * @private
         */
		_createShowAllButton: function (settings) {
			var input = this,
				wasOpen = false;
			input.wrap(jQuery('<span>').addClass('rup-combobox'));
			var $wrapper = input.parent();
			var $button = $('<a>').attr('tabIndex', -1).attr('title',
				$.rup.i18n.base.rup_autocomplete.showAllItems).rup_tooltip().rup_button({
				icons: {
					primary: 'ui-icon-triangle-1-s'
				},
				text: false
			}).removeClass('ui-corner-all').addClass(
				'rup-combobox-toggle ui-corner-right')
				.mousedown(
					function () {
						wasOpen = input.autocomplete(
							'widget')
							.is(':visible');
					}).click(function () {
					input.focus();
					// Close if already visible
					if (wasOpen) {
						return true;
					}
					// Pass empty string as value to search
					// for, displaying all results
					input.autocomplete('search', '');
				});

			$button.appendTo($wrapper);
			settings.$comboboxToogle = $button;
		},
		/**
         * Método que obtiene el valor del autocomplete padre (ya sea uno o varios).
         *
         * @function _getParentsValues
         * @private
	     * @since UDA 5.0.0 (backported)
		 *
         * @param {object} settings - Configuración general del componente.
		 *
		 * @return {object}
         */
		_getParentsValues: function (settings) {
			let parentsValues = {};
			parentsValues.allParentsHaveValues = true;
			parentsValues.selectedSource = '';
			
			$.each(settings.parent, function (position, parentId) {				
				if ($("#" + parentId).rup_autocomplete("getRupValue") == '' || $("#" + parentId + "_label").rup_autocomplete("getRupValue") == '') {
					parentsValues.allParentsHaveValues = false;
					return false;
				}
				
				// Obtener valor del padre
				parentsValues.selectedSource += settings.$self._processHDIV($('#' + parentId + '_label').data('settings'), $("#" + parentId).rup_autocomplete("getRupValue"));
				
				// Comprobar si se trata de un autocomplete enlazado múltiple
				if (settings.parent.length > 1 && position != settings.parent.length - 1) {
					parentsValues.selectedSource += settings.multiValueToken;
				}
			});
				
			return parentsValues;
		},
		/**
         * Método que comprueba si el padre de un autocomplete local es remoto y usa HDIV. En caso afirmativo, se usará el NID en vez del ID, ya que este último, viene cifrado.
         *
         * @function _processHDIV
         * @private
	     * @since UDA 5.0.0 (backported)
		 *
         * @param {object} parentSettings - Configuración general del componente padre.
         * @param {string} selectedSource - Valor del padre.
		 *
		 * @return {string}
         */
		_processHDIV: function (parentSettings, selectedSource) {
			if (parentSettings !== undefined && parentSettings.source.name === '_sourceREMOTE' && $.fn.isHdiv(selectedSource)) {
				let parentData = $("#" + parentSettings.loadObjects).data('tmp.data');
				let parentLabel = $("#" + parentSettings.loadObjects).rup_autocomplete("getRupValue");
				
				let search = $.grep(parentData, function (row) {
					return row.value === selectedSource && row.label === parentLabel; 
				});
				
				if (search[0] !== undefined && search[0] !== '') {
					let nid = search[0].nid;
				
					if (nid) {
						selectedSource = nid;
					}
				}
			}
			
			return selectedSource;
		},
		/**
         * Método de inicialización del componente.
         *
         * @function _init
         * @private
         */
		_init: function (args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
			} else {
				//Se recogen y cruzan las paremetrizaciones del objeto
				var $self = $(this),
					settings = $.extend({}, $.fn.rup_autocomplete.defaults, args[0]),
					name = $(this).attr('name'),
					selected_value;

				$(this).attr('ruptype', 'autocomplete');

				//Recopilar datos necesarios
				settings.id = $(this).attr('id');
				settings.loadObjects = settings.id;
				settings.data = settings.source; //Guardar los datos en "data" ya que source la emplea autocomplete internamente
				settings._parseResponse = this._parseResponse; //Guardar referencia a rup.autocomplete para invocar las funciones privadas
				settings._sourceLOCAL = this._sourceLOCAL; //Guardar referencia a rup.autocomplete para invocar las funciones privadas
				settings.$self = this; //Guardar referencia a rup.autocomplete para invocar las funciones privadas

				//Guardar valor del INPUT
				settings.loadValue = settings.loadValue ?? $('#' + settings.id).attr('value');

				//Si no se recibe identificador para el acceso a literales se usa el ID del objeto
				if (!settings.i18nId) {
					settings.i18nId = settings.id;
				}

				//Eventos
				//*******
				//Guardar referencia
				settings._change = settings.change;
				settings._select = settings.select;
				settings._focus = settings.focus;

				//Sobrecargar tratamiento
				settings.change = function (event, ui) {
					if (selected_value != null) { //Puede que se ejecute este evento sin ejecutarse el select. Con esta condición nos aseguramos
						$('#' + event.target.id).val(selected_value);
						$('#' + event.target.id).focus();
					}
					selected_value = null;
					if (settings._change !== undefined) {
						settings._change(event, ui);
					}
					$self.triggerHandler('rupAutocomplete_change');
				};
				settings.select = function (event, ui) {
					selected_value = ui.item.label.replace(/<strong>/g, '').replace(/<\/strong>/g, '');
					if (settings._select !== undefined) {
						$('#' + settings.id).val(ui.item.value);
						settings._select(event, ui);
					}
					$('#' + settings.id).attr('rup_autocomplete_label', selected_value);
					$('#' + settings.id).data('selected', true);
					$('#' + settings.id).val(ui.item.value);
					$self.triggerHandler('rupAutocomplete_select', [ui]);
					event.stopPropagation();
					return false;
				};
				settings.focus = function (event, ui) {
					$('#' + event.target.id).val(ui.item.label.replace(/<strong>/g, '').replace(/<\/strong>/g, ''));
					if (settings._focus !== undefined) {
						settings._focus(event, ui);
					}
					return false; //Evitar acciones jquery.autocomplete.js
				};


				//Generación de campo oculto para almacenar 'value' (en el input definido se guarda el 'label')
				var $hidden = $('<input>').attr({
					type: 'hidden',
					id: settings.id + '_value',
					name: (settings.valueName === null ? name : settings.valueName),
					ruptype: 'autocomplete'
				});

				$('#' + settings.id).after($hidden)
					.attr('name', (settings.labelName === null ? name + '_label' : settings.labelName))
					.addClass('rup-autocomplete_label');

				//					settings.$hidden = $hidden;

				if (typeof settings.source === 'object') {
					//LOCAL
					settings.source = this._sourceLOCAL;
				} else {
					//REMOTO
					//Nos aseguramos que el número mínimo de teclas para búsquedas sea 3
					settings.minLength = settings.minLength > 3 ? settings.minLength : 3;
					settings.source = this._sourceREMOTE;
				}

				//Se prepara el almacenaje de datos
				$('#' + settings.id).data('loadObjects', {});

				if (settings.combobox === true) {
					$('#' + settings.id).addClass('rup-combobox-input ui-corner-left');
					settings.minLength = 0;
				}


				jQuery(settings.appendTo).addClass('ui-front');

				//Invocación al componente subyacente
				jQuery('#' + settings.id).autocomplete(settings);

				//Se anyade un id al menu desplegable del autocomplete
				settings.$menu = jQuery('#' + settings.id).data('ui-autocomplete').menu.element.attr('id', settings.id + '_menu');

				if (settings.combobox === true) {
					this._createShowAllButton(settings);
				}

				// Evita en IE que el input pierda el foco al hacer click en el scroll de la capa de resultados
                settings.$menu.on('scroll', () => {
					jQuery('#' + settings.id + '_label').focus();
					settings.$menu.show();
				});

				// Lanza el evento de change al seleccionar una de las opciones del menú
				settings.$menu.on('mousedown', (e) => {
					if ($(e.target).hasClass('ui-menu-item-wrapper')) {
						settings.$menu.triggerHandler('blur');
					}
				});

				// Altura del menu desplegable
				jQuery('#' + settings.id).on('autocompleteopen', function () {
					if (settings.menuMaxHeight !== false) {
						settings.$menu.css('overflow-y', 'auto')
							.css('overflow-x', 'hidden')
							.css('max-height', settings.menuMaxHeight + 'px')
							.css('width', jQuery('#' + settings.id + '_label').innerWidth());
					}
					jQuery('#' + settings.id + '_menu').css('z-index', '1000');
					jQuery('#' + settings.id + '_menu').removeClass('ui-front');
				});
				
				// Buscar el UL del autocomplete y colocarlo tras el elemento sobre el que debe ir
				if (settings.menuAppendTo != undefined) {
					if (settings.menuAppendTo.length == 0 || settings.menuAppendTo.length == undefined) {
						console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_autocomplete.menuAppendToError'), settings.id));
						$('#' + settings.id).parent().append(settings.$menu);
					} else {
						jQuery(settings.menuAppendTo).append(settings.$menu);
					}
				} else {
					$('#' + settings.id).parent().append(settings.$menu);
				}

				//Deshabilitar
				// if (settings.disabled===true) { $("#"+settings.id).rup_autocomplete("disable");
				//     if (settings.combobox)
				//         $('span').has('#'+settings.id+'_label').find("a").attr("style","display:none");
				//
				// }else if (settings.disabled===false){ //habilitar
				//     $("#"+settings.id).rup_autocomplete("enable");
				//     if (settings.combobox){
				//         $('span').has('#'+settings.id+'_label').find("a").removeAttr("style");
				//     }
				// }
				
				// Valor por defecto
				if ((settings.defaultValue && settings.parent == undefined) || (settings.parent != undefined && settings.parent != '' && $("#" + settings.parent + "_label").rup_autocomplete("getRupValue") != '')) {
					$('#' + settings.id).rup_autocomplete('search', settings.defaultValue);
				}

				// Valor pre-cargado
				if (settings.loadValue) {
					$('#' + settings.id).val(settings.loadValue);
					$('#' + settings.id + '_value').val(settings.loadValue);
				}

				// Modificar identificadores
				settings.loadObjects = settings.id + '_label';
				$('#' + settings.id).attr('id', settings.id + '_label');
				$('#' + settings.id + '_value').attr('id', settings.id);


				//eventos internos de borrado y perdida de foco
				$('#' + settings.id + '_menu').on('mousedown', function (event) {
					var selected = $('#' + settings.id).data('selected'),
						isShowingMenu = $('.ui-autocomplete:visible').length > 0 ? true : false;
					if (!selected && isShowingMenu) {
						$('#' + settings.id).data('ieIssueScrollVisible', true);
						event.preventDefault();
					}

				});

				$('#' + settings.id + '_label').on('keydown', function () {
					$('#' + settings.id).data('ieIssueScrollVisible', false);
				});



				$('#' + settings.id + '_label').on('blur', function (event) {
					//Obtener datos de si viene de seleccionar elemento o si el menú de selección está desplegado
					var selected = $('#' + settings.id).data('selected'),
						isShowingMenu = $('.ui-autocomplete:visible').length > 0 ? true : false;
					//Borrar índicador de que viene de seleccionar elemento
					$('#' + settings.id).data('selected', false);
					//Si es un evento de teclado pero no es ENTER, omitir esta función
					if (event.type === 'keydown' && event.keyCode !== 13) {
						return true;
					}
					if ($('#' + settings.id).data('ieIssueScrollVisible') === true) {
						$('#' + settings.id).focus();
						event.stopPropagation();
						$('#' + settings.id).data('ieIssueScrollVisible', false);
						return true;
					}



					var autoCompObject = $(event.currentTarget),
						loadObjects = $('#' + settings.loadObjects).data('loadObjects');

					if (settings.getText) {
						$('#' + settings.id).val(autoCompObject.val());
						$('#' + settings.id).attr('rup_autocomplete_label', autoCompObject.val());
					} else {
						// Cuando la propiedad accentFolding = true
						if (settings.accentFolding && loadObjects[$.rup_utils.normalize(autoCompObject.val())] !== undefined) {
							$('#' + settings.id).val(loadObjects[$.rup_utils.normalize(autoCompObject.val())]);
							$('#' + settings.id).attr('rup_autocomplete_label', loadObjects[$.rup_utils.normalize(autoCompObject.val())]);
						} 
						// Cuando la propiedad accentFolding = false
						else if(!settings.accentFolding && loadObjects[autoCompObject.val()] !== undefined) {
							$('#' + settings.id).val(loadObjects[autoCompObject.val()]);
							$('#' + settings.id).attr('rup_autocomplete_label', loadObjects[autoCompObject.val()]);
						} 
						// Cuando el valor del autocomplete esta vacio
						else {
							$('#' + settings.id).val('');
							$('#' + settings.id).attr('rup_autocomplete_label', '');
							autoCompObject.val('');
							autoCompObject.autocomplete('close');
						}
					}
					//Si el evento es ENTER y viene de seleccionar un elemento o el menú se estaba mostrando, omitir resto de funciones (ej. buscar)
					if (event.type === 'keydown' && event.keyCode === 13 && (selected || isShowingMenu)) {
						return false;
					}
				});

				//se guarda la configuracion general (settings) del componente
				$('#' + settings.id + '_label').data('settings', settings);
				if(settings.loadObjectsAuto != undefined){
					$('#' + settings.id + '_label').data('loadObjects', settings.loadObjectsAuto);
				}
				$('#' + settings.id + '_label').data('rup.autocomplete', {
					$hiddenField: $('#' + settings.id)
				});
				$('#' + settings.id).data('rup.autocomplete', {
					$labelField: $('#' + settings.id + '_label')
				});


				//Deshabilitar
				if (settings.disabled) {
					$('#' + settings.id).rup_autocomplete('disable');
				} else if (!settings.disabled) { //habilitar
					$('#' + settings.id).rup_autocomplete('enable');
				}
				
				if (settings.parent) {
					$.map(settings.parent, function (item) {
                        var childsArray = $('#' + item).data('childs') === undefined ? [] : $('#' + item).data('childs');
                        childsArray[childsArray.length] = settings.id;
                        $('#' + item).data('childs', childsArray);
                        $('#' + item).data('childSelector', 0);
                    });

					// Comprobar si tiene un padre o varios
					if (settings.parent.length > 1) {
						let allParentsHaveValues = true;
						
						// Se comprueba si todos los padres tienen valores asignados
						$.each(settings.parent, function (position, parentId) {
							if ($("#" + parentId + "_label").rup_autocomplete("getRupValue") == '') {
								allParentsHaveValues = !allParentsHaveValues;
								return false;
							}
						});
						
						if (allParentsHaveValues) {
							$('#' + settings.id).rup_autocomplete('enable');
						} else {
							$('#' + settings.id).rup_autocomplete('disable');
							$('#' + settings.id).rup_autocomplete("setRupValue", "");
						}
					} else {
						if ($("#" + settings.parent + "_label").rup_autocomplete("getRupValue") != '') {
	                        $('#' + settings.id).rup_autocomplete('enable');
	                    } else {
							$('#' + settings.id).rup_autocomplete('disable');
							$('#' + settings.id).rup_autocomplete("setRupValue", "");
						}
					}
					
					// Añadir evento para detectar los cambios en valores del padre/s
					$.each(settings.parent, function (position, parentId) {
						$("#" + parentId + "_label").on("rupAutocomplete_change", function (event) {
							let autocompleteId = event.target.id.substring(0, event.target.id.indexOf("_label"));
							let childSelector = $("#" + autocompleteId).data('childSelector');
							let child = $("#" + autocompleteId).data('childs')[childSelector];
							let resourceIsCached = false;
							let parentsValues = settings.$self._getParentsValues(settings);
							let selectedSource = parentsValues.selectedSource;
							let allParentsHaveValues = parentsValues.allParentsHaveValues;
							let checkValueDeferred = $.Deferred();
							
							// Comprobar valor para saber si habilitar o no el hijo
							if (allParentsHaveValues) {
								// Si es remoto hay que obtener los datos para poder hacer la siguiente comprobación de valores válidos
								if (settings.source.name === '_sourceREMOTE') {
									let retrieveValueDeferred = $.Deferred();
									
									$('#' + child + '_label').on("autocompleteresponse", function() {
										retrieveValueDeferred.resolve();
										return retrieveValueDeferred.promise();
									});
									
									$.when(retrieveValueDeferred).then(function () {
										resourceIsCached = false;
										allParentsHaveValues = false;
										let childData = $('#' + child + '_label').data('tmp.data');
										
										if (childData !== undefined && childData.length > 0) {
											allParentsHaveValues = true;
										}
										
										checkValueDeferred.resolve();
										return checkValueDeferred.promise();
									});
									
									// Eliminar cache porque sino no realiza la búsquedas cuando se cambia el padre
									if (settings.$self.data('tmp.loadObjects.term') !== undefined) {
										settings.$self.removeData('tmp.loadObjects.term');
									}
									
									// Realizar búsqueda
									$('#' + child).rup_autocomplete('search', settings.defaultValue !== undefined ? settings.defaultValue : undefined);
									// Quitar foco del elemento para evitar desplegar los resultados automáticamente
									$('#' + child + '_label').trigger('blur');
								} else if (settings.source.name === '_sourceLOCAL' && !(selectedSource in $('#' + child + '_label').data('settings').data)) {
									allParentsHaveValues = false;
										
									checkValueDeferred.resolve();
									checkValueDeferred.promise();
								} else {
									checkValueDeferred.resolve();
									checkValueDeferred.promise();
								}
							} else {
								checkValueDeferred.resolve();
								checkValueDeferred.promise();	
							}
							
							// Cuando es enlazado, hay que comprobar si el valor seleccionado en el padre permite seleccionar algún valor en el hijo
							$.when(checkValueDeferred).then(function () {
								// Activar o desactivar dependiendo de si todos los parent tienen valores
								if (allParentsHaveValues) {
									$('#' + child).rup_autocomplete('enable');
								} else {
									$('#' + child).rup_autocomplete('disable');
								}
								
								// Definir valor por defecto o vaciarlo en caso contrario
								if (allParentsHaveValues && !resourceIsCached && settings.defaultValue != undefined) {
									$('#' + child).rup_autocomplete('search', settings.defaultValue);
								} else {
									$('#' + child + "_label").val("");
									$('#' + child).rup_autocomplete("setRupValue", "");
								}
								
								// Comprobar que hijo se usara la proxima vez
								if ($("#" + autocompleteId).data('childs').length - 1 > childSelector) {
									$('#' + autocompleteId).data('childSelector', childSelector + 1);
								} else {
									$('#' + autocompleteId).data('childSelector', 0);
								}
							});
						});
					});
				}

				// Se audita el componente
				$.rup.auditComponent('rup_autocomplete', 'init');
			}
		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	/**
     * Función a ejecutar en caso de producirse un error a la hora de obtener los elementos a mostrar.
     *
     * @callback module:rup_autocomplete~onLoadError
     * @param {Object} xhr - Objeto XHR que contiene la respuesta de la petición realizada.
     * @param {string} textStatus - Texto que identifica el error producido.
     * @param {Object} errorThrown - Objeto error que contiene las propiedades del error devuelto en la petición.
     */

	/**
     * @description Opciones por defecto de configuración del componente.
     *
     * @name defaults
     *
     * @property {module:rup_autocomplete~onLoadError} [onLoadError] - Función de callback a ejecutar en caso de que se produzca un error en la petición de obtención de la lista de elementos a mostrar.
     * @property {boolean} [contains=true] - Valor que determina si la búsqueda debe ser del tipo “contiene” (se buscarán elementos que contengan en cualquier posición el literal introducido) o del tipo “comienza por” (se buscarán elementos que comiencen por el literal introducido).
     * @property {string} [valueName=null] - Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el identificador del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente.
     * @property {string} [labelName=null] - Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el texto del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente, añadiéndole el sufijo “_label”.
     * @property {boolean} [getText=false] - En caso de ser true el componente devolverá como resultado seleccionado el texto en vez del value del elemento.
     * @property {boolean} [combobox=false] - Habilita/deshabilita el modo de funcionamiento combobox.
     * @property {number} [menuMaxHeight=false] - Determina la altura máxima que podrá tener la capa del menú desplegable antes de mostrar scroll.
     * @property {object} [menuAppendTo=null] - Permite especificar mediante un selector de jQuery el elemento del DOM al que se añadirá el menú desplegable.
     * @property {boolean} [disabled=false] - Determina si se deshabilita el componente Autocomplete sobre el input al que se aplica. De tal modo que por mucho que se interactué con el elemento no se hará una búsqueda.
     * @property {string} [defaultValue] - Valor que se cargará por defecto en el input y con el que se lanzará una búsqueda para mostrar valores propuestos
     * @property {string} [multiValueToken="##"] - Define el separador a utilizar en combos enlazados locales. 
	 */
	$.fn.rup_autocomplete.defaults = {
		onLoadError: null,
		contains: true,
		valueName: null,
		labelName: null,
		getText: false,
		combobox: false,
		menuMaxHeight: false,
		menuAppendTo: null,
		disabled: false,
		accentFolding: true,
        multiValueToken: '##'
	};

	/**
     * Permite asociar una función que se ejecutará cuando se complete la carga de los registros correspondientes al texto de búsqueda introducido.
     * @event module:rup_autocomplete#rupAutocomplete_loadComplete
     * @example
     * $("#autocomplete").on("rupAutocomplete_loadComplete", function(event, data){});
     */

	/**
     * Permite asociar una función que se ejecutará cuando se produzca un cambio en el valor seleccionado del componente
     * @event module:rup_autocomplete#rupAutocomplete_change
     * @example
     * $("#autocomplete").on("rupAutocomplete_change", function(event, data){});
     */

	/**
     * Permite asociar una función que se ejecutará cuando se produzca la selección de un registro de entre la lista de resultados
     * @event module:rup_autocomplete#rupAutocomplete_select
     * @example
     * $("#autocomplete").on("rupAutocomplete_select", function(event, data){});
     */


	/**
     * Permite manipular la respuesta del servidor antes de construir la lista de resultados.
     * @event module:rup_autocomplete#rupAutocomplete_beforeLoadComplete
     * @example
     * $("#autocomplete").on("rupAutocomplete_beforeLoadComplete", function(event, data){});
     */





}));
