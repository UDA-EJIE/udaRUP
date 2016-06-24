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

	var rup_table = {};
	rup_table.plugins=[];

	jQuery.rup_table = jQuery.rup_table || {};
	jQuery.extend(jQuery.rup_table,{
		registerPlugin: function(name, settings){
			if (jQuery.inArray(name, rup_table.plugins)===-1){
				rup_table.plugins.push(name);
				rup_table.plugins[name]=settings;
			}
		}
	});

	//Se configura el arranque de UDA para que alberge el nuevo patrón
	jQuery.extend(jQuery.rup.iniRup, jQuery.rup.rupSelectorObjectConstructor("rup_table", rup_table));

	$.fn.fmatter.rup_combo = function (cellval, opts, rwd, act) {

		var labelProp, label;


		var formatterData = $(this).data("rup.table.formatter")!== undefined?$(this).data("rup.table.formatter"):{};

		// Se añade la info del formatter
		var formatterObj = {};
		formatterObj["rup_combo"] = {value:cellval};

//		formatterObj["rup_combo"] = cellval;

		// Se añade la info de la columna
		var colFormatter = {};
		colFormatter[opts.colModel.name] = formatterObj;

		// Se añade el id de la fila
		var rowObj = {};
		rowObj[opts.rowId] = colFormatter;



		if (opts.colModel.formatoptions && opts.colModel.formatoptions.labelName){
			labelProp = opts.colModel.formatoptions.labelName;
			label = $.rup_utils.getJson(rwd, labelProp);

		}else{
			if (typeof opts.colModel.editoptions.source === "string"){
				// Combo remoto
				// Obtener la propiedad que corresponde al texto a visualizar
				if (opts.colModel.name.indexOf(".")!==-1){
					labelProp = opts.colModel.name.substring(0,opts.colModel.name.lastIndexOf("."))+"."+opts.colModel.editoptions.sourceParam.label;
				}else{
					labelProp = opts.colModel.editoptions.sourceParam.label;
				}
				label = $.rup_utils.getJson(rwd, labelProp);

			}else{
				// Combo local

				var labelArr = $.grep(opts.colModel.editoptions.source, function(elem, index){
					if (elem.value === cellval){
						return true;
					}
				});

				if (labelArr.length === 1){
					if(labelArr[0].i18nCaption){
						label = $.rup.i18nParse($.rup.i18n.app[settings.i18nId], labelArr[0].i18nCaption);
					}else{
						label = labelArr[0].label;
					}
				}

			}
		}
		formatterObj["rup_combo"]["label"] = label;

		$.extend(true, formatterData, rowObj);
		$(this).data("rup.table.formatter", formatterData);

		return label || ""

	};

	$.fn.fmatter.rup_combo.unformat = function (cellvalue, options) {
//		debugger;
		var val =  $(this).data("rup.table.formatter")[options.rowId][options.colModel.name]["rup_combo"]["value"];

		return val || "";

	};


	/*
	 * SOBREESCITURAS
	 * Funciones extendidas (SOBREESCRITAS) del componente jqGrid
	 *
	 * Los métodos aquí indicados han sido extendidos y su implementación sustituida por completo.
	 * La extensión ha sido realizada para ajustar el comportamiento del componente jqGrid a los requisitos exigidos.
	 *
	 * Los métodos extendidos para su modificación son los siguientes:
	 *
	 * - createModal
	 * - hideModal
	 * - viewModal
	 */
	jQuery.extend(jQuery.jgrid,{
		createModal : function(aIDs, content, p, insertSelector, posSelector, appendsel, css) {
			// aIDs: Identificadores de la modal
			// -- aIDs.modalcontent :
			// -- aIDs.modalhead :
			// -- aIDs.scrollelm :
			// -- aIDs.themodal :
			// content: Contenido HTML del díalogo
			// p: parámetros de configuración del diálogo
			// insertSelector: selector que corresponde al elemento despues del que se va a insertar la modal
			// posSelector: elemento base sobre el que se calcula la posición
			var $divModal = jQuery("<div/>").attr("id",aIDs.themodal).append($(content));
			var $scrollelm = $divModal.find("#"+aIDs.scrollelm);

			$divModal.insertBefore($(insertSelector));
			/* TODO : Añadir los parametros de configruación que puedan añadirse al rup_dialog. */
			$divModal.rup_dialog({
				type: $.rup.dialog.DIV,
				autoOpen: false,
				modal: true,
				resizable: p.resize,
				title: p.caption,
				width: p.width,
				buttons: p.buttons
			});

			// Eliminamos los eventos del boton de cerrar para mostrar el gestor de cambios

			if (jQuery.isFunction(p.onClose)){
				jQuery(".ui-dialog-titlebar-close, a:has(#closeText_" +$divModal.first()[0].id+")", $divModal.parent()).off("click").on("click", function(event){
					p.onClose.call(event);
				});
				// Se elimina el evento de cerrar al texto de cierre del dialogo y se asigna el evento de la gestion de cambios.
//				prop.detailDiv.parent().find("#closeText_" + prop.detailDiv.first()[0].id).parent().unbind('click').bind("click", function () {
//					self._checkDetailFormModifications(function(){
//						prop.detailDiv.rup_dialog("close");
//					});
//				});

				// Se elimina el evento de cerrar al icono de cierre del dialogo y se asigna el evento de la gestion de cambios.
//				prop.detailDiv.parent().find(".ui-dialog-titlebar-close").unbind('click').bind("click", function () {
//					self._checkDetailFormModifications(function(){
//						prop.detailDiv.rup_dialog("close");
//					});
//				});
			}

			jQuery("#"+aIDs.scrollelm+"_2").addClass("botoneraModal");

			jQuery(".fm-button","#"+aIDs.scrollelm+"_2").on({
				focusin:function(){jQuery(this).addClass('ui-state-focus');},
				focusout:function(){jQuery(this).removeClass('ui-state-focus');}
			});

			if (p.linkStyleButtons!==undefined){
				for (var i=0;i<p.linkStyleButtons.length;i++){
					jQuery(p.linkStyleButtons[0]).addClass("botonEnlace");
				}
			}
		},
		hideModal : function (selector,o) {
			jQuery(selector).rup_dialog("close");
		},
		viewModal: function(selector,o){
			jQuery(selector).rup_dialog("open");
		}

	});


	jQuery.extend(jQuery.rup_table,{
		proxyAjax:function(ajaxOptions, identifier){
			jQuery.rup_ajax(ajaxOptions);
		}
	});

	/* ******************************
	 * FUNCIONES DE CONFIGURACION
	 * ******************************/
	jQuery.fn.rup_table("extend",{
		preConfigureCore: function(settings){
			var $self = this, colModel, colModelObj;

			// Configuración del parámetro url
			settings.baseUrl = settings.url;

			// Ajuste en caso de no utilizar el plugin de filter
			if (jQuery.inArray("filter",settings.usePlugins) === -1){
				settings.url+="/filter";
			}

			// Se almacena el identificador del objeto en la propiedad settings.id
			settings.id=$self.attr("id");

			// Se da valor a la propiedad ruptype
			$self.attr("ruptype","table");

			settings.core.tableDiv = settings.id + "_div";
			settings.core.$tableDiv = jQuery("#"+settings.core.tableDiv);

			jQuery(document).bind("click", function(event){
				var $originalTarget = jQuery(event.target);
				if($originalTarget.parents().index(settings.core.$tableDiv)===-1){
					$self.triggerHandler("rupTable_checkOutOfGrid",[event, $originalTarget]);
				}
			});

			/*
			 * Configuración de los identificadores por defecto de los componentes del rup_table
			 */
			if (settings.pager!==false){
				settings.pager = $.rup_utils.getJQueryId(settings.pager!==null?settings.pager:settings.id+"_pager");
				settings.$pager = jQuery(settings.pager);
				if (settings.$pager.length===0){
					alert("El identificador "+settings.pager+" especificado para el paginador no existe.");
				}
			}

			colModel = settings.colModel;

			if (settings.loadOnStartUp===false || settings.multifilter!=undefined){
				$self.data("tmp.loadOnStartUp.datatype", settings.datatype);
				settings.datatype = "clientSide";
			}

			// Configuración del colModel para los campos sobre los que se debe de configurar un componente RUP
			for (var i=0;i<colModel.length;i++){
				colModelObj = colModel[i];

				// Se comprueba para cada uno de las entradas en el colModel si se debe de crear un componente RUP
				if (colModelObj.rupType!==undefined && colModelObj.rupType!==null){
					// En caso de tratarse de un componente RUP
					// Se indica como edittype="custom" para que jqGrid lo trate como un componente personalizado
					colModelObj.edittype = "custom";

					// Si no se ha especificado una funcion custom_element se asigna la función genérica correspondiente a un componente RUP
					if (!jQuery.isFunction(colModelObj.editoptions.custom_element)){
						colModelObj.editoptions.custom_element = function(value, options){
							return $("<input>").attr({
								"type":"text",
								"id":options.id,
								"name":options.name,
								"class": "FormElement formulario_linea_input customelement",
								"style": "width:98%",
								"value": value
							})[0];
						};
					}
					// Si no se ha especificado una funcion custom_value se asigna la función genérica correspondiente a un componente RUP
					if (!jQuery.isFunction(colModelObj.editoptions.custom_value)){
						colModelObj.editoptions.custom_value = function($elem, operation, value){
							var ruptype = $elem.attr("ruptype");
							if (ruptype!==undefined){
								if (operation === "set"){
									$elem["rup_"+ruptype]("setRupValue",value);
								}else if (operation === "get"){
									return $elem["rup_"+ruptype]("getRupValue");
								}
							}
						};
					}
				}
			}

			// Configuración de la columna extra utilizada para mostrar el estado de los registros
			if (settings.showGridInfoCol){
				settings.colNames = $.merge([""], settings.colNames);
				settings.colModel = $.merge([settings.defaultGridInfoCol], settings.colModel);
			}

			// Configuración de las claves compuestas
			if (settings.primaryKey!==undefined && typeof settings.primaryKey==="string"){
				settings.primaryKey=[settings.primaryKey];
			}

			if (settings.primaryKey!==undefined && typeof settings.primaryKey==="object"){
				// Configuración de la columna extra para gestionar las claves compuestas
				if (settings.primaryKey.length===1){
					settings.primaryKeyCol = settings.primaryKey[0];

					// Se configura la propiedad key para la columna correspondiente a a clave primaria
					for (var i=0;i<colModel.length;i++){
						if (colModel[i].name===settings.primaryKeyCol){
							colModel[i].key=true;
							break;
						}
					}

				}else if (settings.primaryKey.length>1){
					settings.colNames = $.merge([""], settings.colNames);
					var pkColModel = $.extend({},settings.defaultGridMultiplePkCol,{
						key: true,
						formatter: function(cellvalue, options, rowObject){
							var $self = $(this), settings = $self.data("settings"), retValue="";
							for (var i=0;i<settings.primaryKey.length;i++){
								retValue+=$.rup_utils.unnestjson(rowObject)[settings.primaryKey[i]]+settings.multiplePkToken;
							}
							retValue = retValue.substr(0, retValue.length-1);
							return retValue;
						}
					});

					settings.primaryKeyCol = "pkCol";
					settings.colModel = $.merge([pkColModel], settings.colModel);
				}
				// Se actualiza el nombre de la columna que va a ejercer como clave primaria
				$.extend(settings, {prmNames:{id:settings.primaryKeyCol}});
			}

			// Configuración del colModel para la gestión de la edición de las claves primarias en los modos add y edit
			for (var i=0;i<colModel.length;i++){
				colModelObj = colModel[i];
				if (colModelObj.editable===true){
					if (colModelObj.editableOnAdd===undefined){
						colModelObj.editableOnAdd=true;
					}
					if (colModelObj.editableOnEdit===undefined){
						if (jQuery.inArray(colModel[i].name, settings.primaryKey)!==-1){
							colModelObj.editableOnEdit=false;
						}else{
							colModelObj.editableOnEdit=true;
						}
					}
				}
			}

			// Sobreescritura del método serialize grid data
			settings.serializeGridData = function(postData){
				var newPostData,
				pageNum = parseInt(postData.page),
				lastpage = parseInt($self.rup_table("getGridParam","lastpage"));

				if (lastpage!==0 && pageNum>lastpage){
					postData.page = lastpage;
				}

				if (settings.core.startOnPage!==null){
					postData.page = settings.core.startOnPage;
					$self.data("tmp.firstLoad",true);
				}

				jQuery.extend(true, postData,{core:{
					"pkToken":settings.multiplePkToken,
					"pkNames":settings.primaryKey
					}
				});



				newPostData = $.extend({},{"filter":{}}, postData);

				$self.triggerHandler("rupTable_serializeGridData", [newPostData]);

				delete $self.data("tmp.firstLoad");
				settings.core.startOnPage = null;
				return jQuery.toJSON(newPostData);
			};

			settings.beforeProcessing = function(data, st, xhr){
				if ($self.triggerHandler("rupTable_beforeProcessing", [data, st, xhr]===false)){
					return false;
				}

				if (settings.primaryKey.length>1){
					$.each(data.rows, function(index,elem){
					    var retValue="";
					    for (var i=0;i<settings.primaryKey.length;i++){
						    retValue+=$.rup_utils.unnestjson(elem)[settings.primaryKey[i]]+settings.multiplePkToken;
						}
						retValue = retValue.substr(0, retValue.length-1);
						elem["pkCol"]=retValue;
					});
				}

				return true;
			};

			// Gestión de errores por defecto
//			if (!jQuery.isFunction(settings.loadError)){
//				settings.userDefined
//				settings.loadError = function(xhr,st,err){
//					jQuery.rup_messages("msgError", {
//						title: settings.core.defaultLoadErrorTitle,
//						message: xhr.responseText
//					});
//				};
//			}

			var userLoadError = settings.loadError;
			settings.loadError = function(xhr,st,err){
				var $self = $(this), ret;

				ret = $self.triggerHandler("rupTable_loadError", xhr,st,err);

				if (ret!==false){
					jQuery.proxy(userLoadError, $self)(xhr,st,err);
				}
			};

			settings.getActiveLineId = function (){
				var $self = this,
				rowsInGrid = $self.jqGrid("getDataIDs"),
				selrow = $self.jqGrid('getGridParam','selrow');

				return $.inArray(selrow,rowsInGrid);

			};

			settings.getActiveRowId = function (){
				var $self = this;

				return $self.rup_table("getGridParam", "selrow");
			};

			settings.getSelectedRows = function (){
				var $self = this, selrow = $self.rup_table("getGridParam", "selrow");
				return selrow===null ? [] : [selrow];
			};

			settings.getSelectedLines = function (){
				var $self = this, selrow = $self.rup_table("getGridParam", "selrow");
				return selrow===null ? [] : [$.inArray(selrow, $self.jqGrid("getDataIDs"))];
			};

			// Gestión de las operaciones que se pueden realizar sobre los registros

			// Se unifican las operaciones por defecto con las indicadas por el usaurio
			jQuery.each(settings.core.operations, function(index, operation){
				settings.core.showOperations[index] = true;
			});

			jQuery.extend(true, settings.core.defaultOperations, settings.core.operations);

			$self.on({
				"jqGridBeforeRequest":function(){
					jQuery.set_uda_ajax_mode_on();
				},
				"jqGridLoadComplete.rup_table.tooltip": function(event, data){
					var $self = $(this);
					if (data!==undefined){
						// Redimensionado del campo de número de página en base al número de página máximo
						jQuery(".pagControls input.ui-pg-input",settings.$pager).attr({
							size:data.total.length,
							maxlength:data.total.length
						});
					}
				},
				"jqGridResizeStart":function(event, index){
					//rup_combo , close the menu of the rup_combo when a column is resized
					$('#'+$self[0].id+'_search_rowInputs select').each(function(){ $(this).selectmenu('close')});

				},
				"jqGridResizeStop":function(event, index){
					//rup_combo, adjust the width of the menu to the new width after a column has been resized
					$('#'+$self[0].id+'_search_rowInputs select').each(function(){
						$("[id='"+this.id+"-menu']").width($("[id='"+this.id+"-button']").width());});

				},

				"jqGridGridComplete.rup_table.core": function(event){
					var $self = $(this), $tbody;

					if ($self.rup_table("getGridParam","records")===0){
						// No se han encontrado registros

						$self.prev().remove(); //Borrar div vacío
						$($self.jqGrid("getGridParam", "pager")).hide();
						var content = '<tr class="ui-widget-content jqgrow ui-row-ltr" role="row" id="' + $self[0].id + '_noRecords" aria-selected="false">';
						content += '<td aria-describedby="' + $self[0].id + '_NO_REGISTROS" title="' + $.rup.i18nParse($.rup.i18n.base,"rup_grid.noRecordsFound") + '" style="border:0;padding-left: 0.5em ! important;text-align: left;width:' + $("#gview_"+$self.attr("id")).width() + 'px;background:white;" role="gridcell">';
							//content += 	'<div id="RUP_GRID_' + self[0].id + '_noRecord_ext" class="cellLayout" style="padding-left: 0.5em ! important;">' + $.rup.i18nParse($.rup.i18n.base,"rup_grid.noRecordsFound");
							//content += '</div></td></tr>';
							content += 	$.rup.i18nParse($.rup.i18n.base,"rup_grid.noRecordsFound");
							content += '</td></tr>';
						$self.before(content);
						$('[aria-describedby="' + $self[0].id + '_NO_REGISTROS"]').rup_tooltip({
							position: {
								my: 'center',
								at: 'center'
						}});

					}else{

						jQuery("#" + $self[0].id + "_noRecords").remove(); //si tenemos la capa de no hay registros la borramos
						jQuery($self.jqGrid("getGridParam", "pager")).show();

					}
				},
				"jqGridGridComplete.rup_table.tooltip": function(event){
					var $self = $(this), $tbody;

					// Se han encontrado registros
					// Tooltips de la tabla
//					jQuery("[title]", $self).rup_tooltip({show:{delay:settings.tooltipDelay}});
					//Se le aplica el tooltip de uda
					$("#"+$(this).attr("id")+" [title]").each(function(i, elem){
						var $elem = $(elem);
						$elem.attr("grid_tooltip",$elem.attr("title")).removeAttr("title");
					});
					$tbody = jQuery("tbody:first", $self);
					$tbody.on("mousestop", {delay:500}, function(event, originalEvent){
						var obj = $.rup_utils.elementFromPoint(originalEvent.clientX, originalEvent.clientY, true),
						$obj = $(obj), toolipTmpId, auxId, auxDescribedBy;

						if (!$obj.attr("rup_tooltip") && $obj.attr("grid_tooltip")){
							auxId = $obj.parent().attr("id")?$obj.parent().attr("id"):$obj.parents("tr[role='row']").attr("id");
							auxDescribedBy = $obj.attr("aria-describedby")?$obj.attr("aria-describedby"):$obj.parents("td[role='gridcell']").attr("aria-describedby");
							$obj.attr("title",$obj.attr("grid_tooltip"));
							toolipTmpId = auxId+"_"+auxDescribedBy;
							$obj.rup_tooltip({
								show:{delay:0},
								id: toolipTmpId,
								position:{
									viewport:$(window),
									adjust:{
										method:"flip"
									}
								}
							});
							$obj.triggerHandler("mouseenter.qtip-"+toolipTmpId+"-create");
//							$obj.triggerHandler("mouseenter");
							$obj.rup_tooltip("option","show.delay",500);
						}
					});
				}
			});
		},
		postConfigureCore: function(settings){
			var $self = this;

			// Se configura la funcionalidad de redimensionado de la tabla.
			if (settings.resizable !== false){
				$self.rup_table('gridResize', (jQuery.isPlainObject(settings.resizable)? settings.resizable:{}));
			}

			// Configruación pager
			if (settings.pager!==false){
				$self.rup_table("configurePager",settings);
			}

			// Se añaden los tooltip a las cabeceras de la tabla
			$.each($("#gview_table th:visible"), function(index,elem){
				  var $elem = $(elem), text = $elem.find("div").text();

				  if (text!==''){
				      	$elem.attr("title", text).rup_tooltip({
				      		show:{delay:500},
							position:{
								viewport:$(window),
								adjust:{
									method:"flip"
								}
							}
						});
				  }
			});



			// Implementación del ellipsis en las cabeceras de las columnas de la tabla
			jQuery($self.rup_table("getGridParam","colModel")).each (function (index, element){
				var $headerLabel;

				//Si la columna define ellipsis...
				if (element.classes === "ui-ellipsis"){
					//Añadirle estilos para ellipsis al div que está dentro de la cabecera
					jQuery("[id='jqgh_" + settings.id + "_" + element.name+"']")
						.css("display", "block")
						.css("text-overflow", "ellipsis");

				}

				//Sustituir DIV del literal de la cabecera por SPAN (para que funcione ellipsis)
				$headerLabel = jQuery("[id='jqgh_" + settings.id + "_" + element.name+"']").children("div");
				$headerLabel.replaceWith(jQuery("<span>").text($headerLabel.text()).css("cursor","pointer"));
			});

			// Configuración de la columna extra utilizada para mostrar el estado de los registros
			if (settings.showGridInfoCol){
//				jQuery("#gview_"+settings.id+" table thead th#"+settings.id+"_rupInfoCol").css("padding-right","0px").css("padding-left","0px").css("border-right","0px none");
				jQuery("#gview_"+settings.id+" table thead th#"+settings.id+"_rupInfoCol").css("border-right","0px none");

			}

			if (settings.loadOnStartUp===false || settings.multifilter!=undefined){
				settings.datatype = $self.data("tmp.loadOnStartUp.datatype");
				$self.rup_table("setGridParam",{datatype:$self.data("tmp.loadOnStartUp.datatype")});
				$self.removeData("tmp.loadOnStartUp.datatype");
			}
		}
	});




	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	jQuery.fn.rup_table("extend",{
		getColModel: function(){
			return $(this).jqGrid("getGridParam","colModel");
		},
		getGridParam : function (pName) {
			return $(this).jqGrid("getGridParam", pName);
		},
		gridResize : function (options){
			return $(this).jqGrid('gridResize', options);
		},
		getSelectedRows : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getSelectedRows, $self)();
		},
		getSelectedLines : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getSelectedLines, $self)();
		},
		getPkUrl : function(rowId){
			var $self = this, settings = $self.data("settings"), tmpRowId;
			if(jQuery.isArray(rowId)){
				tmpRowId = rowId[0]!==undefined?rowId[0]:"";
			}else{
				tmpRowId = rowId;
			}

			return tmpRowId.split(settings.multiplePkToken).join('/');
		},
		reloadGrid: function(async){
			var $self = this, settings = $self.data("settings"), page = $self.rup_table("getGridParam", "page");
			var ajaxOptions = $self.jqGrid("getGridParam", "ajaxGridOptions");
			var ajaxOptionsAsync =  ajaxOptions.async;
			ajaxOptions.async = false;
//			var ajaxOptions = $self.jqGrid("setGridParam", {ajaxGridOptions:ajaxOptions});
			$self.jqGrid("setGridParam", {ajaxGridOptions:ajaxOptions});

			$self.jqGrid("setGridParam", {page: 1});
			$self.trigger("reloadGrid");
			ajaxOptions.async = true;
			$self.jqGrid("setGridParam", {ajaxGridOptions:ajaxOptions});
			var nextPagePos = jQuery.proxy(jQuery.jgrid.getCurrPos, $self[0])();
			$self.jqGrid("setSelection",nextPagePos[1][0]);
		},
		resetForm: function($form){
			var $self = this, settings = $self.data("settings");
			// Se eliminan los estilos de errores de validacion
			if ($form.data("validator") != undefined){
				var errorClass = $form.data("validator").settings.errorClass;
				$("."+errorClass,$form).removeClass(errorClass);
			}
			// Se realiza el reset de los campos ordinarios
			//form.resetForm();
			jQuery("input[type!='button'][type!='checkbox'][type!='radio'], textarea", $form).val("");
			jQuery("input[type='checkbox']", $form).not("[name*='jqg_GRID_']", $form).not("[disabled='disabled']", $form).removeAttr("checked");
			// Se realiza el reset de los rup_combo
			jQuery.each($("select.rup_combo",$form), function(index,elem){
				if(settings.filter && settings.filter.clearSearchFormMode==="reset"){
					jQuery(elem).rup_combo("reset");
				}else{
					jQuery(elem).rup_combo("clear");
				}
			});
			//Vaciar los autocompletes
			$("[ruptype='autocomplete']", $form).each(function (index, element) {
				$(element).val("");
			});

			//Vaciar los arboles
			$("[ruptype='tree']", $form).each(function (index, element) {
				$(element).rup_tree("setRupValue",	"");
			});

			// Se realiza el reset del fomulario
			if(settings.filter && settings.filter.clearSearchFormMode==="reset"){
				$form.resetForm();
			}else{
				$("input[type='radio']", $form).removeAttr("checked");
			}

			return $self;
		},
		setGridParam : function (newParams) {
			$(this).jqGrid("setGridParam", newParams);
			return $(this);
		},
		setSelection : function (selection, status, e){
			var $self = this, settings = $self.data("settings"), ret;

			ret = $self.triggerHandler("rupTable_setSelection", arguments);

			if (ret!==false){
				$self.jqGrid("setSelection", selection, status, e);
			}
		},
		/*
		 * Función encargada de mostrar los errores producidos en la gestión de los datos del mantenimiento.
		 */
		showServerValidationFieldErrors: function($form, errors){
			var $self = $(this);

			if(errors.rupErrorFields!==undefined || errors.rupFeedback!==undefined){
				$form.validate().submitted=$.extend(true, $form.validate().submitted,errors.rupErrorFields);
				$form.validate().invalid=errors.rupErrorFields;
				$form.validate().showErrors(errors.rupErrorFields);
			}else if(errors.rupFeedback!==undefined){
				$self.rup_table("showFeedback", $form.validate().settings.feedback, $.rup_utils.printMsg(errors.rupFeedback.message), (errors.rupFeedback.imgClass!==undefined?errors.rupFeedback.imgClass:null));
			}

		},
