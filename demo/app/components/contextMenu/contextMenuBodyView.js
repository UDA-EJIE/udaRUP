define(['marionette',
	'./contextMenuBodyTemplate.hbs',
	'rup.contextMenu'], function(Marionette, ContextMenuBodyTemplate){

	var ContextMenuBodyView = Marionette.View.extend({
		template: ContextMenuBodyTemplate

	});

	return ContextMenuBodyView;
});
