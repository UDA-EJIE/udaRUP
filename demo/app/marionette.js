/* global Backbone */

import * as Marionette from 'marionette';
import AppRouter from 'approuter';
import MainView from 'shared/main/mainView';
import IndexView from 'pages/index/indexView';
import StyleGuideView from 'styleGuide/styleGuideView';
import Bt4StyleGuideView from 'styleGuide/bt4/styleGuideView';
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
import TableEditInlineView from 'components/table/editInline/tableView';
import TableEditFormView from 'components/table/editForm/tableView';
import StackedHorizontalView from 'responsiveGrid/stackedHorizontal/stackedHorizontalView';
import MobileDesktopView from 'responsiveGrid/mobileDesktop/mobileDesktopView';
import MobileTabletDesktopView from 'responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView';
import CalendarView from 'components/calendar/calendarView';
import ListView from 'components/list/listView';
import ListDobleView from 'components/list/doble/listDobleView';
import ListDialogView from 'components/list/dialog/listDialogView';

var RupResponsiveDemoApp = new Marionette.Application();

var MyRouter = AppRouter.extend({
    appRoutes: {
        '' : 'index',
        'styleGuide' : 'styleGuide',
        'bt4StyleGuide' : 'bt4StyleGuide',
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
        'stackedHorizontal': 'stackedHorizontal',
        'mobileDesktop': 'mobileDesktop',
        'mobileTabletDesktop': 'mobileTabletDesktop',
        'calendar': 'calendar',
        'list':'list',
        'listDoble':'listDoble',
        'listDialog':'listDialog'
    }
});

var RouteController = Marionette.MnObject.extend({
    index: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new IndexView());
    },
    styleGuide: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new StyleGuideView());
    },
    bt4StyleGuide: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new Bt4StyleGuideView());
    },
    feedback: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new FeedbackView());
    },
    tooltip: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new TooltipView());
    },
    tableEditInline: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new TableEditInlineView());
    },
    tableEditForm: function() {
        RupResponsiveDemoApp.mainView.showChildView('Container', new TableEditFormView());
    },
    button: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ButtonView());
    },
    toolbar: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ToolbarView());
    },
    date: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new DateView());
    },
    form: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new FormView());
    },
    time: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new TimeView());
    },
    message: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new MessageView());
    },
    dialog: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new DialogView());
    },
    progressbar: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ProgressbarView());
    },
    contextMenu: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ContextMenuView());
    },
    accordion: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new AccordionView());
    },
    slider: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new SliderView());
    },
    spinner: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new SpinnerView());
    },
    upload: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new UploadView());
    },
    validate: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ValidateView());
    },
    chart: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new ChartView());
    },
    treeExamples: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new TreeView());
    },
    treeDragDrop: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new TreeDragDropView());
    },
    tabsStatic: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new TabsStaticView());
    },
    wizardSimple: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new WizardSimpleView());
    },
    wizardDynamic: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new WizardDynamicView());
    },
    stackedHorizontal: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new StackedHorizontalView());
    },
    mobileDesktop: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new MobileDesktopView());
    },
    mobileTabletDesktop: function(){
        RupResponsiveDemoApp.mainView.showChildView('Container', new MobileTabletDesktopView());
    },
    calendar: function () {
        RupResponsiveDemoApp.mainView.showChildView('Container', new CalendarView());
    },
    list: function () {
        RupResponsiveDemoApp.mainView.showChildView('Container', new ListView());
    },
    listDoble: function () {
        RupResponsiveDemoApp.mainView.showChildView('Container', new ListDobleView());
    },
    listDialog: function () {
        RupResponsiveDemoApp.mainView.showChildView('Container', new ListDialogView());
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