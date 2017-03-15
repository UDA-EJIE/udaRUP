require.config({
  // to set the default folder
  baseUrl: './',
  // paths: maps ids with paths (no extension)
  packages: [
      {
          name: 'rup',
          location: '../src/',
          main: 'rup.base'
      },
      {
          name: 'jquery.ui.widget',
          location: "../node_modules/jquery-ui/ui/",
          main: 'widget'
      }
      // {
      //     name: 'jquery-ui',
      //     location: "../../node_modules/jquery-ui/ui",
      //      main: 'widget'
      // }
  ],
  paths: {
      'jasmine': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine'],
      'jasmine-html': ['../node_modules/jasmine-core/lib/jasmine-core/jasmine-html'],
      'jasmine-boot': ['../node_modules/jasmine-core/lib/jasmine-core/boot'],
      'jasmine-jquery': ['../node_modules/jasmine-jquery/lib/jasmine-jquery'],
      "jquery": "../node_modules/jquery/dist/jquery",
      "jquery-migrate": "../node_modules/jquery-migrate/dist/jquery-migrate",
      "jquery-ui": "../node_modules/jquery-ui-dist/jquery-ui",
      "handlebars": "../node_modules/handlebars/dist/handlebars",
      "handlebars-i18n": "../js/handlebars-helper-i18n",
      "jquery-json": "../src/core/utils/jquery.json-2.2",
      "blockUI": "../node_modules/block-ui/jquery.blockUI",
      "qtip2": "../node_modules/qtip2/dist/jquery.qtip",

      "specs": "specs"
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    },
    'jasmine-jquery': {
      deps : ['jasmine', 'jquery']
    },
    "jquery-ui":{
      "deps": ["jquery","jquery-migrate"]
    }
  }
});

require(['jasmine-boot'], function () {
  require(['specs'], function(){
    //trigger Jasmine
    window.onload();
  })
});
