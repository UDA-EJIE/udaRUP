# Componentes RUP - Table


## 1. IntroducciÃ³n

La descripciÃ³n del componente table, visto desde el punto de vista de RUP, es la siguiente:

*Se les presenta a los usuarios los datos tabulados para que la informaciÃ³n se visualice de manera Ã¡gil y rÃ¡pida, facilitando asÃ­ su comprensiÃ³n y manejo. AdemÃ¡s, el componente implementa un nuevo patrÃ³n definido para facilitar la lÃ³gica necesaria en las acciones bÃ¡sicas, denominadas CRUD (create, read,update y delete), sobre una tabla.*


## 2. Ejemplo

Se muestra a continuaciÃ³n una maquetaciÃ³n tÃ­pica del componente:

![Imagen 1](img/rup.table_1.png)

## 3. Casos de uso

Se aconseja la utilizaciÃ³n de este componente:

* Cuando se tenga que presentar a los usuarios filas de datos y se desee facilitar la bÃºsqueda de datos.
* Cuando se realicen mantenimientos de tablas haciendo uso de las especificaciones establecidas en la guÃ­a de desarrollo de UDA.


## 4. Infraestructura

A continuaciÃ³n se comenta la infraestructura necesaria para el correcto funcionamiento del componente.

ÃƒÅ¡nicamente se requiere la inclusiÃ³n de los ficheros que implementan el componente (js y css) comentados en los apartados *Ficheros* y *Dependencias*.

### 4.1. Ficheros

- Ruta Javascript: rup/scripts/
- Fichero de plugin: rup.table-x.y.z.js
- Ruta theme: rup/css/
- Fichero de estilos: +theme.table-x.y.z.css+ (modificable por el desarrollador), jquery.table.css (fichero base del table), buttons.table.css (fichero base del plugin 'buttons'), select.table.css (fichero base del plugin 'select').
- Ruta fichero de recursos: rup/resources/table_idioma.json

### 4.2. Dependencias

Por la naturaleza de desarrollo de los componentes (patrones) como *plugins* basados en la librerÃ­a *JavaScript* **jQuery**, es necesaria la inclusiÃ³n de esta como capa base. La versiÃ³n elegida para el desarrollo ha sido la **3.4.1**.
* **jQuery 3.4.1**: http://jquery.com/

Los ficheros necesarios para el correcto funcionamiento del componente son:

    jquery-3.4.1.js
    rup.base-x.y.z.js
    rup.table-x.y.z.js
    jquery.table.css
    buttons.table.css
    select.table.css
    Ejemplos online: https://datatables.net/examples/index

### 4.3 VersiÃ³n minimizada

A partir de la versiÃ³n v2.4.0 se distribuye la versiÃ³n minimizada de los componentes **RUP**. Estos ficheros contienen la versiÃ³n compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente **RUP**.

Los ficheros minimizados de RUP son los siguientes:
* **rup/scripts/min/rup.min-x.y.z.js**
* **rup/css/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberÃ¡n de emplearse en tareas de desarrollo o depuraciÃ³n.

## 5. InvocaciÃ³n

El componente table necesita de una invocaciÃ³n de una llamada javascript sobre una estructura HTML existente.

Cada mÃ³dulo del componente asocia funcionalidades y eventos a los diferentes objetos de la estructura HTML. De esto modo los componentes feedback, formulario de filtrado, formulario de detalle o multiselecciÃ³n entre otros, deberÃ¡n de construirse sobre objetos HTML.

En el componente table se ha optado por minimizar el cÃ³digo HTML que se genera al vuelo mediante javascript. Esto permite una serie de mejoras.

* Mayor velocidad de renderizado de la pantalla. El cÃ³digo HTML generado mediante javascript es significativamente mÃ¡s lento, sobre todo en navegadores antiguos.
* Se facilitan las modificaciones y ajustes sobre las diferentes partes del componente ya que se tiene acceso a la mayorÃ­a de las mismas directamente desde la jsp.

