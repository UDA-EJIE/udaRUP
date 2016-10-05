define(['marionette',
        'templates',
        './messageBodyView',
        './messageTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.message','rup/rup.tabs'], function(Marionette, App, MessagekBodyView, MessageTestView, ComponentExampleCodeView){

  var MessageView = Marionette.LayoutView.extend({
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

    $view.Main.show(new MessagekBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.message.messageHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.message.messageJsCodeTemplate
    }));
    $view.Test.show(new MessageTestView());
  }

  return MessageView;
});
