define(['marionette',
        'templates'], function(Marionette, App){

  var StackedHorizontalDescView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.responsiveGrid.stackedHorizontal.stackedHorizontalDescTemplate,
  });

  return StackedHorizontalDescView;
});
