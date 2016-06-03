App.Views = App.Views || {};

App.Views.Spinner = Backbone.View.extend({
    el: '#container',
//    events: {
//        "click #btnDialog": "openDialog"
//    },
    render: rendeSpinnerView,
//    openDialog:openDialog,
    initialize: function(){
    }
});


function rendeSpinnerView(){
  var template = App.Templates["app/components/spinner/spinner.hbs"];
  this.$el.html(template({}));


  var $spinner = $( "#spinner" ).rup_spinner();

  $( "#disable" ).click(function() {
    if ( $spinner.spinner( "option", "disabled" ) ) {
      $spinner.spinner( "enable" );
    } else {
      $spinner.spinner( "disable" );
    }
  });
  $( "#destroy" ).click(function() {
    if ( $spinner.spinner( "instance" ) ) {
      $spinner.spinner( "destroy" );
    } else {
      $spinner.rup_spinner();
    }
  });
  $( "#getvalue" ).click(function() {
    alert( $spinner.rup_spinner( "getRupValue" ) );
  });
  $( "#setvalue" ).click(function() {
    $spinner.rup_spinner( "setRupValue", 5 );
  });

  $( "button" ).button();

}
