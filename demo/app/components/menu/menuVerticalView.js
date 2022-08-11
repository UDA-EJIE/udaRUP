define(['marionette',
	'./menuVerticalTemplate.hbs',
	'rup.menu'], function(Marionette, MenuVerticalTemplate){

	var MenuVerticalView = Marionette.View.extend({
		template: MenuVerticalTemplate

	});

	return MenuVerticalView;
});
