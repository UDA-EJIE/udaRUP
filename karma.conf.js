// Karma configuration
// Generated on Tue Jul 12 2016 09:00:48 GMT+0200 (Hora de verano romance)
//var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine','requirejs'],


    // list of files / patterns to load in the browser
    files: [

      //'node_modules/jasmine/lib/jasmine.js',
      //'node_modules/karma-jasmine/lib/index.js',
      //'node_modules/karma-firefox-launcher/index.js',
//      'node_modules/underscore/underscore.js',
  //    'node_modules/requirejs/require.js',
      //'node_modules/karma-requirejs/lib/index.js',
      //'bower_components/handlebars/handlebars.js',
      'bower_components/jquery/jquery.js',
      'bower_components/jquery-ui/jquery-ui.js',
      {pattern: 'bower_components/qtip2/jquery.qtip.js', included: false},
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'test/test-main.js',
      'test/js/rup.config.js',
      {pattern: 'node_modules/handlebars/dist/handlebars.js', included: false},
      {pattern: 'i18n/*.json', watched: true, served: true, included: false},
      {pattern: 'demo/x21a/resources/*.json', watched: true, served: true, included: false},
      {pattern: 'src/**/*.js', included: false},
      //{pattern: 'test/**/*.template.hbs', included: false, served:true},
      //{pattern: 'test/**/*.template.js',included: false, served:true},
      {pattern: 'test/js/rup.config.js', included: false},
      {pattern: 'test/js/rup.config2.js', included: false},
      // {pattern: 'test/test/*.spec.js', included: false},
      {pattern: 'test/accordion/*.spec.js', included: false},
      {pattern: 'test/autocomplete/*.spec.js', included: false},
      {pattern: 'test/feedback/*.spec.js', included: false},
      {pattern: 'test/utils/*.spec.js', included: false},
      //{pattern: 'test/dialog/*.spec.js', included: false},
      {pattern: 'test/message/*.spec.js', included: false}
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
      'karma-handlebars-preprocessor',
      'karma-ie-launcher',
      'karma-htmlfile-reporter',
      'karma-mocha-reporter'
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
    reporters: ['mocha', 'html'],
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
    htmlReporter: {
      outputFile: 'test/test_results.html',

      // Optional
      pageTitle: 'Unit Tests',
      subPageTitle: 'A sample project description',
  	  groupSuites: true,
  	  useCompactStyle: true,
      useLegacyStyle: false
    },


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


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
