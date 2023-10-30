/* eslint-disable no-useless-escape */

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

//Modificado "jquery.ui.selectmenu.js" línea 70
//Modificado "jquery.ui.selectmenu.js" línea 438-442
//Modificado "jquery.ui.selectmenu.js" línea 270 [jQuery 1.8 compatible]

//Modificado "jquery.multiselect.js" línea 53 [Estilo flecha como combos
//Añadido	 "jquery.multiselect.js" línea 65 [Id al componete]
//Modificado "jquery.multiselect.js" línea 581 [jQuery 1.8 compatible]
//Modificadro "IE Fixes" (evitar problemas con elementos deshabilitados en IE)

//Arregos para resaltado con el teclado (UDA - focus): líneas 446-448, 494-496, 519-522

/**
 * Permite al usuario recuperar un elemento de una gran lista de elementos o de varias listas dependientes de forma sencilla y ocupando poco espacio en la interfaz.
 *
 * @summary Componente RUP Combo.
 * @module rup_combo
 * @see El componente está basado en el plugin {@link http://jqueryui.com/selectmenu/|jQuery UI Selectmenu}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://api.jqueryui.com/selectmenu/|aquí}.
 * @example
 * $("#idCombo").rup_combo({
 *	source : "comboSimple/remote",
 *	sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"}
 * });
 */

