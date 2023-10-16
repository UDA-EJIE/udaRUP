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
 * Permite al usuario recuperar un elemento de una gran lista de elementos o de
 * varias listas dependientes de forma sencilla y ocupando poco espacio en la
 * interfaz.
 * 
 * @summary Componente RUP Select.
 * @module rup_select
 * @see El componente está basado en el plugin
 *      {@link https://select2.org//|Select2}. Para mas información acerca de
 *      las funcionalidades y opciones de configuración pinche
 *      {@link https://select2.org//|aquí}.
 * @example $("#idSelect").rup_select({ source : "selectSimple/remote",
 *          sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(),
 *          value:"code", style:"css"} });
 */

/* global define */
/* global jQuery */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './rup.message', 'select2','./external/select2MultiCheckboxes'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    // ****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que
	// contendrá los métodos y la función de jQuery)
    // ****************************************************************************************************************


    var rup_select = {};
    const FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE = $.rup.i18nParse($.rup.i18n.base, 'rup_global.functionNotSupportedError');
    const FUNCTION_NOT_SUPPORTED_ERROR_TITLE = $.rup.i18nParse($.rup.i18n.base, 'rup_global.error');

    // Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_select', rup_select));

    // *******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    // *******************************
    $.fn.rup_select('extend', {
        /**
		 * Método utilizado para obtener el valor del componente. Este método es
		 * el utilizado por el resto de componentes RUP para estandarizar la
		 * obtención del valor del select.
		 * 
		 * @function getRupValue
		 * @return {string | number} - Devuelve el valor actual del componente
		 *         seleccionado por el usuario.
		 * @example $("#idSelect").rup_select("getRupValue");
		 */
        getRupValue: function () {
            var $self = $(this),
                settings = $self.data('settings'), value;

            let values = $self.select2('data')
            
            if ((values == undefined || values.length == 0) && !settings.multiple) {
            	value = '';
            }else if (values.length == 1 && !settings.multiple){
                value = values[0].id;
            }else{
            	value = [];
            	$.each(values, function (ind, elem) { 
            		value.push(elem.id); 
            	}); 
            }

            if (settings !== undefined && settings.submitAsJSON !== undefined && settings.submitAsJSON) {
            	let name = $self.attr('name');
            	if(name == undefined){
            		name = $self.attr('id');
            	}
                return jQuery.rup_utils.getRupValueAsJson(name, value);
            }
            
            return value;


        },
        /**
		 * Método utilizado para asignar el valor al componente. Este método es
		 * el utilizado por el resto de componentes RUP para estandarizar la
		 * asignación del valor al Select.
		 * 
		 * @function setRupValue
		 * @param {string |
		 *            number} param - Valor que se va a asignar al componente.
		 * @example $("#idSelect").rup_select('setRupValue', 'Si');
		 */
        setRupValue: function (param) {
            var $self = $(this),
                settings = $self.data('settings');
            
            // Tipo de select
            if (this.length === 0 || (settings !== undefined && !settings.multiple)) {
            	let texto = undefined;									// normal.
                // Simple
            	 if (settings !== undefined && settings.data === undefined && settings.options !== undefined){// si
																					// es
																					// remoto
																					// crear
																					// el
																					// option
            		 let data = {};
            		 if(settings.groups){
            			 data = $.grep(settings.optionsGroups, function (v) {
	                    return v.nid === param || v.id == param;
            			 });
            		}else{
            			data = $.grep(settings.options, function (v) {
	                    return v.nid === param || v.id == param;
            			});
            		}
 	              	if(data[0] !== undefined){
 	              	 if($('#'+ settings.id).find("option[value='" + data[0] .id + "']").length == 0){
 	              	   data = data[0];
 	              	   _this._createOption(settings,data);
 	              	   param = data.id;// mantenga el cifrado
 	              	   texto = data.text;
 	              	 }else{
 	              		param = data[0].id;// mantenga el cifrado
 	              		texto = data[0].text;
 	              	 }
 	              	}
            	}
            	let dataSelect2 = $self.data('select2');
            	if(dataSelect2 !== undefined){
	            	if(dataSelect2.$selection.find('input').length == 1){
	            		dataSelect2.$selection.find('input').val('');
	            	}
	            	let $search = dataSelect2.dropdown.$search || dataSelect2.selection.$search;
	            	if($search != undefined && texto !== undefined){//sifnifica que esta abierto
	            		let lis = dataSelect2.dropdown.$dropdown.find('li');
	            		let selectedDate = $.grep(lis, function (v) {
		                    return $(v).text() === texto;
	            			});
	            		lis.attr('aria-selected', false);
	            		$(selectedDate).attr('aria-selected',true);
	            	}
	            	$self.val(param).trigger('change');
	            	$('#' + settings.id).rup_select('change');
            	}

            } else {
                // Multiple > multiselect - falta
            	if (typeof(param) === 'object' && settings.options !== undefined){// si
																													// es
																													// remoto
																													// crear
																													// el
																													// option
            		let arrayDatos = [];
            		
	            	$.each(param, function (key, value) {
	            		 let data = {};
	            		 if(settings.groups){
	            			 data = $.grep(settings.optionsGroups, function (v) {
		                    return v.nid === value || v.id == value;
	            			 });
	            		}else{
	            			data = $.grep(settings.options, function (v) {
		                    return v.nid === value || v.id == value;
	            			});
	            		}
	            		if(data[0] != undefined && $('#'+ settings.id).find("option[value='" + data[0] .id + "']").length == 0){
	            			data = data[0];
	            			_this._createOption(settings,data);
	            			arrayDatos.push(data.id);
	            		}else{
	            			arrayDatos.push(value);
	            		}
	            	});
            		
            		$('#' + settings.id).val(arrayDatos).trigger('change');
            	}
            	
            }
            
        },
        /**
		 * Método que limpia el valor seleccionado en el select. En el caso de
		 * selección múltiple los valores seleccionados.
		 * 
		 * @function clear
		 * @example $("#idSelect").rup_select("clear");
		 */
        clear: function () {
        	var $self = $(this);
            // init de select
            if (this.length > 0) {
                // Simple y multi
            	if($self.data('settings').blank !== undefined){
            		$self.val($self.data('settings').blank).trigger('change')
            	}else{
            		$self.val(null).trigger('change');
            	}
            } 
        },
        /**
		 * Método que lanza el evento change del componente.
		 * 
		 * @function change
		 * @example $("#idSelect").rup_select("change");
		 */
        change: function () {
            // Tipo de select
            if ($(this).data('settings').change) {
                $(this).data('settings').change();
            }
        },
        /**
		 * Selecciona todos los elementos en el caso de tratarse de un select
		 * multilesección.
		 * 
		 * @function checkAll
		 * @example $("#idSelect").rup_select("checkAll");
		 */
        checkAll: function () {
            // Tipo de select
            if ($(this).data('settings').multiple) {
                // Multiple > multiselect
            	var selectedItems = [];
            	var allOptions = $("#"+$(this)[0].id+" option");
            	allOptions.each(function() {
            	    selectedItems.push( $(this).val() );
            	});
            	$(this).rup_select('setRupValue', selectedItems);
            } else {
                // Simple > selectmenu
                alert('Función no soportada.');
            }
        },
        /**
		 * Selecciona el elemento del select que contiene como texto el
		 * indicado. En caso de no existir el texto a buscar el se no sufrirá
		 * cambios En el caso de selección múltiple el parámetro será un array.
		 * 
		 * @function selectByLabel
		 * @param {string |
		 *            string[]} param - Parámetro utilzado para determinar los
		 *            elementos a seleccionar.
		 * @example // Simple $("#idSelect").rup_select("selectByLabel", "No"); //
		 *          Multiple $("#idSelect").rup_select("selectByLabel",
		 *          ["No","Si"]);
		 */
        selectByLabel: function (param) {
            // Tipo de select
        	let settings = $(this).data('settings');
        	if(settings.options !== undefined ){
        		let options = settings.options ;
        		if(settings.groups){
        			options = settings.optionsGroups;
        		}
	            if (!settings.multiple) {
	                // Simple > selectmenu
	              	let data = $.grep(options, function (v) {
	                    return v.text === param;
	                  });
	              	if(data[0] !== undefined){
	              		$(this).rup_select('setRupValue', data[0].id);
	              	}
	            } else {// Ejemplo
						// $('#idSelect').rup_select('selectByLabel',['php_value','java_value'])
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
         * Selecciona el elemento enviado como parámetro. En caso de ser un numérico se selecciona por la posición (comenzando en 0) y si es un literal se selecciona por el valor. En el caso de selección múltiple el parámetro será un array.
         *
         * @function  select
         * @param {string | number | string[] | number[]} param - Parámetro utilzado para determinar los elementos a seleccionar.
         * @example
         * // Simple
         * $("#idSelect").rup_select("select", 2);
         * // Multiple
         * $("#idSelect").rup_select("select", [0,2]);
         */
        select: function (param) {
        	let settings = $(this).data().settings;
        	let datas = settings.data || settings.options;
    		if(settings.groups){
    			datas = settings.optionsGroups;
    		}
        	if(settings.multiple){
            	let datos = [];
            	$.each(param, function (key, value) {
              		if(datas.length >= value){
              			datos.push(datas[value].id);
             		}
                });
            	$(this).rup_select('setRupValue', datos);
        	}else{
        		if(datas.length >= param){
        			$(this).rup_select('setRupValue', datas[param].id);
        		}
        	}
        },
        /**
		 * Método que devuelve el label asociado al valor seleccionado en el
		 * select. En el caso de la selección múltiple se devolverá un array.
		 * 
		 * @function label
		 * @return {string | string[]} - Texto del elemento o elementos
		 *         seleccionado.
		 * @example $("#idSelect").rup_select("label");
		 */
        label: function () {
            // Tipo de select
        	let data = $(this).select2('data');
            if (!$(this).data('settings').multiple) {
            	 return data[0].text;
            } else {
                // Multiple > multiselect
                var retorno = [];
                for (let i = 0; i < data.length; i++) {
                    retorno.push(data[i].text);
                }
                return retorno;
            }
        },
        /**
		 * Devuelve el índice de la opción seleccionada en el select (empezando
		 * en 1). En el caso de la selección múltiple se devolverá un array.
		 * 
		 * @function index
		 * @return {number | number[]} - Índice del elemento o elementos
		 *         seleccionados.
		 * @example $("#idSelect").rup_select("index");
		 */
        index: function () {
            // Tipo de select
        	let settings = $(this).data('settings');
        	if(settings.options !== undefined ){
        		let options = settings.options ;
        		if(settings.groups){
        			options = settings.optionsGroups;
        		}
        		let count = 0;
        		let data = $(this).select2('data');
	            if (!settings.multiple) {
	                // Simple > selectmenu
	            	
	            	$.each(options, function (key, value) {
	              		if(settings.blank !== value.id.toString()){
	              			count = count + 1;	              			
	              		}
	              		if(value.id.toString() === data[0].id.toString()){
	              			return false;
	              		}
	              	});
	            	
	   
	            } else {
	            	let listaCount = [];
	            	$.each(data, function (key, value) {
	            		count = 0;
	            		$.each(options, function (cont, valor) {
	                  		if(settings.blank !== value.id.toString()){
	                  			count = count + 1;
		              		}
	                  		if(value.id.toString() === valor.id.toString()){
	                  			listaCount.push(count);
		              			return false;
	                  		}
	            		});
	                  });
	            	
	            	return listaCount;
	            }
	            
	            return count;
        	}

        },
        /**
		 * Deshabilita el select.
		 * 
		 * @function disable
		 * @example $("#idSelect").rup_select("disable");
		 */
        disable: function () {
            // Tipo de select
            var $self = $(this);
            $self.prop("disabled", true)
        },
        /**
		 * Habilita el select.
		 * 
		 * @function enable
		 * @example $("#idSelect").rup_select("enable");
		 */
        enable: function () {
        	var $self = $(this);
            $self.prop("disabled", false);
        },
        /**
		 * Indica si el select está deshabilitado o no.
		 * 
		 * @function isDisabled
		 * @param {boolean} -
		 *            Devuelve si el select está deshabilitado o no.
		 * @example $("#idSelect").rup_select("isDisabled");
		 */
        isDisabled: function () {
            if ($(this).attr('disabled') === 'disabled') {
                return true;
            } else {
                return false;
            }
        },
        /**
		 * Realiza una recarga de los select.
		 * 
		 * @function reload
		 * @example $("#idSelect").rup_select("reload");
		 */
        reload: function (removeOptions) {
        	let settings = $(this).data('settings');

        	$(this).select2("destroy");
        	if(removeOptions){
        		$(this).find('option').remove();
        	}
        	$(this).rup_select(settings);
        },
        /**
		 * Cambia el source del select y recarga el componente para que este
		 * comience a usarlo.
		 * 
		 * @function setSource
		 * @param {string}
		 *    source - Source desde el cual se obtendran los datos a
		 *    sourceParam  - Se puede cambiar los parámetros de la cabecera..
		 * @example $("#idSelect").rup_select("setSource", source, sourceParam);
		 */
        setSource: function (source,sourceParam) {
        	if (source !== undefined && source !== '') {
            	let $self = $(this);
            	let settings = $self.data().settings;
            	let dataSelect2 = $self.data('select2');
            	if($self.data().settings.data === undefined){// remoto
            		
            		dataSelect2.dataAdapter.ajaxOptions.url = source;
            		if(sourceParam != undefined){
            			dataSelect2.dataAdapter.ajaxOptions.headers =  $.toJSON(sourceParam);
            		}
            	}else{// local
            		settings.data = source;
                   	settings.options = undefined;
                	$self.data('settings',settings);
                	if(dataSelect2.$selection != undefined){
                		dataSelect2.$selection.find('input').val('');
                	}
                	$self.empty();
                	if(settings.data !== undefined && settings.autocomplete){
                		 $.each(settings.data, function () {
                			 _this._createOption(settings, this);
                		});
                		
                	}else{
                        $self.select2({
                        	data: settings.data
                        }); 
                	}

            	}
            	
            	 if (settings.multiple == true) {
          $self.rup_select('reload');
        }
 
        	}
    	},
        /**
		 * Método que devuelve los datos, de los elementos seleccionados.
		 * 
		 * @function getDataSelected
		 * @return {string | string[]} - Texto del elemento o elementos
		 *         seleccionado.
		 * @example $("#idSelect").rup_select("label");
		 */
    	getDataSelected: function () {
            // Tipo de select
        	let data = $(this).select2('data');
            if (!$(this).data('settings').multiple) {
            	//Validar que venga el nid
            	if(data[0] != undefined && data[0].nid == undefined && $(this).data('settings').options != undefined){
            	   let seleccionado = $.grep($(this).data('settings').options, function (v, index) {
            	        return v.id === data[0].id;
            	   });
            	   if (seleccionado != undefined && seleccionado.length == 1) {
            		   data[0].nid = seleccionado[0].nid;
            	   }
            	}
            	 return data[0];
            } else {
                return data;
            }
        },
        /**
		 * Método que añade un option al select en local
		 * 
		 * @function addOption
		 * id:	identificador del nuevo option
		 * text: texto del nuevo option
		 * label: en Caso de ser grupos, el label donde se va a meter(obligatorio)
		 * @example $("#idSelect").rup_select("label");
		 */
    	addOption: function (id,text,label) {
            // Tipo de select
  
        	let newOpt = new Option(id, text);
            if ($(this).data('settings').groups && label != undefined) {
            	let options = $(this).data('select2').options.options;
            	$(this).find('optgroup[label="'+label+'"]').append(newOpt);
		        let seleccionado = $.grep(options.data, function (v,index) {
                    return v.text === label;
	            });
		        if(seleccionado != undefined && seleccionado.length == 1){
		        	seleccionado[0].children[seleccionado[0].children.length] = {id:id,text:text};
		        }
            	
            }else{
            	$(this).append(newOpt);
            }
        },
        /**
         * Deshabilita una opción de un select multiselección.
         *
         * @function  disableOpt
         * @param {string} optValue - Value del option que queremos deshabilitar.
         * @example
         * $("#idSelect").rup_select("disableOpt", "opt1");
         */
        disableOpt: function (optValue) {
            if ($(this).data('settings').multiple) {
                //Deshabilitar select
                this.find('[value=\'' + optValue + '\']').attr('disabled', 'disabled');

                //Si pertenece a OptGroup y es el último en deshabilitarse > Cambiar estilos optGroupLabel
                if ($(this).data('settings').sourceGroup != undefined) {
                    //Obtener inicio optGroup
                    var li = obj.parentsUntil('ul').last().prevAll('li.ui-multiselect-optgroup-label').first(),
                        inputs = li.nextUntil('li.ui-multiselect-optgroup-label').find('input'),
                        allDisabled = true;
                    for (let i = 0; i < inputs.length; i++) {
                        if (!inputs[i].disabled) {
                            allDisabled = false;
                            break;
                        }
                    }
                    if (allDisabled) {
                        //Estilos optGroup
                        li.css('color', 'grey');
                        li.children('a').remove();
                        li.children('span').not('.rup-combo_multiOptgroupLabel').remove();
                    }

                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Deshabilita varias opciones del select. Las opciones se identifican mediante un array.
         *
         * @function disableOptArr
         * @param {string[]} optValueArr - Array en el que se indican los values de las opciones a deshabilitar.
         * @example
         * $("#idSelect").rup_select("disableOptArr", ["opt1","opt2"]);
         */
        disableOptArr: function (optValueArr) {
            if ($(this).data('settings').multiple) {
                for (let i = 0; i < optValueArr.length; i++) {
                    $(this).rup_select('disableOpt', optValueArr[i]);
                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Habilita una opción de un select multiselección.
         *
         * @function enableOpt
         * @param {string} enableOpt - Value del option que queremos habilitar.
         * @example
         * $("#idSelect").rup_select("enableOpt", "opt1");
         */
        enableOpt: function (optValue) {
            if ($(this).data('settings').multiple) {
                //Habilitar select
                this.find('[value=\'' + optValue + '\']').removeAttr('disabled');

                var obj = $('#rup-multiCombo_' + $(this).attr('id')).find('[value=\'' + optValue + '\']');

                //Habilitar input
                obj.removeAttr('disabled');

                //Estilos línea (label)
                obj.parent().css('color', 'black');

                //Si pertenece a OptGroup y es el primero en habilitarse > Cambiar estilos optGroupLabel
                if ($(this).data('settings').sourceGroup != undefined) {
                    //Obtener inicio optGroup
                    var li = obj.parentsUntil('ul').last().prevAll('li.ui-multiselect-optgroup-label').first();

                    //Estilos optGroup
                    if (li.children('a').length === 0) {
                        li.css('color', 'black');
                        this._generateOptGroupLabel(li, $(this).data('settings').multiOptgroupIconText);
                    }

                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Habilita varias opciones del select. Las opciones se identifican mediante un array.
         *
         * @function enableOptArr
         * @param {string[]} optValueArr - Array en el que se indican los values de las opciones a habilitar.
         * @example
         * $("#idSelect").rup_select("enableOptArr", ["opt1","opt2"]);
         */
        enableOptArr: function (optValueArr) {
            if ($(this).data('settings').multiple) {
                for (let i = 0; i < optValueArr.length; i++) {
                    $(this).rup_select('enableOpt', optValueArr[i]);
                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Ordena alfanumericamente y en orden ascendente el combo sobre el que se aplica. Se invoca por defecto al cargarse los combos a no ser que se cambie el valor del atributo ordered en la creación.
         *
         * @function  order
         * @param {boolean} orderedByValue - Indica si la búsqueda es por texto (por defecto) o si la búsqueda es por el valor.
         * @param {boolean} orderAsNumber - Indica si se debe ordenar como valores numéricos en vez de alfabéticos.
         * @param {boolean} skipFirst - Determina si se debe obviar el primer elemento.
         * @example
         * $("#idSelect").rup_select("order", orderedByValue, orderAsNumber, skipFirst);
         */
        order: function (groups,orderedByValue, orderAsNumber) {
        	/* Get options */
        	let selector = $(this).data('select2') || $(this).parent().data('select2');
        	let settings = selector.options.options;
        	if(groups){
        		$(this).find('optgroup').each(function () {
        			$(this).rup_select('order', false,orderedByValue,orderAsNumber);
        		});
        		//Order children
        		if(settings.data != undefined){
	        		$(settings.data).each(function () {
	        			if(this.children != undefined && this.children.length > 0){
	        				this.children = this.children.sort(
	      		  	        	  (a, b) => a.text.localeCompare(b.text)
	      		  	        	);
	        			}
	        		});
        		}

        	}else{
	        	let selectList = $(this).find('option').not('[value='+settings.blank+']');
	        	let option = $(this).find('option[value='+settings.blank+']');
	        	/* Order by innerText (case insensitive) */
	        	selectList.sort(
	        	  (a, b) => a.innerText.localeCompare(b.innerText)
	        	);
	
	        	/* Re-do select HTML */
	        	$(this).html(selectList)
	        	if(option.length == 1){
	        		$(this).prepend(option);
	        	}
        	}
        },
		/**
         * Lanza una búsqueda en el autocomplete con el parámetro indicado y el foco va a parar al input.
         *
         * @param {string} term - Cadena de texto utilizada para realizar la búsqueda.
         * @param {boolean} notOthersClose - Si deseas cerrar el resto de componentes.
         * @function search
         * 
         * @example
         * $("#idSelect").rup_select("search", "java");
         */
    	search: function (term,notOthersClose) {
    		let $search = $(this).data('select2').dropdown.$search ||$(this).data('select2').mySelect.selection.$search;
           	if(!notOthersClose){
        		$('.select2-hidden-accessible').select2('close');
        	}
           	$(this).data('select2').$container.find('input').val(term);  
	        if($search != undefined){
	          $search.val(term);	
	          $search.trigger('keyup');
	        }
	        
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
         * $("#idSelect").rup_select("option", "minLegth", 2);
         * // Establecer varias propiedad
         * $("#idSelect").rup_select("option", {minLegth:2, delay:1000});
         */
		option: function (optionName, value, removeOptions) {
        	let settings = $(this).data('settings');
        	settings[optionName] = value;
        	$(this).select2("destroy");
        	if(removeOptions){
        		$(this).find('option').remove();
        	}
        	$(this).rup_select(settings);
		},
    	/**
         * Permite abrir el componente.
         *
         * @param {boolean} notOthersClose - Si deseas cerrar el resto de componentes.
         * @function open
         * @example
         * // Establecer una propiedad
         * $("#idSelect").rup_select("option", true);
         */
		open: function (notOthersClose) {
        	if(!notOthersClose){
        		$('.select2-hidden-accessible').select2('close');
        	}
        	$(this).select2('open');
        	
		},
    	/**
         * Permite cerrar el componente.
         *
         * @param {boolean} notOthersClose - Si deseas cerrar el resto de componentes.
         * @function close
         * @example
         * // Establecer una propiedad
         * $("#idSelect").rup_select("option", true);
         */
		close: function (notOthersClose) {
        	if(!notOthersClose){
        		$('.select2-hidden-accessible').select2('close');
	       	}
	        $(this).select2('close');      	
		},
		/**
         * Elimina el autocomplete.
         *
         * @function destroy
         * @example
         * $("#idSelect").rup_select("destroy");
         */
		destroy: function (notRemoveOptions) {
			$(this).select2("destroy");
        	if(!notRemoveOptions){
        		$(this).find('option').remove();
        	}
		},
    });

    // *******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    // *******************************
    $.fn.rup_select('extend', {
       
        /**
		 * Selecciona el elemento correspondiente al label indicado
		 * 
		 * @function _selectLabel
		 * @private
		 * @param {object}
		 *            selector - Referencia al objeto jQuery del select.
		 * @param {object}
		 *            param - Value correspondiente.
		 */
        _selectLabel: function (selector, param) {
            var $option;
            for (let i = 0; i < $('option', selector).length; i = i + 1) {
                $option = jQuery(selector).find('option').eq(i);
                if (jQuery(selector).find('option').eq(i).text() === param) {
                    $(selector).selectmenu('index', $option.prop('index'));
                    return true;
                }
            }
            return false;
        },
        /**
		 * Obtener la opción vacía a partir del fichero de internacionalización
		 * de la aplicación o del fichero por defecto.
		 * 
		 * @function _getBlankLabel
		 * @private
		 * @param {string}
		 *            id - Identificador del fichero
		 */
        _getBlankLabel: function (id) {
            var app = $.rup.i18n.app;
            // Comprueba si el select tiene su propio texto personalizado
            if (app[id] && app[id]._blank) {
                return app[id]._blank;
            }
            // Comprueba si la aplicacion tiene un texto definido para todos los
			// blank
            else if (app.rup_select && app.rup_select.blank) {
                return app.rup_select.blank;
            }
            // Si no hay textos definidos para los blank obtiene el por defecto
			// de UDA
            return $.rup.i18n.base.rup_select.blankNotDefined;
        },
       
        /**
		 * Obtener valores de los selects padres (si no están cargados o valores
		 * 'vacíos' devuelve null). En caso de disponer de varios selects padres
		 * se devolverán separados por un caracter delimitador.
		 * 
		 * @function _getParentsValues
		 * @private
		 * @param {object[]}
		 *            settings - Array con los elementos de configuración.
		 * @param {boolean}
		 *            remote - Determina si la fuente de datos es remota o no.
		 * @return {string} - Devuelve los values seleccionados de los selects
		 *         padres.
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
	            		if(remote){// PAra remoto
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
            
            if(parentsFull < parent.length){// si no estan todos los padres no
											// se busca.
            	return '';
            }
            
            // Evitar & o multiValueToken finales
            if (retorno !== '' && remote) {
              retorno = retorno.substring(0, retorno.length - 1);
            }
            return retorno;
        },
       
        /**
		 * Procesa el conjunto de registros devueltos por una petición sobre un
		 * origen de datos local.
		 * 
		 * @function _parseLOCAL
		 * @private
		 * @param {object[]}
		 *            data - Array de registros obtenidos a partir del origen de
		 *            datos.
		 * @param {object}
		 *            i18nId - Opciones de idioma.
		 * @param {jQuery}
		 *            isParent - Si tiene datos en forma parent.
		 */
        _parseLOCAL: function (data,i18nId,isParent) {
            let text;
            let array = data;
            if(isParent){// Si es padre llamar a la recursividad
            	if(Array.isArray(data)){
            		data = data[0];
            	}
            	$.each(data, function (key, value) {
            		data[key] = _this._parseLOCAL(data[key],i18nId,false);
            	});
            }else{
            	data = [];
	            for (let i = 0; i < array.length; i = i + 1) {
	                if (typeof array[i] === 'object') { // multi-idioma
	                    if (array[i].i18nCaption) {
	                        text = $.rup.i18nParse($.rup.i18n.app[i18nId], array[i].i18nCaption);
	                    } else {
	                        text = array[i].text;
	                    }
	                    array[i].text = text;
	                }else{// El id es el mismo que el texto.
	                	data[i] = {id : array[i], text : array[i]};
	                }
	            }
	            if(data.length > 0){// El id es el mismo que el texto.
	            	return data;
	            }
            }
            
            return array;
        },
       
        /**
		 * Procesa el conjunto de registros devueltos por una petición sobre un
		 * origen de datos remoto.
		 * 
		 * @function _parseRemoteGroup
		 * @private
		 * @param {object[]}
		 *            array - Array de registros obtenidos a partir del origen
		 *            de datos.
		 * @param {object}
		 *            settings - Objeto de propiedades de configuración con el
		 *            que se ha inicializado el componente.
		 */
        _parseRemoteGroup: function (array,settings) {
            let item;
            let data = [];
            for (let i = 0; i < array.length; i = i + 1) {
                item = array[i];
                let key = Object.keys(item)[0];
                let dato = {};
                dato.text = key;
                dato.children = item[key];
                dato.id = "group__"+i;
                data.push(dato);
            }
            
            return data;
        },
        
        /**
		 * Prepara la petición AJAX que se va a realizar para obtener los
		 * registros a partir de un origen remoto. Se añaden las cabeceras RUP
		 * correspondientes para realizar la serialización json de manera
		 * correcta.
		 * 
		 * @function _ajaxBeforeSend
		 * @private
		 * @param {object}
		 *            xhr - Objeto xhr que se va a enviar en la petición
		 * @param {object}
		 *            settings - Objeto de propiedades de configuración con el
		 *            que se ha inicializado el componente.
		 * @param {jQuery}
		 *            html - Referencia al objeto jQuery que contiene los
		 *            elementos.
		 */
        _ajaxBeforeSend: function (xhr, settings, html) {
            // Crear select (vacío) y deshabilitarlo
            if (html !== undefined) {
                $('#' + settings.id).replaceWith(html);
            } // Si no es 'reload' se debe inicializar vacío
            
            $('#' + settings.id).rup_select('disable');

            // LOADING...
            $('#' + settings.id + '-button span:first-child').removeClass("ui-icon ui-icon-triangle-1-s").addClass('rup-select_loadingText').text($.rup.i18n.base.rup_select.loadingText);
            var icon = $('#' + settings.id + '-button span:last-child');
            $(icon).removeClass('ui-icon-triangle-1-s');
            $(icon).text(''); // Evita errores de visualización con el icono
            $(icon).addClass('rup-select_loading');

            // Cabecera RUP
            xhr.setRequestHeader('RUP', $.toJSON(settings.sourceParam));
        },
       
        /**
		 * Procesa la respuesta de la petición AJAX en el caso de que se haya
		 * producido un error en la misma.
		 * 
		 * @function _ajaxError
		 * @private
		 * @param {object}
		 *            xhr - Objeto xhr enviado en la respuesta.
		 * @param {string}
		 *            textStatus - Cadena identificadora del error que se ha
		 *            producido en la petición.
		 * @param {object}
		 *            errorThrown - Objeto error correspondiente al que se ha
		 *            producido en la petición.
		 * @param {object}
		 *            settings - Objeto de propiedades de configuración con el
		 *            que se ha inicializado el componente.
		 */
        _ajaxError: function (xhr) {
            if (xhr.responseText !== null && xhr.responseTex !== undefined && xhr.responseText.length < 200) {
                $.rup.showErrorToUser(xhr.responseText);
            } else {
                $.rup.showErrorToUser($.rup.i18n.base.rup_select.ajaxError);
            }
        },
        
         /**
			 * Carga la opción remoto.
			 * 
			 * @function _loadRemote
			 * @private
			 * @param {object}
			 *            settings - Objeto de propiedades de configuración con
			 *            el que se ha inicializado el componente.
			 * @return {jQuery} - Objeto jQuery con referencia al elemento que
			 *         contiene el foco.
			 */

        _loadRemote: function (settings,first) {
        	var rupSelect = this;
        	 	settings.ajax = {
		    url: function () {
    			return rupSelect._generateUrl(settings, _this._getParentsValues(settings, true));
    		},
		    dataType: settings.dataType,
		    processResults: function (response) 
		    	{// Require id y text, podemos permitir que no venga.
		    	if(settings.placeholder != undefined && !settings.multiple){
		    		let elBlank = response.find(x => x.id == settings.blank);
		    		if(elBlank == undefined && !settings.autocomplete){
		                response.unshift({
		                    id: settings.blank,
		                    text: settings.placeholder
		                  });
		    		}
		    	}
		    		if(settings.groups){// PArsear para grupos.
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
		    	// Es necesario enviarlo vacío para que el componente subyacente no genere parámetros extra que Hdiv bloqueará.
		    	//se hará en el transport
		    	return  _this._getParentsValues(settings, true);
		    },
		    error: function (xhr, textStatus, errorThrown) {
		               if (settings.onLoadError !== null) {
		                 jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
		               } else {
		            	 if(textStatus != 'abort'){//Si se hacen 2 llamadas se cancela la primera.
		            		 rupSelect._ajaxError(xhr, textStatus, errorThrown);
		            	 }
		            	 console.log(textStatus);
		               }
		    }		
    	};
        	 	
        	 	if(settings.selected || (settings.autocomplete && settings.defaultValue != undefined)){
        	 		settings.firstLoad = true;
        	 	}
        	 	if(settings.parent != undefined 
        	 			&& ($('#' + settings.parent).val() == null || $('#' + settings.parent).val().trim() === '')){
        	 		settings.firstLoad = false;
        	 	}

				let __cache = [];
				let __lastQuery = null;
		    	settings.ajax.transport = function(params, success, failure) {

					// retrieve the cached key or default to _ALL_
			        let __cachekey = params.data || '_ALL_';
		    		//Se actualiza el data, para mantener la misma función, con hdiv ya no se mandan los data
			        if(!settings.autocomplete){
			        	params.data = "" ;
			        }
			        let mySelect = $('#' + settings.id).data('select2');
			        if(settings.autocomplete){
			        	params.data.q = mySelect.$container.find('input').val();
			        	__cachekey = params.data.q;
			        }
			        if (__lastQuery !== __cachekey) {
			          // remove caches not from last query
			          __cache = [];
			        }
			        __lastQuery = __cachekey;
			        //Si esta cacheado, no busca
			        if (settings.cache == true && 'undefined' !== typeof __cache[__cachekey]) {
			          // display the cached results
			          success(__cache[__cachekey]);
			          return; 
			        }
			        
			        mySelect.$results.find('li').addClass('disabledButtonsTable');
			        mySelect.$selection.find('input').addClass('disabledButtonsTable');
			        mySelect.$selection.find('input').blur();
			        //Si tiene padres deshabilitarlos
			        if(settings.parent){
			        	if(typeof settings.parent === 'string'){
			        		$('#' + settings.parent).rup_select("disable"); 
			        	}else{
		                   $.each(settings.parent, function (ind, elem) {
		                	 $('#' + elem).rup_select("disable"); 
	                      });
			        	}
			        }
			        let $request = undefined;
			        if (settings.autocomplete) {
			        	//Meter busqueda accentFolding
			            var term = '';

			            term = params.data.q;


			            term = term.replace(/%/g, '\\%').replace(/_/g, '\\_');
			            params.data = $.extend({
			              q: term,
			              c: settings.contains
			            }, settings.extraParams);
			        }
			        if (settings.parent) {
			        	var datosParent = _this._getParentsValues(settings, true);
			        	if(datosParent != ''){
			        		if(settings.autocomplete){//añadir el data del padre
			        			let padres = datosParent.split('&');//split por si tiene varios padres	
			        			$.each(padres, function () {
			        				if(this !== undefined){
					        			let cad = this.split('=');
					        			if(cad != undefined && cad.length > 0){
					        				params.data[cad[0]] = cad[1];
					        				__cachekey = __cachekey + cad[1];//se añade la parte del padre
					        			}
			        				}
			        			});
			        		}else if(params.url.indexOf(datosParent) < 0){//Aseguramos que mete el valor del padre.
			        			params.url = params.url + '?' + datosParent;
			        		}
			        		$request = $.ajax(params);
			        	}
			        }else{
			        	$request = $.ajax(params);
			        }
			        if($request != undefined){
				        $request.then(function(data) {// Vuelve la peticion
				    
				          // store data in cache
				          __cache[__cachekey] = data;
				          // display the results
				          $('#' + settings.id).rup_select("enable");
					        //Si tiene padres deshabilitarlos
					        if(settings.parent){
					        	if(typeof settings.parent === 'string'){
					        		$('#' + settings.parent).rup_select("enable"); 
					        	}else{
				                   $.each(settings.parent, function (ind, elem) {
				                	 $('#' + elem).rup_select("enable"); 
			                      });
					        	}
					        }
				          success(__cache[__cachekey]);
				          // Actualizar seleccionado en la lista//css
				          let positions = [];
				          let valueSelect = $('#' + settings.id).rup_select('getRupValue');
				          
				          if(settings.groups){// Parseo de grupos para
												// seleccionar
				        	  let allFacts = [];
				              // grupos
				              for (var i = 0; i < data.length; i = i + 1) {
				                if (typeof(data[i]) === 'object') {
				                 $.each(data[i], function (key, value) {
				 	                if (typeof(value) === 'object') {
						                 $.each(value, function () {
						                	 allFacts.push(this);
						                 });
						                }
				                 });
				                }
				              }
				        	  data = allFacts;
				        	  settings.optionsGroups = data;
				          }
				         //Se obliga a que las claves sean String recomendado por select2
				          let seleccionado = $.grep(data, function (v,index) {
				        	  	v.id = String(v.id);
				        	  	if(v.id == valueSelect){
				        	  		positions.push(index);
				        	  	}
			                    return v.nid == settings.selected || v.id == settings.selected;
			                  });
				          if( $('#' + settings.id).rup_select('getRupValue') != ''){
				        	  seleccionado = $.grep(data, function (v) {
				                    return v.id == $('#' + settings.id).rup_select('getRupValue');
				                  });
				          }
				          // Si es el mismo, no cambia porque esta abirendo
				          let mySelect = $('#' + settings.id).data('select2');
				          if(seleccionado !== undefined && seleccionado.length == 1 && $('#' + settings.id).rup_select('getRupValue') != seleccionado[0].id){
				        	  if(settings.multiple){// Revisar varios selects
				        		  $('#' + settings.id).rup_select('setRupValue',[seleccionado[0].id]);
				        	  }else{
				        		  $('#' + settings.id).rup_select('setRupValue',seleccionado[0].id);
				        	  }
				        	  
			                  $.each(positions, function (index,valor) {
			                	  let $option = mySelect.$results.find('li')[valor];
			                	  if($option != undefined){
			                		  $($option).attr('aria-selected', 'true');
			                	  }
			                    });
				          }else{
				        	  if(settings.autocomplete){
				        		  let valorInput = mySelect.selection.$selection.find('input').val() 
				        		  $('#' + settings.id).rup_select('setRupValue',settings.blank);
				        		  mySelect.selection.$selection.find('input').val(valorInput); 
				        		  mySelect.selection.$selection.find('input').focus();
				        	  }else{
				        		  $('#' + settings.id).rup_select('setRupValue',settings.blank);
				          	  }
				          }
				          
				         if (settings.onLoadSuccess !== null && settings.onLoadSuccess !== undefined) {
				            jQuery(settings.onLoadSuccess($('#' + settings.id)));
				          }
				          $('#' + settings.id).data('settings', settings);
	              		  $('#' + settings.id).triggerHandler('selectAjaxSuccess', [data]);
	              		  if(settings.firstLoad){
	              			if(settings.autocomplete && settings.selected == undefined && settings.defaultValue != undefined && data != undefined &&
	              					($('#' + settings.id).rup_select('getRupValue') == '' || $('#' + settings.id).rup_select('getRupValue') == settings.blank)){
	              				//setear el valor para el defaultValue
	                            var datos2 = $.grep(data, function (v) {
	                                return v.text.toUpperCase() === settings.defaultValue.toUpperCase();
	                              });

	                              if (datos2[0] != undefined) {
	                            	  $('#' + settings.id).rup_select('setRupValue',datos2[0].id);
	                              }
	              			}
	              			settings.firstLoad = false;
	              			settings.selected = '';
	              		  }
				        });
				        $request.fail(failure);
			        }else{// cerrar
			        	$('#' + settings.id).select2('close');
			            if (settings.parent) {
			                if (typeof settings.parent === 'string') {
			                  $('#' + settings.parent).rup_select("enable");
			                } else {
			                  $.each(settings.parent, function (ind, elem) {
			                    $('#' + elem).rup_select("enable");
			                  });
			                }
			              }
			        }
			        return $request;
				}
		    	
		    	
			if(settings.ajax !== undefined){
		    	if(settings.data !== undefined){// PAra añadir más parametros de
												// busqueda
		    		settings.ajax.data = settings.data;
		    	}
		    	
		    	if(settings.autocomplete){
		    		//busqueda accentFolding
		    		let term = '';
		    		let mySelect = $('#' + settings.id).data('select2');
		    		if($('input.select2-search__field') != undefined && $('input.select2-search__field').val() != undefined){
		    			term = $('input.select2-search__field').val();
		    		}
		    		if(settings.contains == undefined){
		    			settings.contains = true;
		    		}

		    		term = term.replace(/%/g, '\\%').replace(/_/g, '\\_');
		    		settings.ajax.data = $.extend({
		    	          q: term,
		    	          c: settings.contains
		    	        }, settings.extraParams);
		    	}
		    	
		    	if(settings.sourceParam){// modifica el header para parsear
											// la response
		    		settings.ajax.headers = {'RUP':$.toJSON(settings.sourceParam)};
		    	}
		    	if(settings.processResults){// modifica los results
		    		settings.ajax.processResults = settings.processResults;
		    	}
			}
			

        	if(settings.multiple){
         		$('#' + settings.id).select2MultiCheckboxes(settings);
        	}else{
                if (settings.placeholder == undefined || settings.placeholder == '') {
                    // si es vació se asigna el label
                    settings.placeholder = rupSelect._getBlankLabel(settings.id);
                 }
        		if(settings.autocomplete){
        			$('#' + settings.id).select2MultiCheckboxes(settings);
        		}else{
        			$('#' + settings.id).select2(settings);
        		}
        	}
			
    	 	if(settings.firstLoad){// ejecutar los datos
    	 		
    	 		let $el = $('#' + settings.id);
    	 		let mySelect = $el.data('select2');
    	 		let $search = mySelect.dropdown.$search || mySelect.selection.$search;
    	 		if(settings.autocomplete && settings.defaultValue != undefined){
    	 			mySelect.$container.find('input').val(settings.defaultValue);
    	 		}
    	 		if($search != undefined){
    	 			$search.trigger('keyup');
    	 			$el.select2('close');
    	 		}else{
    	 			mySelect.selection.trigger('toggle');
    	 			$el.select2('close');
    	 		}
    	 	}
 
        },
        /**
		 * Método de inicialización del componente.
		 * 
		 * @function _textIcon
		 * @private
		 * @param {object}
		 *            data - Dato que llega, por cada registro.
		 */
        _textIcon: function (data) {
        	let stylePosition = 'M';// B - Before , M - middle , A - After
        	// adjust for custom placeholder values, restaurar
            if (data.stylePosition === undefined) {
              // usar la de defecto
              data.stylePosition = stylePosition;
            }

            let _span = $('<span/>');

            let icon = $('<i class="mdi mdi-' + data.style + '"></i>');
            if(data.imgStyle){// en lugar d mdi,clase icon.
            	_span.addClass(data.style );
            	icon = $('<span class="ui-selectmenu-item-icon ui-icon "></span>');
            	if(data.stylePosition.toUpperCase() === 'M'){
            		data.stylePosition = 'B';// en caso de ser span, no
												// admite texto en medio
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
		 * @function _createOption
		 * @private
		 * @param {object}
		 *            settings - Objeto de propiedades de configuración con el
		 *            que se ha inicializado el componente.
		 * @param {object}
		 *            data - Dato que llega, por cada registro.
		 */
        _createOption: function (settings,data) {
            let newOption = new Option(data.text, data.id, false, false);

            if (data.style != null) {
              newOption.setAttribute('style', data.style);
              newOption.setAttribute('imgStyle', data.imgStyle);
            }

            $('#' + settings.id).append(newOption);
        },
        /**
         * Gestiona los parámetros a añadir en la URL para que Hdiv permita la llamada.
         *
         * @function _generateUrl
         * @since UDA 5.2.0
         * @private
         * @param {object} settings - Configuración del componente.
         * @param {string} [data] - Valores de búsqueda cuando tiene autocompletado e identificador de los padres en caso de ser enlazados.
         */
		_generateUrl: function(settings, data) {
			let $form;
			
			if (settings.$forceForm) {
				$form = settings.$forceForm;
			} else {
				$form = settings.inlineEdit?.$auxForm ? settings.inlineEdit?.$auxForm : $('#' + settings.id).closest('form');
			}
			
			const name = settings.inlineEdit?.auxSiblingFieldName ? settings.inlineEdit?.auxSiblingFieldName : settings.name;
			
			if ($form.length === 1) {
				let url = settings.url + (settings.url.includes('?') ? '&' : '?') + '_MODIFY_HDIV_STATE_=' + $.fn.getHDIV_STATE(undefined, $form);

				if (data) {
					// Escapa los caracteres '#' para evitar problemas en la petición.
					url += "&" + data.replaceAll('#', '%23');
				}

				return url + '&MODIFY_FORM_FIELD_NAME=' + name;
			} else {
				return settings.url;
			}
		},
        /**
		 * Método de inicialización del componente.
		 * 
		 * @function _init
		 * @private
		 * @param {object}
		 *            args - Parámetros de inicialización del componente.
		 */
        _init: function (args) {
        	_this = this;
        	global.initRupI18nPromise.then(() => {
	            if (args.length > 1) {
	                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
	            } else {
	                // Se recogen y cruzan las paremetrizaciones del objeto
	                var settings = $.extend({}, $.fn.rup_select.defaults, args[0]),
	                    html, loadAsLocal = false,
	                    isValidableElem = false,
	                    attrs;
	
	                // Se recoge el tabindex indicado en el elemento
	                settings.tabindex = $(this).attr('tabindex');
	
	                // Sobreescribir literales por defecto para
					// multiselect:REVISAR
	               // $.extend($.ech.multiselect.prototype.options,
					// $.rup.i18n.base.rup_select.multiselect);
	
	                // Se carga el identificador del padre del patron
	                settings.id = $.rup_utils.escapeId($(this).attr('id'));
	                if($(this).attr('name') === undefined){
	                	$(this).attr('name',settings.id);
	                }
	                settings.name = $(this).attr('name');
	                $('#' + settings.id).attr('ruptype', 'select');
	
	                // Si no se recibe identificador para el acceso a literales
					// se usa el ID del objeto
	                if (!settings.i18nId) {
	                    settings.i18nId = settings.id;
	                }
	
	                // Guardar valor del INPUT
	                settings.inputValue = $('#' + settings.id).val() === null ? $('#' + settings.id).prop('value') : $('#' + settings.id).val();
	
	                attrs = $(this).prop('attributes');
	
	                // Revisar apra el select
	                if (settings.firstLoad === null && ($(this).is('select') && settings.loadFromSelect)) {
	                    loadAsLocal = true;
	                }
	
	                
	
	                // Asociar evento CHANGE para propagar cambios a los hijos
	                $('#' + settings.id).on('change', function () {
	                    
	                });
	                
	                // tratar placeHolder
	                if(settings.placeholder !== undefined && typeof settings.placeholder == 'string'){
	                	 if(!settings.allowClear){
		                	settings.templateSelection = function (data,span) {
		                        if (data.id === settings.blank) { // adjust
																	// for
																	// custom
																	// placeholder
																	// values,
																	// restaurar
		                        	return $('<span class="select2-selection__placeholder">' + data.text + '</span>');
		                        }
		                        
		                        chargedStyles(data);
		                		
		                        if (data.style != null && data.id !== settings.blank) {
		                            // adjust for custom placeholder values,
									// restaurar
		                            return _this._textIcon(data);
		                          }
	
		                        return data.text;
		                      }
		                	if(settings.placeholder == ''){// si es vació se
															// asigna el label
		                		settings.placeholder = this._getBlankLabel(settings.id)
		                	}
		                	if(settings.data !== undefined && !settings.multiple){// y si
																					// no
																					// es
																					// multiple
		                		if(settings.parent == undefined){
		                			// Si no tiene padre se mete en todos los
									// valores, sino solo al data,
		                			settings.data.unshift({id:settings.blank , text:settings.placeholder});
		                		}else {
		                            $.each(settings.data, function (index, value) {
		                            	value.unshift({id:settings.blank , text:settings.placeholder})
		                              });
		                		}
		                	}
	                	 }else if($('#' + settings.id).find('option').length == 0){// revisar
																					// y
																					// crear
																					// option
																					// vacio.
	                		 $('#' + settings.id).append(new Option("", ""));
	                	 }
	                }
	                
	                // Crear mi template, myTemplate
	                if(settings.myTemplate !== undefined){
	                	settings.templateSelection = settings.myTemplate;
	                }
	                
	                if( settings.templateResult === undefined ){
	                	if(settings.multiple && settings.udaSkill){// Si es
																	// multiple,
																	// los
																	// results
																	// cambian
	                		// settings.templateSelection
	                		settings.templateSelection = function (data,span) {
		                		// Template de Uda
		                        return data.text;
		                      }
	                	}else{// si no es multiple
		                	if(settings.templateSelection !== undefined){// mirar
																			// los
																			// iconos
			                	settings.templateResult = function (data,span) {
			                		chargedStyles(data);
			                		if (data.id === settings.blank) {
			                			return $('<span class="select2-selection__placeholder">' + data.text + '</span>');
			                		}else  if (data.style != null && data.id !== settings.blank) { // adjust
																									// for
																									// custom
																									// placeholder
																									// values,
																									// restaurar
			                			return _this._textIcon(data);
			                        }
		
			                        return data.text;
			                      }
			                }else{
			                	settings.templateResult = function (data,span) {
			                		chargedStyles(data);
			                		if (data.style != null && data.id !== settings.blank) { // adjust
																							// for
																							// custom
																							// placeholder
																							// values,
																							// restaurar
			                			return _this._textIcon(data);
			                        }
		
			                        return data.text;
			                      }
			                	settings.templateSelection  = settings.templateResult ;
			                }
	                	}
	                }
	                
	
	                // Borrar referencia
	                // delete html;
	
	                // Ocultar posibles elementos de fechas/horas
	                $('#' + settings.id).next('a').click(function () {
	                    $('#ui-datepicker-div').hide();
	                });
	
	                // Se audita el componente
	                $.rup.auditComponent('rup_select', 'init');
	                
	                // Añade clase Personalizada
	                if (settings.customClasses) {
	                $.each(settings.customClasses, function (index, value) {
	                    $('#' + settings.id + '-button' + ', #' + settings.id + '-menu').addClass(value);
	                    $('[for=' + settings.id + ']').addClass(value);
	                  });
	                }
	                
	              // Si no se recibe identificador para el acceso a literales
					// se usa el ID del objeto
	                if (!settings.i18nId) {
	                    settings.i18nId = settings.id;
	                }
	                
	                // ORDEN
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
	                
	                if (settings.data || settings.dataGroups) {// local y
																// groups
		            	if(settings.sortered === true){// PAra añadir
														// ordenación, en local
														// hay que marcarlo
		            		settings.sorter = ordenFunction;
		    			}else if(settings.sortered !== false){
		    				settings.sorter = settings.sortered;
		    			}
		            	if(settings.dataGroups === undefined){// LOcal
		            		settings.data = this._parseLOCAL(settings.data,settings.i18nId,settings.parent);
		            	}else{// grupos
		            		  let optionsGroups = [];
		            	      for (var i = 0; i < settings.dataGroups.length; i = i + 1) {
		            	          if (typeof settings.dataGroups[i] === 'object') {
		            	        	  settings.dataGroups[i].children = this._parseLOCAL(settings.dataGroups[i].children,settings.i18nId,settings.parent);
		            	        	  for (var j = 0; j < settings.dataGroups[i].children.length; j = j + 1) {
		            	        		  optionsGroups.push(settings.dataGroups[i].children[j]);
		            	        	  }
		            	          } 
		            	      }
		            	      settings.optionsGroups = optionsGroups;
		            	      settings.data = settings.dataGroups;
		            	}
	                	
	                }else if(!settings.ajax && settings.url != null){// remoto
		            	if(settings.sortered === undefined){// PAra añadir
															// ordenación, en
															// remoto siempre se
															// ordena por
															// defecto.
		            		settings.sorter = ordenFunction;
		    			}else if(settings.sortered !== false){
		    				settings.sorter = settings.sortered;
		    			}
	                	this._loadRemote(settings,true);
		           } else {// por si viene cargado de un select
		        	   settings.data = true;
		        	   if(settings.parent){//convertir el data, formato parent	
		        		   settings.data = [];
		        		   $('#'+settings.id).find('option').each(function () {
		        			   let idPadre = $(this).data('idpadre');
		        			   if(idPadre != undefined){
		        				   //si no existe
		        				   if(settings.data[idPadre] === undefined){
		        					   settings.data[idPadre] = []; 
		        					   if (settings.placeholder != undefined || settings.placeholder != '') {
		        						   settings.data[idPadre].push({id:settings.blank, text:settings.placeholder});
		        					   }
		        				   }
		        				   settings.data[idPadre].push({id:$(this).val(), text:$(this).text()});
		        			   }
		        	            
		        	          });
		        	   }
		           }
	                
	                // Init eventos: El resto van en el propio subyacente
	                // Change
	                if(settings.change){
	                	if(!settings.clean){
	                		$('#' + settings.id).off('select2:clearing');
		                	$('#' + settings.id).on('select2:clearing', function (e) {
		                		settings.change(e);
		                	});
	                	}
	                }
	                // clean
	                if(settings.clean){
	                	$('#' + settings.id).off('select2:clearing');
	                	$('#' + settings.id).on('select2:clearing', function (e) {
	                		settings.clean(e);
	                	});
	                }
	                // event select
	
                	$('#' + settings.id).off('select2:select');
                	$('#' + settings.id).on('select2:select', function (e) {
                        if(settings.autocomplete){//Change input
                        	let mySelect2 = $('#' + settings.id).data('select2');
                        	let data = $(this).select2('data')[0];
                            mySelect2.$selection.find('input').val(data.text);
                        }
                        if(settings.select){
                        	settings.select(e);
    	                }
                        if(settings.change){
                        	settings.change(e);
    	                }
                		
                	});
	                if (settings.data) {// local y groups
	                	if(settings.parent){// si depende de otro selects.
	                		// Si es uno meterlo como string - local
	                		if(typeof settings.parent == 'object' && settings.parent.length == 1){
	                			settings.parent = settings.parent[0];
	                		}
	                		
	                		if(settings.dataParents === undefined){// la
																	// primera
																	// vez carga
																	// los datos
																	// fijos.
	                			settings.dataParents = settings.data;
	                		}
	                		let valorValue = _this._getParentsValues(settings,false,settings.multiValueToken);
	                		if(valorValue != ''){	                			
	                			valoresParent = settings.dataParents[valorValue];
	                			if(valoresParent == undefined && settings.dataParents[0] != undefined){
	                				valoresParent = settings.dataParents[0][valorValue]
	                			}
	                			settings.data = valoresParent;
	                			if(settings.data == undefined){
	                				settings.data = [];
	                			}
	                		}
	                	}
	                	

	                	if(settings.multiple){
	 	                        $('#' + settings.id).select2MultiCheckboxes(settings);
	                	}else{	  
	                        if (settings.placeholder == undefined || settings.placeholder == '') {
	                            // si es vació se asigna el label
	                            settings.placeholder = _this._getBlankLabel(settings.id);
	                         }
	                		if(settings.autocomplete){//local y autocomplete
	                			if(settings.matcher == undefined && settings.accentFolding == false){
	                				settings.matcher = udaMatcher;
	                			}
	        
	                			$('#' + settings.id).select2MultiCheckboxes(settings);
	                			if(settings.defaultValue != undefined){
	                				let mySelect2 = $('#' + settings.id).data('select2');
	                				mySelect2.$selection.find('input').val(settings.defaultValue);
	                				if(settings.selected == undefined && mySelect2.dataAdapter._dataToConvert != undefined && mySelect2.dataAdapter._dataToConvert.length > 0){
		                			    let data = $.grep(mySelect2.dataAdapter._dataToConvert, function (v) {
		                			        return v.text.toUpperCase() === settings.defaultValue.toUpperCase();
		                			    });
		                			    if(data[0] != undefined){
		                			    	settings.selected = data[0].id;
		                			    }
	                				}
	                   			}
	                		}else{
	                			$('#' + settings.id).select2(settings);
	                		}
	                		//Propiedad para deselecionar una mismo en simple.
	                		if(settings.deleteOnDeselect){
			                	
	                			let mySelect2 = $('#' + settings.id).data('select2');
			                	mySelect2.on('close', function (e) {
				                	if (Object.keys(e).length === 1) {
				                	  mySelect2.$selection.find('input').val('');
					                  $('#' + settings.id).val(null).trigger('change');
					                  if(!settings.closeOnSelect){
					                	  $('#' + settings.id).select2('open');
					                  }
					                }
			                	});
	
	                		}
	                	}
		                
		                if(settings.selected){
		                	$('#' + settings.id).val(settings.selected).trigger('change')
		                }
		                // cargar los options
		                settings.options = settings.data;
		                
	                }else{//Remotos
                		//Propiedad para deselecionar una mismo en simple.
                		if(settings.deleteOnDeselect){
		                	
                			let remotoSelect = $('#' + settings.id).data('select2');
                			remotoSelect.on('close', function (e) {
			                	if (Object.keys(e).length === 1) {
			                		remotoSelect.$selection.find('input').val('');
				                  $('#' + settings.id).val(null).trigger('change');
				                  if(!settings.closeOnSelect){
				                	  $('#' + settings.id).select2('open');
				                  }
				                }
		                	});

                		}
	                }
	                if(settings.parent){// si dependen de otros selects
	                	// Mirar si es simple o no
	                	let parent = [];
	                	if(typeof settings.parent == 'string'){
	                		parent.push(settings.parent );
	                	}else{
	                		// Si es uno meterlo como string -remoto
	                		if(settings.parent.length == 1){
	                			settings.parent = settings.parent[0];
	                			parent.push(settings.parent );
	                		}else{
	                			parent = settings.parent ;
	                		}
	                	}
	                	// Bucle para eventos Padres
	                	$.each(parent, function (idx, eventoPadre) {
		                	$('#' + eventoPadre).off('change.parent'+ settings.id);
			                $('#' + eventoPadre).on('change.parent'+  settings.id, function (){// Cambios
																					// para
																					// los
																					// hijos,onchange
																					// del
																					// padre
			                	
			                	
			                	// Si soy local
			                	if(settings.data !== undefined){
			                		
			                		if(typeof settings.parent == 'object'){// Si
																			// tiene
																			// más
																			// de
																			// un
																			// padre
			                			let clave = '';
			                			let ClaveNoCifrar = '';
			                			if(settings.multiValueToken == undefined){
			                				settings.multiValueToken = '';
			                			}
			                			$.each(settings.parent, function (ind, elem) {
			                				let val = $('#' + elem).rup_select('getRupValue');
			                		        clave = clave + val + settings.multiValueToken  ;
			                		        let dataSelected = $('#'+elem).rup_select("getDataSelected");
			                		        if(dataSelected !== undefined){
			                		        	val = dataSelected.nid || dataSelected.id;
			                		        	ClaveNoCifrar = ClaveNoCifrar + val + settings.multiValueToken  ;
			                		        }
			                		    });
			                			clave = clave.substring(0,clave.length - settings.multiValueToken.length);
			                			ClaveNoCifrar = ClaveNoCifrar.substring(0,ClaveNoCifrar.length - settings.multiValueToken.length);
			                			let datosParents = settings.dataParents[0] || settings.dataParents;
			                			if(datosParents[clave] != undefined || datosParents[ClaveNoCifrar] != undefined){// Datos
																						// Cargados
			                				let valores = datosParents[clave] || datosParents[ClaveNoCifrar];
			                				settings.data = datosParents;
			                				$('#'+settings.id).rup_select("setSource", valores);
			                			}
			                		}else{// si tiene un solo padre
				                		let val = $('#'+settings.parent).rup_select('getRupValue');
				                		if(val != settings.blank && val != ''){
				                			$('#'+settings.id).rup_select("enable");
					                		let valores = settings.dataParents[val];
					                		if(valores == undefined && $('#'+settings.parent).rup_select("getDataSelected") !== undefined){
					                			let nid = $('#'+settings.parent).rup_select("getDataSelected").nid;
					                			valores = settings.dataParents[nid];//si vine cifrado de un remoto.
					                		}
					                		settings.data = settings.dataParents;
					                		if(valores == undefined){// Si no
																		// hay
																		// valor,
																		// se
																		// inicializa
					                			valores =[];
					                		}
					                		$('#'+settings.id).rup_select("setSource", valores);
				                		}else{//deshabilitamos el hijo
				                			$('#'+settings.id).rup_select("disable");
				                		}
			                		}
	
			                		// Aseguramos el valor limpio al cambiar el
									// padre
			                		$('#'+settings.id).rup_select("setRupValue",settings.blank);
			                	}else{// si soy Remoto
			                		
			                		let datosParent = _this._getParentsValues(settings, true);
			                		
			                		// Sola llamar si el padre tiene valor.
			                		if(datosParent != ''){
			                			$('#' + settings.id).rup_select("disable");
	                		          // ejecutar los datos
	                		          let $el = $('#' + settings.id);
	                		          let $search = $el.data('select2').dropdown.$search || $el.data('select2').selection.$search;
	                		          if(settings.autocomplete){
	                		        	  $el.data('select2').$container.find('input').val('');  
	                		          }
	                		          
	                		          if($search != undefined){
	                		        	  $search.trigger('keyup');
	                		        	  $el.select2('close');
	                		          }
	                		         
	                		          if($("#" + settings.id).val() != null && $("#" + settings.id).val().trim() != ''){
	                		        	  $("#" + settings.id).val(null).trigger('change');
	                		          }
	                		          setTimeout($('#' + settings.id).rup_select("enable"), 200);
	                		          
			                		}else if($("#" + settings.id).val() != null && $("#" + settings.id).val().trim() != ''){
			                			// Se llama al cambio del trigger.
			                			$("#" + settings.id).val(null).trigger('change');
			                			$('#'+settings.id).rup_select("disable");
			                		}
			                	}
			                	
			                });
	                	});
		                // Fin funcion evento padre
	                }
	                $('#' + settings.id).data('settings', settings);
	                //Si es remoto, el último evento es: selectAjaxSuccess
	                $('#' + settings.id).triggerHandler('selectFinish', settings);
	            }
        	}).catch((error) => {
                console.error('Error al inicializar el componente:\n', error);
            });
        }
    });

    // ******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    // ******************************************************

    /**
	 * Función a ejecutar en caso de producirse un error a la hora de obtener
	 * los elementos a mostrar.
	 * 
	 * @callback jQuery.rup_select~onLoadError
	 * @param {Object}
	 *            xhr - Objeto XHR que contiene la respuesta de la petición
	 *            realizada.
	 * @param {string}
	 *            textStatus - Texto que identifica el error producido.
	 * @param {Object}
	 *            errorThrown - Objeto error que contiene las propiedades del
	 *            error devuelto en la petición.
	 */

    /**
	 * Función a ejecutar en caso de producirse un error a la hora de obtener
	 * los elementos a mostrar.
	 * 
	 * @callback jQuery.rup_select~onLoadSuccess
	 * @param {jQuery}
	 *            self - Referencia al objeto jQuery del propio select.
	 */

    /**
	 * @description Opciones por defecto de configuración del componente.
	 * 
	 * @name defaults
	 * 
	 * @property {jQuery.rup_select~onLoadError} [onLoadError] - Función de
	 *           callback a ejecutar en caso de que se produzca un error en la
	 *           petición de obtención de la lista de elementos a mostrar.
	 * @property {string} [width='100%'] - Determina el tamaño del componente 
	 *           tanto en píxeles como en porcentaje. Su valor por defecto es '100%'.
	 * @property {string} [blank=null] - Se utiliza para declarar un valor
	 *           independiente de la lógica de negocio y en ocasiones se
	 *           representa como "Seleccione un elemento". Permite establecer un
	 *           mensaje independiente por cada select haciendo uso de
	 *           $.rup.i18n.app.id._blank (sustituyendo id por el propio de cada
	 *           select) o uno genérico por aplicación haciendo uso de
	 *           $.rup.i18n.app.rup_select.blank. En caso de no definir ninguno,
	 *           se usará el genérico de UDA,
	 *           $.rup.i18n.base.rup_select.blankNotDefined.
	 * @property {string} [token="|"] - Define el separador a utilizar cuando se
	 *           muestra el valor asociado al select concatenado al literal.
	 * @property {string} [multiValueToken="##"] - Define el separador a
	 *           utilizar en selects enlazados locales.
	 * @property {boolean} [ordered=true] - Indica si el select debe ordenarse.
	 * @property {boolean} [orderedByValue=false] - Indica si el la ordenación
	 *           del seelct debe realizarse por el valor de los elementos en
	 *           lugar de por el texto.
	 * @property {jQuery.rup_select~onLoadSuccess} [onLoadSuccess=null] - Función
	 *           de callback a ejecutar en el caso de que la petición de carga
	 *           de datos se haya producido correctamente.
	 * @property {boolean} [loadFromSelect=false] - Determina si se debe de
	 *           utilizar los elementos option del elemento html sobre el que se
	 *           inicializa el componente para inicializar los datos del
	 *           elemento.
	 * @property {boolean} [multiOptgroupIconText=false] - Indica si se desea
	 *           que en la selección múltiple con grupos, el nombre del grupo
	 *           tenga descripción en los iconos para seleccionar/deseleccionar
	 *           los elementos del grupo.
	 * @property {boolean} [submitAsString=false] - Indica si el envío de los
	 *           elementos seleccionados en la selección múltiple se realiza
	 *           como un literal separados por coma.
	 * @property {boolean} [submitAsJSON=false] - Indica si el envío de los
	 *           elementos seleccionados en la selección múltiple se realiza
	 *           como un array JSON donde el nombre del mapa será el nombre del
	 *           select. En el caso de que el nombre contenga notación dot se
	 *           tomará el último literal. Ej: [{id:1}, {id:2}, …].
	 * @property {boolean} [readAsString=false] - Determina si la asignación de
	 *           un valor inicial se va a realizar a partir de un string con los
	 *           ids de los elementos separados por comas en vez de un array de
	 *           json.
	 * @property {boolean} [rowStriping=false] - Indica si se debe aplicar un
	 *           estilo diferente a las filas pares e impares para poder
	 *           distinguirlas mediante un color diferente.
	 * @property {number} [typeAhead=false] - Especifica en milisegundos el
	 *           tiempo de espera que toma el componente antes de procesar los
	 *           eventos de escritura realizados por el usuario.
	 * @property {number} [legacyWrapMode=false] - Determina si se emplea el
	 *           método obsoleto a la hora de empaquetar en objetos json los
	 *           elementos seleccionados. Su propósito es mantener la
	 *           retrocompatibilidad.
	 */
    $.fn.rup_select.defaults = {
        onLoadError: null,
        width: '100%',
        customClasses: ['select-material'],
        blank: "-1",
        minimumResultsForSearch: Infinity,
        submitAsJSON: false,
        dataType: 'json',
        cache: true,
        multiple: false,
        multiValueToken:'##'
        };


}));

function chargedStyles(data){
	if(data.style === undefined && data.element !== undefined){// mirar estilo
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

function udaMatcher(params, data) {
    // Always return the object if there is nothing to compare
    if ($.trim(params.term) === '') {
      return data;
    } // Do a recursive check for options with children


    if (data.children && data.children.length > 0) {
      // Clone the data object if there are children
      // This is required as we modify the object to remove any non-matches
      var match = $.extend(true, {}, data); // Check each child of the option

      for (var c = data.children.length - 1; c >= 0; c--) {
        var child = data.children[c];
        var matches = matcher(params, child); // If there wasn't a match, remove the object in the array

        if (matches == null) {
          match.children.splice(c, 1);
        }
      } // If any children matched, return the new object


      if (match.children.length > 0) {
        return match;
      } // If there were no matching children, check just the plain object


      return matcher(params, match);
    }

    var original = data.text.toUpperCase();
    var term = params.term.toUpperCase(); // Check if the text contains the term

    if (original.indexOf(term) > -1) {
      return data;
    } // If it doesn't contain the term, don't return anything


    return null;
  }