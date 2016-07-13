define(['app','rup/feedback'], function($) {
  describe("RUP Feedback Tests", function(){


      describe("Invocación de un RUP Feedback por defecto", function(){

          var $feedback;

          beforeAll(function(){
              jQuery("body").append("<div id='feedback'></div>");

              $feedback = jQuery("#feedback");

              $feedback.rup_feedback({delay:0, fadeSpeed:0});

          });

          afterAll(function () {
              jQuery("#feedback").remove();
          });

          it("debería disponer de los estilos de jQueryUI y RUP", function(){
              expect($feedback).toHaveClass("rup-feedback ui-widget ui-widget-content ui-corner-all");
          });

          it("debería reservar el área de visualización", function(){
              expect($feedback).toHaveCss({"display":"block"});
          });

          describe("Asignación de un mensaje al feedback", function(){

              beforeAll(function(){
                  $feedback.rup_feedback("set","Feedback de ejemplo");
              });

              it("debería de tener controles para cerrar el feedback", function(){
                  var $closeLink = $feedback.find("div#feedback_closeDiv");

                  expect($closeLink).toExist();
                  expect($closeLink).toHaveClass("rup-feedback_closeLink");
                  expect($closeLink).toContainText("cerrar");
              });

              it("debería de tener correctamente asigando el texto", function(){
                  var $contentDiv = $feedback.find("div#feedback_content");

                  expect($contentDiv).toExist();
                  expect($contentDiv).toContainText("Feedback de ejemplo");
              });

              it("debería de cerrarse al pulsar el enlace de cerrar", function(done){
                  var $closeLink = $feedback.find("div#feedback_closeDiv");

                  $closeLink.trigger("click");
                  setTimeout(function() {
                    //expect($feedback).not.toBeVisible();
                    expect($feedback).toHaveCss({visibility: "hidden"});
                    done();
                  },100);
              });
          });

          describe("Ocultar el feedback mediante la función hide", function(){

              beforeEach(function(){
                  $feedback.rup_feedback("show");
              });

              afterEach(function(){
              });

              it("debería de ocultarse el feedback", function(done){

                  expect($feedback).toBeVisible();
                  expect($feedback).not.toHaveCss({visibility: "hidden"});
                  $feedback.rup_feedback("hide");

                  setTimeout(function() {
                    //expect($feedback).not.toBeVisible();
                    expect($feedback).toHaveCss({visibility: "hidden"});
                    done();
                  },500);

              });
          });



      });

      // Tests de la función set
      describe("Creación de diferentes tipos de feedback mediante el método set", function(){

        var $feedback, $textDivId, textDivId, message;

        beforeAll(function(){
            jQuery("body").append("<div id='feedback'></div>");

            $feedback = jQuery("#feedback");
            $feedback.rup_feedback({delay:0, fadeSpeed:0});

            textDivId = $feedback.attr("id")+"_content";
            $textDivId = $feedback.find("[id='"+textDivId+"']");
        });

        afterAll(function () {
            jQuery("#feedback").remove();
        });

        describe("Mostrar feedback de tipo 'ok' con el texto 'Todo ha ido bien'", function(){
          beforeAll(function(){
            message = "Todo ha ido bien";
            $feedback.rup_feedback("set", message, "ok");
            $textDivId = $feedback.find("[id='"+textDivId+"']");
          });
          it("debería de mostrar el texto 'Todo ha ido bien'", function(){
            expect($textDivId).toContainText(message);
          });

          it("debería de tener asigando el class correspondiente al tipo 'ok'", function(){
            expect($feedback).toHaveClass("rup-feedback_image_ok");
          });
        });

        describe("Mostrar feedback de tipo 'alert' con el texto 'Se ha producido un mensaje de aviso'", function(){
          beforeAll(function(){
            message = "Se ha producido un mensaje de aviso";
            $feedback.rup_feedback("set", message, "alert");
            $textDivId = $feedback.find("[id='"+textDivId+"']");
          });
          it("debería de mostrar el texto 'Todo ha ido bien'", function(){
            expect($textDivId).toContainText(message);
          });

          it("debería de tener asigando el class correspondiente al tipo 'alert'", function(){
            expect($feedback).toHaveClass("rup-feedback_image_alert");
          });
        });

        describe("Mostrar feedback de tipo 'error' con el texto 'Se ha producido un error'", function(){
          beforeAll(function(){
            message = "Se ha producido un error";
            $feedback.rup_feedback("set", message, "error");
            $textDivId = $feedback.find("[id='"+textDivId+"']");
          });
          it("debería de mostrar el texto 'Se ha producido un error'", function(){
            expect($textDivId).toContainText(message);
          });

          it("debería de tener asigando el class correspondiente al tipo 'error'", function(){
            expect($feedback).toHaveClass("rup-feedback_image_error");
          });
        });

      });
  });
});
