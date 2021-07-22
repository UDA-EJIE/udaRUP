En esta sección iremos indicando como mantenerse actualizado con las últimas versiones disponibles de los componentes de <img src='https://uda-ejie.github.io/images/imgwikis/uda-mini-micro2.png' alt='UDA' />, es decir, cuando ya se dispone de una aplicación generada, y se desea incorporar las últimas actualizaciones.

**Para el proceso de actualización se dan por sentados los siguientes supuestos**:
* La actualización se realiza sobre una aplicación con la versión 4.0.0 de RUP. La actualización directa desde versiones anteriores no ha sido probada por lo que es posible que pueda darse la necesidad de realizar modificaciones extras.
* Los ficheros originales de RUP no han sido modificados.

Si lo que buscas es información sobre cómo mantener tu entorno de desarrollo actualizado, debes consultar la sección [Instalar](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Instalar) o por el contrario, si lo que quieres es actualizar una aplicación con UDA 3.x.x, debes de consultar la wiki [Actualizar 3.x.x](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Actualizar-3.x.x).

**IMPORTANTE:** a partir de la versión 4.1.0 de UDA es necesario hacer uso de la función **initRupI18nPromise()** para cargar los recursos idiomáticos, se puede encontrar más información dentro de este documento en el [apartado de la versión 4.1.0](#v410-12-noviembre-2019).
  
***

### v4.2.2 (19-Noviembre-2020)

Para actualizar una aplicación UDA a la versión v4.2.2 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup](https://github.com/UDA-EJIE/udaRUP/releases/download/v4.2.2/rup-v4.2.2.zip).

#### JSP del footer

En esta versión de UDA se ha de editar el ```div``` que alberga el footer de la aplicación y que se encuentra en la JSP cuyo nombre es **footer**. Este archivo puede ser encontrado dentro de la carpeta ```xxxYYYWar\WebContent\WEB-INF\layouts```.

El ```div``` tendrá el siguiente aspecto:
```html
<div class="footer-row-base p-5">
	<img class="img-fluid mx-auto d-block" src="${staticsUrl}/x21a/images/web01-2014_claim_pertsona_helburu_es.gif" />
</div>
```

Habrá que sustituirlo por el siguiente:
```html
<div class="d-flex justify-content-center align-items-center">
	<img class="img-fluid position-absolute" src="${staticsUrl}/x21a/images/web01-2014_claim_pertsona_helburu_es.gif" />
	<img class="img-fluid w-100" src="${staticsUrl}/x21a/images/web01-2014_oina_logo_atzekoa.gif" />
</div>
```

#### Plugin y Templates

Para generar código correspondiente a la versión v4.2.2 de UDA mediante el plugin de generación de código, [se deberá actualizar](https://github.com/UDA-EJIE/udaPlugin/releases/download/v4.2.2/udaPlugin_4.2.2_all.zip) y usar también las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.2.2/templates-v4.2.2.zip) que correspondan a la versión.

### v4.2.1 (29-Mayo-2020)

Para actualizar una aplicación UDA a la versión v4.2.1 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup](https://github.com/UDA-EJIE/udaRUP/releases/download/v4.2.1/rup-v4.2.1.zip).

#### Templates

Para generar código correspondiente a la versión v4.2.1 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.2.1/templates-v4.2.1.zip).

#### Plantillas de layouts

En esta versión de UDA se ha de editar el ```div``` que alberga el contenido de la aplicación y que se encuentra en las JSP cuyo nombre comienza por **template**. Dichos archivos pueden ser encontrados dentro de la carpeta ```xxxYYYWar\WebContent\WEB-INF\layouts```, por ejemplo:
* template.jsp
* templateError.jsp
* templateLogin.jsp

El ```div``` de contenido tendrá el siguiente aspecto:
```html
<!-- Contenidos -->
<div class="content" >
	<tiles:insertAttribute name="content"/>
</div>
```

Habrá que sustituirlo por el siguiente, teniendo en cuenta que 'xxxYYYWar' hay que cambiarlo por el nombre del War correspondiente:
```html
<!-- Contenidos -->
<div id="xxxYYYWar_content" class="m-0 m-md-3 p-4 clear" >
	<tiles:insertAttribute name="content"/>
</div>
```

### v4.2.0 (24-Abril-2020)

Para actualizar una aplicación UDA a la versión v4.2.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup](https://github.com/UDA-EJIE/udaRUP/releases/download/v4.2.0/rup-v4.2.0.zip).

#### Estáticos

Las siguientes líneas han de ser eliminadas del fichero ```_layoutLoader.js```:
```javascript
// Evitar conflictos entre Bootstrap y jQueryUI
$.fn.bootstrapBtn = $.fn.button.noConflict();
```

#### Includes del WAR

Debido a ciertas modificaciones en la generación de los recursos estáticos, se deberán modificar los siguientes ficheros existentes en el directorio ```xxxYYYWar/WebContent/WEB-INF/layouts/includes```, dejándolos tal y como se muestran en los ejemplos:

* rup.scripts.inc
```jsp
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%-- DESARROLLO --%>
<script src="${staticsUrl}/rup/js/rup.js" type="text/javascript"></script>
```

* rup.scripts.min.inc
```jsp
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%-- PRODUCCION --%>
<script src="${staticsUrl}/rup/js/rup.min.js" type="text/javascript"></script>
```

* rup.styles.inc
```jsp
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%-- DESARROLLO --%>
<link href="${staticsUrl}/rup/css/rup.css" rel="stylesheet" type="text/css" />
```

* rup.styles.min.inc
```jsp
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%-- PRODUCCION --%>
<link href="${staticsUrl}/rup/css/rup.min.css" rel="stylesheet" type="text/css" />
```

* rup.styles.portal.inc
```jsp
<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<link href="${staticsUrl}/rup/portal/rup.min.css" rel="stylesheet" type="text/css" />
```

#### Plugin y Templates

Para generar código correspondiente a la versión v4.2.0 de UDA mediante el plugin de generación de código, se deberá actualizar con el correspondiente al sistema operativo con el que se trabaje, siendo estos [windows](https://github.com/UDA-EJIE/udaPlugin/releases/download/v4.2.0/udaPlugin_4.2.0_windows.zip) o [linux](https://github.com/UDA-EJIE/udaPlugin/releases/download/v4.2.0/udaPlugin_4.2.0_linux.zip) y usar también las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.2.0/templates-v4.2.0.zip) que correspondan a la versión.

#### Actualizar la versión de x38

Para actualizar la librería habrá que descargar la [nueva versión de x38](https://github.com/UDA-EJIE/udaLib/releases/tag/v4.2.0) y seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
	<org.springframework.version>4.3.22.RELEASE</org.springframework.version>
	<org.springframework.security.version>4.2.11.RELEASE</org.springframework.security.version>
	<org.logback.version>1.2.3</org.logback.version>
	<org.slf4j.version>1.7.30</org.slf4j.version>
	<com.ejie.x38.version>4.2.0-RELEASE</com.ejie.x38.version>
	<org.apache.tiles.version>3.0.8</org.apache.tiles.version>
	<!-- <org.jackson.version>2.8.11.3</org.jackson.version> -->
	<org.jackson.version>2.7.9.5</org.jackson.version>
</properties>
```

* Abrir el ```build.xml``` del proyecto xxxEAR con el editor ant (botón derecho sobre el fichero, Open With>Ant Editor)

* Ejecutar la tarea **mavenRunDependencies** (botón derecho sobre la tarea, Run As>Ant Build) actualizando las nuevas librerías xxxEAR\APP_INF\lib

* Pulsar F5 Sobre el proyecto ```xxxEAR``` (Refresh)

* Borrar la versión o versiones anteriores, en caso de que permanezca alguna

### v4.1.0 (12-Noviembre-2019)

Para actualizar una aplicación UDA a la versión v4.1.0 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup](https://github.com/UDA-EJIE/udaRUP/releases/download/v4.1.0/rup-v4.1.0.zip).

#### Estáticos

En esta versión de UDA se ha incluido la función **initRupI18nPromise()**, esta se encargará de cargar los recursos idiomáticos cuando estén disponibles, evitando así demorar la carga de la aplicación.

Es importante remarcar que, para usar esta función de manera correcta, sólo se debe usar para cargar recursos idiomáticos y no toda la lógica de la vista con la que se esté trabajando. Un ejemplo de buena práctica sería el siguiente:
```js
initRupI18nPromise.then(function(){
    options_role_combo = {
        source : [
           {label: "---", value:""},
           {label: $.rup.i18n.app["GRID_simple##rol"]["administrador"], value:"administrador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["desarrollador"], value:"desarrollador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["espectador"], value:"espectador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["informador"], value:"informador"},
           {label: $.rup.i18n.app["GRID_simple##rol"]["manager"], value:"manager"}
        ],
        width: "100%",
        customClasses: ["select-material"]
    };
});
```
#### Templates

Para generar código correspondiente a la versión v4.1.0 de UDA mediante el plugin de generación de código de UDA se deberán actualizar las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.1.0/templates-v4.1.0.zip).

### v4.0.0 (28-Junio-2019)

La actualización de una aplicación UDA desde una versión 3.x.x a la nueva versión v4.0.0 se recoge de forma más detallada en el siguiente [documento](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/MIGRACION_3-4.md).

En caso de cualquier caso, es recomendable actualizar 
* el entorno de desarrollo con las librerías.
* las [plantillas de generación de código](https://github.com/UDA-EJIE/udaTemplates/releases/download/v4.0.0/templates-v4.0.0.zip).
* el [plugin UDA](https://github.com/UDA-EJIE/udaPlugin/releases/tag/v4.0.0) en el IDE de desarrollo.