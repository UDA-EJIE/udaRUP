define(['marionette',
        'templates',
        'rup.tree'], function(Marionette, App){

  var TreeDragDropBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.tree.dragDrop.treeDragDropBodyTemplate
  });

  return TreeDragDropBodyView;
});
