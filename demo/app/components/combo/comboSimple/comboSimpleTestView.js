define(['marionette',
        'templates',
        'rup/rup.combo','rup/rup.button'], function(Marionette, App){

  var ComboSimpleTestView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.components.combo.comboSimple.comboSimpleTestTemplate,
      ui:{
        comboLocal: "#combo",
        comboRemoto: "#comboRemoto",
        comboLargo: "#comboLargo",
        comboGrupos: "#comboGrupos",
        comboGruposRemoto: "#comboGruposRemoto",
        comboImgs: "#comboImgs",
        comboInput: "#comboInput",
        comboLoadFromSelect: "#comboLoadFromSelect"
      },
      languageList:[],
      personList:[],
      actionList:[],
      teamList:[],
      initialize: fncInitialize,
      onAttach: fncOnAttach

    });

    function fncInitialize(){
      this.languageList = [
  			{i18nCaption: "asp", value:"asp_value"},
  			{i18nCaption: "c", value:"c_value"},
  			{i18nCaption: "c++", value:"c++_value"},
  			{i18nCaption: "coldfusion", value:"coldfusion_value"},
  			{i18nCaption: "groovy", value:"groovy_value"},
  			{i18nCaption: "haskell", value:"haskell_value"},
  			{i18nCaption: "java", value:"java_value"},
  			{i18nCaption: "javascript", value:"javascript_value"},
  			{i18nCaption: "perl", value:"perl_value"},
  			{i18nCaption: "php", value:"php_value"},
  			{i18nCaption: "python", value:"python_value"},
  			{i18nCaption: "ruby", value:"ruby_value"},
  			{i18nCaption: "scala", value:"scala_value"}
  		];

      this.personList = [
  			{i18nCaption: "jon_doe", value:"jon"},
  			{i18nCaption: "jane_doe", value:"jane"},
  			{i18nCaption: "joseph_doe", value:"joseph"},
  			{i18nCaption: "mad_doe", value:"mad"}
  		];

      this.actionList = ["Borrar", "Filtrar", "Imprimir"];

      this.teamList = [
  			{"futbol" : [
  				{i18nCaption: "alaves", value:"alaves_value", style:"delete"},
  				{i18nCaption: "ath", value:"ath_value", style:"filter"},
  				{i18nCaption: "real", value:"real_value", style:"print"}
  			]},
  			{"baloncesto" : [
  				{i18nCaption: "laboral", value:"laboral_value"},
  				{i18nCaption: "bilbao", value:"bilbao_value"},
  				{i18nCaption: "lagun aro", value:"lagun aro_value"}
  			]},
  			{"formula1" : [
  				{i18nCaption: "falonso", value:"falonso_value"},
  				{i18nCaption: "hamilton", value:"hamilton_value"},
  				{i18nCaption: "vettel", value:"vettel_value"}
  			]}
  		];

      this.languageNameList = ["asp", "c", "c++", "coldfusion", "groovy", "haskell", "java", "javascript", "perl", "php", "python", "ruby", "scala"];
    }

    function fncOnAttach(){
      var $view = this;

      $view.ui.comboLocal.rup_combo({
    		source : this.languageList,
    		selected: "perl_value",
    		width: 300,
    		blank : "0",
    		rowStriping : true,
    		inputText:true
    	});


    	$view.ui.comboRemoto.rup_combo({
    		source : "comboSimple/remote",
    		sourceParam : {
                label:"desc"+$.rup_utils.capitalizedLang(),
                value:"code",
                style:"css"},
    		selected: "3",
    		width: 300
    	});


    	$view.ui.comboLargo.rup_combo({
    		/*source: ["John Doe - 78 West Main St Apt 3A | Bloomsburg, PA 12345 (footer text)",
    				"Jane Doe - 78 West Main St Apt 3A | Bloomsburg, PA 12345 (footer text)",
    				"Joseph Doe - 78 West Main St Apt 3A | Bloomsburg, PA 12345 (footer text)",
    				"Mad Doe Kiiid - 78 West Main St Apt 3A | Bloomsburg, PA 12345 (footer text)"
    		],*/
    		source : this.personList,
    		selected: "joseph",
    		width: 400,
    		format: "default"
    	});


    	$view.ui.comboGrupos.rup_combo({
    		sourceGroup : this.teamList,
    		selected: "real_value",
    		rowStriping : true
    	});

    	$view.ui.comboGruposRemoto.rup_combo({
    		sourceGroup : "comboSimple/remoteGroup",
    		sourceParam : {
                label:"desc"+$.rup_utils.capitalizedLang(),
                value:"code",
                style:"css"},
    		selected: "7",
    		width: 300
    	});


    	$view.ui.comboImgs.rup_combo({
    		source : this.actionList,
    		imgs : [
    			{Borrar: "delete"},
    			{Filtrar: "filter"},
    			{Imprimir: "print"}
    		],
    		selected: "Filtrar"
    	});

    	$view.ui.comboInput.rup_combo({
    		source : this.languageNameList,
    		width: 300
    	});

    	$view.ui.comboLoadFromSelect.rup_combo({
    		source : "comboSimple/remote",
    		sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"},
    		loadFromSelect: true,
    		width: 300,
    		height: 75
    	});
    }




  return ComboSimpleTestView;
});
