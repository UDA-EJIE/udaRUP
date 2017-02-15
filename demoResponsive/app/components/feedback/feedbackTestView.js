define(['marionette',
        'templates',
        'rup/rup.feedback','rup/rup.button'], function(Marionette, App){

  var FeedbackTestView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.feedback.feedbackTestTemplate,
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
          buttons:"button.feedback-test-button"

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
      }

  });

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


  return FeedbackTestView;
});
