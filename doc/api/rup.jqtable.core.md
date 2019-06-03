<a name="module_rup_jqtable"></a>

## rup\_jqtable
Tiene como objetivo mostrar al usuario de manera gráfica el estado de avance de una tarea o proceso.

**Summary**: Componente RUP Table.  
**See**: El componente está basado en el plugin [jQuery Grid Plugin – jqGrid](http://www.trirand.com/blog/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://www.trirand.com/jqgridwiki/doku.php).  
**Example**  
```js
var properties = {		url: "../tableUrl",		colNames: [			"id","nombre","..."]		],		colModel: [			{name: "id", label: "id"},			{name: "nombre", label: "nombre"},			{name: "...", label: "..."}		],		model:"Usuario",		usePlugins:[			"formEdit",			"feedback",			"toolbar",			"contextMenu",			"fluid",			"filter",			"search"		],		primaryKey: "id"	};$("#jqtable").rup_jqtable(properties);
```

* [rup_jqtable](#module_rup_jqtable)
    * _instance_
        * ["rupTable_checkOutOfGrid"](#module_rup_jqtable+event_rupTable_checkOutOfGrid)
        * ["rupTable_serializeGridData"](#module_rup_jqtable+event_rupTable_serializeGridData)
        * ["rupTable_beforeProcessing"](#module_rup_jqtable+event_rupTable_beforeProcessing)
        * ["rupTableClearHighlightedRowAsSelected"](#module_rup_jqtable+event_rupTableClearHighlightedRowAsSelected)
        * ["rupTableHighlightRowAsSelected"](#module_rup_jqtable+event_rupTableHighlightRowAsSelected)
        * ["rupTable_coreConfigFinished"](#module_rup_jqtable+event_rupTable_coreConfigFinished)
    * _inner_
        * [~options](#module_rup_jqtable..options)
        * [~preConfigureCore(settings)](#module_rup_jqtable..preConfigureCore)
        * [~postConfigureCore(settings)](#module_rup_jqtable..postConfigureCore)
        * [~getColModel()](#module_rup_jqtable..getColModel) ⇒ <code>object</code>
        * [~getGridParam(pName)](#module_rup_jqtable..getGridParam) ⇒ <code>object</code>
        * [~getGridParam(options)](#module_rup_jqtable..getGridParam) ⇒ <code>jQuery</code>
        * [~getSelectedRows()](#module_rup_jqtable..getSelectedRows) ⇒ <code>Array.&lt;string&gt;</code>
        * [~getSelectedLines()](#module_rup_jqtable..getSelectedLines) ⇒ <code>Array.&lt;number&gt;</code>
        * [~getPkUrl(rowId)](#module_rup_jqtable..getPkUrl) ⇒ <code>string</code>
        * [~reloadGrid(async, notSelect)](#module_rup_jqtable..reloadGrid)
        * [~resetForm($form)](#module_rup_jqtable..resetForm) ⇒ <code>jQuery</code>
        * [~setGridParam(newParams)](#module_rup_jqtable..setGridParam) ⇒ <code>jQuery</code>
        * [~setSelection(selectedRows, status)](#module_rup_jqtable..setSelection)
        * [~showServerValidationFieldErrors($form, errors)](#module_rup_jqtable..showServerValidationFieldErrors)
        * [~rupTableClearHighlightedRowAsSelected($row)](#module_rup_jqtable..rupTableClearHighlightedRowAsSelected)
        * [~highlightRowAsSelected($row)](#module_rup_jqtable..highlightRowAsSelected)
        * [~updateDetailPagination(currentRowNumArg, totalRowNumArg)](#module_rup_jqtable..updateDetailPagination)
        * [~updateSavedData(arg)](#module_rup_jqtable..updateSavedData)
        * [~configurePager(settings)](#module_rup_jqtable..configurePager)
        * [~addRowData(rowid, data, position, srcrowid)](#module_rup_jqtable..addRowData) ⇒ <code>jQuery</code>
        * [~delRowData(rowid)](#module_rup_jqtable..delRowData) ⇒ <code>jQuery</code>
        * [~getActiveRowId()](#module_rup_jqtable..getActiveRowId) ⇒ <code>string</code>
        * [~getActiveLineId()](#module_rup_jqtable..getActiveLineId) ⇒ <code>string</code>
        * [~setRowData(rowid, data, cssp)](#module_rup_jqtable..setRowData)
        * [~getRowData(rowid)](#module_rup_jqtable..getRowData) ⇒ <code>object</code>
        * [~getDataIDs()](#module_rup_jqtable..getDataIDs) ⇒ <code>Array.&lt;string&gt;</code>
        * [~clearGridData(clearfooter)](#module_rup_jqtable..clearGridData)
        * [~getColModel()](#module_rup_jqtable..getColModel) ⇒ <code>object</code>
        * [~getCol(rowid, colName)](#module_rup_jqtable..getCol)
        * [~getSerializedForm(form, skipEmpty)](#module_rup_jqtable..getSerializedForm)
        * [~onOperation](#module_rup_jqtable..onOperation) : <code>function</code>
        * [~isEnabled](#module_rup_jqtable..isEnabled) ⇒ <code>boolean</code>
        * [~Operations](#module_rup_jqtable..Operations) : <code>Object</code>
        * [~ShowOperations](#module_rup_jqtable..ShowOperations)

<a name="module_rup_jqtable+event_rupTable_checkOutOfGrid"></a>

### "rupTable_checkOutOfGrid"
Evento que se produce al detectarse que el usuario interactua con un elemento externo a la tabla.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| $originalTarget | <code>jQuery</code> | Objeto jQuery que referencia el elemento del dom con el que ha interactuado el usuario. |

**Example**  
```js
$("#idComponente").on("rupTable_checkOutOfGrid", function(event,$originalTarget){ });
```
<a name="module_rup_jqtable+event_rupTable_serializeGridData"></a>

### "rupTable_serializeGridData"
Este evento se lanza durante el proceso de serialización de la información que va a ser enviada para obtener los registros que se van a mostrar en la tabla.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Información serializada que va a ser enviada. Se puede modificar o agregar nuevos campos para completarla. |

**Example**  
```js
$("#idComponente").on("rupTable_serializeGridData", function(event, data){});
```
<a name="module_rup_jqtable+event_rupTable_beforeProcessing"></a>

### "rupTable_beforeProcessing"
Evento que se lanza antes de que se procese la información recibida del servidor.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Información recibida del servidor. |
| st | <code>string</code> | Mensaje de status de la petición. |
| xhr | <code>object</code> | Objeto xhr recibido. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeProcessing", function(event, data, st,xhr){ });
```
<a name="module_rup_jqtable+event_rupTableClearHighlightedRowAsSelected"></a>

### "rupTableClearHighlightedRowAsSelected"
Se produce cuando se elimina el resaltado de un registro de la tabla.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| $row | <code>jQuery</code> | Objeto jQuery que identifica la línea que se ha procesado. |

**Example**  
```js
$("#idComponente").on("rupTableClearHighlightedRowAsSelected", function(event, $row){ });
```
<a name="module_rup_jqtable+event_rupTableHighlightRowAsSelected"></a>

### "rupTableHighlightRowAsSelected"
Se produce cuando se añade el resaltado a un registro de la tabla.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| $row | <code>jQuery</code> | Objeto jQuery que identifica la línea que se ha procesado. |

**Example**  
```js
$("#idComponente").on("rupTableHighlightedRowAsSelected", function(event, $row){ });
```
<a name="module_rup_jqtable+event_rupTable_coreConfigFinished"></a>

### "rupTable_coreConfigFinished"
Evento que se lanza después de que el componente haya finalizado con el proceso de configuración e inicialización.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_coreConfigFinished", function(event, $row){ });
```
<a name="module_rup_jqtable..options"></a>

### rup_jqtable~options
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**See**: Para mas información consulte la documentación acerca de las opciones de configuración del componente [jqGrid](http://www.trirand.com/jqgridwiki/doku.php).  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [altRows] | <code>boolean</code> | <code>true</code> | Determina si se aplica o no el pijama en las filas de la tabla. |
| [altclass] | <code>string</code> | <code>&quot;rupgrid_oddRow&quot;</code> | Estilo que se aplica a las filas impares para mostrar el efecto. |
| [datatype] | <code>string</code> | <code>&quot;json&quot;</code> | Formato de dato esperado para representar los registros de la tabla. |
| [height] | <code>string</code> | <code>&quot;auto&quot;</code> | Determina la altura de la tabla. |
| [jsonReader] | <code>object</code> | <code>{repeatitems: false}</code> | Parámetros de configuración que determinan el modo en el que se va a procesar el json de retorno del servidor |
| [resizable] | <code>boolean</code> | <code>false</code> | Determina si la tabla puede ser redimensionada mediante el ratón. |
| [rowNum] | <code>number</code> | <code>10</code> | Número de registros por página que se van a mostrar en la tabla. |
| [rowList] | <code>Array.&lt;number&gt;</code> | <code>[10,20,30]</code> | Lista de posibles valores para el número de elementos por página que se van a mostrar en el combo de selección correspondiente. |
| [sortable] | <code>boolean</code> | <code>true</code> | Determina si se permite variar el orden de las columnas arrastrándolas. |
| [viewrecords] | <code>boolean</code> | <code>true</code> | Indica si se debe mostrar el rango de elementos que se están visualizando en la tabla. |
| [loadOnStartUp] | <code>boolean</code> | <code>true</code> | Determina si se debe realizar automáticamente la búsqueda al cargar la página. |
| [multiplePkToken] | <code>string</code> | <code>&quot;~&quot;</code> | Separador que se utiliza en los casos en los que la clave primaria sea múltiple. Se creará una columna que contenga un identificador único resultante de la concatenación de las claves primarias realizada mediante el separador aquí indicado. |
| [operations] | [<code>Operations</code>](#module_rup_jqtable..Operations) |  | Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad. |
| [showOperations] | [<code>ShowOperations</code>](#module_rup_jqtable..ShowOperations) |  | Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos. |
| [startOnPage] | <code>number</code> | <code>1</code> | Permite especificar el número de página inicial que se mostrará al cargar la página. |

<a name="module_rup_jqtable..preConfigureCore"></a>

### rup_jqtable~preConfigureCore(settings)
Metodo que realiza la pre-configuración del core del componente RUP Table.Este método se ejecuta antes de la pre-configuración de los plugins y de la invocación al componente jqGrid.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Emits**: [<code>rupTable\_checkOutOfGrid</code>](#module_rup_jqtable+event_rupTable_checkOutOfGrid), [<code>rupTable\_serializeGridData</code>](#module_rup_jqtable+event_rupTable_serializeGridData), [<code>rupTable\_beforeProcessing</code>](#module_rup_jqtable+event_rupTable_beforeProcessing)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable..postConfigureCore"></a>

### rup_jqtable~postConfigureCore(settings)
Metodo que realiza la post-configuración del core del componente RUP Table.Este método se ejecuta antes de la post-configuración de los plugins y después de la invocación al componente jqGrid.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable..getColModel"></a>

### rup_jqtable~getColModel() ⇒ <code>object</code>
Devuelve la propiedad colModel del jqGrid.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>object</code> - - Propiedad colModel del jqGrid.  
**Example**  
```js
$("#idComponente").rup_jqtable("getColModel");
```
<a name="module_rup_jqtable..getGridParam"></a>

### rup_jqtable~getGridParam(pName) ⇒ <code>object</code>
Devuelve el valor del parámetro del grid especificado.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>object</code> - - Valor del parámetro.  

| Param | Type | Description |
| --- | --- | --- |
| pName | <code>string</code> | Nombre del parámetro que se desea obtener. |

**Example**  
```js
$("#idComponente").rup_jqtable("getGridParam","nombreParametro");
```
<a name="module_rup_jqtable..getGridParam"></a>

### rup_jqtable~getGridParam(options) ⇒ <code>jQuery</code>
Permite redimensionar la tabla de acuerdo a los parámetros indicados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>jQuery</code> - - Referencia al propio componente.  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Parámetros para configurar la altura y anchura del redimensionado. |

**Example**  
```js
$("#idComponente").rup_jqtable("gridResize",{});
```
<a name="module_rup_jqtable..getSelectedRows"></a>

### rup_jqtable~getSelectedRows() ⇒ <code>Array.&lt;string&gt;</code>
Devuelve un array con los identificadores de los registros seleccionados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>Array.&lt;string&gt;</code> - - Array con los identificadores de los registros seleccionados.  
**Example**  
```js
$("#idComponente").rup_jqtable("getSelectedRows");
```
<a name="module_rup_jqtable..getSelectedLines"></a>

### rup_jqtable~getSelectedLines() ⇒ <code>Array.&lt;number&gt;</code>
Devuelve un array con los índices de las líneas de los registros seleccionados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>Array.&lt;number&gt;</code> - - Array con los índices de las líneas de los registros seleccionados.  
**Example**  
```js
$("#idComponente").rup_jqtable("getSelectedLines");
```
<a name="module_rup_jqtable..getPkUrl"></a>

### rup_jqtable~getPkUrl(rowId) ⇒ <code>string</code>
El objetivo de este método es construir una URL mediante la cual se pueda realizar una petición para obtener los datos de un registro concreto.La URL se genera concatenando los valores de las propiedades que forman la primary key del resgistro a la url base especificada en los settings de inicialización.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>string</code> - - Url para obtener los valores del registro correspondiente.  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro. |

**Example**  
```js
$("#idComponente").rup_jqtable("getPkUrl","0001");
```
<a name="module_rup_jqtable..reloadGrid"></a>

### rup_jqtable~reloadGrid(async, notSelect)
Lanza la recarga de la tabla.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| async | <code>boolean</code> | Indica si la llamada debe ser asíncrona o síncrona. |
| notSelect | <code>boolean</code> | Indica si debe seleccionar el primer elemento o no. |

**Example**  
```js
$("#idComponente").rup_jqtable("reloadGrid", true);
```
<a name="module_rup_jqtable..resetForm"></a>

### rup_jqtable~resetForm($form) ⇒ <code>jQuery</code>
Resetea el formulario indicado.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>jQuery</code> - - Referencia al propio objeto.  

| Param | Type | Description |
| --- | --- | --- |
| $form | <code>jQuery</code> | Objeto jQuery que referencia el formulario que se desea resetear. |

**Example**  
```js
$("#idComponente").rup_jqtable("resetForm", $("#idFormulario"));
```
<a name="module_rup_jqtable..setGridParam"></a>

### rup_jqtable~setGridParam(newParams) ⇒ <code>jQuery</code>
Asigna a uno o varios parámetros del grid los valores indicados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>jQuery</code> - - Referencia al propio objeto.  

| Param | Type | Description |
| --- | --- | --- |
| newParams | <code>object</code> | Objeto que contiene los parámetros y sus valores. |

**Example**  
```js
$("#idComponente").rup_jqtable("setGridParam", {param1:value1, param2:value2});
```
<a name="module_rup_jqtable..setSelection"></a>

### rup_jqtable~setSelection(selectedRows, status)
Selecciona o deselecciona los registros indicados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| selectedRows | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Identificador o array de identificadores de los registros que se desea seleccionar o deseleccionar. |
| status | <code>boolean</code> | En caso de ser true se seleccionarán los registros indicados. En caso de ser false se deseleccionarán. |

**Example**  
```js
$("#idComponente").rup_jqtable("setSelection", ["3","7"], true);
```
<a name="module_rup_jqtable..showServerValidationFieldErrors"></a>

### rup_jqtable~showServerValidationFieldErrors($form, errors)
Muestra en los campos del formulario los errores de validación indicados.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| $form | <code>jQuery</code> | Objeto jQuery que referencia el formulario que se desea resetear. |
| errors | <code>object</code> | Objeto json que contiene los errores de validación que se han dado para cada campo. |

**Example**  
```js
$("#idComponente").rup_jqtable("showServerValidationFieldErrors ", $("#idFormulario"), {});
```
<a name="module_rup_jqtable..rupTableClearHighlightedRowAsSelected"></a>

### rup_jqtable~rupTableClearHighlightedRowAsSelected($row)
Elimina el resaltado de la línea especificada de la tabla.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Emits**: [<code>rupTableClearHighlightedRowAsSelected</code>](#module_rup_jqtable+event_rupTableClearHighlightedRowAsSelected)  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>jQuery</code> | Objeto jQuery que referencia a la línea de la tabla. |

**Example**  
```js
$("#idComponente").rup_jqtable("clearHighlightedRowAsSelected", $("#idFila"));
```
<a name="module_rup_jqtable..highlightRowAsSelected"></a>

### rup_jqtable~highlightRowAsSelected($row)
Resalta la línea especificada de la tabla.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Emits**: [<code>rupTableHighlightRowAsSelected</code>](#module_rup_jqtable+event_rupTableHighlightRowAsSelected)  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>jQuery</code> | Objeto jQuery que referencia a la línea de la tabla. |

**Example**  
```js
$("#idComponente").rup_jqtable("highlightRowAsSelected", $("#idFila"));
```
<a name="module_rup_jqtable..updateDetailPagination"></a>

### rup_jqtable~updateDetailPagination(currentRowNumArg, totalRowNumArg)
Actualiza el valor de los datos que se muestran en la barra de paginación.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| currentRowNumArg | <code>string</code> | Número actual de los registros que se están mostrando. |
| totalRowNumArg | <code>string</code> | Número total de los registros que se muestran en la tabla. |

**Example**  
```js
$("#idComponente").rup_jqtable("updateDetailPagination", "1-10", "586" );
```
<a name="module_rup_jqtable..updateSavedData"></a>

### rup_jqtable~updateSavedData(arg)
Permite modificar el objeto interno _savedData que se utiliza en el control de cambios en el modo de edición en formulario y edición en línea.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| arg | <code>module:rup\_jqtable~onUpdateSavedData</code> | Función de callback desde la que se puede modificar el objeto _savedData. |

**Example**  
```js
$("#idComponente").rup_jqtable("updateSavedData", function(savedData){});
```
<a name="module_rup_jqtable..configurePager"></a>

### rup_jqtable~configurePager(settings)
Realiza la configuración interna del paginador de acuerdo a los parámetros de configuración indicados en la inicialización del componente.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_jqtable("configurePager", settings);
```
<a name="module_rup_jqtable..addRowData"></a>

### rup_jqtable~addRowData(rowid, data, position, srcrowid) ⇒ <code>jQuery</code>
Añade una nueva línea a la tabla. Esta operación no realiza una inserción del registro en el sistema de persistencia, sino que únicamente añade una nueva fila de modo visual.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>jQuery</code> - - Referencia al propio componente.  

| Param | Type | Description |
| --- | --- | --- |
| rowid | <code>string</code> | Identificador del registro. |
| data | <code>object</code> | Objeto json que contiene los valores de cada columna de la nueva línea. |
| position | <code>string</code> | fisrt o last. Determina la posición donde se va a insertar el registro. |
| srcrowid | <code>string</code> | En el caso de indicarse se insertará la nueva línea en la posición relativa al registro que identifica y el valor del parámetro position. |

**Example**  
```js
$("#idComponente").rup_jqtable("addRowData", "10", {campo1:valor1,campo2:valor2});
```
<a name="module_rup_jqtable..delRowData"></a>

### rup_jqtable~delRowData(rowid) ⇒ <code>jQuery</code>
Elimina de la tabla un registro determinado. El registro no se elimina del sistema de persistencia. Solo se elimina de manera visual.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>jQuery</code> - - Referencia al propio componente.  

| Param | Type | Description |
| --- | --- | --- |
| rowid | <code>string</code> | Identificador del registro. |

**Example**  
```js
$("#idComponente").rup_jqtable("delRowData","10");
```
<a name="module_rup_jqtable..getActiveRowId"></a>

### rup_jqtable~getActiveRowId() ⇒ <code>string</code>
Devuelve el identificador de la línea activa.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>string</code> - - Identificador de la línea activa.  
**Example**  
```js
$("#idComponente").rup_jqtable("getActiveRowId");
```
<a name="module_rup_jqtable..getActiveLineId"></a>

### rup_jqtable~getActiveLineId() ⇒ <code>string</code>
Devuelve el índice de la línea activa.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>string</code> - - Índice de la línea activa.  
**Example**  
```js
$("#idComponente").rup_jqtable("getActiveLineId");
```
<a name="module_rup_jqtable..setRowData"></a>

### rup_jqtable~setRowData(rowid, data, cssp)
Actualiza los valores de las columnas de un registro determinado. La actualización de loa datos se realiza solo de manera visual. Los nuevos datos no se persisten.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| rowid | <code>string</code> | Identificador del registro que se desea actualizar. |
| data | <code>object</code> | Objeto json que contiene los valores de cada columna de la nueva línea. |
| cssp | <code>string</code> | En caso de especificarse, se añadirán a la línea las class de estilos aquí indicadas. |

**Example**  
```js
$("#idComponente").rup_jqtable("setRowData", "10", {campo1:valor1,campo2:valor2});
```
<a name="module_rup_jqtable..getRowData"></a>

### rup_jqtable~getRowData(rowid) ⇒ <code>object</code>
Devuelve un objeto json con los valores de los campos del registro indicado.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>object</code> - - Objecto json con los valores del registro.  

| Param | Type | Description |
| --- | --- | --- |
| rowid | <code>string</code> | Identificador del registro del que se quieren recuperar los datos. |

**Example**  
```js
$("#idComponente").rup_jqtable("getRowData", "10");
```
<a name="module_rup_jqtable..getDataIDs"></a>

### rup_jqtable~getDataIDs() ⇒ <code>Array.&lt;string&gt;</code>
Devuelve un array con los identificadores de los registros que se muestran actualmente en la página de la tabla.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>Array.&lt;string&gt;</code> - - Identificadores de lso registros mostrados en la página actual.  
**Example**  
```js
$("#idComponente").rup_jqtable("getDataIDs");
```
<a name="module_rup_jqtable..clearGridData"></a>

### rup_jqtable~clearGridData(clearfooter)
Limpia los registros mostrados en la tabla.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| clearfooter | <code>boolean</code> | En caso de indicarse como true se elimina la información del pié de la tabla. |

**Example**  
```js
$("#idComponente").rup_jqtable("clearGridData", false);
```
<a name="module_rup_jqtable..getColModel"></a>

### rup_jqtable~getColModel() ⇒ <code>object</code>
Devuelve el objeto colModel del componente jqGrid.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>object</code> - - Objeto colModel de la tabla.  
**Example**  
```js
$("#idComponente").rup_jqtable("getColModel");
```
<a name="module_rup_jqtable..getCol"></a>

### rup_jqtable~getCol(rowid, colName)
Devuelve el valor de la columna de la fila indicada.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| rowid | <code>string</code> | Identificador de la fila. |
| colName | <code>string</code> | Nombre de la columna. |

**Example**  
```js
$("#idComponente").rup_jqtable("getCol", "10", "nombre");
```
<a name="module_rup_jqtable..getSerializedForm"></a>

### rup_jqtable~getSerializedForm(form, skipEmpty)
Devuelve un objeto json que contiene la serialización del formulario.

**Kind**: inner method of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>jQuery</code> | Formulario que se desea serializar. |
| skipEmpty | <code>boolean</code> | En caso de indicarse true se omiten los campos que no contienen valor. |

**Example**  
```js
$("#idComponente").rup_jqtable("getSerializedForm", $("#idFormulario"), false);
```
<a name="module_rup_jqtable..onOperation"></a>

### rup_jqtable~onOperation : <code>function</code>
Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación.

**Kind**: inner typedef of [<code>rup\_jqtable</code>](#module_rup_jqtable)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | Identificador de la operación |
| options | <code>object</code> | Opciones de configuración de la operación. |

**Example**  
```js
callback: function(key, options){		alert("Operación 1");	}
```
<a name="module_rup_jqtable..isEnabled"></a>

### rup_jqtable~isEnabled ⇒ <code>boolean</code>
Función de callback que determina si la operación debe estar habilitada o no.

**Kind**: inner typedef of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Returns**: <code>boolean</code> - - Devuelve si la operación debe de estar habilitada o no.  
**Example**  
```js
enabled: function(){		return true;	}
```
<a name="module_rup_jqtable..Operations"></a>

### rup_jqtable~Operations : <code>Object</code>
Mediante esta propiedad se definen las posibles operaciones a realizar sobre los registros mostrados en la tabla. Debido al carácter global de estas operaciones se toman en cuenta por otros componentes (toolbar, menú contextual) a la hora de mostrar sus controles. Las operaciones se definen mediante un objeto json en el cual el nombre de la propiedad será el identificador de la propiedad.

**Kind**: inner typedef of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [name] | <code>string</code> | Texto a mostrar al usuario a la hora de visualizar la operación. |
| [icon] | <code>string</code> | Clase CSS correspondiente al icono que se quiere visualizar junto a la operación. |
| [enabled] | [<code>isEnabled</code>](#module_rup_jqtable..isEnabled) | Función que determina si el botón se debe mostrar habilitado o deshabilitado. Esto se determina devolviendo true/false desde la función de callback aquí indicada. |
| [callback] | [<code>onOperation</code>](#module_rup_jqtable..onOperation) | Función de callback que será ejecutada cuando el usuario realice una acción sobre la operación. |

**Example**  
```js
core:{	operations:{			"operacion1": {				name: "Operación 1",				icon: "rup-icon rup-icon-new",				enabled: function(){					return true;				},				callback: function(key, options){					alert("Operación 1");				}			},			"operacion2": {				name: "Operación 2",				icon: "rup-icon rup-icon-new",				enabled: function(){					return true;				},				callback: function(key, options){					alert("Operación 1");				}			}		}}
```
<a name="module_rup_jqtable..ShowOperations"></a>

### rup_jqtable~ShowOperations
Permite habilitar/deshabilitar las operaciones definidas por defecto por otros módulos.

**Kind**: inner typedef of [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Example**  
```js
core:{		showOperations:{			add:false;			clone:false;		}	}
```
