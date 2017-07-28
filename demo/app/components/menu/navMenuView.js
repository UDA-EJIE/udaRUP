define(['marionette',
        'templates',
        "rup.navMenu"], function (Marionette, App) {

    var NavMenuView = Marionette.LayoutView.extend({
        template: App.Templates.demo.app.components.menu.navMenuTemplate,
        ui: {
            navMenuExample: "#example",

        },
        onDomRefresh: fncOnDomRefresh
    });

    function fncOnDomRefresh() {
        var $view = this;

        this.ui.navMenuExample.rup_navMenu({
            navigation: true,
            visible: 3
        });

    }
    return NavMenuView;
});
