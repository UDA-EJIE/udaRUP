define(['marionette',
        'templates',
        'rup.dashboard'], function(Marionette, App){

  var DashboardTestView = Marionette.LayoutView.extend({
      template: App.Templates.demo.app.dashboard.dashboardTestTemplate,
      gridOptions: {
          cell_height: 80,
          vertical_margin: 10
      },
      ui:{
        dashboard: "#dashboard"
      },
      events:{
        // 'click @ui.dropdownElem': fncDropdownElementClick
      },
      onAttach: fncOnAttach
  });

  function fncOnAttach(){
    var $view = this;

    $view.ui.dashboard.rup_dashboard(this.gridOptions);
    $view.ui.dashboard.rup_dashboard("addWidget",{type:"welcome"
});

  }


  return DashboardTestView;
});
