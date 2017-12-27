En el presente documento se va a detallar el proceso de build del proyecto de estáticos udaRUP.

La automatización de tareas de build se realiza mediante las siguientes herramientas.

* npm
* gulp
* webpack

### Tareas npm

A continuación se muestran las diferentes tareas npm para build, dev y testing.

#### Tareas npm de build

Mediante npm se ejecutan las diferentes tareas de build para cada uno de los recursos.

La lista de tareas disponibles se definen en el fichero [package.json](https://github.com/UDA-EJIE/udaRUP/blob/master/package.json).

* build

Realiza el build completo del proyecto udaRUP.

Los distribuibles se generan en el directorio [dist](https://github.com/UDA-EJIE/udaRUP/tree/master/dist).

```bash
$ npm run build
```

* portal

Genera los estilos de rup portalizados para aplicaciones integradas en la infraestructura de portales.

Los estilos portalizados se encuentran en la carpeta [dist/portal](https://github.com/UDA-EJIE/udaRUP/tree/master/dist/portal) dentro de la carpeta de distribuibles.

```bash
$ npm run portal
```

* all

Realiza el build completo del proyecto udaRUP y genera los css portalizados para aplicaciones integradas en la infraestructura de portales.

```bash
$ npm run all
```

* build:x21a

Realiza el build completo del proyecto udaRUP y copia los distribuilbles generados a la aplicación de ejemplo udaDemoApp.

```bash
$ npm run build:x21a
```

* all:x21a

Realiza el build completo del proyecto udaRUP, genera los css portalizados para aplicaciones integradas en la infraestructura de portales y copia los distribuilbles generados a la aplicación de ejemplo udaDemoApp.

```bash
$ npm run all:x21a
```

* doc

Genera la documentación de los componentes RUP a partir de los comentarios de jsdoc3 presentes en los ficheros fuentes de ```src/rup*.js```.

La documentación generada se encuentra en el directorio [doc\api](https://github.com/UDA-EJIE/udaRUP/tree/master/doc/api).

```bash
$ npm run doc
```

#### Tareas npm de desarrollo

* dev

Ejecuta el servidor de desarollo webpack-dev-server para disponer de un entorno de desarrollo completo a partir de la aplicación de ejemplo.

Los detalles de su uso y configuración pueden consultarse en el documento correspondiente.

```bash
$ npm run all:x21a
```

* watch

Realiza el build de los recursos del proyecto udaRUP y los monitoriza para actualizar los distribuibles cuando estos sufran modificaciones.

```bash
$ npm run watch
```

* watch:x21a

Realiza el build de los recursos del proyecto udaRUP y los monitoriza para actualizar los distribuibles cuando estos sufran modificaciones. Una vez actualizados se copian al proyecto de udaDemoApp.

```bash
$ npm run watch:x21a
```

#### Tareas npm de testing

* test

Ejecuta los test de jasmine mediante el test runner Karma.js. Los tests se ejecutan en un navegador PhantomJS y se muestran los resultados en la línea de comandos.

```bash
$ npm run test
```

* test:dev

Ejecuta los test de jasmine mediante el test runner Karma.js. Los tests se ejecutan en un navegador Chrome permitiendo realizar debug de los test implementados.

```bash
$ npm run test
```

### Build de los recursos

Para realizar el build de los diferentes recursos se siguen diferentes estrategias dependiendo de la naturaleza de los mismos.

#### Build de los recursos JS

El build de los recursos JS se realiza a partir de los ficheros fuente presentes en el directorio [src](https://github.com/UDA-EJIE/udaRUP/tree/master/src).

El proceso de build genera una seríe de distribuibles en el directorio [dist/js](https://github.com/UDA-EJIE/udaRUP/tree/master/dist/js):

* [dist/js/rup.js](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/js/rup.js): Librería JS unificada de los componentes RUP.
* [dist/js/rup.map.js](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/js/rup.map.js): Source map correspondiene al fichero [dist/js/rup.js](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/js/rup.js) utilizado para facilitar el debug de los componentes en tiempo de desarrollo.
* [dist/js/rup.min.js](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/js/rup.min.js): Versión minimizada del fichero [dist/js/rup.js](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/js/rup.js).

El build de la librería final js se realiza mediante Webpack. La configuración de los ficheros js que deben de incluirse se realiza mediante el fichero índice [index.js](https://github.com/UDA-EJIE/udaRUP/blob/master/src/index.js). En el, se encuentran las referencias del los import que debe de realizar Webpack sobre los recursos que debe tener en cuenta.

#### Build de los recursos SASS

El build de los recursos Sass se realiza a partir de los ficheros fuente presentes en el directorio [scss](https://github.com/UDA-EJIE/udaRUP/tree/master/scss).

El proceso de build genera una seríe de distribuibles en el directorio [dist/css](https://github.com/UDA-EJIE/udaRUP/tree/master/dist/css).

* [dist/css/rup.base.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-base.css): Fichero unificado base de los componentes RUP.
* [dist/css/rup.base.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-base.css): Versión minimizada del fichero [rup.base.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-base.css).
* [dist/css/rup-jqueryui-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-jqueryui-theme.css): Tema visual basado en los estilos de jQueryUI.
* [dist/css/rup-jqueryui-theme.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-jqueryui-theme.min.css): Versión minimizada del fichero [rup-jqueryui-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-jqueryui-theme.css).
* [dist/css/rup-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-theme.css): Tema visual basado en los estilos de UDA v3.x.
* [dist/css/rup-theme.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-theme.min.css): Versión minimizada del fichero [rup-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-theme.css).

Para la generación de estos recursos existen una serie de achivos scss índice que determinan los ficheros que se van a seleccionar en cada uno de ellos.

Estos ficheros índice se encuentran en la raíz del directorio [scss](https://github.com/UDA-EJIE/udaRUP/tree/master/scss) y son los siguientes:

* [scss/rup-base.scss](https://github.com/UDA-EJIE/udaRUP/blob/master/scss/rup-base.scss): Contiene las referencias de los ficheros Sass empleados para la generación de los distribuibles [rup.base.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-base.css) y [rup.base.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-base.css).
* [scss/rup-jqueryui-theme.scss](https://github.com/UDA-EJIE/udaRUP/blob/master/scss/rup-jqueryui-theme.scss): Contiene las referencias de los ficheros Sass empleados para la generación de los distribuibles [rup-jqueryui-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-jqueryui-theme.css) y [rup-jqueryui-theme.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-jqueryui-theme.min.css).
* [scss/rup-theme.scss](https://github.com/UDA-EJIE/udaRUP/blob/master/scss/rup-theme.scss): Contiene las referencias de los ficheros Sass empleados para la generación de los distribuibles [rup-theme.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-theme.css) y [rup-theme.min.css](https://github.com/UDA-EJIE/udaRUP/blob/master/dist/css/rup-theme.min.css).
