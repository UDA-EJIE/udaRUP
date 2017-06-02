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
 * El usuario puede introducir y seleccionar una hora tanto de forma manual como visual, moviéndose fácilmente por las horas y los minutos, recibiendo ayudas y sugerencias para minimizar las posibilidades de introducir una hora incorrecta.
 *
 * @summary Componente RUP Time.
 * @module rup_time
 * @example
 * var properties = {
 *   labelMaskId : "hora-mask",
 *   showSecond : true,
 *   timeFormat: 'hh:mm:ss',
 *   showButtonPanel: true
 * };
 *
 * $("#idTime").rup_time(properties);
 */
(function (factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(["jquery", "./rup.base", "jquery-ui-timepicker"], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function ($) {


  // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)

  var rup_time = {};

  //Se configura el arranque de UDA para que alberge el nuevo patrón
  $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_time", rup_time));

  // DEFINICIÓN DE MÉTODOS PÚBLICOS
  $.fn.rup_time("extend", {
    /**
     * Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor.
     *
     * @name getRupValue
     * @function
     * @return {string} - Devuelve el valor actual del componente seleccionado por el usuario.
     * @example
     * $("#idTime").rup_time("getRupValue");
     */
    getRupValue: function () {
      var timeformat, dateObj;
      timeformat = $(this).data("datepicker").settings.timeFormat;
      dateObj = $.datepicker.parseTime(timeformat, $(this).rup_time("getTime"));
      return dateObj ? $.timepicker._formatTime(dateObj, "hh:mm:ss") : "";
    },
    /**
     * Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor.
     *
     * @name setRupValue
     * @function
     * @param {string} param - Valor que se va a asignar al componente. En caso de tratarse de uan configuración en la que se permite seleccionar varias fechas se indicará mediante un array.
     * @example
     * $("#idTime").rup_time("setRupValue", "10:25:16");
     */
    setRupValue: function (param) {
      var timeformat, tmpDate, formattedTime;
      timeformat = $(this).data("datepicker").settings.timeFormat;
      tmpDate = $.datepicker.parseTime("hh:mm:ss", param);
      formattedTime = tmpDate ? $.timepicker._formatTime(tmpDate, timeformat) : "";
      $(this).val(formattedTime);
    },
    /**
     * Elimina el componente de la pantalla. En caso de tener máscara también se restaura el label con un texto vacío.
     *
     * @name destroy
     * @function
     * @example
     * $("#idTime").rup_time("destroy");
     */
    destroy: function () {
      //Eliminar máscara
      var labelMaskId = $(this).data("datepicker").settings.labelMaskId;
      if (labelMaskId) {
        $("#" + labelMaskId).text("");
      }
      delete labelMaskId;
      //Eliminar imagen (reloj)
      $(this).next("img").remove();
      $(this).timepicker("destroy");
    },
    /**
     * Deshabilita el componente en pantalla no pudiendo introducirse ninguna hora ni se despliega el calendario.
     *
     * @name disable
     * @function
     * @example
     * $("#idTime").rup_time("disable");
     */
    disable: function () {
      $(this).timepicker("disable");
    },
    /**
     * Habilita el componente permitiendo introducir la hora tanto mediante teclado como mediante el desplegable.
     *
     * @name enable
     * @function
     * @example
     * $("#idTime").rup_time("enable");
     */
    enable: function () {
      $(this).timepicker("enable");
    },
    /**
     * Indica si el componente se encuentra deshabilitado o no.
     *
     * @name isDisabled
     * @function
     * @return {boolean} - Determina si el componente está deshabilitado o no.
     * @example
     * $("#idTime").rup_time("isDisabled");
     */
    isDisabled: function () {
      return $(this).timepicker("isDisabled");
    },
    /**
     * Oculta el desplegable para seleccionar una hora.
     *
     * @function
     * @name hide
     * @example
     * $("#idTime").rup_time("hide");
     */
    hide: function () {
      $(this).timepicker("hide");
    },
    /**
     * Muestra el desplegable para seleccionar una hora.
     *
     * @function
     * @name show
     * @example
     * $("#idTime").rup_time("show");
     */
    show: function () {
      $(this).timepicker("show");
    },
    /**
     * Devuelve la hora seleccionada, si no se ha seleccionado nada devuelve vacío.
     *
     * @name getTime
     * @function
     * @return {string} - Devuelve la hora seleccionada por el usuario utilizando.
     * @example
     * $("#idTime").rup_time("getTime");
     */
    getTime: function () {
      return $(this).val();
    },
    /**
     * Establece la hora del componente.
     *
     * @name setTime
     * @function
     * @return {date} time - Hora que se desea asignar al componente.
     * @example
     * $("#idTime").rup_time("setTime", time);
     */
    setTime: function (time) {
      $(this).timepicker("refresh"); //Necesario para 'inicializar' el componente
      $.datepicker._setTime($.datepicker._getInst($("#" + $(this).data("datepicker").settings.id)[0]), time);
    },
    /**
     * Refresca el calendario desplegado por si ha habido algún cambio.
     *
     * @name refresh
     * @function
     * @example
     * $("#idTime").rup_time("refresh");
     */
    refresh: function () {
      $(this).timepicker("refresh");
    },
    /**
     * Permite consultar y modificar la configuración del componente.
     *
     * @name option
     * @param {string | object} optionName - Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades.
     * @param {*} [value] - Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro.
     * @function
     * @example
     * // Consultar una propiedad
     * $("#idTime").rup_time("option", "showSecond");
     * // Establecer una propiedad
     * $("#idTime").rup_time("option", "showSecond", true);
     * // Establecer varias propiedad
     * $("#idTime").rup_time("option", {showSecond: true, showButtonPanel: true});
     */
    option: function (optionName, value) {
      $(this).timepicker("option", optionName, value);
    }
    //No soportadas: widget, dialog
  });

  // DEFINICIÓN DE MÉTODOS PRIVADOS
  $.fn.rup_time("extend", {
    /**
     * Método de inicialización del componente
     *
     * @name _init
     * @function
     * @private
     */
    _init: function (args) {
      if (args.length > 1) {
        $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, "rup_global.initError") + $(this).attr("id"));
      } else {
        //Se recogen y cruzan las paremetrizaciones del objeto
        var $self = $(this),
          self = $self[0],
          settings = $.extend({}, $.fn.rup_time.defaults, args[0]);

        self._ADAPTER = $.rup.adapter[settings.adapter];

        //Se carga el identificador del padre del patron
        settings.id = $self.attr("id");

        $self.attr("ruptype", "time");

        //Carga de propiedades/literales
        var literales = $.rup.i18n.base["rup_time"];
        for (var key in literales) {
          $.timepicker._defaults[key] = literales[key];
        }

        //Mostrar máscara
        if (settings.labelMaskId) {
          $("#" + settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base, "rup_time.mask") + " ");
        }

        //Mostrar placeholder
        if (settings.placeholderMask) {
          $self.attr("placeholder", $.rup.i18nParse($.rup.i18n.base, "rup_time.mask"));
        }

        //Imagen del reloj
        settings.buttonImage = $.rup.STATICS + (settings.buttonImage ? settings.buttonImage : "/rup/css/images/clock.png");

        //Atributos NO MODIFICABLES

        //Timepicker
        $self.timepicker(settings);

        //Max-Length
        //$("#"+settings.id).attr("maxlength",literales["mask"].length-2);

        //Añadir imagen
        $.proxy(self._ADAPTER.initIconTrigger, $self)(settings);

        //Ajuste para el comportamiento de portales
        if ($.rup_utils.aplicatioInPortal() && !$self.is("div")) {
          $(".r01gContainer").append($(".ui-datepicker:not(.r01gContainer .ui-datepicker)"));
        }

        //Deshabilitar
        if (settings.disabled) {
          $self.rup_time("disable");
        }

        // Se aplica el tooltip
        $self.parent().find("[title]").rup_tooltip({
          "applyToPortal": true
        });
      }
    }
  });

  // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
  $.fn.rup_time.defaults = {
    adapter: "time_bootstrap",
    placeholderMask: false,
    stepHour: 1,
    stepMinute: 1,
    stepSecond: 1,
    showButtonPanel: false,
    timeOnly: true
  };

  //Sobreescribir EVENTOS
  $.datepicker._timepicker_doKeyPress = $.datepicker._doKeyPress;
  $.datepicker._doKeyPress = function (event) {
    var instance = $.datepicker._get($.datepicker._getInst(event.target), 'timepicker');
    switch (event.keyCode) {
      //Izquierda
    case 37:
      if (event.ctrlKey && !(event.altKey || event.shiftKey)) { //Ctrl
        instance.hour_slider.slider("option", "value", instance.hour_slider.slider("option", "value") - instance._defaults.stepHour);
      } else if (event.ctrlKey && event.shiftKey && !event.altKey) { //Ctrl + Shift
        instance.minute_slider.slider("option", "value", instance.minute_slider.slider("option", "value") - instance._defaults.stepMinute);
      } else if (event.ctrlKey && event.shiftKey && event.altKey) { //Ctrl + Shfit + Alt
        instance.second_slider.slider("option", "value", instance.second_slider.slider("option", "value") - instance._defaults.stepSecond);
      }
      break;
      //Derecha
    case 39:
      if (event.ctrlKey && !(event.altKey || event.shiftKey)) { //Ctrl
        instance.hour_slider.slider("option", "value", instance.hour_slider.slider("option", "value") + instance._defaults.stepHour);
      } else if (event.ctrlKey && event.shiftKey && !event.altKey) { //Ctrl + Shift
        instance.minute_slider.slider("option", "value", instance.minute_slider.slider("option", "value") + instance._defaults.stepMinute);
      } else if (event.ctrlKey && event.shiftKey && event.altKey) { //Ctrl + Shfit + Alt
        instance.second_slider.slider("option", "value", instance.second_slider.slider("option", "value") + instance._defaults.stepSecond);
      }
      break;
    }
    if (instance) {
      instance._onTimeChange();
    }
    return $.datepicker._timepicker_doKeyPress(event);
  };


  /**
   * @description Propiedades de configuración del componente.
   *
   * @name defaults
   *
   * @property {boolean} [disabled=false] - Indica si el componente debe aparecer deshabilitado o no.
   * @property {string} [labelMaskId] - Identificador del label que contendrá la máscara que indica el formato de la hora.
   * @property {string} [timeFormat=hh:mm] - Formato en el que se muestra la hora. Los posibles modificadores son: <ul><li> h: modificador relativo a las horas. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (hh). </li><li> m: modificador relativo a los minutos. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (mm). </li><li>s: modificador relativo a los segundos. En caso de querer que las horas inferiores a 10 muestren el 0 deberá incluirse por duplicado (ss). </li></ul>
   * @property {Integer} [hour=0] - Valor con el que se carga inicialmente las horas del componente..
   * @property {Integer} [minute=0] - Valor con el que se carga inicialmente los minutos del componente.
   * @property {Integer} [second=0] - Valor con el que se carga inicialmente los segundos del componente.
   * @property {Integer} [hourMin=0] - Valor mínimo seleccionable en las horas del componente.
   * @property {Integer} [hourMax=23] - Valor máximo seleccionable en las horas del componente.
   * @property {Integer} [minuteMin=0] - Valor mínimo seleccionable en los minutos del componente.
   * @property {Integer} [minuteMax=59] - Valor máximo seleccionable en los minutos del componente.
   * @property {Integer} [secondMin=0] - Valor mínimo seleccionable en los segundos del componente.
   * @property {Integer} [secondMax=59] - Valor mínimo seleccionable en los segundos del componente.
   * @property {boolean} [showHour=true] - Indica si se muestran o no las horas.
   * @property {boolean} [showMinute=true] - Indica si se muestran o no los minutos.
   * @property {boolean} [showSecond=false] - Indica si se muestran o no los segundos.
   * @property {Integer} [stepHour=1] - Establece el incremento de la barra de scroll relativa a las horas.
   * @property {Integer} [stepMinute=1] - Establece el incremento de la barra de scroll relativa a los minutos.
   * @property {Integer} [stepSecond=1] - establece el incremento de la barra de scroll relativa a los segundos.
   * @property {Integer} [hourGrid=0] - Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a las horas. Al pinchar sobre dichos números se selecciona ese valor.
   * @property {Integer} [minuteGrid=0] - Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a los minutos. Al pinchar sobre dichos números se selecciona ese valor.
   * @property {Integer} [secondGrid=0] - Indica el intervalo de los números que aparecen bajo la barra de scroll relativa a los segundos. Al pinchar sobre dichos números se selecciona ese valor.
   * @property {boolean} [showTime=true] - Determina si se desea mostrar o no la fecha en el desplegable.
   * @property {boolean} [ampm=false] - Determina si en lugar de mostrar la hora en formato 0-24 se muestra con el literal am/pm.
   * @property {boolean} [showButtonPanel=false] - Indica si se muestran los botones de la parte inferior (ahora y cerrar).
   * @property {string} [mask] - Texto empleado para la máscara de la fecha. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [buttonText] - Texto alternativo de la imagen que se muestra junto al campo de la fecha. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [closeText] - Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para cerrar el desplegable. Su valor por defecto se obtiene del fichero de idioma..
   * @property {string} [currentText] - Texto a mostrar en el botón que se muestra en el panel inferior (requiere el activarlo mediante el atributo showButtonPanel) para seleccionar la hora actual en el desplegable. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [timeOnlyTitle] - Texto que aparece en la cabecera del desplegable. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [timeText] - Texto que aparece delante de la hora seleccionada (en caso de que esté activo el atributo showTime). Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [hourText] - Texto que aparece delante de la barra de scroll de selección de horas. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [minuteText] - Texto que aparece delante de la barra de scroll de selección de minutos. Su valor por defecto se obtiene del fichero de idioma.
   * @property {string} [secondText] - Texto que aparece delante de la barra de scroll de selección de segundos. Su valor por defecto se obtiene del fichero de idioma.
   */

  //eventos

  /**
   * Permite asociar una función que se ejecutará cuando se modifique alguno de los valores del desplegable (hora, minutos o segundos). Los parámetros recibidos son la hora seleccionada (texto) y la instancia del componente
   * @event module:rup_time#onSelect
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @example
   * $(selector).rup_time({ onSelect: function(dateText, inst){...} });
   */

  /**
   * Permite asociar una función que se ejecutará cuando se oculte el desplegable. Los parámetros recibidos son la hora seleccionada (texto) y la instancia del componente
   * @event module:rup_time#onClose
   * @property {Event} e - Objeto Event correspondiente al evento disparado.
   * @example
   * $(selector).rup_time({ onClose: function(dateText, inst){...} });
   */



}));
