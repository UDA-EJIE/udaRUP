requirejs.config({
    baseUrl: "./app",
//    map: {
//        "*": {
//            "typeahead": '../src/core/typeahead!../../bower_components/typeahead.js/dist/typeahead.jquery'
//        }
//    },
    paths: {
        "jquery": "../../bower_components/jquery/jquery",
        "jquery-ui": "../../bower_components/jquery-ui/jquery-ui",
        "backbone": "../../bower_components/backbone/backbone",
        "underscore": "../../bower_components/underscore/underscore",
        "handlebars": "../../bower_components/handlebars/handlebars",
        "marionette": "../../bower_components/backbone.marionette/lib/backbone.marionette",
        "qtip2": "../../bower_components/qtip2/jquery.qtip",
        "templates": "../templates",
        "rup/compatibility": "../../src/rup.compatibility",
        "rup/base": "../../src/rup.base",
        "rup/utils": "../../src/rup.utils",
        "rup/lang": "../../src/rup.lang",
        "rup/tooltip": "../../src/rup.tooltip",
        "rup/menu": "../../src/rup.menu",
        "rup/feedback": "../../src/rup.feedback",
        "rup/accordion": "../../src/rup.accordion",
        "rup/message": "../../src/rup.message",
        "rup/dialog": "../../src/rup.dialog",
        "rup/contextMenu": "../../src/rup.contextMenu",
        "rup/toolbar": "../../src/rup.toolbar",
        "rup/button": "../../src/rup.button",
        "rup/accordion": "../../src/rup.accordion",

        // menuDeps
        "jquery-1.7": "../../src/core/jquery-1.7.2",
        "private-jquery": "../jquery-private",
        "private-jqueryui-core-menu":"../../src/core/ui/menu/jquery.ui.core.menu",
        "private-jqueryui-widget-menu":"../../src/core/ui/menu/jquery.ui.widget.menu",
        "private-jqueryui-position-menu":"../../src/core/ui/menu/jquery.ui.position.menu",
        "private-jqueryui-menu":"../../src/core/ui/menu/jquery.ui.menu",

        // legacy
        "blockUI": "../../src/core/utils/jquery.blockUI",
        "jQuery-contextMenu": "../../src/core/utils/jquery.contextMenu"

    },
    shim : {
      "jquery-ui":{
        "deps": ["jquery"],
      },
      "rup/compatibility":{
        "deps": ["rup/base"],
      },
      "rup/base":{
        "deps": ["rup/utils"],
        "exports":"widgetMenu"
      },
      "rup/utils":{
        "deps": ["jquery-ui"]
      },
      "rup/compatibility":{
        "deps": ["rup/base"]
      },
      "rup/lang":{
        "deps": ["rup/base", "rup/tooltip"]
      },
      "rup/tooltip":{
        "deps": ["rup/base","qtip2"]
      },
      "rup/menu":{
        "deps": ["rup/base","rup/compatibility"]
      },
      "rup/feedback":{
        "deps": ["rup/base"]
      },
      "rup/accordion":{
        "deps": ["rup/base"]
      },
      "rup/message":{
        "deps": ["rup/base"]
      },
      "rup/dialog":{
        "deps": ["rup/base", "blockUI"]
      },
      "rup/contextMenu":{
        "deps": ["rup/base", "jQuery-contextMenu"]
      },
      "rup/toolbar":{
        "deps": ["rup/base", "rup/button"]
      },
      "rup/button":{
        "deps": ["rup/base"]
      },
      "rup/accordion":{
        "deps": ["rup/base"]
      },

      // legacy
      "blockUI":{
        "deps": ["jquery"]
      },
      "jQuery-contextMenu":{
        "deps": ["jquery"]
      }

    }
//    ,
//    map: {
        //We map calls to marionette to use our own "augment" module
        //we also map backbone.wreqr calls to use the Radio module.
//        '*': {
//             'marionette': 'marionette.radio',
//             'backbone.wreqr': 'backbone_radio'
//         },
//         //For our "augment" module, we want the real Marionette
//         'marionette.radio' : {
//            'marionette': 'marionette'
//         }
//    }
});

require(["app"], function(Escritorio){
    Escritorio.start();
});
