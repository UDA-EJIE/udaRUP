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

	$.widget('rup.widget_template', $.rup.widget, {
		options:{
			template: null,
			templateData: null
		},
		_initializeBody: function(){
			var ops = this.options,
				template = ops.template;

			if (typeof template === 'string'){
				var $templateObj = $(template);
				var source = $templateObj.length===1?$templateObj.html():template;


				var compiledTemplate = Handlebars.compile(source);
				this.$ui.$widgetBody.append(compiledTemplate(ops.templateData));


			}else if (typeof template === 'function'){

				this.$ui.$widgetBody.append(template(ops.templateData));

			}


		}

	});

	$.widget.bridge('rup_widget_template', $.rup.widget_template);

}));
