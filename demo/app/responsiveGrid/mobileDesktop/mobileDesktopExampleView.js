define(['marionette',
        'templates'], function(Marionette, App){

  var MobileDesktopExampleView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.responsiveGrid.mobileDesktop.mobileDesktopExampleTemplate,
  });

  return MobileDesktopExampleView;
});
