define(['marionette',
        'templates',
        'rup/rup.slider'], function(Marionette, App){

  var SliderView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.slider.sliderTemplate,
    ui:{
      slider: "#slider",
      sliderRange: "#sliderRange",
      amount: "#amount"
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){
    var $view = this;

    $view.ui.slider.rup_slider({});

    $view.ui.sliderRange.rup_slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $view.ui.amount.val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });

  }

  return SliderView;
});
