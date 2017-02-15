
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.DateJQueryUIAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function DateJQueryUIAdapter(){

  }

  DateJQueryUIAdapter.prototype.initIconTrigger = function (settings) {
    //Imagen del calendario
    settings.buttonImage = $.rup.STATICS + (settings.buttonImage ? settings.buttonImage : "/rup/basic-theme/images/calendario.png");

    //Atributos NO MODIFICABLES
    //La imagen no debe ser un botón
    settings.buttonImageOnly = true;
    //Solo permitir caracteres permitidos en la máscara
    settings.constrainInput = true;
    //Mostrar patrón con foco en input y pinchando imagen
    settings.showOn = "both";
  };

  DateJQueryUIAdapter.prototype.postConfigure = function (settings) {

  };



  return DateJQueryUIAdapter;
}));
