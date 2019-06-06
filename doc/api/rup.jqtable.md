## Modules

<dl>
<dt><a href="#module_rup_jqtable">rup_jqtable</a></dt>
<dd><p>Tiene como objetivo mostrar al usuario de manera gráfica el estado de avance de una tarea o proceso.</p>
</dd>
<dt><a href="#module_rup_jqtable/contextMenu">rup_jqtable/contextMenu</a></dt>
<dd><p>Tiene como objetivo proporcionar al componente RUP Table de las funcionalidades que ofrece el uso de un menú contextual.</p>
</dd>
<dt><a href="#module_rup_jqtable/filter">rup_jqtable/filter</a></dt>
<dd><p>Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.</p>
</dd>
<dt><a href="#module_rup_jqtable/search">rup_jqtable/search</a></dt>
<dd><p>Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.</p>
</dd>
<dt><a href="#module_rup_jqtable/toolbar">rup_jqtable/toolbar</a></dt>
<dd><p>Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.</p>
</dd>
<dt><a href="#module_rup_jqtable/feedback">rup_jqtable/feedback</a></dt>
<dd><p>Permite configurar un área para informar al usuario de cómo interactuar con el componente. Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.</p>
</dd>
<dt><del><a href="#module_rup_jqtable/fluid">rup_jqtable/fluid</a></del></dt>
<dd><p>Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.</p>
</dd>
<dt><a href="#module_rup_jqtable/formEdit">rup_jqtable/formEdit</a></dt>
<dd><p>Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra dentro de un diálogo y ofrece las siguientes funcionalidades:</p>
<ul>
<li>Añadir un nuevo registro o modificar uno ya existente.</li>
<li>Cancelar la inserción o edición de un registro.</li>
<li>Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre losdiferentes elementos.</li>
</ul>
</dd>
<dt><a href="#module_rup_jqtable/inlineEdit">rup_jqtable/inlineEdit</a></dt>
<dd><p>Permite la edición de los registros de la tabla mostrando los campos de edición sobre la propia línea del registro.</p>
</dd>
<dt><a href="#module_rup_jqtable/multiselection">rup_jqtable/multiselection</a></dt>
<dd><p>Permite realizar una selección múltiple de los registros que se muestran en la tabla.</p>
</dd>
<dt><a href="#module_rup_jqtable/jerarquia">rup_jqtable/jerarquia</a></dt>
<dd><p>El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.</p>
</dd>
<dt><a href="#module_rup_jqtable/masterDetail">rup_jqtable/masterDetail</a></dt>
<dd><p>Permite relacionar dos tablas de modo que tengan una relación maestro-detalle. De este modo, los resultados de la tabla detalle se muestran a partir del seleccionado en la tabla maestro.</p>
</dd>
<dt><a href="#module_rup_jqtable/report">rup_jqtable/report</a></dt>
<dd><p>Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.</p>
</dd>
<dt><a href="#module_rup_jqtable/multifilter">rup_jqtable/multifilter</a></dt>
<dd><p>Gestiona las operaciones de filtrado múltiple de datos sobre el origen de datos que utiliza el componente.</p>
</dd>
<dt><a href="#module_rup_jqtable/responsive">rup_jqtable/responsive</a></dt>
<dd><p>Proporciona al componente RUP Table ciertas funcionalidades responsive.</p>
</dd>
</dl>

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
        * ["rupTable_beforeFilter"](#module_rup_jqtable+event_rupTable_beforeFilter)
        * ["rupTable_filter_beforeCleanFilterForm"](#module_rup_jqtable+event_rupTable_filter_beforeCleanFilterForm)
        * ["rupTable_filter_afterCleanFilterForm"](#module_rup_jqtable+event_rupTable_filter_afterCleanFilterForm)
        * ["rupTable_searchAfterCreateToolbar"](#module_rup_jqtable+event_rupTable_searchAfterCreateToolbar)
        * ["rupTable_beforeSearch"](#module_rup_jqtable+event_rupTable_beforeSearch)
        * ["rupTable_feedbackClose"](#module_rup_jqtable+event_rupTable_feedbackClose)
        * ["rupTable_beforeDeleteRow"](#module_rup_jqtable+event_rupTable_beforeDeleteRow)
        * ["rupTable_beforeEditRow"](#module_rup_jqtable+event_rupTable_beforeEditRow)
        * ["rupTable_deleteAfterSubmit"](#module_rup_jqtable+event_rupTable_deleteAfterSubmit)
        * ["rupTable_beforeAddRow"](#module_rup_jqtable+event_rupTable_beforeAddRow)
        * ["rupTable_beforeCloneRow"](#module_rup_jqtable+event_rupTable_beforeCloneRow)
        * ["rupTable_beforeCloneRow"](#module_rup_jqtable+event_rupTable_beforeCloneRow)
        * ["rupTable_afterDeleteRow"](#module_rup_jqtable+event_rupTable_afterDeleteRow)
        * ["rupTable_afterFormFillDataServerSide"](#module_rup_jqtable+event_rupTable_afterFormFillDataServerSide)
        * ["rupTable_formEditCompareData"](#module_rup_jqtable+event_rupTable_formEditCompareData)
        * ["rupTable_beforeDeleteRow"](#module_rup_jqtable+event_rupTable_beforeDeleteRow)
        * ["rupTable_beforeEditRow"](#module_rup_jqtable+event_rupTable_beforeEditRow)
        * ["rupTable_deleteAfterSubmit"](#module_rup_jqtable+event_rupTable_deleteAfterSubmit)
        * ["rupTable_beforeAddRow"](#module_rup_jqtable+event_rupTable_beforeAddRow)
        * ["rupTable_beforeCloneRow"](#module_rup_jqtable+event_rupTable_beforeCloneRow)
        * ["rupTable_serializeReportData"](#module_rup_jqtable+event_rupTable_serializeReportData)
        * ["rupTable_multifilter_beforeAdd"](#module_rup_jqtable+event_rupTable_multifilter_beforeAdd)
        * ["rupTable_multifilter_fillForm:"](#module_rup_jqtable+event_rupTable_multifilter_fillForm_)
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
<a name="module_rup_jqtable+event_rupTable_beforeFilter"></a>

### "rupTable_beforeFilter"
Se lanza antes de producirse la petición de filtrado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeFilter", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_filter_beforeCleanFilterForm"></a>

### "rupTable_filter_beforeCleanFilterForm"
El botón de limpiar el formulario, limpia y filtra el formulario. Este evento se lanza antes de limpiar el formulario del filtro pero antes de filtrar con el formulario limpio.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_filter_beforeCleanFilterForm", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_filter_afterCleanFilterForm"></a>

### "rupTable_filter_afterCleanFilterForm"
El botón de limpiar el formulario, limpia y filtra el formulario. Este evento se lanza después de limpiar el formulario del filtro pero antes de filtrar con el formulario limpio.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_filter_afterCleanFilterForm", function(event,){ });
```
<a name="module_rup_jqtable+event_rupTable_searchAfterCreateToolbar"></a>

### "rupTable_searchAfterCreateToolbar"
Se lanza al finalizar la creación de la linea de búsqueda de la tabla.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| $searchRow | <code>Event</code> | Linea de la tabla destinada a la búsqueda. |

**Example**  
```js
$("#idComponente").on("rupTable_searchAfterCreateToolbar", function(event, $searchRow){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeSearch"></a>

### "rupTable_beforeSearch"
Evento lanzado antes de realizarse la búsqueda.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeSearch", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_feedbackClose"></a>

### "rupTable_feedbackClose"
Evento que se lanza cuando se cierra el feedback.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| $feedback | <code>object</code> | Referencia jQuery al feedback interno. |

**Example**  
```js
$("#idComponente").on("rupTable_feedbackClose", function(event, $internalFeedback){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeDeleteRow"></a>

### "rupTable_beforeDeleteRow"
Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| deleteOptions | <code>object</code> | Opciones de configuración de la operación de borrado. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea eliminar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeEditRow"></a>

### "rupTable_beforeEditRow"
Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| editOptions | <code>object</code> | Opciones de configuración de la operación de edición. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea editar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_deleteAfterSubmit"></a>

### "rupTable_deleteAfterSubmit"
Evento que se lanza justo después de realizarse la petición de borrado de un registro.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeAddRow"></a>

### "rupTable_beforeAddRow"
Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| addOptions | <code>object</code> | Opciones de configuración de la acción de insertar un elemento. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeCloneRow"></a>

### "rupTable_beforeCloneRow"
Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| cloneOptions | <code>object</code> | Opciones de configuración de la operación de clonado. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea clonar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeCloneRow"></a>

### "rupTable_beforeCloneRow"
Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| cloneOptions | <code>object</code> | Opciones de configuración de la operación de clonado. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea clonar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_afterDeleteRow"></a>

### "rupTable_afterDeleteRow"
Evento lanzado después de que ha finalizado correctamente el proceso de eliminar un registro..

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_afterDeleteRow", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_afterFormFillDataServerSide"></a>

### "rupTable_afterFormFillDataServerSide"
Evento lanzado después de que ha finalizado correctamente el proceso de carga de datos en el formulario de edición a partir de una petición al servidor de aplicaciones.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| xhr | <code>object</code> | Objeto enviado como respuesta desde el servidor. |
| $detailFormToPopulate | <code>object</code> | Referencia al formulario de detalle. |
| ajaxOptions | <code>object</code> | Opciones de configuración de la petición AJAX. |

**Example**  
```js
$("#idComponente").on("rupTable_afterFormFillDataServerSide", function(event, xhr, $detailFormToPopulate, ajaxOptions){ });
```
<a name="module_rup_jqtable+event_rupTable_formEditCompareData"></a>

### "rupTable_formEditCompareData"
: Permite asociar manejadores de eventos para ejecutar
	código que indique al proceso de control de cambios si se han producido modificaciones o no.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| savedData | <code>object</code> | Objeto que contiene los valores iniciales del formulario a partir de la serialización del mismo. |
| newData | <code>object</code> | Objeto que contiene los valores actuales del formulario a partir de la serialización del mismo. |

**Example**  
```js
$("#idComponente").on("rupTable_formEditCompareData ", function(event,	savedData, newData){		// Se realizan las comprobaciones necesarias para determinar si se han producido cambios en el formulario de detalle		event.isDifferent = true; // En caso de que se hayan producido cambios. 	event.isDifferent = false; // En caso de que no hayan producido cambios.});
```
<a name="module_rup_jqtable+event_rupTable_beforeDeleteRow"></a>

### "rupTable_beforeDeleteRow"
Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| deleteOptions | <code>object</code> | Opciones de configuración de la operación de borrado. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea eliminar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeDeleteRow", function(event, deleteOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeEditRow"></a>

### "rupTable_beforeEditRow"
Evento que se lanza justo antes de procesarse la petición de edición de un registro. En caso de devolver false se detiene la ejecución del borrado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| editOptions | <code>object</code> | Opciones de configuración de la operación de edición. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea editar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeEditRow", function(event, editOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_deleteAfterSubmit"></a>

### "rupTable_deleteAfterSubmit"
Evento que se lanza justo después de realizarse la petición de borrado de un registro.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_deleteAfterSubmit", function(event){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeAddRow"></a>

### "rupTable_beforeAddRow"
Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| addOptions | <code>object</code> | Opciones de configuración de la acción de insertar un elemento. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeAddRow", function(event, addOptions){ });
```
<a name="module_rup_jqtable+event_rupTable_beforeCloneRow"></a>

### "rupTable_beforeCloneRow"
Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| cloneOptions | <code>object</code> | Opciones de configuración de la operación de clonado. |
| selectedRow | <code>string</code> | Identificador de la fila que se desea clonar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeCloneRow", function(event, cloneOptions, selectedRow){ });
```
<a name="module_rup_jqtable+event_rupTable_serializeReportData"></a>

### "rupTable_serializeReportData"
Permite asociar un manejador al evento que se produce en el momento en el que se construye el objeto que se envía al servidor para solicitar la generación del informe. Permite la modificación del objeto postData para añadir, modificar o eliminar los parámetros que van a ser enviados.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| dta | <code>Event</code> | Linea de la tabla destinada a la búsqueda. |

**Example**  
```js
$("#idComponente").on("rupTable_serializeReportData", function(event, data){ });
```
<a name="module_rup_jqtable+event_rupTable_multifilter_beforeAdd"></a>

### "rupTable_multifilter_beforeAdd"
Evento lanzado justo antes de añadir un filtro.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| xhr | <code>Event</code> | Objecto XHR empleado en la petición AJAX de nuevo filtro. |
| options | <code>Event</code> | Opciones de comfiguración de la petición AJAX de nuevo filtro. |

**Example**  
```js
$("#idComponente").on("rupTable_multifilter_beforeAdd", function(event, xhr, options){ });
```
<a name="module_rup_jqtable+event_rupTable_multifilter_fillForm_"></a>

### "rupTable_multifilter_fillForm:"
Evento ejecutado cuando se rellenar el formulario del filtro. Cada vez que se cancela, limpia o se selecciona un filtro se lanza este evento.

**Kind**: event emitted by [<code>rup\_jqtable</code>](#module_rup_jqtable)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| filterData | <code>Event</code> | Valor del filtro. |

**Example**  
```js
$("#idComponente").on("rupTable_multifilter_fillForm:", function(event, filterData){ });
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
<a name="module_rup_jqtable/contextMenu"></a>

## rup\_jqtable/contextMenu
Tiene como objetivo proporcionar al componente RUP Table de las funcionalidades que ofrece el uso de un menú contextual.

**Summary**: Plugin de menú contextual del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["contextMenu"],	contextMenu:{		// Propiedades de configuración del plugin contextMenu	}});
```

* [rup_jqtable/contextMenu](#module_rup_jqtable/contextMenu)
    * [~options](#module_rup_jqtable/contextMenu..options)
    * [~preConfigureContextMenu(settings)](#module_rup_jqtable/contextMenu..preConfigureContextMenu)
    * [~postConfigureContextMenu(settings)](#module_rup_jqtable/contextMenu..postConfigureContextMenu)

<a name="module_rup_jqtable/contextMenu..options"></a>

### rup_jqtable/contextMenu~options
Propiedades de configuración del plugin contextMenu del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/contextMenu</code>](#module_rup_jqtable/contextMenu)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [colNames] | <code>Array.&lt;string&gt;</code> | <code></code> | Mediante un array se puede configurar las columnas para las cuales se va a mostrar el menú contextual. En caso de especificar el valor null se mostrará en todas las columnas. |
| [createDefaultRowOperations] | <code>boolean</code> | <code>true</code> | Propiedad que indica si el componente va a mostrar las operaciones por defecto como opciones dentro del menú contextual. |
| [tbodySelector] | <code>string</code> | <code>&quot;&#x27;tbody:first tr[role&#x3D;\\&#x27;row\\&#x27;].jqgrow&#x27;&quot;</code> | Selector de jQuery que identifica el tbody de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de tabla. |
| [tbodyTdSelector] | <code>string</code> | <code>&quot;&#x27;tbody:first tr.jqgrow td&#x27;&quot;</code> | Selector de jQuery que identifica las columnas de la tabla. Este selector se utiliza para mostrar el menú contextual a nivel de columna. |
| [theadThSelector] | <code>string</code> | <code>&quot;&#x27;thead:first th&#x27;&quot;</code> | Selector de jQuery que identifica las cabeceras de las columnas de la tabla. |
| [items] | <code>object</code> | <code>{}}</code> | Se especifica la configuración de los diferentes items que se van a mostrar en el menú contextual para los registros. |
| [showOperations] | <code>Array.&lt;rup\_jqtable~Operations&gt;</code> |  | Permite indicar que operaciones definidas de manera global van a ser mostradas como opciones en el menú contextual. |

<a name="module_rup_jqtable/contextMenu..preConfigureContextMenu"></a>

### rup_jqtable/contextMenu~preConfigureContextMenu(settings)
Metodo que realiza la pre-configuración del plugin contextMenu del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/contextMenu</code>](#module_rup_jqtable/contextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/contextMenu..postConfigureContextMenu"></a>

### rup_jqtable/contextMenu~postConfigureContextMenu(settings)
Metodo que realiza la post-configuración del plugin contextMenu del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/contextMenu</code>](#module_rup_jqtable/contextMenu)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/filter"></a>

## rup\_jqtable/filter
Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.

**Summary**: Plugin de filtrado del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["filter"],	filter:{		// Propiedades de configuración del plugin filter	}});
```

* [rup_jqtable/filter](#module_rup_jqtable/filter)
    * [~options](#module_rup_jqtable/filter..options)
    * [~preConfigureFilter(settings)](#module_rup_jqtable/filter..preConfigureFilter)
    * [~postConfigureFilter(settings)](#module_rup_jqtable/filter..postConfigureFilter)
    * [~cleanFilterForm()](#module_rup_jqtable/filter..cleanFilterForm)
    * [~filter()](#module_rup_jqtable/filter..filter)
    * [~getFilterParams()](#module_rup_jqtable/filter..getFilterParams)
    * [~hideFilterForm()](#module_rup_jqtable/filter..hideFilterForm)
    * [~showFilterForm()](#module_rup_jqtable/filter..showFilterForm)
    * [~toggleFilterForm()](#module_rup_jqtable/filter..toggleFilterForm)
    * [~showSearchCriteria()](#module_rup_jqtable/filter..showSearchCriteria)

<a name="module_rup_jqtable/filter..options"></a>

### rup_jqtable/filter~options
Propiedades de configuración del plugin filter del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showHidden] | <code>boolean</code> | <code>false</code> | Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no. |
| [url] | <code>string</code> | <code>null</code> | Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /filter). |
| [transitionConfig] | <code>object</code> |  | Configuración del efecto de la animación de mostrar/ocultar el formulario defiltrado. |
| [fncSearchCriteria] | <code>function</code> |  | Permite especificar una función de callback en la cual es posible modificar la cadena de texto con la que se muestra el resumen de los parámetros de filtrado. |

<a name="module_rup_jqtable/filter..preConfigureFilter"></a>

### rup_jqtable/filter~preConfigureFilter(settings)
Metodo que realiza la pre-configuración del plugin filter del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/filter..postConfigureFilter"></a>

### rup_jqtable/filter~postConfigureFilter(settings)
Metodo que realiza la post-configuración del plugin filter del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/filter..cleanFilterForm"></a>

### rup_jqtable/filter~cleanFilterForm()
Limpia los campos del formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Emits**: [<code>rupTable\_filter\_beforeCleanFilterForm</code>](#module_rup_jqtable+event_rupTable_filter_beforeCleanFilterForm), [<code>rupTable\_filter\_afterCleanFilterForm</code>](#module_rup_jqtable+event_rupTable_filter_afterCleanFilterForm)  
**Example**  
```js
$("#idComponente").rup_jqtable("cleanFilterForm");
```
<a name="module_rup_jqtable/filter..filter"></a>

### rup_jqtable/filter~filter()
Realiza el filtrado de acuerdo a los datos existentes en el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Emits**: [<code>rupTable\_beforeFilter</code>](#module_rup_jqtable+event_rupTable_beforeFilter)  
**Example**  
```js
$("#idComponente").rup_jqtable("filter");
```
<a name="module_rup_jqtable/filter..getFilterParams"></a>

### rup_jqtable/filter~getFilterParams()
Devuelve los parámetros de filtrado empleados en el filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("getFilterParams");
```
<a name="module_rup_jqtable/filter..hideFilterForm"></a>

### rup_jqtable/filter~hideFilterForm()
Oculta el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("hideFilterForm");
```
<a name="module_rup_jqtable/filter..showFilterForm"></a>

### rup_jqtable/filter~showFilterForm()
Muestra el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("showFilterForm");
```
<a name="module_rup_jqtable/filter..toggleFilterForm"></a>

### rup_jqtable/filter~toggleFilterForm()
Alterna el estado del formulario de filtrado entre visible y oculto.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("toggleFilterForm");
```
<a name="module_rup_jqtable/filter..showSearchCriteria"></a>

### rup_jqtable/filter~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("showSearchCriteria");
```
<a name="module_rup_jqtable/search"></a>

## rup\_jqtable/search
Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.

**Summary**: Plugin de search del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["search"],	search:{		// Propiedades de configuración del plugin search	}});
```

* [rup_jqtable/search](#module_rup_jqtable/search)
    * [~options](#module_rup_jqtable/search..options)
    * [~preConfigureSearch(settings)](#module_rup_jqtable/search..preConfigureSearch)
    * [~postConfigureSearch(settings)](#module_rup_jqtable/search..postConfigureSearch)
    * [~toggleSearchForm()](#module_rup_jqtable/search..toggleSearchForm)
    * [~createSearchToolbar()](#module_rup_jqtable/search..createSearchToolbar)
    * [~createSearchRow(settings)](#module_rup_jqtable/search..createSearchRow)
    * [~navigateToMatchedRow(matchedRow)](#module_rup_jqtable/search..navigateToMatchedRow)
    * [~search()](#module_rup_jqtable/search..search)
    * [~navigateToMatchedRow()](#module_rup_jqtable/search..navigateToMatchedRow)
    * [~goToFirstMatched(paramPage)](#module_rup_jqtable/search..goToFirstMatched)
    * [~fncGetSearchNavigationParams(buttonType)](#module_rup_jqtable/search..fncGetSearchNavigationParams) ⇒ <code>object</code>
    * [~fncGetSearchNavigationParams(arrParams)](#module_rup_jqtable/search..fncGetSearchNavigationParams)
    * [~clearSearch()](#module_rup_jqtable/search..clearSearch)
    * [~clearHighlightedMatchedRows()](#module_rup_jqtable/search..clearHighlightedMatchedRows)
    * [~highlightMatchedRowsInPage(page)](#module_rup_jqtable/search..highlightMatchedRowsInPage)
    * [~highlightMatchedRow($row)](#module_rup_jqtable/search..highlightMatchedRow)
    * [~updateSearchPagination(paramRowId)](#module_rup_jqtable/search..updateSearchPagination)
    * [~getSearchCurrentRowCount(selectedRowId)](#module_rup_jqtable/search..getSearchCurrentRowCount)

<a name="module_rup_jqtable/search..options"></a>

### rup_jqtable/search~options
Propiedades de configuración del plugin search del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>null</code> | Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /search). |
| [validate] | <code>object</code> |  | Mediante esta propiedad es posible especificar reglas de validación que se especifican en la guía de uso del componente RUP validation. |

<a name="module_rup_jqtable/search..preConfigureSearch"></a>

### rup_jqtable/search~preConfigureSearch(settings)
Metodo que realiza la pre-configuración del plugin search del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/search..postConfigureSearch"></a>

### rup_jqtable/search~postConfigureSearch(settings)
Metodo que realiza la post-configuración del plugin search del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/search..toggleSearchForm"></a>

### rup_jqtable/search~toggleSearchForm()
Muestra/Oculta el formulario de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("toggleSearchForm");
```
<a name="module_rup_jqtable/search..createSearchToolbar"></a>

### rup_jqtable/search~createSearchToolbar()
Genera la barra de controles para gestionar la búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: [<code>rupTable\_searchAfterCreateToolbar</code>](#module_rup_jqtable+event_rupTable_searchAfterCreateToolbar)  
**Example**  
```js
$("#idTable").rup_jqtable("createSearchToolbar");
```
<a name="module_rup_jqtable/search..createSearchRow"></a>

### rup_jqtable/search~createSearchRow(settings)
Genera la barra de controles para gestionar la búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas. |

**Example**  
```js
$("#idTable").rup_jqtable("createSearchRow", settings);
```
<a name="module_rup_jqtable/search..navigateToMatchedRow"></a>

### rup_jqtable/search~navigateToMatchedRow(matchedRow)
Navega hasta el elemento indicado que se ajusta a los criterios de búsqueda indicados.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| matchedRow | <code>string</code> | Identificador de la línea a la cual se quiere navegar. |

**Example**  
```js
$("#idTable").rup_jqtable("navigateToMatchedRow", matchedRow);
```
<a name="module_rup_jqtable/search..search"></a>

### rup_jqtable/search~search()
Lanza la operación de búsqueda además del evento previo.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: [<code>rupTable\_beforeSearch</code>](#module_rup_jqtable+event_rupTable_beforeSearch)  
**Example**  
```js
$("#idTable").rup_jqtable("search");
```
<a name="module_rup_jqtable/search..navigateToMatchedRow"></a>

### rup_jqtable/search~navigateToMatchedRow()
Lanza la operación de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: [<code>masterDetail</code>](#module_rup_jqtable+rupTable_searchBeforeSubmit.rupTable.event_masterDetail)  
**Example**  
```js
$("#idTable").rup_jqtable("doSearch");
```
<a name="module_rup_jqtable/search..goToFirstMatched"></a>

### rup_jqtable/search~goToFirstMatched(paramPage)
Navega hasta el primer elemento que se ajusta a los criterios de búsqueda. En caso de no existir elementos adecuados en la página actual se navega hasta el primer elemento.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| paramPage | <code>paramPage</code> | En caso de indicarse una página se utilizará en vez de la página actual. |

**Example**  
```js
$("#idTable").rup_jqtable("goToFirstMatched", paramPage);
```
<a name="module_rup_jqtable/search..fncGetSearchNavigationParams"></a>

### rup_jqtable/search~fncGetSearchNavigationParams(buttonType) ⇒ <code>object</code>
Devuelve los parámetros correspondientes al tipo de enlace de navegación indicado por parámetro.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Returns**: <code>object</code> - - Parametros de configuración asociados al tipo de enlace.  

| Param | Type | Description |
| --- | --- | --- |
| buttonType | <code>paramPage</code> | Tipo de parámetro first, prev, next o last.- |

**Example**  
```js
$("#idTable").rup_jqtable("fncGetSearchNavigationParams", buttonType);
```
<a name="module_rup_jqtable/search..fncGetSearchNavigationParams"></a>

### rup_jqtable/search~fncGetSearchNavigationParams(arrParams)
Realiza la navegación entre los elementos que se ajustan a los criterios de bús

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| arrParams | <code>Array.&lt;object&gt;</code> | Array de parámetros que determinan la navegación. |

**Example**  
```js
$("#idTable").rup_jqtable("doSearchNavigation", arrParams);
```
<a name="module_rup_jqtable/search..clearSearch"></a>

### rup_jqtable/search~clearSearch()
Limpia los criterios de búsqueda introducidos por el usuario.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("clearSearch");
```
<a name="module_rup_jqtable/search..clearHighlightedMatchedRows"></a>

### rup_jqtable/search~clearHighlightedMatchedRows()
Elimina el resaltado de los registros que se ajustan a los criterios de busqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("clearHighlightedMatchedRows");
```
<a name="module_rup_jqtable/search..highlightMatchedRowsInPage"></a>

### rup_jqtable/search~highlightMatchedRowsInPage(page)
Resalta los registros que se ajustan a los criterios de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>string</code> | Identificador de la página en la que se desean resaltar los registos. |

**Example**  
```js
$("#idTable").rup_jqtable("highlightMatchedRowsInPage", page);
```
<a name="module_rup_jqtable/search..highlightMatchedRow"></a>

### rup_jqtable/search~highlightMatchedRow($row)
Resalta como ocurrencia de la búsqueda la línea especificada.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>string</code> | Objeto jQuery que referencia la línea de la tabla que se quiere resaltar. |

**Example**  
```js
$("#idTable").rup_jqtable("highlightMatchedRow", $("#idRow"));
```
<a name="module_rup_jqtable/search..updateSearchPagination"></a>

### rup_jqtable/search~updateSearchPagination(paramRowId)
Actualiza los valores de la navegación entre registros.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| paramRowId | <code>string</code> | Identificador de la página. |

**Example**  
```js
$("#idTable").rup_jqtable("updateSearchPagination", paramRowId);
```
<a name="module_rup_jqtable/search..getSearchCurrentRowCount"></a>

### rup_jqtable/search~getSearchCurrentRowCount(selectedRowId)
Devuelve, para una linea determinada, la posición en que se encuentra dentro del total de registros que se ajustan a los criterios de búsqueda

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| selectedRowId | <code>string</code> | Identificador del registro. |

**Example**  
```js
$("#idTable").rup_jqtable("getSearchCurrentRowCount", "05");
```
<a name="module_rup_jqtable/toolbar"></a>

## rup\_jqtable/toolbar
Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["toolbar"],	toolbar:{		// Propiedades de configuración del plugin toolbar	}});
```

* [rup_jqtable/toolbar](#module_rup_jqtable/toolbar)
    * [~options](#module_rup_jqtable/toolbar..options)
    * [~preConfigureToolbar(settings)](#module_rup_jqtable/toolbar..preConfigureToolbar)
    * [~postConfigureToolbar(settings)](#module_rup_jqtable/toolbar..postConfigureToolbar)

<a name="module_rup_jqtable/toolbar..options"></a>

### rup_jqtable/toolbar~options
Propiedades de configuración del plugin toolbar del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/toolbar</code>](#module_rup_jqtable/toolbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> |  | En caso de que se vaya a utilizar un identificador diferente al esperado por defecto, se deberá de indicar mediante esta propiedad. |
| [createDefaultToolButtons] | <code>boolean</code> | <code>true</code> | Determina (true/false) si se deben visualizar los botones correspondientes a las operaciones por defecto del componente. |
| [showOperations] | <code>object</code> |  | Permite indicar que operaciones definidas de manera global van a ser mostradas como botones. Cada operación puede tomar uno de los siguientes valores:  true: Valor por defecto. Se mostrará la operación como opción en la botonera.  true: Valor por defecto. Se mostrará la operación como opción en la  false: La operación no se mostrará como opción en la botonera. |
| [deleteOptions] | <code>object</code> |  | Propiedades de configuración de la acción de borrado de un registro. |
| [buttons] | <code>object</code> |  | Permite definir nuevos botones que se mostrarán en la toolbar. Los nuevos botones se especificarán del mismo modo que se describe en el componente rup_toolbar. |

<a name="module_rup_jqtable/toolbar..preConfigureToolbar"></a>

### rup_jqtable/toolbar~preConfigureToolbar(settings)
Metodo que realiza la pre-configuración del plugin toolbar del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/toolbar</code>](#module_rup_jqtable/toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/toolbar..postConfigureToolbar"></a>

### rup_jqtable/toolbar~postConfigureToolbar(settings)
Metodo que realiza la post-configuración del plugin toolbar del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/toolbar</code>](#module_rup_jqtable/toolbar)  
**Emits**: [<code>rupTable\_feedbackClose</code>](#module_rup_jqtable+event_rupTable_feedbackClose)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/feedback"></a>

## rup\_jqtable/feedback
Permite configurar un área para informar al usuario de cómo interactuar con el componente. Mediante el componente feedback se mostraran al usuario mensajes de confirmación, avisos y errores que faciliten y mejoren la interacción del usuario con la aplicación.

**Summary**: Plugin de feedback del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["feedback"],	feedback:{		// Propiedades de configuración del plugin feedback	}});
```

* [rup_jqtable/feedback](#module_rup_jqtable/feedback)
    * [~options](#module_rup_jqtable/feedback..options)
    * [~preConfigureFeedback(settings)](#module_rup_jqtable/feedback..preConfigureFeedback)
    * [~postConfigureFeedback(settings)](#module_rup_jqtable/feedback..postConfigureFeedback)
    * [~showFeedback($feedback, msg, type, options)](#module_rup_jqtable/feedback..showFeedback)

<a name="module_rup_jqtable/feedback..options"></a>

### rup_jqtable/feedback~options
Propiedades de configuración del plugin feedback del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/feedback</code>](#module_rup_jqtable/feedback)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> | <code>null</code> | Nombre del identificador a utilizar en el feedback. Se utiliza en caso de no querer utilizar el por defecto. |
| [config] | <code>object</code> |  | Determina la configuración por defecto del feedback. |
| [okFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo . |
| [errorFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo ERROR. |
| [alertFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback en los casos de mensajes tipo ALERT. |
| [internalFeedbackConfig] | <code>object</code> |  | Determina la configuración por defecto del feedback interno de la tabla. |

<a name="module_rup_jqtable/feedback..preConfigureFeedback"></a>

### rup_jqtable/feedback~preConfigureFeedback(settings)
Metodo que realiza la pre-configuración del plugin feedback del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/feedback..postConfigureFeedback"></a>

### rup_jqtable/feedback~postConfigureFeedback(settings)
Metodo que realiza la post-configuración del plugin feedback del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/feedback..showFeedback"></a>

### rup_jqtable/feedback~showFeedback($feedback, msg, type, options)
Muestra el feedback indicado con la configuración especificada.

**Kind**: inner method of [<code>rup\_jqtable/feedback</code>](#module_rup_jqtable/feedback)  

| Param | Type | Description |
| --- | --- | --- |
| $feedback | <code>object</code> | Objeto jQuery que referencia al componente feedback. |
| msg | <code>string</code> | : Mensaje a mostrar en el feedback. |
| type | <code>string</code> | Clase de feedback a mostrar. |
| options | <code>object</code> | Propiedades de configuración del feedback |

**Example**  
```js
$("#idTable").rup_jqtable("showFeedback", $("#idFeedback"), "Texto...", "ok"), {};
```
<a name="module_rup_jqtable/fluid"></a>

## ~~rup\_jqtable/fluid~~
***Deprecated***

Aplica al componente un diseño líquido de modo que se adapte al ancho de la capa en la que está contenido.

**Summary**: Plugin de filtrado múltiple del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["fuild"],	fuild:{		// Propiedades de configuración del plugin fuild	}});
```

* ~~[rup_jqtable/fluid](#module_rup_jqtable/fluid)~~
    * [~options](#module_rup_jqtable/fluid..options)
    * [~postConfigureFluid(settings)](#module_rup_jqtable/fluid..postConfigureFluid)

<a name="module_rup_jqtable/fluid..options"></a>

### rup_jqtable/fluid~options
Propiedades de configuración del plugin multifilter del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/fluid</code>](#module_rup_jqtable/fluid)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [baseLayer] | <code>string</code> |  | Identificador de la capa que contiene al componente. Se tomará como base para redimensionar las diferentes partes de la tabla. En caso de no indicarse se tomará por defecto una generada con el patrón identificadorTabla+”_div”. |
| [minWidth] | <code>integer</code> | <code>100</code> | Determina la anchura máxima a la que se va a redimensionar la capa. |
| [maxWidth] | <code>integer</code> | <code>2000</code> | Determina la anchura mínima a la que se va a redimensionar la capa. |
| [fluidOffset] | <code>integer</code> | <code>0</code> | Desplazamiento que se aplica a la capa redimensionada. |

<a name="module_rup_jqtable/fluid..postConfigureFluid"></a>

### rup_jqtable/fluid~postConfigureFluid(settings)
Metodo que realiza la post-configuración del plugin fuild del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/fluid</code>](#module_rup_jqtable/fluid)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/formEdit"></a>

## rup\_jqtable/formEdit
Permite la edición de los registros de la tabla utilizando un formulario de detalle. El formulario se muestra dentro de un diálogo y ofrece las siguientes funcionalidades:- Añadir un nuevo registro o modificar uno ya existente.- Cancelar la inserción o edición de un registro.- Navegar entre los registros mostrados en la tabla para permitir operar de manera mas ágil sobre losdiferentes elementos.

**Summary**: Plugin de edición en formulario del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["formEdit"],	formEdit:{		// Propiedades de configuración del plugin formEdit	}});
```

* [rup_jqtable/formEdit](#module_rup_jqtable/formEdit)
    * [~options](#module_rup_jqtable/formEdit..options)
    * [~preConfigureFormEdit(settings)](#module_rup_jqtable/formEdit..preConfigureFormEdit)
    * [~postConfigureFormEdit(settings)](#module_rup_jqtable/formEdit..postConfigureFormEdit)
    * [~createDetailNavigation()](#module_rup_jqtable/formEdit..createDetailNavigation) ⇒ <code>object</code>
    * [~deleteElement(rowId, options)](#module_rup_jqtable/formEdit..deleteElement) ⇒ <code>object</code>
    * [~editElement(rowId, options)](#module_rup_jqtable/formEdit..editElement) ⇒ <code>object</code>
    * [~newElement(addEvent)](#module_rup_jqtable/formEdit..newElement) ⇒ <code>object</code>
    * [~cloneElement(rowId, options, cloneEvent)](#module_rup_jqtable/formEdit..cloneElement) ⇒ <code>object</code>
    * [~hideFormErrors($form)](#module_rup_jqtable/formEdit..hideFormErrors)

<a name="module_rup_jqtable/formEdit..options"></a>

### rup_jqtable/formEdit~options
Propiedades de configuración del plugin formEdit del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**See**: Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [addEditOptions] | <code>object</code> | Propiedades de configuración comunes a las acciones de edición e inserciónde un registro. |
| [addOptions] | <code>object</code> | Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| [editOptions] | <code>object</code> | Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| [deleteOptions] | <code>object</code> | Propiedades de configuración de la acción de borrado de un registro. |
| [detailOptions] | <code>object</code> | Propiedades de configuración de la acción de mostrar un registro mediante el formulario de detalle. |
| [defaultCompareData] | <code>boolean</code> | Determina si se debe de realizar la comparación por defecto en el control de cambios del formulario de edición. Por defecto a true. |
| [dialogOptions] | <code>object</code> | Permite especificar opciones de configuración para el diálogo que contiene el formulario de detalle. Las opciones de configuración se pueden consultar en la guía de desarrollo del componente RUP Diálogo. |

<a name="module_rup_jqtable/formEdit..preConfigureFormEdit"></a>

### rup_jqtable/formEdit~preConfigureFormEdit(settings)
Metodo que realiza la pre-configuración del plugin formEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/formEdit..postConfigureFormEdit"></a>

### rup_jqtable/formEdit~postConfigureFormEdit(settings)
Metodo que realiza la post-configuración del plugin formEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/formEdit..createDetailNavigation"></a>

### rup_jqtable/formEdit~createDetailNavigation() ⇒ <code>object</code>
Devuelve la template HTML correspondiente a la capa de navegación del fomulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**Returns**: <code>object</code> - - Template correspondiente a la capa de navegación.  
**Example**  
```js
$("#idTable").rup_jqtable("createDetailNavigation");
```
<a name="module_rup_jqtable/formEdit..deleteElement"></a>

### rup_jqtable/formEdit~deleteElement(rowId, options) ⇒ <code>object</code>
Elimina el registro correspondiente al identificador indicado y utilizando las opciones de borrado especificadas.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**Returns**: <code>object</code> - - Referencia al propio objecto jQuery.  
**Emits**: [<code>rupTable\_deleteAfterSubmit</code>](#module_rup_jqtable+event_rupTable_deleteAfterSubmit), [<code>rupTable\_afterDeleteRow</code>](#module_rup_jqtable+event_rupTable_afterDeleteRow), [<code>rupTable\_beforeDeleteRow</code>](#module_rup_jqtable+event_rupTable_beforeDeleteRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea eliminar. |
| options | <code>object</code> | Opciones de configuración de la operación de borrado. |

**Example**  
```js
$("#idComponente").rup_jqtable("deleteElement", rowId, options);
```
<a name="module_rup_jqtable/formEdit..editElement"></a>

### rup_jqtable/formEdit~editElement(rowId, options) ⇒ <code>object</code>
Edita el registro correspondiente al identificador indicado y utilizando las opciones de edición especificadas.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**Returns**: <code>object</code> - - Referencia al propio objecto jQuery.  
**Emits**: [<code>rupTable\_beforeEditRow</code>](#module_rup_jqtable+event_rupTable_beforeEditRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea editar. |
| options | <code>object</code> | Opciones de configuración de la operación de edición. |

**Example**  
```js
$("#idComponente").rup_jqtable("editElement", rowId, options);
```
<a name="module_rup_jqtable/formEdit..newElement"></a>

### rup_jqtable/formEdit~newElement(addEvent) ⇒ <code>object</code>
Muestra el formulario de detalle para permitir al usuario insertar un nuevo registro.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**Returns**: <code>object</code> - - Referencia al propio objecto jQuery.  
**Emits**: [<code>rupTable\_beforeAddRow</code>](#module_rup_jqtable+event_rupTable_beforeAddRow)  

| Param | Type | Description |
| --- | --- | --- |
| addEvent | <code>boolean</code> | Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeAddRow. |

**Example**  
```js
$("#idComponente").rup_jqtable("newElement", true);
```
<a name="module_rup_jqtable/formEdit..cloneElement"></a>

### rup_jqtable/formEdit~cloneElement(rowId, options, cloneEvent) ⇒ <code>object</code>
Clona el registro correspondiente al identificador indicado y utilizando las opciones de clonado especificadas.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  
**Returns**: <code>object</code> - - Referencia al propio objecto jQuery.  
**Emits**: [<code>rupTable\_beforeCloneRow</code>](#module_rup_jqtable+event_rupTable_beforeCloneRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea clonar. |
| options | <code>object</code> | Opciones de configuración de la operación de clonado. |
| cloneEvent | <code>boolean</code> | Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeCloneRow. |

**Example**  
```js
$("#idComponente").rup_jqtable("cloneElement", rowId, options, cloneEvent);
```
<a name="module_rup_jqtable/formEdit..hideFormErrors"></a>

### rup_jqtable/formEdit~hideFormErrors($form)
Oculta los mensajes de error del formulario indicado.

**Kind**: inner method of [<code>rup\_jqtable/formEdit</code>](#module_rup_jqtable/formEdit)  

| Param | Type | Description |
| --- | --- | --- |
| $form | <code>object</code> | Formulario del que se desea ocultar los mensajes de error. |

**Example**  
```js
$("#idComponente").rup_jqtable("hideFormErrors", $form);
```
<a name="module_rup_jqtable/inlineEdit"></a>

## rup\_jqtable/inlineEdit
Permite la edición de los registros de la tabla mostrando los campos de edición sobre la propia línea del registro.

**Summary**: Plugin de edición en línea del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["inlineEdit"],	inlineEdit:{		// Propiedades de configuración del plugin inlineEdit	}});
```

* [rup_jqtable/inlineEdit](#module_rup_jqtable/inlineEdit)
    * [~options](#module_rup_jqtable/inlineEdit..options)
    * [~preConfigureInlineEdit(settings)](#module_rup_jqtable/inlineEdit..preConfigureInlineEdit)
    * [~postConfigureInlineEdit(settings)](#module_rup_jqtable/inlineEdit..postConfigureInlineEdit)
    * [~addRow(options)](#module_rup_jqtable/inlineEdit..addRow) ⇒ <code>object</code>
    * [~cloneRow(rowId, options)](#module_rup_jqtable/inlineEdit..cloneRow) ⇒ <code>object</code>
    * [~editRow(rowId, options)](#module_rup_jqtable/inlineEdit..editRow) ⇒ <code>object</code>
    * [~deleteRow(rowId, options)](#module_rup_jqtable/inlineEdit..deleteRow) ⇒ <code>object</code>
    * [~saveRow(rowId, options)](#module_rup_jqtable/inlineEdit..saveRow) ⇒ <code>object</code>
    * [~restoreRow(rowId, afterrestorefunc)](#module_rup_jqtable/inlineEdit..restoreRow) ⇒ <code>object</code>
    * [~restoreRow(rowId)](#module_rup_jqtable/inlineEdit..restoreRow) ⇒ <code>object</code>

<a name="module_rup_jqtable/inlineEdit..options"></a>

### rup_jqtable/inlineEdit~options
Propiedades de configuración del plugin inlineEdit del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**See**: Las posibles propiedades que se pueden indicar en cada una de las siguientes propiedades, se especifican con más detalle en la documentación del plugin subyacente jqGrid.  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [addEditOptions] | <code>object</code> | Propiedades de configuración comunes a las acciones de edición e inserciónde un registro. |
| [addOptions] | <code>object</code> | Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| [editOptions] | <code>object</code> | Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| [deleteOptions] | <code>object</code> | Propiedades de configuración de la acción de borrado de un registro. |

<a name="module_rup_jqtable/inlineEdit..preConfigureInlineEdit"></a>

### rup_jqtable/inlineEdit~preConfigureInlineEdit(settings)
Metodo que realiza la pre-configuración del plugin inlineEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/inlineEdit..postConfigureInlineEdit"></a>

### rup_jqtable/inlineEdit~postConfigureInlineEdit(settings)
Metodo que realiza la post-configuración del plugin inlineEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/inlineEdit..addRow"></a>

### rup_jqtable/inlineEdit~addRow(options) ⇒ <code>object</code>
Añade una nueva línea en blanco al mantenimiento para permitir introducir los datos del nuevo registro.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable\_beforeAddRow</code>](#module_rup_jqtable+event_rupTable_beforeAddRow)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración de la acción de inserción. |

**Example**  
```js
$("#idTable").rup_jqtable("addRow", options);
```
<a name="module_rup_jqtable/inlineEdit..cloneRow"></a>

### rup_jqtable/inlineEdit~cloneRow(rowId, options) ⇒ <code>object</code>
Clona un registro determinado. Añade una nueva línea con el contenido del registro a partir del cual se desea clonar.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable\_beforeCloneRow</code>](#module_rup_jqtable+event_rupTable_beforeCloneRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro a partir del cual se desea realizar el clonado. |
| options | <code>object</code> | Opciones de configuración de la acción de clonado. |

**Example**  
```js
$("#idTable").rup_jqtable("cloneRow", rowId, options);
```
<a name="module_rup_jqtable/inlineEdit..editRow"></a>

### rup_jqtable/inlineEdit~editRow(rowId, options) ⇒ <code>object</code>
Pone el registro indicado en modo edición para permitir la edición de sus datos.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable\_beforeEditRow</code>](#module_rup_jqtable+event_rupTable_beforeEditRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea editar. |
| options | <code>object</code> | Opciones de configuración de la acción de modificación. |

**Example**  
```js
$("#idTable").rup_jqtable("editRow", rowId, options, true);
```
<a name="module_rup_jqtable/inlineEdit..deleteRow"></a>

### rup_jqtable/inlineEdit~deleteRow(rowId, options) ⇒ <code>object</code>
Elimina el registro indicado.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable\_deleteAfterSubmit</code>](#module_rup_jqtable+event_rupTable_deleteAfterSubmit), <code>module:rup\_jqtable#event:rupTable\_deleteAfterComplete</code>, [<code>rupTable\_beforeDeleteRow</code>](#module_rup_jqtable+event_rupTable_beforeDeleteRow)  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea eliminar. |
| options | <code>object</code> | Opciones de configuración de la acción de borrado.. |

**Example**  
```js
$("#idTable").rup_jqtable("deleteRow", rowId, options);
```
<a name="module_rup_jqtable/inlineEdit..saveRow"></a>

### rup_jqtable/inlineEdit~saveRow(rowId, options) ⇒ <code>object</code>
Guarda el registro modificado. Se almacenan los datos introducidos en la línea en modo edición.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: <code>module:rup\_jqtable#event:rupTable\_beforeSaveRow</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea guardar. |
| options | <code>object</code> | Opciones de configuración de la acción de guardado.. |

**Example**  
```js
$("#idTable").rup_jqtable("saveRow", rowId, options);
```
<a name="module_rup_jqtable/inlineEdit..restoreRow"></a>

### rup_jqtable/inlineEdit~restoreRow(rowId, afterrestorefunc) ⇒ <code>object</code>
Restaura la fila indicada al estado anterior a habilitarse el modo edición.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: <code>module:rup\_jqtable#event:rupTable\_beforeRestoreRow</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador de la línea que se desea guardar. |
| afterrestorefunc | <code>function</code> | Función de callback que se ejecuta después de restaurar la fila. |

**Example**  
```js
$("#idTable").rup_jqtable("restoreRow", rowId, function(){});
```
<a name="module_rup_jqtable/inlineEdit..restoreRow"></a>

### rup_jqtable/inlineEdit~restoreRow(rowId) ⇒ <code>object</code>
Restaura los campos RUP existentes en una fila de edición en línea.

**Kind**: inner method of [<code>rup\_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador de la línea que se desea guardar. |

**Example**  
```js
$("#idTable").rup_jqtable("restoreRow", rowId, options);
```
<a name="module_rup_jqtable/multiselection"></a>

## rup\_jqtable/multiselection
Permite realizar una selección múltiple de los registros que se muestran en la tabla.

**Summary**: Plugin de multiselection del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["multiselection"],	multiselection:{		// Propiedades de configuración del plugin multiselection	}});
```

* [rup_jqtable/multiselection](#module_rup_jqtable/multiselection)
    * [~preConfigureMultiselection(settings)](#module_rup_jqtable/multiselection..preConfigureMultiselection)
    * [~postConfigureMultiselection(settings)](#module_rup_jqtable/multiselection..postConfigureMultiselection)

<a name="module_rup_jqtable/multiselection..preConfigureMultiselection"></a>

### rup_jqtable/multiselection~preConfigureMultiselection(settings)
Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multiselection</code>](#module_rup_jqtable/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multiselection..postConfigureMultiselection"></a>

### rup_jqtable/multiselection~postConfigureMultiselection(settings)
Metodo que realiza la post-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multiselection</code>](#module_rup_jqtable/multiselection)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/jerarquia"></a>

## rup\_jqtable/jerarquia
El objetivo principal del módulo Jerarquía es la presentación de un conjunto de datos (tabla) ordenados jerárquicamente en base a una relación existente entre ellos.

**Summary**: Plugin de edición en línea del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["jerarquia"],	jerarquia:{		// Propiedades de configuración del plugin jerarquia	}});
```

* [rup_jqtable/jerarquia](#module_rup_jqtable/jerarquia)
    * [~options](#module_rup_jqtable/jerarquia..options)
    * [~preConfigurejerarquia(settings)](#module_rup_jqtable/jerarquia..preConfigurejerarquia)
    * [~postConfigurejerarquia(settings)](#module_rup_jqtable/jerarquia..postConfigurejerarquia)
    * [~reset()](#module_rup_jqtable/jerarquia..reset)

<a name="module_rup_jqtable/jerarquia..options"></a>

### rup_jqtable/jerarquia~options
Propiedades de configuración del plugin jerarquia del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [treedatatype] | <code>string</code> | <code>&quot;json&quot;</code> | Determina el tipo de dato empleado para obtener la representación jerárquica. |
| [token] | <code>string</code> |  | Carácter separador utilizado para concatenar diferentes identificadores de los registros mostrados en la jerarquía. (por defecto “/”). |
| [icons] | <code>object</code> |  | Estilos utilizados para cada uno de los elementos visuales de la jerarquía. |
| icons.plus | <code>object</code> |  | Icono para expandir el nodo. |
| icons.minus | <code>object</code> |  | Icono para contraer el nodo. |
| icons.leaf | <code>object</code> |  | Icono correspondiente a un nodo hoja. |
| icons.filter | <code>object</code> |  | Icono para indicar que el nodo satisface los parámetros de filtrado. |
| [parentNodesTooltip] | <code>boolean</code> | <code>true</code> | Determina si se debe de mostrar un tooltip para cada nodo, en el cual se representa la jerarquía que ocupa respecto a los padres. |
| [parentNodesTooltipFnc] | <code>function</code> | <code></code> | Función de callback que permite personalizar el tooltip a mostrar. |
| [contextMenu] | <code>boolean</code> | <code>true</code> | Determina si se muestra el menú contextual para cada nodo. |

<a name="module_rup_jqtable/jerarquia..preConfigurejerarquia"></a>

### rup_jqtable/jerarquia~preConfigurejerarquia(settings)
Metodo que realiza la pre-configuración del plugin jerarquia del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/jerarquia..postConfigurejerarquia"></a>

### rup_jqtable/jerarquia~postConfigurejerarquia(settings)
Metodo que realiza la post-configuración del plugin jerarquia del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/jerarquia..reset"></a>

### rup_jqtable/jerarquia~reset()
Colapsa los nodos que han sido expandidos.

**Kind**: inner method of [<code>rup\_jqtable/jerarquia</code>](#module_rup_jqtable/jerarquia)  
**Example**  
```js
$("#idTable").rup_jqtable("reset");
```
<a name="module_rup_jqtable/masterDetail"></a>

## rup\_jqtable/masterDetail
Permite relacionar dos tablas de modo que tengan una relación maestro-detalle. De este modo, los resultados de la tabla detalle se muestran a partir del seleccionado en la tabla maestro.

**Summary**: Plugin de edición en línea del componente RUP Table.  
**Example**  
```js
$("#idComponenteMaestro").rup_jqtable({	url: "../jqGridUsuarioMaestro",});$("#idComponente").rup_jqtable({	url: "../jqGridUsuarioDetalle",	usePlugins:["masterDetail"],	inlineEdit:{		master: "#idComponenteMaestro"		// Propiedades de configuración del plugin inlineEdit	}});
```

* [rup_jqtable/masterDetail](#module_rup_jqtable/masterDetail)
    * [~options](#module_rup_jqtable/masterDetail..options)
    * [~preConfigureMasterDetail(settings)](#module_rup_jqtable/masterDetail..preConfigureMasterDetail)
    * [~getMasterTablePkObject(options)](#module_rup_jqtable/masterDetail..getMasterTablePkObject) ⇒ <code>object</code>

<a name="module_rup_jqtable/masterDetail..options"></a>

### rup_jqtable/masterDetail~options
Propiedades de configuración del plugin masterDetail del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| master | <code>string</code> | Selector jQuery que referencia al componente maestro. |
| masterPrimaryKey | <code>string</code> | Clave primaria del componente maestro. |

<a name="module_rup_jqtable/masterDetail..preConfigureMasterDetail"></a>

### rup_jqtable/masterDetail~preConfigureMasterDetail(settings)
Metodo que realiza la pre-configuración del plugin masterDetail del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/masterDetail..getMasterTablePkObject"></a>

### rup_jqtable/masterDetail~getMasterTablePkObject(options) ⇒ <code>object</code>
Devuelve un objeto json con la clave primaria del registro correspondiente de la tabla maestra.

**Kind**: inner method of [<code>rup\_jqtable/masterDetail</code>](#module_rup_jqtable/masterDetail)  
**Returns**: <code>object</code> - - Objeto json con la clave primaria del registro correspondiente de la tabla maestra  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración de la acción de inserción. |

**Example**  
```js
$("#idTable").rup_jqtable("getMasterTablePkObject");
```
<a name="module_rup_jqtable/report"></a>

## rup\_jqtable/report
Genera los controles necesarios para permitir al usuario la exportación de los datos mostrados en la tabla.

**Summary**: Plugin de reporting del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["report"],	report:{		// Propiedades de configuración del report inlineEdit	}});
```

* [rup_jqtable/report](#module_rup_jqtable/report)
    * [~options](#module_rup_jqtable/report..options)
    * [~preConfigureReport(settings)](#module_rup_jqtable/report..preConfigureReport)
    * [~postConfigureReport(settings)](#module_rup_jqtable/report..postConfigureReport)

<a name="module_rup_jqtable/report..options"></a>

### rup_jqtable/report~options
Propiedades de configuración del plugin report del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/report</code>](#module_rup_jqtable/report)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [columns] | <code>object</code> | Permite especificar mediante un array, los identificadores de las columnas que van a ser mostradas en el informe. |
| [excludeColumns] | <code>Array.&lt;string&gt;</code> | Determina las columnas que van a ser excluidas de la generación del informe. |
| [sendPostDataParams] | <code>Array.&lt;string&gt;</code> | Parámetros del jqGrid que van a ser enviados en la petición de generación del informe. |

<a name="module_rup_jqtable/report..preConfigureReport"></a>

### rup_jqtable/report~preConfigureReport(settings)
Metodo que realiza la pre-configuración del plugin report del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/report</code>](#module_rup_jqtable/report)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/report..postConfigureReport"></a>

### rup_jqtable/report~postConfigureReport(settings)
Metodo que realiza la post-configuración del plugin report del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/report</code>](#module_rup_jqtable/report)  
**Emits**: [<code>rupTable\_serializeReportData</code>](#module_rup_jqtable+event_rupTable_serializeReportData)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multifilter"></a>

## rup\_jqtable/multifilter
Gestiona las operaciones de filtrado múltiple de datos sobre el origen de datos que utiliza el componente.

**Summary**: Plugin de filtrado múltiple del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["multifilter"],	filter:{		// Propiedades de configuración del plugin multifilter	}});
```

* [rup_jqtable/multifilter](#module_rup_jqtable/multifilter)
    * [~options](#module_rup_jqtable/multifilter..options)
    * [~preConfigureMultifilter(settings)](#module_rup_jqtable/multifilter..preConfigureMultifilter)
    * [~postConfigureMultifilter(settings)](#module_rup_jqtable/multifilter..postConfigureMultifilter)
    * [~getMultifilterDialogTemplate(settings)](#module_rup_jqtable/multifilter..getMultifilterDialogTemplate) ⇒ <code>object</code>
    * [~configureMultifilter(settings)](#module_rup_jqtable/multifilter..configureMultifilter)
    * [~addFilter(filter)](#module_rup_jqtable/multifilter..addFilter)
    * [~deleteFilter(filter)](#module_rup_jqtable/multifilter..deleteFilter)

<a name="module_rup_jqtable/multifilter..options"></a>

### rup_jqtable/multifilter~options
Propiedades de configuración del plugin multifilter del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [idFilter] | <code>string</code> |  | Permite asignar un identificador al filtro. Debe ser único para toda la aplicación. En caso de no asignar un id, se asigna el selector del rup_jqtable. |
| labelSize | <code>string</code> |  | Permite especificar el tamaño máximo permitido para el nombre del filtro. Es una propiedad obligatoria. |
| [userFilter] | <code>string</code> |  | En caso de que la aplicación donde se tiene que implementar el multifiltro no implemente la variable LOGGED_USER, para conservar el usuario identificado, con este parámetro permite asignar un identificador de usuario alternativo. |
| [getDefault] | <code>boolean</code> | <code>true</code> | Determina si el multifiltro debe de cargar el filtro por defecto al cargar la página. |

<a name="module_rup_jqtable/multifilter..preConfigureMultifilter"></a>

### rup_jqtable/multifilter~preConfigureMultifilter(settings)
Metodo que realiza la pre-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multifilter..postConfigureMultifilter"></a>

### rup_jqtable/multifilter~postConfigureMultifilter(settings)
Metodo que realiza la post-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Emits**: <code>module:rup\_jqtable#event:rupTable\_multifilter\_fillForm</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/multifilter..getMultifilterDialogTemplate"></a>

### rup_jqtable/multifilter~getMultifilterDialogTemplate(settings) ⇒ <code>object</code>
Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Returns**: <code>object</code> - - Objeto jQuery con el contenido html de la template.  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_jqtable("getMultifilterDialogTemplate", settings);
```
<a name="module_rup_jqtable/multifilter..configureMultifilter"></a>

### rup_jqtable/multifilter~configureMultifilter(settings)
Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_jqtable("configureMultifilter", settings);
```
<a name="module_rup_jqtable/multifilter..addFilter"></a>

### rup_jqtable/multifilter~addFilter(filter)
Función que añade un filtro al multifiltro

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  
**Emits**: [<code>rupTable\_multifilter\_beforeAdd</code>](#module_rup_jqtable+event_rupTable_multifilter_beforeAdd)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a añadir. |

**Example**  
```js
$("#idComponente").rup_jqtable("addFilter", filter);
```
<a name="module_rup_jqtable/multifilter..deleteFilter"></a>

### rup_jqtable/multifilter~deleteFilter(filter)
Función que elimina un filtro del multifiltro.

**Kind**: inner method of [<code>rup\_jqtable/multifilter</code>](#module_rup_jqtable/multifilter)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a eliminar. |

**Example**  
```js
$("#idComponente").rup_jqtable("deleteFilter", filter);
```
<a name="module_rup_jqtable/responsive"></a>

## rup\_jqtable/responsive
Proporciona al componente RUP Table ciertas funcionalidades responsive.

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["responsive"],	responsive:{		// Propiedades de configuración del plugin responsive	}});
```

* [rup_jqtable/responsive](#module_rup_jqtable/responsive)
    * [~options](#module_rup_jqtable/responsive..options)
    * [~preConfigureResponsive(settings)](#module_rup_jqtable/responsive..preConfigureResponsive)
    * [~postConfigureResponsive(settings)](#module_rup_jqtable/responsive..postConfigureResponsive)
    * [~getRwdColConfig()](#module_rup_jqtable/responsive..getRwdColConfig) ⇒ <code>Array.&lt;object&gt;</code>

<a name="module_rup_jqtable/responsive..options"></a>

### rup_jqtable/responsive~options
Propiedades de configuración del plugin responsive del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fluid] | <code>object</code> | Parametros de configuración |
| [excludeColumns] | <code>Array.&lt;string&gt;</code> | Determina las columnas que van a ser excluidas de la generación del informe. |
| [sendPostDataParams] | <code>Array.&lt;string&gt;</code> | Parámetros del jqGrid que van a ser enviados en la petición de generación del informe. |

<a name="module_rup_jqtable/responsive..preConfigureResponsive"></a>

### rup_jqtable/responsive~preConfigureResponsive(settings)
Metodo que realiza la pre-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/responsive..postConfigureResponsive"></a>

### rup_jqtable/responsive~postConfigureResponsive(settings)
Metodo que realiza la post-configuración del plugin responsive del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/responsive..getRwdColConfig"></a>

### rup_jqtable/responsive~getRwdColConfig() ⇒ <code>Array.&lt;object&gt;</code>
Obtiene a partir de la configuración del colModel, la información correspondiente al comportamiento responsive de las columnas.

**Kind**: inner method of [<code>rup\_jqtable/responsive</code>](#module_rup_jqtable/responsive)  
**Returns**: <code>Array.&lt;object&gt;</code> - - Configuración responsive para las columnas de la tabla.  
