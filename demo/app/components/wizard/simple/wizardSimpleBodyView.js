define(['marionette',
        'templates',
        'rup.wizard'], function(Marionette, App){

  var WizardSimpleBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.wizard.simple.wizardSimpleBodyTemplate

  });

  return WizardSimpleBodyView;
});
