
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.ToolbarBootstrapAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function ToolbarBootstrapAdapter(){

  }
  
  ToolbarBootstrapAdapter.prototype.NAME = "toolbar_bootstrap";

  ToolbarBootstrapAdapter.prototype.addButton = function (obj, json_i18n) {
    var buttonId, rightObjects;

    // Se obtiene el identificador del boton. En caso de no haberse indicado un valor en la propiedad id, se toma el valor de la propiedad i18nCaption.
    if (obj.id){
      buttonId = obj.id;
    }else{
      buttonId = obj.i18nCaption;
    }

    // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
    if (buttonId.indexOf($(this).attr("id"))!==0){
      buttonId = $(this).attr("id")+"##"+buttonId;
    }

    // var boton = $("<button type='button'/>").text($.rup.i18nParse(json_i18n,obj.i18nCaption)).addClass("rup-toolbar_button").attr({
    //   "id":buttonId
    // });

    var boton = $(Rup.Templates.rup.toolbar.button.bootstrap({
      id: buttonId,
      css: obj.css,
      label: obj.text?obj.text:$.rup.i18nParse(json_i18n,obj.i18nCaption)
    }));
    boton.rup_button(obj);
    // boton.button("option", "icons", {primary:obj.css, secondary:null} );

    // if(obj.right !== undefined && obj.right === true){
    //   boton.addClass("rup-button-right");
    // }


    // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
    if(obj.right !== undefined && obj.right === true){
      //Añadir botón a la derecha
      var $div_rightObjects = this.children("div:not(.rup-dropdown-btn-group):not(.rup-mbutton )");
      if ($div_rightObjects.length===0){
        $div_rightObjects = $("<div />").attr("id",this.attr("id")+"-rightButtons").css("float", "right");
        this.append($div_rightObjects);
      }
//				if (boton.parent().is(".rup-dropdown-btn-group")){
//					boton.parent().prependTo($div_rightObjects);
//				}else{
        boton.prependTo($div_rightObjects);
//				}
    } else {
      if (boton.parent().is(".rup-dropdown-btn-group")){
        $(this).append(boton.parent());
      }else{
        $(this).append(boton);
      }
    }

    //Añadir evento keydown
    this._setKeyDown(boton);

    if (obj.click) { //Añadir eventos
      boton.click({i18nCaption: obj.i18nCaption}, obj.click);
    }

    // Al perder el foco se elimina el estilo de disponer del foco
    boton.bind("focusout",function(){
      $(this).removeClass("ui-state-focus");
    });

    return boton;
  };


  ToolbarBootstrapAdapter.prototype.addMButton = function (obj, json_i18n){ //añade a la toolbar un 'mbutton' (sin botones)
    var botonGrp, boton = '', buttonId;
    if (obj.id === undefined) {
      alert("El atributo ID es obligatorio en los MButtons.");
      boton = null;
    } else {
      buttonId = obj.id;
      // Se comprueba si el id del boton contiene el identificador de la botonera. En caso de no existir se añade al principio.
      if (buttonId.indexOf($(this).attr("id"))!==0){
        buttonId = $(this).attr("id")+"##"+obj.id;
      }

      botonGrp = $(Rup.Templates.rup.toolbar.mbutton.bootstrap({

        id: buttonId,
        css: obj.css,
        groupClasses: obj.groupClasses,
        label: obj.text?obj.text:$.rup.i18nParse(json_i18n,obj.i18nCaption)
      }));

      boton = botonGrp.find("[id='"+buttonId+"']");
      //Si no se define un estilo especial se aplica por defecto
      if (obj.css === undefined){
        obj.css = "rup-toolbar_menuButtonIcon";
      }
      boton.rup_button();
    }

    // if(obj.right !== undefined && obj.right === true){
    //   botonGrp.addClass("rup-button-right");
    // }

    // Si fuera necesario, se añade el estilo para la ubicación derecha y se gestiona su indexado
    if(obj.right !== undefined && obj.right === true){
      //Añadir botón a la derecha
      var $div_rightObjects = this.children("div:not(.rup-dropdown-btn-group):not(.rup-mbutton )");
      if ($div_rightObjects.length===0){
        $div_rightObjects = $("<div />").attr("id",this.attr("id")+"-rightButtons").css("float", "right");
        this.append($div_rightObjects);
      }
      botonGrp.prependTo($div_rightObjects);
    } else {
      $(this).append(botonGrp);
    }

    //Añadir evento keydown
    this._setKeyDown(boton);

    if (obj.click) { //Añadir eventos
      boton.click({i18nCaption: obj.i18nCaption}, obj.click);
    }
    return botonGrp;
  };


  ToolbarBootstrapAdapter.prototype.addButtonsToMButton = function (buttons, menuButton, json_i18n) { //añade botones al 'mbutton'
    var div, ul,
      //numero de botones a añadir
      length = buttons.length, boton, buttonId;
    //
    // if ($("[id='mbutton_"+menuButton.attr("id")+"']").length === 0){
    //   //Contenedor del menuButton
    //   div = $('<div>')
    //       .addClass("ui-widget ui-widget-content rup-toolbar_menuButtonContainer")
    //       .attr("id","mbutton_"+menuButton[0].id)
    //       .css("display","none");
    //   //Lista no numerada del menuButton
    //   ul = $('<ul>')
    //       .attr("role","menu")
    //       .attr("aria-activedescendant","active-menuitem")
    //       .attr("aria-labelledby","active-menuitem");
    // } else {
    //   div = $("[id='mbutton_"+menuButton.attr("id")+"']");
    //   ul = div.children("ul");
    // }
    //
    // menuButton.attr("href","#");

    //Se añaden cada uno de los botones del menuButton
    ul = menuButton.find("ul");
    for (var i = length; i--; ) {

      boton = buttons[i];
      if (boton.id){
        buttonId = menuButton.attr("id")+"##"+boton.id;
      }else{
        buttonId = menuButton.attr("id")+"##"+boton.i18nCaption;
      }
      buttons[i].id=buttonId;

      ul.prepend($("<li>").append(this.addButton(buttons[i],json_i18n)));
    }

    //Añadir elementos al DOM
    // if(!$.rup_utils.aplicatioInPortal()){
    //   div.appendTo("body");
    //   div.append(ul);
    // } else {
    //   div.append(ul);
    //   $(".r01gContainer").append(div);
    // }

    //Borrar referencias
    delete ul;
    delete div;
  };

  $.rup = $.rup || {};
  $.rup.adapter = $.rup.adapter || {};
  
  $.rup.adapter[ToolbarBootstrapAdapter.prototype.NAME ] = new ToolbarBootstrapAdapter;
  
  return $;
}));
