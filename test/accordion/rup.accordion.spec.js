define(['jquery','handlebars','app','rup/accordion'], function($,Handlebars) {

  var customMatchers = {
    toBeExpanded: function(util, customEqualityTesters) {
      return {
        compare: function(actual, expected) {
          var result = {
            pass: true
          };
          debugger;
          result.pass = result.pass && actual.hasClass("ui-accordion-header");
          result.pass = result.pass && actual.hasClass("ui-state-active");
          result.pass = result.pass && (actual.attr("aria-expanded") === "true");
          // result.pass = result.pass && actual.next(".section").is(":visible");

          return result;
        }
      };
    }
  };


  describe("RUP Accordion Tests", function(){


      beforeEach(function() {
        jasmine.addMatchers(customMatchers);
      });



      describe("Creación de un accordion", function(){

        var source, template, $content, $accordion;

          beforeAll(function(){
            var source = '<div id="accordionExample" class="rup_accordion">'+
              '<h1><a>Primera sección</a></h1>'+
              '<div class="section">'+
                '{{contenidoPrimeraSeccion}}'+
              '</div>'+
              '<h1><a>Segunda sección</a></h1>'+
              '<div class="section2">'+
                '{{contenidoSegundaSeccion}}'+
              '</div>'+
              '<h1><a>Tercera sección</a></h1>'+
              '<div class="section">'+
              '  {{contenidoTerceraSeccion}}'+
              '</div>'+
            '</div>';

            $("body").append("<div id=\"content\"></div>")

            template = Handlebars.compile(source);
            $content = $("#content");


            var templateJson={
              contenidoPrimeraSeccion:"<span>Contenido de la primera sección</span>",
              contenidoSegundaSeccion:"<span>Contenido de la segunda sección</span>",
              contenidoTerceraSeccion:"<span>Contenido de la tercera sección</span>"
            };

            $content.html(template(templateJson));

            $accordion = $("#accordionExample");

            $accordion.rup_accordion({
          		animated: "bounceslide",
          		active: false,
          		autoHeight: false,
          		collapsible: true
          	});
          });

          afterAll(function () {
              $content.html('');
          });

          it("debería disponer de los estilos de jQueryUI y RUP (ui-accordion ui-widget ui-helper-reset ui-accordion-icons rup_accordion_create)" , function(){
              expect($accordion).toHaveClass("ui-accordion ui-widget ui-helper-reset ui-accordion-icons rup_accordion_create");
          });

          it("debería asignar los estilos correspondientes a las secciones h1 (ui-accordion-header)", function(){
              var $secciones = $accordion.find("h1");
              expect($secciones).toHaveClass("ui-accordion-header");
          });

          it("debería inicializarse con las secciones h1 colapsadas", function(){
              var $secciones = $accordion.find("h1");
              expect($secciones).not.toBeExpanded();
          });

          beforeEach(function(){

          });

          describe("Expandir y contraer las secciones haciendo click", function(){
            describe("Pulsar en la primera sección", function(){
                it("deberia desplegar la primera sección y ocultar el resto", function(){
                  $accordion.find("h1:eq(0)").trigger("click");
                  expect($accordion.find("h1:eq(0)")).toBeExpanded();
                  expect($accordion.find("h1:not(:eq(0))")).not.toBeExpanded();
                });
            });
            describe("Pulsar en la segunda sección", function(){
                it("deberia desplegar la segunda sección y ocultar el resto", function(){
                  debugger;
                  $accordion.find("h1:eq(1)").trigger("click");
                  expect($accordion.find("h1:eq(1)")).toBeExpanded();
                  expect($accordion.find("h1:not(:eq(1))")).not.toBeExpanded();
                });
            });
            describe("Pulsar en la tercera sección", function(){
                it("deberia desplegar la tercera sección y ocultar el resto", function(){
                  $accordion.find("h1:eq(2)").trigger("click");
                  expect($accordion.find("h1:eq(2)")).toBeExpanded();
                  expect($accordion.find("h1:not(:eq(2))")).not.toBeExpanded();
                });
            });
          });

          describe("Test de la API", function(){

            beforeEach(function(){

            });

            describe("$('#accordion').rup_accordion('activate',index);", function(){
              describe("Ejecutar activate para el index (0) de la primera sección", function(){
                  it("deberia desplegar la primera sección y ocultar el resto", function(){
                    $accordion.rup_accordion("activate",0);
                    expect($accordion.find("h1:eq(0)")).toBeExpanded();
                    expect($accordion.find("h1:not(:eq(0))")).not.toBeExpanded();
                  });
              });
              describe("Ejecutar activate para el index (1) de la segunda sección", function(){
                  it("deberia desplegar la segunda sección y ocultar el resto", function(){
                    $accordion.rup_accordion("activate",1);
                    expect($accordion.find("h1:eq(1)")).toBeExpanded();
                    expect($accordion.find("h1:not(:eq(1))")).not.toBeExpanded();
                  });
              });
              describe("Ejecutar activate para el index (2) de la tercera sección", function(){
                  it("deberia desplegar la tercera sección y ocultar el resto", function(){
                    $accordion.rup_accordion("activate",2);
                    expect($accordion.find("h1:eq(2)")).toBeExpanded();
                    expect($accordion.find("h1:not(:eq(2))")).not.toBeExpanded();
                  });
              });
            });

            describe("$('#accordion').rup_accordion('disable');", function(){
                beforeAll(function(){
                  $accordion.rup_accordion("enable");
                  $accordion.rup_accordion("disable");
                });

                it("deberia asignar el class ui-accordion-disabled al accordion", function(){
                  expect($accordion).toHaveClass("ui-accordion-disabled");
                });
                it("deberia asignar el class ui-state-disabled a todas las secciones", function(){
                  expect($accordion.find("h1")).toHaveClass("ui-state-disabled");
                });
            });

            describe("$('#accordion').rup_accordion('enable');", function(){
                beforeAll(function(){
                  $accordion.rup_accordion("disable");
                  $accordion.rup_accordion("enable");
                });

                it("deberia eliminar el class ui-accordion-disabled del accordion", function(){
                  expect($accordion).not.toHaveClass("ui-accordion-disabled");
                });
                it("deberia eliminar el class ui-state-disabled de todas las secciones", function(){
                  expect($accordion.find("h1")).not.toHaveClass("ui-state-disabled");
                });
            });

            describe("$('#accordion').rup_accordion('refresh'); -> Se añade al DOM una nueva sección", function(){
                beforeAll(function(){
                  $accordion.append("<h1><a>Cuarta sección</a></h1><div class='section2'>Cuarta sección</div>")
                  $accordion.rup_accordion("refresh");
                });

                it("debería asignar los estilos correspondientes a las última sección añadida h1 (ui-accordion-header)", function(){
                    expect($accordion.find("h1:last")).toHaveClass("ui-accordion-header");
                });
                it("debería inicializarse colapsada", function(){
                    expect($accordion.find("h1:last")).not.toBeExpanded();
                });
                describe("Pulsar en la nueva sección", function(){
                    it("deberia desplegar la nueva sección y ocultar el resto", function(){
                      $accordion.find("h1:last").trigger("click");
                      expect($accordion.find("h1:last")).toBeExpanded();
                      expect($accordion.find("h1:not(:eq(0))")).not.toBeExpanded();
                    });
                });
            });

            describe("$('#accordion').rup_accordion('widget');", function(){
                it("deberia devolver el objecto widget del accordion", function(){
                  expect($accordion.rup_accordion("widget")[0] === $accordion[0]).toBe(true);
                });
            });

            describe("Test del método option", function(){
              describe("$('#accordion').rup_accordion('option');", function(){
                  it("deberia devolver el objeto de opciones de configuracion del accordion", function(){
                    expect(typeof $accordion.rup_accordion("option")).toBe("object");
                  });
              });
              describe("$('#accordion').rup_accordion('option', 'disabled');", function(){
                  it("deberia devolver el valor de la propiedad de configuración (p.e. disabled)", function(){
                    $accordion.rup_accordion("option", 'disabled', false);
                    expect($accordion.rup_accordion("option", 'disabled')).toBe(false);
                  });
              });
              describe("$('#accordion').rup_accordion('option', 'disabled', true);", function(){
                  it("deberia asignar el valor true a la propiedad de configuración (p.e. disabled)", function(){
                    $accordion.rup_accordion("option", 'disabled', false);
                    $accordion.rup_accordion("option", 'disabled', true);
                    expect($accordion.rup_accordion("option", 'disabled')).toBe(true);
                  });
              });
            });

            describe("$('#accordion').rup_accordion('destroy');", function(){

                beforeAll(function(){
                  $accordion.rup_accordion("destroy");
                });
                it("debería haberse eliminado los estilos de jQueryUI y RUP (ui-accordion ui-widget ui-helper-reset rup_accordion_create)" , function(){
                    expect($accordion).not.toHaveClass("ui-accordion ui-widget ui-helper-reset rup_accordion_create");
                });
                it("debería asignar los estilos correspondientes a las secciones h1 (ui-accordion-header)", function(){
                    var $secciones = $accordion.find("h1");
                    expect($secciones).not.toHaveClass("ui-accordion-header");
                });
                it("deberia de eliminarse los objetos almacenados mediante data() (settings y uiAutocomplete)", function(){

                  expect($accordion.data("settings")).toBe(undefined);
                  expect($accordion.data("uiAutocomplete")).toBe(undefined);
                });
            });

          });

      });
  });
});
