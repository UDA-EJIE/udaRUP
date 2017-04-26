define(['marionette',
        'templates',
        'rup/rup.feedback'], function(Marionette, App){

  var FeedbackBodyView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.feedback.feedbackBodyTemplate,
      ui:{
          feedbackOk: "#feedbackOk",
          feedbackAlert: "#feedbackAlert",
          feedbackError: "#feedbackError"
      },
      onShow: fncOnShow
  });

  function fncOnShow(){
    var $view = this;

    $view.ui.feedbackOk.rup_feedback({
        message:"<strong>Ok!</strong> Se ha realizado correctamente la acción solicitada.",
        type:"ok"
    });
    $view.ui.feedbackAlert.rup_feedback({
        message:"<strong>Atención!</strong> El resultado de la acción requiere su atención.",
        type:"alert"
    });
    $view.ui.feedbackError.rup_feedback({
        message:"<strong>Error!</strong> Se ha producido un error inesperado.",
        type:"error"
    });
  }

  return FeedbackBodyView;
});
