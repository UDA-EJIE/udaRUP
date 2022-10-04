define(['marionette',
	'../../shared/component/rwdGridLayoutTemplate.hbs',
	'./mobileTabletDesktopExampleTemplate.hbs',
	'./mobileTabletDesktopDescView',
	'./mobileTabletDesktopExampleView',
	'../../shared/component/componentExampleCodeView',
], function(Marionette, RwdGridLayoutTemplate, MobileTabletDesktopExampleTemplate, MobileTabletDesktopDescView, MobileTabletDesktopExampleView, ComponentExampleCodeView){

	var MobileTabletDesktopView = Marionette.View.extend({
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

		$view.Description.show(new MobileTabletDesktopDescView());
		$view.showChildView('Example', new MobileTabletDesktopExampleView());
		$view.Code.show(new ComponentExampleCodeView({
			templateHtml: MobileTabletDesktopExampleTemplate
			// templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
		}));

	}


	return MobileTabletDesktopView;
});
