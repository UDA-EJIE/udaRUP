define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./buttonHtmlCodeTemplate.hbs',
	'./buttonJsCodeTemplate.hbs',
	'./buttonBodyView',
	'./buttonTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, ButtonHtmlCodeTemplate, ButtonJsCodeTemplate, ButtonBodyView, ButtonTestView, ComponentExampleCodeView){

	var ButtonView = Marionette.View.extend({
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

		$view.showChildView('Main', new ButtonBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ButtonHtmlCodeTemplate,
			templateJs: ButtonJsCodeTemplate
		}));
		$view.showChildView('Test', new ButtonTestView());
	}

	return ButtonView;
});
