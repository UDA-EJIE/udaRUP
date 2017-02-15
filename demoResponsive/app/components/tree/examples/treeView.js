define(['marionette',
        'templates',
        './treeBodyView',
        './treeTestView',
        '../../../shared/component/componentExampleCodeView',
        'rup/rup.tree'], function(Marionette, App, TreeBodyView, TreeTestView, ComponentExampleCodeView){

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

    $view.Main.show(new TreeBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.tree.examples.treeHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.tree.examples.treeJsCodeTemplate
    }));
    $view.Test.show(new TreeTestView());
  }


  return TreeView;
});