Para facilitar aÃºn mÃ¡s y simplificar el cÃ³digo necesario a la hora de invocar y configurar el componente, se ha definido una nomenclatura estÃ¡ndar a la hora de indicar los identificadores de los diferentes objetos HTML. De este modo no serÃ¡ necesario indicarle al componente todos los objetos HTML sobre los que debe definir cada una de las funcionalidades.

### 5.1. CÃ³digo HTML

Para simplificar la nomenclatura nodos los identificadores de los objetos HTML se derivan a partir del identificador base del componente table.

Para lograr una configuraciÃ³n mÃ­nima del componente js se deberÃ¡ de implementar el siguiente cÃ³digo HTML en la jsp de la pantalla, cuidando los identificadores de cada elemento.

Para el ejemplo supongamos que el componente RUP table se invoca sobre el elemento base con identificador table.

Partiendo de esto, el resto de identificadores se derivarÃ¡n a partir de la norma:

    tableID_<componente>

Este serÃ­a un ejemplo del cÃ³digo que se deberÃ­a de incluir en la jsp:

```xml
<%@include file="/WEB-INF/includeTemplate.inc"%>
<h2>Table</h2> <!-- Titulo pagina -->

<jsp:include page="includes/filterForm.jsp"></jsp:include>

<table id="example" class="tableFit table-striped table-bordered table-material" data-url-base="./tableUsuario" data-filter-form="#table_filter_form">
    <thead>
        <tr>
            <th data-col-prop="id">Id</th>
            <th data-col-prop="nombre">Nombre</th>
            <th data-col-prop="apellido1">Primer apellido</th>
            <th data-col-prop="ejie" data-col-type="checkbox">Ejie</th>
            <th data-col-prop="fechaAlta" data-col-sidx="fecha_alta" data-col-type="date">Fecha alta</th>
            <th data-col-prop="fechaBaja" data-col-type="date">Fecha baja</th>
            <th data-col-prop="rol" data-col-type="combo">Rol</th>
        </tr>
    </thead>
</table>

<jsp:include page="includes/tableEdit.jsp"></jsp:include>
```

* **table**: Componente HTML sobre el que se inicializa el componente RUP table.
* **data-filter-form**: Identificador del formulario de filtrado. Hay que definirlo siempre excepto cuando no se quiere usar el formulario de filtrado y Hdiv no estÃ¡ activado. 
* **data-col-prop**: Identificador de la columna que va asociado a los formularios.
* **data-col-type**: Tipo que hace correspondencia con los RUP.
* **data-col-sidx**: Identificador de base de datos.
* **tfoot**: Se usa para el formulario de filtrado. Los campos incluidos en este formulario se utilizarÃ¡n como valores de filtrado de los registros.

### 5.1. CÃ³digo Javascript

La invocaciÃ³n del componente propiamente dicha se realizarÃ¡ desde el fichero js correspondiente a la pÃ¡gina. Si se ha seguido la nomenclatura del apartado anterior se requerirÃ¡ Ãºnicamente de una
configuraciÃ³n mÃ­nima:

