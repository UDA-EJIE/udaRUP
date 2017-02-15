define(['marionette',
        'templates',
        'rup/rup.contextMenu'], function(Marionette, App){

  var ContextMenuBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.contextMenu.contextMenuBodyTemplate

  });

  return ContextMenuBodyView;
});
