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
        plugins: [
            'karma-jasmine',
            'karma-requirejs',
            'karma-firefox-launcher',
            'karma-chrome-launcher',
            'karma-handlebars-preprocessor',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-spec-reporter',
            // 'karma-coverage',
            'karma-html-reporter',
            'karma-jasmine-html-reporter'
        ],
        basePath: '',
        frameworks: ['jasmine'],
        coverageReporter: {
            reporters: [{
                type: 'html',
                subdir: 'html'
            },
            {
                type: 'lcovonly',
                subdir: '.'
            }
            ],
        },
        preprocessors: {
            'test.webpack.js': ['webpack', 'sourcemap'],
        },
        reporters: ['progress', 'spec', 'html'],
        htmlReporter: {
            outputDir: 'spec', // where to put the reports 
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: false, // reports show failures on start
            namedFiles: true, // name files instead of creating sub-directories
            pageTitle: 'Karma Report 4.2.2', // page title for reports; browser info by default
            urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
            reportName: 'karma_report_4.2.2', // report summary filename; browser info by default

            // experimental
            preserveDescribeNesting: false, // folded suites stay folded 
            foldAll: false, // reports start folded (only with preserveDescribeNesting)
        },
        specReporter: {
            maxLogLines: 1, // limit number of lines logged per test
            suppressErrorSummary: false, // do not print error summary
            suppressFailed: true, // do not print information about failed tests
            suppressPassed: true, // do not print information about passed tests
            suppressSkipped: true, // do not print information about skipped tests
            showSpecTiming: true, // print the time elapsed for each spec
            // failFast: true // test would finish with error when a first fail occurs. 
        },
        // list of files / patterns to load in the browser
        files: [{
            pattern: 'spec/rup.config.js'
        },
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
        {
            pattern: 'test.webpack.js',
        },
        ],
        proxies: {
            '/audit': 'http://localhost:8081/audit',
            '/test': 'http://localhost:8081/test',
            '/dist': 'http://localhost:8081/dist',
            '/demo': 'http://localhost:8081/demo',
            '/fonts': 'http://localhost:8081/dist/css/fonts',
            '/images': 'http://localhost:8081/dist/css/images',
            '/x21aAppWar/': '/',
            '/x21aAppWar/patrones/': '/',
            '/externals/icons/': '/dist/css/externals/icons',
            '/x21aResponsive/patrones/': '/dist/css/',
            '/x21aStatics/rup': '/dist'
        },

        // list of files to exclude
        exclude: [],

        webpack: {
            mode: 'none',
            cache: true,
            devtool: 'inline-source-map',
            module: {
                rules: [{
                    test: require.resolve('jquery-migrate'),
                    use: 'imports-loader?define=>false',
                }, {
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
                    loader: 'babel-loader',
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
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                    },
                }, {
                    test: /\.(html)\??.*$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            limit: 1024,
                            name: '[name].[ext]',
                            publicPath: '/rup/html/templates/rup_calendar/',
                            outputPath: 'rup/html/templates/rup_calendar/'
                        }
                    },
                }
                ],
            },
            resolve: {
                modules: ['node_modules', 'src', path.resolve(__dirname, 'src')],
                alias: {
                    'jqueryUI': 'jquery-ui-dist/jquery-ui.js',

                    'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
                    'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
                    'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
                    'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
                    'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',
                }

            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery'
                })
            ],
            devServer: {
                headers: {
                    'Access-Control-Allow-Origin': 'localhost*'
                }
            },
        },

        // web server port
        port: 9877,

        crossOriginAttribute: true,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DISABLE,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['ChromeHeadless'],
        browserDisconnectTolerance: 8,
        browserNoActivityTimeout: 6000000,
        browserDisconnectTimeout: 2000000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        client: {
            clearContext: true,
            jasmine: {
                random: false,
                failFast: false,
                timeoutInterval: 6000
            }
        }
    });
};