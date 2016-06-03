
define(["marionette",
        "shared/mainView/mainView",
        "components/feedback/feedbackView",
        "components/tooltip/tooltipView",
        "components/message/messageView",
        "components/dialog/dialogView",
        "components/menu/menuHorizontalView",
        "components/menu/menuVerticalView",
        "components/menu/menuMixtoView",
        "components/contextMenu/contextMenuView",
        "components/toolbar/toolbarView",
        "components/button/buttonView",
        "components/accordion/accordionView"
      ], function(Marionette, MainView, FeedbackView, TooltipView, MessageView,
                  DialogView, MenuHorizontalView, MenuVerticalView, MenuMixtoView,
                  ContextMenuView, ToolbarView, ButtonView, AccordionView){

    var RupDemoApp = new Marionette.Application();

    var MyRouter = Marionette.AppRouter.extend({
      // "someMethod" must exist at controller.someMethod

      appRoutes: {
        '' : 'index',
        'feedback' : 'feedback',
        'tooltip' : 'tooltip',
        'message' : 'message',
        'dialog' : 'dialog',
        'menuHorizontal' : 'menuHorizontal',
        'menuVertical' : 'menuVertical',
        'menuMixto' : 'menuMixto',
        'contextMenu': 'contextMenu',
        'toolbar': 'toolbar',
        'button': 'button',
        'accordion': 'accordion'
      }

    });

    var RouteController = Marionette.Controller.extend({
        index: function() {
        },
        feedback: function() {
          RupDemoApp.mainView.Container.show(new FeedbackView());
        },
        tooltip: function(){
          RupDemoApp.mainView.Container.show(new TooltipView());
        },
        message: function(){
          RupDemoApp.mainView.Container.show(new MessageView());
        },
        dialog: function(){
          RupDemoApp.mainView.Container.show(new DialogView());
        },
        menuHorizontal: function(){
          RupDemoApp.mainView.Container.show(new MenuHorizontalView());
        },
        menuVertical: function(){
          RupDemoApp.mainView.Container.show(new MenuVerticalView());
        },
        menuMixto: function(){
          RupDemoApp.mainView.Container.show(new MenuMixtoView());
        },
        contextMenu: function(){
          RupDemoApp.mainView.Container.show(new ContextMenuView());
        },
        toolbar: function(){
          RupDemoApp.mainView.Container.show(new ToolbarView());
        },
        button: function(){
          RupDemoApp.mainView.Container.show(new ButtonView());
        },
        accordion: function(){
          RupDemoApp.mainView.Container.show(new AccordionView());
        }
    });




    RupDemoApp.on("start", function(){
        RupDemoApp.Controller = new RouteController();

        RupDemoApp.router = new MyRouter({
            controller: RupDemoApp.Controller
        });
        Backbone.history.start();
    });


    RupDemoApp.mainView = new MainView();
    RupDemoApp.mainView.render();



    return  RupDemoApp;

});
