define(['marionette',
        'templates',
        'rup/rup.wizard'], function(Marionette, App){

  var WizardDynamicBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.wizard.dynamic.wizardDynamicBodyTemplate

  });

  return WizardDynamicBodyView;
});
