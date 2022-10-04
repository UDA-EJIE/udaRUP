define(['marionette',
	'./treeDragDropBodyTemplate.hbs',
	'rup.tree'], function(Marionette, TreeDragDropBodyTemplate){

	var TreeDragDropBodyView = Marionette.View.extend({
		template: TreeDragDropBodyTemplate
	});

	return TreeDragDropBodyView;
});
