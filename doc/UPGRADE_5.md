En esta sección iremos indicando como mantenerse actualizado con las últimas versiones disponibles de los componentes de <img src='https://uda-ejie.github.io/images/imgwikis/uda-mini-micro2.png' alt='UDA' />, es decir, cuando ya se dispone de una aplicación generada y se desea incorporar las últimas actualizaciones.

**Para el proceso de actualización se da por hecho lo siguiente**:
* La actualización se realiza sobre una aplicación con la versión 5.0.0 de RUP. La actualización directa desde versiones anteriores requiere realizar bastantes modificaciones extras.
* Los ficheros originales de RUP no han sido modificados.

Si lo que buscas es información sobre cómo mantener tu entorno de desarrollo actualizado, debes consultar la sección [Instalar](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Instalar) o por el contrario, si lo que quieres es actualizar una aplicación con UDA 4.x.x, debes de consultar la wiki [Actualizar 4.x.x](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Actualizar-4.x.x).

**IMPORTANTE:** desde la versión 4.1.0 de UDA, es necesario hacer uso de la función **initRupI18nPromise()** para cargar los recursos idiomáticos, se puede encontrar más información dentro de este documento en el [apartado de la versión 4.1.0](https://github.com/UDA-EJIE/uda-ejie.github.io/wiki/Actualizar-4.x.x#v410-12-noviembre-2019).
  
***

### v5.0.1 (20-julio-2021)

Para actualizar una aplicación UDA a la versión v5.0.1 se deben realizar las siguientes modificaciones.

#### Componentes RUP

Se debe sustituir la carpeta ```xxxStatics\WebContent\rup``` por la carpeta incluida en el fichero [rup](https://github.com/UDA-EJIE/udaRUP/releases/download/v5.0.1/rup-v5.0.1.zip).

#### Plugin y Templates

Para generar código correspondiente a la versión v5.0.1 de UDA mediante el plugin de generación de código, [se deberá actualizar](https://github.com/UDA-EJIE/udaPlugin/releases/download/v5.0.1/udaPlugin_5.0.1_generic.zip) y usar también las [templates](https://github.com/UDA-EJIE/udaTemplates/releases/download/v5.0.1/templates-v5.0.1.zip) que correspondan a la versión.

#### Actualizar la versión de x38

Para actualizar la librería habrá que descargar la [nueva versión de x38](https://github.com/UDA-EJIE/udaLib/releases/tag/v5.0.1) y seguir los siguientes pasos:

* Actualizar fichero ```pom.xml```

```xml
<properties>
	<com.ejie.x38.version>5.0.1-RELEASE</com.ejie.x38.version>
</properties>
```

### v5.0.0 (30-junio-2021)

La actualización de una aplicación UDA desde una versión 4.x.x a la nueva versión v5.0.0 se recoge de forma más detallada en el siguiente [documento](https://github.com/UDA-EJIE/udaRUP/blob/develop/doc/MIGRACION_4-5.md).

Siempre es recomendable actualizar lo siguiente:
* el entorno de desarrollo con las librerías.
* las [plantillas de generación de código](https://github.com/UDA-EJIE/udaTemplates/releases/download/v5.0.0/templates-v5.0.0.zip).
* el [plugin UDA](https://github.com/UDA-EJIE/udaPlugin/releases/download/v5.0.0/udaPlugin_5.0.0_generic.zip) en el IDE de desarrollo.