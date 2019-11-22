# Actualizar

En esta sección iremos indicando como mantenerse actualizado con las últimas versiones disponibles de los componentes de <img src='https://uda-ejie.github.io/images/imgwikis/uda-mini-micro2.png' alt='UDA' />, es decir, cuando ya se dispone de una aplicación generada, y se desea incorporar las últimas actualizaciones.

**Para el proceso de actualización se dan por sentados los siguientes supuestos**:
* La actualización se realiza sobre una aplicación con la versión 3.0.0 de RUP. La actualización directa desde versiones anteriores no ha sido probada por lo que es posible que pueda darse la necesidad de realizar modificaciones extras.
* Los ficheros originales de RUP no han sido modificados.

Si lo que buscas es información sobre como mantener tu entorno de desarrollo actualizado, debes consultar la sección [Instalar](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Instalar).
  
***

### v3.7.3 (17-Julio-2019)

Para actualizar una aplicación UDA a la versión v3.7.3 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.7.3.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.7.3/rup-v3.7.3.zip).

#### Templates

Para generar código correspondiente a la versión v3.7.3 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.7.3/templates-v3.7.3.zip).

### v3.7.2 (2-Mayo-2019)

Para actualizar una aplicación UDA a la versión v3.7.2 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.7.2.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.7.2/rup-v3.7.2.zip).

#### Templates

Para generar código correspondiente a la versión v3.7.2 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.7.2/templates-v3.7.2.zip).

### v3.7.1 (23-Abril-2019)

Para actualizar una aplicación UDA a la versión v3.7.1 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.7.1.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.7.1/rup-v3.7.1.zip).

#### Templates

Para generar código correspondiente a la versión v3.7.1 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.7.1/templates-v3.7.1.zip).

#### Actualizar la versión de x38:

