import { PassThrough } from "stream";

/* eslint-env es6*/
/**
  * Genera un table
  *
  * @summary 		Componente RUP Datatable
  * @module			"rup.table"
  * @version     1.0.0
  * @license
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
  * @copyright   Copyright 2018 E.J.I.E., S.A.
  *
  */

/*global define */
/*global jQuery */

( function( factory ) {
    if ( typeof define === 'function' && define.amd ) {

        // AMD. Register as an anonymous module.
        define( ['jquery','./rup.table.request','datatables.net-bs4','./rup.table.responsive','./rup.table.multiSelect','./rup.table.seeker','./rup.table.inlineEdit','./rup.table.editForm','./rup.table.buttons','./rup.table.colReorder','./rup.table.select','./rup.table.rowGroup','./rup.table.masterDetail','./rup.table.multiFilter', '../core/utils/form2object'], factory );
    } else {

        // Browser globals
        factory( jQuery );
    }
} ( function( $ , TableRequest) {

    //****************************************************************************************************************
    // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá los métodos y la función de jQuery)
    //****************************************************************************************************************

    var DataTable = $.fn.dataTable;
    var rup_table = {};

    //Se configura el arranque de UDA para que alberge el nuevo patrón
    $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_table', rup_table));

    //*******************************
    // DEFINICIÓN DE MÉTODOS RUP
    //*******************************
    $.fn.rup_table('extend',{
        getRupValue: function() {
            return null;
        },
        setRupValue: function(value) {

        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PÚBLICOS
    //*******************************
    $.fn.rup_table('extend',{
        foo: function() {
            return this;
        },
        //$("#idTable").rup_table("createButton",options, posicion);
        createButton: function(props,pos) {
            var dt = $("#"+this[0].id).DataTable();
            var ctx = dt.context[0];
            var idTable = ctx.sTableId;
            if(pos === undefined){
                pos = 0;
            }
            if(ctx.oInit.buttons !== undefined && props !== undefined){
                if(props.custom === undefined){
                    props.custom = true;
                }
                // Añadimos el boton genérico
                dt.button().add(pos, {
                    text: ()=>{return props.text;},
                    id: props.id, // Campo obligatorio si se quiere usar desde el contextMenu
                    className: props.className,
                    icon: props.icon,
                    displayRegex: props.regex, // Se muestra siempre que sea un numero positivo o neutro
                    insideContextMenu: props.insideContextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
                    action: props.action,
                    custom:props.custom
                });
            }else{
                alert('Está función requiere el plugin de buttons y dos parámetros.');
            }
        },
        removeButton: function(selector) {
            var dt = $("#"+this[0].id).DataTable();
            var ctx = dt.context[0];

            if(ctx.oInit.buttons !== undefined){
                dt.buttons( selector ).remove();
            }
        },
        disableButton: function(selector,contextMenu) {
            var dt = $("#"+this[0].id).DataTable();
            var ctx = dt.context[0];

            if(ctx.oInit.buttons !== undefined){
                dt.buttons( selector ).disable(contextMenu);
            }
        },
        enableButton: function(selector,flag,contextMenu) {
            var dt = $("#"+this[0].id).DataTable();
            var ctx = dt.context[0];

            if(ctx.oInit.buttons !== undefined){
                dt.buttons( selector ).enable(flag,contextMenu);
            }
        },
        //$("#idTable").rup_table("getContext");
        getContext: function() {
            var dt = $('#'+this[0].id).DataTable();
            return dt.context[0];
        }
    });

    //*******************************
    // DEFINICIÓN DE MÉTODOS PRIVADOS
    //*******************************

    $.fn.rup_table('extend',{

        /**
			* Inicializa ciertas opciones del componente
			*
			* @name _initOptions
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
        _initOptions: function(options) {
            var $self = this;
            var sTableId = $self[0].id;

            options.processing = true;
            options.serverSide = true;
            options.columns = options.columns || $self._getColumns(options);

            //filter			
            // options.filterForm = $self.attr('data-filter-form');
            options.$filterForm = $(options.filterForm);

            options.$filterButton = options.$filterForm.find('#' + sTableId + '_filter_filterButton');
            options.$clearButton = options.$filterForm.find('#' + sTableId + '_filter_cleanButton');
            options.$filterButton.on('click', function(){ $self._doFilter(options);});
            options.$clearButton.on('click', function(){$self._clearFilter(options);});

            // Urls
            var baseUrl = options.urlBase;
            options.urls = {
                base : baseUrl,
                filter : baseUrl + '/filter'
            };

            options.ajax = this._ajaxOptions(options);

            options.language = {
                'url': $.rup.RUP + '/resources/rup.i18n_' + $.rup.lang + '.json'
            };

            //Extend 
            /*{targets:   4,data: "download_link",render: function (  ) {
		         return '<a href="">Download</a>';
		     }}*/
            var defes = {};
            var columnDefs = $.extend({}, options.columnDefs, defes);
            //options.columnDefs = columnDefs;
			
            //Se cargan los metodos en la API, Se referencia al Register
            var apiRegister = DataTable.Api.register;
			
            DataTable.Api.register( 'rupTable.selectPencil()', function ( ctx,idRow ) {
                //Se elimina el lapicero indicador.
                $('#'+ctx.sTableId+' tbody tr td.select-checkbox i.selected-pencil').remove();
                //se añade el span con el lapicero
                if(idRow >= 0){
                    var spanPencil = $("<i/>").addClass('mdi mdi-pencil ui-icon-rupInfoCol selected-pencil');
                    $($('#'+ctx.sTableId+' tbody tr td.select-checkbox')[idRow]).append(spanPencil);
                }
            } );
			
            apiRegister( 'rupTable.reorderDataFromServer()', function ( json,ctx ) {
                //Se mira la nueva reordenacion y se ordena.
                ctx.multiselection.selectedIds = [];
                ctx.multiselection.selectedRowsPerPage = [];
				
                //Viene del servidor por eso la linea de la pagina es 1 menos.
                $.each(json.reorderedSelection,function(index,p) {
                    var arra = {id:DataTable.Api().rupTable.getIdPk(p.pk,ctx.oInit),page:p.page,line:p.pageLine-1};
                    ctx.multiselection.selectedIds.splice(index,0,arra.id);
                    ctx.multiselection.selectedRowsPerPage.splice(index,0,arra);
                });
                if(!ctx.multiselection.selectedAll){
                    ctx.multiselection.numSelected = ctx.multiselection.selectedIds.length;
                }
				
                // Detecta cuando se pulsa sobre el boton de filtrado o de limpiar lo filtrado
                if(options.buttons !== undefined && ctx._buttons !== undefined){
                    ctx._buttons[0].inst.s.disableAllButttons = undefined;
                    DataTable.Api().buttons.displayRegex(ctx);
                }
                $('#'+ctx.sTableId).triggerHandler('tableAfterReorderData');
            } );
			
            apiRegister( 'rupTable.getIdPk()', function ( json, optionsParam ) {
				
                var opts = options;
                if(optionsParam !== undefined){
                    opts = optionsParam;
                }

                var id = '';
				
                $.each(opts.primaryKey, function(index, key) {
                	// Comprueba si la primaryKey es un subcampo
                	if(key.indexOf('.') !== -1) {
                		id = $self._getDescendantProperty(json, key);
                	} else {
                		id = id + json[key];
                	}
                	
                    if(opts.primaryKey.length > 1 && index < opts.primaryKey.length-1){
                        id = id+opts.multiplePkToken;
                    }
                });
				
                return id;
            } );
		
            /**
		* Método que gestiona el bloqueo de la edición de las claves primarias.
		*
		* @name blockPKEdit
		* @function
		* @since UDA 3.7.0 // Table 1.0.0
		*
		* @param {object} ctx - Settings object to operate on.
		* @param {string} actionType - Método de operación CRUD.
		*
		*/
            apiRegister( 'rupTable.blockPKEdit()', function ( ctx, actionType , sufijo) {

                var blockPK = ctx.oInit.blockPKeditForm;
                var idForm = '';
                if(ctx.oInit.formEdit !== undefined){
                    idForm = ctx.oInit.formEdit.idForm;
                }else{
                    idForm = $('#'+ctx.sTableId+'_search_searchForm');
                }
                var primaryKey = ctx.oInit.primaryKey;
			
                // Comprobamos si el bloqueo de claves primarias esta activo y la tabla tiene alguna columna definida como clave primaria.
                if(blockPK && primaryKey.length > 0) {
                    // En caso de ser edición bloqueamos la modificación
                    if(actionType === "PUT") {
                        $.each(primaryKey,function(key,id) {
                            var input = $(idForm[0]).find(":input[name='" + id + "']");
                            if(sufijo !== undefined){
                                input = $(idForm[0]).find(":input[name='" + id + sufijo + "']");
                            }
						
                            // Comprobamos si es un componente rup o no. En caso de serlo usamos el metodo disable.
                            if(input.attr("ruptype") === "date" && !input.rup_date("isDisabled")) {
                                input.rup_date("disable");
                            } 
                            else if(input.attr("ruptype") === "combo" && !input.rup_combo("isDisabled")) {
                                input.rup_combo("disable");
                            }
                            else if(input.attr("ruptype") === "time" && !input.rup_time("isDisabled")) {
                                input.rup_time("disable");
                            }
                            else if(input.attr("type") === "checkbox") {
                                if(!input.hasClass("checkboxPKBloqueado")) {
                                    input.addClass("checkboxPKBloqueado");						
                                }
							
                                var valorCheck = input.is(":checked") ? 1 : 0;
                                var selectorInputSustituto = $("#" + id + "_bloqueado");
							
                                // Comprobamos si es necesario cambiar el check
                                if(selectorInputSustituto.attr("valor") !== valorCheck){
                                    if(selectorInputSustituto.attr("valor") !== undefined){
                                        selectorInputSustituto.remove();
                                    }
								
                                    if(valorCheck === 1) {
                                        input.after("<i id='" + id + "_bloqueado' class='mdi mdi-check sustitutoCheckboxPKBloqueadoGeneral' valor='1' aria-hidden='true'/>");
                                    } else {
                                        input.after("<i id='" + id + "_bloqueado' class='mdi mdi-close sustitutoCheckboxPKBloqueadoGeneral sustitutoCheckboxPKBloqueadoCross' valor='0' aria-hidden='true'/>");
                                    }
                                }
                            }
                            else {
                                input.prop("readOnly", true);
                            }
						
                            // Quitamos el foco del elemento
                            input.on('mousedown', function(event) {
                                event.preventDefault();
                            });
                        });
                    } 
                    // En caso de ser clonación permitimos la edición
                    else if(actionType === "POST"){
                        $.each(primaryKey,function(key,id) {
                            var input = $(idForm[0]).find(":input[name='" + id + "']");
						
                            // Comprobamos si es un componente rup o no. En caso de serlo usamos el metodo enable.
                            if(input.attr("ruptype") === "date" && input.rup_date("isDisabled")) {
                                input.rup_date("enable");
                            } 
                            else if(input.attr("ruptype") === "combo" && input.rup_combo("isDisabled")) {
                                input.rup_combo("enable");
                            }
                            else if(input.attr("ruptype") === "time" && input.rup_time("isDisabled")) {
                                input.rup_time("enable");
                            }
                            else if(input.attr("type") === "checkbox") {
                                input.removeClass("checkboxPKBloqueado");
                                $("#" + id + "_bloqueado").remove();
                            }
                            else {
                                input.prop("readOnly", false);
                            }
						
                            // Devolvemos el foco al elemento
                            input.on('mousedown', function(event) {
                                $(this).unbind(event.preventDefault());
                                input.focus();
                            });
                        });
                    }
                }

            }	);
			
            if(options.inlineEdit !== undefined){
                //RESPONSIVO CON EDITLINE
	            var renderer = function ( api, rowIdx, columns ) {
	    			var data = $.map( columns, function ( col ) {
	    				var colShow = col.hidden ?
	    					'<li data-dtr-index="'+col.columnIndex+'" data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
	    						'<span class="dtr-title">'+
	    							col.title+
	    						'</span> '+
	    						'<span class="dtr-data">'+
	    							col.data+
	    						'</span>'+
	    					'</li>' :
	    					'';
	    				return colShow;
	    			} ).join('');
	
	    			var value = data ?	$('<ul data-dtr-index="'+rowIdx+'" class="dtr-details"/>').append( data ) :	false;
	    			var ctx = api.context[0];
	    			var $row = $('#'+ctx.sTableId+' tbody tr:not(.child):eq('+rowIdx+')');
	    			if($row.hasClass('editable')){
	    				DataTable.Api().inlineEdit.inResponsiveChangeInputsValues(ctx,$row);
	    				if(ctx.oInit.inlineEdit.rowDefault !== undefined && ctx.oInit.inlineEdit.rowDefault === 'cambioEstado'){
	    					ctx.oInit.inlineEdit.rowDefault = 'estadoFinal';
	    				}
	    			}
	    			return value;
	            };
	            options.responsive.details.renderer = renderer;
            }
			
            return options;
        },
        
		/**
		* Obtiene el subcampo
		*
		* @name _getDescendantProperty
		* @function
		* @since UDA 4.1.0 // Table 1.0.0
		*
		* @param {object} obj - Valores de la fila
		* @param {string} key - Clave para extraer el valor
		*
		*/
        _getDescendantProperty(obj, key) {
            var indexes = key.split(".");

            while (indexes.length && obj) {
                var index = indexes.shift();
                var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(index);
                
                // Comprueba si es un array y aplica la logica necesaria para obtener el valor
                if ((match !== null) && (match.length == 3)) {
                    var arrayData = { arrayName: match[1], arrayIndex: match[2] };
                    if (obj[arrayData.arrayName] != undefined) {
                        obj = obj[arrayData.arrayName][arrayData.arrayIndex];
                    } else {
                        obj = undefined;
                    }
                } else {
                    obj = obj[index]
                }
            }

            return obj;
        },

        /**
			* Obtiene las columnas
			*
			* @name _getColumns
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
        _getColumns(options) {
            var $self = this;
            //Se crea la columna del select.
            if(options.columnDefs !== undefined && options.columnDefs.length > 0 &&
					options.columnDefs[0].className !== undefined && options.columnDefs[0].className === 'select-checkbox' &&
					(options.multiSelect !== undefined)){
                //Se crea el th thead, se añade la columna.
				
                var th = $("<th/>").attr('data-col-prop','');

                if($self[0].tHead !== null){
                    $(th).insertBefore($self[0].tHead.rows[0].cells[0])
                }

                //Se aseguro que no sea orderable
                if(options.columnDefs.length > 0){
                    options.columnDefs[0].orderable = false;
                }
                //Se oculta la columna por decision del usuario
                if(options.multiSelect !== undefined && options.multiSelect.hideMultiselect){
                	options.columnDefs[0].visible = false;
                }
            }
			
            //se crea el tfoot
            var $tfoot = $('<tfoot>').appendTo($self[0]);
            var $tr = $('<tr>').appendTo($tfoot);
			
            var columns = this.find('th[data-col-prop]').map((i, e) => {
                //se añaden las columnas al tfoot
                var $th = $('<th>').appendTo($tr);
                $th.text($(e).text());
				
                if(e.getAttribute('data-col-type') === 'Checkbox'){
                    options.columnDefs.push({targets:i,data: "",render: function (data, visibility, object, colRows ) {
                        var iconCheck = 'mdi-close';
                        if(data === '1'){
                            iconCheck = 'mdi-check';
                        }
				    return '<div class="centerOnResponsiveContainer"><i class="mdi ' + iconCheck + ' mx-auto"></i></div>';
			    }});
                }
                return {
                    data: e.getAttribute('data-col-prop'),sidx:e.getAttribute('data-col-sidx'),editable:!(e.getAttribute('data-col-edit') === "false") 
                };
            });
			
            columns[0].sDefaultContent = ''; 
			
            return columns;
        },

        /**
			* Filtrado
			*
			* @name _doFilter
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
        _doFilter(options) {
            var $self = this;
            $self._showSearchCriteria();
            $self.DataTable().ajax.reload(() => {
                $('#'+options.id).trigger('tableFilterSearch');
            });

        },

        /**
			* Prepara el objeto necesario para la consulta de registros al servidor
			*
			* @name _ajaxOptions
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
        _ajaxOptions(settings) {
			
        	settings.id = this[0].id;
            $('#'+settings.id).triggerHandler('tableFilterInitialize');
            
            let ajaxData = {
                'url': settings.urls.filter,
                'dataSrc': function ( json ) {
                    let ret = {};
                    $('#'+settings.id).triggerHandler('tableFilterBeforeShow');
                    json.recordsTotal = json.records;
                    json.recordsFiltered = json.records;

                    ret.recordsTotal = json.records;
                    ret.recordsFiltered = json.records;
                    ret.data = json.rows;

                    let table = $('#'+settings.id).DataTable();
                    let ctx = table.context[0];
                    
                    if(settings !== undefined && (settings.multiSelect !== undefined || settings.select !== undefined)){
                        DataTable.Api().rupTable.reorderDataFromServer(json,ctx);
                    }
                    if(ctx.seeker !== undefined && ctx.seeker.search !== undefined 
							&& json.reorderedSeeker !== undefined){
                        ctx.seeker.search.funcionParams = json.reorderedSeeker;
                    }
					
                    if(ctx.oInit.inlineEdit !== undefined ){
                        if(ctx.oInit.inlineEdit.alta && !$('#'+ctx.sTableId+' tbody tr:eq(0)').hasClass("new")){
                            ret.data = DataTable.Api().inlineEdit.createTr(table,ctx,ret.data);
                        }else{
                            ctx.oInit.inlineEdit.alta = undefined;
                        }
                        DataTable.Api().seeker.disabledButtons(ctx);
                        if(ctx.inlineEdit !== undefined && ctx.inlineEdit.lastRow !== undefined){
                            ctx.inlineEdit.lastRow.idx = -1;
                        }
                    }
                    return ret.data;
                },
                'type': 'POST',
                'data': this._ajaxRequestData,
                'contentType': 'application/json',
                'dataType': 'json'
            };
            
            if(settings.customError !== undefined) {
            	ajaxData.error = settings.customError;
            }

            return ajaxData;
        },
        /**
			* Solicita los datos al servidor
			*
			* @name _ajaxRequestData
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} data Opciones del table
			* @param {object} ctx contexto  del componente table
			*
		  */
        _ajaxRequestData(data, ctx) {
            //Para añadir un id de busqueda distinto al value, como por ejemplo la fecha.
            data.columns[data.order[0].column].colSidx = ctx.aoColumns[data.order[0].column].colSidx;
            //El data viene del padre:Jquery.table y como no tiene el prefijo de busqueda se añade.
            if(ctx.oInit.$filterForm[0] !== undefined){
                data.filter = form2object(ctx.oInit.$filterForm[0]);
            }
            data.multiselection = undefined;
            if(ctx.multiselection !== undefined && ctx.multiselection.selectedIds.length > 0){
                data.multiselection = $.rup_utils.deepCopy(ctx.multiselection,4);
                data.multiselection.internalFeedback[0] = {};
            }
            if(ctx.seeker !== undefined && ctx.seeker.search !== undefined 
					&& ctx.seeker.search.funcionParams !== undefined && ctx.seeker.search.funcionParams.length > 0){
                data.seeker = {};
                data.seeker.selectedIds = [];
                $.each(ctx.seeker.search.funcionParams,function(index,p) {
                    data.seeker.selectedIds.splice(index,0,DataTable.Api().rupTable.getIdPk(p.pk,ctx.oInit));
                });
            }
            
            var tableRequest = new TableRequest(data);
            var json = $.extend({}, data, tableRequest.getData());

            json.core.pkNames = ctx.oInit.primaryKey;

            ctx.aBaseJson = json;
            
            // Posibles referencias circulares en json
            let cache = [];
            let strJson = JSON.stringify(json, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (cache.indexOf(value) !== -1) {
                        // Si se encuentra una key duplicada se descarta
                        return;
                    }
                    // Se almacena para ver que no se repita
                    cache.push(value);
                }
                return value;
            });
            cache = null; // Enable garbage collection
            return strJson;
        },

        /**
			* Gestiona la paginación
			*
			* @name _createSearchPaginator
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} tabla Objeto que contiene la tabla
			* @param {object} settingsT Opciones del componente
			*
		  */
        _createSearchPaginator(tabla,settingsT){
            //buscar la paginación.
            if($('#'+tabla[0].id+'_paginate').length === 1 && settingsT.json !== undefined && settingsT.json.total !== '0'){
                var liSearch = $('<li/>').addClass('paginate_button page-item pageSearch searchPaginator align-self-center');
                var textPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'pagina',settingsT.json.total);
                var toPagina = jQuery.rup.i18nTemplate(settingsT.oLanguage, 'toPagina',settingsT.json.total);
                var input = $('<input/>').attr({type: "text", size: "3",value:settingsT.json.page,maxlength:"3"}).addClass('ui-pg-input');
				
                liSearch.append(textPagina);
                liSearch.append(input);
                liSearch.append(toPagina);
				
                $('#'+tabla[0].id+'_previous').after(liSearch);
                input.keypress(function (e) {
					 if(e.which === 13)  // the enter key code
					  {
						 var page = parseInt(this.value);
						 if($.isNumeric(page) && page > 0){
							 tabla.dataTable().fnPageChange( page-1 );
						 }
					    return false;
					  }
                });
            }else{
                //Sacar un error
            }
			
            // Añade iconos para versiones moviles/tablets
            $("<i class='mdi mdi-page-first d-sm-none'></i>")
                .insertAfter($('#'+tabla[0].id+'_first')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function() {
						  return "<span/>";
                    })
                );
            $("<i class='mdi mdi-chevron-left d-sm-none'></i>")
                .insertAfter($('#'+tabla[0].id+'_previous')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function() {
						  return "<span/>";
                    })
                );
            $("<i class='mdi mdi-chevron-right d-sm-none'></i>")
                .insertAfter($('#'+tabla[0].id+'_next')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function() {
						  return "<span/>";
                    })
                );
            $("<i class='mdi mdi-page-last d-sm-none'></i>")
                .insertAfter($('#'+tabla[0].id+'_last')
                    .addClass('recolocatedPagination_iconButton')
                    .children('a')
                    .addClass('btn-material btn-material-sm btn-material-primary-low-emphasis d-none d-sm-block')
                    .wrapInner(function() {
						  return "<span/>";
                    })
                );
			
            // Inserta la lista de botones de paginacion al div anteriormente creado
            $('#'+tabla[0].id+'_paginate ul').detach().appendTo($('#'+tabla[0].id+'_paginate'));

        },

        /**
			* Limpia el filtro
			*
			* @name _clearFilter
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			* @param {object} options Opciones del componente
			*
		  */
        _clearFilter(options) {
            var $self = this;
            $('#'+options.id).triggerHandler('tableFilterReset');
            options.$filterForm.resetForm();
            $self.DataTable().ajax.reload();
            options.filter.$filterSummary.html(' <i></i>');
			
            // Provoca un mal funcionamiento del filtrado de Maestro-Detalle en la tabla esclava, 
            // ya que elimina la referencia del padre y muestra todos los valores en vez de los relacionados.
            //jQuery('input,textarea').val('');
			
            $('#' + options.id + '_filter_form .ui-selectmenu-status').text('--');
			
            $.rup_utils.populateForm([], options.$filterForm)

        },
        /**
		* Metodo que realiza la configuración del plugin filter del componente RUP DataTable.
		*
		* @name preConfigureFilter
		* @function
		*
		* @param {object} settings - Parámetros de configuración del componente.
		*
		*/
        _ConfigureFiltern(settings){
            var $self = this, tableId = this[0].id, filterSettings = settings.filter,
                toggleIcon1Tmpl,toggleLabelTmpl,filterSummaryTmpl,toggleIcon2Tmpl,$toggleIcon1,$toggleLabel,$filterSummary,$toggleIcon2;

            /*
			 * Inicialización de los identificadores y componentes por defecto de los componentes de filtrado
			 */
            filterSettings.id = (filterSettings.id!==undefined?filterSettings.id:tableId+'_filter_form');
            filterSettings.filterToolbarId = (filterSettings.filterToolbar!==undefined?filterSettings.filterToolbar:tableId+'_filter_toolbar');

            filterSettings.collapsableLayerId = (filterSettings.collapsableLayerId!==undefined?filterSettings.collapsableLayerId:tableId+'_filter_fieldset');

            filterSettings.toggleIcon1Id = (filterSettings.toggleIcon1!==undefined?filterSettings.toggleIcon1:tableId+'_filter_toggle_icon1');
            filterSettings.toggleLabelId = (filterSettings.toggleLabelId!==undefined?filterSettings.toggleLabelId:tableId+'_filter_toggle_label');
            filterSettings.filterSummaryId = (filterSettings.filterSummaryId!==undefined?filterSettings.filterSummaryId:tableId+'_filter_summary');
            filterSettings.toggleIcon2Id = (filterSettings.toggleIcon2!==undefined?filterSettings.toggleIcon2:tableId+'_filter_toggle_icon2');

            filterSettings.$filterContainer = jQuery('#'+filterSettings.id);
            filterSettings.$filterToolbar = jQuery('#'+filterSettings.filterToolbarId);

            settings.filter.showHidden = false;


            if (filterSettings.$filterContainer.length===0){
                if(settings.filterMessage === true){
                    alert('El identificador especificado para el fomulario de búsqueda no existe.');
                }
            }else if (filterSettings.$filterToolbar.length===0){
                alert('El identificador especificado para la barra de controles del formulario de filtrado no existe.');
            }else{
                /*
				 * Se almacena la referencia de los diferentes componentes
				 *
				 * $filterContainer : Contenedor del formulario de filtrado
				 * $filterButton : Botón que realiza el filtrado
				 * $cleanLink : Enlace para limpiar el formulario
				 * $collapsableLayer : Capa que puede ser ocultada/mostrada
				 * $toggleIcon1Id : Control que oculta muestra el fomulario
				 * $filterSummary : Contenedor donde se especifican los criterios de filtrado
				 */
                toggleIcon1Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleIcon1');
                toggleLabelTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleLabel');
                filterSummaryTmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.filterSummary');
                toggleIcon2Tmpl = jQuery.rup.i18nParse(jQuery.rup.i18n.base,'rup_table.templates.filter.toggleIcon2');

                $toggleIcon1 = $($.rup_utils.format(toggleIcon1Tmpl, filterSettings.toggleIcon1Id));
                $toggleLabel = $($.rup_utils.format(toggleLabelTmpl, filterSettings.toggleLabelId, $.rup.i18n.base.rup_jqtable.plugins.filter.filterCriteria));
                $filterSummary = $($.rup_utils.format(filterSummaryTmpl, filterSettings.filterSummaryId));
                $toggleIcon2 = $($.rup_utils.format(toggleIcon2Tmpl, filterSettings.toggleIcon2Id));

                filterSettings.$filterToolbar.append($toggleIcon1).append($toggleLabel).append($filterSummary).append($toggleIcon2);

                filterSettings.$filterContainer = jQuery('#'+filterSettings.id);

                filterSettings.$collapsableLayer = jQuery('#'+filterSettings.collapsableLayerId);

                filterSettings.$toggleIcon1 = $toggleIcon1;
                filterSettings.$toggleLabel = $toggleLabel;
                filterSettings.$filterSummary = $filterSummary;
                filterSettings.$toggleIcon2 = $toggleIcon2;



                // Se asigna a la tecla ENTER la funcion de busqueda.
                filterSettings.$filterContainer.bind('keydown', function(evt) {
                    if (evt.keyCode === 13) {
                        $self._doFilter(settings);
                    }
                });

                filterSettings.$filterToolbar.addClass('cursor_pointer').on({
                    'click':function(){
                        if(settings.filter.showHidden === false){
                            filterSettings.$collapsableLayer.hide();
                            filterSettings.$toggleIcon1.removeClass('mdi-chevron-down').addClass('mdi-chevron-right');
                            filterSettings.$toggleIcon2.removeClass('mdi-arrow-down-drop-circle').addClass('mdi-arrow-up-drop-circle');
                            filterSettings.$filterToolbar.removeClass('formulario_opened');
                            settings.filter.showHidden = true;
                        } else{
                            filterSettings.$collapsableLayer.show();
                            filterSettings.$toggleIcon1.removeClass('mdi-chevron-right').addClass('mdi-chevron-down');
                            filterSettings.$toggleIcon2.removeClass('mdi-arrow-up-drop-circle').addClass('mdi-arrow-down-drop-circle');
                            filterSettings.$filterToolbar.addClass('formulario_opened');
                            settings.filter.showHidden = false;
                        }
                    }
                });

                if (settings.filter.showHidden === true){
                    filterSettings.$collapsableLayer.hide();
                    filterSettings.$toggleIcon1.removeClass('mdi-chevron-down').addClass('mdi-chevron-right');
                    filterSettings.$toggleIcon2.removeClass('mdi-arrow-down-drop-circle').addClass('mdi-arrow-up-drop-circle');
                    filterSettings.$filterToolbar.removeClass('formulario_opened');
                    settings.filter.showHidden = true;
                } else {
                    filterSettings.$collapsableLayer.show();
                    filterSettings.$toggleIcon1.removeClass('mdi-chevron-right').addClass('mdi-chevron-down');
                    filterSettings.$toggleIcon2.removeClass('mdi-arrow-up-drop-circle').addClass('mdi-arrow-down-drop-circle');
                    filterSettings.$filterToolbar.addClass('formulario_opened');
                    settings.filter.showHidden = false;
                }

            }

        },
        /**
	     * Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.
	     *
	     * @name showSearchCriteria
	     * @function
	     *
	     */
        _showSearchCriteria(){
            var ctx = this.DataTable().context[0];
            var $self = this, settings = $('#'+$self[0].id).data('settings'+$self[0].id),
                searchString = ' ', label, numSelected,
                field, fieldId, fieldName, fieldValue,
                aux = settings.filter.$filterContainer.serializeArray(),
                searchForm = settings.filter.$filterContainer,
                filterMulticombo = new Array();
            var obj;

            //añadir arbol

            var arboles=	$('.jstree',settings.filter.$filterContainer);
            $.each(arboles,function( index,item ){
                obj= new Object();
                obj.name=$(item).attr('name');
                obj.value=$(item).rup_tree('getRupValue').length;
                obj.type='rup_tree';
                aux.push(obj);
            });

            for (var i = 0; i < aux.length; i++) {
                if (aux[i].value !== ''  && $.inArray(aux[i].name,settings.filter.excludeSummary)!== 0) {

                    //CAMPO a tratar
                    field = $('[name=\'' + aux[i].name + '\']',searchForm);

                    //Comprobar si se debe excluir el campo
                    if ($.inArray(field.attr('id'), settings.filter.filterExclude) !== -1){
                        continue;
                    }

                    //Seleccionar radio
                    if (field.length > 1){
                        field = $('[name=\'' + aux[i].name + '\']:checked',searchForm);
                    }
                    //Omitir campos hidden
                    if ($(field).attr('type') === 'hidden'){
                        continue;
                    }

                    //ID del campo
                    fieldId = $(field).attr('id');
                    //ID para elementos tipo rup.combo
                    if ($(field).attr('ruptype') === 'combo' && field.next('.ui-multiselect').length === 0){
                        fieldId += '-button';
                    }
                    //ID para elementos tipo rup.autocomplete
                    if ($(field).attr('ruptype') === 'autocomplete'){
                        fieldId = fieldId.substring(0, fieldId.indexOf('_label'));
                    }

                    //NAME
                    label = $('label[for^=\'' + fieldId + '\']',searchForm);
                    if (label.length>0){
                        // <label for='xxx' />
                        fieldName = label.html();
                    } else {
                        // <div />
                        // <div />
                        if ($(field).attr('ruptype') !== 'combo'){
                            fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).prev('div').find('label').first().html();
                        } else {

                            // Buscamos el label asociado al combo
                            // Primero por id
                            var $auxField = $('[name=\'' + aux[i].name + '\']',searchForm), $labelField;

                            $labelField = jQuery('[for=\''+$auxField.attr('id')+'\']');

                            if ($labelField.length>0){
                                fieldName = $labelField.first().text();
                            }else{

                                fieldName= $('[name=\'' + aux[i].name + '\']',searchForm).parent().prev('div').find('label').first().html();

                            }
                        }
                    }
                    if (fieldName === null || fieldName === undefined){
                        fieldName = '';
                    }

                    //VALUE
                    fieldValue = ' = ';
                    switch($(field)[0].tagName){
                    case 'INPUT':
                        fieldValue = fieldValue + $(field).val();
                        if ($(field)[0].type === 'checkbox' || $(field)[0].type === 'radio'){
                            fieldValue = '';
                        }
                        break;
                        //Rup-tree
                    case 'DIV':
                        $.each(aux,function( index,item ){
                            if (item.name===field.attr('id')){
                                if (item.value!=0){
                                    fieldValue +=' = '+ item.value;
                                }
                            } else {
                                fieldValue = '';
                            }


                        });
                        if (fieldValue===''){
                            fieldName = '';
                        }
                        break;
                    case 'SELECT':
                        if (field.next('.ui-multiselect').length===0){
                            fieldValue = fieldValue + $('option[value=\''+aux[i].value+'\']',field).html();
                        } else {
                            if ($.inArray($(field).attr('id'), filterMulticombo)===-1){
                                numSelected = field.rup_combo('value').length;
                                if (numSelected !== 0){
                                    fieldValue += numSelected;
                                } else {
                                    fieldName = '';
                                    fieldValue = '';
                                }
                                filterMulticombo.push($(field).attr('id'));
                            } else {
                                fieldName = '';
                                fieldValue = '';
                            }
                        }
                        break;
                    }

                    //Parsear NAME
                    var parseableChars = new Array(':','=');
                    for (var j=0; j<parseableChars.length; j++){
                        if (fieldName !== '' && fieldName.indexOf(parseableChars[j])!== -1){
                            fieldName = fieldName.substring(0,fieldName.indexOf(parseableChars[j]));
                            break;
                        }
                    }

                    //Controlar rup.combo con valor vacío
                    while (fieldValue.indexOf('&amp;nbsp;')!==-1){
                        fieldValue = fieldValue.replace ('&amp;nbsp;','');
                    }

                    //Si no tiene NAME sacar solo el valor
                    if (fieldName === '' && fieldValue.indexOf(' = ')!==-1){
                        fieldValue = fieldValue.substring(2, fieldValue.length);
                    }


                    //Si no tiene NAME ni VALUE omitir
                    if (fieldName === '' && $.trim(fieldValue) === ''){
                        continue;
                    }
                    searchString = searchString + fieldName + fieldValue + ', ';
                }
            }

            //Añadir criterios
            if (settings.multiFilter !== undefined && jQuery.isFunction(settings.multiFilter.fncFilterName)) {
                searchString = jQuery.proxy(settings.multiFilter.fncFilterName, $self, searchString)();
            }
				
            settings.filter.$filterSummary.html(' <i>' + searchString + '</i>');


        },
        /**
		     * Crea un evento para mantener la multiseleccion, el seeker y el select ya que accede a bbdd.
		     *
		     * @name createEventSelect
		     * @function
		     *
		     * @param {object} tabla - La configuración de la tabla.
		     *
		     */
        _createEventSelect(tabla){
            tabla.on( 'draw.dtSelect.dt select.dtSelect.dt', function () {//Si lleva parametros es que estamos en la navegacion interna.
                var ctx = tabla.context[0];
                if(ctx.oInit.formEdit !== undefined && ctx.oInit.formEdit.$navigationBar !== undefined &&
							ctx.oInit.formEdit.$navigationBar.funcionParams !== undefined && ctx.oInit.formEdit.$navigationBar.funcionParams.length > 0){
                    var params = ctx.oInit.formEdit.$navigationBar.funcionParams;
                    //Si hay selectAll, comprobar la linea ya que puede variar al no tener ningún selected.Se recorre el json.
                    if(ctx.multiselection.selectedAll){
                        var linea = -1;
                        if(params[3] !== undefined && (params[3] === 'prev' || params[3] === 'last')){
                            linea = ctx.json.rows.length;
                            params[2] = DataTable.Api().editForm.getLineByPageSelectedReverse(ctx,linea);
                        }else{
                            if(params[2] !== undefined && params[2] > 0){
                                linea = params[2]-1;
                            }
                            params[2] = DataTable.Api().editForm.getLineByPageSelected(ctx,linea);//Se inicia en -1 para que coja desde la primera linea.next y prev.
                        }

                    }
                    DataTable.editForm.fnOpenSaveDialog(params[0],params[1],params[2]);
                    ctx.oInit.formEdit.$navigationBar.funcionParams = {};
                }

            } );
        },
        /**
			* Metodo que inicialida las propiedades para el multiselect y el Select.
			*
			* @name initializeMultiselectionProps
			* @function
			* @since UDA 3.4.0 // Table 1.0.0
			*
			*
			*/
        _initializeMultiselectionProps ( ctx ) {
				
            var multi = {};
            // Se almacenan en los settings internos las estructuras de control de los registros seleccionados
            if (multi.multiselection === undefined) {
                multi.multiselection = {};
            }
            if(ctx.multiselection !== undefined){
                multi.multiselection.internalFeedback = ctx.multiselection.internalFeedback;
            }
            // Flag indicador de selección de todos los registros
            multi.multiselection.selectedAll = false;
            // Numero de registros seleccionados
            multi.multiselection.numSelected = 0;
            // Propiedades de selección de registros
            multi.multiselection.selectedRowsPerPage = [];
            //$self.multiselection.selectedLinesPerPage = [];
            //$self.multiselection.selectedRows = [];
            multi.multiselection.selectedIds = [];
            multi.multiselection.lastSelectedId = "";
            //$self.multiselection.selectedPages = [];
            // Propiedades de deselección de registros
            multi.multiselection.deselectedRowsPerPage = [];
            //$self.multiselection.deselectedLinesPerPage = [];
            //$self.multiselection.deselectedRows = [];
            multi.multiselection.deselectedIds = [];
            multi.multiselection.accion = "";//uncheckAll,uncheck
            //$self.multiselection.deselectedPages = [];
            $("#contextMenu1 li.context-menu-icon-uncheck").addClass('disabledButtonsTable');
            $("#contextMenu1 li.context-menu-icon-uncheck_all").addClass('disabledButtonsTable');
            // Desmarcamos el check del tHead
            $("#inputSelectTableHead" + ctx.sTableId).prop('checked', false);

            DataTable.Api().rupTable.selectPencil(ctx,-1);
            if (ctx.multiselection === undefined) {
                ctx.multiselection = {};
            }
            ctx.multiselection =  multi.multiselection;
        }, _createTooltip (id) {
            if(id !== undefined && id.text() !== undefined && id.text() !== ''){
                id.rup_tooltip({
                    content: {
                        text: id.text()
                    },
                    show: {
                        event: 'hover'
                    },
                    position: {
                        viewport: $(window),
                        adjust: {
                            method: 'flip'
                        }
                    }
						
                });
            }
        }
    });

    //*******************************
    // MÉTODO DE INICIALIZACION
    //*******************************
    $.fn.rup_table('extend', {
        _init : function(args){			
            var $self = this;
            //Se añade filter por defecto
            $.fn.rup_table.defaults.filter = {
                id:$self[0].id+"_filter_form",
                filterToolbar:$self[0].id+"_filter_toolbar",
                collapsableLayerId:$self[0].id+"_filter_fieldset"
		       						};
            var	settings = $.extend({}, $.fn.rup_table.defaults, $self[0].dataset, args[0]);
			
            $self.triggerHandler('tableBeforeInit');
			
            var clone = jQuery("#"+$self[0].id).clone(true);	
            // Se identifica el tipo de componente RUP mediante el valor en el atributo ruptype
            $self.attr('ruptype', 'table');
            $self.triggerHandler('tableInit');
            if(args[0].primaryKey !== undefined){
                settings.primaryKey = args[0].primaryKey.split(";");
            }
			
            //Comprobar plugin dependientes
            if(settings.multiSelect !== undefined){
                settings.columnDefs.unshift({
			        orderable: false,
			        className: 'select-checkbox',
			        targets: 0,
			        render: function (data, type, full, meta){
			        	return '<div class="checkbox-material checkbox-material-inline"><input type="checkbox"><label/></div>';
			        }
			    });
                //Modulo incompatible
                settings.select = undefined;
            }
			
			
            if(settings.formEdit !== undefined){
                settings.inlineEdit = undefined;
            }

            // getDefault multifilter
            if (settings.multiFilter !== undefined && settings.multiFilter.getDefault === undefined){
                var usuario;
                if (settings.multiFilter.userFilter!=null){
                    usuario=settings.multiFilter.userFilter;
                }else{
                    usuario=LOGGED_USER;
                }
                var ctx = {};
                ctx.oInit = settings;
                ctx.sTableId = $self[0].id;
                $.rup_ajax({
                    url : settings.urlBase
												+ '/multiFilter/getDefault?filterSelector='
												+ settings.multiFilter.idFilter + '&user='
												+ usuario,
                    type : 'GET',
                    dataType : 'json',
                    showLoading : false,
                    contentType : 'application/json',
                    //async : false,
                    complete : function(jqXHR,
                        textStatus) {
                        $('#' + ctx.sTableId).triggerHandler('tableMultiFilterCompleteGetDefaultFilter');
                    },
                    success : function(data, status,
                        xhr) {
                        if (data != null) {
                            var valorFiltro = $
                                .parseJSON(data.filterValue);


                            DataTable.Api().multiFilter.fillForm(valorFiltro,ctx);
                            $self._doFilter(data);
                            $(settings.filter.$filterSummary , 'i').prepend(data.filterName+'{');
                            $(settings.filter.$filterSummary , 'i').append('}');

                        }
                        $('#' + ctx.sTableId).triggerHandler('tableMultiFilterSuccessGetDefaultFilter');
                    },
                    error : function(xhr, ajaxOptions,
                        thrownError) {
                        $('#' + ctx.sTableId).triggerHandler('tableMultiFilterErrorGetDefaultFilter');
                    }
                });


            }
			
            if(args[0].responsive === undefined){//si el usuario no cambia el selector
                var responsive = {           
                    details: {
				    	type: 'column',
				    	target: 'td span.openResponsive'
                    },
                    selectorResponsive: 'td span.dtr-data'};		
					
                settings.responsive = responsive;
            }
            // Se añaden los CSS para las flechas.
            $.each($('#'+$self[0].id+' thead th'),function(){
                var titulo = $(this).text();
                $(this).text('');
                var span1 = $("<span/>").addClass('d-block d-xl-inline').text(titulo);
                var span2 = $("<span/>").addClass('mdi mdi-arrow-down mr-2 mr-xl-0');
                var span3 = $("<span/>").addClass('mdi mdi-arrow-up');
                $(this).append(span1)
                var div1 = $("<div/>").addClass('d-flex d-xl-inline');
                div1.append(span2);
                div1.append(span3);
                $(this).append(div1);
				
            });
			
            $self._initOptions(settings);
			
            if(settings.loadOnStartUp !== undefined && !settings.loadOnStartUp){
                settings.deferLoading = 0;
            }
			
            var tabla = $self.DataTable(settings);

            settings.sTableId = $self[0].id;
            $self._initializeMultiselectionProps(tabla.context[0]);
			
            //Crear tooltips cabecera;
            $.each($('#'+$self[0].id+' thead th'),function( ){
                $self._createTooltip($(this));
            });
			
            tabla.on( 'draw', function (e,settingsTable) {
                if(settings.searchPaginator){//Mirar el crear paginador
                    $self._createSearchPaginator($(this),settingsTable);
                    // Deshabilitamos los botones de paginacion si es necesario
                	$.each($("ul.pagination li.recolocatedPagination_iconButton"),function( ){
                		if($(this).hasClass("disabled")) {
                			$("#" + this.id + " a").prop("tabindex", "-1");
                		} else {
                			$("#" + this.id + " a").prop("tabindex", "0");
                		}
                    });
                    //Si el seeker esta vacio ocultarlo
                    if(settingsTable.seeker !== undefined && 
							settingsTable.seeker.search !== undefined && settingsTable.seeker.search.$searchRow !== undefined){
                        if(settingsTable._iRecordsDisplay > 0){
                            settingsTable.seeker.search.$searchRow.show();
                        }else{
                            settingsTable.seeker.search.$searchRow.hide();
                        }
                    }
                }

                if(settings.select !== undefined || settings.multiSelect !== undefined){//AL repintar vigilar el select.
                    if(settings.select !== undefined){//AL repintar vigilar el select.
                        if(settingsTable.select !== undefined && settingsTable.select.selectedRowsPerPage !== undefined){
                            //viene de la navegacion buscar el id.
                            var line = 0;
                            var ctx = tabla.context[0];
                            if(settingsTable.select.selectedRowsPerPage.cambio === 'prev' || settingsTable.select.selectedRowsPerPage.cambio === 'last'){
                                line = ctx.json.rows.length-1;
                            }
                            
                            // Se añaden los parametros para que funcione bien la paginación
                            ctx.oInit.formEdit.$navigationBar.funcionParams = ['PUT', tabla, line, settingsTable.select.selectedRowsPerPage.cambio];
							
                            ctx.multiselection.selectedRowsPerPage = [];
                            var rowSelectAux = ctx.json.rows[line];
                            var id = DataTable.Api().rupTable.getIdPk(rowSelectAux,ctx.oInit);
                            ctx.multiselection.selectedRowsPerPage.push({line:line,page:ctx.select.selectedRowsPerPage.page,id:id});
                            settingsTable.select.selectedRowsPerPage = undefined;
                            var numTotal = ctx.json.recordsTotal;
                            var index = (Number(ctx.json.page)-1) * 10;
                            index = index + line + 1;
                            DataTable.Api().editForm.updateDetailPagination(ctx,index,numTotal);
                        }
                        DataTable.Api().select.drawSelectId(tabla.context[0]);
                        if(tabla.context[0].oInit.inlineEdit !== undefined){
                            DataTable.Api().inlineEdit.addchildIcons(tabla.context[0]);
                        }
                    }
                    if(settingsTable.seeker !== undefined 
							&& settingsTable.seeker.search !== undefined){
                        var ctx = tabla.context[0];
                        if(settingsTable.seeker.search.funcionParams !== undefined && settingsTable.seeker.search.funcionParams.length > 0 &&//Paginar para el seek y que siempre selecione
									ctx.json.page !== settingsTable.seeker.search.funcionParams[settingsTable.seeker.search.pos].page && ctx.fnRecordsTotal() > 0){//ver si hay cambio de pagina.
                            DataTable.Api().seeker.selectSearch(tabla,ctx,settingsTable.seeker.search.funcionParams);
                        }
                    }
                }
				
                //Crear tooltips tds;
                $.each($('#'+settingsTable.sTableId+' tbody td'),function( ){
                    $self._createTooltip($(this));
                });
				
                if(settingsTable.inlineEdit !== undefined ){
                    var ctx = $("#" + settingsTable.sTableId).rup_table("getContext");
					
                    DataTable.Api().inlineEdit.drawInlineEdit(tabla,ctx);
                    if(ctx.oInit.inlineEdit.rowDefault !== undefined){//editando cuando se pagina
                        if(ctx.oInit.inlineEdit.rowDefault.actionType === 'CLONE'){
                            DataTable.Api().inlineEdit.cloneLine(tabla,ctx,ctx.oInit.inlineEdit.rowDefault.line);
                        }//else{
                        DataTable.Api().inlineEdit.editInline(tabla,ctx,ctx.oInit.inlineEdit.rowDefault.line);
                        var count = tabla.columns().responsiveHidden().reduce( function (a,b) {return b === false ? a+1 : a;}, 0 );
                        if(count > 0){
                            ctx.oInit.inlineEdit.rowDefault = 'cambioEstado';
                        }else{
                            ctx.oInit.inlineEdit.rowDefault = undefined;
                        }
                        //	}
                    }else if(ctx.oInit.select !== undefined && ctx.multiselection.selectedRowsPerPage.length > 0){
                        var rowsBody = $( ctx.nTBody);
                        var $tr = $('tr:nth-child(1)',rowsBody);
                        if(DataTable.Api().rupTable.getIdPk(ctx.json.rows[0],ctx.oInit) === ctx.multiselection.selectedRowsPerPage[0].id){
                            $tr.addClass('selected tr-highlight');
                        }
                    }
                }
				
                if(settingsTable.oInit.formEdit !== undefined && settingsTable.oInit.responsive !== undefined
						&& settingsTable.oInit.responsive.selectorResponsive !== undefined){//si el selector es por defecto.selectorResponsive: 'td span.dtr-data'
                    DataTable.Api().editForm.addchildIcons(settingsTable);
                }
                if(settings.inlineEdit === undefined && settings.formEdit === undefined){
                    DataTable.Api().editForm.addchildIcons(settingsTable);
                }
			  });
            
            tabla.on('responsive-resize.dt', function (event, dt) {
            	let ctx = dt.context[0];
            	
            	if(ctx.oInit.formEdit !== undefined && ctx.oInit.responsive !== undefined
						&& ctx.oInit.responsive.selectorResponsive !== undefined){//si el selector es por defecto.selectorResponsive: 'td span.dtr-data'
                    DataTable.Api().editForm.addchildIcons(ctx);
                }
            	
                if(settings.inlineEdit === undefined && settings.formEdit === undefined){
                    DataTable.Api().editForm.addchildIcons(ctx);
                }
            });
			
            tabla.on( 'destroy', function (e,settingsTable) {

                $('#'+settingsTable.sTableId+'_filter_toolbar').empty();
                $('#'+settingsTable.sTableId+'_detail_navigation').empty();
				
            });
			
            if(settings.inlineEdit !== undefined){
                DataTable.Api().inlineEdit.onResponsiveResize(tabla);
            }

			
            if(settings.multiSelect !== undefined || settings.select !== undefined){
                $self._createEventSelect(tabla);				
            }
            $self._ConfigureFiltern(settings);
			
            // Se almacena el objeto settings para facilitar su acceso desde los métodos del componente.
            $self.data('settings'+$self[0].id, settings);
            $('#'+tabla.context[0].sTableId).triggerHandler('tableAfterComplete');
			
            $self.triggerHandler('tableAfterInit');
			
			if(settings.inlineEdit === undefined && settings.formEdit === undefined && 
				settings.multiselect === undefined && settings.select === undefined){
				$(window).on( 'resize.dtr', DataTable.util.throttle( function () {//Se calcula el responsive
					DataTable.Api().editForm.addchildIcons(tabla.context[0]);
				} ) );
			}
			
			//Se audita el componente
			$.rup.auditComponent('rup_table', 'init');
        }
    });

    //******************************************************
    // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
    //******************************************************
    $.fn.rup_table.defaults = {
        foobar: false,
        headerContextMenu: {
            show: true,
            selectAllPage: true,
            deselectAllPage: true,
            separator: true,
            selectAll: true,
            deselectAll: true,
            items: {}
        },
		fixedHeader: {
	        header: false,
	        footer: true
	    },
        feedback:{
            okFeedbackConfig:{
                closeLink: true,
                delay: 2000
            }
        },
        responsive: {           
            details: {
		    	type: 'column',
		    	target: 'tr'
            },
            selectorResponsive: 'td span.dtr-data'
        }, 
        dom: //i: Info, t: table, p:pagination, r: procesing , l:length 
			't<"container-fluid paginationContainer"' +
				'<"row"' +
					'<"col-6 order-3 text-right align-self-center col-sm-5 order-sm-2 col-xl-2 order-xl-1 text-xl-left">' +
					'<"order-1 align-self-center col-sm-12 order-sm-1 col-xl-7 order-xl-2"p>' +
					'<"col-12 order-2 text-center align-self-center col-sm-2 order-sm-3 col-xl-1"l>' +
					'<"col-6 order-4 text-left align-self-center col-sm-5 order-sm-4 col-xl-2 text-xl-center"i>' +
				'>' +
			'>' +
			'r',
	    multiplePkToken: '~',
	    primaryKey:["id"],
	    blockPKeditForm: true,
	    searchPaginator: true,
	    pagingType: "full",
	    createdRow: function( row, data, dataIndex, a, b, c ) {
	        var ctx = $("#" + this[0].id).rup_table("getContext");
	        
	        if(ctx.oInit.select != undefined || ctx.oInit.multiSelect.hideMultiselect){
	        	$(row).attr('tabindex', '0');
	        }
	    },
	    columnDefs: [],
        adapter: 'table_material',
	    order: [[ 1, 'asc' ]],
	    showMultiSelectedZero: true,
	    filterMessage : true,
	    noEdit: false
    };

}));
