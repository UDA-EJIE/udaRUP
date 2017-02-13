// Requirejs Configuration Options
require.config({
  // to set the default folder
  baseUrl: '../../',
  packages: [
      {
          name: 'rup',
          location: './src/',
          main: 'rup.base'
      }

  ],
  // paths: maps ids with paths (no extension)
  paths: {
      'jasmine': ['./node_modules/jasmine-core/lib/jasmine-core/jasmine'],
      'jasmine-html': ['./node_modules/jasmine-core/lib/jasmine-core/jasmine-html'],
      'jasmine-boot': ['./node_modules/jasmine-core/lib/jasmine-core/boot'],
      "jasmine-jquery": "./node_modules/jasmine-jquery/lib/jasmine-jquery",
      "jquery": "./node_modules/jquery/dist/jquery",
      "jquery-migrate": "./node_modules/jquery-migrate/dist/jquery-migrate",

      "jquery-ui": "./node_modules/jquery-ui-dist/jquery-ui",
      "jquery-json": "./src/core/utils/jquery.json-2.2",
      "blockUI": "./node_modules/block-ui/jquery.blockUI",

      "handlebars": "./node_modules/handlebars/dist/handlebars",

      "marionette": "./node_modules/backbone.marionette/lib/backbone.marionette",
      "chartjs": "./node_modules/chart.js/dist/Chart",
      "qtip2": "./node_modules/qtip2/dist/jquery.qtip",
      "tether": "./node_modules/tether/dist/js/tether",



      "config": "./test/js/rup.config"
  },
  // shim: makes external libraries compatible with requirejs (AMD)
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html','jasmine-jquery']
    },
    "jquery-migrate":{
      "deps": ["jquery"],
    },
    "jquery-ui":{
      "deps": ["jquery","jquery-migrate"],
    }
  }
});

// require(['jasmine-boot'], function () {
//   require(['./test/src/my-library.specs.require'], function(){
//     //trigger Jasmine
//     window.onload();
//   })
// });

require(['jasmine-boot'], function () {
  require([
    'test/utils/rup.utils.spec',
    'test/dialog/rup.dialog.spec',
    'test/feedback/rup.feedback.spec'
  ], function(){
    //trigger Jasmine
    window.onload();
  })
});
