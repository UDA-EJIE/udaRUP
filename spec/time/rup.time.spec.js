(function(factory) {
  if (typeof define === "function" && define.amd) {

    // AMD. Register as an anonymous module.
    define(['jquery', 'handlebars', 'jasmine-jquery', 'rup/rup.time'], factory);
  } else {

    // Browser globals
    factory(jQuery);
  }
}(function($, Handlebars) {

  describe("RUP Time Tests", function() {

    describe("Creación de un Time  ", function() {

      var source, template, $content, $time;

      beforeEach(function() {
        //html
        source = '<input id="hora" />';


        $("body").append("<div id=\"content\"></div>")

        template = Handlebars.compile(source);
        $content = $("#content");


        $content.html(template());
        $time = $("#hora");
        //js

        $time.rup_time({
          labelMaskId: "hora-mask",
          showSecond: true,
          timeFormat: 'hh:mm:ss',
          showButtonPanel: true
        });
      });

      afterEach(function() {

        $('body').html('');
      });

      describe("Test de la API", function() {

  

        //Show
        describe('$("#hora").rup_time("show");', function() {


          it("Debería mostrar el rup_time", function() {
            $("#hora").rup_time("show");
            expect($('#ui-datepicker-div').css("display")).toBe("block");
          });

        });

        //Hide
        describe('$("#hora").rup_time("hide");', function() {

          it("Debería ocultar el rup_time", function() {
            $("#hora").rup_time("show");
            $("#hora").rup_time("hide");
            expect($('#ui-datepicker-div').css("display")).toBe('none');
          });

        });

        //Disable
        describe('$("#hora").rup_time("disable");', function() {

          it("Debería deshabilitar el rup_time", function() {
            $("#hora").rup_time("disable");
            expect($('#hora').attr("disabled")).toBe("disabled");
          });

        });

        //Enable
        describe('$("#hora").rup_time("enable");', function() {

          it("Debería habilitar el rup_time", function() {
            $("#hora").rup_time("enable");
            expect($('#hora').attr("disabled")).not.toBe("disabled");
          });

        });

        //GetRupValue
        describe('$("#hora").rup_time("getRupValue");', function() {

          it("Debería recoger el contenido del rup_time", function() {
            $("#hora").rup_time("show");
            expect($("#hora").rup_time("getRupValue")).toBe("00:00:00");
          });

        });

        //SetRupValue
        describe('$(#hora").rup_time("setRupValue",param);', function() {

          it("Debería establecer el valor del rup_time en 11:11:11", function() {
            $('#hora').rup_time("setRupValue", "11:11:11")
            expect($("#hora").rup_time("getRupValue")).toBe("11:11:11");
          });

        });

        //isDisabled
        describe('$(#hora").rup_time("isDisabled");', function() {

          it("Debería devolver 'true' si el rup_time esta deshabilitado", function() {
            $('#hora').rup_time("disable")
            expect($("#hora").rup_time("isDisabled")).toBe(true);
          });

        });



        //Destroy
        describe('$(#hora").rup_time("destroy");', function() {

          it("Debería destruir el rup_time", function() {
            $('#hora').rup_time("destroy")
            expect($("#hora")).not.toHaveClass("hasDatepicker");
          });

        });

        //getTime
        describe('$("#hora").rup_time("getTime");', function() {

          it("Debería recoger el contenido del rup_time", function() {
            $("#hora").rup_time("show");
            expect($("#hora").rup_time("getTime")).toBe("00:00:00");
          });

        });

        //setTime
        describe('$(#hora").rup_time("setTime");', function() {

          it("Debería establecer el valor del rup_time en la hora seleccionada(11:11:11)", function() {
            var d = new Date("October 13, 2017 11:11:11");
            $('#hora').rup_time("setTime", d)
            expect($("#hora").rup_time("getTime")).toBe("11:11:11");
          });

        });

        //option(optionName,[value])
        describe('$(#hora").rup_time("option",optionName,[value]);', function() {

          it("Debería modificar la opcion con el valor elegido", function() {
            $('#hora').rup_time("option", "disabled", true)
            expect($('#hora').attr("disabled")).toBe("disabled");
          });

        });

      });
    });
  });
}));
