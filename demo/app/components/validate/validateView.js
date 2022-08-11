define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./validateHtmlCodeTemplate.hbs',
	'./validateJsCodeTemplate.hbs',
	'./validateBodyView',
	'./validateTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.validate'], function(Marionette, ComponentLayoutTemplate, ValidateHtmlCodeTemplate, ValidateJsCodeTemplate, ValidateBodyView, ValidateTestView, ComponentExampleCodeView){

	var ValidateView = Marionette.View.extend({
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

		$view.showChildView('Main', new ValidateBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ValidateHtmlCodeTemplate,
			templateJs: ValidateJsCodeTemplate
		}));
		$view.showChildView('Test', new ValidateTestView());
	}


	return ValidateView;
});
