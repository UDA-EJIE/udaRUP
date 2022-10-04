define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./uploadHtmlCodeTemplate.hbs',
	'./uploadJsCodeTemplate.hbs',
	'./uploadBodyView',
	'./uploadTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.upload'], function(Marionette, ComponentLayoutTemplate, UploadHtmlCodeTemplate, UploadJsCodeTemplate, UploadBodyView, UploadTestView, ComponentExampleCodeView){

	var UploadView = Marionette.View.extend({
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

		$view.showChildView('Main', new UploadBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: UploadHtmlCodeTemplate,
			templateJs: UploadJsCodeTemplate
		}));
		$view.showChildView('Test', new UploadTestView());
	}


	return UploadView;
});
