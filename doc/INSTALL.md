# Entorno de desarrollo

En el presente documento se van a indicar los pasos a seguir para configurar el entorno de desarrollo del proyecto de estáticos udaRUP.

El proyecto de udaRUP hace uso de una serie de recursos para facilitar el desarrollo.

* [Git](https://git-scm.com/): Git es necesario para la instalación de paquetes y dependencias.
* [Node.js](https://nodejs.org): Se utiliza Node para la generación de documentación, iniciar un servidor web para la aplicación de demostración, la ejecución de tests y para generar los ficheros distribuibles.
* [Gulp](http://gulpjs.com/): Se emplea Gulp como sistema de generación y automatización de tareas. Se deberá de instalar de manera global:

## Git

El sistema de control de versiones es la piedra angular donde se sustentan todas las fuentes y recurso del resto de software empleado.

Es imprescindible la instalación del cliente de Git en el equipo para proseguir con la instalación.

El cliente de git adecuado para cada sistema operativo o distribución se puede obtener de [aquí](https://git-scm.com/downloads).


Una vez finalizada la instalación podemos comprobar si se ha realizado correctamente ejecutando la siguiente sentencia.

```bash
$ git --version
```

Si la ejecución del comando devuelve un error es posible que sea necesario añadir el ejecutable de git a la variable *PATH* del sistema.

> En caso de ejecutar Git dentro de una red corporativa que haga uso de un proxy, es posible que deba configurar el cliente para que trabaje correctamente con el.
```bash
$ git config --global http.proxy http://{username}:{passphrase}@{url}:{port}
$ git config --global http.proxy http://{username}:{passphrase}@{url}:{port}
```

## Node.js

El primer paso será instalar y configurar [Node.js](https://nodejs.org/en/).

Para ello se deberá descargar el instalable correspondiente al sistema operativo en el que se desea instalar. Los descargables se pueden obtener desde [aquí](https://nodejs.org/en/download/).

El proceso de instalación varía dependiendo del sistema operativo o la distribución utilizada pero se reduce a seguir los pasos indicados durante la instalación.

Una vez finalizada la instalación comprobaremos que se ha realizado correctamente ejecutando el siguiente comando en una terminal del sistema.

```bash
$ node --version
```

> En caso de ejecutar Node.js dentro de una red corporativa que haga uso de un proxy, es posible que deba configurar Node.js para que trabaje correctamente con el.
```bash
$ npm config set proxy http://{username}:{passphrase}@{url}:{port}
$ npm config set https-proxy http://{username}:{passphrase}@{url}:{port}
```

## Gulp

Gulp.js es un build system(sistema de construcción) que permite automatizar tareas comunes de desarrollo, tales como la minificación de código JavaScript, recarga del navegador, compresión de imágenes, validación de sintaxis de código y un sin fin de tareas más.

Su instalación se realiza a través del gestor de paquetes de Node.js **npm**.

```bash
$ npm install gulp-cli -g
```

La documentación y uso avanzado de Gulp se puede cosultar [aquí](http://gulpjs.com/).
