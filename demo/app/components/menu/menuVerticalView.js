define(['marionette',
	'./menuVerticalTemplate.hbs',
	'rup.menu'], function(Marionette, MenuVerticalTemplate){

	var MenuVerticalView = Marionette.LayoutView.extend({
		template: MenuVerticalTemplate

	});

	return MenuVerticalView;
});
