/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.ValidateJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	function ValidateJQueryUIAdapter() {

	}

	ValidateJQueryUIAdapter.prototype.NAME = 'validate_jqueryui';
	
	ValidateJQueryUIAdapter.prototype.forLabelElement = function (fieldTmp, labelAttributes) {
		if(labelAttributes.labelForTitle !== undefined && labelAttributes.labelForTitle !== '') {
			return $(fieldTmp).attr("oldtitle");
		}
		else if(labelAttributes.labelForId !== undefined && labelAttributes.labelForId !== '') {
			return $("#"+fieldTmp.id).find("label[for='" + labelAttributes.labelForId + "']").text();
		} else {
			return $("#"+fieldTmp.id).find("label[for='" + labelAttributes.labelForName + "']").text();
		}
	};
	
	ValidateJQueryUIAdapter.prototype.forInputNameElement = function (fieldTmp, labelAttributes) {
		return $("#"+fieldTmp.id).find("label[for='" + labelAttributes.labelForName + "']");
	};

	ValidateJQueryUIAdapter.prototype.forInputIdElement = function (fieldTmp, labelAttributes) {
		return $("#"+fieldTmp.id).find(':input[id=\'' + labelAttributes.labelForId + '\']')[0];
	};

	ValidateJQueryUIAdapter.prototype.highlight = function (element, errorClass) {
		$(element).addClass('error');
	};
	ValidateJQueryUIAdapter.prototype.unhighlight = function (element, errorClass) {
		$(element).removeClass('error');
	};


	ValidateJQueryUIAdapter.prototype.errorElement = 'img';

	ValidateJQueryUIAdapter.prototype.errorPlacement = function (error, element) {
		var errorElem = error.attr('src', this.errorImage).addClass('rup-maint_validateIcon').html('').rup_tooltip({
			'applyToPortal': true
		});

		if (element.attr('ruptype') === 'combo') {
			var comboElem = $('#' + element.attr('id') + '-button');
			if (comboElem) {
				errorElem.insertAfter(comboElem);
			}
		} else {
			errorElem.insertAfter(element);
		}
	};

	ValidateJQueryUIAdapter.prototype.showLabel = function (element, message) {

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

	$.rup.adapter[ValidateJQueryUIAdapter.prototype.NAME ] = new ValidateJQueryUIAdapter;

	return $;
}));
