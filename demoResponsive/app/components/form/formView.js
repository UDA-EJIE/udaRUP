define(['marionette',
        'templates',
        './formBodyView',
        './formTestView',
        '../../shared/component/componentExampleCodeView',
        'rup/rup.form'], function(Marionette, App, FormBodyView, FormTestView, ComponentExampleCodeView){

  var FormView = Marionette.LayoutView.extend({
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

    $view.Main.show(new FormBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.form.formHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.form.formJsCodeTemplate
    }));
    $view.Test.show(new FormTestView());
  }


  return FormView;
});
