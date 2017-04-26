define(['marionette',
        'templates',
        'rup/rup.combo'], function(Marionette, App){

  var ComboSimpleBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.combo.comboSimple.comboSimpleBodyTemplate
  });

  return ComboSimpleBodyView;
});
