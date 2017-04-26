define(['marionette',
        'templates'], function(Marionette, App){

  var ToolbarBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.button.buttonBodyTemplate,
  });

  return ToolbarBodyView;
});
