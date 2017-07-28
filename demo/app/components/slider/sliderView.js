define(['marionette',
        'templates',
        './sliderBodyView',
        './sliderTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup.slider','rup.tabs','rup.button'], function(Marionette, App, SliderBodyView, SliderTestView, ComponentExampleCodeView){

  var SliderView = Marionette.LayoutView.extend({
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

    $view.Main.show(new SliderBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.slider.sliderHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.slider.sliderJsCodeTemplate
    }));
    $view.Test.show(new SliderTestView());
  }


  return SliderView;
});
