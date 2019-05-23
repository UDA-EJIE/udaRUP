
/* global define */

define(['marionette',
	'shared/main/mainView',
	'pages/index/indexView',
	'styleGuide/styleGuideView',
	'styleGuide/bt4/styleGuideView',
	'components/autocomplete/autocompleteView',
	'components/feedback/feedbackView',
	'components/tooltip/tooltipView',
	'components/message/messageView',
	'components/dialog/dialogView',
	'components/progressbar/progressbarView',
	'components/contextMenu/contextMenuView',
	'components/button/buttonView',
	'components/toolbar/toolbarView',
	'components/date/dateView',
	'components/form/formView',
	'components/time/timeView',
	'components/accordion/accordionView',
	'components/slider/sliderView',
	'components/spinner/spinnerView',
	'components/upload/uploadView',
	'components/validate/validateView',
	'components/chart/chartView',
	'components/tree/examples/treeView',
	'components/tree/dragDrop/treeDragDropView',
	'components/tabs/tabsStaticView',
	'components/wizard/simple/wizardSimpleView',
	'components/wizard/dynamic/wizardDynamicView',
	'components/combo/comboSimple/comboSimpleView',
	'table/tableFilterView',
	'jqtable/jqtableFilterView',
	'responsiveGrid/stackedHorizontal/stackedHorizontalView',
	'responsiveGrid/mobileDesktop/mobileDesktopView',
	'responsiveGrid/mobileTabletDesktop/mobileTabletDesktopView',
	'dashboard/dashboardView'
	

], function(Marionette, MainView,  IndexView, StyleGuideView, Bt3StyleGuideView, Bt4StyleGuideView, AutocompleteView, FeedbackView, TooltipView,
		MessageView, DialogView, ProgressbarView, ContextMenuView, ButtonView, ToolbarView, DateView,
		FormView, TimeView, AccordionView, SliderView, SpinnerView, UploadView, ValidateView, ChartView,
		TreeView, TreeDragDropView, TabsStaticView,
		WizardSimpleView, WizardDynamicView, ComboSimpleView,
		TableFilterView, JqtableFilterView, JqtableFilterView, StackedHorizontalView, MobileDesktopView, MobileTabletDesktopView, DashboardView){

	var RupResponsiveDemoApp = new Marionette.Application();

	var MyRouter = Marionette.AppRouter.extend({
		appRoutes: {
			'' : 'index',
			'styleGuide' : 'styleGuide',
			'bt4StyleGuide' : 'bt4StyleGuide',
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
			'upload' : 'upload',
			'validate' : 'validate',
			'chart' : 'chart',
			'treeExamples' : 'treeExamples',
			'treeDragDrop' : 'treeDragDrop',
			'tabsStatic' : 'tabsStatic',
			'wizardSimple' : 'wizardSimple',
			'wizardDynamic' : 'wizardDynamic',
			'comboSimple' : 'comboSimple',
			'tableFilter': 'tableFilter',
			'jqtableFilter' : 'jqtableFilter',
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
		spinner: function(){
			RupResponsiveDemoApp.mainView.Container.show(new SpinnerView());
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
		tableFilter: function(){
			RupResponsiveDemoApp.mainView.Container.show(new TableFilterView());
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
		dashboard: function(){
			jQuery(RupResponsiveDemoApp.mainView.Container.el).addClass('dashboard-content');
			RupResponsiveDemoApp.mainView.Container.show(new DashboardView());
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



	return  RupResponsiveDemoApp;

});
