/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.MessageMaterialAdapter = factory(jQuery);
	}
}(this, function ($) {

	function MessageMaterialAdapter() {

	}

	MessageMaterialAdapter.prototype.NAME = 'message_material';

	MessageMaterialAdapter.prototype.classComponent = function (type) {
		switch(type){
			case 'error':
				return 'btn-material btn-material-sm btn-material-primary-danger-low-emphasis';
			case 'ok':
				return 'btn-material btn-material-sm btn-material-primary-success-low-emphasis';
			case 'alert':
				return 'btn-material btn-material-sm btn-material-primary-low-secondary-emphasis';
			default:
				return 'btn-material btn-material-sm btn-material-primary-low-emphasis';
		}
	};


	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[MessageMaterialAdapter.prototype.NAME ] = new MessageMaterialAdapter;

	return $;
}));
