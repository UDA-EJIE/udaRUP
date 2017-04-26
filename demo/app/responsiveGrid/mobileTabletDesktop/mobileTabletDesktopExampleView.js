define(['marionette',
        'templates'], function(Marionette, App){

  var MobileTabletDesktopExampleView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.responsiveGrid.mobileTabletDesktop.mobileTabletDesktopExampleTemplate,
  });

  return MobileTabletDesktopExampleView;
});
