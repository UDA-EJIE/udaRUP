define(['marionette',
	'./headerJQueryUITemplate.hbs'], function(Marionette, HeaderJQueryUITemplate){

	var HeaderView = Marionette.View.extend({
		template: HeaderJQueryUITemplate
	});

	return HeaderView;

});
