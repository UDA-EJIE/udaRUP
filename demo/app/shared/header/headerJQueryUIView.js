define(['marionette',
	'./headerJQueryUITemplate.hbs'], function(Marionette, HeaderJQueryUITemplate){

	var HeaderView = Marionette.LayoutView.extend({
		template: HeaderJQueryUITemplate
	});

	return HeaderView;

});
