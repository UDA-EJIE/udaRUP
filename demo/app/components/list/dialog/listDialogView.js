/* eslint-env jquery,amd */
define(['marionette',
    './listDialogLayoutTemplate.hbs',
    './listDialogTemplate.hbs',
    './listDialogJsTemplate.hbs',
    './listDialogBody',
    './listDialogTestView',
    '../../../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListDialogLayoutTemplate, ListDialogTemplate, ListDialogJsTemplate, ListDialogBody, ListDialogTestView, ComponentExampleCodeView){

    var ListDialogView = Marionette.View.extend({
        template: ListDialogLayoutTemplate,
        regions:{
            Main: '#listDialogMainBody',
            Example: '#listDialogCode',
            Test: '#listDialogTest'
        },
        onRender: fncOnRender
    });

    function fncOnRender() {
        var $view = this;

        $view.showChildView('Main', new ListDialogBody());
        $view.showChildView('Example', new ComponentExampleCodeView({
            templateHtml: ListDialogTemplate,
            templateJs: ListDialogJsTemplate
        }));
        $view.showChildView('Test', new ListDialogTestView());
    }

    return ListDialogView;
});
