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
	
	var rup_report = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupObjectConstructor("rup_report", rup_report));
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.rup_report("extend",{
	});
	
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	$.rup_report("extend", {
		_init : function(args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18n.base.rup_global.initError + $(this).attr("id"));
			}
			else {				
				//Se recogen y cruzan las paremetrizaciones del objeto
				var self = this,
					settings = $.extend(true, {}, $.rup_report.defaults, args[0]),
					//Objetos componente (params)
					buttons = settings.buttons,
					defaultDialog = settings.dialog,
					customDialog = settings.customDialog,
					//Contenedor de botones
					$container = $.find("[id='"+settings.appendTo+"']");
				
				//Existe capa contenedora ?
				if ($.isEmptyObject($container)){
					alert('No existe objeto al que añadir el componente');
					return false;
				}
				$container = $($container[0]);
				
				//Guardar settings
				$container.data("report", settings);
				
				//Añadir dialogo por defecto
				var $defaultDialog_wait = $("<div />")
										.attr("id","reportFileWait")
										.attr("title",defaultDialog.wait.title)
										.text(defaultDialog.wait.msg)
										.addClass("rup_report")
										.hide()
										//progressbar
										.append($("<div />").addClass("ui-progressbar ui-progressbar-value ui-corner-left ui-corner-right")),
					$defaultDialog_error = $("<div />")
										.attr("id","reportFileError")
										.attr("title",defaultDialog.error.title)
										.text(defaultDialog.error.msg)
										.addClass("rup_report")
										.hide(),
					$defaultDialog = $("<div />")
									.attr("id", "rup_report_dialogsContainer")
									.append($defaultDialog_wait)
									.append($defaultDialog_error);
				$container.after($defaultDialog);
				//Guardar datos dialogo por defecto
				defaultDialog["waitDiv"] = "reportFileWait";
				defaultDialog["errorDiv"] = "reportFileError";
				
				//El contenedor es un mButton
				var isMButton = false, $mbutton;
				if ($container.hasClass("rup-toolbar_menuButtonContainer")){
					$mbutton = $("[id='"+$container.attr("id").substring("8")+"']");
					$container =  $mbutton.parents(".rup-toolbar");
					isMButton = true;
					if ($.grep(buttons, function(object, index){ return object.buttons!==undefined; }).length>0){
						alert('No se pueden añadir MButtons a un contenedor MButton');
						return false;
					};
				} 
				
				//Recorrer los botones
				var errors = [];
				$.each(buttons, function(index, object){
					if (object.buttons!==undefined){
						//MBUTTON
						object["click"] = $container.showMButton;
						$mbutton = $container.addMButton(object, object["json_i18n"]);
						$container.addButtonsToMButton(object.buttons, $mbutton, object["json_i18n"]);
						//add click
						$.each(object.buttons, function(index, object){
							self._checkButton(object, errors);
							self._configureButton(object, defaultDialog, customDialog, settings);
						});
					} else {
						//BUTTON
						if (!isMButton){
							$container.addButton(object, object["json_i18n"]);
							object["id"] = $container.attr("id")+"##"+((object.id)?object.id:object.i18nCaption);
						} else {
							//Añadir botones a un MButton ya existente
							$container.addButtonsToMButton(new Array(object), $mbutton, object["json_i18n"]);
							//Mover el botón al final
							$mbuttonDiv = $("[id='mbutton_"+$mbutton.attr("id")+"']");
							$mbuttonDiv.find("li:first").appendTo($mbuttonDiv.children("ul"));
						}
						//add click
						self._checkButton(object, errors);
						self._configureButton(object, defaultDialog, customDialog, settings);
					}
				});
				
				if (errors.length>0){
					var txtErrors = "";
					for (var i=0; i<errors.length; i++){
						txtErrors += errors[i]+'<br/>';
					}
					alert(txtErrors);
				}
				
			}
		},
		_checkButton: function(button, errors){
			var buttonId = button.id.substring(button.id.lastIndexOf("##")+2);
			//Tiene URL?
			if (button.url===undefined){
				errors.push(buttonId+': no tiene URL asociada');
			}
			//Existe grid asociado para columnas ?
			if (button.columns!==undefined){
				//Existe grid asociado ?
				var $grid = $.find("#"+button.columns.grid);
				if ($.isEmptyObject($grid)){
					errors.push(buttonId+': no existe el Grid asociado');
				}
			}
		},
		_configureButton: function(button, defaultDialog, customDialog, settings){
			var self = this,
				dialog = {};
			$.extend(dialog,defaultDialog); //Copiar el dialogo de por defecto
			//isInline a false por defecto
			button.isInline = (button.isInline===undefined)?false:button.isInline;
			
			//Si no es inLine
			if (!button.isInline){
				$("[id='"+button.id+"']").on("click", function (){
					
					//Ocultar MButton
					var $container = $(this).parents("div.rup-toolbar_menuButtonContainer");
					if ($container.length>0){
						$container.showMButton();
						$container.removeClass("rup-toolbar_menuButtonSlided");
					}
					
					//Controlar columnas
					var data = {};
					if (button.columns!==undefined){
						//GridParams
						var $grid = $($.find("#"+button.columns.grid)[0]);
						if (jQuery.isFunction(settings.fncGetGridParam)){
							data = jQuery.proxy(settings.fncGetGridParam, $grid)();
						}else{
							data = $grid.jqGrid("getGridParam", "postData");
						}
						data["columns"] = $.toJSON(self._getColumns($grid, button.columns));
					}
					
					//Dialogo propio?
					var standarDialog = true;
					if (button.customDialog !== undefined){
						//Buscar el dialogo correspondiente
						var actualDialog = customDialog[button.customDialog];

						/** WAIT **/
						//Sobreescritura del defaultDialog-wait
						if (actualDialog.waitDiv===undefined){
							dialog.wait = actualDialog.wait;
						//Dialogo propio completo
						} else {
							dialog.waitDiv = actualDialog.waitDiv;
							$("#"+dialog.waitDiv).addClass("rup_report");
						}
							
						/** ERROR **/
						//Sobreescritura del defaultDialog-error
						if (actualDialog.errorDiv===undefined){
							dialog.error = actualDialog.error;
						//Dialogo propio completo	
						} else {
							dialog.errorDiv = actualDialog.errorDiv;
							$("#"+dialog.errorDiv).addClass("rup_report");
						}

						dialog.successCallback = actualDialog.successCallback;
						dialog.failCallback = actualDialog.failCallback;
					} 
					
					//Dialogo de espera
					var $reportFileWait = $("#"+dialog.waitDiv);
					$reportFileWait.rup_dialog({
					    type: $.rup.dialog.TEXT,
					    autoOpen: false,
					    modal: true,
						resizable: false,
						close: function(event, ui) {
							if ($.rup.browser.isIE){
								//IE
								document.execCommand('Stop');
							} else {
								//Netscape/Mozilla/Firefox
								window.stop();
							}
						}
					});
					if (standarDialog){
						//Titulo
						$reportFileWait.rup_dialog("setOption", "title", dialog.wait.title);
						//Contenido
							var content = $reportFileWait.html().split($reportFileWait.text()),
								html = "";
							for (var i=0; i<content.length; i++){
								if (content[i]===""){
									html += dialog.wait.msg;
								} else {
									html += content[i];
								}
							}
							$reportFileWait.html(html);
					}
					$reportFileWait.rup_dialog("open");
					
					//Lanzar petición
				    $.fileDownload($.rup_utils.setNoPortalParam(button.url), {
				    	httpMethod: "POST",
						data: jQuery.rup_utils.unnestjson(data),
				        successCallback: function (url) {
				        	if (dialog.successCallback!==undefined){
				        		dialog.successCallback();
							}  
				        	$reportFileWait.rup_dialog("close");
				        },
				        failCallback: function (responseHtml, url) {
				        	$reportFileWait.rup_dialog("close");
				        	var $reportFileError = $("#"+dialog.errorDiv);
				        	$reportFileError.rup_dialog({
							    type: $.rup.dialog.TEXT,
							    autoOpen: false,
							    modal: true,
								resizable: false
							});
				            if (standarDialog){
				            	//Titulo
				            	$reportFileError.rup_dialog("setOption", "title", dialog.error.title);
								//Contenido
				            	$reportFileError.rup_dialog("setOption", "message", dialog.error.msg);
				            }
				            $reportFileError.rup_dialog("open");
				            
				            if (dialog.failCallback!==undefined){
				            	dialog.failCallback();
							} 
				        }
				    });
				    return false;
				});
			} else {
				$("[id='"+button.id+"']").on("click", function (){
					window.open(button.url+"?isInline=true","_blank");
				});
			}
			
		},
		_getColumns: function($grid, columns){
			//Preparar datos 
			var colModel = $grid.jqGrid("getGridParam", "colModel"),
				colNames = $grid.jqGrid("getGridParam", "colNames"),
				colNumber = colNames.length,
				columnsArray = [],
				customNames = columns.customNames,
				hidden = columns.hidden===true?true:false;
				
			//Todas las columnas
			if (customNames===undefined){
				for (var i=0; i<colNumber; i++){
					//Omitir columna multiselección
					if (colNames[i].indexOf("type='checkbox'")!==-1){ continue; } 
					//Obtener columna si se requieren todas o si solo se quieren visibles + es visible
					if (hidden || !hidden && colModel[i].hidden===false ){
						var column = [];
						column.push(colModel[i].name);
						column.push(colNames[i]);
						columnsArray.push(column);
					}
				}
			//Columnas por nombre
			} else {
				for (var i=0; i<colNumber; i++){
					if ($.inArray(colModel[i].name, customNames)!==-1){
						var column = [];
						column.push(colModel[i].name);
						column.push(colNames[i]);
						columnsArray.push(column);
					}
				}
			}
			return columnsArray;
		}
	});
	
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	
	$.rup_report.defaults = {
		fncGetGridParam:null,
		dialog: {
			wait : {
				title: $.rup.i18nParse($.rup.i18n.base,"rup_report.waitTitle"),
				msg: $.rup.i18nParse($.rup.i18n.base,"rup_report.waitMsg")
			},
			error : {
				title: $.rup.i18nParse($.rup.i18n.base,"rup_report.errorTitle"),
				msg: $.rup.i18nParse($.rup.i18n.base,"rup_report.errorMsg")
			}
		}
	};
	
})(jQuery);