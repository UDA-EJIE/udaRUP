define(['marionette',
        'templates',
        'rup/rup.spinner'], function(Marionette, App){

  var SpinnerBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.spinner.spinnerBodyTemplate

  });

  return SpinnerBodyView;
});
