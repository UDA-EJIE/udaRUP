define(['marionette',
	'./mobileTabletDesktopDescTemplate.hbs'], function(Marionette, MobileTabletDesktopDescTemplate){

	var MobileTabletDesktopDescView = Marionette.LayoutView.extend({
		template: MobileTabletDesktopDescTemplate,
	});

	return MobileTabletDesktopDescView;
});
