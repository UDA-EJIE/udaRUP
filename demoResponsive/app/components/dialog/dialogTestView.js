define(['marionette',
        'templates',
        'rup/rup.dialog','rup/rup.button'], function(Marionette, App){

  var DialogTestView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.dialog.dialogTestTemplate,
      openDialog: fncOpenDialog,
      openAjaxDialogWar: fncOpenAjaxDialogWar,
      openAjaxDialogStatics: fncOpenAjaxDialogStatics,
      openBtnTextDialog: fncOpenBtnTextDialog,
      ui:{
        dialog: "#idDialog",
        btnDialog: "#btnDialog",
        btnAjaxDialogWAR: "#btnAjaxDialogWAR",
        btnAjaxDialogStatics: "#btnAjaxDialogStatics",
        btnTextDialog: "#btnTextDialog"
      },
      events: {
          "click @ui.btnDialog": "openDialog",
          "click @ui.btnAjaxDialogWAR": "openAjaxDialogWar",
          "click @ui.btnAjaxDialogStatics": "openAjaxDialogStatics",
          "click @ui.btnTextDialog": "openBtnTextDialog"

      },
      onAttach: fncOnAttach

  });

  function fncOnAttach(){
    var $view = this;

    $view.ui.dialog.rup_dialog({
        type: $.rup.dialog.DIV,
        autoOpen: false,
        modal: true,
        resizable: true,
        width:"90%",
        position:null,
        appendTo :'#container',
        title: "Título del dialog (div)",
        buttons: [{
                text: "Aceptar",
                click: function () {
                    $view.ui.dialog.dialog("close");
                }
            },
            {
                text: "Enviar",
                click: function () {
                    $view.ui.dialog.dialog("close");
                }
            },
            {
                text: "Abandonar",
                click: function () {
                    $view.ui.dialog.dialog("close");
                },
                btnType: $.rup.dialog.LINK
            }
        ]
        //,position: { my: "left top", at: "left bottom", of: $("#btnAjaxDialogWAR") }
    });
  }

  function fncOpenDialog(){
    console.log("hez");
    this.ui.dialog.rup_dialog("open");
  }

  function fncOpenAjaxDialogWar(){
    $(document).rup_dialog({
        type: $.rup.dialog.AJAX,
        url: "dialog/dialogAjax" ,
        autoOpen: true,
        modal: true,
        width: "650",
        resizable: true,
        title: "Diálogo Ajax (War)",
        buttons: [{
            text: "Aceptar",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });
  }

  function fncOpenAjaxDialogStatics(){
    $(document).rup_dialog({
        type: $.rup.dialog.AJAX,
        url: "app/components/dialog/ajaxDiv.htm",
        autoOpen: true,
        modal: true,
        draggable: true,
        width:"none",
        position:null,
        resizable: false,
        dialogClass: "rup-dialog-responsive",
        title: "Diálogo Ajax (Statics)",
        buttons: [{
            text: "Aceptar",
            click: function () {
                $(this).dialog("close");
            }
        }]
    });
  }

  function fncOpenBtnTextDialog(){
    $(document).rup_dialog({
        type: $.rup.dialog.TEXT,
        autoOpen: true,
        modal: true,
        resizable: true,
        title: "Título del dialog (text) ",
        message: "Se esta creando un div con el mensaje puesto por parametro."
    });
  }



  return DialogTestView;
});
