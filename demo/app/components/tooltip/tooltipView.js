define(['marionette',
        'templates',
        './tooltipBodyView',
        './tooltipTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.tooltip'], function(Marionette, App, TooltipBodyView, TooltipTestView, ComponentExampleCodeView){

  var TooltipView = Marionette.LayoutView.extend({
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

    $view.Main.show(new TooltipBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.tooltip.tooltipHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.tooltip.tooltipJsCodeTemplate
    }));
    $view.Test.show(new TooltipTestView());
  }


  return TooltipView;
});
