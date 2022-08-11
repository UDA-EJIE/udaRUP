define(['marionette',
	'./wizardDynamicBodyTemplate.hbs',
	'rup.wizard'], function(Marionette, WizardDynamicBodyTemplate){

	var WizardDynamicBodyView = Marionette.View.extend({
		template: WizardDynamicBodyTemplate

	});

	return WizardDynamicBodyView;
});
