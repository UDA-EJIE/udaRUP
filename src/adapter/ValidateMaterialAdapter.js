/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.ValidateMaterialAdapter = factory(jQuery);
	}
}(this, function ($) {

	function ValidateMaterialAdapter() {

	}

	ValidateMaterialAdapter.prototype.NAME = 'validate_material';
	
	ValidateMaterialAdapter.prototype.forLabelElement = function (contextForm, labelAttributes) {
		if(labelAttributes.labelForTitle !== undefined && labelAttributes.labelForTitle !== '') {
			return $(contextForm).find(":input[id='" + labelAttributes.labelForId + "']").attr("oldtitle");
		}
		else if(labelAttributes.labelForId !== undefined && labelAttributes.labelForId !== '') {
			return $(contextForm).find("label[for='" + labelAttributes.labelForId + "']").text();
		} else {
			return $(contextForm).find("label[for='" + labelAttributes.labelForName + "']").text();
		}
	};
	
	ValidateMaterialAdapter.prototype.forInputNameElement = function (contextForm, labelAttributes) {
		return $(contextForm).find("label[for='" + labelAttributes.labelForName + "']");
	};

	ValidateMaterialAdapter.prototype.forInputIdElement = function (contextForm, labelAttributes) {
		return contextForm.elements[labelAttributes.labelForId];
	};

	ValidateMaterialAdapter.prototype.highlight = function (element, errorClass) {
		clearValidation(element);
		$(element).addClass('error');
	};

	ValidateMaterialAdapter.prototype.unhighlight = function (element) {
		clearValidation(element);
		$(element).removeClass('error');
	};
	
	function clearValidation(element) {
		if ($(element).parent().hasClass('rup-validate-field-error')) {
			$(element).parent().find('i.material-icons').remove();
			$(element).parent().find('span').remove();
		}
	}
	ValidateMaterialAdapter.prototype.errorElement = 'span';



	ValidateMaterialAdapter.prototype.errorPlacement = function (error, element) {

		var name = element.prop('name'),
			$container = element.parent();
			$icon = $('<i class="material-icons error" aria-hidden="true">&#xe5cd;</i>');
			
		// Posicionamiento del label e icon
		$container
			.addClass('rup-validate-field-error')
			.append($icon)
			.append(error);
		
	};

	ValidateMaterialAdapter.prototype.showLabel = function (element, message) {

		var label = this.errorsFor(element),
			settings = $(this.currentForm).data('settings');
		if (label.length) {
			// refresh error/success class
			label.removeClass(this.settings.validClass).addClass(this.settings.errorClass);

			// check if we have a generated label, replace the message then
			label.attr('generated') && label.html(message);
		} else {
			// create label
			if (this.settings.showFieldErrorAsDefault) {
				label = $('<' + this.settings.errorElement + '/>')
					.attr({
						'for': this.idOrName(element),
						generated: true
					})
					.addClass(this.settings.errorClass)
					.html(message || '');
			} else {
				label = $('<' + this.settings.errorElement + '/>')
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
				label = label.hide().show().wrap('<' + this.settings.wrapper + '/>').parent();
			}
			if (!this.labelContainer.append(label).length)
				this.settings.errorPlacement ?
					this.settings.errorPlacement(label, $(element)) :
					label.insertAfter(element);
		}
		if (!message && settings.success) {
			label.text('');
			typeof this.settings.success == 'string' ?
				label.addClass(this.settings.success) :
				this.settings.success(label);
		}
		this.toShow = this.toShow.add(label);
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[ValidateMaterialAdapter.prototype.NAME ] = new ValidateMaterialAdapter;

	return $;
}));
