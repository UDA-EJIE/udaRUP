define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./buttonHtmlCodeTemplate.hbs',
	'./buttonJsCodeTemplate.hbs',
	'./buttonBodyView',
	'./buttonTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, ButtonHtmlCodeTemplate, ButtonJsCodeTemplate, ButtonBodyView, ButtonTestView, ComponentExampleCodeView){

	var ButtonView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ButtonBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ButtonHtmlCodeTemplate,
			templateJs: ButtonJsCodeTemplate
		}));
		$view.Test.show(new ButtonTestView());
	}

	return ButtonView;
});
