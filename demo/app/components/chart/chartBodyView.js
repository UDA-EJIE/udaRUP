define(['marionette',
	'./chartBodyTemplate.hbs',
	'rup.chart'], function(Marionette, ChartBodyTemplate){

	var ChartBodyView = Marionette.View.extend({
		template: ChartBodyTemplate
	});

	return ChartBodyView;
});
