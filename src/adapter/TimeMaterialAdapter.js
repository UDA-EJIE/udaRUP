/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','../rup.base','../templates'], factory );
	} else {

		// Browser globals
		root.TimeMaterialAdapter = factory( jQuery );
	}
} (this,  function( $ ) {

	function TimeMaterialAdapter(){

	}

	TimeMaterialAdapter.prototype.NAME = 'time_material';

	TimeMaterialAdapter.prototype.initIconTrigger = function (settings) {
		var $self = this,
			$div, $button, $icon;

		if (!$self.is('div')){

			$div = $('<div>').addClass('rup-date-input-group-material');
			$button = $('<button>').attr('type','button').addClass('ui-timepicker-trigger');
			$icon = $('<i>').attr('aria-hidden', 'true').addClass('mdi mdi-clock');

			$button.append($icon);

			$self.wrap($div);
			$button.insertAfter($self);

			$button.on('click', function(){
				if ( $('#ui-datepicker-div').css('display')==='none'){
					$self.timepicker('show');
				} else {
					$self.timepicker('hide');
				}
			});
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[TimeMaterialAdapter.prototype.NAME ] = new TimeMaterialAdapter;

	return $;
}));
