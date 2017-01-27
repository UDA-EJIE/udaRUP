
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.ValidateJQueryUIAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function ValidateJQueryUIAdapter(){

  }

  ValidateJQueryUIAdapter.prototype.errorElement = "img";

  ValidateJQueryUIAdapter.prototype.errorPlacement = function(error, element) {
    var errorElem = error.attr("src",this.errorImage).addClass("rup-maint_validateIcon").html('').rup_tooltip({"applyToPortal": true});

    if (element.attr("ruptype")==='combo'){
      var comboElem = $("#"+element.attr("id")+"-button");
      if (comboElem){
        errorElem.insertAfter(comboElem);
      }
    }else{
      errorElem.insertAfter(element);
    }
  };

  ValidateJQueryUIAdapter.prototype.showLabel = function(element, message){
    debugger;
    var label = this.errorsFor( element );
    if ( label.length ) {
      // refresh error/success class
      label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

      // check if we have a generated label, replace the message then
      label.attr("generated") && label.html(message);
    } else {
      // create label
      if (settings.showFieldErrorAsDefault){
        label = $("<" + this.settings.errorElement + "/>")
        .attr({"for":  this.idOrName(element), generated: true})
        .addClass(this.settings.errorClass)
        .attr("title",message || "");
      }else{
        label = $("<" + this.settings.errorElement + "/>")
          .attr({"for":  this.idOrName(element), generated: true})
          .addClass(this.settings.errorClass)
          .html(message || "");
      }
      if ( this.settings.wrapper ) {
        // make sure the element is visible, even in IE
        // actually showing the wrapped element is handled elsewhere
        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
      }
      if ( !this.labelContainer.append(label).length )
        this.settings.errorPlacement
          ? this.settings.errorPlacement(label, $(element) )
          : label.insertAfter(element);
    }
    if ( !message && this.settings.success ) {
      label.text("");
      typeof this.settings.success == "string"
        ? label.addClass( this.settings.success )
        : this.settings.success( label );
    }
    this.toShow = this.toShow.add(label);
  };



  return ValidateJQueryUIAdapter;
}));
