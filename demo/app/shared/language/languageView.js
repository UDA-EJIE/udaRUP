
define(['marionette',
	'./languageTemplate.hbs',
	'rup.base',
	'rup.utils',
	'rup.lang'], function(Marionette, LanguageTemplate){

	var HeaderView = Marionette.View.extend({
		template: LanguageTemplate,
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
