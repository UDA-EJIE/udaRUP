
define(['marionette',
	'./footerJQueryUITemplate.hbs'], function(Marionette, FooterJQueryUITemplate){

	var FooterView = Marionette.View.extend({
		template: FooterJQueryUITemplate
	});

	return FooterView;

});
