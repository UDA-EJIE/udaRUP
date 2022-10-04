define(['marionette',
	'./dateBodyTemplate.hbs'], function(Marionette, DateBodyTemplate){

	var DateBodyView = Marionette.View.extend({
		template: DateBodyTemplate,
	});

	return DateBodyView;
});
