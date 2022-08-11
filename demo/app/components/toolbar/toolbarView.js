define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./toolbarHtmlCodeTemplate.hbs',
	'./toolbarJsCodeTemplate.hbs',
	'./toolbarBodyView',
	'./toolbarTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, ToolbarHtmlCodeTemplate, ToolbarJsCodeTemplate, ToolbarBodyView, ToolbarTestView, ComponentExampleCodeView){

	var ToolbarView = Marionette.View.extend({
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

		$view.showChildView('Main', new ToolbarBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ToolbarHtmlCodeTemplate,
			templateJs: ToolbarJsCodeTemplate
		}));
		$view.showChildView('Test', new ToolbarTestView());
	}

	return ToolbarView;
});