```js
jQuery(function($){
    // Definición del modelo de columnas.
    const tableColModel = [
        {
            name: 'nombre',
            index: 'nombre',
            editable: true,
            hidden: false
        },
        {
            name: 'apellido1',
            index: 'apellido1',
            editable: true,
            hidden: false,
            rupType: 'autocomplete',
            editoptions: {
                source : './apellidos',
                sourceParam : {label: 'label', value: 'value'},
                menuMaxHeight: 200,
                minLength: 3,
                combobox: true,
                contains: true
            }
        },
        { 
            name: "apellido2", 
            index: "apellido2", 
            editable: true, 
            hidden: true
        },
        {
            name: 'ejie',
            index: 'ejie',
            editable: true,
            hidden: false,
            orderable: false,
            edittype: 'checkbox'
        },
        {
            name: 'fechaAlta',
            index: 'fechaAlta',
            editable: true,
            hidden: false,
            rupType: 'date',
            editoptions: {
                labelMaskId: 'fecha-mask',
                showButtonPanel: true,
                showOtherMonths: true,
                noWeekend: true
            }
        },
        {
            name: 'fechaBaja',
            index: 'fechaBaja',
            editable: true,
            hidden: false,
            rupType: 'date',
            editoptions: {
                labelMaskId: 'fecha-mask',
                showButtonPanel: true,
                showOtherMonths: true,
                noWeekend: true
            }
        },
        {
            name: 'rol',
            index: 'rol',
            editable: true,
            hidden: false,
            rupType: 'combo',
            editoptions: {
                source : './roles',
                sourceParam : {label: 'label', value: 'value'},
                blank: '',
                width: '100%',
                customClasses: ['select-material']
            }
        }
    ];

    // Formulario de filtrado.
    jQuery("#ejie_filter_table").rup_combo({
        source : './ejie',
        sourceParam : {label: 'label', value: 'value'},
        blank: '',
        width: '100%',
        customClasses: ['select-material']
    });
    jQuery('#rol_filter_table').rup_combo({
        source : './roles',
        sourceParam : {label: 'label', value: 'value'},
        blank: '',
        width: '100%',
        customClasses: ['select-material']
    });
    jQuery("#fechaAlta_filter_table").rup_date();
    jQuery("#fechaBaja_filter_table").rup_date();

    // Inicialización de la tabla.
    $('#example').rup_table({
        colModel: tableColModel
        multiSelect: {
            style: 'multi'
        },
        order: [[ 1, 'asc' ]],
        columnDefs: [ {
            orderable: false,
            className: 'select-checkbox',
            targets:   0
        } ],
        fixedHeader: {
            footer: false,
            header:true
        },
        formEdit:{
            detailForm: "#table_detail_div",
            width: 650,
            validate:{
                rules:{
                    "nombre": {
                        required: true
                    },
                    "apellido1": {
                        required: true
                    },
                    "fechaAlta": {
                        date: true
                    },
                    "fechaBaja": {
                        date: true
                    }
                }
            }
        }
    });
});
```

El uso y configuraciÃ³n de los diferentes plugins del table se especifica en el siguiente apartado.

## 6. Plugins

El componente table se ha implementado siguiendo una arquitectura modular. De este modo se consigue:
* Integrar las diferentes funcionalidades como plugins independientes logrando una pequeÃ±a interdependencia entre ellas.
* Facilitar y simplificar el mantenimiento y la aplicaciÃ³n de correctivos en el componente.
* Simplificar la extensiÃ³n y sobreescritura de los mÃ©todos de determinados plugins.
* Permitir la creaciÃ³n de nuevas funcionalidades e incluirlas en el componente de manera sencilla e inocua para el resto de funcionalidades existentes.

Todas las tablas, disponen de las siguientes opciones:
* Devuelve los identificadores de todos los elementos seleccionados:
    ```javascript
    $("#idTable").rup_table("getSelectedIds");
    ```
* Devuelve todos los datos seleccionados y que estén cargados (en la página actual):
    ```javascript
    $("#idTable").rup_table("getSelectedRows");
    ```
* Devuelve los identificadores de todos los elementos seleccionadas, además de la línea y página en la que están:
    ```javascript
    $("#idTable").rup_table("getSelectedRowPerPage");
    ```
* Obtener el contexto de la tabla:
    ```javascript
    $("#idTable").rup_table("getContext");
    ```
* Vacía las filas de la tabla:
    ```javascript
    $("#idTable").rup_table("clear");
    ```
* Recarga la tabla:
    ```javascript
    $("#idTable").rup_table("reload");
    ```
    
Cabe decir que todos los plugins están montados sobre el contexto de la tabla, por ese motivo, dentro del contexto puedes acceder a todas sus propiedades y a todos sus plugins, por ejemplo:
```javascript
var ctx = $("#idTable").rup_table("getContext");
ctx.seeker;
```

