define(['marionette',
        'templates',
        'rup/validate'], function(Marionette, App){

  var ValidateView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.validate.validateTemplate,
    listaDias:[],
    configuracionBasicaValidate:{},
    _getConfiguracionBasicaValidate: _fncGetConfiguracionBasicaValidate,
    _getConfiguracionValClienteReglas: _fncGetConfiguracionValClienteReglas,
    _getConfiguracionValClienteCampos: _fncGetConfiguracionValClienteCampos,
    _getConfiguracionValServidorEjemplo1: _fncGetConfiguracionValServidorEjemplo1,
    _getConfiguracionValServidorEjemplo2: _fncGetConfiguracionValServidorEjemplo2,
    ui:{
      feedback: "#feedbackErroresValidaciones",
      tabs: "#tabsValidacion",
      botonConfiguracion: "#botonConfiguracion",
      checkLiveCheckingErrors: "#liveCheckingErrors",
      checkShowFieldErrorsTip: "#checkShowFieldErrorsTip",
      checkFeedbackError: "#checkFeedbackError",
      checkShowErrorsFeedback: "#checkShowErrorsFeedback",
      // Formulario
      formValidaciones: "#formValidaciones",
    	formValidacionComponentes: "#formValidaciones2",
      formValidacionServidor: "#formServidor",
      formValidacionServidorComplex: "#formServidor2",
      // Validaciones en cliente - Reglas de Validacion
      diaObligatorio: "#diaObligatorio",
      // Validaciones en cliente - Validacion de componentes
      autocomplete: "#autocomplete",
      comboAbueloRemoto: "#comboAbueloRemoto",
      comboPadreRemoto: "#comboPadreRemoto",
      comboHijoRemoto: "#comboHijoRemoto",
      multicombo: "#multicombo",
      comboHijoRemoto: "#comboHijoRemoto",
      fecha: "#fecha",
      fechaHora: "#fechaHora"
    },
    events:{
      "click @ui.botonConfiguracion": fncClickConfigButton
    },
    initialize: fncInitialize,
    onDomRefresh: fncOnDomRefresh
  });

  function fncInitialize(){
    var $view = this;

    $view.listaDias = [
      {i18nCaption: "lunes", value:"1"},
      {i18nCaption: "martes", value:"2"},
      {i18nCaption: "miercoles", value:"3"},
      {i18nCaption: "jueves", value:"4"},
      {i18nCaption: "viernes", value:"5"},
      {i18nCaption: "sabado", value:"6"},
      {i18nCaption: "domingo", value:"7"}
    ];
  }

  function fncOnDomRefresh(){
    var $view = this;

    $view.configuracionBasicaValidate = $view._getConfiguracionBasicaValidate();

    $view.ui.autocomplete.rup_autocomplete({
  		source : "autocomplete/remote",
  		sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code"},
  		minLength: 4
  	});


  	$view.ui.comboAbueloRemoto.rup_combo({
  		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
  		sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"},
  		blank: ""
  	});

  	$view.ui.comboPadreRemoto.rup_combo({
  		parent: [ "comboAbueloRemoto"],
  		source : "comboEnlazadoSimple/remoteEnlazadoComarca",
  		sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"},
  		blank: ""
  	});

  	$view.ui.comboHijoRemoto.rup_combo({
  		parent: [ "comboPadreRemoto" ],
  		source : "comboEnlazadoSimple/remoteEnlazadoLocalidad",
  		sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"},
  		blank: ""
  	});

  	$view.ui.multicombo.rup_combo({
  		source : this.listaDias,
  		width: 400,
  		ordered:false,
  		loadFromSelect:true,
  		multiselect:true
  	});

  	$view.ui.fecha.rup_date({
  		labelMaskId : "fecha-mask",
  		showButtonPanel : true,
  		showOtherMonths : true,
  		noWeekend : true
  		//, buttonImage : "/rup/basic-theme/images/exclamation.png"
  	});

  	$view.ui.fechaHora.rup_date({
  		datetimepicker:true,
  		labelMaskId : "fecha-mask",
  		showButtonPanel : true,
  		showOtherMonths : true,
  		noWeekend : true,
  		showSecond: false,
  		dateFormat: "dd/mm/yyyy",
  		timeFormat: 'hh:mm'

  	});


  	/*
  	 * CONFIGURACION FORMULARIO DE VALIDACIONES
  	 */

  	$view.ui.tabs.rup_tabs({
  		tabs : [{
  			i18nCaption : "validacionesCliente",
  			tabs:[{
  				i18nCaption : "reglasValidacion",
  				layer : "#divValidaciones"
  			}, {
  				i18nCaption : "validacionComponentes",
  				layer : "#divValidaciones2"
  			}]
  		}, {
  			i18nCaption : "validacionesServidor",
  			tabs:[{
  				i18nCaption : "formularioServidor",
  				layer : "#divValidaciones3"
  			}, {
  				i18nCaption : "formularioServidor2",
  				layer : "#divValidaciones4"
  			}]
  		}
  		]
  	});

  	$view.ui.diaObligatorio.rup_combo({
  		//source : ["asp", "c", "c++", "coldfusion", "groovy", "haskell", "java", "javascript", "perl", "php", "python", "ruby", "scala"],
  		source : this.listaDias,
  		width: 100,
  		ordered:false
  	});

  	$view.ui.feedback.rup_feedback({
  		type: "ok",
  		closeLink: true,
  		block:false
  	});

  	var properties={
  	};

  	var ajaxForm = {
  		success:function(a,b,c,d){
  			$view.ui.feedback.rup_feedback("set","El formulario se ha enviado correctamente.", "ok");
  		}
  	};

  	$view.ui.formValidaciones.rup_validate($view._getConfiguracionValClienteReglas());
  	$view.ui.formValidaciones.ajaxForm(ajaxForm);
  	$view.ui.formValidacionComponentes.rup_validate($view._getConfiguracionValClienteCampos());
  	$view.ui.formValidacionComponentes.ajaxForm(ajaxForm);
  	$view.ui.formValidacionServidor.rup_form($view._getConfiguracionValServidorEjemplo1());
  	$view.ui.formValidacionServidorComplex.rup_form($view._getConfiguracionValServidorEjemplo2());
  }

  function fncClickConfigButton(){
    var $view = this;

    $view.ui.formValidaciones.rup_validate("destroy");
    $view.ui.formValidacionComponentes.rup_validate("destroy");
    $view.ui.formValidacionServidor.rup_validate("destroy");
    $view.ui.formValidacionServidor.rup_form("destroy");
    $view.ui.formValidacionServidorComplex.rup_validate("destroy");
    $view.ui.formValidacionServidorComplex.rup_form("destroy");
    $view.ui.formValidaciones.rup_validate(getConfiguracionValClienteReglas());
    $view.ui.formValidaciones.ajaxForm(ajaxForm);
    $view.ui.formValidacionComponentes.rup_validate(getConfiguracionValClienteCampos());
    $view.ui.formValidacionComponentes.ajaxForm(ajaxForm);
    $view.ui.formValidacionServidor.rup_form(getConfiguracionValServidorEjemplo1());
    $view.ui.formValidacionServidorComplex.rup_form(getConfiguracionValServidorEjemplo2());
  }

  function _fncGetConfiguracionBasicaValidate(){

    var $view = this,
        configuracion_basica_validate = {
          feedback: $view.ui.feedback,
          liveCheckingErrors: $view.ui.checkLiveCheckingErrors.is(":checked"),
          showFieldErrorAsDefault: $view.ui.checkShowFieldErrorsTip.is(":checked"),
          showErrorsInFeedback: $view.ui.checkFeedbackError.is(":checked"),
          showFieldErrorsInFeedback: $view.ui.checkShowErrorsFeedback.is(":checked")
        };

    return configuracion_basica_validate;
  }

  function _fncGetConfiguracionValClienteReglas(){
    var $view = this,
        configuracion_form1 = {
          rules:{
            "campoObligatorio1":{required:true},
            "campoObligatorio2":{required:"#esObligatorio:checked"},
            "campoObligatorio3":{required:function(){
              return $("#diaObligatorio").val() > 5;
            }},
            "longitudMinima":{minlength:8},
            "longitudMaxima":{maxlength:20},
            "longitudIntervalo":{rangelength:[8,20]},
            "valorMinimo":{min:10},
            "valorMaximo":{max:30},
            "valorIntervalo":{range:[10,30]},
            "validacionEmail":{email:true},
            "validacionUrl":{url:true},
            "validacionFecha":{date:true},
            "validacionFechaISO":{dateISO:true},
            "numeroDecimal":{number:true},
            "soloDigitos":{digits:true},
            "tarjetaCredito":{creditcard:true},
            "extension":{accept: "xls|csv"},
            "clave_confirmar":{
              equalTo: "#clave"
            },
            "dni":{dni:true},
            "palabrasMaximo":{maxWords:6},
            "palabrasMinimo":{minWords:2},
            "palabrasIntervalo":{rangeWords:[2,6]},
            "letrasYPuntuacion":{letterswithbasicpunc:true},
            "alfanumerico":{alphanumeric:true},
            "soloLetras":{lettersonly:true},
            "sinEspacios":{nowhitespace:true},
            "entero":{integer:true},
            "patron":{pattern:'\\d'}
          }
        };

    return $.extend($view._getConfiguracionBasicaValidate(), configuracion_form1);
  }

  function _fncGetConfiguracionValClienteCampos(){
    var $view = this,
        configuracion_form2 = {
          rules:{
            "autocomplete":{required:true},
            "provincia":{required:true},
            "comarca":{required:true},
            "localidad":{required:true},
            "gender":{required:true},
            "agree":{required:true},
            "notificacion[]":{required:true, minlength:2},
            "multicombo":{required:true},
            "lenguaje":{required:true},
            "lenguajeMulti":{required:true, rangelength:[2,3]}
          }
        };

    return $.extend($view._getConfiguracionBasicaValidate(), configuracion_form2);
  }


  function _fncGetConfiguracionValServidorEjemplo1(){
    var $view = this,
        configuracion_validate3 = {
          feedback: $("#feedbackErroresValidaciones"),
          validate: $view._getConfiguracionBasicaValidate(),
          url:$.rup.CTX_PATH+"/patrones/validacion/servidor",
          success:function(a,b,c,d){
            $view.ui.feedback.rup_feedback("set","El formulario se ha enviado correctamente mediante un submit AJAX", "ok");
          }
        };

    return configuracion_validate3;
  }


  function _fncGetConfiguracionValServidorEjemplo2(){
    var $view = this,
        configuracion_validate4 = {
          feedback:$("#feedbackErroresValidaciones"),
          validate: $view._getConfiguracionBasicaValidate(),
          url:$.rup.CTX_PATH+"/patrones/validacion/servidor2",
          success:function(json,b,c,d){
            $view.ui.feedback.rup_feedback("set",$.rup_utils.printMsg(json), "ok");
          }
        };

    return configuracion_validate4;
  }

  return ValidateView;

});
