<a name="module_dataTables.multiselect"></a>

## dataTables.multiselect
Módulo que permite toda la multiseleción

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [dataTables.multiselect](#module_dataTables.multiselect)
    * [~init(dt)](#module_dataTables.multiselect..init)
    * [~cellRange(dt, idx, last)](#module_dataTables.multiselect..cellRange)
    * [~disabledMouseSelection(dt)](#module_dataTables.multiselect..disabledMouseSelection)
    * [~enableMouseSelection(dt)](#module_dataTables.multiselect..enableMouseSelection)
    * [~eventTrigger(api, selected, type, any)](#module_dataTables.multiselect..eventTrigger)
    * [~info(api)](#module_dataTables.multiselect..info)
    * [~init(ctx)](#module_dataTables.multiselect..init)
    * [~drawSelectId(ctx)](#module_dataTables.multiselect..drawSelectId)
    * [~paintCheckboxexSelect(ctx)](#module_dataTables.multiselect..paintCheckboxexSelect)
    * [~checkPageSelectedAll(dt, selected)](#module_dataTables.multiselect..checkPageSelectedAll)
    * [~createContexMenuSelect(id, ctx)](#module_dataTables.multiselect..createContexMenuSelect)
    * [~selectAllPage(dt)](#module_dataTables.multiselect..selectAllPage)
    * [~deselectAllPage(dt)](#module_dataTables.multiselect..deselectAllPage)
    * [~selectAll(dt)](#module_dataTables.multiselect..selectAll)
    * [~deselectAll(dt)](#module_dataTables.multiselect..deselectAll)
    * [~rowColumnRange(dt, type, idx, last)](#module_dataTables.multiselect..rowColumnRange)
    * [~clear(ctx, [force])](#module_dataTables.multiselect..clear)
    * [~typeSelect(e, dt, ctx, type, idx)](#module_dataTables.multiselect..typeSelect)
    * [~initializeMultiselectionProps()](#module_dataTables.multiselect..initializeMultiselectionProps)
    * [~maintIdsRows(DataTable, id, select, pagina, line)](#module_dataTables.multiselect..maintIdsRows)

<a name="module_dataTables.multiselect..init"></a>

### dataTables.multiselect~init(dt)
Se inicializa el componente multiselect

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |

<a name="module_dataTables.multiselect..cellRange"></a>

### dataTables.multiselect~cellRange(dt, idx, last)
Add one or more cells to the selection when shift clicking in OS selectionstyle cell selection.Cell range is more complicated than row and column as we want to selectin the visible grid rather than by index in sequence. For example, if youclick first in cell 1-1 and then shift click in 2-2 - cells 1-2 and 2-1should also be selected (and not 1-3, 1-4. etc)

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |
| idx | <code>object</code> | Cell index to select to |
| last | <code>object</code> | Cell index to select from |

<a name="module_dataTables.multiselect..disabledMouseSelection"></a>

### dataTables.multiselect~disabledMouseSelection(dt)
Disable mouse selection by removing the selectors

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable to remove events from e |

<a name="module_dataTables.multiselect..enableMouseSelection"></a>

### dataTables.multiselect~enableMouseSelection(dt)
Attach mouse listeners to the table to allow mouse selection of items

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable to remove events from |

<a name="module_dataTables.multiselect..eventTrigger"></a>

### dataTables.multiselect~eventTrigger(api, selected, type, any)
Trigger an event on a DataTable

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>DataTable.Api</code> | DataTable to trigger events on |
| selected | <code>boolean</code> | true if selected, false if deselected |
| type | <code>string</code> | Item type acting on |
| any | <code>boolean</code> | Require that there are values before     triggering |

<a name="module_dataTables.multiselect..info"></a>

### dataTables.multiselect~info(api)
Update the information element of the DataTable showing information about theitems selected. This is done by adding tags to the existing text

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| api | <code>DataTable.Api</code> | DataTable to update |

<a name="module_dataTables.multiselect..init"></a>

### dataTables.multiselect~init(ctx)
Initialisation of a new table. Attach event handlers and callbacks to allowSelect to operate correctly.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered, if there is ajax data

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.settings</code> | Settings object to operate on |

<a name="module_dataTables.multiselect..drawSelectId"></a>

### dataTables.multiselect~drawSelectId(ctx)
Pinta los elementos selecionables, porque tiene los ids almacenados y mete la clase que se le indica.This will occur _after_ the initial DataTables initialisation, althoughbefore Ajax data is rendered

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type |
| --- | --- |
| ctx | <code>DataTable.api</code> | 

<a name="module_dataTables.multiselect..paintCheckboxexSelect"></a>

### dataTables.multiselect~paintCheckboxexSelect(ctx)
Pinta la cabecera y pie del datatable con el checkbox all.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>DataTable.ctx</code> | Settings object to operate on |

<a name="module_dataTables.multiselect..checkPageSelectedAll"></a>

### dataTables.multiselect~checkPageSelectedAll(dt, selected)
Metodo que comprueba que todos los checks de la página están seleccionados

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| selected | <code>boolean</code> | Es true o false para saber cual de los 2 quieres buscar. |

<a name="module_dataTables.multiselect..createContexMenuSelect"></a>

### dataTables.multiselect~createContexMenuSelect(id, ctx)
Metodo que crea el contexMenu de la tabla

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Es el identificador del datatable. |
| ctx | <code>object</code> | datatable.settings. |

<a name="module_dataTables.multiselect..selectAllPage"></a>

### dataTables.multiselect~selectAllPage(dt)
Metodo que selecciona todos los elementos de una misma página.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_dataTables.multiselect..deselectAllPage"></a>

### dataTables.multiselect~deselectAllPage(dt)
Metodo que deselecciona todos los elementos de una misma página.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_dataTables.multiselect..selectAll"></a>

### dataTables.multiselect~selectAll(dt)
Metodo que selecciona todos los elementos.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_dataTables.multiselect..deselectAll"></a>

### dataTables.multiselect~deselectAll(dt)
Metodo que deselecciona todos los elementos.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Datatable. |

<a name="module_dataTables.multiselect..rowColumnRange"></a>

### dataTables.multiselect~rowColumnRange(dt, type, idx, last)
Add one or more items (rows or columns) to the selection when shift clickingin OS selection style

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>DataTable.Api</code> | DataTable |
| type | <code>string</code> | Row or column range selector |
| idx | <code>object</code> | Item index to select to |
| last | <code>object</code> | Item index to select from |

<a name="module_dataTables.multiselect..clear"></a>

### dataTables.multiselect~clear(ctx, [force])
Clear all selected items

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| ctx | <code>DataTable.settings</code> |  | Settings object of the host DataTable |
| [force] | <code>boolean</code> | <code>false</code> | Force the de-selection to happen, regardless     of selection style |

<a name="module_dataTables.multiselect..typeSelect"></a>

### dataTables.multiselect~typeSelect(e, dt, ctx, type, idx)
Select items based on the current configuration for style and items.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>object</code> | Mouse event object |
| dt | <code>DataTables.Api</code> | DataTable |
| ctx | <code>DataTable.settings</code> | Settings object of the host DataTable |
| type | <code>string</code> | Items to select |
| idx | <code>int</code> \| <code>object</code> | Index of the item to select |

<a name="module_dataTables.multiselect..initializeMultiselectionProps"></a>

### dataTables.multiselect~initializeMultiselectionProps()
Metodo que inicialida las propiedades para el multiselect.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
<a name="module_dataTables.multiselect..maintIdsRows"></a>

### dataTables.multiselect~maintIdsRows(DataTable, id, select, pagina, line)
Metodo que añade y quita los seleccionados.

**Kind**: inner method of [<code>dataTables.multiselect</code>](#module_dataTables.multiselect)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| DataTable | <code>DataTables.Api</code> | DataTable |
| id | <code>string</code> | id seleccionado |
| select | <code>boolean</code> | si es seleccionado o no |
| pagina | <code>integer</code> | página en la que se encuentra el seleccionado |
| line | <code>integer</code> | linea en la que se encuentra el seleccionado |

