define(['marionette',
	'./accordionBodyTemplate.hbs',
	'rup.accordion'], function(Marionette, AccordionBodyTemplate){

	var AccordionBodyView = Marionette.LayoutView.extend({
		template: AccordionBodyTemplate

	});

	return AccordionBodyView;
});
