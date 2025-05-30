const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    rup: './scss/rup-base.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      // SCSS/CSS
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // Cursores .cur → dist/css/cursors/
      {
        test: /\.cur$/i,
        type: 'asset/resource',
        generator: {
          filename: 'css/cursors/[name][ext]',
        },
      },
      // Imágenes → dist/css/images/
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'css/images/[name][hash][ext]',
        },
      },
      // Fuentes → dist/assets/
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'css/font/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
	new CopyPlugin({
	  patterns: [
	    {from: path.resolve(__dirname, 'i18n'),to: path.resolve(__dirname, 'dist/resources'),},
		{ from: path.resolve(__dirname, 'assets/html'), to: 'html' },
	  ],
	}),
  ],
  resolve: {
    alias: {
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '../jstree': path.resolve(__dirname, 'assets/images/jstree'),
      '../fonts': path.resolve(__dirname, 'node_modules/@mdi/font/fonts'),
      'images': path.resolve(__dirname, 'assets/images'),
    },
    extensions: ['.scss', '.css', '.js'],
  },
};