define(['marionette',
        'templates'], function(Marionette, App){

  var MobileTabletDesktopDescView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.responsiveGrid.mobileTabletDesktop.mobileTabletDesktopDescTemplate,
  });

  return MobileTabletDesktopDescView;
});
