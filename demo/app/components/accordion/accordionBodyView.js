define(['marionette',
	'./accordionBodyTemplate.hbs',
	'rup.accordion'], function(Marionette, AccordionBodyTemplate){

	var AccordionBodyView = Marionette.View.extend({
		template: AccordionBodyTemplate

	});

	return AccordionBodyView;
});
