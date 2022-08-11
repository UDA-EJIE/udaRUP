define(['marionette',
	'./messageBodyTemplate.hbs',
	'rup.message'], function(Marionette, MessageBodyTemplate){

	var MessageBodyView = Marionette.View.extend({
		template: MessageBodyTemplate,
	});

	return MessageBodyView;
});
