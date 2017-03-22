#	Componentes RUP – Table


## 1. Introducción

La descripción del componente Tabla, visto desde el punto de vista de RUP, es la siguiente:

*Se les presenta a los usuarios los datos tabulados para que la información se visualice de manera ágil y rápida, facilitando así su comprensión y manejo. Además, el componente implementa un nuevo patrón definido para facilitar la lógica necesaria en las acciones básicas, denominadas CRUD (create, read,update y delete), sobre una tabla.*


## 2. Ejemplo

Se muestra a continuación una maquetación típica del componente:

## 3. Casos de uso

Se aconseja la utilización de este componente:

* Cuando se tenga que presentar a los usuarios filas de datos y se desee facilitar la búsqueda dedatos.
* Cuando se realicen mantenimientos de tablas haciendo uso de las especificaciones establecidas en la guía de desarrollo de UDA.


## 4. Infraestructura

A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados *Ficheros* y *Dependencias*.

### 4.1. Ficheros

- Ruta Javascript: rup/scripts/
- Fichero de plugin: rup.grid-x.y.z.js
- Ruta theme: rup/basic-theme/
- Fichero de estilos: +theme.table-x.y.z.css+ (modificable por el desarrollador) y ui.jqgrid.css (fichero base de los estilos de la tabla).
- Ruta fichero de recursos: rup/resources/rup.i18n_idioma.json

### 4.2. Dependencias

Por la naturaleza de desarrollo de los componentes (patrones) como *plugins* basados en la librería *JavaScript* **jQuery**, es necesaria la inclusión de esta como capa base. La versión elegida para el desarrollo ha sido la **1.12.4**.
* **jQuery 1.12.4**: http://jquery.com/

La gestión de ciertas partes visuales de los componentes, se han realizado mediante el *plugin* **jQuery-UI** que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este *plugin*, entre otras cosas, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel y componentes personalizables (estilos). La versión utilizada en el desarrollo ha sido la **1.12.0**.

* **jQuery-UI 1.12.0**: http://jqueryui.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-1.12.4.js
    jquery-ui-1.12.0.custom.js
    jquery-ui-1.12.0.custom.css
    rup.base-x.y.z.js
    rup.table-x.y.z.js
    jqgrid.js: http://www.trirand.com/blog/
    Ejemplos online: http://www.trirand.com/blog/jqgrid/jqgrid.html

### 4.3 Versión minimizada

A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes **RUP**. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente **RUP**.

Los ficheros minimizados de RUP son los siguientes:
* **rup/scripts/min/rup.min-x.y.z.js**
* **rup/basic-theme/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

## 5. Invocación

El componente tabla necesita de una invocación de una llamada javascript sobre una estructura HTML existente.

Cada módulo del componente asocia funcionalidades y eventos a los diferentes objetos de la estructura HTML. De esto modo los componentes feedback, formulario de filtrado, formulario de detalle o multiselección entre otros, deberán de construirse sobre objetos HTML.

En el componente table se ha optado por minimizar el código HTML que se genera al vuelo mediantejavascript. Esto permite una serie de mejoras.

* Mayor velocidad de renderizado de la pantalla. El código HTML generado mediante javascript es significativamente más lento, sobre todo en navegadores antiguos.
* Se facilitan las modificaciones y ajustes sobre las diferentes partes del componente ya que se tiene acceso a la mayoría de las mismas directamente desde la jsp.

Para facilitar aún más y simplificar el código necesario a la hora de invocar y configurar el componente, se ha definido una nomenclatura estándar a la hora de indicar los identificadores de los diferentes objetosHTML. De este modo no será necesario indicarle al componente todos los objetos HTML sobre los que debe
definir cada una de las funcionalidades.

### 5.1. Código HTML

Para simplificar la nomenclatura nodos los identificadores de los objetos HTML se derivan a partir del identificador base del componente table.

Para lograr una configuración mínima del componente js se deberá de implementar el siguiente código HTML en la jsp de la pantalla, cuidando los identificadores de cada elemento.

