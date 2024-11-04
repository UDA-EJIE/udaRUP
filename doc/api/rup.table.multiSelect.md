<a name="module_rup.table.multiSelect"></a>

## rup.table.multiSelect
MultiSelect for DataTables

**Summary**: MultiSelect  
**Contact**: datatables.net  
**Version**: 1.7.0  
**Author**: SpryMedia Ltd (www.sprymedia.co.uk)  
**Copyright**: SpryMedia Ltd.This source file is free software, available under the following license:  MIT license - http://datatables.net/license/mitThis source file is distributed in the hope that it will be useful, butWITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITYor FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.For details please refer to: http://www.datatables.net  

* [rup.table.multiSelect](#module_rup.table.multiSelect)
    * [~init(dt)](#module_rup.table.multiSelect..init)
    * [~cellRange(dt, idx, last)](#module_rup.table.multiSelect..cellRange)
    * [~enableMouseSelection(dt)](#module_rup.table.multiSelect..enableMouseSelection)
    * [~enableKeyboardSelection(dt)](#module_rup.table.multiSelect..enableKeyboardSelection)
    * [~rangeSelection(dt)](#module_rup.table.multiSelect..rangeSelection)
    * [~rowSelection(dt, event)](#module_rup.table.multiSelect..rowSelection)
    * [~eventTrigger(api, selected, type, any)](#module_rup.table.multiSelect..eventTrigger)
    * [~info(api)](#module_rup.table.multiSelect..info)
    * [~init(ctx)](#module_rup.table.multiSelect..init)
    * [~drawSelectId(ctx)](#module_rup.table.multiSelect..drawSelectId)
    * [~paintCheckboxexSelect(ctx)](#module_rup.table.multiSelect..paintCheckboxexSelect)
    * [~checkPageSelectedAll(dt, selected)](#module_rup.table.multiSelect..checkPageSelectedAll)
    * [~createContexMenuSelect(id, ctx)](#module_rup.table.multiSelect..createContexMenuSelect)
    * [~selectAllPage(dt)](#module_rup.table.multiSelect..selectAllPage)
    * [~deselectAllPage(dt)](#module_rup.table.multiSelect..deselectAllPage)
    * [~selectAll(dt)](#module_rup.table.multiSelect..selectAll)
    * [~deselectAll(dt)](#module_rup.table.multiSelect..deselectAll)
    * [~rowColumnRange(dt, type, idx, last)](#module_rup.table.multiSelect..rowColumnRange)
    * [~clear(ctx, [force])](#module_rup.table.multiSelect..clear)
    * [~initializeMultiselectionProps()](#module_rup.table.multiSelect..initializeMultiselectionProps)
    * [~maintIdsRows(DataTable, id, select, pagina, line)](#module_rup.table.multiSelect..maintIdsRows)
    * [~getLastSelectedId(selectedRowsPerPage)](#module_rup.table.multiSelect..getLastSelectedId) ⇒ <code>string</code>

<a name="module_rup.table.multiSelect..init"></a>

### rup.table.multiSelect~init(dt)
Se inicializa el componente multiselect

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.multiSelect..cellRange"></a>

### rup.table.multiSelect~cellRange(dt, idx, last)
Add one or more cells to the selection when shift clicking in OS selectionstyle cell selection.Cell range is more complicated than row and column as we want to selectin the visible grid rather than by index in sequence. For example, if youclick first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1should also be selected (and not 1-3, 1-4. etc)

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |
| idx | <code>object</code> | Cell index to select to |
| last | <code>object</code> | Cell index to select from |

<a name="module_rup.table.multiSelect..enableMouseSelection"></a>

### rup.table.multiSelect~enableMouseSelection(dt)
Attach mouse listeners to the table to allow mouse selection of items

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 4.2.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |

<a name="module_rup.table.multiSelect..enableKeyboardSelection"></a>

### rup.table.multiSelect~enableKeyboardSelection(dt)
Attach keyboard listeners to the table to allow keyboard selection of items

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 4.2.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |

<a name="module_rup.table.multiSelect..rangeSelection"></a>

### rup.table.multiSelect~rangeSelection(dt)
Select a range of rows in a DataTable

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 4.2.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |

<a name="module_rup.table.multiSelect..rowSelection"></a>

### rup.table.multiSelect~rowSelection(dt, event)
Select a row in a DataTable

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 4.2.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |
| event | <code>object</code> | Event information |

<a name="module_rup.table.multiSelect..eventTrigger"></a>

### rup.table.multiSelect~eventTrigger(api, selected, type, any)
Trigger an event on a DataTable

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>DataTable.Api</code> | DataTable to trigger events on |
| selected | <code>boolean</code> | true if selected, false if deselected |
| type | <code>string</code> | Item type acting on |
| any | <code>boolean</code> | Require that there are values before triggering |

<a name="module_rup.table.multiSelect..info"></a>

### rup.table.multiSelect~info(api)
Update the information element of the DataTable showing information about theitems selected. This is done by adding tags to the existing text

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>DataTable.Api</code> | DataTable to update |

<a name="module_rup.table.multiSelect..init"></a>

### rup.table.multiSelect~init(ctx)
Initialisation of a new table. Attach event handlers and callbacks to allowSelect to operate correctly.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered, if there is ajax data

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.settings</code> | Settings object to operate on |

<a name="module_rup.table.multiSelect..drawSelectId"></a>

### rup.table.multiSelect~drawSelectId(ctx)
Pinta los elementos selecionables, porque tiene los ids almacenados y mete la clase que se le indica.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type |
| --- | --- |
| ctx | <code>DataTable.api</code> | 

<a name="module_rup.table.multiSelect..paintCheckboxexSelect"></a>

### rup.table.multiSelect~paintCheckboxexSelect(ctx)
Pinta la cabecera y pie del table con el checkbox all.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.ctx</code> | Settings object to operate on |

<a name="module_rup.table.multiSelect..checkPageSelectedAll"></a>

### rup.table.multiSelect~checkPageSelectedAll(dt, selected)
Metodo que comprueba que todos los checks de la página están seleccionados

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |
| selected | <code>boolean</code> | Es true o false para saber cual de los 2 quieres buscar. |

<a name="module_rup.table.multiSelect..createContexMenuSelect"></a>

### rup.table.multiSelect~createContexMenuSelect(id, ctx)
Metodo que crea el contexMenu de la tabla

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Es el identificador del table. |
| ctx | <code>object</code> | table.settings. |

<a name="module_rup.table.multiSelect..selectAllPage"></a>

### rup.table.multiSelect~selectAllPage(dt)
Metodo que selecciona todos los elementos de una misma página.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_rup.table.multiSelect..deselectAllPage"></a>

### rup.table.multiSelect~deselectAllPage(dt)
Metodo que deselecciona todos los elementos de una misma página.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_rup.table.multiSelect..selectAll"></a>

### rup.table.multiSelect~selectAll(dt)
Metodo que selecciona todos los elementos.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_rup.table.multiSelect..deselectAll"></a>

### rup.table.multiSelect~deselectAll(dt)
Metodo que deselecciona todos los elementos.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_rup.table.multiSelect..rowColumnRange"></a>

### rup.table.multiSelect~rowColumnRange(dt, type, idx, last)
Add one or more items (rows or columns) to the selection when shift clickingin OS selection style

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |
| type | <code>string</code> | Row or column range selector |
| idx | <code>object</code> | Item index to select to |
| last | <code>object</code> | Item index to select from |

<a name="module_rup.table.multiSelect..clear"></a>

### rup.table.multiSelect~clear(ctx, [force])
Clear all selected items

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctx | <code>DataTable.settings</code> |  | Settings object of the host DataTable |
| [force] | <code>boolean</code> | <code>false</code> | Force the de-selection to happen, regardless     of selection style |

<a name="module_rup.table.multiSelect..initializeMultiselectionProps"></a>

### rup.table.multiSelect~initializeMultiselectionProps()
Metodo que inicializa las propiedades para el multiselect.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  
<a name="module_rup.table.multiSelect..maintIdsRows"></a>

### rup.table.multiSelect~maintIdsRows(DataTable, id, select, pagina, line)
Metodo que añade y quita los seleccionados.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Since**: UDA 3.4.0  

| Param | Type | Description |
| --- | --- | --- |
| DataTable | <code>DataTables.Api</code> | DataTable |
| id | <code>string</code> | id seleccionado |
| select | <code>boolean</code> | si es seleccionado o no |
| pagina | <code>integer</code> | página en la que se encuentra el seleccionado |
| line | <code>integer</code> | linea en la que se encuentra el seleccionado |

<a name="module_rup.table.multiSelect..getLastSelectedId"></a>

### rup.table.multiSelect~getLastSelectedId(selectedRowsPerPage) ⇒ <code>string</code>
Devuelve el identificador de la última fila seleccionada.

**Kind**: inner method of [<code>rup.table.multiSelect</code>](#module_rup.table.multiSelect)  
**Returns**: <code>string</code> - Identificador del último registro seleccionado.  
**Since**: UDA 5.0.4  

| Param | Type | Description |
| --- | --- | --- |
| selectedRowsPerPage | <code>Array.&lt;Object&gt;</code> | Array de las filas seleccionadas. |

