define(['marionette',
        'templates',
        './mobileDesktopDescView',
        './mobileDesktopExampleView',
        '../../shared/component/componentExampleCodeView',
      ], function(Marionette, App, MobileDesktopDescView, MobileDesktopExampleView, ComponentExampleCodeView){

  var MobileDesktopView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.shared.component.rwdGridLayoutTemplate,
      regions:{
        Description: "#description",
        Example: "#rwdExample",
        Code: "#exampleCode"
      },
      onRender: fncOnRender
  });

  function fncOnRender(){
    var $view = this;

    $view.Description.show(new MobileDesktopDescView());
    $view.Example.show(new MobileDesktopExampleView());
    $view.Code.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.responsiveGrid.mobileDesktop.mobileDesktopExampleTemplate
      // templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
    }));

  }


  return MobileDesktopView;
});
