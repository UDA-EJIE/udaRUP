define(['marionette',
	'./timeBodyTemplate.hbs',
	'rup.time'], function(Marionette, TimeBodyTemplate){

	var TimeBodyView = Marionette.View.extend({
		template: TimeBodyTemplate

	});

	return TimeBodyView;
});
