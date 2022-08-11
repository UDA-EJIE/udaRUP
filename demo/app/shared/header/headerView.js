define(['marionette',
	'./headerTemplate.hbs'], function(Marionette, HeaderTemplate){

	var HeaderView = Marionette.View.extend({
		template: HeaderTemplate
	});

	return HeaderView;

});
