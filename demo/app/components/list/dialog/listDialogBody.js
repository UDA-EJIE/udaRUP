/* eslint-env jquery,amd */
define(['marionette',
    './listDialogBodyTemplate.hbs'], function(Marionette, ListDialogBodyTemplate){

    var ListDialogBodyView = Marionette.LayoutView.extend({
        template: ListDialogBodyTemplate
    });

    return ListDialogBodyView;
});