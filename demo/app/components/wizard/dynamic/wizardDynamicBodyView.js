define(['marionette',
        'templates',
        'rup/rup.wizard'], function(Marionette, App){

  var WizardDynamicBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.wizard.dynamic.wizardDynamicBodyTemplate

  });

  return WizardDynamicBodyView;
});
