define(['marionette',
	'./formBodyTemplate.hbs',
	'rup.form'], function(Marionette, FormBodyTemplate){

	var FormBodyView = Marionette.View.extend({
		template: FormBodyTemplate
	});

	return FormBodyView;
});
