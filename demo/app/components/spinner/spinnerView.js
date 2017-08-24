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

	var SpinnerView = Marionette.LayoutView.extend({
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

		$view.Main.show(new SpinnerBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: SpinnerHtmlCodeTemplate,
			templateJs: SpinnerJsCodeTemplate
		}));
		$view.Test.show(new SpinnerTestView());
	}


	return SpinnerView;
});
