
define(['marionette',
	'./styleGuideTemplate.hbs', 'rup.button','rup.select'], function(Marionette, StyleGuideTemplate){

	var StyleGuideView = Marionette.View.extend({
		template: StyleGuideTemplate,
		ui:{
			rupButtons: '.rup-button',
			rupDropdown: '#dropdownHtmlListButton',
			rupCombo: '#rupCombo'
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

		this.ui.rupCombo.rup_select({
			loadFromSelect: true
		});
	}

	return StyleGuideView;

});
