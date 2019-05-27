/*global jQuery */
/*global define */

( function(root, factory ) {
	if ( typeof define === 'function' && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ['jquery','../rup.base','../templates'], factory );
	} else {

		// Browser globals
		root.TimeBootstrapAdapter = factory( jQuery );
	}
} (this,  function( $ ) {

	function TimeBootstrapAdapter(){

	}

	TimeBootstrapAdapter.prototype.NAME = 'time_bootstrap';

	TimeBootstrapAdapter.prototype.initIconTrigger = function (settings) {
		var $self = this,
			$div, $button, $icon;

		if (!$self.is('div')){

			$div = $('<div>').addClass('rup-time-input-group');
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

			// $("<img>").addClass("ui-timepicker-trigger")
			//   .attr({
			//     "src":settings.buttonImage,
			//     "alt":$.rup.i18nParse($.rup.i18n.base,"rup_time.buttonText"),
			//     "title":$.rup.i18nParse($.rup.i18n.base,"rup_time.buttonText")
			//   })
			// .click(function(){
			//   if ( $("#ui-datepicker-div").css("display")==="none"){
			//     $self.timepicker("show");
			//   } else {
			//     $self.timepicker("hide");
			//   }
			// })
			// .insertAfter($self);
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[TimeBootstrapAdapter.prototype.NAME ] = new TimeBootstrapAdapter;

	return $;
}));
