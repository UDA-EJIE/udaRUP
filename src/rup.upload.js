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
* @fileOverview Implementa el patrón RUP Upload.
* @author EJIE
* @version 2.4.8
*/
( function( factory ) {
 if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( ["jquery","./rup.base",
      "jquery.fileupload-ui",
      "jquery.fileupload-jquery-ui",
      "jquery.fileupload-process",
      "jquery.fileupload-image",
      "jquery.fileupload-audio",
      "jquery.fileupload-process",
      "jquery.fileupload-video",
      "jquery.fileupload-validate",
      "jquery.fileupload"
    ], factory );
 } else {

		// Browser globals
		factory( jQuery);
 }
} ( function( $) {



	$.widget('blueimp.fileupload', $.blueimp.fileupload, {
	    options: {
	        errorMessages: {
	            maxFileSize: $.rup.i18nParse($.rup.i18n.base, "rup_upload.maxFileSizeError"),
	            minFileSize: $.rup.i18nParse($.rup.i18n.base, "rup_upload.minFileSizeError"),
	            acceptFileTypes: $.rup.i18nParse($.rup.i18n.base, "rup_upload.acceptFileTypesError"),
	            maxNumberOfFiles: $.rup.i18nParse($.rup.i18n.base, "rup_upload.maxNumberOfFilesError")
	        },
          processdone: $.rup.adapter.upload.processdone,
          getFilesFromResponse: function (data) {
                        if (data.result && $.isArray(data.result)) {
                            // return data.result;
                            return data.result.map(function(elem,i){ return $.extend(elem,{deleteType:elem.delete_type,deleteUrl:elem.delete_url});})
                        }
                        return [];
                    }
	    },

	    // _renderUpload: function (files) {
      //       var that = this,
      //           options = this.options,
      //           tmpl = this._renderUploadTemplate(files),
      //           isValidated = this._validate(files);
      //       if (!(tmpl instanceof $)) {
      //           return $();
      //       }
      //       var settings = $.data(this.element[0], "settings");
      //
      //       tmpl.css('display', 'none');
      //       // .slice(1).remove().end().first() removes all but the first
      //       // element and selects only the first for the jQuery collection:
      //       tmpl.find('.progress div').slice(
      //           isValidated ? 1 : 0
      //       ).remove().end().first()
      //           .progressbar();
      //       tmpl.find('.start button').slice(
      //           this.options.autoUpload || !isValidated ? 0 : 1
      //       ).remove().end().first()
      //           .button({
      //               text: true,
      //               icons: {primary: 'ui-icon-circle-arrow-e'}
      //           });
      //       var cancelButton = tmpl.find('.cancel button').slice(1).remove().end().first()
      //           .button({
      //               text: true,
      //               icons: {primary: 'ui-icon-cancel'}
      //           });
      //
      //       if(settings.submitInForm){
	    //         cancelButton.bind("click",function(event){
	    //         	var newFileInput;
	    //             event.preventDefault();
	    //             that.options.fileInput.attr("value","");
	    //             newFileInput=that.options.fileInput.clone(true).attr("value","").insertAfter(that.options.fileInput);
	    //             that.options.fileInput.remove();
	    //             that.options.fileInput=newFileInput;
      //
	    //         });
      //       }
      //
      //       tmpl.find('.preview').each(function (index, node) {
      //           that._loadImage(
      //               files[index],
      //               function (img) {
      //                   $(img).hide().appendTo(node).fadeIn();
      //               },
      //               {
      //                   maxWidth: options.previewMaxWidth,
      //                   maxHeight: options.previewMaxHeight,
      //                   fileTypes: options.previewFileTypes,
      //                   canvas: options.previewAsCanvas
      //               }
      //           );
      //       });
      //       return tmpl;
      //   },
        // _renderDownload: function (files) {
        //     var tmpl = this._renderDownloadTemplate(files);
        //     if (!(tmpl instanceof $)) {
        //         return $();
        //     }
        //     tmpl.css('display', 'none');
        //     tmpl.find('.delete button').button({
        //         text: true,
        //         icons: {primary: 'ui-icon-trash'}
        //     });
        //     tmpl.find('a').each(this._enableDragToDesktop);
        //     return tmpl;
        // },
	    _renderUploadTemplate: function (files) {
	        var that = this,
            rows = $();

	        var settings = $.data(this.element[0], "settings");


	        $.each(files, function (index, file) {
	            // file = that._uploadTemplateHelper(file);
	            var row = $(
	            	'<tr class="template-upload"><td>' +
	            	'<div class="formulario_columna_cnt">' +
	                '<span class="izq_float file_icon">&nbsp;</span>' +
	                '<div class="izq_float name"><b></b></div>' +
	                '<div class="formulario_columna_cnt">' +
	                '<div class="izq_float type"></div>' +
	                '<div class="izq_float size"></div>' +
	                (settings.submitInForm ?
	                		'<div class="izq_float cancel" style><button>'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.cancelUpload")+'</button></div>'
	                		: '') +
	                '</div>' +
	                (!settings.submitInForm ?
	                '<div class="formulario_columna_cnt">' +
	                (file.error ?
	                    '<div class="izq_float error" ></div>'
	                :
                      '<button>'+
                      '<div class="izq_float progress"><div></div></div>' +
	                    '<div class="izq_float start fileupload-buttonbar ui-button">'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.startUpload")+'</button></div>'
	                ) +
	                '<div class="izq_float cancel"><button>'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.cancelUpload")+'</button></div>' +
	                '</div>':'<div class="izq_float start fileupload-buttonbar ui-button" style="display:none"><button>'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.startUpload")+'</button></div>') +
	                '</td></tr>');
	            row.find('.name b').text(file.name);
	            row.find('.size').text(file.sizef);
	            row.find('.type').text(file.type);
	            if (file.error) {
	                row.addClass('ui-state-error');
	                row.find('.error').text(
	                    that.options.errorMessages[file.error] || file.error
	                );
	            }

	            rows = rows.add(row);
	        });
	        return rows;
		},
	    _renderDownloadTemplate: function (files) {
	        var that = this,
	            rows = $();
	        $.each(files, function (index, file) {
	            // file = that._downloadTemplateHelper(file);
	            var row = $('<tr class="template-download"><td>' +
	                (file.error ?
	                	'<td class="file_icon"></td>' +
	                    '<td class="name"></td>' +
	                    '<td class="size"></td>' +
	                    '<td class="error" colspan="2"></td>'
	                :
	                	'<div class="formulario_columna_cnt">' +
		                '<span class="izq_float file_icon">&nbsp;</span>' +
		                '<div class="izq_float name"><a></a></div>' +
		                '</div>' +
		                '<div class="formulario_columna_cnt">' +
		                '<div class="izq_float type"></div>' +
		                '<div class="izq_float size"></div>' +
		                '</div>'+
		                '<div class="formulario_columna_cnt">' +
		                '<a><div class="izq_float">'+
		                '<div class="file_download" >'+
		                '<span class="file_download_icon">&nbsp;</span>'+
		                '<span class="file_download_text">'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.openUploaded")+'</span></div>'+
		                '</div></a>' +
		                '<div class="izq_float delete"><button>'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.deleteUploaded")+'</button></div>' +
		                '</div>'
	                ) +
	                '</td></tr>');

	            row.find('.size').text(file.sizef);
	            row.find('.type').text(file.type);
	            if (file.error) {
	                row.find('.name').text(file.name);
	                row.addClass('ui-state-error');
	                row.find('.error').text(
	                    that.options.errorMessages[file.error] || file.error
	                );
	            } else {
	                row.find('.name a').text(file.name);
	                if (file.thumbnail_url) {
	                    row.find('.preview').append('<a><img></a>')
	                        .find('img').prop('src', file.thumbnail_url);
	                    row.find('a').prop('target', '_blank');
	                }
	                row.find('a').prop('href', $.rup_utils.setNoPortalParam(file.url));
	                row.find('.delete button')
	                    .attr('data-type', file.delete_type)
	                    .attr('data-url',  $.rup_utils.setNoPortalParam(file.delete_url));
	            }
	            rows = rows.add(row);
	        });
	        return rows;
	    },
	    _initFileUploadButtonBar: function () {
	    	 var fileUploadButtonBar = this.element.find('.fileupload-buttonbar'),
             filesList = this.element.find('.files'),
             ns = this.options.namespace;
		    	fileUploadButtonBar.find('.start button')
	            .button({icons: {primary: 'ui-icon-circle-arrow-e'}})
	            .bind('click.' + ns, function (e) {
	                e.preventDefault();
	                filesList.find('.start button').click();
	            });
	        fileUploadButtonBar.find('.cancel')
	            .button({icons: {primary: 'ui-icon-cancel'}})
	            .bind('click.' + ns, function (e) {
	                e.preventDefault();
	                filesList.find('.cancel button').click();
	            });
	        fileUploadButtonBar.find('.delete')
	            .button({icons: {primary: 'ui-icon-trash'}})
	            .bind('click.' + ns, function (e) {
	                e.preventDefault();
//	                filesList.find('.delete input:checked')
//	                    .siblings('button').click();
	                filesList.find('.delete button').click();
	            });
	        fileUploadButtonBar.find('.toggle')
	            .bind('change.' + ns, function (e) {
	                filesList.find('.delete input').prop(
	                    'checked',
	                    $(this).is(':checked')
	                );
	            });
	    },
	    _getAJAXSettings: function (data) {
	        var options = $.extend({}, this.options, data);
	        this._initFormSettings(options);
	        this._initDataSettings(options);
	        return options;
	    }
//	    ,_initProgressListener: function (options) {
//            var that = this,
//                xhr = options.xhr ? options.xhr() : $.ajaxSettings.xhr();
//            // Accesss to the native XHR object is required to add event listeners
//            // for the upload progress event:
//                if (options.pif ===null && xhr.upload) {
//    				//-- fix start --
//    				$( xhr.upload ).bind( "progress", function (e) {
//    				that._onProgress(e, options);
//    				});
//    				options.xhr = function () {
//                        return xhr;
//                    };
//    				//-- fix end --
//                }
//        }
//	    destroy: function (e, data) {
//            var that = $(this).data('fileupload');
//            if (data.url) {
//                $.rup_ajax(data)
//                    .success(function () {
//                        that._adjustMaxNumberOfFiles(1);
//                        $(this).fadeOut(function () {
//                            $(this).remove();
//                        });
//                    });
//            } else {
//                that._adjustMaxNumberOfFiles(1);
//                data.context.fadeOut(function () {
//                    $(this).remove();
//                });
//            }
//        }

	});

	//*********************************************
	// ESPECIFICACÍON DE LOS TIPOS BASE DEL PATRÓN
	//*********************************************

	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************

    /**
    * Permite al usuario seleccionar uno o varios archivos de su equipo y subirlos a la aplicación.
    *
    * @summary Componente RUP Upload.
    * @namespace jQuery.rup_upload
    * @memberOf jQuery
    * @tutorial rup_upload
    * @see El componente está basado en el plugin {@link https://blueimp.github.io/jQuery-File-Upload/|jQuery File Upload}. Para mas información acerca de las funcionalidades y opciones de configuración pinche {@link https://blueimp.github.io/jQuery-File-Upload/|aquí}.
    * @example
    * $("#idUpload").rup_upload({});
    */

	var rup_upload = {};

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_upload", rup_upload));

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	$.fn.rup_upload("extend",{
		option: function(args){
			$(this).fileupload("option",args);
		},
		destroy: function(){
			$(this).fileupload("destroy");
		},
		enable: function(){
			$(this).fileupload("enable");
		},
		disable: function(){
			$(this).fileupload("disable");
		},
		add: function(data){
			$(this).fileupload("add",data);
		},
		send: function(data){
			$(this).fileupload("send",data);
		}
	});


	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************


	function fileuploadstart () {
	    var widget = $(this),
	        progressElement = $('#fileupload-progressbar').fadeIn(),
	        interval = 500,
	        total = 0,
	        loaded = 0,
	        loadedBefore = 0,
	        progressTimer,
	        progressHandler = function (e, data) {
	            loaded = data.loaded;
	            total = data.total;
	        },
	        stopHandler = function () {
	            widget
	                .unbind('fileuploadprogressall', progressHandler)
	                .unbind('fileuploadstop', stopHandler);
	            window.clearInterval(progressTimer);
	            progressElement.fadeOut(function () {
	                progressElement.html('');
	            });
	        },
	        formatTime = function (seconds) {
	            var date = new Date(seconds * 1000);
	            return ('0' + date.getUTCHours()).slice(-2) + ':' +
	                ('0' + date.getUTCMinutes()).slice(-2) + ':' +
	                ('0' + date.getUTCSeconds()).slice(-2);
	        },
	        formatBytes = function (bytes) {
	            if (bytes >= 1000000000) {
	                return (bytes / 1000000000).toFixed(2) + ' GB';
	            }
	            if (bytes >= 1000000) {
	                return (bytes / 1000000).toFixed(2) + ' MB';
	            }
	            if (bytes >= 1000) {
	                return (bytes / 1000).toFixed(2) + ' KB';
	            }
	            return bytes + ' B';
	        },
	        formatPercentage = function (floatValue) {
	            return (floatValue * 100).toFixed(2) + ' %';
	        },
	        updateProgressElement = function (loaded, total, bps) {
	            progressElement.html(
	                formatBytes(bps) + 'ps | ' +
	                    formatTime((total - loaded) / bps) + ' | ' +
	                    formatPercentage(loaded / total) + ' | ' +
	                    formatBytes(loaded) + ' / ' + formatBytes(total)
	            );
	        },
	        intervalHandler = function () {
	            var diff = loaded - loadedBefore;
	            if (!diff) {
	                return;
	            }
	            loadedBefore = loaded;
	            updateProgressElement(
	                loaded,
	                total,
	                diff * (1000 / interval)
	            );
	        };
	    widget
	        .bind('fileuploadprogressall', progressHandler)
	        .bind('fileuploadstop', stopHandler);
	    progressTimer = window.setInterval(intervalHandler, interval);
	}

	$.fn.rup_upload("extend",{
			_init : function(args){

				var settings = $.extend({}, $.fn.rup_upload.defaults, args[0]), upload=this;

				// Se configura el uso del PIF
				if (settings.pif!==null){
					var url="",
//						n38UidSesionCookie = $.rup_utils.readCookie("n38UidSesion"),
//						n38DominioUidCookie = $.rup_utils.readCookie("n38DominioUid"),
//						n38UidSesionGlobal = $.rup_utils.readCookie("n38UidSesionGlobal"),
//						n38UidSistemasXLNetS = $.rup_utils.readCookie("n38UidSistemasXLNetS"),
						pifSettings = jQuery.extend(true, $.fn.rup_upload.pif.defaults, settings.pif );

//					if (pifSettings.base_url===undefined){
//						alert("RUP_UPLOAD - No se ha especificado el valor del parámetro base_url para el uso del PIF.");
//						return -1;
//					}
					if (pifSettings.userFolder!==true && pifSettings.folderPath===undefined){
						alert("RUP_UPLOAD - No se ha especificado el valor del parámetro folderPath para el uso del PIF.");
						return -1;
					}


					jQuery.extend(true, settings,{
						formData:{
							base_url: settings.url,
							hadoop_folder_path: pifSettings.folderPath,
							hadoop_preserve_name: pifSettings.preserveName,
							y31_ttl: pifSettings.fileTtl,
							securityToken: pifSettings.securityToken
						}
					});


//					url += pifSettings.base_url;  // Url base del PIF
//					url += pifSettings._JANO_PUT_SERVLET; // Servlet PUT
//					url += "/"+n38UidSesionCookie; // Cookie XLNets n38UidSesionCookie
//					url += "/"+n38DominioUidCookie; // Cookie XLNets n38DominioUidCookie
//					url += "/"+n38UidSesionGlobal; // Cookie XLNets n38UidSesionGlobal
//					url += "/"+n38UidSistemasXLNetS; // Cookie XLNets n38UidSistemasXLNetS

					// Se añaden los parámetros de configuración del PIF a la url

//					url +="?hadoop_folder_path="+pifSettings.folderPath; // Parámetro folderPath
//					url +="&hadoop_preserve_name="+pifSettings.preserveName; // Parámetro preserveName
//					url +="&y31_ttl="+pifSettings.fileTtl; // Parámetro fileTtl


					// Configruamos la url final
//					settings.url = url;

//					settings.xhr = function(){
//
//					};
				}

				$.data(this[0], "settings", settings);

				$(this).fileupload(settings);

				if (settings.submitInForm){
					$(this).rup_upload("option",{singleFileUploads:false,maxNumberOfFiles:1,replaceFileInput:false});
				}

				$(this).bind('fileuploadadd', function (e, data) {
					if(settings.submitInForm){
						$(this).find(".template-upload").hide();
						$(this).find(".template-upload .cancel button").unbind("click");
						$(this).find(".template-upload .cancel button").click();
					}
				});
				$(this).bind('fileuploadsend', function (e, data) {
					data.url=$.rup_utils.setNoPortalParam(data.url);
//					if (!$.rup.browser.xhrFileUploadSupport || settings.forceIframeTransport===true){
//						data.url = data.url + (data.url.match("\\?") === null ? "?" : "&") + "_emulate_iframe_http_status=true";
//					}
				});
			},
			_private : function(settings){

			}
		});

	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************

	$.fn.rup_upload.defaults = {
		// label:null,
		// fileInput:null,
		submitInForm:false,
		submitFormButton:undefined,
		pif:null,
    //filesContainer: '.files',
    uploadTemplateId:false,
    downloadTemplateId:false,
    uploadTemplate: $.rup.adapter.upload.uploadTemplate,
    downloadTemplate: $.rup.adapter.upload.downloadTemplate
	};

	$.fn.rup_upload.pif={};
	$.fn.rup_upload.pif.defaults ={
		fileTtl: 129600,
		preserveName: false,
		_JANO_PUT_SERVLET: "/y31ApiJSWAR/Y31JanoServicePutServlet",
		securityToken:"app"
	};

    /**
    * @description Propiedades de configuración del componente.
    * @see Para mas información consulte la documentación acerca de las opciones de configuración del plugin {@link https://github.com/blueimp/jQuery-File-Upload/wiki/Options|jQuery File Upload}.
    *
    * @name jQuery.rup_upload#options
    * @property {string} [namespace] - Se utiliza para asociar el capturador de eventos del dropZone y del fileInpurt. Por defecto toma el valor del widget (“fileupload”).
    * @property {jQuery} [dropZone=$(document)] - Indica el objeto jQuery que representa el área de dropZone. Para deshabilitar el soporte drag & drop se deberá indicar el valor null.
    * @property {jQuery} [fileInput] - Objeto jQuery sobre el cual se monitorizarán los eventos de cambio del mismo. En caso de no especificarse se tomarán los input de tipo file existentes dentro del objeto sobre el que se ha creado el componente upload. Para deshabilitar el capturador de eventos se deberá indicar el valor null.
    * @property {boolean} [replaceFileInput=true] - Determinar si el campo file es reemplazado por un nuevo objeto a partir de un clone.
    * @property {string} [paramName] - Indica el nombre del parámetro de la request mediante el cual se enviará la información del fichero. En caso de no especificarse, se tomará el valor de la propiedad name del campo file. En caso de no especificarse dicha propiedad se tomará el valor files[] por defecto.
    * @property {boolean} [singleFileUploads=true] - Especifica si la subida de ficheros se realizar de manera individual, es decir, si se realiza una petición XHR por cada uno de los ficheros que se deben de enviar.
    * @property {boolean} [limitMultiFileUploads=true] -Especifica el número de ficheros que pueden ser enviados en una única petición XHR.
    * @property {boolean} [sequentialUploads=false] - Especifica si el envío de los ficheros se realizan de manera secuencial en vez de manera simultánea.
    * @property {Integer} [limitConcurrentUploads] - Indica el número máximo de peticiones concurrentes para la
subida de ficheros.
    * @property {boolean} [forceIframeTransport=false] - Determina si se debe forzar el uso de iframe al realizar la subida de ficheros. Esta opción puede ser útil en caso de subida de ficheros entre diferentes dominios.
    * @property {boolean} [multipart=true] - Indica si la subida de ficheros se realiza como multipart/form-data.
    * @property {boolean} [recalculateProgress=true] - Por defecto, los envíos de ficheros erróneos o cancelados son excluidos del cálculo del progreso global de subida de ficheros. Para evitar el recálculo del progreso global se deberá de especificar esta opción como false.
    * @property {object | object[] | function} [formData] - Información adicional que se desea enviar al realizarse la subida de ficheros. El parámetro acepta lo siguiente: <ul><li>Array de objetos con propiedades</li><li>Objeto simple</li><li>Función que retorna uno de los tipos de datos especificados anteriormente.</li></ul>
    */


/***********/
/* EVENTOS */
/***********/

/**
* Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente.
*
* @event jQuery.rup_upload#fileuploadadd
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploadadd", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente.
*
* @event jQuery.rup_upload#fileuploadsubmit
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @return {boolean} - Si la función retorna false el envío no se realiza.
* @example
* $("#fileupload").on("fileuploadsubmit", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al iniciarse el envío de cada fichero.
*
* @event jQuery.rup_upload#fileuploadsend
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @return {boolean} - Si la función retorna false el envío no se realiza.
* @example
* $("#fileupload").on("fileuploadsend", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al realizarse de manera satisfactoria el envío de los ficheros.
*
* @event jQuery.rup_upload#fileuploaddone
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploaddone", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al producirse un error en el envío de los ficheros o al abortarse el envío.
*
* @event jQuery.rup_upload#fileuploadfail
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploadfail", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al producirse un envío correcto, erróneo o se aborte.
*
* @event jQuery.rup_upload#fileuploadalways
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploadalways", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al producirse un evento relacionado con el indicador de progreso del envío de ficheros.
*
* @event jQuery.rup_upload#fileuploadprogress
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploadprogress", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al producirse un evento relacionado el indicador de progreso global de envío de ficheros.
*
* @event jQuery.rup_upload#fileuploadprogressall
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Objeto que contiene la información relativa a la subida de los ficheros.
* @example
* $("#fileupload").on("fileuploadprogressall", function (e, data) {
* });
*/

/**
* Permite asociar una función que se ejecutará al inicio del envío de los ficheros.
*
* @event jQuery.rup_upload#fileuploadstart
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @example
* $("#fileupload").on("fileuploadstart", function (e) {
* });
*/

/**
* Permite asociar una función que se ejecutará al detenerse el proceso de envío de ficheros.
*
* @event jQuery.rup_upload#fileuploadstop
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @example
* $("#fileupload").on("fileuploadstop", function (e) {
* });
*/

}));
