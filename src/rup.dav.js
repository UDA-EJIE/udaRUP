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
 * @fileOverview Implementa el patrón RUP Dav.
 * @author EJIE
 * @version 2.4.12                                                                                              
 */ 
(function ($) {
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	/**
    * Permite al usuario editar online documentos almacenados en el servidor de aplicaciones.
    *
    * @summary Componente RUP Dav.
    * @namespace jQuery.rup_dav
    * @memberOf jQuery
    * @tutorial rup_dav
    * @example 
    * jQuery.rup_dav.editOnline({
	*	url:"webdavServlet/webdav.doc",
	*	xlnetsAuth:true,
	*	downloadOnError:true,
	*	alternateDownloadURL:"../upload?fileName=webdav.doc"
	* });
    */
	jQuery.rup_dav = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
//	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_dav", rup_dav));
	
	$.extend(jQuery.rup_dav,{
        /**
         * TODO
         *
         * @name jQuery.rup_dav#editOnline     
         * @function
         */ 
		editOnline:function(args){
			var url,
			settings;
			
			if (typeof args === "string"){
				settings = jQuery.extend({}, jQuery.rup_dav.defaults, {url: args});
			}else{
				settings = jQuery.extend({}, jQuery.rup_dav.defaults, args);
			}
			
			// Se comprueba y completa la url
			jQuery.rup_dav._checkUrl(settings);
			
			// En caso de necesitarse se aplica 
			if (settings.xlnetsAuth){
				jQuery.rup_dav._xlnetsAuth(settings);
			}
			
			if ($.browser.msie === true){
				jQuery.rup_dav._editOnlineIE(settings);
			}else{
				jQuery.rup_dav._editOnlineFF(settings);
			}
		}
	});
	
	
	$.extend(jQuery.rup_dav,{
		_checkUrl:function(settings){
			var tmpUrl="";
			
			if (settings.url.indexOf(location.protocol)=== -1){
				// Se añade la sección de protocolo (http, https...)
				tmpUrl+=location.protocol + "//";
				
				if (settings.url.indexOf(location.host)=== -1){
					// Se añade la sección del host
					tmpUrl+=location.host;
				}
				
				if (settings.url.indexOf(CTX_PATH)=== -1){
					// Se añade la sección del host
					tmpUrl+=CTX_PATH;
				}
				
				settings.url = tmpUrl + settings.url;
			}
			
		},
		_xlnetsAuth:function(settings){
			var n38UidSesionCookie = $.rup_utils.readCookie("n38UidSesion"), 
				n38DominioUidCookie = $.rup_utils.readCookie("n38DominioUid"),
				urlParams = {};
			
			if (n38UidSesionCookie !== undefined && n38UidSesionCookie !== null && n38UidSesionCookie !=='' ){
				jQuery.extend(true, urlParams, {n38UidSesion: n38UidSesionCookie});
			}
			
			if (n38DominioUidCookie !== undefined && n38DominioUidCookie !== null && n38DominioUidCookie !==''){
				jQuery.extend(true, urlParams, {n38DominioUid: n38DominioUidCookie});
			}
			
			if (!jQuery.isEmptyObject(urlParams)){
				settings.url += "?"+settings.xlnetsAuthParam+"="+jQuery.rup_utils.base64.encode(jQuery.param(urlParams));
			}
		},
		_editOnlineIE:function(settings){
			var obj;
			// Gestión para Internet Explorer
			try{
				// Microsoft Office 2007 y superiores
				obj = new ActiveXObject("SharePoint.OpenDocuments.3");
				obj.EditDocument(encodeURI(settings.url));
			}catch(e){
				try{
					// Microsoft Office 2003 e inferiores
					obj = new ActiveXObject('Word.Application');
					obj.Visible = true;
					obj.Documents.Open(encodeURI(settings.url));
				}catch(e){
					if (settings.downloadOnError===true){
						// No se puede editar en línea, se descarga el archivo
						window.open(encodeURI(settings.alternateDownloadURL), '_blank');
					}
					
					if (jQuery.isFunction(settings.fncErrorOnEditOnline)){
						jQuery.proxy(settings.fncErrorOnEditOnline)(settings);
					}
				}
			}
		},
		_editOnlineFF:function(settings){
			var hownowPlugin, version;
			// Gestión para Firefox y Chrome
			try{
				// Microsoft Office 2007 y superiores
				hownowPlugin = document.getElementById("winFirefoxPlugin");
			    version = hownowPlugin.GetOfficeVersion();
			    hownowPlugin.EditDocument(settings.url, version);
			}catch(e){
				if (settings.downloadOnError===true){
					// No se puede editar en línea, se descarga el archivo
					window.open(encodeURI(settings.alternateDownloadURL), '_blank');
				}
				
				if (jQuery.isFunction(settings.fncErrorOnEditOnline)){
					jQuery.proxy(settings.fncErrorOnEditOnline)(settings);
				}
				
			}
		}
	});
	
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.rup_dav.defaults = {
		xlnetsAuth: false,
		xlnetsAuthParam:"c",
		downloadOnError: false,
		alternateDownloadURL:null,
		fncErrorOnEditOnline:null
		
	};
	
})(jQuery);