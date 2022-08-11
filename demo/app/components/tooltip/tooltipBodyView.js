define(['marionette',
	'./tooltipBodyTemplate.hbs',
	'rup.tooltip'], function(Marionette, TooltipBodyTemplate){

	var TooltipBodyView = Marionette.View.extend({
		template: TooltipBodyTemplate
	});

	return TooltipBodyView;
});
