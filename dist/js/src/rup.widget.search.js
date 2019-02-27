/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

/*global define */
/*global jQuery */

(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			'jquery',
			'jquery-ui/widget',
			'rup/widget'
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function($) {

	// define our widget under a namespace of your choice
	// with additional parameters e.g.
	// $.widget( "namespace.widgetname", (optional) - an
	// existing widget prototype to inherit from, an object
	// literal to become the widget's prototype );

	$.widget('rup.widget_search', $.rup.widget, {
		options:{
		},
		_initializeBody: function(){


		}

	});

	$.widget.bridge('rup_widget_search', $.rup.widget_search);

}));
