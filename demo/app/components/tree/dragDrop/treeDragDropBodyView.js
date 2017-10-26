define(['marionette',
	'./treeDragDropBodyTemplate.hbs',
	'rup.tree'], function(Marionette, TreeDragDropBodyTemplate){

	var TreeDragDropBodyView = Marionette.LayoutView.extend({
		template: TreeDragDropBodyTemplate
	});

	return TreeDragDropBodyView;
});
