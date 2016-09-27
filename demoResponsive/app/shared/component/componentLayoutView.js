
/**
 * @exports MainView
 */
define(['marionette',
        'templates',
        'highlight',
        'rup/rup.tabs'
      ], function(Marionette, App, hljs){

    'use strict';

    /**
     * Vista principal.
     *
     * Define el layout de la página y las diferentes regiones en las que se van a cargar las vistas que van a componer la pantalla.
     *
     *
     * @class
     * @augments Backbone.LayoutView
     * @constructor
     * @name MainView
     *
     */
    var ComponentLayoutView = Marionette.LayoutView.extend({/** @lends MainView.prototype */

        template: App.Templates.demoResponsive.app.shared.component.componentLayoutTemplate,
        options:{
          ui:{
            codeSnippets: "pre code",
            exampleTabs: "#exampleTabs",
            layoutMainBody:"#componentMainBody",
            layoutHtmlExample: "#componentHtmlExample",
            layoutJsExample: "#componentJsExample",
            layoutTest: "#componentTest"
          }
        },
        regionTemplates:{
            MainBodyTemplate: null,
            HtmlExampleTemplate: null,
            JsExampleTemplate: null,
            TestViewTemplate: null
        },
        onDomRefresh: fncOnDomRefresh
        // onBeforeRender: fncInitialize

    });



    function fncOnDomRefresh(){
        var $view = this;
        // var template = App.Templates["app/components/accordion/accordion.hbs"];
        // this.$el.html(template({}));
        $($view.options.ui.layoutMainBody).html($view.regionTemplates.MainBodyTemplate({}));
        $($view.options.ui.layoutHtmlExample).html($view.regionTemplates.HtmlExampleTemplate({}));
        $($view.options.ui.layoutJsExample).html($view.regionTemplates.JsExampleTemplate({}));
        $($view.options.ui.layoutTest).html($view.regionTemplates.TestViewTemplate({}));

        $($view.options.ui.codeSnippets).each(function(i, block) {

          if ($(block).hasClass("html") || $(block).hasClass("javascript")){
            block.innerHTML = block.innerHTML.replace(/</g, "&lt");
          }

          hljs.highlightBlock(block);

        });

        $($view.options.ui.exampleTabs).rup_tabs({
          tabs : [
            {i18nCaption:"HTML", layer:"pre:has(code.html)"},
            {i18nCaption:"JavaScript", layer:"pre:has(code.javascript)"}
          ]
        });


        $view.onAfter();

    }

    // function fncInitialize(options){
    //   options.ui.hez="hez";
    //   _.extend(options.ui, this.options.ui);
    // }

    return ComponentLayoutView;
});
