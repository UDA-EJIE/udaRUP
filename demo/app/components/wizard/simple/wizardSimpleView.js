define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./wizardSimpleHtmlCodeTemplate.hbs',
	'./wizardSimpleJsCodeTemplate.hbs',
	'./wizardSimpleBodyView',
	'./wizardSimpleTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, WizardSimpleHtmlCodeTemplate, WizardSimpleJsCodeTemplate, WizardSimpleBodyView, WizardSimpleTestView, ComponentExampleCodeView){

	var WizardSimpleView = Marionette.LayoutView.extend({
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

		$view.Main.show(new WizardSimpleBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: WizardSimpleHtmlCodeTemplate,
			templateJs: WizardSimpleJsCodeTemplate
		}));
		$view.Test.show(new WizardSimpleTestView());
	}


	return WizardSimpleView;
});
