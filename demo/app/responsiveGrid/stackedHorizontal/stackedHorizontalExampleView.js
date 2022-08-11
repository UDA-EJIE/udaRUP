define(['marionette',
	'./stackedHorizontalExampleTemplate.hbs'], function(Marionette, StackedHorizontalExampleTemplate){

	var StackedHorizontalDescView = Marionette.View.extend({
		template: StackedHorizontalExampleTemplate,
	});

	return StackedHorizontalDescView;
});
