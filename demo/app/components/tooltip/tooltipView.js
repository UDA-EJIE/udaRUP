define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./tooltipHtmlCodeTemplate.hbs',
	'./tooltipJsCodeTemplate.hbs',
	'./tooltipBodyView',
	'./tooltipTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.tooltip'], function(Marionette, ComponentLayoutTemplate, TooltipHtmlCodeTemplate, TooltipJsCodeTemplate, TooltipBodyView, TooltipTestView, ComponentExampleCodeView){

	var TooltipView = Marionette.View.extend({
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

		$view.showChildView('Main', new TooltipBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: TooltipHtmlCodeTemplate,
			templateJs: TooltipJsCodeTemplate
		}));
		$view.showChildView('Test', new TooltipTestView());
	}


	return TooltipView;
});
