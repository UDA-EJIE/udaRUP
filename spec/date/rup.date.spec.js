(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(['jquery', 'handlebars', 'jasmine-jquery', 'rup/rup.date', 'rup/rup.time'], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($, Handlebars) {

  describe("RUP Date Tests", function() {

    describe("Creación de un Date  ", function() {

      var source, template, $content, $date;

      beforeEach(function() {
        //html
        source = '<input id="fecha" />';


        $("body").append("<div id=\"content\"></div>")

        template = Handlebars.compile(source);
        $content = $("#content");


        $content.html(template());
        $date = $("#fecha");
        //js

        $date.rup_date({
          labelMaskId: "fecha-mask",
          showButtonPanel: true,
          showOtherMonths: true,
          noWeekend: true
        });
      });

      afterEach(function() {

        $('body').html('');
      });

      describe("Test de la API", function() {


        //Show
        describe('$("#fecha").rup_date("show");', function() {

          it("Debería mostrar el rup_date", function() {

            $("#fecha").rup_date("show");
            expect($('#ui-datepicker-div').css("display")).toBe("block");
          });

        });


        //Hide
        describe('$("#fecha").rup_date("hide");', function() {

          it("Debería ocultar el rup_date", function() {
            $("#fecha").rup_date("show");
            $("#fecha").rup_date("hide");
            expect($('#ui-datepicker-div').css("display")).toBe("none");
          });

        });

        //enable
        describe('$("#fecha").rup_date("enable");', function() {

          it("Debería habilitar el rup_date", function() {
            $("#fecha").rup_date("enable");
              expect($('#fecha').attr("disabled")).not.toBe("disabled");
          });

        });


        //disable
        describe('$("#fecha").rup_date("disable");', function() {

          it("Debería deshabilitar el rup_date", function() {
            $("#fecha").rup_date("disable");
              expect($('#fecha').attr("disabled")).toBe("disabled");
          });

        });


        //destroy
        describe('$("#fecha").rup_date("destroy");', function() {

          it("Debería destruir el rup_date", function() {
            $("#fecha").rup_date("destroy");
              expect($('#fecha')).not.toHaveClass("hasDatepicker");
          });

        });

        //getDate
        describe('$("#fecha").rup_date("getDate");', function() {

          it("Debería recoger el contenido del rup_date", function() {
            $("#fecha").rup_date("show");
            expect($("#fecha").rup_date("getDate")).toBe("");
          });

        });

        //setDate
        describe('$(#fecha").rup_date("setDate");', function() {

          it("Debería establecer el valor del rup_date en la fecha seleccionada(11/11/2011)", function() {
            $('#fecha').rup_date("setDate", "11/11/2011")
            expect($("#fecha").rup_date("getDate")).toBe("11/11/2011");
          });

        });

        //option(optionName,[value])
        describe('$(#hora").rup_date("option",optionName,[value]);', function() {

          it("Debería modificar la opcion con el valor elegido", function() {
            $('#fecha').rup_date("option", "disabled", true)
            expect($('#fecha').attr("disabled")).toBe("disabled");
          });

        });


        //isDisabled
        describe('$(#fecha").rup_date("isDisabled");', function() {

          it("Debería devolver 'true' si el rup_date esta deshabilitado", function() {
            $('#fecha').rup_date("disable")
            expect($("#fecha").rup_date("isDisabled")).toBe(true);
          });

        });

      });
    });
  });
}));
