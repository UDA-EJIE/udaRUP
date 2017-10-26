define(['marionette',
	'./menuMixtoTemplate.hbs',
	'rup.menu'], function(Marionette, MenuMixtoTemplate){

	var MenuMixtoView = Marionette.LayoutView.extend({
		template: MenuMixtoTemplate

	});

	return MenuMixtoView;
  
});
