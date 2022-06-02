/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.DateBootstrapAdapter = factory(jQuery);
	}
}(this, function ($) {

	function DateBootstrapAdapter() {

	}

	DateBootstrapAdapter.prototype.NAME = 'date_bootstrap';

	DateBootstrapAdapter.prototype.initIconTrigger = function (settings) {
		// Imagen del calendario.
		settings.buttonImage = $.rup.STATICS + (settings.buttonImage ? settings.buttonImage : "/rup/css/images/calendario.svg");
		settings.buttonText = settings.buttonText;
		//Atributos NO MODIFICABLES
		//La imagen no debe ser un botón
		settings.buttonImageOnly = false;
		//Solo permitir caracteres permitidos en la máscara
		settings.constrainInput = true;
		//Mostrar patrón con foco en input y pinchando imagen
		settings.showOn = 'both';
	};

	DateBootstrapAdapter.prototype.postConfigure = function (settings) {
		if(settings.id != undefined) {
			var $self = this,
			data = $self.data('datepicker'),
			$input = data.input,
			$trigger = data.trigger,
			$div;

			$div = $('<div>').addClass('rup-date-input-group');
			$input.add($trigger).wrapAll($div);
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DateBootstrapAdapter.prototype.NAME ] = new DateBootstrapAdapter;

	return $;
}));
