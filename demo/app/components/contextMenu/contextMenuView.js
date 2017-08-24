define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./contextMenuHtmlCodeTemplate.hbs',
	'./contextMenuJsCodeTemplate.hbs',
	'./contextMenuBodyView',
	'./contextMenuTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.contextMenu','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, ContextMenuHtmlCodeTemplate, ContextMenuJsCodeTemplate, ContextMenuBodyView, ContextMenuTestView, ComponentExampleCodeView){

	var ContextMenuView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ContextMenuBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ContextMenuHtmlCodeTemplate,
			templateJs: ContextMenuJsCodeTemplate
		}));
		$view.Test.show(new ContextMenuTestView());
	}


	return ContextMenuView;
});
