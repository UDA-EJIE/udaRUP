
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
        "components/accordion/accordionView",
        "components/tabs/tabsStaticView",
        "components/tabs/tabsAjaxView",
        "components/tabs/tabsMixtoView",
        "components/tabs/tabsScrollableView",
        "components/autocomplete/autocompleteView",
        "components/combo/comboSimpleView",
        "components/combo/comboEnlazadoSimpleView",
        "components/combo/comboEnlazadoMultipleView",
        "components/combo/comboMultiseleccionView",
        "components/date/dateView",
        "components/time/timeView",
        "components/form/formView",
        "components/validate/validateView",
        "components/upload/uploadView",
        "components/table/tableFilterView",

      ], function(Marionette, MainView, FeedbackView, TooltipView, MessageView,
                  DialogView, MenuHorizontalView, MenuVerticalView, MenuMixtoView,
                  ContextMenuView, ToolbarView, ButtonView, AccordionView, TabsStaticView,
                  TabsAjaxView, TabsMixedView, TabsScrollableView, AutocompleteView,
                  ComboSimpleView, ComboEnlazadoSimpleView, ComboEnlazadoMultipleView, ComboMultiseleccionView,
                  DateView, TimeView, FormView, ValidateView, UploadView, TableFilterView){

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
        'accordion': 'accordion',
        'tabsStatic': 'tabsStatic',
        'tabsAjax': 'tabsAjax',
        'tabsMixto': 'tabsMixto',
        'tabsScrollable': 'tabsScrollable',
        'autocomplete': 'autocomplete',
        'comboSimple': 'comboSimple',
        'comboEnlazadoSimple': 'comboEnlazadoSimple',
        'comboEnlazadoMultiple': 'comboEnlazadoMultiple',
        'comboMultiseleccion': 'comboMultiseleccion',
        'date': 'date',
        'time': 'time',
        'form': 'form',
        'validate': 'validate',
        'upload': 'upload',
        'tableFilter': 'tableFilter'

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
        },
        tabsStatic: function(){
          RupDemoApp.mainView.Container.show(new TabsStaticView());
        },
        tabsAjax: function(){
          RupDemoApp.mainView.Container.show(new TabsAjaxView());
        },
        tabsMixto: function(){
          RupDemoApp.mainView.Container.show(new TabsMixedView());
        },
        tabsScrollable: function(){
          RupDemoApp.mainView.Container.show(new TabsScrollableView());
        },
        autocomplete: function(){
          RupDemoApp.mainView.Container.show(new AutocompleteView());
        },
        comboSimple: function(){
          RupDemoApp.mainView.Container.show(new ComboSimpleView());
        },
        comboEnlazadoSimple: function(){
          RupDemoApp.mainView.Container.show(new ComboEnlazadoSimpleView());
        },
        comboEnlazadoMultiple: function(){
          RupDemoApp.mainView.Container.show(new ComboEnlazadoMultipleView());
        },
        comboMultiseleccion: function(){
          RupDemoApp.mainView.Container.show(new ComboMultiseleccionView());
        },
        date: function(){
          RupDemoApp.mainView.Container.show(new DateView());
        },
        time: function(){
          RupDemoApp.mainView.Container.show(new TimeView());
        },
        form: function(){
          RupDemoApp.mainView.Container.show(new FormView());
        },
        validate: function(){
          RupDemoApp.mainView.Container.show(new ValidateView());
        },
        upload: function(){
          RupDemoApp.mainView.Container.show(new UploadView());
        },
        tableFilter: function(){
          RupDemoApp.mainView.Container.show(new TableFilterView());
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
