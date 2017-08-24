define(['marionette',
	'./tabsScrollableTemplate.hbs',
	'rup.tabs'], function(Marionette, TabsScrollableTemplate){

	var TabsScrollableView = Marionette.LayoutView.extend({
		template: TabsScrollableTemplate,
		ui:{
			tabs: '#tabsScrollableExample'
		},
		onDomRefresh: fncOnDomRefresh

	});

	function fncOnDomRefresh(){

		this.ui.tabs.rup_tabs({
			scrollable:true,
			close:true,
			tabs : [
				{i18nCaption:'pestana1', layer:'#tabs-1-3'},
				{i18nCaption:'pestana2', layer:'#tabs-2-3'},
				{i18nCaption:'pestana3', layer:'#tabs-3-3'},
				{i18nCaption:'pestana3', layer:'#tabs-4-3'},
				{i18nCaption:'pestana4', layer:'#tabs-5-3'},
				{i18nCaption:'pestana5', layer:'#tabs-6-3'},
				{i18nCaption:'pestana6', layer:'#tabs-7-3'},
				{i18nCaption:'pestana7', layer:'#tabs-8-3'},
				{i18nCaption:'pestana8', layer:'#tabs-9-3'},
				{i18nCaption:'pestana9', layer:'#tabs-10-3'},
				{i18nCaption:'pestana10', layer:'#tabs-11-3'},
				{i18nCaption:'pestana11', layer:'#tabs-12-3'},
				{i18nCaption:'pestana12', layer:'#tabs-13-3'},
				{i18nCaption:'pestana13', layer:'#tabs-14-3'},
				{i18nCaption:'pestana14', layer:'#tabs-15-3'},
				{i18nCaption:'pestana15', layer:'#tabs-16-3'},
				{i18nCaption:'pestana16', layer:'#tabs-17-3'},
				{i18nCaption:'pestana17', layer:'#tabs-18-3'},
				{i18nCaption:'pestana18', layer:'#tabs-19-3'},
				{i18nCaption:'pestana19',  url:'tab3Fragment'}
			]
		});
	}

	return TabsScrollableView;

});
