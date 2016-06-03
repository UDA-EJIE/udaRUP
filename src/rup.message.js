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
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	
	var rup_messages = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupObjectConstructor("rup_messages", rup_messages));
	
	window.alert = function (text) {
        $.rup_messages("msgAlert", {title: $.rup.i18nParse($.rup.i18n.base,"rup_message.alert"), message: text});    
    };
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.rup_messages("extend", {
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
			_createDiv : function () { //Crea los divs de los mensajes
				return $("<div/>").attr("id", "rup_msgDIV_" + new Date().getTime()).attr("rup_message", "true");
			},
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
			_addStyles : function (self, css, message) { //Le a?ade los divs del mensaje a mostrar y el icono correpondiente
				var divMessageIcon = $("<div>").attr("id", "rup_msgDIV_msg_icon").addClass("rup-message_icon-" + css), 
	            divMessage = $("<div>").attr("id", "rup_msgDIV_msg").addClass("rup-message_msg-" + css).html(message);
	            self.append(divMessageIcon);
	            self.append(divMessage);
			},
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
			//Ajuste para el comportamiento de portales
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
	
	$.rup_messages.defaults = {
		minHeight: 100
	};
	
})(jQuery);