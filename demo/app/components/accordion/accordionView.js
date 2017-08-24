define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./accordionHtmlCodeTemplate.hbs',
	'./accordionJsCodeTemplate.hbs',
	'./accordionBodyView',
	'./accordionTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.accordion','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, AccordionHtmlCodeTemplate, AccordionJsCodeTemplate, AccordionBodyView, AccordionTestView, ComponentExampleCodeView){

	var AccordionView = Marionette.LayoutView.extend({
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

		$view.Main.show(new AccordionBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: AccordionHtmlCodeTemplate,
			templateJs: AccordionJsCodeTemplate
		}));
		$view.Test.show(new AccordionTestView());
	}


	return AccordionView;
});
