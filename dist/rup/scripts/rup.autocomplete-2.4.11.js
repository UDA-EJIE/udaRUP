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
 * @fileOverview Implementa el patrón RUP Autocomplete.
 * @author EJIE
 * @version 2.4.11
 */
(function ($) {

	//****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************

	/**
	* Permite al usuario recuperar un elemento de una gran lista de elementos o de varias listas dependientes de forma sencilla y ocupando poco espacio en la interfaz.
	*
	* @summary Componente RUP Autocomplete.
	* @namespace jQuery.rup_autocomplete
	* @memberOf jQuery
	* @tutorial rup_autocomplete
	* @example
	* $("#idAutocomplete").rup_autocomplete({
	*	source : "autocomplete/remote",
	*	sourceParam : {label:"desc"+$.rup_utils.capitalizedLang(), value:"code"}
	* });
	*/
	var rup_autocomplete = {};

	$.extend( $.ui.autocomplete.prototype, {
		_renderMenu: function(ul, items ){
		var settings =this.options;

		if (settings.category){
			//categorización de los resultados
			var that = this,
			 currentCategory = "";
			 $.each( items, function( index, item ) {
			 var li;
			 if ( item.category != currentCategory ) {
				 ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
			 	currentCategory = item.category;
			 }
			 	li = that._renderItem( ul, item );
			 if ( item.category ) {
				 li.attr( "aria-label", item.category + " : " + item.label );
			 }
			 });
		}
		else{
			var self = this;
			$.each( items, function( index, item ) {
				self._renderItem( ul, item );
			});
		}
		}
	});

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_autocomplete", rup_autocomplete));

	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_autocomplete("extend",{
	/**
	 * Método utilizado para obtener el valor del componente. Este método es el utilizado
	por el resto de componentes RUP para estandarizar la obtención del valor del Autocomplete.
	 *
	 * @name jQuery.rup_autocomplete#getRupValue
	 * @function
	 * @return {string | number} - Devuelve el valor actual del componente seleccionado por el usuario.
	 * @example
	 * $("#idAutocomplete").rup_autocomplete("getRupValue");
	 */
		getRupValue : function(){
			return $(this).val();
		},
		/**
     * Método utilizado para asignar el valor al componente. Este método es el utilizado por
el resto de componentes RUP para estandarizar la asignación del valor al Autocomplete.
     *
     * @name jQuery.rup_autocomplete#setRupValue
     * @function
     * @param {string | number} param - Valor que se va a asignar al componente.
     * @example
     * $("#idAutocomplete").rup_autocomplete("setRupValue", "Si");
     */
		setRupValue : function(value){
			var $self = this, data = $self.data("rup.autocomplete"), $hidden, loadObjects, newObject = {};

			if(data){

				// Comprobamos si tiene la referencia al campo hidden
				if (data.$hiddenField){
					data.$hiddenField.attr("rup_autocomplete_label",value);

					loadObjects = $self.data("loadObjects");
					newObject[value]=data.$hiddenField.val();
					$self.data("loadObjects", jQuery.extend(true, {}, loadObjects, newObject));
				}

				if (data.$labelField){
					loadObjects = data.$labelField.data("loadObjects");
					newObject[$self.attr("rup_autocomplete_label")]=value;
					data.$labelField.data("loadObjects", jQuery.extend(true, {}, loadObjects, newObject));
				}
			}

			$(this).val(value);
		},
    /**
     * Elimina el autocomplete.
     *
     * @name jQuery.rup_autocomplete#destroy
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("destroy");
     */
		destroy:function(){
			var self;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			self.autocomplete("destroy");
		},
    /**
     * Deshabilita el autocomplete (solo la parte de sugerencias, el input sigue habilitado).
     *
     * @name jQuery.rup_autocomplete#off
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("off");
     */
		off:function(){
			var self;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			self.storeEvents();
		},
    /**
     * Habilita el autocomplete (solo la parte de sugerencias).
     *
     * @name jQuery.rup_autocomplete#on
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("on");
     */
		on:function(){
			var self;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			self.restoreEvents();
		},
    /**
     * Deshabilita el autocomplete. Internamente invoca al método {@link jQuery.rup_autocomplete#off}.
     *
     * @name jQuery.rup_autocomplete#disable
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("disable");
     */
		disable:function(){
			var self, settings;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			settings = self.data("settings");

			if (settings.combobox){
				settings.$comboboxToogle.button("disable")
			}

			self.attr("disabled","disabled");
		},
    /**
     * Habilita el autocomplete. Internamente invoca al método {@link jQuery.rup_autocomplete#on}.
     *
     * @name jQuery.rup_autocomplete#enable
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("enable");
     */
		enable:function(){
			var self, settings;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			settings = self.data("settings");

			if (settings.combobox){
				settings.$comboboxToogle.button("enable")
			}

			self.removeAttr("disabled");
		},
    /**
     * Permite consultar y modificar la configuración del componente.
     *
     * @name jQuery.rup_autocomplete#option
     * @param {string | object} optionName - Nombre de la propiedad que se desea gestionar o objeto de compuesto de varias propiedades.
     * @param {*} [value] - Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro.
     * @param {*} aux - Parámetro extra de confirguración para la propiedad "source".
     * @function
     * @example
     * // Establecer una propiedad
     * $("#idAutocomplete").rup_autocomplete("option", "minLegth", 2);
     * // Establecer varias propiedad
     * $("#idAutocomplete").rup_autocomplete("option", {minLegth:2, delay:1000});
     */
		option: function (optionName, value, aux){
			var self;

			if ($(this).attr("id").indexOf("_label") >= 0){
				self = $(this);
			} else {
				self = $("#"+$(this).attr("id")+"_label");
			}

			var settings = self.data("settings");
			if (optionName === "source"){
				if (typeof value === "object"){
					//LOCAL
					if (aux !== undefined){
						settings.i18nId = aux;
					} else {
						settings.i18nId = settings.id ;
					}
					self.autocomplete("option" , optionName , this._sourceLOCAL);
					self.autocomplete("option" , "minLength" , settings.minLength !== undefined?settings.minLength:0);
				} else {
					if (aux !== undefined){
						if (optionName=="data"){
							self.autocomplete("option" , "data" , aux);
						}else{
						//REMOTO
						settings.sourceParam = aux;
						//Nos aseguramos que el número mínimo de teclas para búsquedas sea 3
						self.autocomplete("option" , optionName , this._sourceREMOTE);
						self.autocomplete("option" , "minLength" , settings.minLength>3?settings.minLength:3);
						}
					} else {
						return undefined;
					}
				}
				settings.data = value;
				self.data("settings",settings);
			} else {
				settings[optionName] = value;
				self.data("settings",settings);
				self.autocomplete("option" , optionName , value);
			}
		},
    /**
     * Lanza una búsqueda en el autocomplete con el parámetro indicado y el foco va a parar al
input.
     *
     * @name jQuery.rup_autocomplete#search
     * @param {string} term - Cadena de texto utilizada para realizar la búsqueda.
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("search", "java");
     */
		search: function(term){
			//Si tiene eventos (no está deshabilitado) se hace búsqueda
			if ($._data($(this)[0], "events") !== undefined){
				$(this).focus();
				$(this).val(term);
				$(this).autocomplete("search",term);
			}
		},
    /**
     * Oculta el autocomplete.
     *
     * @name jQuery.rup_autocomplete#close
     * @function
     * @example
     * $("#idAutocomplete").rup_autocomplete("close");
     */
		close:function(){
			$(this).autocomplete("close");
		},
    /**
     * Devuelve el valor del autocomplete. Este es el valor que se guarda en el campo oculto antes descrito al final del apartado 7.Para obtener la descripción (dato que se muestra en el input) se invocará a la función estándar de jQuery.
     *
     * @name jQuery.rup_autocomplete#val
     * @function
     * @example
     * // Recuperar el valor
     * $("#idAutocomplete").rup_autocomplete("val");
     * // Recuperar la descripción
     * $("#idAutocomplete").val();
     */
		val:function(){
			return $("#"+$(this).attr("id")).val();
		},
    /**
     * Método utilizado para asignar el valor y el literal al componente. El valor se almacena en el campo hidden creado por el componente. El contenido indicado en la propiedad label se mostrará en el campo input del componente.
     *
     * @name jQuery.rup_autocomplete#set
     * @function
     * @param {string | number} value - Valor que se va a almacenar en el campo hidden y que se corresponde con el value seleccionado.
     * @param {string} label - Texto que se va a mostrar en el campo de texto del componente.
     * @example
     * $("#idAutocomplete").rup_autocomplete("set", "48", "Bizkaia");
     */
		set:function(value, label){
			var $self = $(this), $selfLabel = jQuery("[id='"+$self.attr("id")+"_label']"), loadObjects, newObject={};

			$self.val(value);
			$self.attr("rup_autocomplete_label",label);
			$selfLabel.val(label);
			loadObjects = $selfLabel.data("loadObjects");
			newObject[label]=value;
			$selfLabel.data("loadObjects", jQuery.extend(true, {}, loadObjects, newObject));

		}
	});

	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_autocomplete("extend", {
    /**
     * Procesa los elementos recibidos en la respuesta de la petición de búsqueda realizada.
     *
     * @name jQuery.rup_autocomplete#_parseResponse
     * @function
     * @private
     * @param {string} term - Cadena de texto empleada para realizar la búsqueda.
     * @param {string} label - Texto a mostrar del elemento enviado en la respuesta.
     * @param {string | number} value - Valor del elemento enviado en la respuesta.
     * @param {string} [category] - Texto identificador de la categoría del elemento en el caso de que exista.
     */
		_parseResponse : function(term, label, value, category) {
				if (category===undefined){
					return {

						label: label.replace(
									new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +$.ui.autocomplete.escapeRegex(term) +	")(?![^<>]*>)(?![^&;]+;)", "gi"),
									"<strong>$1</strong>"
							),
						value: value
					};

			}else{
				return {

					label: label.replace(
								new RegExp("(?![^&;]+;)(?!<[^<>]*)(" +$.ui.autocomplete.escapeRegex(term) +	")(?![^<>]*>)(?![^&;]+;)", "gi"),
								"<strong>$1</strong>"
						),
					value: value,
					category: category
				};
			}

		},
		/**
		 * Procesa la respuesta a partir de una petición de búsqueda sobre una fuente de datos local.
		 *
		 * @name jQuery.rup_autocomplete#_sourceLOCAL
		 * @function
		 * @private
		 * @param {object} request - Objeto que contiene la petición de búsqueda.
		 * @param {object} response - Objeto que contiene la respuesta a partir de la fuente de datos local.
		 */
			_sourceLOCAL : function (request, response) {
				var settings, loadObjects = {}, returnValue, stock;

				if (this.element.data("settings") !== undefined){
					settings = this.element.data("settings");
				}else{
					settings = this.options;
				}

				if (settings.loadObjects !== undefined){
					stock = settings.loadObjects;
				} else {
					stock = settings.id;
				}


				var matcher = settings.contains?$.ui.autocomplete.escapeRegex(request.term):"^" +$.ui.autocomplete.escapeRegex(request.term),
					json_i18n = $.rup.i18n.app[settings.i18nId];
				matcher = new RegExp(matcher, "i");
				data = $.map(settings.data,function(item) {
					var label=item, value=item, category;
					if (typeof item === "object"){ //multi-idioma
						if(item["i18nCaption"] !== undefined){
							label = $.rup.i18nParse(json_i18n,item["i18nCaption"]);
						} else if (item["label"] !== undefined){
							label = item["label"];
						} else {
							label = item["value"];
						}
						value = item["value"];
						if (settings.category)
							category=item["category"];
					}
					if (!request.term || matcher.test(label)) {
						if (settings.category)
							returnValue = settings._parseResponse(request.term, label, value, category);
						else
							returnValue = settings._parseResponse(request.term, label, value);
						loadObjects[returnValue.label.replace(/<strong>/g,"").replace(/<\/strong>/g,"")] = returnValue.value ;
						return returnValue;
					};
				});

				//Se almacenan los datos cargados
				$("#"+stock).data("loadObjects",loadObjects);

				//Eliminar elementos vacíos
				data = $.grep(data, function(value) { return value != undefined; });
				response(data);
			},
				/**
	       * Procesa la respuesta a partir de una petición de búsqueda sobre una fuente de datos remota.
	       *
	       * @name jQuery.rup_autocomplete#_sourceREMOTE
	       * @function
	       * @private
	       * @param {object} request - Objeto que contiene la petición de búsqueda.
	       * @param {object} response - Objeto que contiene la respuesta a partir de la fuente de datos remota.
	       */
			_sourceREMOTE : function (request, response){
				//Se escapan los comodines/wildcards de BD
				var $self = this.element ,settings, loadObjects = {}, returnValue, stock, term, data, lastTerm, bckData, $stock;

				if (this.element.data("settings") !== undefined){
					settings = this.element.data("settings");
				}else{
					settings = this.options;
				}

				if (settings.loadObjects !== undefined){
					stock = settings.loadObjects;
				} else {
					stock = settings.id;
				}

				$stock = jQuery("#"+stock);

				term = request.term.replace(/%/g,"\\%").replace(/_/g,"\\_");
				data = $.extend({q:term,c:this.options.contains},this.options.extraParams);

				// Comprobar si se puede cachear
				lastTerm = $stock.data("tmp.loadObjects.term");

				if (term.indexOf(lastTerm)===0){

					$stock.data("tmp.loadObjects.term",term);

					bckData = settings.data;

					settings.data = $stock.data("tmp.data");
					jQuery.proxy(settings.$self._sourceLOCAL, this, request, response)();
					settings.data = bckData;

				}else{

					$.rup_ajax({
						url: settings.data,
						data : data,
						dataType: 'json',
						contentType: 'application/json',
						//Cabecera RUP
						beforeSend: function (xhr){
							//LOADING...
							$("#"+settings.id+"_label").addClass("rup-autocomplete_loading");

							xhr.setRequestHeader("RUP", $.toJSON(settings.sourceParam));
						},
						success: function(data) {

							$self.triggerHandler("rupAutocomplete_beforeLoadComplete", [data]);
							//Si no hay datos en el autocomplete que se cierre
							if (data.length==0){
								jQuery("#"+settings.id+"_label").autocomplete("close");
								return null;
							}
							response($.map(data, function(item) {
								if (settings.category==true)
									returnValue =  settings._parseResponse(request.term, item["label"], item["value"], item["category"]);
								else

									returnValue =  settings._parseResponse(request.term, item["label"], item["value"]);

								loadObjects[returnValue.label.replace(/<strong>/g,"").replace(/<\/strong>/g,"")] = returnValue.value ;
								return returnValue;
							}));

							//se almacenan los datos cargados
							$stock.data("loadObjects",loadObjects);
							$stock.data("tmp.loadObjects.term",term);
							$stock.data("tmp.data",data);

							$self.triggerHandler("rupAutocomplete_loadComplete", [data]);
						},
						error: function (xhr, textStatus, errorThrown){
							if (settings.onLoadError!==null && typeof settings.onLoadError === "function"){
								jQuery(settings.onLoadError(xhr, textStatus, errorThrown));
							}else{
								$.rup.showErrorToUser($.rup.i18n.base.rup_autocomplete.ajaxError);
							}
						},
						complete: function(xhr, textStatus) {
							//UNLOADING...
							$("#"+settings.id+"_label").removeClass("rup-autocomplete_loading");
						}
					});

				}
			},
			/**
       * Función encargada de crear el control encargado de mostrar todos los resultados cuando el componente tiene activado el modo de funcionamiento combobox.
       *
       * @name jQuery.rup_autocomplete#_createShowAllButton
       * @function
       * @private
       */
			_createShowAllButton : function(settings) {
				var input = this, wasOpen = false;
				input.wrap(jQuery("<span>").addClass("rup-combobox"));
				var $wrapper = input.parent();
				var $button = $("<a>").attr("tabIndex", -1).attr("title",
						$.rup.i18n.base.rup_autocomplete.showAllItems).rup_tooltip().rup_button({
					icons : {
						primary : "ui-icon-triangle-1-s"
					},
					text : false
				}).removeClass("ui-corner-all").addClass(
						"rup-combobox-toggle ui-corner-right")
						.mousedown(
								function() {
									wasOpen = input.autocomplete(
											"widget")
											.is(":visible");
								}).click(function() {
							input.focus();
							// Close if already visible
							if (wasOpen) {
								return true;
							}
							// Pass empty string as value to search
							// for, displaying all results
							input.autocomplete("search", "");
						});

				$button.appendTo($wrapper);
				settings.$comboboxToogle = $button;
			},
			/**
       * Método de inicialización del componente.
       *
       * @name jQuery.rup_autocomplete#_init
       * @function
       * @private
       */
			_init : function(args){
				
				
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					//Se recogen y cruzan las paremetrizaciones del objeto
					var $self = $(this), settings = $.extend({}, $.fn.rup_autocomplete.defaults, args[0]),
						name = $(this).attr("name"),
						selected_value;

					$(this).attr("ruptype","autocomplete");

					//Recopilar datos necesarios
					settings.id = $(this).attr("id");
					settings.loadObjects = settings.id;
					settings.data = settings.source; //Guardar los datos en "data" ya que source la emplea autocomplete internamente
					settings._parseResponse = this._parseResponse; //Guardar referencia a rup.autocomplete para invocar las funciones privadas
					settings._sourceLOCAL = this._sourceLOCAL; //Guardar referencia a rup.autocomplete para invocar las funciones privadas
					settings.$self = this; //Guardar referencia a rup.autocomplete para invocar las funciones privadas

					//Guardar valor del INPUT
					settings.loadValue = $("#"+settings.id).attr('value');

					//Si no se recibe identificador para el acceso a literales se usa el ID del objeto
					if (!settings.i18nId){ settings.i18nId = settings.id; }

					//Eventos
					//*******
						//Guardar referencia
						settings._change = settings.change;
						settings._select = settings.select;
						settings._focus = settings.focus;

						//Sobrecargar tratamiento
						settings.change = function(event, ui) {
							if(selected_value != null){//Puede que se ejecute este evento sin ejecutarse el select. Con esta condición nos aseguramos
								$("#"+event.target.id).val(selected_value);
								$("#"+event.target.id).focus();
							}
							selected_value = null;
							if (settings._change!==undefined){settings._change(event,ui);}
							$self.triggerHandler('rupAutocomplete_change');
						};
						settings.select = function(event, ui) {
						 	selected_value = ui.item["label"].replace(/<strong>/g,"").replace(/<\/strong>/g,"");
							if (settings._select!==undefined){settings._select(event, ui);}
							$("#"+settings.id).attr("rup_autocomplete_label",selected_value);
							$("#"+settings.id).data("selected",true);
							$self.triggerHandler("rupAutocomplete_select", [ui]);
						};
						settings.focus = function(event, ui) {
							$("#"+event.target.id).val(ui.item["label"].replace(/<strong>/g,"").replace(/<\/strong>/g,""));
							if (settings._focus!==undefined){settings._focus(event, ui);}
							return false; //Evitar acciones jquery.autocomplete.js
						};


					//Generación de campo oculto para almacenar 'value' (en el input definido se guarda el 'label')
					var $hidden = $("<input>").attr({
						type:"hidden",
						id: settings.id+"_value",
						name: (settings.valueName===null?name:settings.valueName),
						ruptype:"autocomplete"
					});

					$("#"+settings.id).after($hidden)
									  .attr("name", (settings.labelName===null?name+"_label":settings.labelName))
									  .addClass("rup-autocomplete_label");

//					settings.$hidden = $hidden;

					if (typeof settings.source === "object"){
						//LOCAL
						settings.source = this._sourceLOCAL;
					} else {
						//REMOTO
						//Nos aseguramos que el número mínimo de teclas para búsquedas sea 3
						settings.minLength = settings.minLength>3?settings.minLength:3;
						settings.source = this._sourceREMOTE;
					}

					//Se prepara el almacenaje de datos
					$("#"+settings.id).data("loadObjects",{});

					if (settings.combobox===true){
						$("#"+settings.id).addClass("rup-combobox-input ui-corner-left");
						settings.minLength = 0;
					}


					jQuery(settings.appendTo).addClass("ui-front");

					//Invocación al componente subyacente
					jQuery("#"+settings.id).autocomplete(settings);

					//Se anyade un id al menu desplegable del autocomplete
					settings.$menu = jQuery("#"+settings.id).data("autocomplete").menu.element.attr("id",settings.id+"_menu");

					//override mousedown para corregir el fallo del scrollbar en IE (bug 5610)
					settings.$menu.off("mousedown");
					// prevent the close-on-blur in case of a "slow" click on the menu (long mousedown) y corrección del bug 5610 (scrollbar en IE)
					settings.$menu.on("mousedown",function(event) {

					var menuElement =jQuery("#"+settings.id+"_menu")[0];

						if ( !$( event.target ).closest( ".ui-menu-item" ).length ) {
							setTimeout(function() {
								$( document ).one( 'mousedown', function( event ) {
									if ( event.target !== jQuery("#"+settings.id+"_label") &&
										event.target !== menuElement &&
										!$.ui.contains( menuElement, event.target ) ) {
										jQuery("#"+settings.id+"_label").autocomplete("close");
									}
								});
							}, 1 );
						}else{

							$("#"+settings.id+"_label").triggerHandler("blur");
						}

					// use another timeout to make sure the blur-event-handler on the input was already triggered
						setTimeout(function() {
							clearTimeout($("#"+settings.id+"_label").data("autocomplete").closing );
						}, 13);
					})

					if (settings.combobox===true){
						this._createShowAllButton(settings);
					}



					// Altura del menu desplegable
					if (settings.menuMaxHeight!==false){
						jQuery("#"+settings.id).on("autocompleteopen",function(){
							settings.$menu.css("overflow-y","auto")
								.css("overflow-x","hidden")
								.css("max-height",settings.menuMaxHeight)
								.css("width",jQuery('#'+settings.id+"_label").innerWidth());
						});
					}

					//Buscar el UL del autocomplete y colocarlo tras el elemento sobre el que debe ir
					//$("#"+settings.id).after($("body > .ui-autocomplete"));


					//Buscar el UL del autocomplete y colocarlo tras el elemento sobre el que debe ir

					if (settings.menuAppendTo!==null){
						if (jQuery(settings.menuAppendTo).length===0){
							alert("Es necesario especificar un selector válido para la propiedad menuAppendTo");
						}else{
							jQuery(settings.menuAppendTo).append(settings.$menu);
						}
					}else{
						if($.rup_utils.aplicatioInPortal()){
	//						$("div.r01gContainer").append($("body > .ui-autocomplete"));
							$("div.r01gContainer").append(settings.$menu);
						}
					}



					//Valor por defecto
					if (settings.defaultValue) { $("#"+settings.id).rup_autocomplete("search", settings.defaultValue); }

					//Valor pre-cargado
					if(settings.loadValue) {
						$("#"+settings.id).val(settings.loadValue);
						$("#"+settings.id+"_value").val(settings.loadValue);
					}

					// Modificar identificadores
					settings.loadObjects = settings.id+"_label";
					$("#"+settings.id).attr("id", settings.id+"_label");
					$("#"+settings.id+"_value").attr("id", settings.id);


					//eventos internos de borrado y perdida de foco
					$("#"+settings.id+"_menu").on('mousedown',function (event){
						var selected = $("#"+settings.id).data("selected"),
						isShowingMenu = $(".ui-autocomplete:visible").length>0?true:false;
						if(!selected && isShowingMenu){
							$("#"+settings.id).data("ieIssueScrollVisible",true);
							event.preventDefault();
						}

					});
					
					$("#"+settings.id+"_label").bind("keydown", function(event){
						
						$("#"+settings.id).data("ieIssueScrollVisible",false);
					});
					
					
					
					$("#"+settings.id+"_label").bind("blur", function(event){
						//Obtener datos de si viene de seleccionar elemento o si el menú de selección está desplegado
						var selected = $("#"+settings.id).data("selected"),
							isShowingMenu = $(".ui-autocomplete:visible").length>0?true:false;
						//Borrar índicador de que viene de seleccionar elemento
						$("#"+settings.id).data("selected",false);
						//Si es un evento de teclado pero no es ENTER, omitir esta función
						if (event.type==="keydown" && event.keyCode!==13){return true;}						
						if ($("#"+settings.id).data("ieIssueScrollVisible")===true)
							{
								$("#"+settings.id).focus();
								event.stopPropagation();
								$("#"+settings.id).data("ieIssueScrollVisible",false);
								return true;
							}



						var autoCompObject = $(event.currentTarget),
							loadObjects = $("#"+settings.loadObjects).data("loadObjects");

						if (settings.getText==true){
							if(loadObjects[autoCompObject.val()] !== undefined){
								$("#"+settings.id).val(autoCompObject.val());
								$("#"+settings.id).attr("rup_autocomplete_label",autoCompObject.val());
							} else {
								$("#"+settings.id).val(autoCompObject.val());
								$("#"+settings.id).attr("rup_autocomplete_label",autoCompObject.val());
							}
						}else{
							if(loadObjects[autoCompObject.val()] !== undefined){
								$("#"+settings.id).val(loadObjects[autoCompObject.val()]);
								$("#"+settings.id).attr("rup_autocomplete_label",loadObjects[autoCompObject.val()]);
							} else {

								$("#"+settings.id).val("");
								$("#"+settings.id).attr("rup_autocomplete_label","");
								autoCompObject.val("");
								autoCompObject.autocomplete("close");
							}
						}
						//Si el evento es ENTER y viene de seleccionar un elemento o el menú se estaba mostrando, omitir resto de funciones (ej. buscar)
						if (event.type==="keydown" && event.keyCode===13 && (selected || isShowingMenu)){return false;}
					});

					//se guarda la configuracion general (settings) del componente
					$("#"+settings.id+"_label").data("settings",settings);
					$("#"+settings.id+"_label").data("rup.autocomplete",{
						$hiddenField: $("#"+settings.id)
					});
					$("#"+settings.id).data("rup.autocomplete",{
						$labelField: $("#"+settings.id+"_label")
					});


					//Deshabilitar
					if (settings.disabled===true) {
						$("#"+settings.id).rup_autocomplete("disable");

					}else if (settings.disabled===false){ //habilitar
						$("#"+settings.id).rup_autocomplete("enable");
					}
				}

			}
		});

	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//******************************************************
	/**
   * Función a ejecutar en caso de producirse un error a la hora de obtener los elementos a mostrar.
   *
   * @callback jQuery.rup_autocomplete~onLoadError
   * @param {Object} xhr - Objeto XHR que contiene la respuesta de la petición realizada.
   * @param {string} textStatus - Texto que identifica el error producido.
   * @param {Object} errorThrown - Objeto error que contiene las propiedades del error devuelto en la petición.
   */

  /**
   * @description Opciones por defecto de configuración del componente.
   *
   * @name jQuery.rup_autocomplete#defaults
   *
   * @property {jQuery.rup_autocomplete~onLoadError} [onLoadError] - Función de callback a ejecutar en caso de que se produzca un error en la petición de obtención de la lista de elementos a mostrar.
   * @property {boolean} [contains=true] - Valor que determina si la búsqueda debe ser del tipo “contiene” (se buscarán elementos que contengan en cualquier posición el literal introducido) o del tipo “comienza por” (se buscarán elementos que comiencen por el literal introducido).
   * @property {string} [valueName=null] - Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el identificador del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente.
   * @property {string} [labelName=null] - Determina el valor de la propiedad name del campo que utilizará internamente el componente para almacenar el texto del elemento seleccionado por el usuario. En caso de no especificarse, se tomará como valor el valor de la propiedad name del elemento sobre el cual se ha definido el componente, añadiéndole el sufijo “_label”.
   * @property {boolean} [getText=false] - En caso de ser true el componente devolverá como resultado seleccionado el texto en vez del value del elemento.
   * @property {boolean} [combobox=false] - Habilita/deshabilita el modo de funcionamiento combobox.
   * @property {number} [menuMaxHeight=false] - Determina la altura máxima que podrá tener la capa del menú desplegable antes de mostrar scroll.
   * @property {object} [menuAppendTo=null] - Permite especificar mediante un selector de jQuery el elemento del DOM al que se añadirá el menú desplegable.
   * @property {boolean} [disabled=false] - determina si se deshabilita el componente Autocomplete sobre el input al que se aplica. De tal modo que por mucho que se interactué con el elemento no se hará una búsqueda.
   */
	$.fn.rup_autocomplete.defaults = {
		onLoadError : null,
		contains : true,
		valueName: null,
		labelName: null,
		getText: false,
		combobox: false,
		menuMaxHeight: false,
		menuAppendTo:null,
		disabled:false
	};


})(jQuery);