Los detalles de cada uno de los plugins se pueden consultar en los documentos correspondientes:
* Core
* MenÃº contextual
* Feedback
* Filtrado
* DiseÃ±o responsivo (RWD)
* EdiciÃ³n en formulario
* MultiselecciÃ³n
* BÃºsqueda (seeker)
* Botonera
* Reporting (Parcial)
* EdiciÃ³n en linea
* ColReorder
* SelecciÃ³n simple
* Maestro detalle
* RowGroup
* Multifilter

Propiedades de la tabla:
* **multiplePkToken**: token a usar cuando el identificador sea compuesto.
* **primaryKey**: identificador principal de la tabla.
* **blockPKeditForm**: si deseas que el campo que contiene la clave primaria esté bloqueado en modo edición (`true` o `false`).
* **searchPaginator**: si deseas tener paginador con número o no (`true` o `false`).
* **defaultOrder**: especifica que la tabla tome la primera columna como criterio de ordenación por defecto (valor por defecto: `true`).      

Para obtener las propiedades del plugin subyacente consultar en https://datatables.net/reference/api/

## 7. Sobreescritura del theme

El componente *table* se presenta con una apariencia visual definida en el fichero de estilos **theme.rup.table-x.y.z.css**.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicaciÃ³n situado dentro del proyecto de estÃ¡ticos (*codAppStatics/WebContent/codApp/styles*).

Los estilos del componente se basan en *Bootstrap*, con lo que los cambios que se realicen sobre su fichero de estilos manualmente podrÃ¡n tener repercusiÃ³n sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusiÃ³n general o ajustado a un subconjunto de componentes).


## 8. InternacionalizaciÃ³n (i18n)

La gestiÃ³n de los literales del table se realiza a travÃ©s de ficheros json, lo que flexibiliza el desarrollo. Para acceder a los literales se harÃ¡ uso del objeto base RUP, mediante Ã©ste se accederÃ¡ al objeto json correspondiente segÃºn el idioma obteniendo tanto los literales como los propios mensajes.

Los literales definidos para el contenido del table son texto simple. Para este componente los literales utilizados estÃ¡n en la parte global de la internacionalizaciÃ³n dentro de los resources de rup.

El objeto de internacionalizaciÃ³n del table se encuentra accesible del siguiente modo:

    $.rup.i18n.base


## 9. IntegraciÃ³n con UDA

La interacciÃ³n entre la capa de presentaciÃ³n y el servidor de aplicaciones que requiere el componente, hace uso de una serie de clases y configuraciones para facilitar su gestiÃ³n.

El componente ha sido implementado de manera que sea fÃ¡cilmente extensible mediante plugins. Debido a esto es posible dotar al componente de funcionalidades extra que se ajusten a las necesidades de nuestra aplicaciÃ³n.

Dependiendo del tipo de nueva funcionalidad que se necesite es muy posible que la informaciÃ³n que se transfiera se incremente.

Para facilitar este proceso y flexibilizar el proceso de extensibilidad del componente se ha implementado una serie de componentes que se presupondrÃ¡ que son utilizadas a la hora de explicar su funcionamiento.

### 9.1. ComunicaciÃ³n con la capa servidor

La comunicaciÃ³n entre el componente y la capa servidor se realiza principalmente mediante el envÃ­o y recepciÃ³n de objetos JSON.

Para facilitar los procesos de serializaciÃ³n y deserializaciÃ³n entre los objetos JSON y Java se proporcionan las siguientes clases Java:

* **com.ejie.x38.dto.TableRequestDto**: Clase encargada de almacenar la informaciÃ³n del JSON enviado por el componente. DespuÃ©s del proceso de deserializaciÃ³n este serÃ¡ el objeto resultante que se obtendrÃ¡ a partir del objeto JSON enviado.

* **com.ejie.x38.dto.TableResponseDto**: Clase encargada de almacenar las propiedades que despuÃ©s del proceso de serializaciÃ³n, se convertirÃ¡n en propiedades del objeto JSON que deberÃ¡ de ser enviado al componente.

### 9.2. ConfiguraciÃ³n de Spring

Es necesario incluir la siguiente configuraciÃ³n en los ficheros de configuraciÃ³n de Spring:

