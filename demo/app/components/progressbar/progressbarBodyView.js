define(['marionette',
	'./progressbarBodyTemplate.hbs',
	'rup.progressbar'], function(Marionette, ProgressbarBodyTemplate){

	var ProgressbarBodyView = Marionette.View.extend({
		template: ProgressbarBodyTemplate

	});

	return ProgressbarBodyView;
});
