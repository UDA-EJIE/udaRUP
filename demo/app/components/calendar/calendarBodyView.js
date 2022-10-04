define(['marionette',
    './calendarBodyTemplate.hbs',
    'rup.calendar'
], function (Marionette, CalendarBodyTemplate) {

    var CalendarBodyView = Marionette.View.extend({
        template: CalendarBodyTemplate
    });

    return CalendarBodyView;
});