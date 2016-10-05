requirejs.config({
    baseUrl: "./app",
    //    map: {
    //        "*": {
    //            "typeahead": '../src/core/typeahead!../../bower_components/typeahead.js/dist/typeahead.jquery'
    //        }
    //    },
    packages: [
        {
            name: 'rup',
            location: '../../src/',
            main: 'rup.base'
        },
        {
            name: 'jquery.ui.widget',
            location: "../../node_modules/jquery-ui/ui/",
            main: 'widget'
        }
    ],
    paths: {
        "jquery": "../../node_modules/jquery/dist/jquery",
        "jquery-migrate": "../../node_modules/jquery-migrate/dist/jquery-migrate",
        "jquery-ui": "../../node_modules/jquery-ui-dist/jquery-ui",
        "backbone": "../../node_modules/backbone/backbone",
        "underscore": "../../node_modules/underscore/underscore",
        "handlebars": "../../node_modules/handlebars/dist/handlebars",
        "handlebars-i18n": "../js/handlebars-helper-i18n",
        "marionette": "../../node_modules/backbone.marionette/lib/backbone.marionette",
        "qtip2": "../../node_modules/qtip2/dist/jquery.qtip",
        "chartjs": "../../node_modules/chart.js/dist/Chart",
        "templates": "../templates",
        "blockUI": "../../node_modules/block-ui/jquery.blockUI",
        "jquery-contextMenu": "../../node_modules/jquery-contextmenu/dist/jquery.contextMenu",
        "jquery.form": "../../node_modules/jquery-form/jquery.form",
        "jquery.validation": "../../node_modules/jquery-validation/dist/jquery.validate",
        "jquery.scrollTo": "../../node_modules/jquery.scrollTo/jquery.scrollTo",

        "jquery.fileupload": "../../node_modules/blueimp-file-upload/js/jquery.fileupload",
        "jquery.fileupload-image": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-image",
        "jquery.fileupload-audio": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-audio",
        "jquery.fileupload-process": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-process",
        "jquery.fileupload-video": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-video",
        "jquery.fileupload-validate": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-validate",
        "jquery.fileupload-ui": "../../node_modules/blueimp-file-upload/js/jquery.fileupload-ui",
        "jquery.xdr-transport": "../../node_modules/blueimp-file-upload/js/cors/jquery.xdr-transport",
        "jquery.ui.widget": "../../node_modules/jquery-ui/ui/widget",
        "tmpl": "../../node_modules/blueimp-tmpl/js/tmpl",
        "load-image": "../../node_modules/blueimp-load-image/js/load-image",
        "load-image-meta": "../../node_modules/blueimp-load-image/js/load-image-meta",
        "load-image-exif": "../../node_modules/blueimp-load-image/js/load-image-exif",
        "canvas-to-blob": "../../node_modules/blueimp-canvas-to-blob/js/canvas-to-blob",

        //"rup/min": "../../dist/rup.min-2.4.7",
        "rup/compatibility": "../../src/rup.compatibility",
        "rup/base": "../../src/rup.base",
        "rup/utils": "../../src/rup.utils",
        "rup/lang": "../../src/rup.lang",
        //"rup/tooltip": "../../src/rup.tooltip",
        "rup/menu": "../../src/rup.menu",
        "rup/navMenu": "../../src/rup.navMenu",
        //"rup/feedback": "../../src/rup.feedback",
        "rup/accordion": "../../src/rup.accordion",
        // "rup/message": "../../src/rup.message",
        "rup/dialog": "../../src/rup.dialog",
        //"rup/contextMenu": "../../src/rup.contextMenu",
        //"rup/toolbar": "../../src/rup.toolbar",
        // "rup/button": "../../src/rup.button",
        //"rup/accordion": "../../src/rup.accordion",
        //"rup/tabs": "../../src/rup.tabs",
        //"rup/autocomplete": "../../src/rup.autocomplete",
        //"rup/combo": "../../src/rup.combo",
        "rup/date": "../../src/rup.date",
        "rup/time": "../../src/rup.time",
        "rup/form": "../../src/rup.form",
        // "rup/validate": "../../src/rup.validate",
        // "rup/upload": "../../src/rup.upload",
        "rup/report": "../../src/rup.report",
        "rup/chart": "../../src/rup.chart",


        //Table

        "rup/table": "../../src/rup.table",
        //"rup/table.core": "../rup.table.core-private",

        // menuDeps
        // "jquery-1.7": "../../src/core/jquery-1.7.2",
        "jquery.ui.autocomplete": "../../src/core/ui/jquery.ui.autocomplete",
        //"jquery.ui.selectmenu": "../../src/core/ui/jquery.ui.selectmenu",
        //"jquery.multiselect": "../../src/core/ui/jquery.multiselect",
        "jquery-json": "../../src/core/utils/jquery.json-2.2",
        "jquery-ui-timepicker": "../../src/core/ui/jquery-ui.timepicker",
        "jquery-ui-rcarousel": "../../src/core/jquery.ui.rcarousel",
        "jquery-ui-multidatespicker": "../../src/core/ui/jquery-ui.multidatespicker",

        // "private-jquery": "../jquery-private",
        // "private-jqueryui-core-menu":"../../src/core/ui/menu/jquery.ui.core.menu",
        // "private-jqueryui-widget-menu":"../../src/core/ui/menu/jquery.ui.widget.menu",
        // "private-jqueryui-position-menu":"../../src/core/ui/menu/jquery.ui.position.menu",
        // "private-jqueryui-menu":"../../src/core/ui/menu/jquery.ui.menu",

        // "jquery.validate": "../../src/core/utils/jquery.validate",

        // Table deps
        "jqGrid": "../../src/core/jqGrid/jquery.jqGrid.src",
        "jqGrid.fluid": "../../src/core/jqGrid/jqGrid.fluid",
        "jqGrid.rup.table": "../../src/core/jqgrid/jqGrid.rup.table",
        // legacy
        //"blockUI": "../../src/core/utils/jquery.blockUI",

        "form2object": "../../src/core/utils/form2object",
        //graficos
        "chartjs": "../../node_modules/chart.js/dist/Chart",
    },
    shim: {
        "jquery-ui": {
            "deps": ["jquery", "jquery-migrate"],
        },
        "rup/compatibility": {
            "deps": ["rup/base"],
        },
        "rup/navMenu": {
            "deps": ["jquery-ui-rcarousel", "rup/base"],
        },
        "rup/chart": {
            "deps": ["rup/base", "chartjs"],
        },
        // "rup/base":{
        //   "deps": ["rup/utils"],
        //   "exports":"widgetMenu"
        // },
        // "rup/utils":{
        //   "deps": ["jquery-ui","jquery-json"]
        // },
        // "rup/lang":{
        //   "deps": ["rup/base", "rup/tooltip"]
        // },
        // "rup/tooltip":{
        //   "deps": ["rup/base","qtip2"]
        // },
        // "rup/menu":{
        //   "deps": ["rup/base","rup/compatibility"]
        // },
        // "rup/feedback":{
        //   "deps": ["rup/base"]
        // },
        // "rup/accordion":{
        //   "deps": ["rup/base"]
        // },
        // "rup/message":{
        //   "deps": ["rup/base"]
        // },
        // "rup/dialog":{
        //   "deps": ["rup/base", "blockUI"]
        // },
        // "rup/contextMenu":{
        //   "deps": ["rup/base", "jQuery-contextMenu"]
        // },
        // "rup/toolbar":{
        //   "deps": ["rup/base", "rup/button"]
        // },
        // "rup/button":{
        //   "deps": ["rup/base","rup/dialog"]
        // },
        // "rup/accordion":{
        //   "deps": ["rup/base"]
        // },
        // "rup/tabs":{
        //   "deps": ["rup/base"]
        // },
        // "rup/autocomplete":{
        //   "deps": ["rup/base","jquery.ui.autocomplete"]
        // },
        // "rup/combo":{
        //   "deps": ["rup/base","jquery.multiselect"]
        // },
        "rup/date": {
            "deps": ["rup/base", "jquery-ui-multidatespicker", "jquery-ui-timepicker"]
        },
        "rup/time": {
            "deps": ["rup/base"]
        },
        // "rup/form":{
        //   "deps": ["rup/base","jquery.form","rup/validate"]
        // },
        // "rup/validate":{
        //   "deps": ["rup/base","jquery.validate"]
        // },
        "rup/upload": {
            "deps": ["rup/base", "jquery.fileupload-ui", "jquery.fileupload"]
        },
        "rup/report": {
            "deps": ["rup/base"]
        },
        "jqGrid": {
            "deps": ["jquery"]
        },
        "jqGrid.fluid": {
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
        "rup/table": {
            "deps": ["rup/base", "rup/report", "form2object"]
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
        "handlebars-i18n": {
            "deps": ["handlebars"]
        },
        "templates": {
            "deps": ["handlebars-i18n"]

        },

        // // legacy
        // "blockUI":{
        //   "deps": ["jquery"]
        // },
        // "jQuery-contextMenu":{
        //   "deps": ["jquery"]
        // },
        "jquery.ui.autocomplete": {
            "deps": ["jquery-ui"]
        },
        // "jquery.ui.selectmenu":{
        //   "deps": ["jquery-ui"]
        // },
        // "jquery.multiselect":{
        //   "deps": ["jquery-ui"]
        // },
        "jquery-json": {
            "deps": ["jquery"]
        },
        "jquery-ui-multidatespicker": {
            "deps": ["jquery-ui"]
        },
        "jquery-ui-rcarousel": {
            "deps": ["jquery-ui"]
        },
        "jquery-ui-timepicker": {
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
        }
        // "jquery.form":{
        //   "deps": ["jquery"]
        // }
        // "jquery.validate":{
        //   "deps": ["jquery"]
        // }
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

require(["app"], function (Escritorio) {
    Escritorio.start();
});
