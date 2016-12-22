( function( factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","./rup.base"], factory );
 } else {

    // Browser globals
    factory( jQuery );
 }
} ( function( $ ) {

  function UploadAdapter(adapter){
    this.adapter = adapter;
  }

  UploadAdapter.prototype.downloadTemplate = function(){
    return this.adapter.downloadTemplate;
  }

}));
