<a name="module_rup.datatable"></a>

## rup.datatable
Genera un datatable

**Summary**: Componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.datatable](#module_rup.datatable)
    * [~_initOptions(options)](#module_rup.datatable.._initOptions)
    * [~_getColumns(options)](#module_rup.datatable.._getColumns)
    * [~_doFilter(options)](#module_rup.datatable.._doFilter)
    * [~_ajaxOptions(options)](#module_rup.datatable.._ajaxOptions)
    * [~_ajaxRequestData(data, ctx)](#module_rup.datatable.._ajaxRequestData)
    * [~_createSearchPaginator(tabla, settingsT)](#module_rup.datatable.._createSearchPaginator)
    * [~_clearFilter(options)](#module_rup.datatable.._clearFilter)
    * [~preConfigureFilter(settings)](#module_rup.datatable..preConfigureFilter)
    * [~showSearchCriteria()](#module_rup.datatable..showSearchCriteria)
    * [~createEventSelect(tabla)](#module_rup.datatable..createEventSelect)
    * [~initializeMultiselectionProps()](#module_rup.datatable..initializeMultiselectionProps)

<a name="module_rup.datatable.._initOptions"></a>

### rup.datatable~_initOptions(options)
Inicializa ciertas opciones del componente

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable.._getColumns"></a>

### rup.datatable~_getColumns(options)
Obtiene las columnas

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable.._doFilter"></a>

### rup.datatable~_doFilter(options)
Filtrado

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable.._ajaxOptions"></a>

### rup.datatable~_ajaxOptions(options)
Prepara el objeto necesario para la consulta de registros al servidor

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable.._ajaxRequestData"></a>

### rup.datatable~_ajaxRequestData(data, ctx)
Solicita los datos al servidor

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Opciones del datatable |
| ctx | <code>object</code> | contexto  del componente table |

<a name="module_rup.datatable.._createSearchPaginator"></a>

### rup.datatable~_createSearchPaginator(tabla, settingsT)
Gestiona la paginación

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| tabla | <code>object</code> | Objeto que contiene la tabla |
| settingsT | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable.._clearFilter"></a>

### rup.datatable~_clearFilter(options)
Limpia el filtro

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

<a name="module_rup.datatable..preConfigureFilter"></a>

### rup.datatable~preConfigureFilter(settings)
Metodo que realiza la configuración del plugin filter del componente RUP DataTable.

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup.datatable..showSearchCriteria"></a>

### rup.datatable~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
<a name="module_rup.datatable..createEventSelect"></a>

### rup.datatable~createEventSelect(tabla)
Crea un evente para mantener la multiseleccion, el seeker y el select ya que accede a bbdd.

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  

| Param | Type | Description |
| --- | --- | --- |
| tabla | <code>object</code> | La configuración de la tabla. |

<a name="module_rup.datatable..initializeMultiselectionProps"></a>

### rup.datatable~initializeMultiselectionProps()
Metodo que inicialida las propiedades para el multiselect y el Select.

**Kind**: inner method of [<code>rup.datatable</code>](#module_rup.datatable)  
**Since**: UDA 3.4.0 // Datatable 1.0.0  
