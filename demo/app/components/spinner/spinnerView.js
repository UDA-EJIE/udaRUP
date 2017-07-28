define(['marionette',
        'templates',
        './spinnerBodyView',
        './spinnerTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup.spinner','rup.tabs','rup.button'], function(Marionette, App, SpinnerBodyView, SpinnerTestView, ComponentExampleCodeView){

  var SpinnerView = Marionette.LayoutView.extend({
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

    $view.Main.show(new SpinnerBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.spinner.spinnerHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.spinner.spinnerJsCodeTemplate
    }));
    $view.Test.show(new SpinnerTestView());
  }


  return SpinnerView;
});
