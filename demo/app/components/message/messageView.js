define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./messageHtmlCodeTemplate.hbs',
	'./messageJsCodeTemplate.hbs',
	'./messageBodyView',
	'./messageTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.message','rup.tabs'], function(Marionette, ComponentLayoutTemplate, MessageHtmlCodeTemplate, MessageJsCodeTemplate, MessagekBodyView, MessageTestView, ComponentExampleCodeView){

	var MessageView = Marionette.LayoutView.extend({
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

		$view.Main.show(new MessagekBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: MessageHtmlCodeTemplate,
			templateJs: MessageJsCodeTemplate
		}));
		$view.Test.show(new MessageTestView());
	}

	return MessageView;
});
