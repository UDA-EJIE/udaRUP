/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.FeedbackJQueryUIAdapter = factory(jQuery);
	}
}(this, function ($) {

	function FeedbackJQueryUIAdapter() {

	}

	FeedbackJQueryUIAdapter.prototype.NAME = 'feedback_jqueryui';

	FeedbackJQueryUIAdapter.prototype.classComponent = function () {
		return 'rup-jqueryui';
	};

	FeedbackJQueryUIAdapter.prototype.closeIcon = function () {
		return $.rup.i18nParse($.rup.i18n.base, 'rup_global.cerrar');
	};
	
	FeedbackJQueryUIAdapter.prototype.containerClass = function () {
		return 'rup-feedback ui-widget ui-widget-content ui-corner-all';
	};
	
	FeedbackJQueryUIAdapter.prototype.feedbackIcon = function (type) {
		switch(type) {
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

	$.rup.adapter[FeedbackJQueryUIAdapter.prototype.NAME ] = new FeedbackJQueryUIAdapter;

	return $;
}));
