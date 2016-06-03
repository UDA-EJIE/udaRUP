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
	
	$.widget('blueimpUIX.fileupload', $.blueimpUI.fileupload, {
	    options: {
	        errorMessages: {
	            maxFileSize: $.rup.i18nParse($.rup.i18n.base, "rup_upload.maxFileSizeError"),
	            minFileSize: $.rup.i18nParse($.rup.i18n.base, "rup_upload.minFileSizeError"),
	            acceptFileTypes: $.rup.i18nParse($.rup.i18n.base, "rup_upload.acceptFileTypesError"),
	            maxNumberOfFiles: $.rup.i18nParse($.rup.i18n.base, "rup_upload.maxNumberOfFilesError")
	        }
	    },
	    _renderUpload: function (files) {
            var that = this,
                options = this.options,
                tmpl = this._renderUploadTemplate(files),
                isValidated = this._validate(files);
            if (!(tmpl instanceof $)) {
                return $();
            }
            var settings = $.data(this.element[0], "settings");
            
            tmpl.css('display', 'none');
            // .slice(1).remove().end().first() removes all but the first
            // element and selects only the first for the jQuery collection:
            tmpl.find('.progress div').slice(
                isValidated ? 1 : 0
            ).remove().end().first()
                .progressbar();
            tmpl.find('.start button').slice(
                this.options.autoUpload || !isValidated ? 0 : 1
            ).remove().end().first()
                .button({
                    text: true,
                    icons: {primary: 'ui-icon-circle-arrow-e'}
                });
            var cancelButton = tmpl.find('.cancel button').slice(1).remove().end().first()
                .button({
                    text: true,
                    icons: {primary: 'ui-icon-cancel'}
                });
            
            if(settings.submitInForm){
	            cancelButton.bind("click",function(event){
	            	var newFileInput;
	                event.preventDefault();
	                that.options.fileInput.attr("value","");
	                newFileInput=that.options.fileInput.clone(true).attr("value","").insertAfter(that.options.fileInput);
	                that.options.fileInput.remove();
	                that.options.fileInput=newFileInput;
	                
	            });
            }
            
            tmpl.find('.preview').each(function (index, node) {
                that._loadImage(
                    files[index],
                    function (img) {
                        $(img).hide().appendTo(node).fadeIn();
                    },
                    {
                        maxWidth: options.previewMaxWidth,
                        maxHeight: options.previewMaxHeight,
                        fileTypes: options.previewFileTypes,
                        canvas: options.previewAsCanvas
                    }
                );
            });
            return tmpl;
        },
        _renderDownload: function (files) {
            var tmpl = this._renderDownloadTemplate(files);
            if (!(tmpl instanceof $)) {
                return $();
            }
            tmpl.css('display', 'none');
            tmpl.find('.delete button').button({
                text: true,
                icons: {primary: 'ui-icon-trash'}
            });
            tmpl.find('a').each(this._enableDragToDesktop);
            return tmpl;
        },
	    _renderUploadTemplate: function (files) {
	        var that = this,
            rows = $();
	        
	        var settings = $.data(this.element[0], "settings");
	        
	        
	        $.each(files, function (index, file) {
	            file = that._uploadTemplateHelper(file);
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
	                    '<div class="izq_float progress"><div></div></div>' +
	                    '<div class="izq_float start fileupload-buttonbar ui-button"><button>'+$.rup.i18nParse($.rup.i18n.base,"rup_upload.startUpload")+'</button></div>'
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
	            file = that._downloadTemplateHelper(file);
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
		    	fileUploadButtonBar.find('.start')
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
		label:null,
		fileInput:null,
		submitInForm:false,
		submitFormButton:undefined,
		pif:null
	};		
	
	$.fn.rup_upload.pif={};
	$.fn.rup_upload.pif.defaults ={
		fileTtl: 129600,
		preserveName: false,
		_JANO_PUT_SERVLET: "/y31ApiJSWAR/Y31JanoServicePutServlet",
		securityToken:"app"
	};

})(jQuery);