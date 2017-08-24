define(['marionette',
	'./dateBodyTemplate.hbs'], function(Marionette, DateBodyTemplate){

	var DateBodyView = Marionette.LayoutView.extend({
		template: DateBodyTemplate,
	});

	return DateBodyView;
});
