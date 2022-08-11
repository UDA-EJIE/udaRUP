define(['marionette',
	'./mobileTabletDesktopExampleTemplate.hbs'], function(Marionette, MobileTabletDesktopExampleTemplate){

	var MobileTabletDesktopExampleView = Marionette.View.extend({
		template: MobileTabletDesktopExampleTemplate,
	});

	return MobileTabletDesktopExampleView;
});
