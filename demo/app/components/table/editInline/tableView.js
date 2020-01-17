define(['marionette',
    './tableLayoutTemplate.hbs',
    './tableTemplate.hbs',
    './tableJsTemplate.hbs',
    './tableBody',
    './tableTestView',
    '../../../shared/component/componentExampleCodeView',
    'rup_table/rup.table'], function(Marionette, TableLayoutTemplate, TableTemplate, TableJsTemplate, TableBody, TableTestView, ComponentExampleCodeView){

    var TableView = Marionette.LayoutView.extend({
        template: TableLayoutTemplate,
        regions:{
            Main: '#tableMainBody',
            Example: '#tableCode',
            Test: '#tableTest'
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.Main.show(new TableBody());
        $view.Example.show(new ComponentExampleCodeView({
            templateHtml: TableTemplate,
            templateJs: TableJsTemplate
        }));
        $view.Test.show(new TableTestView());
    }

    return TableView;
});
