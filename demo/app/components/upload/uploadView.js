define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./uploadHtmlCodeTemplate.hbs',
	'./uploadJsCodeTemplate.hbs',
	'./uploadBodyView',
	'./uploadTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.upload'], function(Marionette, ComponentLayoutTemplate, UploadHtmlCodeTemplate, UploadJsCodeTemplate, UploadBodyView, UploadTestView, ComponentExampleCodeView){

	var UploadView = Marionette.LayoutView.extend({
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

		$view.Main.show(new UploadBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: UploadHtmlCodeTemplate,
			templateJs: UploadJsCodeTemplate
		}));
		$view.Test.show(new UploadTestView());
	}


	return UploadView;
});
