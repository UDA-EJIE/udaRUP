<a name="module_rup_jqtable/inlineEdit"></a>

## rup_jqtable/inlineEdit
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

**Kind**: inner property of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/inlineEdit..postConfigureInlineEdit"></a>

### rup_jqtable/inlineEdit~postConfigureInlineEdit(settings)
Metodo que realiza la post-configuración del plugin inlineEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/inlineEdit..addRow"></a>

### rup_jqtable/inlineEdit~addRow(options) ⇒ <code>object</code>
Añade una nueva línea en blanco al mantenimiento para permitir introducir los datos del nuevo registro.

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable_beforeAddRow</code>](#module_rup_jqtable+event_rupTable_beforeAddRow)  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable_beforeCloneRow</code>](#module_rup_jqtable+event_rupTable_beforeCloneRow)  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable_beforeEditRow</code>](#module_rup_jqtable+event_rupTable_beforeEditRow)  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: [<code>rupTable_deleteAfterSubmit</code>](#module_rup_jqtable+event_rupTable_deleteAfterSubmit), <code>module:rup_jqtable#event:rupTable_deleteAfterComplete</code>, [<code>rupTable_beforeDeleteRow</code>](#module_rup_jqtable+event_rupTable_beforeDeleteRow)  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: <code>module:rup_jqtable#event:rupTable_beforeSaveRow</code>  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  
**Emits**: <code>module:rup_jqtable#event:rupTable_beforeRestoreRow</code>  

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

**Kind**: inner method of [<code>rup_jqtable/inlineEdit</code>](#module_rup_jqtable/inlineEdit)  
**Returns**: <code>object</code> - - Referencia jQuery a la propia tabla.  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador de la línea que se desea guardar. |

**Example**  
```js
$("#idTable").rup_jqtable("restoreRow", rowId, options);
```
