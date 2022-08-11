define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./wizardSimpleHtmlCodeTemplate.hbs',
	'./wizardSimpleJsCodeTemplate.hbs',
	'./wizardSimpleBodyView',
	'./wizardSimpleTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, WizardSimpleHtmlCodeTemplate, WizardSimpleJsCodeTemplate, WizardSimpleBodyView, WizardSimpleTestView, ComponentExampleCodeView){

	var WizardSimpleView = Marionette.View.extend({
		template: ComponentLayoutTemplate,
		regions:{
			Main: '#componentMainBody',
			Example: '#exampleCode',
			Test: '#componentTest'
		},
		onRender: fncOnRender
	});

	function fncOnRender(){
		var $view = this;

		$view.showChildView('Main', new WizardSimpleBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: WizardSimpleHtmlCodeTemplate,
			templateJs: WizardSimpleJsCodeTemplate
		}));
		$view.showChildView('Test', new WizardSimpleTestView());
	}


	return WizardSimpleView;
});
