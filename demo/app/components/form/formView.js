define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./formHtmlCodeTemplate.hbs',
	'./formJsCodeTemplate.hbs',
	'./formBodyView',
	'./formTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.form'], function(Marionette, ComponentLayoutTemplate, FormHtmlCodeTemplate, FormJsCodeTemplate, FormBodyView, FormTestView, ComponentExampleCodeView){

	var FormView = Marionette.LayoutView.extend({
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

		$view.Main.show(new FormBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: FormHtmlCodeTemplate,
			templateJs: FormJsCodeTemplate
		}));
		$view.Test.show(new FormTestView());
		window.$ = $;
	}


	return FormView;
});
