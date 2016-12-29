
( function(root, factory ) {
 if ( typeof define === "function" && define.amd ) {

    // AMD. Register as an anonymous module.
    define( ["jquery","../rup.base","../templates"], factory );
 } else {

    // Browser globals
    root.TableJQueryUIAdapter = factory( jQuery );
 }
} (this,  function( $ ) {

  function TableJQueryUIAdapter(){

  }

  TableJQueryUIAdapter.prototype.CONST = {
      core:{
        operations:{
          defaultOperations:{
            add:{
                icon: "ui-icon rup-icon rup-icon-new"
            },
            edit: {
                icon: "ui-icon rup-icon rup-icon-edit"
            },
            clone: {
                icon: "ui-icon rup-icon rup-icon-clone"
            },
            delete: {
                icon: "ui-icon rup-icon rup-icon-delete",
            },
            cancel: {
                icon: "ui-icon rup-icon rup-icon-cancel",
            }
          }
        }
      }
  };

  TableJQueryUIAdapter.prototype.addButton = function (obj, json_i18n) {

  };


  return TableJQueryUIAdapter;
}));
