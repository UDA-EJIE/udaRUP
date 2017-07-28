define(['marionette',
        'templates',
        './wizardSimpleBodyView',
        './wizardSimpleTestView',
        '../../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup.tabs','rup.button'], function(Marionette, App, WizardSimpleBodyView, WizardSimpleTestView, ComponentExampleCodeView){

  var WizardSimpleView = Marionette.LayoutView.extend({
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

    $view.Main.show(new WizardSimpleBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.wizard.simple.wizardSimpleHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.wizard.simple.wizardSimpleJsCodeTemplate
    }));
    $view.Test.show(new WizardSimpleTestView());
  }


  return WizardSimpleView;
});
