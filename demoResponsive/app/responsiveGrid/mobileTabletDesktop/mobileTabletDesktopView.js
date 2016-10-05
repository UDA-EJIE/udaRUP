define(['marionette',
        'templates',
        './mobileTabletDesktopDescView',
        './mobileTabletDesktopExampleView',
        '../../shared/component/componentExampleCodeView',
      ], function(Marionette, App, MobileTabletDesktopDescView, MobileTabletDesktopExampleView, ComponentExampleCodeView){

  var MobileTabletDesktopView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.shared.component.rwdGridLayoutTemplate,
      regions:{
        Description: "#description",
        Example: "#rwdExample",
        Code: "#exampleCode"
      },
      onRender: fncOnRender
  });

  function fncOnRender(){
    var $view = this;

    $view.Description.show(new MobileTabletDesktopDescView());
    $view.Example.show(new MobileTabletDesktopExampleView());
    $view.Code.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demoResponsive.app.responsiveGrid.mobileTabletDesktop.mobileTabletDesktopExampleTemplate
      // templateJs: App.Templates.demoResponsive.app.components.feedback.feedbackJsCodeTemplate
    }));

  }


  return MobileTabletDesktopView;
});