Para el ejemplo supongamos que el componente RUP table se invoca sobre el elemento base con identificador table.

Partiendo de esto, el resto de identificadores se derivarán a partir de la norma:

    table_<componente>

Este sería un ejemplo del código HTML que se debería de incluir en la jsp:

```xml
<div id="table_div" class="rup-table-container">
  <div id="table_feedback"></div>
  <div id="table_toolbar"></div>
  <div id="table_filter_div" class="rup-table-filter">
    <form id="table_filter_form">
      <div id="table_filter_toolbar" class="formulario_legend"></div>
      <fieldset id="table_filter_fieldset" class="rup-table-filter-fieldset">
        <!-- Campos del formulario de detalle -->
        <div id="table_filter_buttonSet" class="right_buttons">
          <input id="table_filter_filterButton" type="button" class="ui-button ui-widget ui-state-default ui-corner-all" value='<spring:message code="filter" />' />
          <a id="table_filter_cleanLink" href="javascript:void(0)" class="rup-enlaceCancelar"><spring:message code="clear" /></a>
        </div>
      </fieldset>
    </form>
  </div>
  <div id="table_grid_div">
    <!-- Tabla -->
    <table id="table"></table>
    <!-- Barra de paginación -->
    <div id="table_pager"></div>
  </div>
</div>

```

La funcionalid adasociada a cada identificador sería:

* **table_div**: Capa contenedora del componente table. Contendrá todos los módulos del mismo excepto el formulario de detalle.
* **table_feedback**: Elemento sobre el que se creará el feedback.
table_toolbar: Elemento sobre el que se creará la botonera que contendrá las acciones a realizar sobre los registros.
* **table_filter_div**: Capa que contiene el formulario de filtrado.
table_filter_form: Formulario de filtrado. Los campos incluidos en este formulario se utilizarán como valores de filtrado de los registros.
* **table_filter_toolbar**: Capa que contendrá los controles de operación del fomulario de filrado (plegar,desplegar, resumen de criterios de filtrado,..)
* **table_filter_fieldset**: Fieldset que contendrá los campos del formulario de filtrado.
* **filter_buttonSet**: Botonera del formulario de filtrado.
* **table_filter_filterButton**: Botón que realiza el filtrado de los registros de la tabla.
* **table_filter_cleanLink**: Enlace que realiza la limpieza de los campos del formulario.
* **table_grid_div**: Capa que contiene la tabla propiamente dicha.
* **table**: Componente HTML sobre el que se inicializa el componente RUP table.
* **table_pager**: Paginador de la tabla.

En caso de querer utilizar la edición en formulario se deberá de incluir en la misma jsp el siguiente código HTML:

```xml
<div id="table_detail_div" class="rup-table-formEdit-detail">
  <div id ="table_detail_navigation"></div>
  <div class="ui-dialog-content ui-widget-content" >
    <form id="table_detail_form">
      <div id ="table_detail_feedback"></div>
      <!-- Campos del formulario de detalle -->
    </form>
  </div>
  <div class="rup-table-buttonpane ui-widget-content ui-helper-clearfix">
    <div class="ui-dialog-buttonset">
      <button id="table_detail_button_save" type="button">
        <spring:message code="save" />
      </button>
      <button id="table_detail_button_save_repeat" type="button">
        <spring:message code="saveAndContinue" />
      </button>
      <a href="javascript:void(0)" role="button" id="table_detail_link_cancel"class="rup-enlaceCancelar"><spring:message code="cancel" /></a>
    </div>
  </div>
</div>
```

La funcionalidad asociada a cada identificador sería:
* **table_detail_div**: Capa contenedora del formulario de detalle.
* **table_detail_navigation**: Capa donde se incluirán los controles de navegación y información de los registros.
* **table_detail_form**: Formulario que contendrá los campos que permitirán la edición de los registros.
* **table_detail_feedback**: Feedback del formulario de detalle.
* **table_detail_button_save**: Botón de guardado del registro.
* **table_detail_button_save_repeat**: Botón que permite guarder el registro y continuar el proceso de edición.
* **table_detail_link_cancel**: Enlace que permite cancelar el proceso de edición.

