define(['marionette',
        'templates'], function(Marionette, App){

    var HeaderView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.shared.header.headerTemplate
    });

    return HeaderView;

});
