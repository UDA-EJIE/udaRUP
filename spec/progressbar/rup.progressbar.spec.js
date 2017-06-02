(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(['jquery', 'handlebars', 'jasmine-jquery', 'rup/rup.progressbar'], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($, Handlebars) {

  describe("RUP Progressbar Tests", function() {

    describe("Creación de un Progressbar  ", function() {

      var source, template, $content, $time;

      beforeEach(function() {
        //html
        source = '<div id="progressbar" >';


        $("body").append("<div id=\"content\"></div>")
        template = Handlebars.compile(source);
        $content = $("#content");


        $content.html(template());
        $time = $("#progressbar");
        //js
        var properties = {
          value: 50
        };
        $("#progressbar").rup_progressbar(properties);

      });

      afterEach(function() {
        $('body').html('');
      });

      describe("Test de la API.", function() {

        beforeEach(function() {

        });

        //GetRupValue
        describe('$("#progressbar").rup_progressbar("getRupValue");', function() {

          it("Debería mostrar el valor del rup_progressbar", function() {
            expect($("#progressbar").rup_progressbar("getRupValue")).toBe(50);
          });

        });
        //SetRupValue
        describe('$("#progressbar").rup_progressbar("setRupValue");', function() {

          it("Debería establecer el valor del rup_progressbar en 70", function() {
            $("#progressbar").rup_progressbar("setRupValue", 70)
            expect($("#progressbar").rup_progressbar("getRupValue")).toBe(70);
          });

        });

        //Disable
        describe('$("#progressbar").rup_progressbar("disable");', function() {

          it("Debería deshabilitar el rup_progressbar", function() {
            $("#progressbar").rup_progressbar("disable")
            expect($("#progressbar").attr('aria-disabled')).toBe('true');
          });

        });

        //Enable
        describe('$("#progressbar").rup_progressbar("enable");', function() {

          it("Debería habilitar el rup_progressbar", function() {
            $("#progressbar").rup_progressbar("disable")
            $("#progressbar").rup_progressbar("enable")
            expect($("#progressbar").attr('aria-disabled')).toBe('false');
          });

        });


        //Value
        describe('Test del metodo value.', function() {

          describe('$("#progressbar").rup_progressbar("value");', function() {

            it("Debería mostrar el valor del rup_progressbar", function() {
              expect($("#progressbar").rup_progressbar("value")).toBe(50);

            });
          });

          describe('$("#progressbar").rup_progressbar("value",70);', function() {

            it("Debería asignar el valor elegido(70) al rup_progressbar", function() {
              $("#progressbar").rup_progressbar("value", 70)
              expect($("#progressbar").rup_progressbar("value")).toBe(70);
            });


          });
        });
        //Widget
        describe('$("#progressbar").rup_progressbar("widget");', function() {

          it("Debería devolver el objeto widget del progressbar", function() {
            expect($('#progressbar').rup_progressbar('widget')[0] === $('#progressbar')[0]).toBe(true);
          });

        });


        //Option
        describe("Test del metodo option.", function() {
          describe('$("#progressbar").rup_progressbar("option");', function() {

            it("Debería devolver el objeto de opciones de configuracion del progressbar", function() {
              expect(typeof($('#progressbar').rup_progressbar("option"))).toBe('object');
            });

          });

          describe('$("#progressbar").rup_progressbar("option",{disabled:true});', function() {

            it("Debería asignar el valor true a la propiedad de configuración disabled", function() {
              $('#progressbar').rup_progressbar("option", {
                disabled: true
              })
              expect($("#progressbar").attr('aria-disabled')).toBe('true');
            });

          });

          describe('$("#progressbar").rup_progressbar("option","disabled");', function() {

            it("Debería devolver el valor de la propiedad de configuración disabled)", function() {
              expect($('#progressbar').rup_progressbar("option", "disabled")).toBe(false);
            });

          });

          describe('$("#progressbar").rup_progressbar("option","disabled",true);', function() {

            it("Debería asignar el valor true a la propiedad de configuración disabled)", function() {
              $("#progressbar").rup_progressbar("option", "disabled", true);
              expect($('#progressbar').rup_progressbar("option", "disabled")).toBe(true);
            });

          });

        });

        //Destroy
        describe('$("#progressbar").rup_progressbar("destroy");', function() {

          it("Debería desruir el progressbar", function() {
            $("#progressbar").rup_progressbar("destroy");
            expect($('#progressbar')).not.toHaveClass("rup-progressbar ui-progressbar ui-corner-all ui-widget ui-widget-content");

          });

        });

      });

    });
  });
}));
