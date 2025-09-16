const path = require('path');
const webpack = require('webpack');
const createBackendServer = require('./backend.js');

let backendServer; // para almacenar la instancia y cerrarla luego
createBackendServer(8082);
console.log('[💬 Createeee back:');

module.exports = function (config) {
  // 🔍 Detectar si estamos en CI
  const isCI = process.env.CI === 'true';
  
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    
    files: [
      { pattern: 'node_modules/jquery/dist/jquery.js', included: true, watched: false },
      { pattern: 'dist/css/**/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/js/**/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/css/fonts/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/css/cursors/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/css/images/**/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/html/**/*.*', watched: false, included: false, served: true },
      { pattern: 'test.webpack.js' },
      { pattern: 'i18n/*.json', watched: false, included: false, served: true },
      { pattern: 'demo/x21a/resources/*.json', watched: true, served: true, included: false },
      { pattern: 'node_modules/underscore/underscore.js', included: true, watched: false },
      { pattern: 'dist/resources/*.json', watched: false, included: false, served: true },
      { pattern: 'demo/**/*.*', watched: false, included: false, served: true },
    ],

    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        modules: ['node_modules', 'src', path.resolve(__dirname, 'src')],
        alias: {
          jqueryUI: 'jquery-ui-dist/jquery-ui.js',
          'load-image': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image.js',
          'load-image-meta': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-meta.js',
          'load-image-exif': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-exif.js',
          'load-image-scale': 'blueimp-file-upload/node_modules/blueimp-load-image/js/load-image-scale.js',
          'canvas-to-blob': 'blueimp-file-upload/node_modules/blueimp-canvas-to-blob/js/canvas-to-blob.js',
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true
              }
            }
          },
          {
            test: /\.html$/,
            use: {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/rup/html/templates/rup_calendar/',
                outputPath: 'rup/html/templates/rup_calendar/',
              }
            }
          },
          {
            test: /\.json$/,
            type: 'json'
          },
          {
            test: require.resolve('jquery-migrate'),
            loader: 'imports-loader',
            options: {
              additionalCode: 'var define = false;',
            }
          }
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ]
    },

    // 🎯 Configuración de browsers para CI vs desarrollo local
    browsers: isCI ? ['ChromeHeadlessCI'] : ['Chrome'],
    
    // 🚀 Configuración personalizada para CI
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',              // Necesario para GitHub Actions
          '--disable-gpu',             // Evita problemas de GPU en CI
          '--disable-web-security',    // Para CORS en tests
          '--disable-features=VizDisplayCompositor',
          '--remote-debugging-port=9222',
          '--disable-dev-shm-usage'    // Evita problemas de memoria compartida
        ]
      }
    },

    // 📊 Reporters: diferentes para CI vs desarrollo
    reporters: isCI 
      ? ['progress', 'coverage']      // CI: compacto + coverage
      : ['progress', 'spec', 'html'], // Desarrollo: más detallado

    // 📈 Configuración de coverage
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },      // Para ver en navegador
        { type: 'lcov', subdir: 'lcov' },      // Para herramientas externas
        { type: 'text-summary' }               // Para ver en consola
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    // 📄 HTML reporter (solo para desarrollo local)
    htmlReporter: {
      outputDir: 'spec',
      reportName: 'karma_report',
    },

    // 📝 Spec reporter (solo para desarrollo local)
    specReporter: {
      suppressPassed: true,
      suppressSkipped: true,
      showSpecTiming: true
    },

    proxies: {
      // Karma sirve los archivos de tests y assets en /base/
      '/dist/': '/base/dist/',
      '/demo/': 'http://localhost:8082/demo/',
      '/fonts/': '/base/dist/css/fonts/',
      '/rup/css/images/': '/base/dist/css/images/',
      // Si usas estas rutas en tu app o tests, las redirige correctamente:
      '/test/': 'http://localhost:8082/test',
      '/x21aAppWar/': '/',
      '/externals/icons/': '/base/dist/css/externals/icons/',
      '/x21aStatics/rup/': '/base/dist/',
    },

    port: 9877,
    colors: true,
    logLevel: config.LOG_INFO,
    
    // ⚡ Configuración diferente para CI vs desarrollo
    autoWatch: !isCI,           // Solo watch en desarrollo
    singleRun: isCI,            // Solo single-run en CI
    
    concurrency: Infinity,
    
    // ⏱️ Timeouts más largos para CI
    browserNoActivityTimeout: isCI ? 120000 : 60000,
    browserDisconnectTimeout: isCI ? 60000 : 20000,
    
    client: {
      clearContext: true,
      jasmine: {
        random: false,
        failFast: isCI,         // Fallar rápido solo en CI
        timeoutInterval: 10000
      }
    }
  });
};
