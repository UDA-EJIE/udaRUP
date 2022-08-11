/* eslint-env jquery,amd */
define(['marionette',
    './listLayoutTemplate.hbs',
    './listTemplate.hbs',
    './listJsTemplate.hbs',
    './listBody',
    './listTestView',
    '../../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListLayoutTemplate, ListTemplate, ListJsTemplate, ListBody, ListTestView, ComponentExampleCodeView){

    var ListView = Marionette.View.extend({
        template: ListLayoutTemplate,
        regions:{
            Main: '#listMainBody',
            Example: '#listCode',
            Test: '#listTest'
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.showChildView('Main', new ListBody());
        $view.showChildView('Example', new ComponentExampleCodeView({
            templateHtml: ListTemplate,
            templateJs: ListJsTemplate
        }));
        $view.showChildView('Test', new ListTestView());
    }

    return ListView;
});
