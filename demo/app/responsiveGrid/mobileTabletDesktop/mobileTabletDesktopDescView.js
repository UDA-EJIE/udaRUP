define(['marionette',
        'templates'], function(Marionette, App){

  var MobileTabletDesktopDescView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.responsiveGrid.mobileTabletDesktop.mobileTabletDesktopDescTemplate,
  });

  return MobileTabletDesktopDescView;
});
