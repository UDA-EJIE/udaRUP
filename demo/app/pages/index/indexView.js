
define(['marionette',
	'./indexTemplate.hbs'], function(Marionette, IndexTemplate){

	var IndexView = Marionette.LayoutView.extend({
		template: IndexTemplate
	});


	return IndexView;

});
