define(['marionette',
        'templates',
        'datatables.net-bs'], function(Marionette, App){

  var DatatableView = Marionette.LayoutView.extend({
    template: App.Templates.demo.app.datatable.datatableTemplate,
    initialize: fncInitilize,
    onDomRefresh: fncOnDomRefresh

  });

  function fncInitilize(){


  }

  function fncOnDomRefresh(){
    var $view = this;


    $('#example').DataTable();

  }

  return DatatableView;

});
