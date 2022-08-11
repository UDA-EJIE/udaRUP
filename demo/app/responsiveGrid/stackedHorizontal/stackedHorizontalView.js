define(['marionette',
	'../../shared/component/rwdGridLayoutTemplate.hbs',
	'./stackedHorizontalExampleTemplate.hbs',
	'./stackedHorizontalDescView',
	'./stackedHorizontalExampleView',
	'../../shared/component/componentExampleCodeView',
], function(Marionette, RwdGridLayoutTemplate, StackedHorizontalExampleTemplate, StackedHorizontalDescView, StackedHorizontalExampleView, ComponentExampleCodeView){

	var RwdView = Marionette.View.extend({
		template: RwdGridLayoutTemplate,
		regions:{
			Description: '#description',
			Example: '#rwdExample',
			Code: '#exampleCode'
		},
		onRender: fncOnRender
	});

	function fncOnRender(){
		var $view = this;

		$view.Description.show(new StackedHorizontalDescView());
		$view.showChildView('Example', new StackedHorizontalExampleView());
		$view.Code.show(new ComponentExampleCodeView({
			templateHtml: StackedHorizontalExampleTemplate
			// templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
		}));

	}


	return RwdView;
});
