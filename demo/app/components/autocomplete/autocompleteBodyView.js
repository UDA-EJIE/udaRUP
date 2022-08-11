define(['marionette',
	'./autocompleteBodyTemplate.hbs',
	'rup.autocomplete'], function(Marionette, AutocompleteBodyTemplate){

	var AutocompleteBodyView = Marionette.View.extend({
		template: AutocompleteBodyTemplate

	});

	return AutocompleteBodyView;
});
