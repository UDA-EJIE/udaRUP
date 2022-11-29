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
 * Módulo de utilidades comunes a todos los componentes RUP. <br/><br/>
 * Implementa métodos para la manipulación de JSON, formularios, formatos...
 *
 * @summary Librería de utilidades para los componentes RUP.
 * @module rup_utils
 * @memberOf jQuery
 */

(function (factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', 'jqueryUI', './core/utils/jquery.json-2.2'], factory);
	} else {

		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	$.rup_utils = {};
	$.rup_utils.arr = [];
	$.rup_utils.autoGenerateIdNum = 0;
	$.rup_utils.swinging = false;
	
	$.extend($.rup_utils, {
		/**
		 * Retorna el idioma actual capitalizado.
		 *
		 * El idioma actual se obtiene de la variable $.rup.lang
		 *
		 * @name jQuery.rup_utils#capitalizedLang
		 * @function
		 * @example
		 * // Retorna "Es" para un valor "es" en $.rup.lang.
		 * $.rup_utils.capitalizedLang();
		 * @returns {string} - Idioma actual capitalizado
		 */
		capitalizedLang: function () {
			if ($.rup.lang == null) {
				return '';
			}
			return $.rup.lang.charAt(0).toUpperCase() + $.rup.lang.slice(1);
		},
		getJson: function (obj, path) {
			var ret = $.extend({}, obj),
				split = path.split('.');

			if (split.length === 1) {
				return obj[split[0]];
			}
			for (var i = 0; i < split.length; i++) {
				ret = ret[split[i]];
			}

			return ret;
		},
		setJson: function (obj, path, value) {
			var aux = obj,
				split = path.split('.');

			if (split.length === 1) {
				obj[split[0]] = value;
			} else {
				for (var i = 0; i < split.length - 1; i++) {
					aux = aux[split[i]];
				}

				aux[split[split.length - 1]] = value;
			}
		},
		
		/**
		 * Transforma un objeto JSON en un array Javascript.
		 *
		 * @name jQuery.rup_utils#jsontoarray
		 * @function
		 * @param {Object} obj - Objeto JSON que se desea transformar en un array.
		 * @returns {Object} - Array JavaScript.
		 * @example
		 * // Transforma un json obj={'prop':'value'} en un array arr['prop'] -> 'value'
		 * var obj={'prop':'value'};
		 * $.rup_utils.jsontoarray(obj);
		 * @example
		 * // Transforma un json obj={'propA':{'propAA':'value'}} en un array arr['propA.propAA'] -> 'value'
		 * var obj={'propA':{'propAA':'value'}};
		 * $.rup_utils.jsontoarray(obj);
		 * @example
		 * // Transforma un json obj={'propA':{'propAA':['a','b','c','d']}} en un array arr['propA.propAA[0]']
		 * var obj={'propA':{'propAA':['a','b','c','d']}};
		 * $.rup_utils.jsontoarray(obj);
		 */
		jsontoarray: function (obj) {
			var arr = [];

			function parseJSON(obj, path) { // parsea un json a un array
				path = path || '';
				// iteracion a traves (objects / arrays)
				if (obj === undefined || obj === null) {
					// Si no existe un valor para el path indicado se envia ''
					parseJSON('', path);
				} else if (obj.constructor == Object) {
					for (var prop in obj) {
						//var name = path + (path == '' ? prop : '[' + prop + ']');
						var name = path + (path == '' ? prop : '.' + prop);
						parseJSON(obj[prop], name);
					}
				} else if (obj.constructor == Array) {
					if (obj.length == 0) {
						parseJSON('[]', path);
					} else {
						for (var i = 0; i < obj.length; i++) {
                            let index = '[' + i + ']',
								name = path + index;
							parseJSON(obj[i], name);
						}
					}
				} else { // assignment (values) if the element name hasn't yet been defined, create it as a single value
					if (arr[path] == undefined) {
						arr[path] = obj;
					} else if (arr[path].constructor != Array) { // if the element name HAS been defined, but it's a single value, convert to an array and add the new value
						arr[path] = [arr[path], obj];
					} else { // if the element name HAS been defined, and is already an array, push the single value on the end of the stack
						arr[path].push(obj);
					}
				}
			}

			parseJSON(obj);
			return arr;

		},
		
		/**
		 * Realiza una desanidacion del json pasado (p.e.: {entidad:{propiedad:valor}}  --> {'entidad.propiedad':valor}.
		 *
		 * @name jQuery.rup_utils#unnestjson
		 * @function
		 * @param {Object} obj - Objeto JSON que se desea desanidar.
		 * @returns {Object} -  Objeto JSON desanidado.
		 * @example
		 * // Transforma un json obj={'propA':{'propAA':'valueAA'}} en un json obj={'propA.propAA':'valueAA'}}
		 * var obj={'propA':{'propAA':'valueAA'}};
		 * $.rup_utils.unnestjson(obj);
		 */
		unnestjson: function (obj) {

			var array = $.rup_utils.jsontoarray(obj);

			var json = {};
			for (var key in array) {
				if (typeof array[key] !== "function") {
					json[key] = array[key];
				}
			}

			return json;

		},
		
		/**
		 * Devuelve el objeto del dom existente en la posición indicada.
		 *
		 * @name jQuery.rup_utils#elementFromPoint
		 * @function
		 * @param {number} x - Coordenada x de la posición en la pantalla.
		 * @param {number} y - Coordenada y de la posición en la pantalla.
		 * @param {boolean} [argCheck=true] - Determina si debe de ajustarse en base al scroll realizado en la pantalla .
		 * @returns {Object} -  Objeto del DOM correspodiente a la posición indicada.
		 * @example
		 * $.rup_utils.elementFromPoint(120,140);
		 */
		elementFromPoint: function (x, y, argCheck) {
			var isRelative = true,
				check = argCheck || true;
			if (!document.elementFromPoint)
				return null;

			if (!check) {
				var sl;
				if ((sl = $(document).scrollTop()) > 0) {
					isRelative = (document.elementFromPoint(0, sl +
						$(window).height() - 1) == null);
				} else if ((sl = $(document).scrollLeft()) > 0) {
					isRelative = (document.elementFromPoint(sl +
						$(window).width() - 1, 0) == null);
				}
				check = (sl > 0);
			}

			if (!isRelative) {
				x += $(document).scrollLeft();
				y += $(document).scrollTop();
			}

			return document.elementFromPoint(x, y);
		},
		
		/**
		 * Convierte en mínusculas el primer caracter de la cadena de caracteres pasada como parámetro.
		 *
		 * @name jQuery.rup_utils#firstCharToLowerCase
		 * @function
		 * @param {string} cadena - Cadena de caracteres inicial.
		 * @returns {string} - Cadena de caracteres resultante con su primer caracter convertido a minúsculas.
		 * @example
		 * // Convierte a minúsculas el primer caracter de la cadena "AbCdEfg" -> "abCdEfg"
		 * $.rup_utils.firstCharToLowerCase("AbCdEfg");
		 */
		firstCharToLowerCase: function (cadena) {
			return cadena.substring(0, 1).toLowerCase() + cadena.substring(1);
		},
		
		/**
		 * Devuelve un string que puede ser utilizado como selector de jQuery mediante el id ('#'). El método permite también escapar los caracteres reservados en los selectores de jQuery
		 *
		 * @name jQuery.rup_utils#firstCharToLowerCase
		 * @function
		 * @param {string} cadena - Cadena de caracteres inicial.
		 * @returns {string} - Cadena de caracteres resultante con su primer caracter convertido a minúsculas.
		 * @example
		 * // Convierte a minúsculas el primer caracter de la cadena "AbCdEfg" -> "abCdEfg"
		 * $.rup_utils.firstCharToLowerCase("AbCdEfg");
		 */
		getJQueryId: function (sid, escaped) {
			var returnIdSelector;

			if (typeof sid === 'string') {
				returnIdSelector = sid;
				if (escaped === true) {
                    returnIdSelector = String(returnIdSelector).replace(/[!"#$%&'()*+,./:; <=>?@[\\\]^`{|}~]/g, '\\$&');
				}
				return returnIdSelector[0] === '#' ? returnIdSelector : '#' + returnIdSelector;
			}

			return null;
		},
		
		/**
		 * Convierte una cadena querystring en un objeto json.
		 *
		 * @name jQuery.rup_utils#queryStringToJson
		 * @function
		 * @param {string} queryString - Query string a transformar en un objeto json.
		 * @param {string} [serializerSplitter=&] - Cadena a usar para separar los campos.
		 * @param {boolean} [allowAllCharacters=false] - Habilita la posibilidad de incluir cualquier carácter en los campos.
		 * @returns {object} - Objeto JSON creado a partir de la query string indicada.
		 * @example
		 * // Obtene un json a partir del query string "keyA=valueA&keyB=valueB&keyC=valueC" -> "{keyA:'valueA', keyB:'valueB', keyC:'valueC'}"
		 * $.rup_utils.queryStringToJson("keyA=valueA&keyB=valueB&keyC=valueC");
		 */
		queryStringToJson: function (queryString, serializerSplitter = '&', allowAllCharacters = false) {

			function setValue(root, path, value) {
				if (path.length > 1) {
					var dir = path.shift();
					if (typeof root[dir] == 'undefined') {
						root[dir] = path[0] == '' ? [] : {};
					}

					arguments.callee(root[dir], path, value);
				} else {
					if (root instanceof Array) {
						root.push(value);
                    } else if (path[0].indexOf('.') != -1) {
						// Entra por aquí en caso de que uno de los path sea un objeto
                        var padre = path[0].slice(0, path[0].indexOf('.'));
                        var hijo = path[0].slice(path[0].indexOf('.') + 1, path[0].length);

						if (root[padre] != undefined) {
							root[padre][hijo] = value;
						} else {
							root[padre] = {
								[hijo]: value
							};
						}
					} else {
						root[path] = value;
					}
				}
			}

			var nvp = [],
				nvpBruto = queryString.split(serializerSplitter), data = {},
				pair, name, value, path, first;
			
			//Se revisa la correcta gestion de los campos
			for (var i = 0; i < nvpBruto.length; i++) {
				pair = nvpBruto[i].split('=');
				
				if(pair.length >= 2){
					nvp.push(nvpBruto[i]); 
				} else if(pair.length == 1){
					nvp[i-1] = nvp[i-1] + serializerSplitter + nvpBruto[i]; 
				}
			}

			for (var i = 0; i < nvp.length; i++) {
				pair = nvp[i].split('=');
				
				if(pair.length > 2){
					var pairAux = '';
					for (var j = 1; j < pair.length; j++) {
						if(j == 1){
							pairAux = pair[j];
							
						} else {
							pairAux = pairAux + "=" + pair[j] 
							
						}
					}
					
					pair[pair.length -1] = pairAux;
				}
				
				name = decodeURIComponent(pair[0]);
				if (pair[pair.length -1].includes("%")) {
					if (allowAllCharacters && !pair[pair.length -1].includes("%25")) {
						pair[pair.length -1] = encodeURIComponent(pair[pair.length -1]);
					}
					else if (!allowAllCharacters) {
						$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_utils.illegalChar'));
					}
				}
				value = decodeURIComponent(pair[pair.length -1]);

                path = name.match(/(^[^[]+)(\[.*\]$)?/);
				first = path[1];

				if (path[2]) {
					// case of 'array[level1]' ||
					// 'array[level1][level2]'
					path = path[2].match(/(?=\[(.*)\]$)/)[1]
						.split('][');
				} else {
					// case of 'name'
					path = [];
				}
				path.unshift(first);

				setValue(data, path, value);
			}
			return data;
		},
		
		/**
		 * Devuelve un string con los caracteres sencillos.
		 *
		 * @name normalize
		 * @function
		 * @since UDA 3.3.0
		 * 
		 * @param {string} texto - Cadena de caracteres inicial.
		 * @returns {string} - Cadena de caracteres sin accentFolding.
		 * 
		 * @example
		 * // Convierte los caracteres de la cadena "áéíóu" a "aeiou"
		 * $.rup_utils.normalize("áéíóu");
		 */
		normalize: function (texto) {
			var accentMap = {
				'á': 'a',
				'é': 'e',
				'í': 'i',
				'ó': 'o',
				'ú': 'u',
				'Á': 'A',
				'É': 'E',
				'Í': 'I',
				'Ó': 'O',
				'Ú': 'U'
			};
			var cadena = '';
			for (var i = 0; i < texto.length; i++) {
				cadena += accentMap[texto.charAt(i)] || texto.charAt(i);
			}
			return cadena;
		},
		populateForm: function (aData, formid) { //rellena un formulario que recibe como segundo parametro con los datos que recibe en el segundo parametro
            var formElem;
			var tree_data, selectorArray;

            function loadedJstreeEvent(){
                var selectorArbol = this.id;
                //$(this).rup_tree("setRupValue",$arbol[selectorArbol]);

                $(this).trigger('rup_filter_treeLoaded', $arbol[selectorArbol]);
            }

            function populateRadioCheckbox() {
                if ($(this).val() == aData[i]) {
                    $(this).prop('checked', true);
                } else {
                	$(this).prop('checked', false);
                }
            }

			if (aData) {

				for (var i in aData) {
                    tree_data = [];
					formElem = $('[name=\'' + i + '\']', formid);
					if (formElem.length == 0) {
						selectorArray = i.substr(0, i.indexOf('['));
						formElem = $('[name=\'' + selectorArray + '\']', formid);


					}
					if (formElem.is('[ruptype]')) {
						if (formElem.hasClass('jstree')) {

							for (var a in aData) {
								if (a.substr(0, a.indexOf('[')) == selectorArray) {
									tree_data.push(aData[a]);
								}
							}
							formElem['rup_' + formElem.attr('ruptype')]('setRupValue', tree_data);
							var $arbol = [];
							$arbol[selectorArray] = tree_data;
                            formElem.on('loaded.jstree', loadedJstreeEvent);

						} else {
							// Forma de evitar el EVAL
							formElem['rup_' + formElem.attr('ruptype')]('setRupValue', aData[i]);
						}
					} else if (formElem.is('input:radio') || formElem.is('input:checkbox')) {
                        formElem.each(populateRadioCheckbox);
					} else if (formElem.is('select')) {
						formElem.val(aData[i]).click();
					} else if (formElem.is(':not(img)')) { // this is very slow on big table and form.
						formElem.val(aData[i]);
					}
				}
			}
		},

		//DATE UTILS
		createDate: function (day, month, year) {
            return $.datepicker.formatDate($.rup.i18n.base.rup_date.dateFormat, new Date(year, month - 1, day));
		},
		createTime: function (hour, minute, second) {
			return new Date(null, null, null, hour, minute, second);
		},
		
		/*!
		 * jQuery CooQuery Plugin v2
		 * http://cooquery.lenonmarcel.com.br/
		 *
		 * Copyright 2009, 2010 Lenon Marcel
		 * Dual licensed under the MIT and GPL licenses.
		 * http://www.opensource.org/licenses/mit-license.php
		 * http://www.gnu.org/licenses/gpl.html
		 *
		 * Date: 2010-01-24 (Sun, 24 January 2010)
		 */

		//TODO: Documentacion -> http://plugins.jquery.com/project/cooquery
		setCookie: function (name, value, options) {
			if (typeof name === 'undefined' || typeof value === 'undefined' || name === null || value === null) {
				$.rup.errorGestor('[' + $.rup.i18nParse($.rup.i18n.base, 'rup_global.metodError') + 'setCookie] - ' + $.rup.i18nParse($.rup.i18n.base, 'rup_utils.paramsError'));
				return false;
			}

			var str = name + '=' + encodeURIComponent(value);

			if (typeof options !== 'undefined' && options !== null) {
				if (options.domain) str += '; domain=' + options.domain;
				if (options.path) str += '; path=' + options.path;
				if (options.duration) {
					var date = new Date();
					date.setTime(date.getTime() + options.duration * 24 * 60 * 60 * 1000);
					str += '; expires=' + date.toGMTString();
				}
				if (options.secure) str += '; secure';
			}

			return (document.cookie = str);
		},

		delCookie: function (name) {
			if (typeof name === 'undefined' || name === null) {
				$.rup.errorGestor('[' + $.rup.i18nParse($.rup.i18n.base, 'rup_global.metodError') + 'delCookie] - ' + $.rup.i18nParse($.rup.i18n.base, 'rup_utils.paramsError'));
				return false;
			}

			return $.rup_utils.setCookie(name, '', {
				duration: -1
			});
		},

		readCookie: function (name) {
			if (typeof name === 'undefined' || name === null) {
				$.rup.errorGestor('[' + $.rup.i18nParse($.rup.i18n.base, 'rup_global.metodError') + 'readCookie] - ' + $.rup.i18nParse($.rup.i18n.base, 'rup_utils.paramsError'));
				return false;
			}

            var value = document.cookie.match('(?:^|;)\\s*' + name.replace(/([-.*+?^${}()|[\]/\\])/g, '\\$1') + '=([^;]*)');
			return (value) ? decodeURIComponent(value[1]) : null;
		},
		get: function (name, json) {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = cookies[i].trim();
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = json ? $.JSON.decode(decodeURIComponent(cookie.substring(name.length + 1))) : decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		},
		set: function (name, value, options) {
			options = $.extend({}, options);

			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString();
			}

			value = options.json ? encodeURIComponent($.JSON.encode(value)) : encodeURIComponent(value);

			var path = options.path ? '; path=' + (options.path) : '';
			var domain = options.domain ? '; domain=' + (options.domain) : '';
			var secure = options.secure ? '; secure' : '';

			document.cookie = [name, '=', value, expires, path, domain, secure].join('');
		},
		//compare objects function
		compareObjects: function (x, y) {
			var objectsAreSame = true;
			if (Object.keys(x).length !== Object.keys(y).length) {
				return false;
			}
			for (var propertyName in x) {
				if (typeof x[propertyName] == 'object' && typeof y[propertyName] == 'object') {
                    objectsAreSame = this.compareObjects(x[propertyName], y[propertyName]);
					if (!objectsAreSame) break;
				} else {
					if (x[propertyName] !== y[propertyName]) {
						objectsAreSame = false;
						break;
					}
				}
			}
			return objectsAreSame;
		},
		escapeId: function (id) {
			if (id) {
                return id.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, '\\$1');
			}

			return '';
		},
		selectorId: function (id) {
			if ((typeof id === 'string') && (id.substring(0, 1) !== '#')) {
				return ('#' + id);
			} else {
				return (id);
			}
		},
		//Genera un identificador aleatorio para un objeto determinado
		randomIdGenerator: function (selectObject) {
			var id = 'rupRandomLayerId-' + $.rup_utils.autoGenerateIdNum;
			selectObject.attr('id', id).addClass('rupRandomLayerId');
			$.rup_utils.autoGenerateIdNum = $.rup_utils.autoGenerateIdNum + 1;
			return id;
		},
		//Función encargada de gestionar las url's de las aplicaciones en portal
		setNoPortalParam: function (url) {
			if (url !== undefined && url !== null) {
				if ($.rup_utils.readCookie('r01PortalInfo') !== null && url.match('R01HNoPortal') === null && (($('div.r01gContainer').length > 0)) || ($('div.r01gApplication').length > 0)) {
					return url + (url.match('\\?') === null ? '?' : '&') + 'R01HNoPortal=true';
				}
			}
			return url;
		},
		//Función encargada de detectar si la aplicación esta integrada en portal
		aplicatioInPortal: function () {
			if (!($.rup_utils.readCookie('r01PortalInfo') !== null && $('div.r01gContainer').length > 0)) {
				return false;
			} else {
				return true;
			}
		},
		//Funcion encargada de pasar las urls relativas a absolutas.
		//Esta diseñado para terminar con los problemas de comportamientos anómalo de los navegadores en la redirecciones relativas
		relToAbsUrl: function (url) {

			var urlPage = $(location);

			if (typeof url === 'string') {
				var fChar1 = url.substring(0, 1);
				var fChar2 = url.substring(1, 2);

				if ($.url(url).attr('protocol') === undefined || $.url(url).attr('protocol') === '') {
					if (fChar1 === '/') {
						if (fChar2 === undefined || fChar2 !== '/') {
							return (urlPage.attr('protocol') + '//' + urlPage.attr('host') + url);
						} else {
							return (urlPage.attr('protocol') + url);
						}
					} else if (fChar1 === '.') {
						if (fChar2 === undefined) {
							$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_utils.relToAbsUrlParamError') + url + $.rup.i18nParse($.rup.i18n.base, 'rup_utils.relToAbsUrlParamErrorEnd'));
							return (undefined);
						} else if (fChar2 === '/') {
                            let analyzedUrl = $.url(urlPage.attr('href'), true);
							return (analyzedUrl.attr('base') + analyzedUrl.attr('directory') + url.substring(2, url.length));
						} else if (fChar2 === '.') {
							var urlPageFragments = urlPage.attr('pathname').split('/');
							var urlPageLength = (urlPageFragments.length) - 2;
							if ((url.substring(2, 3) !== undefined) && (url.substring(2, 3) === '/')) {
                                let urlFragments = url.split('../');
                                let urlLength = (urlFragments.length) - 1;
								if (urlLength >= urlPageLength) {
									return (urlPage.attr('protocol') + '//' + urlPage.attr('host') + '/' + urlFragments[urlFragments.length - 1]);
								} else {
                                    let cade = '';
                                    for (let i = urlPageLength - urlLength; i > 0; i--) {
										cade = urlPageFragments[i] + '/' + cade;
									}
									return (urlPage.attr('protocol') + '//' + urlPage.attr('host') + '/' + cade + urlFragments[urlFragments.length - 1]);
								}
							} else {
                                let urlFragments = url.split('..');
                                let urlLength = (urlFragments.length) - 1;
								if (urlLength >= urlPageLength) {
									return (urlPage.attr('protocol') + '//' + urlPage.attr('host') + urlFragments[urlFragments.length - 1]);
								} else {
                                    let cade = '';
                                    for (let i = urlPageLength - urlLength; i > 0; i--) {
										cade = urlPageFragments[i] + '/' + cade;
									}
									return (urlPage.attr('protocol') + '//' + urlPage.attr('host') + '/' + cade + urlFragments[urlFragments.length - 1]);
								}
							}
						} else {
							$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_utils.relToAbsUrlParamError') + url + $.rup.i18nParse($.rup.i18n.base, 'rup_utils.relToAbsUrlParamErrorEnd'));
							return (undefined);
						}
					} else {
                        let analyzedUrl = $.url(urlPage.attr('href'), true);
						return (analyzedUrl.attr('base') + analyzedUrl.attr('directory') + url);
					}
				} else {
					return (url);
				}
			} else {
				$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_utils.relToAbsUrlParamFormatError'));
				return (undefined);
			}
		},
		printMsg: function (msg) {
			var ret = '';
			if (typeof msg === 'string') {
				return msg + '<br/>';
			} else if (typeof msg === 'object') {
				if (Array.isArray(msg)) {
					for (var i = 0; i < msg.length; i++) {
						ret += $.rup_utils.printMsgAux(msg[i], 1);
					}
					return ret;
				} else {
					ret += $.rup_utils.printMsgAux(msg, 1);
				}
			}
			return ret;
		},
		printMsgAux: function (msg, nivel) {
			var ret = '';
			if (typeof msg === 'string') {
				return $('<span>').append(msg)[0].outerHTML + '<br/>';
			} else if (typeof msg === 'object') {
				if (Array.isArray(msg)) {
					var ul = $('<ul>').addClass('rup-maint_feedbackUL');
					for (var i = 0; i < msg.length; i++) {
						//						if (typeof msg[i]==="string" || (typeof msg[i]==="object" && !Array.isArray(msg))){
						if (nivel === 1) {
							ul.append($('<li>').append($.rup_utils.printMsgAux(msg[i], nivel + 1)));
						} else {
							ul.append($.rup_utils.printMsgAux(msg[i], nivel + 1));
						}
					}
					return ret += ul[0].outerHTML;
				} else {
					var span = $('<span>');

					if (msg.style !== undefined) {
						span.addClass(msg.style);
					}

					if (msg.label !== undefined) {
						span.append(msg.label);
					}

					return span[0].outerHTML + '<br/>';
				}
			}
		},
		//Función encargada de recuperar todas las variables pasadas por QueryString (en la url)
		getUrlVars: function () {
			if ($.rup.getParams === undefined) {
				var vars = {},
					hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for (var i = 0; i < hashes.length; i++) {
					hash = decodeURIComponent(hashes[i]).split('=');
					vars[hash[0]] = hash[1];
				}
				$.rup.getParams = vars;
			}
			return $.rup.getParams;

		},
		//Función encargada de recuperar una variable especifica de las pasadas por QueryString (en la url)
		getUrlVar: function (name) {
			return $.rup_utils.getUrlVars()[name];
		},
		sortArray: function (array, sortFnc) {

			function defaultSortFnc(obj1, obj2) {
				return obj1 - obj2;
			}

			function bubbleSort(a, fnc) {
				var swapped;
				do {
					swapped = false;
					for (var i = 0; i < a.length - 1; i++) {
						if (fnc(a[i], a[i + 1]) < 0) {
							var temp = a[i];
							a[i] = a[i + 1];
							a[i + 1] = temp;
							swapped = true;
						}
					}
				} while (swapped);
			}

			if (!Array.isArray(array)) {
				return undefined;
			}

			if (typeof sortFnc === "function") {
				bubbleSort(array, sortFnc);
			} else {
				bubbleSort(array, defaultSortFnc);
			}
		},
		insertSorted: function (array, elem, sortFnc) {

			function defaultSortFnc(obj1, obj2) {
				return obj2 - obj1;
			}

			if (!Array.isArray(array)) {
				return undefined;
			}

			array.push(elem);

			if (typeof sortFnc === "function") {
				$.rup_utils.sortArray(array, sortFnc);
			} else {
				$.rup_utils.sortArray(array, defaultSortFnc);
			}

			return $.inArray(elem, array);
		},
		getRupValueAsJson: function (name, value) {
            var arrTmp, dotNotation = false,
				dotProperty, tmpJson, returnArray = [];

			if (name) {
				// Miramos si el name contiene notación dot
				arrTmp = name.split('.');
				if (arrTmp.length > 1) {
					dotNotation = true;
					dotProperty = arrTmp[arrTmp.length - 1];
				} else {
					dotProperty = arrTmp[0];
				}

				if (Array.isArray(value)) {

					//issue [utils] getRupValueAsJson provoca error con los arrays vacíos #24
					//https://github.com/UDA-EJIE/udaRUP/issues/24
					if (value.length !== 0) {
						// Devolvemos un array de resultados.
						for (var i = 0; i < value.length; i++) {
							tmpJson = {};
							if (dotNotation) {
								tmpJson[dotProperty] = value[i];
								returnArray.push(tmpJson);
							} else {
								tmpJson[dotProperty] = value[i];
								returnArray.push(tmpJson);
							}
						}

						return returnArray;
					}

				} else {
					// Devolvemos un único valor.
					tmpJson = {};
					tmpJson[dotProperty] = value;

					return tmpJson;
				}
			}

			return null;
		},
		getRupValueWrapped: function (name, value) {
            var arrTmp,
				dotProperty, wrapObj = {};
			if (name) {
				// Miramos si el name contiene notación dot
				arrTmp = name.split('.');
				if (arrTmp.length > 1) {
					dotProperty = arrTmp[arrTmp.length - 1];
				} else {
					return value;
				}

				wrapObj[dotProperty] = value;

				return wrapObj;
			}

			return null;
		},
		swing2Top: function () {
			if (!$.rup_utils.swinging) {
				$.rup_utils.swinging = true;
				$('html, body').animate({
					scrollTop: 0
				}, '1000', 'swing', function () {
					$.rup_utils.swinging = false;
				});
			}
		},
		format: function (_format) {
			var args = $.makeArray(arguments).slice(1);
			if (_format == null) {
				_format = '';
			}
			return _format.replace(/\{(\d+)\}/g, function (m, i) {
				return args[i];
			});
		},
		deepCopy: function (obj, deep) {
			var deepCont = 0;
			var objBox = [];
			var fnc = function (obj) {
				var objtmp;
				if (obj instanceof Array) {
					objtmp = [];
				} else {
					objtmp = {};
				}
				if (obj === null || obj === undefined) {
					return {};
				}
				Object.keys(obj).forEach(function (e) {
					if (['string', 'number', 'boolean', 'function'].includes(typeof obj[e])) {
						objtmp[e] = obj[e];
					} else {
						if (!objBox.includes(obj[e]) && deepCont <= deep) {
							objBox.push(obj[e]);
							deepCont++;
							objtmp[e] = $.rup_utils.deepCopy(obj[e]);
						} else {
							if (deepCont > deep) {
								objtmp[e] = obj[e];
							} else {
								objtmp[e] = '__ciclico__';
							}
						}
					}
				});
				return objtmp;
			};
			return fnc(obj);
		},
		/**
	     * Comprueba si el parámetro es un número. 
	     * Sustituye al método isNumeric de jQuery que fue deprecado en la versión 3.3.
	     *
	     * @name isNumeric
	     * @function
	     * @since UDA 5.1.0
	     *
	     * @param {number|string|boolean|object} field - Campo a comprobar.
	     *
	     * @return {boolean} Indica si es un número.
	     * 
	     * @example
		 * $.rup_utils.isNumeric(6);
	     */
		isNumeric: function (field) {
			return !isNaN(parseFloat(field)) && isFinite(field);
		}
	});

	//Utilidades de los formularios
	$.fn.serializeToObject = function () { //Para enviar los campos que contienen valor (!= "")
		var o = {},
			a = this.serializeArrayWithoutNulls();
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value;
			}
		});
		return o;
	};

	$.fn.serializeArrayWithoutNulls = function () { //crea un array con campos de un formulario que tienen valor !=""
		return this.map(function () {
				return this.elements ? jQuery.makeArray(this.elements) : this;
			})
			.filter(function () {
				return this.name && !this.disabled &&
					(this.checked || (/select|textarea/i).test(this.nodeName) ||
						(/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i).test(this.type));
			})
			.map(function (i, elem) {
				var val = jQuery(this).val();
				if ((jQuery(this).hasClass('numeric') || jQuery(this).hasClass('datepicker')) /*&& val === ""*/ ) {
					return {
						name: elem.name,
						value: null
					};
				}
				return val === null || val === '' ?
					null :
					Array.isArray(val) ?
                        jQuery.map(val, function (val) {
						return {
							name: elem.name,
							value: val
						};
					}) : {
						name: elem.name,
						value: val
					};
			}).get();
	};

	$.fn.serializeObject = function () { //Para enviar los campos nulos con null en vez de en blanco
		var o = {},
			a = this.serializeArrayNull();
		$.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value;
			}
		});
		return o;
	};

	$.fn.serializeArrayNull = function () {
		return this.map(function () {
				return this.elements ? jQuery.makeArray(this.elements) : this;
			})
			.filter(function () {
				return this.name && !this.disabled &&
					(this.checked || (/select|textarea/i).test(this.nodeName) ||
						(/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i).test(this.type));
			})
			.map(function (i, elem) {
				var val = jQuery(this).val();
				if ((jQuery(this).hasClass('numeric') || jQuery(this).hasClass('datepicker')) && val === '') {
					return {
						name: elem.name,
						value: null
					};
				}
				return val === null ?
					null :
					Array.isArray(val) ?
                        jQuery.map(val, function (val) {
						return {
							name: elem.name,
							value: val
						};
					}) : {
						name: elem.name,
						value: val
					};
			}).get();
	};
	
	/**
     * Elimina el campo autogenerado por el componente combo de un objeto. 
     * Dicho campo sólo sirve para gestión interna, por lo tanto, es seguro y recomendable eliminarlo.
     *
     * @name deleteMulticomboLabelFromObject
     * @function
     * @since UDA 4.2.2
     *
     * @param {object} obj - Objeto del que se quiere eliminar el campo autogenerado.
     * @param {object} container - Contenedor del componente.
     */
	$.fn.deleteMulticomboLabelFromObject = function (obj, container) {
		if (obj !== undefined && obj !== null && container !== undefined && container !== null) {
			Object.keys(obj).filter(function (key) {
				// Se escapan todos los puntos para evitar errores sintácticos
				const escapedKey = key.replaceAll('.', '\\.');
				// Si container es un fila de la tabla (tr) significa que la función ha sido llamada desde rup.table.inlineEdit y es necesario añadir el sufijo _inline
				const suffix = container.is('tr') ? '_inline' : '';
				const element = container.find("[name$=" + escapedKey + suffix + "]");
	        	if (element.length > 1 && $(element[0]).prop('multiple')) {
	        		delete obj["_" + key];
				}
	        });
		}
	};
	
	/**
	 * Elimina el campo autogenerado por el componente autocomplete de un objeto. 
	 * Dicho campo sólo sirve para gestión interna, por lo tanto, es seguro y recomendable eliminarlo.
	 *
	 * @name deleteAutocompleteLabelFromObject
	 * @function
	 * @since UDA 4.2.2
	 *
	 * @param {object} obj - Objeto del que se quiere eliminar el campo autogenerado.
	 */
	$.fn.deleteAutocompleteLabelFromObject = function (obj) {
		if (obj !== undefined && obj !== null) {
			const flattenedObj = $.fn.flattenJSON(obj);
			
			// Nos aseguramos de que el campo _label provenga de un autocomplete
			Object.keys(flattenedObj).filter(function (key) {
				if (/_label$/.test(key)) {
					if (Object.prototype.hasOwnProperty.call(flattenedObj, key.substring(0, key.indexOf('_label')))) {
						// Necesario hacer un split por si la clave a usar está anidada
						const keys = key.split('.');
						
						// Eliminamos el _label
						const recursiveRemoveKey = function (object, deleteKey) {
							if (object[deleteKey] != undefined) {
								delete object[deleteKey];
							} else {
								Object.values(object).forEach(function (val) { 
									if (typeof val === 'object') {
										recursiveRemoveKey(val, deleteKey);
									}
								})
							}
						}
			
						recursiveRemoveKey(obj, keys[keys.length - 1]);
					}
				}
			})
		}
	};
	
	/**
     * Convierte un JSON con múltiples niveles en un JSON con un único nivel.
     *
     * @name flattenJSON
     * @function
     * @since UDA 5.0.2
     *
     * @param {object} originalObj - Objeto con varios niveles (admite también un único nivel, pero no tiene sentido llamar a la función en ese caso).
     * @param {object} flattenedObj - Objeto con un único nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma.
     * @param {string} extraKey - Clave necesaria cuando hay más de un nivel. Se incluye entre los parámetros porque la función lo usará si se llama a sí misma.
     * 
     * @return {object} Objeto con un único nivel.
     */
	$.fn.flattenJSON = function (originalObj, flattenedObj = {}, extraKey = '') {
		for (let key in originalObj) {
			if (typeof originalObj[key] !== 'object') {
				flattenedObj[extraKey + key] = originalObj[key];
			} else {
				$.fn.flattenJSON(originalObj[key], flattenedObj, `${extraKey}${key}.`);
			}
		}
		return flattenedObj;
	};
	
	/**
     * Comprueba si el parámetro ha sido cifrado por Hdiv.
     *
     * @name isHdiv
     * @function
     * @since UDA 5.0.0 (backported)
     *
     * @param {string} id - Identificador de la entidad.
     *
     * @return {boolean} Verdadero si el parámetro ha sido cifrado por Hdiv.
     */
	$.fn.isHdiv = function (id) {
		return /(.+)-([0-9a-fA-F]{3})-(.{8}-([0-9a-fA-FU]{1,33})-\d+-.+)/.test(id);
	};
	
	/**
     * Procesa el identificador recibido para poder devolver la parte que no altera su cifrado entre peticiones.
     * Es útil cuando se necesita comparar identificadores cifrados.
     *
     * @name getStaticHdivID
     * @function
     * @since UDA 5.0.0 (backported)
     *
     * @param {string} id - Identificador de la entidad.
     *
     * @return {string} Identificador de la entidad con la parte dinámica del cifrado eliminada.
     */
	$.fn.getStaticHdivID = function (id) {
		let regex = /([0-9a-fA-F]+)-([0-9a-fA-F]+)-([0-9a-fA-F]+)$/;
		
		if (regex.test(id)) {
			id = id.replace(regex, '');
		}
		
		return id;
	};
	
	/**
     * Obtiene el parámetro HDIV_STATE de la URL o de un formulario.
     *
     * @name getHDIV_STATE
     * @function
     * @since UDA 5.0.0 (backported)
     *
     * @param {boolean} hasMoreParams - Parámetro necesario para peticiones GET. Se utilizará para saber si el parámetro HDIV_STATE es el único existente en la URL.
     * @param {object} $form - Formulario del que extraer el parámetro HDIV_STATE. Este parámetro tiene prioridad respecto a hasMoreParams, por lo tanto, si se recibe será el que se use.
     *
     * @return {string} Parámetro HDIV_STATE.
     */
	$.fn.getHDIV_STATE = function (hasMoreParams, $form) {
		let hdivStateParam = '';
		
		// Cuando se recibe un formulario se extrae directamente de ahí el parámetro HDIV_STATE
		if ($form != undefined && $form.length == 1) {
			let fieldHdiv = $form.find('input[name="_HDIV_STATE_"]');
			hdivStateParam = fieldHdiv.length == 1 ? fieldHdiv.val() : '';
		} else {
			// Si el parámetro HDIV_STATE está disponible se obtiene y se devuelve, en caso contrario, se devuelve vacío
			let searchParams = new URLSearchParams(window.location.search);
			hdivStateParam = searchParams.get('_HDIV_STATE_');
			let prefix = '';
			
			// Si se ha especificado un valor booleano en el parámetro recibido es porque se trata de una petición GET
			if (hasMoreParams !== undefined && hasMoreParams !== null && typeof hasMoreParams === "boolean") {
				prefix = (hasMoreParams ? '&' : '?') + '_HDIV_STATE_=';
			}
		    
		    if (hdivStateParam != undefined && hdivStateParam != null && hdivStateParam != '') {
		    	hdivStateParam = prefix + hdivStateParam;
		    } else {
		    	hdivStateParam = '';
		    }
		}
	    
	    return hdivStateParam;
	};
	
	/**
     * Reinicia por completo los autocomplete de un formulario para que no sigan filtrando.
     *
     * @name resetAutocomplete
     * @function
     * @since UDA 4.2.2
     *
     * @param {string} type - Valor del atributo type.
     * @param {object} obj - Formulario del que obtener los autocompletes a reiniciar.
     */
	$.fn.resetAutocomplete = function (type, obj) {
		jQuery.each($('input[ruptype=autocomplete][type=' + type + ']', obj), function (index, elem) {
        	$("#" + elem.id).rup_autocomplete("setRupValue", "");
        });
	};

	jQuery.rup_utils.base64 = {
		// private property
		_keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
		// public method for encoding
		encode: function (input) {
			var output = '';
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = jQuery.rup_utils.base64._utf8_encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
					this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
					this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
			}
			return output;
		},
		// public method for decoding
		decode: function (input) {
			var output = '';
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
            input = input.replace(/[^A-Za-z0-9+/=]/g, '');
			while (i < input.length) {
				enc1 = this._keyStr.indexOf(input.charAt(i++));
				enc2 = this._keyStr.indexOf(input.charAt(i++));
				enc3 = this._keyStr.indexOf(input.charAt(i++));
				enc4 = this._keyStr.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = jQuery.rup_utils.base64._utf8_decode(output);
			return output;
		},
		// private method for UTF-8 encoding
		_utf8_encode: function (string) {
			string = string.replace(/\r\n/g, '\n');
			var utftext = '';
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utftext += String.fromCharCode(c);
				} else if ((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				} else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}
			}
			return utftext;
		},
		// private method for UTF-8 decoding
		_utf8_decode: function (utftext) {
			var string = '';
			var i = 0;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;
			while (i < utftext.length) {
                c1 = utftext.charCodeAt(i);
                if (c1 < 128) {
                    string += String.fromCharCode(c1);
					i++;
                } else if ((c1 > 191) && (c1 < 224)) {
					c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
					i += 2;
				} else {
					c2 = utftext.charCodeAt(i + 1);
					c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		}
	};

}));
