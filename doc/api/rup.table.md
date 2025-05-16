<a name="module_rup.table"></a>

## rup.table
Genera un table

**Summary**: Componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table](#module_rup.table)
    * [~isInitialized()](#module_rup.table..isInitialized) ⇒ <code>boolean</code>
    * [~createButton()](#module_rup.table..createButton)
    * [~removeButton()](#module_rup.table..removeButton)
    * [~disableButton()](#module_rup.table..disableButton)
    * [~enableButton()](#module_rup.table..enableButton)
    * [~getContext()](#module_rup.table..getContext) ⇒ <code>Object</code>
    * [~getSelectedIds()](#module_rup.table..getSelectedIds) ⇒ <code>Array.&lt;Object&gt;</code>
    * [~getLastSelectedId()](#module_rup.table..getLastSelectedId) ⇒ <code>string</code>
    * [~getSelectedRows()](#module_rup.table..getSelectedRows) ⇒ <code>Array.&lt;Object&gt;</code>
    * [~getSelectedRowPerPage()](#module_rup.table..getSelectedRowPerPage) ⇒ <code>Array.&lt;Object&gt;</code>
    * [~clear()](#module_rup.table..clear)
    * [~reload()](#module_rup.table..reload)
    * [~_initOptions(options)](#module_rup.table.._initOptions)
    * [~comparePKs(firstRow, secondRow)](#module_rup.table..comparePKs) ⇒ <code>boolean</code>
    * [~blockPKEdit(ctx, actionType)](#module_rup.table..blockPKEdit)
    * [~_getDescendantProperty(obj, key)](#module_rup.table.._getDescendantProperty)
    * [~_getColumns(options)](#module_rup.table.._getColumns)
    * [~_doFilter(options)](#module_rup.table.._doFilter)
    * [~_ajaxOptions(options)](#module_rup.table.._ajaxOptions)
    * [~_validValidations(filter, id)](#module_rup.table.._validValidations)
    * [~_ajaxRequestData(data, ctx)](#module_rup.table.._ajaxRequestData)
    * [~_createSearchPaginator(tabla, settingsT)](#module_rup.table.._createSearchPaginator)
    * [~_clearFilter(options)](#module_rup.table.._clearFilter)
    * [~preConfigureFilter(options)](#module_rup.table..preConfigureFilter)
    * [~preConfigureFilter(options)](#module_rup.table..preConfigureFilter)
    * [~showSearchCriteria()](#module_rup.table..showSearchCriteria)
    * [~createEventSelect(tabla)](#module_rup.table..createEventSelect)
    * [~initializeMultiselectionProps()](#module_rup.table..initializeMultiselectionProps)

<a name="module_rup.table..isInitialized"></a>

### rup.table~isInitialized() ⇒ <code>boolean</code>
Indica si un rup_table ya ha sido inicializado sobre el elemento con el identificador provisto.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>boolean</code> - - Indica si ya ha sido inicializada una tabla sobre el elemento.  
**Since**: UDA 5.0.3  
**Example**  
```js
$("#idTable").rup_table("isInitialized");
```
<a name="module_rup.table..createButton"></a>

### rup.table~createButton()
Crea y añade un botón en la botonera de la tabla.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.7.1  

| Type | Description |
| --- | --- |
| <code>Object</code> | Propiedades del botón. |
| <code>number</code> | Posición en la que situar el botón. |

**Example**  
```js
$("#idTable").rup_table("createButton", {
				text: function (dt) {
					return $.rup.i18nParse($.rup.i18n.base, 'rup_table.toolbar.edit');
				},
				id: idTable + 'editButton_1', // Campo obligatorio si se quiere usar desde el contextMenu
				className: 'btn-material-primary-high-emphasis table_toolbar_btnEdit order-2',
				displayRegex: /^[1-9][0-9]*$/, // Se muestra siempre que sea un numero mayor a 0
				insideContextMenu: ctx.oInit.buttons.contextMenu, // Independientemente de este valor, sera 'false' si no tiene un id definido
				type: 'edit',
				init: function (dt, button, config) {
					ctx.ext.buttons.editButton.eventDT = dt;
				},
				action: function (e, dt, button, config) {
					$('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableButtonsBeforeEditClick', [dt, button, config]);
					DataTable.Api().buttons.actions(dt, config);
					$('#' + $.escapeSelector(ctx.sTableId)).triggerHandler('tableButtonsAfterEditClick', [dt, button, config]);
				}
			}, 0);
```
<a name="module_rup.table..removeButton"></a>

### rup.table~removeButton()
Elimina el botón especificado.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.7.1  

| Type | Description |
| --- | --- |
| <code>Object</code> | Selector que contenga un botón de la tabla. |

**Example**  
```js
$("#idTable").rup_table("removeButton", $('#exampleeditButton_1'));
```
<a name="module_rup.table..disableButton"></a>

### rup.table~disableButton()
Deshabilita el botón especificado.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.7.1  

| Type | Description |
| --- | --- |
| <code>Object</code> | Selector que contenga un botón de la tabla. |
| <code>boolean</code> | Permite deshabilitar el botón del menú contextual. |

**Example**  
```js
$("#idTable").rup_table("disableButton", $('#exampleeditButton_1'), true);
```
<a name="module_rup.table..enableButton"></a>

### rup.table~enableButton()
Habilita el botón especificado.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.7.1  

| Type | Description |
| --- | --- |
| <code>Object</code> | Selector que contenga un botón de la tabla. |
| <code>boolean</code> | Permite habilitar o deshabilitar el botón de la botonera. |
| <code>boolean</code> | Permite habilitar el botón del menú contextual. |

**Example**  
```js
$("#idTable").rup_table("enableButton", $('#exampleeditButton_1'), true, false);
```
<a name="module_rup.table..getContext"></a>

### rup.table~getContext() ⇒ <code>Object</code>
Permite obtener el contexto de la tabla.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>Object</code> - - Contexto de la tabla.  
**Since**: UDA 3.7.1  
**Example**  
```js
$("#idTable").rup_table("getContext");
```
<a name="module_rup.table..getSelectedIds"></a>

### rup.table~getSelectedIds() ⇒ <code>Array.&lt;Object&gt;</code>
Devuelve los identificadores de los elementos seleccionados.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Identificadores de los elementos seleccionados.  
**Since**: UDA 4.2.1  
**Example**  
```js
$("#idTable").rup_table("getSelectedIds");
```
<a name="module_rup.table..getLastSelectedId"></a>

### rup.table~getLastSelectedId() ⇒ <code>string</code>
Devuelve el identificador de la última fila seleccionada.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>string</code> - - Identificador del último registro seleccionado.  
**Since**: UDA 5.0.3  
**Example**  
```js
$("#idTable").rup_table("getLastSelectedId");
```
<a name="module_rup.table..getSelectedRows"></a>

### rup.table~getSelectedRows() ⇒ <code>Array.&lt;Object&gt;</code>
Devuelve los campos y valores de las filas seleccionadas.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Objeto con los campos y valores de las filas seleccionadas.  
**Since**: UDA 4.2.1  
**Example**  
```js
$("#idTable").rup_table("getSelectedRows");
```
<a name="module_rup.table..getSelectedRowPerPage"></a>

### rup.table~getSelectedRowPerPage() ⇒ <code>Array.&lt;Object&gt;</code>
Devuelve las posiciones de todas las filas seleccionadas en la tabla.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Returns**: <code>Array.&lt;Object&gt;</code> - - Objeto con la posición de cada fila seleccionada en la tabla.  
**Since**: UDA 4.2.1  
**Example**  
```js
$("#idTable").rup_table("getSelectedRowPerPage");
```
<a name="module_rup.table..clear"></a>

### rup.table~clear()
Limpia todas las filas de la tabla y la deja vacía.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 4.3.0  
**Example**  
```js
$("#idTable").rup_table("clear");
```
<a name="module_rup.table..reload"></a>

### rup.table~reload()
Recarga la tabla.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 4.3.0  
**Example**  
```js
$("#idTable").rup_table("reload");
```
<a name="module_rup.table.._initOptions"></a>

### rup.table~\_initOptions(options)
Inicializa ciertas opciones del componente

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.table..comparePKs"></a>

### rup.table~comparePKs(firstRow, secondRow) ⇒ <code>boolean</code>
Comprueba si dos claves primarias son iguales.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 5.0.0 (backported) // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| firstRow | <code>object</code> | Fila de la tabla a comparar. |
| secondRow | <code>object</code> | Fila de la tabla a comparar. |

<a name="module_rup.table..blockPKEdit"></a>

### rup.table~blockPKEdit(ctx, actionType)
Método que gestiona el bloqueo de la edición de las claves primarias.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.7.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Settings object to operate on. |
| actionType | <code>string</code> | Método de operación CRUD. |

<a name="module_rup.table.._getDescendantProperty"></a>

### rup.table~\_getDescendantProperty(obj, key)
Obtiene el subcampo

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 4.1.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | Valores de la fila |
| key | <code>string</code> | Clave para extraer el valor |

<a name="module_rup.table.._getColumns"></a>

### rup.table~\_getColumns(options)
Obtiene las columnas

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.table.._doFilter"></a>

### rup.table~\_doFilter(options)
Filtrado

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.table.._ajaxOptions"></a>

### rup.table~\_ajaxOptions(options)
Prepara el objeto necesario para la consulta de registros al servidor

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.table.._validValidations"></a>

### rup.table~\_validValidations(filter, id)
Solicita los datos al servidor

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 6.3.0  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Opciones del filtro |
| id | <code>String</code> | id  del componente table |

<a name="module_rup.table.._ajaxRequestData"></a>

### rup.table~\_ajaxRequestData(data, ctx)
Solicita los datos al servidor

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Opciones del table |
| ctx | <code>object</code> | contexto  del componente table |

<a name="module_rup.table.._createSearchPaginator"></a>

### rup.table~\_createSearchPaginator(tabla, settingsT)
Gestiona la paginación

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| tabla | <code>object</code> | Objeto que contiene la tabla |
| settingsT | <code>object</code> | Opciones del componente |

<a name="module_rup.table.._clearFilter"></a>

### rup.table~\_clearFilter(options)
Limpia el filtro

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.table..preConfigureFilter"></a>

### rup.table~preConfigureFilter(options)
Metodo que realiza la configuración del plugin filter del componente RUP DataTable.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup.table..preConfigureFilter"></a>

### rup.table~preConfigureFilter(options)
Metodo que realiza la configuración del plugin filter del componente RUP DataTable.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup.table..showSearchCriteria"></a>

### rup.table~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
<a name="module_rup.table..createEventSelect"></a>

### rup.table~createEventSelect(tabla)
Crea un evento para mantener la multiseleccion, el seeker y el select ya que accede a bbdd.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  

| Param | Type | Description |
| --- | --- | --- |
| tabla | <code>object</code> | La configuración de la tabla. |

<a name="module_rup.table..initializeMultiselectionProps"></a>

### rup.table~initializeMultiselectionProps()
Metodo que inicialida las propiedades para el multiselect y el Select.

**Kind**: inner method of [<code>rup.table</code>](#module_rup.table)  
**Since**: UDA 3.4.0 // Table 1.0.0  
