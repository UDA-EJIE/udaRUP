/*global jQuery */
/*global define */

/**
 * @fileoverview TimeJQueryUIAdapter - Adaptador para time picker jQuery UI
 * @deprecated Este adaptador está deprecado desde v6.3.0. Usar TimeMaterialAdapter en su lugar.
 * @todo Será eliminado en v7.0.0
 * @see TimeMaterialAdapter Para el reemplazo recomendado
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery', '../rup.base', '../templates'], factory);
    } else {
        // Browser globals
        root.TimeJQueryUIAdapter = factory(jQuery);
    }
}(this, function ($) {

    /**
     * @deprecated Desde v6.3.0 - Usar TimeMaterialAdapter en su lugar
     * @constructor
     */
    function TimeJQueryUIAdapter() {
        // Sin advertencia en el constructor para no saturar la consola con mensajes incluso cuando no se usa el adaptador
    }

    TimeJQueryUIAdapter.prototype.NAME = 'time_jqueryui';

    /**
     * Muestra una advertencia de deprecación una sola vez por método
     * @private
     * @param {string} methodName Nombre del método deprecado
     * @param {string} flagName Nombre de la bandera para controlar si ya se mostró
     */
    TimeJQueryUIAdapter._showDeprecationWarning = function (methodName, flagName) {
        if (!TimeJQueryUIAdapter[flagName]) {
            if (typeof console !== 'undefined' && console.warn) {
                console.warn(`TimeJQueryUIAdapter.${methodName} está deprecado desde v6.3.0. Migrar a TimeMaterialAdapter.`);
            }
            TimeJQueryUIAdapter[flagName] = true;
        }
    };

    /**
     * @deprecated Desde v6.3.0 - Usar initIconTrigger de TimeMaterialAdapter
     * @param {Object} settings Configuración del trigger de icono
     */
    TimeJQueryUIAdapter.prototype.initIconTrigger = function (settings) {
        TimeJQueryUIAdapter._showDeprecationWarning('initIconTrigger', '_initIconTriggerWarningShown');

        var $self = this;
        if (!$self.is('div')) {

            $('<img>').addClass('ui-timepicker-trigger')
                .attr({
                    'src': settings.buttonImage,
                    'alt': $.rup.i18nParse($.rup.i18n.base, 'rup_time.buttonText'),
                    'title': $.rup.i18nParse($.rup.i18n.base, 'rup_time.buttonText')
                })
                .click(function () {
                    if ($('#ui-datepicker-div').css('display') === 'none') {
                        $self.timepicker('show');
                    } else {
                        $self.timepicker('hide');
                    }
                })
                .insertAfter($self);
        }
    };

    /**
     * @deprecated Desde v6.3.0 - Usar postConfigure de TimeMaterialAdapter
     * @param {Object} settings Configuración post-inicialización
     */
    TimeJQueryUIAdapter.prototype.postConfigure = function (settings) {
        TimeJQueryUIAdapter._showDeprecationWarning('postConfigure', '_postConfigureWarningShown');

        // Método vacío en la implementación original
    };

    $.rup = $.rup || {};
    $.rup.adapter = $.rup.adapter || {};

    $.rup.adapter[TimeJQueryUIAdapter.prototype.NAME] = new TimeJQueryUIAdapter;

    return $;
}));
