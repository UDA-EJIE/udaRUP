/*global jQuery */
/*global define */

/**
 * @fileoverview DateJQueryUIAdapter - Adaptador para fechas jQuery UI
 * @deprecated Este adaptador está deprecado desde v6.3.0. Usar DateMaterialAdapter en su lugar.
 * @todo Será eliminado en v7.0.0
 * @see DateMaterialAdapter Para el reemplazo recomendado
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {
		// Browser globals
		root.DateJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	/**
	 * @deprecated Desde v6.3.0 - Usar DateMaterialAdapter en su lugar
	 * @constructor
	 */
	function DateJQueryUIAdapter() {
		// Sin advertencia en el constructor para no saturar la consola con mensajes incluso cuando no se usa el adaptador
	}

	DateJQueryUIAdapter.prototype.NAME = 'date_jqueryui';

	/**
	 * Muestra una advertencia de deprecación una sola vez por método
	 * @private
	 * @param {string} methodName Nombre del método deprecado
	 * @param {string} flagName Nombre de la bandera para controlar si ya se mostró
	 */
	DateJQueryUIAdapter._showDeprecationWarning = function (methodName, flagName) {
		if (!DateJQueryUIAdapter[flagName]) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn(`DateJQueryUIAdapter.${methodName} está deprecado desde v6.3.0. Migrar a DateMaterialAdapter.`);
			}
			DateJQueryUIAdapter[flagName] = true;
		}
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar initIconTrigger de DateMaterialAdapter
	 * @param {Object} settings Configuración del trigger de icono
	 */
	DateJQueryUIAdapter.prototype.initIconTrigger = function (settings) {
		DateJQueryUIAdapter._showDeprecationWarning('initIconTrigger', '_initIconTriggerWarningShown');

		// Imagen del calendario.
		settings.buttonImage = $.rup.STATICS + (settings.buttonImage ? settings.buttonImage : "/rup/css/images/calendario.svg");
		settings.buttonText = settings.buttonText;

		//Atributos NO MODIFICABLES
		//La imagen no debe ser un botón
		settings.buttonImageOnly = true;
		//Solo permitir caracteres permitidos en la máscara
		settings.constrainInput = true;
		//Mostrar patrón con foco en input y pinchando imagen
		settings.showOn = 'both';
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar postConfigure de DateMaterialAdapter
	 * @param {Object} settings Configuración post-inicialización
	 */
	DateJQueryUIAdapter.prototype.postConfigure = function (settings) {
		DateJQueryUIAdapter._showDeprecationWarning('postConfigure', '_postConfigureWarningShown');

		// Método vacío en la implementación original
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DateJQueryUIAdapter.prototype.NAME] = new DateJQueryUIAdapter;

	return $;
}));
