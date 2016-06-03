App.Views = App.Views || {};

App.Views.ComboEnlazadoSimple = Backbone.View.extend({
    el: '#container',
    comboAbueloList:[],
    comboPadreObj:{},
    comboHijoObj:{},
    render: renderComboEnlazadoSimpleView,
    initialize: function(){
        this.comboAbueloList = [
			{i18nCaption: "a", value:"01"},
			{i18nCaption: "b", value:"02"},
			{i18nCaption: "g", value:"03"}
		];
        
        this.comboPadreObj = {
            "01":[{i18nCaption: "a1", value:"a1_value"},
                  {i18nCaption: "a2", value:"a2_value"}, 
                  {i18nCaption: "a3", value:"a3_value"}],
            "02":[{i18nCaption: "b1", value:"b1_value"},
                  {i18nCaption: "b2", value:"b2_value"},
                  {i18nCaption: "b3", value:"b3_value"}],
            "03":[{i18nCaption: "g1", value:"g1_value"},
                  {i18nCaption: "g2", value:"g2_value"},
                  {i18nCaption: "g3", value:"g3_value"}]
		};
        
        this.comboHijoObj = {
            "b1_value":["Bilbao","Basauri","Galdakao"],
			"b2_value":["Leioa","Las Arenas","Getxo"],
			"b3_value":["Sestao","Barakaldo","Portu"]
		};
        
    }
});

function renderComboEnlazadoSimpleView(){
    
    var template = App.Templates["app/components/combo/comboEnlazadoSimple.hbs"],
        comboSourceParamObj = {label:"desc"+$.rup_utils.capitalizedLang(), value:"code", style:"css"};
    this.$el.html(template({}));

    //LOCAL
	$('#comboAbuelo').rup_combo({
		source: this.comboAbueloList,
		selected: 2,
		blank:"0"
	}); 
	
	$('#comboPadre').rup_combo({
		parent: [ "comboAbuelo" ],
		source: this.comboPadreObj
	});
	
	$('#comboHijo').rup_combo({
		parent: [ "comboPadre" ],
		source: this.comboHijoObj
	});
	
	
	//REMOTO
	$('#comboAbueloRemoto').rup_combo({
		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
		sourceParam : comboSourceParamObj,
		selected: 2,
		blank: "0"
	});
	
	$('#comboPadreRemoto').rup_combo({
		parent: [ "comboAbueloRemoto"],
		source : "comboEnlazadoSimple/remoteEnlazadoComarca",
		sourceParam : comboSourceParamObj
	});
	
	$('#comboHijoRemoto').rup_combo({
		parent: [ "comboPadreRemoto" ],
		source : "comboEnlazadoSimple/remoteEnlazadoLocalidad",
		sourceParam : comboSourceParamObj
	});

	
	
	//MIXTO I
	$('#mixto_comboAbueloRemoto').rup_combo({
		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
		sourceParam : comboSourceParamObj,
		selected: 2,
		blank: "0"
	});
	$('#mixto_comboPadre').rup_combo({
		parent: [ "mixto_comboAbueloRemoto" ],
		source: this.comboPadreObj
	});
    
	$('#mixto_comboHijoRemoto').rup_combo({
		parent: [ "mixto_comboPadre" ],
		source : "comboEnlazadoSimple/remoteEnlazadoLocalidad",
		sourceParam : comboSourceParamObj,
	});

	
	
	//MIXTO II
	$('#mixto2_comboAbuelo').rup_combo({
		source: this.comboAbueloList,
		selected: 2,
		blank: "0"
	});
	$('#mixto2_comboPadreRemoto').rup_combo({
		parent: [ "mixto2_comboAbuelo"],
		source : "comboEnlazadoSimple/remoteEnlazadoComarca",
		sourceParam : comboSourceParamObj,
	});
	$('#mixto2_comboHijo').rup_combo({
		parent: [ "mixto2_comboPadreRemoto" ],
		source: this.comboHijoObj
	});
	
	
	// Remote group
	
	$('#remoteGroup_comboPadre').rup_combo({
		source : "comboEnlazadoSimple/remoteEnlazadoProvincia",
		sourceParam : comboSourceParamObj,
		selected: 2,
		blank: "0"
	});
	
	$('#remoteGroup_comboHijo').rup_combo({
		sourceGroup : "comboSimple/remoteGroupEnlazado",
		parent: [ "remoteGroup_comboPadre"],
		sourceParam : comboSourceParamObj,
		width: 500,
		multiselect: true
	});
}



