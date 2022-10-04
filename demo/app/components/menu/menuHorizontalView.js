define(['marionette',
	'./menuHorizontalTemplate.hbs',
	'rup.menu'], function(Marionette, MenuHorizontalTemplate){

	var MenuHorizontalView = Marionette.View.extend({
		template: MenuHorizontalTemplate

	});

	return MenuHorizontalView;
});
