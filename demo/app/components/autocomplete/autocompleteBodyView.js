define(['marionette',
	'./autocompleteBodyTemplate.hbs',
	'rup.autocomplete'], function(Marionette, AutocompleteBodyTemplate){

	var AutocompleteBodyView = Marionette.LayoutView.extend({
		template: AutocompleteBodyTemplate

	});

	return AutocompleteBodyView;
});
