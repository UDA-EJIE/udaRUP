const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./demo/webpack.config.js');
var path = require('path');

const compiler = webpack(config);

/**
 * Create a webpack dev server and lift it on the given port
 * @param {int} PORT - the port on whish lift the server
 */
module.exports = (PORT, API_PORT) => {

	const server = new WebpackDevServer(compiler, {
		contentBase: path.join(__dirname, './'),
		// publicPath: path.join(__dirname, 'dist'),
		stats: { colors: true },

		compress: true,

		hot: true,
		disableHostCheck: true,
		openPage: 'demo/index.html',
		watchContentBase: true,
		inline: true,
		proxy: {
			'/demo/api': {
				target: `http://localhost:${API_PORT}`,
				pathRewrite: {'^/demo/api' : '/demo'}

			}
		}


	});

	server.listen(PORT, 'localhost', function () {
		console.log(`WebpackDevServer running on port ${PORT}`);
	});
};
