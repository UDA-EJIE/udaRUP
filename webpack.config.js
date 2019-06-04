/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'rup';

let plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	outputFile, optimization;

if (env === 'build') {
	outputFile = libraryName + '.min.js';
	optimization = {
		minimizer: [
			// we specify a custom UglifyJsPlugin here to get source maps in production
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				uglifyOptions: {
					compress: false,
					ecma: 6,
					mangle: true
				},
				sourceMap: true
			})
		]
	};
} else {
	outputFile = libraryName + '.js';
	optimization = {};
}

module.exports = [{
	mode: 'development',
	entry: __dirname + '/src/index.js',
	devtool: 'source-map',
	output: {
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist/js')
	},
	optimization: optimization,
	module: {
		rules: [{
				test: require.resolve("jquery-migrate"),
				use: "imports-loader?define=>false",
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.hbs$/,
				use: {
					loader: 'handlebars-loader',
					query: {
						// knownHelpers: ['i18n'],
						helperDirs: [
							__dirname + '/src/helper'

						]
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
		colors: true
	},
	node: {
		fs: 'empty'
	},
	devServer: {
		// contentBase: path.join(__dirname, './'),
		compress: true,
		port: 9000
	},
	plugins: plugins,
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'src')],
		alias: {

			'handlebars': 'handlebars/dist/handlebars.js',
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
			'calendar-tmpls': 'bootstrap-calendar/tmpls'
		}

	}
}];