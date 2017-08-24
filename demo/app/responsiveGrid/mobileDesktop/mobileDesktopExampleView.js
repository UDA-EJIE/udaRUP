define(['marionette',
	'./mobileDesktopExampleTemplate.hbs'], function(Marionette, MobileDesktopExampleTemplate){

	var MobileDesktopExampleView = Marionette.LayoutView.extend({
		template: MobileDesktopExampleTemplate,
	});

	return MobileDesktopExampleView;
});
