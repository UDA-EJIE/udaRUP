
define(['marionette',
	'./indexTemplate.hbs'], function(Marionette, IndexTemplate){

	var IndexView = Marionette.View.extend({
		template: IndexTemplate
	});


	return IndexView;

});
