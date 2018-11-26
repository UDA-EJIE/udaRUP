define(['marionette',
	'./calendarBodyTemplate.hbs',
	'rup.calendar'
], function (Marionette, CalendarBodyTemplate) {

	var CalendarBodyView = Marionette.LayoutView.extend({
		template: CalendarBodyTemplate
	});

	return CalendarBodyView;
});