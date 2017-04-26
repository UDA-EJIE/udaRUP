define(['marionette',
        'templates',
        './feedbackBodyView',
        './feedbackTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.feedback','rup/rup.tabs','rup/rup.button'], function(Marionette, App, FeedbackBodyView, FeedbackTestView, ComponentExampleCodeView){

  var FeedbackView = Marionette.LayoutView.extend({
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

    $view.Main.show(new FeedbackBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.feedback.feedbackHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
    }));
    $view.Test.show(new FeedbackTestView());
  }


  return FeedbackView;
});
