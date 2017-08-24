
define(['marionette',
	'./footerTemplate.hbs'], function(Marionette, FooterTemplate){

	var FooterView = Marionette.LayoutView.extend({
		template: FooterTemplate
	});

	return FooterView;

});
