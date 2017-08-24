define(['marionette',
	'../../shared/component/rwdGridLayoutTemplate.hbs',
	'./mobileDesktopExampleTemplate.hbs',
	'./mobileDesktopDescView',
	'./mobileDesktopExampleView',
	'../../shared/component/componentExampleCodeView',
], function(Marionette, RwdGridLayoutTemplate, MobileDesktopExampleTemplate, MobileDesktopDescView, MobileDesktopExampleView, ComponentExampleCodeView){

	var MobileDesktopView = Marionette.LayoutView.extend({
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

		$view.Description.show(new MobileDesktopDescView());
		$view.Example.show(new MobileDesktopExampleView());
		$view.Code.show(new ComponentExampleCodeView({
			templateHtml:MobileDesktopExampleTemplate
			// templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
		}));

	}


	return MobileDesktopView;
});
