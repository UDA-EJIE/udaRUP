define(["marionette",
        "shared/main/mainViewJQueryUI",
        "styleGuide/styleGuideView",
        "components/feedback/feedbackView",
        "components/tooltip/tooltipView",
        "components/message/messageView",
        "components/dialog/dialogView",
        "components/menu/menuHorizontalView",
        "components/menu/menuVerticalView",
        "components/menu/menuMixtoView",
        "components/menu/navMenuView",
        "components/contextMenu/contextMenuView",
        "components/toolbar/toolbarView",
        "components/button/buttonView",
        "components/accordion/accordionView",
        "components/tabs/tabsStaticView",
        "components/tabs/tabsAjaxView",
        "components/tabs/tabsMixtoView",
        "components/tabs/tabsScrollableView",
        "components/autocomplete/autocompleteView",
        "components/combo/comboSimple/comboSimpleView",
        "components/combo/comboEnlazadoSimple/comboEnlazadoSimpleView",
        "components/combo/comboEnlazadoMultiple/comboEnlazadoMultipleView",
        "components/combo/comboMultiseleccion/comboMultiseleccionView",
        "components/date/dateView",
        "components/time/timeView",
        "components/form/formView",
        "components/validate/validateView",
        "components/upload/uploadView",
        "table/tableFilterView",
        "components/progressbar/progressbarView",
        "components/slider/sliderView",
        "components/spinner/spinnerView",
        "components/chart/chartView"


      ], function (Marionette, MainView, StyleGuideView, FeedbackView, TooltipView, MessageView,
    DialogView, MenuHorizontalView, MenuVerticalView, MenuMixtoView, NavMenuView,
    ContextMenuView, ToolbarView, ButtonView, AccordionView, TabsStaticView,
    TabsAjaxView, TabsMixedView, TabsScrollableView, AutocompleteView,
    ComboSimpleView, ComboEnlazadoSimpleView, ComboEnlazadoMultipleView, ComboMultiseleccionView,
    DateView, TimeView, FormView, ValidateView, UploadView, TableFilterView,
    ProgressbarView, SliderView, SpinnerView, ChartView) {

    var RupDemoApp = new Marionette.Application();

    var MyRouter = Marionette.AppRouter.extend({
        // "someMethod" must exist at controller.someMethod

        appRoutes: {
            '': 'index',
            'styleGuide': 'styleGuide',
            'feedback': 'feedback',
            'tooltip': 'tooltip',
            'message': 'message',
            'dialog': 'dialog',
            'menuHorizontal': 'menuHorizontal',
            'menuVertical': 'menuVertical',
            'menuMixto': 'menuMixto',
            'navMenu': 'navMenu',
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
            'tableFilter': 'tableFilter',
            'progressbar': 'progressbar',
            'slider': 'slider',
            'spinner': 'spinner',
            'chart': 'chart'

        }

    });

    var RouteController = Marionette.Controller.extend({
        index: function () {},
        styleGuide: function () {
            RupDemoApp.mainView.Container.show(new StyleGuideView());
        },
        feedback: function () {
            RupDemoApp.mainView.Container.show(new FeedbackView());
        },
        tooltip: function () {
            RupDemoApp.mainView.Container.show(new TooltipView());
        },
        message: function () {
            RupDemoApp.mainView.Container.show(new MessageView());
        },
        dialog: function () {
            RupDemoApp.mainView.Container.show(new DialogView());
        },
        menuHorizontal: function () {
            RupDemoApp.mainView.Container.show(new MenuHorizontalView());
        },
        menuVertical: function () {
            RupDemoApp.mainView.Container.show(new MenuVerticalView());
        },
        menuMixto: function () {
            RupDemoApp.mainView.Container.show(new MenuMixtoView());
        },
        navMenu: function () {
            RupDemoApp.mainView.Container.show(new NavMenuView());
        },
        contextMenu: function () {
            RupDemoApp.mainView.Container.show(new ContextMenuView());
        },
        toolbar: function () {
            RupDemoApp.mainView.Container.show(new ToolbarView());
        },
        button: function () {
            RupDemoApp.mainView.Container.show(new ButtonView());
        },
        accordion: function () {
            RupDemoApp.mainView.Container.show(new AccordionView());
        },
        tabsStatic: function () {
            RupDemoApp.mainView.Container.show(new TabsStaticView());
        },
        tabsAjax: function () {
            RupDemoApp.mainView.Container.show(new TabsAjaxView());
        },
        tabsMixto: function () {
            RupDemoApp.mainView.Container.show(new TabsMixedView());
        },
        tabsScrollable: function () {
            RupDemoApp.mainView.Container.show(new TabsScrollableView());
        },
        autocomplete: function () {
            RupDemoApp.mainView.Container.show(new AutocompleteView());
        },
        comboSimple: function () {
            RupDemoApp.mainView.Container.show(new ComboSimpleView());
        },
        comboEnlazadoSimple: function () {
            RupDemoApp.mainView.Container.show(new ComboEnlazadoSimpleView());
        },
        comboEnlazadoMultiple: function () {
            RupDemoApp.mainView.Container.show(new ComboEnlazadoMultipleView());
        },
        comboMultiseleccion: function () {
            RupDemoApp.mainView.Container.show(new ComboMultiseleccionView());
        },
        date: function () {
            RupDemoApp.mainView.Container.show(new DateView());
        },
        time: function () {
            RupDemoApp.mainView.Container.show(new TimeView());
        },
        form: function () {
            RupDemoApp.mainView.Container.show(new FormView());
        },
        validate: function () {
            RupDemoApp.mainView.Container.show(new ValidateView());
        },
        upload: function () {
            RupDemoApp.mainView.Container.show(new UploadView());
        },
        tableFilter: function () {
            RupDemoApp.mainView.Container.show(new TableFilterView());
        },
        progressbar: function () {
            RupDemoApp.mainView.Container.show(new ProgressbarView());
        },
        slider: function () {
            RupDemoApp.mainView.Container.show(new SliderView());
        },
        spinner: function () {
            RupDemoApp.mainView.Container.show(new SpinnerView());
        },
        chart: function () {
            RupDemoApp.mainView.Container.show(new ChartView());
        },
    });




    RupDemoApp.on("start", function () {
        RupDemoApp.Controller = new RouteController();

        RupDemoApp.router = new MyRouter({
            controller: RupDemoApp.Controller
        });
        Backbone.history.start();
    });


    RupDemoApp.mainView = new MainView();
    RupDemoApp.mainView.render();



    return RupDemoApp;

});
