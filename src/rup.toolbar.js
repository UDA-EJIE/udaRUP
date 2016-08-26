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
 * @fileOverview Implementa el patrón RUP Toolbar.
 * @author EJIE
 * @version 2.4.8
 */
 ( function( factory ) {
 	if ( typeof define === "function" && define.amd ) {

 		 // AMD. Register as an anonymous module.
 		 define( ["jquery","./rup.base","blockUI" ], factory );
 	} else {

 		 // Browser globals
 		 factory( jQuery );
 	}
 } ( function( $ ) {

    /**
    * Se les presenta a los usuarios una barra de botones con diversas funcionalidades relacionadas a elementos de la página. Gracias a este componente se presentan, ordenan y agrupan las distintas funcionalidades gestionadas por las aplicaciones.
    *
    * @summary Componente RUP Toolbar.
    * @namespace jQuery.rup_toolbar
    * @memberOf jQuery
    * @tutorial rup_toolbar
    * @example
    * var properties = {
	*	width: 1000,
	*	buttons:[
	*		{i18nCaption:"buscar", css:"buscar", click: handlerBoton },
    *       {i18nCaption:"editar", css:"editar", click: handlerMButtons},
	*		{id : "mbuton2", i18nCaption:"ficheros", buttons:[
   	*		    {i18nCaption:"DLL", css:"dll", click: handlerMButtons },
   	*			{i18nCaption:"DOC", css:"doc", click: handlerMButtons},
   	*			{i18nCaption:"EXE", css:"exe", click: handlerMButtons},
   	*			{i18nCaption:"GIF", css:"gif", click: handlerMButtons},
   	*		]},
   	*		{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons}
	*	]
    * };
    *
    * $("#idToolbar").rup_toolbar(properties);
    */
	$.rup_toolbar = $.rup_toolbar || {};
	$.extend($.rup_toolbar, {
		extend : function (methods) {
			$.fn.extend(methods);
		}
	});

    /**
    * Función de callback a ejecutar cuando se realiza un click sobre un botón de la botonera.
    *
    * @callback jQuery.rup_toolbar~buttonClick
    * @param {Event} event - Objeto correspondiente al evento click realizado sobre el botón.
    * @param {string} event.data.id - Identificador del botón que ha lanzado el evento.
    * @param {string} event.data.caption - Texto del botón que ha lanzado el evento.
    * @example
    * var newButton = {
    *   i18nCaption:"editButton",
    *   click: function(event){
    *
    *   }
    * };
    *
    * $("#idToolbar").rup_toolbar("addButton", newButton);
    */

    /**
    * Definición del tipo de objeto que representa un botón de la botonera.
    *
    * @typedef {Object} jQuery.rup_toolbar~button
    * @property {string} [id] - Identificador único del botón con menú.
    * @property {string} [i18nCaption] - Texto que se mostrará en el botón. Se indica el key del literar que se obtendrá de los ficheros de internacionalización correspondientes.
    * @property {string} [css] - Define el estilo a aplicar. Se utilizará para mostrar imágenes a la izquierda del botón.
    * @property {boolean} [right=false] - Determina si el botón aparece alineado a la derecha (true) o a la izquierda (false).
    * @property {jQuery.rup_toolbar~buttonClick} click - Función javascript que se ejecutará cuando se pulse el botón al que se ha asociado.
    */

    /**
    * Definición del tipo de objeto que representa un mButton de la botonera.
    *
    * @typedef {Object} jQuery.rup_toolbar~mButton
    * @property {string} id - Identificador único del botón con menú.
    * @property {string} [i18nCaption] - Texto que se mostrará en el botón. Se indica el key del literar que se obtendrá de los ficheros de internacionalización correspondientes.
    * @property {string} [css] - Define el estilo a aplicar. Se utilizará para mostrar imágenes a la izquierda del botón.
    * @property {boolean} [right=false] - Determina si el botón aparece alineado a la derecha (true) o a la izquierda (false).
    * @property {jQuery.rup_toolbar~button[]} buttons - Botones que va a incluir el botón con menú.
    */

	//Variable interna del toolbar para gestión de MButtons
	$.rup_toolbar.showingMB = null;

	$.rup_toolbar.extend({
        /**
        * Añade un nuevo botón a la botonera. Las características del botón se especifican en los parámetros del método.
        *
        * @name jQuery.rup_toolbar#addButton
        * @function
        * @property {jQuery.rup_toolbar~button} obj - Objeto que define el botón a añadir.
        * @property {object} json_i18n - Objeto json con los recursos de i18n.
        * @example
        * var button = {
        *   i18nCaption:"editButton",
        *   css:"editar"
        * };
        *
        * $("#idToolbar").rup_date("addButton", button);
        */
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
		/**
        * Añade un nuevo menu button a la botonera. Las características del mButton se especifican en los parámetros del método.
        *
        * @name jQuery.rup_toolbar#addMButton
        * @function
        * @property {jQuery.rup_toolbar~mButton} obj - Objeto que define el mButton a añadir.
        * @property {object} json_i18n - Objeto json con los recursos de i18n.
        * @example
        * var mButton = {
        *   id: "mbuton1", i18nCaption:"otros", buttons:[
		*	    {i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},
        *       {i18nCaption:"editar", css:"editar", click: handlerMButtons},
		*       {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons}
        *   ]
        * };
        *
        * $("#idToolbar").rup_date("addMButton", mButton);
        */
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

        /**
        * Se añaden un conjunto de botones a un menu button existente.
        *
        * @name jQuery.rup_toolbar#addButtonsToMButton
        * @function
        * @property {jQuery.rup_toolbar~button[]} buttons - Array de botones a añadir al menu button.
        * @property {string} menuButton - Identificador del menu button al que vamos a añadir los botones.
        * @property {object} json_i18n - Objeto json con los recursos de i18n.
        * @example
        * var buttons = [
		*	    {i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},
        *       {i18nCaption:"editar", css:"editar", click: handlerMButtons},
		*       {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons}
        * ];
        *
        * $("#idToolbar").rup_date("addMButton", "mbuton1", buttons);
        */
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
		/**
        * Se muestra la capa con los mButtons
        *
        * @name jQuery.rup_toolbar#showMButton
        * @function
        * @example
        * $("#idToolbar").rup_date("showMButton");
        */
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
        /**
        * Desabilita el botón correspondiente al identificador indicado.
        *
        * @name jQuery.rup_toolbar#disableButton
        * @function
        * @param {string} id - Identificador del botón que se desea deshabilitar.
        * @example
        * $("#idToolbar").rup_date("disableButton","idEditButton");
        */
		disableButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("disable");
		},
        /**
        * Habilita el botón correspondiente al identificador indicado.
        *
        * @name jQuery.rup_toolbar#enableButton
        * @function
        * @param {string} id - Identificador del botón que se desea habilitar.
        * @example
        * $("#idToolbar").rup_date("enableButton","idEditButton");
        */
		enableButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("enable");
		},
        /**
        * Añade el estilo de css indicado para simular un estado press en el botón.
        *
        * @name jQuery.rup_toolbar#pressButton
        * @function
        * @param {string} id - Identificador del botón.
        * @param {string} css - Css asociado al estado press.
        * @example
        * $("#idToolbar").rup_date("pressButton","idEditButton","preesed-button");
        */
		pressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").addClass(css);
		},
        /**
        * Elimina el estilo de css indicado para simular un estado press en el botón.
        *
        * @name jQuery.rup_toolbar#unpressButton
        * @function
        * @param {string} id - Identificador del botón.
        * @param {string} css - Css asociado al estado press.
        * @example
        * $("#idToolbar").rup_date("unpressButton","idEditButton","preesed-button");
        */
		unpressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").removeClass(css);
		},
        /**
        * Alterna el estado del estilo de css indicado para simular un estado press en el botón.
        *
        * @name jQuery.rup_toolbar#tooglePressButton
        * @function
        * @param {string} id - Identificador del botón.
        * @param {string} css - Css asociado al estado press.
        * @example
        * $("#idToolbar").rup_date("tooglePressButton","idEditButton","preesed-button");
        */
		tooglePressButton : function(id, css){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").toggleClass(css);
		},
        /**
        * Actualiza el botón al estado que determina la configuración actual.
        *
        * @name jQuery.rup_toolbar#refresh
        * @function
        * @param {string} id - Identificador del botón.
        * @example
        * $("#idToolbar").rup_date("refresh");
        */
		refreshButton : function(id){
			if (id.indexOf(this.attr("id"))===-1){
				id = this.attr("id")+"##"+id;
			}
			$("[id='"+id+"']").button("refresh");
		},
        /**
        * Configura la gestión de eventos de teclado en el botón.
        *
        * @name jQuery.rup_toolbar#_setKeyDown
        * @function
        * @private
        * @param {object} boton - Referencia al button.
        */
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

    /**
     * @description Propiedades de configuración del componente.
     *
     * @name jQuery.rup_toolbar#options
     * @property {Integer} [width=null] - Tamaño que tendrá la botonera. Por defecto ocupará toda la página.
     * @property {jQuery.rup_toolbar~button[]} [buttons] - Array de botones a mostrar.
     * @property {jQuery.rup_toolbar~mButton[]} [mbuttons] - Array de botones con menú a mostrar.
     */

}));
