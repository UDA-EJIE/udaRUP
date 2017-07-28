define(['marionette',
        'templates',
        './messageBodyView',
        './messageTestView',
        '../../shared/component/componentExampleCodeView',
        'rup.message','rup.tabs'], function(Marionette, App, MessagekBodyView, MessageTestView, ComponentExampleCodeView){

  var MessageView = Marionette.LayoutView.extend({
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

    $view.Main.show(new MessagekBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.message.messageHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.message.messageJsCodeTemplate
    }));
    $view.Test.show(new MessageTestView());
  }

  return MessageView;
});
