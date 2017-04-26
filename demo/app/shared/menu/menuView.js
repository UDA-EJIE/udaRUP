define(['marionette',
        'templates',
        'rup/rup.menu','rup/rup.lang','rup/rup.navbar'], function(Marionette, App){

    var MenuView = Marionette.LayoutView.extend({
        template: App.Templates.demoResponsive.app.shared.menu.menuTemplate,
        redirectNavLink: fncRedirectNavLink,
        ui:{
            // menuElement: "#x21aResponsiveWar_menu",
            // menuMixedElement: "#x21aResponsiveWar_menu"
            languageTool: "#languageDropdown",
            navbar: "#navbarResponsive",
            navLink : "[data-redirect-navLink]"
            // navLinkBt4: "#navLinkBt4",
            // navLinkBt3: "#navLinkBt3",
            // navLinkJQui: "#navLinkJQui"
        },
        events: {
            "click @ui.navLink": "redirectNavLink"
        },
        onAttach : fncOnAttach
    });

    function fncOnAttach(){
      this.ui.languageTool.rup_language({languages: jQuery.rup.AVAILABLE_LANGS_ARRAY});
      this.ui.navbar.rup_navbar();
    }

    function fncRedirectNavLink(event){
      

      var newIndex = $(event.target).attr("data-redirect-navLink");

      window.location.href = _replaceIndex(newIndex);

    }

    function _replaceIndex(newIndex){
      var pathname = window.location.pathname,
          splitPathname = pathname.split('/'),
          index = splitPathname[splitPathname.length-1],
          href = window.location.href,
          splitHref = href.split(index);

      return splitHref[0] + newIndex +(splitHref.length>1?splitHref[splitHref.length-1]:"");

    }

    return MenuView;
});
