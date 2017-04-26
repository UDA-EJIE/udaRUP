define(['marionette',
        'templates'], function(Marionette, App){

  var MobileDesktopDescView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.responsiveGrid.mobileDesktop.mobileDesktopDescTemplate,
  });

  return MobileDesktopDescView;
});
