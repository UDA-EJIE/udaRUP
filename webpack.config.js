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
			'jquery-ui': 'jquery-ui/ui/',
			'jqueryUI': 'jquery-ui-dist/jquery-ui.js',

			'jquery.fileupload': 'blueimp-file-upload/js/',
			'load-image': 'blueimp-load-image/js/load-image.js',
			'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
			'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
			'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',

			'jquery-form': 'jquery-form/jquery.form.js',
			'jquery.validate.additional': 'jquery-validation/dist/additional-methods.js',

			'jquery.ui.widget': 'jquery-ui/widget.js',
			'tmpl': 'blueimp-tmpl/js/tmpl.js',
			'calendar-tmpls': 'bootstrap-calendar/tmpls'
		}

	}
}];