Para actualizar la librería habrá que descargar la [nueva versión de x38](https://docs.google.com/uc?authuser=0&id=1Qrb-D_FW5sCQs44gIlyUFBKwzlOgcDla&export=download) y seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
		<org.logback.version>1.1.7</org.logback.version>
		<org.slf4j.version>1.7.21</org.slf4j.version>
		<com.ejie.x38.version>3.7.1-RELEASE</com.ejie.x38.version>
</properties>
```

* Abre el build.xml del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecuta la tarea mavenRunDependencies (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Sobre el proyecto xxxEAR pulsa F5 (Refresh)

* Borra versión o versiones anteriores, en caso de que permanezca alguna.

### v3.7.0 (28-Febrero-2019)

Para actualizar una aplicación UDA a la versión v3.7.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.7.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.7.0/rup-v3.7.0.zip).

#### Templates

Para generar código correspondiente a la versión v3.7.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.7.0/templates-v3.7.0.zip).

#### Actualizar la versión de x38:

Para actualizar la librería habrá que descargar la [nueva versión de x38](https://docs.google.com/uc?authuser=0&id=172gtjOPGXZh9rL4ayW65O2K8gpjGEwkO&export=download) y seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
		<org.logback.version>1.1.7</org.logback.version>
		<org.slf4j.version>1.7.21</org.slf4j.version>
		<com.ejie.x38.version>3.7.0-RELEASE</com.ejie.x38.version>
</properties>
```

* Abre el build.xml del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecuta la tarea mavenRunDependencies (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Sobre el proyecto xxxEAR pulsa F5 (Refresh)

* Borra versión o versiones anteriores, en caso de que permanezca alguna.

### v3.6.0 (19-Noviembre-2018)

Para actualizar una aplicación UDA a la versión v3.6.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.6.0.zip](https://docs.google.com/uc?authuser=0&id=1bwVe2uyVWCKO4PEUKg-f8bZJtB6No6Fu&export=download).

	* NOTA: 
	En el componente rup_table se han modificado los enlaces por botones.
	Se sustituye: 
	- Enlace cancelar: id del componente + " _detail_link_cancel"
	- Enlace limpiar: id del componente + " _filter_cleanLink"

	Por 
	- Botón cancelar: id del componente + "_detail_button_cancel"
	- Botón limpiar: id del componente + "_filter_cleanButton" 
	

**_Para hacer uso del componente rup_table responsive_**, en el fichero `codappStatics\WebContent\codapp\scripts\codappNombre\vista.js` 

	Sustituir: 
	     $("#vista").rup_table({

	Por:
	     $("#vista").rup_datatable({


#### Templates

Para generar código correspondiente a la versión v3.6.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://docs.google.com/uc?authuser=0&id=12rhPeGp_W724pd7BONxM-Vw-ysX7yM7a&export=download).

#### Actualizar la versión de x38:

Para actualizar la librería habrá que descargar la [nueva versión de x38](https://docs.google.com/uc?authuser=0&id=1WzAsSWYH6coQvk3dTeQLocD_xHwZTBFR&export=download) o utilizar el [repositorio Maven](https://docs.google.com/uc?authuser=0&id=1rhXb6FJp4qyJoUgEI7pjrKSi6Gj9o7RR&export=download) y seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
		<org.logback.version>1.1.7</org.logback.version>
		<org.slf4j.version>1.7.21</org.slf4j.version>
		<com.ejie.x38.version>3.6.0-RELEASE</com.ejie.x38.version>
</properties>
```

* Abre el build.xml del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecuta la tarea mavenRunDependencies (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Sobre el proyecto xxxEAR pulsa F5 (Refresh)

* Borra versión o versiones anteriores, en caso de que permanezca alguna.

### v3.5.0 (06-Julio-2018)

Para actualizar una aplicación UDA a la versión v3.5.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.5.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.5.0/rup-v3.5.0.zip).

#### Templates

Para generar código correspondiente a la versión v3.5.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.5.0/templates-v3.5.0.zip).

### v3.4.0 (04-Mayo-2018)

Para actualizar una aplicación UDA a la versión v3.4.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.4.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.4.0/rup-v3.4.0.zip).

#### Templates

Para generar código correspondiente a la versión v3.4.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.4.0/templates-v3.4.0.zip).

### v3.2.1 (10-Noviembre-2017)

Para actualizar una aplicación UDA a la versión v3.2.1 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.2.1.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.2.1/rup-v3.2.1.zip).

#### Templates

Para generar código correspondiente a la versión v3.2.1 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.2.1/templates-v3.2.1.zip).

### v3.2.0 (25-Octubre-2017)

Para actualizar una aplicación UDA a la versión v3.2.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.2.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.2.0/rup-v3.2.0.zip).

#### Templates

Para generar código correspondiente a la versión v3.2.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.2.0/templates-v3.2.0.zip).

#### Actualizar la versión de x38:

Para actualizar la versión de la librería de x38 se deberán seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
		<org.logback.version>1.1.7</org.logback.version>
		<org.slf4j.version>1.7.21</org.slf4j.version>
		<com.ejie.x38.version>3.2.0-RELEASE</com.ejie.x38.version>
</properties>
```

* Abre el build.xml del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecuta la tarea mavenRunDependencies (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Sobre el proyecto xxxEAR pulsa F5 (Refresh)

* Borra versión o versiones anteriores, en caso de que permanezca alguna.

#### Layout loader

Se debe de actualizar la invocación del componente de inicialización del componente NavBar.

El el fichero ```_layoutLoader.js``` se deberá de modificar cambiando la línea exstente:

```js
$.fn.rup_navbar();
```

por la siguiente:

```js
$("#navbarResponsive").rup_navbar();
```

### v3.1.0 (1-Junio-2017)

Para actualizar una aplicación UDA a la versión v3.1.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup-v3.1.0.zip](https://github.com/UDA-EJIE/udaRUP/releases/download/v3.1.0/rup-v3.1.0.zip).

#### Templates

Para generar código correspondiente a la versión v3.1.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v3.1.0/templates-v3.1.0.zip).

#### Includes

Debido a ciertas modificaciones en la estructura de los recursos estáticos se deberán modificar los siguientes ficheros existentes en el directorio ```xxxYYYWar/WebContent/WEB-INF/layouts/includes```.

* rup.scripts.inc

```html
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script src="${staticsUrl}/rup/js/rup.js" type="text/javascript"></script>
<script src="${staticsUrl}/rup/js/externals/bt4.min.js" type="text/javascript"></script>
```

* rup.scripts.inc

```html
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<script src="${staticsUrl}/rup/js/rup.min.js" type="text/javascript"></script>
<script src="${staticsUrl}/rup/js/externals/bt4.min.js" type="text/javascript"></script>
```

* rup.styles.inc

```html
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<link href="${staticsUrl}/rup/css/externals/bt4.min.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-base.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-theme.css" rel="stylesheet" type="text/css" />
```
* rup.styles.min.inc

```html
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="${staticsUrl}/rup/css/externals/bt4.min.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-base.min.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/css/rup-theme.min.css" rel="stylesheet" type="text/css" />
```


Se deberá de crear un nuevo fichero ```rup.styles.portal.inc``` en el directorio ```xxxYYYWar/WebContent/WEB-INF/layouts/includes```.

```html
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

<link href="${staticsUrl}/rup/portal/externals/bt4.min.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/portal/rup-base.css" rel="stylesheet" type="text/css" />
<link href="${staticsUrl}/rup/portal/rup-theme.css" rel="stylesheet" type="text/css" />
```

#### Templates

Se deberán actualizar las ```jsp``` de _templates_ que se estén utilizando en la aplicación. Las modificaciones a realizar son las siguientes:

Se deberá sustituir la siguiente definición del tag html:

```html

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
```

por la siguiente:

```html
<html class="no-js" lang="">
```

Del mismo modo se deberá mover el meta ```X-UA-Compatible``` para que sea el primer tag del ```head``` y configurarlo del siguiente modo:

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

Si la aplicación está integrada en la infraestructura de portales se deberá incluir la siguiente sentencia ```@include``` para que se carguen los estilos portalizados:

```html
<%-- Estilos RUP para integración con portales --%>
<%@include file="/WEB-INF/layouts/includes/rup.styles.portal.inc" %>
```

Como es lógico se deberá comentar el que se estaba utilizando hasta ahora.


#### Layout loader

Para evitar los conflictos entre los widget button de JQueryUI y Bootstrap se deberá incluir esta sentencia en el inicio del fichero ```/xxxStatics/WebContent/x21a/scripts/x21aApp/_layoutLoader.js```.

```js
  // Evitar conflictos entre Bootstrap y jQueryUI
	$.fn.bootstrapBtn = $.fn.button.noConflict();
```

#### main.css

Con el propósito de facilitar la integración de las aplicaciones en portales se han modificado los estilos de los componentes para que sean más independientes de los estilos de la propia aplicación.

Por ello, se deberá añadir en el fichero ```main.css```, existente en el proyecto de estáticos en el directorio ```/x21aStatics/WebContent/x21a/styles/```, las siguientes reglas de estilos:

```css
@charset "UTF-8";
html, .r01gContainer {
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Open Sans", sans-serif; }

/* body, .r01gContainer { */
body, .r01gContainer {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Open Sans", sans-serif;
  font-size: 1.1rem;
  margin: 0;
  color: #333333; }

/* html, .r01gContainer { */
.r01gContainer {
  -webkit-box-sizing: border-box;
  box-sizing: border-box; }

*,
::after,
::before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit; }
```

#### Actualizar la versión de x38:

Para actualizar la versión de la librería de x38 se deberán seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
		<org.springframework.version>3.2.17.RELEASE</org.springframework.version>
		<org.springframework.security.version>3.2.9.RELEASE</org.springframework.security.version>
		<org.logback.version>1.1.7</org.logback.version>
		<org.slf4j.version>1.7.21</org.slf4j.version>
		<com.ejie.x38.version>3.1.0-RELEASE</com.ejie.x38.version>
</properties>
```

* Abre el build.xml del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecuta la tarea mavenRunDependencies (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Sobre el proyecto xxxEAR pulsa F5 (Refresh)

* Borra versión o versiones anteriores, en caso de que permanezca alguna.
