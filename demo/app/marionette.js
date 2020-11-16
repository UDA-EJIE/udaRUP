/* global Backbone */

import * as Marionette from 'marionette';
import MainView from 'shared/main/mainView';
import IndexView from 'pages/index/indexView';
import StyleGuideView from 'styleGuide/styleGuideView';
import Bt4StyleGuideView from 'styleGuide/bt4/styleGuideView';
import AutocompleteView from 'components/autocomplete/autocompleteView';
import FeedbackView from 'components/feedback/feedbackView';
import TooltipView from 'components/tooltip/tooltipView';
import MessageView from 'components/message/messageView';
import DialogView from 'components/dialog/dialogView';
import ProgressbarView from 'components/progressbar/progressbarView';
import ContextMenuView from 'components/contextMenu/contextMenuView';
import ButtonView from 'components/button/buttonView';
import ToolbarView from 'components/toolbar/toolbarView';
import DateView from 'components/date/dateView';
import FormView from 'components/form/formView';
import TimeView from 'components/time/timeView';
import AccordionView from 'components/accordion/accordionView';
import SliderView from 'components/slider/sliderView';
import SpinnerView from 'components/spinner/spinnerView';
import UploadView from 'components/upload/uploadView';
import ValidateView from 'components/validate/validateView';
import ChartView from 'components/chart/chartView';
import TreeView from 'components/tree/examples/treeView';
import TreeDragDropView from 'components/tree/dragDrop/treeDragDropView';
import TabsStaticView from 'components/tabs/tabsStaticView';
import WizardSimpleView from 'components/wizard/simple/wizardSimpleView';
import WizardDynamicView from 'components/wizard/dynamic/wizardDynamicView';
import ComboSimpleView from 'components/combo/comboSimple/comboSimpleView';
import TableEditInlineView from 'components/table/editInline/tableView';
import TableEditFormView from 'components/table/editForm/tableView';
import JqtableFilterView from 'components/jqtable/jqtableFilterView';
import StackedHorizontalView from 'responsiveGrid/stackedHorizontal/stackedHorizontalView';
import MobileDesktopView from 'responsiveGrid/mobileDesktop/mobileDesktopView';
import MobileTabletDesktopView from 'responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView';
import CalendarView from 'components/calendar/calendarView';
import ListView from 'components/list/listView';
import ListDobleView from 'components/list/doble/listDobleView';
import ListDialogView from 'components/list/dialog/listDialogView';

var RupResponsiveDemoApp = new Marionette.Application();

var MyRouter = Marionette.AppRouter.extend({
    appRoutes: {
        '' : 'index',
        'styleGuide' : 'styleGuide',
        'bt4StyleGuide' : 'bt4StyleGuide',
        'autocomplete' : 'autocomplete',
        'feedback' : 'feedback',
        'tooltip' : 'tooltip',
        'tableEditInline' : 'tableEditInline',
        'tableEditForm' : 'tableEditForm',
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
        'upload' : 'upload',
        'validate' : 'validate',
        'chart' : 'chart',
        'treeExamples' : 'treeExamples',
        'treeDragDrop' : 'treeDragDrop',
        'tabsStatic' : 'tabsStatic',
        'wizardSimple' : 'wizardSimple',
        'wizardDynamic' : 'wizardDynamic',
        'comboSimple' : 'comboSimple',
        'jqtableFilter' : 'jqtableFilter',
        'stackedHorizontal': 'stackedHorizontal',
        'mobileDesktop': 'mobileDesktop',
        'mobileTabletDesktop': 'mobileTabletDesktop',
        'calendar': 'calendar',
        'list':'list',
        'listDoble':'listDoble',
        'listDialog':'listDialog'
    }
});

var RouteController = Marionette.Controller.extend({
    index: function() {
        RupResponsiveDemoApp.mainView.Container.show(new IndexView());
    },
    styleGuide: function() {
        RupResponsiveDemoApp.mainView.Container.show(new StyleGuideView());
    },
    bt4StyleGuide: function() {
        RupResponsiveDemoApp.mainView.Container.show(new Bt4StyleGuideView());
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
    tableEditInline: function() {
        RupResponsiveDemoApp.mainView.Container.show(new TableEditInlineView());
    },
    tableEditForm: function() {
        RupResponsiveDemoApp.mainView.Container.show(new TableEditFormView());
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
    upload: function(){
        RupResponsiveDemoApp.mainView.Container.show(new UploadView());
    },
    validate: function(){
        RupResponsiveDemoApp.mainView.Container.show(new ValidateView());
    },
    chart: function(){
        RupResponsiveDemoApp.mainView.Container.show(new ChartView());
    },
    treeExamples: function(){
        RupResponsiveDemoApp.mainView.Container.show(new TreeView());
    },
    treeDragDrop: function(){
        RupResponsiveDemoApp.mainView.Container.show(new TreeDragDropView());
    },
    tabsStatic: function(){
        RupResponsiveDemoApp.mainView.Container.show(new TabsStaticView());
    },
    wizardSimple: function(){
        RupResponsiveDemoApp.mainView.Container.show(new WizardSimpleView());
    },
    wizardDynamic: function(){
        RupResponsiveDemoApp.mainView.Container.show(new WizardDynamicView());
    },
    comboSimple: function(){
        RupResponsiveDemoApp.mainView.Container.show(new ComboSimpleView());
    },
    jqtableFilter: function(){
        RupResponsiveDemoApp.mainView.Container.show(new JqtableFilterView());
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
    calendar: function () {
        RupResponsiveDemoApp.mainView.Container.show(new CalendarView());
    },
    list: function () {
        RupResponsiveDemoApp.mainView.Container.show(new ListView());
    },
    listDoble: function () {
        RupResponsiveDemoApp.mainView.Container.show(new ListDobleView());
    },
    listDialog: function () {
        RupResponsiveDemoApp.mainView.Container.show(new ListDialogView());
    }
});

RupResponsiveDemoApp.on('start', function(){
    RupResponsiveDemoApp.Controller = new RouteController();

    RupResponsiveDemoApp.router = new MyRouter({
        controller: RupResponsiveDemoApp.Controller
    });
    Backbone.history.start();
});

RupResponsiveDemoApp.mainView = new MainView();
RupResponsiveDemoApp.mainView.render();

export {RupResponsiveDemoApp};