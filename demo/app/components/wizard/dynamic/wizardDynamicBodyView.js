define(['marionette',
	'./wizardDynamicBodyTemplate.hbs',
	'rup.wizard'], function(Marionette, WizardDynamicBodyTemplate){

	var WizardDynamicBodyView = Marionette.LayoutView.extend({
		template: WizardDynamicBodyTemplate

	});

	return WizardDynamicBodyView;
});
