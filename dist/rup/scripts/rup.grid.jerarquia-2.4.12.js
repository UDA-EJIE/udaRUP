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
	
	var rup_grid_jerarquia = {};
	
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_grid_jerarquia", rup_grid_jerarquia));
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	
	$.fn.rup_grid_jerarquia("extend",{
		//Reiniciar los elementos expandidos
		reset : function () {
			$(this).data("jerarquia.tree", []);
			//Modificar el parámetro de búsqueda
			postData = $(this).getGridParam("postData");
        	delete postData["jerarquia.tree"];
		},
		//Reiniciar elementos seleccionados (multiselect)
		resetMultiselect : function () {
			var self = this,
				gridID = $(self).attr("id");

			//Reiniciar los elementos seleccionados
			self.data("treeSelection", []);
			self.getGridParam('selarrrow').length = 0; //gestión de jqGrid
			
			//Deseleccionar
			$.each (self.find("tr[aria-selected='true']"), function (index, object){
				$(object).removeClass("ui-state-highlight").attr("aria-selected","false");
				$(object).find("[aria-describedby='"+gridID+"_cb'] input").removeAttr("checked");
			});
			
			//Actualizar pie
			self._refreshFooter.call(self);
		},
		//Obtener elementos seleccionados (multiselect)
		getMultiselect : function () {
			var self = this;
			if (self.data("settings")!==undefined){
				var token = self.data("settings").token;
				return $.map(this.data("treeSelection"), function (value, key) {
					return value.substring(value.lastIndexOf(token)+token.length);
				});
			} else {
				return [];
			}
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************
	$.fn.rup_grid_jerarquia("extend", {
		_init : function init (args) {
			if (args.length > 1) {
				$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
			}
			else {
				var settings = $.extend(true, {}, $.fn.rup_grid_jerarquia.defaults, args[0]), self = this, 
					colModel = null, originalFormatter = null, content = null, originaLoadComplete = null, newLoadComplete=null;
				
				//Obtener ID
				settings.id = $(this).attr("id"); 
				
				//Añadir parametro separador
				var postData = $(self).getGridParam("postData");
	        	postData["jerarquia.token"] = settings.token;
				
				//Recorrer el colModel para asociar el formatter a la columna deseada
				colModel = $(self).getGridParam("colModel");
				for (var i=0; i<colModel.length; i++){
					if (colModel[i]["name"] === settings.expandColName){
						//Obtener posible formater de negocio
						originalFormatter = colModel[i].formatter;
						//Concatenar funciones de formateo de datos
						colModel[i].formatter = function(cellvalue, options, rowObject){
							//Contenido de la celda
							content = ((cellvalue!==undefined)?cellvalue:"");
							//Se aplica (si existe) un formatter propio del negocio
							if (originalFormatter!==undefined){
								content = originalFormatter.call(this, cellvalue, options, rowObject);
							}
							return self._formatter(settings, cellvalue, options, rowObject) + content;
						};
						break;
					}
				}
				
				//Asociar la función de jerarquización (manteniendo posible funcion propia)
				originaLoadComplete = $(self).getGridParam("loadComplete");
				newLoadComplete = function jerarquiaComplete(data){
					//Gestionar la tabla cuando hay resultados
					if (!$.isEmptyObject(data.rows)){
						originaLoadComplete.call(this, data);
						self._loadComplete(settings, data);
					}
					//Actualizar pie
					self._refreshFooter.call(self);
				};
				$(self).setGridParam({"loadComplete" : newLoadComplete });
				
				//Eventos que producen reset de los elementos expandidos
				$.each (settings.resetEvents, function (index, object) {
					var callback = $.isFunction(object[0]) ? object.shift() : null,
						ids = "#" + object.join(", #");
					//Asociar el evento
					$(ids).on(index, function (event) {
						if (callback === null || callback.call(this, event) === false){
							$(self).rup_grid_jerarquia("reset");
						}
					});
					//El evento se ejecuta el primero en secuencia
					for (var i=0; i<object.length; i++){
						$._data($("#"+object[i])[0], "events")[index] = $._data($("#"+object[i])[0], "events")[index].reverse();	
					}
				});
				
				//Inicialilzar los elementos expandidos
				$(self).data("jerarquia.tree", []);
				
				//Almacenar los settings
				$(self).data("settings", settings);
				
				//Cargar configuración
				postData = $(self).getGridParam("postData");
	        	
	        	//Gestionar multiselect
	        	if ($(self).getGridParam("multiselect")){
	        		self._multiselect();
	        		
	        		//TOOLBAR
	        		var maintName = self.data("maintName");
	        			toolbar = $("#"+maintName)[0].prop.toolbar.self;
	        		
	        			function getRUPGridSelected(){
	        				var ajaxData = jQuery.extend({},$(self).getGridParam("postData"));
		        			ajaxData["jerarquia.parentId"] = $(self).data("treeSelection").toString();
		        			$.rup_ajax({
								url: self[0].rup_gridProps.url,
								dataType: 'json',
								type: "GET",
								async: false,
								data: ajaxData,
								contentType: 'application/json',		    
								beforeSend: function (xhr) {
									xhr.setRequestHeader("JQGridModel_selected", true);
								},
								success : function (xhr, ajaxOptions) {
									var selectedRows = [],
										allPksArray = [],
										token = self.data("settings").token;
									$.map(xhr, function(pageValue, pageKey) {
										selectedRows.push(parseInt(pageKey));
										var pageArr = [];
										$.map(pageValue, function(id, line) {
											pageArr.push(parseInt(line));
											var lineArr = [];
											lineArr.push(id);
											allPksArray.push(id);
											lineArr["id_"+id] = token + id;
											pageArr["l_"+line] = lineArr;
										});
										selectedRows["p_"+pageKey] = pageArr;
									});
									//Necesario por grid y maint
									$("#"+maintName)[0].prop.selectedRows = selectedRows;
									self[0].rup_gridProps.allPksArray = allPksArray;
									$("#"+maintName)[0].prop.selectedRowsCont = allPksArray.length;
								},
								error : function (xhr, ajaxOptions, thrownError) {
									$.rup_messages("msgError", {
										title: $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.errorTitle"),
										message: $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.errorMessageSelected")
									});
								},
								complete : function (xhr, textStatus){
								}
							});
		        		}
	        			
		        		//EDITAR
	        			if (toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##edit']").length>0){
	        				toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##edit']").click(getRUPGridSelected);
	        				$._data(toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##edit']")[0], "events")["click"].reverse();
		        		}
			        
	        			//BORRAR
	        			if (toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##delete']").length>0){
	        				toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##delete']").click(getRUPGridSelected);
	        				$._data(toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##delete']")[0], "events")["click"].reverse();
	        				//Resetear selección jerarquía al eliminar elementos
			        		toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##delete']").click(function (){
			        			//Aceptar -> Borrar selección
			        			$(".ui-dialog:visible").find("button").click(function(){
			        				$(self).rup_grid_jerarquia("resetMultiselect");
			        			});
			        			//Cerrar -> Vaciar selección para grid/maint
			        			$(".ui-dialog:visible").on('dialogclose', function(event){
			        				var maintName = self.data("maintName");
			        				$("#"+maintName)[0].prop.selectedRows = [];
			        				self[0].rup_gridProps.allPksArray = [];
			        				$("#"+maintName)[0].prop.selectedRowsCont = 0;
			        			 });
			        		});
	        			}
	        		
		        		//NUEVO
		        		if (toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##new']").length>0){
			        		var okCallback = function(){
				        			//Reiniciar los elementos seleccionados
				        			self.data("treeSelection", []);	
				        			//Refrescar seleccionados
				        			self._reloadMultiselect.call(self);
				        		};
			        		toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##new']").click(function (event){
			        			if(self.data("treeSelection").length>0 && $("#"+maintName)[0].prop.selectedRows.length===0){
			        				$.rup_messages("msgConfirm", {
			        					message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.checkSelectedElems"),
			        					title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.changes"),
			        					OKFunction : function () {
			        						okCallback.call(self);
			        						$("#"+maintName).rup_maint("newElement");
			        					}
			        				});
			        				event.stopImmediatePropagation();
			        			}else{
			        				okCallback.call(self);
			        			}
			        		});
			        		//eventos
			        		$._data(toolbar.find("[id$='rup-maint_toolbar-"+maintName+"##new']")[0], "events")["click"].reverse();
		        		}
	        	};
	        	
			}
		},
		_formatter : function formatter (settings, cellvalue, options, rowObject){
			//Formateando tras una recarga propia del grid/maint
			if (rowObject.level === undefined){
				var oldData = this.getRowData(options.rowId);
				rowObject.hasChildren = $.parseJSON(oldData.hasChildren);
				rowObject.filter = $.parseJSON(oldData.filter);
				rowObject.level = oldData.level;	
			}
			
			var retorno = $("<span />").addClass("rup-grid-jerarquia rup-grid-jerarquia_level_"+rowObject.level+" ui-icon");
			if (rowObject.hasChildren){
				//Comprobar si está expandido
				var arrExpandedValues = $("#"+settings.id).data("jerarquia.tree"),
					valorPadre = "" + rowObject[settings.relatedColName]; //concatenar por si es numérico
				if ($.inArray(valorPadre, arrExpandedValues) === -1){
					retorno.addClass(settings.expandedClass).text($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.icons.expanded")); 
				} else {
					retorno.addClass(settings.unExpandedClass).text($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.icons.unexpanded")); 
				}
			} else {
				retorno.addClass(settings.noChildClass).text($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.icons.nochild")); //sin hijos
			}
			
			//Destacar filtrados
			if (rowObject.filter){
				retorno = $(retorno).before(
								$("<span />")
									.addClass("rup-grid-jerarquia rup-grid-jerarquia_filter_"+rowObject.level+" ui-icon")
									.addClass("rup-grid-jerarquia_filter")
									.addClass(settings.filterClass)
									.text($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.icons.filtered"))
						);
				return (retorno[0].outerHTML + retorno[1].outerHTML) || new XMLSerializer().serializeToString(retorno[0]+retorno[1]);
			}
			
			return retorno[0].outerHTML || new XMLSerializer().serializeToString(retorno[0]);
		},
		_loadComplete : function loadComplete (settings, data){
			/**
			 * grid_loadComplete (custom)
			 */
			//Recorrer las columnas que son candidatas (pueden tener hijos)
			$.each($("td[aria-describedby$='hasChildren']:contains('true')"), function (index, element){
		    	//Añadir función a cada elemento desplegable (navegamos al row y obtenemos la columna con el valor del padre)
				$(element).parent().find("span[class^='rup-grid-jerarquia']").click(function(event){

					//Evitar click sobre elementos con filtro 
					if ($(this).hasClass(settings.filterClass)){ return false; }
					
					// Eliminar tooltip para evitar que se quede desplegado
		            // Eliminamos el tooltip del elemento (SPAN)
		            $(this).rup_tooltip("destroy");
		            // Eliminar el tooltip del padre (TD)
		            $(this).parent().rup_tooltip("destroy");

					var self = $("#"+settings.id), //Referencia a la tabla
						colModel = $(self).getGridParam("colModel"), tdPos = 0, parent, parentValues, arrExpandedValues,
						postData = null; //Variable para modificar query petición de datos de la tabla

		        	//Obtener la posición de la columna padre
		        	for (var i=0; i<colModel.length; i++){
		        		if (colModel[i]["name"] === settings.relatedColName){
		        			tdPos = i;
		        			break;
		        		}
		        	}		        		
		        	
		        	//Obtener la columna que contiene el valor de relación 'padre'
	        		parent = $($(element).parent().children()[tdPos]);
	        		//Obtenemos todos sus descencientes, que no sean span con la clase de jerarquía y obtenemos el texto del primer valor  
	        		parentValue = $.trim(parent.contents(":not(span[class^='rup-grid-jerarquia'])").first().text()), //Literal del padre
	        		arrExpandedValues = $(self).data("jerarquia.tree"); //Array de elementos expandidos
		        	
		        	//Añadir o eliminar elemento para query (y almacenarlo en la tabla)
		        	if ($.inArray(parentValue, arrExpandedValues) === -1){
		        		arrExpandedValues.push(parentValue);
		        	} else {
		        		arrExpandedValues.splice($.inArray(parentValue, arrExpandedValues), 1);
		        	}
		        	$(self).data("jerarquia.tree", arrExpandedValues);

		        	//Añadir parámetro y lanzar recarga
		        	postData = $(self).getGridParam("postData");
		        	postData["jerarquia.tree"] = arrExpandedValues.toString();
		        	
		        	//Recargar tabla
		        	$(self).trigger("reloadGrid");
		        	
		        	//Evitar seleccionar fila
		        	return false;
		        });
			});
			
			//Modificar tooltip
			if (settings.parentNodesTooltip){
				var self = this;
				$.each(this.find("span[class^='rup-grid-jerarquia']"), function (index, element){
					var gridID = $(self).attr("id"),
						title = $(element).parentsUntil("tr").siblings("[aria-describedby='"+gridID+"_parentNodes']").html(),
						$td = $(element).parent();
					//Eliminar tooltip
					$td.rup_tooltip("destroy");
					//Cambiar valor para tooltip
					$td.attr("title", self._parseParentNodes(title));
					//Crear tooltip
					$td.rup_tooltip({show:{delay:settings.tooltipDelay}});
				});
			}
			
			//Controlar check general
			if (self.getGridParam("multiselect")){
				if ($(this).getGridParam('selarrrow').length === $(this).getGridParam('rowNum')){
					$("#cb_"+$(this).attr("id")).attr("checked", "checked");
				}
			}
		},
		_parseParentNodes : function parseParentNodes (parentNodes){
			var parentNodesTooltipFnc = this.data("settings")["parentNodesTooltipFnc"];
				nodes = parentNodes.split(this.data("settings").token).slice(1);//filtrar primer elemento
				
			if (parentNodesTooltipFnc===null){
				//Función por defecto
				var str = "", tab = "&nbsp;&nbsp;";
				for (var i=0; i<nodes.length; i++){ 
					if (i!== (nodes.length-1)){
						str += nodes[i] + "<br/>" + tab + "└&nbsp;";
						tab += "&nbsp;&nbsp;&nbsp;"; 
					}else {
						str += "<b>" + nodes[i] + "</b>";
					}
				}
				return str;
			} else {
				return parentNodesTooltipFnc.call(this, nodes);
			}
		},
		_multiselect : function multiselect(){
			var self = this,
				gridID = $(self).attr("id");
			
			//Inicializar selección
			$(self).data("treeSelection", []);
			
			//Limitar selección fila
			if (self.data("settings").multiboxonly){
				//Selección solo sobre el checkbox 
				$(self).data("defaultEventFunctions").beforeSelectRow_default = function(rowid, e){
					return (e.target.type=='checkbox') ? true : false;
				};
				//Si se hace click sobre elemento que no sea check no procesar evento
				$(self).data("defaultEventFunctions").onCellSelect_default = function (rowid , iCol, cellcontent, event){
					if ($(event.target).attr("id") !== "jqg_"+gridID+"_"+rowid){
						return false;
					}
				};
			}
			
			//Selección de fila
			$(self).data("defaultEventFunctions").onSelectRow_default = function(rowid, status){
				self._selectRow.call(self, rowid, status);
			};
			
			//Selección de todas las filas
			$(self).data("defaultEventFunctions").onSelectAll_default = function(rowid, status){
				self._selectAll.call(self, rowid, status);
			};
			
			//Evitar alerta de elementos seleccionados (si se han editado y cargado datos para grid/maint)
			$("#"+self.data("maintName"))[0].prop.detailDiv.on('dialogclose', function(event) {
				var maintName = self.data("maintName");
				//Vaciar selección para grid/maint
				$("#"+maintName)[0].prop.selectedRows = [];
				self[0].rup_gridProps.allPksArray = [];
				$("#"+maintName)[0].prop.selectedRowsCont = 0;
			 });
				
			//Reselección de elementos tras recargar el grid
			$(self).on("jqGridLoadComplete", function(){
				
				//Cargar selección
				self._reloadMultiselect.call(self);

				//Eliminar tooltip check general
				$("#"+gridID+"_cb").rup_tooltip("destroy");
				$("#"+gridID+"_cb").removeAttr("title");
				
				
			/** CHECK_MENU **/
				var $checkMenu = $(),
					multiMenu = self.data("settings").multiMenu,
					//Función que se ejecuta al pulsar sobre un elemento del menú
					checkMenuOptClick = function (event){
											self.data("checkMenuValue", $(this).data("checkMenuValue"));
											if ($checkMenu.data("rowId") !== undefined){
												$("#"+gridID).setSelection($checkMenu.data("rowId"), true);
											} else {
												self._selectRow();
											}
											self.removeData("checkMenuValue");
											$checkMenu.hide();
										};
				
				//Desplegable junto a checkbox
				$.each ($.merge($("#"+gridID+"_cb"), $(self).find("[aria-describedby='"+gridID+"_cb']")), function (index, object) {
					$(object).find("input")
						//Posición texto
						.css("margin-right", "1em")
						//Flecha de despliegue
						.after( 
							$("<a />")
								.attr("href", "javascript:void(0)")
								.addClass("ui-icon rup-grid-jerarquia_checkmenu_arrow")
								.click(function(){
									//Si no hay registros (menú check general) o si se está mostrando, ocultar el menú
									if ((self.getGridParam("records") === 0) || $checkMenu.is(":visible")){  $checkMenu.hide(); return false; }
									
									//Eliminar menú	
									$("#"+gridID+"_checkmenu").remove();
									
									//Añadir menú
									var $td = $(this).parent(),
										position = $td.offset();
									$checkMenu = $("<ul />")
											.attr("id", gridID+"_checkmenu")
											.addClass("rup-grid-jerarquia_checkmenu")
											//Eventos mostrar/ocultar
											.on({
												"mouseenter" : function(){ $(this).show(); },
												"mouseleave" : function(){ $(this).hide();	},
												"keydown" : function(event){
													 switch(event.keyCode){
													 	case 27 : 	//ESC
													 				$(this).hide(); 
													 				break;
													 	case 13 :	//ENTER		
													 				$(this).find(".ui-state-focus").click();
													 				break;
													 }
												 }
											})
											 //Posicionar
											.css({
												top : position.top + $td.height(),
												left : position.left
											});
									
									//Añadir al DOM
									if (!$.rup_utils.aplicatioInPortal()){ 
										$checkMenu.appendTo("body");
									} else {
										$checkMenu.appendTo(".r01gContainer");
									}
									
									//Gestión menú	
									var rowId = $(this).parents("tr").attr("id"),
										rowData = $(self).getRowData(rowId),
										treeSelection = $(self).data("treeSelection"),
										treeSelectionLength = treeSelection.length,
										addOptMenu = function(text, icon, checkMenuValue){
											$checkMenu.append($("<a />")
																.text(text)
																.data("checkMenuValue", checkMenuValue)
																.click(function(){
																	checkMenuOptClick.call(this);
																})
																.append($("<span />").addClass("ui-icon "+icon))
																.wrap($("<li />")).parent());
										};
									
									//Check registros
									if($td.attr("id")===undefined){
										//¿Tiene hijos?
										if (rowData.hasChildren === "true"){
											if (multiMenu.hijos){
												addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_1"), "child_icon", 1);
											}
											if (multiMenu.descendientes){
												addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_2"), "hierarchy-down_icon", 2);
											}
										} 
										
										//¿Tiene hijos seleccionados?
										var hasChildren = false,
											token = self.data("settings").token;
										for (var i=0; i<treeSelectionLength; i++){
											var treeValue = treeSelection[i];
											if (treeValue.indexOf(rowData.treeNodes)===0){
												treeValue = treeValue.substr(rowData.treeNodes.length);
												if (treeValue.split(token).length >= 2){
													hasChildren = true;
													break;
												}
											}													
										}
										if(hasChildren && multiMenu.hijos){
											addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_3"), "child_icon", 3);
										}
										if(hasChildren && multiMenu.descendientes){
											addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_4"), "hierarchy-down_icon", 4);
										}
									//Check general
									} else {
										var totalRecords = $(self).getGridParam("records"),
											selectedRecords = $(self).data("treeSelection").length;
										if (totalRecords !== selectedRecords){
											addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_5"), "check_icon", 5);
										} else {
											addOptMenu($.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.menu.opt_6"), "uncheck_icon", 6);
										}
									}

									//Refresh
									$checkMenu.data("rowId", rowId);
									$checkMenu.rup_menu({display: 'vertical'});
									$checkMenu.find("a:first").focus();
								}
							)
					);
					
					//Controlar opciones de menú para deshabilitar (o borrar) flecha despliegue
					if (this.nodeName === "TD"){
						//Flecha de cada fila 
						var hasChildren = $(self).getRowData($(this).parent().attr("id")).hasChildren;
						if (
							 //Solo hijos
							((multiMenu.hijos && hasChildren==="false") && !multiMenu.descendientes) ||
							//Solos descendientes
							(!multiMenu.hijos && (multiMenu.descendientes && hasChildren==="false")) ||
							//Hijos y descendientes
							((multiMenu.hijos && hasChildren==="false")  && (multiMenu.descendientes && hasChildren==="false")) ){
								if(self.data("settings").multiMenuDisabled) {
									$(this).find("a").addClass("ui-state-disabled").off("click");
								} else {
									$(this).find("a").remove();
								}
						}
					} else {
						//Flecha de check general
						if (self.getGridParam("records") === 0){
							if(self.data("settings").multiMenuDisabled) {
								$(this).find("a").addClass("ui-state-disabled");
							} else {
								$(this).find("a").remove();
							}
						}
					}
					
					//Ocultar el menu al salir del TD (multiselección)
					$(object).on("mouseleave", function(){
						if ($checkMenu.is(":visible")){
							$checkMenu.hide();
						}
					});
				});
			});
			
			//Reset de multiselección
			$.each ($(self).data("settings").resetMultiEvents, function (index, object) {
				var callback = $.isFunction(object[0]) ? object.shift() : null,
					ids = "#" + object.join(", #");
				//Asociar el evento
				$(ids).on(index, function (event) {
					if (callback === null || callback.call(this, event) === false){
						$(self).rup_grid_jerarquia("resetMultiselect");
					}
				});
				//El evento se ejecuta el primero en secuencia
				for (var i=0; i<object.length; i++){
					$._data($("#"+object[i])[0], "events")[index] = $._data($("#"+object[i])[0], "events")[index].reverse();	
				}
			});
			/*************/
		},
		/******************************/
		/** f(x) para multiselección **/
		/******************************/
		//Gestión del click sobre una fila
		_selectRow : function (rowid, status){
			var self = this,
				gridID = $(self).attr("id"),
				treeSelection = $(self).data("treeSelection"),
				rowNodes = $(self).getRowData(rowid).treeNodes;
				ajaxData = jQuery.extend({},$(self).getGridParam("postData")),
				checkMenuValue = self.data("checkMenuValue"),
				token = self.data("settings").token;
				
			switch (checkMenuValue){
				//Normal
				default: 
						//Controlar check general
						if (self.getGridParam('selarrrow').length === self.getGridParam('rowNum')){
							$("#cb_"+gridID).attr("checked", "checked");
						}
						$("#"+gridID+"_checkmenu").hide(); //Ocultar menu
						if (status){
							if ($.inArray(rowNodes, treeSelection)===-1){ //Evitar duplicidades
								treeSelection.push(rowNodes);
							}
						} else {
							treeSelection.splice($.inArray(rowNodes, treeSelection), 1);
						}
						//Actualizar pie
						self._refreshFooter.call(self);
						break;
						
				//Menú
				case 5:
				case 6:
					rowNodes = token; //Seleccionar todos 
				case 1: 
				case 2: 
				case 3:
				case 4:
					//Desmarcar el objeto sobre el que se lanza
					self._checkNode.call(self, rowNodes, false);
					//Parametros AJAX
					ajaxData.page = ajaxData.rows = null; //Evitar paginación
					ajaxData["jerarquia.tree"] = null; //Evitar elementos contraidos/expandidos
					ajaxData["jerarquia.parentId"] = rowNodes.substring(rowNodes.lastIndexOf(token)+token.length); //Nodo del que obtener hijos
					$.rup_ajax({
						url: self[0].rup_gridProps.url,
						dataType: 'json',
						type: "GET",
						async: false,
						data: ajaxData,
						contentType: 'application/json',		    
						beforeSend: function (xhr) {
							xhr.setRequestHeader("RUP", $.toJSON({"treeNodes":"treeNodes"})); //Serializar solo atributo nodos arbol
							xhr.setRequestHeader("JQGridModel", true);
							//Bloquear tabla
							$("#lui_"+gridID).show();
							$("#load_"+gridID).show();
						},
						success : function (xhr, ajaxOptions) {
							xhr = xhr.rows; //Solo usar datos de registros 
							var nodes =	[], 
								nodesLength=0,
								token = self.data("settings").token;
							switch (checkMenuValue){
								case 1: 
								case 3:
									nodes =	$.map(xhr, function(value, key){ 
												var nodeVal = value["treeNodes"];
												if (nodeVal.split(token).length<3){
													return rowNodes + nodeVal;
												}
											});
									break;
								case 5:
								case 6:
									rowNodes = ""; //Eliminar '/' para procesar respuesta
								case 2:
								case 4:
									nodes =	$.map(xhr, function(value, key){
												var nodeVal = value["treeNodes"];
												return rowNodes + nodeVal;
											});
									break;
							};
							
							nodesLength = nodes.length;
							//Procesar array
							if (checkMenuValue === 1 || checkMenuValue === 2 || checkMenuValue === 5){
								for (var i=0; i<nodesLength; i++){
									if ($.inArray(nodes[i], treeSelection)===-1){ //Evitar duplicidades
										treeSelection.push(nodes[i]);
									}
								}	
							} else {
								for (var i=0; i<nodesLength; i++){
									treeSelection.splice($.inArray(nodes[i], treeSelection), 1);
								}
							}
								
							$(self).data("treeSelection", treeSelection);
							
							//Gestionar check general
							if (checkMenuValue === 5 || checkMenuValue === 6){
								if (checkMenuValue === 5){
									$("#cb_"+gridID).attr("checked", "checked");
									feedbackTxt = $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.feedbackTableSelect");
								}
								if (checkMenuValue === 6){
									$("#cb_"+gridID).removeAttr("checked");
									feedbackTxt = $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.feedbackTableDeselect");
								}
								$("#rup_feedback_" + gridID).rup_feedback("option", { closeLink: true });
								$("#rup_feedback_" + gridID).rup_feedback("set", feedbackTxt);
							}
						},
						error : function (xhr, ajaxOptions, thrownError) {
							$.rup_messages("msgError", {
								title: $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.errorTitle"),
								message: $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.errorMessageMulti")
							});
						},
						complete : function (xhr, textStatus){
							//Recargar seleccionados
							self._reloadMultiselect.call(self);
							//Desbloquear tabla
							$("#lui_"+gridID).hide();
							$("#load_"+gridID).hide();
							//Invocar callback (si existe)
							if (self.data("settings").multiMenuCallback!==undefined){
								self.data("settings").multiMenuCallback.call(this);
							}
						}
					});
					break;
			};	
		},
		//Gestión del click sobre una check general
		_selectAll : function (rowid, status){
			var self = this,
				gridID = $(self).attr("id"),
				rowid_length = rowid.length,
				treeSelection = $(self).data("treeSelection"),
				feedbackTxt = "";

			if (status){
				feedbackTxt = $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.feedbackVisualSelect");
			} else {
				feedbackTxt = $.rup.i18nParse($.rup.i18n.base,"rup_grid_jerarquia.feedbackVisualDeselect");
			}
			$("#rup_feedback_" + gridID).rup_feedback("option", { closeLink: true });
			$("#rup_feedback_" + gridID).rup_feedback("set", feedbackTxt);

			for (var i=0; i<rowid_length; i++){
				if (rowid[i].indexOf("ghead")!==-1){ continue; } //Omitir titulos agrupaciones
				var treeNodes = $(self).getRowData(rowid[i]).treeNodes;
				if (status){
					if ($.inArray(treeNodes, treeSelection)===-1){ //Evitar duplicidades
						treeSelection.push(treeNodes);
					}
				} else {
					treeSelection.splice($.inArray(treeNodes, treeSelection), 1);
				}
			}
			
			//Actualizar pie
			self._refreshFooter.call(self);
		},
		//Procesar nodo
		_checkNode : function (nodeValue, status){
			var self = this,
				gridID = $(self).attr("id"),
				selarrrow = self.getGridParam('selarrrow'),
				treeSelection = $(self).data("treeSelection"),
				//Obtener el nodo (td)
				object = self.find("td[aria-describedby='"+gridID+"_treeNodes']").filter(function(){ return $(this).html()===nodeValue;}),
				actual_rowid = $(object).parent().attr("id");
			if (status){
				//Checkear
				$(object).parent().addClass("ui-state-highlight").attr("aria-selected","true");
				$(object).parent().find("[aria-describedby='"+gridID+"_cb'] input").attr("checked", "checked");
				//Variable de gestión interna del jqGrid
				if ($.inArray(actual_rowid,selarrrow)==-1){
					selarrrow.push(actual_rowid);
				}
			} else {
				//Descheckear
				$(object).parent().removeClass("ui-state-highlight").attr("aria-selected","false");
				$(object).parent().find("[aria-describedby='"+gridID+"_cb'] input").removeAttr("checked");
				//Variable de gestión interna del jqGrid
				if ($.inArray(actual_rowid,selarrrow)!==-1){
					selarrrow.splice($.inArray(actual_rowid, selarrrow), 1);
				}
			}
		},
		//Refrescar elementos seleccionados
		_reloadMultiselect : function (){
			var self = this,
				gridID = $(self).attr("id"),
				treeSelection = $(self).data("treeSelection");
			
			$.each (self.find("td[aria-describedby='"+gridID+"_treeNodes']"), function (index, object){
				if ($.inArray($(object).html(), treeSelection)!==-1){
					self._checkNode.call(self, $(object).html(), true);
				} else {
					self._checkNode.call(self, $(object).html(), false);	
				}
			});
			
			//Controlar check general
			if ($(this).getGridParam("multiselect")){
				if ($(this).getGridParam('selarrrow').length === $(this).getGridParam('rowNum')){
					$("#cb_"+$(this).attr("id")).attr("checked", "checked");
				}
			}
			
			//Actualizar pie
			self._refreshFooter.call(self);
		},
		_refreshFooter : function (){
			var self = this,
				gridID = $(self).attr("id"),
				treeSelection = $(self).data("treeSelection");
			
			//Gestionar toolbar
			if (self.getGridParam("multiselect")){

				//Número elementos seleccionados
				$('#' + self[0].rup_gridProps.pagerName + '_left').html(treeSelection.length + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
				
				var toolbar = $("#"+self.data("maintName"))[0].prop.toolbar.self,
					//Filtrar selección (toolbar)
					tree = $(self).data("jerarquia.tree"),
					parsedTreeSelection = [];
				
				//Recorrer selección para determinar si están ocultos (contraidos) y filtrarlos
				parsedTreeSelection = $.grep(treeSelection, function(elementOfArray, indexInArray){
					var existe = false;
						selectionNodes = elementOfArray.split(self.data("settings").token),
						selectionNodes_length = selectionNodes.length;
					//Recorrer nodos que componen el elemento seleccionado
					$.each(selectionNodes, function(index, value) {
						//Si el nodo correspondiente está contraído y no es el último (el mismo) se considera candidato para filtrarlo
						if (($.inArray(value, tree) !== -1) && (index+1 !== selectionNodes_length)){
							existe = true;
							return false;
						}
					});
					return existe;
				}, true);

				if(parsedTreeSelection.length>0){
					toolbar.enableButton("edit");
					toolbar.enableButton("delete");
				} else {
					toolbar.disableButton("edit");
					toolbar.disableButton("delete");
				}
			}
		}
		/******************************/
	});
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACIÓN POR DEFECTO DEL PATRÓN  
	//*******************************************************
	
	$.fn.rup_grid_jerarquia.defaults = {
		token : "/",								//Separador por defecto de las columnas ocultas
		resetEvents: {},								//Mapa con de evento:idObjeto en los que ejecutar el reset de elementos expandidos
		resetMultiEvents: {},							//Mapa con de evento:idObjeto en los que ejecutar el reset de multiseleccion
		parentNodesTooltip : true,						//Determina que se cree tooltip con los diferentes nodos					
		parentNodesTooltipFnc : null,					//Funcion para el formateo de los nodos
		tooltipDelay : 500,								//Retraso (en mmilisegundos) en aparecer el tooltip en el campo de jerarquia de la tabla
		multiMenu : {									//Opciones del menú (en selección múltiple)
			hijos : true,
			descendientes : true
		},
		multiMenuDisabled : true,						//Deshabilitar el menú en selección múltiple (en caso contrario eliminarlo)
		multiboxonly : false,							//Solo permite selección sobre checkbox o su contenedor (TD)
		
		/* Style (default)*/
		expandedClass : "ui-icon-triangle-1-se",		//Class identificadora de los elementos expandidos
		unExpandedClass : "ui-icon-triangle-1-e",		//Class identificadora de los elementos contraidos
		noChildClass : "ui-icon-none",					//Class identificadora de los elementos sin hijos
		filterClass : "ui-icon-star"					//Class identificadora de los elementos que cumplen el filtro
	};
	
})(jQuery);