En el fichero *mvc-config.xml* se deberÃ¡ de especificar el uso de un Argument Resolver para gestiÃ³nar el uso de las anotaciones ```@RequestBodyJson```.

[mvc-config.xml]

```xml
<bean id="requestMappingHandlerAdapter" class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter">
  <!-- Resto de configuraciÃ³n... -->
  <property name="customArgumentResolvers">
    <list>
      <bean class="com.ejie.x38.control.view.RequestFormEntityMethodArgumentResolver"/>
    </list>
  </property>
</bean>
```

### 9.3. MÃ©todos controller

Estos son los mÃ©todos generados en el Controller para gestionar las peticiones de las diferentes operaciones del componente table:

* Filtrado:
```java
@RequestMapping(value = "/filter", method = RequestMethod.POST)
public @ResponseBody TableResponseDto<Usuario> filter(@RequestJsonBody(param="filter") Usuario filterUsuario, @RequestJsonBody TableRequestDto tableRequestDto) {
    TableUsuarioController.logger.info("[POST - table] : Obtener Usuarios");
    return tableUsuarioService.filter(filterUsuario, tableRequestDto, false);
}
```

* BÃºsqueda:
```java
@RequestMapping(value = "/search", method = RequestMethod.POST)
public @ResponseBody List<TableRowDto<Usuario>> search(@RequestJsonBody(param="filter") Usuario filterUsuario, @RequestJsonBody(param="search") Usuario searchUsuario, @RequestJsonBody TableRequestDto tableRequestDto){
    TableUsuarioController.logger.info("[POST - search] : Buscar Usuarios");
    return tableUsuarioService.search(filterUsuario, searchUsuario, tableRequestDto, false);
}
```

* Borrado mÃºltiple:
```java
@RequestMapping(value = "/deleteAll", method = RequestMethod.POST)
@ResponseStatus(value=HttpStatus.OK)
public @ResponseBody List<String> removeMultiple(@RequestJsonBody(param="filter") Usuario filterUsuario, @RequestJsonBody TableRequestDto tableRequestDto) {
    TableUsuarioController.logger.info("[POST - removeMultiple] : Eliminar multiples usuarios");
    this.tableUsuarioService.removeMultiple(tableRequestDto);
    TableUsuarioController.logger.info("All entities correctly deleted!");
    return tableRequestDto.getMultiselection().getSelectedIds();
}
```

* Copia de registros:
```java
@RequestMapping(value = "/clipboardReport", method = RequestMethod.POST)
protected @ResponseBody List<Usuario> getClipboardReport(@RequestJsonBody(param = "filter", required = false) Usuario filterUsuario, @RequestJsonBody TableRequestDto tableRequestDto) {
    TableUsuarioController.logger.info("[POST - clipboardReport] : Copiar multiples usuarios");
    return this.tableUsuarioService.getDataForReports(filterUsuario, tableRequestDto);
}
```
### 9.5. Propiedades adicionales

```js
Plugins.noEdit = true 
```
Por defecto siempre es false y si se activa, deja sÃ³lo el botÃ³n de informes. Cabe decir que es necesario declararlo con valor true siempre y cuando no se vaya a usar ni el formulario de ediciÃ³n de la tabla (formEdit) ni la ediciÃ³n en lÃ­nea (inlineEdit).
&nbsp;

```js
//ParÃ¡metros: jqXHR jqXHR, String textStatus, String errorThrown
Plugins.customError =  function(qXHR, textStatus, errorThrown ){
    let ctx = $('#'+idTabla).rup_table("getContext"); 
    cargarFeedback(ctx, qXHR.responseText, textStatus); 
}
```
Se puede cargar una funciÃ³n para que los errores que vienen de ajax.
&nbsp;

```js
Plugins.filter = 'noFilter' 
```
Por defecto carga un filtro si el usuario no ha puesto el suyo propio. Si se define como 'noFilter', es para indicar a la tabla que no se quiere habilitar el filtro de tal manera que no haga la validaciÃ³n correspondiente. 

