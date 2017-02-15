define(['marionette',
        'templates',
        'rup/rup.tabs'], function(Marionette, App){

  var TabsStaticView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.components.tabs.tabsStaticTemplate,
    ui:{
      tabs: "#tabsStatic"
    },
    onDomRefresh: fncOnDomRefresh

  });

  function fncOnDomRefresh(){

    this.ui.tabs.rup_tabs({
     		tabs : [
     			{i18nCaption:"pestana0", layer:".estiloo"},
     			{i18nCaption:"pestana1", layer:"#ejemploVisual"},
     			{i18nCaption:"pestana2", layer:".estiloo2"}]
    });
  }

  return TabsStaticView;

});
