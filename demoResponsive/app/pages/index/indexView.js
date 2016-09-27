
define(['marionette',
        'templates'], function(Marionette, App){

    var IndexView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.pages.index.indexTemplate
    });

    return IndexView;

});
