define(['marionette',
        'templates',
        'rup.validate'], function(Marionette, App){

  var ValidateBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.validate.validateBodyTemplate
  });

  return ValidateBodyView;
});
