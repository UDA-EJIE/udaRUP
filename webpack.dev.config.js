const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: ['./scss/rup-base.scss', './entry.js'],
  cache: { type: 'filesystem' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/rup.js',
    clean: true,
    publicPath: '../',
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/rup.css',
    }),
  ],
  resolve: {
    alias: {
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/'),
      'jqueryUI': 'jquery-ui',
      'load-image': require.resolve('blueimp-load-image/js/load-image'),
      'load-image-exif': require.resolve('blueimp-load-image/js/load-image-exif'),
      'load-image-meta': require.resolve('blueimp-load-image/js/load-image-meta'),
      'load-image-scale': require.resolve('blueimp-load-image/js/load-image-scale'),
      'canvas-to-blob': require.resolve('blueimp-canvas-to-blob/js/canvas-to-blob.js'),
    },
    extensions: ['.scss', '.css', '.js'],
  },
  devtool: 'eval-source-map',
  optimization: {
    minimize: false,
  },
};