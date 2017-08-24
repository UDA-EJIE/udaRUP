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

	var WizardDynamicView = Marionette.LayoutView.extend({
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

		$view.Main.show(new WizardDynamicBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: WizardDynamicHtmlCodeTemplate,
			templateJs: WizardDynamicJsCodeTemplate
		}));
		$view.Test.show(new WizardDynamicTestView());
	}


	return WizardDynamicView;
});
