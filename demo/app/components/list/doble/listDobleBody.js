/* eslint-env jquery,amd */
define(['marionette',
    './listDobleBodyTemplate.hbs'], function(Marionette, ListDobleBodyTemplate){

    var ListDobleBodyView = Marionette.View.extend({
        template: ListDobleBodyTemplate
    });

    return ListDobleBodyView;
});