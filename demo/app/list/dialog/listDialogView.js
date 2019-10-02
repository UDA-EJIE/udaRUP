/* eslint-env jquery,amd */
define(['marionette',
    './listDialogLayoutTemplate.hbs',
    './listDialogTemplate.hbs',
    './listDialogJsTemplate.hbs',
    './listDialogBody',
    './listDialogTestView',
    '../../shared/component/componentExampleCodeView',
    'rup.list'], function(Marionette, ListDialogLayoutTemplate, ListDialogTemplate, ListDialogJsTemplate, ListDialogBody, ListDialogTestView, ComponentExampleCodeView){

    var ListDialogView = Marionette.LayoutView.extend({
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

        $view.Main.show(new ListDialogBody());
        $view.Example.show(new ComponentExampleCodeView({
            templateHtml: ListDialogTemplate,
            templateJs: ListDialogJsTemplate
        }));
        $view.Test.show(new ListDialogTestView());
    }

    return ListDialogView;
});
