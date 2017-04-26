define(['marionette',
        'templates',
        './comboSimpleBodyView',
        './comboSimpleTestView',
        '../../../shared/component/componentExampleCodeView',
        'rup/rup.combo'], function(Marionette, App, ComboSimpleBodyView, ComboSimpleTestView, ComponentExampleCodeView){

  var ComboSimpleView = Marionette.LayoutView.extend({
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

    $view.Main.show(new ComboSimpleBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.combo.comboSimple.comboSimpleHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.combo.comboSimple.comboSimpleJsCodeTemplate
    }));
    $view.Test.show(new ComboSimpleTestView());
  }


  return ComboSimpleView;
});
