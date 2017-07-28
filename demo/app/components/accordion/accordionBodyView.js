define(['marionette',
	'templates',
	'rup.accordion'], function(Marionette, App){

	var AccordionBodyView = Marionette.LayoutView.extend({
		template: App.Templates.demo.app.components.accordion.accordionBodyTemplate

	});

	return AccordionBodyView;
});
