define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./progressbarHtmlCodeTemplate.hbs',
	'./progressbarJsCodeTemplate.hbs',
	'./progressbarBodyView',
	'./progressbarTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.progressbar','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, ProgressbarHtmlCodeTemplate, ProgressbarJsCodeTemplate, ProgressbarBodyView, ProgressbarTestView, ComponentExampleCodeView){

	var ProgressbarView = Marionette.LayoutView.extend({
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

		$view.Main.show(new ProgressbarBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: ProgressbarHtmlCodeTemplate,
			templateJs: ProgressbarJsCodeTemplate
		}));
		$view.Test.show(new ProgressbarTestView());
	}


	return ProgressbarView;
});
