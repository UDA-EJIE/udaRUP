define(['marionette',
        'templates',
        'rup/rup.menu'], function(Marionette, App){

  var MenuVerticalView = Marionette.LayoutView.extend({
    template: App.Templates.demoResponsive.app.components.menu.menuVerticalTemplate

  });

  return MenuVerticalView;
});
