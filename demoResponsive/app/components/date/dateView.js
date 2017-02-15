define(['marionette',
        'templates',
        './dateBodyView',
        './dateTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.date'], function(Marionette, App, DateBodyView, DateTestView, ComponentExampleCodeView){

  var DateView = Marionette.LayoutView.extend({
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

    $view.Main.show(new DateBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.date.dateHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.date.dateJsCodeTemplate
    }));
    $view.Test.show(new DateTestView());
  }

  return DateView;
});
