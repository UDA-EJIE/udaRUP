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

	DateMaterialAdapter.prototype.postConfigure = function (settings) {
		if(settings.id != undefined) {
			var $self = this,
			data = $self.data('datepicker'),
			$input = data.input,
			$trigger = data.trigger,
			$div;

			$div = $('<div>').addClass('rup-date-input-group-material');
			$input.add($trigger).wrapAll($div);
			
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
					$(label).insertAfter($trigger);
				}
			});
			
			// Estiliza el dialogo
			$(".ui-datepicker, .ui-datepicker-inline").addClass("material-datepicker");
		}
	};

	$.rup = $.rup || {};
	$.rup.adapter = $.rup.adapter || {};

	$.rup.adapter[DateMaterialAdapter.prototype.NAME ] = new DateMaterialAdapter;

	return $;
}));
