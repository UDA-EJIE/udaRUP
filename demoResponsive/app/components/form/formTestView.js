define(['marionette',
        'templates',
        'rup/rup.form','rup/rup.button'], function(Marionette, App){

  var FormTestView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.components.form.formTestTemplate,
      reconfigureForm: fncReconfigureForm,
      exampleFormSerialize: fncExampleFormSerialize,
      exampleFieldSerialize: fncExampleFieldSerialize,
      exampleFieldValue: fncExampleFieldValue,
      exampleResetForm: fncExampleResetForm,
      exampleClearForm: fncExampleClearForm,
      exampleClearFields: fncExampleClearFields,

      ui:{
        botonConfiguracion: '#botonConfiguracion',
        botonFormSerialize: '#botonFormSerialize',
        botonFieldValue: '#botonFieldValue',
        botonResetForm: '#botonResetForm',
        botonClearForm: '#botonClearForm',
        botonClearFields: '#botonClearFields',
        formHttpSubmit: "#formHttpSubmit",
        formMultientidades: "#formMultientidades",
        formMultientidadesMismoTipo: "#formMultientidadesMismoTipo",
        formSubidaArchivos: "#formSubidaArchivos",
        tabsForm: "#tabsFormulario",
        feedback: "#feedbackMensajes",
        inputFields: "#form input",
        errorLabels: "#formHttpSubmit label.error",
        errorInputs: "#formHttpSubmit input.error",
        validationIcons: "#formHttpSubmit img.error.rup-maint_validateIcon",
        resultadoFormSerialize: "#resultadoFormSerialize",
        resultadoFieldSerialize: "#resultadoFieldSerialize",
        fieldSexo: "#sexo",
        fieldPais: "#pais",
        fieldAutonomia: "#autonomia",
        fieldProvincia: "#provincia",
        fieldMunicipio: "#municipio",
        fieldCalle: "#calle",
        fieldFechaNacimiento: "#fechaNacimiento"
      },
      events:{
        "click @ui.botonConfiguracion": "reconfigureForm",
        "click @ui.botonFormSerialize": "exampleFormSerialize",
        "click @ui.botonFieldSerialize": "exampleFieldSerialize",
        "click @ui.botonFieldValue": "exampleFieldValue",
        "click @ui.botonResetForm": "exampleResetForm",
        "click @ui.botonClearForm": "exampleClearForm",
        "click @ui.botonClearFields": "exampleClearFields"
      },
      onAttach: fncOnAttach,
      _configureForm: _fncConfigureForm
  });

  function fncOnAttach(){
    var $view = this;
    // Definicion de las pestanas
    $view.ui.tabsForm.rup_tabs({
      tabs : [{
        i18nCaption : "ejemploYFunciones",
        layer : "#divformHttpSubmit"
      }, {
        i18nCaption : "multiplesEntidades",
        layer : "#divMultiplesEntidades"
      }, {
        i18nCaption : "subidaArchivos",
        layer : "#divSubidaFicheros"
      }]
    });

   /*
    * CREACION DE LOS COMPONENTES DEL FORMULARIO
    */

   // Feedback
   $view.ui.feedback.rup_feedback({
     type: "ok",
     closeLink: true,
     delay: 1000,
     fadeSpeed: 500,
     block:true
   });

   // Combo sexo
   $view.ui.fieldSexo.rup_combo({
     source : [
       {i18nCaption: "masculino", value:"M"},
       {i18nCaption: "femenino", value:"F"}
     ],
     i18nId:"sexo"
   });

   // Combo pais
   $view.ui.fieldPais.rup_combo({
     source : "nora/pais",
     sourceParam : {label:"dsO", value:"id"},
     blank : "0"
   });

   // Combo autonomia
   $view.ui.fieldAutonomia.rup_combo({
     source : "nora/autonomia",
     sourceParam : {label:"dsO", value:"id"},
     width : 400,
     blank : ""
   });

 //	jQuery("#formTypeCombo").rup_combo({
 //		source : [{label:"AJAX submit", value:"ajax"},{label:"HTTP submit", value:"http"}]
 //	});

   // Combo provincia
   $view.ui.fieldProvincia.rup_combo({
     parent: ["autonomia"],
     source : "../nora/provincia",
     firstLoad:[{"value":"01","label":"Alava/Araba"},{"value":"20","label":"Gipuzkoa"},{"value":"48","label":"Bizkaia"}],
     sourceParam : {label:"dsO", value:"id"},
     width : 300,
     blank : ""
   });

   // Autocomplete municipio
   $view.ui.fieldMunicipio.rup_autocomplete({
     source : "../nora/municipio",
     sourceParam : {label:"dsO", value:"id"},
     minLength: 4
   });

   // Autocomplete calle
   $view.ui.fieldCalle.rup_autocomplete({
     source : "../nora/calle",
     sourceParam : {label:"dsO", value:"id"},
     minLength: 4
   });

   // Fecha
   $view.ui.fieldFechaNacimiento.rup_date();


   /*
    * FUNCIONES
    */

   // Se muestra un feedback el caso de que se haya realizado un envio http del formulario
   //if (respuesta==="true"){
   //	$("#feedbackMensajes").rup_feedback("set","El formulario se ha enviado correctamente mediante un submit http", "ok");
   //}


   /*
    * INICIALIZACION DEL FORMULARIO
    */
   $view._configureForm();



   /*
    * EJEMPLOS DE METODOS
    */
   $view.ui.formMultientidades.rup_form({
     url:"form/multientidades",
     feedback:$("#feedbackMensajes"),
     success:function(xhr){
       $view.ui.feedback.rup_feedback("set",$.rup_utils.printMsg(jQuery.toJSON(xhr)),"ok");
     },
     validate:{
       rules:{
         "departamento.code":{digits:true}
       }
     }

   });

   $view.ui.formMultientidadesMismoTipo.rup_form({
     url:$.rup.CTX_PATH+"/patrones/form/multientidadesMismoTipo",
     feedback:$("#feedbackMensajes"),
     success:function(xhr){
       $view.ui.rup_feedback("set",$.rup_utils.printMsg(jQuery.toJSON(xhr)),"ok");
     },
     validate:{
       rules:{
         "comarca1.code":{digits:true},
         "comarca2.code":{digits:true},
         "comarca3.code":{digits:true},
         "comarca3.provincia.code":{digits:true}
       }
     }
   });

   $view.ui.formSubidaArchivos.rup_form({
     url:$.rup.CTX_PATH+"/patrones/form/subidaArchivos",
     feedback:$("#feedbackMensajes"),
     dataType: 'json',
     success:function(xhr){
       $view.ui.feedback.rup_feedback("set",$.rup_utils.printMsg(xhr),"ok");
     }
   });
  }

  // Se realiza la reconfiguracion del componente de acuerdo a los valores indicados en la seccion de configuracion
  function fncReconfigureForm(){
      var $view = this;

      $view.ui.formHttpSubmit.rup_form("destroy");
  		$view.ui.errorLabels.remove();
  		$view.ui.validationIcons.remove();
  		$view.ui.errorInputs.removeClass("error");
  		$view.ui.feedback.hide();
  		$view._configureForm();
  }

  function fncExampleFormSerialize(){
      var $view = this;
      var serializedForm = $view.ui.formHttpSubmit.rup_form("formSerialize");
      $view.ui.resultadoFormSerialize.text(serializedForm);
  }

  function fncExampleFieldSerialize(){
      var $view = this;
      var serializedFields = $view.ui.inputFields.rup_form("fieldSerialize");
      $view.ui.resultadoFieldSerialize.text(serializedFields);
  }

  function fncExampleFieldValue(){
      var $view = this;
      var serializedFields = $view.ui.inputFields.rup_form("fieldValue");
      $view.ui.resultadoFieldValue.text(serializedFields.toString());
  }

  function fncExampleResetForm(){
      var $view = this;
      $view.ui.formHttpSubmit.rup_form("resetForm");
  }

  function fncExampleClearForm(){
      var $view = this;
      $view.ui.formHttpSubmit.rup_form("clearForm");
  }

  function fncExampleClearFields(){
      var $view = this;
      $view.ui.inputFields.rup_form("clearFields");
  }

  function _fncConfigureForm(){
      var $view = this;
      // Objeto de configuracion del componente.
      var configSettings = {};

      // Propiedades de configuracion por defecto comunes a todas las posibilidades de configuracion.
      var defaultConfigSettings = {
              feedback:$("#feedbackMensajes"),
              success:function(xhr){
                  $("#feedbackMensajes").rup_feedback("set",$.rup_utils.printMsg($.parseJSON($.parseJSON(xhr))),"ok");
              }
      };

      // Creacion de la configuracion del componente de validaciones.
      var validationConfigSettings = {
          validate:{
              liveCheckingErrors:true,
              showFieldErrorAsDefault:true,
              showErrorsInFeedback:true,
              showErrorsDetailsInFeedback:true,
              feedback:$("#feedbackMensajes"),
              messages:{
                  "password_confirm":$.rup.i18n.app.validaciones.password_confirm,
                  "email_confirm":$.rup.i18n.app.validaciones.email_confirm
              },
              rules:{
                  "nombre":{required:true},
                  "apellido1":{required:true},
                  "usuario":{required:true,minlength:4},
                  "password":{required:true,minlength:4},
                  "password_confirm": {
                        equalTo: "#password"
                      },
                  "fechaNacimiento":{date: true},
                  "email":{email: true},
                  "email_confirm": {
                        equalTo: "#email"
                      },
                  "dni":{dni:true}
              }
          }
      };

      // Creacion de la configuracion del componente de formulario
      var formConfigSettings = {
          ajaxForm:{
              url:$.rup.CTX_PATH+"/patrones/form/ajax",
              success:function(){
                  $("#feedbackMensajes").rup_feedback("set","El formulario se ha enviado correctamente mediante un submit AJAX", "ok");
              }
          }
      };


      // Se conforma el objeto de configuracion final
      configSettings = $.extend(true, configSettings, defaultConfigSettings, validationConfigSettings,
              ($("#formTypeCombo").val()==="ajax"?formConfigSettings:{})
      );

      // Se realiza la creacion del componente formulario
      $("#formHttpSubmit").rup_form(configSettings);
  }




  return FormTestView;
});
