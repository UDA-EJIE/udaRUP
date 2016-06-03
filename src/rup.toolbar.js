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
	
	$.rup_toolbar = $.rup_toolbar || {};
	$.extend($.rup_toolbar, {
		extend : function (methods) {
			$.fn.extend(methods);
		}
	});
	
	//Variable interna del toolbar para gestión de MButtons
	$.rup_toolbar.showingMB = null;
	
	$.rup_toolbar.extend({
		addButton : function (obj, json_i18n) { //añade a la toolbar un 'button'
			
			var buttonId, rightObjects;
			
			// Se obtiene el identificador del boton. En caso de no haberse indicado un valor en la propiedad id, se toma el valor de la propiedad i18nCaption.
			if (obj.id){
				buttonId = obj.id;
			}else{
				buttonId = obj.i18nCaption;
			}
			
			// Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
			if (buttonId.indexOf($(this).attr("id"))!==0){
				buttonId = $(this).attr("id")+"##"+buttonId;
			}
			
			var boton = $("<button type='button'/>").text($.rup.i18nParse(json_i18n,obj.i18nCaption)).addClass("rup-toolbar_button").attr({
				"id":buttonId				
			});
			
			
			boton.rup_button(obj);
			boton.button("option", "icons", {primary:obj.css, secondary:null} );
			
			
			
			// Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado	
			if(obj.right !== undefined && obj.right === true){
				//Añadir botón a la derecha
				var $div_rightObjects = this.children("div:not(.rup-dropdown-btn-group)");
				if ($div_rightObjects.length===0){
					$div_rightObjects = $("<div />").attr("id",this.attr("id")+"-rightButtons").css("float", "right");
					this.append($div_rightObjects);
				}
//				if (boton.parent().is(".rup-dropdown-btn-group")){
//					boton.parent().prependTo($div_rightObjects);
//				}else{
					boton.prependTo($div_rightObjects);
//				}
			} else {			
				if (boton.parent().is(".rup-dropdown-btn-group")){
					$(this).append(boton.parent());
				}else{
					$(this).append(boton);
				}
			}
			
			//Añadir evento keydown
			this._setKeyDown(boton);
			
			if (obj.click) { //Añadir eventos 
				boton.click({i18nCaption: obj.i18nCaption}, obj.click); 
			} 
			
			// Al perder el foco se elimina el estilo de disponer del foco
			boton.bind("focusout",function(){
				$(this).removeClass("ui-state-focus");
			});
			
			return boton;
		},
		
		addMButton : function (obj, json_i18n){ //añade a la toolbar un 'mbutton' (sin botones)
			var boton = '', buttonId;
			if (obj.id === undefined) {
				alert("El atributo ID es obligatorio en los MButtons.");
				boton = null;
			} else {
				buttonId = obj.id;
				// Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
				if (buttonId.indexOf($(this).attr("id"))!==0){
					buttonId = $(this).attr("id")+"##"+obj.id;
				}
				
				boton = $("<a/>").attr("id", buttonId).text($.rup.i18nParse(json_i18n,obj.i18nCaption)).addClass("rup-toolbar_menuButton");
				//Si no se define un estilo especial se aplica por defecto
				if (obj.css === undefined){
					obj.css = "rup-toolbar_menuButtonIcon";
				}
				boton.button().button("option", "icons", {primary:null, secondary:obj.css} );
			}
			
			// Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
			if(obj.right !== undefined && obj.right === true){
				//Añadir botón a la derecha
				var $div_rightObjects = this.children("div:not(.rup-dropdown-btn-group)");
				if ($div_rightObjects.length===0){
					$div_rightObjects = $("<div />").attr("id",this.attr("id")+"-rightButtons").css("float", "right");
					this.append($div_rightObjects);
				}
				boton.prependTo($div_rightObjects);
			} else {				
				$(this).append(boton);
			}
			
			//Añadir evento keydown
			this._setKeyDown(boton);
			
			if (obj.click) { //Añadir eventos 
				boton.click({i18nCaption: obj.i18nCaption}, obj.click); 
			} 
			return boton;
		},
		
		addButtonsToMButton : function (buttons, menuButton, json_i18n) { //añade botones al 'mbutton'
			var div, ul,
				//numero de botones a añadir
				length = buttons.length, boton, buttonId;
			
			if ($("[id='mbutton_"+menuButton.attr("id")+"']").length === 0){
				//Contenedor del menuButton
				div = $('<div>')
						.addClass("ui-widget ui-widget-content rup-toolbar_menuButtonContainer")
						.attr("id","mbutton_"+menuButton[0].id)
						.css("display","none");
				//Lista no numerada del menuButton
				ul = $('<ul>')
						.attr("role","menu")
						.attr("aria-activedescendant","active-menuitem")
						.attr("aria-labelledby","active-menuitem");
			} else {
				div = $("[id='mbutton_"+menuButton.attr("id")+"']");
				ul = div.children("ul");
			}
			
			menuButton.attr("href","#");
			
			//Se añaden cada uno de los botones del menuButton
			for (var i = length; i--; ) {
				
				boton = buttons[i];
				if (boton.id){
					buttonId = menuButton.attr("id")+"##"+boton.id;
				}else{
					buttonId = menuButton.attr("id")+"##"+boton.i18nCaption;
				}
				buttons[i].id=buttonId;
				
				ul.prepend($("<li>").css("display", "block").append(this.addButton(buttons[i],json_i18n).addClass("rup-toolbar_menuButtonElement")));
			}

			//Añadir elementos al DOM
			if(!$.rup_utils.aplicatioInPortal()){
				div.appendTo("body");
				div.append(ul);
			} else {
				div.append(ul);
				$(".r01gContainer").append(div);
			}
			
			//Borrar referencias
			delete ul;
			delete div;
		},
		
		showMButton : function () {//Muestra la capa con los mbuttons
				
				var self = $(this),
					top = self.offset().top + self.getTotalHeight(),
					showingMB = $.rup_toolbar.showingMB,
					actualMB = this.id;
				
				if (showingMB === actualMB) {
					$("[id='mbutton_" + actualMB+"']").slideUp("fast");
					self.removeClass("rup-toolbar_menuButtonSlided");
					showingMB = null;
				//Se pulsa sobre otro elemento
				} else {
					$("[id='mbutton_" + showingMB+"']").slideUp("fast");	
					$("[id='mbutton_" + actualMB+"']").css("position","absolute").css("top",top).css("left",self.offset().left).slideDown("fast");
					$("[id='" + showingMB+"']").removeClass("rup-toolbar_menuButtonSlided");
					self.addClass("rup-toolbar_menuButtonSlided");
					showingMB = actualMB;
				}

				$.rup_toolbar.showingMB = showingMB;
				
				delete actualMB;
				delete showingMB;
				delete top;
				delete self;
					
				return false;
		},
		disableButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("disable");
		},
		enableButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("enable");
		},
		pressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").addClass(css);
		},
		unpressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").removeClass(css);
		},
		tooglePressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").toggleClass(css);
		},
		refreshButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("refresh");
		},
		_setKeyDown : function(boton){
			boton.bind("keydown", function(event){
				var object = $(event.currentTarget), 
					objectParent = object.parent(), 
					nextObject;
				switch ( event.keyCode ) {
					case $.ui.keyCode.TAB:
						if(!event.shiftKey){
							if (object.next().attr("id") !== objectParent.attr("id")+"-rightButtons"){
								//Siguiente boton
								nextObject = object.next(":focusable");
							} else {
								//Primer botón de los alineados derecha
								nextObject = object.next().children(":focusable:first");
							}
							
							//Navegar entre botones
							if (nextObject.size() === 1){
								nextObject.focus();
								$.rup_toolbar.focusedExternally[objectParent.attr("id")] = true;
								return false;
							} 
						}
				}
			});
		}
	});
	
	$.rup_toolbar.hideMButtons = function () {
		var showingMB = $.rup_toolbar.showingMB;
		$("[id='mbutton_" + showingMB+"']").slideUp("fast");	
		$("[id='" + showingMB+"']").removeClass("rup-toolbar_menuButtonSlided");
		showingMB = null;
		$.rup_toolbar.showingMB = showingMB;
		delete showingMB;
	};
	
	$.fn.getTotalHeight = function(){//Función auxilliar que obtiene el alto total del boton, teniendo en cuenta todos los posibles paddings
		return $(this).height() + parseInt($(this).css('paddingTop')) + parseInt($(this).css('paddingBottom')) + parseInt($(this).css('borderTopWidth')) + parseInt($(this).css('borderBottomWidth'));
	};

    $.fn.rup_toolbar = function( properties ) {
		return this.each( function() {		
	    	//Carga de los valores por defecto para los atributos que no ha introducido el usuario
			var settings = $.extend({}, $.fn.rup_toolbar.defaults, properties),
				t = $(this),json_i18n, rightButtons = [];
			
			//Se guarda el marcador de foco de la botonera
			if ($.rup_toolbar.focusedExternally === undefined){
				$.rup_toolbar.focusedExternally = {};
			}
			$.rup_toolbar.focusedExternally[this.id] = false;
			
			settings.id = this.id;
			//Literales
			json_i18n = $.rup.i18n.app[settings.id];
			
			//Anyadir estilo
			t.addClass("rup-toolbar ui-widget-header ui-widget ui-widget-content");
			
			//Tamanyo
			if (settings.width!=null){
				t.width(settings.width);
			}
			
			//Asignar evento de ocultación de mbuttons cuando se pinche fuera de ellos
			$(document).click($.rup_toolbar.hideMButtons);
			//Botones
			for (var i = 0; i<settings.buttons.length ; i+=1) {
				var obj = settings.buttons[i];
				
				// Se apartan, para respetar la gestión del tabulador, los botones derechos para ser tratados posteriormente	
				if(!(obj.right !== undefined && obj.right === true)){
					//MButton
					if (obj.buttons){
						
						// el boton dispone de una definicion de botones anidados, por lo que es un mbutton
						mbutton =  t.addMButton ({id:obj.id, i18nCaption:obj.i18nCaption, css:obj.css, click:t.showMButton },json_i18n);
						
						if (mbutton !== null){
							t.addButtonsToMButton (obj.buttons, mbutton, json_i18n);
						}
					//Button	
					}else{
						t.addButton(obj,json_i18n);
					}
				} else {
					rightButtons.push(obj) ;
				}
			}
			
			for (var i = 0; i<rightButtons.length ; i+=1) {
				var dObj = rightButtons[i];
				
				//MButton
				if (dObj.buttons){
					// el boton dispone de una definicion de botones anidados, por lo que es un mbutton
					mbutton =  t.addMButton ({id:dObj.id, i18nCaption:dObj.i18nCaption, css:dObj.css, click:t.showMButton, right:dObj.right}, json_i18n);
					
					if (mbutton !== null){
						t.addButtonsToMButton (dObj.buttons, mbutton, json_i18n);
					}
				//Button	
				}else{
					t.addButton(dObj,json_i18n);
				}
			}
		});
	};
	
	/* VALORES POR DEFECTO */
	$.fn.rup_toolbar.defaults = {
		width: null,
		buttons:[],
		mbuttons:null
	};	
	
})(jQuery);