
define(['marionette',
	'templates',
	'rup.base',
	'rup.utils',
	'rup.lang'], function(Marionette, App){

	var HeaderView = Marionette.LayoutView.extend({
		template: App.Templates.demo.app.shared.language.languageTemplate,
		ui:{
			languageSelector: '#x21aResponsiveWar_language'
		},
		onDomRefresh: fncOnDomRefresh
	});

	function fncOnDomRefresh(){
		var $view = this;

		$view.ui.languageSelector.rup_language({languages: jQuery.rup.AVAILABLE_LANGS_ARRAY});
	}

	return HeaderView;

});
