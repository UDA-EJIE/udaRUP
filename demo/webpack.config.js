/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createBackendServer = require('../backend.js');
createBackendServer(8081);

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: path.resolve(__dirname, 'app/main-bt4.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'demo/js/[name].js',
        chunkFilename: 'demo/js/[name].js'
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty'
    },
    devServer: {
        port: 8080,
        proxy: [{
            context: '/audit',
            target: 'http://localhost:8081/'
        }, {
            context: '/demo/rup/resources',
            target: 'http://localhost:8080/',
            pathRewrite: {
                '/demo/rup/resources': '/i18n'
            }
        }, {
            context: ['/demo', '/demo/api'],
            target: 'http://localhost:8081/',
            pathRewrite: {
                '/demo/api': '/demo'
            }
        }],
        open: true,
        progress: true,
        openPage: 'webpack-dev-server/demo/'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Tether: 'tether',
            Popper: ['popper.js', 'default'],
        }),

        new HtmlWebpackPlugin({
            template: './demo/index.html',
            inject: 'body',
            hash: false,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],

    module: {
        rules: [
            {
                test: require.resolve('jquery-migrate'),
                use: 'imports-loader?define=>false',
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                query: {
                    knownHelpers: ['i18n'],
                    helperDirs: [
                        path.join(__dirname, '../src/helper'),

                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader' // creates style nodes from JS strings
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS 
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                }, {
                    loader: 'sass-loader',
                    options: {}
                }]
            }, {
                test: /\.png$|\.gif$|\.cur$|\.svg$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: '/'
                    }
                }]
            }, {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                use: [{
                    loader: 'url-loader'
                }]
            }, {
                test: /\.html$/,
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
        ]
    },
    resolve: {

        modules: ['node_modules', path.resolve(__dirname, 'app'), 'src'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js',
            'marionette': 'backbone.marionette/lib/backbone.marionette.js',
            'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
            'jquery-ui': 'jquery-ui/ui/',
            'jqueryUI': 'jquery-ui-dist/jquery-ui.js',
            'jquery.fileupload': 'blueimp-file-upload/js/jquery.fileupload.js',
            'jquery.fileupload-ui': 'blueimp-file-upload/js/jquery.fileupload-ui.js',
            'jquery.fileupload-jquery-ui': 'blueimp-file-upload/js/jquery.fileupload-jquery-ui.js',
            'jquery.fileupload-process': 'blueimp-file-upload/js/jquery.fileupload-process.js',
            'jquery.fileupload-image': 'blueimp-file-upload/js/jquery.fileupload-image.js',
            'jquery.fileupload-audio': 'blueimp-file-upload/js/jquery.fileupload-audio.js',
            'jquery.fileupload-video': 'blueimp-file-upload/js/jquery.fileupload-video.js',
            'jquery.fileupload-validate': 'blueimp-file-upload/js/jquery.fileupload-validate.js',
            'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
            'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
            'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
            'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
            'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',
            'jquery-form': 'jquery-form/jquery.form.js',
            'jquery.validate.additional': 'jquery-validation/dist/additional-methods.js',
            'jquery.ui.widget': 'jquery-ui/widget.js',
            'tmpl': 'blueimp-tmpl/js/tmpl.js',
            'tether': 'tether/dist/js/tether.js',
            'popper': 'popper.js/dist/umd/popper.js',
            'calendar': 'bootstrap-calendar',
            'material-icons': '@mdi/font/fonts/',

            // CSS ROUTES
            './images': path.join(__dirname, '../assets/images'),
            '../images': path.join(__dirname, '../demo/images'),
            './cursors': path.join(__dirname, '../assets/cursors'),
            '../css/images/table': path.join(__dirname, '/images'),
            './externals/icons': '@mdi/font/fonts',
            './fonts': path.join(__dirname, '../assets/fonts'),
        }

    }
};