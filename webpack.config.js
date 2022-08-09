/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'rup';

let mode, outputFileJS, outputFileCSS, optimization;

if (env === 'build') {
    mode = 'production';
    outputFileJS = libraryName + '.min.js';
    outputFileCSS = libraryName + '.min.css';
    optimization = {
        minimizer: [
            new TerserPlugin({
                // https://github.com/terser/terser#minify-options
                terserOptions: {
                    ecma: 6,
                    enclose: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: null,
                    sourceMap: false,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                },
            }),
            new CssMinimizerPlugin({
            	test: /\.css$/,
                minimizerOptions: {
                	preset: [
                		'default',
                		{
                			discardComments: { removeAll: true },
                		},
                	],
                },
            }),
        ],
    };
} else {
    mode = 'development';
    outputFileJS = libraryName + '.js';
    outputFileCSS = libraryName + '.css';
    optimization = {};
}

let plugins = [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new MiniCssExtractPlugin({
        filename: 'css/' + outputFileCSS,
        chunkFilename: 'css/' + outputFileCSS
    }),
];

module.exports = [{
    mode: mode,
    entry: ['@babel/polyfill', __dirname + '/src/index.js'],
    devtool: 'eval',
    output: {
        filename: 'js/' + outputFileJS,
        library: libraryName,
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist/')
    },
    optimization: optimization,
    module: {
        rules: [{
            test: require.resolve('jquery-migrate'),
            use: [
            	{
            		loader: 'imports-loader',
            		options: {
            			// Disable AMD for misbehaving libraries
            			additionalCode: 'var define = false;'
            		}
            	}
            ]
        }, {
            test: /\.js$/,
            // exclude: '/node_modules/',
            // include: '/src/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        {
            test: /\.hbs$/,
            use: {
                loader: 'handlebars-loader',
                options: {
                    helperDirs: [
                        __dirname + '/src/helper'
                    ]
                }
            }
        },
        {
            test: /\.(scss)$/,
            use: [
            	{
            		loader: MiniCssExtractPlugin.loader
            	},
            	{
            		loader: 'style-loader'
            	},
            	{
            		loader: 'css-loader'
            	},
            	{
                    loader: 'postcss-loader',
                    options: {
                    	postcssOptions: {
                    		plugins: function () {
                            	return [
                                	require('autoprefixer')
                                ];
                        	}
                    	}
                    }
                },
            	{
            		loader: 'sass-loader'
            	}
            ]
        },
        {
            test: /\.(cur)\??.*$/,
            type: 'asset/inline',
            use: {
                options: {
                    name: '[name].[ext]',
                    publicPath: 'cursors/',
                    outputPath: 'css/cursors/'
                }
            }
        },
        {
            test: /\.(gif|jpg|png|ico|svg)\??.*$/,
            type: 'asset',
            use: {
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: 'images/',
                    outputPath: 'css/images/'
                }
            }
        },
        {
            test: /\.(woff|otf|ttf|eot)\??.*$/,
            type: 'asset',
            use: {
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: 'fonts/',
                    outputPath: 'css/fonts/'
                }
            }
        },
        {
            test: require.resolve('tether'),
            use: [{
                loader: 'expose-loader',
                options: 'Tether'
            }]
        }, {
            test: require.resolve('popper.js'),
            use: [{
                loader: 'expose-loader',
                options: 'Popper'
            }]
        }
        ]
    },
    stats: {
        colors: true,
        errorDetails: true
    },
    devServer: {
        compress: true,
        port: 9000
    },
    plugins: plugins,
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js',
            
            'jqueryUI': 'jquery-ui-dist/jquery-ui.js',
            
            'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
            'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
            'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
            'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
            'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',

            // CSS ROUTES
            'images': path.join(__dirname, '/assets/images'),
            './images': path.join(__dirname, '/assets/images'),
            './cursors': path.join(__dirname, '/assets/cursors'),
            '../css/images/table': path.join(__dirname, '/assets/images/datatable'),
            './fonts': path.join(__dirname, '/assets/fonts'),
            '../fonts': '@mdi/font/fonts/',
        },
        fallback: {
        	fs: false
        }
    }
}];
