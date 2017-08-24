define(['marionette',
	'./stackedHorizontalDescTemplate.hbs'], function(Marionette, StackedHorizontalDescTemplate){

	var StackedHorizontalDescView = Marionette.LayoutView.extend({
		template: StackedHorizontalDescTemplate,
	});

	return StackedHorizontalDescView;
});
