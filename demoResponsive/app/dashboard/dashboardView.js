define(['marionette',
        'templates',
        'rup/rup.dashboard'], function(Marionette, App){

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
      ui:{
        dashboard: "#dashboard",
        templateInline: "#templateInline"


      },
      onDomRefresh: fncOnRender
  });

  function fncOnRender(){
    var $view = this;

    $view.ui.dashboard.rup_dashboard(this.gridOptions);

    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      widgetOptions:{
        template: "#templateInline",
        configure:{
          template:"#templateConfig"
        }
      }


    });

    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      widgetOptions:{
        buttons:{
          btnConfig:false
        },
        template: "#templateInline"
      }
    });


    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      widgetOptions:{
        configure:{
          requiredByUser:false,
          template:"#templateConfig"
        },
        template: "<p>"+
          "Template Inline String"+
        "</p>"


      }
    });

    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"xhr",
      widgetOptions:{
        url: "/demoResponsive/app/dashboard/html/widgetDiv.html",
        configure:{
          template:"#templateConfig"
        }

      }
    });

    $view.ui.dashboard.rup_dashboard("addWidget",{
      type:"template",
      widgetOptions:{
        template: App.Templates.demoResponsive.app.dashboard.templates.widgetInline,
        configure:{
          template:"#templateConfig"
        }
      }
    });
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
