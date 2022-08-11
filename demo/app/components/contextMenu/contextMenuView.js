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

	var ContextMenuView = Marionette.View.extend({
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

		$view.showChildView('Main', new ContextMenuBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ContextMenuHtmlCodeTemplate,
			templateJs: ContextMenuJsCodeTemplate
		}));
		$view.showChildView('Test', new ContextMenuTestView());
	}


	return ContextMenuView;
});
