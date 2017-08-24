define(['marionette',
	'./headerTemplate.hbs'], function(Marionette, HeaderTemplate){

	var HeaderView = Marionette.LayoutView.extend({
		template: HeaderTemplate
	});

	return HeaderView;

});
