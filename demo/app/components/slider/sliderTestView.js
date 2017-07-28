define(['marionette',
        'templates',
        'rup.slider','rup.button'], function(Marionette, App){

  var SliderTestView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.slider.sliderTestTemplate,
    ui:{
      slider: "#slider",
      sliderRange: "#sliderRange",
      amount: "#amount"
    },
    onAttach: fncOnAttach

  });

  function fncOnAttach(){
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


  return SliderTestView;
});
