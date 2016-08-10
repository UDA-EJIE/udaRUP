/*!
 * Copyright 2014 E.J.I.E., S.A.
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
 * @fileOverview Implementa el patrón RUP Chart.
 * @author EJIE
 * @version 3.0.0
 */
(function ($) {

    //**********************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá
    // los métodos y la función de jQuery)
    //**********************************************************************************

    /**
     * Herramientas para mostrar gráficas atractivas para mostrar
     * informacón al usuario de forma atractiva.
     *
     *
     *
     * @summary Componente RUP Chart.
     * @namespace jQuery.rup_chart
     * @memberOf jQuery
     * @since 3.0.0
     * @tutorial rup_chart
     */
    var Rup_chart = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_chart', Rup_chart));

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_chart('extend', {

        getRupValue: function () {

            return this.data("settings");
        },
        setRupValue: function (param) {
            this.updateData(param.data);


        },
        updateData: function (data) {
            var settings = this.data("settings");
            var grafico = this.data("chart");
            grafico.data.datasets = data.datasets;
            grafico.data.labels = data.labels;
            grafico.update();

            settings.data = param.data;
            //actualizo los datos del componente rup
            this.data("settings", settings);
        },

    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_chart('extend', {

        //gestión de i18n para los labels de los charts
        _parseLabels: function (labels) {
            var arrLabels = [];
            $.each(labels, function (key, value) {
                arrLabels.push(value);
            });
            return arrLabels;
        },
    });

    //*******************************
    // methodo INICIALIZACION
    //*******************************
    $.fn.rup_chart('extend', {

        _init: function (args) {
            var settings = $.extend({}, $.fn.rup_chart.defaults, args[0]);
            settings.id = $(this).attr('id');
            $self = this;
            var ctx = document.getElementById(settings.id).getContext('2d');
            var grafico;


            //gestion de literales de labels i18n
            if (settings.data.labels !== undefined) {
                settings.data.labels = this._parseLabels(settings.data.labels);
            }


            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {
                var dataset = settings.data.datasets;



                if (settings.options !== undefined) {
                    grafico = new Chart(ctx, {
                        type: settings.type,
                        data: settings.data,
                        options: settings.options
                    });
                } else {

                    grafico = new Chart(ctx, {
                        type: settings.type,
                        data: settings.data

                    });
                }

                $self.addClass('rup_chart');
                //atributo ruptype


                //Almacenar los settings
                $("#" + settings.id).data("settings", settings);

                //almacenar el Objecto Chart
                $("#" + settings.id).data("chart", grafico);
            }


        }

    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    /**
     * Opciones por defecto de configuración del componente comunes a todos los
     * tipos de gráficos.
     * @name jQuery.rup_chart#OptionsGlobal
     *
     * @property {boolean} [scaleShowGridLines] - Mostrar las líneas de la escala en la gráfica
     * @property {string} [scaleGridLineColor] - Asigna un color a las líneas de la escala.
     * @property {number} [scaleGridLineWidth] - Asigna un ancho a las líneas de la escala.
     * @property {boolean} [scaleShowHorizontalLines] - Mostrar solo las líneas horizonates del gráfico de la escala.
     * @property {boolean} [scaleShowVerticalLines] - Mostrar solo las líneas verticales del gráfico de la escala.
     * @property {boolean} [bezierCurve] - Permitir que la línea sea curva entre los puntos.
     * @property {number} [bezierCurveTension] - Tensión de la curvatura entre los puntos.
     * @property {boolean} [pointDot] - Mostrar puntos por cada valor.
     * @property {number} [pointRadius] - Radio de cada punto expresado en pixels.
     * @property {number} [pointDotStrokeWidth] - Anchura de los puntos.
     * @property {number} [pointHitDetectionRadius] - Anchura extra a la detección de colisión alrededor del punto.
     * @property {boolean } [datasetStroke ] - Mosrtar trazo para un conjunto de datos.
     * @property { number} [datasetStrokeWidth] - Ancho del trazo para el conjunto de datos.
     * @property {boolean } [datasetFill] - Rellenar el conjunto de datos con un color.
     * @property {string } [legendTemplate] - Plantilla html de la leyenda.
     *
     */




    $.fn.rup_chart.defaults = {
        foobar: false
    };
    /**
     * Opciones de configuración del gráfico de tipo "bar".
     * @name jQuery.rup_chart#OptionsBar
     *
     *  @property {boolean} [scaleBeginAtZero] - Comenzar la escala en 0.
     *  @property {booelan} [barShowStroke]  - Mostrar traza por cada barra.
     *  @property {number} [barStrokeWidth] - Medida en pixels de la anchura del trazo de la barra.
     *  @property {number} [barValueSpacing] - Espaciado entre cada valor en la X.
     *  @property {number} [barDatasetSpacing] - Espaciado entre cada valor en la X.
     */
    /**
     * Opciones de configuración del gráfico de tipo "Radar".
     * @name jQuery.rup_chart#OptionsRadar
     * @member Options
     *
     *   @property {boolean} [scaleShowLine] - Mostar las lineas por cada punto de la escala.
     *   @property {booelan} [angleShowLineOut]  - Mostrar las lineas fuera del gráfico
     *   @property {boolean} [scaleBeginAtZero] - Comenzar la scale en 0.
     *   @property {string} [angleLineColor] - Color de la linea de ángulo.
     *   @property {number} [angleLineWidth] - Tamaño en pixels del ancho de la línea.
     *   @property {string} [pointLabelFontFamily] - Tipo de fuente para las etiquetas.
     *   @property {String} [pointLabelFontStyle] - Estilo del tamaño de las fuentes (normal, bold...).
     *   @property {number} [pointLabelFontSize] - Tamaño en pixels de la fuente de las etiquetas.
     *   @property {string} [pointLabelFontColor] - Color de la fuente de las etiquetas.
     */

    /**
     * Opciones de configuración del gráfico de tipo "Polar".
     * @name jQuery.rup_chart#OptionsPolar
     *
     *   @property {boolean} [scaleShowLabelBackdrop] - Mostar un fondo para la etiqueta de escalas.
     *   @property {string} [scaleBackdropColor]  - Color de fondo para la etiqueta de escalas.
     *   @property {boolean} [scaleBeginAtZero] - Comenzar la scale en 0.
     *   @property {number} [scaleBackdropPaddingY] - El espaciado arriba y abajo de la etiqueta en pixels.
     *   @property {number} [scaleBackdropPaddingX] - El espaciado izquierdo y derecho de la etiqueta en pixels.
     *   @property {boolean} [scaleShowLine] - Mostrar una línea por cada valor en la escala.
     *   @property {string} [segmentStrokeColor] - El color del trazo de cada segmento.
     *   @property {number} [segmentStrokeWidth] - Anchura del trazo en pixels.
     *   @property {number} [animationSteps] - Cantidad de putnos intermedios en la animación.
     *   @property {string} [animationEasing] - Efecto de suavizado de la animación (easeOutBounce,...).
     *   @property {boolean} [animateRotate] - Animar la rotación del gráfico.
     *   @property {boolean} [animateScale] - Animar la escala desde el centro.
     */


    /**
     * Opciones de configuración del gráfico de tipo "Pie" y "Doughnut".
     * @name jQuery.rup_chart#OptionsPie&Doughnut
     *   @inner
     *   @property {boolean} [segmentShowStroke] - Mostrar un trazo por cada segmento.
     *   @property {string} [segmentStrokeColor] - Color de cada trazo de segmento.
     *   @property {number} [segmentStrokeWidth] - Anchura de los trazos de los segmentos.
     *   @property {number} [percentageInnerCutout] - Porcentaje del gráfico cortado por la mitad.
     *   @property {number} [animationSteps] - Cantidad de putnos intermedios en la animación.
     *   @property {string} [animationEasing] - Efecto de suavizado de la animación (easeOutBounce,...).
     *   @property {boolean} [animateRotate] - Animar la rotación del gráfico.
     *   @property {boolean} [animateScale] - Animar la escala desde el centro.
     */









})(jQuery);