### 5.1. Código Javascript

La invocación del componente propiamente dicha se realizará desde el fichero js correspondiente a la página. Si se ha seguido la nomenclatura del apartado anterior se requerirá únicamente de una
configuración mínima:

```js
$("#table").rup_table({
  url: "../tableUrl",
  colNames: [
    "id","nombre","..."]
  ],
  colModel: [
    {name: "id", label: "id"},
    {name: "nombre", label: "nombre"},
    {name: "...", label: "..."}
  ],
  model:"Usuario",
  usePlugins:[
    "formEdit",
    "feedback",
    "toolbar",
    "contextMenu",
    "fluid",
    "filter",
    "search"
  ],
  primaryKey: "id"
});
```

El uso y configuración de los diferentes plugins de la tabla se especifica en el siguiente apartado.

## 6. Plugins

El componente table se ha implementado siguiendo una arquitectura modular. De este modo se consigue:
* Integrar las diferentes funcionalidades como plugins independientes logrando una nula interdependencia entre ellas.
* Facilitar y simplificar el mantenimiento y la aplicación de correctivos en el componente.
* Simplificar la extensión y sobreescritura de los métodos de determinados plugins.
* Permitir la creación de nuevas funcionalidades e incluirlas en el componente de manera sencilla e inocua para el resto de funcionalidades existentes.

El uso de los diferentes plugins se determina en la declaración del componente. Mediante la propiedad
*usePlugins* se determina los que se desean utilizar.

La configuración de cada uno de los plugins se indica mediante propiedades de configuración con el mismo nombre que el plugin correspondiente.

Un ejemplo sería el siguiente:

```js
$("#idComponente").rup_table({
  url: "../jqGridUsuario",
  usePlugins:["formEdit", "feedback", "toolbar", "contextMenu"],
  formEdit:{
  // Propiedades de configuración del plugin formEdit
  },
  contextMenu:{
  // Propiedades de configuración del plugin contextMenu
  }
});
```

Los detalles de cada uno de los plugins se pueden consultar en los documentos correspondientes:

* Core
* Menú contextual
* Feedback
* Filtrado
* Multifiltrado
* Diseño líquido
* Edición en formulario
* Edición en línea
* Jerarquía
* Maestro - detalle
* Multiselección
* Búsqueda
* Botonera
* Reporting

## 7. Sobreescritura del theme
El componente *tabla* se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.table-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos (*codAppStatics/WebContent/codApp/styles*).

Los estilos del componente se basan en los estilos básicos de los widgets de *jQuery UI*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente o mediante el uso de la herramienta Theme Roller podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).


## 8. Internacionalización (i18n)

La gestión de los literales de la tabla se realiza a través de ficheros json lo que flexibiliza el desarrollo. Para acceder a los literales se hará uso del objeto base RUP, mediante éste se accederá al objeto json correspondiente según el idioma obteniendo tanto los literales como los propios mensajes.

Los literales definidos para el contenido de la tabla son texto simple. Para este componente los literales
utilizados están en la parte global de la internacionalización dentro de los resources de rup.

El objeto de internacionalización de la tabla se encuentra accesible del siguiente modo:

    $.rup.i18n.base.rup_table


## 9. Integración con UDA

La interacción entre la capa de presentación y el servidor de aplicaciones que requiere el componente, hace uso de una serie de clases y configuraciones para facilitar su gestión.

El componente ha sido implementado de manera que sea fácilmente extensible mediante plugins. Debido a
esto es posible dotar al componente de funcionalidades extra que se ajusten a las necesidades de nuestra aplicación.

Dependiendo del tipo de nueva funcionalidad que se necesite es muy posible que la información que se transfiera se incremente.

Para facilitar este proceso y flexibilizar el proceso de extensibilidad del componente se ha implementado una serie de componentes que se presupondrá que son utilizadas a la hora de explicar su funcionamiento.

