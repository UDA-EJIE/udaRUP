define(['marionette',
	'../../shared/component/componentLayoutTemplate.hbs',
	'./calendarHtmlCodeTemplate.hbs',
	'./calendarJsCodeTemplate.hbs',
	'./calendarBodyView',
	'./calendarTestView',
	'../../shared/component/componentExampleCodeView',
	'rup.calendar', 'rup.button'
], function (Marionette, ComponentLayoutTemplate, CalendarHtmlCodeTemplate, CalendarJsCodeTemplate, CalendarBodyView, CalendarTestView, ComponentExampleCodeView) {

	var CalendarView = Marionette.LayoutView.extend({
		template: ComponentLayoutTemplate,
		regions: {
			Main: '#componentMainBody',
			Example: '#exampleCode',
			Test: '#componentTest'
		},
		onRender: fncOnRender
	});

	function fncOnRender() {
		var $view = this;

		$view.Main.show(new CalendarBodyView());
		$view.Example.show(new ComponentExampleCodeView({
			templateHtml: CalendarHtmlCodeTemplate,
			templateJs: CalendarJsCodeTemplate
		}));
		$view.Test.show(new CalendarTestView());
	}

	return CalendarView;
});