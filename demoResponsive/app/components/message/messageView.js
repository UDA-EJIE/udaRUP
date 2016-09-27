define(['marionette',
        'templates',
        'highlight',
        'rup/rup.message','rup/rup.tabs'], function(Marionette, App){

  var MessageView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.message.messageTemplate,
      ui:{
        btnError: '#btnError',
        btnConfirm: '#btnConfirm',
        btnOK: '#btnOK',
        btnAlert: '#btnAlert',
        btnAlertJS: '#btnAlertJS',
        buttons: "button.message-button",
        codeSnippets: "pre code"
      },
      events:{
        "click @ui.btnError": fncClickBtnError,
        "click @ui.btnConfirm": fncClickBtnConfirm,
        "click @ui.btnOK": fncClickBtnOK,
        "click @ui.btnAlert": fncClickAlert,
        "click @ui.btnAlertJS": fncClickBtnAlertJS
      },
      onDomRefresh: fncOnDomRefresh
  });

  function fncOnDomRefresh(){
    this.ui.buttons.rup_button({});

    this.ui.codeSnippets.each(function(i, block) {

      if ($(block).hasClass("html") || $(block).hasClass("javascript")){
        block.innerHTML = block.innerHTML.replace(/</g, "&lt");
      }

      hljs.highlightBlock(block);

    });

    $("#exampleMessage").rup_tabs({
      tabs : [
        {i18nCaption:"HTML", layer:"pre:has(code.html)"},
        {i18nCaption:"JavaScript", layer:"pre:has(code.javascript)"}]

    });
  }

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
