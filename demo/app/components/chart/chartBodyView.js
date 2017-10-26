define(['marionette',
	'./chartBodyTemplate.hbs',
	'rup.chart'], function(Marionette, ChartBodyTemplate){

	var ChartBodyView = Marionette.LayoutView.extend({
		template: ChartBodyTemplate
	});

	return ChartBodyView;
});
