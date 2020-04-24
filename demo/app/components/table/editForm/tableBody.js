define(['marionette',
    './tableBodyTemplate.hbs'], function(Marionette, TableBodyTemplate){

    var TableBodyView = Marionette.LayoutView.extend({
        template: TableBodyTemplate
    });

    return TableBodyView;
});
