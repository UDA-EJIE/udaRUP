<a name="module_rup_table/multiselection"></a>

## rup_table/multiselection
Permite realizar una selección múltiple de los registros que se muestran en la tabla.

**Summary**: Plugin de multiselection del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["multiselection"],       	multiselection:{       		// Propiedades de configuración del plugin multiselection       	}});
```

* [rup_table/multiselection](#module_rup_table/multiselection)
    * _instance_
        * ["rupTable_multiselectionUpdated"](#module_rup_table/multiselection+event_rupTable_multiselectionUpdated)
        * ["rupTableSelectedRowNumberUpdated"](#module_rup_table/multiselection+event_rupTableSelectedRowNumberUpdated)
    * _inner_
        * [~options](#module_rup_table/multiselection..options)
        * [~preConfigureMultiselection(settings)](#module_rup_table/multiselection..preConfigureMultiselection)
        * [~postConfigureMultiselection(settings)](#module_rup_table/multiselection..postConfigureMultiselection)
        * [~getSelectedIds()](#module_rup_table/multiselection..getSelectedIds) ⇒ <code>array</code>
        * [~clearHighlightedEditableRows()](#module_rup_table/multiselection..clearHighlightedEditableRows)
        * [~highlightFirstEditableRow()](#module_rup_table/multiselection..highlightFirstEditableRow)
        * [~highlightEditableRow($row)](#module_rup_table/multiselection..highlightEditableRow)
        * [~resetSelecion()](#module_rup_table/multiselection..resetSelecion)
        * [~selectAllRows()](#module_rup_table/multiselection..selectAllRows)
        * [~selectRemainingRows()](#module_rup_table/multiselection..selectRemainingRows)
        * [~deselectAllRows()](#module_rup_table/multiselection..deselectAllRows)
        * [~deselectRemainingRows()](#module_rup_table/multiselection..deselectRemainingRows)
        * [~updateSelectedRowNumber()](#module_rup_table/multiselection..updateSelectedRowNumber)

<a name="module_rup_table/multiselection+event_rupTable_multiselectionUpdated"></a>

### "rupTable_multiselectionUpdated"
Indica que se ha actualizado el componente gestor de la multiselección.

**Kind**: event emitted by <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_multiselectionUpdated" ,function(event){ });
```
<a name="module_rup_table/multiselection+event_rupTableSelectedRowNumberUpdated"></a>

### "rupTableSelectedRowNumberUpdated"
Indica que se ha actualizado el número de elementos seleccionados.

**Kind**: event emitted by <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on(" rupTableSelectedRowNumberUpdated" ,function(event){   });
```
<a name="module_rup_table/multiselection..options"></a>

### rup_table/multiselection~options
Parámetros de configuración para el plugin multiselection.

**Kind**: inner property of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| headerContextMenu_enabled | <code>boolean</code> | Habilita el menú contextual que se muestra en el check de multiselección en la cabecera de la tabla |
| headerContextMenu | <code>object</code> | Propiedades de configuración del menú contextual de la cabecera de la tabla. |
| rowContextMenu_enabled | <code>boolean</code> | Habilita el menú contextual que se muestra en los checks correspondientes a cada registro. |
| rowContextMenu | <code>object</code> | : Propiedades de configuración de los menús contextuales asociados a cada registro. |

<a name="module_rup_table/multiselection..preConfigureMultiselection"></a>

### rup_table/multiselection~preConfigureMultiselection(settings)
Metodo que realiza la pre-configuración del plugin multiselection del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/multiselection..postConfigureMultiselection"></a>

### rup_table/multiselection~postConfigureMultiselection(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/multiselection..getSelectedIds"></a>

### rup_table/multiselection~getSelectedIds() ⇒ <code>array</code>
Devuelve un array con los identificadores de los registros seleccionados.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Returns**: <code>array</code> - identificadores de los registros seleccionados.  
**Example**  
```js
$("#idComponente").rup_table("getSelectedIds");
```
<a name="module_rup_table/multiselection..clearHighlightedEditableRows"></a>

### rup_table/multiselection~clearHighlightedEditableRows()
Se elimina el resaltado de las filas que se muestran como editables.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("clearHighlightedEditableRows");
```
<a name="module_rup_table/multiselection..highlightFirstEditableRow"></a>

### rup_table/multiselection~highlightFirstEditableRow()
Resalta como editable el primer registro seleccionado de la página.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("highlightFirstEditableRow");
```
<a name="module_rup_table/multiselection..highlightEditableRow"></a>

### rup_table/multiselection~highlightEditableRow($row)
Resalta como editable el registro correspondiente.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>object</code> | La fila a resaltar |

**Example**  
```js
$("#idComponente").rup_table("highlightEditableRow", row);
```
<a name="module_rup_table/multiselection..resetSelecion"></a>

### rup_table/multiselection~resetSelecion()
Resetea la selección realizada sobre los registros de la tabla.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("resetSelecion");
```
<a name="module_rup_table/multiselection..selectAllRows"></a>

### rup_table/multiselection~selectAllRows()
Se seleccionan todos los registros de la página mostrada en la tabla.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("selectAllRows");
```
<a name="module_rup_table/multiselection..selectRemainingRows"></a>

### rup_table/multiselection~selectRemainingRows()
Se seleccionan los registros restantes de la página que no han sido seleccionados previamente.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("selectRemainingRows");
```
<a name="module_rup_table/multiselection..deselectAllRows"></a>

### rup_table/multiselection~deselectAllRows()
Se deseleccionan todos los registros de la página mostrada en la tabla.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("deselectAllRows");
```
<a name="module_rup_table/multiselection..deselectRemainingRows"></a>

### rup_table/multiselection~deselectRemainingRows()
Se deseleccionan los registros restantes de la página que no han sido deseleccionados previamente.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("deselectRemainingRows");
```
<a name="module_rup_table/multiselection..updateSelectedRowNumber"></a>

### rup_table/multiselection~updateSelectedRowNumber()
Actualiza el contador de la tabla que indica los registros seleccionados.

**Kind**: inner method of <code>[rup_table/multiselection](#module_rup_table/multiselection)</code>  
**Example**  
```js
$("#idComponente").rup_table("updateSelectedRowNumber");
```
