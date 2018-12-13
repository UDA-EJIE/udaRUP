/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');

const createBackendServer = require('../backend.js');
createBackendServer(8081);

module.exports = {
	entry: {
		bt4: './demo/app/main-bt4.js'
		// bt3: './demo/app/main-bt3.js'
		// jqueryui: './demo/app/main-jqueryui.js'
	},
	output: {
		filename: '[name]-bundle.js',
		path: path.join(__dirname, 'demo')
		// publicPath: 'demo'
	},
	stats: {
		colors: true
	},
	node: {
		fs: 'empty'
	},
	devServer:{
		port:8080,
		proxy:{
			'/audit':'http://localhost:8081',
			'/demo':'http://localhost:8081'
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Tether: 'tether',
			Popper: ['popper.js', 'default'],
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown'
		}),

		new webpack.HotModuleReplacementPlugin()
	],

	module: {

		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			},
			{ test: /\.hbs$/,
				loader: 'handlebars-loader',
				query:{
					knownHelpers: ['i18n'],
					helperDirs: [
						path.join(__dirname, '../src/helper'),

					] }
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader',
					options: {
						alias: {
							// './images/ui-': path.join(__dirname, '../assets/images/jquery-ui/ui-'),
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
					options: {
						// includePaths: [
						// 	 path.join(__dirname, '../assets/images/jquery-ui')
						// 	path.join(__dirname, '../assets/images/rup'),
						// 	path.resolve('../assets/cursors'),
						// ] // compiles Sass to CSS
					}
				}]
			// },{
			// 	test: /\.woff2?$|\.ttf$|\.png$|\.eot$|\.gif$|\.cur$|\.svg$/,
			// 	use: [{
			// 		loader: 'file-loader'
			// 	}]
			// },{
			},{
				test: /\.png$|\.gif$|\.cur$|\.svg$/,
				use: [{
					loader: 'file-loader',
					options: {
						publicPath: '/'
					}
				}]
			},{
				test: /\.woff2?$|\.ttf$|\.eot$/,
				use: [{
					loader: 'url-loader'
				}]
			}
		]

		// loaders: [
		// 	{
		// 		test: /\.js$/,
		//
		// 		exclude: /(bower_components|node_modules)/,
		// 		include: path.resolve(__dirname, 'src'),
		// 		loader: 'babel-loader',
		// 		query: {
		// 			cacheDirectory: true,
		// 		},
		// 	}]
	},
	resolve:
		{

			modules: ['node_modules', path.resolve(__dirname, 'app'), 'src'],
			alias: {
				'handlebars' : 'handlebars/dist/handlebars.js',
				'marionette' : 'backbone.marionette/lib/backbone.marionette.js',
				// 'jquery': 'jquery/dist/jquery.js',
				'jquery-ui': 'jquery-ui/ui/',
				'jqueryUI': 'jquery-ui-dist/jquery-ui.js',
				// 'highlight': 'highlight.js/lib/highlight.js',

				'jquery.fileupload': 'blueimp-file-upload/js/',
				'load-image': 'blueimp-load-image/js/load-image.js',
				'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
				'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
				'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',
				// 'jquery.scrollTo': 'jquery.scrollto/jquery.scrollTo.js',
				// 'jquery-contextMenu': 'jquery-contextmenu/dist/jquery.contextMenu.js',
				// 'jquery-ui-timepicker': 'src/core/ui/jquery-ui.timepicker.js',
				// 'jquery-ui-multidatespicker': 'src/core/ui/jquery-ui.multidatespicker.js',
				'jquery-form': 'jquery-form/jquery.form.js',
				// 'jquery.validate': 'jquery-validation/dist/jquery.validate.js',
				'jquery.validate.additional': 'jquery-validation/dist/additional-methods.js',
				// 'chartjs': 'chart.js/dist/Chart.js',
				// 'jquery-jstree': 'src/core/utils/jquery.jstree.js',
				// 'jquery-hotkeys': 'src/core/utils/jquery.hotkeys.js',
				// 'form2object': 'src/core/utils/form2object.js',
				// 'jquery.fileDownload': 'src/core/utils/jquery.fileDownload.js',
				'jquery.ui.widget': 'jquery-ui/widget.js',
				'tmpl': 'blueimp-tmpl/js/tmpl.js',

				'bt4':  path.resolve(__dirname, '../dist/js/externals/bootstrap/bt4.min.js'),
				'tether':  'tether/dist/js/tether.js',

				// 'templates':  path.resolve(__dirname, 'templates.js')
			}

		},

	devtool: 'source-map'
};
