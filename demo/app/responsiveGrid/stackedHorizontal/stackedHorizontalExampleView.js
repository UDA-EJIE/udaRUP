define(['marionette',
        'templates'], function(Marionette, App){

  var StackedHorizontalDescView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.responsiveGrid.stackedHorizontal.stackedHorizontalExampleTemplate,
  });

  return StackedHorizontalDescView;
});
