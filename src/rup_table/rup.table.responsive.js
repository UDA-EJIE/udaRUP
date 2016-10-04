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

	/**
	 * Definición de los métodos principales que configuran la inicialización del plugin.
	 *
	 * preConfiguration: Método que se ejecuta antes de la invocación del componente jqGrid.
	 * postConfiguration: Método que se ejecuta después de la invocación del componente jqGrid.
	 *
	 */
	jQuery.rup_table.registerPlugin("responsive",{
		loadOrder:20,
		preConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("preConfigureResponsive", settings);
		},
		postConfiguration: function(settings){
			var $self = this;
			return $self.rup_table("postConfigureResponsive", settings);
		}
	});

	$.extend($.rup, {
		table:{
			responsive:{
				"SCREEN_SM" : 768,
				"SCREEN_MD" : 992,
				"SCREEN_LG" : 1200,
			}
		}
	});

	//********************************
	// DEFINICIÓN DE MÉTODOS PÚBLICOS
	//********************************

	/**
	 * Extensión del componente rup_table para permitir la gestión de la botonera asociada a la tabla.
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

	 $.extend($.jgrid,{
 	// 	setGridWidth: function(nwidth, shrink){
		// 	debugger;
 	// 	}

 	});

	jQuery.fn.rup_table("extend",{
		/*
		 * Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.
		 *
		 * TODO: internacionalizar mensajes de error.
		 */
		preConfigureResponsive: function(settings){
			var $self = this;


		},
		/*
		 * Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.
		 *
		 */
		postConfigureResponsive: function(settings){

			var $self = this, $fluidBaseLayer, currentDisplay, currentDisplayIndex;

			settings.fluid.baseLayer = $.rup_utils.getJQueryId(settings.fluid.baseLayer!==null?settings.fluid.baseLayer:settings.id+"_div");
			settings.fluid.$baseLayer = jQuery(settings.fluid.baseLayer);
			if (settings.fluid.$baseLayer.length===0){
				alert("El identificador "+settings.baseLayer+" especificado para la capa sobre la que se va a aplicar el diseño líquido no existe.");
				return;
			}

			$fluidBaseLayer = settings.fluid.fluidBaseLayer = settings.fluid.$baseLayer;

			// Tratamiento del evento de redimiensionado del diseño líquido de la tabla
			$self.bind("fluidWidth.resize", function(event, previousWidth, currentWidth){
				if ($self.is(":visible")){
					var feedBackPaddingLeft, feedBackPaddingRight, toolbarPaddingLeft, toolbarPaddingRight, windowWidth,rwdConfigArray;

					windowWidth = $(window).width();

					if (windowWidth > $.rup.table.responsive.SCREEN_LG){
						currentDisplay="lg";
					}else if (windowWidth > $.rup.table.responsive.SCREEN_MD){
						currentDisplay="md";
					}else if (windowWidth > $.rup.table.responsive.SCREEN_SM){
						currentDisplay="sm";
					}else{
						currentDisplay="xs";
					}

					rwdConfigArray = $self.rup_table("getRwdColConfig");

					$.each(rwdConfigArray, function(i, obj){
						if (obj[currentDisplay]===true){
							$self.rup_table("showCol", obj.name);
						}else{
							$self.rup_table("hideCol", obj.name);
						}
					});

					//$self.trigger("rupTable_fluidUpdate");

					$self.setGridWidth(currentWidth);


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

//			$self.fluidWidth({
//				fluidBaseLayer:settings.fluid.baseLayer,
//				minWidth: 100,
//				maxWidth: 2000,
//				fluidOffset : 0
//			});

			$self.fluidWidth(settings.fluid);

			$self.on("rupTable_fluidUpdate", function(event){
				$self.fluidWidth(settings.fluid);
			});


		}
	});


	jQuery.fn.rup_table("extend",{
		getRwdColConfig:function(){
			var $self = this, rwdCols, retJson={}, retArray=[], jsonAux = {},colRwdClasses, splitAux, splitAux2;

			rwdCols = $.grep($self.rup_table("getColModel"), function(obj,i){
				return obj['rwdClasses'];
			});

			$.each(rwdCols, function(i,obj){
				colRwdClasses = obj.rwdClasses;
				jsonAux={
						name:obj.name,
						xs:true,
						sm:true,
						md:true,
						lg:true
				};
				splitAux=colRwdClasses.split(" ");
				console.log("name:"+obj.name);
				for(var i=0;i<splitAux.length;i++){
					splitAux2 = splitAux[i].split("-");
					console.log("splitAux2:"+splitAux2[0]);
					console.log("splitAux2:"+splitAux2[1]);
					if (splitAux2[0]==="hidden"){
						jsonAux[splitAux2[1]]=false;
					}
				}

				retArray.push(jsonAux);
			});

			console.log(retArray);
			return retArray;

		}
	});





	//*******************************************************
	// DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
	//*******************************************************


	/**
	 * Parámetros de configuración por defecto para el feedback.
	 *
	 * feedback.config: Configuración por defecto del feedback principal.
	 * feedback.internalFeedbackConfig: Configuración por defecto del feedback interno.
	 */
	jQuery.fn.rup_table.plugins.responsive = {};
	jQuery.fn.rup_table.plugins.responsive.defaults = {
		// autowidth:true,
		fluid:{
			baseLayer:null,
			minWidth: 100,
			maxWidth: 2000,
			fluidOffset : 0
		},
		toolbar:{
			autoAjustToolbar:false,
			width: "87.6%"
		}

	};

})(jQuery);
