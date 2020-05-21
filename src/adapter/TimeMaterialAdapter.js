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

			$div = $('<div>').addClass('rup-time-input-group-material');
			$button = $('<button>').attr('type','button').addClass('ui-timepicker-trigger');
			$icon = $('<i>').attr('aria-hidden', 'true').addClass('mdi mdi-clock');

			$button.append($icon);
			
			$self.wrap($div);
			$button.insertAfter($self);
			
			// Añade los labels tras el input al que esten asociados.
			let allLabels = $('label[for="' + $self[0].id + '"]');
			$.each(allLabels, function(key, label) {
				// En caso de tener mas de un label, entrara por el if (la primera iteracion siempre se añade al dom directamente).
				if (key > 0) {
					let previousLabelLeftValue = allLabels[key - 1].offsetLeft;
					let previousLabelWidthValue = $(allLabels[key - 1]).outerWidth();
					
					$(label).css({left: '' + (previousLabelLeftValue + previousLabelWidthValue + 10) + 'px'});
					$(label).insertAfter($(allLabels[key - 1]));
				} else {
					$(label).insertAfter($button);
				}
			});
			
			$button.on('click', function(){
				if ( $('#ui-datepicker-div').css('display')==='none'){
					$self.timepicker('show');
				} else {
					$self.timepicker('hide');
				}
			});
		}
		
		// Estiliza el dialogo
		$(".ui-datepicker, .ui-datepicker-inline").addClass("material-datepicker");
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[TimeMaterialAdapter.prototype.NAME ] = new TimeMaterialAdapter;

	return $;
}));
