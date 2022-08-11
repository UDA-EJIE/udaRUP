/* eslint-env jquery,amd */
define(['marionette',
    './listDobleLayoutTemplate.hbs',
    './listDobleTemplate.hbs',
    './listDobleJsTemplate.hbs',
    './listDobleBody',
    './listDobleTestView',
    '../../../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListDobleLayoutTemplate, ListDobleTemplate, ListDobleJsTemplate, ListDobleBody, ListDobleTestView, ComponentExampleCodeView){

    var ListDobleView = Marionette.View.extend({
        template: ListDobleLayoutTemplate,
        regions:{
            Main: '#listDobleMainBody',
            Example: '#listDobleCode',
            Test: '#listDobleTest'
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.showChildView('Main', new ListDobleBody());
        $view.showChildView('Example', new ComponentExampleCodeView({
            templateHtml: ListDobleTemplate,
            templateJs: ListDobleJsTemplate
        }));
        $view.showChildView('Test', new ListDobleTestView());
    }

    return ListDobleView;
});
