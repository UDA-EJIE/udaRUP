/* eslint-env jquery,amd */
define(['marionette',
    './listDobleLayoutTemplate.hbs',
    './listDobleTemplate.hbs',
    './listDobleJsTemplate.hbs',
    './listDobleBody',
    './listDobleTestView',
    '../../../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListDobleLayoutTemplate, ListDobleTemplate, ListDobleJsTemplate, ListDobleBody, ListDobleTestView, ComponentExampleCodeView){

    var ListDobleView = Marionette.LayoutView.extend({
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

        $view.Main.show(new ListDobleBody());
        $view.Example.show(new ComponentExampleCodeView({
            templateHtml: ListDobleTemplate,
            templateJs: ListDobleJsTemplate
        }));
        $view.Test.show(new ListDobleTestView());
    }

    return ListDobleView;
});
