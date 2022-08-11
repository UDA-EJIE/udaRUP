define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./chartHtmlCodeTemplate.hbs',
	'./chartJsCodeTemplate.hbs',
	'./chartBodyView',
	'./chartTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.chart'], function(Marionette, ComponentLayoutTemplate, ChartHtmlCodeTemplate, ChartJsCodeTemplate,  ChartBodyView, ChartTestView, ComponentExampleCodeView){

	var ChartView = Marionette.View.extend({
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

		$view.showChildView('Main', new ChartBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ChartHtmlCodeTemplate,
			templateJs: ChartJsCodeTemplate
		}));
		$view.showChildView('Test', new ChartTestView());
	}


	return ChartView;
});
