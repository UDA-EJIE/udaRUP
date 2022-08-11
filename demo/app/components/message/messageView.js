define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./messageHtmlCodeTemplate.hbs',
	'./messageJsCodeTemplate.hbs',
	'./messageBodyView',
	'./messageTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, MessageHtmlCodeTemplate, MessageJsCodeTemplate, MessagekBodyView, MessageTestView, ComponentExampleCodeView){

	var MessageView = Marionette.View.extend({
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

		$view.showChildView('Main', new MessagekBodyView());
		$view.showChildView('Example', new ComponentExampleCodeView({
			templateHtml: MessageHtmlCodeTemplate,
			templateJs: MessageJsCodeTemplate
		}));
		$view.showChildView('Test', new MessageTestView());
	}

	return MessageView;
});
