define(['marionette',
        'templates',
        './chartBodyView',
        './chartTestView',
        '../../shared/component/componentExampleCodeView',
        'rup.chart'], function(Marionette, App, ChartBodyView, ChartTestView, ComponentExampleCodeView){

  var ChartView = Marionette.LayoutView.extend({
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

    $view.Main.show(new ChartBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.chart.chartHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.chart.chartJsCodeTemplate
    }));
    $view.Test.show(new ChartTestView());
  }


  return ChartView;
});
