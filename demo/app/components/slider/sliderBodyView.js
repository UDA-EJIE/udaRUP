define(['marionette',
	'./sliderBodyTemplate.hbs',
	'rup.slider'], function(Marionette, SliderBodyTemplate){

	var SliderBodyView = Marionette.LayoutView.extend({
		template: SliderBodyTemplate

	});

	return SliderBodyView;
});
