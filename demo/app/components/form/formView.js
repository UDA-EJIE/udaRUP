define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./formHtmlCodeTemplate.hbs',
	'./formJsCodeTemplate.hbs',
	'./formBodyView',
	'./formTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.form'], function(Marionette, ComponentLayoutTemplate, FormHtmlCodeTemplate, FormJsCodeTemplate, FormBodyView, FormTestView, ComponentExampleCodeView){

	var FormView = Marionette.View.extend({
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

		$view.showChildView('Main', new FormBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: FormHtmlCodeTemplate,
			templateJs: FormJsCodeTemplate
		}));
		$view.showChildView('Test', new FormTestView());
	}


	return FormView;
});
