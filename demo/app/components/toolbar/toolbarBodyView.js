define(['marionette',
	'./toolbarBodyTemplate.hbs'], function(Marionette, ToolbarBodyTemplate){

	var ToolbarBodyView = Marionette.LayoutView.extend({
		template: ToolbarBodyTemplate,
	});

	return ToolbarBodyView;
});
