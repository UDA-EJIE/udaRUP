/*!
 * Copyright 2013 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/*global jQuery */

/**
 * Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.
 *
 * @summary Plugin de filtrado múltiple del componente RUP Table.
 * @module rup_jqtable/fluid
 * @deprecated
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["fuild"],
 * 	fuild:{
 * 		// Propiedades de configuración del plugin fuild
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('fluid',{
		loadOrder:5,
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureFluid', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión del diseño líquido del componente.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.$fluidBaseLayer : Referencia a la capa que se tomará como base para aplicar el diseño líquido.
	 *
	 */
	jQuery.fn.rup_jqtable('extend',{
		/*
		 * Realiza la configuración interna necesaria para la gestión correcta de la edición mediante un formulario.
		 *
		 * TODO: internacionalizar mensajes de error.
		 */
		/**
		* Metodo que realiza la post-configuración del plugin fuild del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureFluid
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureFluid: function(settings){
			var $self = this, $fluidBaseLayer;

			settings.fluid.baseLayer = $.rup_utils.getJQueryId(settings.fluid.baseLayer!==null?settings.fluid.baseLayer:settings.id+'_div');
			settings.fluid.$baseLayer = jQuery(settings.fluid.baseLayer);
			if (settings.fluid.$baseLayer.length===0){
				alert('El identificador '+settings.baseLayer+' especificado para la capa sobre la que se va a aplicar el diseño líquido no existe.');
				return;
			}

			$fluidBaseLayer = settings.fluid.fluidBaseLayer = settings.fluid.$baseLayer;

			// Tratamiento del evento de redimiensionado del diseño líquido de la tabla
			$self.bind('fluidWidth.resize', function(event, previousWidth, currentWidth){
				if ($self.is(':visible')){
					var feedBackPaddingLeft, feedBackPaddingRight, toolbarPaddingLeft, toolbarPaddingRight;
					$self.setGridWidth(currentWidth);

					// Se redimensionan las capas contenidas en el mantenimiento
					$fluidBaseLayer.children().width(currentWidth);
					//						prop.searchForm.parent().width(currentWidth+3)
					// Se redimensiona el feedback
					if (settings.$feedback){
						feedBackPaddingLeft = parseInt(settings.$feedback.css('padding-left'));
						feedBackPaddingRight = parseInt(settings.$feedback.css('padding-right'));
						settings.$feedback.width(currentWidth - (feedBackPaddingLeft+feedBackPaddingRight));
					}

					// Se redimensiona la toolbar
					if (settings.$toolbar){
						toolbarPaddingLeft = parseInt(settings.$toolbar.css('padding-left'));
						toolbarPaddingRight = parseInt(settings.$toolbar.css('padding-right'));
						settings.$toolbar.width(currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
						settings.$toolbar.css('width', currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					}
				}
			});

			//			$self.fluidWidth({
			//				fluidBaseLayer:settings.fluid.baseLayer,
			//				minWidth: 100,
			//				maxWidth: 2000,
			//				fluidOffset : 0
			//			});

			$self.fluidWidth(settings.fluid);

			$self.on('rupTable_fluidUpdate', function(event){
				$self.fluidWidth(settings.fluid);
			});

		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	 * Parámetros de configuración por defecto para el plugin fluid.
	 *
	 */
	/**
 	* @description Propiedades de configuración del plugin multifilter del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {string} [baseLayer] - Identificador de la capa que contiene al componente. Se tomará como base para redimensionar las diferentes partes de la tabla. En caso de no indicarse se tomará por defecto una generada con el patrón identificadorTabla+”_div”.
 	* @property {integer} [minWidth=100] - Determina la anchura máxima a la que se va a redimensionar la capa.
 	* @property {integer} [maxWidth=2000] -  Determina la anchura mínima a la que se va a redimensionar la capa.
 	* @property {integer} [fluidOffset=0] - Desplazamiento que se aplica a la capa redimensionada.
 	*/
	jQuery.fn.rup_jqtable.plugins.fluid = {};
	jQuery.fn.rup_jqtable.plugins.fluid.defaults = {
		fluid:{
			baseLayer:null,
			minWidth: 100,
			maxWidth: 2000,
			fluidOffset : 0
		}
	};


})(jQuery);
