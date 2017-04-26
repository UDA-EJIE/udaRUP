define(['marionette',
        'templates',
        'rup/rup.wizard'], function(Marionette, App){

  var WizardSimpleBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.wizard.simple.wizardSimpleBodyTemplate

  });

  return WizardSimpleBodyView;
});
