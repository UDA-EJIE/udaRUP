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

(function (jQuery) {

	jQuery.rup_table.registerPlugin("jerarquia",{
		loadOrder:11,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("preConfigurejerarquia", settings);
			
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("postConfigurejerarquia", settings);
		}
	});
	
	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************
	jQuery.fn.rup_table("extend",{
		preConfigurejerarquia: function(settings){
			
			var $self = this, jerarquiaSettings = settings.jerarquia;
			
			//Contenedor de parámetros de la jerarquia
			$self.jqGrid("setGridParam",{postData:{jerarquia:{}}});
			
			//Sobreescribir valores y funciones TREEGRID
			settings.treeGrid = true;
			settings.rowTotal = 0; //(avoid default feature)
			settings.treeGridModel = 'adjacency'; //default: nested
			settings.treeIcons = jerarquiaSettings["icons"];
			//(avoid default function)
			var setTreeGrid_default = $self.jqGrid.setTreeGrid;
			jQuery.jgrid.extend({
				setTreeGrid : function() {
					setTreeGrid_default.call($self);
					$self[0].p.altRows = true;   			//pijama
					$self[0].p.pgbuttons = true;			//enlaces paginación
					$self[0].p.pginput = true;				//selector de página
					$self[0].p.rowList = settings.rowList;	//núm. elementos/página
					if (settings.multiselect){
						$self[0].p.multiselect = true;		//multiselección
					}
				}
			});
			
			// Se configura la url de filtrado
			if (settings.filter.childrenUrl === null){
				settings.filter.childrenUrl = settings.baseUrl +"Children";
			}
			
			//Columna de jerarquía
			settings.ExpandColumn = jerarquiaSettings["column"];
			
			//Si es multiselección se debe de desplazar el puntero de la columna a la siguiente (da igual que sea oculta)
			if (settings.multiselect){
				for (key in settings.colModel){
					if (settings.colModel[key].name === settings.ExpandColumn){
						key = parseInt(key)+1;
						//Si no hay columna siguiente se crea una oculta para esto
						if (settings.colModel[key] === undefined){
							settings.colNames[key] = "jerarquia_multiselect";
							settings.colModel[key] = {name: "jerarquia_multiselect", hidden: true };
						}
						settings.ExpandColumn = settings.colModel[key].name;
						break;
					}
				}
			}
			
			//Añadir columnas de la jerarquía
			settings.colNames = jQuery.merge(["level"], settings.colNames);
			settings.colModel = jQuery.merge([{ name: "level", hidden: true }], settings.colModel);
			settings.colNames = jQuery.merge(["isLeaf"], settings.colNames);
			settings.colModel = jQuery.merge([{ name: "isLeaf", hidden: true }], settings.colModel);
			settings.colNames = jQuery.merge(["parentNodes"], settings.colNames);
			settings.colModel = jQuery.merge([{ name: "parentNodes", hidden: true }], settings.colModel);
			settings.colNames = jQuery.merge(["filter"], settings.colNames);
			settings.colModel = jQuery.merge([{ name: "filter", hidden: true }], settings.colModel);
			
			//Inicializar los elementos contraidos
			jQuery($self).data("tree", []);

			//Sobreescribir evento expandir/contraer
			$self.on({
				"rupTable_serializeGridData.multiselection": function(events, postData){
					//Token para separar los nodos (para tooltip)
					jQuery.extend(true, postData, {"jerarquia" : { "token" :  jerarquiaSettings["token"] } } );

					if (jQuery.isArray(postData.jerarquia.tree) && postData.jerarquia.tree.length === 0){
						postData.jerarquia.tree = "";
					}
				},
				"jqGridAddEditAfterComplete.rupTable.jerarquia":function(){
					//Desactivar TREEGRID
					$self[0].p.treeGrid = false; //(avoid default feature)
				},
//				"jqGridAddEditBeforeSubmit.rupTable.jerarquia": function(event, postData, $form, frmoper){
//					var parentProp = jQuery.proxy(settings.getRowForEditing, $self)();
//					if (parentProp!==undefined){
//						postData[settings.jerarquia.parentProp] = parentProp;
//					}
//				},
				"jqGridAddEditBeforeSubmit.rupTable.jerarquia jqGridBeforeRequest.rupTable.jerarquia": function(){
					//Activar TREEGRID
					$self[0].p.treeGrid = true; //(avoid default feature)
				},
				"jqGridLoadComplete.rupTable.jerarquia": function(event, data){
					//Array de elementos contraidos
					var collapsedNodes = jQuery($self).data("tree"),
						collapsedNodes_length = collapsedNodes.length;
					
					//ICONOS: contraidos (tree)
					for (var i=0; i<collapsedNodes_length; i++){
						jQuery("[id='"+collapsedNodes[i]+"'] .tree-wrap > div")
							.removeClass("tree-leaf "+settings.treeIcons.leaf)
							.addClass("tree-minus "+settings.treeIcons.minus);
					} 
					
					//ICONOS: filtrado (filter) y tooltip (parentNodes)
					var rows =  $self.rup_table("getGridParam","data"),
						rows_length = rows.length,
						$filterIcon = jQuery("<div />")
										.addClass("rup-jerarquia_filter ui-icon")
										.addClass(jerarquiaSettings["icons"]["filter"])
										.text(jQuery.rup.i18nParse(jQuery.rup.i18n.base,"rup_grid_jerarquia.icons.filtered"));
					for (var i=0; i<rows_length; i++){
						var rowId = jQuery.jgrid.getAccessor(rows[i], $self.rup_table("getGridParam", "localReader").id),
							$rowColumn = jQuery("tr[id='"+rowId+"'] > td .tree-wrap");
						//Filtro
						if (rows[i].filter){
							$rowColumn.prepend($filterIcon.clone());	
						}
						//Tooltip
						if (jerarquiaSettings["parentNodesTooltip"]){
							$rowColumn.parent().rup_tooltip({content: { text: $self._parseParentNodes(rows[i].parentNodes) } });
						}
					}
					
					//EVENTOS: Expandir (plus) - Contraer (minus)
					jQuery(".tree-plus, .tree-minus").off("click");
					jQuery(".tree-plus, .tree-minus").on("click", function (event){
						var $iconDiv = jQuery(this), 
							rowId = $self.rup_table("getGridParam","_index")[$iconDiv.closest("tr.jqgrow")[0].id],
							rowData = $self.rup_table("getGridParam","data")[rowId],
							nodeId = jQuery.jgrid.getAccessor(rowData, $self.rup_table("getGridParam","localReader").id);
						
						//Añadir o eliminar elemento para query (y almacenarlo en la tabla)
						if ($iconDiv.hasClass(settings.treeIcons.plus)){
							collapsedNodes.push(nodeId);
						} else {
							collapsedNodes.splice(jQuery.inArray(nodeId, collapsedNodes), 1);
						}
			        	jQuery($self).data("tree", collapsedNodes);
						
						//Buscar (añadiendo colapsados)
			        	$self.jqGrid("setGridParam",{postData:{"jerarquia":{"tree":collapsedNodes.toString()}}});
						$self.trigger("reloadGrid");
					});
					
					//Desactivar TREEGRID
					$self[0].p.treeGrid = false; //(avoid default feature)
				}
			});
			
			//Eventos que producen reset de los elementos expandidos
			jQuery.each (jerarquiaSettings["resetEvents"], function (index, object) {
				var callback = jQuery.isFunction(object[0]) ? object.shift() : null,
					ids = "[id='" + object.join("'], [id='") + "']";
				//Asociar el evento
				jQuery(ids).on(index, function (event) {
					if (callback === null || callback.call($self, event) === false){
						$self.reset();
					}
				});
				//El evento se ejecuta el primero en secuencia
				for (var i=0; i<object.length; i++){
					jQuery._data(jQuery("#"+object[i])[0], "events")[index] = jQuery._data(jQuery("#"+object[i])[0], "events")[index].reverse();	
				}
			});
			
			//Activar contextMenu
			settings.multiselection.rowContextMenu_enabled = settings.jerarquia.contextMenu;
		},
		postConfigurejerarquia: function(settings){
			var $self = this, jerarquiaSettings = settings.jerarquia;
		}
	});
	
	/**
	 * Métodos públicos del plugin jerarquia. 
	 * 
	 * Los métodos implementados son:
	 * 
	 * reset: Reiniciar los elementos expandidos
	 */
	jQuery.fn.rup_table("extend",{
		//Reiniciar los elementos expandidos
		reset : function () {
			jQuery(this).data("tree", []);
			jQuery(this).jqGrid("setGridParam",{postData:{"jerarquia":{"tree":[]}}});
		}
	});
	
	
	/**
	 * Métodos privados del plugin jerarquia. 
	 * 
	 * Los métodos implementados son:
	 * 
	 * _parseParentNodes(parentNodes): Procesar valores del tooltip
	 * _getJerarquiaChildren($trigger, key, options : Obtener los hijos/descendientes para seleccionar/deseleccionar
	 */
	jQuery.fn.rup_table("extend",{
		_parseParentNodes : function (parentNodes){
			var parentNodesTooltipFnc = this.data("settings")["jerarquia"]["parentNodesTooltipFnc"],
				nodes = parentNodes.split(this.data("settings")["jerarquia"]["token"]).slice(1);//filtrar primer separador
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
		//f(x) del contextMenu de multiselect con jerarquia
		_getJerarquiaChildren : function ($trigger, key, options) {
			var $self = this, settings = $self.data("settings"),
//        		rowData = $self.rup_table("getGridParam","data")[$trigger.parent().index()-1],
        		rowData = $self.rup_table("getRowData",$trigger.parent().attr("id")),
				ajaxData = {
					jerarquia:{
							//tree : {}, //Obviar elementos contraidos 
							parentId : jQuery.jgrid.getAccessor(rowData,settings.primaryKeyCol),
							child : key.toLowerCase().indexOf("child")!=-1
					//FIXME: Quitar esto 
					},
					filter :$self.rup_table("getFilterParams")
        		};
        	jQuery.extend(true, ajaxData, $self.rup_table("getGridParam", "postData")); 
        	var primaryKey = jQuery.isArray(settings.primaryKey)?settings.primaryKey[0]:settings.primaryKey;
			jQuery.rup_ajax({
				url: settings.filter.childrenUrl,
				dataType: 'json',
				data: jQuery.toJSON(ajaxData),
				type: "POST",
				async: false,
				contentType: 'application/json',		    
				beforeSend: function (xhr) {
					xhr.setRequestHeader("JQGridModel", true);
					xhr.setRequestHeader("RUP", jQuery.toJSON({primaryKey:primaryKey}));
				},
				success : function (xhr, ajaxOptions) {
					var children = xhr["children"],
						children_length = children.length,
						status = key.indexOf("deselect")!=-1?false:true;
					
					for (var i=0; i<children_length; i++){
						var record = children[i];
							rowPK = record.pk[primaryKey];
						
						//FIXME: Generalizar esto
						$self._refreshSelectedElements(settings, status, rowPK, record);
					}
					//Actualizar datos
					$self.triggerHandler("rupTable_multiselectionUpdated");
				},
				error : function (xhr, ajaxOptions, thrownError) {
				},
				complete : function (xhr, textStatus){
				}
			});
        }
	});
	
	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON  
	//*******************************************************
	// Parámetros de configuración por defecto para la jerarquía.
	jQuery.fn.rup_table.plugins.jerarquia = {};
	jQuery.fn.rup_table.plugins.jerarquia.defaults = {
		treedatatype:'json',
		formEdit:{
			addEditOptions:{
				reloadAfterSubmit : true
			}
		},
		jerarquia : { 
			token : "/",
			icons: {
				plus: 'ui-icon-triangle-1-se',
				minus:'ui-icon-triangle-1-e',
				leaf: 'ui-icon-none',
				filter: 'ui-icon-star'
			},
			parentNodesTooltip : true,
			parentNodesTooltipFnc : null,
			contextMenu : true
		}
	};
})(jQuery);