define(['marionette',
        'templates',
        '../../shared/component/componentLayoutView',
        // 'highlight',
        // 'highlight-html',
        'rup/rup.feedback','rup/rup.tabs','rup/rup.button'], function(Marionette, App, ComponentLayoutView){

  var FeedbackView = ComponentLayoutView.extend({
      // template: App.Templates.demoResponsive.app.components.feedback.feedbackTemplate,
      create: fncCreate,
      destroy: fncDestroy,
      set: fncSet,
      setOptions: fncSetOptions,
      setType: fncSetType,
      setImageClass: fncSetImageClass,
      setHide: fncHide,
      setClose: fncClose,
      setShow: fncShow,
      _getOptions: fncGetOptions,
      ui:{
          feedback: "#feedback",
          btnCreate: "#boton_create",
          btnDestroy: "#boton_destroy",
          btnSet: "#boton_set",
          btnSetOptions: "#boton_setOptions",
          btnSetType: "#boton_setType",
          btnSetImageClass: "#boton_setImgClass",
          btnHide: "#boton_hide",
          btnClose: "#boton_close",
          btnShow: "#boton_show",
          selectType: "#feedback_type",
          selectGotoTop: "#feedback_gotoTop",
          selectBlock: "#feedback_block",
          selectCloseLink: "#feedback_closeLink",
          txtImageClass: "#feedback_imgClass",
          txtDelay: "#feedback_delay",
          txtFadeSpeed: "#feedback_fadeSpeed",
          feedbackOk: "#feedbackOk",
          feedbackAlert: "#feedbackAlert",
          feedbackError: "#feedbackError",
          // codeSnippets: "pre code",
          buttons:"button.feedback-test-button"

      },
      regionTemplates:{
          MainBodyTemplate: App.Templates.demoResponsive.app.components.feedback.feedbackMainBody,
          HtmlExampleTemplate: App.Templates.demoResponsive.app.components.feedback.feedbackHtmlExampleTemplate,
          JsExampleTemplate: App.Templates.demoResponsive.app.components.feedback.feedbackJsExampleTemplate,
          TestViewTemplate: App.Templates.demoResponsive.app.components.feedback.feedbackTestExampleTemplate
      },
      events: {
          "click @ui.btnCreate": "create",
          "click @ui.btnDestroy": "destroy",
          "click @ui.btnSet": "set",
          "click @ui.btnSetOptions": "setOptions",
          "click @ui.btnSetType": "setType",
          "click @ui.btnSetImageClass": "setImageClass",
          "click @ui.btnHide": "hide",
          "click @ui.btnClose": "close",
          "click @ui.btnShow": "show"
      },
      onAfter: fncOnAfterDomRefresh
  });

  function fncOnAfterDomRefresh(){
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


    $view.ui.buttons.rup_button({});

    // $view.ui.codeSnippets.each(function(i, block) {
    //
    //   if ($(block).hasClass("html") || $(block).hasClass("javascript")){
    //     block.innerHTML = block.innerHTML.replace(/</g, "&lt");
    //   }
    //
    //   hljs.highlightBlock(block);
    //
    // });
    //
    // $("#exampleTabs").rup_tabs({
    //   tabs : [
    //     {i18nCaption:"HTML", layer:"pre:has(code.html)"},
    //     {i18nCaption:"JavaScript", layer:"pre:has(code.javascript)"}]
    //
    // });

  }

  function fncCreate(){
      this.ui.feedback.rup_feedback(this._getOptions());
      this.ui.btnCreate.attr("disabled",true);
      this.ui.btnDestroy.attr("disabled",false);
  }
  function fncDestroy(){
      this.ui.feedback.rup_feedback("destroy");
      this.ui.btnDestroy.attr("disabled",true);
      this.ui.btnCreate.attr("disabled",false);
  }
  function fncSet(){
      this.ui.feedback.rup_feedback("set","Este es un ejemplo de <b>Feedback</b>");
  }
  function fncSetOptions(){
      this.ui.feedback.rup_feedback("option",this._getOptions());
  }
  function fncSetType(){
      this.ui.feedback.rup_feedback("set",
              "Este es un ejemplo de cambio de tipo de <b>Feedback</b>",
              this.ui.selectType.val()==""?null:this.ui.selectType.val()
      );
  }
  function fncSetImageClass(){
      this.ui.feedback.rup_feedback("set",
              "Este es un ejemplo de cambio de tipo por imgClass del <b>Feedback</b>",
              null,
              this.ui.txtImageClass.val()
      );
  }
  function fncHide(){
      this.ui.feedback.rup_feedback("hide",
              this.ui.txtDelay.val()==""?null:this.ui.txtDelay.val(),
              this.ui.txtFadeSpeed.val()==""?null:this.ui.txtFadeSpeed.val()
      );
  }
  function fncClose(){
      this.ui.feedback.rup_feedback("close");
  }
  function fncShow(){
      this.ui.feedback.rup_feedback("show");
  }

  function fncGetOptions(){
      //Recuperar variables
      var my_type = this.ui.selectType.val()==""?null:this.ui.selectType.val(),
          my_imgClass = this.ui.txtImageClass.val()==""?null:this.ui.txtImageClass.val(),
          my_delay = this.ui.txtDelay.val()==""?null: this.ui.txtDelay.val(),
          my_fadeSpeed = this.ui.txtFadeSpeed.val()==""?null: this.ui.txtFadeSpeed.val(),
          my_gotoTop = eval(this.ui.selectGotoTop.val()),
          my_block = eval(this.ui.selectBlock.val()),
          my_closeLink = eval(this.ui.selectCloseLink.val()),
          //Parametros feedback
          properties = {
              type: my_type,
              imgClass: my_imgClass,
              delay: my_delay,
              fadeSpeed: my_fadeSpeed,
              gotoTop: my_gotoTop,
              block: my_block,
              closeLink: my_closeLink,
              message: "Este es un ejemplo de <b>Feedback</b> con message cargado en el create()"
          };
      return properties;
  }

  return FeedbackView;
});
