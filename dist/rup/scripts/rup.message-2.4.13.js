/*!
 * Copyright 2016 E.J.I.E., S.A.
 *
 * Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);
 * Solo podrá usarse esta obra si se respeta la Licencia.
 * Puede obtenerse una copia de la Licencia en
 *
 *      http://ec.europa.eu/idabc/eupl.html
 *
 * Salvo cuando lo exija la legislación aplicable o se acuerde por escrito,
 * el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,
 * SIN GARANT�?AS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/**
 * @fileOverview Implementa el patrón RUP Message.
 * @author EJIE
 * @version 2.4.13
 */
(function ($) {

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	/**
    * Tiene como objetivo mostrar al usuario de forma homogénea, clara y llamativa, los posibles mensajes que pueden desencadenar las acciones en la aplicación. Estos mensajes predefinidos pueden ser de diferente tipología: error, confirmación, aviso o alerta.
    *
    * @summary Componente RUP Message.
    * @namespace jQuery.rup_messages
    * @memberOf jQuery
    * @tutorial rup_messages
    * @example
    * $.rup_messages("msgOK", {
	*		title: "Correcto",
	*		message: "Todo ha ido OK."
	* });
    */
	var rup_messages = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupObjectConstructor("rup_messages", rup_messages));

	window.alert = function (text) {
        $.rup_messages("msgAlert", {title: $.rup.i18nParse($.rup.i18n.base,"rup_message.alert"), message: text});
    };

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

    /**
     * Función a ejecutar justo antes de que se cierre la ventana.
     *
     * @callback jQuery.rup_messages~beforeCloseCallback
     * @param {Object} event - Objeto Event de jQuery.
     */

    /**
     * Función a ejecutar cuando el usuario pulsa el botón de Aceptar.
     *
     * @callback jQuery.rup_messages~OKFunctionCallback
     * @param {Object} event - Objeto Event de jQuery.
     * @param {Object} ui - Objeto de tipo jQueryUi Dialog.
     */

    /**
     * Función a ejecutar cuando el usuario pulsa el enlace de Cancelar.
     *
     * @callback jQuery.rup_messages~CANCELFunctionCallback
     * @param {Object} event - Objeto Event de jQuery.
     * @param {Object} ui - Objeto de tipo jQueryUi Dialog
     */

	$.rup_messages("extend", {
        /**
         * Muestra un mensaje de error.
         *
         * @name jQuery.rup_messages#msgError
         * @function
         * @param {Object} properties - Objeto de configuración del mensaje de error.
         * @param {String} properties.title - Función a ejecutar justo antes de que se cierre la ventana.
         * @param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         * @param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Texto que aparecerá en la barra del titulo del mensaje.
         *
         * @example
         * // Mostrar un mensaje de error.
         * $.rup_messages("msgError", {
         *      title: "Error grave",
         *      message: "<p>Se ha producido un error a la hora de intentar guardar el registro.<br>Consulte con el administrador.</p>"
         * });
         */
		msgError : function (properties) {
			//Se recogen y cruzan las paremetrizaciones del objeto
			var settings = $.extend({}, $.rup_messages.defaults, properties), docHeight, docWidth,
				focused = $(document.activeElement);
			this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base, "rup_message.tituloError"));

			settings._close = settings.close;
			settings.close = function(event, ui) {
				focused.focus();
				if (settings._close!==undefined){settings._close(event,ui);}
			};

			//parámetros específicos de tipo de mensaje
			settings.buttons = [{
                text: $.rup.i18nParse($.rup.i18n.base,"rup_message.aceptar"),
                click: function () {
                    self.dialog("close");
                }
            }];

            var self = this._createDiv().appendTo("body");
            self.dialog(settings);

			this._createCloseLink(self);
			this._addStyles(self, "error", settings.message);
			docHeight = $(document).height();
			docWidth = $(document).width();
            self.dialog("open");
            this._dialogInPortal(docWidth, docHeight, self, settings);
        },
        /**
         * Muestra un mensaje de confirmación.
         *
         * @name jQuery.rup_messages#msgConfirm
         * @function
         * @param {Object} properties - Objeto de configuración del mensaje de error.
         * @param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         * @param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         * @param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         * @param {jQuery.rup_messages~OKFunctionCallback} properties.OKFunction - Función a ejecutar cuando el usuario pulsa el botón de Aceptar.
         * @param {jQuery.rup_messages~CANCELFunctionCallback} properties.CANCELFunction - Función a ejecutar cuando el usuario pulsa el enlace de Cancelar.
         * @example
         * // funciones de callback.
         * function acceptClicked() { alert("Ha pulsado aceptar."); }
         * function cancelClicked() { alert("Ha pulsado cancelar."); }
         *
         * // Mostrar un mensaje de error.
         * $.rup_messages("msgConfirm", {
         *      title: "Confirmación",
         *      message: "¿Está seguro que desea cancelar?",
         *      OKFunction : acceptClicked,
         *      CANCELFunction : cancelClicked
         * });
         */
        msgConfirm : function (properties) {
        	//Se recogen y cruzan las paremetrizaciones del objeto
        	var settings = $.extend({}, $.rup_messages.defaults, properties), docHeight, docWidth,
				focused = $(document.activeElement);
			this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base,"rup_message.confirmacion"));

			settings._close = settings.close;
			settings.close = function(event, ui) {
				focused.focus();
				if (settings._close!==undefined){settings._close(event,ui);}
			};

            var self = this._createDiv().appendTo("body"), aceptButton;
            self.dialog(settings);

            //parámetros específicos de tipo de mensaje
            aceptButton = [{
                    text: $.rup.i18nParse($.rup.i18n.base,"rup_message.aceptar"),
                    click: function () {
                    	settings.OKFunction.call(this, self);
                        self.dialog("close");
                    }
                }];
            self.dialog("option", "buttons", aceptButton);

			this._createCloseLink(self);
			this._addStyles(self, "confirm", settings.message);
			this._createLinkButton(self, settings.CANCELFunction);
			docHeight = $(document).height();
			docWidth = $(document).width();
            self.dialog("open");
            this._dialogInPortal(docWidth, docHeight, self, settings);

            //Le ponemos el foco al botón aceptar en vez de al enlace
            $('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-buttonpane button:first').focus();
        },
        /**
         * Muestra un mensaje de aviso.
         *
         * @name jQuery.rup_messages#msgOK
         * @function
         * @param {Object} properties - Objeto de configuración del mensaje de aviso.
         * @param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         * @param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         * @param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         * @example
         * // Mostrar un mensaje de aviso.
         * $.rup_messages("msgOK", {
         *      title: "Correcto",
         *      message: "Todo ha ido OK."
         * });
         */
        msgOK : function (properties) {
        	//Se recogen y cruzan las paremetrizaciones del objeto
        	var settings = $.extend({}, $.rup_messages.defaults, properties), docHeight, docWidth,
				focused = $(document.activeElement);
			this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base,"rup_message.correct"));

			settings._close = settings.close;
			settings.close = function(event, ui) {
				focused.focus();
				if (settings._close!==undefined){settings._close(event,ui);}
			};

			//parámetros específicos de tipo de mensaje
			settings.buttons = [{
				text: $.rup.i18nParse($.rup.i18n.base,"rup_message.aceptar"),
				click: function () {
					self.dialog("close");
				}
        	}];

            var self = this._createDiv().appendTo("body");
            self.dialog(settings);

            this._createCloseLink(self);
			this._addStyles(self, "ok", settings.message);
			docHeight = $(document).height();
			docWidth = $(document).width();
            self.dialog("open");
            this._dialogInPortal(docWidth, docHeight, self, settings);
        },
        /**
         * Muestra un mensaje de alerta.
         *
         * @name jQuery.rup_messages#msgAlert
         * @function
         * @param {Object} properties - Objeto de configuración del mensaje de alerta.
         * @param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         * @param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         * @param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         * @example
         * // Mostrar un mensaje de aviso.
         * $.rup_messages("msgAlert", {
         *      title: "Alerta",
         *      message: "Esto es una alerta."
         * });
         */
        msgAlert : function (properties) {
        	//Se recogen y cruzan las paremetrizaciones del objeto
			var settings = $.extend({}, $.rup_messages.defaults, properties), docHeight, docWidth,
				focused = $(document.activeElement);
			this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base,"rup_message.alert"));

			settings._close = settings.close;
			settings.close = function(event, ui) {
				focused.focus();
				if (settings._close!==undefined){settings._close(event,ui);}
			};

			//parámetros específicos de tipo de mensaje
			settings.buttons = [{
				text: $.rup.i18nParse($.rup.i18n.base,"rup_message.aceptar"),
				click: function () {
					self.dialog("close");
				}
        	}];

            var self = this._createDiv().appendTo("body");
            self.dialog(settings);
            this._createCloseLink(self);
			this._addStyles(self, "alert", settings.message);
			docHeight = $(document).height();
			docWidth = $(document).width();
            self.dialog("open");
            this._dialogInPortal(docWidth, docHeight, self, settings);
        }
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.rup_messages("extend", {
        /**
         * Crea los divs de los mensajes.
         *
         * @name jQuery.rup_messages#_createDiv
         * @function
         * @private
         */
			_createDiv : function () { //Crea los divs de los mensajes
				return $("<div/>").attr("id", "rup_msgDIV_" + new Date().getTime()).attr("rup_message", "true");
			},
/**
         * Crea los el enlace de cerrar en el título del mensaje de acuerdo a los estándares de accesibilidad.
         *
         * @name jQuery.rup_messages#_createCloseLink
         * @param {Object} self - Referencia a la propia instancia.
         * @function
         * @private
         */
			_createCloseLink : function (self) { //Crea el enlace de cerrar junto a la x de cerrar.
				var closeSpan = "<span id='closeText_" + self[0].id + "' style='float:right;font-size:0.85em;'>" + $.rup.i18nParse($.rup.i18n.base,"rup_global.cerrar") + "</span>",
	            aClose = $("<a href='#'></a>")
	                    .attr("role", "button")
	                    .css("margin-right", "0.9em")
	                    .css("float", "right")
	                    .addClass("ui-dialog-title")
	                    .html(closeSpan)
	                    .click(function (event) {
	                    self.dialog("close");
	                    return false;
	                }).hover(function (eventObject) { //Evento lanzado para que se cambie el icono de la X a hover, marcado por ARISTA
						$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-titlebar-close').addClass("ui-state-hover");
						$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-titlebar-close').css("padding", "0px");
					},
					function (eventObject) {
						$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-titlebar-close').removeClass("ui-state-hover");
						$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-titlebar-close').attr("style", "");
					}).insertAfter("#ui-dialog-title-" + self[0].id);
				$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-titlebar-close').hover(
				function () {
					aClose.css("text-decoration", "none");
				},
				function () {
					aClose.css("text-decoration", "");
				});
			},
/**
         * Aplica el estilo correspondiente al tipo de mensaje a mostrar así como el contenido del mensaje en sí.
         *
         * @name jQuery.rup_messages#_addStyles
         * @param {Object} self - Referencia a la propia instancia.
         * @param {string} css - Clase css correspondiente al tipo de mensaje a mostrar.
         * @param {string} message - Cuerpo del mensaje a visualizar.
         * @function
         * @private
         */
			_addStyles : function (self, css, message) { //Le a?ade los divs del mensaje a mostrar y el icono correpondiente
				var divMessageIcon = $("<div>").attr("id", "rup_msgDIV_msg_icon").addClass("rup-message_icon-" + css),
	            divMessage = $("<div>").attr("id", "rup_msgDIV_msg").addClass("rup-message_msg-" + css).html(message);
	            self.append(divMessageIcon);
	            self.append(divMessage);
			},
/**
         * Genera un enlace "Cancelar" para el mensaje de tipo confirmación.
         *
         * @name jQuery.rup_messages#_createLinkButton
         * @param {Object} self - Referencia a la propia instancia.
         * @param {string} css - Clase css correspondiente al tipo de mensaje a mostrar.
         * @param {jQuery.rup_messages~CANCELFunctionCallback} CANCELFunction - Función a ejecutar cuando el usuario pulsa el enlace de Cancelar.
         * @function
         * @private
         */
			_createLinkButton : function (self, CANCELFunction) { //Creamos un boton como si fuera un
	            //creamos el enlace
					var clickFnc = CANCELFunction,
						cancelHREF = $("<a href='#'></a>")
	                        .attr("role", "button")
	                        .attr("id", self[0].id + "_cancel")
	                        .addClass("rup-enlaceCancelar")
	                        .html($.rup.i18nParse($.rup.i18n.base,"rup_global.cancel"))
	                        .click(function (event) {
	                        	self.dialog("close");
	                        	if (clickFnc !== undefined) {
	                        		clickFnc.call(this, self);
	                        	}
	                        	return false;
	                        });
					$('div[aria-labelledby=ui-dialog-title-' + self[0].id + '] .ui-dialog-buttonset ').prepend(cancelHREF);
				},
			/**
         * Ajuste en la visualización del mensaje para que se muestre correctamente en aplicaciones integradas en portal.
         *
         * @name jQuery.rup_messages#_dialogInPortal
         * @param {Number} docWidth - Anchura en pixeles del objeto document.
         * @param {Number} docHeight - Altura en pixeles del objeto document.
         * @param {Object} $self - Referencia a la propia instancia.
         * @param {Object} settings - Objeto de configuración del componente.
         * @function
         * @private
         */
			 _dialogInPortal : function(docWidth, docHeight, $self, settings){
				 var $overlayEl;

	              if($.rup_utils.aplicatioInPortal()){
	            	  if ($self.data("dialog").overlay !== null){
	            		  $overlayEl = $self.data("dialog").overlay.$el;
	            		  $overlayEl.css("height",docHeight).css("width",docWidth);
	            		  $(".r01gContainer").append($self.data("dialog").uiDialog).append($overlayEl);
	            	  }
	            	  if (settings.position === undefined || settings.position === null){
	            		  $self.data("dialog").uiDialog.css("position","absolute").css("top",(docHeight/2)-($(".ui-dialog:visible").height()/2));
	            	  }
	              }
			 },
/**
         * Realiza la inicialización de las propiedades utilizadas para configurar correctamente el plugin jQueryUi Dialog. </br></br>
         * La inicialización se realiza sobre las propiedades introducidas por el usuario de modo que se garantiza que la visualización del componente es siempre la adecuada.
         *
         * @name jQuery.rup_feedback#_rupProperties
         * @param {Object} properties - Propiedades de configuración sobre las que se va a realizar la inicialización-
         * @param {string} title - Titulo a mostrar en el mensaje.
         * @function
         * @private
         */
			_rupProperties : function(properties, title){
				properties.autoOpen= false;
				properties.modal = true,
				properties.resizable = false,
				properties.title = (properties.title === null || properties.title === "" ?title: properties.title);
				properties.closeText = $.rup.i18nParse($.rup.i18n.base,"rup_message.tituloError.cerrar"),
				properties.close = function () {
						$(this).remove();
				};
			}
		});

	//******************************************************
	// DEFINICIN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	/**
     * @description Opciones por defecto de configuración del componente.
     *
     * @name jQuery.rup_messages#defaults
     *
     * @property {Number}  [minHeight=100] - Altura mínima con la que se va a mostrar el mensaje.
     */
	$.rup_messages.defaults = {
		minHeight: 100
	};

})(jQuery);
