* Rama estable:
[![Build Status](https://travis-ci.org/UDA-EJIE/udaRUP.svg?branch=master)](https://travis-ci.org/UDA-EJIE/udaRUP)
* Rama de desarrollo:
[![Build Status](https://travis-ci.org/UDA-EJIE/udaRUP.svg?branch=develop)](https://travis-ci.org/UDA-EJIE/udaRUP)


# UDA - Componentes RUP

Los componentes (plugins jQuery) que implementan los patrones de interacción identificados han sido agrupados bajo un nombre propio, RUP (Rich Uda Patterns).

Estos componentes RUP son totalmente configurables, es decir, que es posible modificar su comportamiento según interese en cada caso. Por ejemplo, el mismo componente de mantenimiento cubre los patrones de "mantenimiento con formulario" y el de "mantenimiento con creación y edición en celda", de modo que a través de variables de configuración el mismo componente se podrá comportar de la manera deseada.

El catálogo de patrones disponible puede consultarse desde la [wiki](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Patrones).

Existen una serie de documentos disponibles:

* [Instalación](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/INSTALL.md): Es el documento que explica la instalación del software necesario para el desarrolo, testing y ejecución del proyecto de udaRUP.
* [Testing](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/TESTING.md): Detalla el proceso de instalación y configuración del entorno de test del proyecto de udaRUP.

Una vez instalado y configurado correctamente el entorno estas son las funcionalidades disponibles:

## Instalar dependencias

Lo primero será instalar las dependencias de librerías js que necesita el proyecto de udaRUP para su ejecución. Esto se realiza mediante el comando:

```sh
$ npm install
```

Una vez descargadas y configuradas las dependencias se pueden ejecutar todas las funcionalidades disponibles.

## Ejecutar servidor web

Se ha implementado un servidor web corriendo sobre Node.js. Esto nos permite:

* Ejecutar aplicación de demo. Se ha implementado una aplicación de demostración en la que es posible ver en funcionamiento los componentes RUP.
* Ejecutar tests de jasmine desde navegador. Se muestra en el navegador el resultado de la ejecución de los fichero spec con los test de Jasmine.

El servidor se inicia mediante el siguiente comando:

```sh
$ node server.js
```

Por defecto el servidor escucha las peticiones por el puerto 8080. Se accederá a la aplicación de ejemplo mediante la url http://localhost:8080/webpack-dev-server/demo/index-bt4.html.


## Generar documentación

Para generar documentación a partir de los comentarios jsdoc existentes en las fuentes, ejecutar:

```sh
$ npm rup doc
```

La documentación resultante se generará en el directorio doc/api

## Modo desarrollo

```sh
$ npm run watch
```


## Generar ficheros distribuibles

Para generar los ficheros distribuibles, ejecutar:

```sh
$ npm run build
```

El contenido se generará en el directorio dist/

## Ejecutar test

Los test implementados mediante [Jasmine](http://jasmine.github.io/) se ejecutan con [Karma](https://karma-runner.github.io/1.0/index.html). Para lanzar el proceso, ejecutar:

```sh
$ npm run test
```

El resultado de los test se muestra en la consola.


## Migración desde aplicaciones UDA v2.x o UDA v3.x

En el caso de que se desee actualizar una aplicación desarrollada con una versión v2.x de UDA a la versión v3.x, se deberán de acometer las modificaciones indicadas en el siguiente documento de migración:
* [Migración a UDA v3.x](./blob/master/doc/MIGRACION_2-3.md): Detalla los pasos a seguir para actualizar una aplicación a la versión v3.x de UDA.

Cuando se trate de migrar de una versión v3.x de UDA a una v4.x, el documento de migración a seguir será el siguiente:
* [Migración a UDA v4.x](./blob/master/doc/MIGRACION_3-4.md): Detalla los pasos a seguir para actualizar una aplicación a la versión v4.x de UDA.

> En el documento de migración solo se detallan los pasos a seguir para mantener la compatibilidad de la aplicación a nivel de API publica y funcionalidades de los componentes RUP y uso de liberías Java empleadas por UDA.

> En el caso de que se hayan utilizado directamente funcionalidades o se haya hecho uso directamente de la API de las liberías subyacentes directamente se deberán de realizar modificaciones de acuerdo a los cambios introducidos por estas librerías.

> Se han recopilado los problemas de compatibilidad mas comunes que pueden darse el el siguiente [documento](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/COMPONENTES.md).  
