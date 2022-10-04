define(['marionette',
	'./treeBodyTemplate.hbs',
	'rup.tree'], function(Marionette, TreeBodyTemplate){

	var TreeBodyView = Marionette.View.extend({
		template: TreeBodyTemplate
	});

	return TreeBodyView;
});
