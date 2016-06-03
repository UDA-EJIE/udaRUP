App.Views = App.Views || {};

App.Views.TabsMixto= Backbone.View.extend({
    el: '#container',
    render: renderTabsMixtoView,
});



function renderTabsMixtoView(){
    
    var template = App.Templates["app/components/tabs/tabsMixto.hbs"];
    this.$el.html(template({}));

  	$("#tabsMixta").rup_tabs({
		tabs : [
			{i18nCaption:"pestanaUrl", url:"tab2Fragment"},
			{i18nCaption:"pestanaHtml", layer:".estiloMixto"},
			{i18nCaption:"pestanaUrl", url:"tab3Fragment"}]
	});
}
