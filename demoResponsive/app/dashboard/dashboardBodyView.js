define(['marionette',
        'templates'], function(Marionette, App){

  var DashboardBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.dashboard.dashboardBodyTemplate,
  });

  return DashboardBodyView;
});
