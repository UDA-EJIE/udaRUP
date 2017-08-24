define(['marionette',
	'./progressbarBodyTemplate.hbs',
	'rup.progressbar'], function(Marionette, ProgressbarBodyTemplate){

	var ProgressbarBodyView = Marionette.LayoutView.extend({
		template: ProgressbarBodyTemplate

	});

	return ProgressbarBodyView;
});
