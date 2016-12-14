define(['marionette',
        'templates',
        './widget/dashboardService',
        'bootstrap',
        'rup/rup.dashboard','rup/rup.button','rup/rup.message' ], function(Marionette, App, DashboardService){

  var DashboardView = Marionette.LayoutView.extend({
      template: App.Templates.demoResponsive.app.dashboard.dashboardTemplate,
      gridOptions: {
          verticalMargin: 10,

          configure:{
            requiredByUser: false
          },
          buttons:{
            btnConfig:false
          }
      },
      currentDashboard: undefined,
      loadDashboard: fncLoadDashboard,
      loadSelectedDashboard: fncLoadSelectedDashboard,
      addWidget: fncAddWidget,
      newDashboard: fncNewDashboard,
      deleteDashboard: fncDeleteDashboard,
      saveDashboard: fncSaveDashboard,
      collapseAside: fncCollapseAside,
      newWidgetHtmlInline: fncNewWidgetHtmlInline,
      newWidgetTemplateInline: fncNewWidgetTemplateInline,
      newWidgetTemplateXhr: fncNewWidgetTemplateXhr,
      ui:{
        dashboard: "#dashboard",
        templateInline: "#templateInline",
        dashboardList: "#dashboardList",
        dashboardListUl: "#dashboardList ul",
        menuDashboardLink: "#dashboardList ul li a",
        currentDashboardName: "#currentDashboard",
        addWidget: "#addWidget",
        newDashboard: "#newDashboard",
        deleteDashboard: "#deleteDashboard",
        saveDashboard: "#saveDashboard",
        dashboardMenu: ".dashboard-aside",
        currentDashboardLink: "#currentDashboardLink",
        collapsibleAsideMenu: ".dashboard-aside [data-toggle='collapse']",
        fabButton: "#fabButton",
        newDashboardDialog: "#newDashboardDialog",
        addWidgetDialog: "#addWidgetDialog",
        newWidgetHtmlInline: "#newWidgetHtmlInline",
        newWidgetTemplateInline: "#newWidgetTemplateInline",
        newWidgetTemplateXhr: "#newWidgetTemplateXhr"


      },
      events:{
        "click @ui.menuDashboardLink": "loadSelectedDashboard",
        "click @ui.addWidget": "addWidget",
        "click @ui.newDashboard": "newDashboard",
        "click @ui.deleteDashboard": "deleteDashboard",
        "click @ui.saveDashboard": "saveDashboard",
        "click @ui.currentDashboardLink": "collapseAside",
        "click @ui.newWidgetHtmlInline": "newWidgetHtmlInline",
        "click @ui.newWidgetTemplateInline": "newWidgetTemplateInline",
        "click @ui.newWidgetTemplateXhr": "newWidgetTemplateXhr"
      },
      onAttach  : fncOnRender,
      onDomRefresh: fncOnDomRefresh
  });

  function fncOnRender(){
    var $view = this;


  }

  function fncOnDomRefresh(){
    var $view = this;

    // List dashboards
    DashboardService.getAll().then(function(data){

      $.each(data, function(i, dashboard){
          $view.ui.dashboardListUl.append("<li ><a data-dashboard-id='"+dashboard.getId()+"'>"+dashboard.getName()+"</a></li>");
      })

    });

    $view.ui.addWidgetDialog.rup_dialog({
      type: $.rup.dialog.DIV,
  		autoOpen: false,
  		modal: true,
      appendTo:".dashboard-container",
      width:"70%",
      buttons: [{
				text: "Abandonar",
				click: function (event) {
					$view.ui.addWidgetDialog.rup_dialog("close");
          event.preventDefault();
				},
				btnType: $.rup.dialog.LINK
			}
		]
  });


    $view.ui.newDashboardDialog.rup_dialog({
      type: $.rup.dialog.DIV,
  		autoOpen: false,
  		modal: true,
      appendTo:".dashboard-container",
      width:"70%",
      buttons: [{
				text: "Aceptar",
				click: function () {
					debugger;

				}
			},
			{
				text: "Abandonar",
				click: function (event) {
					$view.ui.newDashboardDialog.rup_dialog("close");
          event.preventDefault();
				},
				btnType: $.rup.dialog.LINK
			}
		]
    })



    $view.ui.fabButton.rup_button();

    $view.ui.dashboard.rup_dashboard(this.gridOptions);

    $view.loadDashboard("1");



    //
    // $view.ui.dashboard.rup_dashboard("addWidget",{
    //   type:"template",
    //   widgetOptions:{
    //     buttons:{
    //       btnConfig:false
    //     },
    //     template: "#templateInline"
    //   }
    // });
    //
    //
    // $view.ui.dashboard.rup_dashboard("addWidget",{
    //   type:"template",
    //   widgetOptions:{
    //     configure:{
    //       requiredByUser:false,
    //       template:"#templateConfig"
    //     },
    //     template: "<p>"+
    //       "Template Inline String"+
    //     "</p>"
    //
    //
    //   }
    // });
    //
    // $view.ui.dashboard.rup_dashboard("addWidget",{
    //   type:"xhr",
    //   widgetOptions:{
    //     url: "/demoResponsive/app/dashboard/html/widgetDiv.html",
    //     configure:{
    //       template:"#templateConfig"
    //     }
    //
    //   }
    // });
    //
    // $view.ui.dashboard.rup_dashboard("addWidget",{
    //   type:"template",
    //   widgetOptions:{
    //     template: App.Templates.demoResponsive.app.dashboard.templates.widgetInline,
    //     configure:{
    //       template:"#templateConfig"
    //     }
    //   }
    // });

  }

  function fncLoadDashboard(dashboardId){
    var $view = this;
    return DashboardService.get(dashboardId).then(function(dashboard){
      $view.currentDashboard = dashboard;
      $view.ui.currentDashboardName.text(dashboard.getName());
      $view.ui.dashboard.rup_dashboard("removeAll");
      $view.ui.dashboard.rup_dashboard("loadFromArray", JSON.parse(dashboard.getSerializedArray()));
    });
  }

  function fncLoadSelectedDashboard(event){
    var $view = this,  dashboardId = event.currentTarget.getAttribute('data-dashboard-id');


    $view.loadDashboard(dashboardId);
  }


  function fncAddWidget(){
    var $view = this;
    $view.ui.addWidgetDialog.rup_dialog("open");
  }

  function fncNewWidgetHtmlInline(){
    var $view = this;

    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      minWidth: 4,
      minHeight: 4,
      widgetOptions:{
        configure:{
          requiredByUser:false,
          template:"#templateConfig"
        },
        template: "<p>"+
          "Este ssses un ejemplo de un widget HTML."+
        "</p>"+
        "<p>"+
          "El contenido se especifica directamente en la propiedad template de la definición del widget. "+
        "</p>"
      }
    });
  }

  function fncNewWidgetTemplateInline(){
    var $view = this;
    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      minWidth: 4,
      minHeight: 4,
      widgetOptions:{
        buttons:{
          btnConfig:false
        },
        template: "#templateInline"
      }
    });
  }

  function fncNewWidgetTemplateXhr(){
    var $view = this;
    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"xhr",
      minWidth: 4,
      minHeight: 4,
      widgetOptions:{
        url: "/demoResponsive/app/dashboard/html/widgetDiv.html",
        configure:{
          template:"#templateConfig"
        }

      }
    });
  }

  function fncNewDashboard(){
    var $view = this;
    $view.ui.newDashboardDialog.rup_dialog("open");
  }

  function fncConfirmDelete (){
    DashboardService.delete($view.currentDashboard);
  }

  function fncConfirmNewDashboard (name){

    var newDashboard = new Dashboard({
      name
    });

    DashboardService.ass($view.currentDashboard);
  }

  function fncDeleteDashboard(){
    var $view = this;

    $.rup_messages("msgConfirm", {
      message: "¿Está seguro que desea eliminar el escritorio actual?",
      title: "Confirmación de borrado",
      OKFunction : fncConfirmDelete
    });
  }

  function fncSaveDashboard(){
    var $view = this;
    var serializedDashboardJson = $view.ui.dashboard.rup_dashboard("serializeAsArray");
    var serializedDashboard = $view.ui.dashboard.rup_dashboard("serialize");
    $view.currentDashboard.setSerializedArray(serializedDashboard);
    $view.currentDashboard.setDataJson(serializedDashboardJson);

    DashboardService.save($view.currentDashboard);
  }

  function fncCollapseAside(){
    var $view = this;

    if ($view.ui.dashboardMenu.hasClass("collapsed")){
      $view.ui.dashboardMenu.removeClass("collapsed");
    }else{
      $.each($(".dashboard-aside [data-toggle='collapse']").map(function(i,elem){ return $($(elem).attr("href"));}), function(i, elem){
        $(elem).collapse("hide");
      });
      $view.ui.dashboardMenu.addClass("collapsed");

    }
  }

  return DashboardView;
});



// define(['marionette',
//         'templates',
//         './dashboardBodyView',
//         './dashboardTestView',
//         '../shared/component/componentExampleCodeView',
//         'rup/rup.message','rup/rup.tabs'], function(Marionette, App, DashboardBodyView, DashboardTestView, ComponentExampleCodeView){
//
//   var DashboardView = Marionette.LayoutView.extend({
//       template: App.Templates.demoResponsive.app.shared.component.componentLayoutTemplate,
//       regions:{
//         Main: "#componentMainBody",
//         Example: "#exampleCode",
//         Test: "#componentTest"
//       },
//       onRender: fncOnRender
//   });
//
//   function fncOnRender(){
//     var $view = this;
//
//     $view.Main.show(new DashboardBodyView());
//     $view.Example.show(new ComponentExampleCodeView({
//       templateHtml: App.Templates.demoResponsive.app.dashboard.dashboardHtmlCodeTemplate,
//       templateJs: App.Templates.demoResponsive.app.dashboard.dashboardJsCodeTemplate
//     }));
//     $view.Test.show(new DashboardTestView());
//   }
//
//   return DashboardView;
// });
