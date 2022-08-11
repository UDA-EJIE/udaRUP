define(['marionette',
	'./mobileDesktopExampleTemplate.hbs'], function(Marionette, MobileDesktopExampleTemplate){

	var MobileDesktopExampleView = Marionette.View.extend({
		template: MobileDesktopExampleTemplate,
	});

	return MobileDesktopExampleView;
});
