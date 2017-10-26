( function(root,factory ) {
 if ( typeof define === "function" && define.amd ) {

   // AMD. Register as an anonymous module.
   define( ["jquery",'rup.dashboard'], factory );
 } else {

   // Browser globals
   root.returnExports = factory( jQuery );
 }
} (this,  function( $ ) {

  var dashboardList = [];

  // Methods

  function addDashboard(dashboard){
    dashboardList.push(dashboard);
  }

  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      addDashboard: addDashboard
  }
}));
