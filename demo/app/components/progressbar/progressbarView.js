define(['marionette',
        'templates',
        './progressbarBodyView',
        './progressbarTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup.progressbar','rup.tabs','rup.button'], function(Marionette, App, ProgressbarBodyView, ProgressbarTestView, ComponentExampleCodeView){

  var ProgressbarView = Marionette.LayoutView.extend({
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

    $view.Main.show(new ProgressbarBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.components.progressbar.progressbarHtmlCodeTemplate,
      templateJs: App.Templates.demo.app.components.progressbar.progressbarJsCodeTemplate
    }));
    $view.Test.show(new ProgressbarTestView());
  }


  return ProgressbarView;
});
