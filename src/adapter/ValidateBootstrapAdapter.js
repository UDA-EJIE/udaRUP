/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.ValidateBootstrapAdapter = factory(jQuery);
	}
}(this, function ($) {

	function ValidateBootstrapAdapter() {

	}

	ValidateBootstrapAdapter.prototype.NAME = 'validate_bootstrap';
	
	ValidateBootstrapAdapter.prototype.forLabelElement = function (contextForm, labelAttributes) {
		if(labelAttributes.labelForTitle !== undefined && labelAttributes.labelForTitle !== '') {
			return $(contextForm).find(":input[id='" + labelAttributes.labelForId + "']").attr("oldtitle");
		}
		else if(labelAttributes.labelForId !== undefined && labelAttributes.labelForId !== '') {
			return $(contextForm).find("label[for='" + labelAttributes.labelForId + "']").text();
		} else {
			return $(contextForm).find("label[for='" + labelAttributes.labelForName + "']").text();
		}
	};
	
	ValidateBootstrapAdapter.prototype.forInputNameElement = function (contextForm, labelAttributes) {
		return $(contextForm).find("label[for='" + labelAttributes.labelForName + "']");
	};

	ValidateBootstrapAdapter.prototype.forInputIdElement = function (contextForm, labelAttributes) {
		return contextForm.elements[labelAttributes.labelForId];
	};

	ValidateBootstrapAdapter.prototype.highlight = function (element, errorClass) {
		clearValidation(element);
		$(element).addClass('error');
	};

	ValidateBootstrapAdapter.prototype.unhighlight = function (element) {
		clearValidation(element);
		$(element).removeClass('error');
	};

	function clearValidation(element) {
		if ($(element).parent().hasClass('rup-validate-field-error')) {
			$(element).parent().find('.rup-validate-error-icon').remove();
			$(element).unwrap();
			$(element).parent().find('div').remove();
		}
	}
	ValidateBootstrapAdapter.prototype.errorElement = 'div';



	ValidateBootstrapAdapter.prototype.errorPlacement = function (error, element) {

		//limpiar errores previos
		/*  if (element.parent().hasClass("")) {
        element.parent().find(".rup-validate-error-icon").remove();
        element.unwrap();
      }*/

		// var errorElem = error.attr("src",this.errorImage).addClass("rup-maint_validateIcon").html('').rup_tooltip({"applyToPortal": true});
		//
		// if (element.attr("ruptype")==='combo'){
		//   var comboElem = $("#"+element.attr("id")+"-button");
		//   if (comboElem){
		//     errorElem.insertAfter(comboElem);
		//   }
		// }else{
		// var $inputGroup = $("<div>").addClass("form-input-group");
		// var $iconError = $("<i>").addClass("mdi mdi-close");
		// element.wrap($inputGroup);

		var name = element.prop('name'),
			labelProp = this.labels ? this.labels[name] : undefined,
			$labelContainer = $(labelProp),
			iconProp = this.icons ? this.icons[name] : undefined,
			$iconContainer = $(iconProp),
			$icon = $('<i>').addClass('rup-validate-error-icon error mdi mdi-close').attr('aria-hidden', 'true');


		// Posicionamiento del label
		if ($labelContainer.length > 0) {
			$labelContainer.append(error);
		} else {
			error.insertAfter(element);
		}

		// Posicionamiento del icon
		if ($iconContainer.length > 0) {
			$iconContainer.append($icon);
		} else {
			if (!element.parent().hasClass('rup-validate-field-error')) {
				element.wrap($('<div>').addClass('rup-validate-field-error'));
				$icon.insertAfter(element);
			}
		}




		// $iconError.insertAfter(element);





		// }
	};

	ValidateBootstrapAdapter.prototype.showLabel = function (element, message) {

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
				label = $('<' + this.settings.errorElement + '></label>')
					.attr({
						'for': this.idOrName(element),
						generated: true
					})
					.addClass(this.settings.errorClass)
					.html(message || '');
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

	$.rup.adapter[ValidateBootstrapAdapter.prototype.NAME ] = new ValidateBootstrapAdapter;

	return $;
}));
