define(['marionette',
        'templates',
        './timeBodyView',
        './timeTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.time','rup/rup.tabs','rup/rup.button'], function(Marionette, App, TimeBodyView, TimeTestView, ComponentExampleCodeView){

  var TimeView = Marionette.LayoutView.extend({
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

    $view.Main.show(new TimeBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.time.timeHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.time.timeJsCodeTemplate
    }));
    $view.Test.show(new TimeTestView());
  }


  return TimeView;
});
