define(['marionette',
	'./tabsMixtoTemplate.hbs',
	'rup.tabs'], function(Marionette, TabsMixtoTemplate){

	var TabsMixedView = Marionette.LayoutView.extend({
		template: TabsMixtoTemplate,
		ui:{
			tabs: '#tabsMixta',
		},
		onDomRefresh: fncOnDomRefresh
	});

	function fncOnDomRefresh(){

		this.ui.tabs.rup_tabs({
			tabs : [
				{i18nCaption:'pestanaUrl', url:'tab2Fragment'},
				{i18nCaption:'pestanaHtml', layer:'.estiloMixto'},
				{i18nCaption:'pestanaUrl', url:'tab3Fragment'}]
		});
	}

	return TabsMixedView;

});
