define(['marionette',
	'./buttonBodyTemplate.hbs'], function(Marionette, ButtonBodyTemplate){

	var ToolbarBodyView = Marionette.View.extend({
		template: ButtonBodyTemplate,
	});

	return ToolbarBodyView;
});
