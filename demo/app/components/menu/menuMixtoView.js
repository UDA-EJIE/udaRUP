define(['marionette',
        'templates',
        'rup/menu'], function(Marionette, App){

  var MenuMixtoView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.menu.menuMixtoTemplate

  });

  return MenuMixtoView;
});
