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
