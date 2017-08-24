define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./validateHtmlCodeTemplate.hbs',
	'./validateJsCodeTemplate.hbs',
	'./validateBodyView',
	'./validateTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.validate'], function(Marionette, ComponentLayoutTemplate, ValidateHtmlCodeTemplate, ValidateJsCodeTemplate, ValidateBodyView, ValidateTestView, ComponentExampleCodeView){

	var ValidateView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ValidateBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ValidateHtmlCodeTemplate,
			templateJs: ValidateJsCodeTemplate
		}));
		$view.Test.show(new ValidateTestView());
	}


	return ValidateView;
});
