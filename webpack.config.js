
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const env = require('yargs').argv.env;
const CopyWebpackPlugin = require('copy-webpack-plugin');

let libraryName = 'rup';
let mode, outputFileJS, outputFileCSS, optimization;

if (env === 'build') {
    mode = 'production';
    outputFileJS = libraryName + '.min.js';
    outputFileCSS = libraryName + '.min.css';
    optimization = {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ecma: 6,
                    sourceMap: true,
                    warnings: false,
                    mangle: true
                },
            }),
            new CssMinimizerPlugin({
                test: /\.css$/i,
                minimizerOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
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

module.exports = [{
    mode: mode,
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.js')],
    devtool: 'source-map',
    output: {
        filename: 'js/' + outputFileJS,
        library: libraryName,
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist/')
    },
    optimization: optimization,
    module: {
        rules: [
            {
                test: require.resolve('jquery-migrate'),
                loader: 'imports-loader',
                options: { additionalCode: 'var define = false;' }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            },
            {
                test: /\.hbs$/,
                use: {
                    loader: 'handlebars-loader',
                    options: {
                        helperDirs: [path.resolve(__dirname, 'src/helper')]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'fonts/',
                        outputPath: 'css/fonts/'
                    }
                }
            },
            {
                test: /\.(gif|jpg|jpeg|png|ico|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
						context: path.resolve(__dirname, 'assets/images'),
                        publicPath: 'images/',
                        outputPath: 'css/images/'
                    }
                }
            },
            {
                test: /\.(cur)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'cursors/',
                        outputPath: 'css/cursors/'
                    }
                }
            },
            {
                test: require.resolve('tether'),
                use: [{ loader: 'expose-loader', options: 'Tether' }]
            },
            {
                test: require.resolve('popper.js'),
                use: [{ loader: 'expose-loader', options: 'Popper' }]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/' + outputFileCSS,
            chunkFilename: 'css/' + outputFileCSS
        }),
			        new CopyWebpackPlugin([
			            {
			                from: path.resolve(__dirname, 'assets/images'),
			                to: 'css/images',
							context: path.resolve(__dirname, 'assets/images'),
			                ignore: ['*.txt']
			            },
			            {
			                from: path.resolve(__dirname, 'assets/cursors'),
			                to: 'css/cursors'
			            },
			            {
			                from: path.resolve(__dirname, 'assets/fonts'),
			                to: 'css/fonts'
			            }
			        ]),
					{
					  apply: (compiler) => {
					    compiler.hooks.afterEmit.tap('CopyLogPlugin', () => {
					      console.log('✅ Archivos copiados correctamente por CopyWebpackPlugin');
					    });
					  }
					}
    ],
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        alias: {
            'jqueryUI': 'jquery-ui-dist/jquery-ui.js',
            'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
            'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
            'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
            'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
            'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',
            './images': path.join(__dirname, '/assets/images'),
            './cursors': path.join(__dirname, '/assets/cursors'),
            '../css/images/table': path.join(__dirname, '/assets/images/datatable'),
            '../jstree/default': path.join(__dirname, '/assets/images/jstree/default'),
            '../jstree/default-dark': path.join(__dirname, '/assets/images/jstree/default-dark'),
            './fonts': path.join(__dirname, '/assets/fonts'),
            '../fonts': '@mdi/font/fonts/',
        }
    },
    devServer: {
        compress: true,
        port: 9000
    },
    stats: {
        colors: true
    },
    node: {
        fs: 'empty'
    }
}];
