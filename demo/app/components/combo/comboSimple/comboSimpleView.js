define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./comboSimpleHtmlCodeTemplate.hbs',
	'./comboSimpleJsCodeTemplate.hbs',
	'./comboSimpleBodyView',
	'./comboSimpleTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.combo'], function(Marionette, ComponentLayoutTemplate, ComboSimpleHtmlCodeTemplate, ComboSimpleJsCodeTemplate, ComboSimpleBodyView, ComboSimpleTestView, ComponentExampleCodeView){

	var ComboSimpleView = Marionette.View.extend({
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

		$view.showChildView('Main', new ComboSimpleBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ComboSimpleHtmlCodeTemplate,
			templateJs: ComboSimpleJsCodeTemplate
		}));
		$view.showChildView('Test', new ComboSimpleTestView());
	}


	return ComboSimpleView;
});
