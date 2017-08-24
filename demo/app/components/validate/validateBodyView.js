define(['marionette',
	'./validateBodyTemplate.hbs',
	'rup.validate'], function(Marionette, ValidateBodyTemplate){

	var ValidateBodyView = Marionette.LayoutView.extend({
		template: ValidateBodyTemplate
	});

	return ValidateBodyView;
});
