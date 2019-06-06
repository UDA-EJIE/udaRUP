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

/*global jQuery */

/**
 * Proporciona al componente RUP Table ciertas funcionalidades responsive.
 *
 * @summary Plugin de toolbar del componente RUP Table.
 * @module rup_jqtable/responsive
 * @example
 *
 * $("#idComponente").rup_jqtable({
 * 	url: "../jqGridUsuario",
 * 	usePlugins:["responsive"],
 * 	responsive:{
 * 		// Propiedades de configuración del plugin responsive
 * 	}
 * });
 */
(function ($) {

	/**
   * Definición de los métodos principales que configuran la inicialización del plugin.
   *
   * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
   * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
   *
   */
	jQuery.rup_jqtable.registerPlugin('responsive', {
		loadOrder: 20,
		preConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('preConfigureResponsive', settings);
		},
		postConfiguration: function (settings) {
			var $self = this;
			return $self.rup_jqtable('postConfigureResponsive', settings);
		}
	});

	$.extend($.rup, {
		jqtable: {
			responsive: {
				'SCREEN_SM': 768,
				'SCREEN_MD': 992,
				'SCREEN_LG': 1200
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
   * Extensión del componente rup_jqtable para permitir la gestión de la botonera asociada a la tabla.
   *
   * Los métodos implementados son:
   *
   * preConfigureFeedback(settings): Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
   * postConfigureFeedback(settings): Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
   *
   * settings.$feedback : Referencia al componente feedback.
   * settings.$$internalFeedback : Referencia al feedback interno.
   *
   *
   */

	$.extend($.jgrid, {
		// 	setGridWidth: function(nwidth, shrink){
		// 	debugger;
		// 	}

	});

	jQuery.fn.rup_jqtable('extend', {
		/**
		* Metodo que realiza la pre-configuración del plugin responsive del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name preConfigureResponsive
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		preConfigureResponsive: function (settings) {
			var $self = this;



		},
		/**
		* Metodo que realiza la post-configuración del plugin responsive del componente RUP Table.
		* Este método se ejecuta antes de la incialización del plugin.
		*
		* @name postConfigureResponsive
		* @function
		* @param {object} settings - Parámetros de configuración del componente.
		*/
		postConfigureResponsive: function (settings) {

			var $self = this,
				$fluidBaseLayer, currentDisplay, currentDisplayIndex;

			settings.fluid.baseLayer = $.rup_utils.getJQueryId(settings.fluid.baseLayer !== null ? settings.fluid.baseLayer : settings.id + '_div');
			settings.fluid.$baseLayer = jQuery(settings.fluid.baseLayer);
			if (settings.fluid.$baseLayer.length === 0) {
				alert('El identificador ' + settings.baseLayer + ' especificado para la capa sobre la que se va a aplicar el diseño líquido no existe.');
				return;
			}

			$fluidBaseLayer = settings.fluid.fluidBaseLayer = settings.fluid.$baseLayer;

			// Tratamiento del evento de redimiensionado del diseño líquido de la tabla
			$(window).on('resize', function (event, previousWidth, currentWidth) {
				if ($self.is(':visible')) {
					var feedBackPaddingLeft, feedBackPaddingRight, toolbarPaddingLeft, toolbarPaddingRight, windowWidth, rwdConfigArray;

					windowWidth = $(window).width();

					if (windowWidth > $.rup.jqtable.responsive.SCREEN_LG) {
						currentDisplay = 'lg';
					} else if (windowWidth > $.rup.jqtable.responsive.SCREEN_MD) {
						currentDisplay = 'md';
					} else if (windowWidth > $.rup.jqtable.responsive.SCREEN_SM) {
						currentDisplay = 'sm';
					} else {
						currentDisplay = 'xs';
					}

					rwdConfigArray = $self.rup_jqtable('getRwdColConfig');


					$.each(rwdConfigArray, function (i, obj) {

						if (obj[currentDisplay] === true) {
							$self.rup_jqtable('showCol', obj.name);
						} else {
							$self.rup_jqtable('hideCol', obj.name);
						}
					});

					//$self.trigger("rupTable_fluidUpdate");

					//$self.setGridWidth(currentWidth);


					// Se redimensionan las capas contenidas en el mantenimiento
					//$fluidBaseLayer.children().width(currentWidth);
					//						prop.searchForm.parent().width(currentWidth+3)
					// Se redimensiona el feedback
					// if (settings.$feedback){
					// 	feedBackPaddingLeft = parseInt(settings.$feedback.css("padding-left"));
					// 	feedBackPaddingRight = parseInt(settings.$feedback.css("padding-right"));
					// 	settings.$feedback.width(currentWidth - (feedBackPaddingLeft+feedBackPaddingRight));
					// }

					// Se redimensiona la toolbar
					// if (settings.$toolbar){
					// 	toolbarPaddingLeft = parseInt(settings.$toolbar.css("padding-left"));
					// 	toolbarPaddingRight = parseInt(settings.$toolbar.css("padding-right"));
					// 	settings.$toolbar.width(currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					// 	settings.$toolbar.css("width", currentWidth - (toolbarPaddingLeft+toolbarPaddingRight));
					// }
				}
			});

			function intNum(val, defval) {
				val = parseInt(val, 10);
				if (isNaN(val)) {
					return defval || 0;
				}
				return val;
			}

			function reDefineColWidth() {
				var $self = this;
				var widthsArr = $self[0].p.colModel.map(function (i, elem) {
					return i.width;
				});

				for (var j = 0; j < widthsArr.length; j++) {
					$('.ui-jqgrid-labels > th:eq(' + j + ')').css('width', widthsArr[j]);
					$self.find('tr').find('td:eq(' + j + ')').each(function () {
						$(this).css('width', widthsArr[j]);
					});
				}
			}

			function setColWidth() {
				//console.log("entra");
				var initwidth = 0,
					ts = this[0],
					grid = this[0],
					brd = $.jgrid.cell_width ? 0 : intNum(ts.p.cellLayout, 0),
					vc = 0,
					lvc, scw = intNum(ts.p.scrollOffset, 0),
					cw, hs = false,
					aw, gw = 0,
					cl = 0,
					cr;
				$.each(ts.p.colModel, function () {
					if (this.hidden === undefined) {
						this.hidden = false;
					}
					if (ts.p.grouping && ts.p.autowidth) {
						var ind = $.inArray(this.name, ts.p.groupingView.groupField);
						if (ind !== -1) {
							this.hidden = !ts.p.groupingView.groupColumnShow[ind];
						}
					}
					this.widthOrg = cw = intNum(this.width, 0);
					if (this.hidden === false) {
						initwidth += cw + brd;
						if (this.fixed) {
							gw += cw + brd;
						} else {
							vc++;
						}
						cl++;
					}
				});
				if (isNaN(ts.p.width)) {
					ts.p.width = initwidth + ((ts.p.shrinkToFit === false && !isNaN(ts.p.height)) ? scw : 0);
				}
				grid.width = ts.p.width;
				ts.p.tblwidth = initwidth;
				if (ts.p.shrinkToFit === false && ts.p.forceFit === true) {
					ts.p.forceFit = false;
				}
				if (ts.p.shrinkToFit === true && vc > 0) {
					aw = grid.width - brd * vc - gw;
					if (!isNaN(ts.p.height)) {
						aw -= scw;
						hs = true;
					}
					initwidth = 0;
					$.each(ts.p.colModel, function (i) {

						if (this.hidden === false && this.fixed !== true) {
							//console.log("->" + this.name + " - hidden:" + this.hidden + " - fixed: " + this.fixed + " -  tblwidth: " + ts.p.tblwidth + " - width: " + this.width);
							cw = Math.round(aw * this.width / (ts.p.tblwidth - brd * vc - gw));
							this.width = cw;
							initwidth += cw;
							lvc = i;
						}
					});
					cr = 0;
					if (hs) {
						if (grid.width - gw - (initwidth + brd * vc) !== scw) {
							cr = grid.width - gw - (initwidth + brd * vc) - scw;
						}
					} else if (!hs && Math.abs(grid.width - gw - (initwidth + brd * vc)) !== 1) {
						cr = grid.width - gw - (initwidth + brd * vc);
					}
					ts.p.colModel[lvc].width += cr;
					ts.p.tblwidth = initwidth + cr + brd * vc + gw;
					if (ts.p.tblwidth > ts.p.width) {
						ts.p.colModel[lvc].width -= (ts.p.tblwidth - parseInt(ts.p.width, 10));
						ts.p.tblwidth = ts.p.width;
					}
				}
			}

			function resize() {
				$self.css('width', '100%');

				$self.parents('.ui-jqgrid-bdiv').css('width', '100%');
				$self.parents('.ui-jqgrid-view').css('width', '100%');
				$self.parents('.ui-jqgrid').css('width', '100%');

				$self.parents('.ui-jqgrid').find('.ui-jqgrid-htable').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-htable').parents('.ui-jqgrid-hbox').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-hdiv').css('width', '100%');
				$self.parents('.ui-jqgrid').find('.ui-jqgrid-pager').css('width', '100%');
				if ($self.data('settings').$toolbar){
					$self.data('settings').$toolbar.css('width', '100%');
				}
				$.proxy(setColWidth, $self)();
				$.proxy(reDefineColWidth, $self)();

			}

			$self.on('jqGridAfterLoadComplete', function () {
				$.proxy(resize, $self)();
			});

			$(window).on('resize', function () {
				$.proxy(resize, $self)();
			});



			// $self.fluidWidth({
			// 	fluidBaseLayer:settings.fluid.baseLayer,
			// 	minWidth: 100,
			// 	maxWidth: 2000,
			// 	fluidOffset : 0
			// });
			//
			// // $self.fluidWidth(settings.fluid);
			// //
			// $self.on("rupTable_fluidUpdate", function(event){
			// 	$.proxy(resize,$self)();
			// });


		}
	});


	jQuery.fn.rup_jqtable('extend', {
		/**
		* Obtiene a partir de la configuración del colModel, la información correspondiente al comportamiento responsive de las columnas.
		*
		* @name getRwdColConfig
		* @function
		* @return {object[]} - Configuración responsive para las columnas de la tabla.
		*/
		getRwdColConfig: function () {
			var $self = this,
				rwdCols, retJson = {},
				retArray = [],
				jsonAux = {},
				colRwdClasses, splitAux, splitAux2;

			rwdCols = $.grep($self.rup_jqtable('getColModel'), function (obj, i) {
				return obj['rwdClasses'];
			});

			$.each(rwdCols, function (i, obj) {
				colRwdClasses = obj.rwdClasses;
				jsonAux = {
					name: obj.name,
					xs: true,
					sm: true,
					md: true,
					lg: true
				};
				splitAux = colRwdClasses.split(' ');
				//console.log("name:" + obj.name);
				for (var i = 0; i < splitAux.length; i++) {
					splitAux2 = splitAux[i].split('-');
					//  console.log("splitAux2:" + splitAux2[0]);
					//console.log("splitAux2:" + splitAux2[1]);
					if (splitAux2[0] === 'hidden') {
						jsonAux[splitAux2[1]] = false;
					}
				}

				retArray.push(jsonAux);
			});

			//console.log(retArray);
			return retArray;

		}
	});





	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
 	* @description Propiedades de configuración del plugin responsive del componente RUP Table.
 	*
 	* @name options
 	*
 	* @property {object} [fluid] - Parametros de configuración
 	* @property {string[]} [excludeColumns] - Determina las columnas que van a ser excluidas de la generación del informe.
 	* @property {string[]} [sendPostDataParams] - Parámetros del jqGrid que van a ser enviados en la petición de generación del informe.
 	*/


	jQuery.fn.rup_jqtable.plugins.responsive = {};
	jQuery.fn.rup_jqtable.plugins.responsive.defaults = {
		// autowidth:true,
		fluid: {
			baseLayer: null,
			minWidth: 100,
			maxWidth: 2000,
			fluidOffset: 0
		},
		toolbar: {
			autoAjustToolbar: false,
			width: '87.6%'
		}

	};

	// jQuery.fn.rup_jqtable.plugins.toolbar.defaults = {
	// 	toolbar:{
	// 		autoAjustToolbar:false
	// 	}
	// };

})(jQuery);
