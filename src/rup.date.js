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
 * Permite al usuario introducir y seleccionar una fecha, tanto de forma manual como visual, 
 * moviéndose fácilmente por días, meses y años. Además, para minimizar las posibilidades de 
 * introducir una fecha incorrecta, ofrece al usuario ayudas y sugerencias de formato. <br/>
 * <br/> Además, este sistema permite la introducción de fechas independiente de dispositivo 
 * y flexible, ya que tanto los usuarios avanzados como los novatos podrán utilizarlo sin problemas.
 *
 * @summary Componente RUP Date.
 * @module rup_date
 * @see El componente está basado en el plugin {@link http://jqueryui.com/datepicker/|jQuery UI DatePicker}. 
 * Para mas información acerca de las funcionalidades y opciones de configuración pinche 
 * {@link http://api.jqueryui.com/datepicker/|aquí}.
 * @example
 * // Ejemplo de selector de fecha simple.
 * $("#fecha").rup_date({
 *	labelMaskId : "fecha-mask",
 *	showButtonPanel : true,
 *	showOtherMonths : true,
 *	noWeekend : true
 * });
 *
 * // Ejemplo de selector de fecha simple que permite seleccionar tres fechas.
 * $("#fecha_multi").rup_date({
 *	multiSelect: 3,
 *	labelMaskId : "fecha_multi-mask",
 *	buttonImage : "/rup/css/images/exclamation.png"
 * });
 *
 * // Ejemplo de selectores de fecha desde y hasta
 * $.rup_date({
 *	from: "desde",
 *	to: "hasta",
 *	//Resto igual que en date
 *	labelMaskId : "intervalo-mask",
 *	numberOfMonths: 3
 * });
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', './core/ui/jquery-ui.timepicker', './core/ui/jquery-ui.multidatespicker'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //****************************************************************************************************************
    //DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************


    var rup_date = {};
    var rup_interval = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_date', rup_date));
    $.extend($.rup.iniRup, $.rup.rupObjectConstructor('rup_date', rup_interval));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************

    $.fn.rup_date('extend', {
        /**
         * Método utilizado para obtener el valor del componente. Este método es el utilizado por el 
         * resto de componentes RUP para estandarizar la obtención del valor del componente fecha.
         *
         * @function  getRupValue
         * @return {string | array} - Devuelve el valor actual del componente seleccionado por el usuario.
         * @example
         * $("#idDate").rup_date("getRupValue");
         */
        getRupValue: function () {
            if ($(this).data('datepicker').settings.datetimepicker) {

                var tmpDate = $(this).datepicker('getDate');

                if (tmpDate === null || tmpDate.toString() === 'Invalid Date') {
                    return '';
                }
                var fechaArray = $(this).rup_date('getDate').split(' ');

                var formattedTime = $(this).data('datepicker').settings.timeFormat;
                var separator = formattedTime[2];
                var tmpTime = fechaArray[1].split(separator).join(':');
                var dateFormat = $(this).data('datepicker').settings.dateFormat;

                return $.datepicker.formatDate(dateFormat, tmpDate) + ' ' + tmpTime;
            } else {
                return $(this).rup_date('getDate');
            }
        },
        /**
         * Método utilizado para asignar el valor al componente. Este método es el utilizado por
         *  el resto de componentes RUP para estandarizar la asignación del valor al componente fecha.
         *
         * @function  setRupValue
         * @param {string | array} param - Valor que se va a asignar al componente. En caso de tratarse 
         * de uan configuración en la que se permite seleccionar varias fechas se indicará mediante un array.
         * @example
         * // Fecha simple
         * $("#idDate").rup_date("setRupValue", "21/06/2015");
         * // Varias fechas
         * $("#idDate").rup_date("setRupValue", ["21/06/2015", "22/06/2015"]);
         */
        setRupValue: function (param) {

            if ($(this).data('datepicker').settings.datetimepicker) {
                var fechaArray = param.split(' ');
                var tmpTime;
                var tmpDate = new Date(fechaArray[0]);
                if (fechaArray[1] !== undefined) {
                    var time = '01/01/2000 ' + fechaArray[1];
                    tmpTime = new Date(time);
                }

                if (tmpDate.toString() === 'Invalid Date') {
                    return '';
                }

                var formattedTime = '';
                if (tmpTime !== undefined) {
                    var dateObj = {
                        hour: tmpTime.getHours(),
                        minute: tmpTime.getMinutes(),
                        second: tmpTime.getSeconds()
                    };
                    tmpDate.setHours(dateObj.hour + '', dateObj.minute + '', dateObj.second + '');
                    formattedTime =  $.datepicker.formatTime($(this).data('datepicker').settings.timeFormat,dateObj);
                   
                }

                $(this).multiDatesPicker('toggleDate', [tmpDate]);

                $(this).val(fechaArray[0] + ' ' + formattedTime);

            } else {
                $(this).val(param);
            }
        },
        /**
         * Elimina el componente de la pantalla. En caso de tener máscara también se restaura el label 
         * con un texto vacío
         *
         * @function  destroy
         * @example
         * $("#idDate").rup_date("destroy");
         */
        destroy: function () {
            //Eliminar máscara
            var labelMaskId = $(this).data('datepicker').settings.labelMaskId;
            if (labelMaskId) {
                $('#' + labelMaskId).text('');
            }
            //delete labelMaskId;
            $(this).datepicker('destroy');
        },
        /**
         * Deshabilita el componente en pantalla no pudiendo introducirse ninguna fecha ni se despliega
         *  el calendario.
         *
         * @function  disable
         * @example
         * $("#idDate").rup_date("disable");
         */
        disable: function () {
            $(this).datepicker('option', 'showOn', 'button');
            $(this).next('button').prop('disabled', true);
            $(this).prop('readonly', true);
        },
        /**
         * Habilita el componente permitiendo introducir la fecha tanto mediante teclado como mediante el 
         * desplegable del calendario
         *
         * @function  enable
         * @example
         * $("#idDate").rup_date("enable");
         */
        enable: function () {
            $(this).next('button').prop('disabled', false);
            $(this).datepicker('option', 'showOn', 'both');
            $(this).prop('readonly', false);
        },
        /**
         * Indica si el componente se encuentra deshabilitado o no.
         *
         * @function  isDisabled
         * @return {boolean} - Devuelve si el componente está deshabilitado o no.
         * @example
         * $("#idDate").rup_date("isDisabled");
         */
        isDisabled: function () {
            return $(this).prop('readonly');
        },
        /**
         * Oculta el calendario para seleccionar una fecha.
         *
         * @function  hide
         * @example
         * $("#idDate").rup_date("hide");
         */
        hide: function () {
            $(this).datepicker('hide');
        },
        /**
         * Muestra el calendario para seleccionar una fecha.
         *
         * @function  show
         * @example
         * $("#idDate").rup_date("show");
         */
        show: function () {
            $(this).datepicker('show');
        },
        /**
         * Devuelve la fecha seleccionada, si no se ha seleccionado nada devuelve vacío.
         *
         * @function  getDate
         * @return {date} - Fecha seleccionada.
         * @example
         * $("#idDate").rup_date("getDate");
         */
        getDate: function () {
            return $(this).val();
        },
        /**
         * Establece la fecha del componente. El parámetro debe ser un objeto date.
         *
         * @param {date} - Fecha que se desea asignar.
         * @example
         * $("#idDate").rup_date("setDate", new Date());
         */
        setDate: function (date) {
            $(this).datepicker('setDate', date);
        },
        /**
         * Refresca el calendario desplegado por si ha habido algún cambio.
         *
         * @function  refresh
         * @example
         * $("#idDate").rup_date("refresh");
         */
        refresh: function () {
            $(this).datepicker('refresh');
        },
        /**
         * Permite consultar y modificar la configuración del componente.
         *
         * @function option
         * @param {string | object} optionName - Nombre de la propiedad que se desea gestionar o objeto de 
         * compuesto de varias propiedades.
         * @param  [value] - Corresponde al valor de la propiedad en caso de haberse especificado el nombre 
         * de la misma en el primér parámetro.
         * @example
         * // Consultar una propiedad
         * $("#idCombo").rup_date("option", "multiselect");
         * // Establecer una propiedad
         * $("#idCombo").rup_date("option", "multiselect", 2);
         * // Establecer varias propiedad
         * $("#idCombo").rup_date("option", {datetimepicker:true, multiselect:3});
         */
        option: function (optionName, value) {
            if (value !== undefined) {
                $(this).datepicker('option', optionName, value);
            } else {
                return $(this).datepicker('option', optionName);
            }
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************
    $.fn.rup_date('extend', {

        _init: function (args) {
            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {
                //Se recogen y cruzan las paremetrizaciones del objeto
                var settings = $.extend({}, $.fn.rup_date.defaults, args[0]);

                // Se carga el adapter
                this._ADAPTER = $.rup.adapter[settings.adapter];

                //Eventos
                //Guardar referencia
                settings._onClose = settings.onClose;
                settings.onClose = function (event, ui) {
                    if (settings._onClose !== undefined) {
                        settings._onClose(event, ui);
                    }
                    if (!$.rup.browser.isIE) {
                        $(this).focus();
                    }
                };

                if (settings.multiSelect) {
                    settings._beforeShow = settings.beforeShow;
                    settings.beforeShow = function (ui, obj) {
                        if (settings._beforeShow !== undefined) {
                            settings._beforeShow(ui, obj);
                        }

                        var $dateInput = $(ui),
                            dateValue = $dateInput.attr('value'),
                            dates;

                        if (dateValue !== undefined && dateValue !== '') {
                            dates = dateValue.split(',');
                            if (dates.length > 1) {
                                $dateInput.multiDatesPicker('addDates', dates);
                            }
                        }
                    };
                }


                //Se carga el identificador del padre del patron
                settings.id = $(this).attr('id');

                $(this).attr('ruptype', 'date');

                //Carga de propiedades/literales
                //var literales = $.extend($.rup.i18n.base.rup_time,$.rup.i18n.base.rup_date);
                var literales = $.rup.i18n.base.rup_date;
                for (var key in literales) {
                    if (settings[key] === undefined) {
                        settings[key] = literales[key];
                    }
                }

                //Mostrar máscara
                if (settings.labelMaskId) {
                    if (settings.datetimepicker) {
                        if (settings.showSecond) {
                            $('#' + settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base, 'rup_date.maskDateTimeSec') + ' ');
                        } else {
                            $('#' + settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base, 'rup_date.maskDateTime') + ' ');
                        }
                    } else {
                        $('#' + settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base, 'rup_date.mask') + ' ');
                    }
                }

                //Mostrar placeholder
                if (settings.placeholderMask) {
                    if (settings.datetimepicker) {
                        if (settings.showSecond) {
                            $(this).attr('placeholder', $.rup.i18nParse($.rup.i18n.base, 'rup_date.maskDateTimeSec') + ' ');
                        } else {
                            $(this).attr('placeholder', $.rup.i18nParse($.rup.i18n.base, 'rup_date.maskDateTime') + ' ');
                        }
                    } else {
                        $(this).attr('placeholder', $.rup.i18nParse($.rup.i18n.base, 'rup_date.mask') + ' ');
                    }
                }

                //Fix: Arregla problema tamaño capa cuando selector es DIV y meses es array [X,1]
                if ($('#' + settings.id).is('div') && settings.numberOfMonths[1] === 1) {
                    if (!settings.showWeek) {
                        $('#' + settings.id).css('width', '15.4em');
                    } else {
                        $('#' + settings.id).css('width', '17.1em');
                    }
                }



                //Sab-Dom deshabilitados
                if (settings.noWeekend) {
                    settings.beforeShowDay = $.datepicker.noWeekends;
                }

                this._ADAPTER.initIconTrigger(settings);


                //Datepicker
                if (!settings.multiSelect) {
                    if (settings.datetimepicker) {
                        if (settings.showSecond) {
                            (this).attr('maxlength', '19');
                        } else {
                            (this).attr('maxlength', '16');
                        }
                        //i18n datetimepicker
                        settings.timeText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.timeText');
                        settings.hourText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.hourText');
                        settings.minuteText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.minuteText');
                        settings.secondText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.secondText');
                        settings.millisecText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.millisecText');
                        settings.microsecText = $.rup.i18nParse($.rup.i18n.base, 'rup_time.microsecText');
                        $('#' + settings.id).datetimepicker(settings);
                    } else {
                        (this).attr('maxlength', '10');
                        $('#' + settings.id).datepicker(settings);
                    }
                } else {
                    var maxlength = 0;
                    if (typeof settings.multiSelect === 'number') {
                        settings.mode = {
                            modeName: 'normal',
                            options: {
                                maxPicks: settings.multiSelect
                            }
                        };
                        settings.maxPicks = settings.multiSelect;
                        maxlength = (10 * settings.multiSelect) + (settings.multiSelect - 1);
                    } else if (typeof settings.multiSelect === 'object') {
                        settings.mode = {
                            modeName: 'daysRange',
                            options: {
                                autoselectRange: settings.multiSelect
                            }
                        };
                        maxlength = settings.multiSelect[1] - settings.multiSelect[0];
                        maxlength = (10 * maxlength) + (maxlength - 1);
                    }
                    (this).attr('maxlength', maxlength);

                    //Sobreescribir valores por defecto para multiselección
                    $.datepicker._defaults.dateFormat = settings.dateFormat;
                    $('#' + settings.id).multiDatesPicker(settings);

                    //Permitir separador de intervalos (coma)
                    $(this).keypress(function (event) {
                        if (event.charCode === 44) {
                            var value = $(event.currentTarget).val(),
                                cursorPosStart = event.originalEvent.originalTarget.selectionStart,
                                cursorPosEnd = event.originalEvent.originalTarget.selectionEnd,
                                begin = value.substring(0, cursorPosStart),
                                end = value.substring(cursorPosEnd);
                            //Si no tiene tamaño máximo o tiene selección de caracteres
                            if (value.length < $(event.currentTarget).attr('maxlength') || cursorPosStart !== cursorPosEnd) {
                                $(event.currentTarget).val(begin + ',' + end);
                                event.originalEvent.originalTarget.selectionStart = cursorPosStart + 1;
                                event.originalEvent.originalTarget.selectionEnd = cursorPosStart + 1;
                            }
                        }
                    });
                }

                this._ADAPTER.postConfigure.bind($(this))(settings);

                //Ajuste para el comportamiento de portales
                if ($.rup_utils.aplicatioInPortal() && !$('#' + settings.id).is('div')) {
                    $('.r01gContainer').append($('.ui-datepicker:not(.r01gContainer .ui-datepicker)'));
                }

                // Se aplica el tooltip
                $(this).parent().find('[title]').rup_tooltip({
                    'applyToPortal': true
                });

                //Deshabilitar
                if (settings.disabled) {
                    $('#' + settings.id).rup_date('disable');
                }

                //Callback create
                if (settings.create) {
                    settings.create();
                }

                //Se audita el componente
                $.rup.auditComponent('rup_date', 'init');
            }
        }
    });
    $.rup_date('extend', {
        _init: function (args) {
            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {
                //Se recogen y cruzan las paremetrizaciones del objeto (duplicado de objetos)
                var settings = $.extend({}, $.fn.rup_date.defaults, args[0]),
                    from_settings = $.extend(true, {}, settings),
                    to_settings = $.extend(true, {}, settings);

                //Gestionar intervalo del campo desde
                from_settings.onClose = function (dateText, inst) {
                    //				        var endDateTextBox = $("#"+settings.to);
                    var $endDateTextBox = $('#' + settings.to),
                        $startDateTextBox = inst.input,
                        startDateData, toDateData, testStartDate, testEndDate;

                    if ($endDateTextBox.attr('value') != '') {
                        startDateData = $startDateTextBox.data('datepicker');
                        toDateData = $endDateTextBox.data('datepicker');

                        if (startDateData.settings.timepicker !== undefined) {
                            testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay, startDateData.settings.hour, startDateData.settings.minute, startDateData.settings.second);
                        } else {
                            testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay);
                        }
                        if (toDateData.settings.timepicker !== undefined) {
                            testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay, toDateData.settings.hour, toDateData.settings.minute, toDateData.settings.second);
                        } else {
                            testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay);
                        }

                        if (testStartDate > testEndDate) {
                            $endDateTextBox.attr('value', dateText);
                        }
                    } else if (!settings.autoFillToField) {
                        $endDateTextBox.attr('value', dateText);
                    }
                    if (settings.onClose !== undefined) {
                        settings.onClose(dateText, inst);
                    }
                };
                from_settings.onSelect = to_settings.beforeShow = function (selectedDate) {
                    var start = $('#' + settings.from).datetimepicker('getDate'),
                        startDate;

                    startDate = start !== null ? new Date(start.getTime()) : null;

                    $('#' + settings.to).datetimepicker('option', 'minDate', startDate);

                    if (settings.datetimepicker) {
                        $('#' + settings.to).datetimepicker('option', 'minDateTime', startDate);
                    }

                    if (settings.onSelect !== undefined) {
                        settings.onSelect(selectedDate);
                    }
                };

                //Gestionar intervalo del campo hasta
                to_settings.onClose = function (dateText, inst) {
                    var $startDateTextBox = $('#' + settings.from),
                        $endDateTextBox = inst.input,
                        startDateData, toDateData, testStartDate, testEndDate;

                    if ($startDateTextBox.attr('value') != '') {
                        startDateData = $startDateTextBox.data('datepicker');
                        toDateData = $endDateTextBox.data('datepicker');

                        if (startDateData.settings.timepicker !== undefined) {
                            testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay, startDateData.settings.hour, startDateData.settings.minute, startDateData.settings.second);
                        } else {
                            testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay);
                        }
                        if (toDateData.settings.timepicker !== undefined) {
                            testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay, toDateData.settings.hour, toDateData.settings.minute, toDateData.settings.second);
                        } else {
                            testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay);
                        }

                        if (testStartDate > testEndDate) {
                            $startDateTextBox.attr('value', dateText);
                        }
                    } else if (!settings.autoFillFromField) {
                        $startDateTextBox.attr('value', dateText);
                    }
                    if (settings.onClose !== undefined) {
                        settings.onClose(dateText, inst);
                    }
                };
                to_settings.onSelect = from_settings.beforeShow = function (selectedDate) {
                    var end = $('#' + settings.to).datetimepicker('getDate'),
                        endDate;

                    endDate = end !== null ? new Date(end.getTime()) : null;

                    $('#' + settings.from).datetimepicker('option', 'maxDate', endDate);

                    if (settings.datetimepicker) {
                        $('#' + settings.from).datetimepicker('option', 'maxDateTime', endDate);
                    }

                    if (settings.onSelect !== undefined) {
                        settings.onSelect(selectedDate);
                    }
                };

                //Lanzar componente
                $('#' + settings.from).rup_date(from_settings);
                $('#' + settings.to).rup_date(to_settings);
            }
        }
    });
    
    $.extend($.datepicker, {
    	// Corrección para el botón que establece la fecha y hora actual.
    	_gotoToday: function (id) {
    		const inst = this._getInst($(id)[0]);
    		this._base_gotoToday(id);

    		const tzoffset = $.timepicker.timezoneOffsetNumber(inst.settings.timezoneOffset);
    		const now = new Date();
    		now.setMinutes(now.getMinutes() + now.getTimezoneOffset() + parseInt(tzoffset, 10));
    		
    		this._setTime(inst, now);
    		this._setDate(inst, now);
    		this._onSelectHandler(inst);
    	},
    	_onSelectHandler: function (inst) {
    		const onSelect = inst.settings.onSelect;
    		const inputEl = inst.input ? inst.input[0] : null;
    		if (onSelect && inputEl) {
    			onSelect.apply(inputEl, [inputEl.value, inst]);
    		}
    	}
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    /**
     * A continuación se muestran los posibles parámetros de configuración que recibe el componente.
     * @name options
     * @property {boolean} [datetimepicker=false] - Indica si el componente permite introducir la hora además de la fecha
     * @property {boolean} [disabled=false] - Indica si el componente debe aparecer deshabilitado o no.
     * @property {string} altField - Identificador de un campo adicional para que muestre la fecha en otro formato.
     * @property {string} altFormat - Formato que debe seguir la fecha en el campo adicional
     * @property {string} appendText - Texto que se puede añadir detrás de cada campo de fecha. Se recomienda el uso del atributo “labelMaskId” que se detalla a continuación en lugar de este atributo.
     * @property {string} labelMaskId - Identificador del label que contendrá la máscara que indica el formato de la fecha.
     * @property {string} mask - Texto empleado para la máscara de la fecha. Su valor por defecto se obtiene del fichero de idioma.
     * @property {boolean} [autoSize=false] - Booleano que indica si el campo para la fecha se tiene que redimensionar automáticamente para adaptares al texto introducido
     * @property {string} buttonImage - Ruta a la imagen que se muestra junto al campo de la fecha y que sirve para desplegar el calendario pulsando sobre ella. Por defecto se muestra una imagen incluida en los ficheros de RUP.
     * @property {string} buttonText - Texto alternativo de la imagen que se muestra junto al campo de la fecha. Su valor por defecto se obtiene del fichero de idioma.
     * @property {boolean} [changeMonth=true] - Indica si se muestra un combo que en la cabecera que facilita el cambio de mes
     * @property {boolean} [changeYear=true] - indica si se muestra un combo que en la cabecera que facilita el cambio de año
     * @property {string} [closeText] - Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para cerrar el calendario. Su valor por defecto se obtiene del fichero de idioma.
     * @property {string} currentText - Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para seleccionar la fecha actual en el calendario. Su valor por defecto se obtiene del fichero de idioma.
     * @property {string} dateFormat - Formato de la fecha a introducir (ej: dd/mm/yy para 20/01/2011). Su valor por defecto se obtiene del fichero de idioma.
     * @property {array} dayNames - Literales para los días [array]. Su valor por defecto se obtiene del fichero de idioma.
     * @property {array} dayNamesMin - Literales para los días (mínimos) [array]. Su valor por defecto se obtiene del fichero de idioma.
     * @property {array} 	dayNamesShort - Literales para los días (corto) [array]. Su valor por defecto se obtiene del fichero de idioma.
     * @property {date|string|number} defaultDate  - fecha que se muestra por defecto destacada cuando se abre el calendario y no hay ninguna fecha escrita. El tipo de parámetro puede ser Date, String o Number (ver la explicación al final de este apartado). Por defecto se destaca la fecha del día.
     * @property {string|number} [duration=normal] - Velocidad a la que aparece el calendario en pantalla (animación). Sus posibles valores son: ‘slow’, ‘normal’ y ‘fast’ o un valor numérico (milisegundos).
     * @property {number} firstDay -Número que indica en qué día de la semana debe empezar el calendario. El valor 0 equivale al domingo, el 1 al lunes y así sucesivamente.
     * @property {boolean} [hideIfNoPrevNext=false] - Oculta los enlaces de siguiente/anterior mes cuando no se puede navegar. En caso contrario, los enlaces se deshabilitan
     * @property {date|string|number} maxDate - Fecha máxima que se puede seleccionar (límite superior). Por defecto no hay límite.
     * @property {date|string|number} minDate - Fecha mínima que se puede seleccionar (límite inferior). Por defecto no hay límite.
     * @property {array} monthNames - Literales para los meses [array]. Su valor por defecto se obtiene del fichero de idioma.
     * @property {array} monthNamesShort - Literales para los meses (corto) [array]. Su valor por defecto se obtiene del fichero de idioma.
     * @property {string} nextText - Literal a mostrar en el enlace de siguiente. Su valor por defecto se obtiene del fichero de idioma.
     * @property {number|array} [numberOfMonths=1] -Puede definirse como un numérico (ej. 2) o como un array indicando filas y columnas (ej. [2, 3]).
     * @property {string} prevText - Literal a mostrar en el enlace de anterior. Su valor por defecto se obtiene del fichero de idioma.
     * @property {boolean} [selectOtherMonths=false] - Permite seleccionar los días del meses anterior/posterior del que se muesta. Requiere que estén activos dichos días mediante el parámetro showOtherMonths
     * @property {string} [showAnim=show] - Indica el tipo de animación que se emplea para mostrar el calendario en pantalla.
     * @property {boolean} [showButtonPanel=false] - Indica si se muestran los botones de la parte inferior (hoy y cerrar).
     * @property {number} [showCurrentAtPos=0] - Cuando se muestra más de un mes, indica la posición que ocupa el mes actual.
     * @property {boolean} showMonthAfterYear - Intercambia la posición del mes y del año en la cabecera del calendario.
     * @property {object} showOptions - Objeto que determina las propiedades de la animación del calendario. Para más información ver la siguiente  {@link http://api.jqueryui.com/datepicker/#option-showAnim|página} .
     * @property {boolean} [showWeek=false] - Indica si se debe mostrar el número de semana.
     * @property {number} stepMonths - Indica el número de meses que se avanzan al pulsar los enlaces anterior/siguiente.
     * @property {string} weekHeader - Literal que aparece sobre los números de semana. Su valor por defecto se obtiene del fichero de idioma.
     * @property {string}  yearRange - Determina el rango de años a mostrar en el combo de la cabecera del calendario. No implica que sea el límite de años a seleccionar. Se debe definir como un literal que indique el inicio y el fin separado por dos puntos ej. 2001:2011. Puede usarse el la letra c como valor actual restándole y sumándole un numérico ej. c-10:c+10. Su valor por defecto es c-10:c+10
     * @property {string} yearSuffix - Texto adicional a mostrar en la cabecera del calendario junto al año.
     * @property {booelan} 	[noWeekend=false] - Indica si se muestran o no los días del fin de semana (sábado y domingo).
     * @property {string} from - Indica el selector del campo inicial en los intervalos de fechas
     * @property {string} to - Indica el selector del campo final en los intervalos de fechas
     * @property {array|number} 	multiselect - Atributo que indica si se permite la multiselección de fechas y el modo en el que se aplica.
     * @property {boolean} [autoFillToField=true] - Atributo que indica si se auto rellena el campo hasta
     * @property {boolean} [autoFillFromField=true] - Atributo que indica si se auto rellena el campo desde
     * @property {number} [timezoneOffset=0] - Permite ajustar el huso horario
     */
    $.fn.rup_date.defaults = {
    	adapter: 'date_material',
    	placeholderMask: false,
    	datetimepicker: false,
    	multiSelect: false,
    	changeMonth: true,
    	changeYear: true,
    	noWeekend: false,
    	showSecond: true,
    	autoFillToField: true,
    	autoFillFromField: true,
    	showMillisec: false,
    	showMicrosec: false,
    	timezoneOffset: 60
    };

    //EVENTOS

    /**
     * Función que se lanza cuando se crea el calendario. La invocación es automática por parte del componente
     * @event module:rup_date#create
     * @example
     * $(selector).rup_date({ create: function(){...} });
     */

    /**
     * Permite asociar una función que se ejecutará antes de que se muestre el calendario. Los parámetros recibidos son el campo del calendario y la instancia del componente.
     * @event module:rup_date#beforeShow
     * @example
     * $(selector).rup_date({ beforeShow: function(input, inst){...} });
     */

    /**
     * Permite asociar una función que se ejecutará cuando se cambie de mes o de año en el calendario. Los parámetros recibidos son el año y mes seleccionados así como la instancia del componente
     * @event module:rup_date#onChangeMonthYear
     * @example
     * $(selector).rup_date({onChangeMonthYear: function(y,m,inst){...} });
     */

    /**
     * Permite asociar una función que se ejecutará cuando se seleccione un valor del calendario. Los parámetros recibidos son la fecha seleccionada (texto) y la instancia del componente.
     * @event module:rup_date#onSelect
     * @example
     * $(selector).rup_date({ onSelect: function(dateText, inst){...} });
     */

    /**
     * Permite asociar una función que se ejecutará cuando se oculte el calendario. Los parámetros recibidos son la fecha seleccionada (texto) y la instancia del componente.
     *  @event module:rup_date#onClose
     *  @example
     *  $(selector).rup_date({ onClose: function(dateText, inst){...} });
     */


}));