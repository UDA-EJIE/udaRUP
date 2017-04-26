define(['marionette',
        'templates',
        'rup/rup.combo'], function(Marionette, App){

  var ComboSimpleBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.combo.comboSimple.comboSimpleBodyTemplate
  });

  return ComboSimpleBodyView;
});
