define(['marionette',
        'templates',
        './contextMenuBodyView',
        './contextMenuTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.contextMenu','rup/rup.tabs','rup/rup.button'], function(Marionette, App, ContextMenuBodyView, ContextMenuTestView, ComponentExampleCodeView){

  var ContextMenuView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.shared.component.componentLayoutTemplate,
      regions:{
        Main: "#componentMainBody",
        Example: "#exampleCode",
        Test: "#componentTest"
      },
      onRender: fncOnRender
  });

  function fncOnRender(){
    var $view = this;

    $view.Main.show(new ContextMenuBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.contextMenu.contextMenuHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.contextMenu.contextMenuJsCodeTemplate
    }));
    $view.Test.show(new ContextMenuTestView());
  }


  return ContextMenuView;
});
