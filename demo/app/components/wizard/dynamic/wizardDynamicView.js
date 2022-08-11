define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./wizardDynamicHtmlCodeTemplate.hbs',
	'./wizardDynamicJsCodeTemplate.hbs',
	'./wizardDynamicBodyView',
	'./wizardDynamicTestView',
	'../../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, WizardDynamicHtmlCodeTemplate, WizardDynamicJsCodeTemplate, WizardDynamicBodyView, WizardDynamicTestView, ComponentExampleCodeView){

	var WizardDynamicView = Marionette.View.extend({
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

		$view.showChildView('Main', new WizardDynamicBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: WizardDynamicHtmlCodeTemplate,
			templateJs: WizardDynamicJsCodeTemplate
		}));
		$view.showChildView('Test', new WizardDynamicTestView());
	}


	return WizardDynamicView;
});
