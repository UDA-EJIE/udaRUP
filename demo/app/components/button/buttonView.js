define(['marionette',
        'templates',
        './buttonBodyView',
        './buttonTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.message','rup/rup.tabs'], function(Marionette, App, ButtonBodyView, ButtonTestView, ComponentExampleCodeView){

  var ButtonView = Marionette.LayoutView.extend({
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

    $view.Main.show(new ButtonBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.button.buttonHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.button.buttonJsCodeTemplate
    }));
    $view.Test.show(new ButtonTestView());
  }

  return ButtonView;
});
