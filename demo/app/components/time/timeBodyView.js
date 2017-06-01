define(['marionette',
        'templates',
        'rup/rup.time'], function(Marionette, App){

  var TimeBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.time.timeBodyTemplate

  });

  return TimeBodyView;
});
