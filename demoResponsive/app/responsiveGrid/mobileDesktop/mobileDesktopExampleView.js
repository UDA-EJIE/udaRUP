define(['marionette',
        'templates'], function(Marionette, App){

  var MobileDesktopExampleView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.responsiveGrid.mobileDesktop.mobileDesktopExampleTemplate,
  });

  return MobileDesktopExampleView;
});
