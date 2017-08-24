define(['marionette',
	'./buttonBodyTemplate.hbs'], function(Marionette, ButtonBodyTemplate){

	var ToolbarBodyView = Marionette.LayoutView.extend({
		template: ButtonBodyTemplate,
	});

	return ToolbarBodyView;
});
