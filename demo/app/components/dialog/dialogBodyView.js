define(['marionette',
	'./dialogBodyTemplate.hbs',
	'rup.dialog'], function(Marionette, DialogBodyTemplate){

	var DialogBodyView = Marionette.LayoutView.extend({
		template: DialogBodyTemplate
	});

	return DialogBodyView;
});
