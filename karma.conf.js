// Karma configuration
// Generated on Tue Jul 12 2016 09:00:48 GMT+0200 (Hora de verano romance)
//var path = require('path');
//
var path = require('path');
const webpack = require('webpack');

const createBackendServer = require('./backend.js');
createBackendServer(8081);

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],
        //frameworks: ['jasmine'],
        coverageReporter: {
            reporters: [{
                    type: 'html',
                    subdir: 'html'
                },
                {
                    type: 'lcovonly',
                    subdir: '.'
                },
            ],
        },
        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress', 'spec', 'coverage', 'html'],
        // htmlReporter configuration
        htmlReporter: {
            outputDir: 'spec', // where to put the reports 
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: false, // reports show failures on start
            namedFiles: true, // name files instead of creating sub-directories
            pageTitle: 'Karma Report 3.5.0', // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'karma_report_3.5.0', // report summary filename; browser info by default

            // experimental
            preserveDescribeNesting: false, // folded suites stay folded 
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },
        // list of files / patterns to load in the browser
        files: [{
                pattern: 'spec/helpers/rup.config.js'
            },

            //'node_modules/jasmine/lib/jasmine.js',
            //'node_modules/karma-jasmine/lib/index.js',
            //'node_modules/karma-firefox-launcher/index.js',
            //      'node_modules/underscore/underscore.js',
            //    'node_modules/requirejs/require.js',
            //'node_modules/karma-requirejs/lib/index.js',
            //'bower_components/handlebars/handlebars.js',

            //  'node_modules/requirejs/require.js',

            //  { pattern: 'node_modules/jasmine-core/lib/jasmine-core/jasmine.js', included: false},








            //
            // { pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', included: false},
            // { pattern: 'node_modules/jquery/dist/jquery.js', included: false},
            // { pattern: 'node_modules/jquery-migrate/dist/jquery-migrate.js', included: false},
            // { pattern: 'node_modules/jquery-ui-dist/jquery-ui.js', included: false},
            {
                pattern: 'i18n/*.json',
                watched: false,
                included: false,
                served: true,
                nocache: false
            },
            {
                pattern: 'demo/x21a/resources/*.json',
                watched: true,
                served: true,
                included: false
            },
            // { pattern: 'node_modules/handlebars/dist/handlebars.js', included: false },
            // { pattern: 'src/helper/handlebars-helper-i18n.js', included: false },
            //
            // { pattern: 'node_modules/block-ui/jquery.blockUI.js', included: false },
            // { pattern: 'node_modules/qtip2/dist/jquery.qtip.js', included: false },
            // { pattern: 'src/**/*.js', included: false},
            //
            // 'spec/karma-main.js',
            //
            // { pattern: 'spec/**/*spec.js', included: false },
            {
                pattern: 'test.webpack.js'
            },


        ],
        proxies: {
            '/dist/resources/': '/base/i18n/',
            '/demo/x21a/resources/': '/base/demo/x21a/resources/'
        },


        // list of files to exclude
        exclude: [],

        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-handlebars-preprocessor',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            'karma-coverage',
            'karma-html-reporter'
            //  'karma-ie-launcher',
            //  'karma-mocha-reporter'
        ],

        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                // preLoaders: [
                // 	{
                // 		test: /-spec\.js$/,
                // 		include: /spec/,
                // 		exclude: /(bower_components|node_modules)/,
                // 		loader: 'babel',
                // 		query: {
                // 			cacheDirectory: true,
                // 		},
                // 	}
                // {
                // 	test: /\.js?$/,
                // 	include: /src/,
                // 	exclude: /(node_modules|bower_components|__tests__)/,
                // 	loader: 'babel-istanbul',
                // 	query: {
                // 		cacheDirectory: true,
                // 	},
                // },
                // ],
                loaders: [{
                        test: /spec\.js$/,
                        enforce: 'pre',
                        exclude: /(bower_components|node_modules)/,
                        include: path.resolve(__dirname, 'spec'),
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.json$/,
                        enforce: 'pre',
                        exclude: /(bower_components|node_modules)/,
                        include: path.resolve(__dirname, 'spec'),
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /\.js?$/,
                        include: /src/,
                        enforce: 'pre',
                        exclude: /(node_modules|bower_components|spec)/,
                        loader: 'babel-istanbul-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        test: /spec\.js$/,
                        include: path.resolve(__dirname, 'spec'),
                        exclude: /(bower_components|node_modules|__tests__)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    }, {
                        test: /\.js?$/,
                        enforce: 'pre',
                        include: path.resolve(__dirname, 'spec/common'),
                        loader: 'babel-istanbul-loader',
                        query: {
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            resolve: {
                modules: ['node_modules', 'src', path.resolve(__dirname, 'app')],
                alias: {

                    'handlebars': 'handlebars/dist/handlebars.js',
                    'marionette': 'backbone.marionette/lib/backbone.marionette.js',
                    'jquery': 'jquery/dist/jquery.js',
                    'jquery-ui': 'jquery-ui/ui/',
                    'jqueryUI': 'jquery-ui-dist/jquery-ui.js',
                    'highlight': 'highlight.js/lib/highlight.js',
                    'jquery.fileupload': 'blueimp-file-upload/js/jquery.fileupload.js',
                    'jquery.fileupload-ui': 'blueimp-file-upload/js/jquery.fileupload-ui.js',
                    'jquery.fileupload-jquery-ui': 'blueimp-file-upload/js/jquery.fileupload-jquery-ui.js',
                    'jquery.fileupload-process': 'blueimp-file-upload/js/jquery.fileupload-process.js',
                    'jquery.fileupload-image': 'blueimp-file-upload/js/jquery.fileupload-image.js',
                    'jquery.fileupload-audio': 'blueimp-file-upload/js/jquery.fileupload-audio.js',
                    'jquery.fileupload-video': 'blueimp-file-upload/js/jquery.fileupload-video.js',
                    'jquery.fileupload-validate': 'blueimp-file-upload/js/jquery.fileupload-validate.js',
                    'load-image': 'blueimp-load-image/js/load-image.js',
                    'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
                    'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
                    'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',
                    'jquery.scrollTo': 'jquery.scrollto/jquery.scrollTo.js',
                    'jquery-contextMenu': 'jquery-contextmenu/dist/jquery.contextMenu.js',
                    'jquery-ui-timepicker': 'src/core/ui/jquery-ui.timepicker.js',
                    'jquery-ui-multidatespicker': 'src/core/ui/jquery-ui.multidatespicker.js',
                    'jquery.form': 'jquery-form/jquery.form.js',
                    'jquery.validate': 'jquery-validation/dist/jquery.validate.js',
                    'jquery.validate.additional': 'jquery-validation/dist/additional-methods.js',
                    'chartjs': 'chart.js/dist/Chart.js',
                    'jquery-jstree': 'src/core/utils/jquery.jstree.js',
                    'jquery-hotkeys': 'src/core/utils/jquery.hotkeys.js',
                    'form2object': 'src/core/utils/form2object.js',
                    'jquery.fileDownload': 'src/core/utils/jquery.fileDownload.js',
                    'jquery.ui.widget': 'jquery-ui/widget.js',
                    'tmpl': 'blueimp-tmpl/js/tmpl.js',

                    'bt4': path.resolve(__dirname, '../dist/js/externals/bt4.min.js'),

                    'templates': path.resolve(__dirname, 'templates.js')
                }

            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                })
            ],
        },


        // web server port
        port: 9877,


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
        // browsers: ['Chrome'],
        browserNoActivityTimeout: 300000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
