define(['marionette',
        'templates',
        'rup/rup.chart'], function(Marionette, App){

  var ChartBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.chart.chartBodyTemplate
  });

  return ChartBodyView;
});
