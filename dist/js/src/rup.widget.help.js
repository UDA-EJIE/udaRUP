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

	$.widget('rup.widget_help', $.rup.widget, {
		options:{
			template: Rup.Templates['rup.widget.help'],
			title: 'Comienza a usar tu escritorio',
			buttons:{
				btnReload: false,
				btnConfig: false,
				btnResizeFull: false
			},
			configure:{
				requiredByUser:false
			}
		},
		_initializeBody: function(){
			var $self = this, $el = $self.element;
			$self.$ui.$widgetBody.append($self.options.template($self.options.templateData));
			$el.parent().addClass('dashboard-widget-help');

		}

	});

	$.widget.bridge('rup_widget_help', $.rup.widget_help);

}));
