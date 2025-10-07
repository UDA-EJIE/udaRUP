const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

// Configuración base compartida
const baseConfig = {
  entry: ['./scss/rup-base.scss', './entry.js'],
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: false,
  },
  cache: { type: 'filesystem' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '../',
    devtoolModuleFilenameTemplate: info =>
      `webpack:///${path.relative(__dirname, info.absoluteResourcePath).replace(/\\/g, '/')}`,
  },
  module: {
    rules: [
      // SCSS a CSS
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { url: true, sourceMap: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      // Cursores
      {
        test: /\.cur$/i,
        type: 'asset/resource',
        generator: { filename: 'css/cursors/[name][ext]' },
      },
      // Imágenes
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            const baseDir = path.resolve(__dirname, 'assets/images');
            const fileFullPath = pathData.filename;
            let relativePath = path.relative(baseDir, fileFullPath).replace(/\\/g, '/');

            // Si está directamente dentro de assets/images, solo usa el nombre
            if (relativePath === path.basename(relativePath)) {
              relativePath = `/${relativePath}`;
            }

            return `css/images/${relativePath}`;
          },
        },
      },
      // Fuentes
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'css/fonts/[name][ext]' },
      },
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceMap: true,
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
    new CopyPlugin({
      patterns: [
        { from: 'i18n', to: 'resources' },
        { from: 'assets/html', to: 'html' },
        { from: 'assets/cursors', to: 'css/cursors' },
        { from: path.resolve(__dirname, 'demo/demo-idx.html'),to: path.resolve(__dirname, 'dist/html/demo-idx.html'),},
        {
          from: 'src',
          to: 'js/src',
          filter: (resourcePath) => {
            const ignoredFiles = ['.bowerrc', '.gitignore'];
            return !ignoredFiles.some(file => resourcePath.endsWith(file)) && !resourcePath.endsWith('.txt');
          },
        },
        {
          from: path.resolve(__dirname, 'spec'),
          to: 'js/test/[path][name][ext]',
          filter: (resourcePath) => resourcePath.endsWith('.js'),
          noErrorOnMissing: true,
        },
        { from: 'assets/images', to: 'css/images' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '../jstree': path.resolve(__dirname, 'assets/images/jstree'),
      '../fonts': path.resolve(__dirname, 'node_modules/@mdi/font/fonts'),
      'fonts/': path.resolve(__dirname, 'dist/fonts/'),
      images: path.resolve(__dirname, 'assets/images'),
      'jqueryUI': 'jquery-ui',
      'load-image': require.resolve('blueimp-load-image/js/load-image'),
      'load-image-exif': require.resolve('blueimp-load-image/js/load-image-exif'),
      'load-image-meta': require.resolve('blueimp-load-image/js/load-image-meta'),
      'load-image-scale': require.resolve('blueimp-load-image/js/load-image-scale'),
      'canvas-to-blob': require.resolve('blueimp-canvas-to-blob/js/canvas-to-blob.js'),
    },
    extensions: ['.scss', '.css', '.js'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};

module.exports = (env, argv) => {
  const devOnly = env?.devonly;
  const prodOnly = env?.build;
  const isProduction = argv.mode === 'production';
  
  if (devOnly) {
    // Solo rup.js para desarrollo rápido
    return {
      ...baseConfig,
      mode: 'development',
      output: {
        ...baseConfig.output,
        filename: 'js/rup.js',
        clean: true,
      },
      devtool: 'eval-source-map',
      optimization: {
        minimize: false,
      },
    };
  }
  
  if (prodOnly) {
    // Solo rup.min.js para producción
    return {
      ...baseConfig,
      mode: 'production',
      output: {
        ...baseConfig.output,
        filename: 'js/rup.min.js',
        clean: true,
      },
      devtool: false,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: false,
              },
              mangle: true,
            },
          }),
          new CssMinimizerPlugin({
            test: /\.min\.css$/i,
            parallel: true,
          }),
        ],
      },
    };
  }
  
  // Configuración múltiple normal
  return [
    // rup.js (development)
    {
      ...baseConfig,
      mode: 'development',
      output: {
        ...baseConfig.output,
        filename: 'js/rup.js',
        clean: true,
      },
      devtool: 'eval-source-map',
      optimization: {
        minimize: false,
      },
    },
    // rup.min.js (production)
    {
      ...baseConfig,
      mode: 'production',
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          'window.$': 'jquery',
        }),
        new MiniCssExtractPlugin({
          filename: 'css/rup.min.css',
        }),
        // Sin CopyPlugin para evitar conflictos
      ],
      output: {
        ...baseConfig.output,
        filename: 'js/rup.min.js',
        clean: false,
      },
      devtool: false,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              compress: {
                drop_console: false,
              },
              mangle: true,
            },
          }),
          new CssMinimizerPlugin({
            test: /\.min\.css$/i,
            parallel: true,
          }),
        ],
      },
    },
  ];
};