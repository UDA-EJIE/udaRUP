define(['marionette',
        'templates',
        'rup/menu'], function(Marionette, App){

  var MenuVerticalView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.menu.menuVerticalTemplate

  });

  return MenuVerticalView;
});
