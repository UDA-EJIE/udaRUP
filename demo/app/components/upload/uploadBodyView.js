define(['marionette',
	'./uploadBodyTemplate.hbs',
	'rup.upload'], function(Marionette, UploadBodyTemplate){

	var UploadBodyView = Marionette.View.extend({
		template: UploadBodyTemplate
	});

	return UploadBodyView;
});