//		search : function(async){
//			var $self = this,
//				props = $self[0].p,
//				settings = $self.data("settings");
//
//			jQuery.extend (props.postData,settings.$searchForm.serializeObject());
//			var postDataAux = {};
//			jQuery.each (props.postData, function(a,b){
//			    if (b!==''){
//			    	postDataAux[a]=b;
//			    }
//			});
//			props.postData = postDataAux;
//
//			$self.trigger("reloadGrid");
//		},
		clearHighlightedRowAsSelected: function($row){
			var $self = this, self = $self[0], internalProps = self.p, row = $row[0],
			froz = internalProps.frozenColumns === true ? internalProps.id + "_frozen" : "";

			if(!$row.hasClass("ui-subgrid") && !$row.hasClass('ui-state-disabled')){
				$("#jqg_"+$.jgrid.jqID(internalProps.id)+"_"+$.jgrid.jqID(row.id) )[internalProps.useProp ? 'prop': 'attr']("checked", false);
				$row.removeClass("ui-state-highlight").attr("aria-selected","false");
//				emp.push(row.id);
				if(froz) {
					$("#jqg_"+$.jgrid.jqID(internalProps.id)+"_"+$.jgrid.jqID(row.id), self.grid.fbDiv )[internalProps.useProp ? 'prop': 'attr']("checked",false);
					$("#"+$.jgrid.jqID(row.id), self.grid.fbDiv).removeClass("ui-state-highlight");
				}
			}
			$self.trigger("rupTableClearHighlightedRowAsSelected",[$row]);
		},
		highlightRowAsSelected: function($row){
			var $self = this, self = $self[0], internalProps = self.p, row = $row[0],
			froz = internalProps.frozenColumns === true ? internalProps.id + "_frozen" : "";

			if($row.length>0 && !$row.hasClass("ui-subgrid") && !$row.hasClass("jqgroup") && !$row.hasClass('ui-state-disabled')){
				$("#jqg_"+$.jgrid.jqID(internalProps.id)+"_"+$.jgrid.jqID(row.id) )[internalProps.useProp ? 'prop': 'attr']("checked",true);
				$row.addClass("ui-state-highlight").attr("aria-selected","true");
				internalProps.selarrrow.push(row.id);
				internalProps.selrow = row.id;
				if(froz) {
					$("#jqg_"+$.jgrid.jqID(internalProps.id)+"_"+$.jgrid.jqID(row.id), self.grid.fbDiv )[internalProps.useProp ? 'prop': 'attr']("checked",true);
					$("#"+$.jgrid.jqID(row.id), self.grid.fbDiv).addClass("ui-state-highlight");
				}
				$self.trigger("rupTableHighlightRowAsSelected",[$row]);
			}
		},
		updateDetailPagination : function(currentRowNumArg, totalRowNumArg){
			var $self = this, settings = $self.data("settings"), tableId = settings.id, currentRowNum, totalRowNum;
			currentRowNum = (currentRowNumArg!==undefined ? currentRowNumArg : $.proxy(settings.getDetailCurrentRowCount,$self)());
			totalRowNum = (totalRowNumArg!==undefined ? totalRowNumArg : $.proxy(settings.getDetailTotalRowCount,$self)());

			if (currentRowNum===1){
				$("#first_"+tableId+", #back_"+tableId, settings.$detailFormDiv).addClass("ui-state-disabled");
			}else{
				$("#first_"+tableId+", #back_"+tableId, settings.$detailFormDiv).removeClass("ui-state-disabled");
			}
			if (currentRowNum === totalRowNum){
				$("#forward_"+tableId+", #last_"+tableId, settings.$detailFormDiv).addClass("ui-state-disabled");
			}else{
				$("#forward_"+tableId+", #last_"+tableId, settings.$detailFormDiv).removeClass("ui-state-disabled");
			}

			$("#rup_maint_selectedElements_"+$self.attr("id")).text(jQuery.jgrid.format(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.defaults.detailForm_pager"),currentRowNum, totalRowNum));
		},
		updateSavedData: function(arg){
			var $self = this, settings = $self.data("settings");

			if (jQuery.isFunction(arg)){
				jQuery.proxy(arg, $self)(rp_ge[settings.id]._savedData);
			}
		}
	});


	jQuery.fn.rup_table("extend", {
		configurePager: function(settings){
			var $self = this,
				pagerName,
				$pagerCenter,
				pagerLeft,
				pagerRight;


			if (settings.pager!==undefined && settings.pager!==null){
				settings.$pager = $((settings.pager.indexOf("#")===0?settings.pager:'#'+settings.pager));
				pagerName = settings.$pager.attr("id");

				settings.$pager.css('height','auto'); //Posibilitar redimensionar paginador

				//Añadir clase a cada parte del paginador
				$pagerLeft = $('#' + pagerName + '_left');
				$pagerCenter = $('#' + pagerName + '_center');
				$pagerRight = $('#' + pagerName + '_right');

				$pagerLeft.addClass("pager_left");
				$pagerCenter.addClass("pager_center");
				$pagerRight.addClass("pager_right");

				//pager_left
				//**********
				//Quitar posibles botones del paginador (y dejar la parte izquierda vacía)
				$pagerLeft.html("");

				//Contador de seleccionados
				if (settings.multiselect === true){
					$pagerLeft.append( $('<div/>').addClass('ui-paging-selected').html("0 " + jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.selected")));
				}

				// Pager center
				jQuery(".pager_center table td",settings.$pager).addClass('pagControls');

				// Evento de control de página máxima
				jQuery(".pagControls input.ui-pg-input", $pagerCenter).on("change", function(){
					var pageNum = parseInt($(this).val()),
					totalNum = parseInt($self.rup_grid("getGridParam","lastpage"));

					if (isNaN(pageNum)===false && pageNum>totalNum){
						$(this).val(totalNum);
					}
				});

				// Tooltip al combo de selección de número de registros
				jQuery(".pagControls select.ui-pg-selbox", $pagerCenter).attr("title",jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.select")).rup_tooltip();
				// Tooltip al input de selección de página
				jQuery(".pagControls input.ui-pg-input", $pagerCenter).attr("title",jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.input")).rup_tooltip();

				//Cambiar flechas paginación por literales
					jQuery('#first_'+ pagerName, $pagerCenter)
					.html($('<a/>').attr("href","javascript:void(0)").html(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.primPag")).addClass('linkPaginacion'))
					.removeClass('ui-pg-button');
				jQuery('#prev_'+ pagerName, $pagerCenter)
					.html($('<a/>').attr("href","javascript:void(0)").html(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.anterior")).addClass('linkPaginacion'))
					.removeClass('ui-pg-button');
				jQuery('#next_'+ pagerName, $pagerCenter)
					.html($('<a/>').attr("href","javascript:void(0)").html(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.siguiente")).addClass('linkPaginacion'))
					.removeClass('ui-pg-button');
				jQuery('#last_'+ pagerName, $pagerCenter)
					.html($('<a/>').attr("href","javascript:void(0)").html(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid.pager.ultiPag")).addClass('linkPaginacion'))
					.removeClass('ui-pg-button');
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	//********************************

	jQuery.fn.rup_table("extend", {
		_init : function(args) {
			if (args.length > 1) {
				jQuery.rup.errorGestor(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_global.initError") + $(this).attr("id"));
			}else {
				var $self = this,
					settings = {};


				/* *************************
				 * CONFIGURACION
				 * *************************/
				var defaultPugins = (jQuery.isArray(args[0].defaultPlugins)?args[0].defaultPlugins:jQuery.fn.rup_table.defaults.defaultPlugins),
				userPlugins = jQuery.merge([], args[0].usePlugins),
				configuredPlugins = jQuery.merge(jQuery.merge([], defaultPugins), userPlugins);


				jQuery.rup_utils.sortArray(configuredPlugins, function(obj1,obj2){
					return rup_table.plugins[obj2].loadOrder - rup_table.plugins[obj1].loadOrder;
				});


				/* *********************************************************
				 * SE PROCESA LAS CONFIGURACION POR DEFECTO DEL CORE
				 * *********************************************************
				 */

				settings = $.extend(true,{}, settings, jQuery.fn.rup_table.plugins.core.defaults);

				/* *********************************************************
				 * SE PROCESAN LAS CONFIGURACIONES POR DEFECTO DE LOS PLUGINS
				 * *********************************************************
				 */
				$.each(configuredPlugins, function(index, name){
					if (rup_table.plugins[name] !== undefined && jQuery.fn.rup_table.plugins[name] !== undefined){
						settings = $.extend(true,{}, settings, jQuery.fn.rup_table.plugins[name].defaults);
					}
				});

				// Se sobreescribe la configuración por defecto con la especificada por el usaurio
				settings = jQuery.extend(true, {}, jQuery.fn.rup_table.defaults, settings, args[0]);

				/* *********************************************************
				 * EJECUCION DE LA PRECONFIGURACION DEL CORE
				 * *********************************************************/

				$self.rup_table("preConfigureCore",settings);


				/* *********************************************************
				 * EJECUCION DE FUNCIONES DE PRECONFIGURACION DE LOS PLUGINS
				 * *********************************************************
				 */

				$.each(configuredPlugins, function(index, name){
					if (jQuery.isFunction(rup_table.plugins[name].preConfiguration)){
						jQuery.proxy(rup_table.plugins[name].preConfiguration, $self)(settings);
					}
				});

				/*
				 * INVOCACIÓN al plugin subyacente jqGrid
				 */
				$self.jqGrid(settings);

				/* *********************************************************
				 * EJECUCION DE LA POSTCONFIGURACION DEL CORE
				 * *********************************************************/

				$self.rup_table("postConfigureCore",settings);

				/* *********************************************************
				 * EJECUCION DE FUNCIONES DE POSTCONFIGURACION DE LOS PLUGINS
				 * *********************************************************/
				$.each(configuredPlugins, function(index, name){
					if (jQuery.isFunction(rup_table.plugins[name].postConfiguration)){
						jQuery.proxy(rup_table.plugins[name].postConfiguration, $self)(settings);
					}
				});

				// Se almacenan los settings medainte el data para ser accesibles en las invocaciones a los métodos públicos.
				$self.data("settings",settings);

				$self.triggerHandler("rupTable_coreConfigFinished");
			}
		},
		_getLineIndex: function(rowId){
			var $self = this, settings = $self.data("settings"),
				tableghead = settings.id+"ghead_", count=0, $row, id;
			if ($self.rup_table("getGridParam","grouping")===true){
				for (var i=0; i<$self[0].rows.length;i++){
					$row = jQuery($self[0].rows[i]);
					id = $row.attr("id");
				    if (id !== undefined && id.indexOf(tableghead)===-1){
				        count++;
				        if (id===rowId){
				         return count;
				        }
				    }
				}
			}else{
				return $self.jqGrid("getInd",rowId);
			}
		}
	});

	//*********************************************************************
	// MÉTODOS PARA MANTENER LA RETROCOMPATIBILIDAD CON LA API DEL RUP.GRID
	//*********************************************************************

	jQuery.fn.rup_table("extend",{
		addRowData : function (rowid, data, position, srcrowid) {
			var $self = $(this);
//			//Se aade la capa de separacion para diferenciar los nuevos elementos incluidos
//			if ($("#" + tableName + " #separadorAadidos").html() === null) {
//				$("#" + tableName + " tr:first-child").after($("#" + tableName + " tr:first-child").clone(false).css("display", "none").css("height", "").attr("id", "separadorAadidos"));
//
//				$.each($("#" + tableName + " #separadorAadidos td") , function (index, object) {
//					$(this).html("").attr("class", "tdAddSeparator");
//				});
//
//				$("#" + tableName + " #separadorAadidos").addClass("trAddSeparator");
//				$("#" + tableName + " #separadorAadidos").css("display", "");
//			}
			return $self.jqGrid("addRowData", rowid, data, position, srcrowid);
			//Añadimos los estilos de elemento añadido
//			$("#" + tableName + " #" + rowid).addClass("addElement");
			//$("#" + tableName + " #" + rowid + " td").addClass("addElementBorder");
		},
		delRowData : function (rowid) {
			var $self = $(this);

			$self.jqGrid("delRowData", rowid);

			return $self;
		},
		getActiveRowId : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getActiveRowId, $self)();
		},
		getActiveLineId : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getActiveLineId, $self)();
		},
		setRowData : function (rowid, data, cssp) {
			var $self = $(this);

			$self.jqGrid("setRowData", rowid, data, cssp);

			//Actualizar tooltip de las celdas de la fila
			jQuery("td[title]", $self).each(function(index, elem){
				var $cell = jQuery(elem),
	            	title = $cell.prop("title");

				$cell.attr({"grid_tooltip":title, "oldtitle":title}).removeAttr("title");
			});
		},
		getRowData: function(rowid){
			var $self = $(this);
			return $self.jqGrid("getRowData", rowid);
		},
		getDataIDs : function () {
			var $self = $(this);
			return $self.jqGrid("getDataIDs");
		},
//		getGridParam : function (pName) {
//			var $self = $(this);
//			return $self.jqGrid("getGridParam", pName);
//		},
//		setGridParam : function (newParams) {
//			var $self = $(this);
//			$self.jqGrid("setGridParam", newParams);
//		},
		clearGridData : function (clearfooter) {
			var $self = $(this);
			return $self.jqGrid("clearGridData", clearfooter);
		},
		getColModel : function () {// Función que devuelve el colModel directamente.
			var $self = $(this);
			return $self.jqGrid("getGridParam", "colModel");
		},
		getCol : function (rowid, colName) { //Función que devuelve el valor de la celda de la fila que se le pasa como paramtero. El colName puede ser o el indice de la columna o el nombre de la misma
			var $self = $(this);
			return $self.jqGrid("getCell", rowid, colName);
		},
		getSerializedForm: function(form, skipEmpty, delimeter){
			return  form2object(form instanceof jQuery?form[0]:form, delimeter?delimeter:null, skipEmpty?skipEmpty:false);
		}
	});


	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************
	jQuery.fn.rup_table.plugins = {};
	jQuery.fn.rup_table.plugins.core = {};
	jQuery.fn.rup_table.plugins.core.defaults = {
		core:{
			operations:{},
			defaultOperations:{},
			showOperations:{},
			defaultLoadErrorTitle:$.rup.i18n.base.rup_ajax.errorTitle
		}
	};

	// Parámetros de configuración por defecto del componente rup_table.
	jQuery.fn.rup_table.defaults = {
			altRows: true,
			altclass: "rup-grid_oddRow",
			datatype: "json",					// Tipo de dato esperado para representar los registros de la tabla (jqGrid)
			editable: false,					// Determina si la tabla permite la edición en línea (rup_table)
			height: "auto", 					// Ajusta la altura de la tabla al contenido (jqGrid)
			jsonReader : {repeatitems: false},	// Parámetros de configuración que describen la estructura del json esperado (jqGrid)
			pager: null,
			resizable: false,					// Determina si la tabla puede ser redimensionada mediante el ratón (jqGrid)
			rowNum:10, 							// Determina el número de registros que se van a mostrar por página
	        rowList:[10,20,30],					// Valores a mostrar en el combo de selección de número de registros por página
			sortable: true,						// Determina si se puede realizar drag&drop con las columnas de la tabla (jqGrid)
			viewrecords: true,					// Muestra el rango de elementos que se están mostrando en la tabla (jqGrid)
			mtype: "POST",
			loadError : function(xhr,st,err){
				var $self = $(this), settings = $self.data("settings");

				jQuery.rup_messages("msgError", {
					title: settings.core.defaultLoadErrorTitle,
					message: xhr.responseText
				});
			},
			loadOnStartUp: true,
			// Callback ejecutado en las peticiones AJAX de la tabla
			loadBeforeSend: function rup_table_defaults_loadBeforeSend(xhr, settings){
				// Se modifica la request para incluir las siguientes cabeceras:
				// Se añade la cabecera JQGridModel para indicar que la petición ha sido realizada por el componente rup_table
				xhr.setRequestHeader("JQGridModel", "true");
				// Se indica que el tipo de contenido enviado en la cabecera es application/jsons
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			loadui: "block",
			validate:{},
			defaultPlugins:[],
			dataProxy: jQuery.rup_table.proxyAjax,
			defaultGridInfoCol:{
				name: "rupInfoCol", index: "rupInfoCol", editable:false, fixed:true, sortable:false, width:16, resizable: false, classes:"rupInfoCol", search:false, formatter:function(){return "<span class='ui-icon ui-icon-rupInfoCol'/>";}
			},
			defaultGridMultiplePkCol:{
				name: "pkCol", index: "pkCol", hidden:true,  editable:false, fixed:true, sortable:false, width:25, resizable: false,search:false
			},
			multiplePkToken:"~",
			scrollOffset:0,
			showGridInfoCol:false,
			tooltipDelay: 500
		};

})(jQuery);