### 9.1. Comunicación con la capa servidor

La comunicación entre el componente y la capa servidor se realiza principalmente mediante en envío y
recepción de objetos JSON.

Para facilitar los procesos de serialización y deserialización entre los objetos JSON y Java se proporcionan las siguientes clases Java:

* **com.ejie.x38.dto.JQGridRequestDto**: Clase encargada de almacenar la información del JSON enviado por el componente. Después del proceso de deserialización este será el objeto resultante que se obtendrá a partir del objeto JSON enviado.

* **com.ejie.x38.dto.JQGridResponseDto**: Clase encargada de almacenar las propiedades que después del proceso de serialización, se convertirán en propiedades del objeto JSON que deberá de ser enviado al componente.

### 9.2. Configuración de Spring

Es necesario incluir la siguiente configuración en los ficheros de configuración de Spring:

En el fichero mvc-config.xml se deberá de especificar el uso de un Argument Resolver para gestiónar el uso de las anotaciones ```@RequestBodyJson```.

[mvc-config.xml]

```xml
<bean id="requestMappingHandlerAdapter"
class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
  <!-- Resto de configuración... -->
  <property name="customArgumentResolvers">
    <list>
      <bean class="com.ejie.x38.control.view.RequestFormEntityMethodArgumentResolver"/>
    </list>
  </property>
</bean>
```

### 9.3. Métodos controller

Estos son los métodos generados en el Controller para gestionar las peticiones de las diferentes operaciones del componente table:

* Filtrado:
```java
@RequestMapping(value = "/filter", method = RequestMethod.POST)
public @ResponseBody JQGridResponseDto<Usuario> filter(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto) {
  JQGridUsuarioController.logger.info("[POST - jqGrid] : Obtener Usuarios");
  return jqGridUsuarioService.filter(filterUsuario, jqGridRequestDto, false);
}
```

* Búsqueda:
```java
@RequestMapping(value = "/search", method = RequestMethod.POST)
public @ResponseBody List<TableRowDto<Usuario>> search(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody(param="search") Usuario searchUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto){
  JQGridUsuarioController.logger.info("[POST - search] : Buscar Usuarios");
  return jqGridUsuarioService.search(filterUsuario, searchUsuario, jqGridRequestDto, false);
}
```

* Borrado múltiple:
```java
@RequestMapping(value = "/deleteAll", method = RequestMethod.POST)
@ResponseStatus(value=HttpStatus.OK)
public @ResponseBody List<String> removeMultiple(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto) {
  JQGridUsuarioController.logger.info("[POST - removeMultiple] : Eliminar multiples usuarios");
  this.jqGridUsuarioService.removeMultiple(filterUsuario, jqGridRequestDto, false);
  JQGridUsuarioController.logger.info("All entities correctly deleted!");
  return jqGridRequestDto.getMultiselection().getSelectedIds();
}
```

* Filtrado jerarquía:
```java
@RequestMapping(value = "/jerarquia/filter", method = RequestMethod.POST)
public @ResponseBody JQGridResponseDto< JerarquiaDto< Usuario>> jerarquia(
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto) {
  JQGridUsuarioController.logger.info("[POST - jerarquia] : Obtener Usuarios Jerarquia");
  return this.jqGridUsuarioService.jerarquia(filterUsuario, jqGridRequestDto, false);
}
```

* Obtención hijos jerarquía:
```java
@RequestMapping(value = "/jerarquiaChildren", method = RequestMethod.POST)
public @ResponseBody JQGridResponseDto<JerarquiaDto<Usuario>> jerarquiaChildren (
@RequestJsonBody(param="filter") Usuario filterUsuario,
@RequestJsonBody JQGridRequestDto jqGridRequestDto){
  JQGridUsuarioController.logger.info("[GET - jqGrid] : Obtener Jerarquia - Hijos");
  return this.jqGridUsuarioService.jerarquiaChildren(filterUsuario,jqGridRequestDto);
}
```
