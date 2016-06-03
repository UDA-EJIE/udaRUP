App.Views = App.Views || {};

App.Views.TabsStatic = Backbone.View.extend({
    el: '#container',
    render: renderTabsStaticView,
});



function renderTabsStaticView(){
    
    var template = App.Templates["app/components/tabs/tabsStatic.hbs"];
    this.$el.html(template({}));

   $("#tabsStatic").rup_tabs({
		tabs : [
			{i18nCaption:"pestana0", layer:".estiloo"},
			{i18nCaption:"pestana1", layer:"#ejemploVisual"},
			{i18nCaption:"pestana2", layer:".estiloo2"}]
	});
}
