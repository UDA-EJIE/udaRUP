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
 * Permite configurar un área para informar al usuario de cómo interactuar con el componente. Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.
 *
 * @summary Plugin de feedback del componente RUP Table.
 * @module rup_jqtable/feedback
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 *	usePlugins:["feedback"],
 * 	feedback:{
 * 		// Propiedades de configuración del plugin feedback
 * 	}
 * });
 */
(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_jqtable.registerPlugin('feedback',{
		loadOrder:2,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('preConfigureFeedback', settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_jqtable('postConfigureFeedback', settings);
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * preConfigureFeedback(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
	 * postConfigureFeedback(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
	 *
	 * settings.$feedback : Referencia al componente feedback.
	 * settings.$$internalFeedback : Referencia al feedback interno.
	 *
	 */


	jQuery.fn.rup_jqtable('extend',{
		/*
		 * Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
		 *
		 * TODO: internacionalizar mensajes de error.
		 */
		/**
			* Metodo que realiza la pre-configuración del plugin feedback del componente RUP Table.
			* Este método se ejecuta antes de la incialización del plugin.
			*
			* @name preConfigureFeedback
			* @function
			* @param {object} settings - Parámetros de configuración del componente.
			*/
		preConfigureFeedback: function(settings){
			var $self = this, feedbackId, feedbackSettings = settings.feedback, $feedback;

			/*
			 * Inicialización de los identificadores por defecto de los componentes del toolbar
			 */
			feedbackSettings.id = feedbackSettings.id!==null?feedbackSettings.id:settings.id+'_feedback';

			feedbackId = (feedbackSettings.id[0]==='#'?feedbackSettings.id:'#'+feedbackSettings.id);
			$feedback = jQuery(feedbackId);
			if ($feedback.length === 0){
				alert('El identificador especificado para el feedback no existe.');
			}else{
				settings.$feedback = $feedback;
				settings.$feedback.rup_feedback(feedbackSettings.config).attr('ruptype','feedback');
			}

			if (!jQuery.isFunction(settings.loadError)){
				settings.loadError = function(xhr){
					$self.rup_jqtable('showFeedback', settings.$feedback, xhr.responseText, 'error');
				};
			}

			/*
       * Definición del método serializeGridData para que añada al postData la información relativa a la multiseleccion.
       */
			$self.on({
				'rupTable_feedbackClose': function (events, $feedback) {
					$($feedback).rup_feedback('close');
				},
				'rupTable_feedbackShow': function (events, $feedback, msg, type, options){
					$self.rup_jqtable('showFeedback', $($feedback), msg, type, options);
				}
			});

		},
		/**
		 * Metodo que realiza la post-configuración del plugin feedback del componente RUP Table.
		 * Este método se ejecuta después de la incialización del plugin.
		 *
		 * @name postConfigureFeedback
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
		postConfigureFeedback: function(settings){
			// Definición del feedback interno
			settings.$internalFeedback = $('<div></div>').attr('id', 'rup_feedback_' + settings.id).insertBefore('#gbox_' + settings.id);
			settings.$internalFeedback.rup_feedback(settings.feedback.internalFeedbackConfig);
		}
	});


	jQuery.fn.rup_jqtable('extend',{

		/**
     * Muestra el feedback indicado con la configuración especificada.
     *
     * @function  showFeedback
     * @param {object} $feedback - Objeto jQuery que referencia al componente feedback.
     * @param {string} msg - : Mensaje a mostrar en el feedback.
		 * @param {string} type -  Clase de feedback a mostrar.
		 * @param {object} options - Propiedades de configuración del feedback
     * @example
     * $("#idTable").rup_jqtable("showFeedback", $("#idFeedback"), "Texto...", "ok"), {};
     */
		showFeedback: function($feedback, msg, type, options){
			var $self = this, settings = $self.data('settings'), options_backup, default_options;

			if (options === false){
				// Muestra el feedback con las opciones con las que se ha creado
				$feedback.rup_feedback('set', msg, type);
			}else if (jQuery.isPlainObject(options)){
				// Se aplicam las opciones de configuración indicadas sin modificar las del feedback

				$feedback.rup_feedback('option', options);
				$feedback.rup_feedback('set', msg, type);

			}else{
				// Se utilizan las opciones de configuración por defecto del componente jqtable
				default_options = (settings.feedback[type+'FeedbackConfig']!==undefined?settings.feedback[type+'FeedbackConfig']:settings.feedback.okFeedbackConfig);
				$feedback.rup_feedback('option', default_options);
				$feedback.rup_feedback('set', msg, type);
			}
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	 * Parámetros de configuración por defecto para el feedback.
	 *
	 * feedback.config: Configuración por defecto del feedback principal.
	 * feedback.internalFeedbackConfig: Configuración por defecto del feedback interno.
	 */
	/**
	* @description Propiedades de configuración del plugin feedback del componente RUP Table.
	*
	* @name options
	*
	* @property {string} [id=null] - Nombre del identificador a utilizar en el feedback. Se utiliza en caso de no querer utilizar el por defecto.
	* @property {object} [config] - Determina la configuración por defecto del feedback.
	* @property {object} [okFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo .
	* @property {object} [errorFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo ERROR.
	* @property {object} [alertFeedbackConfig] - Determina la configuración por defecto del feedback en los casos de mensajes tipo ALERT.
	* @property {object} [internalFeedbackConfig] - Determina la configuración por defecto del feedback interno de la tabla.
	*/
	jQuery.fn.rup_jqtable.plugins.feedback = {};
	jQuery.fn.rup_jqtable.plugins.feedback.defaults = {
		loadError : function(xhr,st,err){
			var $self = $(this), settings = $self.data('settings');
			$self.rup_jqtable('showFeedback', settings.$feedback, xhr.responseText, 'error');
		},
		feedback:{
			okFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:1000
			},
			errorFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:null
			},
			alertFeedbackConfig:{
				closeLink: true,
				gotoTop: false,
				delay:null
			},
			id: null,
			config:{
				type: 'ok',
				closeLink: true,
				gotoTop: false,
				block: true
			},
			internalFeedbackConfig:{
				type: 'ok',
				closeLink: true,
				gotoTop: false,
				block: false
			}
		}
	};

})(jQuery);