/*global define */
/*global jQuery */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './core/ui/jquery.ui.selectmenu', './core/ui/jquery.multiselect'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÁN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************


    var rup_combo = {};
    const FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE = $.rup.i18nParse($.rup.i18n.base, 'rup_global.functionNotSupportedError');
    const FUNCTION_NOT_SUPPORTED_ERROR_TITLE = $.rup.i18nParse($.rup.i18n.base, 'rup_global.error');

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_combo', rup_combo));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_combo('extend', {
        /**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor del Combo.
         *
         * @function  getRupValue
         * @return {string | number} - Devuelve el valor actual del componente seleccionado por el usuario.
         * @example
         * $("#idCombo").rup_combo("getRupValue");
         */
        getRupValue: function () {
            var $self = $(this),
                settings = $self.data('settings'),
                retObj, arrayTMP, wrapObj = {},
                name;

            name = $self.attr('name');

            if (name) {
                arrayTMP = $self.attr('name').split('.');
            }

            if (settings.submitAsJSON) {
                //					arrayTMP = $self.attr("name").split(".");
                //					prop = arrayTMP[arrayTMP.length-1];
                //					valueArray = $self.rup_combo("value");
                //					valueArray_length = valueArray.length;
                //					returnArray = [];
                //				for(var i=0; i<valueArray_length; i++){
                //					var map = {};
                //					map[prop] = valueArray[i];
                //					returnArray.push(map);
                //				}
                return jQuery.rup_utils.getRupValueAsJson(name, $self.rup_combo('value'));
            }

            retObj = settings.submitAsString ? $self.rup_combo('value').toString() : $self.rup_combo('value');

            if (arrayTMP !== undefined && arrayTMP !== null && settings.multiselect) {
                wrapObj[arrayTMP[arrayTMP.length - 1]] = retObj;
            }

            return (settings.multiselect === true && arrayTMP !== undefined && arrayTMP.length > 1) && settings.legacyWrapMode === false ? wrapObj : retObj;
        },
        /**
         * Método utilizado para asignar el valor al componente. Este método es el utilizado por 
         * el resto de componentes RUP para estandarizar la asignación del valor al Combo.
         *
         * @function  setRupValue
         * @param {string | number} param - Valor que se va a asignar al componente.
         * @example
         * $("#idCombo").rup_combo("setRupValue", "Si");
         */
        setRupValue: function (param) {
            var $self = $(this),
                settings = $self.data('settings');

            //Tipo de combo
            if (this.length === 0 || (settings !== undefined && !settings.multiselect)) {
                //Simple > selectmenu
                $.data(this[0], 'setRupValue', param.toString());
                $(this).rup_combo('select', param.toString());
            } else {
                //Multiple > multiselect
                $(this).multiselect('uncheckAll');
                $(this).rup_combo('select', (settings.readAsString === true ? param.split(',') : param));
                $(this).multiselect('refresh');
            }
        },
        /**
         * Método que limpia el valor seleccionado en el combo. En el caso de selección múltiple los valores seleccionados.
         *
         * @function clear
         * @example
         * $("#idCombo").rup_combo("clear");
         */
        clear: function () {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                $(this).rup_combo('select', 0);
            } else {
                //Multiple > multiselect
                $(this).multiselect('uncheckAll');
            }
        },
        /**
         * Método que lanza el evento change del componente.
         *
         * @function change
         * @example
         * $("#idCombo").rup_combo("change");
         */
        change: function () {
            //Tipo de combo
            if ($(this).data('settings').change) {
                $(this).data('settings').change();
            }
        },
        /**
         * Realiza una reinicizalización del estado del componente.
         *
         * @function  reset
         * @example
         * $("#idCombo").rup_combo("reset");
         */
        reset: function () {
            var $self = $(this);

            $self.rup_combo('select', $self.find('option[selected]').attr('value'));

        },
        /**
         * Reinicia por completo el componente, incluyendo sus ajustes. 
         *
         * @function hardReset
         * @since UDA 5.0.3
         * @example
         * $("#idCombo").rup_combo("hardReset");
         */
        hardReset: function () {
        	const $self = $(this),
        		settings = $self.data('settings');
        	
        	settings.disabled = undefined;
        	settings.selected = undefined;
        	settings.ultimaLlamada = undefined;
        	settings.ultimosValores = undefined;
        	$self.rup_combo('select', '');
        },
        /**
         * Selecciona todos los elementos en el caso de tratarse de un combo multilesección.
         *
         * @function  checkAll
         * @example
         * $("#idCombo").rup_combo("checkAll");
         */
        checkAll: function () {
            //Tipo de combo
            if ($(this).data('settings').multiselect) {
                //Multiple > multiselect
                $(this).multiselect('checkAll');
            } else {
                //Simple > selectmenu
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Selecciona el elemento enviado como parámetro. En caso de ser un numérico se selecciona por la posición (comenzando en 0) y si es un literal se selecciona por el valor. En el caso de selección múltiple el parámetro será un array.
         *
         * @function  select
         * @param {string | number | string[] | number[]} param - Parámetro utilzado para determinar los elementos a seleccionar.
         * @example
         * // Simple
         * $("#idCombo").rup_combo("select", 2);
         * // Multiple
         * $("#idCombo").rup_combo("select", [0,2]);
         */
        select: function (param) {
        	const data = $(this).data();
        	
        	// Cuando el identificador está cifrado por Hdiv, hay que asegurarse de tener siempre el valor obtenido a partir de la fuente definida en la inicialización del componente
        	if (data.values != undefined && $.fn.isHdiv(param) && (data.selectedValueKey == undefined || param != data.values[data.selectedValueKey].value)) {
        		$.each(data.values, function (key, obj) {
        			if ($.fn.getStaticHdivID(obj.value) === $.fn.getStaticHdivID(param)) {
        				data.setRupValue = obj.value;
        				data.settings.selected = obj.value;
        				param = obj.value;
        				
        				// Para evitar iteraciones innecesarias en el futuro, se guarda la posición del valor en el array para facilitar su comprobación
        				data.selectedValueKey = key;
            		}
        		});
        	}
        	// Asigna el valor recibido como el seleccionado (evita problemas con los enlazados).
        	else if (param != undefined && param != '') {
        		data.setRupValue = param;
        		data.settings.selected = param;
        	}
        	
            //Tipo de combo
            if (this.length === 0 || !data.settings.multiselect) {
                //Simple > selectmenu
                this._setElement($(this), param); //Cargar elemento
            } else {
                //Multiple > multiselect
                this._setElement($(this), param, true);
            }
        },
        /**
         * Selecciona el elemento del combo que contiene como texto el indicado. En caso de no existir el texto a buscar el combo no sufrirá cambios En el caso de selección múltiple el parámetro será un array.
         *
         * @function  selectLabel
         * @param {string | string[]} param - Parámetro utilzado para determinar los elementos a seleccionar.
         * @example
         * // Simple
         * $("#idCombo").rup_combo("selectLabel", "No");
         * // Multiple
         * $("#idCombo").rup_combo("selectLabel", ["No","Si"]);
         */
        selectLabel: function (param) {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                var elementSet = this._selectLabel($(this), param, true); //Cargar elemento
                //Si se ha cargado un elemento válido
                if (elementSet) {
                    //Lanzar cambio para que se recarguen hijos
                    var hijos = $(this).data('childs');
                    if (hijos !== undefined) {
                        for (let i = 0; i < hijos.length; i = i + 1) {
                            $('#' + hijos[i]).rup_combo('reload');
                        }
                    }
                }
            } else {
                //Multiple > multiselect
                for (let i = 0; i < param.length; i++) {
                    $('input[name=\'multiselect_' + $(this).attr('id') + '\'][title=\'' + param[i] + '\']').attr('checked', true);
                }
                //Actualizar literal de elementos seleccionados
                $(this).multiselect('update');
            }
        },
        /**
         * Método que devuelve el valor seleccionado en el combo. En caso de ser el valor vació, o sin selección, el valor devuelto es el asociado al “blank”. En el caso de la selección múltiple se devolverá un array.
         *
         * @function  value
         * @return {string | string[]} - Valor del elemento o elementos seleccionados.
         * @example
         * $("#idCombo").rup_combo("value");
         */
        value: function () {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                return ($(this).selectmenu('value'));
            } else {
                //Multiple > multiselect
                var retorno = [],
                    checked = $(this).multiselect('getChecked');
                for (let i = 0; i < checked.length; i++) {
                    retorno.push($(checked[i]).val());
                }
                return retorno;
            }
        },
        /**
         * Método que devuelve el label asociado al valor seleccionado en el combo. En el caso de la selección múltiple se devolverá un array.
         *
         * @function  label
         * @return {string | string[]} - Texto del elemento o elementos seleccionado.
         * @example
         * $("#idCombo").rup_combo("label");
         */
        label: function () {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                return (this[0].options[$(this).selectmenu('index')].text);
            } else {
                //Multiple > multiselect
                var retorno = [],
                    checked = $(this).multiselect('getChecked');
                for (let i = 0; i < checked.length; i++) {
                    retorno.push($(checked[i]).next().text());
                }
                return retorno;
            }
        },
        /**
         * Devuelve el índice de la opción seleccionada en el combo (empezando en 0). En el caso de la selección múltiple se devolverá un array.
         *
         * @function  index
         * @return {number | number[]} - Índice del elemento o elementos seleccionados.
         * @example
         * $("#idCombo").rup_combo("index");
         */
        index: function () {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                return ($(this).selectmenu('index'));
            } else {
                //Multiple > multiselect
                var retorno = [],
                    checked = $(this).rup_combo('value'),
                    options = $(this).find('option');
                for (let i = 0; i < options.length; i++) {
                    if ($.inArray($(options[i]).val(), checked) !== -1) {
                        retorno.push(i);
                    }
                }
                return retorno;
            }

        },
        /**
         * Deshabilita el combo.
         *
         * @function  disable
         * @example
         * $("#idCombo").rup_combo("disable");
         */
        disable: function () {
            //Tipo de combo
            var $self = $(this);
            $('#' + $(this).attr('id') + '-button').attr('tabindex', -1);

            // Añadimos el handler del evento focus para evitar que adquiera el foco cuando está deshabilitado
            $('#' + $(this).attr('id') + '-button').on('focus.rup_combo', function () {
                $('#' + $self.attr('id') + '-button').blur();
                return false;
            });
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                $(this).selectmenu('disable');
            } else {
                //Multiple > multiselect
                $(this).multiselect('disable');
            }
        },
        /**
         * Habilita el combo.
         *
         * @function  enable
         * @example
         * $("#idCombo").rup_combo("enable");
         */
        enable: function () {
            //Tipo de combo
            var settings = $(this).data('settings');
            // Eliminamos el handler del evento focus para evitar que adquiera el foco cuando está deshabilitado
            $('#' + $(this).attr('id') + '-button').off('focus.rup_combo');

            $('#' + $(this).attr('id') + '-button').attr('tabindex', (settings.tabindex ? settings.tabindex : 0));
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                $(this).selectmenu('enable');
            } else {
                //Multiple > multiselect
                $(this).multiselect('enable');
            }
        },
        /**
         * Indica si el combo está deshabilitado o no.
         *
         * @function  isDisabled
         * @param {boolean} - Devuelve si el combo está deshabilitado o no.
         * @example
         * $("#idCombo").rup_combo("isDisabled");
         */
        isDisabled: function () {
            if ($(this).attr('aria-disabled') === 'false') {
                return false;
            } else {
                return true;
            }
        },
        /**
         * Indica si un rup_combo ya ha sido inicializado sobre el elemento con el identificador provisto.
         *
         * @function isInitialized
         * @since UDA 5.0.3
         * @return {boolean} - Indica si ya ha sido inicializado un combo sobre el elemento.
         * @example
         * $("#idCombo").rup_combo("isInitialized");
         */
        isInitialized: function () {
        	return $(this).attr('ruptype') === 'combo' ? true : false;
        },
        /**
         * Vacía y deshabilita el combo sobre el que se aplica así como todos los combos que depende de él. Su uso principalmente es interno para las peticiones remotas.
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
            // Eliminar valor seleccionado.
            $(this).data('settings').selected = undefined;
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
         * Deshabilita una opción de un combo multiselección.
         *
         * @function  disableOpt
         * @param {string} optValue - Value del option que queremos deshabilitar.
         * @example
         * $("#idCombo").rup_combo("disableOpt", "opt1");
         */
        disableOpt: function (optValue) {
            if ($(this).data('settings').multiselect) {
                //Deshabilitar select
                this.find('[value=\'' + optValue + '\']').attr('disabled', 'disabled');

                var obj = $('#rup-multiCombo_' + $(this).attr('id')).find('[value=\'' + optValue + '\']');

                //Deshabilitar input
                obj.attr('disabled', 'disabled');

                //Estilos línea (label)
                obj.parent().css('color', 'grey');

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
         * Deshabilita varias opciones del combo. Las opciones se identifican mediante un array.
         *
         * @function disableOptArr
         * @param {string[]} optValueArr - Array en el que se indican los values de las opciones a deshabilitar.
         * @example
         * $("#idCombo").rup_combo("disableOptArr", ["opt1","opt2"]);
         */
        disableOptArr: function (optValueArr) {
            if ($(this).data('settings').multiselect) {
                for (let i = 0; i < optValueArr.length; i++) {
                    $(this).rup_combo('disableOpt', optValueArr[i]);
                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Habilita una opción de un combo multiselección.
         *
         * @function enableOpt
         * @param {string} enableOpt - Value del option que queremos habilitar.
         * @example
         * $("#idCombo").rup_combo("enableOpt", "opt1");
         */
        enableOpt: function (optValue) {
            if ($(this).data('settings').multiselect) {
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
         * Habilita varias opciones del combo. Las opciones se identifican mediante un array.
         *
         * @function enableOptArr
         * @param {string[]} optValueArr - Array en el que se indican los values de las opciones a habilitar.
         * @example
         * $("#idCombo").rup_combo("enableOptArr", ["opt1","opt2"]);
         */
        enableOptArr: function (optValueArr) {
            if ($(this).data('settings').multiselect) {
                for (let i = 0; i < optValueArr.length; i++) {
                    $(this).rup_combo('enableOpt', optValueArr[i]);
                }
            } else {
            	$.rup.errorGestor(FUNCTION_NOT_SUPPORTED_ERROR_MESSAGE, FUNCTION_NOT_SUPPORTED_ERROR_TITLE);
            }
        },
        /**
         * Refresca los valores asociados al combo.
         *
         * @function  refresh
         * @example
         * $("#idCombo").rup_combo("refresh");
         */
        refresh: function () {
            //Tipo de combo
            if (this.length === 0 || !$(this).data('settings').multiselect) {
                //Simple > selectmenu
                return $(this).selectmenu();
            } else {
                //Multiple > multiselect
                $(this).multiselect('refresh');

                //Modificar literal en optgroups y asociarle el evento de "seleccionar/deseleccionar"
                var multiOptgroupIconText = $(this).data('settings').multiOptgroupIconText,
                    self = this;
                $.each($('#rup-multiCombo_' + $(this).attr('id')).find('.ui-multiselect-optgroup-label'), function (index, object) {
                    self._generateOptGroupLabel(object, multiOptgroupIconText);
                });

                //Titles de botones por defecto
                $('#rup-multiCombo_' + $(this).attr('id')).find('.ui-multiselect-all').attr('title', $.rup.i18n.base.rup_combo.multiselect.checkAllTitle).rup_tooltip();
                $('#rup-multiCombo_' + $(this).attr('id')).find('.ui-multiselect-none').attr('title', $.rup.i18n.base.rup_combo.multiselect.uncheckAllTitle).rup_tooltip();

                //Deseleccionar todos
                return $(this).multiselect('uncheckAll');
            }
        },
        /**
         * Realiza una recarga de los combos.
         *
         * @function   reload
         * @example
         * $("#idCombo").rup_combo("reload");
         */
        reload: function () {
            if (this.length !== 0) {
                var settings = $(this).data('settings'),
                    source, setRupValue, wasInited = false;

                $('#' + settings.id).removeClass('inited');
                wasInited = !!1;

                // Vaciar, quitar el valor y deshabilitar el combo.
                if (!$('#' + settings.id).rup_combo('isDisabled')) {
                	$('#' + settings.id).rup_combo('disableChild');
                }

                if (typeof settings.source === 'object' || typeof settings.sourceGroup === 'object') {
                    //LOCAL
                    $('#' + settings.id).removeClass('inited');
                    source = settings.source[this._getParentsValues(settings.parent, false, settings.multiValueToken)];
                    if (source !== undefined) {

                        if (settings.blank != null) {
                            var isOptgroup = false;

                            // Comprobamos si el value es un objeto. En caso de serlo esto nos indicara que se trata de un combo tipo 'optgroup'.
                            $.each(settings.sourceGroup, function (key, value) {
                                if (typeof value === 'object' && value !== null) {
                                    isOptgroup = true;
                                    return false;
                                }
                            });

                            // Si es un combo tipo 'optgroup' se establece una propiedad para que despues 
                            // en el metodo '_parseOptGroupLOCAL' se gestione correctamente.
                            if (isOptgroup) {
                                settings.blankDone = false;
                            }
                        }

                        //Parsear datos
                        this._parseLOCAL(source, settings, $('#' + settings.id));

                        //Crear combo
                        this._makeCombo(settings);

                        // Evento de finalizacion de carga (necesario para trabajar con el manteniminto)
                        if (settings.onLoadSuccess !== null) {
                            jQuery(settings.onLoadSuccess($('#' + settings.id)));
                        }

                        //Lanzar cambio para que se recarguen hijos
                        $('#' + settings.id).rup_combo('change');

                        setRupValue = $.data($('#' + settings.id)[0], 'setRupValue');
                        if (setRupValue) {
                            //Vaciar combo, quitarle valor y deshabilitar
                            $('#' + settings.id).rup_combo('select', setRupValue);
                        }
                    }
                    multiChange(settings);

                    if (wasInited) {
                        $('#' + settings.id).addClass('inited');
                    }
                } else if (typeof settings.source === 'string' || typeof settings.sourceGroup === 'string') {
                    //REMOTO
                    var data = this._getParentsValues(settings.parent, true),
                        rupCombo = this;
                    if (data === null) {
                        return false;
                    } //Se para la petición porque algún padre no tiene el dato cargado
                    if (settings.ultimaLlamada === undefined || settings.ultimaLlamada === '' || settings.ultimaLlamada !== data || settings.disabledCache) { //si es la misma busqueda, no tiene sentido volver a intentarlo.
                        $.rup_ajax({
                            url: settings.source ? settings.source : settings.sourceGroup,
                            data: data,
                            dataType: 'json',
                            contentType: 'application/json',
                            beforeSend: function (xhr) {
                                rupCombo._ajaxBeforeSend(xhr, settings);
                                $('#' + settings.id).removeClass('inited');
                            },
                            success: function (data) {
                                if (settings.blank != null) {
                                    var isOptgroup = false;

                                    // Comprobamos si el value es un objeto. En caso de serlo esto nos indicara que se trata de un combo tipo 'optgroup'.
                                    $.each(data[0], function (key, value) {
                                        if (typeof value === 'object' && value !== null) {
                                            isOptgroup = true;
                                            return false;
                                        }
                                    });

                                    // Si es un combo tipo 'optgroup' se establece una propiedad para que despues 
                                    // en el metodo '_parseOptGroupREMOTE' se gestione correctamente.
                                    if (isOptgroup) {
                                        settings.blankDone = false;
                                    }
                                }
                                rupCombo._ajaxSuccess(data, settings, $('#' + settings.id));

                                // Evento de finalizacion de carga (necesario para trabajar con el manteniminto)
                                if (settings.onLoadSuccess !== null) {
                                    jQuery(settings.onLoadSuccess($('#' + settings.id)));
                                }
                                multiChange(settings);

                                if (wasInited) {
                                    $('#' + settings.id).addClass('inited');
                                }
                                settings.ultimosValores = data;
                                $('#' + settings.id).triggerHandler('comboAjaxSuccess', [data]);
                            },
                            error: function (xhr, textStatus, errorThrown) {
                                if (settings.onLoadError !== null) {
                                    jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
                                } else {
                                    rupCombo._ajaxError(xhr, textStatus, errorThrown);
                                }
                            }
                        });
                        settings.ultimaLlamada = data;
                    }else if(settings.ultimosValores !== undefined){//Si la ultima llamada cogio los datos, no hace falta ir al controller los coge del componente.
                        if (settings.blank != null) {
                            var isOptgroup = false;

                            // Comprobamos si el value es un objeto. En caso de serlo esto nos indicara que se trata de un combo tipo 'optgroup'.
                            $.each(settings.ultimosValores[0], function (key, value) {
                                if (typeof value === 'object' && value !== null) {
                                    isOptgroup = true;
                                    return false;
                                }
                            });

                            // Si es un combo tipo 'optgroup' se establece una propiedad para que despues 
                            // en el metodo '_parseOptGroupREMOTE' se gestione correctamente.
                            if (isOptgroup) {
                                settings.blankDone = false;
                            }
                        }
                        rupCombo._ajaxSuccess(settings.ultimosValores, settings, $('#' + settings.id));

                        // Evento de finalizacion de carga (necesario para trabajar con el manteniminto)
                        if (settings.onLoadSuccess !== null) {
                            jQuery(settings.onLoadSuccess($('#' + settings.id)));
                        }
                        multiChange(settings);

                        if (wasInited) {
                            $('#' + settings.id).addClass('inited');
                        }
                        
                        $('#' + settings.id).triggerHandler('comboAjaxSuccess', [settings.ultimosValores]);
                    }

                    //delete rupCombo;
                } else if (typeof settings.source === 'function' || typeof settings.sourceGroup === 'function') {
                    //Se lanza la funcion que obtiene los valores a mostrar
                    $('#' + settings.id).removeClass('inited');
                    jQuery(settings.source);
                    this._makeCombo(settings);
                    multiChange(settings);

                    if (wasInited) {
                        $('#' + settings.id).addClass('inited');
                    }
                }
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
         * $("#idCombo").rup_combo("order", orderedByValue, orderAsNumber, skipFirst);
         */
        order: function (orderedByValue, orderAsNumber, skipFirst) {
            var combo = $(this),
                options = $('option', combo),
                arrVals = [],
                skippedValue = null;

            //Comprobar que se ha obtenido el combo deseado
            if (combo.length > 0) {

                //Guardar elemento seleccionado
                var selectedVal = combo.rup_combo('value');

                //Obtener elementos combo
                options.each(function () {
                    //Omitir posible opción vacía
                    if (skipFirst) {
                        skipFirst = false;
                        skippedValue = {
                            val: $(this).val(),
                            text: $(this).text()
                        };
                        return true;
                    }
                    arrVals.push({
                        val: $(this).val(),
                        text: $(this).text(),
                        clazz: $(this).attr('class')
                    });
                });

                //Ordenar elementos (segun parametros, por defecto de texto)
                if (!orderedByValue) {
                    if (!orderAsNumber) {
                        arrVals.sort(function (a, b) {
                            return a.text.localeCompare(b.text);
                        });
                    } else {
                        arrVals.sort(function (a, b) {
                            return a.text - b.text;
                        });
                    }
                } else {
                    if (!orderAsNumber) {
                        arrVals.sort(function (a, b) {
                            if (a.val > b.val) {
                                return 1;
                            } else if (a.val == b.val) {
                                return 0;
                            } else {
                                return -1;
                            }
                        });
                    } else {
                        arrVals.sort(function (a, b) {
                            return a.val - b.val;
                        });
                    }
                }

                //Actualizar combo con elementos ordenados
                for (let i = 0, l = arrVals.length; i < l; i++) {
                    $(options[i]).val(arrVals[i].val).text(arrVals[i].text);
                    if (arrVals[i].clazz) {
                        $(options[i]).attr('class', arrVals[i].clazz);
                    }
                }

                //Añadir opción vacía al inicio
                if (skippedValue) {
                    combo.prepend($('<option>').attr('value', skippedValue.val).text(skippedValue.text)); //Añadir opción vacía
                    $(options[arrVals.length]).remove(); //Eliminar ultimo elemento
                }

                //Regenerar combo
                combo.rup_combo('refresh');

                //Restaurar elemento seleccionado
                this._setElement($(this), selectedVal, $(this).data('settings').multiselect);

                //Eliminar referencias
                // delete combo;
                // delete options;
                // delete arrVals;
            }
        },
        /**
         * Cambia el source del combo y recarga el componente para que este comience a usarlo.
         *
         * @function setSource
         * @param {string} source - Source desde el cual se obtendran los datos a mostrar.
         * @example
         * $("#idCombo").rup_combo("setSource", source);
         */
        setSource: function (source) {
        	if (source != undefined && source != '') {
            	let combo = $(this);
            	combo.data().settings.source = source;
            	combo.rup_combo('reload');
        	}
    	}
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_combo('extend', {
        /**
         * Establece un elemento del combo por posición o valor.
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
                            $(selector).find('option').eq(param).attr('selected', 'selected');
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
                $option = jQuery(selector).find('option').eq(i);
                if (jQuery(selector).find('option').eq(i).text() === param) {
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
            else if (app.rup_combo && app.rup_combo.blank) {
                return app.rup_combo.blank;
            }
            // Si no hay textos definidos para los blank obtiene el por defecto de UDA
            return $.rup.i18n.base.rup_combo.blankNotDefined;
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
                const settings = $('#' + id).data('settings'),
                	lastLoop = i + 1 === array.length;
                
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
                if (settings.blank !== undefined && settings.blank !== null) {
                    parentBlankValue = settings.blank;
                } else {
                    parentBlankValue = '';
                }
                if ($('#' + id).val() === null || $('#' + id).val() === parentBlankValue) {
                    return null;
                }

                // Cuando el componente se use en la edición en línea de la tabla, se utilizará el campo definido por esta. También se evita la inserción de "&" o "multiValueTokenAux" en el último bucle.
                if (remote) {
                	retorno += (settings.inlineEditFieldName ?? $('#' + id).attr('name')) + '=' + $('#' + id).val() + (lastLoop ? '' : '&');
                } else {
                	retorno += $('#' + id).val() + (lastLoop ? '' : multiValueTokenAux);
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
            	// Simple > selectmenu
            	$('#' + settings.id).selectmenu(settings);
                $('#' + settings.id).rup_combo('setRupValue', settings.selected ?? '');
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
                $('#' + settings.id).data('echMultiselect').menu.on('label', 'keydown.multiselect', function (event) {
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
        _parseLOCAL: function (array, settings, html) {
            var imgs = settings.imgs ? settings.imgs : [],
                label, value;
            for (let i = 0; i < array.length; i = i + 1) {
                label = value = array[i];
                if (typeof array[i] === 'object') { //multi-idioma
                    if (array[i].i18nCaption) {
                        label = $.rup.i18nParse($.rup.i18n.app[settings.i18nId], array[i].i18nCaption);
                    } else {
                        label = array[i].label;
                    }
                    value = array[i].value;
                }
                if (array[i] != undefined && array[i].style) {
                    imgs[imgs.length] = {};
                    imgs[imgs.length - 1][value] = array[i].style;
                    settings.imgs = imgs;
                }
                html.append($('<option>').attr('value', value).text(settings.showValue ? value + settings.token + label : label));
            }
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
                if (array[i].label == undefined || array[i].label == null) {
					item.label = item[settings.sourceParam.label];
				}
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
            	// Se guardan los datos para poder obtener siempre el elemento original cifrado por Hdiv
            	$('#' + settings.id).data('values', data);
            	
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
            if (xhr.responseText !== null) {
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
         * Método de inicialización del componente.
         *
         * @function  _init
         * @private
         * @param {object} args - Parámetros de inicialización del componente.
         */
        _init: function (args) {
        	global.initRupI18nPromise.then(() => {
	            if (args.length > 1) {
	                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
	            } else {
	                //Se recogen y cruzan las paremetrizaciones del objeto
	                var settings = $.extend({}, $.fn.rup_combo.defaults, args[0]),
	                    html, loadAsLocal = false,
	                    isValidableElem = false,
	                    attrsJson = {},
	                    attrs;
	
	                // Cargar el identificador del padre del patrón.
	                settings.id = $.rup_utils.escapeId($(this).attr('id'));
	                settings.name = $(this).attr('name');
	                
	                // Comprobar en caso de ser enlazado, que los combos sobre los que depende hayan sido inicializados.
	                if (settings.parent && Array.isArray(settings.parent) && !settings.parentsInitialized) {
	                	let parentsDeferred = [];
	                	let parentsInitialized = true;
	                	$.each(settings.parent, function (key, id) {
	                		if (!$('#' + id).rup_combo("isInitialized")) {
	                			const parentDeferred = $.Deferred();
	                			parentsDeferred.push(parentDeferred);
	                			
	                			// Inicializarse cuando el padre o padres lo hayan hecho. El evento se adjunta al label en vez de al combo porque este último es convertido más adelante y pierde el evento.
	                			$('label[for="' + id + '"]').on('comboIsInitialized', function () {
	                				// Desligar evento del elemento.
	                				$(this).off('comboIsInitialized');
	                				// Resolver promesa.
	                				parentDeferred.resolve();
	                			});
		                		
	                			parentsInitialized = false;
	                		}
	                	});
	                	
	                	if (!parentsInitialized) {
	                		$.when(...parentsDeferred).done(function() { 
	                			// Añadir parámetro para indicar que la inicialización del componente ya puede llevarse a cabo de manera segura.
	                			settings.parentsInitialized = true;
	                			// Inicializar componente.
	                			$('#' + settings.id).rup_combo(settings);
	                		});
	                		
	                		return false;
	                	}
	                }
	
	                // Se sobreescribe el change:
	                if (settings.change) {
	                    settings.userChange = settings.change;
	                }
	                if (settings.userChange) {
	                    settings.change = function () {
	                        if ($('#' + settings.id).is('.inited')) {
	                            settings.userChange();
	                        }
	                    };
	                }
	
	                //Se recoge el tabindex indicado en el elemento
	                settings.tabindex = $(this).attr('tabindex');
	
	                //Sobreescribir literales por defecto para multicombo
	                $.extend($.ech.multiselect.prototype.options, $.rup.i18n.base.rup_combo.multiselect);
	                
	                // Definir el elemento del DOM sobre el que se añadirá el componente siempre y cuando no se haya definido ya en los parámetros de inicialización
	                if (settings.appendTo != undefined) {
	                	if (settings.appendTo.length == 0 || settings.appendTo.length == undefined) {
	                		console.error($.rup_utils.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base, 'rup_combo.appendToError'), settings.id));
	                		settings.appendTo = $('#' + settings.id).parent();
	                	}
	                } else {
	                	settings.appendTo = $('#' + settings.id).parent();
	                }
	
	                //Si no se recibe identificador para el acceso a literales se usa el ID del objeto
	                if (!settings.i18nId) {
	                    settings.i18nId = settings.id;
	                }
	
	                //Guardar valor del INPUT
	                settings.inputValue = $('#' + settings.id).val() === null ? $('#' + settings.id).prop('value') : $('#' + settings.id).val();
	
	                attrs = $(this).prop('attributes');
	
	                for (let i = 0; i < attrs.length; i++) {
	                    attrsJson[attrs[i].name] = attrs[i].value;
	                }
	
	                $.extend(attrsJson, {
	                    name: settings.name,
	                    ruptype: 'combo'
	                });
	
	                //Contenido combo
	                html = $('<select>').attr(attrsJson).addClass('rup_combo');
	
	                if ($(this).hasClass('validableElem')) {
	                    isValidableElem = true;
	                    html.addClass('validableElem');
	                }
	                if ($(this).hasClass('customelement')) {
	                    isValidableElem = true;
	                    html.addClass('customelement');
	                }
	
	                if (settings.firstLoad === null && ($(this).is('select') && settings.loadFromSelect)) {
	                    loadAsLocal = true;
	                }
	
	                if (settings.parent) {
	                    //DEPENDIENTE
	                    //Guardar referencia a hijos en cada uno de los padres (propagación de carga)
	                    $.map(settings.parent, function (item) {
	                        var childsArray = $('#' + item).data('childs') === undefined ? [] : $('#' + item).data('childs');
	                        childsArray[childsArray.length] = settings.id;
	                        $('#' + item).data('childs', childsArray);
	                    });
	
	                    if (settings.loadFromSelect === false) {
	                        if (settings.firstLoad !== null) {
	                            this._parseLOCAL(settings.firstLoad, settings, html);
	                        }
	                        //Crear combo y deshabilitarlo
	                        $('#' + settings.id).replaceWith(html);
	                    } else {
	                        $('#' + settings.id).attr('ruptype', 'combo').removeClass().addClass('rup_combo');
	                        if (isValidableElem) {
	                            $('#' + settings.id).removeClass().addClass('validableElem');
	                        }
	                    }
	
	                    this._makeCombo(settings);
	
	                    if (!($(this).is('select') && settings.loadFromSelect)) {
	                        $('#' + settings.id).rup_combo('disable');
	                    } else {
	                        var options = $(this).find('option');
	                        var vacio = true;
	                        for (let i = 0; i < options.length; i = i + 1) {
	                            if ($(options[i]).attr('value') !== '') {
	                                vacio = false;
	                                break;
	                            }
	                        }
	                        if (vacio) {
	                            $('#' + settings.id).rup_combo('disable');
	                        }
	                    }
	
	                    //Almacenar los settings
	                    $('#' + settings.id).data('settings', settings);
	
	                    //Comprobar si los padres ya tienen datos seleccionados (si son LOCALES puede suceder)
	                    if (this._getParentsValues(settings.parent) !== null && (settings.firstLoad === null && settings.loadFromSelect === false)) {
	                        $('#' + settings.id).rup_combo('reload');
	                    }
	                    multiChange(settings);
	                    $('#' + settings.id).addClass('inited');
	
	                } else if (typeof settings.source === 'object' || typeof settings.sourceGroup === 'object' || loadAsLocal) {
	                    //LOCAL
	
	                    if (settings.blank != null) {
	                        var isOptgroup = false;
	
	                        // Comprobamos si el value es un objeto. En caso de serlo esto nos indicara que se trata de un combo tipo 'optgroup'.
	                        $.each(settings.sourceGroup, function (key, value) {
	                            if (typeof value === 'object' && value !== null) {
	                                isOptgroup = true;
	                                return false;
	                            }
	                        });
	
	                        // Si es un combo tipo 'optgroup' se establece una propiedad para que despues 
	                        // en el metodo '_parseOptGroupLOCAL' se gestione correctamente.
	                        if (isOptgroup) {
	                            settings.blankDone = false;
	                        }
	                    }
	
	                    //Parsear datos
	                    if (settings.loadFromSelect === false) {
	                        if (settings.source) {
	                            this._parseLOCAL((settings.firstLoad !== null ? settings.firstLoad : settings.source), settings, html);
	                        } else {
	                            settings.ordered = false;
	                            this._parseOptGroupLOCAL((settings.firstLoad !== null ? settings.firstLoad : settings.sourceGroup), settings, html);
	                        }
	                        $('#' + settings.id).replaceWith(html);
	                    } else {
	                        $('#' + settings.id).attr('ruptype', 'combo').removeClass().addClass('rup_combo');
	                        if (isValidableElem) {
	                            $('#' + settings.id).removeClass().addClass('validableElem');
	                        }
	                    }
	
	                    //Crear combo
	                    this._makeCombo(settings);
	
	                    if (settings.onLoadSuccess !== null) {
	                        jQuery(settings.onLoadSuccess($('#' + settings.id)));
	                    }
	
	                    //Almacenar los settings
	                    $('#' + settings.id).data('settings', settings);
	
	                    multiChange(settings);
	                    $('#' + settings.id).addClass('inited');
	
	                } else if (typeof settings.source === 'string' || typeof settings.sourceGroup === 'string') {
	                    //REMOTO
	                    var url = settings.source ? settings.source : settings.sourceGroup,
	                        rupCombo = this,
	                        self = this;
	                    $.rup_ajax({
	                        url: url,
	                        dataType: 'json',
	                        contentType: 'application/json',
	                        beforeSend: function (xhr) {
	                            rupCombo._ajaxBeforeSend(xhr, settings, html);
	                        },
	                        success: function (data) {
	                            if (settings.blank != null) {
	                                var isOptgroup = false;
	
	                                // Comprobamos si el value es un objeto. En caso de serlo esto nos indicara que se trata de un combo tipo 'optgroup'.
	                                $.each(data[0], function (key, value) {
	                                    if (typeof value === 'object' && value !== null) {
	                                        isOptgroup = true;
	                                        return false;
	                                    }
	                                });
	
	                                // Si es un combo tipo 'optgroup' se establece una propiedad para que despues 
	                                // en el metodo '_parseOptGroupREMOTE' se gestione correctamente.
	                                if (isOptgroup) {
	                                    settings.blankDone = false;
	                                }
	                            }
	                            rupCombo._ajaxSuccess(data, settings, html);
	                            if (settings.onLoadSuccess !== null) {
	                                jQuery(settings.onLoadSuccess($('#' + settings.id)));
	                            }
	
	                            multiChange(settings);
	                            $('#' + settings.id).addClass('inited');
	                            
	                            // Evento que se ejecuta cuando la carga de datos ha sido satisfactoria.
	                            $('#' + settings.id).triggerHandler('comboAjaxLoadSuccess', [data]);
	                        },
	                        error: function (xhr, textStatus, errorThrown) {
	                            if (settings.onLoadError !== null) {
	                                jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
	                            } else {
	                                self._ajaxError(xhr, textStatus, errorThrown);
	                            }
	                        }
	                    });
	                    // delete rupCombo;
	
	                    //Almacenar los settings
	                    $('#' + settings.id).data('settings', settings);
	
	                } else if (typeof settings.source === 'function' || typeof settings.sourceGroup === 'function') {
	                    jQuery(settings.source);
	                    this._makeCombo(settings);
	
	                    //Almacenar los settings
	                    $('#' + settings.id).data('settings', settings);
	
	                    multiChange(settings);
	                    $('#' + settings.id).addClass('inited');
	                }
	
	                //Asociar evento CHANGE para propagar cambios a los hijos
	                $('#' + settings.id).on('change', function () {
	                    // En caso de modificarse el valor del select, se actualiza el valor del rup.combo (con esta accion se recargan tambien los hijos)
	                    if (!settings.multiselect) {
	                        $('#' + settings.id).rup_combo('select', $('#' + settings.id).val());
	                    } else {
	                        $('#' + settings.id).rup_combo('select', $('#' + settings.id).rup_combo('getRupvalue'));
	                    }
	
	                    //Lanzar cambio para que se recarguen hijos, si los tiene
	                    var hijos = $(this).data('childs');
	                    if (hijos !== undefined) {
	                        for (let i = 0; i < hijos.length; i = i + 1) {
	                            $('#' + hijos[i]).rup_combo('reload');
	                        }
	                    }
	                });
	
	                //Borrar referencia
	                // delete html;
	
	                //Ocultar posibles elementos de fechas/horas
	                $('#' + settings.id).next('a').click(function () {
	                    $('#ui-datepicker-div').hide();
	                });
	
	                //Se audita el componente
	                $.rup.auditComponent('rup_combo', 'init');
	                
	                // Comunicar la inicialización del componente.
	                $('label[for="' + settings.id + '"]').triggerHandler('comboIsInitialized');
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
     * @property {object} [position={my: 'left top', at: 'left bottom', of: $("#comboMulti")}] - Define la posición del menú. La tercera opción hace referencia al elemento sobre el que se posicionará el menú y su uso es opcional (se usará el botón del combo por defecto si no se define). Más información en https://github.com/ehynds/jquery-ui-multiselect-widget/wiki/Options#available-options.
     * @property {boolean} [positionMenuByOffset=false] - Ofrece la posibilidad de posicionar el menú del combo con multiselección a partir del método .offset() en caso de ser 'true' o por el método .position() en caso de ser 'false'. Esta propiedad sólo será usada si la propiedad 'position' es definida con un valor vacío.
     * @property {boolean} [submitAsString=false] - Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un literal separados por coma.
     * @property {boolean} [submitAsJSON=false] - Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un array JSON donde el nombre del mapa será el nombre del combo. En el caso de que el nombre contenga notación dot se tomará el último literal. Ej: [{id:1}, {id:2}, …].
     * @property {boolean} [readAsString=false] - Determina si la asignación de un valor inicial se va a realizar a partir de un string con los ids de los elementos separados por comas en vez de un array de json.
     * @property {boolean} [rowStriping=false] - Indica si se debe aplicar un estilo diferente a las filas pares e impares para poder distinguirlas mediante un color diferente.
     * @property {number} [typeAhead=false] - Especifica en milisegundos el tiempo de espera que toma el componente antes de procesar los eventos de escritura realizados por el usuario.
     * @property {number} [legacyWrapMode=false] - Determina si se emplea el método obsoleto a la hora de empaquetar en objetos json los elementos seleccionados. Su propósito es mantener la retrocompatibilidad.
     * @property {function} [open=function( event, ui )] - Calcula el ancho del combo y se lo aplica al menú que despliega al pulsar sobre el.
     */
    $.fn.rup_combo.defaults = {
        onLoadError: null,
        width: 200,
        blank: null,
        style: 'dropdown',
        showValue: false,
        token: '|',
        multiValueToken: '##',
        ordered: true,
        orderedByValue: false,
        firstLoad: null,
        onLoadSuccess: null,
        loadFromSelect: false,
        multiselect: false,
        multiOptgroupIconText: true,
        position: {my: 'left top', at: 'left bottom'},
        positionMenuByOffset: false,
        submitAsString: false,
        submitAsJSON: false,
        readAsString: false,
        rowStriping: false,
        typeAhead: 1000,
        legacyWrapMode: false,
        open: function (event) {
        	const comboId = $.rup_utils.escapeId(this.id);
        	var anchoCombo = $('#' + comboId + '-button').outerWidth();

            // Si es un combo multiselect
            if (this.multiple) {
                $('#rup-multiCombo_' + comboId).outerWidth(anchoCombo);
            }
            // Si es un combo normal
            else {
                $('#' + comboId + '-menu').parent('div').outerWidth(anchoCombo);
                $('#' + comboId + '-menu').outerWidth(anchoCombo);
            }
            event.stopPropagation();
        }
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