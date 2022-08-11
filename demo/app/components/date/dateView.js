define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./dateHtmlCodeTemplate.hbs',
	'./dateJsCodeTemplate.hbs',
	'./dateBodyView',
	'./dateTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.date'], function(Marionette, ComponentLayoutTemplate, DateHtmlCodeTemplate, DateJsCodeTemplate, DateBodyView, DateTestView, ComponentExampleCodeView){

	var DateView = Marionette.View.extend({
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

		$view.showChildView('Main', new DateBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: DateHtmlCodeTemplate,
			templateJs: DateJsCodeTemplate
		}));
		$view.showChildView('Test', new DateTestView());
	}

	return DateView;
});