Cabe decir que en los casos en los que se use Hdiv hay que crear igualmente un formulario de filtrado para que se pueda realizar el envÃ­o del parÃ¡metro HDIV_STATE (necesario para Hdiv). Por ejemplo:
```html
<!-- Formulario necesario para garantizar el correcto funcionamiento con Hdiv cuando filter = 'noFilter' -->
<spring:url value="/table/dynamicColumns/filter" var="url"/>
<form:form modelAttribute="usuario" id="columnasDinamicas_filter_form" class="d-none" action="${url}"/>
```
&nbsp;

```js
Plugins.formEdit.width = 650 
```
Permite cambiar la anchura en pÃ­xeles que tendrÃ¡ el formulario de ediciÃ³n. Si no se define, obtendrÃ¡ el valor por defecto que equivale a 569 pÃ­xeles.
&nbsp;

```js
//ParÃ¡metros: jqXHR jqXHR, String textStatus, String errorThrown
Plugins.customError =  function miError(qXHR, textStatus, errorThrown ){
    let ctx = $('#'+idTabla).rup_table("getContext"); 
    cargarFeedback(ctx, qXHR.responseText, textStatus); 
}
```
Se puede cargar una funciÃ³n para que los errores que vienen de ajax.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: formEdit e inlineEdit.
Plugins.validarEliminar =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al eliminar.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: formEdit e inlineEdit.
Plugins.validarModificar  =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al guardar en la ediciÃ³n de la tabla.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: formEdit.
Plugins.validarModificarContinuar =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al guardar y continuar en la ediciÃ³n de la tabla.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: todos siempre que exista el filtrado.
Plugins.validarFiltrar  =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al filtrar en la tabla.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: seeker.
Plugins.validarBuscar =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al buscar con el seeker.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: formEdit e inlineEdit.
Plugins.validarAlta  =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al hacer un nuevo registro.
&nbsp;

```js
//ParÃ¡metros: ctx -> el contexto de la tabla
//valido: Para los plugins: formEdit.
Plugins.validarAltaContinuar =  function miFuncion(ctx){
    if($('#apellido1_detail_table_'+ctx.sTableId).val() !== 'ruiz'){
     	return true;//no paso la validaciÃ³n;
    } 
    return false;//paso la validaciÃ³n
};
```
Se puede cargar una funciÃ³n y hacer un validaciÃ³n externa al hacer un nuevo registro y continuar.
&nbsp;

```js
plugins.feedback.customGoTo  = function miFuncion(){
	return $('#example_containerToolbar').offset().top ;
} 
```
Se puede personalizar el feedback para que cuando aparezca, suba la posiciÃ³n hasta donde el desarrollador quiera, hay que devolver un nÃºmero.
&nbsp;

