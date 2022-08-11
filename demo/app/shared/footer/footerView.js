
define(['marionette',
	'./footerTemplate.hbs'], function(Marionette, FooterTemplate){

	var FooterView = Marionette.View.extend({
		template: FooterTemplate
	});

	return FooterView;

});
