define(['marionette',
	'./validateBodyTemplate.hbs',
	'rup.validate'], function(Marionette, ValidateBodyTemplate){

	var ValidateBodyView = Marionette.View.extend({
		template: ValidateBodyTemplate
	});

	return ValidateBodyView;
});
