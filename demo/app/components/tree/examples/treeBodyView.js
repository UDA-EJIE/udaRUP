define(['marionette',
        'templates',
        'rup/rup.tree'], function(Marionette, App){

  var TreeBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.tree.examples.treeBodyTemplate
  });

  return TreeBodyView;
});
