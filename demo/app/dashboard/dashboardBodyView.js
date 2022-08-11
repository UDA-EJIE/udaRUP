define(['marionette',
        'templates'], function(Marionette, App){

  var DashboardBodyView = Marionette.View.extend({
      template: App.Templates.demo.app.dashboard.dashboardBodyTemplate,
  });

  return DashboardBodyView;
});
