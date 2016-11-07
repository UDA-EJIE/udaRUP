define(['marionette',
        'templates',
        './sliderBodyView',
        './sliderTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.slider','rup/rup.tabs','rup/rup.button'], function(Marionette, App, SliderBodyView, SliderTestView, ComponentExampleCodeView){

  var SliderView = Marionette.LayoutView.extend({
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

    $view.Main.show(new SliderBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.slider.sliderHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.slider.sliderJsCodeTemplate
    }));
    $view.Test.show(new SliderTestView());
  }


  return SliderView;
});
