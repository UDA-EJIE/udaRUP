[![Build Status](https://travis-ci.org/UDA-EJIE/udaRUP.svg?branch=support-2.x)](https://travis-ci.org/UDA-EJIE/udaRUP)

# UDA - Componentes RUP (Soporte de la rama 2.x)

Colección de patrones visuales denominada RUP (Rich UDA Patterns).

## Entorno de desarrollo

Para poder desarrollar los componentes RUP es necesario instalar y configurar las siguientes dependencias en el entorno local:

* [Git](https://git-scm.com/): Git es necesario para la instalación de paquetes y dependencias.
* [Node.js](https://nodejs.org): Se utiliza Node para la generación de documentación, iniciar un servidor web para la aplicación de demostración, la ejecución de tests y para generar los ficheros distribuibles.
* [Bower](https://bower.io/): Para la gestión de ciertas librerías js se emplea Bower como gestor de dependencias.
* [Gulp](http://gulpjs.com/): Se emplea Gulp como sistema de generación y automatización de tareas. Se deberá de instalar de manera global:

```sh
$ npm install --global gulp-cli
```

## Instalar dependencias

Para instalar las dependencias de Node, ejecutar:

```sh
$ npm install
```

Para instalar las dependencias de Bower, ejecutar:

```sh
$ bower install
```

## Generar documentación

Para generar documentación a partir de los comentarios jsdoc existentes en las fuentes, ejecutar:

```sh
$ gulp doc
```

La documentación resultante se generará en el directorio doc/

## Generar ficheros distribuibles

Para generar los ficheros distribuibles, ejecutar:

```sh
$ gulp dist
```

El contenido se generará en el directorio dist/

## Ejecutar aplicación de demo

Se ha implementado una aplicación de demostración en la que es posible ver en funcionamiento los componentes RUP.

La aplicación se sirve mediante un servidor Node. Para arrancarlo, ejecutar:

```sh
$ node server.js
```

La aplicación estará accesible bajo la url http://localhost:8080/

## Ejecutar test

Los test implementados mediante [Jasmine](http://jasmine.github.io/) se ejecutan con [Karma](https://karma-runner.github.io/1.0/index.html). Para lanzar el proceso, ejecutar:

```sh
$ karma start
```

El resultado de los test se genera en test/test_results.html
