define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./spinnerHtmlCodeTemplate.hbs',
	'./spinnerJsCodeTemplate.hbs',
	'./spinnerBodyView',
	'./spinnerTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.spinner','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, SpinnerHtmlCodeTemplate, SpinnerJsCodeTemplate, SpinnerBodyView, SpinnerTestView, ComponentExampleCodeView){

	var SpinnerView = Marionette.View.extend({
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

		$view.showChildView('Main', new SpinnerBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: SpinnerHtmlCodeTemplate,
			templateJs: SpinnerJsCodeTemplate
		}));
		$view.showChildView('Test', new SpinnerTestView());
	}


	return SpinnerView;
});
