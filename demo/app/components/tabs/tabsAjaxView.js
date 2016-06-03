App.Views = App.Views || {};

App.Views.TabsAjax = Backbone.View.extend({
    el: '#container',
    render: renderTabsAjaxView
});



function renderTabsAjaxView(){
    
    var template = App.Templates["app/components/tabs/tabsAjax.hbs"];
    this.$el.html(template({}));

   $("#tabs").rup_tabs({
		tabs : [
			{i18nCaption:"pestana0", tabs: [
				{i18nCaption:"sub00", tabs: [
					{i18nCaption:"sub000", url:"tab2Fragment"},
					{i18nCaption:"sub001", tabs: [
						{i18nCaption:"sub0010", url:"tab2Fragment"},
						{i18nCaption:"sub0011", tabs: [
							{i18nCaption:"sub00110", url:"tab2Fragment"},
							{i18nCaption:"sub00111", url:"fragmento1"}
						]}
					]},
					{i18nCaption:"sub002", url:"fragmento1"}
				]},
				{i18nCaption:"sub01", url:"fragmento1"},
				{i18nCaption:"sub02", url:"fragmento1"}
			]},
			{i18nCaption:"pestana1", tabs: [
				{i18nCaption:"sub10", url:"tab2Fragment"},
				{i18nCaption:"sub11", url:"tab2Fragment"}
			]},
			{i18nCaption:"pestana2", url:"tab2Fragment"}
			
		],
		/*disabled : {tabs: 2, pestana0: 1, pestana1: 1, sub001: 1},*/
		load : function(){
			//se recargan los tooltips
			$("[title]").rup_tooltip();
		}
	});
	
	$("#changeUrlTab").bind("click",function(event){
		$("#tabs").rup_tabs("changeUrlTab",{
			idTab: "tabs",
			position: 0,
			url: "/x21aMantenimientosWar/usuario/simpleTable1"
		});
		
		$("#tabs").rup_tabs("loadTab",{
			idTab: "tabs",
			position: 0,
			close:true
		});
	});
	
	$("#addSubPestana").bind("click",function(event){
		$("#tabs").rup_tabs("addTab",{
			close:true,
		    idTab: "pestana0",
		    position: 2,
		    label: "pestanaAna",
		    url: "/x21aMantenimientosWar/usuario/simpleTable1"
		});
	});
	
	$("#addSubLevelPestana").bind("click",function(event){
		$("#tabs").rup_tabs("addTab",{
	    	idNewTab: "pruebaSub",
	        tabs:[
				{i18nCaption:"pestana0", url:"fragmento1"},
				{i18nCaption:"pestana1", url:"tab3Fragment"},
				{i18nCaption:"pestana2", layer:".estiloo"}],
	        idTab: "tabs",
	        position: 2,
	        label: "nuevaPestaña"
		});
	});
	
	$("#addSubLevelPestanaMasPestaña").bind("click",function(event){
		$("#tabs").rup_tabs("addTab",{
	    	idNewTab: "pruebaSubAna",
	        tabs:[
				{i18nCaption:"pestana0", url:"fragmento1"},
				{i18nCaption:"pestana1", url:"tab3Fragment"},
				{i18nCaption:"pestana2", layer:".estiloo"}],
	        idTab: "pestana0",
	        position: 3,
	        label: "nuevaPestaña"
		});
	    
		$("#tabs").rup_tabs("addTab",{
			idTab: "pruebaSubAna",
			position: 3,
			label: "pestanaAna",
			url: "/x21aMantenimientosWar/usuario/simpleTable2"
		});
	});
	
	$("#addSubLevelPestana3Maint").bind("click",function(event){
		$("#tabs").rup_tabs("addTab",{
	    	idNewTab: "pruebaSub3Maint",
	        tabs:[
				{i18nCaption:"maint1", url:"/x21aMantenimientosWar/usuario/simpleTable1"},
				{i18nCaption:"maint2", url:"/x21aMantenimientosWar/usuario/simpleTable2"},
				{i18nCaption:"maint3", url:"/x21aMantenimientosWar/usuario/simpleTable3"}],
	        idTab: "pestana0",
	        position: 3,
	        label: "PestañasMaint"
		});
	});
}
