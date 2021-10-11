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
 	              	if(data[0] !== undefined){
 	              		$('#' + settings.id).append('<option value="'+param+'">'+data[0].text+'</option>');
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
            	$self.select2("destroy");
            	$self.find('option').remove();
            	$self.rup_select(settings);
        	}
    	}
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_select('extend', {
        /**
         * Establece un elemento del select por posición o valor.
         *
         * @function  _setElement
         * @private
         * @param {object} selector - Referencia al objeto jQuery del combo.
         * @param {object} param - Value correspondiente.
         * @param {boolean} multicombo - Indica si el combo permite la multiselección.
         * @param {boolean} markOptSelected - Determina si se debe marcar como seleccionado el elemento.
         */
        _setElement: function (selector, param, multicombo, markOptSelected) {
            if (multicombo !== true) {
                //Simple > selectmenu
                if (typeof param === 'string') {
                    if ($('option[value=\'' + param + '\']', selector).length > 0) { //Controlamos que se intenten seleccionar un valor existente
                        if (markOptSelected === true) {
                            $('option[value=\'' + param + '\']', selector).attr('selected', 'selected');
                        }
                        $(selector).selectmenu('value', param);
                        $(selector).trigger('_setElement');
                    } else {
                        return false;
                    }
                } else if (typeof param === 'number') {
                    if ($('option', selector).length >= param) { //Controlamos que se intenten seleccionar una posición existente
                        if (markOptSelected === true) {
                            $('option:eq(' + param + ')', selector).attr('selected', 'selected');
                        }
                        $(selector).selectmenu('index', param);
                        $(selector).trigger('_setElement');
                    } else {
                        return false;
                    }
                } else {
                    $(selector).selectmenu('index', 0);
                    $(selector).trigger('_setElement');
                }
                return true;
            } else {
                //Multiple > multiselect
                if (param !== null && typeof param === 'object') {
                    //Recorrer array parametros
                    for (let i = 0; i < param.length; i++) {
                        if (typeof param[i] === 'number') { //Acceso por posición
                            $($('input[name=\'multiselect_' + $(this).attr('id') + '\']')[param[i]]).attr('checked', true);
                        } else if (typeof param[i] === 'string') { //Acceso por valor
                            $('input[name=\'multiselect_' + $(this).attr('id') + '\'][value=\'' + param[i] + '\']').attr('checked', true);
                        }
                    }
                    // Se altualiza el valor almacenado en el objeto HTML select.
                    $(selector).val(param).trigger('_setElement');
                    //Actualizar literal de elementos seleccionados
                    $(selector).multiselect('update');
                }
                return true;
            }
        },
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
            // Comprueba si el combo tiene su propio texto personalizado
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
         * Realiza el formateo de los registros que se muestran en la lista desplegable del combo.
         *
         * @function  _defaultFormatting
         * @private
         */
        _defaultFormatting: function (text) {
            var findreps = [{
                find: /^([^\-]+) \- /g,
                rep: '<span class="ui-selectmenu-item-header">$1</span>'
            },
            {
                find: /([^\|><]+) \| /g,
                rep: '<span class="ui-selectmenu-item-content">$1</span>'
            },
            {
                find: /([^\|><\(\)]+) (\()/g,
                rep: '<span class="ui-selectmenu-item-content">$1</span>$2'
            },
            {
                find: /([^\|><\(\)]+)$/g,
                rep: '<span class="ui-selectmenu-item-content">$1</span>'
            },
            {
                find: /(\([^\|><]+\))$/g,
                rep: '<span class="ui-selectmenu-item-footer">$1</span>'
            }
            ];
            for (let i in findreps) {
                text = text.replace(findreps[i].find, findreps[i].rep);
            }
            return text;
        },
        /**
         * Obtener valores de los combos padres (si no están cargados o valores 'vacíos' devuelve null). En caso de disponer de varios combos padres se devolverán separados por un caracter delimitador.
         *
         * @function  _getParentsValues
         * @private
         * @param {object[]} array - Array con los elementos a mostrar.
         * @param {boolean} remote - Determina si la fuente de datos es remota o no.
         * @param {string} multiValueToken - Caracter separador en el caso de devolver varios elementos.
         * @return {string} - Devuelve los values seleccionados de los combos padres.
         */
        _getParentsValues: function (array, remote, multiValueToken) {
            var retorno = '',
                id, texto, multiValueTokenAux = multiValueToken != null ? multiValueToken : '',
                parentBlankValue;
            //Puede que se lance una recarga de un combo sin padres
            if (array === undefined) {
                return retorno;
            }
            for (let i = 0; i < array.length; i = i + 1) {
                id = array[i];
                //Si tiene seleccionado la primera opción puede que está seleccionada opción vacia
                if ($('#' + id).rup_combo('index') === 0) {
                    texto = $('#' + id + '-button span:first-child').text();
                    //Comprobar si tiene valor por defecto (bien propio o valor base por no haberlo definido)
                    if (texto === $.rup.i18n.base.rup_combo.blankNotDefined ||
                        (($.rup.i18n.app[id] !== undefined) && (texto === $.rup.i18n.app[array[i]]._blank))) {
                        return null;
                    }
                }

                //Si el valor de algún padre es null (no se ha cargado aún)
                if ($('#' + id).data('settings').blank !== undefined && $('#' + id).data('settings').blank !== null) {
                    parentBlankValue = $('#' + id).data('settings').blank;
                } else {
                    parentBlankValue = '';
                }
                if ($('#' + id).val() === null || $('#' + id).val() === parentBlankValue) {
                    return null;
                }

                if (remote) {
                    retorno += $('#' + id).attr('name') + '=' + $('#' + id).val() + '&';
                } else {
                    retorno += $('#' + id).val() + multiValueTokenAux;
                }
            }
            //Evitar & o multiValueToken finales
            if (retorno !== '') {
                if (remote) {
                    retorno = retorno.substring(0, retorno.length - 1);
                } else {
                    retorno = retorno.substring(0, retorno.length - multiValueTokenAux.length);
                }
            }
            return retorno;
        },
        /**
         * Función principal en el proceso de crear un combo. Genera todos los elementos html y objetos js internos necesarios para el funcionamiento del mismo.
         *
         * @function  _makeCombo
         * @private
         * @param {object} settings - Parametros de configuración con los que se ha inicializado el combo.
         */
        _makeCombo: function (settings) {

            //Opción vacía
            if (settings.blank != null && $('#' + settings.id +' option[value="'+settings.blank+'"]').length == 0) {
                $('#' + settings.id).prepend($('<option>').attr('value', settings.blank).text(this._getBlankLabel(settings.id)));
            }

            //Gestionar Imagenes
            if (settings.imgs) {
                var icons = [],
                    values = [];
                $.map(settings.imgs, function (item) {
                    $.each(item, function (key, elemImg) {
                        if (key.indexOf('###') == -1) {
                            $('#' + settings.id + ' [value=\'' + key + '\']').addClass(elemImg);
                            icons[icons.length] = {
                                find: '.' + elemImg
                            };
                        } else {
                            values = key.split('###');
                            $('#' + settings.id + ' > [label=\'' + values[0] + '\'] > [value=\'' + values[1] + '\']').addClass(item[values[0] + '###' + values[1]]);
                            icons[icons.length] = {
                                find: '.' + item[values[0] + '###' + values[1]]
                            };
                        }
                    });
                });
                settings.icons = icons;
            }

            //Formato texto
            settings.format = settings.format === 'default' ? this._defaultFormatting : settings.format;

            //Almacenar los settings
            $('#' + settings.id).data('settings', settings);

            //Añadir evento change
            // if (settings.change) {
            // 	$('#' + settings.id).on('change', settings.change);
            // }

            //Tipo de combo
            if (!settings.multiselect) {
                //Simple > selectmenu
                $('#' + settings.id).selectmenu(settings);
                if (settings.selected !== undefined && settings.selected !== '') {
                    $('#' + settings.id).rup_combo('setRupValue', settings.selected);
                } else {
                    $('#' + settings.id).rup_combo('setRupValue', '');
                }

            } else {
                //Multiple > multiselect
                $('#' + settings.id).width('0'); //Iniciar a tamaño cero para que el multiselect calcule el tamaño

                // Si tiene porcentaje
                if ((typeof settings.width === 'string' || settings.width instanceof String) && settings.width.includes('%')) {
                    settings.minWidth = $('#' + settings.id).parent().width() * (parseInt(settings.width.slice(0, -1)) / 100);
                } else {
                    settings.minWidth = settings.width;
                }

                $('#' + settings.id).multiselect(settings);
                $('#' + settings.id).data('echMultiselect').button.attr('id', settings.id + '-button');
                $('#' + settings.id).rup_combo('refresh'); //Actualizar cambios (remotos)
                $('#' + settings.id).attr('multiple', 'multiple');

                // Asignación de eventos de teclado
                var self = this;
                $('#' + settings.id).data('echMultiselect').button.on('keypress.selectmenu', function (event) {
                    if (event.which > 0) {
                        self._typeAheadMultiselect(event.which, 'focus', settings);
                    }
                    return true;
                });
                //						$("#rup-multiCombo_remoteGroup_comboHijo").on('keypress', function(event) {
                $('#' + settings.id).data('echMultiselect').menu.delegate('label', 'keydown.multiselect', function (event) {
                    if (event.which > 0) {
                        self._typeAheadMultiselect(event.which, 'focus', settings);
                    }
                    return true;
                });



            }

            //Buscar el UL del combo y colocarlo tras el elemento sobre el que debe ir
            if ($.rup_utils.aplicatioInPortal()) {
                if (!settings.multiselect) {
                    //Simple > selectmenu
                    $('div.r01gContainer').append($('#' + settings.id + '-menu').parent());
                } else {
                    //Multiple > multiselect
                    $('div.r01gContainer').append($('#rup-multiCombo_' + settings.id));
                }
            }

            //Ordenar elementos del combo
            if (settings.ordered) {
                $('#' + settings.id).rup_combo('order', settings.orderedByValue, settings.orderAsNumber, settings.blank);
            }

            //Seleccionar elemento (valor del input, valor settings combo)
            if (!settings.loadFromSelect && (settings.inputValue === undefined || settings.inputValue === '') ||
                settings.loadFromSelect && settings.selected !== undefined) {
                this._setElement($('#' + settings.id), settings.selected, settings.multiselect, true);
            } else {
                if (settings.multiselect) {
                    //Convertir inputValue en array
                    if (Array.isArray(settings.inputValue) === false) {
                        settings.inputValue = settings.inputValue.split('##');
                    }

                }
                this._setElement($('#' + settings.id), settings.inputValue, settings.multiselect, true);
            }

            //Habilitar/Deshabilitar combo
            if (!settings.disabled) {
                $('#' + settings.id).rup_combo('enable');
            } else {
                $('#' + settings.id).rup_combo('disable');
            }

            //Habilitar/Deshabilitar elementos (multicombo)
            if (settings.multiselect) {
                if (settings.disabledOpts !== undefined) {
                    $('#' + settings.id).rup_combo('disableOptArr', settings.disabledOpts);
                }
                if (settings.enabledOpts !== undefined) {
                    $('#' + settings.id).rup_combo('enableOptArr', settings.enabledOpts);
                }
                $('#' + settings.id).multiselect('refresh');
            }

            //Si los padres están deshabilitados, se deshabilita el combo
            var padres = settings.parent;
            if (padres !== undefined) {
                $.each(padres, function (index, object) {
                    if ($('#' + object).rup_combo('isDisabled')) {
                        $('#' + settings.id).rup_combo('disable');
                        return;
                    }
                });
            }

            //Clases para el pijama
            if (settings.rowStriping) {
                if (!settings.multiselect) {
                    $('#' + settings.id + '-menu li:nth-child(2n+1):not(.ui-selectmenu-group)').addClass('rup-combo_odd');
                    $('#' + settings.id + '-menu li:nth-child(2n):not(.ui-selectmenu-group)').addClass('rup-combo_even');
                    $('#' + settings.id + '-menu li:nth-child(2n+1).ui-selectmenu-group').addClass('rup-combo_groupOdd');
                    $('#' + settings.id + '-menu li:nth-child(2n).ui-selectmenu-group').addClass('rup-combo_groupEven');
                } else {
                    $('#rup-multiCombo_' + settings.id + ' .ui-multiselect-checkboxes li:nth-child(2n+1):not(.ui-multiselect-optgroup-label)').addClass('rup-combo_odd');
                    $('#rup-multiCombo_' + settings.id + ' .ui-multiselect-checkboxes li:nth-child(2n):not(.ui-multiselect-optgroup-label)').addClass('rup-combo_even');
                    $.each($('#rup-multiCombo_' + settings.id + ' .ui-multiselect-optgroup-label'), function (index, value) {
                        if (index % 2 == 0) {
                            $(value).addClass('rup-combo_groupOdd');
                        } else {
                            $(value).addClass('rup-combo_groupEven');
                        }
                    });
                }
            }

            // Añade clases personalizadas establecidas en los parametros de configuración.
            if (settings.customClasses) {
                $.each(settings.customClasses, function (index, value) {
                    $('#' + settings.id + '-button' + ', #' + settings.id + '-menu').addClass(value);
                    $('[for=' + settings.id + ']').addClass(value);
                });
            }

        },
        /**
         * Procesa el conjunto de registros devueltos por una petición sobre un origen de datos local.
         *
         * @function  _parseLOCAL
         * @private
         * @param {object[]} array - Array de registros obtenidos a partir del origen de datos.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         */
        _parseLOCAL: function (data,i18nId) {
            let text;
            let array = data;
          
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
            
            return array;
        },
        /**
         * Procesa el conjunto de registros devueltos por una petición sobre un origen de datos local. Este método se emplea en el caso de existir agrupación de los mismos.
         *
         * @function  _parseOptGroupLOCAL
         * @private
         * @param {object[]} arrayGroup - Array de registros obtenidos a partir del origen de datos.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         */
        _parseOptGroupLOCAL: function (arrayGroup, settings, html) {
            var optGroup, self = this;

            // En caso de que se haya especificado la propiedad 'blank' en la llamada a 'rup_combo',
            // añadimos una opcion en la primera posicion de la lista del combo.
            if (!settings.blankDone && settings.blankDone != undefined) {
                html.append($('<option>').attr('value', settings.blank).text(settings.blank));
                settings.blankDone = true;
            }

            for (let i = 0; i < arrayGroup.length; i = i + 1) {
                optGroup = arrayGroup[i];
                html = optGroupHTML($, optGroup, html, settings, self);
            }
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
         * Procesa el conjunto de registros devueltos por una petición sobre un origen de datos remoto. Este método se emplea en el caso de existir agrupación de los mismos.
         *
         * @function  _parseOptGroupREMOTE
         * @private
         * @param {object[]} arrayGroup - Array de registros obtenidos a partir del origen de datos.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         */
        _parseOptGroupREMOTE: function (arrayGroup, settings, html) {
            var optGroup, self = this;

            // En caso de que se haya especificado la propiedad 'blank' en la llamada a 'rup_combo',
            // añadimos una opcion en la primera posicion de la lista del combo.
            if (!settings.blankDone && settings.blankDone != undefined) {
                html.append($('<option>').attr('value', settings.blank).text(settings.blank));
                settings.blankDone = true;
            }

            for (let i = 0; i < arrayGroup.length; i = i + 1) {
                optGroup = arrayGroup[i];
                html = optGroupRemoteHTML($, optGroup, html, self, settings);
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
         * Procesa la respuesta de la petición AJAX en el caso de que esta haya finalizado correctamente.
         *
         * @function  _ajaxSuccess
         * @private
         * @param {object} data - Objeto enviado en la respuesta.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @param {jQuery} html - Referencia al objeto jQuery que contiene los elementos.
         */
        _ajaxSuccess: function (data, settings, html) {
            //UNLOADING...
            $('#' + settings.id + '-button span:first-child').removeClass('rup-combo_loadingText').text('');
            var icon = $('#' + settings.id + '-button span:last-child');
            $(icon).removeClass('rup-combo_loading');
            $(icon).addClass('ui-icon-triangle-1-s');

            var isInited = $('#' + settings.id).is('.inited');

            $('#' + settings.id).removeClass('inited');

            //Vaciar combo
            $('#' + settings.id).empty();

            //Cargar combo (si se reciben datos)
            if (data.length > 0) {
                if (settings.source) {
                    if (settings.blank != null && $('#' + settings.id +' option[value="'+settings.blank+'"]').length == 0) {
                        $('#' + settings.id).prepend($('<option>').attr('value', settings.blank).text(this._getBlankLabel(settings.id)));
                    }
                    this._parseREMOTE(data, settings, html);
                } else {
                    settings.ordered = false;
                    this._parseOptGroupREMOTE(data, settings, html);
                }

                //Crear combo
                this._makeCombo(settings);

                var setRupValue = $.data($('#' + settings.id)[0], 'setRupValue');
                if (setRupValue) {
                    //Vaciar combo, quitarle valor y deshabilitar
                    $('#' + settings.id).rup_combo('select', setRupValue);
                    if ($('#' + settings.id).rup_combo('getRupValue') != settings.selected && settings.blank != null) {
                        $('#' + settings.id).rup_combo('setRupValue', settings.blank);
                    }
                } else {
                    //Lanzar cambio para que se recarguen hijos
                    $('#' + settings.id).trigger('change');
                }
            } else {
                $('#' + settings.id).append('<option></option>');
            }

            if (isInited) {
                $('#' + settings.id).removeClass('inited');
            }

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
         * Crea la etiqueta correspondiente a una agrupación.
         *
         * @function  _generateOptGroupLabel
         * @private
         * @param {jQuery} object - Referencia al propio componente.
         * @param {string} multiOptgroupIconText - Prefijo de los option group.
         */
        _generateOptGroupLabel: function (object, multiOptgroupIconText) {
            //Texto A > SPAN
            $(object).append($('<span></span>')
                .text($(object).children('a').text())
                .addClass('rup-combo_multiOptgroupLabel')
            );
            $(object).children('a').remove();


            $(object).append($('<span></span>').text(' ['));
            $(object).append($('<a></a>')
                .text(multiOptgroupIconText ? $.rup.i18n.base.rup_combo.multiselect.optGroupSelect : '')
                .prepend($('<span></span>').addClass('ui-icon ui-icon-check rup-combo_multiOptgroupIcon'))
                .attr('title', $.rup.i18n.base.rup_combo.multiselect.optGroupSelectTitle).rup_tooltip({
                    applyToPortal: true
                })
                .click(function () {
                    var inputs = $(object).nextUntil('li.ui-multiselect-optgroup-label').find('input');
                    for (let i = 0; i < inputs.length; i++) {
                        if (!inputs[i].disabled) {
                            inputs[i].checked = false;
                        }
                    }
                })
            );
            $(object).append($('<span></span>').text(' | '));
            $(object).append($('<a></a>')
                .text(multiOptgroupIconText ? $.rup.i18n.base.rup_combo.multiselect.optGroupDeselect : '')
                .prepend($('<span></span>').addClass('ui-icon ui-icon-closethick rup-combo_multiOptgroupIcon'))
                .attr('title', $.rup.i18n.base.rup_combo.multiselect.optGroupDeselectTitle).rup_tooltip({
                    applyToPortal: true
                })
                .click(function () {
                    var inputs = $(object).nextUntil('li.ui-multiselect-optgroup-label').find('input');
                    for (let i = 0; i < inputs.length; i++) {
                        if (!inputs[i].disabled) {
                            inputs[i].checked = true;
                        }
                    }
                })
            );
            $(object).append($('<span></span>').text(' ]'));
        },
        /**
         * Devuelve los li de los elementos seleccionados en un combo multiselección.
         *
         * @function  _selectedOptionLiMultiselect
         * @private
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @return {jQuery | jQuery[]} - Objetos jQuery con referencias a los elementos seleccionados.
         */
        _selectedOptionLiMultiselect: function () {
            return this._optionLis.eq(this._selectedIndex());
        },
        /**
         * Devuelve el li del elemento que contiene el foco en un combo multiselección.
         *
         * @function  _focusedOptionLiMultiselect
         * @private
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         * @return {jQuery} - Objeto jQuery con referencia al elemento que contiene el foco.
         */

        _focusedOptionLiMultiselect: function (settings) {
            var multiselectSettings = $('#' + settings.id).data('echMultiselect');
            var $elem;

            jQuery.each(multiselectSettings.inputs, function (index, elem) {
                if ($(elem).parent().has('.ui-state-hover')) {
                    $elem = $(elem);
                }
            });

            return $elem;
        },
        /**
         * Procesa los eventos de introducción de caracteres de teclado por parte del usuario.
         *
         * @function  _typeAheadMultiselect
         * @private
         * @param {number} code - Código ASCII correspondiente al caracter introducido por el usuario.
         * @param {object} eventType - Objeto event de jQuery.
         * @param {object} settings - Objeto de propiedades de configuración con el que se ha inicializado el componente.
         */
        _typeAheadMultiselect: function (code, eventType, settings) {
            var self = this,
                c = String.fromCharCode(code).toLowerCase(),
                matchee = null,
                nextIndex = null;

            // Clear any previous timer if present
            if (self._typeAhead_timer) {
                window.clearTimeout(self._typeAhead_timer);
                self._typeAhead_timer = undefined;
            }

            // Store the character typed
            self._typeAhead_chars = (self._typeAhead_chars === undefined ? '' : self._typeAhead_chars).concat(c);

            // Detect if we are in cyciling mode or direct selection mode
            if (self._typeAhead_chars.length < 2 ||
                (self._typeAhead_chars.substr(-2, 1) === c && self._typeAhead_cycling)) {
                self._typeAhead_cycling = true;

                // Match only the first character and loop
                matchee = c;
            } else {
                // We won't be cycling anymore until the timer expires
                self._typeAhead_cycling = false;

                // Match all the characters typed
                matchee = self._typeAhead_chars;
            }

            // We need to determine the currently active index, but it depends on
            // the used context: if it's in the element, we want the actual
            // selected index, if it's in the menu, just the focused one
            // I copied this code from _moveSelection() and _moveFocus()
            // respectively --thg2k
            var selectedIndex = (eventType !== 'focus' ?
                this._selectedOptionLiMultiselect(settings).data('index') :
                this._focusedOptionLiMultiselect(settings).data('index')) || 0;


            var multiselectSettings = $('#' + settings.id).data('echMultiselect');

            for (let i = 0; i < multiselectSettings.inputs.length; i++) {
                var thisText = multiselectSettings.inputs.eq(i).next('span').text().substr(0, matchee.length).toLowerCase();

                if (thisText === matchee) {
                    if (self._typeAhead_cycling) {
                        if (nextIndex === null)
                            nextIndex = i;

                        if (i > selectedIndex) {
                            nextIndex = i;
                            break;
                        }
                    } else {
                        nextIndex = i;
                    }
                }
            }

            if (nextIndex !== null) {
                // Why using trigger() instead of a direct method to select the
                // index? Because we don't what is the exact action to do, it
                // depends if the user is typing on the element or on the popped
                // up menu
                multiselectSettings.inputs.eq(nextIndex).parent().trigger('mouseover');
                multiselectSettings.inputs.eq(nextIndex).trigger(eventType);
            }

            self._typeAhead_timer = window.setTimeout(function () {
                self._typeAhead_timer = undefined;
                self._typeAhead_chars = undefined;
                self._typeAhead_cycling = undefined;
            }, settings.typeAhead);
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
		    cache: false

    	};
    	    
        	 	if(settings.selected || settings.firstLoad){
        	 	settings.callAjaxOptions = {
		            url: settings.url,
			           // data: settings.data,
			            dataType: settings.dataType,
			            contentType: 'application/json',
			            beforeSend: function (xhr) {
			            	//Cabecera RUP
			                xhr.setRequestHeader('RUP', $.toJSON(settings.sourceParam));
			            },
			            success: function (datos) {
				    		if(settings.groups){//PArsear para grupos.
				    			let results = [];
				    			$.each(datos, function (index, value) {
				    				let key = Object.keys(value)[0];
				    				$.each(value[key], function () {//each hijos
					    				results.push(this);
					    			});
				    				
				    			});

				    			datos =  results;
				    		}
			            	let data = $.grep(datos, function (v) {
			                    return v.id == settings.selected;
			                  });
			            	if(data !== undefined && data.length == 1){
			            		if(settings.selected){
				            		data = data[0];
				      
				            		let newOption = new Option(data.text, data.id, false, false);
				            		if(data.style != null){
				            			newOption.setAttribute('style',data.style);
				            		}
				            		$('#' + settings.id).append(newOption);
				            		$('#' + settings.id).val(data.id).trigger('change');
			            		}
			            		settings.options = datos;
			    		    	$('#' + settings.id).data('settings', settings)
			            		$('#' + settings.id).triggerHandler('selectAjaxSuccess', [data]);
			            	}
			            },
			            error: function (xhr, textStatus, errorThrown) {
			                if (settings.onLoadError !== null) {
			                    jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
			                } else {
			                	rupSelect._ajaxError(xhr, textStatus, errorThrown);
			                }
			            }
			        };
	    			$.rup_ajax(settings.callAjaxOptions); 
        	 	}
		     if(settings.cache){//si existe cacheo
				let __cache = [];
				let __lastQuery = null;
		    	settings.ajax.transport = function(params, success, failure) {
					//retrieve the cached key or default to _ALL_
			        var __cachekey = params.data.q || '_ALL_';
			        if (__lastQuery !== __cachekey) {
			          //remove caches not from last query
			          __cache = [];
			        }
			        __lastQuery = __cachekey;
			        if ('undefined' !== typeof __cache[__cachekey]) {
			          //display the cached results
			          success(__cache[__cachekey]);
			          return; 
			        }
			        var $request = $.ajax(params);
			        $request.then(function(data) {
			          //store data in cache
			          __cache[__cachekey] = data;
			          //display the results
			          success(__cache[__cachekey]);
			        });
			        $request.fail(failure);
			        return $request;
				}
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
	
			$('#' + settings.id).select2(settings);
 
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
	
		                        return data.text;
		                      }
		                	if(settings.placeholder == ''){//si es vació se asigna el label
		                		settings.placeholder = this._getBlankLabel(settings.id)
		                	}
		                	if(settings.data !== undefined){
		                		settings.data.unshift({id:settings.blank , text:settings.placeholder})
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
		                		if(data.style === undefined && data.element !== undefined){//mirar estilo
		                			data.style = data.element.getAttribute('style');
		                		}
		                		if (data.id === settings.blank) {
		                			return $('<span class="select2-selection__placeholder">' + data.text + '</span>');
		                		}else  if (data.style != null && data.id !== settings.blank) { // adjust for custom placeholder values, restaurar
		                			return _this._textIcon(data);
		                        }
	
		                        return data.text;
		                      }
		                }else{
		                	settings.templateResult = function (data,span) {
		                		if(data.style === undefined && data.element !== undefined){//mirar estilo
		                			data.style = data.element.getAttribute('style');
		                		}
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
		            		settings.data = this._parseLOCAL(settings.data,settings.i18nId);
		            	}else{//grupos
		            	      for (var i = 0; i < settings.dataGroups.length; i = i + 1) {
		            	          if (typeof settings.dataGroups[i] === 'object') {
		            	        	  settings.dataGroups[i].children = this._parseLOCAL(settings.dataGroups[i].children,settings.i18nId);
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
		                $('#' + settings.id).select2(settings);
		                if(settings.selected){
		                	$('#' + settings.id).val(settings.selected).trigger('change')
		                }
		                //cargar los options
		                settings.options = settings.data;
		                
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

function optGroupRemoteHTML($, optGroup, html, self, settings) {
    $.each(optGroup, function (key, elemGroup) {
        html.append($('<optgroup>').attr('label', key));
        html = $(html).children('optgroup:last-child');
        self._parseREMOTE(elemGroup, settings, html, key);
        html = $(html).parent();
    });
    return html;
}

function optGroupHTML($, optGroup, html, settings, self) {
    $.each(optGroup, function (key, elemGroup) {
        if (typeof (elemGroup[0]) !== 'string') {
            html.append($('<optgroup>').attr('label', $.rup.i18nParse($.rup.i18n.app[settings.i18nId], key)));
        } else {
            html.append($('<optgroup>').attr('label', key));
        }
        html = $(html).children('optgroup:last-child');
        self._parseLOCAL(elemGroup, settings, html);
        html = $(html).parent();
    });
    return html;
}