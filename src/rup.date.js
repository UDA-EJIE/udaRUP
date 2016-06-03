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
	
	//****************************************************************************************************************
	//DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************
	
	var rup_date = {};
	var rup_interval = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_date", rup_date));
	$.extend($.rup.iniRup, $.rup.rupObjectConstructor("rup_date", rup_interval));
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	
	$.fn.rup_date("extend",{
		getRupValue : function(){
			if ($(this).data("datepicker").settings.datetimepicker){

				var tmpDate = $(this).datepicker("getDate");
				
				if(tmpDate===null || tmpDate.toString()==="Invalid Date"){
					return "";
				}
				var dateObj={hour:tmpDate.getHours(),minute:tmpDate.getMinutes(),second:tmpDate.getSeconds()};
				var formattedTime = $.timepicker._formatTime(dateObj, "hh:mm:ss");
				var dateFormat = $(this).data("datepicker").settings.dateFormat;
				
				return $.datepicker.formatDate(dateFormat, tmpDate)+" "+$.timepicker._formatTime(dateObj, "hh:mm:ss"); 
			}else{
				return $(this).rup_date("getDate");
			}
		},
		setRupValue : function(param){
			
			if ($(this).data("datepicker").settings.datetimepicker){
				var fechaArray = param.split(" ");
				
				var tmpDate = new Date(fechaArray[0]);
				var time = fechaArray[1];
				
				var tmpDate = new Date(param);
				if(tmpDate.toString()==="Invalid Date"){
					return "";
				}
				var dateObj={hour:tmpDate.getHours(),minute:tmpDate.getMinutes(),second:tmpDate.getSeconds()};
				
				var formattedTime = $.timepicker._formatTime(dateObj, $(this).data("datepicker").settings.timeFormat);

				$(this).datepicker("setTime", param);
				
				$(this).val(fechaArray[0]+" "+formattedTime);
				
			}else{
				$(this).val(param);
			}
		},
		destroy : function(){
			//Eliminar máscara
			var labelMaskId = $(this).data("datepicker").settings.labelMaskId;
			if (labelMaskId){
				$("#"+labelMaskId).text("");
			}
			delete labelMaskId;
			$(this).datepicker("destroy");
		},
		disable : function(){
		  $(this).datepicker("disable");
		},
		enable : function(){
		  $(this).datepicker("enable");
		},
		isDisabled : function(){
		  return $(this).datepicker("isDisabled");
		},
		hide : function(){
		  $(this).datepicker("hide");
		},
		show : function(){
		  $(this).datepicker("show");
		},
		getDate : function(){
			return $(this).val();
		},
		setDate : function(date){
		  $(this).datepicker("setDate" , date);
		},
		refresh : function(){
	  		$(this).datepicker("refresh");
		},
		option : function(optionName, value){
	  		$(this).datepicker("option", optionName, value);
		}
		//No soportadas: widget, dialog
	});
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_date("extend", {
			_init : function(args){
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					//Se recogen y cruzan las paremetrizaciones del objeto
					var settings = $.extend({}, $.fn.rup_date.defaults, args[0]);
					
					//Eventos
					//*******
						//Guardar referencia
						settings._onClose = settings.onClose;
						settings.onClose = function(event, ui) {
							if (settings._onClose!==undefined){settings._onClose(event,ui);}
							if (!$.rup.browser.isIE){
								$(this).focus();
							}
						};
						
						if (settings.multiSelect){
							settings._beforeShow = settings.beforeShow;
							settings.beforeShow = function(ui, obj) {
								if (settings._beforeShow!==undefined){settings._beforeShow(ui, obj);}
								
								var $dateInput = $(ui), dateValue = $dateInput.attr("value"), dates;
								
								if (dateValue!==undefined && dateValue!==''){
									dates = dateValue.split(",");
									if (dates.length>1){
										$dateInput.multiDatesPicker("addDates",dates);
									}
								}
							};
						}
						
						
					//Se carga el identificador del padre del patron
					settings.id = $(this).attr("id");
					
					(this).attr("ruptype","date");

					//Carga de propiedades/literales
					//var literales = $.extend($.rup.i18n.base.rup_time,$.rup.i18n.base.rup_date);
					var literales = $.rup.i18n.base["rup_date"];
					for (var key in literales){
						settings[key] = literales[key];
					}
					
					//Mostrar máscara
					if (settings.labelMaskId){
						if (settings.datetimepicker){
							if (settings.showSecond){
								$("#"+settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base,"rup_date.maskDateTimeSec")+" ");
							}else{
								$("#"+settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base,"rup_date.maskDateTime")+" ");
							}
						}else{
							$("#"+settings.labelMaskId).text($.rup.i18nParse($.rup.i18n.base,"rup_date.mask")+" ");
						}
					}
					
 					//Fix: Arregla problema tamaño capa cuando selector es DIV y meses es array [X,1]
					if ($("#"+settings.id).is("div") && settings.numberOfMonths[1]===1){
						if  (!settings.showWeek){
							$("#"+settings.id).css("width", "15.4em");
						} else {
							$("#"+settings.id).css("width", "17.1em");
						}
					}
					
					//Imagen del calendario
					settings.buttonImage = $.rup.STATICS + (settings.buttonImage?settings.buttonImage:"/rup/basic-theme/images/calendario.png");
					
					//Sab-Dom deshabilitados
					if (settings.noWeekend){
						settings.beforeShowDay =  $.datepicker.noWeekends;
					}
					
					//Atributos NO MODIFICABLES
						//La imagen no debe ser un botón
						settings.buttonImageOnly = true;
						//Solo permitir caracteres permitidos en la máscara
						settings.constrainInput = true;
						//Mostrar patrón con foco en input y pinchando imagen
						settings.showOn = "both";

					//Datepicker
					if (!settings.multiSelect){
						if (settings.datetimepicker){
							(this).attr("maxlength","16");
							$("#"+settings.id).datetimepicker(settings);
						}else{
							(this).attr("maxlength","10");
							$("#"+settings.id).datepicker(settings);
						}
					} else {
						var maxlength = 0;
						if (typeof settings.multiSelect === 'number'){
							settings.mode = {
								modeName: 'normal',
								options : {maxPicks : settings.multiSelect}
							};
							maxlength = (10*settings.multiSelect)+(settings.multiSelect-1);
						} else if (typeof settings.multiSelect === 'object'){
							settings.mode = {
								modeName: 'daysRange',
								options : {autoselectRange : settings.multiSelect}
							};
							maxlength = settings.multiSelect[1] - settings.multiSelect[0];
							maxlength = (10*maxlength)+(maxlength-1);
						}	
						(this).attr("maxlength", maxlength);
						
						//Sobreescribir valores por defecto para multiselección
						$.datepicker._defaults.dateFormat = settings.dateFormat;
						$("#"+settings.id).multiDatesPicker(settings);
						
						//Permitir separador de intervalos (coma)
						$(this).keypress(function (event) {
							if (event.charCode===44){
								var value = $(event.currentTarget).val(),
									cursorPosStart = event.originalEvent.originalTarget.selectionStart,
									cursorPosEnd = event.originalEvent.originalTarget.selectionEnd;
									begin = value.substring(0,cursorPosStart),
									end = value.substring(cursorPosEnd);
								//Si no tiene tamaño máximo o tiene selección de caracteres
								if (value.length < $(event.currentTarget).attr("maxlength") || 	cursorPosStart !== cursorPosEnd){
									$(event.currentTarget).val(begin+","+end);
									event.originalEvent.originalTarget.selectionStart = cursorPosStart+1;
									event.originalEvent.originalTarget.selectionEnd = cursorPosStart+1;
								}
							}
						});
					}
					
					//Ajuste para el comportamiento de portales
					if($.rup_utils.aplicatioInPortal() && !$("#"+settings.id).is("div")){
		            	$(".r01gContainer").append($(".ui-datepicker:not(.r01gContainer .ui-datepicker)"));
		            }
					
					// Se aplica el tooltip
					$(this).parent().find("[title]").rup_tooltip({"applyToPortal": true});
					
					//Deshabilitar
					if (settings.disabled){
						$("#"+settings.id).rup_date("disable");
					}
				}
			}
		});
		$.rup_date("extend", {
			_init : function(args){
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					//Se recogen y cruzan las paremetrizaciones del objeto (duplicado de objetos)
					var settings = $.extend({}, $.fn.rup_date.defaults, args[0]),
					from_settings = $.extend(true, {}, settings),
					to_settings =  $.extend(true, {}, settings);

					//Gestionar intervalo del campo desde				
					from_settings.onClose = function(dateText, inst) {
//				        var endDateTextBox = $("#"+settings.to);
						var $endDateTextBox = $("#"+settings.to),
					        $startDateTextBox = inst.input, startDateData, toDateData, testStartDate, testEndDate;
						
				        if ($endDateTextBox.attr("value") != '') {
				        	startDateData = $startDateTextBox.data("datepicker");
				        	toDateData = $endDateTextBox.data("datepicker");
				        	
				        	if (startDateData.settings.timepicker!==undefined){
				        		testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay, startDateData.settings.hour, startDateData.settings.minute, startDateData.settings.second);
				        	}else{
				        		testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay);
				        	}
				        	if (toDateData.settings.timepicker!==undefined){
				        		testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay, toDateData.settings.hour, toDateData.settings.minute, toDateData.settings.second);
				        	}else{
				        		testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay);
				        	}
				            
				            if (testStartDate > testEndDate){
				                $endDateTextBox.attr("value",dateText);
				            }
				        }
				        else {
				            $endDateTextBox.attr("value",dateText);
				        }
				        if (settings.onClose!==undefined){ settings.onClose(dateText, inst); }
					};
					from_settings.onSelect = to_settings.beforeShow = function (selectedDate){
				        var start = $("#"+settings.from).datetimepicker('getDate'), startDate;
				       
				        startDate = start!==null?new Date(start.getTime()):null;
				        
				        $("#"+settings.to).datetimepicker('option', 'minDate', startDate);
				        
				        if (settings.datetimepicker){
				        	$("#"+settings.to).datetimepicker('option', 'minDateTime', startDate);
				        }
					    
				        if (settings.onSelect!==undefined){ settings.onSelect(selectedDate);}
				    };
				        
				  //Gestionar intervalo del campo hasta	
				    to_settings.onClose = function(dateText, inst) {
				        var $startDateTextBox = $("#"+settings.from),
				        $endDateTextBox = inst.input, startDateData, toDateData, testStartDate, testEndDate;
				        
				        if ($startDateTextBox.attr("value")  != '') {
				        	startDateData = $startDateTextBox.data("datepicker");
				        	toDateData = $endDateTextBox.data("datepicker");
				        	
				        	if (startDateData.settings.timepicker!==undefined){
				        		testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay, startDateData.settings.hour, startDateData.settings.minute, startDateData.settings.second);
				        	}else{
				        		testStartDate = new Date(startDateData.selectedYear, startDateData.selectedMonth, startDateData.selectedDay);
				        	}
				        	if (toDateData.settings.timepicker!==undefined){
				        		testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay, toDateData.settings.hour, toDateData.settings.minute, toDateData.settings.second);
				        	}else{
				        		testEndDate = new Date(toDateData.selectedYear, toDateData.selectedMonth, toDateData.selectedDay);
				        	}
				            
				            if (testStartDate > testEndDate){
				            	$startDateTextBox.attr("value",dateText);
				            }
				        }
				        else {
				            $startDateTextBox.attr("value",dateText);
				        }
				        if (settings.onClose!==undefined){ settings.onClose(dateText, inst); }
				    };
				    to_settings.onSelect = from_settings.beforeShow = function (selectedDate){
				        var end = $("#"+settings.to).datetimepicker('getDate'), endDate;
				        
				        endDate = end!==null?new Date(end.getTime()):null;
				        
				        $("#"+settings.from).datetimepicker('option', 'maxDate', endDate);
				        
				        if (settings.datetimepicker){
				        	$("#"+settings.from).datetimepicker('option', 'maxDateTime',endDate);
				        }
				        
				        if (settings.onSelect!==undefined){ settings.onSelect(selectedDate); }
				    };
				    
					//Lanzar componente
					$("#"+settings.from).rup_date(from_settings);
					$("#"+settings.to).rup_date(to_settings);
				}
			}
		});
		
	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//******************************************************
	$.fn.rup_date.defaults = {
		datetimepicker: false,
		multiSelect: false,
		changeMonth: true,
		changeYear: true,
		noWeekend: false,
		showSecond: true
	};	
	
})(jQuery);