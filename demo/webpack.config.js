/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');

const createBackendServer = require('../backend');

createBackendServer(8081);

module.exports = {
	entry: {
		bt4: './demo/app/main-bt4.js'
	},
	output: {
		filename: '[name]-bundle.js',
		path: path.join(__dirname, 'demo')
	},
	stats: {
		colors: true
	},
	node: {
		fs: 'empty'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Tether: 'tether',
			Popper: ['popper', 'default'],
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
		}),

		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
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
					loader: 'css-loader',
					options: {
						alias: {
							'./images': path.join(__dirname, '../assets/images'),
							'../images': path.join(__dirname, '../demo/images'),
							'./cursors': path.join(__dirname, '../assets/cursors'),
							'../css/images/datatable': path.join(__dirname, '/images'),
						}
					} // translates CSS into CommonJS
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
		]
	},
	resolve: {
		modules: ['node_modules', path.resolve(__dirname, 'app'), 'src'],
		alias: {
			'handlebars': 'handlebars/dist/handlebars.js',
			'marionette': 'backbone.marionette/lib/backbone.marionette.js',
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

			'bt4': path.resolve(__dirname, '../dist/js/externals/bootstrap/bt4.min.js'),
			'tether': 'tether/dist/js/tether.js',
			'popper': 'popper.js/dist/umd/popper.js',
			'calendar': 'bootstrap-calendar'
		}
	},

	devtool: 'source-map'
};