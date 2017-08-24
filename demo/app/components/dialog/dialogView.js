define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./dialogHtmlCodeTemplate.hbs',
	'./dialogJsCodeTemplate.hbs',
	'./dialogBodyView',
	'./dialogTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.dialog'], function(Marionette, ComponentLayoutTemplate, DialogHtmlCodeTemplate, DialogJsCodeTemplate, DialogBodyView, DialogTestView, ComponentExampleCodeView){

	var DialogView = Marionette.LayoutView.extend({
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

		$view.Main.show(new DialogBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: DialogHtmlCodeTemplate,
			templateJs: DialogJsCodeTemplate
		}));
		$view.Test.show(new DialogTestView());
	}


	return DialogView;
});
