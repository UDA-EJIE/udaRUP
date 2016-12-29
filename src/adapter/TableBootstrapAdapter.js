
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.TableBootstrapAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function TableBootstrapAdapter(){

  }

  TableBootstrapAdapter.prototype.CONST = {
      core:{
        operations:{
          defaultOperations:{
            add:{
                icon: "fa fa-file-o"
            },
            edit: {
                icon: "fa fa-pencil-square-o"
            },
            clone: {
                icon: "fa fa-clone"
            },
            delete: {
                icon: "fa fa-trash-o",
            },
            cancel: {
                icon: "fa fa-times-circle",
            }
          }
        }
      }
  };

  return TableBootstrapAdapter;
}));
