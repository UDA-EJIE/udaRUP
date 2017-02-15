
define(['marionette',
        'templates',
        'rup/rup.base',
        'rup/rup.utils',
        'rup/rup.lang'], function(Marionette, App){

    var HeaderView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.shared.language.languageTemplate,
        ui:{
            languageSelector: "#x21aResponsiveWar_language"
        },
        onDomRefresh: fncOnDomRefresh
    });

    function fncOnDomRefresh(){
      var $view = this;

      $view.ui.languageSelector.rup_language({languages: jQuery.rup.AVAILABLE_LANGS_ARRAY});
    }

    return HeaderView;

});
