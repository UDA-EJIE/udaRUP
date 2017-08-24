define(['marionette',
	'./messageBodyTemplate.hbs',
	'rup.message'], function(Marionette, MessageBodyTemplate){

	var MessageBodyView = Marionette.LayoutView.extend({
		template: MessageBodyTemplate,
	});

	return MessageBodyView;
});
