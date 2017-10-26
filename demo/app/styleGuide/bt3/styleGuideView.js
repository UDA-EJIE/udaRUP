
define(['marionette',
	'./styleGuideTemplate.hbs', 'rup.button','rup.combo'], function(Marionette, StyleGuideTemplate){

	var StyleGuideView = Marionette.LayoutView.extend({
		template: StyleGuideTemplate,
		ui:{
			rupButtons: '.rup-button',
			rupDropdown: '#dropdownHtmlListButton',
			rupCombo: '#rupCombo',
			bt3Container: '#bt3Container'
		},
		onDomRefresh: fncOnDomRefresh
	});

	function fncOnDomRefresh(){

		this.ui.rupButtons.rup_button();

		this.ui.rupDropdown.rup_button({
			dropdown:{
				dropdownListId:'dropdownHtmlList'
			}
		});

		this.ui.bt3Container.load('http://getbootstrap.com/components/ .bs-docs-container .row [role="main"]');
	}

	return StyleGuideView;

});
