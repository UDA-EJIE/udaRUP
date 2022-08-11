define(['marionette',
	'./menuMixtoTemplate.hbs',
	'rup.menu'], function(Marionette, MenuMixtoTemplate){

	var MenuMixtoView = Marionette.View.extend({
		template: MenuMixtoTemplate

	});

	return MenuMixtoView;
  
});
