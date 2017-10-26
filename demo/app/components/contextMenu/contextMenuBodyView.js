define(['marionette',
	'./contextMenuBodyTemplate.hbs',
	'rup.contextMenu'], function(Marionette, ContextMenuBodyTemplate){

	var ContextMenuBodyView = Marionette.LayoutView.extend({
		template: ContextMenuBodyTemplate

	});

	return ContextMenuBodyView;
});
