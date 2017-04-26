define(['marionette',
        'templates',
        'rup/rup.autocomplete'], function(Marionette, App){

  var AutocompleteBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.autocomplete.autocompleteBodyTemplate

  });

  return AutocompleteBodyView;
});
