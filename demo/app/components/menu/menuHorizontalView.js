define(['marionette',
	'./menuHorizontalTemplate.hbs',
	'rup.menu'], function(Marionette, MenuHorizontalTemplate){

	var MenuHorizontalView = Marionette.LayoutView.extend({
		template: MenuHorizontalTemplate

	});

	return MenuHorizontalView;
});
