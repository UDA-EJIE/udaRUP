// Karma configuration
// Generated on Tue Jul 12 2016 09:00:48 GMT+0200 (Hora de verano romance)
//var path = require('path');
//


module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','requirejs'],
    //frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

      //'node_modules/jasmine/lib/jasmine.js',
      //'node_modules/karma-jasmine/lib/index.js',
      //'node_modules/karma-firefox-launcher/index.js',
//      'node_modules/underscore/underscore.js',
  //    'node_modules/requirejs/require.js',
      //'node_modules/karma-requirejs/lib/index.js',
      //'bower_components/handlebars/handlebars.js',

    //  'node_modules/requirejs/require.js',

    //  { pattern: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.js', included: false},
      { pattern: 'spec/helpers/rup.karma.config.js'},
      //{ pattern: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.js'},
      //{ pattern: 'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js'},
      //{ pattern: 'node_modules/jasmine-core/lib/jasmine-core/boot.js'},
      { pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', included: false},
      { pattern: "node_modules/jquery/dist/jquery.js", included: false},
      { pattern: "node_modules/jquery-migrate/dist/jquery-migrate.js", included: false},
      { pattern: "node_modules/jquery-ui-dist/jquery-ui.js", included: false},
      { pattern: 'i18n/*.json', watched: false, included: false, served: true, nocache: false},
      { pattern: 'demo/x21a/resources/*.json', watched: true, served: true, included: false},
      { pattern: "node_modules/handlebars/dist/handlebars.js", included: false },
      { pattern: "src/helper/handlebars-helper-i18n.js", included: false },
      //{ pattern: "src/core/utils/jquery.json-2.2.js", included: false },
      { pattern: "node_modules/block-ui/jquery.blockUI.js", included: false },
      { pattern: "node_modules/qtip2/dist/jquery.qtip.js", included: false },
      { pattern: 'src/**/*.js', included: false},

      'spec/karma-main.js',
      //{ pattern: 'spec/karma-specs.js', included: false },
      { pattern: 'spec/**/rup*spec.js', included: false }

    ],
    proxies: {
      "/i18n/resources/": "/base/i18n/",
      "/demo/x21a/resources/": "/base/demo/x21a/resources/"
    },


    // list of files to exclude
    exclude: [
    ],

    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-handlebars-preprocessor'
    //  'karma-ie-launcher',
    //  'karma-htmlfile-reporter',
    //  'karma-mocha-reporter'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //   'test/**/*.hbs': ['handlebars']
    //
    // },
    // handlebarsPreprocessor: {
    //   // name of the variable to store the templates hash
    //   templates: "Handlebars.templates",
    //   amd:true,
    // //  amd:true,
    //
    //
    //   // translates original file path to template name
    //   templateName: function(filepath) {
    //     return filepath.replace(/^.*\/([^\/]+)\.hbs$/, '$1');
    //   },
    //
    //   // transforms original file path to path of the processed file
    //   transformPath: function(path) {
    //     return path.replace(/\.hbs$/, '.js');
    //   }
    // },

//http://localhost:9876/base/test/accordion/rup.accordion.js
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    //reporters: ['mocha', 'html'],
    // htmlReporter: {
    //   outputDir: 'karma_html', // where to put the reports
    //   templatePath: null, // set if you moved jasmine_template.html
    //   focusOnFailures: true, // reports show failures on start
    //   namedFiles: false, // name files instead of creating sub-directories
    //   pageTitle: null, // page title for reports; browser info by default
    //   urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
    //   reportName: 'report-summary-filename', // report summary filename; browser info by default
    //
    //
    //   // experimental
    //   preserveDescribeNesting: false, // folded suites stay folded
    //   foldAll: false, // reports start folded (only with preserveDescribeNesting)
    // },
    // htmlReporter: {
    //   outputFile: 'test/test_results.html',
    //
    //   // Optional
    //   pageTitle: 'Unit Tests',
    //   subPageTitle: 'A sample project description',
  	//   groupSuites: true,
  	//   useCompactStyle: true,
    //   useLegacyStyle: false
    // },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    //browsers: ['Chrome'],
  // browserNoActivityTimeout:30000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
