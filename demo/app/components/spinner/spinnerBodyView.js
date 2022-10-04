define(['marionette',
	'./spinnerBodyTemplate.hbs',
	'rup.spinner'], function(Marionette, SpinnerBodyTemplate){

	var SpinnerBodyView = Marionette.View.extend({
		template: SpinnerBodyTemplate

	});

	return SpinnerBodyView;
});
