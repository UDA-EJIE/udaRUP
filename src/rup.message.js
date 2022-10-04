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
 * SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

/**
 *	Tiene como objetivo mostrar al usuario de forma homogénea, clara y llamativa, los posibles mensajes que pueden desencadenar las acciones en la aplicación. Estos mensajes predefinidos pueden ser de diferente tipología: error, confirmación, aviso o alerta.
 *
 *	@summary Componente RUP Message.
 *	@module rup_messages
 *
 *	@example
 *	$.rup_messages("msgOK", {
 *		title: "Correcto",
 *		message: "Todo ha ido OK.",
 *		buttonText: $.rup.i18nParse($.rup.i18n.app, "message.acceptOK")
 *	});
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {

        // AMD. Register as an anonymous module.
        define(['jquery', './rup.base'], factory);
    } else {

        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    //*****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //*****************************************************************************************************************

    var rup_messages = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupObjectConstructor('rup_messages', rup_messages));

    window.alert = function (text) {
        $.rup_messages('msgAlert', {
            title: $.rup.i18nParse($.rup.i18n.base, 'rup_message.alert'),
            message: text
        });
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

    $.rup_messages('extend', {
        /**
         *	Muestra un mensaje de error.
         *
         *	@function  msgError
         *	@param {Object} properties - Objeto de configuración del mensaje de error.
         *	@param {String} properties.title - Función a ejecutar justo antes de que se cierre la ventana.
         *	@param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         *	@param {String} properties.buttonText - Literal a mostrar como texto del botón.
         *	@param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Texto que aparecerá en la barra del titulo del mensaje.
         *
         *	@example
         *	// Mostrar un mensaje de error.
         *	$.rup_messages("msgError", {
         *		title: "Error grave",
         *		message: "<p>Se ha producido un error a la hora de intentar guardar el registro.<br>Consulte con el administrador.</p>",
         *		buttonText: $.rup.i18nParse($.rup.i18n.app, "message.acceptError")
         *	});
         */
        msgError: function (properties) {
            //Se recogen y cruzan las paremetrizaciones del objeto
            var $this = this, settings = $.extend({}, $.rup_messages.defaults, properties),
                docHeight, docWidth,
                focused = $(document.activeElement);
            this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base, 'rup_message.tituloError'));

            settings._close = settings.close;
            settings.close = function () {
                focused.focus();
                if (settings._close !== undefined) {
                    $this._destroy(self);
                }
            };

            //parámetros específicos de tipo de mensaje
            settings.buttons = [{
                text: properties.buttonText != undefined ? properties.buttonText : $.rup.i18nParse($.rup.i18n.base, 'rup_message.aceptar'),
                class: $.rup.adapter[$.rup_messages.defaults.adapter].classComponent('error'),
                click: function () {
                    $this._destroy(self);
                }
            }];

            var self = this._createDiv().appendTo('body');
            self.dialog(settings);
            if(self.data('uiDialog')){
                self.data('uiDialog').uiDialog.addClass('rup-message rup-message-error');
            }
            this._createCloseLink(self);
            this._addStyles(self, 'error', settings.message);
            docHeight = $(document).height();
            docWidth = $(document).width();
            self.dialog('open');
            this._dialogInPortal(docWidth, docHeight, self, settings);
			
            // Limpieza del componente
            if(self.data('uiDialog')){
                self.data('uiDialog').uiDialog.find('button.ui-dialog-titlebar-close').remove();
                self.data('uiDialog').uiDialog.find('button').removeClass('ui-button ui-corner-all ui-widget');
            }

            //Se audita el componente
            $.rup.auditComponent('rup_message', 'init');
        },
        /**
         *	Muestra un mensaje de confirmación.
         *
         *	@function  msgConfirm
         *	@param {Object} properties - Objeto de configuración del mensaje de error.
         *	@param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         *	@param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         *	@param {String} properties.OKText - Literal a mostrar como texto del botón de aceptar.
         *	@param {String} properties.CANCELText - Literal a mostrar como texto del botón de cancelar.
         *	@param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         *	@param {jQuery.rup_messages~OKFunctionCallback} properties.OKFunction - Función a ejecutar cuando el usuario pulsa el botón de Aceptar.
         *	@param {jQuery.rup_messages~CANCELFunctionCallback} properties.CANCELFunction - Función a ejecutar cuando el usuario pulsa el enlace de Cancelar.
         * 
         *	@example
         *	// funciones de callback.
         *	function acceptClicked() { alert("Ha pulsado aceptar."); }
         *	function cancelClicked() { alert("Ha pulsado cancelar."); }
         *
         *	// Mostrar un mensaje de error.
         *	$.rup_messages("msgConfirm", {
         *		title: "Confirmación",
         *		message: "¿Está seguro que desea cancelar?",
         *		OKFunction : acceptClicked,
         *		OKText: $.rup.i18nParse($.rup.i18n.app, "message.OK"),
         *		CANCELFunction : cancelClicked,
         *		CANCELText: $.rup.i18nParse($.rup.i18n.app, "message.CANCEL")
         *	});
         */
        msgConfirm: function (properties) {
            //Se recogen y cruzan las paremetrizaciones del objeto
            var $this = this, settings = $.extend({}, $.rup_messages.defaults, properties),
                docHeight, docWidth,
                focused = $(document.activeElement);
            this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base, 'rup_message.confirmacion'));

            settings._close = settings.close;
            settings.close = function () {
                focused.focus();
                if (settings._close !== undefined) {
                    $this._destroy(self);
                }
            };

            var self = this._createDiv().appendTo('body'),
                acceptButton;
            self.dialog(settings);
            self.data('uiDialog').uiDialog.addClass('rup-message rup-message-confirm');

            //parámetros específicos de tipo de mensaje
            acceptButton = [{
                text: properties.OKText != undefined ? properties.OKText : $.rup.i18nParse($.rup.i18n.base, 'rup_message.aceptar'),
                class: $.rup.adapter[$.rup_messages.defaults.adapter].classComponent('confirm'),
                click: function () {
                    $this._destroy(self);
                    settings.OKFunction.call(this, self);
                }
            }];
            self.dialog('option', 'buttons', acceptButton);

            this._createCloseLink(self, settings.CLOSEFunction);
            this._addStyles(self, 'confirm', settings.message);
            this._createLinkButton(self, settings);
            docHeight = $(document).height();
            docWidth = $(document).width();
            self.dialog('open');
            this._dialogInPortal(docWidth, docHeight, self, settings);
			
            // Limpieza del componente
            self.data('uiDialog').uiDialog.find('button.ui-dialog-titlebar-close').remove();
            self.data('uiDialog').uiDialog.find('button').removeClass('ui-button ui-corner-all ui-widget');

            //Le ponemos el foco al botón aceptar en vez de al enlace
            $('div[aria-describedby=' + self[0].id + '] .ui-dialog-buttonpane button').last().focus();

            //Se audita el componente
            $.rup.auditComponent('rup_message', 'init');
        },
        /**
         *	Muestra un mensaje de aviso.
         *
         *	@function  msgOK
         *	@param {Object} properties - Objeto de configuración del mensaje de aviso.
         *	@param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         *	@param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         *	@param {String} properties.buttonText - Literal a mostrar como texto del botón.
         *	@param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         *
         *	@example
         *	// Mostrar un mensaje de aviso.
         *	$.rup_messages("msgOK", {
         *		title: "Correcto",
         *		message: "Todo ha ido OK.",
         *		buttonText: $.rup.i18nParse($.rup.i18n.app, "message.acceptOK")
         *	});
         */
        msgOK: function (properties) {
            //Se recogen y cruzan las paremetrizaciones del objeto
            var $this = this, settings = $.extend({}, $.rup_messages.defaults, properties),
                docHeight, docWidth,
                focused = $(document.activeElement);
            this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base, 'rup_message.correct'));

            settings._close = settings.close;
            settings.close = function () {
                focused.focus();
                if (settings._close !== undefined) {
                    $this._destroy(self);
                }
            };

            //parámetros específicos de tipo de mensaje
            settings.buttons = [{
                text: properties.buttonText != undefined ? properties.buttonText : $.rup.i18nParse($.rup.i18n.base, 'rup_message.aceptar'),
                class: $.rup.adapter[$.rup_messages.defaults.adapter].classComponent('ok'),
                click: function () {
                    $this._destroy(self);
                }
            }];

            var self = this._createDiv().appendTo('body');
            self.dialog(settings);
            if(self.data('uiDialog')){
                self.data('uiDialog').uiDialog.addClass('rup-message rup-message-ok');
            }

            this._createCloseLink(self, settings.CLOSEFunction);
            this._addStyles(self, 'ok', settings.message);
            docHeight = $(document).height();
            docWidth = $(document).width();
            self.dialog('open');
            this._dialogInPortal(docWidth, docHeight, self, settings);
			
            // Limpieza del componente
            if(self.data('uiDialog')){
                self.data('uiDialog').uiDialog.find('button.ui-dialog-titlebar-close').remove();
                self.data('uiDialog').uiDialog.find('button').removeClass('ui-button ui-corner-all ui-widget');
            }

            //Se audita el componente
            $.rup.auditComponent('rup_message', 'init');
        },
        /**
         *	Muestra un mensaje de alerta.
         *
         *	@function  msgAlert
         *	@param {Object} properties - Objeto de configuración del mensaje de alerta.
         *	@param {String} properties.title - Texto que aparecerá en la barra del titulo del mensaje.
         *	@param {String} properties.message - El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo.
         *	@param {String} properties.buttonText - Literal a mostrar como texto del botón.
         *	@param {jQuery.rup_messages~beforeCloseCallback} properties.beforeClose - Función a ejecutar justo antes de que se cierre la ventana.
         *
         *	@example
         *	// Mostrar un mensaje de aviso.
         *	$.rup_messages("msgAlert", {
         *		title: "Alerta",
         *		message: "Esto es una alerta.",
         *		buttonText: $.rup.i18nParse($.rup.i18n.app, "message.acceptAlert")
         *	});
         */
        msgAlert: function (properties) {
            //Se recogen y cruzan las paremetrizaciones del objeto
            var $this = this, settings = $.extend({}, $.rup_messages.defaults, properties),
                docHeight, docWidth,
                focused = $(document.activeElement);
            this._rupProperties(settings, $.rup.i18nParse($.rup.i18n.base, 'rup_message.alert'));

            settings._close = settings.close;
            settings.close = function () {
                focused.focus();
                if (settings._close !== undefined) {
                    $this._destroy(self);
                }
            };

            //parámetros específicos de tipo de mensaje
            settings.buttons = [{
                text: properties.buttonText != undefined ? properties.buttonText : $.rup.i18nParse($.rup.i18n.base, 'rup_message.aceptar'),
                class: $.rup.adapter[$.rup_messages.defaults.adapter].classComponent('alert'),
                click: function () {
                    $this._destroy(self);
                }
            }];

            var self = this._createDiv().appendTo('body');
            self.dialog(settings);
            self.data('uiDialog').uiDialog.addClass('rup-message rup-message-alert');
            this._createCloseLink(self,settings.CLOSEFunction);
            this._addStyles(self, 'alert', settings.message);
            docHeight = $(document).height();
            docWidth = $(document).width();
            self.dialog('open');
            this._dialogInPortal(docWidth, docHeight, self, settings);
			
            // Limpieza del componente
            self.data('uiDialog').uiDialog.find('button.ui-dialog-titlebar-close').remove();
            self.data('uiDialog').uiDialog.find('button').removeClass('ui-button ui-corner-all ui-widget');

            //Se audita el componente
            $.rup.auditComponent('rup_message', 'init');
        }
    });

    //********************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //********************************

    $.rup_messages('extend', {
        _destroy: function(self){
            self.dialog('destroy').remove();
        },
        /**
         * Crea los divs de los mensajes.
         *
         * @function  _createDiv
         * @private
         */
        _createDiv: function () {
            return $('<div></div>').attr('id', 'rup_msgDIV_' + new Date().getTime()).attr('rup_message', 'true').addClass('row py-4');
        },
        /**
         * Crea los el enlace de cerrar en el título del mensaje de acuerdo a los estándares de accesibilidad.
         *
         * @param {Object} self - Referencia a la propia instancia.
         * @function  _createCloseLink
         * @private
         */
        _createCloseLink: function (self, CLOSEFunction) { //Crea el enlace de cerrar junto a la x de cerrar.
            self.prev('div')
                .append('<i class="mdi mdi-close float-right pointer" aria-hidden="true"></i>')
                .on('click', 'i.mdi', function () {
                    self.dialog('close');
                    if (CLOSEFunction !== undefined) {
                    	CLOSEFunction.call(this, self);
                    }
                    return false;
                });
        },
        /**
         * Aplica el estilo correspondiente al tipo de mensaje a mostrar así como el contenido del mensaje en sí.
         *
         * @param {Object} self - Referencia a la propia instancia.
         * @param {string} css - Clase css correspondiente al tipo de mensaje a mostrar.
         * @param {string} message - Cuerpo del mensaje a visualizar.
         * @function  _addStyles
         * @private
         */
        _addStyles: function (self, css, message) { //Le añade los divs del mensaje a mostrar y el icono correpondiente
            // Establecemos el icono dependiendo del tipo de mensaje
            var icon = '';
			
            switch(css){
            case 'error':
                icon = '<i class="mdi mdi-alert-circle" aria-hidden="true"></i>';
                break;
            case 'confirm':
                icon = '<i class="mdi mdi-alert" aria-hidden="true"></i>';
                break;
            case 'ok':
                icon = '<i class="mdi mdi-check-circle" aria-hidden="true"></i>';
                break;
            case 'alert':
                icon = '<i class="mdi mdi-message-alert" aria-hidden="true"></i>';
                break;
            default:
                icon = '<i class="mdi mdi-alert" aria-hidden="true"></i>';
            }
			
            var divMessageIcon = $('<div>').attr('id', 'rup_msgDIV_msg_icon').addClass('col-2').append(icon),
                divMessage = $('<div>').attr('id', 'rup_msgDIV_msg').addClass('col-10').html(message);
            self.append(divMessageIcon);
            self.append(divMessage);
        },
        /**
         *	Genera un botón "Cancelar" para el mensaje de tipo confirmación.
         *
         *	@param {Object} self - Referencia a la propia instancia.
         *	@param {Object} settings - Propiedades de configuración.
         *	@function  _createLinkButton
         *	@private
         */
        _createLinkButton: function (self, settings) {
        	var clickFnc = settings.CANCELFunction,
                cancelHREF = $('<button></button>')
                    .attr('type', 'button')
                    .attr('id', self[0].id + '_cancel')
                    .addClass($.rup.adapter[$.rup_messages.defaults.adapter].classComponent())
                    .html(settings.CANCELText != undefined ? settings.CANCELText : $.rup.i18nParse($.rup.i18n.base, 'rup_global.cancel'))
                    .click(function () {
                        self.dialog('close');
                        if (clickFnc !== undefined) {
                            clickFnc.call(this, self);
                        }
                        return false;
                    });
            $('div[aria-describedby=' + self[0].id + '] .ui-dialog-buttonset ').prepend(cancelHREF);
        },
        /**
         * Ajuste en la visualización del mensaje para que se muestre correctamente en aplicaciones integradas en portal.
         *
         * @param {Number} docWidth - Anchura en pixeles del objeto document.
         * @param {Number} docHeight - Altura en pixeles del objeto document.
         * @param {Object} $self - Referencia a la propia instancia.
         * @param {Object} settings - Objeto de configuración del componente.
         * @function  _dialogInPortal
         * @private
         */
        _dialogInPortal: function (docWidth, docHeight, $self, settings) {
            var $overlayEl;

            if ($.rup_utils.aplicatioInPortal()) {
                if ($self.data('uiDialog').overlay !== null) {
                    $overlayEl = $self.data('uiDialog').overlay;
                    $overlayEl.css('height', docHeight).css('width', docWidth);
                    $('.r01gContainer').append($overlayEl).append($self.data('uiDialog').uiDialog);
                }
                if (settings.position === undefined || settings.position === null) {
                    $self.data('uiDialog').uiDialog.css('position', 'absolute').css('top', (docHeight / 2) - ($('.ui-dialog:visible').height() / 2));
                }
            }
        },
        /**
         * Realiza la inicialización de las propiedades utilizadas para configurar correctamente el plugin jQueryUi Dialog. </br></br>
         * La inicialización se realiza sobre las propiedades introducidas por el usuario de modo que se garantiza que la visualización del componente es siempre la adecuada.
         *
         * @name _rupProperties
         * @param {Object} properties - Propiedades de configuración sobre las que se va a realizar la inicialización-
         * @param {string} title - Titulo a mostrar en el mensaje.
         * @function
         * @private
         */
        _rupProperties: function (properties, title) {
            properties.autoOpen = false;
            properties.modal = true;
            properties.resizable = false;
            if(properties.title === null || properties.title === ''){
                properties.title = title;
            }
            properties.closeText = $.rup.i18nParse($.rup.i18n.base, 'rup_message.tituloError.cerrar');
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
     * @name defaults
     *
     * @property {Number}  [minHeight=100] - Altura mínima con la que se va a mostrar el mensaje.
     * @property {string} adapter - Permite cambiar el aspecto visual del componente.
     */
    $.rup_messages.defaults = {
        minHeight: 100,
        adapter: 'message_material'
    };

}));
