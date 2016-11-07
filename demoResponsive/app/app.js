
define(["marionette",
        "shared/main/mainView","bootstrap",
        "pages/index/indexView",
        "styleGuide/styleGuideView",
        "components/autocomplete/autocompleteView",
        "components/feedback/feedbackView",
        "components/tooltip/tooltipView",
        "components/message/messageView",
        "components/dialog/dialogView",
        "components/progressbar/progressbarView",
        "components/contextMenu/contextMenuView",
        "components/button/buttonView",
        "components/toolbar/toolbarView",
        "components/date/dateView",
        "components/form/formView",
        "components/time/timeView",
        "components/accordion/accordionView",
        "components/slider/sliderView",
        "components/spinner/spinnerView",
        "components/tabs/tabsStaticView",
        "components/combo/comboSimple/comboSimpleView",
        "table/tableFilterView",
        "responsiveGrid/stackedHorizontal/stackedHorizontalView",
        "responsiveGrid/mobileDesktop/mobileDesktopView",
        "responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView",
        "dashboard/dashboardView",

      ], function(Marionette, MainView, Bootstrap, IndexView, StyleGuideView, AutocompleteView, FeedbackView, TooltipView,
              MessageView, DialogView, ProgressbarView, ContextMenuView, ButtonView, ToolbarView, DateView,
              FormView, TimeView, AccordionView, SliderView, SpinnerView, TabsStaticView,
              ComboSimpleView,
              TableFilterView, StackedHorizontalView, MobileDesktopView, MobileTabletDesktopView, DashboardView){

    var RupResponsiveDemoApp = new Marionette.Application();

    var MyRouter = Marionette.AppRouter.extend({
      appRoutes: {
        '' : 'index',
        'styleGuide' : 'styleGuide',
        'autocomplete' : 'autocomplete',
        'feedback' : 'feedback',
        'tooltip' : 'tooltip',
        'message' : 'message',
        'dialog' : 'dialog',
        'progressbar' : 'progressbar',
        'contextMenu' : 'contextMenu',
        'button' : 'button',
        'toolbar' : 'toolbar',
        'date' : 'date',
        'form' : 'form',
        'time' : 'time',
        'accordion' : 'accordion',
        'slider' : 'slider',
        'spinner' : 'spinner',
        'tabsStatic' : 'tabsStatic',
        'comboSimple' : 'comboSimple',
        'tableFilter' : 'tableFilter',
        'stackedHorizontal': 'stackedHorizontal',
        'mobileDesktop': 'mobileDesktop',
        'mobileTabletDesktop': 'mobileTabletDesktop',
        'mobileTabletDesktop': 'mobileTabletDesktop',
        'dashboard': 'dashboard'
      }
    });

    var RouteController = Marionette.Controller.extend({
        index: function() {
          RupResponsiveDemoApp.mainView.Container.show(new IndexView());
        },
        styleGuide: function() {
          RupResponsiveDemoApp.mainView.Container.show(new StyleGuideView());
        },
        autocomplete: function() {
          RupResponsiveDemoApp.mainView.Container.show(new AutocompleteView());
        },
        feedback: function() {
          RupResponsiveDemoApp.mainView.Container.show(new FeedbackView());
        },
        tooltip: function() {
          RupResponsiveDemoApp.mainView.Container.show(new TooltipView());
        },
        button: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ButtonView());
        },
        toolbar: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ToolbarView());
        },
        date: function(){
          RupResponsiveDemoApp.mainView.Container.show(new DateView());
        },
        form: function(){
          RupResponsiveDemoApp.mainView.Container.show(new FormView());
        },
        time: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TimeView());
        },
        message: function(){
          RupResponsiveDemoApp.mainView.Container.show(new MessageView());
        },
        dialog: function(){
          RupResponsiveDemoApp.mainView.Container.show(new DialogView());
        },
        progressbar: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ProgressbarView());
        },
        contextMenu: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ContextMenuView());
        },
        accordion: function(){
          RupResponsiveDemoApp.mainView.Container.show(new AccordionView());
        },
        slider: function(){
          RupResponsiveDemoApp.mainView.Container.show(new SliderView());
        },
        spinner: function(){
          RupResponsiveDemoApp.mainView.Container.show(new SpinnerView());
        },
        tabsStatic: function(){
          RupResponsiveDemoApp.mainView.Container.show(new TabsStaticView());
        },
        comboSimple: function(){
          RupResponsiveDemoApp.mainView.Container.show(new ComboSimpleView());
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
        },
        dashboard: function(){
          RupResponsiveDemoApp.mainView.Container.show(new DashboardView());
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
