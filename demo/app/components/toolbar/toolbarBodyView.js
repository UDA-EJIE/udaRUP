define(['marionette',
	'./toolbarBodyTemplate.hbs'], function(Marionette, ToolbarBodyTemplate){

	var ToolbarBodyView = Marionette.View.extend({
		template: ToolbarBodyTemplate,
	});

	return ToolbarBodyView;
});
