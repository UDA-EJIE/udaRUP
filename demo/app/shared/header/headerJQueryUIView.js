define(['marionette',
        'templates'], function(Marionette, App){

    var HeaderView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.shared.header.headerJQueryUITemplate
    });

    return HeaderView;

});
