define(['marionette',
        'templates'], function(Marionette, App){

  var MobileDesktopDescView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.responsiveGrid.mobileDesktop.mobileDesktopDescTemplate,
  });

  return MobileDesktopDescView;
});
