define(['marionette',
	'./mobileDesktopDescTemplate.hbs'], function(Marionette, MobileDesktopDescTemplate){

	var MobileDesktopDescView = Marionette.LayoutView.extend({
		template: MobileDesktopDescTemplate,
	});

	return MobileDesktopDescView;
});
