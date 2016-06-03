App.Views = App.Views || {};

App.Views.Slider = Backbone.View.extend({
    el: '#container',
//    events: {
//        "click #btnDialog": "openDialog"
//    },
    render: rendeSliderView,
//    openDialog:openDialog,
    initialize: function(){
    }
});


function rendeSliderView(){
  var template = App.Templates["app/components/slider/slider.hbs"];
  this.$el.html(template({}));

  $("#slider").rup_slider({});

  $("#sliderRange").rup_slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });

}
