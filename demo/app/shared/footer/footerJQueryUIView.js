
define(['marionette',
	'./footerJQueryUITemplate.hbs'], function(Marionette, FooterJQueryUITemplate){

	var FooterView = Marionette.LayoutView.extend({
		template: FooterJQueryUITemplate
	});

	return FooterView;

});
