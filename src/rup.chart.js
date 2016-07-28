/*!
 * Copyright 2014 E.J.I.E., S.A.
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

 /**
  * @fileOverview Implementa el patrón RUP Chart.
  * @author EJIE
  * @version 2.5.0
  */
(function ($) {

  //**********************************************************************************
  // DEFINICIÓN BASE DEL PATRÓN (definición de la variable privada que contendrá
  // los métodos y la función de jQuery)
  //**********************************************************************************

  /**
  * Herramientas para mostrar gráficas atractivas para mostrar
  * informacón al usuario de forma atractiva.
  *
  *
  *
  * @summary Componente RUP Chart.
  * @namespace jQuery.rup_chart
  * @memberOf jQuery
  * @tutorial rup_chart
  * @example
  * // Botón por defecto
  * $("#idButton").rup_button({});
  * // Botón desplegable
  * $("#idButtonDrop").rup_button({
*	dropdown:{
*		dropdownListId:"dropdownHtmlList"
*	}
* });
  */
  var Rup_chart = {};

  //Se configura el arranque de UDA para que alberge el nuevo patrón
  $.extend($.rup.iniRup, $.rup.rupSelectorObjectConstructor('rup_chart', Rup_chart));

  //*******************************
  // DEFINICIÓN DE MÉTODOS PÚBLICOS
  //*******************************
  $.fn.rup_chart('extend', {
  });

  //*******************************
  // DEFINICIÓN DE MÉTODOS PRIVADOS
  //*******************************

  $.fn.rup_chart('extend', {
    //gestión de i18n para los labels de los charts
    _parseLabels : function (labels) {
      var arrLabels = [];
      $.each(labels, function(key, value) {
        arrLabels.push(value);
      });

      return arrLabels;

    },

    _generateRandomColors: function (number) {

      /*
      This generates colors using the following algorithm:
      Each time you create a color:
          Create a random, but attractive, color{
              Red, Green, and Blue are set to random luminosity.
              One random value is reduced significantly to prevent grayscale.
              Another is increased by a random amount up to 100%.
              They are mapped to a random total luminosity in a medium-high
              range (bright but not white).
          }
          Check for similarity to other colors{
              Check if the colors are very close together in value.
              Check if the colors are of similar hue and saturation.
              Check if the colors are of similar luminosity.
              If the random color is too similar to another,
              and there is still a good opportunity to change it:
                  Change the hue of the random color and try again.
          }
          Output array of all colors generated
      */

      //if we've passed preloaded colors and they're in hex format
      if (typeof(arguments[1]) != 'undefined' && arguments[1].constructor == Array && arguments[1][0] && arguments[1][0].constructor != Array) {
        for (var i = 0; i < arguments[1].length; i++) { //for all the passed colors
          //get RGB values
          var vals = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(arguments[1][i]);

          //and convert them to base 10
          arguments[1][i] = [parseInt(vals[1], 16), parseInt(vals[2], 16), parseInt(vals[3], 16)];
        }
      }

      var loadedColors = typeof(arguments[1]) == 'undefined' ? [] : arguments[1], //predefine colors in the set
          number = number + loadedColors.length, //reset number to include the colors already passed
          //set a random value to be the first to decrease
          lastLoadedReduction = Math.floor(Math.random() * 3),

                rgbToHSL = function(rgb) { //converts [r,g,b] into [h,s,l]
                  var r = rgb[0];
                  var g = rgb[1];
                  var b = rgb[2];
                  var cMax = Math.max(r, g, b);
                  var cMin = Math.min(r, g, b);
                  var delta = cMax - cMin;
                  var l = (cMax + cMin) / 2;
                  var h = 0;
                  var s = 0;
                  if (delta === 0) h = 0;
                  else if (cMax == r) h = 60 * ((g - b) / delta % 6);
                  else if (cMax == g) h = 60 * ((b - r) / delta + 2);
                  else h = 60 * ((r - g) / delta + 4);
                  if (delta === 0) s = 0;
                  else s = delta / (1 - Math.abs(2 * l - 1));
                  return [h, s, l];
                },

                hslToRGB = function(hsl) { //converts [h,s,l] into [r,g,b]
                  var h = hsl[0];
                  var s = hsl[1];
                  var l = hsl[2];
                  var c = (1 - Math.abs(2 * l - 1)) * s;
                  var x = c * (1 - Math.abs(h / 60 % 2 - 1));
                  var m = l - c / 2;
                  var r;
                  var g;
                  var b;
                  if (h < 60) {
                    r = c;
                    g = x;
                    b = 0;
                  } else if (h < 120) {
                    r = x;
                    g = c;
                    b = 0;
                  } else if (h < 180) {
                    r = 0;
                    g = c;
                    b = x;
                  } else if (h < 240) {
                    r = 0;
                    g = x;
                    b = c;
                  } else if (h < 300) {
                    r = x;
                    g = 0;
                    b = c;
                  } else {
                    r = c;
                    g = 0;
                    b = x;
                  }

                  return [r, g, b];
                },

                shiftHue = function(rgb, degree) { //shifts [r,g,b] by a number of degrees
                  var hsl = rgbToHSL(rgb); //convert to hue/saturation/luminosity to modify hue
                  hsl[0] += degree; //increment the hue
                  if (hsl[0] > 360) { //if it's too high
                    hsl[0] -= 360; //decrease it mod 360
                  } else if (hsl[0] < 0) { //if it's too low
                    hsl[0] += 360; //increase it mod 360
                  }

                  return hslToRGB(hsl); //convert back to rgb
                },

                differenceRecursions = { //stores recursion data, so if all else fails we can use one of the hues already generated
                  differences: [], //used to calculate the most distant hue
                  values: [], //used to store the actual colors
                },
                fixDifference = function(color) { //recursively asserts that the current color is distinctive
                  if (differenceRecursions.values.length > 23) { //first, check if this is the 25th recursion or higher. (can we try any more unique hues?)
                    //if so, get the biggest value in differences that we have and its corresponding value
                    var ret = differenceRecursions.values[differenceRecursions.differences.indexOf(Math.max.apply(null, differenceRecursions.differences))];
                    differenceRecursions = {
                      differences: [],
                      values: [],
                    }; //then reset the recursions array, because we're done now
                    return ret; //and then return up the recursion chain
                  }

                  //okay, so we still have some hues to try.
                  var differences = []; //an array of the "difference" numbers we're going to generate.
                  for (var i = 0; i < loadedColors.length; i++) { //for all the colors we've generated so far
                    var difference = loadedColors[i].map(function(value, index) { //for each value (red,green,blue)
                      return Math.abs(value - color[index]); //replace it with the difference in that value between the two colors
                    }),

                            sumFunction = function(sum, value) { //function for adding up arrays
                              return sum + value;
                            },

                            sumDifference = difference.reduce(sumFunction), //add up the difference array
                            loadedColorLuminosity = loadedColors[i].reduce(sumFunction), //get the total luminosity of the already generated color
                            currentColorLuminosity = color.reduce(sumFunction), //get the total luminosity of the current color
                            lumDifference = Math.abs(loadedColorLuminosity - currentColorLuminosity), //get the difference in luminosity between the two
                            //how close are these two colors to being the same luminosity and saturation?
                            differenceRange = Math.max.apply(null, difference) - Math.min.apply(null, difference),
                            luminosityFactor = 50, //how much difference in luminosity the human eye should be able to detect easily
                            rangeFactor = 75; //how much difference in luminosity and saturation the human eye should be able to dect easily
                    if (luminosityFactor / (lumDifference + 1) * rangeFactor / (differenceRange + 1) > 1) { //if there's a problem with range or luminosity
                      //set the biggest difference for these colors to be whatever is most significant
                      differences.push(Math.min(differenceRange + lumDifference, sumDifference));
                    }

                    differences.push(sumDifference); //otherwise output the raw difference in RGB values
                  }

                  //if you're generating this many colors or more, don't
                  //try so hard to make unique hues, because you might fail
                  var breakdownAt = 64;

                  //how much should additional colors decrease the acceptable difference
                  var breakdownFactor = 25;

                  //how many degrees of hue should we iterate through if this fails
                  var shiftByDegrees = 15;
                  var acceptableDifference = 250; //how much difference is unacceptable between colors
                  var breakVal = loadedColors.length / number * (number - breakdownAt); //break down progressively (if it's the second color, you can still make it a unique hue)
                  var totalDifference = Math.min.apply(null, differences); //get the color closest to the current color
                  if (totalDifference > acceptableDifference - (breakVal < 0 ? 0 : breakVal) * breakdownFactor) { //if the current color is acceptable
                    differenceRecursions = {
                      differences: [],
                      values: []
                    }; //reset the recursions object, because we're done
                    return color; //and return that color
                  } //otherwise the current color is too much like another
                  //start by adding this recursion's data into the recursions object
                  differenceRecursions.differences.push(totalDifference);
                  differenceRecursions.values.push(color);
                  color = shiftHue(color, shiftByDegrees); //then increment the color's hue
                  return fixDifference(color); //and try again
                },
                color = function() { //generate a random color
                  var scale = function(x) { //maps [0,1] to [300,510]
                    return x * 210 + 300; //(no brighter than #ff0 or #0ff or #f0f, but still pretty bright)
                  },
                        randVal = function() { //random value between 300 and 510
                          return Math.floor(scale(Math.random()));
                        },
                        luminosity = randVal(), //random luminosity
                        red = randVal(), //random color values
                        green = randVal(), //these could be any random integer but we'll use the same function as for luminosity
                        blue = randVal(),
                        rescale, //we'll define this later
                        thisColor = [red, green, blue], //an array of the random values
                        /*
                        #ff0 and #9e0 are not the same colors, but they are on the same range of the spectrum, namely without blue.
                        Try to choose colors such that consecutive colors are on different ranges of the spectrum.
                        This shouldn't always happen, but it should happen more often then not.
                        Using a factor of 2.3, we'll only get the same range of spectrum 15% of the time.
                        */
                        valueToReduce = Math.floor(lastLoadedReduction + 1 + Math.random() * 2.3) % 3, //which value to reduce
                        /*
                        Because 300 and 510 are fairly close in reference to zero,
                        increase one of the remaining values by some arbitrary percent betweeen 0% and 100%,
                        so that our remaining two values can be somewhat different.
                        */
                        valueToIncrease = Math.floor(valueToIncrease + 1 + Math.random() * 2) % 3, //which value to increase (not the one we reduced)
                        increaseBy = Math.random() + 1; //how much to increase it by
                  lastLoadedReduction = valueToReduce; //next time we make a color, try not to reduce the same one
                  thisColor[valueToReduce] = Math.floor(thisColor[valueToReduce] / 16); //reduce one of the values
                  thisColor[valueToIncrease] = Math.ceil(thisColor[valueToIncrease] * increaseBy); //increase one of the values
                  rescale = function(x) { //now, rescale the random numbers so that our output color has the luminosity we want
                    return x * luminosity / thisColor.reduce(function(a, b) {
                      return a + b;
                    }); //sum red, green, and blue to get the total luminosity
                  };
                  thisColor = fixDifference(thisColor.map(function(a) {
                    return rescale(a);
                  })); //fix the hue so that our color is recognizable
                  if (Math.max.apply(null, thisColor) > 255) { //if any values are too large
                    rescale = function(x) { //rescale the numbers to legitimate hex values
                      return x * 255 / Math.max.apply(null, thisColor);
                    };
                    thisColor = thisColor.map(function(a) {
                      return rescale(a);
                    });
                  }
                  return thisColor;
                };

      for (var i = loadedColors.length; i < number; i++) { //Start with our predefined colors or 0, and generate the correct number of colors.
        loadedColors.push(color().map(function(value) { //for each new color
          return Math.round(value); //round RGB values to integers
        }));
      }
      //then, after you've made all your colors, convert them to hex codes and return them.
      return loadedColors.map(function(color) {
        var hx = function(c) { //for each value
          var h = c.toString(16); //then convert it to a hex code
          return h.length < 2 ? '0' + h : h; //and assert that it's two digits
        };
        return '#' + hx(color[0]) + hx(color[1]) + hx(color[2]); //then return the hex code
      });
    },

    _rainbow: function(numOfSteps, step) {
      // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distiguishable vibrant markers in Google Maps and other apps.
      // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
      // Adam Cole, 2011-Sept-14
      var r, g, b;
      var h = step / numOfSteps;
      var i = ~~(h * 6);
      var f = h * 6 - i;
      var q = 1 - f;
      switch (i % 6) {
        case 0:
          r = 6; g = f; b = 5;
          break;
        case 1:
          r = q; g = 6; b = 5;
          break;
        case 2:
          r = 5; g = 6; b = f;
          break;
        case 3:
          r = 5; g = q; b = 6;
          break;
        case 4:
          r = f; g = 5; b = 6;
          break;
        case 5:
          r = 6; g = 5; b = q;
          break;
      }
      var c = '#' + ('00' + (~~(r * 255)).toString(16)).slice(-2) + ('00' + (~~(g * 255)).toString(16)).slice(-2) + ('00' + (~~(b * 255)).toString(16)).slice(-2);
      return (c);
    }

  });

  //*******************************
  // methodo INICIALIZACION
  //*******************************
  $.fn.rup_chart('extend', {

    _init: function(args) {
      var settings = $.extend({}, $.fn.rup_chart.defaults, args[0]);
      settings.id = $(this).attr('id');
      $self = this;
      var ctx = document.getElementById(settings.id).getContext('2d');
      var grafico;

      //gestion de literales de labels i18n
      settings.data.labels = this._parseLabels(settings.data.labels);

      if (args.length > 1) {
        $.rup.errorGestor($.rup.i18nParse($.rup.i18n.base, 'rup_global.initError') + $(this).attr('id'));
      } else {
        var dataset = settings.data.datasets;

        var colorsArr;
        if (settings.type == 'polarArea' || settings.type == 'pie' || settings.type == 'doughnut') {
          colorsArr = this._generateRandomColors(settings.data.length);
        } else {
          colorsArr = this._generateRandomColors(settings.data.datasets.length);
        }
        for (var i = 0; i < colorsArr.length; i++) {
          if (settings.type == 'polarArea' || settings.type == 'pie' || settings.type == 'doughnut') {
            settings.data[i].color = colorsArr[i];
          } else {
            settings.data.datasets[i].fillColor = colorsArr[i];
          }
        }

        if (settings.type == 'radar') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).Radar(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).Radar(settings.data);
          }
        } else if (settings.type == 'polarArea') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).PolarArea(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).PolarArea(settings.data);
          }
        } else if (settings.type == 'pie') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).Pie(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).Pie(settings.data);

          }
        } else if (settings.type == 'doughnut') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).Doughnut(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).Doughnut(settings.data);
          }
        } else if (settings.type == 'bar') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).Bar(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).Bar(settings.data);

          }
        } else if (settings.type == 'line') {
          if (settings.options !== null) {
            grafico = new Chart(ctx).Line(settings.data, settings.options);
          } else {
            grafico = new Chart(ctx).Line(settings.data);
          }
        }
        $self.addClass('rup_chart');
        //atributo ruptype

        //leyenda
        if (settings.options != null) {
          if (settings.options.legendTemplate != null) {
            $('#' + settings.id).parent().append('<div id=\'' + settings.id + 'Legend\'></div>');
            $('#' + settings.id + 'Legend').html(grafico.generateLegend());
          }
        }

      }

    }

    // TODO getRUP
    // TODO setRUP
    // TODO Leyenda

  });

  //******************************************************
  // DEFINICIÓN DE LA CONFIGURACION POR DEFECTO DEL PATRON
  //******************************************************
  /**
   * Opciones por defecto de configuración del componente comunes a todos los
   * tipos de gráficos.
   * @name jQuery.rup_chart#OptionsGlobal
   *
   * @property {boolean} [scaleShowGridLines] - Mostrar las líneas de la escala en la gráfica
   * @property {string} [scaleGridLineColor] - Asigna un color a las líneas de la escala.
   * @property {number} [scaleGridLineWidth] - Asigna un ancho a las líneas de la escala.
   * @property {boolean} [scaleShowHorizontalLines] - Mostrar solo las líneas horizonates del gráfico de la escala.
   * @property {boolean} [scaleShowVerticalLines] - Mostrar solo las líneas verticales del gráfico de la escala.
   * @property {boolean} [bezierCurve] - Permitir que la línea sea curva entre los puntos.
   * @property {number} [bezierCurveTension] - Tensión de la curvatura entre los puntos.
   * @property {boolean} [pointDot] - Mostrar puntos por cada valor.
   * @property {number} [pointRadius] - Radio de cada punto expresado en pixels.
   * @property {number} [pointDotStrokeWidth] - Anchura de los puntos.
   * @property {number} [pointHitDetectionRadius] - Anchura extra a la detección de colisión alrededor del punto.
   * @property {boolean } [datasetStroke ] - Mosrtar trazo para un conjunto de datos.
   * @property { number} [datasetStrokeWidth] - Ancho del trazo para el conjunto de datos.
   * @property {boolean } [datasetFill] - Rellenar el conjunto de datos con un color.
   * @property {string } [legendTemplate] - Plantilla html de la leyenda.
   *
   */




  $.fn.rup_chart.defaults = {
    foobar: false
  };
