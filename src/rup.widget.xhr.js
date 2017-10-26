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
			'handlebars',
			'jquery-ui/widget',
			'./rup.widget'
		], factory );
	} else {

		// Browser globals
		factory( jQuery, Handlebars );
	}
}(function($, Handlebars) {

	// define our widget under a namespace of your choice
	// with additional parameters e.g.
	// $.widget( "namespace.widgetname", (optional) - an
	// existing widget prototype to inherit from, an object
	// literal to become the widget's prototype );

	$.widget('rup.widget_xhr', $.rup.widget, {
		options:{
			url: null,
			ajaxOptions: {

			}
		},
		_initializeBody: function(){
			var ops = this.options,
				template = ops.template,
				$self = this;

			$.ajax(ops.url, ops.ajaxOptions).done(function(data, textStatus, jqXHR){
				$self.$ui.$widgetBody.append(data);
				console.log('done');
			}).fail(function(jqXHR, textStatus, errorThrown){
				console.log('fail');
			}).always(function(arg1, textStatus, arg2){
				console.log('always');
			}).then(function( arg1, textStatus, arg2){
				console.log('then');
			});

		}

	});

	$.widget.bridge('rup_widget_xhr', $.rup.widget_xhr);

}));
