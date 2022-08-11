define(['marionette',
	'./stackedHorizontalDescTemplate.hbs'], function(Marionette, StackedHorizontalDescTemplate){

	var StackedHorizontalDescView = Marionette.View.extend({
		template: StackedHorizontalDescTemplate,
	});

	return StackedHorizontalDescView;
});
