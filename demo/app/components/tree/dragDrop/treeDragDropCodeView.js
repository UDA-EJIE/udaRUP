define(['marionette',
        'templates',

        'rup.tree'], function (Marionette, App) {

    var TreeDragDropCodeView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.tree.dragDrop.treeDragDropCodeTemplate
    });

    return TreeDragDropCodeView;
});
