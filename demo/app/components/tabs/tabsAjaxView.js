define(['marionette',
        'templates',
        'rup/rup.tabs', 'rup/rup.tooltip'], function(Marionette, App){

  var TabsAjaxView = Marionette.LayoutView.extend({
    template: App.Templates.demoResponsive.app.components.tabs.tabsAjaxTemplate,
    ui:{
      tabs: "#tabs",
      tootltipElems: "[title]",
      btnChangeUrlTab: "#changeUrlTab",
      btnAddSubTab: "#addSubPestana",
      btnAddSubLevelTab1: "#addSubLevelPestana",
      btnAddSubLevelTab2: "#addSubLevelPestanaMasPestaña",
      btnAddSubLevelTab3: "#addSubLevelPestana3Maint"
    },
    events:{
      "click @ui.btnChangeUrlTab": fncBtnChangeUrlTabClick,
      "click @ui.btnAddSubTab": fncBtnAddSubTabClick,
      "click @ui.btnAddSubLevelTab1": fncBtnAddSubLevelTab1Click,
      "click @ui.btnAddSubLevelTab2": fncBtnAddSubLevelTab2Click,
      "click @ui.btnAddSubLevelTab3": fncBtnAddSubLevelTab3Click
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){
    var $view = this;

    $view.ui.tabs.rup_tabs({
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
       $view.ui.tootltipElems.rup_tooltip();
     }
   });
  }

  function fncBtnChangeUrlTabClick(){
    this.ui.tabs.rup_tabs("changeUrlTab",{
      idTab: "tabs",
      position: 0,
      url: "/x21aMantenimientosWar/usuario/simpleTable1"
    });

    this.ui.tabs.rup_tabs("loadTab",{
      idTab: "tabs",
      position: 0,
      close:true
    });
  }

  function fncBtnAddSubTabClick(){
    this.ui.tabs.rup_tabs("addTab",{
      close:true,
        idTab: "pestana0",
        position: 2,
        label: "pestanaAna",
        url: "/x21aMantenimientosWar/usuario/simpleTable1"
    });
  }

  function fncBtnAddSubLevelTab1Click(){
    this.ui.tabs.rup_tabs("addTab",{
        idNewTab: "pruebaSub",
          tabs:[
        {i18nCaption:"pestana0", url:"fragmento1"},
        {i18nCaption:"pestana1", url:"tab3Fragment"},
        {i18nCaption:"pestana2", layer:".estiloo"}],
          idTab: "tabs",
          position: 2,
          label: "nuevaPestaña"
    });
  }

  function fncBtnAddSubLevelTab2Click(){
    this.ui.tabs.rup_tabs("addTab",{
        idNewTab: "pruebaSubAna",
          tabs:[
        {i18nCaption:"pestana0", url:"fragmento1"},
        {i18nCaption:"pestana1", url:"tab3Fragment"},
        {i18nCaption:"pestana2", layer:".estiloo"}],
          idTab: "pestana0",
          position: 3,
          label: "nuevaPestaña"
    });

    this.ui.tabs.rup_tabs("addTab",{
      idTab: "pruebaSubAna",
      position: 3,
      label: "pestanaAna",
      url: "/x21aMantenimientosWar/usuario/simpleTable2"
    });
  }

  function fncBtnAddSubLevelTab3Click(){

    this.ui.tabs.rup_tabs("addTab",{
        idNewTab: "pruebaSub3Maint",
          tabs:[
        {i18nCaption:"maint1", url:"/x21aMantenimientosWar/usuario/simpleTable1"},
        {i18nCaption:"maint2", url:"/x21aMantenimientosWar/usuario/simpleTable2"},
        {i18nCaption:"maint3", url:"/x21aMantenimientosWar/usuario/simpleTable3"}],
          idTab: "pestana0",
          position: 3,
          label: "PestañasMaint"
    });
  }

  return TabsAjaxView;

});
