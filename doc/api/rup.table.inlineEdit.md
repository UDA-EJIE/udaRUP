<a name="module_rup_table/inlineEdit"></a>

## rup_table/inlineEdit
Permite la edición de los registros de la tabla mostrando los campos de edición sobre la propia línea del registro.

**Summary**: Plugin de inlineEdit del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["inlineEdit"],       	inlineEdit:{       		// Propiedades de configuración del plugin inlineEdit       	}});
```

* [rup_table/inlineEdit](#module_rup_table/inlineEdit)
    * _instance_
        * ["rupTable_deleteAfterSubmit"](#module_rup_table/inlineEdit+event_rupTable_deleteAfterSubmit)
        * ["rupTableAfterDelete"](#module_rup_table/inlineEdit+event_rupTableAfterDelete)
    * _inner_
        * [~options](#module_rup_table/inlineEdit..options)
        * [~preConfigureInlineEdit(settings)](#module_rup_table/inlineEdit..preConfigureInlineEdit)
        * [~postConfigureInlineEdit(settings)](#module_rup_table/inlineEdit..postConfigureInlineEdit)
        * [~addRow(options)](#module_rup_table/inlineEdit..addRow)
        * [~cloneRow(rowId, options)](#module_rup_table/inlineEdit..cloneRow)
        * [~editRow(rowId, options, skipFieldCheck)](#module_rup_table/inlineEdit..editRow)
        * [~deleteRow(rowId, options)](#module_rup_table/inlineEdit..deleteRow)
        * [~saveRow(rowId, options)](#module_rup_table/inlineEdit..saveRow)
        * [~restoreRow(rowId)](#module_rup_table/inlineEdit..restoreRow)

<a name="module_rup_table/inlineEdit+event_rupTable_deleteAfterSubmit"></a>

### "rupTable_deleteAfterSubmit"
Evento que se lanza justo después de realizarse la petición de borrado de un registro.

**Kind**: event emitted by <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_deleteAfterSubmit", function(){   });
```
<a name="module_rup_table/inlineEdit+event_rupTableAfterDelete"></a>

### "rupTableAfterDelete"
Evento que indica que se ha realizado correctamente el borrado de un elemento.

**Kind**: event emitted by <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| data | <code>object</code> | Objeto que contiene la información retornada desde el servidor. |
| textStatus | <code>string</code> | Texto que describe el estado http de la respuesta. |
| xhr | <code>object</code> | Objeto XMLHttpRequest de la petición AJAX de borrado. |

**Example**  
```js
$("#idComponente").on("rupTableAfterDelete", function(data, textStatus, xhr){   });
```
<a name="module_rup_table/inlineEdit..options"></a>

### rup_table/inlineEdit~options
Parametros de configuración de los settings para el caso particular de configuración del componente en el caso de funcionar en modo edición en linea.

**Kind**: inner property of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| addEditOptions | <code>object</code> | Propiedades de configuración comunes a las acciones de edición e inserción de un registro. |
| addOptions | <code>object</code> | Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| editOptions | <code>object</code> | Propiedades de configuración exclusivas de la acción de edición de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| deleteOptions | <code>object</code> | Propiedades de configuración de la acción de borrado de un registro. |

<a name="module_rup_table/inlineEdit..preConfigureInlineEdit"></a>

### rup_table/inlineEdit~preConfigureInlineEdit(settings)
Metodo que realiza la pre-configuración del plugin inlineEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/inlineEdit..postConfigureInlineEdit"></a>

### rup_table/inlineEdit~postConfigureInlineEdit(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/inlineEdit..addRow"></a>

### rup_table/inlineEdit~addRow(options)
Añade una nueva línea en blanco al mantenimiento para permitir introducir los datos del nuevo registro.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración de la acción de inserción. |

**Example**  
```js
$("#idComponente").rup_table("addRow", addOptions);
```
<a name="module_rup_table/inlineEdit..cloneRow"></a>

### rup_table/inlineEdit~cloneRow(rowId, options)
Clona un registro determinado. Añade una nueva línea con el contenido del registro a partir del cual se desea clonar.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro a partir del cual se desea realizar el clonado. |
| options | <code>object</code> | Opciones de configuración de la acción de clonado |

**Example**  
```js
$("#idComponente").rup_table("cloneRow", rowId, cloneOptions);
```
<a name="module_rup_table/inlineEdit..editRow"></a>

### rup_table/inlineEdit~editRow(rowId, options, skipFieldCheck)
Pone el registro indicado en modo edición para permitir la edición de sus datos.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea editar |
| options | <code>object</code> | Opciones de configuración de la acción de modificación. |
| skipFieldCheck | <code>boolean</code> | Si está activado, controla los campos editables en modo edición |

**Example**  
```js
$("#idComponente").rup_table("editRow", rowId, editOptions,skipFieldCheck);
```
<a name="module_rup_table/inlineEdit..deleteRow"></a>

### rup_table/inlineEdit~deleteRow(rowId, options)
Elimina el registro indicado

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea eliminar. |
| options | <code>object</code> | Opciones de configuración de la acción de borrado. |

**Example**  
```js
$("#idComponente").rup_table("deleteRow", rowId, deleteOptions);
```
<a name="module_rup_table/inlineEdit..saveRow"></a>

### rup_table/inlineEdit~saveRow(rowId, options)
Guarda el registro modificado. Se almacenan los datos introducidos en la línea en modo edición.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador de la línea que se desea guardar. |
| options | <code>object</code> | Opciones de configuración de la acción de guaradado. |

**Example**  
```js
$("#idComponente").rup_table("saveRow", rowId, saveOptions);
```
<a name="module_rup_table/inlineEdit..restoreRow"></a>

### rup_table/inlineEdit~restoreRow(rowId)
Restaura la fila indicada al estado anterior a habilitarse el modo edición.

**Kind**: inner method of <code>[rup_table/inlineEdit](#module_rup_table/inlineEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador de la línea que se desea guardar |

**Example**  
```js
$("#idComponente").rup_table("restoreRow", rowId);
```
