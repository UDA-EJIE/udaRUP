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
	
	/*
	 * Formater utilizado para formatear correctamente los datos de una columna del grid que utilice un componente RUP combo para la edicion de datos.
	 */
	$.fn.fmatter.rup_combo = function (cellval, opts, rwd, act) {
		var source = opts.colModel.editoptions.source,
			i18n = "", entidad = opts.colModel.name, entidadAux, data, CollectionRupCombo, rowId = opts.rowId, parentColName, parentColValue, primero=true, multiValueToken, parentValuesChain, objCombo;
		if (typeof source === "string"){
			
			if (opts.colModel.jsonmap){
				entidad = opts.colModel.jsonmap;
			}else{
				entidad = opts.colModel.name;
			}
			
			if(entidad.indexOf('.')!==-1){
				entidadAux=entidad.substring(0,entidad.lastIndexOf('.'));
			}else{
				entidadAux="";
			}
			
			// Se trata de obtener el valor accediendo por notacion array rwd['entidad.propiedad']
			var valRwd=$.rup_utils.unnestjson(rwd)[(entidadAux!==""? entidadAux+ '.':'') + opts.colModel.editoptions.sourceParam.label];
			
			if (valRwd===undefined){
				valRwd = $("#"+opts.gid).data("Collection_rup_combo")[parseInt(opts.rowId)][opts.colModel.name]["label"];
			}
			if (valRwd!==undefined){
				data = valRwd;
			}
			
		}else{
			if(opts.colModel.editoptions.parent !==undefined){
				// El combo tiene padre(s)
				objCombo = $("#detailForm_"+opts.gid.split("GRID_")[1]+"_"+opts.colModel.name);
				if (objCombo.length!==0){
				
					primero=true;
					multiValueToken = objCombo.data("settings").multiValueToken;
					parentValuesChain="";
					
					$.each(opts.colModel.editoptions.parent, function(index, element){
						
						parentColName = opts.colModel.editoptions.parent[index].split("detailForm_"+opts.gid.split("GRID_")[1]+"_")[1];
						parentColValue = $("#"+opts.gid).data("Collection_rup_combo")[rowId][parentColName]["value"];
						
						if (primero){
							parentValuesChain +=parentColValue;
							primero=false;
						}else{
							parentValuesChain +=multiValueToken+parentColValue;
						}
					});
					
					source = source[parentValuesChain];
				}
			}
			
			$.each(source, function (index, element){
				if (element.value === cellval){
					if(opts.colModel.editoptions.i18nId === undefined){
						i18n = $.rup.i18nParse($.rup.i18n.app[opts.gid+"##"+entidad],element.i18nCaption);
					} else {
						i18n = $.rup.i18nParse($.rup.i18n.app[opts.colModel.editoptions.i18nId],element.i18nCaption);
					}
					return false;
				}
			});
			data = i18n;
		}
		
		// Se guarda la relación clave-value por columna y fila   
		CollectionRupCombo = $("#"+opts.gid).data("Collection_rup_combo");
		if (CollectionRupCombo === undefined){
			CollectionRupCombo = {};
			$("#"+opts.gid).data("Collection_rup_combo", CollectionRupCombo);
		}
		
		$.extend(true, CollectionRupCombo, CollectionRupCombo, $.parseJSON('{"'+rowId+'":{"'+opts.colModel.name+'":{"value": "'+cellval+'" ,"label":"'+ data+'"}}}'));
		return data;
	};
	
	/*
	 * Formater utilizado para formatear correctamente los datos de una columna del grid que utilice un componente RUP date o time.
	 */
	$.fn.fmatter.rup_time = function (cellval, opts, rwd, act) {
		if (!cellval){
			return "";
		}
		var op = opts.colModel.formatoptions, dateFormatterOps = $.rup.i18nParse($.rup.i18n.base,"rup_grid.formatter.date");
		return $.fmatter.util.DateFormat(op.newformat,cellval,op.newformat,dateFormatterOps);
		
	};
	
	$.maint = $.maint || {};
	$.extend($.maint, {
		extend : function (methods) {
			$.fn.extend(methods);
		},
		getPrimaryKeys : function (oldRows) {
			var aPKS = [], i = 0, j = 0;
			for (i = 0 ; i < oldRows.length; i++) {//me recorro las paginas
				for (j = 0; j < oldRows[oldRows[i]].length; j++) {//me recorro las paginas que hay en la pagina
					aPKS.push(oldRows[oldRows[i]][oldRows[oldRows[i]][j]]);
				}
			}
			return aPKS;
		}
	});
	
	$.extend($.rup, {
		maint : {
			detailButtons : {
				ALL : "all", 
				SAVE : "onlySave", 
				SAVE_REPEAT : "save_repeat"
			}
		}
	});
	
	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	var rup_maint = {};
	//Se configura el arranque de UDA para que alberge el nuevo patrón 
	$.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor("rup_maint", rup_maint));
	//Métodos públicos a invocar por los desarrolladores
	$.fn.rup_maint("extend", {
		getSerializedForm: function (form){
			return $.param($.merge(form.serializeArray(),
					$.map($("input[type='file']",form),function(a,b){
						 return {name:$(a).attr("name"),value:$(a).attr("value")};
						})));
			
		},
		newElement : function () {//Muestra el formulario de adición y pone el mantenimiento en modo alta.
			// console.log("maint - newElement");
			return this.each(function () {
				//tratamiento de mantenimientos editables.
				if (this.prop.jQueryGrid.rup_grid("isEditable")) {
					$(this).rup_maint("newElementEditable");//True para que no cambie el modo nochangemode
				} else {//resto de mantenimientos
					if (this.prop.isLazyCreationDone===false){
						$(this).rup_maint("defineDetailForm");
						$(this).rup_maint("defineValidationConfig");
						if ($.isFunction(this.prop.onAfterLazyDetailLoad)){
							this.prop.onAfterLazyDetailLoad.call();
						}
						
						this.prop.isLazyCreationDone = true;
					}
					this.prop.MODO = "new";
					$(this).rup_maint("resetForm", this.prop.detailForm);
					this.prop.detailForm.data('initialData', $(this).rup_maint("getSerializedForm", this.prop.detailForm));
					//quitamos todos los iconos de las validaciones
					$("#" + this.prop.detailDiv[0].id + " .rup-maint_validateIcon").remove();
					this.prop.detailFeedback.rup_feedback("close");
					if ($.isFunction(this.prop.onbeforeDetailShow)) {
						this.prop.onbeforeDetailShow.call(this, this.prop.detailDiv);
					}
					$(this).rup_maint("updateDetailPagination" ,1, 1);
					this.prop.detailDiv.rup_dialog("open");
					//establecemos el foco al primer elemento
//					$("input:first",this.prop.detailForm).focus();
//					$("input:not([readonly]):not(:disabled):visible:first", this.prop.detailForm).focus();
					$("input:not([readonly]):not(:disabled):visible,.ui-selectmenu:not(.ui-state-disabled):visible", this.prop.detailForm).first().focus();

				}
			});
		},
		resetForm: function(form){
			// Se eliminan los estilos de errores de validacion
			if (form.data("validator") != undefined){
				var errorClass = form.data("validator").settings.errorClass;
				$("."+errorClass,form).removeClass(errorClass);
			}
			$("input[type!='button'][type!='checkbox'][type!='radio'], textarea", form).val(""); 
			$("input[type='checkbox']").not("[name*='jqg_GRID_']").not("[disabled='disabled']", form).removeAttr("checked");
			// Se realiza el reset de los rup_combo
			$.each($("select.rup_combo",form), function(index,elem){
				$(elem).rup_combo("clear");
			});
			//Vaciar los autocompletes
			$("[ruptype='autocomplete']", form).each(function (index, element) {
				$(element).val("");
			});
			
			// Se realiza el reset del fomulario
			if(this[0].prop.clearSearchFormMode==="reset"){
				form.resetForm();
			}else{
				$("input[type='radio']").removeAttr("checked");
			}
		},
		updateDetailPagination : function (rowPos, totalElements) {
			// console.log("maint - updateDetailPagination");
			return this.each(function () {
				$("#rup_maint_selectedElements_"+this.prop.name).text($.jgrid.format($.rup.i18nParse($.rup.i18n.base,"rup_grid.defaults.detailForm_pager"),rowPos,totalElements));
				if (rowPos === totalElements) {//si es 3 de 3 deshabilitar el forward y el last
					$("#last_" + this.prop.name + ", #forward_" + this.prop.name, this.prop.detailDiv).addClass('ui-state-disabled');
					if (rowPos === 1) { //si es el primer registro deshabilito el poder ir al primero y atras
						$("#first_" + this.prop.name + ", #back_" + this.prop.name, this.prop.detailDiv).addClass('ui-state-disabled');
					} else {//sino es el ultimo con lo que habilito el ir atras y al primero
						$("#first_" + this.prop.name + ", #back_" + this.prop.name, this.prop.detailDiv).removeClass('ui-state-disabled');
					}
				} else if (rowPos === 1 && totalElements > 1) { //si el registro es diferente al total y es el primero se habilitan siguiente y ultimo y se deshabilitan primero y anterior
					$("#first_" + this.prop.name + ", #back_" + this.prop.name, this.prop.detailDiv).addClass('ui-state-disabled');
					$("#last_" + this.prop.name + ", #forward_" + this.prop.name, this.prop.detailDiv).removeClass('ui-state-disabled');
				} else {
					$("#last_" + this.prop.name + ", #forward_" + this.prop.name, this.prop.detailDiv).removeClass('ui-state-disabled');
					$("#first_" + this.prop.name + ", #back_" + this.prop.name, this.prop.detailDiv).removeClass('ui-state-disabled');
				}
			});
		},
		
		loadDetailFromServer : function (id, detailForm) {
			// console.log("maint - loadDetailFromServer");
			var self = this; 
			return this.each(function () {
				var mnt = this, t = this.prop.jQueryGrid.rup_grid("getDataIDs"),
					detailURL,
					parentColPks, 
					parent, 
					parentSelectedRow, 
					page = this.prop.jQueryGrid.rup_grid("getGridParam", "page");
				
				detailURL = self._getDetailUrl(id);//selectedRows[0]];
				
				$.rup_ajax({
					url: detailURL,
					dataType: 'json',
					type: "GET",
					async: false,
					contentType: 'application/json',		    
					success: function (xhr, ajaxOptions) {
						var detailIndex, page = mnt.prop.jQueryGrid.rup_grid("getGridParam", "page"), totalRows, rowsXpage, totalElements, xhrArray, objSerializedForm;
						// Se obtiene el index del elemento actual y el total de elementos
						detailIndex = self._getCurrentDetailIndex(id);
						// Se actualiza el contador de registros
						self.rup_maint("updateDetailPagination", detailIndex.current, detailIndex.total);
						
						if (xhr.id && xhr.id instanceof Object){//estamos en JPA
							if (xhr.id instanceof Object) {//es que estamos en jpa y traemos una clave compuesta
								xhr["JPA_ID"] = xhr.id;
								delete xhr.id;
							}
						}
						xhrArray = $.rup_utils.jsontoarray(xhr);
						
						$.rup_utils.populateForm(xhrArray, mnt.prop.detailForm);
						
						if ($.isFunction(mnt.prop.onbeforeDetailShow)) {
							mnt.prop.onbeforeDetailShow.call(mnt, mnt.prop.detailDiv, xhr, ajaxOptions);
						}
						objSerializedForm = $.map(self._getDataForFormModifications(mnt.prop.detailForm), function(elem,i){
							if(xhrArray[elem.name]){
							    return {name:elem.name,value:(xhrArray[elem.name]!==null?xhrArray[elem.name]:"")};
							}else{
								return {name:elem.name,value:(elem.value!==null?elem.value:"")};
							}
						});
						
						//Gestor de cambios
						mnt.prop.detailForm.data('initialData', $.param(objSerializedForm));

						if (!mnt.prop.detailDiv.rup_dialog("isOpen")) {
							mnt.prop.detailDiv.rup_dialog("open");
						}
						
						if ($.isFunction(mnt.prop.onafterDetailShow)) {
							mnt.prop.onafterDetailShow.call(mnt, mnt.prop.detailDiv, xhr, ajaxOptions);
						}

						//establecemos el foco al primer elemento
//						$("input:not(readonly):visible:first", mnt.prop.detailForm).focus();
//						$("input:not([readonly]):not(:disabled):visible:first", mnt.prop.detailForm).focus();
						$("input:not([readonly]):not(:disabled):visible,.ui-selectmenu:not(.ui-state-disabled):visible", mnt.prop.detailForm).first().focus();
						return false;
					},
					error: function (xhr, ajaxOptions, thrownError) {
						mnt.prop.feedback.rup_feedback("option", "delay", null);
						mnt.prop.feedback.rup_feedback("set", xhr.responseText, "error");
						mnt.prop.feedback.rup_feedback("option", "delay", 1000);
					}
				});
			});
		},
		onBeforeEdit : function (rowN) {//evento donde crear los objetos de RUP
			// console.log("maint - onBeforeEdit");
			var self = this, ret, rowColModel, mntName = $.data(this, "maintName"), relatedGrid = $(this), firstInput;
			$("#" + mntName)[0].prop.toolbar.self.enableButton("cancel");
			$("#" + mntName)[0].prop.toolbar.self.disableButton("new");
			$("#" + mntName)[0].prop.toolbar.self.disableButton("filter");
			
			if ($.isFunction($("#" + mntName)[0].prop.onbeforeDetailShow)) {
				ret = $("#" + mntName)[0].prop.onbeforeDetailShow.call(this, rowN);
			}
			if (ret) {	
				return false;
			}
			firstInput = $("[id='" + rowN+"']", relatedGrid);//aqui tengo el tr
			rowColModel = relatedGrid.rup_grid("getColModel");
			for (var i = 0;i < rowColModel.length; i++) {
				if (rowColModel[i].editable) {
					
					var rupType = rowColModel[i].rupType, elc = $("[id='" + rowN + "_" + rowColModel[i].name + "']"), editoptions=rowColModel[i].editoptions;
					
					if(relatedGrid.rup_grid("isEditable")){
						elc.parent().removeClass("ui-ellipsis");
					}
					
					if (rupType){
						if (rupType === "datepicker") {
							elc.rup_date(rowColModel[i].editoptions);
							// En caso de tratarse de un mantenimiento de edición en línea se elimina el icono asociado para mostrar el calendario.
							if(relatedGrid.rup_grid("isEditable")){
								elc.parent().find("img.ui-datepicker-trigger").remove();
							}
						}else if (rupType === "numeric"){
							elc.numeric(",");
						}else if (rupType=== "integer"){
							elc.numeric(false);
						}else{
							if(editoptions && editoptions.i18nId === undefined){
								rowColModel[i].i18nId = relatedGrid.attr("id") + "##" + rowColModel[i].name;
							}
							
							$.rup["rup_combo_"+elc.attr("id")]={"index":i,"rowN":rowN,"rupType":rowColModel[i].rupType,"name":rowColModel[i].name};
							
							//Ajuste de estilos width del combo en el mantenimiento
							if (rupType === "combo"){
								editoptions = $.extend(editoptions, {width:"auto",menuWidth:elc.width()});
								
								editoptions.onLoadSuccess = function(combo){
									if (typeof combo === 'object'){
										var data = $.rup["rup_combo_"+combo.attr("id")];
										
										if (relatedGrid.data("Collection_rup_combo") !== undefined){
											combo["rup_"+data.rupType]("setRupValue",relatedGrid.data("Collection_rup_combo")[data.rowN][data.name]["value"]);
										}
										combo.attr("rup_combo_col_position",data.index);
										$("#gview_"+relatedGrid.attr("id")).append($('#'+ relatedGrid.attr("id") + " ul.rup_combo").attr("rup_combo_col_position",data.index));
										$('#'+ relatedGrid.attr("id") + " a.rup_combo[id='"+combo.attr("id")+"-button']").attr("rup_combo_col_position",data.index);
										
										delete $.rup["rup_combo_"+combo.attr("id")];
									}
								};
							}
							
							elc["rup_"+rowColModel[i].rupType](editoptions);
							
							//Ajuste de aparicion del combo en la ultima fila de la tabla y de contro de icono de la fecha

							if (rupType === "date"){
								//Se carga el valor de la fecha
								elc["rup_"+rowColModel[i].rupType]("setRupValue",elc.val());
								// En caso de tratarse de un mantenimiento de edición en línea se elimina el icono asociado para mostrar el calendario.
								if(relatedGrid.rup_grid("isEditable")){
									elc.parent().find("img.ui-datepicker-trigger").remove();
								}
							} else if (rupType !== "combo") {
								//Se carga el valor 
								elc["rup_"+rowColModel[i].rupType]("setRupValue",elc.val());
							}
							
						}
					}
					
					//Problema con IE
					if($.rup.browser.isIE && rowColModel[i+1] !== undefined){
						if (rowColModel[i+1].rupType === "combo"){
							elc.width(elc.width() - 0.01);
						}
					}
				}
			}//for 

			//validaciones individuales
			$(".validableElem").live('change', function () {
				var data = [], elem = this;
				data.push({name: "property", value: this.name});
				data.push({name: "bean", value: $("#" + mntName)[0].prop.modelObject});
				data.push({name: "value", value: $(this).val()});
				$.rup_ajax({
					url: $("#" + mntName)[0].prop.validationUrl,
					dataType: 'json',
					type: "POST",
					data: data,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					success: function (xhr, ajaxOptions) {
						$("#" + mntName)[0].prop.feedback.rup_feedback("close");
					},
					error: function (xhr, ajaxOptions, thrownError) {
						var errorTXT = $.rup.i18nParse($.rup.i18n.base,"rup_maint.validateError"), errors = null, errorKey = null, causedErrors = null, errMsg = "", errorMesg = "";
						if (xhr.responseText !== null && xhr.responseText !== "") {	
							if (xhr.status === 406) {//si ha habido algun error en las validaciones...
								$(mant).rup_maint("showFieldValidationErrors",xhr);
							} else {
								$("#" + mntName)[0].prop.feedback.rup_feedback("option", "delay", null);
								$("#" + mntName)[0].prop.feedback.rup_feedback("set", errorTXT, "error");								
								$("#" + mntName)[0].prop.feedback.rup_feedback("option", "delay", 1000);
							}
						}
					}
				});
			});
			
			/*
			 * Funcion encargada de gestionar el cambio de pagina al realizar la navegacion con el tabulador
			 */
			function manageTabKeyPageChange(relatedGrid, newPage){
				var dataIds = relatedGrid.rup_grid("getDataIDs");
				relatedGrid[0].p.ajaxGridOptions = {async: false};
				relatedGrid.rup_grid("setGridParam", {page: parseFloat(newPage)});
				relatedGrid.rup_grid("reloadGrid");
				relatedGrid[0].p.ajaxGridOptions = {async: true};
			}
			
			/*
			 * Funcion encargada de gestionar la navegacion con el tabulador
			 */
			function manageTabKey (relatedGrid, event){
				
				var rowNumber, dataIds, rowID, lastPage,  numPag;

				if (event.keyCode == 9) { // TAB
					if ($(this).hasClass("hasDatepicker")) {
						$(this).datepicker("hide");
					}
					
					// Guardamos la fila actual
					$("#" + mntName).rup_maint("saveMaint", null, rowN, function(){
						rowNumber = Number(relatedGrid.rup_grid("getInd",rowN,false))-1;
						dataIds = relatedGrid.rup_grid("getDataIDs");
						page = Number(relatedGrid.rup_grid("getGridParam", 'page'));

						// El guardado se ha realizado correctamente
						if (!event.shiftKey) {
							rowId=dataIds[rowNumber+1];
							
							if (rowNumber == dataIds.length-1) {//si es la ultima fila hay que paginar y poner la primera en edicion
								lastPage = Number(relatedGrid.rup_grid("getGridParam", 'lastpage'));
								if (parseFloat(page) + 1 <= lastPage) {
									manageTabKeyPageChange(relatedGrid, page+1);
									dataIds = relatedGrid.rup_grid("getDataIDs");
									rowId=dataIds[0];
								} else {
									return false;
								}
							}
						}else{
							rowId=dataIds[rowNumber-1];
							
							if (rowNumber == 0) {//si es la ultima fila hay que paginar y poner la primera en edicion
								page = Number(relatedGrid.rup_grid("getGridParam", 'page'));
								if (parseFloat(page)> 1) {
									manageTabKeyPageChange(relatedGrid, page-1);
									dataIds = relatedGrid.rup_grid("getDataIDs");
									rowId=dataIds[dataIds.length-1];
								} else {
									return false;
								}
							}
						}
						
						if ($("#" + mntName)[0].prop.MODO==="new"){
							if (!event.shiftKey){
								// En el caso de estar en modo edicion se muestra una nueva linea para continuar insertando registros
								$("#" + mntName).rup_maint("newElement");
								
								// Situamos el focus en el primer campo editable de la nueva linea
								$("tr.addElement:first .editable:first",relatedGrid).focus();
							}
						}else{
							// En caso de estar en modo modificacion se marca editable la siguiente línea
							var rowColmodel = $("#" + mntName)[0].prop.jQueryGrid.rup_grid("getColModel");
							
							if (!event.shiftKey){
								// Se obtiene el identificador de la primera columna editable y no oculta
								for(var i=0;i<rowColmodel.length;i=i+1){
									if(rowColmodel[i].editable===true && rowColmodel[i].hidden!==true){
										// Se asigna el nuevo identificador de la columna seleccionada 
										$("#" + mntName)[0].prop.selectedCell=i;
										break;
									}
								}
							}else{
								// Se obtiene el identificador de la última columna editable y no oculta
								for(var i=rowColmodel.length-1;i>=0;i=i-1){
									if(rowColmodel[i].editable===true && rowColmodel[i].hidden!==true){
										// Se asigna el nuevo identificador de la columna seleccionada 
										$("#" + mntName)[0].prop.selectedCell=i;
										break;
									}
								}
							}
							
							$("#" + mntName).rup_maint("editElement", rowId);
							$("#" + rowId +"_"+rowColModel[$("#" + mntName)[0].prop.selectedCell].name , relatedGrid).focus();
							$("#" + mntName)[0].prop.jQueryGrid.rup_grid("setSelection", rowId, false);
						}
						return false;
					});
					return false;
				}
				return true;
			}
			
			var lastColName = rowColModel[rowColModel.length-1].name;
			var firstColName = rowColModel[0].name;
			
			// Gestion de la navegacion mediante el tabulador al estar posicionado el foco en el ultimo campo editable de la linea
			$("input[name='" + lastColName + "']", relatedGrid).bind("keydown", function(event) {
				
				if (event.keyCode == 9) { // TAB
					if (!event.shiftKey) {
						return manageTabKey(relatedGrid, event);
					}
				}
			});
			
			// Gestion de la navegacion mediante el shift+tabulador al estar posicionado el foco en el primer campo editable de la linea
			$("input[name='" + firstColName + "']", relatedGrid).bind("keydown", function(event) {	
				
				if (event.keyCode == 9) { // TAB
					if (event.shiftKey) {
						return manageTabKey(relatedGrid, event);
					}
				}
			});
//			$("#" + rowN +"_"+rowColModel[$("#" + mntName)[0].prop.selectedCell].name , relatedGrid).focus();
		},
		saveEditableError : function () {
			// console.log("maint - saveEditableError");
		},
		saveEditableSucces : function () {
			// console.log("maint - saveEditableSucces");
		},
		saveEditable : function () {//evento que se lanza cuando se deja de editar la fila en edición
			// console.log("maint - saveEditable");
			$(this).rup_maint("saveMaint");
		},
		restore: function () {//evento que se lanza al restaurar la fila
			// console.log("maint - restore");
			var maint = $("#" + $.data(this, "maintName"));
			
			maint[0].prop.toolbar.self.disableButton("cancel");
			maint[0].prop.toolbar.self.enableButton("new");
			maint[0].prop.toolbar.self.enableButton("filter");

			maint.data('initialData', null);
			maint[0].prop.feedback.rup_feedback("close");
			if (maint[0].prop.MODO === "new") {//si estsmos dando de alta un registro e intentamos volver a pulsar el boton de nuevo
				maint[0].prop.jQueryGrid.rup_grid("delRowData",maint[0].prop.jQueryGrid.rup_grid("getGridParam",'selrow'));
			}
		},	
		aftersavefunc : function (rowid, res) {//Evento que se lanza cuandos e termina de editar
			// console.log("maint - aftersavefunc");
			if (res) {
				var maint = $("#" + $.data(this, "maintName"));
				maint.rup_maint("saveMaint", null, rowid);
			}
		},
		checkOutOfGrid : function (evt, obj) {
			// console.log("maint - checkOutOfGrid");
			var maint=this;
			if (evt.target.id === "") {
				if(evt.target.className!=='' && $("#gbox_"+maint[0].prop.jQueryGrid[0].id).find("." + evt.target.className).length > 0) {
					return false;
				} else {//Que no sea el boton de cancelar el que coja el foco
					if (this[0].prop.toolbar.self !== null && $(evt.target).find(".rup-maint_cancel").length > 0) {// Si tengo toolbar
						return false;
					}
				}
			} else {
				if ($("#gbox_"+maint[0].prop.jQueryGrid[0].id).find("#" + evt.target.id).length > 0 ) {
					return false;
				}
			}
			
			if (maint[0].prop.jQueryGrid.rup_grid("isEditable")) {
				if (maint[0].prop.jQueryGrid.rup_grid("isEditing")) {
					maint[0].prop.toolbar.self.disableButton("cancel");
					maint[0].prop.toolbar.self.enableButton("new");
					maint[0].prop.toolbar.self.enableButton("filter");
					//Si estoy editando alguna fila tengo que guardar
//					if (this[0].prop.MODO === "new") {//si estamos dando de alta un registro e intentamos volver a pulsar el boton de nuevo
//						$("#" + this[0].prop.lastsel + " .editable:first", this[0].prop.jQueryGrid).focus();
//						return false;
//					}
					this.rup_maint("saveMaint", null, maint[0].prop.lastsel, function(){
						maint[0].prop.lastsel=null;
					});
					return false;
				}
			}
			
			
		},
		editElement: function (id, noChangeMode) {//Edita la fila que recibe como parametro
			var self=this;
			// Funcion utilizada para asociar los eventos de teclado a los campos del registro en el modo de edicion en linea
			var self = this;
			
			if (self[0].prop.isLazyCreationDone===false){
				self.rup_maint("defineDetailForm");
				self.rup_maint("defineValidationConfig");
				if ($.isFunction(self[0].prop.onAfterLazyDetailLoad)){
					self[0].prop.onAfterLazyDetailLoad.call();
				}
				self[0].prop.isLazyCreationDone = true;
			}
			
			function inlineEditKeyEvents(rowId, elem, relatedGrid, mant){
				$(elem).unbind("keydown").bind("keydown",function(e) {
					if (e.keyCode === 27) {self.rup_maint("cancelEditing");}
					if (e.keyCode === 13) {
						var ta = e.target;
						if(ta.tagName == 'TEXTAREA') { return true; }
						$(mant).rup_maint("saveMaint", null, id, function(){
							mant.prop.lastsel=null;
							mant.prop.toolbar.self.disableButton("cancel");
							mant.prop.toolbar.self.enableButton("new");
							mant.prop.toolbar.self.enableButton("filter");
						});
						return false;
					}
					e.stopPropagation();
				});
			}
			
			// Se comprueba que el identificador de la fila es valido para poder utilizarse como identificador de la fila mediante un selector de jQuery. En caso de no realizarse esta comprobacion los plugins subyacentes pueden no ser capaces de referenciar correctamente el elemento.
//			if (!self._checkValidRowId_editline(id)){
//				return false;
//			}
			
			
			return this.each(function(m, a) {
				// console.log("editElement");
				if (id !== null) {
					var rowPos, page, totalRows, rowsXpage, totalElements, mant=this, mnt = $(this), relatedGrid = this.prop.jQueryGrid, lastsel=this.prop.lastsel;
//					if (!noChangeMode) {
//						this.prop.MODO = "edit";
//					}
					
					//Si el mantenimiento es editable
					
					if (relatedGrid.rup_grid("isEditable")) {
						
						if (!self._checkValidRowId_editline(id)){
							return false;
						}
						//adjuntamos los mouseDown para que cuando se realice alguna acción fuera del grid se guarde
						$("#gbox_" + relatedGrid[0].id).parent().bind("mousedown", function (event){mnt.rup_maint("checkOutOfGrid", event, this);});
						this.prop.searchForm.parent().bind("mousedown", function (event){mnt.rup_maint("checkOutOfGrid", event, this);});
						
//						if (id == this.prop.lastsel) {//si vuelvo a pintxar dos veces sobre la misma fila
							// TODO: Comprobar si es necesaria esta casuistica
							
//						if (id && id !== this.prop.lastsel) { 	
							if (this.prop.lastsel !== null) {
								if (mnt.data('initialData') === null) {//si he guardado y ha ido bien se pone el initialdata a null con lo que hay que editar y listo
									if (!noChangeMode) {
										this.prop.MODO = "edit";
									}
									relatedGrid.rup_grid("editRow", id, true, rup_maint.onBeforeEdit, 
										rup_maint.saveEditable, /*editUrl*/ "clientArray", null, rup_maint.aftersavefunc, 
										null, rup_maint.restore);
									
									var ind = relatedGrid.rup_grid("getInd",id,true);
									inlineEditKeyEvents(id, ind, relatedGrid, mant);
									mnt.data('initialData', $.toJSON(relatedGrid.rup_grid("getEditingRowData", id)));
									if (this.prop.MODO === "edit"){
										relatedGrid.rup_grid("setSelection", id, false);
									}
									this.prop.lastsel = id;
									//lanzar el after edit
									if ($.isFunction(this.prop.onafterDetailShow)) {
										this.prop.onafterDetailShow.call(this, id);
									}
									return false;
								} else {		
								//(saveAndRepeat, rowId, aftersavefunc, aftererrorfunc) 
									
									$(this).rup_maint('saveMaint', null, this.prop.lastsel, function(){
										// console.log("entra2");
										if (!noChangeMode) {
											mant.prop.MODO = "edit";
										} 
										relatedGrid.rup_grid("editRow", id, true, rup_maint.onBeforeEdit, 
											rup_maint.saveEditable, "clientArray", null, rup_maint.aftersavefunc, null, 
											rup_maint.restore);
										
										var ind = relatedGrid.rup_grid("getInd",id,true);
										inlineEditKeyEvents(id, ind, relatedGrid, mant);
										
//										relatedGrid.rup_grid("setSelection", id, null);
										mnt.data('initialData', $.toJSON(relatedGrid.rup_grid("getEditingRowData", id)));
										mant.prop.lastsel=id;
										return false;
									}, function(){
										relatedGrid.rup_grid("setSelection", lastsel, null);
										mant.prop.lastsel=lastsel;
										return false;
									});
									return false;
								}
							}
							// console.log("entra3");
							if (!noChangeMode) {
								this.prop.MODO = "edit";
							}
							relatedGrid.rup_grid("editRow", id, true, rup_maint.onBeforeEdit, 
									rup_maint.saveEditable, "clientArray", null, rup_maint.aftersavefunc, null, 
									rup_maint.restore);
							
							//relatedGrid.rup_grid("setSelection", id, null);
							var ind = relatedGrid.rup_grid("getInd",id,true);
							inlineEditKeyEvents(id, ind, relatedGrid, mant);
							
							mnt.data('initialData', $.toJSON(relatedGrid.rup_grid("getEditingRowData", id)));
							this.prop.lastsel = id; 
//						}
						
						//lanzar el after edit
						if ($.isFunction(this.prop.onafterDetailShow)) {
							this.prop.onafterDetailShow.call(this, id);
						}
					} else {
						//quitamos todos los iconos de las validaciones
						$("#" + this.prop.detailDiv[0].id + " .rup-maint_validateIcon").remove();
						var errorClass = this.prop.detailForm.data("validator").settings.errorClass;
						$("."+errorClass,this.prop.detailForm).removeClass(errorClass);
						this.prop.detailFeedback.rup_feedback("close");
						//Se cargan los datos en el formulario
						if (this.prop.detailServer || relatedGrid.rup_grid("isMultiselect")) {
							$(this).rup_maint("loadDetailFromServer", id, this.prop.detailForm);
							return false;
						} else {
							page = relatedGrid.rup_grid("getGridParam", "page");
							totalElements = relatedGrid.rup_grid("getGridParam", "records");
							rowsXpage = relatedGrid.rup_grid("getGridParam", "rowNum");
							/*total de paginas*/
							var rowNumber=Number(relatedGrid.rup_grid("getInd",rowN,false))-1;
							rowPos = ((parseInt(page) * parseInt(rowsXpage)) - parseInt(rowsXpage)) + rowNumber;
							$(this).rup_maint("updateDetailPagination", rowPos, totalElements);
							if ($.isFunction(this.prop.onbeforeDetailShow)) {
								this.prop.onbeforeDetailShow.call(this, this.prop.detailDiv);
							}
							relatedGrid.rup_grid("GridToForm", id, this.prop.detailForm);						
							this.prop.detailDiv.rup_dialog("open");
							//establecemos el foco al primer elemento
							//$("input:not(readonly):first", this.prop.detailForm).focus();
							$("input:not([readonly]):not(:disabled):visible,.ui-selectmenu:not(.ui-state-disabled):visible", this.prop.detailForm).first().focus();
						}
					}
				} else { 
					alert($.rup.i18nParse($.rup.i18n.base,"rup_grid.nav.alerttext")); 
				}
			});
		},	
		deleteElement : function (id) {//elimina la fila del id que recibe como parametro
			// console.log("maint - deleteElement");
			return this.each(function () {
				var maintID = "", rowData = null, mnt = null,
				lng = "", i = 0, arrayPK, url = null, pks = [], jsonData = null, detailPks = [], rows, intNewPage;
				mnt = this;
				if (this.prop.jQueryGrid.rup_grid("isMultiselect")) { //si es multiseleccion hay que enviar todos los id que estan seleccionados
					if (this.prop.selectedRows.length <= 0 && this.prop.jQueryGrid[0].rup_gridProps.allPksArray.length <= 0) {//es que no tengo filas para borrar
						$.rup_messages("msgAlert", {
							message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.noReg"),
							title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.titleDelAll")
						});
					} else {
						$.rup_messages("msgConfirm", {
							message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.deleteAll"),
							title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.titleDelAll"),
							OKFunction : function () {
								if ($.data(mnt.prop.jQueryGrid[0] , "allSelected") !== null && 
										$.data(mnt.prop.jQueryGrid[0] , "allSelected") !== undefined) {
									for (var i = 0; i< mnt.prop.jQueryGrid[0].rup_gridProps.allPksArray.length; i++) {
										if (mnt.prop.primaryKey.indexOf(";") > 0) {//si tenemos clave compuesta
											arrayPK = mnt.prop.jQueryGrid[0].rup_gridProps.allPksArray[i].substring(1).split("/"); 
											lng = arrayPK.length;
											for (var k = 0; k < lng; k++) {
												detailPks.push(arrayPK[k]);
											}
										} else {
											detailPks.push(mnt.prop.jQueryGrid[0].rup_gridProps.allPksArray[i].substring(1));
										}
										pks.push(detailPks);
										detailPks = [];
									}
								} else {
									for (i = 0 ; i < mnt.prop.selectedRows.length; i++) {//me recorro las paginas
										var selectedRows = mnt.prop.selectedRows;
										var selectedPage = selectedRows[i];
										
										var selectedLines = selectedRows["p_"+selectedPage];
										
										for (var j = 0; j < selectedLines.length; j++) {//me recorro las filas que hay en la pagina
											var selectedLine = selectedLines[j];
											var pk = selectedLines["l_"+selectedLine][0];
												
											if (mnt.prop.primaryKey.indexOf(";") > 0) {//si tenemos clave compuesta
												
												arrayPK = pk.split("/"); 
												lng = arrayPK.length;
												for (var k = 0; k < lng; k++) {
													detailPks.push(arrayPK[k]);
												}
											} else {
												detailPks.push(pk);
											}
											pks.push(detailPks);
											detailPks = [];
										}
									}
								}
								url = mnt.prop.jQueryGrid[0].rup_gridProps.url + "/deleteAll";
								jsonData = $.toJSON(pks);
								$.rup_ajax({
									url: url,
									//dataType: 'json',
									data: jsonData,
									async: false,
									type: "POST",
									contentType: 'application/json',
									success: function (xhr, ajaxOptions) {
										mnt.prop.selectedRows = [];
										mnt.prop.selectedRowsCont = 0;
										mnt.prop.jQueryGrid[0].rup_gridProps.allPksArray = [];
										mnt.prop.jQueryGrid.rup_grid("reloadGrid");
										rows = mnt.prop.jQueryGrid.rup_grid("getGridParam","reccount");
										mnt.prop.jQueryGrid.rup_grid("resetSelection");
										$.data(mnt.prop.jQueryGrid[0] , "allSelected", null);
										$.data(mnt.prop.jQueryGrid[0], "deSelectedPages",[]);
										//Si no quedan elementos en la página debemos cargar la anterior.
										if(rows === 0){
											intNewPage = mnt.prop.jQueryGrid.rup_grid("getGridParam", 'page')-1;
											mnt.prop.jQueryGrid.rup_grid("setGridParam", {page: intNewPage});
											mnt.prop.jQueryGrid.rup_grid("reloadGrid");
										}
										if (mnt.prop.showMessages) {
											mnt.prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.deletedOK"), "ok");
										}
										mnt.prop.jQueryGrid.rup_grid("reloadGrid");
									},
									error: function (xhr, ajaxOptions, thrownError) {
										mnt.prop.feedback.rup_feedback("option", "delay", null);
										mnt.prop.feedback.rup_feedback("set", xhr.responseText, "error");
										mnt.prop.feedback.rup_feedback("option", "delay", 1000);
									}
								});
							}
						});
					}
					return false;
				} else {
	
					if (mnt.prop.jQueryGrid.rup_grid('getGridParam', 'selrow') === null) {//es que no tengo filas para borrar
						$.rup_messages("msgAlert", {
							message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.noReg"),
							title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.titleDelAll")
						});
					}else{
						$.rup_messages("msgConfirm", {
							message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.deleteAll"),
							title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.titleDelAll"),
							OKFunction : function () {
								if (mnt.prop.jQueryGrid.rup_grid("isEditable")) {//si estamos en grid editable
									if (mnt.prop.jQueryGrid.rup_grid("isEditing")) {//si estamos editando
										//Si estoy editando alguna fila tengo que guardar
										if (mnt.prop.MODO === "new") {//si estsmos dando de alta un registro e intentamos volver a pulsar el boton de nuevo
											$(mnt).rup_maint("cancelEditing", mnt);
											return false;

										}
										mnt.prop.jQueryGrid.rup_grid('restoreRow', id);


									}	
								}
								rowData = mnt.prop.jQueryGrid.getRowData(id);
								if (rowData !== null) {//si tenemnos datos
									if (mnt.prop.primaryKey.indexOf(";") > 0) {//si tenemos clave compuesta
										arrayPK = mnt.prop.primaryKey.split(";"); 
										lng = arrayPK.length;
										for (i = 0; i < lng; i++) {
											maintID = maintID + "/" +  rowData[arrayPK[i]];
										}
									} else {
										maintID = "/" + rowData[mnt.prop.primaryKey];//obtenemos el valor de la celda de la clave primaria, 
									}
									url = mnt.prop.jQueryGrid[0].rup_gridProps.url + maintID;
								} else {

									return false;
								}
								$.rup_ajax({
										url: url,
										//dataType: 'json',
										data: jsonData,
										async: false,
										type: "DELETE",
										contentType: 'application/json',
										success: function (xhr, ajaxOptions) {
											rows = mnt.prop.jQueryGrid.rup_grid("getGridParam","reccount");
											var delOK = mnt.prop.jQueryGrid.rup_grid("delRowData", id);
											if (mnt.prop.showMessages) {
												mnt.prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.deletedOK"), "ok");

											}
											if (mnt.prop.jQueryGrid.rup_grid("getDataIDs").length > 0) {//seleccionamos la primera fila
												mnt.prop.jQueryGrid.rup_grid("setSelection", mnt.prop.jQueryGrid.rup_grid("getDataIDs")[0], false);

											}
											mnt.prop.jQueryGrid.rup_grid("resetSelection");
											$.data(mnt.prop.jQueryGrid[0] , "allSelected", null);
											$.data(mnt.prop.jQueryGrid[0], "deSelectedPages",[]);
											if (mnt.prop.jQueryGrid.rup_grid("isEditable")) {
												mnt.prop.toolbar.self.disableButton("cancel");
												mnt.prop.toolbar.self.enableButton("new");
												mnt.prop.toolbar.self.enableButton("filter");
											}
											mnt.prop.lastsel=null;
											//Si es el último elemento de la página debemos cargar la anterior.
											if(rows === 1){
												intNewPage = mnt.prop.jQueryGrid.rup_grid("getGridParam", 'page')-1;
												mnt.prop.jQueryGrid.rup_grid("setGridParam", {page: intNewPage});
											}
											mnt.prop.jQueryGrid.rup_grid("reloadGrid");
										},
										error: function (xhr, ajaxOptions, thrownError) {
											mnt.prop.feedback.rup_feedback("option", "delay", null);
											mnt.prop.feedback.rup_feedback("set", xhr.responseText, "error");
											mnt.prop.feedback.rup_feedback("option", "delay", 1000);
										}
								});
							}
						});
					}
				}
			});
		},
		saveMaint: function (saveAndRepeat, rowId, aftersavefunc, aftererrorfunc) {
			var self = this;
			
			return this.each(function () {	
				
				//$(document).unbind("mousedown");
				var mant = this, id = null,/*, dataRow = mant.prop.detailForm.serializeObject()*/
				dt, parent, parentColPks, parentSelectedRow, parentPKObject = {}, aux, rowValues;
				if (mant.prop.jQueryGrid.rup_grid("isEditable")) {
					
					if (rowId==null){
						rowId=mant.prop.jQueryGrid.rup_grid("getSelectedRows")[0];
					}
					
					dt = form2object(mant.prop.jQueryGrid.rup_grid("getInd",rowId,true),null,false);
				} else {
					dt = form2object(mant.prop.detailForm[0],null,false);
				}
				if (dt.JPA_ID instanceof Object) {//si estamos en modo jpa le añadimos el id para poder enviar
					dt["id"] = dt.JPA_ID;
					delete dt.JPA_ID;
				}
				if (mant.prop.parent !== null) {//si tengo padre hay que añadir el valor de la pk del padre
					parent = $("#" + mant.prop.parent);
					parentColPks = parent.rup_maint("getPrimaryKey").split(";");
					parentSelectedRow = parent[0].prop.jQueryGrid.rup_grid("getSelectedRows")[0];
					if (parentColPks.length > 1) {//clave compuesta
						for (var i = 0; i < parentColPks.length; i++) {
							parentPKObject[$.rup_utils.firstCharToLowerCase(parent[0].prop.modelObject)][parentColPks[i]]  = parent[0].prop.jQueryGrid.rup_grid("getCol", parentSelectedRow, parentColPks[i]);
						}
					} else {//clave simple
						parentPKObject[$.rup_utils.firstCharToLowerCase(parent[0].prop.modelObject)] = {};
						parentPKObject[$.rup_utils.firstCharToLowerCase(parent[0].prop.modelObject)][parentColPks[0]] = parent[0].prop.jQueryGrid.rup_grid("getCol", parentSelectedRow, parentColPks[0]);
					}
					$.extend(true, dt, parentPKObject);//mergeamos los dos objectos, solo se sobreesciben las propiedades que tenga el primero y el segundo iguales con el valor del segundo
				}
				var init = eval("("+$(mant).data('initialData')+")");
				
				// VALIDACIONES CLIENTE -> $.jgrid.checkValues(dt["nombre"],"nombre",mant.prop.jQueryGrid[0]);
			
				var validationErrors = [];
				validationErrors.push({key:mant.prop.modelObject});
				
//				var json = {}, errores = false;
//				$.each(dt, function(elem){
//				    var validationResult = $.jgrid.checkValues(dt[elem],elem,mant.prop.jQueryGrid[0]);
//				    if(validationResult[0]===false){
//				    	var validationMsg = validationResult[1].split(elem+":")[1].trim();
//				    	json[elem]=[{"required":validationMsg}];
//				    	errores=true;
//				    }
//				});
				
				
				if(!mant.prop.detailForm.validate().checkForm()){
					validationErrors.push(mant.prop.detailForm.validate().errorMap);
					$(mant).rup_maint("showFieldValidationErrors",$.toJSON(validationErrors));
					
					if(aftererrorfunc){
						aftererrorfunc.call();
					}
					
					return false;
				}
				
//				if ($.toJSON(this.prop.jQueryGrid.rup_grid("getEditingRowData", this.prop.lastsel)) === $(mant).data('initialData')) {//si no ha habido cambios entre lo almacenado en initialData con los datos del grid
//					dt !== $(mant).data('initialData');
//				}
				if ((mant.prop.jQueryGrid.rup_grid("isEditable") && !$.rup_utils.compareObjects(init,dt)) 
						|| ( !mant.prop.jQueryGrid.rup_grid("isEditable") && (mant.prop.detailForm && $.param(self._getDataForFormModifications(mant.prop.detailForm)) !== mant.prop.detailForm.data('initialData')))) {
					dt = $.toJSON(dt);
					dt=dt.split('null').join('');//IE FIX (null values)
					var errores = false;
					
					mant.prop.detailForm.rup_form("ajaxFormSubmit",{
						url: $.rup_utils.setNoPortalParam(mant.prop.jQueryGrid[0].rup_gridProps.url),
						dataType: 'json',
						type: (mant.prop.MODO === 'new' ? "POST" : "PUT"),
//						async: false,
						beforeSubmit: function(arr, $form, options){
							
							var data ={}, fileInputs = $('input:file', $form), hasFileInputs = fileInputs.length > 0, httpMethod;
							// Se comprueba si el formulario contiene campos tipo file
							if (!hasFileInputs){
								options.contentType='application/json';
								arr=dt;
							}else{

								// Implementacion para realizar la emulacion de xhr al utilizar iframes
								if (!$.rup.browser.xhrFileUploadSupport || options.iframe===true){
									
									// Configuracion necesaria para permitir con iframes el uso de metodos http diferentes a GET o POST
									httpMethod = options.type;
									if ($.inArray(httpMethod.toUpperCase(),$.rup.IFRAME_ONLY_SUPPORTED_METHODS) === -1){
										options.extraData = $.extend({},options.extraData,{"_method":httpMethod.toUpperCase()});
									}
									
									// Envio del parametro emulate_iframe_http_status para activar la emulacion en el lado servidor
									options.extraData = $.extend({},options.extraData,{"_emulate_iframe_http_status":"true"});	
									options.url = options.url + (options.url.match("\\?") === null ? "?" : "&") + "_emulate_iframe_http_status=true";
									
									// Callback de error por defecto a ejecutar cuando se produzca un error al utilizar la emulacion 
									var error_user = options.error;
									options.error = function(xhr, textStatus, errorThrown){
										var errorText = $.rup.rupAjaxDefaultError(xhr, textStatus, errorThrown);

										// Si se ha producido un error de los tratados lo mostramos 
										if (error_user!=null){
											$(error_user(xhr, textStatus, errorThrown));
										}else{
											if(errorText){
												$.rup.showErrorToUser(errorText);
											}
										}
									};
								}
								
								$.each(arr, function(i,elem){
									var field = $("[name='"+elem.name+"'][ruptype]",$form);
									
									// Se obtienen los valores a partir de los componentes RUP
									if (field.length===1){
										elem.value= field["rup_"+field.attr("ruptype")]("getRupValue");
									}
									data[elem.name]=elem.value;
								});
								
								arr=data;
							}
							
						},
						success: function (xhr, ajaxOptions) {
							
							return self._saveMaintSuccess(xhr, ajaxOptions, saveAndRepeat, rowId, aftersavefunc);
						},
						error: function (xhr, ajaxOptions, thrownError) {
							return self._saveMaintError(xhr, ajaxOptions, thrownError, rowId, aftererrorfunc);
						},
						beforeSend: function (xhr, settings) {
							if(settings.contentType.indexOf("application/json")!==-1){
								settings.data=dt;
							}
							if(mant.prop.validationFilter){
								xhr.setRequestHeader("validation", "true");
							}
							xhr.setRequestHeader("bean", mant.prop.modelObject);
							xhr.setRequestHeader("rup_maint_mode", (mant.prop.MODO === 'new' ? "add" : "edit"));
							
							return "skip";
						}
					}); 
					return errores;
				} else {//si no se lanza la peticion es porque no ha habido cambios con lo que hay que reiniciar el initialData a null
					if (mant.prop.jQueryGrid.rup_grid("isEditable") && dt === $(mant).data('initialData')){
						$(mant).data('initialData', null);
					}
					
					if (!mant.prop.jQueryGrid.rup_grid("isEditable")) {//Si el mantenimiento no es editable cerramos la ventana modal y reinicimos el valor initialData
						if (!saveAndRepeat) {//si es guardar solo se cierra la ventana modal
							if (!mant.prop.detailFeedback.is(':visible')) {//si hay algun error no hago nada
								mant.prop.detailDiv.rup_dialog("close");
//								mant.prop.detailForm.data('initialData', null);
							}
						} else {//si se le da a guardar y repetir
							if (!mant.prop.detailFeedback.is(':visible')) {//si hay algun error no hago nada
								mant.prop.detailFeedback.rup_feedback("option", "delay", null);
								mant.prop.detailFeedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.emptyChanges"), "alert");
								mant.prop.detailFeedback.rup_feedback("option", "delay", 1000);
							}
						}
						
					}else if (mant.prop.MODO === "new"){ // Si el mantenimiento es editable y estamos en modo de inserción
						mant.prop.jQueryGrid.rup_grid("delRowData",mant.prop.lastsel);
//						mant.prop.jQueryGrid.rup_grid("delRowData",mant.prop.jQueryGrid.rup_grid("getGridParam",'selrow'));
					}else{
						mant.prop.jQueryGrid.rup_grid("restoreRow", mant.prop.lastsel);
						mant.prop.lastsel=null;
						$(mant).rup_maint("ellipsisRestoreOnEdit");
					}

					// Se ejecuta el callback aftersavefunc
					if (aftersavefunc){
						aftersavefunc.call();
					}
					if (!mant.prop.jQueryGrid.rup_grid("isEditable")){
						$(mant).data('initialData', null);
					}
				}
			});
		},
		getPrimaryKey : function () {//obtiene la clave primaria del mantenimiento
			return this[0].prop.primaryKey;
		},
		clearSearchCriteria: function(){
			var $self = this, prop = $self[0].prop;
			$('#titleSearch_' + prop.name)
			.text($.rup.i18nParse($.rup.i18n.base,"rup_maint.searchOptions"))
			.removeClass("rup-maint_searchCriteria ");
		
			//Eliminar tooltip
			$('#titleSearch_' + prop.name).rup_tooltip("destroy");
		},
		showSearchCriteria: function(){
			var $self = this, prop = $self[0].prop,		
			searchString = " ", temp = "", aux, searchForm,
			field, fieldId, fieldName, fieldValue,
			filterMulticombo = new Array();
			
			aux = prop.searchForm.serializeArray();
			searchForm = prop.searchForm;

			for (var i = 0; i < aux.length; i++) {
				if (aux[i].value !== "") {

					//CAMPO a tratar
					field = $("[name='" + aux[i].name + "']",searchForm);

					//Comprobar si se debe excluir el campo
					if ($.inArray(field.attr("id"), prop.filterExclude) !== -1){
						continue;
					}
					
					//Seleccionar radio
					if (field.length > 1){
						field = $("[name='" + aux[i].name + "']:checked",searchForm);
					}
					//Omitir campos hidden
					if ($(field).attr("type") === "hidden"){
						continue;
					}
					
					//ID del campo
					fieldId = $(field).attr("id");
						//ID para elementos tipo rup.combo
						if ($(field).attr("ruptype") === "combo"){
							if (field.next(".ui-multiselect").length==0){
								fieldId += "-button";
							}
						}
						//ID para elementos tipo rup.autocomplete
						if ($(field).attr("ruptype") === "autocomplete"){
							fieldId = fieldId.substring(0, fieldId.indexOf("_label"));
						}
					
					//NAME
					label = $("label[for^='" + fieldId + "']",searchForm);
					if (label.length>0){
						// <label for='xxx' />
						fieldName = label.html();
					} else {
						// <div />
						// <div />
						if ($(field).attr("ruptype") !== "combo"){
							//fieldName= $("[name='" + aux[i].name + "']",searchForm).prev('div').html();
							fieldName= $("[name='" + aux[i].name + "']",searchForm).prev('div').find('label').first().html();
						} else {
							//fieldName= $("[name='" + aux[i].name + "']",searchForm).parent().prev('div').html();
							fieldName= $("[name='" + aux[i].name + "']",searchForm).parent().prev('div').find('label').first().html();
						}
					}
					if (fieldName === null || fieldName === undefined){
						fieldName = "";
					}
					
					//VALUE
					fieldValue = " = ";
					switch($(field)[0].tagName){
						case "INPUT":
							fieldValue = fieldValue + $(field).val();
							if ($(field)[0].type === "checkbox" || $(field)[0].type === "radio"){
								fieldValue = "";
							}
							break;
						case "SELECT":
							if (field.next(".ui-multiselect").length==0){
								fieldValue = fieldValue + $("option[value='"+aux[i].value+"']",field).html();
							} else {
								if ($.inArray($(field).attr("id"), filterMulticombo)===-1){
									numSelected = field.rup_combo("value").length;
									if (numSelected !== 0){
										fieldValue += numSelected; 
									} else {
										fieldName = "";
										fieldValue = "";
									}
									filterMulticombo.push($(field).attr("id"));
								} else {
									fieldName = "";
									fieldValue = "";
								}
							}
							break;
					}
					
					//Parsear NAME
					var parseableChars = new Array(":","=");
					for (var j=0; j<parseableChars.length; j++){
						if (fieldName !== "" && fieldName.indexOf(parseableChars[j])!== -1){
							fieldName = fieldName.substring(0,fieldName.indexOf(parseableChars[j]));
							break;
						}
					}
					
					//Controlar rup.combo con valor vacío
					while (fieldValue.indexOf("&amp;nbsp;")!==-1){
						fieldValue = fieldValue.replace ("&amp;nbsp;","");
					}
					
					//Si no tiene NAME sacar solo el valor
					if (fieldName === "" && fieldValue.indexOf(" = ")!==-1){
						fieldValue = fieldValue.substring(2, fieldValue.length); 
					}
					
					
					//Si no tiene NAME ni VALUE omitir
					if (fieldName === "" && $.trim(fieldValue) === ""){
						continue;
					}
					searchString = searchString + fieldName + fieldValue + ", ";
				}
			}
			//Contiene criterios
			if (searchString.length>1){
				searchString = searchString.substring(0, searchString.length-2);
				
				var initialHeight = $('#titleSearch_' + prop.name).css("height"),
					height,
					tmp = searchString,
					tooltip = false;

				//Añadir criterios
				while(true){
					$('#titleSearch_' + prop.name).html($.rup.i18nParse($.rup.i18n.base,"rup_maint.searchOptions")+"<i>" + tmp + "</i>");
					height = $('#titleSearch_' + prop.name).css("height");
					if (height === initialHeight){
						break;
					}
					tmp = tmp.substring(0, tmp.lastIndexOf(",")) + " <b>...</b>";
					tooltip = true;
				}

				//Tooltip con criterios
				if (tooltip){
					$('#titleSearch_' + prop.name)
						.rup_tooltip({
							content: {
								text: searchString.substring(1)
							},
							position: {
								my: 'bottom center',
								at: 'top center'
							}
						});
				}
			} 
		},
		toggleSearchForm : function (capa, filterCriteriaLoad) {//Apertura/Cierre del formulario de busqueda
			return this.each(function () {
				if (this.prop.searchForm === null) {//si no hay formulario de busqueda no hacemos nada
					return false;
				} else {
					var searchString = " ", temp = "", aux, searchForm,
						field, fieldId, fieldName, fieldValue;
					if ($("#" + capa).is(":hidden") && filterCriteriaLoad===undefined) {
						$("#" + capa).show({
							duration: "slow",
							effect: "blind"
						});
						$('#titleSearch_' + this.prop.name).removeClass("rup-maint_searchCriteria");

						// Anadido el foco al primer campo del formulario
						$("input:first",this.prop.searchForm).focus();
						
					} else {
						$("#" + capa).hide({
							duration: "slow",
							effect: "blind"
						});
						$('#titleSearch_' + this.prop.name).addClass("rup-maint_searchCriteria");
					}
					this.prop.toolbar.self.tooglePressButton("filter","rup-maint_filter_pressed");
				}
			});
		},
		search : function (page) {//Lanza la busqueda del mantenimiento obteniendo los datos del formulario de busqueda
			// console.log("maint - search");
			return this.each(function () {
				var prop = this.prop, realizarBusqueda=true;
				//cerrar el feedback del los mensajes
				prop.feedback.rup_feedback("close");
				//IMPORTANTE:::para que no haya probelams con los mant mestro detalle ya que sino no se lanzaban el gridcomplete del primero y no se quitaban lo de no regitros y no aparecia lo de la paginacion

				// Se elimina la seleccion de elementos en el caso de un mantenimiento de multiseleccion
				if (prop.jQueryGrid.rup_grid("isMultiselect")) {
					prop.jQueryGrid.rup_grid("resetSelection");
					$.data(prop.jQueryGrid[0] , "allSelected", null);
					$.data(prop.jQueryGrid[0], "deSelectedPages",[]);
				}
				
				prop.jQueryGrid.rup_grid("setGridParam", {url: $.rup_utils.setNoPortalParam(prop.jQueryGrid[0].rup_gridProps.url), datatype: 'json', mtype: "GET", page: (page ? page : "rup")});
				
				/*
				 * Comprobamos para el caso de un mantenimiento que sea el detalle de un maestro, 
				 * si la clave o las claves primarias del mantenimiento maestro ha sido informada.
				 * 
				 * En caso de que no tenga valor definido no se realiza la búsqueda.
				 */
				if (prop.parent) {
					var parent = $("#" + prop.parent), colPks = parent.rup_maint("getPrimaryKey").split(";"), row = parent[0].prop.jQueryGrid.rup_grid("getSelectedRows")[0];
					for (var i = 0; i < colPks.length; i++) {
						if (parent[0].prop.jQueryGrid.rup_grid("getCol", row, colPks[i])===false){
							realizarBusqueda = false;
						}
					}
				}
				
				if(realizarBusqueda){
					$(this).rup_maint("showSearchCriteria");
					this.prop.jQueryGrid.rup_grid("reloadGrid");
				}
			});
		},
		toggleGrid : function () {//oculta o muestra el grid de resultados junto con la paginación 
			return this.each(function () {
				if ($('#gbox_' + this.prop.jQueryGrid[0].id).is(":hidden")) {
					$('#gbox_' + this.prop.jQueryGrid[0].id).slideDown("fast");
				} else {
					$('#gbox_' + this.prop.jQueryGrid[0].id).slideUp("fast");
				}
			});
		},
		cleanSearchForm : function () {//Limpia el formulario de búsqueda y dependiendo la propiedad del mantenimiento loadOnStartUp relanzará la carga del grid o la limpieza del mismo.
			return this.each(function () {
				$(this).rup_maint("resetForm", this.prop.searchForm);
				$(this).rup_maint("clearSearchCriteria");
				
				if (this.prop.jQueryGrid[0].rup_gridProps.loadOnStartUp) {//si el grid se carga al arrancar la ventana cuando se limpia el formulario se debe vovler a lanzar la carga del grid sino se borran los datos y listo
					//Hay que vovler a establecer la URL incial para que no relance la busqueda con el querystring incorrecto
					this.prop.jQueryGrid.rup_grid("setGridParam", {url: this.prop.jQueryGrid[0].rup_gridProps.url, page: "rup"});
					// Se elimina la seleccion de elementos en el caso de un mantenimiento de multiseleccion
					if (this.prop.jQueryGrid.rup_grid("isMultiselect")) {
						this.prop.jQueryGrid.rup_grid("resetSelection");
						$.data(this.prop.jQueryGrid[0] , "allSelected", null);
						$.data(this.prop.jQueryGrid[0], "deSelectedPages",[]);
					}
					this.prop.jQueryGrid.rup_grid("setGridParam", {url: $.rup_utils.setNoPortalParam(this.prop.jQueryGrid[0].rup_gridProps.url)});
					this.prop.jQueryGrid.rup_grid("reloadGrid");
				} else {
					if (this.prop.jQueryGrid.rup_grid("getDataIDs").length > 0) {
						this.prop.jQueryGrid.rup_grid("clearGridData");
					}
				}
			});
		},
		getMode : function () {// Devuelve el modo (edit o new) en el que se encuentra el formulario
			return this[0].prop.MODO;
		},
		isEditing : function () {// Devuelve true o false dependiendo si estamos en modo edición o no
			return (this[0].prop.MODO==='edit' ? true : false);
		},
		isAdding : function () {// Devuelve true o false dependiendo si estamos en modo insercion o no
			return (this[0].prop.MODO==='new' ? true : false);
		},
		//Funciones publicas para el manejo de la botonera
		getToolbarObject : function () {// Devuelve el objeto toolbar
			return (this[0].prop.toolbar.self);
		},
		getAddBootonDefaultFunction : function () {// Devuelve la función por defecto del botón añadir
			return (this[0].prop.toolbar.defaultFunctionAddButton);
		},
		getCancelBootonDefaultFunction : function () {// Devuelve la función por defecto del botón Cancelar
			return (this[0].prop.toolbar.defaultFunctionCancelButton);
		},
		getEditBootonDefaultFunction : function () {// Devuelve la función por defecto del botón Editar
			return (this[0].prop.toolbar.defaultFunctionEditButton);
		},
		getDeleteBootonDefaultFunction : function () {// Devuelve la función por defecto del botón Borrar
			return (this[0].prop.toolbar.defaultFunctionDeleteButton);
		},
		getFilterBootonDefaultFunction : function () {// Devuelve la función por defecto del botón del Filtro
			return (this[0].prop.toolbar.defaultFunctionFilterButton);
		}
	});
	//Métodos privados 
	$.fn.rup_maint("extend",{
		addChild : function (maintName) {//Se añaden los hijos al padre
				var aChildren = [];
				if (this.data("_children") !== null && this.data("_children") !== undefined) {
					aChildren = this.data("_children");
				}
				aChildren.push(maintName);
				this.data("_children", aChildren);
		},
		showFieldValidationErrors: function(responseText){
			// console.log("maint - showFieldValidationErrors");
			return this.each(function () {	
				var mant=this, errorTXT = $.rup.i18nParse($.rup.i18n.base,"rup_maint.validateError"), errors = null, errorKey = null, detailFormName, preMode, errors, causedErrors = {};
				
				// Se procesa el mensaje de error
				if(typeof responseText === "string"){
					try{
						errors = $.parseJSON(responseText);
					}catch (e) {
						mant.prop.detailForm.validate().settings.feedback.rup_feedback("option", "delay", null);
						mant.prop.detailForm.validate().settings.feedback.rup_feedback("set", responseText, "error");
						mant.prop.detailForm.validate().settings.feedback.rup_feedback("option", "delay", 1000);
						return;
					}
				}else{
					errors = responseText;
				}

				// Comprobamos si el objeto de error contiene la propiedad rupErrorFields (v2.0.0+)
				if(errors.rupErrorFields!==undefined || errors.rupFeedback!==undefined){
					causedErrors=errors.rupErrorFields;
				}else{
				
					if ($.isArray(errors) && errors.length===2){
						// Tratamiento de errores para la version antigua del ValidationFilter
						if (jQuery.isPlainObject(errors[1])){
							causedErrors = errors[1];
						}else{
							causedErrors = $.parseJSON(errors[1]);
						}
					}
					
					/*
					 * PROCESADO PARA RETROCOMPATIBILIDAD
					 */
					var newCausedErrors={};
					$.each(causedErrors, function(index,value){
					    var obj={};
					    if($.isArray(value)){
					        var aux = $.map(value,function(element,index){
					            if (typeof(element)==="object"){
					                return $.map(element,function(value,key){
					                    return value;
					                });
					            }else{
					                return element;    
					            }
					            
					        });
					        newCausedErrors[index]=aux;
					    }else{
					    	newCausedErrors[index]=value;
					    }
					  
					});
					
					causedErrors=newCausedErrors;
				}
				
//				if ($.isEmptyObject(mant.prop.detailForm.validate().submitted) && !$.isEmptyObject(causedErrors)){
				if (causedErrors!==undefined){
					mant.prop.detailForm.validate().submitted=$.extend(true, mant.prop.detailForm.validate().submitted,causedErrors);
					mant.prop.detailForm.validate().invalid=causedErrors;
					mant.prop.detailForm.validate().showErrors(causedErrors);
				}else if(errors.rupFeedback!==undefined){
					mant.prop.detailForm.validate().settings.feedback.rup_feedback("set", $.rup_utils.printMsg(errors.rupFeedback.message), (errors.rupFeedback.imgClass!==undefined?errors.rupFeedback.imgClass:null));
				}
				
			});
		},
		appendRupFieldsData: function(jsonObj){
			return this.each(function () {
				
				var mant=this, colModel, id, label;
				
				colModel = mant.prop.jQueryGrid.rup_grid("getColModel");
				for (var i=0;i<colModel.length ;i=i+1){
					if (colModel[i].formatterOnUpdate){
						jsonObj[colModel[i].name] = colModel[i].formatterOnUpdate.call($(this), mant.prop.detailForm);
					}else if (colModel[i].rupType==='combo'){
						if (typeof colModel[i].editoptions.source === 'string' && colModel[i].editoptions.sourceParam.label){
							id = colModel[i].name;
							label;
							if(id.indexOf('.')!==-1){
								label=id.substring(0,id.lastIndexOf('.'));
							}
							label+="."+colModel[i].editoptions.sourceParam.label;
							if (!mant.prop.customDetailForm){
								id='detailForm_' + mant.prop.name + '_'+id.replace(/[.]/g,'_');
							}else{
								id = $("[name='"+id+"']",mant.prop.detailForm[0]).attr("id");
							}
							jsonObj[label]=$("[id='"+id+"']",mant.prop.detailForm[0]).rup_combo("label");		
						}
					}
				}
				return this;
				
			});
		},
		_addValidation: function addValidation(detailForm) {//añade las validaciones a todos los elementos con class validableElem 
			
			var self = this, prop = self[0].prop;
			$(".validableElem" , detailForm).die("change");
			$(".validableElem", detailForm).live("change", function () {
				var data = [], elem = this;
				data.push({name: "property", value: this.name});
				data.push({name: "bean", value: prop.modelObject});
				data.push({name: "value", value: $(this).val()});
				$.rup_ajax({
					url: prop.validationUrl,
					dataType: 'json',
					type: "POST",
					data: data,
					contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
					success: function (xhr, ajaxOptions) {
						
						var campos = $("#" + prop.detailDiv[0].id + " .rup-maint_validateIcon").parent().find("#shipmentinfo");
							
						if (campos.length!=0){
							campos.parent().find("img.rup-maint_validateIcon").remove();
						}
						
						elem = null;
						prop.detailFeedback.rup_feedback("close");
					},
					error: function (xhr, ajaxOptions, thrownError) {
						var errorTXT = $.rup.i18nParse($.rup.i18n.base,"rup_maint.validateError"), errors = null, errorKey = null, causedErrors = null, errMsg = "", errorMesg = "";
						if (xhr.responseText !== null && xhr.responseText !== "") {	
							if (xhr.status === 406) {//si ha habido algun error en las validaciones...
								// TODO: comprobar que funciona
								self.rup_maint("showFieldValidationErrors",xhr.responseText);
							} else {
								prop.detailFeedback.rup_feedback("option", "delay", null);
								prop.detailFeedback.rup_feedback("set", errorTXT, "error");								
								prop.detailFeedback.rup_feedback("option", "delay", 1000);
							}
						}
					}
				});
			});
		},
		/*
		 * Funcion que comprueba si se han producido cambios en el formulario de detalle. En caso de haberse producido muestra un mensaje de confirmacion indicando que en casod e continuar se van a perder los cambios.
		 */
		_checkDetailFormModifications: function (okCallback){
			var self = this, prop = self[0].prop; 
//			if (!$(this).hasClass("ui-state-disabled")) {
				if ($.param(self._getDataForFormModifications(prop.detailForm)) !== prop.detailForm.data('initialData')) {
					$.rup_messages("msgConfirm", {
						message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.saveAndContinue"),
						title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.changes"),
						OKFunction : function () {
							$(this).dialog("destroy").remove();
							okCallback.call();
						}
					});								
				} else {
					okCallback.call();
				}
//			}
		},
		_getDataForFormModifications: function (form){
			/*
			 * 
			 */
			return $.merge(form.serializeArray(),
					$.map($("input[type='file']",form),function(a,b){
						 return {name:$(a).attr("name"),value:$(a).attr("value")};
						}));
			
		},
		_checkSelectedElements: function (okCallback){
			var self = this, prop = self[0].prop,
				selectedRows=prop.selectedRows,
				haySeleccionados = false;
			if (selectedRows){
				for (var i = 0;i < selectedRows.length; i++) {
					if (selectedRows["p_"+(i+1)].length>0){
						haySeleccionados = true;
						break;
					}
				}
			}
			//if(prop.showMultiselectAlerts && selectedRows && selectedRows.length>0){
			if(prop.showMultiselectAlerts && haySeleccionados){
				$.rup_messages("msgConfirm", {
					message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.checkSelectedElems"),
					title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.changes"),
					OKFunction : function () {
						okCallback.call();
					}
				});
			}else{
				okCallback.call();
			}
		},
		_checkValidRowId:function(id, invalidCallback){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid;
			
			if ($("#"+id,jqGrid[0]).length===0){
				
				if (typeof invalidCallback === "function"){
					$(invalidCallback(self));
				}
				
				return false;
			}
			
			return true;
		},
		_createData: function createData(detailDiv,detaiBody) {//Se crea el formulario de detalle haciendo uso del colModel del grid
			// console.log("maint - _createData");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid,  dtForm = $("<form>").attr('id', 'detailForm_' + prop.name),
			obj = jqGrid[0], nm, trdata, dc, elc, frmopt, editoptions;
			detaiBody.append(dtForm);
			detailDiv.append(detaiBody);
			$("#"+prop.name).append(detailDiv);
			$(obj.p.colModel).each(function (i) {
					dc='';
					nm = this.name;
					editoptions = this.editoptions;
					if (nm !== 'cb' && this.editable === true) {
						var opt = $.extend({}, editoptions || {}, {id: nm, name: nm});
						if (!this.edittype) { 
							this.edittype = "text"; 
						} else if (this.edittype === "hidden"){
							this.edittype = "text";
							dc = "display:none";								
						}
						
						// Se anyade el sufijo al identificador del control para evitar problemas de referenciar a varios controles con el mismo identificador en la misma pagina
						opt.id='detailForm_' + prop.name + '_'+opt.id.replace(/[.]/g,'_');
						elc = $.jgrid.createEl(this.edittype, opt, "", false, $.extend({}, $.jgrid.ajaxOptions, obj.p.ajaxSelectOptions || {}));

						$(elc).attr('class', 'formulario_linea_input');
						
						if (prop.validationMode === "individual" && this.editRules && this.editRules.validate) {//si el modo de validación es individual y el campo es validable
							$(elc).addClass("validableElem");
						}
						trdata = $("<div>").attr("id", "rup-maint_detailInput_" + elc.id).addClass("floating_left_pad_right").append("<p>").html("<label for='" + elc.id + "' >" + (typeof this.label === 'undefined' ? obj.p.colNames[i]: this.label) + "</label>").append("<br>").append(elc).appendTo(dtForm);
						if (dc !== "") {
							trdata.attr("style", dc);
						}
						
						//creación del tipo de control en  el formulario de detalle
						if (this.rupType){
							if (this.rupType==="numeric"){
								$(elc).numeric(",");
								$(elc).addClass("numeric");
							}else if (this.rupType==="integer"){
								$(elc).numeric(false);
								$(elc).addClass("integer");
							}else if (this.rupType==="datepicker"){
								$(elc).rup_date(editoptions);
								$(elc).addClass("datepicker");
							}else{
								if(editoptions && editoptions.i18nId === undefined){
									editoptions.i18nId = jqGrid.attr("id") + "##" + this.name;
								}
								
								if (this.rupType==="combo"){
									if (editoptions.parent){
										var prefix = 'detailForm_' + prop.name + '_';
										$.each(editoptions.parent, function(index,elem){
											if (editoptions.parent[index].indexOf(prefix)===-1){
												editoptions.parent[index]=prefix+editoptions.parent[index].replace(/[.]/g,'_');
											}
										});
									}
								}
								
								$(elc)["rup_"+this.rupType](editoptions);
							}
						}
						
					}					
				});
			return dtForm;
		},
		_createDetailForm: function (withUserForm) {//				
			// console.log("maint - _createDetailForm");
			var self = this, prop = self[0].prop, detailDiv = null, detaiBody = "", buttons = "", detailFeedBack = "", formu = null,
			capa = self._createDetailNavigation();
			capa = "<div id='pagination_" + prop.name + 
				"' style='float:left;font-size:11px'><img alt='" + $.rup.i18nParse($.rup.i18n.base,"rup_maint.numResult") + "' src='" + prop.imgPath + "/numero_elementos.png'/> " +
				"<div id='rup_maint_selectedElements_"+prop.name+"' style='float: right; margin-left: 3px; margin-top: 2px; position: relative;'> </div></div>" + capa + "<div style='clear:both'/> </div>";

			if (withUserForm) {//si no han indicado formulario de detalle
				detailDiv = prop.detailForm.parent();
				
				//creación de los controles del formualrio haciendo uso de los class
				$("#" + prop.detailForm.attr("id") + " .datepicker").each(function () {
					$(this).rup_date();
				});
				
				$("#" + prop.detailForm.attr("id") + " .numeric").each(function () {
					$(this).numeric(",");
				});
				
				$("#" + prop.detailForm.attr("id") + " .integer").each(function () {
					$(this).numeric(false);
				});
				
				detailFeedBack = $("<div/>").attr("id", "rup-feedback_detail_" + prop.name);
				detailDiv.prepend(detailFeedBack);
				if ($("#pagination_" + prop.name, detailDiv).length===0){
					detailDiv.prepend(capa);
				}
				
				detailFeedBack.rup_feedback({
					closeLink: true,
					gotoTop: false,
					block: false,
					delay: 1000,
					fadeSpeed: 500
				});
				//guardamos como variable el feedback del detalle
				prop.detailFeedback = detailFeedBack;					
			} else {			
				if ($("#detailDiv_" + prop.name).length>0){
					$("#detailDiv_" + prop.name).parent().remove();
				}
				detailDiv = $("<div/>").attr('id', 'detailDiv_' + prop.name).attr('title', $.rup.i18nParse($.rup.i18n.base,"rup_maint.detailTitle")).attr('style', 'display:none');
				detaiBody = $("<div/>").attr('id', 'detailBody').attr('style', 'padding-top:0.6em;');
				detailDiv.append(capa);
				detailFeedBack = $("<div/>").attr("id", "rup-feedback_detail_" + prop.name);
				detaiBody.append(detailFeedBack);
				detailFeedBack.rup_feedback({
					closeLink: true,
					gotoTop: false,
					block: false,
					delay: 1000,
					fadeSpeed: 500
				});
				//guardamos como variable el feedback del detalle
				prop.detailFeedback = detailFeedBack;
				
				formu = self._createData(detailDiv,detaiBody);
				
				prop.detailForm = $("#detailForm_" + prop.name).ajaxForm();
			}
			self._createNavigationButtons();
			self[0].prop.detailDiv = detailDiv;
			//se añade la validación
			self._addValidation(prop.detailForm);
		},
		_createDetailNavigation: function () {
			var self = this, prop = self[0].prop;
			
			return "<div id='rup-maint_detailPagination' style='border-bottom:1px solid #D1D1D1'>" +
						"<div id='pag_" +prop.name + "' style='float:right'>" +
							"<a href='#' id='first_" + prop.name + "' alt='" + $.rup.i18nParse($.rup.i18n.base,"rup_maint.first") + "' class='rup-maint_linkPaginacionDetalle'>" 
							+ $.rup.i18nParse($.rup.i18n.base,"rup_maint.first") + 
							"</a>" +
							"<a href='#' id='back_" + prop.name + "' alt='" + $.rup.i18nParse($.rup.i18n.base,"rup_maint.previous") +	"' class='rup-maint_linkPaginacionDetalle'>" + 
							$.rup.i18nParse($.rup.i18n.base,"rup_maint.previous") +
							"</a>" +
							"<a href='#' id='forward_" + prop.name + "' alt='" + $.rup.i18nParse($.rup.i18n.base,"rup_maint.next") + 	"' class='rup-maint_linkPaginacionDetalle'>" + 
							$.rup.i18nParse($.rup.i18n.base,"rup_maint.next") +
							"</a>" +
							"<a href='#' id='last_" +prop.name + "' alt='" + $.rup.i18nParse($.rup.i18n.base,"rup_maint.last") + "' class='rup-maint_linkPaginacionDetalle'>" + 
								$.rup.i18nParse($.rup.i18n.base,"rup_maint.last") + 
							"</a>" +
						"</div>";
		},
		/*
		 * Funcion que crea los botones de navegación del detalle, es decir, la paginación
		 */
		_createNavigationButtons:function() {
			var self = this, prop = self[0].prop;
			$("#back_" + prop.name).click(function (e) {
				//Se comprueba si el enlace esta deshabilitado
				if ($(this).hasClass("ui-state-disabled")){
					return false;
				}
				// Se comprueba si se han realizado cambios en los datos del formulario
				self._checkDetailFormModifications(function(){
					// Se realiza la navegacion al elemento anterior
					self._editPreviousElement();
				});
			});	
			$("#forward_" + prop.name).click(function (e) {
				//Se comprueba si el enlace esta deshabilitado
				if ($(this).hasClass("ui-state-disabled")){
					return false;
				}
				// Se comprueba si se han realizado cambios en los datos del formulario
				self._checkDetailFormModifications(function(){
					self._editNextElement();
					
				});
			});	
			$("#first_" + prop.name).click(function (e) { 
				//Se comprueba si el enlace esta deshabilitado
				if ($(this).hasClass("ui-state-disabled")){
					return false;
				}
				
				// Se comprueba si se han realizado cambios en los datos del formulario
				self._checkDetailFormModifications(function(){
					self._editFirstElement();
				});
			});	
			$("#last_" + prop.name).click(function (e) { 
				//Se comprueba si el enlace esta deshabilitado
				if ($(this).hasClass("ui-state-disabled")){
					return false;
				}
				
				// Se comprueba si se han realizado cambios en los datos del formulario
				self._checkDetailFormModifications(function(){
					// Se realiza la navegacion al ultimo elemento
					self._editLastElement();
				});
			});
		},
		/*
		 * Funcion que crea los botones del detalle
		 */
		_createDetailButtons: function (detailDialog) {
			var self = this, prop = self[0].prop, aButtons = null;
			
			switch (prop.detailButtons) {
				case $.rup.maint.detailButtons.SAVE_REPEAT:
					aButtons = [{
						text: $.rup.i18nParse($.rup.i18n.base,"rup_global.save"),
						click: function () {
								self.rup_maint("saveMaint");
								prop.MODO=null;
							}
						},
						{
							text: $.rup.i18nParse($.rup.i18n.base,"rup_global.save_repeat"),
							click: function () {
								self.rup_maint("saveMaint", true);//Invocamos al guardar del mantenimiento indicando que es guardaryrepetir
							}
						},
						{
							text: $.rup.i18nParse($.rup.i18n.base,"rup_global.cancel"),
							click: function () { 
								// Se comprueba si se han realizado cambios en los datos del formulario
								self._checkDetailFormModifications(function(){
									// Se cierra el formulario de detalle
									prop.detailDiv.rup_dialog("close");
									prop.MODO=null;
								});
								
								//quitamos todos los iconos de las validaciones
								$("#" + prop.detailDiv[0].id + " .rup-maint_validateIcon").remove();
								prop.detailFeedback.rup_feedback("close");
								
								//Seleccionar primero en selección simple
								if (!$(jqGrid).rup_grid("isEditable") //Formulario
										&& !$(jqGrid).rup_grid("isMultiselect") //Selección simple
										&& $(jqGrid).rup_grid("getGridParam",'selrow') === null){ //Ningún elemento seleccionado
									$(jqGrid).rup_grid("setSelection", $(jqGrid).rup_grid("getDataIDs")[0], false);
								}
								
								return false;
							},
							btnType: $.rup.dialog.LINK
						}];
					break;
				case $.rup.maint.detailButtons.SAVE:
				default:
					aButtons = [{
						text: $.rup.i18nParse($.rup.i18n.base,"rup_global.save"),
						click: function () {
								self.rup_maint("saveMaint");
							}
						},
						{
							text: $.rup.i18nParse($.rup.i18n.base,"rup_global.cancel"),
							click: function () { 
								
								// Se comprueba si se han realizado cambios en los datos del formulario
								self._checkDetailFormModifications(function(){
									// Se cierra 
									prop.detailDiv.rup_dialog("close");
								});
								
								//quitamos todos los iconos de las validaciones
								$("#" + prop.detailDiv[0].id + " .rup-maint_validateIcon").remove();
								prop.detailFeedback.rup_feedback("close");
								
								//Seleccionar primero en selección simple
								if (!$(jqGrid).rup_grid("isEditable") //Formulario
										&& !$(jqGrid).rup_grid("isMultiselect") //Selección simple
										&& $(jqGrid).rup_grid("getGridParam",'selrow') === null){ //Ningún elemento seleccionado
									$(jqGrid).rup_grid("setSelection", $(jqGrid).rup_grid("getDataIDs")[0], false);
								}
								
								return false;
							},
							btnType: $.rup.dialog.LINK
						}];
			}	
			detailDialog.rup_dialog("setOption", "buttons", aButtons);
		},
		_deselectAddedElements: function (){
			var self = this, prop = self[0].prop, aButtons = null;
			prop.MODO=null;
			$(self[0]).find(" tr.addElement td input[type='checkbox'].cbox:checked").click();
			prop.jQueryGrid.rup_grid("reloadGrid");
		},
		_ellipsisDeleteOnEdit: function (elem){
			elem.parent().removeClass("ui-ellipsis");
		},
		ellipsisRestoreOnEdit: function (){
			var self = this, prop = self[0].prop, aButtons = null, rowColModel, selectedRow;
			
			selectedRow = jqGrid.getInd(prop.lastsel,true);
			
			rowColModel = jqGrid.rup_grid("getColModel");
			
			for (var i = 0;i < rowColModel.length; i++) {
				if (rowColModel[i].classes !== undefined && rowColModel[i].classes.indexOf("ui-ellipsis")!==-1){
					$("[aria-describedby='"+jqGrid.attr("id")+"_"+rowColModel[i].name+"']",selectedRow).addClass("ui-ellipsis");
				}
			}
		},
		_loadComplete: function (data) {
			// console.log("maint - _loadComplete");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid;
			prop.lastsel=null;

			// Se guarda el numero total de paginas
			$.data(jqGrid[0], "numPags", parseInt(data.total));
			
			if (data.records==0){
				
				prop.toolbar.self.disableButton("delete");
				if (!prop.jQueryGrid.rup_grid("isEditable")) {
					prop.toolbar.self.disableButton("edit");
				}else{
					prop.toolbar.self.disableButton("cancel");
				}
			}else{
				prop.toolbar.self.enableButton("delete");
				if (!prop.jQueryGrid.rup_grid("isEditable")) {
					prop.toolbar.self.enableButton("edit");
				}else{
					prop.toolbar.self.disableButton("cancel");
					prop.toolbar.self.enableButton("new");
				}
				
				if (prop.jQueryGrid.rup_grid("isMultiselect")){
					
					if (prop.selectedRowsCont>0){
						prop.toolbar.self.enableButton("edit");
						prop.toolbar.self.enableButton("delete");
					}else{
						prop.toolbar.self.disableButton("edit");
						prop.toolbar.self.disableButton("delete");
					}
				}
			}
		},
		_onAfterGridComplete:  function (rowid, launchSelectEvent) {
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid,  p, page = jqGrid.rup_grid("getGridParam", "page"), id = 0, rowData, selectedPKs, 
			pk, pkIndex, idPK, notFound = true;
			
			if (jqGrid.rup_grid("isMultiselect")) {
				//Si estamos añadiendo un nuevo elemento el addRowdata invoca al updatepager que invoca al gridcomplete con lo que no deberiamos de tocar nada de las seleccionadas
				if (prop.MODO === "new") {
					return false;
				}
				return self._markSelectedRows_multiselect();
			} else {
				if (rowid === null) {//si no me vienen el row id es pq vengo de la primera carga es decir que no estoy paginando con los botoens de ultimo y primero o que no he saltado de pagina 
					if (jqGrid.rup_grid("getDataIDs").length > 0) {
						if (jqGrid.rup_grid("isEditable")) {//si el grid es editable no hay lanzar el setselection para que lance el select de la fila porque sino la editaria
							jqGrid.rup_grid("setSelection",  jqGrid.rup_grid("getDataIDs")[0], false);
						} else {
							jqGrid.rup_grid("setSelection",  jqGrid.rup_grid("getDataIDs")[0], true);
						}
					}
				} else {//si me viene una fila es que vengo de pulsar el firsto last
					if (jqGrid.rup_grid("getDataIDs").length > 0) {
						if (jqGrid.rup_grid("isEditable")) {
							jqGrid.rup_grid("setSelection", rowid, false);
						} else {
							jqGrid.rup_grid("setSelection", rowid, true);
						}
					}
				}				
			}
			if (rowid) {
				self.rup_maint("editElement", rowid);
			}
			
		},
		_ondblClickRow: function (rowid, iRow, iCol, e) {
			var self = this, prop = self[0].prop;
			
			$("body").data("e_click_mnt",false);
			window.clearTimeout($("body").data("clicktimer_mnt"));
			//eliminamos la edicion en linea en el doble click y lo dejamos en linea
			if (!prop.jQueryGrid.rup_grid("isMultiselect") && !prop.jQueryGrid.rup_grid("isEditable")) {
				prop.MODO = "edit";
				self.rup_maint("editElement", rowid);
				$("#"+rowid, self).click();//Si tiene detalle que se carguen datos en doble click
			}
		},
		_saveMaintSuccess: function (xhr, ajaxOptions, saveAndRepeat, rowId, aftersavefunc) {
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, jsonxhr, addedRow;
			
			// Obtenemos un json desanidado para evitar los problemas al utilizar la notacion dot
			jsonxhr = $.rup_utils.unnestjson(xhr);
			// Cerramos los feedbacks
			prop.feedback.rup_feedback("close");
			// Comienza la gestion especifica dependiendo del tipo de mantenimiento
			if (prop.jQueryGrid.rup_grid("isEditable")) {
				// Gestion de controles de la botonera
				prop.toolbar.self.disableButton("cancel");
				prop.toolbar.self.enableButton("new");
				// Se realiza el guardado de los datos en el grid.
				jqGrid.rup_grid("saveRow", prop.lastsel, rup_maint.saveEditableSucces, "clientArray", null, null, rup_maint.saveEditableError, null);
				if (prop.showMessages) {
					if (prop.MODO === 'new') { //Mostrar los mensajes dependiendo el modo
						prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.insertOK"), "ok");
					} else {
						prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.modifyOK"), "ok");
					}
				}
				
				// Se modifica el valor del identificador de la nueva linea (inicialmente asignado por el grid el valor de la posicion de la nueva linea) por el correspondiente a la clave primaria.
				addedRow = jqGrid.rup_grid("getInd",prop.lastsel,true);
				if (addedRow!==false){
					$(addedRow).attr("id", jsonxhr[prop.primaryKey]);
					prop.lastsel=jsonxhr[prop.primaryKey];
				}
				
				// Se elimina el contenido de initialDatad debido a que el guardado ha sido corecto
				self.data('initialData',null);	
				
			} else {//si no es editable
				
				// En el caso de que el formulario tenga campos rup, se anadiran al json valores necesarios para actualizar los mostrados en las columnas del grid.
				self.rup_maint("appendRupFieldsData", jsonxhr);
				
				if (saveAndRepeat) { //si es guardar y repetir
					if (prop.showMessages) {
						if (prop.MODO === 'new') { //Mostrar los mensajes dependiendo el modo
							self.rup_maint("resetForm", prop.detailForm);
							prop.detailFeedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.insertOK"), "ok");
						} else {
							prop.detailFeedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.modifyOK"), "ok");
						}
					}
					//reiniciamos el gestor de cambios
					prop.detailForm.data('initialData', self.rup_maint("getSerializedForm", prop.detailForm));
				} else {
					self.rup_maint("resetForm", prop.detailForm);
					if (prop.showMessages) {
						if (prop.MODO === 'new') { //Mostrar los mensajes dependiendo el modo
							prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.insertOK"), "ok");
						} else {
							prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.modifyOK"), "ok");
						}
					}
					prop.detailDiv.rup_dialog("close");
				}
				//Dependiendo del modo en el que este el mantenimiento hay que añadir una nueva fila o actualizar la seleccionada
				if (prop.MODO === "new") {
					var ids = jqGrid.rup_grid("getDataIDs"),
					rowN = Math.max.apply(Math,ids) + 1;
					jqGrid.rup_grid("addRowData", rowN, jsonxhr, "first");
					if (!jqGrid.rup_grid("isMultiselect")) {
						jqGrid.rup_grid("setSelection", rowN, true);
						prop.toolbar.self.enableButton("edit");
						prop.toolbar.self.enableButton("delete");
					}
					
				}else{
					if (jqGrid.rup_grid("isMultiselect")) {
//						var aCurrentRow = prop.currentSelectedRow.split(";");//su forma es "p_1;id_2"
						var aCurrentRow = prop.currentSelectedRow;//su forma es "p_1;id_2"
						// jqGrid.rup_grid("setRowData", $.inArray(aCurrentRow[1],prop.selectedRows[aCurrentRow[0]]), xhr);
						jqGrid.rup_grid("setRowData", aCurrentRow, jsonxhr);
					} else {
						jqGrid.rup_grid("setRowData", jqGrid.rup_grid("getSelectedRows")[0], jsonxhr);
					}
				}
			}
			self.rup_maint("ellipsisRestoreOnEdit");
			// Se ejecuta el callback aftersavefunc
			if (aftersavefunc){
				aftersavefunc.call();
			}
			return false;
		},
		_saveMaintError: function (xhr, ajaxOptions, thrownError, rowId, aftererrorfunc) {
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, errorTXT = $.rup.i18nParse($.rup.i18n.base,"rup_maint.validateError"), errors = null, errorKey = null, 
			causedErrors = null, errMsg = "", errorMesg = "", preMode, feedback;
			
			if (!jqGrid.rup_grid("isEditable")) {
				$("#" + prop.detailDiv[0].id + " img.rup-maint_validateIcon").remove();
			}
			if (xhr.responseText !== null && xhr.responseText !== "") {	
				if (xhr.status === 406) {//si ha habido algun error en las validaciones...
					// Se muestran los errores en los campos, de acuerdo al resultado de la validacion de los campos
					self.rup_maint("showFieldValidationErrors",xhr.responseText);
				} 
			}
			
			// Se ejecuta el callback aftererrorfunc
			if(aftererrorfunc){
				aftererrorfunc.call();
			}
			
			//Si fuera necesario, se actualiza el modelo, "Collection_rup_combo", de combos del grid
			if (rowId!==undefined && rowId!==null){
				if (jqGrid.data("Collection_rup_combo") !== undefined){
					var rowComboData = jqGrid.data("Collection_rup_combo")[rowId];
					$.each(rowComboData, function(index, object){
						var ffe = object[0];
						object.label = jqGrid.rup_grid("getCol", rowId, index);
						object.value = xhr[index];
					});
				}
			}
			
			return false;
		},
		_serializeGridData: function (postData) {
			var self = this, prop = self[0].prop;

			//para que cuando se pulse los bontones de navegacion no use los criterios de busqueda para cargar el grid
			if(postData.page==='rup'){
				postData.page=1;
			}else{
				return postData;
			}
			
			if (prop.searchForm !== null) {
			var searchFormArray = prop.searchForm.serializeArray();
			for (var i = 0; i < searchFormArray.length; i++) { //eleminamos todos los posibles valores que en na busqueda anterior se hayan podido añadir a postData 
				delete postData[searchFormArray[i].name];
			}
			if (postData.page!== undefined && postData.page !== null && Number(postData.page) > $(this).rup_grid("getGridParam","lastpage") && $(this).rup_grid("getGridParam","lastpage") > 0){//pq si laspage es 0 es la primera vez
				postData.page = $(this).rup_grid("getGridParam","lastpage");
			}	
			
			var formFieldNames = $.map($.makeArray(prop.searchForm.find("[name]")),function(elem){
				  return $(elem).attr("name");  
			});
			
			$.each(formFieldNames, function(index){
			    delete postData[formFieldNames[index]];
			});
			
			//SUF : modificado para unifcar en un unico metodo $.extend(postData, settings.searchForm.serializeToObject()); //Solo se envian los campos que tienen valor y sean diferentes a ""
//			$.extend(postData, form2object(t[0].prop.searchForm[0])); //Solo se envian los campos que tienen valor y sean diferentes a ""
			// Se desanida el json para permitir el uso de notacion dot en los controles del formulario de busqueda
			$.extend(postData, $.rup_utils.unnestjson(form2object(prop.searchForm[0])));
			}
			if (prop.parent) {//SUF: si tenemos padre tendremos que añadir la clave primaria del padre como dato a enviar
				var parent = $("#" + prop.parent), colPks = parent.rup_maint("getPrimaryKey").split(";"), parentPKObject = {}, row = parent[0].prop.jQueryGrid.rup_grid("getSelectedRows")[0];
				if (colPks.length > 1) {//clave compuesta
					for (var i = 0; i < colPks.length; i++) {
						parentPKObject[$.rup_utils.firstCharToLowerCase(parent[0].prop.modelObject) + colPks[i]] = parent[0].prop.jQueryGrid.rup_grid("getCol", row, colPks[i]) + ";"; 
					}
				} else {//clave simple
					var pkLabel = colPks[0].substring(0,1).toUpperCase() + colPks[0].substring(1); 
					parentPKObject[$.rup_utils.firstCharToLowerCase(parent[0].prop.modelObject) + pkLabel] = parent[0].prop.jQueryGrid.rup_grid("getCol", row, colPks[0]);
				}
				$.extend(postData, parentPKObject);//Solo se envian los campos que tienen valor y sean diferentes a ""
			}
			return postData;
		}
	
	});

	$.fn.rup_maint("extend", {
		_init : function(properties) {
			
			//return this.each(function () {
			var self = this, resize_cursors = [2], prop = self[0].prop, t = this, btSearch, lnkClean, btDiv, settings = {}, toolbarSettings;
			
			// Carga de los valores por defecto para los atributos que no ha introducido el usuario
			if (properties[0].jQueryGrid === null) {//no se puede crear el mantenimiento sin grid
				$.rup_messages("msgError", {message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.noGrid")});
				return false;			
			}
			
			properties[0].jQueryGrid = $("#" + properties[0].jQueryGrid);
			
			settings = $.extend(true,{}, $.fn.rup_maint.defaults, properties[0]);
			
			//Compatibilidad hacia atrás de la toolbar
			if (typeof properties[0].toolbar === "string"){
				settings.toolbar = $.fn.rup_maint.defaults.toolbar;
				settings.toolbar.id = properties[0].toolbar;
			}
			if (properties[0].autoAjustToolbar !== undefined){ 
				settings.toolbar.autoAjustToolbar = properties[0].autoAjustToolbar;
			} 
			if (properties[0].createDefaultToolButtons !== undefined){ 
				settings.toolbar.createDefaultToolButtons = properties[0].createDefaultToolButtons;
			} 
			
			settings.name = self[0].id;//.substring("EJIE_MAINT_".length, self[0].id.length);
			
			self[0].prop = settings;
			prop = self[0].prop;
			jqGrid = prop.jQueryGrid;
			
			$.data(jqGrid[0] , "maintName",  self[0].id);//guardamos en el grid el nombre del maint
			
			prop.selectedRows = [];//Array con lo abjetos seleccionados
			prop.selectedRowsCont = 0;//contador para los seleccionados
			prop.currentSelectedRow = 0;//	
			prop.lastsel = null; //Ultima fila seleccionada para los mantenimientos editables 

			
			/* **************
			 * DETAIL FORM: Formulario de detalle para la insercion y modificacion de los datos de los registros.
			 * **************/
			
			// El formulario de detalle solo se crea en los mantenimientos de edicion simple y multiseleccion.
			if (!jqGrid.rup_grid("isEditable")) {
				if (!prop.lazyLoadDetailForm){
					self.rup_maint("defineDetailForm");
				}else{
					prop.isLazyCreationDone=false;
				}
			}
			

			/* **************
			 * TOOLBAR
			 * **************/
			
			//Funcines de los botones de la botonera por defecto
			prop.toolbar.defaultFunctionAddButton = function () {
				self._checkSelectedElements(function(){
					prop.jQueryGrid.rup_grid("resetSelection");
					$.data(t[0].prop.jQueryGrid[0] , "allSelected", null);
					$.data(t[0].prop.jQueryGrid[0], "deSelectedPages",[]);
					t.rup_maint("newElement");
				});
				prop.MODO = "new";
			};
			
			prop.toolbar.defaultFunctionCancelButton = function () {
				t.rup_maint("cancelEditing", this);
			};
			
			prop.toolbar.defaultFunctionEditButton = function () {
				var rowid = self[0].prop.jQueryGrid.rup_grid('getGridParam', 'selrow'), page = jqGrid.rup_grid('getGridParam', 'page'),firstPage=null, firstElemObj;
				if (jqGrid.rup_grid('isMultiselect')) {
					
					// Obtenemos el identificador del primer elemento seleccionado
					firstElemObj = self._getFirstElement(page);
					if (firstElemObj === undefined) { return false; } //Correción Jerarquia
					prop.currentSelectedRow=firstElemObj.rowId;	
					
					if (firstElemObj.page!==page){
						prop.jQueryGrid.rup_grid("setGridParam", {page: firstElemObj.page});
						prop.jQueryGrid.rup_grid("reloadGrid", function(){
							prop.currentSelectedRow = firstElemObj.rowId; //Cargar el ID que se pierde al paginar
						});	
					}
					prop.MODO = "edit";
					self.rup_maint("editElement", firstElemObj.rowId);
					
				}else{
					prop.MODO = "edit";
					//prop.currentSelectedRow = "p_" + page + ";" + "id_" + rowid;
					prop.currentSelectedRow = rowid;
					self.rup_maint("editElement", rowid);
				}
				return false;
			};
			
			prop.toolbar.defaultFunctionDeleteButton = function () {
				self.rup_maint("deleteElement", prop.jQueryGrid.rup_grid('getGridParam', 'selrow'));
			};
			
			prop.toolbar.defaultFunctionFilterButton = function () {
				self.rup_maint("toggleSearchForm", "FIELDSET_SEARCH_" + prop.name);
			};
			
			// Se comprueba si se ha especificado un toolbar propio. En caso de no especificarse se crea uno por defecto
			if (prop.toolbar.id !== null && prop.toolbar.id !== undefined) {
				// En caso de especificarse un toolbar propio, se almacena la referencia del mismo.
				prop.toolbar.self = $("#" + prop.toolbar.id);				
			} else {
				// En caso de no indicarse un toolbar, se crea un toolbar por defecto.
				prop.toolbar.id = "rup-maint_toolbar-" + prop.name;
				prop.toolbar.self = $("<div/>").attr("id", prop.toolbar.id);
				self.prepend(prop.toolbar.self);
				prop.toolbar.self.rup_toolbar({
					width: 796
				});
			}
			
			// autoAjustToolbar: Realiza el autoajuste del toolbar al tamanyo del grid.
			if (prop.toolbar.autoAjustToolbar) {
				prop.toolbar.self.css("width", prop.jQueryGrid.rup_grid("getGridParam", "width") - 5);//-5 para ajustar el ancho
			}
			
			// createDefaultToolButtons: Determina la creacion de los botones basicos por defecto del toolbar.
			if (prop.toolbar.createDefaultToolButtons) {
				
				// Boton anadir un nuevo elemento .
				if(prop.toolbar.defaultAdd){
					self[0].prop.btnNew = prop.toolbar.self.addButton({
						i18nCaption: "new",
						css: "rup-icon rup-icon-new",
						index: 1
					}, $.rup.i18nParse($.rup.i18n.base,"rup_maint")).bind("click", prop.toolbar.defaultFunctionAddButton);
				}
				
				// Boton cancelar edicion o insercion de un elemento (solo en mantenimiento de edicion en linea).
				if(prop.toolbar.defaultCancel){
					if (prop.jQueryGrid.rup_grid("isEditable")) {
						self[0].prop.btnCancel = prop.toolbar.self.addButton({
							i18nCaption: "cancel",
							css: "rup-icon rup-icon-cancel",
							index: 2
						}, $.rup.i18nParse($.rup.i18n.base,"rup_maint")).bind("click", prop.toolbar.defaultFunctionCancelButton).button("option", "disabled", true );
					}
				}
				
				// Boton editar un elemento (solo en los mantenimientos de edicion simple y multiseleccion).  
				if(prop.toolbar.defaultEdit){
					if (!prop.jQueryGrid.rup_grid("isEditable")) {
						self[0].prop.btnEdit = prop.toolbar.self.addButton({
							i18nCaption: "edit",
							css: "rup-icon rup-icon-edit",
							index: 2
						}, $.rup.i18nParse($.rup.i18n.base,"rup_maint")).bind("click", prop.toolbar.defaultFunctionEditButton);
					}
				}
				
				// Boton eliminar un elemento. 
				if(prop.toolbar.defaultDelete){
					prop.btnDelete = settings.toolbar.self.addButton({
						i18nCaption: "delete",
						css: "rup-icon rup-icon-delete",
						index: 3
					}, $.rup.i18nParse($.rup.i18n.base,"rup_maint")).bind("click", prop.toolbar.defaultFunctionDeleteButton);
				}
				
				// Boton filter para mostrar/ocultar el formulario de busqueda.
				if(prop.toolbar.defaultFilter){
					prop.btnFilter = settings.toolbar.self.addButton({
						i18nCaption: "filter", 
						css: "rup-icon rup-icon-filter", 
						index: 4
					}, $.rup.i18nParse($.rup.i18n.base,"rup_maint")).bind("click", prop.toolbar.defaultFunctionFilterButton);
					prop.toolbar.self.pressButton("filter","rup-maint_filter_pressed");
				}
			}
			
			//Se comprueba si hay nuevos botones definidos y se ejecuta la función addButton con la parametrizacion de los nuevos botones
			if (prop.toolbar.newButtons !== undefined && prop.toolbar.newButtons !== null){
				$.each(prop.toolbar.newButtons, function (index, object){
					if (object.json_i18n === undefined){
						object.json_i18n = {};
					}
					if (object.obj !== undefined && object.click !== undefined){
						prop.toolbar.self.addButton(object.obj, object.json_i18n).bind("click", object.click);
					} else if (object.buttons !== undefined){
						var mButton = prop.toolbar.self.addMButton(object, object.json_i18n).bind("click", prop.toolbar.self.showMButton);
						prop.toolbar.self.addButtonsToMButton(object.buttons, mButton, object.json_i18n);
					} else{
						$.rup.errorGestor($.rup.i18nParse($.rup.i18n.base,"rup_maint.toolbarNewButtonError"));
					}
				});
			}
			
			
			/* **************
			 * FEEDBACK
			 * **************/
			
			// Se comprueba si se ha especificado un feedback propio. En caso de no especificarse se crea uno por defecto.
			if (prop.feedback !== null) { 
				// En caso de indicarse un feedback propio, se almacena la referencia al mismo.
				if( typeof (prop.feedback) !== "object"){
					var alter = $.rup_utils.escapeId(prop.feedback);
					prop.feedback = $($.rup_utils.selectorId(prop.feedback));
				} 
			} else {
				// En caso de no especificar un feedback, se genera uno por defecto.
				prop.feedback = $("<div/>").attr("id", "feedback_" + prop.name);
				self.prepend(prop.feedback);
				prop.feedback.rup_feedback({ 
					type: "ok",
					closeLink: true,
					delay: 1000,
					fadeSpeed: 500,
					block: (prop.showFeedback ? true : false)
				});
				//Ajustar feedback al tamaño de la tabla
				var padding_left = parseInt(prop.feedback.css("padding-left")),
					padding_right = parseInt(prop.feedback.css("padding-right"));
				prop.feedback.css("width", prop.jQueryGrid.rup_grid("getGridParam", "width") - (padding_left+padding_right));
			}
			
			/* **************
			 * SEARCH FORM
			 * **************/
			
			// En caso de especificar un formulario de busquela se anyaden los componentes necesarios para su funcionamiento.
			if (prop.searchForm !== null) {
				// Asociamos el literal del formulario de busqueda indicado en los ficheros i18n
				$('#titleSearch_' + prop.name).text($.rup.i18nParse($.rup.i18n.base,"rup_maint.searchOptions"));
				// Se almacena la referencia al formulario. 
				prop.searchForm = $("#" + prop.searchForm);
				// Se utiliza el plugin ajaxForm de jQuery para configurar el formualario de busqueda como AJAX.
				prop.searchForm.ajaxForm();
				// Se redimensiona el formulario de busqueda al tamanyo del grid.
				prop.searchForm.parent().css("width",prop.jQueryGrid.rup_grid("getGridParam", "width"));
				// Se almacena en las propiedades la url utilizada para la busqueda a partir de la especificada en el grid.
				prop.searchURL = settings.jQueryGrid.rup_grid("getGridParam", "url");
				// Se asigna a la tecla ENTER la funcion de busqueda. 
				prop.searchForm.bind("keydown", function(evt) {
					if (evt.keyCode == 13) {
						self.rup_maint("search");
					}
				});
				
				// Creacion del boton de busqueda.
				btSearch = $("<input type='button' />").attr('id', 'bt_search_' + prop.name).bind("click", function () {
					//Si existe elementos seleccionados avisar de su pérdida
					if (jqGrid.rup_grid('isMultiselect')){
						self._checkSelectedElements(function(){
							prop.jQueryGrid.rup_grid("resetSelection");
							$.data(t[0].prop.jQueryGrid[0] , "allSelected", null);
							$.data(t[0].prop.jQueryGrid[0], "deSelectedPages",[]);
							self.rup_maint("search");
						});
					} else {
						self.rup_maint("search");
					}
				});
				btSearch.button({label: $.rup.i18nParse($.rup.i18n.base,"rup_global.search")});

				// Creacion del enlace de limpiar formulario.
				lnkClean = $("<a href='#' />").attr("id", "clean_search_" + prop.name).attr("class", "rup-enlaceCancelar").text($.rup.i18nParse($.rup.i18n.base,"rup_global.clean")).bind("click", function () {
					self.rup_maint("cleanSearchForm");
				});
				
				// Creacion del div que contiene ambos controles.
				btDiv = $("<div>").attr("id", "SEARCH_FORM_BUTTONS_" + prop.name).addClass("right_buttons").append(btSearch).append("&nbsp;").append(lnkClean).append("&nbsp;");
				$("#FIELDSET_SEARCH_" + prop.name).append(btDiv);
			}
			
			/* **************
			 * MAESTRO-DETALLE
			 * **************/
			
			// En caso de disponer de un mantenimento detalle se realiza la configuracion correspondiente.
			if (prop.parent) {
				if ($("#" + prop.parent).length > 0) {
					$("#" + prop.parent).rup_maint("addChild", self[0].id);//"EJIE_MAINT_" + settings.name);
				}
			}
			
			
			/* **********************************
			 * SOBREESCRITURA DE EVENTOS DEL GRID
			 * **********************************/
			
			/*
			 * loadComplete: 
			 */
			jqGrid.data("defaultEventFunctions").loadComplete_default=function(data){
				self._loadComplete(data);
			};
			
			/*
			 * ondblClickRow: 
			 */
			jqGrid.data("defaultEventFunctions").ondblClickRow_default=function(rowid, iRow, iCol, e){
				self._ondblClickRow(rowid, iRow, iCol, e);
			};
			
			
			/*
			 * serializeGridData: 
			 */
			jqGrid.data("defaultEventFunctions").serializeGridData_default=function(postData, returnData){
				return self._serializeGridData(postData);
			};
			
			/*
			 * serializeGridData: Evento creado para seleccionar las filas y editar si estamos editando
			 */
			jqGrid[0].rup_gridProps.onAfterGridComplete = function (rowid, launchSelectEvent) {
				return self._onAfterGridComplete(rowid, launchSelectEvent);
			};
			
			// ################### INICIO SOBREESCRITURA MULTISELECCION ##################
			
			if (jqGrid.rup_grid("isMultiselect")) {
				
				jqGrid[0].rup_gridProps.resetSelection = function () {
					return self._resetSelection_multiselect();
				};
				
				jqGrid[0].rup_gridProps.onAfterSelectRow = function(rowid, select){
					return self._onAfterSelectRow_multiselect(rowid, select);
				};
				
				//Sobreescritura de la función para obtener las primary de toda la entidad
				jqGrid[0].rup_gridProps.selectAllGetPrimaryKeys = function () {
					return self._selectAllGetPrimaryKeys_multiselect();
				};
				
				jqGrid[0].rup_gridProps.onAfterSelectAll = function (aRowids, status, selectedRecords) {
					return self._onAfterSelectAll_multiselect(aRowids, status, selectedRecords);
				};
				
				jqGrid[0].rup_gridProps.onSelectAllRows = function () {
					return self._onSelectAllRows_multiselect();
				};
				jqGrid[0].rup_gridProps.onDeSelectAllRows = function () {
					return self._onDeSelectAllRows_multiselect();
				};
				
				jqGrid.data("defaultEventFunctions").onPaging_default = function (pgButton) {
					return self._onPaging_multiselect(pgButton);
				};

				jqGrid.data("defaultEventFunctions").onSortCol_default = function (index, iCol,	sortorder) {
					return self._onSortCol_multiselect(index, iCol,	sortorder);
				};
				
				//sobreescritura de la combo de cambio de paginacion
				var pgcnt = "pg_"+jqGrid[0].rup_gridProps.pagerName;
				$('.ui-pg-selbox',"#"+pgcnt).unbind("change");
				$('.ui-pg-selbox',"#"+pgcnt).bind("change",function() {
					
					var selectedRows=prop.selectedRows, newRowNum=this.value,combo=this, rowNum=jqGrid[0].p.rowNum;
					
					$(this).val(jqGrid[0].p.rowNum);
					
					self._checkSelectedElements(function(){
						$(combo).val(newRowNum);
						jqGrid.rup_grid("resetSelection");
						$.data(jqGrid[0] , "allSelected", null);
						$.data(jqGrid[0], "deSelectedPages",[]);
						jqGrid[0].p.page = Math.round(jqGrid[0].p.rowNum*(jqGrid[0].p.page-1)/newRowNum-0.5)+1;
						jqGrid[0].p.rowNum = newRowNum;
						jqGrid[0].grid.populate();
						return false;
					});
				});
			}
			// ################### FIN SOBREESCRITURA MULTISELECCION ##################
			
			
			// ################### INICIO SOBREESCRITURA EDICION EN LINEA ##################
			
			// si es editable hay que poner que se edite por click en la fila no por dblclick
			if (jqGrid.rup_grid("isEditable")) {
				
				/*
				 * Creacion de un formulario que alberga la tabla para permitir el envio de los campos creados al editar la linea
				 */
				var form = $("<form>").attr("id","detailForm_" + prop.name);
				
				jqGrid.wrap(form);
				prop.detailForm = $("#detailForm_" + prop.name);
				
				/*
				 * onCellSelect: Almacena en la propiedad selectedCell la columna en la que se ha clickado para editar la linea
				 */
				jqGrid.data("defaultEventFunctions").onCellSelect_default = function (rowid, iCol, cellcontent, e) {
					return self._onCellSelect_editline(rowid, iCol, cellcontent, e);
				};
				
				/*
				 * onAfterSelectRow: Realiza la edicion de la linea una vez haya sido seleccionada la fila.
				 */
				jqGrid[0].rup_gridProps.onAfterSelectRow = function (rowid, select) {
					self._onAfterSelectRow_editline(rowid, select);
				};
				
				/*
				 * onAfterDragAndDrop: 
				 */
				jqGrid[0].rup_gridProps.onAfterDragAndDrop = function (permutations) {
					self._onAfterDragAndDrop_editline(permutations);
				};
				
				/*
				 * resizeStart: Evento sobrescrito para hacer bien el redimensionado de los rup_combos
				 */
				jqGrid.data("defaultEventFunctions").resizeStart_default = function(event, index){//TODO meter el resize y el satrt stop;
					//Cursor cabecera [th]
					resize_cursors[0] = $('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-htable th:eq(1)').css('cursor');
					//Si no tiene ordenación, tendrá 'auto' y se autoasigna 'col-resize' por tanto se pone 'default'.
					if (resize_cursors[0] === 'col-resize') { 
						resize_cursors[0] = 'default';
					}
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-htable th').css('cursor', 'col-resize');
					
					//Cursor capa global cabecera [div]
					resize_cursors[1] = $('#gbox_' + self[0].id + ' .ui-jqgrid-sortable').css('cursor');
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-sortable').css('cursor', 'col-resize');
					
					//Cursor capa texto cabecera [div]
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-sortable div').css('cursor', 'col-resize');
					
					//Cursor span ordenación
					$('#gbox_GRID_' + self[0].id + ' .ui-grid-ico-sort').css('cssText', "cursor: col-resize !important;");
				};
				
				/*
				 * resizeStop: Evento sobrescrito para hacer bien el redimensionado de los rup_combos
				 */
				jqGrid.data("defaultEventFunctions").resizeStop_default = function(newwidth, index){
					//Restablecer cursores
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-htable th').css('cursor', resize_cursors[0]);
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-sortable').css('cursor', resize_cursors[1]);
					$('#gbox_GRID_' + self[0].id + ' .ui-jqgrid-sortable div').css('cursor', 'pointer');
					$('#gbox_GRID_' + self[0].id + ' .ui-grid-ico-sort').css('cssText', "cursor: pointer !important;");
					
					//Ajuste del tamaño del desplegable cuando se tiene editado un combo;
					$("#"+self[0].id +" ul.rup_combo[rup_combo_col_position = "+index+"]").width($("#"+self[0].id +" a.rup_combo[rup_combo_col_position = "+index+"]").width());
				};
			}
			
			// ################### FIN SOBREESCRITURA EDICION EN LINEA ##################
			
			/*
			 * VALIDACIONES
			 */
			
			if (jqGrid.rup_grid("isEditable")){
//				validationConfig = $.extend(validationConfig,{
//					errorPlacement: function(error, element) {
//					},
//					feedbackErrorConfig:{
//						getFieldName : function(self, form, field){
//							var key = field.attr("name");
//							var colModel = prop.jQueryGrid.rup_grid("getColModel");
//							var colNames = prop.jQueryGrid.rup_grid("getGridParam","colNames");
//							var encontrado = false;
//							for (var i=0;i<colModel.length && !encontrado;i=i+1){
//								if (colModel[i].name==key){
//									errorKey = colNames[i];
//									return errorKey;
//								}
//							}
//							return key;
//						}
//					}
//				});
				self.rup_maint("defineValidationConfig");
			}else{
				if (!prop.lazyLoadDetailForm){
					self.rup_maint("defineValidationConfig");
				}
			}
			
			
			
			// Si la propiedad loadOnStartUp indica que debe realizarse la carga al inicio
			if (jqGrid[0].rup_gridProps.loadOnStartUp) {
				//Lanzamos la busqueda una vez cargado todo
				self.rup_maint("search");
				if (!jqGrid.rup_grid("isMultiselect") && !jqGrid.rup_grid("isEditable")) {//si es multiseleccion o es editable no hay que mira los hijos 
					
					// Amacenamos el metodo onSelectRow definido en el grid
					var gridSelectRow = jqGrid[0].p.onSelectRow;
					jqGrid[0].p.onSelectRow = function (rowid, select) {//hay que lanzar la carga del segunso si hay padre
						var jqGrid = $(this);
						// Si se ha definido un metodo para el evento onSelectRow se ejecuta.
						if (gridSelectRow){
							gridSelectRow.call(jqGrid,[rowid, select]);
						}
						
						$("body").data("e_click_mnt", true);
						$("body").data("clicktimer_mnt" , window.setTimeout(function () {
					            if($("body").data("e_click_mnt")) {
									$("body").data("e_click_mnt", false);
									window.clearTimeout($("body").data("clicktimer_mnt"));
					            	clearTimeout($("body").data("clicktimer_mnt"));
					                $("body").data("clicktimer_mnt", null);
					            	if (t.data("_children")) {
										var ln = self.data("_children").length;
										for (var i = 0; i < ln; i++) {
											$("#" + self.data("_children"))[i].prop.jQueryGrid[0].p.ajaxGridOptions = {async: true};
											$("#" + self.data("_children"))[i].prop.jQueryGrid.rup_grid("setGridParam", { page: "rup" } );
											$("#" + self.data("_children"))[i].prop.jQueryGrid.rup_grid("reloadGrid");
										}
									}				                
					                //return true;
					            }
					    }, 300));
					};
				}
			}
			
			//Tratamiento para comportamiento de aspecto fluído (diseño líquido).
			$(jqGrid).bind("fluidWidth.resize", function(event, previousWidth, currentWidth){
				// Se redimensionan las capas contenidas en el mantenimiento
				$("#"+prop.name).children().width(currentWidth);
//				prop.searchForm.parent().width(currentWidth+3)
				// Se redimensiona el feedback
				var feedBackPaddingLeft = parseInt(prop.feedback.css("padding-left")),
					feedBackPaddingRight = parseInt(prop.feedback.css("padding-right"));
				prop.feedback.width(currentWidth - (feedBackPaddingLeft+feedBackPaddingRight));
				
				// Se redimensiona la toolbar
				if (prop.toolbar.autoAjustToolbar) {
					var toolbarPaddingLeft = parseInt(prop.toolbar.self.css("padding-left")),
					toolbarPaddingRight = parseInt(prop.toolbar.self.css("padding-right"));
					prop.toolbar.self.width(currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					prop.toolbar.self.css("width", currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
				}
			});
			
			if (jqGrid[0].rup_gridProps.width === "auto"){
				$(jqGrid).fluidWidth({
					fluidBaseLayer: jqGrid[0].rup_gridProps.fluidBaseLayer,
					minWidth: jqGrid[0].rup_gridProps.minWidth,
					maxWidth: jqGrid[0].rup_gridProps.maxWidth,
					fluidOffset: jqGrid[0].rup_gridProps.fluidOffset
				});
			}
			
			//ELLIPSIS EN CABECERAS
			$(jqGrid.rup_grid("getColModel")).each (function (index, element){
				//Si la columna define ellipsis...
				if (element.classes === "ui-ellipsis"){
					//Añadirle estilos para ellipsis al div que está dentro de la cabecera
					$("[id='jqgh_" + $(jqGrid).attr("id") + "_" + element.name+"']")
						.css("display", "block")
						.css("text-overflow", "ellipsis");

				}
				
				//Sustituir DIV del literal de la cabecera por SPAN (para que funcione ellipsis)
				var headerLabel = $("[id='jqgh_" + $(jqGrid).attr("id") + "_" + element.name+"']").children("div");
				$(headerLabel).replaceWith($("<span>").text($(headerLabel).text()).css("cursor","pointer"));
			});
	}
	});

	/* VALORES POR DEFECTO */
	$.fn.rup_maint.defaults = {
		//diseño líquido (fluid.js)
		contentPercentage : 0.90,
		fluidOffset: 0,
		fluid : true,
		clearSearchFormMode: "clear", // clear - reset
		detailButtons: $.rup.maint.detailButtons.SAVE_REPEAT,
		detailDiv: null,
		detailForm: null,
		detailServer: true,
		eventCreateDetailForm: undefined,
		feedback: null,
		imgPath: $.rup.RUP + "/basic-theme/images",
		jQueryGrid: null,
		lazyLoadDetailForm:false,
		modelObject: null, //referencia con el objecto de la Entidad,
		MODO: null,//"new",
		name: null,
		onafterDetailShow: null,
		onbeforeDetailShow: null,
		parent: null,
		primaryKey: null,//clave primaria del mantenimiento
		rupCheckStyle: true, //propiedad que indica si se muestran los mensajes causados por no ajustarse a ARISTA,
		searchForm: null,
		showFeedback: true,//para que se mantenga el area de feedback siempre
		showMessages: false,
		showMultiselectAlerts: true,
		toolbar : {
			autoAjustToolbar: true,
			createDefaultToolButtons: true,
			defaultAdd : true,
			defaultEdit : true,
			defaultCancel : true,
			defaultDelete : true,
			defaultFilter : true
		},	
		validation:null,
		validationMode: "individual", //validación de los campos del formulario de forma individual a la hora de perder el foco. Tambien puede ser por formulario, form.
		validationFilter: true,
		validationUrl:$.rup.CTX_PATH+"validate",
		filterExclude : new Array()
		//EVENTOS
		//Valores para comportamiento fluído
	};		
	
})(jQuery);


/*
 * Extension del rup_maint para la gestion del mantenimiento en modo multiseleccion
 * 
**/ 
(function ($) {
	
	/*
	 * Metodos publicos
	 * 
	 * selectRow(rowid, count): 
	 * deselectRow(rowid):
	 */
	$.fn.rup_maint("extend",{
		// Gestion de la multiseleccion
		selectRow : function(rowid, count){
			// console.log("maint - selectRow");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page, rowNum, pksForRow, deSelectedPages;
			// Obtenemos la pagina actual
			page = prop.jQueryGrid.rup_grid("getGridParam", "page");
			// Obtenemos el numero de linea
			rowNum = prop.jQueryGrid.rup_grid("getInd",rowid,false);
			// Obtenemos las primary keys para la linea
			pksForRow=self._getPrimaryKeysForRow(rowid);
			//En caso de que no exista la entrada correspondiente a la pagina actual la creamos
			if (prop.selectedRows["p_" + page]===undefined){
				prop.selectedRows["p_" + page]=[];
				prop.selectedRows.push(Number(page));
			}
			// En caso de no existir la entrada correspondiente a la linea del regitro la creamos
			if (prop.selectedRows["p_" + page]["l_"+rowNum]===undefined){
				prop.selectedRows["p_" + page]["l_"+rowNum]=[];
				prop.selectedRows["p_" + page].push(Number(rowNum));
			}
			// En caso de no existir la entrada correspondiente al identificador del registro la creamos
			if (prop.selectedRows["p_" + page]["l_"+rowNum]["id_" + rowid]===undefined){
				prop.selectedRows["p_" + page]["l_"+rowNum]["id_" + rowid]=pksForRow;
				prop.selectedRows["p_" + page]["l_"+rowNum].push(rowid);
				
				// Incrementamos el contador de registros seleccionados
				if(count===undefined || count ===true){
					prop.selectedRowsCont += 1;
					$.data(jqGrid[0] , "selectedRowsCont", Number($.data(jqGrid[0] , "selectedRowsCont") + 1));
				}
				// Almacenamos en el grid las primary keys para el registro
				jqGrid[0].rup_gridProps.allPksArray.push(pksForRow);
				
				deSelectedPages = $.data(jqGrid[0], "deSelectedPages");
				if (deSelectedPages!=undefined){
					ind = $.inArray(page, deSelectedPages!=undefined ? deSelectedPages:[]);
					if (ind > -1) {//es que esta dentro de las paginas deseleccionadas y hay que volver a meterlo
						
						deSelectedPages.splice(ind, 1);
						$.data(jqGrid[0] , "deSelectedPages", deSelectedPages);
					}
				}
			}
			prop.currentSelectedRow=rowid;
		},	
		deselectRow : function(rowid){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page, rowNum,pksForRow;
			// console.log("maint - deselectRow");
			// Obtenemos la pagina actual
			page = jqGrid.rup_grid("getGridParam", "page");
			// Obtenemos el numero de linea
			rowNum = jqGrid.rup_grid("getInd",rowid,false);
			// Obtenemos las primary keys para la linea
			pksForRow=self._getPrimaryKeysForRow(rowid);
			
			// Comprobamos si existe almacenada la pagina
			
			if (self._isSelected(rowid,null,page,rowNum)){
				delete prop.selectedRows["p_" + page]["l_"+rowNum];
				prop.selectedRows["p_" + page].splice($.inArray(rowNum, prop.selectedRows["p_" + page]),1);
//				delete prop.selectedRows["p_" + page]["l_"+rowNum]["id_" + rowid];
			}
			
			ind = $.inArray(pksForRow , jqGrid[0].rup_gridProps.allPksArray);
			jqGrid[0].rup_gridProps.allPksArray.splice(ind, 1);
			$.data(jqGrid[0] , "selectedRowsCont",Number($.data(jqGrid[0] , "selectedRowsCont") - 1));
			prop.selectedRowsCont -= 1; 
			
		}
	});
	
	/*
	 * Metodos privados
	 * 
	 * _isFirstSelectedElement(rowId): 
	 * _isLastSelectedElement(rowid):
	 * _isSelected(rowid, id, page, rowNum):
	 * _markSelectedRows_multiselect():{
	 * _onAfterSelectRow_multiselect(rowid, select):
	 * _onAfterSelectAll_multiselect(aRowids, status, selectedRecords):
	 * _onSelectAllRows_multiselect
	 * _onDeSelectAllRows_multiselect():
	 * _onPaging_multiselect(pgButton):
	 * _onSortCol_multiselect(index, iCol,	sortorder):
	 * _selectAllGetPrimaryKeys_multiselect():
	 * _resetSelection_multiselect():
	 */
	$.fn.rup_maint("extend",{
		defineDetailForm:function(){
			var self = this, prop = self[0].prop;
			/*
			 * Se comprueba si se ha especificado un formulario de detalle propio. 
			 * En ese caso de detalle no tenemos que crear los campos solo añadir la barra de navegación, 
			 * el area de feedback y los botones de acción.
			 */ 
			if (prop.detailForm !== null) {
				prop.customDetailForm = true;
				// Se almacena la referencia al formulario de detalle.
				prop.detailForm = $("#" + prop.detailForm).ajaxForm();
				// Se invoca la funcion _createDetailForm indicandole con el parametro true que se proporciona un formulario de detalle.
				self._createDetailForm(true);
			} else {
				prop.customDetailForm = false;
				// Se invoca la funcion _createDetailForm para la creacion del formulario completo
				self._createDetailForm();
			}

			// Se crea un dialogo sobre la capa del formulario de detalle
			prop.detailDiv.rup_dialog({type: jQuery.rup.dialog.DIV, autoOpen: false, modal: true, width: (prop.detailDivWidth!==undefined?prop.detailDivWidth:569), height: (prop.detailDivHeight!==undefined?prop.detailDivHeight:"auto"), specificLocation: prop.name, create: prop.eventCreateDetailForm, 
				open: function () {
					//Mover los UL de los posibles combos al nivel de la ventana de diálogo
					$(this).find(".ui-selectmenu-menu").each(function (index, element){
						$(element).appendTo($(element).parents(".ui-dialog"));
					});
					//Cambiar estilo diálogo para permitir que los combos puedan sobresalir de él
					$(".ui-dialog").css("overflow","visible");
					
					//Gestor de cambios
//					t[0].prop.detailForm.data('initialData', t[0].prop.detailForm.serialize());
					if ($.isFunction(prop.onafterDetailShow)) {
						prop.onafterDetailShow.call(self[0], prop.detailDiv);
					}
				},
				close: function (){
					//Seleccionar primero en selección simple
					if (!$(jqGrid).rup_grid("isEditable") //Formulario
							&& !$(jqGrid).rup_grid("isMultiselect") //Selección simple
							&& $(jqGrid).rup_grid("getGridParam",'selrow') === null){ //Ningún elemento seleccionado
						$(jqGrid).rup_grid("setSelection", $(jqGrid).rup_grid("getDataIDs")[0], false);
					}
				}
			});
			
			//Eliminamos los eventos del boton de cerrar para mostrar el gestor de cambios
			
			// Se elimina el evento de cerrar al texto de cierre del dialogo y se asigna el evento de la gestion de cambios. 
			prop.detailDiv.parent().find("#closeText_" + prop.detailDiv.first()[0].id).parent().unbind('click').bind("click", function () {
				self._checkDetailFormModifications(function(){
					prop.detailDiv.rup_dialog("close");
				});
			});
			
			// Se elimina el evento de cerrar al icono de cierre del dialogo y se asigna el evento de la gestion de cambios.
			prop.detailDiv.parent().find(".ui-dialog-titlebar-close").unbind('click').bind("click", function () {
				self._checkDetailFormModifications(function(){
					prop.detailDiv.rup_dialog("close");
				});
			});
			
			// Creacion de los controles del formulario de detalle
			self._createDetailButtons(prop.detailDiv);

			if($.rup_utils.aplicatioInPortal()){
				prop.detailDiv.dialog("widget").appendTo($("div.r01gContainer"));
			}else{
				prop.detailDiv.dialog("widget").appendTo("body");
			}
		},
		defineValidationConfig:function(){
			/*
			 * VALIDACIONES
			 */
			var self = this, prop = self[0].prop, colModel,jsonAux, configValidationRules, validationConfig;

			if (prop.validation!==null && prop.validation.rules!==undefined){
				validationConfig=$.extend({feedback:(jqGrid.rup_grid("isEditable")===true?prop.feedback:prop.detailFeedback)},prop.validation);
			}else{
				/*
				 * Obtenemos a partir de la configuracion indicada en el colModel las reglas 
				 * de validacion que se han de aplicar sobre los campos del formulario.
				 * Mediante las reglas indicadas en la propiedad validationrules del 
				 * colModel se compone el objeto rules que se indica al 
				 * componente de validaciones
				 */
				
				colModel = jqGrid.rup_grid("getColModel");
				jsonAux = $.map(colModel,function(elem){
					var json={};
				    if (elem.validationrules!==undefined){
				    	return {name:elem.name,value:elem.validationrules};
				    }else{
				        return null;
				    }
				});
				configValidationRules={};
				$.each(jsonAux, function(i,elem){
					configValidationRules[elem.name]=elem.value;
				});
				
				validationConfig = {
					rules:configValidationRules,
					feedback:(jqGrid.rup_grid("isEditable")===true?prop.feedback:prop.detailFeedback)
				};
			}
			
			
			if (jqGrid.rup_grid("isEditable")){
				validationConfig = $.extend(validationConfig,{
					errorPlacement: function(error, element) {
					},
					feedbackErrorConfig:{
						getFieldName : function(self, form, field){
							var key = field.attr("name");
							var colModel = prop.jQueryGrid.rup_grid("getColModel");
							var colNames = prop.jQueryGrid.rup_grid("getGridParam","colNames");
							var encontrado = false;
							for (var i=0;i<colModel.length && !encontrado;i=i+1){
								if (colModel[i].name==key){
									errorKey = colNames[i];
									return errorKey;
								}
							}
							return key;
						}
					}
				});
			}

			prop.detailForm.rup_validate(validationConfig);
		},
		_isFirstSelectedElement:function(rowId){
			var self = this, prop = self[0].prop, pageSorted, lineSorted;
			
			pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
			lineSorted = prop.selectedRows["p_"+pageSorted[0]].sort(function(a,b){return a - b;});
			
			if (lineSorted["l_"+lineSorted[0]][0]===rowId){
				return true;
			}else{
				return false;
			}
			
		},
		_isLastSelectedElement:function(rowId){
			var self = this, prop = self[0].prop, pageSorted, lineSorted;
			
			pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
			lineSorted = prop.selectedRows["p_"+pageSorted[pageSorted.length-1]].sort(function(a,b){return a - b;});
			
			if (lineSorted["l_"+lineSorted[lineSorted.length-1]][0]===rowId){
				return true;
			}else{
				return false;
			}
		},
		_isSelected : function(rowid, id, page, rowNum){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, rowNum,pksForRow;
			
			if (page===undefined){
				page = jqGrid.rup_grid("getGridParam", "page");
			}
			
			if (rowNum===undefined){
				rowNum = jqGrid.rup_grid("getInd",rowid,false);
			}
			
			if (prop.selectedRows["p_" + page]===undefined){
				return false;
			}
			
			if (prop.selectedRows["p_" + page]["l_"+rowNum]===undefined){
				return false;
			}
			
			if (prop.selectedRows["p_" + page]["l_"+rowNum]["id_" + rowid]===undefined){
				return false;
			}
			
			return true;
		},	
		_markSelectedRows_multiselect:function(){
			// console.log("_markSelectedRows_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, dataIDs, page, pageStored=false, rowsSelectedPage=0;
			// Obtenemos los identificadores de los registros de la pagina
			dataIDs = jqGrid.rup_grid("getDataIDs");
			// Obtenemos la pagina actual
			page = jqGrid.rup_grid("getGridParam", "page");
			// Recorremos los identificadores comprobando si ha sido seleccionado
			if (prop.selectedRows["p_" + page]!==undefined){
				pageStored=true;
			}
			for (var i = 0; i < dataIDs.length; i++) {
				rowNum = jqGrid.rup_grid("getInd",dataIDs[i],false);
				if (self._isSelected(dataIDs[i], null, page, rowNum)){
					jqGrid.rup_grid("setSelection", dataIDs[i], true);
					rowsSelectedPage++;
				}else if (!pageStored && $.data(jqGrid[0] , "allSelected") === true){
					self.rup_maint("selectRow",dataIDs[i], false);
					jqGrid.rup_grid("setSelection", dataIDs[i], true);
				}
			}
			if (prop.selectedRows["p_" + page] && prop.selectedRows["p_" + page].length === jqGrid.rup_grid("getDataIDs").length){
				$('#cb_' + jqGrid[0].id).attr('checked', true);
			} else {
				$('#cb_' + jqGrid[0].id).attr('checked', false);
			}
//			if ($.data(jqGrid[0] , "allSelected") === true){//si tengo que seleccionar todos
//				//si tengo la pagina y no son todos los registros a seleccionar
//				if (prop.selectedRows["p_" + page] && prop.selectedRows["p_" + page].length < jqGrid.rup_grid("getDataIDs").length) {//si tenemos menos filas en la pagina que el número de filas hay que quitar el check de selectAll
//					$('#cb_' + jqGrid[0].id).attr('checked', false);
//					//deseleccionamos el check de todos
//				}else{
//					$('#cb_' + jqGrid[0].id).attr('checked', true);
//				}
//			}
			$.data(jqGrid[0], "rowsSelectedPage", rowsSelectedPage); //Almacenar elementos página para descontarlo de selección de todos los elementos
			return false;
		},
		_onAfterSelectRow_multiselect: function (rowid, select) {
			// console.log("maint - _onAfterSelectRow_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page = jqGrid.rup_grid("getGridParam", "page"), selected, selectesElem = [], ind, selectedTotalRows;
			
			if (select) {//seleccionamos uno nuevo
				self.rup_maint("selectRow",rowid);
			} else {//deseleccionamos
				self.rup_maint("deselectRow",rowid);
			}
			selectedTotalRows = prop.selectedRowsCont;
			//deseleccionamos el select All
//			selectedTotalRows = self.rup_maint("getTotalSelectedRowNum");
			if ($('#cb_' + jqGrid[0].id).is(":checked")) {
				selectedTotalRows = Number($.data(jqGrid[0] , "selectedRowsCont")) - 1;
				$('#cb_' + jqGrid[0].id).attr('checked', false);
			}
			
			//actualizar num elementos seleccionados
//			if ($.data(jqGrid[0] , "allSelected") !== null && $.data(jqGrid[0] , "allSelected") !== undefined) {
				selectedTotalRows = Number($.data(jqGrid[0] , "selectedRowsCont"));
//			} else {
//				selectedTotalRows = prop.selectedRowsCont;
//			}
			
			
			// habilitar/deshabilitar los botones de editar y eliminar dependiendo de el nnumero de elementos seleccionados
			if (jqGrid.rup_grid("isMultiselect")) {
				if(selectedTotalRows>0){
					prop.toolbar.self.enableButton("edit");
					prop.toolbar.self.enableButton("delete");
				}else{
					prop.toolbar.self.disableButton("edit");
					prop.toolbar.self.disableButton("delete");
				}
			}
			if (prop.selectedRows["p_" + page] && prop.selectedRows["p_" + page].length === jqGrid.rup_grid("getDataIDs").length){
				$('#cb_' + jqGrid[0].id).attr('checked', true);
			} else {
				$('#cb_' + jqGrid[0].id).attr('checked', false);
			}
			
			$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html(selectedTotalRows + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
			
			$.data(jqGrid[0], "rowsSelectedPage", jqGrid.rup_grid("getGridParam", "selarrrow").length);
		},
		_onAfterSelectAll_multiselect : function(aRowids, status, selectedRecords){
			// console.log("maint - _onAfterSelectAll_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page, ind, selectedTotalRows, pksForRow, deSelectedPages;
			
			// Obtenemos la pagina actual
			page = jqGrid.rup_grid("getGridParam", "page");
			
			//Si estamos añadiendo y tenemos todos seleccionados
			//if (self[0].prop.MODO === "new") return false;
			if (status) {
				for (var j = 0; j < aRowids.length; j++) {
					self.rup_maint("selectRow",aRowids[j]);
				}
			} else { //si hay que deseleccionar
				for (var j = 0; j < aRowids.length; j++) {
					self.rup_maint("deselectRow",aRowids[j]);
				}
			}
			
			//actualizar num elementos seleccionados
//			if ($.data(jqGrid[0] , "allSelected") !== null && $.data(jqGrid[0] , "allSelected") !== undefined) {
//				selectedTotalRows = Number($.data(jqGrid[0] , "selectedRowsCont"));
//			} else {
//				selectedTotalRows = prop.selectedRowsCont;
//			}
			$.data(jqGrid[0] , "selectedRowsCont", selectedRecords);
			
			// se habilitan/desahabilitan los botones editar y eliminar dependiendo del nunmero de elementos seleccionados.
			if (selectedRecords>0){
				prop.toolbar.self.enableButton("edit");
				prop.toolbar.self.enableButton("delete");
			}else{
				prop.toolbar.self.disableButton("edit");
				prop.toolbar.self.disableButton("delete");
			}
			
			$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html(selectedRecords + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
		},		
		_onSelectAllRows_multiselect : function(){
			// console.log("maint - _onDeSelectAllRows_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page, rowNum,pksForRow;
			
			$.data(jqGrid[0] , "selectedRowsCont", jqGrid.rup_grid("getGridParam", "records"));
			$.data(jqGrid[0] , "allSelected", true);		
			jqGrid[0].rup_gridProps.allPksArray = [];
			prop.selectedRows=[];
			$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html(jqGrid.rup_grid("getGridParam", "records") + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
		},
		_onDeSelectAllRows_multiselect : function(){
			// console.log("maint - _onDeSelectAllRows_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, page, rowNum,pksForRow;
			
			$.data(jqGrid[0] , "selectedRowsCont", 0);
			$.data(jqGrid[0] , "allSelected", false);		
			jqGrid[0].rup_gridProps.allPksArray = [];
			prop.selectedRows=[];
			$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html("0 " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
			
		},	
		_onPaging_multiselect: function (pgButton) {
			// console.log("maint - _onPaging_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid;
			// Se comprueba si al paginar existen registros seleccionados que habian sido insertados en esa pagina
			var addedElements = $(this).find(" tr.addElement td input[type='checkbox'].cbox:checked");
			
			if (addedElements.length>0){
				//Existen elementos seleccionados que han sido insertados en la misma pagina.
				if(prop.showMultiselectAlerts){
					$.rup_messages("msgConfirm", {
						message: $.rup.i18nParse($.rup.i18n.base,"rup_maint.checkAddedSelectedElems"),
						title: $.rup.i18nParse($.rup.i18n.base,"rup_maint.changes"),
						OKFunction : function (pgButton) {
							self._deselectAddedElements();
						}
					});
				}else{
					self._deselectAddedElements();
				}
				return false;
			}
				
			// Si el usuario ha introducido el número de página comprobamos su valor
			if (pgButton == 'user') {
				var requestedPage = parseInt($('td.pagControls .ui-pg-input',$("#gbox_"+jqGrid[0].id)).val());
				if(requestedPage === 0){
					//Si se selecciona la página 0 colocamos la navegación en la primera
					jqGrid.setGridParam({page : 1});
				}else{
					// Si la página solicitada es mayor que la última se establece la navegación en la última página
					var lastPage = parseInt(jqGrid.getGridParam('lastpage'));
					if (requestedPage > lastPage) {
						jqGrid.setGridParam({page : lastPage});
					}
				}
			}
			
			return "";
			
		},
		_onSortCol_multiselect: function (index, iCol,	sortorder) {
			// console.log("maint - _onSortCol_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, sorting=prop.jQueryGrid.data("sorting");

			if (!sorting){
				self._checkSelectedElements(function(){
					prop.jQueryGrid.rup_grid("resetSelection");
					$.data(jqGrid[0] , "allSelected", null);
					$.data(jqGrid[0], "deSelectedPages",[]);
					jqGrid.data("sorting", true);
					jqGrid.jqGrid("sortGrid",index, iCol,	sortorder);
					window.setTimeout(function(){
						jqGrid.trigger("reloadGrid");
					}, 0);
					
				});
				jqGrid.data("sorting",false);
				$("#lui_"+jqGrid.attr("id")).hide();
				$("#load_"+jqGrid.attr("id")).hide();
				return 'stop';
			}else{
				jqGrid.data("sorting",false);
			}
		},
		_selectAllGetPrimaryKeys_multiselect : function () {
			// console.log("maint - _selectAllGetPrimaryKeys_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, data;
			if (prop.searchDivFunc===undefined){
				data = $.rup_utils.unnestjson(form2object(prop.searchForm[0]));
			} else {
				data = prop.searchDivFunc.call();
			}
			$.rup_ajax({                           
			      url:jqGrid.rup_grid("getGridParam", "url"),
			      dataType: 'json',
			      type: "GET",
			      data: data,
			      contentType: 'application/json',             
			      success: function (pks, ajaxOptions) {
						var colPks = self.rup_maint("getPrimaryKey").split(";"), pksArray = [], aux = "";
						for (var j = 0; j < pks.length; j++) {
							if (colPks.length > 1) {
								for (var i = 0; i < colPks.length; i++) {
									aux =  aux + "/" + pks[j][colPks[i]];
								}
							} else {
								aux = "/" + pks[j][colPks[0]];
							}
							pksArray.push(aux);
							aux = "";
						}
						jqGrid[0].rup_gridProps.allPksArray = pksArray;
						//actualizar num elementos seleccionados
						$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html(pksArray.length + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
						$.data(jqGrid[0] , "allSelected",true);
						//quitamos todas las posibles selecciones que se hayan podido realizar
						var page = jqGrid.rup_grid("getGridParam", "page");
						for (var i=0;i<prop.selectedRows.length;i=i+1){
							if (!prop.selectedRows[i]==="p_"+page){
								delete prop.selectedRows[i];
							}
						}
//						prop.selectedRows = [];
						prop.selectedRowsCont = pksArray.length;
						pksArray = null;
					},
			      error: function (xhr, ajaxOptions, thrownError) {
			      },
			      beforeSend: function (xhr) {
			    	  var colPks = self.rup_maint("getPrimaryKey").split(";"), objJson = {};
						if (colPks.length > 1) {
							for (var i = 0; i < colPks.length; i++) {
								objJson[colPks[i]] = colPks[i];
							}
						} else {
							objJson[colPks[0]] = colPks[0];
						}
			    	  xhr.setRequestHeader("RUP", $.toJSON(objJson));
			    	  colPks = null;
			    	  
			    	  if ($.isFunction(jqGrid[0].rup_gridProps.onSelectAllGetPKs)){
			    		  jqGrid[0].rup_gridProps.onSelectAllGetPKs.call(this, xhr);
			    	  } else if ($.isPlainObject(jqGrid[0].rup_gridProps.onSelectAllGetPKs)){
			    		  jqGrid[0].rup_gridProps.onSelectAllGetPKs.pre.call(this, xhr);
			    	  }
			      },
			      complete : function (xhr, textStatus){
			    	  if ($.isFunction(jqGrid[0].rup_gridProps.onSelectAllGetPKs)){
			    		  jqGrid[0].rup_gridProps.onSelectAllGetPKs.call(this, xhr);
			    	  } else if ($.isPlainObject(jqGrid[0].rup_gridProps.onSelectAllGetPKs)){
			    		  jqGrid[0].rup_gridProps.onSelectAllGetPKs.post.call(this, xhr);
			    	  }
			      }
			});
		},
		_resetSelection_multiselect: function () {
			// console.log("maint - _resetSelection_multiselect");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid;
			prop.selectedRows=[];
			jqGrid.jqGrid("resetSelection");
			prop.selectedRowsCont=0;
			$('#' + jqGrid[0].rup_gridProps.pagerName + '_left').html(prop.selectedRowsCont + " " + $.rup.i18nParse($.rup.i18n.base,"rup_grid.pager.selected"));
			prop.toolbar.self.disableButton("edit");
			prop.toolbar.self.disableButton("delete");
		}
		
	});
})(jQuery);


/*
 * Extension del rup_maint para la gestion del mantenimiento en modo edicion en linea
 * 
**/ 
(function ($) {
	$.fn.rup_maint("extend",{
		// Cancela la edicion de un registro en un mantenimiento de edicion en linea
		cancelEditing : function () {
			return this.each(function(){
				var prop=this.prop; 
				
				if (prop.MODO === "new") {//Si hemos pulsado nuevo y cancleamos hayq ue borrar la fila
					prop.jQueryGrid.rup_grid("delRowData",prop.jQueryGrid.rup_grid("getGridParam",'selrow'));
				} else {
					prop.jQueryGrid.rup_grid("restoreRow", prop.lastsel);
					$(this).rup_maint("ellipsisRestoreOnEdit");
				}
				
				prop.lastsel=null;
				
				prop.toolbar.self.disableButton("cancel");
				prop.toolbar.self.enableButton("new");
				prop.toolbar.self.enableButton("filter");
				prop.toolbar.self.enableButton("delete");
				
				prop.feedback.rup_feedback("close");
				
				//Eliminar fila añadida
				var id = this.prop.jQueryGrid.rup_grid("getDataIDs").length-1;
				$("#"+id, jqGrid).remove();
			});
		},
		newElementEditable : function () {//Muestra el formulario de adición y pone el mantenimiento en modo alta.
			return this.each(function () {
				if (this.prop.jQueryGrid.rup_grid("isEditing")) {
					//Si estoy editando alguna fila tengo que guardar
					if (this.prop.MODO === "new") {//si estsmos dando de alta un registro e intentamos volver a pulsar el boton de nuevo
						$("#" + this.prop.lastsel + " .editable:first", this.prop.jQueryGrid).focus();
						return false;
					}
					this.prop.jQueryGrid.rup_grid('saveRow', this.prop.lastsel, rup_maint.saveEditableSucces, "clientArray", null, rup_maint.aftersavefunc, rup_maint.saveEditableError, null);
				}	
				this.prop.MODO = "new";
				var ids = this.prop.jQueryGrid.rup_grid("getDataIDs"), numTotal = ids.length;
				this.prop.jQueryGrid.rup_grid("addRowData", numTotal, {}, "first");
				this.prop.jQueryGrid.rup_grid("setSelection", numTotal, false);
				this.prop.selectedCell = 0;
				$(this)[0].prop.toolbar.self.disableButton("filter");
				$(this)[0].prop.toolbar.self.disableButton("delete");
				
				obj = this.prop.jQueryGrid;
				
				//$(this).rup_maint("editElement", numTotal, true);//True para que no cambie el modo nochangemode
				
				//Click para editar fila
				$("#"+numTotal, jqGrid).children().first().click();
			});
					
		}
	});
	
	// Funciones privadas
	$.fn.rup_maint("extend",{
		// Cancela la edicion de un registro en un mantenimiento de edicion en linea
		_checkValidRowId_editline: function(id, invalidCallback){
			var self = this, prop = self[0].prop;
			
			return self._checkValidRowId(id, function(){
				prop.feedback.rup_feedback("set", $.rup.i18nParse($.rup.i18n.base,"rup_maint.invalidRowId"), "error");
				prop.toolbar.self.disableButton("cancel");
				prop.toolbar.self.enableButton("filter");
				prop.toolbar.self.enableButton("new");
				prop.toolbar.self.enableButton("delete");
			});
			
		},
		_onCellSelect_editline: function (rowid, iCol, cellcontent,	e) {
			// console.log("maint - _onCellSelect_editline");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, rowColModel;
			
			prop.selectedCell = iCol;
			
			rowColModel = jqGrid.rup_grid("getColModel");
			$("#" + rowid +"_"+rowColModel[prop.selectedCell].name , jqGrid).focus();
			return true;
		},
		_onAfterSelectRow_editline: function (rowid, select) {
			// console.log("maint - _onAfterSelectRow_editline");
			var self = this, prop = self[0].prop;

			if (rowid !== prop.lastsel){
//				prop.lastsel=rowid;
				self.rup_maint("editElement", rowid);
			}
		},
		_onAfterDragAndDrop_editline:function (permutations) {
			// console.log("maint - _onAfterDragAndDrop_editline");
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, ret, rowColModel, firstInput, rowN = this.rup_grid("getSelectedRows")[0],
			mntName = $.data(jqGrid, "maintName"), lastColName;;
			
			if (!jqGrid.rup_grid("isEditing")) {
				return false;
			} 
			
			rowColModel = jqGrid.rup_grid("getColModel");
			lastColName = rowColModel[rowColModel.length - 1].name;
			$(".editable").unbind("keydown");
			$("input[name='" + lastColName + "']", jqGrid).bind("keydown", function(event) {	
				var numPag = 0, page = jqGrid.rup_grid("getGridParam", "page");
				if (event.keyCode == 9) { // TAB
					if (!event.shiftKey) {
						if ($(this).hasClass("hasDatepicker")) {
							$(this).datepicker("hide");
						}
						jqGrid.rup_grid('saveRow', rowN, rup_maint.saveEditableSucces, "clientArray", null, rup_maint.aftersavefunc, rup_maint.saveEditableError, null);
						if (rowN == jqGrid.rup_grid("getDataIDs").length) {//si es la ultima fila hay que paginar y poner la primera en edicion
							numPag = jqGrid.rup_grid("getGridParam", 'lastpage');//Math.ceil(settings.jQueryGrid.rup_grid("getGridParam", 'records') / settings.jQueryGrid.rup_grid("getGridParam", 'rowNum'));
							if (parseFloat(page) + 1 <= numPag) {
								jqGrid[0].p.ajaxGridOptions = {async: false};
								jqGrid.rup_grid("setGridParam", {page: parseFloat(page) + 1});
								jqGrid.rup_grid("reloadGrid");
								jqGrid[0].p.ajaxGridOptions = {async: true};
								//seleccionamos la primera fila
								rowN = 0;
							} else {
								return false;
							}
						}
						jqGrid.rup_grid("setSelection", Number(rowN) + 1, false);
						$("#" + mntName).rup_maint("editElement", Number(rowN) + 1);
						$("body").data("clicktimer" , window.setTimeout(function () {
							$("#" + Number(rowN+1) + " .editable:first", relatedGrid).focus();
						}, 0));
						return false;
					}
				}
			});		
			
			firstColName = rowColModel[0].name;
			$("input[name='" + firstColName + "']", relatedGrid).bind("keydown", function(event) {	
				var numPag = 0, page = relatedGrid.rup_grid("getGridParam", "page");
				if (event.keyCode == 9) { // TAB
					if (event.shiftKey) {
						if ($(this).hasClass("hasDatepicker")) {
							$(this).datepicker("hide");
						}
						relatedGrid.rup_grid('saveRow', rowN, rup_maint.saveEditableSucces, "clientArray", null, rup_maint.aftersavefunc, rup_maint.saveEditableError, null);
						//$("#" + mntName).rup_maint("saveMaint");
						//relatedGrid.rup_grid("saveRow", rowId);
						if (rowN == 1) {//si es la ultima fila hay que paginar y poner la primera en edicion
							if (parseFloat(page)> 1) {
								relatedGrid[0].p.ajaxGridOptions = {async: false};
								relatedGrid.rup_grid("setGridParam", {page: parseFloat(page) -1});
								relatedGrid.rup_grid("reloadGrid");
								relatedGrid[0].p.ajaxGridOptions = {async: true};
								//seleccionamos la primera fila
								rowN = relatedGrid.rup_grid("getDataIDs").length+1;
							} else {
								return false;
							}
						}
						relatedGrid.rup_grid("setSelection", Number(rowN-1), false);
						$("#" + mntName).rup_maint("editElement", Number(rowN-1) );
						$("body").data("clicktimer" , window.setTimeout(function () {
							$("#" + Number(rowN-1) + " .editable:last", relatedGrid).focus();
						}, 0));
						return false;
					}
				}
			});
		}
	});
	
})(jQuery);


/*
 * Extension del rup_maint para la gestion formulario de detalle en los mantenimientos multiseleccion y edicion simple
 * 
**/ 
(function ($) {
	$.fn.rup_maint("extend",{
		
		_editFirstElement:function(){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, firstElement, page;
			firstElement = self._getFirstElement();
			page = jqGrid.rup_grid("getGridParam", "page");
			
			if (page!==firstElement.page){
				jqGrid.rup_grid("setGridParam", {page: firstElement.page});
				jqGrid.rup_grid("reloadGrid", reloadGrid_callback_first);
			} else {
				reloadGrid_callback_first();
			}
			
			function reloadGrid_callback_first(){
				if (firstElement.rowId===undefined){
					firstElement.rowId=jqGrid.rup_grid("getDataIDs")[0];
				}
				if (!jqGrid.rup_grid("isMultiselect")) {
					//jqGrid.rup_grid("setSelection", firstElement.rowId, false);
					jqGrid.find("#"+firstElement.rowId).click();
				}
				
				prop.currentSelectedRow=firstElement.rowId;
				
				self.rup_maint("editElement", firstElement.rowId);
			}
		},
		_editLastElement:function(){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, firstElement, page, dataIds;
			lastElement = self._getLastElement();
			page = jqGrid.rup_grid("getGridParam", "page");
			
			if (page!==lastElement.page){
				jqGrid.rup_grid("setGridParam", {page: lastElement.page});
				jqGrid.rup_grid("reloadGrid", reloadGrid_callback_last);
			} else {
				reloadGrid_callback_last();
			}
			
			function reloadGrid_callback_last(){
				if (!jqGrid.rup_grid("isMultiselect")) {
					dataIds = jqGrid.rup_grid("getDataIDs");
					lastElement.rowId=dataIds[dataIds.length-1];
					//jqGrid.rup_grid("setSelection", lastElement.rowId, false);
					jqGrid.find("#"+lastElement.rowId).click();
				}else{
					if (lastElement.rowId===undefined){
						dataIDs = jqGrid.rup_grid("getDataIDs");
						lastElement.rowId=dataIDs[dataIDs.length-1];
					}
				}
				prop.currentSelectedRow=lastElement.rowId;
				self.rup_maint("editElement", lastElement.rowId);
			}
		},
		_editNextElement:function(){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, pageChanged=false,
				nextElement = self._getNextElement(prop.currentSelectedRow),
				page = jqGrid.rup_grid("getGridParam", "page");
			
			if (page!==nextElement.page){
				pageChanged = true;
				jqGrid.rup_grid("setGridParam", {page: nextElement.page});
				jqGrid.rup_grid("reloadGrid", reloadGrid_callback_next, nextElement);
			} else {
				reloadGrid_callback_next(nextElement);
			}
			
			function reloadGrid_callback_next(nextElement){
				if (!jqGrid.rup_grid("isMultiselect")) {
					var prueba = jqGrid.rup_grid("getDataIDs");
					if (pageChanged){
						nextElement.rowId=jqGrid.rup_grid("getDataIDs")[0];
					}else{
						nextElement.rowId=jqGrid.rup_grid("getDataIDs")[nextElement.line-1];
					}
					//jqGrid.rup_grid("setSelection", nextElement.rowId, false);
					jqGrid.find("#"+nextElement.rowId).click();
				}else{
					if (nextElement.rowId===undefined){
						nextElement.rowId=jqGrid.rup_grid("getDataIDs")[0];
					}
				}
				prop.currentSelectedRow=nextElement.rowId;
				self.rup_maint("editElement", nextElement.rowId);
			}
		},
		_editPreviousElement:function(){
			var self = this, prop = self[0].prop, jqGrid = prop.jQueryGrid, pageChanged=false,
				previousElement = self._getPreviousElement(prop.currentSelectedRow),
				page = jqGrid.rup_grid("getGridParam", "page"), dataIDs,
				pageChanged = false;
			
			if (page!==previousElement.page){
				pageChanged = true;
				jqGrid.rup_grid("setGridParam", {page: previousElement.page});
				jqGrid.rup_grid("reloadGrid", reloadGrid_callback_previous);
			} else {
				reloadGrid_callback_previous();
			}

			function reloadGrid_callback_previous(){
				if (!jqGrid.rup_grid("isMultiselect")) {
					if (pageChanged){
						var dataIds = jqGrid.rup_grid("getDataIDs");
						previousElement.rowId=dataIds[dataIds.length-1];
					}else{
						previousElement.rowId=jqGrid.rup_grid("getDataIDs")[previousElement.line-1];
					}
					//jqGrid.rup_grid("setSelection", previousElement.rowId, false);
					jqGrid.find("#"+previousElement.rowId).click();
				}else{
					if (previousElement.rowId===undefined){
						dataIDs = jqGrid.rup_grid("getDataIDs");
						previousElement.rowId=dataIDs[dataIDs.length-1];
					}
				}
				prop.currentSelectedRow=previousElement.rowId;
				self.rup_maint("editElement", previousElement.rowId);
			}
		},
		_getCurrentDetailIndex: function(rowId) {
			var self = this, prop = self[0].prop, page, cont=0, pageSorted, lineSorted, indexPage, indexLine, rowsPerPage, totalElements, allSelected;
			// Obtenemos la pagina actual
			page = prop.jQueryGrid.rup_grid("getGridParam", "page");
			// Obtenemos el numero de linea
			rowNum = parseInt(prop.jQueryGrid.rup_grid("getInd",rowId,false));
			// Numero de registros por pagina que se visualizan
			rowsPerPage = prop.jQueryGrid.rup_grid("getGridParam", "rowNum");
			// Flag de todos los registros seleccionados
			allSelected = $.data(prop.jQueryGrid[0] , "allSelected");
			// Comprobacion de si el mantenimiento es multiseleccion
			if (prop.jQueryGrid.rup_grid("isMultiselect")) {
				// Numero total de elementos es igual al numero de elementos seleccionados
				totalElements = prop.selectedRowsCont;
				// Obtenemos un array de paginas seleccionadas en orden ascendente
				pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
				// Se recorre el array ordenado de paginas seleccionadas
				for (var i=0;i<pageSorted.length;i=i+1){
					if (pageSorted[i]<parseInt(page)){
						// En caso de ser una pagina anterior a la actual se contabilizan el numero de registros seleccionados
						cont+=prop.selectedRows["p_"+pageSorted[i]].length;
					}else if (pageSorted[i]===parseInt(page)){
						// En caso de ser la pagina actual se contabilizan la posicion del registro entre los registros seleccionados
						// Obtenemos un array ordenado delineas seleccionadas en orden ascendente
						lineSorted = prop.selectedRows["p_"+pageSorted[i]].sort(function(a,b){return a - b;});
						//indexLine = lineSorted.indexOf(rowNum);
						if (!isNaN(rowNum)){
							indexLine = $.inArray(rowNum, lineSorted);
						} else {
							indexLine = 0;
						}
						cont+=indexLine+1;
					}				
				}
				// En el caso de estar todos los registros seleccionados se contabilizan las paginas anteriores a la actual que no han sido contabilizadas anteriormente
				if ((allSelected !== null) && (allSelected === true)){
					//indexPage = pageSorted.indexOf(parseInt(page));
					indexPage = $.inArray(parseInt(page), pageSorted);
					cont+= (parseInt(page)-(indexPage+1))*parseInt(rowsPerPage);
				}
			}else{
				// En caso de no tratarse de un mantenimiento de multiseleccion se obtienen el index del registro actual y el total a partir de los parametros del grid
				totalElements = prop.jQueryGrid.rup_grid("getGridParam", "records");
				cont = ((parseInt(page) * parseInt(rowsPerPage)) - parseInt(rowsPerPage) + rowNum);
			}
			// Retornamos un objeto json con el identificador actual del registro y el total existente 
			return {current:cont, total:totalElements};
		},
		_getDetailUrl: function(rowId){
			var self = this, prop = self[0].prop,
			selectedRows = prop.jQueryGrid.rup_grid("getSelectedRows"), 
			detailURL = prop.jQueryGrid[0].rup_gridProps.url,
			colPks = prop.primaryKey.split(";"); 
			
			if (prop.jQueryGrid.rup_grid("isMultiselect") === false) {
				if (colPks.length > 1) {
					for (var i = 0; i < colPks.length; i++) {
						detailURL = detailURL + "/" + prop.jQueryGrid.rup_grid("getCol", selectedRows[0], colPks[i]); 
					}
				} else {
					if (self._getPrimaryKeysForRow(rowId) === "/false"){
						detailURL = detailURL + "/" + rowId;
					}else{
						detailURL = detailURL + "/" + prop.jQueryGrid.rup_grid("getCol", selectedRows[0], colPks[0]);
					}
				}
			} else {
				// Si es multiseleccion se obtiene identidicador utilizado en la peticion
				if (self._getPrimaryKeysForRow(rowId) !== "/false"){
					detailURL = detailURL + self._getPrimaryKeysForRow(rowId);//selectedRows[0]];
				} else {
					detailURL = detailURL + "/" + rowId;
				}
				return detailURL;
				
			}
			
			return detailURL;
		},
		_getFirstElement:function(page){
			var self = this, prop = self[0].prop, pageSorted, lineSorted, line, returnElem, rowId, newPage=page, allSelected = $.data(prop.jQueryGrid[0] , "allSelected"), lastPage = $.data(jqGrid[0], "numPags"), finded=false;

			if (prop.jQueryGrid.rup_grid("isMultiselect")) {
				
				// Se comprueba si se ha indicado pro parametro una pagina concreta de la que recuperar el primer elemento
				if (page!==undefined){
					if (prop.selectedRows["p_"+page]!==undefined && prop.selectedRows["p_"+page].length >0){
						// En caso de existir registros seleccionados en la pagina, se devuelve el primer elemento de la misma 
						return self._getFirstSelectedLine(page);
					}
				}
				
				// Si se han seleccionado todos los registros
				if (allSelected){
					// Se recorren las paginas desde el inicio
					for(var p=1;p<=lastPage;p++){
						// En el caso de que se haya seleccionado un registro de esa pagina
						if (prop.selectedRows["p_"+p]!==undefined && prop.selectedRows["p_"+p].length >0){
							return self._getFirstSelectedLine(p);
							break;
						}else if (prop.selectedRows["p_"+p]===undefined){
							// En el caso de que la pagina no haya sido seleccionada y deba ser tenida en cuenta por estar activo el flag allSelected, se retorna la primera linea para esa pagina
							newPage=p;
							line=0;
							break;
						}
					}
				}else{
					// En caso de no haberse seleccionado todos los elementos, se devuelve el primer elemento seleccionado de la primera pagina registrada.
					pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
					
					$.each(pageSorted, function(i,p){
						if (prop.selectedRows["p_"+p]!==undefined && prop.selectedRows["p_"+p].length >0){
							newPage=p;
							returnElem = self._getFirstSelectedLine(p);
							return false;
						}
					});
					
					return returnElem;
				}
			}else{
				newPage=1;
				line=0;
			}
			
			return {"page":newPage.toString(), "line":line.toString(), "rowId":rowId};
		},
		_getFirstSelectedLine:function(page){
			var self = this, prop = self[0].prop, lineSorted, line, rowId;
			
			if (prop.selectedRows["p_"+page] !== undefined && prop.selectedRows["p_"+page].length >0){
				lineSorted = prop.selectedRows["p_"+page].sort(function(a,b){return a - b;});
				line = lineSorted[0];
				rowId = prop.selectedRows["p_"+page]["l_"+line][0];
				return {"page":page.toString(),"line":line.toString(), "rowId":rowId};
			}else{
				return {"page":page,"line":"0", "rowId":undefined};
			}
			
		},
		_getLastElement:function(page){
			var self = this, prop = self[0].prop, pageSorted, rowPerPage, lineSorted, line, rowId, newPage, allSelected = $.data(prop.jQueryGrid[0] , "allSelected"),
			jqGrid = prop.jQueryGrid, lastPage = $.data(jqGrid[0], "numPags");
			
//			rowPerPage = jqGrid.rup_grid("getGridParam", "page");
			
			if (prop.jQueryGrid.rup_grid("isMultiselect")) {
				
				// Se comprueba si se ha indicado pro parametro una pagina concreta de la que recuperar el primer elemento
				if (page!==undefined){
					if (prop.selectedRows["p_"+page]!==undefined && prop.selectedRows["p_"+page].length >0){
						// En caso de existir registros seleccionados en la pagina, se devuelve el primer elemento de la misma 
						return self._getLastSelectedLine(page);
					}
				}
				
				// Si se han seleccionado todos los registros
				if (allSelected){
					// Se recorren las paginas desde el inicio
					for(var p=lastPage;p>0;p--){
						// En el caso de que se haya seleccionado un registro de esa pagina
						if (prop.selectedRows["p_"+p]!==undefined && prop.selectedRows["p_"+p].length >0){
							return self._getLastSelectedLine(p);
							break;
						}else if (prop.selectedRows["p_"+p]===undefined){
							// En el caso de que la pagina no haya sido seleccionada y deba ser tenida en cuenta por estar activo el flag allSelected, se retorna la primera linea para esa pagina
							newPage=p;
							line=-1;
							break;
						}
					}
				}else{
					// En caso de no haberse seleccionado todos los elementos, se devuelve el ultimo elemento seleccionado de la ultima pagina registrada.
					pageSorted = prop.selectedRows.sort(function(a,b){return b - a;});
					
					$.each(pageSorted, function(i,p){
						if (prop.selectedRows["p_"+p]!==undefined && prop.selectedRows["p_"+p].length >0){
							newPage=p;
							returnElem = self._getLastSelectedLine(p);
							return false;
						}
					});
					
					return returnElem;
				}
			}else{
				newPage = lastPage;
				line = -1;
			}
			
			return {"page":newPage.toString(), "line":line.toString(), "rowId":rowId};
		},
		_getLastSelectedLine:function(page){
			var self = this, prop = self[0].prop, lineSorted, line, rowId;
			
			if (prop.selectedRows["p_"+page] !== undefined && prop.selectedRows["p_"+page].length >0){
				lineSorted = prop.selectedRows["p_"+page].sort(function(a,b){return b - a;});
				line = lineSorted[0];
				rowId = prop.selectedRows["p_"+page]["l_"+line][0];
				return {"page":page.toString(),"line":line.toString(), "rowId":rowId};
			}else{
				return {"page":page,"line":"0", "rowId":undefined};
			}
			
		},
		_getNextElement:function(rowId){
		
			var self = this, prop = self[0].prop, page, rowLine, selectedRows, newPage, newLine, rowId, newRowId, allSelected = $.data(prop.jQueryGrid[0] , "allSelected"), pageSorted, lineSorted, posicionLine;
			
			page = self[0].prop.jQueryGrid.rup_grid("getGridParam", "page");
			newPage=page;
			var lastPage = $.data(jqGrid[0], "numPags");
			if (prop.jQueryGrid.rup_grid("isMultiselect")) {
				
				rowLine = prop.jQueryGrid.rup_grid("getInd",rowId,false);
				
				// Se obtiene la pagina actual
				pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
				lineSorted = prop.selectedRows["p_"+page].sort(function(a,b){return a - b;});
				
				// Obtenemos la posicion de la linea en el array de seleccionados
				//posicionLine = lineSorted.indexOf(rowLine);
				posicionLine = $.inArray(rowLine, lineSorted);
				
				newLine=rowLine;
				
				if (rowLine===lineSorted[lineSorted.length-1]){
				//if (rowLine===prop.jQueryGrid.rup_grid("getGridParam", "rowNum")){
					// Es el ultimo elemento de la pagina. Debemos paginar a la siguiente
					//posicionPage = pageSorted.indexOf(parseInt(page));
					posicionPage = $.inArray(parseInt(page), pageSorted);
					
					for(var i=parseInt(page)+1;i<=lastPage;i++){
						if (allSelected && prop.selectedRows["p_"+i]===undefined){
							newPage=i;
							newLine=0;
							break;
						}else if (prop.selectedRows["p_"+i].length>0){
							newPage=i;
							newLine=prop.selectedRows["p_"+newPage][0];
							break;
						}
					}
					// Debe existir una pagina siguiente porque si no seria el ultimo elemento
				}else{
					newLine=prop.selectedRows["p_"+newPage][posicionLine+1];
					if (newLine === undefined){
						newLine=prop.selectedRows["p_"+newPage][posicionLine];
					}
				}

				if (prop.selectedRows["p_"+newPage]!==undefined && prop.selectedRows["p_"+newPage]["l_"+newLine]!==undefined && prop.selectedRows["p_"+newPage]["l_"+newLine].length>0){
					newRowId=prop.selectedRows["p_"+newPage]["l_"+newLine][0];
				}
			}else{
				selectedRows = prop.jQueryGrid.rup_grid("getSelectedRows");
				rowLine = parseInt(prop.jQueryGrid.rup_grid("getInd",selectedRows[0],false));
				
				newLine=rowLine;
				
				rowsPerPage = parseInt(prop.jQueryGrid.rup_grid("getGridParam", "rowNum"));
				var lastPage = Math.ceil(prop.jQueryGrid.jqGrid('getGridParam','records') / prop.jQueryGrid.rup_grid("getGridParam", "rowNum"));
				if (rowLine===rowsPerPage){
					if (parseInt(page)<lastPage){
						newPage=parseInt(newPage)+1;
						newLine=0;
					}
				}else{
					newLine+=1;
				}
			}
			
			return {"page":newPage.toString(), "line":newLine.toString(), "rowId":newRowId};
			
		},
		_getPreviousElement:function(rowId){
			
			var self = this, prop = self[0].prop, rowLine, rowId, newRowId, allSelected = $.data(prop.jQueryGrid[0] , "allSelected");
			
			// Comprobamos si se trata del ultimo elemento
//			if (self._isFirstSelectedElement(rowId)){
//				return false;
//			}
			var lastPage = $.data(jqGrid[0], "numPags");
			var page = self[0].prop.jQueryGrid.rup_grid("getGridParam", "page");
			var newPage=page;
			
			if (prop.jQueryGrid.rup_grid("isMultiselect")) {
			
				rowLine = prop.jQueryGrid.rup_grid("getInd",rowId,false);
				
				// Se obtiene la pagina actual
				var page = self[0].prop.jQueryGrid.rup_grid("getGridParam", "page");
				
				var pageSorted = prop.selectedRows.sort(function(a,b){return a - b;});
				var lineSorted = prop.selectedRows["p_"+page].sort(function(a,b){return a - b;});
				
				// Obtenemos la posicion de la linea en el array de seleccionados
				//var posicionLine = lineSorted.indexOf(rowLine);
				posicionLine = $.inArray(rowLine, lineSorted);
				
				var newPage=page;
				var newLine=rowLine;
				
				if (rowLine===lineSorted[0]){
					// Es el ultimo elemento de la pagina. Debemos paginar a la siguiente
					//var posicionPage = pageSorted.indexOf(parseInt(page));
					posicionPage = $.inArray(parseInt(page), pageSorted);
					
					for(var i=parseInt(page)-1;i>0;i--){
						if (allSelected && prop.selectedRows["p_"+i]===undefined){
							newPage=i;
							newLine=-1;
							break;
						}else if (prop.selectedRows["p_"+i].length>0){
							newPage=i;
							newLine=prop.selectedRows["p_"+newPage][prop.selectedRows["p_"+newPage].length-1];
							break;
						}
					}
					// Debe existir una pagina siguiente porque si no seria el ultimo elemento
				}else{
					newLine=prop.selectedRows["p_"+newPage][posicionLine-1];
				}
				
				if (prop.selectedRows["p_"+newPage]!==undefined && prop.selectedRows["p_"+newPage]["l_"+newLine]!==undefined && prop.selectedRows["p_"+newPage]["l_"+newLine].length>0){
					newRowId = prop.selectedRows["p_"+newPage]["l_"+newLine][0];
				}
			}else{
				selectedRows = prop.jQueryGrid.rup_grid("getSelectedRows");
				rowLine = parseInt(prop.jQueryGrid.rup_grid("getInd",selectedRows[0],false));
				
				newLine=rowLine;
				
				rowsPerPage = parseInt(prop.jQueryGrid.rup_grid("getGridParam", "rowNum"));
				
				if (rowLine===1){
					if (parseInt(page)>1){
						newPage=parseInt(newPage)-1;
						newLine=rowsPerPage;
					}
				}else{
					newLine-=1;
				}
			}
			
			return {"page":newPage.toString(), "line":newLine.toString(), "rowId":newRowId};
			
		},
		_getPrimaryKeysForRow: function(row) {
			var self = this, prop = self[0].prop, colPks = self.rup_maint("getPrimaryKey").split(";"), detailURL = "";
			if (colPks.length > 1) {
				for (var i = 0; i < colPks.length; i++) {
					detailURL = detailURL + "/" + prop.jQueryGrid.rup_grid("getCol", row, colPks[i]); 
				}
			} else {
				detailURL = detailURL + "/" + prop.jQueryGrid.rup_grid("getCol", row, colPks[0]);
			}
			return detailURL;
		}
	});
})(jQuery);