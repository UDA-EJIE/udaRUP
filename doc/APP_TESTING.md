# Generación de test de Jasmine

En el presente documento se va a detallar como implementar test de Jasmine para los desarrollos Javascript realizados por las aplicaciones.

El sistema de testing se basa en [Jasmine](https://jasmine.github.io/) y [Karma](https://karma-runner.github.io/1.0/index.html). El proceso de instalación y configuarción de ambos se detalla en el documento de [testing](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/APP_TESTING.md) para los componente RUP.


## Jasmine

Lo primero que deberemos de realizar será la implementación de los test de Jasmine.

Un punto de partida sería a partir de los ejemplos que proporciona Jasmine. Estos ejemplos se añaden al workspace mediante el comando:

```bash
$ jasmine examples
```

Este comando generará una serie de ficheros de test de jasmine de ejemplo. Para ejecutar estos tests se deberá ejecutar:

```bash
$ jasmine
```

Un ejemplo de que los test se han ejecutado satisfactoriamente sería la siguiente salida por consola:

```bash
Started
.....


5 specs, 0 failures
Finished in 0.008 seconds
```

### Mi primer test de Jasmine

Antes de generar test de Jasmine se deberá de configurar correctamente el entorno de ejecución.

La configuración por defecto de Jasmine se realiza mediante el fichero ``` spec/support/jasmine.json ```.

En este fichero se especifican las fuentes de los ficheros de test que se deben ejecutar. Las posibles opciones de configuración del fichero se pueden consultar en la [documentación](http://jasmine.github.io/2.4/node.html#section-Configuration).

## Karma

La comfiguración de Karma se realiza en el fichero karma.conf.json.

Esta sería una configuración inicial:

```js

module.exports = function(config) {
  config.set({
    basePath: '', // Ruta base
    frameworks: ['jasmine','requirejs'],
    files: [
      { pattern: 'spec/helpers/rup.karma.config.js'},
      { pattern: 'node_modules/jasmine-jquery/lib/jasmine-jquery.js', included: false},
      { pattern: "node_modules/jquery/dist/jquery.js", included: false},
      { pattern: "node_modules/jquery-migrate/dist/jquery-migrate.js", included: false},
      { pattern: "node_modules/jquery-ui-dist/jquery-ui.js", included: false},
      { pattern: 'i18n/*.json', watched: true, served: true, included: false},
      { pattern: 'demo/x21a/resources/*.json', watched: true, served: true, included: false},
      { pattern: "node_modules/handlebars/dist/handlebars.js", included: false },
      { pattern: "src/helper/handlebars-helper-i18n.js", included: false },
      { pattern: "node_modules/block-ui/jquery.blockUI.js", included: false },
      { pattern: "node_modules/qtip2/dist/jquery.qtip.js", included: false },
      { pattern: 'src/**/*.js', included: false},

      'spec/karma-main.js',
      { pattern: 'spec/**/rup*spec.js', included: false }

    ],
    proxies: {
      "/i18n/resources/": "/base/i18n/",
      "/demo/x21a/resources/": "/base/demo/x21a/resources/"
    },
    exclude: [
    ],
    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-handlebars-preprocessor'
    ],
    port: 9876,               // Puerto en el que se ejecuta Karma
    colors: true,             // Habilita / Deshabilita el uso de colores en el resultado de los test.
    logLevel: config.LOG_INFO, // Nivel de debug
    autoWatch: true,          // Auto-detección de los cambios en los ficheros
    browsers: ['PhantomJS'],  // Navegadores en los que se van a ejecutar los test
    singleRun: true,          // Ejecución única o continua
    concurrency: Infinity     // Nivel de concurrencia
  })
}
```


### Mi primer test de Jasmine

Antes de generar test de Jasmine se deberá de configurar correctamente el entorno de ejecución. La configuración por defecto de Jasmine se realiza mediante el fichero ``` spec/support/jasmine.json ```. En este fichero se especifican las fuentes de los ficheros de test que se deben ejecutar. Las posibles opciones de configuración del fichero se pueden consultar en la [documentación](http://jasmine.github.io/2.4/node.html#section-Configuration).
