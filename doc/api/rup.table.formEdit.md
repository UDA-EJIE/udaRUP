<a name="module_rup_table/formEdit"></a>

## rup_table/formEdit
Permite la edición de los registros de la tabla utilizando un formulario de detalle

**Summary**: Plugin de formEdit del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["formEdit"],       	formEdit:{       		// Propiedades de configuración del plugin formEdit       	}});
```

* [rup_table/formEdit](#module_rup_table/formEdit)
    * _instance_
        * ["rupTable_beforeDeleteRow"](#module_rup_table/formEdit+event_rupTable_beforeDeleteRow)
        * ["rupTable_beforeEditRow"](#module_rup_table/formEdit+event_rupTable_beforeEditRow)
        * ["rupTable_deleteAfterSubmit"](#module_rup_table/formEdit+event_rupTable_deleteAfterSubmit)
        * ["rupTableAfterDelete"](#module_rup_table/formEdit+event_rupTableAfterDelete)
        * ["rupTable_beforeAddRow"](#module_rup_table/formEdit+event_rupTable_beforeAddRow)
        * ["rupTable_beforeCloneRow"](#module_rup_table/formEdit+event_rupTable_beforeCloneRow)
        * ["rupTable_afterDeleteRow"](#module_rup_table/formEdit+event_rupTable_afterDeleteRow)
        * ["rupTable_afterFormFillDataServerSide"](#module_rup_table/formEdit+event_rupTable_afterFormFillDataServerSide)
        * ["rupTable_formEditCompareData"](#module_rup_table/formEdit+event_rupTable_formEditCompareData)
    * _inner_
        * [~options](#module_rup_table/formEdit..options)
        * [~preConfigureFormEdit(settings)](#module_rup_table/formEdit..preConfigureFormEdit)
        * [~postConfigureFormEdit(settings)](#module_rup_table/formEdit..postConfigureFormEdit)
        * [~deleteElement(rowId, options)](#module_rup_table/formEdit..deleteElement)
        * [~editElement(rowId, options)](#module_rup_table/formEdit..editElement)
        * [~newElement(addEvent)](#module_rup_table/formEdit..newElement)
        * [~cloneElement(rowId, options, cloneEvent)](#module_rup_table/formEdit..cloneElement)
        * [~hideFormErrors($form)](#module_rup_table/formEdit..hideFormErrors)

<a name="module_rup_table/formEdit+event_rupTable_beforeDeleteRow"></a>

### "rupTable_beforeDeleteRow"
Evento que se lanza justo antes de procesarse la petición de borrado de un registro. En caso de devolver false se detiene la ejecución del borrado.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeDeleteRow", function(deleteOptions, selectedRow){   });
```
<a name="module_rup_table/formEdit+event_rupTable_beforeEditRow"></a>

### "rupTable_beforeEditRow"
Evento que se lanza justo antes de procesarse la petición de modificación de un registro. En caso de devolver false se detiene la ejecución de la operación.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeEditRow", function(options, selectedRow){   });
```
<a name="module_rup_table/formEdit+event_rupTable_deleteAfterSubmit"></a>

### "rupTable_deleteAfterSubmit"
Evento que se lanza justo después de realizarse la petición de borrado de un registro.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_deleteAfterSubmit", function(){   });
```
<a name="module_rup_table/formEdit+event_rupTableAfterDelete"></a>

### "rupTableAfterDelete"
Evento que indica que se ha realizado correctamente el borrado de un elemento.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
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
<a name="module_rup_table/formEdit+event_rupTable_beforeAddRow"></a>

### "rupTable_beforeAddRow"
Evento lanzado antes de ejecutarse el método de inserción de un registro. En caso de retornar false se cancelará la inserción

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| addOptions | <code>object</code> | Opciones de configuración de la acción de insertar un elemento |

**Example**  
```js
$("#idComponente").on("rupTable_beforeAddRow", function(addOptions){   });
```
<a name="module_rup_table/formEdit+event_rupTable_beforeCloneRow"></a>

### "rupTable_beforeCloneRow"
Evento lanzado antes de ejecutarse el método de clonado de un registro. En caso de retornar false se cancelará el clonado.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| cloneOptions | <code>object</code> | Opciones de configuración de la acción de clonar un elemento. |
| selectedRow | <code>string</code> | Identificador de la fila correspondiente al registro que se desea clonar. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeCloneRow", function(cloneOptions, selectedRow){  });
```
<a name="module_rup_table/formEdit+event_rupTable_afterDeleteRow"></a>

### "rupTable_afterDeleteRow"
Evento lanzado después de que ha finalizado correctamente el proceso de eliminar un registro..

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_afterDeleteRow", function(event){  });
```
<a name="module_rup_table/formEdit+event_rupTable_afterFormFillDataServerSide"></a>

### "rupTable_afterFormFillDataServerSide"
Evento lanzado después de que ha finalizado correctamente el proceso de carga de datos en el formulario de edición a partir de una petición al servidor de aplicaciones.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| xhr | <code>object</code> | Objeto enviado como respuesta desde el servidor |
| $detailFormToPopulate | <code>object</code> | Referencia al formulario de detalle. |
| ajaxOptions | <code>object</code> | Opciones de configuración de la petición AJAX. |

**Example**  
```js
$("#idComponente").on("rupTable_afterFormFillDataServerSide", function(){  });
```
<a name="module_rup_table/formEdit+event_rupTable_formEditCompareData"></a>

### "rupTable_formEditCompareData"
Evento lanzado después de que ha finalizado correctamente el proceso de carga de datos en el formulario de edición a partir de una petición al servidor de aplicaciones.

**Kind**: event emitted by <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |
| savedData | <code>object</code> | Objeto que contiene los valores iniciales del formulario a partir de la serialización del mismo |
| newData | <code>object</code> | Objeto que contiene los valores actuales del formulario a partir de la serialización del mismo. |

**Example**  
```js
$("#idComponente").on("rupTable_formEditCompareData ", function(event, savedData, newData){//Se realizan las comprobaciones necesarias para determinar si se han producido cambios en el formulario de detalleevent.isDifferent = true; //En caso de que se hayan producido cambios.event.isDifferent = false;  //En caso de que no hayan producido cambios.});
```
<a name="module_rup_table/formEdit..options"></a>

### rup_table/formEdit~options
Parámetros de configuración para el plugin formEdit.

**Kind**: inner property of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| addEditOptions | <code>object</code> |  | Propiedades de configuración comunes a las acciones de edición e inserción de un registro. |
| addOptions | <code>object</code> |  | Propiedades de configuración exclusivas de la acción de inserción de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| editOptions | <code>object</code> |  | Propiedades de configuración exclusivas de la acción de edición  de un registro. Sobrescriben las indicadas en la propiedad addEditOptions. |
| deleteOptions | <code>object</code> |  | Propiedades de configuración de la acción de borrado de un registro |
| detailOptions | <code>object</code> |  | Propiedades de configuración de la acción de mostrar un registro mediante el formulario de detalle. |
| defaultCompareData | <code>boolean</code> | <code>true</code> | Determina si se debe de realizar la comparación por defecto en el control de cambios del formulario de edición |
| dialogOptions | <code>object</code> |  | Permite especificar opciones de configuración para el diálogo que contiene el formulario de detalle. |

<a name="module_rup_table/formEdit..preConfigureFormEdit"></a>

### rup_table/formEdit~preConfigureFormEdit(settings)
Metodo que realiza la pre-configuración del plugin formEdit del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/formEdit..postConfigureFormEdit"></a>

### rup_table/formEdit~postConfigureFormEdit(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/formEdit..deleteElement"></a>

### rup_table/formEdit~deleteElement(rowId, options)
Realiza el borrado de un registro determinado.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea eliminar. |
| options | <code>object</code> | Opciones de configuración de la operación de borrado - Opciones de configuración de la operación de borrado |

**Example**  
```js
$("#idComponente").rup_table("deleteElement", rowId, deleteOptions);
```
<a name="module_rup_table/formEdit..editElement"></a>

### rup_table/formEdit~editElement(rowId, options)
Lanza la edición de un registro medainte un formulario de detalle.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea editar |
| options | <code>object</code> | Opciones de configuración de la operación de edición |

**Example**  
```js
$("#idComponente").rup_table("editElement", rowId, editOptions);
```
<a name="module_rup_table/formEdit..newElement"></a>

### rup_table/formEdit~newElement(addEvent)
Inicia el proceso de inserción de un nuevo registro.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| addEvent | <code>boolean</code> | Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeAddRow. |

**Example**  
```js
$("#idComponente").rup_table("newElement", addEvent);
```
<a name="module_rup_table/formEdit..cloneElement"></a>

### rup_table/formEdit~cloneElement(rowId, options, cloneEvent)
Clona el registro correspondiente al identificador indicado y utilizando las opciones de clonado especificadas.

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| rowId | <code>string</code> | Identificador del registro que se desea clonar. |
| options | <code>object</code> | Opciones de configuración de la operación de clonado. |
| cloneEvent | <code>boolean</code> | Determina si se debe lanzar (true) o no (false) el evento rupTable_beforeCloneRow. |

**Example**  
```js
$("#idComponente").rup_table("cloneElement", rowId, cloneOptions, cloneEvent);
```
<a name="module_rup_table/formEdit..hideFormErrors"></a>

### rup_table/formEdit~hideFormErrors($form)
Oculta los mensajes de error del formulario indicado

**Kind**: inner method of <code>[rup_table/formEdit](#module_rup_table/formEdit)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $form | <code>object</code> | Formulario del que se desea ocultar los mensajes de error |

**Example**  
```js
$("#idComponente").rup_table("hideFormErrors", $form);
```
