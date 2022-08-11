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

	var AccordionView = Marionette.View.extend({
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

		$view.showChildView('Main', new AccordionBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: AccordionHtmlCodeTemplate,
			templateJs: AccordionJsCodeTemplate
		}));
		$view.showChildView('Test', new AccordionTestView());
	}


	return AccordionView;
});
