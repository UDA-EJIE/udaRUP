define(['marionette',
        'templates',
        './autocompleteBodyView',
        './autocompleteTestView',
        '../../shared/component/componentExampleCodeView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.autocomplete','rup/rup.tabs','rup/rup.button'], function(Marionette, App, AutocompleteBodyView, AutocompleteTestView, ComponentExampleCodeView){

  var AutocompleteView = Marionette.LayoutView.extend({
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

    $view.Main.show(new AutocompleteBodyView());
    $view.Example.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.components.autocomplete.autocompleteHtmlCodeTemplate,
      templateJs: App.Templates.demoResponsive.app.components.autocomplete.autocompleteJsCodeTemplate
    }));
    $view.Test.show(new AutocompleteTestView());
  }


  return AutocompleteView;
});
