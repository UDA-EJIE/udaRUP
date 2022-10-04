define(['marionette',
	'./wizardSimpleBodyTemplate.hbs',
	'rup.wizard'], function(Marionette, WizardSimpleBodyTemplate){

	var WizardSimpleBodyView = Marionette.View.extend({
		template: WizardSimpleBodyTemplate

	});

	return WizardSimpleBodyView;
});
