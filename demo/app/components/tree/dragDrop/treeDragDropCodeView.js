define(['marionette',
	'./treeDragDropCodeTemplate.hbs',

	'rup.tree'], function (Marionette, TreeDragDropCodeTemplate) {

	var TreeDragDropCodeView = Marionette.LayoutView.extend({
		template: TreeDragDropCodeTemplate
	});

	return TreeDragDropCodeView;
});
