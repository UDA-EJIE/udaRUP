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
  jQuery.jgrid.fluid =
  {
    fluidWidth: function(options)
    {
      var grid = $(this);
      var settings = $.extend(
                        {
                          fluidBaseLayer: "#gbox_"+grid.attr("id"),
                          fluidOffset: 0,
                          minWidth: null,
                          maxWidth: null
                        }, options || {});
      
      var resizeLayer = function(layer, forceEvent){
		  var currentWidth = layer.width(), previousWidth = $(layer).data("previousWidth"), evntCurrentWidth = currentWidth;
		  if (forceEvent===true || (currentWidth != previousWidth)) {
			  $(layer).data("previousWidth",currentWidth);

			  evntCurrentWidth= (settings.minWidth !==null && currentWidth < settings.minWidth?settings.minWidth:evntCurrentWidth);
			  evntCurrentWidth= (settings.maxWidth !==null && currentWidth > settings.maxWidth?settings.maxWidth:evntCurrentWidth);
			  
			  grid.trigger("fluidWidth.resize",[previousWidth, evntCurrentWidth - settings.fluidOffset]);
		  }
	  };
      
      // Comprobamos si se esta monitorizando la anchura de la capa
      if ($(settings.fluidBaseLayer).data("fluidWidth")!==true){
    	  //Inidicamos que la capa esta siendo monitorizada
    	  $(settings.fluidBaseLayer).data("fluidWidth", true);
    	  
    	  setInterval(function(){
    		  resizeLayer($(settings.fluidBaseLayer), false);
    	  }, 100);
      }
      
      resizeLayer($(settings.fluidBaseLayer), true);
    }
  };
})(jQuery);

jQuery.fn.extend({ fluidWidth : jQuery.jgrid.fluid.fluidWidth });