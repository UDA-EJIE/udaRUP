define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./progressbarHtmlCodeTemplate.hbs',
	'./progressbarJsCodeTemplate.hbs',
	'./progressbarBodyView',
	'./progressbarTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.progressbar','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, ProgressbarHtmlCodeTemplate, ProgressbarJsCodeTemplate, ProgressbarBodyView, ProgressbarTestView, ComponentExampleCodeView){

	var ProgressbarView = Marionette.View.extend({
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

		$view.showChildView('Main', new ProgressbarBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: ProgressbarHtmlCodeTemplate,
			templateJs: ProgressbarJsCodeTemplate
		}));
		$view.showChildView('Test', new ProgressbarTestView());
	}


	return ProgressbarView;
});
