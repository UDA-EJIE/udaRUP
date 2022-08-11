define(['marionette',
	'../../../shared/component/componentLayoutTemplate.hbs',
	'./treeHtmlCodeTemplate.hbs',
	'./treeJsCodeTemplate.hbs',
	'./treeBodyView',
	'./treeTestView',
	'../../../shared/component/componentExampleCodeView',
	'rup.tree'], function(Marionette, ComponentLayoutTemplate, TreeHtmlCodeTemplate, TreeJsCodeTemplate, TreeBodyView, TreeTestView, ComponentExampleCodeView){

	var TreeView = Marionette.View.extend({
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

		$view.showChildView('Main', new TreeBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: TreeHtmlCodeTemplate,
			templateJs: TreeJsCodeTemplate
		}));
		window.$ = $;
		$view.showChildView('Test', new TreeTestView());
	}


	return TreeView;
});
