define(['marionette',
        'templates',
        'rup.tree'], function(Marionette, App){

  var TreeBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.tree.examples.treeBodyTemplate
  });

  return TreeBodyView;
});
