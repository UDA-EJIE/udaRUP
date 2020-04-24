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
 * Herramientas para mostrar gráficas atractivas para mostrar
 * informacón al usuario de forma atractiva.
 *
 * @summary Componente RUP Chart.
 * @module rup_chart
 * @see El componente está basado en el plugin {@link http://www.chartjs.org/|Chart.js}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link http://www.chartjs.org/docs/|aquí}.
 */

/*global Chart */
(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base', 'chart.js'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá
    // los métodos y la función de jQuery)


    var rup_chart = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_chart', rup_chart));

    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    $.fn.rup_chart('extend', {




        /**
         * Destruye la instancia del grafico creado, limpia cualquier referencia almacenada del componente. Debe ser utilizado antes de usar el canvas para un nuevo gráfico]
         * @function destroy
         */
        destroy: function () {
            var grafico = this.data('chart');
            grafico.destroy();
            this.data('chart', '');
            this.data('settings', '');
        },


        /**
         * Método utilizado para actualizar los datos de los gráficos en caliente, tanto los labels como los datos numéricos
         * @function updateData
         * @param  {Object} param - Estructura de datos de rup_chart
         * @param  {array} param.datasets - Valores númericos a representar en el gráfico
         * @param  {array} param.labels - Etiquetas de literales asociados al dataset de datos
         */
        updateData: function (param) {
            var settings = this.data('settings');
            var grafico = this.data('chart');
            grafico.data.datasets = param.datasets;
            grafico.data.labels = param.labels;
            grafico.update();

            settings.data = param;
            //actualizo los datos del componente rup
            this.data('settings', settings);
        },

        /**
         * Método que actualiza los labels asociados a los datos
         * @function  updateLabels
         * @param  {array} param - Los labels a actualizar
         */
        updateLabels: function (param) {
            var settings = this.data('settings');
            var grafico = this.data('chart');
            //actualizar grafico
            grafico.data.labels = param;
            grafico.update();
            //actualizar datos del componente
            settings.data.labels = param;

        },
        /**
         * Método que actualiza los datasets con los valores numéricos a representar por el gráfico
         * @function  updateDatasets
         * @param  {array} param - Los datasets a actualizar
         */
        updateDatasets: function (param) {
            var settings = this.data('settings');
            var grafico = this.data('chart');
            //actualizar grafico
            grafico.data.datasets = param;
            grafico.update();
            //actualizar datos del componente
            settings.data.datasets = param;
        },
        /**
         * Método que devuelve los datasets de datos del gráfico
         * @function  getDatasets
         * @return {object} - El conjunto de datasets de datos del componente
         */
        getDatasets: function () {
            return this.data('settings').data.datasets;
        },

        /**
         * Método que devuelve los labels asociados a los datasets del gráfico
         * @function  getLabels
         * @return {object}  - El conjunto de labels del componente
         */
        getLabels: function () {
            return this.data('settings').data.labels;
        },
        /**
         * Método que devuelve la estructura de datos de datasets y labels que definen el gráfico
         * @function  getData
         * @return {object} - [El conjunto de datos del componente]
         */
        getData: function () {
            return this.data('settings').data;
        },

        /**
         * Devuelve la instancia del objeto chart.js
         * @function  getChart
         * @return {object} - la instancia del objecto
         */
        getChart: function () {
            return this.data('chart');
        },

        /**
         * Devuelve el grafico en un string base64
         * @function  toBase64Image
         * @return {object} -  string en base64 del gráfico
         */
        toBase64Image: function () {
            var grafico = this.data('chart');
            return grafico.toBase64Image();
        }

    });

    // DEFINICIÓN DE MÉTODOS PRIVADOS

    $.fn.rup_chart('extend', {


    });

    // methodo INICIALIZACION
    $.fn.rup_chart('extend', {

        _init: function (args) {
            var settings = $.extend({}, $.fn.rup_chart.defaults, args[0]);
            settings.id = $(this).attr('id');
            var $self = this;
            var ctx = document.getElementById(settings.id).getContext('2d');
            var grafico;




            if (args.length > 1) {
                $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
            } else {


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

                $self.attr('role', 'graphics-data');
                $self.addClass('rup-chart');
                //atributo ruptype
                $self.attr('ruptype', 'chart');


                //Almacenar los settings
                $('#' + settings.id).data('settings', settings);

                //almacenar el Objecto Chart
                $('#' + settings.id).data('chart', grafico);
            }
            //Se audita el componente
            $.rup.auditComponent('rup_chart', 'init');
        }

    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************


    $.fn.rup_chart.defaults = {

    };









}));
