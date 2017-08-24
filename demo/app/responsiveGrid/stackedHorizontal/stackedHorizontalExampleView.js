define(['marionette',
	'./stackedHorizontalExampleTemplate.hbs'], function(Marionette, StackedHorizontalExampleTemplate){

	var StackedHorizontalDescView = Marionette.LayoutView.extend({
		template: StackedHorizontalExampleTemplate,
	});

	return StackedHorizontalDescView;
});
