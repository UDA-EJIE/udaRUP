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
 * SIN GARANT�?AS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.
 * Véase la Licencia en el idioma concreto que rige los permisos y limitaciones
 * que establece la Licencia.
 */

 /**
  * @fileOverview Implementa el patrón RUP Table.
  * @author EJIE
  * @version 2.4.13
  */
(function ($) {


	//*****************************************************************************************************************
	// DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
	//*****************************************************************************************************************
	/**
	* Se les presenta a los usuarios los datos tabulados para que la información se visualice de manera ágil y rápida, facilitando así su comprensión y manejo. Además, el componente implementa un nuevo patrón definido para facilitar la lógica necesaria en las acciones básicas, denominadas CRUD (create, read, update y delete), sobre una tabla.
	*
	* @summary Componente RUP Table.
	* @namespace jQuery.rup_table
	* @memberof jQuery
	* @example
	*
	* var properties = {
	*		url: "../tableUrl",
	*		colNames: [
	*			"id","nombre","..."]
	*		],
	*		colModel: [
	*			{name: "id", label: "id"},
	*			{name: "nombre", label: "nombre"},
	*			{name: "...", label: "..."}
	*		],
	*		model:"Usuario",
	*		usePlugins:[
	*			"formEdit",
	*			"feedback",
	*			"toolbar",
	*			"contextMenu",
	*			"fluid",
	*			"filter",
	*			"search"
	*		],
	*		primaryKey: "id"
	*	};
	*
	* $("#table").rup_table(properties);
	*/
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
		/**
		 * Metodo que realiza la pre-configuración del core del componente RUP Table.
		 * Este método se ejecuta antes de la pre-configuración de los plugins y de la invocación al componente jqGrid.
		 *
		 * @name jQuery.rup_table#preConfigureCore
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 * @fires jQuery.rup_table#rupTable_checkOutOfGrid
		 * @fires jQuery.rup_table#rupTable_serializeGridData
		 * @fires jQuery.rup_table#rupTable_beforeProcessing
		 */
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
		/**
		 * Metodo que realiza la post-configuración del core del componente RUP Table.
		 * Este método se ejecuta antes de la post-configuración de los plugins y después de la invocación al componente jqGrid.
		 *
		 * @name jQuery.rup_table#postConfigureCore
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 */
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
		/**
		 * Devuelve la propiedad colModel del jqGrid.
		 *
		 * @name jQuery.rup_table#getColModel
		 * @function
		 * @return {object} - Propiedad colModel del jqGrid.
		 * @example
		 * $("#idComponente").rup_table("getColModel");
		 */
		getColModel: function(){
			return $(this).jqGrid("getGridParam","colModel");
		},
		/**
		 * Devuelve el valor del parámetro del grid especificado.
		 *
		 * @name jQuery.rup_table#getGridParam
		 * @function
		 * @param {string} pName - Nombre del parámetro que se desea obtener.
		 * @return {object} - Valor del parámetro.
		 * @example
		 * $("#idComponente").rup_table("getGridParam","nombreParametro");
		 */
		getGridParam : function (pName) {
			return $(this).jqGrid("getGridParam", pName);
		},
		/**
		 * Permite redimensionar la tabla de acuerdo a los parámetros indicados.
		 *
		 * @name jQuery.rup_table#getGridParam
		 * @function
		 * @param {object} options - Parámetros para configurar la altura y anchura del redimensionado.
		 * @return {jQuery} - Referencia al propio componente.
		 * @example
		 * $("#idComponente").rup_table("gridResize",{});
		 */
		gridResize : function (options){
			return $(this).jqGrid('gridResize', options);
		},
		/**
		 * Devuelve un array con los identificadores de los registros seleccionados.
		 *
		 * @name jQuery.rup_table#getSelectedRows
		 * @function
		 * @return {string[]} - Array con los identificadores de los registros seleccionados.
		 * @example
		 * $("#idComponente").rup_table("getSelectedRows");
		 */
		getSelectedRows : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getSelectedRows, $self)();
		},
		/**
		 * Devuelve un array con los índices de las líneas de los registros seleccionados.
		 *
		 * @name jQuery.rup_table#getSelectedLines
		 * @function
		 * @return {number[]} - Array con los índices de las líneas de los registros seleccionados.
		 * @example
		 * $("#idComponente").rup_table("getSelectedLines");
		 */
		getSelectedLines : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getSelectedLines, $self)();
		},
		/**
		 * El objetivo de este método es construir una URL mediante la cual se pueda realizar una petición para obtener los datos de un registro concreto.
		 * La URL se genera concatenando los valores de las propiedades que forman la primary key del resgistro a la url base especificada en los settings de inicialización.
		 *
		 * @name jQuery.rup_table#getPkUrl
		 * @function
		 * @param {string} rowId - Identificador del registro.
		 * @return {string} - Url para obtener los valores del registro correspondiente.
		 * @example
		 * $("#idComponente").rup_table("getPkUrl","0001");
		 */
		getPkUrl : function(rowId){
			var $self = this, settings = $self.data("settings"), tmpRowId;
			if(jQuery.isArray(rowId)){
				tmpRowId = rowId[0]!==undefined?rowId[0]:"";
			}else{
				tmpRowId = rowId;
			}

			return tmpRowId.split(settings.multiplePkToken).join('/');
		},
		/**
		 * Lanza la recarga de la tabla.
		 *
		 * @name jQuery.rup_table#reloadGrid
		 * @function
		 * @param {boolean} async - Indica si la llamada debe ser asíncrona o síncrona.
		 * @example
		 * $("#idComponente").rup_table("reloadGrid", true);
		 */
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
		/**
		 * Resetea el formulario indicado.
		 *
		 * @name jQuery.rup_table#resetForm
		 * @function
		 * @param {jQuery} $form - Objeto jQuery que referencia el formulario que se desea resetear.
		 * @return {jQuery} - Referencia al propio objeto.
		 * @example
		 * $("#idComponente").rup_table("resetForm", $("#idFormulario"));
		 */
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
		/**
		 * Asigna a uno o varios parámetros del grid los valores indicados.
		 *
		 * @name jQuery.rup_table#setGridParam
		 * @function
		 * @param {object} newParams - Objeto que contiene los parámetros y sus valores.
		 * @return {jQuery} - Referencia al propio objeto.
		 * @example
		 * $("#idComponente").rup_table("setGridParam", {param1:value1, param2:value2});
		 */
		setGridParam : function (newParams) {
			$(this).jqGrid("setGridParam", newParams);
			return $(this);
		},
		/**
		 * Selecciona o deselecciona los registros indicados.
		 *
		 * @name jQuery.rup_table#setSelection
		 * @function
		 * @param {string | string[]} selectedRows - Identificador o array de identificadores de los registros que se desea seleccionar o deseleccionar.
		 * @param {boolean} status - En caso de ser true se seleccionarán los registros indicados. En caso de ser false se deseleccionarán.
		 * @example
		 * $("#idComponente").rup_table("setSelection", ["3","7"], true);
		 */
		setSelection : function (selection, status, e){
			var $self = this, settings = $self.data("settings"), ret;

			ret = $self.triggerHandler("rupTable_setSelection", arguments);

			if (ret!==false){
				$self.jqGrid("setSelection", selection, status, e);
			}
		},
		/**
		 * Muestra en los campos del formulario los errores de validación indicados.
		 *
		 * @name jQuery.rup_table#showServerValidationFieldErrors
		 * @function
		 * @param {jQuery} $form - Objeto jQuery que referencia el formulario que se desea resetear.
		 * @param {object} errors - Objeto json que contiene los errores de validación que se han dado para cada campo.
		 * @example
		 * $("#idComponente").rup_table("showServerValidationFieldErrors ", $("#idFormulario"), {});
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
	/**
	 * Elimina el resaltado de la línea especificada de la tabla.
	 *
	 * @name jQuery.rup_table#rupTableClearHighlightedRowAsSelected
	 * @function
	 * @param {jQuery} $row - Objeto jQuery que referencia a la línea de la tabla.
	 * @fires jQuery.rup_table#rupTableClearHighlightedRowAsSelected
	 * @example
	 * $("#idComponente").rup_table("clearHighlightedRowAsSelected", $("#idFila"));
	 */
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
		/**
		 * Resalta la línea especificada de la tabla.
		 *
		 * @name jQuery.rup_table#highlightRowAsSelected
		 * @function
		 * @param {jQuery} $row - Objeto jQuery que referencia a la línea de la tabla.
		 * @fires jQuery.rup_table#rupTableHighlightRowAsSelected
		 * @example
		 * $("#idComponente").rup_table("highlightRowAsSelected", $("#idFila"));
		 */
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
		/**
		 * Actualiza el valor de los datos que se muestran en la barra de paginación.
		 *
		 * @name jQuery.rup_table#updateDetailPagination
		 * @function
		 * @param {string} currentRowNumArg - Número actual de los registros que se están mostrando.
		 * @param {string} totalRowNumArg - Número total de los registros que se muestran en la tabla.
		 * @example
		 * $("#idComponente").rup_table("updateDetailPagination", "1-10", "586" );
		 */
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
		/**
		* Función de callback que se ejecutará desde el método updateSavedData.
		*
		* @callback jQuery.rup_validate~onSubmitHandler
		* @param {object} savedData - Objeto interno que almacena en formato json los datos con los que se han inicializado los campos del formulario.
		* @example <caption>Envia el formulario cuando este es válido.</caption>
		* $("#idComponente").rup_table("updateSavedData", function(savedData){
		* });
		*/
		/**
		 * Permite modificar el objeto interno _savedData que se utiliza en el control de cambios en el modo de edición en formulario y edición en línea.
		 *
		 * @name jQuery.rup_table#updateSavedData
		 * @function
		 * @param {jQuery.rup_table~onUpdateSavedData} arg -Función de callback desde la que se puede modificar el objeto _savedData.
		 * @example
		 * $("#idComponente").rup_table("updateSavedData", function(savedData){
	 	 * });
		 */
		updateSavedData: function(arg){
			var $self = this, settings = $self.data("settings");

			if (jQuery.isFunction(arg)){
				jQuery.proxy(arg, $self)(rp_ge[settings.id]._savedData);
			}
		}
	});


	jQuery.fn.rup_table("extend", {
		/**
		 * Realiza la configuración interna del paginador de acuerdo a los parámetros de configuración indicados en la inicialización del componente.
		 *
		 * @name jQuery.rup_table#configurePager
		 * @function
		 * @param {object} settings - Parámetros de configuración del componente.
		 * @example
		 * $("#idComponente").rup_table("configurePager", settings);
		 */
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
					totalNum = parseInt($self.rup_table("getGridParam","lastpage"));

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
		/**
		 * Método de inicialización del componente.
		 *
		 * @name jQuery.rup_table#_init
		 * @function
		 * @private
		 * @param {object} args - Parámetros de configuración del componente.
		 * @fires jQuery.rup_table#rupTable_coreConfigFinished
		 */
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
		/**
		 * Devuelve el índice de la línea identificada mediante el valor indicado por parámetro.
		 *
		 * @name jQuery.rup_table#_getLineIndex
		 * @function
		 * @private
		 * @param {string} rowId - Identificador del registro.
		 * @return {number} - �?ndice de la línea.
		 */
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
		/**
		 * Añade una nueva línea a la tabla. Esta operación no realiza una inserción del registro en el sistema de persistencia, sino que únicamente añade una nueva fila de modo visual.
		 *
		 * @name jQuery.rup_table#addRowData
		 * @function
		 * @param {string} rowid - Identificador del registro.
		 * @param {object} data - Objeto json que contiene los valores de cada columna de la nueva línea.
		 * @param {string} position - fisrt o last. Determina la posición donde se va a insertar el registro.
		 * @param {string} srcrowid -En el caso de indicarse se insertará la nueva línea en la posición relativa al registro que identifica y el valor del parámetro position.
		 * @return {jQuery} - Referencia al propio componente.
		 * @example
		 * $("#idComponente").rup_table("addRowData", "10", {campo1:valor1,campo2:valor2});
		 */
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
		/**
		 * Elimina de la tabla un registro determinado. El registro no se elimina del sistema de persistencia. Solo se elimina de manera visual.
		 *
		 * @name jQuery.rup_table#delRowData
		 * @function
		 * @param {string} rowid - Identificador del registro.
		 * @return {jQuery} - Referencia al propio componente.
		 * @example
		 * $("#idComponente").rup_table("delRowData","10");
		 */
		delRowData : function (rowid) {
			var $self = $(this);

			$self.jqGrid("delRowData", rowid);

			return $self;
		},
		/**
		 * Devuelve el identificador de la línea activa.
		 *
		 * @name jQuery.rup_table#getActiveRowId
		 * @function
		 * @return {string} - Identificador de la línea activa.
		 * @example
		 * $("#idComponente").rup_table("getActiveRowId");
		 */
		getActiveRowId : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getActiveRowId, $self)();
		},
		/**
		 * Devuelve el índice de la línea activa.
		 *
		 * @name jQuery.rup_table#getActiveLineId
		 * @function
		 * @return {string} - �?ndice de la línea activa.
		 * @example
		 * $("#idComponente").rup_table("getActiveLineId");
		 */
		getActiveLineId : function(){
			var $self = this, settings = $self.data("settings");

			return jQuery.proxy(settings.getActiveLineId, $self)();
		},
		/**
		 * Actualiza los valores de las columnas de un registro determinado. La actualización de loa datos se realiza solo de manera visual. Los nuevos datos no se persisten.
		 *
		 * @name jQuery.rup_table#setRowData
		 * @function
		 * @param {string} rowid - Identificador del registro que se desea actualizar.
		 * @param {object} data - Objeto json que contiene los valores de cada columna de la nueva línea.
		 * @param {string} cssp - En caso de especificarse, se añadirán a la línea las class de estilos aquí indicadas.
		 * @example
		 * $("#idComponente").rup_table("setRowData", "10", {campo1:valor1,campo2:valor2});
		 */
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
		/**
		 * Devuelve un objeto json con los valores de los campos del registro indicado.
		 *
		 * @name jQuery.rup_table#getRowData
		 * @function
		 * @param {string} rowid - Identificador del registro del que se quieren recuperar los datos.
		 * @return {object} - Objecto json con los valores del registro.
		 * @example
		 * $("#idComponente").rup_table("getRowData", "10");
		 */
		getRowData: function(rowid){
			var $self = $(this);
			return $self.jqGrid("getRowData", rowid);
		},
		/**
		 * Devuelve un array con los identificadores de los registros que se muestran actualmente en la página de la tabla.
		 *
		 * @name jQuery.rup_table#getDataIDs
		 * @function
		 * @return {string[]} - Identificadores de lso registros mostrados en la página actual.
		 * @example
		 * $("#idComponente").rup_table("getDataIDs");
		 */
		getDataIDs : function () {
			var $self = $(this);
			return $self.jqGrid("getDataIDs");
		},
		/**
		 * Limpia los registros mostrados en la tabla.
		 *
		 * @name jQuery.rup_table#clearGridData
		 * @function
		 * @param {boolean} clearfooter - En caso de indicarse como true se elimina la información del pié de la tabla.
		 * @example
		 * $("#idComponente").rup_table("clearGridData", false);
		 */
		clearGridData : function (clearfooter) {
			var $self = $(this);
			return $self.jqGrid("clearGridData", clearfooter);
		},
		/**
		 * Devuelve el objeto colModel del componente jqGrid.
		 *
		 * @name jQuery.rup_table#getColModel
		 * @function
		 * @return {object} - Objeto colModel de la tabla.
		 * @example
		 * $("#idComponente").rup_table("getColModel");
		 */
		getColModel : function () {// Función que devuelve el colModel directamente.
			var $self = $(this);
			return $self.jqGrid("getGridParam", "colModel");
		},
		/**
		 * Devuelve el valor de la columna de la fila indicada.
		 *
		 * @name jQuery.rup_table#getCol
		 * @function
		 * @param {string} rowid - Identificador de la fila.
		 * @param {string} colName - Nombre de la columna.
		 * @example
		 * $("#idComponente").rup_table("getCol", "10", "nombre");
		 */
		getCol : function (rowid, colName) { //Función que devuelve el valor de la celda de la fila que se le pasa como paramtero. El colName puede ser o el indice de la columna o el nombre de la misma
			var $self = $(this);
			return $self.jqGrid("getCell", rowid, colName);
		},
		/**
		 * Devuelve un objeto json que contiene la serialización del formulario.
		 *
		 * @name jQuery.rup_table#getSerializedForm
		 * @function
		 * @param {jQuery} form - Formulario que se desea serializar.
		 * @param {boolean} skipEmpty - En caso de indicarse true se omiten los campos que no contienen valor.
		 * @example
		 * $("#idComponente").rup_table("getSerializedForm", $("#idFormulario"), false);
		 */
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


