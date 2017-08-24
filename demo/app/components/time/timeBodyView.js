define(['marionette',
	'./timeBodyTemplate.hbs',
	'rup.time'], function(Marionette, TimeBodyTemplate){

	var TimeBodyView = Marionette.LayoutView.extend({
		template: TimeBodyTemplate

	});

	return TimeBodyView;
});
