define(['marionette',
	'./formBodyTemplate.hbs',
	'rup.form'], function(Marionette, FormBodyTemplate){

	var FormBodyView = Marionette.LayoutView.extend({
		template: FormBodyTemplate
	});

	return FormBodyView;
});
