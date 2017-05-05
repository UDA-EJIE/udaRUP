(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(['jquery', 'handlebars', 'jasmine-jquery', 'rup/rup.slider'], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($, Handlebars) {

  describe("RUP Slider Tests", function() {

    describe("Creación de un Slider.  ", function() {

      var source, template, $content, $slider;

      beforeEach(function() {
        //html
        source = '<div id="slider">';


        $("body").append("<div id=\"content\"></div>")
        template = Handlebars.compile(source);
        $content = $("#content");


        $content.html(template());
        $slider = $("#slider");
        //js
        var properties = {
          min: 0,
          max: 500
        };
        $("#slider").rup_slider(properties);

      });

      afterEach(function() {
        $('body').html('');
      });

      describe("Test de la API.", function() {

        beforeEach(function() {

        });

        //GetRupValue
        describe('$("#slider").rup_slider("getRupValue");', function() {

          it("Debería mostrar el valor del slider", function() {
            expect($("#slider").rup_slider("getRupValue")).toBe(0);
          });

        });

        //GetRupValue
        describe('$("#slider").rup_slider("setRupValue");', function() {

          it("Debería establecer el valor del slider en 70", function() {
            $("#slider").rup_slider("setRupValue", 70);
            expect($("#slider").rup_slider("getRupValue")).toBe(70);
          });
        });

        //Disable
        describe('$("#slider").rup_slider("disable");', function() {

          it("Debería deshabilitar el slider.", function() {
            $("#slider").rup_slider("disable");
            expect($("#slider")).toHaveClass("ui-slider-disabled");
          });
        });

        //Enable
        describe('$("#slider").rup_slider("enable");', function() {

          it("Debería habilitar el slider.", function() {
            $("#slider").rup_slider("disable");
            $("#slider").rup_slider("enable");
            expect($("#slider")).not.toHaveClass("ui-slider-disabled");
          });
        });

        //Option
        describe("Test del metodo option.", function() {

          //Option paramName
          describe('$("#slider").rup_slider("option,paramName");', function() {

            it("Debería mostrar el valor del parametros del slider.", function() {

              expect($('#slider').rup_slider("option", "min")).toBe(0);
            });
          });


          //Option param
          describe('$("#slider").rup_slider("option,param");', function() {

            it("Debería establecer nuevos parametros al slider.", function() {
              $('#slider').rup_slider("option", {
                min: 10,
                max: 60
              })
              expect($('#slider').rup_slider("option", "max")).toBe(60);
            });
          });

          //option
          describe('$("#slider").rup_slider("option");', function() {

            it("Debería devolver el objeto de opciones de configuracion del slider.", function() {

              expect(typeof($('#slider').rup_slider("option"))).toBe('object');
            });
          });

          //option paramName paramValue
          describe('$("#slider").rup_slider("option,paramName,paramValue");', function() {

            it("Debería devolver el objeto de opciones de configuracion del slider.", function() {
              $("#slider").rup_slider("option", "min", 50);
              expect($("#slider").rup_slider("getRupValue")).toBe(50);

            });
          });

        });

        //Destroy
        describe('$("#slider").rup_slider("destroy");', function() {

          it("Debería devolver el objeto de opciones de configuracion del slider.", function() {
            $("#slider").rup_slider("destroy");
            expect($("#slider")).not.toHaveClass("rup-slider");
          });
        });


      });

    });
  });
}));
