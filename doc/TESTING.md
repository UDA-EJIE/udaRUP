# Testing

En el presente documento se va a detallar como se realizan las pruebas de los componentes RUP.

El sistema de testing se basa en:

* [Jasmine](https://jasmine.github.io/)
* [Karma](https://karma-runner.github.io/1.0/index.html)

## Instalación

La instalación de Jasmine se realiza mediante el gestor de paquetes de Node.js. Se realiza mediante el siguiente comando:

```bash
# Instalación local
$ npm install --save-dev jasmine jasmine-jquery

# Instalación global
$ npm install -g jasmine

```

La instalación de Karma se realiza del siguiente modo. Junto con el paquete de Karma se instalarán los plugins correspondientes para la integración con jasmine.

```bash
# Instalación de Karma:
$ npm install karma --save-dev

# Instalación de los plugins de integración con Jasmine:
$ npm install karma-jasmine karma-chrome-launcher --save-dev
```

## Jasmine

Un punto de partida para comenzar con la implementación de tests de Jasmine es mediante la ejecución del siguiente comando:

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

Antes de generar test de Jasmine se deberá de configurar correctamente el entorno de ejecución. La configuración por defecto de Jasmine se realiza mediante el fichero ``` spec/support/jasmine.json ```. En este fichero se especifican las fuentes de los ficheros de test que se deben ejecutar. Las posibles opciones de configuración del fichero se pueden consultar en la [documentación](http://jasmine.github.io/2.4/node.html#section-Configuration).


Para implementar un test de Jasmine
