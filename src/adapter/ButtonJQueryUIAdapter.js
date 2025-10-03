/*global jQuery */
/*global define */

/**
 * @fileoverview ButtonJQueryUIAdapter - Adaptador para botones jQuery UI
 * @deprecated Este adaptador está deprecado desde v6.3.0. Usar ButtonMaterialAdapter en su lugar.
 * @todo Será eliminado en v7.0.0
 * @see ButtonMaterialAdapter Para el reemplazo recomendado
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base'], factory);
	} else {
		// Browser globals
		root.ButtonJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	/**
	 * @deprecated Desde v6.3.0 - Usar ButtonMaterialAdapter en su lugar
	 * @constructor
	 */
	function ButtonJQueryUIAdapter() {
		// Sin advertencia en el constructor para no saturar la consola con mensajes incluso cuando no se usa el adaptador
	}

	ButtonJQueryUIAdapter.prototype.NAME = 'button_jqueryui';

	/**
	 * Muestra una advertencia de deprecación una sola vez por método
	 * @private
	 * @param {string} methodName Nombre del método deprecado
	 * @param {string} flagName Nombre de la bandera para controlar si ya se mostró
	 */
	ButtonJQueryUIAdapter._showDeprecationWarning = function (methodName, flagName) {
		if (!ButtonJQueryUIAdapter[flagName]) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn(`ButtonJQueryUIAdapter.${methodName} está deprecado desde v6.3.0. Migrar a ButtonMaterialAdapter.`);
			}
			ButtonJQueryUIAdapter[flagName] = true;
		}
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar createDropdownButton de ButtonMaterialAdapter
	 * @param {Object} settings Configuración del botón dropdown
	 * @returns {jQuery} Elemento botón jQuery UI
	 */
	ButtonJQueryUIAdapter.prototype.createDropdownButton = function (settings) {
		ButtonJQueryUIAdapter._showDeprecationWarning('createDropdownButton', '_createDropdownButtonWarningShown');

		var $self = this, dropdownSettings = settings.dropdown;
		return jQuery('<button>').attr({
			type: 'button',
			id: $self.prop('id') + '_dropdown'
		}).text('Administración de filtros').button({
			icons: {
				primary: dropdownSettings.dropdownIcon
			},
			text: false
		}).addClass('rup-dropdown-button');
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[ButtonJQueryUIAdapter.prototype.NAME] = new ButtonJQueryUIAdapter;

	return $;
}));
