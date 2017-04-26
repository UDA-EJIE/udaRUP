
define(['marionette',
        'templates'], function(Marionette, App){

    var FooterView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.shared.footer.footerTemplate
    });

    return FooterView;

});
