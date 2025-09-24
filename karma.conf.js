const path = require('path');
const webpack = require('webpack');
const createBackendServer = require('./backend.js');

// 🌐 Capturar puerto desde argumentos de línea de comandos
function getBackendPort() {
  const args = process.argv;
  const portIndex = args.findIndex(arg => arg === '--port');

  if (portIndex !== -1 && args[portIndex + 1]) {
    const port = parseInt(args[portIndex + 1]);
    if (!isNaN(port) && port > 0 && port < 65536) {
      return port;
    }
  }

  // Puerto por defecto si no se especifica o es inválido
  return 8082;
}

const BACKEND_PORT = getBackendPort();

// 🛡️ Gestión del servidor backend
let backendServer;
try {
  backendServer = createBackendServer(BACKEND_PORT);
  console.log(`[💬 Backend server created on port ${BACKEND_PORT}]`);
} catch (error) {
  console.error(`[❌ Failed to create backend server on port ${BACKEND_PORT}:`, error.message);
  process.exit(1);
}

// 🧹 Limpieza al finalizar
process.on('exit', () => {
  if (backendServer && backendServer.close) {
    backendServer.close();
  }
});

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],

    // 📁 Archivos y recursos necesarios para las pruebas
    files: [
      // 📚 Dependencias principales incluidas en el paquete
      { pattern: 'node_modules/jquery/dist/jquery.js', included: true, watched: false },
      { pattern: 'node_modules/underscore/underscore.js', included: true, watched: false },

      // 🎨 Estáticos servidos pero no incluidos en el paquete
      { pattern: 'dist/css/**/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/js/**/*.*', watched: false, included: false, served: true },
      { pattern: 'dist/html/**/*.*', watched: false, included: false, served: true },

      // 🧪 Archivo principal de pruebas (procesado por webpack)
      { pattern: 'test.webpack.js' },

      // 🌐 Recursos de datos y configuración
      { pattern: 'i18n/*.json', watched: false, included: false, served: true },
      { pattern: 'demo/x21a/resources/*.json', watched: true, served: true, included: false },
      { pattern: 'dist/resources/*.json', watched: false, included: false, served: true },
      { pattern: 'demo/**/*.*', watched: false, included: false, served: true },
    ],

    // ⚙️ Preprocesamiento: webpack + mapa de fuentes para depuración
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap'],
    },

    // 📦 Configuración de webpack optimizada para pruebas
    webpack: {
      mode: 'development',
      devtool: 'cheap-module-source-map',

      // 📦 Cache persistente en sistema de archivos
      cache: {
        type: 'filesystem',
        name: 'karma-tests',
        cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/karma-webpack'),
        buildDependencies: {
          config: [__filename], // Si cambia este archivo, se invalida la caché
        },
      },

      resolve: {
        symlinks: false,        // Es más rápido si no usa enlaces simbólicos
        modules: ['node_modules', 'src', path.resolve(__dirname, 'src')],
        // 🔗 Alias para dependencias específicas de blueimp-file-upload
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
          // 🔄 Transpilación JavaScript con Babel
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true // Caché para una compilación más rápida
              }
            }
          },
          // 🎨 Procesamiento de CSS para pruebas (inyección directa en DOM)
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          // 📄 Manejo de plantillas HTML para calendario
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
          // 📋 Archivos JSON como módulos
          {
            test: /\.json$/,
            type: 'json'
          },
          // 🔧 Corrección para jquery-migrate (deshabilitar AMD)
          {
            test: require.resolve('jquery-migrate'),
            loader: 'imports-loader',
            options: {
              additionalCode: 'var define = false;',
            }
          }
        ]
      },

      // 🔌 Plugins de webpack
      plugins: [
        // 💉 Inyectar jQuery globalmente en todos los módulos
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ]
    },

    // 📊 Configuración de webpack middleware (salida limpia)
    webpackMiddleware: {
      stats: 'errors-only', // Solo mostrar errores
      logLevel: 'warn'
    },

    // 🌐 Navegadores personalizados
    customLaunchers: {
      // 🤖 Chrome optimizado para CI/CD con flags de estabilidad mejorados
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',                    // Esencial para contenedores Docker
          '--disable-gpu',                   // Estabilidad en entornos sin GPU
          '--disable-web-security',          // Evitar problemas CORS
          '--disable-features=VizDisplayCompositor',
          '--disable-dev-shm-usage',         // Evitar problemas de memoria compartida
          '--disable-background-timer-throttling',
          '--disable-renderer-backgrounding',
          '--disable-backgrounding-occluded-windows',
          '--disable-extensions',
          '--disable-default-apps',
          '--no-first-run',
          '--disable-component-update',
        ]
      }
    },

    // 🔀 Proxies para rutas de la aplicación
    proxies: {
      '/dist/': '/base/dist/',
      '/demo/': `http://localhost:${BACKEND_PORT}/demo/`,

      // 🎨 Fuentes
      '/css/fonts/': '/base/dist/css/fonts/',
      '/fonts/': '/base/dist/css/fonts/',
      '/x21aResponsive/css/fonts/': '/base/dist/css/fonts/',
      '/x21aStatics/css/fonts/': '/base/dist/css/fonts/',

      // 🖱️ Cursores
      '/css/cursors/': '/base/dist/css/cursors/',
      '/x21aResponsive/css/cursors/': '/base/dist/css/cursors/',

      // 🖼️ Imágenes CSS
      '/css/images/': '/base/dist/css/images/',
      '/rup/css/images/': '/base/dist/css/images/',
      '/x21aResponsive/css/images/': '/base/dist/css/images/',

      // 🔗 Resto de proxies
      '/test/': `http://localhost:${BACKEND_PORT}/test/`,
      '/x21aAppWar/': '/',
      '/externals/icons/': '/base/dist/css/externals/icons/',
      '/x21aStatics/rup/': '/base/dist/',
    },

    // 🌐 Navegadores por defecto (Chrome principal, ChromeHeadlessCI como alternativa)
    browsers: ['Chrome', 'ChromeHeadlessCI'],

    // 📈 Reportes de resultados
    reporters: ['progress', 'spec'],

    // ⏱️ Configuración de tiempos de espera optimizada
    browserNoActivityTimeout: 30000,  // 30s sin actividad antes de exceder el tiempo de espera
    browserDisconnectTimeout: 10000,  // 10s para reconectar navegador
    captureTimeout: 60000,            // 60s para capturar navegador inicial
    processKillTimeout: 2000,         // 2s para matar procesos colgados

    // 📋 Configuración del reporter spec (salida limpia y detallada)
    specReporter: {
      suppressPassed: true,    // Ocultar pruebas que pasan
      suppressSkipped: true,   // Ocultar pruebas omitidas
      showSpecTiming: true     // Mostrar tiempo de ejecución
    },

    // 🎯 Configuración del cliente (navegador)
    client: {
      clearContext: true,      // Limpiar contexto entre pruebas
      jasmine: {
        random: false,         // Ejecutar pruebas en orden determinístico
        failFast: false,       // Continuar tras fallos (mejor para depuración)
        DEFAULT_TIMEOUT_INTERVAL: 15000  // 15s de tiempo de espera por prueba individual
      }
    },

    // 🔧 Configuración general de Karma
    colors: true,              // Salida con colores en consola
    logLevel: config.LOG_INFO, // Nivel de logging
    concurrency: Infinity,     // Sin límite de navegadores concurrentes
  });
};
