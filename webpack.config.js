const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // o 'production' según necesites
  entry: {
    rup: ['./scss/rup-base.scss', './entry.js'],
    'rup.min': ['./scss/rup-base.scss', './entry.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',  // JS en dist/js/
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
	publicPath: '/x21aStatics/rup/',  // o la ruta base desde donde sirves los archivos
	devtoolModuleFilenameTemplate: info =>
	    `webpack:///${path.relative(__dirname, info.absoluteResourcePath).replace(/\\/g, '/')}`,
  },
  externals: {
    jquery: 'jQuery', // o '$' si lo necesitas como global $
  },
  module: {
    rules: [
		{
		  test: require.resolve('jquery'),
		  loader: 'expose-loader',
		  options: {
		    exposes: ['$', 'jQuery'],
		  },
		},	
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
          loader: 'babel-loader', // si usas babel, si no puedes quitar esta regla
          options: {
            presets: ['@babel/preset-env'], // personaliza según tu setup
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
	}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
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
		{ from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'), to: 'js/jquery.js' },
      ],
    }),	
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...', // mantiene minimizador JS por defecto
      new CssMinimizerPlugin({
        test: /\.min\.css$/i, // solo minimiza los archivos .min.css
      }),
    ],
  },
  resolve: {
    alias: {
      '@bootstrap': path.resolve(__dirname, 'node_modules/bootstrap/'),
      '@assets': path.resolve(__dirname, 'assets/'),
      '../jstree': path.resolve(__dirname, 'assets/images/jstree'),
      '../fonts': path.resolve(__dirname, 'node_modules/@mdi/font/fonts'),
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
  devtool: 'eval-source-map', // Opcional, para debug
};