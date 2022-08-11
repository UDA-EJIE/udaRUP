define(['marionette',
    './tableLayoutTemplate.hbs',
    './tableTemplate.hbs',
    './tableJsTemplate.hbs',
    './tableBody',
    './tableTestView',
    '../../../shared/component/componentExampleCodeView',
    'rup_table/rup.table',
    'rup.validate'
], function (Marionette, TableLayoutTemplate, TableTemplate, TableJsTemplate, TableBody, TableTestView, ComponentExampleCodeView) {

    var TableView = Marionette.View.extend({
        template: TableLayoutTemplate,
        regions: {
            Main: '#tableMainBody',
            Example: '#tableCode',
            Test: '#tableTest'
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.showChildView('Main', new TableBody());
        $view.showChildView('Example', new ComponentExampleCodeView({
            templateHtml: TableTemplate,
            templateJs: TableJsTemplate
        }));
        $view.showChildView('Test', new TableTestView());
    }

    return TableView;
});