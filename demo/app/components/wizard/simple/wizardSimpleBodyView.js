define(['marionette',
	'./wizardSimpleBodyTemplate.hbs',
	'rup.wizard'], function(Marionette, WizardSimpleBodyTemplate){

	var WizardSimpleBodyView = Marionette.LayoutView.extend({
		template: WizardSimpleBodyTemplate

	});

	return WizardSimpleBodyView;
});
