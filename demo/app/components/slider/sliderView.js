define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./sliderHtmlCodeTemplate.hbs',
	'./sliderJsCodeTemplate.hbs',
	'./sliderBodyView',
	'./sliderTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.slider','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, SliderHtmlCodeTemplate, SliderJsCodeTemplate, SliderBodyView, SliderTestView, ComponentExampleCodeView){

	var SliderView = Marionette.View.extend({
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

		$view.showChildView('Main', new SliderBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: SliderHtmlCodeTemplate,
			templateJs: SliderJsCodeTemplate
		}));
		$view.showChildView('Test', new SliderTestView());
	}


	return SliderView;
});
