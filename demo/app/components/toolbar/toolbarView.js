define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./toolbarHtmlCodeTemplate.hbs',
	'./toolbarJsCodeTemplate.hbs',
	'./toolbarBodyView',
	'./toolbarTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, ToolbarHtmlCodeTemplate, ToolbarJsCodeTemplate, ToolbarBodyView, ToolbarTestView, ComponentExampleCodeView){

	var ToolbarView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ToolbarBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ToolbarHtmlCodeTemplate,
			templateJs: ToolbarJsCodeTemplate
		}));
		$view.Test.show(new ToolbarTestView());
	}

	return ToolbarView;
});
