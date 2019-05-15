/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','../rup.base'], factory );
	} else {

		// Browser globals
		root.ButtonJQueryUIAdapter = factory( jQuery );
	}
} (this,  function( $ ) {

	function ButtonJQueryUIAdapter(){

	}

	ButtonJQueryUIAdapter.prototype.NAME = 'button_jqueryui';

	ButtonJQueryUIAdapter.prototype.createDropdownButton = function (settings) {

		var $self = this, dropdownSettings = settings.dropdown;
		return jQuery('<button>').attr({
			type: 'button',
			id: $self.prop('id')+'_dropdown'

		}).text('Administración de filtros').button({
			icons:{
				primary: dropdownSettings.dropdownIcon
			},
			text: false
		}).addClass('rup-dropdown-button');
	};


	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[ButtonJQueryUIAdapter.prototype.NAME ] = new ButtonJQueryUIAdapter;

	return $;
}));
