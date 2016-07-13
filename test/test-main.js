var TEST_REGEXP = /(spec|test)\.js$/i;
var allTestFiles = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});


require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',
  //waitSeconds: 200,
  // example of using a couple of path translations (paths), to allow us to refer to different library dependencies, without using relative paths
  paths: {
      "app":"./test/js/rup.config2",
      "rup_config":"./test/js/rup.config",
      "jquery": "./bower_components/jquery/jquery",
      "jquery-ui": "./bower_components/jquery-ui/jquery-ui",
      "backbone": "./bower_components/backbone/backbone",
      "underscore": "./bower_components/underscore/underscore",
      "handlebars": "./bower_components/handlebars/handlebars",
      "handlebars-i18n": "../js/handlebars-helper-i18n",
      "marionette": "./bower_components/backbone.marionette/lib/backbone.marionette",
      "qtip2": "./bower_components/qtip2/jquery.qtip",
      "templates": "../templates",
      "rup/compatibility": "./src/rup.compatibility",
      "rup/base": "./src/rup.base",
      "rup/utils": "./src/rup.utils",
      "rup/lang": "./src/rup.lang",
      "rup/tooltip": "./src/rup.tooltip",
      "rup/menu": "./src/rup.menu",
      "rup/feedback": "./src/rup.feedback",
      "rup/accordion": "./src/rup.accordion",
      "rup/message": "./src/rup.message",
      "rup/dialog": "./src/rup.dialog",
      "rup/contextMenu": "./src/rup.contextMenu",
      "rup/toolbar": "./src/rup.toolbar",
      "rup/button": "./src/rup.button",
      "rup/accordion": "./src/rup.accordion",
      "rup/tabs": "./src/rup.tabs",
      "rup/autocomplete": "./src/rup.autocomplete",
      "rup/combo": "./src/rup.combo",
      "rup/date": "./src/rup.date",
      "rup/time": "./src/rup.time",
      "rup/form": "./src/rup.form",
      "rup/validate": "./src/rup.validate",
      "rup/upload": "./src/rup.upload",
      "rup/report": "./src/rup.report",

      //Table

      "rup/table": "./src/rup.table",
      //"rup/table.core": "../rup.table.core-private",

      // menuDeps
      "jquery-1.7": "./src/core/jquery-1.7.2",
      "jquery.ui.autocomplete": "./src/core/ui/jquery.ui.autocomplete",
      "jquery.ui.selectmenu": "./src/core/ui/jquery.ui.selectmenu",
      "jquery.multiselect": "./src/core/ui/jquery.multiselect",
      "jquery-json": "./src/core/utils/jquery.json-2.2",
      "jquery-ui-timepicker": "./src/core/ui/jquery-ui.timepicker",
      "jquery-ui-multidatespicker": "./src/core/ui/jquery-ui.multidatespicker",
      "private-jquery": "./demo/jquery-private",
      "private-jqueryui-core-menu":"./src/core/ui/menu/jquery.ui.core.menu",
      "private-jqueryui-widget-menu":"./src/core/ui/menu/jquery.ui.widget.menu",
      "private-jqueryui-position-menu":"./src/core/ui/menu/jquery.ui.position.menu",
      "private-jqueryui-menu":"./src/core/ui/menu/jquery.ui.menu",
      "jquery.form": "./src/core/utils/jquery.form",
      "jquery.validate": "./src/core/utils/jquery.validate",
      "jquery.fileupload": "./src/core/utils/jquery.fileupload",
      "jquery.fileupload-ui": "./src/core/utils/jquery.fileupload-ui",
      "jquery.xdr-transport": "./src/core/utils/jquery.xdr-transport",
      // Table deps
      "jqGrid": "./src/core/jqGrid/jquery.jqGrid.src",
      "jqGrid.fluid": "./src/core/jqGrid/jqGrid.fluid",
      "jqGrid.rup.table": "./src/core/jqgrid/jqGrid.rup.table",
      // legacy
      "blockUI": "./src/core/utils/jquery.blockUI",
      "jQuery-contextMenu": "./src/core/utils/jquery.contextMenu",
      "form2object": "./src/core/utils/form2object"


  },
  shim : {
    'underscore': {
        exports: '_'
    },
    "jquery-ui":{
      "deps": ["jquery"],
    },
    "rup/compatibility":{
      "deps": ["rup/base"],
    },
    "rup/base":{
      "deps": ["app"],
      "exports":"widgetMenu"
    },
    "rup/utils":{
      "deps": ["jquery-ui","jquery-json"]
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
      "deps": ["rup/base","rup/tooltip"]
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
      "deps": ["rup/base","rup/dialog"]
    },
    "rup/accordion":{
      "deps": ["rup/base"]
    },
    "rup/tabs":{
      "deps": ["rup/base"]
    },
    "rup/autocomplete":{
      "deps": ["rup/base","jquery.ui.autocomplete"]
    },
    "rup/combo":{
      "deps": ["rup/base","jquery.multiselect"]
    },
    "rup/date":{
      "deps": ["rup/base", "jquery-ui-multidatespicker","jquery-ui-timepicker"]
    },
    "rup/time":{
      "deps": ["rup/base"]
    },
    "rup/form":{
      "deps": ["rup/base","jquery.form","rup/validate"]
    },
    "rup/validate":{
      "deps": ["rup/base","jquery.validate"]
    },
    "rup/upload":{
      "deps": ["rup/base","jquery.fileupload-ui","jquery.fileupload"]
    },
    "rup/report":{
      "deps": ["rup/base"]
    },
    "jqGrid":{
      "deps": ["jquery"]
    },
    "jqGrid.fluid":{
      "deps": ["jqGrid"]
    },
    // "jqGrid": "../../src/jqgrid/jquery.jqGrid.src",
    // "jqGrid.fluid": "../../src/jqgrid/jqGrid.fluid",
    // "jqGrid.rup.table": "../../src/jqgrid/jqGrid.rup.table",
    //
    // "rup/table": "../rup.table.core",
    // "rup/table.contextMenu": "../rup.table.contextMenu",
    // "rup/table.feedback": "../rup.table.feedback",
    // "rup/table.filter": "../rup.table.filter",
    // "rup/table.fluid": "../rup.table.fluid",
    // "rup/table.formEdit": "../rup.table.formEdit",
    // "rup/table.inlineEdit": "../rup.table.inlineEdit",
    // "rup/table.jerarquia": "../rup.table.jerarquia",
    // "rup/table.masterDetail": "../rup.table.masterDetail",
    // "rup/table.multifilter": "../rup.table.multifilter",
    // "rup/table.multiselection": "../rup.table.multiselection",
    // "rup/table.core.base": {
    //   "deps": [ "rup/base","form2object"]
    // },
    "rup/table":{
          "deps": ["rup/base","rup/report","form2object"]
    },

    "rup/table.core": {
      "deps": ["private-jqGrid"]
    },
    "rup/table.report": {
      "deps": ["rup/table.core", "rup/report"]
    },
    "rup/table.contextMenu": {
      "deps": ["rup/table.core"]
    },
    "rup/table.feedback": {
      "deps": ["rup/table.core"]
    },
    "rup/table.filter": {
      "deps": ["rup/table.core"]
    },
    "rup/table.fluid": {
      "deps": ["rup/table.core", "jqGrid.fluid"]
    },
    "rup/table.formEdit": {
      "deps": ["rup/table.core"]
    },
    "rup/table.inlineEdit": {
      "deps": ["rup/table.core"]
    },
    "rup/table.jerarquia": {
      "deps": ["rup/table.core"]
    },
    "rup/table.masterDetail": {
      "deps": ["rup/table.core"]
    },
    "rup/table.multifilter": {
      "deps": ["rup/table.core"]
    },
    "rup/table.multiselection": {
      "deps": ["rup/table.core"]
    },
    "rup/table.toolbar": {
      "deps": ["rup/table.core"]
    },
    "rup/table.search": {
      "deps": ["rup/table.core"]
    },
    // "rup/table.search": "../rup.table.search",
    // "rup/table.toolbar": "../rup.table.toolbar",

    // more...
    "handlebars-i18n":{
      "deps": ["handlebars"]
    },
    "templates":{
      "deps": ["handlebars-i18n"]

    },

    // legacy
    "blockUI":{
      "deps": ["jquery"]
    },
    "jQuery-contextMenu":{
      "deps": ["jquery"]
    },
    "jquery.ui.autocomplete":{
      "deps": ["jquery-ui"]
    },
    "jquery.ui.selectmenu":{
      "deps": ["jquery-ui"]
    },
    "jquery.multiselect":{
      "deps": ["jquery.ui.selectmenu"]
    },
    "jquery-json":{
      "deps": ["jquery"]
    },
    "jquery-ui-multidatespicker":{
      "deps": ["jquery-ui"]
    },
    "jquery-ui-timepicker":{
      "deps": ["jquery-ui"]
    },
    "jquery.fileupload": {
      "deps": ["jquery-ui"]
    },
    "jquery.fileupload-ui": {
      "deps": ["jquery.fileupload"]
    },
    "jquery.xdr-transport": {
      "deps": ["jquery.fileupload"]
    },
    "jquery.form":{
      "deps": ["jquery"]
    },
    "jquery.validate":{
      "deps": ["jquery"]
    }
  },

  logLevel: require.config.LOG_INFO,

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
