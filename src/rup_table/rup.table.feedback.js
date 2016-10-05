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

(function ($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 * 
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 * 
	 */
	jQuery.rup_table.registerPlugin("feedback",{
		loadOrder:2,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("preConfigureFeedback", settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("postConfigureFeedback", settings);
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	/**
	 * Extensión del componente rup_table para permitir la gestión de la botonera asociada a la tabla. 
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
	jQuery.fn.rup_table("extend",{
		/*
		 * Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
		 * 
		 * TODO: internacionalizar mensajes de error.
		 */
		preConfigureFeedback: function(settings){
			var $self = this, feedbackId, feedbackSettings = settings.feedback, $feedback;
			
			/*
			 * Inicialización de los identificadores por defecto de los componentes del toolbar  
			 */
			feedbackSettings.id = feedbackSettings.id!==null?feedbackSettings.id:settings.id+"_feedback";
			
			feedbackId = (feedbackSettings.id[0]==="#"?feedbackSettings.id:"#"+feedbackSettings.id);
			$feedback = jQuery(feedbackId);
			if ($feedback.length === 0){
				alert("El identificador especificado para el feedback no existe.");
			}else{
				settings.$feedback = $feedback;
				settings.$feedback.rup_feedback(feedbackSettings.config).attr("ruptype","feedback");
			}
			
			if (!jQuery.isFunction(settings.loadError)){
				settings.loadError = function(xhr,st,err){
					$self.rup_table("showFeedback", settings.$feedback, xhr.responseText, "error");
				};
			}
			
		},
		/*
		 * Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
		 * 
		 */
		postConfigureFeedback: function(settings){
			// Definición del feedback interno
			settings.$internalFeedback = $("<div/>").attr("id", "rup_feedback_" + settings.id).insertBefore('#gbox_' + settings.id);
			settings.$internalFeedback.rup_feedback(settings.feedback.internalFeedbackConfig);
		}
	});
	
	
	jQuery.fn.rup_table("extend",{
		showFeedback: function($feedback, msg, type, options){
			var $self = this, settings = $self.data("settings"), options_backup, default_options;
			
			if (options === false){
				// Muestra el feedback con las opciones con las que se ha creado
				$feedback.rup_feedback("set", msg, type);
			}else if (jQuery.isPlainObject(options)){
				// Se aplicam las opciones de configuración indicadas sin modificar las del feedback
				
				$feedback.rup_feedback("option", options);
				$feedback.rup_feedback("set", msg, type);
				
			}else{
				// Se utilizan las opciones de configuración por defecto del componente table
				default_options = (settings.feedback[type+"FeedbackConfig"]!==undefined?settings.feedback[type+"FeedbackConfig"]:settings.feedback.okFeedbackConfig);
				$feedback.rup_feedback("option", default_options);
				$feedback.rup_feedback("set", msg, type);
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
	jQuery.fn.rup_table.plugins.feedback = {};
	jQuery.fn.rup_table.plugins.feedback.defaults = {
			loadError : function(xhr,st,err){
				var $self = $(this), settings = $self.data("settings");
				$self.rup_table("showFeedback", settings.$feedback, xhr.responseText, "error");
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
					type: "ok",
					closeLink: true,
					gotoTop: false,
					block: true
				},
				internalFeedbackConfig:{
					type: "ok",
					closeLink: true,
					gotoTop: false,
					block: false
				}
			}
	};
	
})(jQuery);