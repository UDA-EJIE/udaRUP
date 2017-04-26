define(['marionette',
        'templates',
        'rup/rup.tree'], function(Marionette, App){

  var TreeDragDropBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.tree.dragDrop.treeDragDropBodyTemplate
  });

  return TreeDragDropBodyView;
});
