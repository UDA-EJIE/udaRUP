/* eslint-disable no-useless-escape */

/*!
 * Copyright 2021 E.J.I.E., S.A.
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
 * @summary Componente RUP Select.
 * @module rup_select
 * @see El componente está basado en el plugin {@link https://select2.org//|Select2}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link https://select2.org//|aquí}.
 * @example
 * $("#idSelect").rup_select({
 *	source : "selectSimple/remote",
 *	sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"}
 * });
 */

/*global define */
/*global jQuery */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'select2'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÁN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************


    var rup_select = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_select', rup_select));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_select('extend', {
        /**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor del select.
         *
         * @function  getRupValue
         * @return {string | number} - Devuelve el valor actual del componente seleccionado por el usuario.
         * @example
         * $("#idSelect").rup_select("getRupValue");
         */
        getRupValue: function () {
            var $self = $(this),
                settings = $self.data('settings'), value;

            let values = $self.select2('data')
            
            if (values == undefined || values.length == 0) {
            	value = '';
            }else if (values.length == 1) {
                value = values[0].id;
            }else{
            	value = [];
            	$.each(values, function (ind, elem) { 
            		value.push(elem.id); 
            	}); 
            }

            if (settings.submitAsJSON !== undefined && settings.submitAsJSON) {
            	let name = $self.attr('name');
            	if(name == undefined){
            		name = $self.attr('id');
            	}
                return jQuery.rup_utils.getRupValueAsJson(name, value);
            }
            
            return value;


        },
        /**
         * Método utilizado para asignar el valor al componente. Este método es el utilizado por 
         * el resto de componentes RUP para estandarizar la asignación del valor al Select.
         *
         * @function  setRupValue
         * @param {string | number} param - Valor que se va a asignar al componente.
         * @example
         * $("#idSelect").rup_select('setRupValue', 'Si');
         */
        setRupValue: function (param) {
            var $self = $(this),
                settings = $self.data('settings');

            //Tipo de select
            if (this.length === 0 || (settings !== undefined && !settings.multiple)) {
                //Simple 
            	 if (settings.data === undefined && settings.options !== undefined){//si es remoto crear el option
 	              	let data = $.grep(settings.options, function (v) {
	                    return v.id === param;
	                  });
 	              	if(data[0] !== undefined && $('#'+ settings.id).find("option[value='" + data[0] .id + "']").length == 0){
 	              	   data = data[0];
 	              	   let newOption = new Option(data.text, data.id, false, false);
 	                   if (data.style != null) {
 	                      newOption.setAttribute('style', data.style);
 	                      newOption.setAttribute('imgStyle', data.imgStyle);
 	                    }
 	              		$('#' + settings.id).append(newOption);
 	              	}
            	}
            	$self.val(param).trigger('change');
            	$('#' + settings.id).rup_select('change')
            } else {
                //Multiple > multiselect - falta
            	$('#' + settings.id).select2('val', [param]);
            }
        },
        /**
         * Método que limpia el valor seleccionado en el select. En el caso de selección múltiple los valores seleccionados.
         *
         * @function clear
         * @example
         * $("#idSelect").rup_select("clear");
         */
        clear: function () {
        	var $self = $(this);
            //init de select
            if (this.length > 0) {
                //Simple y multi
            	$self.val(null).trigger('change');
            } 
        },
        /**
         * Método que lanza el evento change del componente.
         *
         * @function change
         * @example
         * $("#idSelect").rup_select("change");
         */
        change: function () {
            //Tipo de select
            if ($(this).data('settings').change) {
                $(this).data('settings').change();
            }
        },
        /**
         * Selecciona todos los elementos en el caso de tratarse de un select multilesección.
         *
         * @function  checkAll
         * @example
         * $("#idSelect").rup_select("checkAll");
         */
        checkAll: function () {
            //Tipo de select
            if ($(this).data('settings').multiple) {
                //Multiple > multiselect
            	var selectedItems = [];
            	var allOptions = $("#"+$(this)[0].id+" option");
            	allOptions.each(function() {
            	    selectedItems.push( $(this).val() );
            	});
            	$(this).rup_select('setRupValue', selectedItems);
            } else {
                //Simple > selectmenu
                alert('Función no soportada.');
            }
        },
        /**
         * Selecciona el elemento del select que contiene como texto el indicado. En caso de no existir el texto a buscar el se no sufrirá cambios En el caso de selección múltiple el parámetro será un array.
         *
         * @function  selectByLabel
         * @param {string | string[]} param - Parámetro utilzado para determinar los elementos a seleccionar.
         * @example
         * // Simple
         * $("#idSelect").rup_select("selectByLabel", "No");
         * // Multiple
         * $("#idSelect").rup_select("selectByLabel", ["No","Si"]);
         */
        selectByLabel: function (param) {
            //Tipo de select
        	if($(this).data('settings').options !== undefined ){
        		let options = $(this).data('settings').options ;
	            if (!$(this).data('settings').multiple) {
	                //Simple > selectmenu
	              	let data = $.grep(options, function (v) {
	                    return v.text === param;
	                  });
	              	if(data[0] !== undefined){
	              		$(this).rup_select('setRupValue', data[0].id);
	              	}
	                //Si se ha cargado un elemento válido
	             /*   if (elementSet) {
	                    //Lanzar cambio para que se recarguen hijos
	                    var hijos = $(this).data('childs');
	                    if (hijos !== undefined) {
	                        for (let i = 0; i < hijos.length; i = i + 1) {
	                            $('#' + hijos[i]).rup_combo('reload', hijos[i]);
	                        }
	                    }
	                }*/
	            } else {//Ejemplo $('#idSelect').rup_select('selectByLabel',['php_value','java_value'])
	            	let datos = [];
	            	$.each(param, function (key, value) {
	            		let data = $.grep(options, function (v) {
		                    return v.text === value;
		                });
	            		if(data[0] !== undefined){
	            			datos.push(data[0].id);
	            		}
	                  });
	            	$(this).rup_select('setRupValue', datos);
	            }
        	}
        },
        /**
         * Método que devuelve el label asociado al valor seleccionado en el select. En el caso de la selección múltiple se devolverá un array.
         *
         * @function  label
         * @return {string | string[]} - Texto del elemento o elementos seleccionado.
         * @example
         * $("#idSelect").rup_select("label");
         */
        label: function () {
            //Tipo de select
        	let data = $(this).select2('data');
            if (!$(this).data('settings').multiple) {
            	 return data[0].text;
            } else {
                //Multiple > multiselect
                var retorno = [];
                for (let i = 0; i < data.length; i++) {
                    retorno.push(data[i].text);
                }
                return retorno;
            }
        },
        /**
         * Devuelve el índice de la opción seleccionada en el select (empezando en 0). En el caso de la selección múltiple se devolverá un array.
         *
         * @function  index
         * @return {number | number[]} - Índice del elemento o elementos seleccionados.
         * @example
         * $("#idSelect").rup_select("index");
         */
        index: function () {
            //Tipo de select
        	if($(this).data('settings').options !== undefined ){
        		let options = $(this).data('settings').options ;
        		let count = 0;
        		let data = $(this).select2('data');
	            if (!$(this).data('settings').multiple) {
	                //Simple > selectmenu
	            	
	            	$.each(options, function (key, value) {
	              		if(value.id.toString() === data[0].id.toString()){
	              			count = key + 1;
	              			return;
	              		}
	              	});
	            	
	   
	            } else {
	            	count = [];
	            	$.each(options, function (key, value) {
	            		$.each(data, function (cont, valor) {
	                  		if(value.id.toString() === valor.id.toString()){
	                  			count.push(key + 1);
		              			return;
		              		}
	            		});
	                  });
	            }
	            
	            return count;
        	}

        },
        /**
         * Deshabilita el select.
         *
         * @function  disable
         * @example
         * $("#idSelect").rup_select("disable");
         */
        disable: function () {
            //Tipo de select
            var $self = $(this);
            $self.prop("disabled", true)
        },
        /**
         * Habilita el select.
         *
         * @function  enable
         * @example
         * $("#idSelect").rup_select("enable");
         */
        enable: function () {
        	var $self = $(this);
            $self.prop("disabled", false);
        },
        /**
         * Indica si el select está deshabilitado o no.
         *
         * @function  isDisabled
         * @param {boolean} - Devuelve si el select está deshabilitado o no.
         * @example
         * $("#idSelect").rup_select("isDisabled");
         */
        isDisabled: function () {
            if ($(this).attr('disabled') === 'disabled') {
                return true;
            } else {
                return false;
            }
        },
        /**
         * Vacía y deshabilita el select sobre el que se aplica así como todos los combos que depende de él. Su uso principalmente es interno para las peticiones remotas.
         *
         * @function  disableChild
         * @example
         * $("#idCombo").rup_combo("disableChild");
         */
        disableChild: function () {
            if($(this).hasClass('rup_combo')){
                if($(this).attr('multiple')==='multiple'){
                    $(this).rup_combo('setRupValue', []);
                } else {
                    $(this).rup_combo('setRupValue', '');
                }
            }
            //Vaciar combo, deshabilitarlo
            $(this).empty().append('<option></option>').rup_combo('disable');
            //Eliminar texto que se muestra
            $('#' + $(this).attr('id') + '-button span:first-child').text('');
            //Propagar evento de selección a hijos (recursivo)
            var hijos = $(this).data('childs');
            if (hijos !== undefined) {
                for (let i = 0; i < hijos.length; i = i + 1) {
                    $('#' + hijos[i]).rup_combo('disableChild');
                }
            }
        },
        /**
         * Realiza una recarga de los select.
         *
         * @function   reload
         * @example
         * $("#idSelect").rup_select("reload");
         */
        reload: function () {
        	let settings = $(this).data('settings');
        	$(this).select2("destroy");

        	$(this).select2(settings);
        },
        /**
         * Cambia el source del select y recarga el componente para que este comience a usarlo.
         *
         * @function setSource
         * @param {string} source - Source desde el cual se obtendran los datos a mostrar.
         * @example
         * $("#idSelect").rup_select("setSource", source);
         */
        setSource: function (source) {
        	if (source !== undefined && source !== '') {
            	let $self = $(this);
            	let settings = $self.data().settings;
            	if($self.data().settings.data === undefined){//remoto
            		settings.url = source;
            		settings.ajax = undefined;
            	}else{//local
            		settings.data = source;
            	}
            	settings.options = undefined;
            	$self.data('settings',settings);
            	//$self.select2("destroy");
            	//$self.find('option').remove();
            	//$self.rup_select(settings);
            	$self.empty();
            	$self.select2({
            	    data: settings.data
            	});
        	}
    	}
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_select('extend', {
       
        /**
         * Selecciona el elemento correspondiente al label indicado
         *
         * @function  _selectLabel
         * @private
         * @param {object} selector - Referencia al objeto jQuery del combo.
         * @param {object} param - Value correspondiente.
         */
        _selectLabel: function (selector, param) {
            var $option;
            for (let i = 0; i < $('option', selector).length; i = i + 1) {
                $option = jQuery('option:eq(' + i + ')', selector);
                if (jQuery('option:eq(' + i + ')', selector).text() === param) {
                    $(selector).selectmenu('index', $option.prop('index'));
                    return true;
                }
            }
            return false;
        },
        /**
         * Obtener la opción vacía a partir del fichero de internacionalización de la aplicación o del fichero por defecto.
         *
         * @function  _getBlankLabel
         * @private
         * @param {string} id - Identificador del fichero
         */
        _getBlankLabel: function (id) {
            var app = $.rup.i18n.app;
            // Comprueba si el select tiene su propio texto personalizado
            if (app[id] && app[id]._blank) {
                return app[id]._blank;
            }
            // Comprueba si la aplicacion tiene un texto definido para todos los blank
            else if (app.rup_select && app.rup_select.blank) {
                return app.rup_select.blank;
            }
            // Si no hay textos definidos para los blank obtiene el por defecto de UDA
            return $.rup.i18n.base.rup_select.blankNotDefined;
        },
       
        /**
         * Obtener valores de los combos padres (si no están cargados o valores 'vacíos' devuelve null). En caso de disponer de varios combos padres se devolverán separados por un caracter delimitador.
         *
         * @function  _getParentsValues
         * @private
         * @param {object[]} settings - Array con los elementos de configuración.
         * @param {boolean} remote - Determina si la fuente de datos es remota o no.
         * @return {string} - Devuelve los values seleccionados de los combos padres.
         */
        _getParentsValues: function (settings, remote, multiValueToken) {
            let retorno = '';
            var parent = [];
            if(settings.parent == undefined){
            	return '';
            }

            if (typeof settings.parent == 'string') {
              parent.push(settings.parent);
            } else {
              parent = settings.parent;
            } 
               
            let parentsFull = 0;
            $.each(parent, function (idx, parentId) {
	            if (parentId != undefined && $('#' + parentId).val() != null && $('#' + parentId).val().trim() !== '') {
	            	if(settings.blank == $('#' + parentId).val()){
	            		retorno = '';
	            	}else{
	            		if(remote){//PAra remoto
	            			retorno += $('#' + parentId).attr('name') + '=' + $('#' + parentId).val() + '&';
	            		}else{ // PAra local
	            			if(retorno != ''){
	            				retorno = retorno + multiValueToken + $('#' + parentId).val();
	            			}else{
	            				retorno = $('#' + parentId).val();
	            			}
	            			
	            		}
	            		parentsFull = parentsFull +1;
	            	}
	            } 
            });
            
            if(parentsFull < parent.length){//si no estan todos los padres no se busca.
            	return '';
            }
            
            //Evitar & o multiValueToken finales
            if (retorno !== '' && remote) {
              retorno = retorno.substring(0, retorno.length - 1);
            }
            return retorno;
        },
       
        /**
         * Procesa el conjunto de registros devueltos por una petición sobre un origen de datos local.
         *
         * @function  _parseLOCAL
         * @private
         * @param {object[]} data - Array de registros obtenidos a partir del origen de datos.
         * @param {object} i18nId - Opciones de idioma.
         * @param {jQuery} isParent - Si tiene datos en forma parent.
         */
        _parseLOCAL: function (data,i18nId,isParent) {
            let text;
            let array = data;
            if(isParent){//Si es padre llamar a la recursividad
            	$.each(data, function (key, value) {
            		 _this._parseLOCAL(data[key],i18nId,false);
            	});
            }else{
	            for (let i = 0; i < array.length; i = i + 1) {
	                if (typeof array[i] === 'object') { //multi-idioma
	                    if (array[i].i18nCaption) {
	                        text = $.rup.i18nParse($.rup.i18n.app[i18nId], array[i].i18nCaption);
	                    } else {
	                        text = array[i].text;
	                    }
	                    array[i].text = text;
	                }else{
	                	return ;
	                }
	            }
            }
            
            return array;
        },
       
        /**
         * Procesa el conjunto de registros devueltos por una petición sobre un origen de datos remoto.
         *
         * @function  _parseREMOTE
         * @private
         * @param {object[]} array - Array de registros obtenidos a partir del origen de datos.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         * @param {string} optGroupKey - Identificador del optionGroup al que pertenece.
         */
        _parseREMOTE: function (array, settings, html, optGroupKey) {
            var remoteImgs = settings.imgs ? settings.imgs : [],
                item;
            for (let i = 0; i < array.length; i = i + 1) {
                item = array[i];
                if (item.style) {
                    remoteImgs[remoteImgs.length] = {};
                    if (optGroupKey == null) {
                        remoteImgs[remoteImgs.length - 1][item.value] = item.style;
                    } else {
                        remoteImgs[remoteImgs.length - 1][optGroupKey + '###' + item.value] = item.style;
                    }
                    settings.imgs = remoteImgs;
                }
                html.append($('<option>').attr('value', item.value).text(settings.showValue ? item.value + settings.token + item.label : item.label));
            }
        },
        
        /**
         * Prepara la petición AJAX que se va a realizar para obtener los registros a partir de un origen remoto. Se añaden las cabeceras RUP correspondientes para realizar la serialización json de manera correcta.
         *
         * @function  _ajaxBeforeSend
         * @private
         * @param {object} xhr - Objeto xhr que se va a enviar en la petición
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         */
        _ajaxBeforeSend: function (xhr, settings, html) {
            //Crear combo (vacío) y deshabilitarlo
            if (html !== undefined) {
                $('#' + settings.id).replaceWith(html);
            } //Si no es 'reload' se debe inicializar vacío
            this._makeCombo(settings);
            $('#' + settings.id).rup_combo('disable');

            //LOADING...
            $('#' + settings.id + '-button span:first-child').removeClass("ui-icon ui-icon-triangle-1-s").addClass('rup-combo_loadingText').text($.rup.i18n.base.rup_combo.loadingText);
            var icon = $('#' + settings.id + '-button span:last-child');
            $(icon).removeClass('ui-icon-triangle-1-s');
            $(icon).text(''); // Evita errores de visualización con el icono
            $(icon).addClass('rup-combo_loading');

            //Cabecera RUP
            xhr.setRequestHeader('RUP', $.toJSON(settings.sourceParam));
        },
       
        /**
         * Procesa la respuesta de la petición AJAX en el caso de que se haya producido un error en la misma.
         *
         * @function  _ajaxError
         * @private
         * @param {object} xhr - Objeto xhr enviado en la respuesta.
         * @param {string} textStatus - Cadena identificadora del error que se ha producido en la petición.
         * @param {object} errorThrown - Objeto error correspondiente al que se ha producido en la petición.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         */
        _ajaxError: function (xhr) {
            if (xhr.responseText !== null && xhr.responseTex !== undefined) {
                $.rup.showErrorToUser(xhr.responseText);
            } else {
                $.rup.showErrorToUser($.rup.i18n.base.rup_combo.ajaxError);
            }
        },
        
         /**
         * Carga la opción remoto.
         *
         * @function  _loadRemote
         * @private
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @return {jQuery} - Objeto jQuery con referencia al elemento que contiene el foco.
         */

        _loadRemote: function (settings,first) {
        	var rupSelect = this;
        	 	settings.ajax = {
		    url: settings.url,
		    dataType: settings.dataType,
		    processResults: function (response) 
		    	{//Require id y text, podemos permitir que no venga.
		    	if(settings.placeholder != undefined ){
		    		let elBlank = response.find(x => x.id == settings.blank);
		    		if(elBlank == undefined){
		                response.unshift({
		                    id: settings.blank,
		                    text: settings.placeholder
		                  });
		    		}
		    	}
		    		if(settings.groups){//PArsear para grupos.
		    			let results = [];
		    			$.each(response, function (index, value) {
		    				let key = Object.keys(value)[0];
		    				results[index] = {'text':key,'children':value[key]};
		    			});

		    			response =  results;
		    		}
		    		
		    		settings.options = response;
		    		$('#' + settings.id).data('settings', settings);
	    		     return {
 		    	 		results: response
 		     		};
		    	},
		    cache: false,
		    data: function () {
		    			return _this._getParentsValues(settings, true);
		    		},
		    error: function (xhr, textStatus, errorThrown) {
		               if (settings.onLoadError !== null) {
		                   jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
		               } else {
		               	//rupSelect._ajaxError(xhr, textStatus, errorThrown);
		            	   console.log(textStatus);
		               }
		    }		
    	};
        	 	
        	 	if(settings.selected){
        	 		settings.firstLoad = true;
        	 	}
        	 	if(settings.parent != undefined 
        	 			&& ($('#' + settings.parent).val() == null || $('#' + settings.parent).val().trim() === '')){
        	 		settings.firstLoad = false;
        	 	}

				let __cache = [];
				let __lastQuery = null;
		    	settings.ajax.transport = function(params, success, failure) {
					//retrieve the cached key or default to _ALL_
			        var __cachekey = params.data || '_ALL_';
			        if (__lastQuery !== __cachekey) {
			          //remove caches not from last query
			          __cache = [];
			        }
			        __lastQuery = __cachekey;
			        if (settings.cache == true && 'undefined' !== typeof __cache[__cachekey]) {
			          //display the cached results
			          success(__cache[__cachekey]);
			          return; 
			        }
			        
			        let $request = undefined;
			        if (settings.parent) {
			        	var datosParent = _this._getParentsValues(settings, true);
			        	if(datosParent != ''){
			        		$request = $.ajax(params);
			        	}
			        }else{
			        	$request = $.ajax(params);
			        }
			        if($request != undefined){
				        $request.then(function(data) {//Vuelve la peticion
				          //store data in cache
				          __cache[__cachekey] = data;
				          //display the results
				          $('#' + settings.id).rup_select("enable");
				          success(__cache[__cachekey]);
				          let seleccionado = $.grep(data, function (v) {
			                    return v.id == settings.selected;
			                  });
				          //Si es el mismo, no cambia porque esta abirendo
				          if(seleccionado !== undefined && seleccionado.length == 1 && $('#' + settings.id).rup_select('getRupValue') != seleccionado[0].id){
				        	  $('#' + settings.id).rup_select('setRupValue',seleccionado[0].id);
				          }else{
				        	  //$("#" + settings.id).trigger('change');
				          }
				          $('#' + settings.id).data('settings', settings);
	              		  $('#' + settings.id).triggerHandler('selectAjaxSuccess', [data]);
				        });
				        $request.fail(failure);
			        }else{//cerrar
			        	$('#' + settings.id).select2('close');
			        }
			        return $request;
				}
		    	
		    	
			if(settings.ajax !== undefined){
		    	if(settings.data !== undefined){//PAra añadir más parametros de busqueda
		    		settings.ajax.data = settings.data;
		    	}
		    	if(settings.sourceParam){//modifica el header para parsear la response
		    		settings.ajax.headers = {'RUP':$.toJSON(settings.sourceParam)};
		    	}
		    	if(settings.processResults){//modifica los results
		    		settings.ajax.processResults = settings.processResults;
		    	}
			}
	
			let selectInit = $('#' + settings.id).select2(settings);
    	 	if(settings.firstLoad){//ejecutar los datos
    	 		var $el = $('#' + settings.id);
    	 		let $search = $el.data('select2').dropdown.$search || $el.data('select2').selection.$search;
    	 		$search.trigger('keyup');
    	 		$el.select2('close');
    	 	}
 
        },
        /**
         * Método de inicialización del componente.
         *
         * @function  _textIcon
         * @private
         * @param {object} data - Dato que llega, por cada registro.
         */
        _textIcon: function (data) {
        	let stylePosition = 'M';//B - Before , M - middle , A - After
        	// adjust for custom placeholder values, restaurar
            if (data.stylePosition === undefined) {
              //usar la de defecto
              data.stylePosition = stylePosition;
            }

            let _span = $('<span/>');

            let icon = $('<i class="mdi mdi-' + data.style + '"></i>');
            if(data.imgStyle){//en lugar d mdi,clase icon.
            	_span.addClass(data.style );
            	icon = $('<span class="ui-selectmenu-item-icon ui-icon "></span>');
            	if(data.stylePosition.toUpperCase() === 'M'){
            		data.stylePosition = 'B';// en caso de ser span, no admite texto en medio
            	}
            }

            if (data.stylePosition.toUpperCase() === 'M') {
              icon.prepend(data.text);
            } else if (data.stylePosition.toUpperCase() === 'B') {
              _span.prepend(data.text);
            }

            _span.prepend(icon);

            if (data.stylePosition.toUpperCase() === 'A') {
              _span.prepend(data.text);
            }

            return _span;
        },
        /**
         * Método de inicialización del componente.
         *
         * @function  _init
         * @private
         * @param {object} args - Parámetros de inicialización del componente.
         */
        _init: function (args) {
        	_this = this;
        	global.initRupI18nPromise.then(() => {
	            if (args.length > 1) {
	                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
	            } else {
	                //Se recogen y cruzan las paremetrizaciones del objeto
	                var settings = $.extend({}, $.fn.rup_select.defaults, args[0]),
	                    html, loadAsLocal = false,
	                    isValidableElem = false,
	                    attrs;
	
	                //Se recoge el tabindex indicado en el elemento
	                settings.tabindex = $(this).attr('tabindex');
	
	                //Sobreescribir literales por defecto para multiselect:REVISAR
	               // $.extend($.ech.multiselect.prototype.options, $.rup.i18n.base.rup_select.multiselect);
	
	                //Se carga el identificador del padre del patron
	                settings.id = $.rup_utils.escapeId($(this).attr('id'));
	                settings.name = $(this).attr('name');
	
	                //Si no se recibe identificador para el acceso a literales se usa el ID del objeto
	                if (!settings.i18nId) {
	                    settings.i18nId = settings.id;
	                }
	
	                //Guardar valor del INPUT
	                settings.inputValue = $('#' + settings.id).val() === null ? $('#' + settings.id).prop('value') : $('#' + settings.id).val();
	
	                attrs = $(this).prop('attributes');
	
	                //Revisar apra el select
	                if (settings.firstLoad === null && ($(this).is('select') && settings.loadFromSelect)) {
	                    loadAsLocal = true;
	                }
	
	                
	
	                //Asociar evento CHANGE para propagar cambios a los hijos
	                $('#' + settings.id).bind('change', function () {
	                    
	                });
	                
	                //tratar placeHolder	
	                if(settings.placeholder !== undefined && typeof settings.placeholder == 'string'){
	                	 if(!settings.allowClear){
		                	settings.templateSelection = function (data,span) {
		                        if (data.id === settings.blank) { // adjust for custom placeholder values, restaurar
		                        	return $('<span class="select2-selection__placeholder">' + data.text + '</span>');
		                        }
		                        
		                        chargedStyles(data);
		                		
		                        if (data.style != null && data.id !== settings.blank) {
		                            // adjust for custom placeholder values, restaurar
		                            return _this._textIcon(data);
		                          }
	
		                        return data.text;
		                      }
		                	if(settings.placeholder == ''){//si es vació se asigna el label
		                		settings.placeholder = this._getBlankLabel(settings.id)
		                	}
		                	if(settings.data !== undefined){
		                		if(settings.parent == undefined){//Si tiene padre se mete en todos los valores, sino solo al data
		                			settings.data.unshift({id:settings.blank , text:settings.placeholder});
		                		}else{
		                            $.each(settings.data, function (index, value) {
		                            	value.unshift({id:settings.blank , text:settings.placeholder})
		                              });
		                		}
		                	}
	                	 }else if($('#' + settings.id).find('option').length == 0){//revisar y crear option vacio.
	                		 $('#' + settings.id).append(new Option("", ""));
	                	 }
	                }
	                
	                //Crear mi template, myTemplate
	                if(settings.myTemplate !== undefined){
	                	settings.templateSelection = settings.myTemplate;
	                }
	                
	                if( settings.templateResult === undefined){
	                	if(settings.templateSelection !== undefined){// mirar los iconos
		                	settings.templateResult = function (data,span) {
		                		chargedStyles(data);
		                		if (data.id === settings.blank) {
		                			return $('<span class="select2-selection__placeholder">' + data.text + '</span>');
		                		}else  if (data.style != null && data.id !== settings.blank) { // adjust for custom placeholder values, restaurar
		                			return _this._textIcon(data);
		                        }
	
		                        return data.text;
		                      }
		                }else{
		                	settings.templateResult = function (data,span) {
		                		chargedStyles(data);
		                		if (data.style != null && data.id !== settings.blank) { // adjust for custom placeholder values, restaurar
		                			return _this._textIcon(data);
		                        }
	
		                        return data.text;
		                      }
		                	settings.templateSelection  = settings.templateResult ;
		                }
	                }
	                
	
	                //Borrar referencia
	                // delete html;
	
	                //Ocultar posibles elementos de fechas/horas
	                $('#' + settings.id).next('a').click(function () {
	                    $('#ui-datepicker-div').hide();
	                });
	
	                //Se audita el componente
	                $.rup.auditComponent('rup_select', 'init');
	                
	                //Añade clase Personalizada
	                if (settings.customClasses) {
	                $.each(settings.customClasses, function (index, value) {
	                    $('#' + settings.id + '-button' + ', #' + settings.id + '-menu').addClass(value);
	                    $('[for=' + settings.id + ']').addClass(value);
	                  });
	                }
	                
	              //Si no se recibe identificador para el acceso a literales se usa el ID del objeto
	                if (!settings.i18nId) {
	                    settings.i18nId = settings.id;
	                }
	                
	                //ORDEN
    		        let ordenFunction = function (data) {
    		        	if(typeof data === 'string'){
	    		            let dates = data.sort(function (a, b) {
	    		              return a.text.localeCompare(b.text);
	    		            });
	    		            let mySettings = $('#' + settings.id).data('settings');
	    		            mySettings.options = dates;
	        		    	$('#' + settings.id).data('settings', mySettings);
	    		            return dates;
    		        	}
    		        	return data;
    		          };	                
	                
	                if (settings.data || settings.dataGroups) {//local y groups
		            	if(settings.sortered === true){//PAra añadir ordenación, en local hay que marcarlo
		            		settings.sorter = ordenFunction;
		    			}else if(settings.sortered !== false){
		    				settings.sorter = settings.sortered;
		    			}
		            	if(settings.dataGroups === undefined){//LOcal
		            		settings.data = this._parseLOCAL(settings.data,settings.i18nId,settings.parent);
		            	}else{//grupos
		            	      for (var i = 0; i < settings.dataGroups.length; i = i + 1) {
		            	          if (typeof settings.dataGroups[i] === 'object') {
		            	        	  settings.dataGroups[i].children = this._parseLOCAL(settings.dataGroups[i].children,settings.i18nId,settings.parent);
		            	          } 
		            	      }
		            	      settings.data = settings.dataGroups;
		            	}
	                	
	                }else if(!settings.ajax && settings.url != null){//remoto
		            	if(settings.sortered === undefined){//PAra añadir ordenación, en remoto siempre se ordena por defecto.
		            		settings.sorter = ordenFunction;
		    			}else if(settings.sortered !== false){
		    				settings.sorter = settings.sortered;
		    			}
	                	this._loadRemote(settings,true);
		           } else {//por si viene cargado de un select
		        	   settings.data = true;
		           }
	                
	                //Init eventos: El resto van en el propio subyacente
	                //Change
	                if(settings.change){
	                	$('#' + settings.id).on('select2:select', function (e) {
	                		settings.change(e);
	                	});
	                	if(!settings.clean){
		                	$('#' + settings.id).on('select2:clearing', function (e) {
		                		settings.change(e);
		                	});
	                	}
	                }
	                //clean
	                if(settings.clean){
	                	$('#' + settings.id).on('select2:clearing', function (e) {
	                		settings.clean(e);
	                	});
	                }
	                if (settings.data) {//local y groups
	                	if(settings.parent){//si depende de otro selects.
	                		//Si es uno meterlo como string - local
	                		if(typeof settings.parent == 'object' && settings.parent.length == 1){
	                			settings.parent = settings.parent[0];
	                		}
	                		
	                		if(settings.dataParents === undefined){//la primera vez carga los datos fijos.
	                			settings.dataParents = settings.data;
	                		}
	                		let valores = _this._getParentsValues(settings,false,settings.multiValueToken);
	                		if(valores != ''){	                			
	                			valores = settings.dataParents[valores] || settings.dataParents[0][valores];	                			
	                			settings.data = valores;
	                		}
	                	}
		                $('#' + settings.id).select2(settings);
		                if(settings.selected){
		                	$('#' + settings.id).val(settings.selected).trigger('change')
		                }
		                //cargar los options
		                settings.options = settings.data;
		                
	                }
	                if(settings.parent){//si dependen de otros selects
	                	//Mirar si es simple o no
	                	let parent = [];
	                	if(typeof settings.parent == 'string'){
	                		parent.push(settings.parent );
	                	}else{
	                		//Si es uno meterlo como string -remoto
	                		if(settings.parent.length == 1){
	                			settings.parent = settings.parent[0];
	                			parent.push(settings.parent );
	                		}else{
	                			parent = settings.parent ;
	                		}
	                	}
	                	//Bucle para eventos Padres
	                	$.each(parent, function (idx, eventoPadre) {
		                	$('#' + eventoPadre).off('change.parent');
			                $('#' + eventoPadre).on('change.parent', function (){//Cambios para los hijos,onchange del padre
			                	
			                	
			                	//Si soy local 
			                	if(settings.data !== undefined){
			                		console.log('cambiando local');
			                		if(typeof settings.parent == 'object'){//Si tiene más de un padre
			                			let clave = '';
			                			if(settings.multiValueToken == undefined){
			                				settings.multiValueToken = '';
			                			}
			                			$.each(settings.parent, function (ind, elem) {
			                				let val = $('#' + elem).rup_select('getRupValue');
			                		          clave = clave + val + settings.multiValueToken  ;
			                		        });
			                			clave = clave.substring(0,clave.length - settings.multiValueToken.length);
			                			if(settings.dataParents[0][clave] != undefined){//Datos Cargados
			                				let valores = settings.dataParents[0][clave];
			                				settings.data = settings.dataParents;
			                				$('#'+settings.id).rup_select("setSource", valores);
			                			}
			                		}else{// si tiene un solo padre
				                		let val = $('#'+settings.parent).rup_select('getRupValue');
				                		if(val != settings.blank && val != ''){
					                		let valores = settings.dataParents[val];
					                		settings.data = settings.dataParents;
					                		if(valores == undefined){//Si no hay valor, se inicializa
					                			valores =[];
					                		}
					                		$('#'+settings.id).rup_select("setSource", valores);
				                		}
			                		}
	
			                		//Aseguramos el valor limpio al cambiar el padre
			                		$('#'+settings.id).rup_select("setRupValue",settings.blank);
			                	}else{//si soy Remoto
			                		console.log('cambiando remoto  '+ settings.id);
			                		let datosParent = _this._getParentsValues(settings, true);
			                		
			                		//Sola llamar si el padre tiene valor.
			                		if(datosParent != ''){
			                			$('#' + settings.id).rup_select("disable");
	                		          //ejecutar los datos
	                		          var $el = $('#' + settings.id);
	                		          var $search = $el.data('select2').dropdown.$search || $el.data('select2').selection.$search;
	                		          $search.trigger('keyup');
	                		          $el.select2('close');
	                		         
	                		          if($("#" + settings.id).val() != null && $("#" + settings.id).val().trim() != ''){
	                		        	  $("#" + settings.id).val(null).trigger('change');
	                		          }
	                		          
			                		}else if($("#" + settings.id).val() != null && $("#" + settings.id).val().trim() != ''){
			                			//Se llama al cambio del trigger.
			                			$("#" + settings.id).val(null).trigger('change');
			                		}
			                	}
			                	
			                });
	                	});
		                //Fin funcion evento padre
	                }
	                $('#' + settings.id).data('settings', settings);
	            }
        	}).catch((error) => {
                console.error('Error al inicializar el componente:\n', error);
            });
        }
    });

    // Creamos un método para añadir el change a los multiselect
    var multiChange = function (settings) {
        if (settings.multiselect) {
            $('#' + settings.id).on('multiselectopen', () => {
                if (!settings.opened) {
                    settings.lastMultiValue = $('#' + settings.id).rup_combo('getRupValue');
                }
                settings.opened = !!1;
            });

            $('#' + settings.id).on('multiselectclose', () => {
                let changed = (settings.lastMultiValue.toString() != $('#' + settings.id).rup_combo('getRupValue').toString());

                if (settings.change && changed && settings.opened) {
                    settings.change();
                }

                settings.opened = !!0;
            });
        }
    };

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************

    /**
     * Función a ejecutar en caso de producirse un error a la hora de obtener los elementos a mostrar.
     *
     * @callback jQuery.rup_combo~onLoadError
     * @param {Object} xhr - Objeto XHR que contiene la respuesta de la petición realizada.
     * @param {string} textStatus - Texto que identifica el error producido.
     * @param {Object} errorThrown - Objeto error que contiene las propiedades del error devuelto en la petición.
     */

    /**
     * Función a ejecutar en caso de producirse un error a la hora de obtener los elementos a mostrar.
     *
     * @callback jQuery.rup_combo~onLoadSuccess
     * @param {jQuery} self - Referencia al objeto jQuery del propio combo.
     */

    /**
     * @description Opciones por defecto de configuración del componente.
     *
     * @name defaults
     *
     * @property {jQuery.rup_combo~onLoadError} [onLoadError] - Función de callback a ejecutar en caso de que se produzca un error en la petición de obtención de la lista de elementos a mostrar.
     * @property {number} [width=200] - Determina el tamaño del combo. Su valor por defecto es 200 para la selección simple. En el caso de selección múltiple su declaración es obligatoria. Puede establecerse un porcentaje para que el combo sea responsivo.
     * @property {string} [blank=null] - Se utiliza para declarar un valor independiente de la lógica de negocio y en ocasiones se representa como "Seleccione un elemento". Permite establecer un mensaje independiente por cada combo haciendo uso de $.rup.i18n.app.id._blank (sustituyendo id por el propio de cada combo) o uno genérico por aplicación haciendo uso de $.rup.i18n.app.rup_combo.blank. En caso de no definir ninguno, se usará el genérico de UDA, $.rup.i18n.base.rup_combo.blankNotDefined.
     * @property {string} [style=dropdown] - Tipo de visualización de la lista de opciones del combo.
     * @property {boolean} [showValue=false] - Determina si el combo debe mostrar el valor asociado concatenado al literal (sólo selección simple).
     * @property {string} [token="|"] - Define el separador a utilizar cuando se muestra el valor asociado al combo concatenado al literal.
     * @property {string} [multiValueToken="##"] - Define el separador a utilizar en combos enlazados locales.
     * @property {boolean} [ordered=true] - Indica si el combo debe ordenarse.
     * @property {boolean} [orderedByValue=false] - Indica si el la ordenación del combo debe realizarse por el valor de los elementos en lugar de por el texto.
     * @property {jQuery.rup_combo~onLoadSuccess} [onLoadSuccess=null] - Función de callback a ejecutar en el caso de que la petición de carga de datos se haya producido correctamente.
     * @property {boolean} [loadFromSelect=false] - Determina si se debe de utilizar los elementos option del elemento html sobre el que se inicializa el componente para inicializar los datos del elemento.
     * @property {boolean} [multiselect=false] - Indica si el combo permite la selección múltiple.
     * @property {boolean} [multiOptgroupIconText=false] - Indica si se desea que en la selección múltiple con grupos, el nombre del grupo tenga descripción en los iconos para seleccionar/deseleccionar los elementos del grupo.
     * @property {boolean} [submitAsString=false] - Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un literal separados por coma.
     * @property {boolean} [submitAsJSON=false] - Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un array JSON donde el nombre del mapa será el nombre del combo. En el caso de que el nombre contenga notación dot se tomará el último literal. Ej: [{id:1}, {id:2}, …].
     * @property {boolean} [readAsString=false] - Determina si la asignación de un valor inicial se va a realizar a partir de un string con los ids de los elementos separados por comas en vez de un array de json.
     * @property {boolean} [rowStriping=false] - Indica si se debe aplicar un estilo diferente a las filas pares e impares para poder distinguirlas mediante un color diferente.
     * @property {number} [typeAhead=false] - Especifica en milisegundos el tiempo de espera que toma el componente antes de procesar los eventos de escritura realizados por el usuario.
     * @property {number} [legacyWrapMode=false] - Determina si se emplea el método obsoleto a la hora de empaquetar en objetos json los elementos seleccionados. Su propósito es mantener la retrocompatibilidad.
     * @property {function} [open=function( event, ui )] - Calcula el ancho del combo y se lo aplica al menú que despliega al pulsar sobre el.
     */
    $.fn.rup_select.defaults = {
        onLoadError: null,
        customClasses: ['select-material'],
        blank: "-1",
        minimumResultsForSearch: Infinity,
        submitAsJSON: false,
        dataType: 'json',
        cache: false
        };


}));

function chargedStyles(data){
	if(data.style === undefined && data.element !== undefined){//mirar estilo
		data.style = data.element.getAttribute('style');
		data.imgStyle = data.element.getAttribute('imgStyle');
		if(data.style == null || data.style == 'undefined'){
			data.style = undefined;
		}
		if(data.style == null || data.imgStyle == 'undefined'){
			data.imgStyle = undefined;
		}
	}
}