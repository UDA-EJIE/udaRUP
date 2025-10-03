/*global jQuery */
/*global define */

/**
 * @fileoverview FeedbackJQueryUIAdapter - Adaptador para feedback jQuery UI
 * @deprecated Este adaptador está deprecado desde v6.3.0. Usar FeedbackMaterialAdapter en su lugar.
 * @todo Será eliminado en v7.0.0
 * @see FeedbackMaterialAdapter Para el reemplazo recomendado
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {
		// Browser globals
		root.FeedbackJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	/**
	 * @deprecated Desde v6.3.0 - Usar FeedbackMaterialAdapter en su lugar
	 * @constructor
	 */
	function FeedbackJQueryUIAdapter() {
		// Sin advertencia en el constructor para no saturar la consola con mensajes incluso cuando no se usa el adaptador
	}

	FeedbackJQueryUIAdapter.prototype.NAME = 'feedback_jqueryui';

	/**
	 * Muestra una advertencia de deprecación una sola vez por método
	 * @private
	 * @param {string} methodName Nombre del método deprecado
	 * @param {string} flagName Nombre de la bandera para controlar si ya se mostró
	 */
	FeedbackJQueryUIAdapter._showDeprecationWarning = function (methodName, flagName) {
		if (!FeedbackJQueryUIAdapter[flagName]) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn(`FeedbackJQueryUIAdapter.${methodName} está deprecado desde v6.3.0. Migrar a FeedbackMaterialAdapter.`);
			}
			FeedbackJQueryUIAdapter[flagName] = true;
		}
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar classComponent de FeedbackMaterialAdapter
	 * @returns {string} Clase CSS del componente
	 */
	FeedbackJQueryUIAdapter.prototype.classComponent = function () {
		FeedbackJQueryUIAdapter._showDeprecationWarning('classComponent', '_classComponentWarningShown');

		return 'rup-jqueryui';
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar closeIcon de FeedbackMaterialAdapter
	 * @returns {string} Texto del icono de cerrar
	 */
	FeedbackJQueryUIAdapter.prototype.closeIcon = function () {
		FeedbackJQueryUIAdapter._showDeprecationWarning('closeIcon', '_closeIconWarningShown');

		return $.rup.i18nParse($.rup.i18n.base, 'rup_global.cerrar');
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar containerClass de FeedbackMaterialAdapter
	 * @returns {string} Clases CSS del contenedor
	 */
	FeedbackJQueryUIAdapter.prototype.containerClass = function () {
		FeedbackJQueryUIAdapter._showDeprecationWarning('containerClass', '_containerClassWarningShown');

		return 'rup-feedback ui-widget ui-widget-content ui-corner-all';
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar feedbackIcon de FeedbackMaterialAdapter
	 * @param {string} type Tipo de feedback (alert, error, etc.)
	 * @returns {string} HTML del icono
	 */
	FeedbackJQueryUIAdapter.prototype.feedbackIcon = function (type) {
		FeedbackJQueryUIAdapter._showDeprecationWarning('feedbackIcon', '_feedbackIconWarningShown');

		switch (type) {
			case 'alert':
				return '<i class="mdi mdi-alert"></i>'
			case 'error':
				return '<i class="mdi mdi-alert-circle-outline"></i>'
			default:
				return '<i class="mdi mdi-check-circle"></i>'
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[FeedbackJQueryUIAdapter.prototype.NAME] = new FeedbackJQueryUIAdapter;

	return $;
}));
