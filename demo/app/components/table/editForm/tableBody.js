define(['marionette',
    './tableBodyTemplate.hbs'], function(Marionette, TableBodyTemplate){

    var TableBodyView = Marionette.View.extend({
        template: TableBodyTemplate
    });

    return TableBodyView;
});
