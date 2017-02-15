define(['marionette',
        'templates',
        'rup/rup.progressbar'], function(Marionette, App){

  var ProgressbarView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.progressbar.progressbarTemplate,
    ui:{
      progressbar: "#progressbar",
      progressbarLabel: "#progressbarLabel",
      progressbarValueFalse: "#progressbarValueFalse"
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){

      var $view = this;

      $view.ui.progressbar.rup_progressbar({
        value: 37
      });

      $view.ui.progressbarLabel.rup_progressbar({
        value: 37,
        label: $.rup.i18n.base.rup_progressbar.progress
      });

      $view.ui.progressbarValueFalse.rup_progressbar({
        value: false,
        label: $.rup.i18n.base.rup_progressbar.loading
      });
  }

  return ProgressbarView;
});
