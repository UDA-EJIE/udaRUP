define(['marionette',
        'templates'], function(Marionette, App){

  var ToolbarBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.button.buttonBodyTemplate,
  });

  return ToolbarBodyView;
});
