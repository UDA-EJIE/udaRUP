define(['marionette',
	'./mobileTabletDesktopDescTemplate.hbs'], function(Marionette, MobileTabletDesktopDescTemplate){

	var MobileTabletDesktopDescView = Marionette.View.extend({
		template: MobileTabletDesktopDescTemplate,
	});

	return MobileTabletDesktopDescView;
});
