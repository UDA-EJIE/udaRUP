/*global jQuery */
/*global define */

/**
 * @fileoverview ValidateJQueryUIAdapter - Adaptador para validación jQuery UI
 * @deprecated Este adaptador está deprecado desde v6.3.0. Usar ValidateMaterialAdapter en su lugar.
 * @todo Será eliminado en v7.0.0
 * @see ValidateMaterialAdapter Para el reemplazo recomendado
 */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {
		// Browser globals
		root.ValidateJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	/**
	 * @deprecated Desde v6.3.0 - Usar ValidateMaterialAdapter en su lugar
	 * @constructor
	 */
	function ValidateJQueryUIAdapter() {
		// Sin advertencia en el constructor para no saturar la consola con mensajes incluso cuando no se usa el adaptador
	}

	ValidateJQueryUIAdapter.prototype.NAME = 'validate_jqueryui';

	/**
	 * Muestra una advertencia de deprecación una sola vez por método
	 * @private
	 * @param {string} methodName Nombre del método deprecado
	 * @param {string} flagName Nombre de la bandera para controlar si ya se mostró
	 */
	ValidateJQueryUIAdapter._showDeprecationWarning = function (methodName, flagName) {
		if (!ValidateJQueryUIAdapter[flagName]) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn(`ValidateJQueryUIAdapter.${methodName} está deprecado desde v6.3.0. Migrar a ValidateMaterialAdapter.`);
			}
			ValidateJQueryUIAdapter[flagName] = true;
		}
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar forLabelElement de ValidateMaterialAdapter
	 * @param {Object} fieldTmp Campo temporal
	 * @param {Object} labelAttributes Atributos del label
	 * @returns {string} Texto del label
	 */
	ValidateJQueryUIAdapter.prototype.forLabelElement = function (fieldTmp, labelAttributes) {
		ValidateJQueryUIAdapter._showDeprecationWarning('forLabelElement', '_forLabelElementWarningShown');

		if (labelAttributes.labelForTitle !== undefined && labelAttributes.labelForTitle !== '') {
			return $(fieldTmp).attr("oldtitle");
		}
		else if (labelAttributes.labelForId !== undefined && labelAttributes.labelForId !== '') {
			return $("#" + $.escapeSelector(fieldTmp.id)).find("label[for='" + $.escapeSelector(labelAttributes.labelForId) + "']").text();
		} else {
			return $("#" + $.escapeSelector(fieldTmp.id)).find("label[for='" + $.escapeSelector(labelAttributes.labelForName) + "']").text();
		}
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar forInputNameElement de ValidateMaterialAdapter
	 * @param {Object} fieldTmp Campo temporal
	 * @param {Object} labelAttributes Atributos del label
	 * @returns {jQuery} Elemento label
	 */
	ValidateJQueryUIAdapter.prototype.forInputNameElement = function (fieldTmp, labelAttributes) {
		ValidateJQueryUIAdapter._showDeprecationWarning('forInputNameElement', '_forInputNameElementWarningShown');

		return $("#" + $.escapeSelector(fieldTmp.id)).find("label[for='" + $.escapeSelector(labelAttributes.labelForName) + "']");
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar forInputIdElement de ValidateMaterialAdapter
	 * @param {Object} fieldTmp Campo temporal
	 * @param {Object} labelAttributes Atributos del label
	 * @returns {Element} Elemento input
	 */
	ValidateJQueryUIAdapter.prototype.forInputIdElement = function (fieldTmp, labelAttributes) {
		ValidateJQueryUIAdapter._showDeprecationWarning('forInputIdElement', '_forInputIdElementWarningShown');

		return $("#" + $.escapeSelector(fieldTmp.id)).find(':input[id=\'' + $.escapeSelector(labelAttributes.labelForId) + '\']')[0];
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar highlight de ValidateMaterialAdapter
	 * @param {Element} element Elemento a resaltar
	 * @param {string} errorClass Clase de error
	 */
	ValidateJQueryUIAdapter.prototype.highlight = function (element, errorClass) {
		ValidateJQueryUIAdapter._showDeprecationWarning('highlight', '_highlightWarningShown');

		$(element).addClass('error');
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar unhighlight de ValidateMaterialAdapter
	 * @param {Element} element Elemento a quitar resaltado
	 * @param {string} errorClass Clase de error
	 */
	ValidateJQueryUIAdapter.prototype.unhighlight = function (element, errorClass) {
		ValidateJQueryUIAdapter._showDeprecationWarning('unhighlight', '_unhighlightWarningShown');

		$(element).removeClass('error');
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar errorElement de ValidateMaterialAdapter
	 */
	ValidateJQueryUIAdapter.prototype.errorElement = 'img';

	/**
	 * @deprecated Desde v6.3.0 - Usar errorPlacement de ValidateMaterialAdapter
	 * @param {jQuery} error Elemento de error
	 * @param {jQuery} element Elemento donde colocar el error
	 */
	ValidateJQueryUIAdapter.prototype.errorPlacement = function (error, element) {
		ValidateJQueryUIAdapter._showDeprecationWarning('errorPlacement', '_errorPlacementWarningShown');

		const errorElem = error.attr('src', this.errorImage).addClass('rup-maint_validateIcon').html('').rup_tooltip({
			'applyToPortal': true
		});

		errorElem.insertAfter(element);
	};

	/**
	 * @deprecated Desde v6.3.0 - Usar showLabel de ValidateMaterialAdapter
	 * @param {Element} element Elemento
	 * @param {string} message Mensaje de error
	 */
	ValidateJQueryUIAdapter.prototype.showLabel = function (element, message) {
		ValidateJQueryUIAdapter._showDeprecationWarning('showLabel', '_showLabelWarningShown');

		var label = this.errorsFor(element),
			settings = $(this.currentForm).data('settings');
		if (label.length) {
			// refresh error/success class
			label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

			// check if we have a generated label, replace the message then
			label.attr('generated') && label.html(message);
		} else {
			// create label
			if (settings.showFieldErrorAsDefault) {
				label = $('<' + this.settings.errorElement + '></label>')
					.attr({
						'for': this.idOrName(element),
						generated: true
					})
					.addClass(this.settings.errorClass)
					.attr('title', message || '');
			} else {
				label = $('<' + this.settings.errorElement + '></label>')
					.attr({
						'for': this.idOrName(element),
						generated: true
					})
					.addClass(this.settings.errorClass)
					.html(message || '');
			}
			if (this.settings.wrapper) {
				// make sure the element is visible, even in IE
				// actually showing the wrapped element is handled elsewhere
				label = label.hide().show().wrap('<' + this.settings.wrapper + '></label>').parent();
			}
			if (!this.labelContainer.append(label).length)
				this.settings.errorPlacement ?
					this.settings.errorPlacement(label, $(element)) :
					label.insertAfter(element);
		}
		if (!message && this.settings.success) {
			label.text('');
			typeof this.settings.success == 'string' ?
				label.addClass(this.settings.success) :
				this.settings.success(label);
		}
		this.toShow = this.toShow.add(label);
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[ValidateJQueryUIAdapter.prototype.NAME] = new ValidateJQueryUIAdapter;

	return $;
}));
