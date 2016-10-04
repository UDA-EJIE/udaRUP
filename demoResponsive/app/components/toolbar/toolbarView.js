define(['marionette',
        'templates',
        './toolbarBodyView',
        './toolbarTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.message','rup/rup.tabs'], function(Marionette, App, ToolbarBodyView, ToolbarTestView, ComponentExampleCodeView){

  var ToolbarView = Marionette.LayoutView.extend({
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

    $view.Main.show(new ToolbarBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.toolbar.toolbarHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.toolbar.toolbarJsCodeTemplate
    }));
    $view.Test.show(new ToolbarTestView());
  }

  return ToolbarView;
});
