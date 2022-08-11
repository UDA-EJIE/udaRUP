define(['marionette',
	'./mobileDesktopDescTemplate.hbs'], function(Marionette, MobileDesktopDescTemplate){

	var MobileDesktopDescView = Marionette.View.extend({
		template: MobileDesktopDescTemplate,
	});

	return MobileDesktopDescView;
});
