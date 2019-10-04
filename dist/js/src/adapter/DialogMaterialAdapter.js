/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.DialogMaterialAdapter = factory(jQuery);
	}
}(this, function ($) {

	function DialogMaterialAdapter() {

	}

	DialogMaterialAdapter.prototype.NAME = 'dialog_material';

	DialogMaterialAdapter.prototype.classComponent = function () {
		return 'btn-material btn-material-sm btn-material-primary-low-emphasis';
	};
	
	DialogMaterialAdapter.prototype.titlebarColor = function () {
		return 'app-primary-color';
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DialogMaterialAdapter.prototype.NAME ] = new DialogMaterialAdapter;

	return $;
}));
