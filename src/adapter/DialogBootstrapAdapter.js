/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.DialogBootstrapAdapter = factory(jQuery);
	}
}(this, function ($) {

	function DialogBootstrapAdapter() {

	}

	DialogBootstrapAdapter.prototype.NAME = 'dialog_bootstrap';

	DialogBootstrapAdapter.prototype.classComponent = function () {
		return 'btn btn-light';
	};


	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DialogBootstrapAdapter.prototype.NAME ] = new DialogBootstrapAdapter;

	return $;
}));
