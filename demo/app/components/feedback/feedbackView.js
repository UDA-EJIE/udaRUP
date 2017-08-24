define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./feedbackHtmlCodeTemplate.hbs',
	'./feedbackJsCodeTemplate.hbs',
	'./feedbackBodyView',
	'./feedbackTestView',
	'../../shared/component/componentExampleCodeView',
	// 'highlight',
	// 'highlight-html',
	'rup.feedback','rup.tabs','rup.button'], function(Marionette, ComponentLayoutTemplate, FeedbackHtmlCodeTemplate, FeedbackJsCodeTemplate, FeedbackBodyView, FeedbackTestView, ComponentExampleCodeView){

	var FeedbackView = Marionette.LayoutView.extend({
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
		$view.Main.show(new FeedbackBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: FeedbackHtmlCodeTemplate,
			templateJs: FeedbackJsCodeTemplate
		}));
		//$view.Test.show(new FeedbackTestView());
	}


	return FeedbackView;
});
