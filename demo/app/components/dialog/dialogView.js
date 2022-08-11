define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./dialogHtmlCodeTemplate.hbs',
	'./dialogJsCodeTemplate.hbs',
	'./dialogBodyView',
	'./dialogTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.dialog'], function(Marionette, ComponentLayoutTemplate, DialogHtmlCodeTemplate, DialogJsCodeTemplate, DialogBodyView, DialogTestView, ComponentExampleCodeView){

	var DialogView = Marionette.View.extend({
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

		$view.showChildView('Main', new DialogBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: DialogHtmlCodeTemplate,
			templateJs: DialogJsCodeTemplate
		}));
		$view.showChildView('Test', new DialogTestView());
		window.$ = $;
	}


	return DialogView;
});
