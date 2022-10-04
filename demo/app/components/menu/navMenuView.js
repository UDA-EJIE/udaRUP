define(['marionette',
	'./navMenuTemplate.hbs',
	'rup.navMenu'], function (Marionette, NavMenuTemplate) {

	var NavMenuView = Marionette.View.extend({
		template: NavMenuTemplate,
		ui: {
			navMenuExample: '#example',

		},
		onDomRefresh: fncOnDomRefresh
	});

	function fncOnDomRefresh() {
		
		this.ui.navMenuExample.rup_navMenu({
			navigation: true,
			visible: 3
		});

	}
	return NavMenuView;
});
