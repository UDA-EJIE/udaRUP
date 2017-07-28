define(['marionette',
        'templates',
        'rup.spinner'], function(Marionette, App){

  var SpinnerBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.spinner.spinnerBodyTemplate

  });

  return SpinnerBodyView;
});
