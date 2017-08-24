define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./dateHtmlCodeTemplate.hbs',
	'./dateJsCodeTemplate.hbs',
	'./dateBodyView',
	'./dateTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.date'], function(Marionette, ComponentLayoutTemplate, DateHtmlCodeTemplate, DateJsCodeTemplate, DateBodyView, DateTestView, ComponentExampleCodeView){

	var DateView = Marionette.LayoutView.extend({
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

		$view.Main.show(new DateBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: DateHtmlCodeTemplate,
			templateJs: DateJsCodeTemplate
		}));
		$view.Test.show(new DateTestView());
	}

	return DateView;
});
