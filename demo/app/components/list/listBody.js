/* eslint-env jquery,amd */
define(['marionette',
    './listBodyTemplate.hbs'], function(Marionette, ListBodyTemplate){

    var ListBodyView = Marionette.LayoutView.extend({
        template: ListBodyTemplate
    });

    return ListBodyView;
});