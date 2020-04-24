/* eslint-env jquery,amd */
define(['marionette',
    './listDobleBodyTemplate.hbs'], function(Marionette, ListDobleBodyTemplate){

    var ListDobleBodyView = Marionette.LayoutView.extend({
        template: ListDobleBodyTemplate
    });

    return ListDobleBodyView;
});