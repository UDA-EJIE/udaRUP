define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./tooltipHtmlCodeTemplate.hbs',
	'./tooltipJsCodeTemplate.hbs',
	'./tooltipBodyView',
	'./tooltipTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.tooltip'], function(Marionette, ComponentLayoutTemplate, TooltipHtmlCodeTemplate, TooltipJsCodeTemplate, TooltipBodyView, TooltipTestView, ComponentExampleCodeView){

	var TooltipView = Marionette.LayoutView.extend({
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

		$view.Main.show(new TooltipBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: TooltipHtmlCodeTemplate,
			templateJs: TooltipJsCodeTemplate
		}));
		$view.Test.show(new TooltipTestView());
	}


	return TooltipView;
});
