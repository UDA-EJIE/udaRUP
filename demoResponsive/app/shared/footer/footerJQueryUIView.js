
define(['marionette',
        'templates'], function(Marionette, App){

    var FooterView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.shared.footer.footerJQueryUITemplate
    });

    return FooterView;

});
