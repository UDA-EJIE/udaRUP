define(['marionette',
        'templates',
        'rup/rup.combo'], function(Marionette, App){

  var ComboSimpleView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.combo.comboEnlazadoSimpleTemplate,
    ui:{
      comboAbuelo: "#comboAbuelo",
      comboPadre: "#comboPadre",
      comboHijo: "#comboHijo",
      comboAbueloRemoto: "#comboAbueloRemoto",
      comboPadreRemoto: "#comboPadreRemoto",
      comboHijoRemoto: "#comboHijoRemoto",
      mixto_comboAbueloRemoto: "#mixto_comboAbueloRemoto",
      mixto_comboPadre: "#mixto_comboPadre",
      mixto_comboHijoRemoto: "#mixto_comboHijoRemoto",
      mixto2_comboAbuelo: "#mixto2_comboAbuelo",
      mixto2_comboPadreRemoto: "#mixto2_comboPadreRemoto",
      mixto2_comboHijo: "#mixto2_comboHijo",
      remoteGroup_comboPadre: "#remoteGroup_comboPadre",
      remoteGroup_comboHijo: "#remoteGroup_comboHijo"
    },
    comboAbueloList:[],
    comboPadreObj:{},
    comboHijoObj:{},
    initialize: fncInitialize,
    onDomRefresh: fncOnDomRefresh

  });

  function fncInitialize(){
    this.comboAbueloList = [
      {i18nCaption: "a", value:"1"},
      {i18nCaption: "b", value:"2"},
      {i18nCaption: "g", value:"3"}
    ];

    this.comboPadreObj = {
        "1":[{i18nCaption: "a1", value:"1"},
              {i18nCaption: "a2", value:"2"},
              {i18nCaption: "a3", value:"3"}],
        "2":[{i18nCaption: "b1", value:"4"},
              {i18nCaption: "b2", value:"5"},
              {i18nCaption: "b3", value:"6"}],
        "3":[{i18nCaption: "g1", value:"7"},
              {i18nCaption: "g2", value:"8"},
              {i18nCaption: "g3", value:"9"}]
    };

    this.comboHijoObj = {
      "4":["Bilbao","Basauri","Galdakao"],
      "5":["Leioa","Las Arenas","Getxo"],
      "6":["Sestao","Barakaldo","Portu"]
    };
  }

  function fncOnDomRefresh(){
    var $view = this,
        comboSourceParamObj = {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"};

      //LOCAL
  	$view.ui.comboAbuelo.rup_combo({
  		source: this.comboAbueloList,
  		selected: 2,
  		blank:"0"
  	});

  	$view.ui.comboPadre.rup_combo({
  		parent: [ "comboAbuelo" ],
  		source: this.comboPadreObj
  	});

  	$view.ui.comboHijo.rup_combo({
  		parent: [ "comboPadre" ],
  		source: this.comboHijoObj
  	});


  	//REMOTO
  	$view.ui.comboAbueloRemoto.rup_combo({
  		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
  		sourceParam : comboSourceParamObj,
  		selected: 2,
  		blank: "0"
  	});

  	$view.ui.comboPadreRemoto.rup_combo({
  		parent: [ "comboAbueloRemoto"],
  		source : "comboEnlazadoSimple/remoteEnlazadoComarca",
  		sourceParam : comboSourceParamObj
  	});

  	$view.ui.comboHijoRemoto.rup_combo({
  		parent: [ "comboPadreRemoto" ],
  		source : "comboEnlazadoSimple/remoteEnlazadoLocalidad",
  		sourceParam : comboSourceParamObj
  	});



  	//MIXTO I
  	$view.ui.mixto_comboAbueloRemoto.rup_combo({
  		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
  		sourceParam : comboSourceParamObj,
  		selected: 2,
  		blank: "0"
  	});

  	$view.ui.mixto_comboPadre.rup_combo({
  		parent: [ "mixto_comboAbueloRemoto" ],
  		source: this.comboPadreObj
  	});

  	$view.ui.mixto_comboHijoRemoto.rup_combo({
  		parent: [ "mixto_comboPadre" ],
  		source : "comboEnlazadoSimple/remoteEnlazadoLocalidad",
  		sourceParam : comboSourceParamObj,
  	});



  	//MIXTO II
  	$view.ui.mixto2_comboAbuelo.rup_combo({
  		source: this.comboAbueloList,
  		selected: 2,
  		blank: "0"
  	});

  	$view.ui.mixto2_comboPadreRemoto.rup_combo({
  		parent: [ "mixto2_comboAbuelo"],
  		source : "comboEnlazadoSimple/remoteEnlazadoComarca",
  		sourceParam : comboSourceParamObj,
  	});

  	$view.ui.mixto2_comboHijo.rup_combo({
  		parent: [ "mixto2_comboPadreRemoto" ],
  		source: this.comboHijoObj
  	});


  	// Remote group

  	$view.ui.remoteGroup_comboPadre.rup_combo({
  		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
  		sourceParam : comboSourceParamObj,
  		selected: 2,
  		blank: "0"
  	});

  	$view.ui.remoteGroup_comboHijo.rup_combo({
  		sourceGroup : "comboSimple/remoteGroupEnlazado",
  		parent: [ "remoteGroup_comboPadre"],
  		sourceParam : comboSourceParamObj,
  		width: 500,
  		multiselect: true
  	});
  }


  return ComboSimpleView;

});
