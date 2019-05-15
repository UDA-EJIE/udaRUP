/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.FeedbackMaterialAdapter = factory(jQuery);
	}
}(this, function ($) {

	function FeedbackMaterialAdapter() {

	}

	FeedbackMaterialAdapter.prototype.NAME = 'feedback_material';

	FeedbackMaterialAdapter.prototype.classComponent = function () {
		return 'rup-bootstrap-materializado';
	};

	FeedbackMaterialAdapter.prototype.closeIcon = function () {
		return '<i class="mdi mdi-close"></i>';
	};
	
	FeedbackMaterialAdapter.prototype.containerClass = function () {
		return 'rup-feedback';
	};
	
	FeedbackMaterialAdapter.prototype.feedbackIcon = function (type) {
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

	$.rup.adapter[FeedbackMaterialAdapter.prototype.NAME ] = new FeedbackMaterialAdapter;

	return $;
}));
