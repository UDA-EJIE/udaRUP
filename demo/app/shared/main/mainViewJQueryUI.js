
/**
 * @exports MainView
 */
define(['marionette',
	'./mainJQueryUITemplate.hbs',
	'shared/header/headerJQueryUIView',
	'shared/language/languageView',
	'shared/footer/footerJQueryUIView',
	'shared/menu/menuJQueryUIView'
], function(Marionette, MainJQueryUITemplate, HeaderView, LanguageView, FooterView, MenuView){

	'use strict';

	/**
     * Vista principal.
     *
     * Define el layout de la página y las diferentes regiones en las que se van a cargar las vistas que van a componer la pantalla.
     *
     *
     * @class
     * @augments Backbone.LayoutView
     * @constructor
     * @name MainView
     *
     */
	var MainView = Marionette.LayoutView.extend({/** @lends MainView.prototype */
		el: 'body',
		template: MainJQueryUITemplate,
		regions:{
			Header:'#header',
			Language: '#language',
			Menu: '#menu',
			BreadCrumb: '#breadCrumb',
			Container:'#container',
			Footer:'#footer'
		},
		onRender: fncOnRender,
		initialize: fncInitialize

	});





	function fncOnRender(){
		var $mainView = this;

		// Header
		$mainView.Header.show(new HeaderView());
		$mainView.Language.show(new LanguageView());
		$mainView.Menu.show(new MenuView());
		$mainView.Footer.show(new FooterView());


	}

	function fncInitialize(){
	}

	return MainView;
});
