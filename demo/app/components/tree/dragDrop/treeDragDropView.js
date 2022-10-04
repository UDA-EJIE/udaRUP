define(['marionette',
	'./treeDragDropLayoutTemplate.hbs',
	'./treeDragDropBodyView',
	'../../../shared/component/componentExampleCodeView',
	'./treeDragDropCodeView',
	'./treeDragDropTestView',
	'rup.tree'], function (Marionette, TreeDragDropLayoutTemplate, TreeDragDropBodyView, ComponentExampleCodeView, TreeDragDropCodeView, TreeDragDropTestView) {

	var TreeView = Marionette.View.extend({
		template: TreeDragDropLayoutTemplate,
		regions: {
			Main: '#componentMainBody',
			//Example: "#exampleCode",
			Code: '#componentCode',
			Test: '#componentTest'
		},
		onRender: fncOnRender
	});

	function fncOnRender() {
		var $view = this;

		$view.showChildView('Main', new TreeDragDropBodyView());
		/*  $view.showChildView('Example', new ComponentExampleCodeView({
              templateHtml: App.Templates.demo.app.components.tree.dragDrop.treeDragDropHtmlCodeTemplate,
              templateJs: App.Templates.demo.app.components.tree.dragDrop.treeDragDropJsCodeTemplate
          }));*/
		$view.Code.show(new TreeDragDropCodeView());
		$view.showChildView('Test', new TreeDragDropTestView());

	}


	return TreeView;
});