/**
	* Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación.
	*
	* @callback jQuery.rup_table~onOperation
	* @param {string} key - Identificador de la operación
	* @param {object} options - Opciones de configuración de la operación.
	* @example
	* callback: function(key, options){
	*		alert("Operación 1");
	*	}
	*/

/**
	* Función de callback que determina si la operación debe estar habilitada o no.
	*
	* @callback jQuery.rup_table~isEnabled
	* @return {boolean} - Devuelve si la operación debe de estar habilitada o no.
	* @example
	* enabled: function(){
	*		return true;
	*	}
	*/

/**
	* Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad.
	*
	* @typedef {Object} jQuery.rup_table~Operations
	* @property {string} [name] - Texto a mostrar al usuario a la hora de visualizar la operación.
	* @property {string} [icon] - Clase CSS correspondiente al icono que se quiere visualizar junto a la operación.
	* @property {jQuery.rup_table~isEnabled} [enabled] - Función que determina si el botón se debe mostrar habilitado o deshabilitado. Esto se determina devolviendo true/false desde la función de callback aquí indicada.
	* @property {jQuery.rup_table~onOperation} [callback] - Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación.
	* @example
	* core:{
	* 	operations:{
	*			"operacion1": {
	*				name: "Operación 1",
	*				icon: "rup-icon rup-icon-new",
	*				enabled: function(){
	*					return true;
	*				},
	*				callback: function(key, options){
	*					alert("Operación 1");
	*				}
	*			},
	*			"operacion2": {
	*				name: "Operación 2",
	*				icon: "rup-icon rup-icon-new",
	*				enabled: function(){
	*					return true;
	*				},
	*				callback: function(key, options){
	*					alert("Operación 1");
	*				}
	*			}
	*		}
	* }
	*/

	/**
	* Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos.
	*
	* @typedef jQuery.rup_table~ShowOperations
	* @example
	* core:{
	*		showOperations:{
	*			add:false;
	*			clone:false;
	*		}
	*	}
	*/

	/**
	* @description Propiedades de configuración del componente.
	* @see Para mas información consulte la documentación acerca de las opciones de configuración del componente {@link http://www.trirand.com/jqgridwiki/doku.php|jqGrid}.
	*
	* @name jQuery.rup_table#options
	* @property {boolean} [altRows=true] - Determina si se aplica o no el pijama en las filas de la tabla.
	* @property {string} [altclass=rupgrid_oddRow] - Estilo que se aplica a las filas impares para mostrar el efecto.
	* @property {string} [datatype=json] - Formato de dato esperado para representar los registros de la tabla.
	* @property {string} [height=auto] - Determina la altura de la tabla.
	* @property {object} [jsonReader={repeatitems: false}] - Parámetros de configuración que determinan el modo en el que se va a procesar el json de retorno del servidor
	* @property {boolean} [resizable=false] - Determina si la tabla puede ser redimensionada mediante el ratón.
	* @property {number} [rowNum=10] - Número de registros por página que se van a mostrar en la tabla.
	* @property {number[]} [rowList=[10,20,30]] - Lista de posibles valores para el número de elementos por página que se van a mostrar en el combo de selección correspondiente.
	* @property {boolean} [sortable=true] - Determina si se permite variar el orden de las columnas arrastrándolas.
	* @property {boolean} [viewrecords=true] - Indica si se debe mostrar el rango de elementos que se están visualizando en la tabla.
	* @property {boolean} [loadOnStartUp=true] - Determina si se debe realizar automáticamente la búsqueda al cargar la página.
	* @property {string} [multiplePkToken=~] - Separador que se utiliza en los casos en los que la clave primaria sea múltiple. Se creará una columna que contenga un identificador único resultante de la concatenación de las claves primarias realizada mediante el separador aquí indicado.
	* @property {jQuery.rup_table~Operations} [operations] - Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad.
	* @property {jQuery.rup_table~ShowOperations} [showOperations] - Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos.
	* @property {number} [startOnPage=1] - Permite especificar el número de página inicial que se mostrará al cargar la página.
	*/

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

