/* eslint-env jquery,amd */
define(['marionette',
    './listDialogBodyTemplate.hbs'], function(Marionette, ListDialogBodyTemplate){

    var ListDialogBodyView = Marionette.View.extend({
        template: ListDialogBodyTemplate
    });

    return ListDialogBodyView;
});