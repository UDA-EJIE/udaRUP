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
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//****************************************************************************************************************
	
	var rup_wizard = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_wizard", rup_wizard));
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//*******************************
	$.fn.rup_wizard("extend",{
		//Seleccionar paso [0..n]
		step: function(stepNumber) {
			
			//controlar si está deshabilitado
			if ($("#stepDesc" + stepNumber).hasClass("disabled")){
				return false;
			}
			
			var currentId = $("#steps li.current").attr("id");
			
			//Gestionar cabeceras
			$("#steps li").removeClass("current");
            $("#stepDesc" + stepNumber).addClass("current");
	            //Estilo flecha paso anterior
	            $("#steps li").removeClass("visited");
	            if (stepNumber != 0){
	            	$("#stepDesc" + (stepNumber-1)).addClass("visited");
	            }
            
            //Gestionar capas
            $("#step" + currentId.substring(8)).hide();
            $("#step" + stepNumber).show();
            
            //Gestionar submitButton
            if (!this.rup_wizard("isCurrentStepLast")){
            	$(".rup-wizard_submitButton").hide();
            } else {
            	$(".rup-wizard_submitButton").show();
            	//Mover botón si no es resumen
            	if (!this.rup_wizard("isCurrentStepSummary")){
            		$("#step" + stepNumber).find("p[id$='commands']").append($(".rup-wizard_submitButton"));
            	}
            }
		},
		first: function(){
			this.rup_wizard("step",0);
		},
		last: function(){
			this.rup_wizard("step", $("#steps").children().size()-1);
		},
		getCurrentStep: function(){
			return parseInt($("#steps li.current").attr("id").substring(8));
		},
		isCurrentStep: function(i){
			return (this.rup_wizard("getCurrentStep")===i);
		},
		isCurrentStepFirst: function(){
			return this.rup_wizard("isCurrentStep",0);
		},
		isCurrentStepLast: function(){
			return ($("#steps").children().size()-1 === this.rup_wizard("getCurrentStep"));
		},
		isCurrentStepSummary: function(){
			return $("#stepDesc" + this.rup_wizard("getCurrentStep")).hasClass("rup-wizard_summary");
		},
		enableStep: function(stepNumber){
			$("#stepDesc" + stepNumber).removeClass("disabled");
		},
		disableStep: function(stepNumber){
			$("#stepDesc" + stepNumber).addClass("disabled");
		},
		isStepDisabled: function(stepNumber){
			return $("#stepDesc" + stepNumber).hasClass("disabled");
		} 
	});
	
	//*******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//*******************************
	$.fn.rup_wizard("extend", {
			_init : function(args){
				if (args.length > 1) {
					$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
				} else {
					var settings = $.extend({}, $.fn.rup_wizard.defaults, args[0]),
						rupWizard = this; //referencia
					
					this._formToWizard(settings);
					
					//Contenedor (UL)
					$("#steps").addClass("rup-wizard_stepsDescContainer");
					
					//Paso (LI)
					$("#steps").children().each( function(index, element){
						$(element)
							.addClass("rup-wizard_stepDesc")//Estilo paso (LI)
							.click(function (event){
								//Click en cabecera para cambio de paso
								var step = $(this).attr("id").substring(8);
								if (!rupWizard.isStepDisabled(step)){
									if (settings.stepFnc[step] !== undefined){
										if (settings.stepFnc[step].call() === false){
											event.stopImmediatePropagation();
											return false;
										}
									}
									$(this).rup_wizard("step", step);
								}
							});

						//Eliminar "Step X"
						var span = $(element).children();
						$(span).text((index+1) + ". " + $(span).text());
						$(element).text("").append(span);
					});
					
					//Botones Anterior/Siguiente
					$("p[id$='commands'] .prev")
						//Estilo
						.removeClass("prev").addClass("rup-wizard_prev")
						//Texto
						.text($.rup.i18nParse($.rup.i18n.base,"rup_wizard.prev"))
						//Evento 'click'
						.unbind('click').click(function(event){ 
							//Paso anterior 
							rupWizard._gotoPrevStep(rupWizard, settings, event);
						});
					$("p[id$='commands'] .next")
						//Estilo
						.removeClass("next").addClass("rup-wizard_next")
						//Texto
						.text($.rup.i18nParse($.rup.i18n.base,"rup_wizard.next"))
						//Evento 'click'
						.unbind('click').click(function(event){ 
							//Siguiente paso
							rupWizard._gotoNextStep(rupWizard, settings, event);
						});
					
					//Estilo botón submit (sirve de ID)
					$("#" + settings.submitButton).addClass("rup-wizard_submitButton");
					if (settings.submitFnc){
						$("#" + settings.submitButton).click(settings.submitFnc);
					}
					
					//Estilos firstStep y finalStep
					$("#steps li:first").addClass("rup-wizard_firstStepDesc");
					$("#steps li:last").addClass("rup-wizard_lastStepDesc");
					
					//Paso de RESUMEN
					if (settings.summary){
						//Cabecera
						$("#steps li:last").removeClass("rup-wizard_lastStepDesc");
						var stepNumber = $("#steps").children().size(),
							stepDesc = $("<li>")
											.attr("id", "stepDesc" + stepNumber)
											.addClass("rup-wizard_stepDesc rup-wizard_summary rup-wizard_lastStepDesc")
											.append("<a href='#'>"+(stepNumber+1)+". "+$.rup.i18nParse($.rup.i18n.base,"rup_wizard.summary")+"</a>")
											.click(function (){
												//Paso final
												$(this).rup_wizard("step", $(this).attr("id").substring(8));
												//Resumen
												rupWizard._generateSummary(stepNumber, rupWizard, settings);
											});
						$("#steps").append(stepDesc);
						
						//Capa
						if (stepNumber > 1){
							$("div[id='step"+(stepNumber-1)+"']").after("<div id='step"+stepNumber+"' style='display: none;'/>");
							
							//Añadir botón siguiente anteúltimo paso
							var nextButton = $("<a>")
								.attr("id", "step" + (stepNumber-1) + "Next")
								.html($.rup.i18nParse($.rup.i18n.base,"rup_wizard.next"))
								.addClass("rup-wizard_next")
								.unbind('click').click(function(event){ 
									//Siguiente paso
									rupWizard._gotoNextStep(rupWizard, settings, event);
									//Resumen
									rupWizard._generateSummary(stepNumber, rupWizard, settings);
								});
							$("#step" + (stepNumber-1) + "commands").append(nextButton);
						}
						
					}
					
					//Disabled
					if (settings.disabled !== undefined){
						$.each(settings.disabled, function(index, element){
							if (typeof element === "number"){
								$(this).rup_wizard("disableStep", element);
							} else if (typeof element === "string"){
								var begin = parseInt(element.substring (0, element.indexOf("-"))),
									end = parseInt(element.substring (element.indexOf("-")+1, element.length));
								for (var i=begin; i<=end; i++){
									$(this).rup_wizard("disableStep", i);
								}
							}
						});
					}
				}
				
				//Ir al paso inicial
				this.rup_wizard("step",0);
			},
			_gotoNextStep : function(rupWizard, settings, event) {
				// Obtener paso siguiente
				var nextStep = parseInt($("#steps li.current")
						.attr("id").substring(8)) + 1;

				// Comprobar que no está deshabilitado (o buscar el
				// siguiente
				// habilitado)
				if (rupWizard.isStepDisabled(nextStep)) {
					nextStep = $("#stepDesc" + (nextStep - 1))
							.nextAll("li:not(.disabled)").first()
							.attr("id");
					if (nextStep !== undefined) {
						nextStep = parseInt(nextStep.substring(8));
					} else {
						return false;
					}

					// Si fuera necesario, se generar el resumen
					if (jQuery("#steps").children().size() - 1 === nextStep) {
						rupWizard._generateSummary(nextStep,
								rupWizard, settings);
					}
				}

				// Invocar f(x) del paso (si existe)
				if (settings.stepFnc[nextStep] !== undefined) {
					if ($("#stepDesc" + nextStep).not(
							".rup-wizard_summary").length > 0) { // Evitar
						// resumen
						// (mala
						// configuracion
						// desarrollador)
						if (settings.stepFnc[nextStep].call() === false) {
							event.stopImmediatePropagation();
							return false;
						}
					}
				}

				// Cambiar de paso
				$("#stepDesc" + nextStep).rup_wizard("step",
						nextStep);
			},
			_gotoPrevStep : function (rupWizard, settings, event){
				
				//Obtener paso anterior
				var prevStep = parseInt($("#steps li.current").attr("id").substring(8))-1;					
				
				//Comprobar que no está deshabilitado (o buscar el anterior habilitado)
				if (rupWizard.isStepDisabled(prevStep)){
					prevStep = $("#stepDesc"+(prevStep+1)).prevAll("li:not(.disabled)").first().attr("id");
					if (prevStep !== undefined){
						prevStep = parseInt(prevStep.substring(8));
					} else {
						return false;
					}
				}
				
				//Invocar f(x) del paso (si existe)
				if (settings.stepFnc[prevStep] !== undefined){
					if (settings.stepFnc[prevStep].call() === false){
						event.stopImmediatePropagation();
						return false;
					}
				}
				
				//Cambiar de paso
				$("#stepDesc"+prevStep).rup_wizard("step", prevStep);
			},
			_generateSummary : function (stepNumber, rupWizard, settings){
				
				//controlar si está deshabilitado
				if ($("#stepDesc" + stepNumber).hasClass("disabled")){
					return false;
				}

				//Devolver botón submit a su lugar
				$("#step" + stepNumber).parent().append($(".rup-wizard_submitButton"));
				
				/** DEVELOPER SummaryFnc_PRE **/
				if (settings.summaryFnc_PRE && settings.summaryFnc_PRE.call() === false){
					return false;
				}
				
				//Reiniciar capa (si hacemos .empty() no funciona accordion la segunda vez)
				$("#step"+stepNumber).remove();
				$("div[id='step"+(stepNumber-1)+"']").after("<div id='step"+stepNumber+"' style='display: none;'/>");
				
				
				//Copiar capas anteriores
				for (var i=0; i<stepNumber; i++){
					if (!rupWizard.isStepDisabled(i)){//Comprobar pasos deshabilitados
						$("#step"+stepNumber).append($("#step"+i).children().clone());
					}
				}
				
				//Eliminar botones
				$("#step"+stepNumber+" p[id$='commands']").remove();
				
				//Botón anterior
				$("div[id='step"+(stepNumber)+"'] fieldset:last").append("<p id='step" + stepNumber + "commands'></p>");
				var prevButton = $("<a>")
									.attr("id", "step" + stepNumber + "Prev")
									.html($.rup.i18nParse($.rup.i18n.base,"rup_wizard.prev"))
									.addClass("rup-wizard_prev")
									.unbind('click').click(function(event){ 
										//Paso anterior 
										rupWizard._gotoPrevStep(rupWizard, settings, event);
									});
				$("#step" + stepNumber + "commands").append(prevButton);
				
				
				/** DEVELOPER SummaryFnc_INTER **/
				if (settings.summaryFnc_INTER && settings.summaryFnc_INTER.call() === false){
					return false;
				}
				
				//RUP_MULTICOMBO
				$("#step"+stepNumber+" .ui-multiselect").each( function() {
					var selectObj = $("#"+$(this).prev().attr('id'));
					if (selectObj.data("settings")!==undefined){
						var seleccionados = selectObj.rup_combo("label");
						if (seleccionados.length>0){//Existen elementos seleccionados?
							if (selectObj.data("settings")["summaryInline"] == undefined){
								//Tratamiento por defecto
								var contenedor = $("<div />").addClass("rup-wizard_summaryMultivalue").insertAfter(this);
								for (var i=0; i<seleccionados.length; i++){
									$(settings.labelElement, { text: '- '+ seleccionados[i], "class":"rup-wizard_summaryValue"}).appendTo(contenedor);
									$("<br/>").appendTo(contenedor);
								}
							} else {
								//Tratamiento en línea
								$(settings.labelElement, { text: seleccionados.toString().replace(/,/g,", "), "class":"rup-wizard_summaryValue" }).insertAfter(this);
							}
						} else{
							$(settings.labelElement, { html: "&nbsp;", "class":"rup-wizard_summaryValue" }).insertAfter(this);
						}
						$(this).prev().remove();
						$(this).remove();
					}
				});
				
				//Gestionar INPUTS
				$("#step"+stepNumber+" input").each( function() {
					if (this.type === "text"){
						$(settings.labelElement, { text: this.value, "class":"rup-wizard_summaryValue" }).insertAfter(this);
					} else if (this.type === "password"){
						$(settings.labelElement, { text: rupWizard._hidePassword(this.value), "class":"rup-wizard_summaryValue" }).insertAfter(this);
					} else if (this.type === "radio"){
						if (this.checked){
							$(settings.labelElement, { text: $("#step"+stepNumber+" label[for='"+this.id+"']").text(), "class":"rup-wizard_summaryValue" }).insertAfter(this);
							$("#"+this.id).attr("checked","checked"); //Restablecer selección que se pierde al clonar
						}
//						if (this.checked){
//							$(settings.labelElement, { text: "(*) " + $("#step"+stepNumber+" label[for='"+this.id+"']").text(), "class":"rup-wizard_summaryValue" }).insertAfter(this);
//							$("#"+this.id).attr("checked","checked"); //Restablecer selección que se pierde al clonar
//						} else {
//							$(settings.labelElement, { text: "( ) " + $("#step"+stepNumber+" label[for='"+this.id+"']").text(), "class":"rup-wizard_summaryValue" }).insertAfter(this);
//						}
						$("#step"+stepNumber+" label[for='"+this.id+"']").remove();
					} else if (this.type === "checkbox"){
						if (this.checked){
							$(settings.labelElement, { text: "[X] " + $("#step"+stepNumber+" label[for='"+this.id+"']").text(), "class":"rup-wizard_summaryValue" }).insertAfter(this);
						} else {
							$(settings.labelElement, { text: "[ ] " + $("#step"+stepNumber+" label[for='"+this.id+"']").text(), "class":"rup-wizard_summaryValue" }).insertAfter(this);
						}
						$("#step"+stepNumber+" label[for='"+this.id+"']").remove();
					}
					$(this).remove();
				});
				
				//Gestionar TEXTAREAS
				$("#step"+stepNumber+" textarea").each( function() {
					$(settings.textareaElement, { text: $("#"+$(this).attr("id")).val(), "class":"rup-wizard_summaryParagraph" }).insertAfter(this);
					$(this).remove();
				});
				
				//Gestionar SELECTS
				$("#step"+stepNumber+" select:not('.ui-pg-selbox')").each( function() {
				   $(settings.labelElement, { text: ($("#"+this.id+" option:selected").text()!=="&nbsp;")?$("#"+this.id+" option:selected").text():"", "class":"rup-wizard_summaryValue" }).insertAfter(this);
				   $(this).remove();
				});
				
				//Gestionar LABELS
				$("#step"+stepNumber+" label").each( function() {
					$(settings.labelSeparatorElement, { html: settings.labelSeparatorText, "class":"rup-wizard_separator" }).insertAfter(this);
					$(settings.labelElement, { text: this.innerHTML, "class":"rup-wizard_summaryLabel" }).insertAfter(this);
					$(this).remove();
				});
				
				//Gestionar componentes RUP
					//rup_accordion
					$("#step"+stepNumber+" .ui-accordion").each( function() {
						$(this).attr("id",  $(this).attr("id") + "_summary");
						$(this).removeAttr("class");
						$(this).children("h1").removeAttr("class");
						$(this).children("div").removeAttr("class");
						if ($.isEmptyObject(settings.rupAccordion)){
							$(this).rup_accordion(settings.accordion);
						} else {
							$(this).rup_accordion(settings.rupAccordion);
						}
					});
			
					//rup_combo (multicombo se procesa antes)
					$("#step"+stepNumber+" .rup_combo").each( function() {
						$(this).remove();
					});
					
					//rup_date
					$("#step"+stepNumber+" img.ui-datepicker-trigger").each( function() {
						$(this).remove();
					});
					
					//rup_time					
					$("#step"+stepNumber+" img.ui-timepicker-trigger").each( function() {
						$(this).remove();
					});
					
					//rup_tabs
					var maxLevel = 0; //Control de estilos cuando las pestañas pasan a accordion
					if (settings.summaryTabs2Accordion){
						settings.rupTabsElement = "<a />";
					}
					$("#step"+stepNumber+" > fieldset").children(".rup-tabs_container").each( function() {
						
						var labelTabs = new Array(),
							idTabs = new Array(),
							fieldset = $(this).parent().attr("accordionable",true), //Donde se deben anidar las pestañas
							containerTab = new Array();
						
						//Obtención de valores/ids de pestañas (labelTabs & idTabs)
						rupWizard._getRupTabs(rupWizard, $(this), labelTabs, idTabs);
						
						//Procesar pestañas
						var tab = null,
							pointer = $(fieldset);
						for (var i=0; i<labelTabs.length; i++){
							tab = $(settings.rupTabsElement).text(labelTabs[i]); //LABEL pestaña
							if (idTabs[i].indexOf("rupRandomLayerId")!==-1){ 
								//Es pestaña
								tab = $(tab).wrap("<div class='IE8_fix'>");
									tab = $(tab).parent().append($(this).find(idTabs[i]).html());
									$(tab).children("div").addClass("rup-wizard_tabLevel-"+containerTab.length);
								tab = $(tab).children().unwrap();
							} else {
								//Es contenedor de pestañas
								tab = $(tab).attr("tabContainer",true);
								tab = $(tab).wrap("<div class='IE8_fix'>");
									tab = $(tab).parent().append($("<div>")
																	.attr("id","subtab_"+labelTabs[i])
																	.attr("accordionable",true)
																	.addClass("rup-wizard_tabContainerLevel-"+containerTab.length)
										  );
								tab = $(tab).children().unwrap();
								containerTab.push(labelTabs[i]);
								maxLevel++;
								$(pointer).append(tab);
								pointer = $("#subtab_"+labelTabs[i]);
								continue;
							}
							
							//Comprobamos si es subelemento
							if ($("#"+containerTab[containerTab.length-1]).find(idTabs[i]).length === 0){
								//No es subpestaña, se debe mover el puntero de dónde se deba añadir la capa
								pointer = $(fieldset);
								do{
									containerTab.pop();//Extraer contenedor de pestañas
									//Comprobar si es subelemento
									if ($("#"+containerTab[containerTab.length-1]).find(idTabs[i]).length > 0){
										pointer = $("#subtab_"+containerTab[containerTab.length-1]);
										break;
									} else {
										//Recalcular estilo (valor del nivel)
										$($(tab).get(1)).removeAttr("class").addClass("rup-wizard_tabLevel-"+containerTab.length);
									}
								} while (containerTab.length>0);
							} 
							
							//Añadir la capa
							$(pointer).append(tab);
						}
						
						
						// rup_table
						$("#step"+stepNumber+" .rup-table-container").each( function() {
						    var $table = $(this);

						    $table.fluidWidth({
						        fluidBaseLayer:"#"+$table.parent().attr("id")
						    });

						});

						
						//h1 a /h1 para Pesatañas
						if (settings.summaryTabs2Accordion){
							$(fieldset).find("a").each(function(){
								if (!$(this).hasClass("rup-wizard_prev") &&  !$(this).hasClass("rup-wizard_next") ){ //Controlar que no sea botón
									$(this).wrap("<h1>");
								}
							});
						}
						
						//Eliminar contenedor
						$(this).remove();
					});
					
				//summaryWithAccordion
				if (settings.summaryWithAccordion){
					
					//Convertir estructura
					$("#step"+stepNumber).find("legend").each( function(index, element) {
						//legend -> h1 a /h1
						$("<a />")
							.text(element.innerHTML)
							.insertBefore($(element).parent())
							.wrap("<h1 />");

						//fieldset -> div
						$(element).parent().replaceWith(
							$("<div />")
								.attr("accordionable", $(element).parent().attr("accordionable")===undefined?false:true)
								.append($(element).parent().children())
						);
						
						//remove legend
						$(element).remove();
					});
				
					//convertir en rup-accordion
					if ($.isEmptyObject(settings.summaryAccordion)){
						$("#step"+stepNumber).rup_accordion(settings.accordion);
					} else {
						$("#step"+stepNumber).rup_accordion(settings.summaryAccordion);
					}
					
					//Botón anterior (sacar de accordion)
					$("<fieldset />")
						.attr("id", "commands_fieldset")
						.append($("#step"+stepNumber).find("p[id='step"+(stepNumber)+"commands']"))
						.appendTo($("#step"+stepNumber));
					
					//Espacio para separarlo de los pasos
					if (settings.summaryWithAccordionSpaceBefore){
						$("#step"+stepNumber).prepend("</br>");
					}
					//Espacio para separarlo de los botones
					if (settings.summaryWithAccordionSpaceAfter){
						$("#commands_fieldset").prepend("</br>");
					}
				}
				
				//tabs2Accordion
				if (settings.summaryTabs2Accordion){
					//Eliminar estilos para no accordion
					for (var i=0; i<=maxLevel; i++){
						$(".rup-wizard_tabLevel-"+i).removeClass("rup-wizard_tabLevel-"+i);
						$(".rup-wizard_tabContainerLevel-"+i).removeClass("rup-wizard_tabContainerLevel-"+i);
					}
					
					$("[accordionable=true]").each( function(index, element) {
						if (element.nodeName === "FIELDSET"){
							var legend = $(element).find("legend")[0],
								buttons = $(element).find("p[id='step"+(stepNumber)+"commands']"),
								object = $("<div />")
									.attr("accordionable", $(element).attr("accordionable")===undefined?false:true)
									.append($(element).children());
							
							//Cambiar estructura
							$(element).replaceWith(object);
							
							//Eliminar extras (LEGEND y BOTONES)
							$(legend).remove();
							$(buttons).remove();
							
							//Accordion
							if ($.isEmptyObject(settings.tabAccordion)){
								$(object).rup_accordion(settings.accordion);
							} else {
								$(object).rup_accordion(settings.tabAccordion);
							}
							
							//Restablecer extras (LEGEND y BOTONES)
							$(object).prepend(legend);
							$(object).append($("<fieldset />").append(buttons));
						} else {
							if ($.isEmptyObject(settings.tabAccordion)){
								$(element).rup_accordion(settings.accordion);
							} else {
								$(element).rup_accordion(settings.tabAccordion);
							}
						}
					});
				}
				
				//Eliminar posibles atributos y estilos extra
				$("[accordionable]").removeAttr("accordionable");
				
				//Mover botón submit
				$("#step" + stepNumber).find("p[id$='commands']").append($(".rup-wizard_submitButton"));
				
				//Mostrar paso
				$("#step"+stepNumber).show();
				
				/** DEVELOPER SummaryFnc_POST **/
				if (settings.summaryFnc_POST){
					settings.summaryFnc_POST.call();
				}
				
			},
			_getRupTabs: function(rupWizard, object, labelTabs, idTabs){
				//Recorrer los enlaces a pestañas
				$(object).find(".rup-tabs_title").each( function(index, element) {
					//Comprobar que si el elemento ya existe (subpestaña) por recursividad, se omite
					if ($.inArray(element.innerHTML, labelTabs) !== -1){
						return;
					}
					
					//Obtener ID y LABEL 
					idTabs.push($(element).parent().attr("href"));
					labelTabs.push(element.innerHTML);
					
					//Es un contenedor de pestañas (llamada recursiva para pre-procesar los hijos)
					if (idTabs[idTabs.length-1].substring(1) === labelTabs[labelTabs.length-1]){
						rupWizard._getRupTabs(rupWizard, $("#"+labelTabs[labelTabs.length-1]), labelTabs, idTabs);
					}
				});
			},
			_hidePassword : function (password){
				var value = '';
				for (var i=0; i<password.length; i++){
					value += '*'; 
				}
				return value;
			},
			/* Created by jankoatwarpspeed.com */ //http://www.jankoatwarpspeed.com/post/2009/09/28/webform-wizard-jquery.aspx
			//Modificaciones:
			//	- SPAN por A en los pasos para poder navegar con el tabulador
				
			_formToWizard : function(options) {
		        options = $.extend({  
		            submitButton: "" 
		        }, options); 
		        
		        var element = this;

		        var steps = $(element).find("fieldset");
		        var count = steps.size();
		        var submmitButtonName = "#" + options.submitButton;
		        $(submmitButtonName).hide();

		        // 2
		        $(element).before("<ul id='steps'></ul>");

		        steps.each(function(i) {
		            $(this).wrap("<div id='step" + i + "'></div>");
		            $(this).append("<p id='step" + i + "commands'></p>");

		            // 2
		            var name = $(this).find("legend").html();
		            $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<a href='#'>" + name + "</a></li>");

		            if (i == 0) {
		                createNextButton(i);
		                selectStep(i);
		            }
		            else if (i == count - 1) {
		                $("#step" + i).hide();
		                createPrevButton(i);
		            }
		            else {
		                $("#step" + i).hide();
		                createPrevButton(i);
		                createNextButton(i);
		            }
		        });

		        function createPrevButton(i) {
		            var stepName = "step" + i;
		            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>< Back</a>");

		            $("#" + stepName + "Prev").bind("click", function(e) {
		                $("#" + stepName).hide();
		                $("#step" + (i - 1)).show();
		                $(submmitButtonName).hide();
		                selectStep(i - 1);
		            });
		        }

		        function createNextButton(i) {
		            var stepName = "step" + i;
		            $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next ></a>");

		            $("#" + stepName + "Next").bind("click", function(e) {
		                $("#" + stepName).hide();
		                $("#step" + (i + 1)).show();
		                if (i + 2 == count)
		                    $(submmitButtonName).show();
		                selectStep(i + 1);
		            });
		        }

		        function selectStep(i) {
		            $("#steps li").removeClass("current");
		            $("#stepDesc" + i).addClass("current");
		        }

		    }
		});
		
	//******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//******************************************************
	$.fn.rup_wizard.defaults = {
		summary : true,
		summaryWithAccordion : false,
		summaryWithAccordionSpaceBefore : true,
		summaryWithAccordionSpaceAfter : true,
		summaryTabs2Accordion : false,
		stepFnc: {}, //funciones de cada paso
		accordion: {
			animated: "bounceslide",
			active: false,
			autoHeight: false,
			collapsible: true
		},
		rupAccordion: {}, //accordion (config) definidos en el formulario
		summaryAccordion: {}, //accordion (config) para generar resumen
		tabAccordion: {}, //accorion (config) para pestañas del resumen
		rupTabsElement : "<h4 />",
		labelElement : "<span />",
		labelSeparatorElement : "<span />",
		labelSeparatorText : "&nbsp;&nbsp;&nbsp;",
		textareaElement : "<p />"
	};	
	
})(jQuery);