define(['marionette',
        'templates',
        'rup/rup.slider'], function(Marionette, App){

  var SliderBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.slider.sliderBodyTemplate

  });

  return SliderBodyView;
});
