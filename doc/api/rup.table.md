<a name="module_rup.table"></a>

## rup.table
Genera un table

**Summary**: Componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table](#module_rup.table)
    * [~isInitialized()](#module_rup.table..isInitialized) ⇒ <code>boolean</code>
    * [~_initOptions(options)](#module_rup.table.._initOptions)
    * [~comparePKs(firstRow, secondRow)](#module_rup.table..comparePKs) ⇒ <code>boolean</code>
    * [~blockPKEdit(ctx, actionType)](#module_rup.table..blockPKEdit)
    * [~_getDescendantProperty(obj, key)](#module_rup.table.._getDescendantProperty)
    * [~_getColumns(options)](#module_rup.table.._getColumns)
    * [~_doFilter(options)](#module_rup.table.._doFilter)
    * [~_ajaxOptions(options)](#module_rup.table.._ajaxOptions)
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
**Example**  
```js
$("#idTable").rup_table("isInitialized");
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
**Since**: UDA 5.0.0 // Table 1.0.0  

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
