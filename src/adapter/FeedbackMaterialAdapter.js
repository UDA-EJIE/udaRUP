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
		return '<i class="material-icons">&#xe5cd;</i>';
	};


	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[FeedbackMaterialAdapter.prototype.NAME ] = new FeedbackMaterialAdapter;

	return $;
}));
