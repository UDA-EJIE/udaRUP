define(['marionette',
        'templates',
        './dialogBodyView',
        './dialogTestView',
        '../../shared/component/componentExampleCodeView',
        'rup.dialog'], function(Marionette, App, DialogBodyView, DialogTestView, ComponentExampleCodeView){

  var DialogView = Marionette.LayoutView.extend({
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

    $view.Main.show(new DialogBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.dialog.dialogHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.dialog.dialogJsCodeTemplate
    }));
    $view.Test.show(new DialogTestView());
  }


  return DialogView;
});
