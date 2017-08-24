define(['marionette',
	'./tooltipBodyTemplate.hbs',
	'rup.tooltip'], function(Marionette, TooltipBodyTemplate){

	var TooltipBodyView = Marionette.LayoutView.extend({
		template: TooltipBodyTemplate
	});

	return TooltipBodyView;
});
