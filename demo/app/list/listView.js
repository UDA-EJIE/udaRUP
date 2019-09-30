/* eslint-env jquery,amd */
define(['marionette',
    './listLayoutTemplate.hbs',
    './listTemplate.hbs',
    './listJsTemplate.hbs',
    './listBody',
    './listTestView',
    '../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListLayoutTemplate, ListTemplate, ListJsTemplate, ListBody, ListTestView, ComponentExampleCodeView){

    var ListView = Marionette.LayoutView.extend({
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

        $view.Main.show(new ListBody());
        $view.Example.show(new ComponentExampleCodeView({
            templateHtml: ListTemplate,
            templateJs: ListJsTemplate
        }));
        $view.Test.show(new ListTestView());
    }

    return ListView;
});
