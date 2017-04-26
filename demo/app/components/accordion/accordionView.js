define(['marionette',
        'templates',
        './accordionBodyView',
        './accordionTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.accordion','rup/rup.tabs','rup/rup.button'], function(Marionette, App, AccordionBodyView, AccordionTestView, ComponentExampleCodeView){

  var AccordionView = Marionette.LayoutView.extend({
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

    $view.Main.show(new AccordionBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.accordion.accordionHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.accordion.accordionJsCodeTemplate
    }));
    $view.Test.show(new AccordionTestView());
  }


  return AccordionView;
});
