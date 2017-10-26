define(['marionette',
	'./spinnerBodyTemplate.hbs',
	'rup.spinner'], function(Marionette, SpinnerBodyTemplate){

	var SpinnerBodyView = Marionette.LayoutView.extend({
		template: SpinnerBodyTemplate

	});

	return SpinnerBodyView;
});
