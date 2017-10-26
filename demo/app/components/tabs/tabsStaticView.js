define(['marionette',
	'./tabsStaticTemplate.hbs',
	'rup.tabs'], function(Marionette, TabsStaticTemplate){

	var TabsStaticView = Marionette.LayoutView.extend({
		template: TabsStaticTemplate,
		ui:{
			tabs: '#tabsStatic'
		},
		onDomRefresh: fncOnDomRefresh

	});

	function fncOnDomRefresh(){

		this.ui.tabs.rup_tabs({
			tabs : [
				{i18nCaption:'pestana0', layer:'.estiloo'},
				{i18nCaption:'pestana1', layer:'#ejemploVisual'},
				{i18nCaption:'pestana2', layer:'.estiloo2'}]
		});
	}

	return TabsStaticView;

});
