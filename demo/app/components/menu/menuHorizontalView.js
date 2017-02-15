define(['marionette',
        'templates',
        'rup/rup.menu'], function(Marionette, App){

  var MenuHorizontalView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.menu.menuHorizontalTemplate

  });

  return MenuHorizontalView;
});
