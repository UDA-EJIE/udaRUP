/* eslint-env jquery,amd */
define(['marionette',
    './listBodyTemplate.hbs'], function(Marionette, ListBodyTemplate){

    var ListBodyView = Marionette.View.extend({
        template: ListBodyTemplate
    });

    return ListBodyView;
});