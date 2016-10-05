( function( factory ) {
 if ( typeof define === "function" && define.amd ) {

   // AMD. Register as an anonymous module.
   define( ['./grid.base'], factory );
 } else {

   // Browser globals
   factory( jQuery );
 }
} ( function( $ ) {
}));
