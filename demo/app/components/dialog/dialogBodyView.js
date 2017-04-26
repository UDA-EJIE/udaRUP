define(['marionette',
        'templates',
        'rup/rup.dialog'], function(Marionette, App){

  var DialogBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.dialog.dialogBodyTemplate
  });

  return DialogBodyView;
});
