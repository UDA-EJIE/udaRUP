define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./autocompleteHtmlCodeTemplate.hbs',
	'./autocompleteJsCodeTemplate.hbs',
	'./autocompleteBodyView',
	'./autocompleteTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.autocomplete','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, AutocompleteHtmlCodeTemplate, AutocompleteJsCodeTemplate, AutocompleteBodyView, AutocompleteTestView, ComponentExampleCodeView){

	var AutocompleteView = Marionette.View.extend({
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

		$view.showChildView('Main', new AutocompleteBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: AutocompleteHtmlCodeTemplate,
			templateJs: AutocompleteJsCodeTemplate,
		}));
		$view.showChildView('Test', new AutocompleteTestView());
		window.$ = $;
	}


	return AutocompleteView;
});
