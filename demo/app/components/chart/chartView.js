define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./chartHtmlCodeTemplate.hbs',
	'./chartJsCodeTemplate.hbs',
	'./chartBodyView',
	'./chartTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.chart'], function(Marionette, ComponentLayoutTemplate, ChartHtmlCodeTemplate, ChartJsCodeTemplate,  ChartBodyView, ChartTestView, ComponentExampleCodeView){

	var ChartView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ChartBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ChartHtmlCodeTemplate,
			templateJs: ChartJsCodeTemplate
		}));
		$view.Test.show(new ChartTestView());
	}


	return ChartView;
});
