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

(function($) {

	/**
	 * Definición de los métodos principales que configuran la inicialización
	 * del plugin.
	 *
	 * postConfiguration: Método que se ejecuta después de la invocación del
	 * componente jqGrid.
	 *
	 */
	jQuery.rup_table.registerPlugin("multifilter", {
		loadOrder : 15,
		preConfiguration : function(settings) {
			var $self = this;
			return $self.rup_table("preConfigureMultifilter", settings);
		},
		postConfiguration : function(settings) {
			var $self = this;
			return $self.rup_table("postConfigureMultifilter", settings);
		}

	});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Extensión del componente rup_table para permitir la gestión del filtrado
	 * de registros de la tabla.
	 *
	 * Los métodos implementados son:
	 *
	 * postConfigureFilter(settings): Método que define la preconfiguración
	 * necesaria para el correcto funcionamiento del componente.
	 *
	 * Se almacena la referencia de los diferentes componentes:
	 *
	 * settings.filter.$filterContainer : Contenedor del formulario de filtrado
	 * settings.filter.$filterButton : Botón que realiza el filtrado
	 * settings.filter.$cleanLink : Enlace para limpiar el formulario
	 * settings.filter.$collapsableLayer : Capa que puede ser ocultada/mostrada
	 * settings.filter.$toggleIcon1Id : Control que oculta muestra el fomulario
	 * settings.filter.$filterSummary : Contenedor donde se especifican los
	 * criterios de filtrado
	 *
	 */
	jQuery.fn
			.rup_table(
					"extend",
					{

						preConfigureMultifilter : function(settings) {
							var $self = this, tableId = settings.id, multifilterSettings = settings.multifilter, dropdownDialogId, $dropdownDialog, $dropdownDiaglogTemplate;






							//definincion de variables con los selectores
							multifilterSettings.$dropdownDialog=$("#"+settings.id+"_multifilter_dropdownDialog");

							//definicion de variables con ids
							multifilterSettings.dropdownDialogId = settings.id+"_multifilter_dropdownDialog";



							$dropdownDiaglogTemplate = $self.rup_table("getMultifilterDialogTemplate", settings);

							settings.filter.$filterContainer
									.after($dropdownDiaglogTemplate);

							$self.rup_table("configureMultifilter", settings);

							// configuracion del resumen del filtro para que
							// apareza el nombre del filtro
							settings.multifilter.fncFilterName = function(searchString) {



								if (multifilterSettings.$comboLabel==undefined){ //&& settings.$firstStartUp  && multifilterSettings.$filterDefaultName!=undefined){
										if (multifilterSettings.$filterDefaultName!==undefined)
										searchString = multifilterSettings.$filterDefaultName+ "  {" + searchString + "}   ";

								}
								else if (multifilterSettings.$comboLabel!=undefined && settings.$firstStartUp){
									if(multifilterSettings.$comboLabel.val()==""  && multifilterSettings.$filterDefaultName!=undefined){
										if (multifilterSettings.$filterDefaultName!==undefined)
										searchString = multifilterSettings.$filterDefaultName+ "  {" + searchString + "}   ";
									}
								}else if (multifilterSettings.$comboLabel.val()!="" &&  multifilterSettings.$filterWithName){
									 multifilterSettings.$filterWithName=false;
									searchString = multifilterSettings.$comboLabel.val()+ "  {" + searchString + "}   ";

								}
								return searchString;
							}




						},



						/*
						 * Método que define la preconfiguración necesaria para
						 * el correcto funcionamiento del componente.
						 *
						 *
						 */
						postConfigureMultifilter : function(settings) {
							var $self = this, multifilterSettings = settings.multifilter, filterSettings,$dropdownButton, $combo,$comboLabel
							,$defaultCheck,$feedback,$comboButton,$closeDialog;


							/*
							 * $("#"+settings.id+"_multifilter_combo_label").on("change",
							 * function(){
							 *
							 * if
							 * ($("#"+settings.id+"_multifilter_combo_label").val()==""){
							 * $self._toggleButtons(settings.id,false); }else{
							 * $self._toggleButtons(settings.id,true); } });
							 */

							settings.filter.$filterButton
									.rup_button({
										dropdown : {
											dropdownIcon : "ui-icon-gear",
											dropdownDialog : multifilterSettings.dropdownDialogId,
											dropdownDialogConfig : {
												title : "<span class='rup-icon rup-icon-filter'/>"
														+ $.rup.i18n.base.rup_table.plugins.multifilter.tittle,
												width : "450px",
												buttons : [
														{
															id : settings.id+ "_multifilter_BtnSave",
															text : $.rup.i18n.base.rup_table.plugins.multifilter.save,
															click : function() {

																if ($self._checkLabel(settings)) {

																	// creo objeto Filter con los datos del formulario del filtro
																	var filter = $self._createFilterFromForm(settings);

																	var bfr = $self.triggerHandler("rupTable_beforeAdd");
																	if (bfr === false || bfr === 'stop') {
																		multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.errorValidate,"error");
																	return; }


																	// añado el filtro
																	$self.rup_table("addFilter",filter);


																}

															}

														},
														{
															id : settings.id+ "_multifilter_BtnApply",
															text : $.rup.i18n.base.rup_table.plugins.multifilter.apply,
															click : function() {

																//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
																if (settings.$firstStartUp){

																settings.$firstStartUp=false;
																}

																if ($self._checkLabel(settings)) {
																	multifilterSettings.$filterWithName=true;





																	var valorFiltro= $self._searchFilterInCombo(settings);
																	if (valorFiltro!=undefined){
																		//limpiamos el filtro
																		$self.rup_table("cleanFilterForm");

																		//Cargamos de nuevo el filtro en el formulario del filtro
																		// rellenar el formulario del filtro
																		$self.triggerHandler("rupTable_multifilter_fillForm",valorFiltro);
																		$self._fillForm(valorFiltro);
																		$self.rup_table("filter");
																		multifilterSettings.$closeDialog.click();
																	}



																	else{
																		multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.errorNoexiste,"error");

																	}


//






																	//$self.rup_table("filter");
																	// crea el tooptip del resumen del filtro
																	//var filterCriteria = $self._createTooltip();



																}

															}
														},
														{
															id : settings.id+ "_multifilter_BtnRemove",
															text : $.rup.i18n.base.rup_table.plugins.multifilter.remove,
															click : function() {


																if ($self._checkLabel(settings)) {

																	// creo objeto Filter con los datos del formulario del filtro
																	var filter = $self._createFilterFromForm(settings);

																	// borro el filtro
																	$self.rup_table("deleteFilter",filter);
																}
															}
														},
														{
															text : $.rup.i18n.base.rup_table.plugins.multifilter.cancel,
															click : function() {

																var filtroAnterior= $self.data("filtroAnterior");
																if (filtroAnterior!=null){
																	//var xhrArray=$.rup_utils.jsontoarray(filtroAnterior);
																	$self.rup_table("cleanFilterForm");
																	//$.rup_utils.populateForm(filtroAnterior,settings.filter.$filterForm);
																	$self.triggerHandler("rupTable_multifilter_fillForm",filtroAnterior);
																	$self._fillForm(filtroAnterior);

																}
																//limpio el filtro del dropdownDIalog
																multifilterSettings.$comboLabel.val("");
																multifilterSettings.$closeDialog.click();
															},
															btnType : $.rup.dialog.LINK
														} ]
											}
										}

									});


							//Deshabilitar el nombre del filtro en el filterSummary una vez que ha terminado el filtro por defecto
							$self.on("rupTable_beforeFilter", function(event){
								/*if (settings.$firstStartUp){

									settings.$firstStartUp=false;
								}*/

							});



							//definincion de variables con los selectores
							multifilterSettings.$dropdownButton=$('#'+settings.id+"_filter_filterButton_dropdown");
							multifilterSettings.$combo=$("#" + settings.id	+ "_multifilter_combo");
							multifilterSettings.$comboLabel=$("#" + settings.id	+ "_multifilter_combo_label");
							multifilterSettings.$comboButton=$("#" + settings.id+"_multifilter_dropdownDialog .rup-combobox-toggle");
							multifilterSettings.$defaultCheck=$("#" + settings.id	+  "_multifilter_defaultFilter");
							multifilterSettings.$feedback=$("#" + settings.id	+ "_multifilter_dropdownDialog_feedback");
							multifilterSettings.$closeDialog=$('#closeText_'+settings.id+'_multifilter_dropdownDialog')




							// dialog modal para no cambiar el filtro mientras
							// se gestionan los mismos
							$('#' + multifilterSettings.dropdownDialogId).rup_dialog("setOption", "modal", true);
							$('#' + multifilterSettings.dropdownDialogId).rup_dialog("setOption", "draggable", false);
							$('#' + multifilterSettings.dropdownDialogId).rup_dialog("setOption", "resizable", false);


							// $('#'+multifilterSettings.dropdownDialogId).parent().addClass("rup_multifilter_container");
							$('#' + multifilterSettings.dropdownDialogId).parent().css("width", "500px");


							multifilterSettings.$dropdownButton.on("click", function(){
								//guardo el filtroAnterior
								var valorFiltro= form2object(settings.filter.$filterContainer[0]);
								var xhrArray=$.rup_utils.jsontoarray(valorFiltro);
								$self.data("filtroAnterior",valorFiltro);


								//Foco al label al entrar al dialog
								multifilterSettings.$comboLabel.focus();


							});

							$self._configCombo(settings);

							multifilterSettings.$feedback.rup_feedback({
								block : false
							});

							//gesión por filtroPorDefecto

							//$self.rup_table("showSearchCriteria");

							//if(filtroDefault!=null)
							//$("#"+settings.id+"_filter_summary").prepend(filtroDefault.filterName +" "+ $("#"+settings.id+"_filter_summary").val() );

							//bug IE que al cerrar el dialog con el combo desplegado , la lista del combo sigue abierta
							$('.rup-dropdown-dialog').on("dialogclose",function (){
								multifilterSettings.$comboLabel.autocomplete("widget").hide();
							});

							//la primera vez que cancelas el filtroAnterior es el filtroPorDefecto
							var valorFiltro=form2object(settings.filter.$filterContainer[0]);
							xhrArray=$.rup_utils.jsontoarray(valorFiltro);

							$self.data("filtroAnterior",valorFiltro);

							//$self.rup_table("filter");

							//settings.filter.$filterButton.trigger("click");
							//$self.triggerHandler("rupTable_multifilter_fillForm",form2object(settings.filter.$filterContainer[0]));

							$self.on({
								"rupTable_beforeAdd.multifilter.validate": function(){

									//filterSettings.$filterContainer.rup_validate("resetForm");
								if (multifilterSettings!==undefined){
									if(!settings.$firstStartUp){
										return settings.filter.$filterContainer.valid();
									}else{
										return null;
									}
								}else{
									return settings.filter.$filterContainer.valid();
								}
							}

							});

						}
					});

	// ********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	// ********************************

	/**
	 * Métodos públicos del plugin filter.
	 *
	 * cleanFilterForm: Realiza una limpieza de los campos del formulario.
	 * filter: Lanza el filtrado de la tabla de acuerdo a los criterios
	 * indicados en el formulario. toggleFilterForm: Método encargado de ocultar
	 * y mostrar el formulario de filtrado.
	 *
	 */
	jQuery.fn
			.rup_table(
					"extend",
					{
						getMultifilterDialogTemplate : function(settings) {
							var $self = this, multifilterSettings = settings.multifilter;

							var $dropdownDiaglogTemplate = jQuery("<div id=\""
									+ multifilterSettings.dropdownDialogId
									+ "\" style=\"display:none\" class=\"rup_multifilter_dropdown\">"
									+ "<div id=\""
									+ multifilterSettings.dropdownDialogId
									+ "_feedback\"></div>"
									+ "<form>"
									+ "<fieldset class=\"dropdownButton-inputs\">"
									+ "<div id=\""
									+ multifilterSettings.dropdownDialogId
									+ "_columna_cnt\" class=\"formulario_columna_cnt\">"
									+ "<div  id=\""
									+ multifilterSettings.dropdownDialogId
									+ "_lineaCombo\"  class=\"formulario_linea_izda_float\">"
									+ "<label for=\""
									+ settings.id
									+ "_multifilter_combo\">"
									+ $.rup.i18n.base.rup_table.plugins.multifilter.filters
									+ "</label>"
									+ "<input id=\""
									+ settings.id
									+ "_multifilter_combo\" class=\"rup_multifilter_selector\" />"
									+ "</div>"
									+ "<div  id=\""
									+ multifilterSettings.dropdownDialogId
									+ "_lineaDefault\" class=\"formulario_linea_izda_float\">"
									+ "<input type=\"checkbox\" id=\""
									+ settings.id
									+ "_multifilter_defaultFilter\"/>"
									+ "<label for=\""
									+ settings.id
									+ "_multifilter_defaultFilter\">"
									+ $.rup.i18n.base.rup_table.plugins.multifilter.defaultFilter
									+ "</label>" + "</div>" + "</div>"
									+ "</fieldset>" + "</form>" + "</div>");

							return $dropdownDiaglogTemplate;
						},

						configureMultifilter : function(settings) {
							var $self = this, multifilterSettings = settings.multifilter,$filterForm ;
							$self.data("settings", settings);



							settings.filter.$filterForm = $("#" + settings.id + "_filter_form");

							var options_ejie_combo = {
								source : [ {
									label : "Si",
									value : "0"
								}, {
									label : "No",
									value : "1"
								} ],
								width : 120,
								blank : ""
							};

							// jQuery("#"+settings.id+"_multifilter_combo").rup_combo(options_ejie_combo);

							var selector;
							if (multifilterSettings.idFilter != null) {
								selector = multifilterSettings.idFilter;
							} else {
								selector = settings.id;
							}

							var usuario;
							if (multifilterSettings.userFilter!=null){
								usuario=multifilterSettings.userFilter;
							}else{
								usuario=LOGGED_USER;
							}

							var getDefault;
							if (multifilterSettings.getDefault!=null){
								getDefault = multifilterSettings.getDefault;
							}else{
								getDefault = true;
							}



							jQuery("#" + settings.id + "_multifilter_combo").rup_autocomplete(
											{
												source : settings.baseUrl
														+ "/multiFilter/getAll?filterSelector="
														+ selector + "&user="
														+ usuario,
												sourceParam : {
													label : "filterName",
													value : "filterDefault",
													data : "filterValue"
												},
												method : 'GET',
												contains : false,
												combobox : true,
												menuAppendTo : $('#' + multifilterSettings.dropdownDialogId).parent(),

												select : function() {



													var valorFiltro=$self._searchFilterInCombo(settings);

													//limpiar Filtro
													//$self.rup_table("resetForm",settings.filter.$filterForm);
													$self.rup_table("cleanFilterForm");


													// rellenar el formulario del filtro
													//$.rup_utils.populateForm(xhrArray,settings.filter.$filterForm);
													$self.triggerHandler("rupTable_multifilter_fillForm",valorFiltro);
													$self._fillForm(valorFiltro);

//



												}
											});

							$('.jstree').on("rup_filter_treeLoaded",function(event,data){
								$(this).rup_tree("setRupValue",data);
								//$self.rup_table("showSearchCriteria");
							});


							settings.filter.$cleanLink.on("click",function() {
								multifilterSettings.$combo.rup_autocomplete("set", "", "");
								settings.filter.$filterSummary.html("<i></i>");

							});
						},
						addFilter : function(filter) {
							var $self=this;
							var settings = $self.data("settings");

							var multifilterSettings= settings.multifilter;


							// self.data("settings");
							if (multifilterSettings.idFilter != null) {
								filter.filtro.filterSelector = multifilterSettings.idFilter;
							}

							// add Filter
							$.rup_ajax({
										url : settings.baseUrl+ "/multiFilter/add",
										type : "POST",
										data : $.toJSON(filter),
										dataType : 'json',
										showLoading : false,
										contentType : 'application/json',
										async : false,
										beforeSend : function(xhr, options) {
											return $self.triggerHandler("rupTable_multifilter_beforeAdd",[xhr, options]);
										},
										success : function(data, status, xhr) {

											multifilterSettings.$savedFilterName=data.filterName;
											multifilterSettings.$savedFilterValue=data.filterValue;

											multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.ok,"ok");

											//multifilterSettings.$combo.rup_autocomplete("set","", "");
											multifilterSettings.$comboLabel.data("tmp.loadObjects.term",null);
											multifilterSettings.$comboLabel.data("loadObjects", {});
											// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);

											multifilterSettings.$comboLabel.data("tmp.data", {});

											if (multifilterSettings.$comboLabel.autocomplete("widget").is(":visible")) {
												multifilterSettings.$comboLabel.autocomplete("widget").hide();
											}

										},
										error : function(xhr, ajaxOptions,thrownError) {
											multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.error,"error");

										}
									});

						},

						deleteFilter : function(filter) {

							var $self=this;
							var settings = $self.data("settings");




							var multifilterSettings = settings.multifilter;

							//reiniciar filter salvado
							multifilterSettings.$savedFilterName =undefined;
							multifilterSettings.$savedFilterValue =undefined;

							if (multifilterSettings.idFilter != null) {
								filter.filtro.filterSelector = multifilterSettings.idFilter;
							}

							// delete
							$.rup_ajax({
										url : settings.baseUrl+ "/multiFilter/delete",
										type : "POST",
										data : $.toJSON(filter),
										dataType : 'json',
										showLoading : false,
										contentType : 'application/json',
										async : false,
										success : function(data, status, xhr) {
											multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.ok,"ok");
											multifilterSettings.$combo.rup_autocomplete("set","", "");
											multifilterSettings.$comboLabel.data("tmp.loadObjects.term",null);
											multifilterSettings.$comboLabel.data("loadObjects", {});
											// $("#"+settings.id+"_multifilter_combo_label").data("tmp.loadObjects.term",term);
											multifilterSettings.$comboLabel.data("tmp.data", {});

											if (multifilterSettings.$comboLabel.autocomplete("widget").is(":visible")) {
												multifilterSettings.$comboLabel.autocomplete("widget").hide();
											}

											if (data.filterFeedback == 'no_records') {
												multifilterSettings.$feedback.rup_feedback("set",	$.rup.i18n.base.rup_table.plugins.multifilter.noRecords,"error");

											}

										},
										error : function(xhr, ajaxOptions,	thrownError) {
											multifilterSettings.$feedback.rup_feedback(	"set",$.rup.i18n.base.rup_table.plugins.multifilter.error,"error");

										}
									});
						}
					});

	// *******************************
	// DEFINICIÓN DE MÉTODOS PRIVADOS
	// *******************************

	jQuery.fn
			.rup_table(
					"extend",
					{

						_createFilterFromForm : function(settings) {
							var multifilterSettings= settings.multifilter;
							var dataForm = form2object(settings.filter.$filterContainer[0]);




							//cambiar la fecha a milisegundos para guardar en bd
							var fecha ;
							$.each($("[ruptype='date']", settings.filter.$filterContainer), function(index,item){
								fecha = $(item).datepicker("getDate");
								if (fecha!=null)
								dataForm[item.name]=fecha.getTime().toString();
							});



							var dataFormJson = $.toJSON(dataForm);

							var usuario;
							if (multifilterSettings.userFilter!=null){
								usuario=multifilterSettings.userFilter;
							}else{
								usuario=LOGGED_USER;
							}



							var filter = {

								filtro : {
									filterSelector : settings.id,
									filterName :multifilterSettings.$comboLabel.val(),
									filterValue : dataFormJson,
									filterDefault : multifilterSettings.$defaultCheck.is(':checked'),
									filterUser : usuario
								}
							};

							return filter;
						},

						_configCombo: function (settings){
							var multifilterSettings= settings.multifilter;

							multifilterSettings.$comboLabel.on("change",function() {
								settings.filter.$filterSummary.html("<i></i>");

							});



							// si el filtro es el predefinido que aparezca en negrita
							multifilterSettings.$comboLabel.data("autocomplete")._renderItem = function(ul,	item) {
								if (item.value) {
									return $("<li></li>").data(
											"item.autocomplete", item).append(
											"<a><b>" + item.label + "</b></a>")
											.appendTo(ul);
								} else {
									return $("<li></li>").data(
											"item.autocomplete", item).append(
											"<a>" + item.label + "</a>")
											.appendTo(ul);
								}
							};



							multifilterSettings.$comboLabel.off("blur click");

							multifilterSettings.$comboLabel.attr("placeholder",$.rup.i18n.base.rup_table.plugins.multifilter.input);

							multifilterSettings.$comboLabel.on("blur",function(event) {

												// Obtener datos de si viene de
												// seleccionar elemento o si el
												// menú de selección está
												// desplegado
												var selected =
													multifilterSettings.$combo.data("selected"), isShowingMenu = $(".ui-autocomplete:visible").length > 0 ? true
														: false;
												// Borrar índicador de que viene
												// de seleccionar elemento
													multifilterSettings.$combo.data("selected", false);
												// Si es un evento de teclado
												// pero no es ENTER, omitir esta
												// función
												if (event.type === "keydown"
														&& event.keyCode !== 13) {
													return true;
												}

												if (isShowingMenu === true
														&& event.type === "keydown") {
													multifilterSettings.$combo
															.focus();
													event.stopPropagation();
													return true;
												}

												var autoCompObject = $(event.currentTarget), loadObjects =
														multifilterSettings.$comboLabel.data("loadObjects");

												if (settings.getText == true) {
													if (loadObjects[autoCompObject.val()] !== undefined) {
														multifilterSettings.$combo.val(autoCompObject.val());
														multifilterSettings.$combo.attr("rup_autocomplete_label",autoCompObject.val());
													} else {
														multifilterSettings.$combo.val(autoCompObject.val());
														multifilterSettings.$combo.attr("rup_autocomplete_label",autoCompObject.val());
													}
												} else {
													if (loadObjects[autoCompObject.val()] !== undefined) {
														multifilterSettings.$combo.val(loadObjects[autoCompObject.val()]);
														multifilterSettings.$combo.attr("rup_autocomplete_label",loadObjects[autoCompObject.val()]);

													} else {

														autoCompObject.autocomplete("close");
													}
												}
												// Si el evento es ENTER y viene
												// de seleccionar un elemento o
												// el menú se estaba mostrando,
												// omitir resto de funciones
												// (ej. buscar)
												if (event.type === "keydown"
														&& event.keyCode === 13
														&& (selected || isShowingMenu)) {
													return false;
												}

											});

							multifilterSettings.$comboButton.off("click mousedown");

							multifilterSettings.$comboButton.on("blur",function() {
												if (multifilterSettings.$comboLabel.autocomplete("widget").is(":visible")) {
													multifilterSettings.$comboLabel.autocomplete("widget").hide();
												}
											});

							multifilterSettings.$comboButton.on("click",function() {
												if (multifilterSettings.$comboLabel.autocomplete("widget").is(":visible")) {
													multifilterSettings.$comboLabel.autocomplete("widget").hide();
												} else {
													multifilterSettings.$comboLabel.autocomplete("search","");
													multifilterSettings.$comboLabel.autocomplete("widget").show();
													multifilterSettings.$comboLabel.autocomplete("widget").trigger('focus');
												}
											});

						},
//						_toggleButtons : function(id, visibles) {
//
//							if (visibles == false) {
//								$("#" + id + "_multifilter_BtnSave").button(
//										"disable");
//								$("#" + id + "_multifilter_BtnApply").button(
//										"disable");
//								$("#" + id + "_multifilter_BtnRemove").button(
//										"disable");
//
//							} else {
//								$("#" + id + "_multifilter_BtnSave").button(
//										"enable");
//								$("#" + id + "_multifilter_BtnApply").button(
//										"enable");
//								$("#" + id + "_multifilter_BtnRemove").button(
//										"enable");
//							}
//						},
						_checkLabel : function(settings) {

							var multifilterSettings= settings.multifilter;

							if ($.trim(multifilterSettings.$comboLabel.val()) == "") {

								multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.emptyName,"error");
								return false;
							} else if (multifilterSettings.$comboLabel.val().length > settings.multifilter.labelSize) {
								multifilterSettings.$feedback.rup_feedback("set",$.rup.i18n.base.rup_table.plugins.multifilter.tooLong,	"error");

								return false;
							}
							return true;

						},

						_searchFilterInCombo : function(settings) {
							var multifilterSettings = settings.multifilter;

							var name = $("#" + settings.id	+ "_multifilter_combo_label").val();
							// var listaFiltros = $("#" + this.id+
							// "_label").data("tmp.data");
							var listaFiltros = $("#" + settings.id+ "_multifilter_combo_label").data("tmp.data");
							// Busco el valor del filtro
							var objFiltro = $.grep(listaFiltros, function(obj,i) {
								if (obj.label == name)
									return obj
							});

							// si es filtro por defecto,
							// checkeo el check "Filtro
							// por defecto"
							if (objFiltro.length != 0) {
								multifilterSettings.$defaultCheck.attr('checked', objFiltro[0].value);

								var valorFiltro = $.parseJSON(objFiltro[0].data);

								var xhrArray = [];

								// $.map(valorFiltro,function(item) {
								// xhrArray[item.name] = item.value;
								// });
								xhrArray = $.rup_utils.jsontoarray(valorFiltro);
							}

							if (valorFiltro==undefined &&  multifilterSettings.$savedFilterName!=undefined){
								if (multifilterSettings.$savedFilterName===name)
								var valorFiltro = $.parseJSON(multifilterSettings.$savedFilterValue);

							}
							return valorFiltro;


						},

						_fillForm : function(filtroNuevo) {

							var $self = this;
							var settings= $self.data("settings");

							//cambiar milisengudos a fecha (el formato de bd del  fecha es milisegundos)
							$("[ruptype='date']", settings.filter.$filterContainer).each(function(index, elem){

								  var $campo = jQuery(elem);

								var fechaString;

								var jsonFecha = filtroNuevo[elem.name];
								if (jsonFecha!=undefined){
									if( jsonFecha.search("/")==-1){
										var dateFromJson = new Date(parseInt(jsonFecha));

									var dateFormat = $campo.data("datepicker").settings.dateFormat;

									if ($campo.data("datepicker").settings.datetimepicker){
									                // Cuando es fecha-hora
									                var dateObj={hour:dateFromJson.getHours(),minute:dateFromJson.getMinutes(),second:dateFromJson.getSeconds()};
									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson)+" "+$.timepicker._formatTime(dateObj, "hh:mm:ss");
									}else{
									                // Solo fecha

									                fechaString = $.datepicker.formatDate(dateFormat, dateFromJson);
									}

									filtroNuevo[elem.name]=fechaString;
									}
							}
							});

							// Formatear datos
							// var valorFiltro = $.parseJSON(filtroNuevo);
							var xhrArray = $.rup_utils.jsontoarray(filtroNuevo);

							// evento antes de rellenar el form
							// $self.triggerHandler("rupTable_multifilter_fillForm",filtroNuevo);

							// rellenar el formulario
							$.rup_utils.populateForm(xhrArray, $(this.selector+ "_filter_form"));
							// $self._fillForm(filtroNuevo);
							// $self.rup_table("filter");

						}




					});

	// *******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	// *******************************************************

	/**
	 * Parámetros de configuración por defecto para el plugin filter.
	 *
	 */
	jQuery.fn.rup_table.plugins.multifilter = {};
	jQuery.fn.rup_table.plugins.multifilter.defaults = {
		multifilter : {}
	};

})(jQuery);
