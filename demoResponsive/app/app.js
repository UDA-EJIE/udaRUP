
define(["marionette",
        "shared/main/mainView","bootstrap",
        "pages/index/indexView",
        "components/feedback/feedbackView",
        "components/message/messageView",
        "components/button/buttonView",
        "components/toolbar/toolbarView",
        "components/tabs/tabsStaticView",
        "table/tableFilterView",
        "responsiveGrid/stackedHorizontal/stackedHorizontalView",
        "responsiveGrid/mobileDesktop/mobileDesktopView",
        "responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView"

      ], function(Marionette, MainView, Bootstrap, IndexView, FeedbackView, MessageView, ButtonView, ToolbarView, TabsStaticView,
              TableFilterView, StackedHorizontalView, MobileDesktopView, MobileTabletDesktopView){

    var RupResponsiveDemoApp = new Marionette.Application();

    var MyRouter = Marionette.AppRouter.extend({
      appRoutes: {
        '' : 'index',
        'feedback' : 'feedback',
        'message' : 'message',
        'button' : 'button',
        'toolbar' : 'toolbar',
        'tabsStatic' : 'tabsStatic',
        'tableFilter' : 'tableFilter',
        'stackedHorizontal': 'stackedHorizontal',
        'mobileDesktop': 'mobileDesktop',
        'mobileTabletDesktop': 'mobileTabletDesktop'
      }
    });

    var RouteController = Marionette.Controller.extend({
        index: function() {
          RupResponsiveDemoApp.mainView.Container.show(new IndexView());
        },
        feedback: function() {
          RupResponsiveDemoApp.mainView.Container.show(new FeedbackView());
        },
        button: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ButtonView());
        },
        toolbar: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ToolbarView());
        },
        message: function(){
          RupResponsiveDemoApp.mainView.Container.show(new MessageView());
        },
        tabsStatic: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TabsStaticView());
        },
        tableFilter: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TableFilterView());
        },
        stackedHorizontal: function(){
          RupResponsiveDemoApp.mainView.Container.show(new StackedHorizontalView());
        },
        mobileDesktop: function(){
          RupResponsiveDemoApp.mainView.Container.show(new MobileDesktopView());
        },
        mobileTabletDesktop: function(){
          RupResponsiveDemoApp.mainView.Container.show(new MobileTabletDesktopView());
        }
    });




    RupResponsiveDemoApp.on("start", function(){
        RupResponsiveDemoApp.Controller = new RouteController();

        RupResponsiveDemoApp.router = new MyRouter({
            controller: RupResponsiveDemoApp.Controller
        });
        Backbone.history.start();
    });


    RupResponsiveDemoApp.mainView = new MainView();
    RupResponsiveDemoApp.mainView.render();



    return  RupResponsiveDemoApp;

});
