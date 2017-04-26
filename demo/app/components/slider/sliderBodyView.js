define(['marionette',
        'templates',
        'rup/rup.slider'], function(Marionette, App){

  var SliderBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.slider.sliderBodyTemplate

  });

  return SliderBodyView;
});
