
define(["marionette",
        "shared/main/mainView","bootstrap",
        "pages/index/indexView",
        "components/feedback/feedbackView",
        "components/message/messageView",
        "components/tabs/tabsStaticView",
        "table/tableFilterView",
      ], function(Marionette, MainView, Bootstrap, IndexView, FeedbackView, MessageView, TabsStaticView,
              TableFilterView){

    var RupResponsiveDemoApp = new Marionette.Application();

    var MyRouter = Marionette.AppRouter.extend({
      // "someMethod" must exist at controller.someMethod

      appRoutes: {
        '' : 'index',
        'feedback' : 'feedback',
        'message' : 'message',
        'tabsStatic' : 'tabsStatic',
        'tableFilter' : 'tableFilter'



      }

    });

    var RouteController = Marionette.Controller.extend({
        index: function() {
          RupResponsiveDemoApp.mainView.Container.show(new IndexView());
        },
        feedback: function() {
          RupResponsiveDemoApp.mainView.Container.show(new FeedbackView());
        },
        message: function(){
          RupResponsiveDemoApp.mainView.Container.show(new MessageView());
        },
        tabsStatic: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TabsStaticView());
        },
        tableFilter: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TableFilterView());
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
