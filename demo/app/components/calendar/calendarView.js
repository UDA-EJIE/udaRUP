define(['marionette',
    '../../shared/component/componentLayoutTemplate.hbs',
    './calendarHtmlCodeTemplate.hbs',
    './calendarJsCodeTemplate.hbs',
    './calendarBodyView',
    './calendarTestView',
    '../../shared/component/componentExampleCodeView', 'jquery',
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
        window.$ = $;
        window.actions = (param) => {
            console.log('Se ha seleccionado el evento "' + param + '"');
        };
        window.getDay = () => {
            var days_array = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var m = (new Date()).getMonth();
            var m_limit = days_array[m];
            var d = Math.floor(Math.random() * m_limit) + 1;
            return new Date(new Date().getFullYear(), m, d).getTime();
        };
        window.days = [
            getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(),
            getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(),
            getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(), getDay(),
        ];
    }

    return CalendarView;
});