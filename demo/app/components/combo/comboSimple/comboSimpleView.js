define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./comboSimpleHtmlCodeTemplate.hbs',
	'./comboSimpleJsCodeTemplate.hbs',
	'./comboSimpleBodyView',
	'./comboSimpleTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.combo'], function(Marionette, ComponentLayoutTemplate, ComboSimpleHtmlCodeTemplate, ComboSimpleJsCodeTemplate, ComboSimpleBodyView, ComboSimpleTestView, ComponentExampleCodeView){

	var ComboSimpleView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ComboSimpleBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ComboSimpleHtmlCodeTemplate,
			templateJs: ComboSimpleJsCodeTemplate
		}));
		$view.Test.show(new ComboSimpleTestView());

		window.$ = $;
	}


	return ComboSimpleView;
});
