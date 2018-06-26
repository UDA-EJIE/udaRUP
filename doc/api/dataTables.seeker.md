<a name="module_dataTables.seeker"></a>

## dataTables.seeker
Buscador interno del datatable

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [dataTables.seeker](#module_dataTables.seeker)
    * [~init(dt)](#module_dataTables.seeker..init)
    * [~createFilterColumn(dt, ctx)](#module_dataTables.seeker..createFilterColumn)
    * [~createSearchRow(dt, ctx)](#module_dataTables.seeker..createSearchRow)
    * [~selectSearch(dt, ctx, rows)](#module_dataTables.seeker..selectSearch)
    * [~paginar(ctx, dato)](#module_dataTables.seeker..paginar)
    * [~updateDetailSeekPagination(currentRowNum, totalRowNum)](#module_dataTables.seeker..updateDetailSeekPagination)
    * [~processData(dt, ctx, dato)](#module_dataTables.seeker..processData)
    * [~getDatos(ctx)](#module_dataTables.seeker..getDatos) ⇒ <code>object</code>
    * [~createRupComponent(dt, ctx)](#module_dataTables.seeker..createRupComponent)

<a name="module_dataTables.seeker..init"></a>

### dataTables.seeker~init(dt)
Se inicializa el componente seeker

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |

<a name="module_dataTables.seeker..createFilterColumn"></a>

### dataTables.seeker~createFilterColumn(dt, ctx)
Crea los componentes principales del buscador.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |

<a name="module_dataTables.seeker..createSearchRow"></a>

### dataTables.seeker~createSearchRow(dt, ctx)
Genera la barra de controles para gestionar la búsqueda..

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |

<a name="module_dataTables.seeker..selectSearch"></a>

### dataTables.seeker~selectSearch(dt, ctx, rows)
Selecciona con la lupa los rows seleccionados. Una vez se han encontrado.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |
| rows | <code>object</code> | Filas del datatable de la página actual. |

<a name="module_dataTables.seeker..paginar"></a>

### dataTables.seeker~paginar(ctx, dato)
Metodo para saber si hay que paginar o no.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |
| dato | <code>object</code> | Son los datos de las filas que viene del controller.. |

<a name="module_dataTables.seeker..updateDetailSeekPagination"></a>

### dataTables.seeker~updateDetailSeekPagination(currentRowNum, totalRowNum)
Actualiza la navegación del seeker.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| currentRowNum | <code>integer</code> | Número de la posción actual del registro selecionado. |
| totalRowNum | <code>integer</code> | Número total de registros seleccionados. |

<a name="module_dataTables.seeker..processData"></a>

### dataTables.seeker~processData(dt, ctx, dato)
Metodo para procesar los datos provinientes del controller.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |
| dato | <code>object</code> | Son los datos de las filas que viene del controller. |

<a name="module_dataTables.seeker..getDatos"></a>

### dataTables.seeker~getDatos(ctx) ⇒ <code>object</code>
Se obtienen los datos del formulario del seeker.

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Returns**: <code>object</code> - Devuelve el objeto mapeado de todos los campos.  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |

<a name="module_dataTables.seeker..createRupComponent"></a>

### dataTables.seeker~createRupComponent(dt, ctx)
Partiendo de los inputs del seeker, se convierten en componentes rup dependiendo del tipo..

**Kind**: inner method of [<code>dataTables.seeker</code>](#module_dataTables.seeker)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto datatable. |
| ctx | <code>object</code> | Es el contecto del datatable donde esta la configuración del mismo. |

