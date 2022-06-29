( function(root,factory ) {
 if ( typeof define === "function" && define.amd ) {

   // AMD. Register as an anonymous module.
   define( ["jquery","./dashboardModel",'rup.dashboard'], factory );
 } else {

   // Browser globals
   root.returnExports = factory( jQuery );
 }
} (this,  function( $, Dashboard ) {

  var dashboardList = [];

  // Methods

  function getAll(){
    return $.when(
      $.ajax({
        url: '/dashboard/getAll'
      }).pipe(function(data){
        $.each(data, function(i, elem){
            dashboardList.push(new Dashboard(elem));
        })

        return dashboardList;
      })
    );

  }
  function get(dashboardId){
    return $.when(
      $.ajax({
        url: '/dashboard/get/'+dashboardId
      }).pipe(function(data){
        return new Dashboard(data);
      })
    );

  }

  function add(dashboard){
    return $.when(
      $.ajax({
        url:'/dashboard/post',
        method:'post',
        dataType:'json',
        contentType: "application/json",
        data: JSON.stringify({
          id: dashboard.getId(),
          serializedArray: dashboard.getDataJson(),
          nombre:dashboard.getName(),
          default:dashboard.getDefault()
        })

      }).pipe(function(data){
        console.log(data);
      })
    );
  }

  function save(dashboard){
    return $.when(
      $.ajax({
        url:'/dashboard/put',
        method:'put',
        dataType:'json',
        contentType: "application/json",
        data: JSON.stringify({
          id: dashboard.getId(),
          serializedArray: dashboard.getDataJson(),
          nombre:dashboard.getName(),
          default:dashboard.getDefault()
        })

      }).pipe(function(data){
        console.log(data);
      })
    );
  }

  function fncDelete(dashboard){
    return $.when(
      $.ajax({
        url:'/dashboard/delete/'+dashboard.getId(),
        method:'delete'


      }).pipe(function(data){
        console.log("deleted");
      })
    );
  }

  function notHelloOrGoodbye(){}; // A private method
  function hello(){}; // A public method because it's returned (see below)
  function goodbye(){}; // A public method because it's returned (see below)

  // Exposed public methods
  return {
      getAll : getAll,
      get: get,
      save: save,
      delete: fncDelete,
      add: add
  }
}));
