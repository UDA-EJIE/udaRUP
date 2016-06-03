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
	$.widget("$.rup_feedback", {
		options: {
			type: null,  //[ok, alert, error]
			imgClass: null,
			delay: null,
			fadeSpeed: null,
			gotoTop: true,
			block: true,
			closeLink: true,
			//uso privado
			_idFeedback: null,
			_divClose: null
		},
		
		_setOption: function (key, value) {
			var opciones = this.options,
				element = this.element;
			switch (key) {
				case "type": 
					//Eliminar imagenes anteriores y poner el tipo indicado
					if (value !== null) {
						element.removeClass(opciones.imgClass + " rup-feedback_image_"+opciones.type);
						element.addClass("rup-feedback_image rup-feedback_image_"+value);
					} else {
						element.removeClass("rup-feedback_image rup-feedback_image_"+opciones.type);
					}
					break;
				case "imgClass": 
					//Eliminar imagenes anteriores y poner la personal
					if (value !== null) {
						element.removeClass(opciones.imgClass + " rup-feedback_image rup-feedback_image_"+opciones.type);
						element.addClass(value);
					} else {
						element.removeClass(opciones.imgClass);
					}
					break;		
				case "closeLink":
					//Gestionar capa enlace cierre
					if (value) {
						this._addCloseLink();
					} else {
						$("#"+this.options._idFeedback+"_closeDiv").remove();
					}
					break;	
			}
			delete opciones;
			delete element;
			$.Widget.prototype._setOption.apply(this, arguments);
		},
		
		_create: function () {
			var opciones = this.options;
			opciones._idFeedback = 
				this.element
					.addClass("rup-feedback ui-widget ui-widget-content ui-corner-all")
					.addClass(opciones.imgClass!=null?opciones.imgClass:opciones.type!=null?"rup-feedback_image rup-feedback_image_"+opciones.type:"")
					.attr({ role: "alert" })
					.css("display", opciones.block?"block":"none")
					.css("visibility","hidden")
				.context.id;

			//Crear capa cierre
			opciones._divClose = $("<div />").html($.rup.i18nParse($.rup.i18n.base, "rup_global.cerrar"))
					.attr("id",opciones._idFeedback+"_closeDiv")
					.attr("title",$.rup.i18nParse($.rup.i18n.base,"rup_feedback.closingLiteral"))
					.addClass("rup-feedback_closeLink");
			
			//Si se define texto sacarlo
			if (opciones.message){
				this.set(opciones.message, opciones.type, opciones.imgClass);
			}
			
			delete opciones;
		},
		
		_addCloseLink: function () {
			var opciones = this.options;
			opciones._divClose.click(function(){ $("#"+opciones._idFeedback).rup_feedback("close"); });
			this.element.prepend(opciones._divClose);
			delete opciones;
		},
		
		destroy: function () {
			var opciones = this.options;
			this.element
				.removeClass()
				.removeAttr ("role")
				.css("cssText", "")
				.html("")
				.stop().animate({opacity:'100'}); //Por si está desapareciendo (hide)
			delete opciones;
			$.Widget.prototype.destroy.apply (this, arguments);
		},

		
		set: function (message, type, imgClass){
			var element = this.element,
			 	opciones = this.options;
			
			//En caso de que está desapareciendo parar animación
			element.stop().animate({opacity:'100'});
			
			//Gestión 'type'
			if (type != undefined){
				element.removeClass(opciones.imgClass);
				//Si se recibe type xxx se eliminan posibles tipo anterior y se establece ese
				if (opciones.type != null){
					element.removeClass("rup-feedback_image_" + opciones.type);
				} else {
					element.addClass("rup-feedback_image");
				}
				element.addClass("rup-feedback_image_" + type);
				opciones.type = type;
			} else if (type === null){
				//Si se recibe type 'null' se eliminan posibles tipos anteriores
				element.removeClass("rup-feedback_image rup-feedback_image_" + opciones.type);
				opciones.type = null;
			}
			
			//Gestión 'imgClass'
			if (imgClass != undefined) {
				if (opciones.imgClass != null) {
					element.removeClass(opciones.imgClass);
				}
				element.addClass(imgClass);
				opciones.imgClass = imgClass;
			} 
			
			//Sacar mensaje
			$("#"+opciones._idFeedback+"_content").remove();
			element.append($("<div/>").attr("id",opciones._idFeedback+"_content").html(message));
			//Añadir cierre (evento y capa)
			if (opciones.closeLink) {
				this._addCloseLink();
			}
			this.show();
			
			//Ir al inicio
			if (opciones.gotoTop){	
				$('html, body').animate({ scrollTop: '0px' }, 0);
			}
			//Ocultacion mensaje
			if (opciones.delay!=null) {
				this.hide();
			};
			delete element;
			delete opciones;
		},
		
		hide: function (delay, fadeSpeed){
			var opciones = this.options,
				element = this.element;
				
			//Si no se reciben parámetros se toman los valores de la configuración inicial
			if (delay == undefined) { 
				delay = opciones.delay;
			}
			if (fadeSpeed == undefined) {
				fadeSpeed = opciones.fadeSpeed;
			}
			element.delay(delay).fadeOut(eval(fadeSpeed), function(){
				$("#"+opciones._idFeedback).rup_feedback("close", true);
			});
			delete opciones;
			delete element;
		},
		
		close: function (notEmpty) {
			var element = this.element;
			element.css("display",this.options.block?"block":"none");
			element.css("visibility","hidden");
			if (notEmpty===undefined){
				element.empty();
			}
			delete element;
		},
		
		show: function () {
			var element = this.element;
			element.css("display","block");
			element.css("visibility","visible");
			
			// Se aplica el tooltip
			this.element.find("[title]").rup_tooltip({position:{at:"bottom center", my:"top center"},applyToPortal: true});
			
			delete element;

			jQuery(this.element).triggerHandler("rupFeedback_show");

		}
	});
})( jQuery );