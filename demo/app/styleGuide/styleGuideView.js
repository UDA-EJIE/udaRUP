
define(['marionette',
        'templates'], function(Marionette, App){

    var StyleGuideView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.styleGuide.styleGuideTemplate
    });

    return StyleGuideView;

});
