define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./timeHtmlCodeTemplate.hbs',
	'./timeJsCodeTemplate.hbs',
	'./timeBodyView',
	'./timeTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.time','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, TimeHtmlCodeTemplate, TimeJsCodeTemplate, TimeBodyView, TimeTestView, ComponentExampleCodeView){

	var TimeView = Marionette.LayoutView.extend({
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

		$view.Main.show(new TimeBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: TimeHtmlCodeTemplate,
			templateJs: TimeJsCodeTemplate
		}));
		$view.Test.show(new TimeTestView());
	}


	return TimeView;
});
