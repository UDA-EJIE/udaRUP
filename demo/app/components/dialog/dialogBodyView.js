define(['marionette',
	'./dialogBodyTemplate.hbs',
	'rup.dialog'], function(Marionette, DialogBodyTemplate){

	var DialogBodyView = Marionette.View.extend({
		template: DialogBodyTemplate
	});

	return DialogBodyView;
});
