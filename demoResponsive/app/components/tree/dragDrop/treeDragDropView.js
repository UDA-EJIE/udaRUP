define(['marionette',
        'templates',
        './treeDragDropBodyView',
        './treeDragDropTestView',
        '../../../shared/component/componentExampleCodeView',
        'rup/rup.tree'], function(Marionette, App, TreeDragDropBodyView, TreeDragDropTestView, ComponentExampleCodeView){

  var TreeView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.shared.component.componentLayoutTemplate,
      regions:{
        Main: "#componentMainBody",
        Example: "#exampleCode",
        Test: "#componentTest"
      },
      onRender: fncOnRender
  });

  function fncOnRender(){
    var $view = this;

    $view.Main.show(new TreeDragDropBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.tree.dragDrop.treeHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.tree.dragDrop.treeJsCodeTemplate
    }));
    $view.Test.show(new TreeDragDropTestView());
  }


  return TreeView;
});
