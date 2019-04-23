
/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery', '../templates'], factory );
	} else {

		// Browser globals
		root.ButtonBootstrapAdapter = factory( jQuery );
	}
} (this,  function( $, Rup ) {

	function ButtonBootstrapAdapter(){

	}

	ButtonBootstrapAdapter.prototype.NAME = 'button_bootstrap';

	ButtonBootstrapAdapter.prototype.createDropdownButton = function (settings) {
		var $self = this, dropdownSettings = settings.dropdown;

		return $(Rup.Templates.rup.button.dropdownButton({
			id: $self.prop('id')+'_dropdown',
			classes: 'rup-dropdown-button'
		}));
	};

	ButtonBootstrapAdapter.prototype.createMButton = function (settings, label) {
		var $self = this, dropdownSettings = settings.dropdown;

		return $(Rup.Templates.rup.button.mbutton({
			id: $self.prop('id'),
			classes: 'rup-toolbar_menuButton ui-button ui-corner-all ui-widget rup-toolbar_menuButtonSlided',
			label: label,
			iconClasses: 'ui-button-icon ui-icon rup-toolbar_menuButtonIcon'
		}));
	};

	ButtonBootstrapAdapter.prototype.createMButtonContainer = function (settings, label) {
		var $self = this, dropdownSettings = settings.dropdown;

		return $(Rup.Templates.rup.button.mbutton-container({
			id: $self.prop('id')+'-container',
			classes: 'ui-widget ui-widget-content rup-toolbar_menuButtonContainer',
			label: label,
			iconClasses: 'ui-button-icon ui-icon rup-toolbar_menuButtonIcon'
		}));
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[ButtonBootstrapAdapter.prototype.NAME ] = new ButtonBootstrapAdapter;

	return $;
}));
