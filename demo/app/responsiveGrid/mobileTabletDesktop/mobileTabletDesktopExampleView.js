define(['marionette',
        'templates'], function(Marionette, App){

  var MobileTabletDesktopExampleView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.responsiveGrid.mobileTabletDesktop.mobileTabletDesktopExampleTemplate,
  });

  return MobileTabletDesktopExampleView;
});
