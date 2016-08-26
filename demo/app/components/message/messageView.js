define(['marionette',
        'templates',
        'rup/rup.message'], function(Marionette, App){

  var MessageView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.message.messageTemplate,
      ui:{
        btnError: '#btnError',
        btnConfirm: '#btnConfirm',
        btnOK: '#btnOK',
        btnAlert: '#btnAlert',
        btnAlertJS: '#btnAlertJS'
      },
      events:{
        "click @ui.btnError": fncClickBtnError,
        "click @ui.btnConfirm": fncClickBtnConfirm,
        "click @ui.btnOK": fncClickBtnOK,
        "click @ui.btnAlert": fncClickAlert,
        "click @ui.btnAlertJS": fncClickBtnAlertJS
      }
  });

  function fncClickBtnError(){
    $.rup_messages("msgError", {
      title: "Error grave",
      message: "<p>Se ha producido un error a la hora de intentar guardar el registro.<br>Consulte con el administrador.</p>"
    });
  }

  function fncClickBtnConfirm(){
    $.rup_messages("msgConfirm", {
      message: "¿Está seguro que desea cancelar?",
      title: "Confirmación",
      OKFunction : fncConfirmAcceptCallback
    });
  }

  function fncClickBtnOK(){
    $.rup_messages("msgOK", {
      title: "Correcto",
      message: "Todo ha ido OK."
    });
  }

  function fncClickAlert(){
    $.rup_messages("msgAlert", {
      title: "Alerta",
      message: "Esto es una alerta."
    });
  }

  function fncClickBtnAlertJS(){
    alert("esto es un alert de javascript puro");
  }

  function fncConfirmAcceptCallback(){
    alert("Aceptar");
  }

  return MessageView;
});
