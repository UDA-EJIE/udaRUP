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
	$.widget("$.rup_breadCrumb", {
		options: {
			showSpeed:        'fast',
			hideSpeed:        '',
			collapsible:      false,
			collapsedWidth:   10,
			breadCrumb:			  $.rup.APP_RESOURCES + ".breadCrumb"
		},
		_create: function () {
			var pathname = window.location.pathname, breadCrumbEntry = pathname.substring($.rup.CTX_PATH.length),
				breadCrumbElems = breadCrumbEntry.split("/"), 
				//breadCrumbSpan = $("<span>").addClass("rup-breadCrumbs_span").text($.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.youAre")),
				ulBreadCrumb = $("<ul>").attr("id", "rup_breadCrumbs_ul").addClass("rup-breadCrumb_main"), 
				breadCrumbStruct = null,
				lastCrum = null,
				initURL = (this.options.initUrl!==undefined)?$.rup.CTX_PATH+this.options.initUrl:$.rup.CTX_PATH,
				i18nId = (this.options.i18nId === undefined)? this.element.attr("id"):this.options.i18nId;
			//Obtenemos la estructura del fichero que se recibe como paramtero o el de por defecto del patrón
			if (this.options.breadCrumb instanceof Object) {
				breadCrumbStruct = this.options.breadCrumb;
			} else {
				$.rup.getFile(this.options.breadCrumb);
				breadCrumbStruct = $.rup.i18n[this.options.breadCrumb];
			}
			
			if (!window.LOGGED_USER || LOGGED_USER === "NULL"){
				LOGGED_USER = "";
			}
			if (!window.DESTROY_XLNETS_SESSION){
				DESTROY_XLNETS_SESSION = "false";
			} 
			if(LOGGED_USER !== ""){
				//Se añade el boton de desconexion si este fuera necesario
				if (this.options.logOutUrl !== undefined){
					
					if (DESTROY_XLNETS_SESSION === "false"){
						
						//función encargada de poner el icono y el literal de salida 
						this.element.append($("<div id='logOutDiv' class='rup-breadCrumb_logoutDiv'>")
							.append($("<a>").addClass("rup-breadCrumb_link").attr("logOutHref",this.options.logOutUrl).bind("click",
							function(){$.rup_messages("msgConfirm", {
								message: $.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.menuDisconnectMessage"),
								title: $.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.menuDisconnectTitle"),
								OKFunction : function(){$(window).attr("location",$("#logOutLink").attr("logOutHref"));}
							});}).html($.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.exit")).attr("id","logOutLink").append($("<span>").addClass("ui-icon rup-icon rup-icon-door-out rup-breadCrumb_exitImg"))));
					} else {
						
						//función encargada de poner el icono y el literal de desconexion
						this.element.append($("<div id='logOutDiv' class='rup-breadCrumb_logoutDiv'>")
							.append($("<a>").addClass("rup-breadCrumb_link").attr("logOutHref",this.options.logOutUrl).bind("click",
							function(){$.rup_messages("msgConfirm", {
								message: $.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.menuSecuritySystemDisconnectMessage"),
								title: $.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.menuDisconnectTitle"),
								OKFunction : function(){$(window).attr("location",$("#logOutLink").attr("logOutHref"));}
							});}).mouseover(
							function(eventObject){
								$(this).find("span").removeClass("rup-breadCrumb_logoutImg").addClass("rup-breadCrumb_logoutImg_active");
							}).mouseleave(
							function(eventObject){
								$(this).find("span").addClass("rup-breadCrumb_logoutImg").removeClass("rup-breadCrumb_logoutImg_active");
							}).html($.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.disconnect")).attr("id","logOutLink").append($("<span>").addClass("rup-breadCrumb_logoutImg ui-icon"))));
					}
				}
				//se añade el span con el texto de "xxx esta aqui"
				breadCrumbSpan = $("<span>").addClass("rup-breadCrumbs_span").text(LOGGED_USER + $.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.userAre"));
				this.element.append(breadCrumbSpan);
			} else {
				breadCrumbSpan = $("<span>").addClass("rup-breadCrumbs_span").text($.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.youAre"));
				//se añade el span con el texto de "Usted esta aqui"
				this.element.append(breadCrumbSpan);
			}
			
			//se le añade el link de Incio
			ulBreadCrumb.append(this._createLI($.rup.i18nParse($.rup.i18n.base,"rup_breadCrumb.start"), initURL));
			//nos recorremos los elementos del path y los buscamos en el fichero json de migas para crear los enlaces
			for (var i = 0; i < breadCrumbElems.length; i++) {
				//Si encontramos dentro del fichero de estructura de las migas el parte de la url
				if (breadCrumbStruct[breadCrumbElems[i]]) {
					//Generamos su miga de actualimos la estructura en la que buscar, devolviendo las estructura del nivel que se ha añadido
					breadCrumbStruct = this._createBreadCrumb(breadCrumbStruct[breadCrumbElems[i]], breadCrumbElems[i], ulBreadCrumb, i18nId);
				}
			}
			//se le añade al ultimo elemento el estilo current
			//$("li:last-child", ulBreadCrumb).addClass("rup-breadCrumb_current");
			//$("li:last", ulBreadCrumb).addClass("rup-breadCrumb_current");
			$(ulBreadCrumb.children()[ulBreadCrumb.children().length - 1]).addClass("rup-breadCrumb_current").find("img.rup-icon, span.rup-icon").remove();
			//el último elemento no es navegable
			//lastCrum = $("li:last a", ulBreadCrumb);
			lastCrum = $("a:first", $(ulBreadCrumb.children()[ulBreadCrumb.children().length - 1]));
			
			lastCrum.replaceWith($("<span>").text(lastCrum.text()).css({ "font-weight":"bold", "color": "#333333"}));
			delete lastCrum;
			//y por ultimo se añade todo el ul a div que lo contiene
			this.element.append(ulBreadCrumb);
			ulBreadCrumb.xBreadcrumbs();
		},
		//Funcion que crear el li correspondiente de la miga accediendo al fichero de lenguage correspondiente
		_createLI :  function (i18nCaption, href, separator) {
			var li = $("<li>"), a = $("<a>").attr("href", /*$.rup.CTX_PATH + */href).text(i18nCaption);
			li.append(a);
			if (separator!==false){
				li.append($("<span>").addClass("ui-icon rup-icon rup-icon-separator-arrow"));
			}
			return li;
		},
		//Funcion que añade al ul el li correspondiente en cada nivel y devuelve la nueva entructura en la que seguir iterando
		_createBreadCrumb : function (breadCrumbStruct, elem, parentUl, i18nId) {//nos recorremos la entrada correspondiente
			var createdLI, subLevelUL = $("<ul>");
			if (breadCrumbStruct.i18nCaption) {//si tengo i18nCaption es que es elemento final
				createdLI = this._createLI($.rup.i18nParse($.rup.i18n.app[i18nId],breadCrumbStruct.i18nCaption), (breadCrumbStruct.url ? $.rup.CTX_PATH+breadCrumbStruct.url : "#"));
			} 
			//si tengo subLevel se crearan hijo como si fuesen un menu
			if (breadCrumbStruct.subLevel) {
				//nos recorremos todos los submenus
				for (var i = 0; i < breadCrumbStruct.subLevel.length; i++) {
					//creamos cada li y se lo añadimos al ul nuevo
					subLevelUL.append(this._createLI($.rup.i18nParse($.rup.i18n.app[i18nId],breadCrumbStruct.subLevel[i].i18nCaption), (breadCrumbStruct.subLevel[i].url ? breadCrumbStruct.subLevel[i].url : "#"), false).css("background", "none"));
				}
				//añadimos al li padre el nuevo ul con todos li de los sublevels
				createdLI.append(subLevelUL);
				$(createdLI).bind("mouseover", function (event) {
					$(this).find("a:eq(1)").focus();
				});
				createdLI.bind("keydown", function (event) {
					switch (event.keyCode) {
					case $.ui.keyCode.UP:
						var enlaces = $(this).find("li > a");
						for (var i=0; i<=enlaces.length; i++){
							if (enlaces[i].text === $(event.target).text()){
								break;
							}
						}
						if ($(enlaces[i-1]).length > 0){
							$(enlaces[i-1]).focus();
						} else {
							$(this).find("li > a").last().focus();
						}
						break;
					case $.ui.keyCode.DOWN:
						var enlaces = $(this).find("li > a");
						for (var i=0; i<=enlaces.length; i++){
							if (enlaces[i].text === $(event.target).text()){
								break;
							}
						}
						if ($(enlaces[i+1]).length > 0){
							$(enlaces[i+1]).focus();
						} else {
							$(this).find("li > a").first().focus();
						}
						break;
					case $.ui.keyCode.ESCAPE:
						$(this).children("ul").hide();
						break;
					default:
					}
				});
			}			
			parentUl.append(createdLI);
			return breadCrumbStruct;
		},
		_setOption: function (key, value) {
			$.Widget.prototype._setOption.apply(this, arguments);			
		},
		destroy: function () {
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);