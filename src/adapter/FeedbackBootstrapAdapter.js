/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.FeedbackBootstrapAdapter = factory(jQuery);
	}
}(this, function ($) {

	function FeedbackBootstrapAdapter() {

	}

	FeedbackBootstrapAdapter.prototype.NAME = 'feedback_bootstrap';

	FeedbackBootstrapAdapter.prototype.classComponent = function () {
		return 'rup-bootstrap';
	};

	FeedbackBootstrapAdapter.prototype.closeIcon = function () {
		return '<i class="material-icons">&#xe5cd;</i>';
	};
	
	FeedbackBootstrapAdapter.prototype.containerClass = function () {
		return 'rup-feedback ui-widget ui-widget-content ui-corner-all';
	};
	
	FeedbackBootstrapAdapter.prototype.feedbackIcon = function (type) {
		switch(type) {
			case 'alert':
				return '<i class="material-icons">&#xe002;</i>'
			case 'error':
				return '<i class="material-icons">&#xe001;</i>'
			default:
				return '<i class="material-icons">&#xe86c;</i>'
		}
	};


	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[FeedbackBootstrapAdapter.prototype.NAME ] = new FeedbackBootstrapAdapter;

	return $;
}));
