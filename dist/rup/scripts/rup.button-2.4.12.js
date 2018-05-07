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
 * @fileOverview Implementa el patrón RUP Button.
 * @author EJIE
 * @version 2.4.12
 */
(function ($) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	/**
	* Presenta un control de interación con el usuario. Se trata de extender los botones estandar del HTML para dotarles de mayores funcionalidades con las que mejorar la usabilidad de la aplicación.
	*
	* @summary Componente RUP Button.
	* @namespace jQuery.rup_button
	* @memberOf jQuery
	* @tutorial rup_button
	* @example
	* // Botón por defecto
	* $("#idButton").rup_button({});
	* // Botón desplegable
	* $("#idButtonDrop").rup_button({
	*	  dropdown:{
	*		  dropdownListId:"dropdownHtmlList"
	*	  }
	* });
	*/
	var rup_button = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_button", rup_button));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_button("extend",{
		addButtonToDropdown: function(buttons){


		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************

	$.fn.rup_button("extend",{
		_doDropdownListById: function ($dropdownButton, $container, dropdownSettings){
			var $dropdownList = jQuery("#"+dropdownSettings.dropdownListId);
			dropdownSettings.$dropdownList = $dropdownList;

			$container.append($dropdownList);
			$dropdownButton.on("click.rup_dopdown", function(event){
				$dropdownList.toggleClass("open");
				event.stopPropagation();

			});

			$dropdownList.on("click.rup_dopdown", function(event){
				event.stopPropagation();
			});

			jQuery(document).on("click.rup_dopdown.close", function(){
				$dropdownList.removeClass("open");
			});
		},
		_doDropdownByDialog: function($dropdownButton, $container, dropdownSettings){
			var $dropdownDialog = jQuery("#"+dropdownSettings.dropdownDialog).rup_dialog(dropdownSettings.dropdownDialogConfig);

			jQuery.extend(dropdownSettings.dropdownDialogConfig,{
				autoOpen:false,
				position:{my: "right top", at: "right bottom", of: $container}
			});

			// Estilos
			$dropdownDialog.parent().addClass("rup-dropdown-dialog");

			$dropdownButton.on("click", function(){
				$dropdownDialog.rup_dialog("open");
			});
		},
		_doDropdownByButtons: function($dropdownButton, $container, dropdownSettings){
			var $self = this, $ul = $("<ul>"), $li,
				buttons = dropdownSettings.buttons;

			$ul.attr({
				id: $self.attr("id")+"_dropdownList"
			}).addClass("rup-dropdown-option-list rup-toolbar_menuButtonContainer");

			for(var i=0; i<buttons.length; i++){
				$li = $("<li>");
				$self._addButtonToDropdown($li, buttons[i]);
				$ul.append($li);
			}

			$dropdownButton.on("click.rup_dopdown", function(event){
				$ul.toggleClass("open");
				event.stopPropagation();

			});

			$ul.on("click.rup_dropdown", function(event){
				event.stopPropagation();
			});

			jQuery(document).on("click.rup_dopdown.close", function(){
				$ul.removeClass("open");
			});


			$container.append($ul);

		},
		_addButtonToDropdown : function ($base, obj, json_i18n){ //añade a la toolbar un 'mbutton' (sin botones)
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

				boton = $("<a/>").attr("id", buttonId).text($.rup.i18nParse(json_i18n,obj.i18nCaption)).addClass("rup-toolbar_button");
				//Si no se define un estilo especial se aplica por defecto
				if (obj.css === undefined){
					obj.css = "rup-toolbar_menuButtonIcon";
				}
				boton.button().button("option", "icons", {primary:obj.css, secondary:null} );
			}


			$base.append(boton);

			//Añadir evento keydown
			this._setKeyDown(boton);

			if (obj.click) { //Añadir eventos
				boton.click({i18nCaption: obj.i18nCaption}, obj.click);
			}
			return boton;
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

	//*******************************
	// MÉTODO DE INICIALIZACION
	//*******************************
	$.fn.rup_button("extend", {
        /**
         * Método de inicialización del componente.
         *
         * @name jQuery.rup_button#_init
         * @function
         * @private
         */
		_init : function(args){
			var settings = $.extend(true, {}, $.fn.rup_button.defaults, args[0]),
			$self = this, $dropdownList, $container, dropdownSettings;



			// Comprobamos si se hace uso del dropdown
			if (settings.dropdown=== undefined || settings.dropdown === false){
				// Botón normal
				$self.button(settings);
				$self.addClass("rup-button");

			}else{
				// Inicialización del dropdown
				$.extend(true, settings.dropdown, $.fn.rup_button.dropdown_defaults, args[0].dropdown);

				dropdownSettings = settings.dropdown;

				$self.addClass("rup-button rup-dropdown");

				// Wrap into div
				$container = jQuery("<div>").attr("class","rup-dropdown-btn-group");

				$container = $self.wrap($container).parent();

				dropdownSettings.$container = $container;

				$self.button({});


				$self.addClass("rup-dropdown");


				var $dropdownButton = jQuery("<button>").attr({
					type: "button",
					id: $self.prop("id")+"_dropdown"

				}).text("Administración de filtros").button({
					icons:{
						primary: dropdownSettings.dropdownIcon
					},
					text: false
				}).addClass("rup-dropdown-button");

				$self.after($dropdownButton);

				if (dropdownSettings.dropdownListId){
					$dropdownList = jQuery("#"+dropdownSettings.dropdownListId);
					dropdownSettings.$dropdownList = $dropdownList;

					$container.append($dropdownList);
					$dropdownButton.on("click.rup_dopdown", function(event){
						$dropdownList.toggleClass("open");
						event.stopPropagation();

					});

					$dropdownList.on("click.rup_dopdown", function(event){
						event.stopPropagation();
					});

					jQuery(document).on("click.rup_dopdown.close", function(){
						$dropdownList.removeClass("open");
					});


				}else if (dropdownSettings.dropdownDialog){ // Configuracion del dropdown con un RUP dialog

					jQuery.extend(dropdownSettings.dropdownDialogConfig,{
						autoOpen:false,
						position:{my: "right top", at: "right bottom", of: $container}
					});
					var $dropdownDialog = jQuery("#"+dropdownSettings.dropdownDialog).rup_dialog(dropdownSettings.dropdownDialogConfig);

					// Estilos
					$dropdownDialog.parent().addClass("rup-dropdown-dialog");

					$dropdownButton.on("click", function(){
						$dropdownDialog.rup_dialog("open");
					});
				}else if (dropdownSettings.buttons){ // Configuración del dropdown a partir de buttons
						$self._doDropdownByButtons($dropdownButton, $container, dropdownSettings);
				}
			}

			// TODO : Invocación al plugin

		}
	});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************

  /**
   * @description Opciones por defecto de configuración del componente.
   *
   * @name jQuery.rup_button#defaults
   *
   * @property {boolean | Object} [dropdown=false] - Determina si el botón va a contar con un menú desplegable de acciones secundarias. En caso de mostrar un desplegable esta propiedad contendrá el objeto de configuración del mismo.
   */
	$.fn.rup_button.defaults = {
		dropdown:false
	};

  /**                                                                         
   * @description Opciones por defecto del objeto de configuración del menú desplegable asociado al botón.
   *
   * @name jQuery.rup_button#dropdown_defaults
   *
   * @property {string} [dropdownIcon=ui-icon-triangle-1-s] - Clase css correspondiente al icono del control que despliega el menú.
   */
	$.fn.rup_button.dropdown_defaults ={
		dropdownIcon: "ui-icon-triangle-1-s",
		dropdownListId: undefined,
		dropdownDialog: undefined,
		dropdownDialogConfig:{
			type: $.rup.dialog.DIV
		}
	};

})(jQuery);
