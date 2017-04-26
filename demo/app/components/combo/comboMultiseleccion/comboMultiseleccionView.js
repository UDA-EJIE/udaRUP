define(['marionette',
        'templates',
        'rup/rup.combo'], function(Marionette, App){

  var ComboMultiseleccionView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.combo.comboMultiseleccionTemplate,
    ui:{
      multicombo: "#multicombo",
      multicomboRemoto: "#multicomboRemoto",
      multicomboGrupos: "#multicomboGrupos",
      multicomboGruposRemoto: "#multicomboGruposRemoto",
      multicomboInput: "#multicomboInput",
      multicomboLoadFromSelect: "#multicomboLoadFromSelect"
    },
    languageList:[],
    languageNameList:[],
    teamList:[],
    initialize: fncInitialize,
    onDomRefresh: fncOnDomRefresh

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

  function fncOnDomRefresh(){
    var $view = this,
        comboSourceParamObj = {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"};

    $view.ui.multicombo.rup_combo({
  		source : this.languageList,
  		selected: ["perl_value", "javascript_value", 0], //value && index
  		ordered: false,
  		width: 400,
  		multiselect: true,
  		rowStriping : true
    });

  	$view.ui.multicomboRemoto.rup_combo({
  		source : "comboSimple/remote",
  		sourceParam : comboSourceParamObj,
  		selected: [1], //index
  		width: 350,
  		height: 75,
  		multiselect: true
  	});

  	$view.ui.multicomboGrupos.rup_combo({
  		sourceGroup : this.teamList,
  		width: 500,
  		height: 300,
  		multiselect: true,
  		multiOptgroupIconText: false,
  		rowStriping : true
  	});

  	$view.ui.multicomboGruposRemoto.rup_combo({
  		sourceGroup : "comboSimple/remoteGroupEnlazado",
  		sourceParam : comboSourceParamObj,
  		width: 500,
  		multiselect: true
  	});

  	$view.ui.multicomboInput.rup_combo({
  		source : this.languageNameList,
  		width: 350,
  		multiselect: true
  	});

  	$view.ui.multicomboLoadFromSelect.rup_combo({
  		source : "comboSimple/remote",
  		sourceParam : comboSourceParamObj,
  		loadFromSelect: true,
  		width: 350,
  		height: 75,
  		multiselect: true
  	});
  }


  return ComboMultiseleccionView;

});
