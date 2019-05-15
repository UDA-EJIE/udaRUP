/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.MessageBootstrapAdapter = factory(jQuery);
	}
}(this, function ($) {

	function MessageBootstrapAdapter() {

	}

	MessageBootstrapAdapter.prototype.NAME = 'message_bootstrap';

	MessageBootstrapAdapter.prototype.classComponent = function (type) {
		switch(type){
			case 'error':
				return 'btn btn-outline-danger';
			case 'ok':
				return 'btn btn-outline-success';
			case 'alert':
				return 'btn btn-light';
			default:
				return 'btn btn-outline-primary';
		}
	};

	
	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[MessageBootstrapAdapter.prototype.NAME ] = new MessageBootstrapAdapter;

	return $;
}));
