define(['marionette',
        'templates',
        './treeDragDropBodyView',
        '../../../shared/component/componentExampleCodeView',
        './treeDragDropCodeView',
        './treeDragDropTestView',
        'rup.tree'], function (Marionette, App, TreeDragDropBodyView, ComponentExampleCodeView, TreeDragDropCodeView, TreeDragDropTestView) {

    var TreeView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.tree.dragDrop.treeDragDropLayoutTemplate,
        regions: {
            Main: "#componentMainBody",
            //Example: "#exampleCode",
            Code: "#componentCode",
            Test: "#componentTest"
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.Main.show(new TreeDragDropBodyView());
        /*  $view.Example.show(new ComponentExampleCodeView({
              templateHtml: App.Templates.demo.app.components.tree.dragDrop.treeDragDropHtmlCodeTemplate,
              templateJs: App.Templates.demo.app.components.tree.dragDrop.treeDragDropJsCodeTemplate
          }));*/
        $view.Code.show(new TreeDragDropCodeView());
        $view.Test.show(new TreeDragDropTestView());

    }


    return TreeView;
});