/**
  * Opciones de configuración del gráfico de tipo "bar".
  * @name jQuery.rup_chart#OptionsBar
  *
  *  @property {boolean} [scaleBeginAtZero] - Comenzar la escala en 0.
  *  @property {booelan} [barShowStroke]  - Mostrar traza por cada barra.
  *  @property {number} [barStrokeWidth] - Medida en pixels de la anchura del trazo de la barra.
  *  @property {number} [barValueSpacing] - Espaciado entre cada valor en la X.
  *  @property {number} [barDatasetSpacing] - Espaciado entre cada valor en la X.
  */
  /**
  * Opciones de configuración del gráfico de tipo "Radar".
  * @name jQuery.rup_chart#OptionsRadar
  * @member Options
  *
  *   @property {boolean} [scaleShowLine] - Mostar las lineas por cada punto de la escala.
  *   @property {booelan} [angleShowLineOut]  - Mostrar las lineas fuera del gráfico
  *   @property {boolean} [scaleBeginAtZero] - Comenzar la scale en 0.
  *   @property {string} [angleLineColor] - Color de la linea de ángulo.
  *   @property {number} [angleLineWidth] - Tamaño en pixels del ancho de la línea.
  *   @property {string} [pointLabelFontFamily] - Tipo de fuente para las etiquetas.
  *   @property {String} [pointLabelFontStyle] - Estilo del tamaño de las fuentes (normal, bold...).
  *   @property {number} [pointLabelFontSize] - Tamaño en pixels de la fuente de las etiquetas.
  *   @property {string} [pointLabelFontColor] - Color de la fuente de las etiquetas.
  */

  /**
  * Opciones de configuración del gráfico de tipo "Polar".
  * @name jQuery.rup_chart#OptionsPolar
  *
  *   @property {boolean} [scaleShowLabelBackdrop] - Mostar un fondo para la etiqueta de escalas.
  *   @property {string} [scaleBackdropColor]  - Color de fondo para la etiqueta de escalas.
  *   @property {boolean} [scaleBeginAtZero] - Comenzar la scale en 0.
  *   @property {number} [scaleBackdropPaddingY] - El espaciado arriba y abajo de la etiqueta en pixels.
  *   @property {number} [scaleBackdropPaddingX] - El espaciado izquierdo y derecho de la etiqueta en pixels.
  *   @property {boolean} [scaleShowLine] - Mostrar una línea por cada valor en la escala.
  *   @property {string} [segmentStrokeColor] - El color del trazo de cada segmento.
  *   @property {number} [segmentStrokeWidth] - Anchura del trazo en pixels.
  *   @property {number} [animationSteps] - Cantidad de putnos intermedios en la animación.
  *   @property {string} [animationEasing] - Efecto de suavizado de la animación (easeOutBounce,...).
  *   @property {boolean} [animateRotate] - Animar la rotación del gráfico.
  *   @property {boolean} [animateScale] - Animar la escala desde el centro.
  */


  /**
  * Opciones de configuración del gráfico de tipo "Pie" y "Doughnut".
  * @name jQuery.rup_chart#OptionsPie&Doughnut
  *   @inner
  *   @property {boolean} [segmentShowStroke] - Mostrar un trazo por cada segmento.
  *   @property {string} [segmentStrokeColor] - Color de cada trazo de segmento.
  *   @property {number} [segmentStrokeWidth] - Anchura de los trazos de los segmentos.
  *   @property {number} [percentageInnerCutout] - Porcentaje del gráfico cortado por la mitad.
  *   @property {number} [animationSteps] - Cantidad de putnos intermedios en la animación.
  *   @property {string} [animationEasing] - Efecto de suavizado de la animación (easeOutBounce,...).
  *   @property {boolean} [animateRotate] - Animar la rotación del gráfico.
  *   @property {boolean} [animateScale] - Animar la escala desde el centro.
*/












})(jQuery);
