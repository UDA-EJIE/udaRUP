/* global require */
/* global module */
/* global __dirname */

var path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'rup';

let plugins = [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	], outputFile;

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

module.exports = [{
	entry: __dirname + '/src/index.js',
	devtool: 'source-map',
	output: {
		filename: outputFile,
		library: libraryName,
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist/js')
	},
	module: {
		rules: [
			// {
			// 	test: require.resolve('jquery'),
			// 	use: [{
			// 		loader: 'expose-loader',
			// 		options: 'as'
			// 	},{
			// 		loader: 'expose-loader',
			// 		options: '$'
			// 	}]
			// },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015']
					}
				}
			},
			{
				test: require.resolve('tether'),
				use: [{
					loader: 'expose-loader',
					options: 'Tether'
				}]
			}]
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
	resolve:
		{
			modules: ['node_modules', path.resolve(__dirname, 'src')],
			alias: {

				'handlebars' : 'handlebars/dist/handlebars.js',
				'marionette' : 'backbone.marionette/lib/backbone.marionette.js',
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
				// 'jquery-ui-timepicker': 'src/core/ui/jquery-ui.timepicker.js',
				// 'jquery-ui-multidatespicker': 'src/core/ui/jquery-ui.multidatespicker.js',
				'jquery.form': 'jquery-form/jquery.form.js',
				'jquery.validate': 'jquery-validation/dist/jquery.validate.js',
				'jquery.validate.additional': 'jquery-validation/dist/additional-methods.js',
				'chartjs': 'chart.js/dist/Chart.js',
				'jquery-jstree': 'src/core/utils/jquery.jstree.js',
				'jquery-hotkeys': 'src/core/utils/jquery.hotkeys.js',
				'form2object': 'src/core/utils/form2object.js',
				// 'jquery.fileDownload': 'src/core/utils/jquery.fileDownload.js',
				'jquery.ui.widget': 'jquery-ui/widget.js',
				'tmpl': 'blueimp-tmpl/js/tmpl.js',

				'bt3':  path.resolve(__dirname, '../dist/js/externals/bt3.min.js'),
				'bt4':  path.resolve(__dirname, '../dist/js/externals/bt4.min.js'),

				'templates':  path.resolve(__dirname, 'templates.js')
			}

		}
}];
