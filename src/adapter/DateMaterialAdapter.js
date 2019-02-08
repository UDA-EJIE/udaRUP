/*global jQuery */
/*global define */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {

		// AMD. Register as an anonymous module.
		define(['jquery', '../rup.base', '../templates'], factory);
	} else {

		// Browser globals
		root.DateMaterialAdapter = factory(jQuery);
	}
}(this, function ($) {

	function DateMaterialAdapter() {

	}

	DateMaterialAdapter.prototype.NAME = 'date_material';

	DateMaterialAdapter.prototype.initIconTrigger = function (settings) {
		//Imagen del calendario
		settings.buttonText = '<i class="material-icons" aria-hidden="true">&#xe8df;</i>';
		//Atributos NO MODIFICABLES
		//La imagen no debe ser un botón
		settings.buttonImageOnly = false;
		//Solo permitir caracteres permitidos en la máscara
		settings.constrainInput = true;
		//Mostrar patrón con foco en input y pinchando imagen
		settings.showOn = 'both';
	};

	DateMaterialAdapter.prototype.postConfigure = function (settings) {
		if(settings.id != undefined) {
			var $self = this,
			data = $self.data('datepicker'),
			$input = data.input,
			$trigger = data.trigger,
			$div;

			$div = $('<div>').addClass('rup-date-input-group-material');
			$input.add($trigger).wrapAll($div);
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DateMaterialAdapter.prototype.NAME ] = new DateMaterialAdapter;

	return $;
}));