```js
// Su valor por defecto es false
Plugins.enableDynamicForms = true
```
Permite habilitar el uso de formularios dinámicos aunque hay que hacer algunos cambios en las JSPs de edición. En [este documento](./rup.table.editForm.md#propiedades-de-configuración) puede encontrarse más información al respecto.
&nbsp;

```js
const miColModel = [
    {
        name: 'nombre',
        index: 'nombre',
        editable: true,
        hidden: false
    },
    {
        name: 'apellido1',
        index: 'apellido1',
        editable: true,
        hidden: false,
        rupType: 'autocomplete',
        editoptions: {
            source : './apellidos',
            sourceParam : {label: 'label', value: 'value'},
            menuMaxHeight: 200,
            minLength: 3,
            combobox: true,
            contains: true
        }
    },
    { 
    	name: "apellido2", 
    	index: "apellido2", 
    	editable: true, 
    	hidden: true
    },
    {
        name: 'ejie',
        index: 'ejie',
        editable: true,
        hidden: false,
        orderable: false,
        edittype: 'checkbox'
    },
    {
        name: 'fechaAlta',
        index: 'fechaAlta',
        editable: true,
        hidden: false,
        rupType: 'date',
        editoptions: {
            labelMaskId: 'fecha-mask',
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: true
        }
    },
    {
        name: 'fechaBaja',
        index: 'fechaBaja',
        editable: true,
        hidden: false,
        rupType: 'date',
        editoptions: {
            labelMaskId: 'fecha-mask',
            showButtonPanel: true,
            showOtherMonths: true,
            noWeekend: true
        }
    },
    {
        name: 'rol',
        index: 'rol',
        editable: true,
        hidden: false,
        rupType: 'combo',
        editoptions: {
            source : './roles',
            sourceParam : {label: 'label', value: 'value'},
            blank: '',
            width: '100%',
            customClasses: ['select-material']
        }
    }
];

plugins.colModel = miColModel; 
```
El **colModel** se usa para modelar los campos de la tabla y es necesario para el correcto funcionamiento del formulario de ediciÃ³n. Es aquÃ­ dÃ³nde se han de inicializar los componentes RUP junto a sus propiedades para que UDA pueda encargarse de reinicializarlos en caso necesario.
&nbsp;

Propiedades destacadas:
* **name**: identificador del campo.
* **index**: índice del campo.
* **editable**: autoriza o bloquea la edición del campo.
* **hidden**: permite ocultar la columna.
* **orderable**: permite deshabilitar la ordenación de una columna.
* **rupType**: tipo RUP del campo.
* **edittype**: cuando se habilite la edición en línea y se defina esta propiedad con un valor "checkbox", la tabla convertirá un input normal en uno de tipo checkbox.
* **editoptions**: sirve para configurar todas las opciones de los campos RUP.

## 10. Aspectos a tener en cuenta
Siempre que se necesite filtrar la tabla por el campo que forme la clave primaria y Hdiv esté activado, será necesario enviar al servidor el valor cifrado. Esto significa que los valores a usar, siempre han tenido que ser enviados previamente por el servidor ya que mantiene una copia para impedir la inserción de valores desde el cliente, evitando así posibles ataques. 
En caso de hacer uso de un componente autocomplete o combo, puede usarse la entidad `AutocompleteComboPKsPOJO` para formar una lista que después se devolverá en la petición realizada por los componentes anteriormente mencionados y que por supuesto, tendrá los valores cifrados. A continuación, un ejemplo del uso de la entidad:

* Configuración de la vista:
    ```js
    $('#nameLog_filter_table').rup_autocomplete({
    	source : './name',
       	sourceParam : {label: 'label', value: 'value'},
       	menuMaxHeight: 200,
       	minLength: 3,
       	combobox: true,
       	contains: true,
       	showDefault: true
    });
    ```

* Controlador:
    ```java
    @UDALink(name = "getName")
    @RequestMapping(value = "/name", method = RequestMethod.GET)
    public @ResponseBody List<Resource<AutocompleteComboPKsPOJO>> getName(
            @RequestParam(value = "q", required = false) String q,
            @RequestParam(value = "c", required = false) Boolean c) {
        return LoggingEditor.getNames(q);
    }
    ```
    
* Servicio:
    ```java
    /** 
	 * Devuelve los nombres disponibles.
	 *
	 * @param q String enviado por el cliente para la búsqueda de resultados.
	 * @return List<Resource<AutocompleteComboPKsPOJO>>
	 */
	public static List<Resource<AutocompleteComboPKsPOJO>> getNames(String q) {		
		List<LogModel> listalogs = getLoggers((LoggerContext) LoggerFactory.getILoggerFactory(), false);
		List<AutocompleteComboPKsPOJO> columnValues = new ArrayList<AutocompleteComboPKsPOJO>();

		if(q != null) {
	    		q = Normalizer.normalize(q, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
		} else {
	    		q = "";
		}

		for (int i = 0; i < listalogs.size(); i++){	
	    		if (listalogs.get(i).getNameLog() != null) {
				String name = listalogs.get(i).getNameLog();
		    		name = Normalizer.normalize(name, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");

		    		if (q.equals("") || name.indexOf(q) >= 0) {
					columnValues.add(new AutocompleteComboPKsPOJO(name, name));
		    		}
	    		}
	    	}
		
	 	return ResourceUtils.fromListToResource(columnValues);
	}
    ```
