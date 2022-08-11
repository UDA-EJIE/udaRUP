define(['marionette',
	'./treeDragDropCodeTemplate.hbs',

	'rup.tree'], function (Marionette, TreeDragDropCodeTemplate) {

	var TreeDragDropCodeView = Marionette.View.extend({
		template: TreeDragDropCodeTemplate
	});

	return TreeDragDropCodeView;
});
