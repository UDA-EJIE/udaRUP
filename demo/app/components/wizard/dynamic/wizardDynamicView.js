define(['marionette',
        'templates',
        './wizardDynamicBodyView',
        './wizardDynamicTestView',
        '../../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup.tabs','rup.button'], function(Marionette, App, WizardDynamicBodyView, WizardDynamicTestView, ComponentExampleCodeView){

  var WizardDynamicView = Marionette.LayoutView.extend({
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

    $view.Main.show(new WizardDynamicBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.wizard.dynamic.wizardDynamicHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.wizard.dynamic.wizardDynamicJsCodeTemplate
    }));
    $view.Test.show(new WizardDynamicTestView());
  }


  return WizardDynamicView;
});
