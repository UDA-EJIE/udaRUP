define(['marionette',
        'templates',
        'rup/rup.dialog'], function(Marionette, App){

  var DialogBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.dialog.dialogBodyTemplate
  });

  return DialogBodyView;
});
