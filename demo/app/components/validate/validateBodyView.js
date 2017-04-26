define(['marionette',
        'templates',
        'rup/rup.validate'], function(Marionette, App){

  var ValidateBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.validate.validateBodyTemplate
  });

  return ValidateBodyView;
});
