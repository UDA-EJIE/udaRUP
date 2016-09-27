( function( factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( [
    "./rup_table/rup.table.core",
    "./rup_table/rup.table.contextMenu",
    "./rup_table/rup.table.filter",
    "./rup_table/rup.table.search",
    "./rup_table/rup.table.toolbar",
    "./rup_table/rup.table.feedback",
    "./rup_table/rup.table.fluid",
    "./rup_table/rup.table.formEdit",
    "./rup_table/rup.table.inlineEdit",
    "./rup_table/rup.table.multiselection",
    "./rup_table/rup.table.jerarquia",
    "./rup_table/rup.table.masterDetail",
    "./rup_table/rup.table.report",
    "./rup_table/rup.table.multifilter"
  ], factory );
 } else {

    // Browser globals
    factory( jQuery );
 }
} ( function( $ ) {

  return $;

}));
