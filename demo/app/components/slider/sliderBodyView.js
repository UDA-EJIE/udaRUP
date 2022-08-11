define(['marionette',
	'./sliderBodyTemplate.hbs',
	'rup.slider'], function(Marionette, SliderBodyTemplate){

	var SliderBodyView = Marionette.View.extend({
		template: SliderBodyTemplate

	});

	return SliderBodyView;
});
