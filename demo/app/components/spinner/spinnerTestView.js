define(['marionette',
        'templates',
        'rup.spinner','rup.button'], function(Marionette, App){

  var SpinnerTestView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.spinner.spinnerTestTemplate,
    ui:{
      spinner: "#spinner",
      btnDisable: "#disable",
      btnDestroy: "#destroy",
      btnGetValue: "#getvalue",
      btnSetValue: "#setvalue",
      btnButton: "#button"
    },
    onAttach: fncOnAttach

  });


  function fncOnAttach(){
    var $view = this;

    $view.ui.spinner.rup_spinner();

    $view.ui.btnDisable.click(function() {
      if ( $view.ui.spinner.spinner( "option", "disabled" ) ) {
        $view.ui.spinner.spinner( "enable" );
      } else {
        $view.ui.spinner.spinner( "disable" );
      }
    });
    $view.ui.btnDestroy.click(function() {
      if ( $view.ui.spinner.spinner( "instance" ) ) {
        $view.ui.spinner.spinner( "destroy" );
      } else {
        $view.ui.spinner.rup_spinner();
      }
    });
    $view.ui.btnGetValue.click(function() {
      alert( $view.ui.spinner.rup_spinner( "getRupValue" ) );
    });
    $view.ui.btnSetValue.click(function() {
      $view.ui.spinner.rup_spinner( "setRupValue", 5 );
    });

    $view.ui.btnButton.button();

  }


  return SpinnerTestView;
});
