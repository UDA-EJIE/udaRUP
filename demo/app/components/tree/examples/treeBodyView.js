define(['marionette',
	'./treeBodyTemplate.hbs',
	'rup.tree'], function(Marionette, TreeBodyTemplate){

	var TreeBodyView = Marionette.LayoutView.extend({
		template: TreeBodyTemplate
	});

	return TreeBodyView;
});
