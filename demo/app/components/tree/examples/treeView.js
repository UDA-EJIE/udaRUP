define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./treeHtmlCodeTemplate.hbs',
	'./treeJsCodeTemplate.hbs',
	'./treeBodyView',
	'./treeTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.tree'], function(Marionette, ComponentLayoutTemplate, TreeHtmlCodeTemplate, TreeJsCodeTemplate, TreeBodyView, TreeTestView, ComponentExampleCodeView){

	var TreeView = Marionette.LayoutView.extend({
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

		$view.Main.show(new TreeBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: TreeHtmlCodeTemplate,
			templateJs: TreeJsCodeTemplate
		}));
		window.$ = $;
		$view.Test.show(new TreeTestView());
	}


	return TreeView;
});
