define(['marionette',
	'./uploadBodyTemplate.hbs',
	'rup.upload'], function(Marionette, UploadBodyTemplate){

	var UploadBodyView = Marionette.LayoutView.extend({
		template: UploadBodyTemplate
	});

	return UploadBodyView;
});
