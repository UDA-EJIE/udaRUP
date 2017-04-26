define(['marionette',
        'templates',
        'rup/rup.autocomplete'], function(Marionette, App){

  var AutocompleteBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.autocomplete.autocompleteBodyTemplate

  });

  return AutocompleteBodyView;
});
