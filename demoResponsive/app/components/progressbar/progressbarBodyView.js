define(['marionette',
        'templates',
        'rup/rup.progressbar'], function(Marionette, App){

  var ProgressbarBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.progressbar.progressbarBodyTemplate

  });

  return ProgressbarBodyView;
});
