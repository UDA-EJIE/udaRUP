define(['marionette',
        'templates',
        './dateBodyView',
        './dateTestView',
        '../../shared/component/componentExampleCodeView',
        'rup.date'], function(Marionette, App, DateBodyView, DateTestView, ComponentExampleCodeView){

  var DateView = Marionette.LayoutView.extend({
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

    $view.Main.show(new DateBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.date.dateHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.date.dateJsCodeTemplate
    }));
    $view.Test.show(new DateTestView());
  }

  return DateView;
});