/* ********* */
/* EVENTOS
/* ********* */

/**
* Evento que se produce al detectarse que el usuario interactua con un elemento externo a la tabla.
*
* @event jQuery.rup_table#rupTable_checkOutOfGrid
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {jQuery} $originalTarget - Objeto jQuery que referencia el elemento del dom con el que ha interactuado el usuario.
* @example
* $("#idComponente").on("rupTable_checkOutOfGrid", function(event,
* $originalTarget){ });
*/

/**
* Este evento se lanza durante el proceso de serialización de la información que va a ser enviada para obtener los registros que se van a mostrar en la tabla.
*
* @event jQuery.rup_table#rupTable_serializeGridData
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Información serializada que va a ser enviada. Se puede modificar o agregar nuevos campos para completarla.
* @example
* $("#idComponente").on("rupTable_serializeGridData", function(event, data){
* });
*/

/**
* Evento que se lanza antes de que se procese la información recibida del servidor.
*
* @event jQuery.rup_table#rupTable_beforeProcessing
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {object} data - Información recibida del servidor.
* @property {string} st - Mensaje de status de la petición.
* @property {object} xhr - Objeto xhr recibido.
* @example
* $("#idComponente").on("rupTable_beforeProcessing", function(event, data, st,
* xhr){ });
*/

/**
* Se produce cuando se elimina el resaltado de un registro de la tabla.
*
* @event jQuery.rup_table#rupTableClearHighlightedRowAsSelected
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {jQuery} $row - Objeto jQuery que identifica la línea que se ha procesado.
* @example
* $("#idComponente").on("rupTableClearHighlightedRowAsSelected", function(event, $row){ });
*/

/**
* Se produce cuando se añade el resaltado a un registro de la tabla.
*
* @event jQuery.rup_table#rupTableHighlightRowAsSelected
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @property {jQuery} $row - Objeto jQuery que identifica la línea que se ha procesado.
* @example
* $("#idComponente").on("rupTableHighlightedRowAsSelected", function(event, $row){ });
*/

/**
* Evento que se lanza después de que el componente haya finalizado con el proceso de configuración e inicialización.
*
* @event jQuery.rup_table#rupTable_coreConfigFinished
* @property {Event} e - Objeto Event correspondiente al evento disparado.
* @example
* $("#idComponente").on("rupTable_coreConfigFinished", function(event, $row){ });
*/

})(jQuery);
