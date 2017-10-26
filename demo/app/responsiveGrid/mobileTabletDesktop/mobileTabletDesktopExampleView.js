define(['marionette',
	'./mobileTabletDesktopExampleTemplate.hbs'], function(Marionette, MobileTabletDesktopExampleTemplate){

	var MobileTabletDesktopExampleView = Marionette.LayoutView.extend({
		template: MobileTabletDesktopExampleTemplate,
	});

	return MobileTabletDesktopExampleView;
});
