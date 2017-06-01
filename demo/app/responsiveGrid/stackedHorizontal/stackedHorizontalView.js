define(['marionette',
        'templates',
        './stackedHorizontalDescView',
        './stackedHorizontalExampleView',
        '../../shared/component/componentExampleCodeView',
      ], function(Marionette, App, StackedHorizontalDescView, StackedHorizontalExampleView, ComponentExampleCodeView){

  var RwdView = Marionette.LayoutView.extend({
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

    $view.Description.show(new StackedHorizontalDescView());
    $view.Example.show(new StackedHorizontalExampleView());
    $view.Code.show(new ComponentExampleCodeView({
      templateHtml: App.Templates.demo.app.responsiveGrid.stackedHorizontal.stackedHorizontalExampleTemplate
      // templateJs: App.Templates.demo.app.components.feedback.feedbackJsCodeTemplate
    }));

  }


  return RwdView;
});
