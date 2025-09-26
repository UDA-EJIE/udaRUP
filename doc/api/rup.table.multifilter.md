<a name="module_rup.table.multiFilter"></a>

## rup.table.multiFilter
Módulo que permite toda multiFilter

**Summary**: Extensión del componente RUP Datatable  
**Version**: 1.0.0  
**License**: Licencia con arreglo a la EUPL, Versión 1.1 exclusivamente (la «Licencia»);Solo podrá usarse esta obra si se respeta la Licencia.Puede obtenerse una copia de la Licencia en     http://ec.europa.eu/idabc/eupl.htmlSalvo cuando lo exija la legislación aplicable o se acuerde por escrito,el programa distribuido con arreglo a la Licencia se distribuye «TAL CUAL»,SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ni expresas ni implícitas.Véase la Licencia en el idioma concreto que rige los permisos y limitacionesque establece la Licencia.  
**Copyright**: Copyright 2018 E.J.I.E., S.A.  

* [rup.table.multiFilter](#module_rup.table.multiFilter)
    * [~init(dt)](#module_rup.table.multiFilter..init)
    * [~preConfigureMultifilter(settings)](#module_rup.table.multiFilter..preConfigureMultifilter)
    * [~postConfigureMultifilter(settings)](#module_rup.table.multiFilter..postConfigureMultifilter)
    * [~deleteFilter(filter)](#module_rup.table.multiFilter..deleteFilter)
    * [~addFilter(filter)](#module_rup.table.multiFilter..addFilter)
    * [~getMultifilterDialogTemplate(settings)](#module_rup.table.multiFilter..getMultifilterDialogTemplate) ⇒ <code>object</code>
    * [~configureMultifilter(settings)](#module_rup.table.multiFilter..configureMultifilter)
    * [~_clearFilter(options)](#module_rup.table.multiFilter.._clearFilter)

<a name="module_rup.table.multiFilter..init"></a>

### rup.table.multiFilter~init(dt)
Se inicializa el componente multiFilter

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| dt | <code>object</code> | Es el objeto table. |

<a name="module_rup.table.multiFilter..preConfigureMultifilter"></a>

### rup.table.multiFilter~preConfigureMultifilter(settings)
Metodo que realiza la pre-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup.table.multiFilter..postConfigureMultifilter"></a>

### rup.table.multiFilter~postConfigureMultifilter(settings)
Metodo que realiza la post-configuración del plugin de filtrado múltiple del componente RUP Table.Este método se ejecuta antes de la inicialización del plugin.

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  
**Emits**: <code>module:rup\_table#event:rupTable\_multifilter\_fillForm</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup.table.multiFilter..deleteFilter"></a>

### rup.table.multiFilter~deleteFilter(filter)
Función que elimina un filtro del multifiltro.

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a eliminar. |

**Example**  
```js
deleteFilter, filter
```
<a name="module_rup.table.multiFilter..addFilter"></a>

### rup.table.multiFilter~addFilter(filter)
Función que añade un filtro al multifiltro

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  
**Emits**: <code>module:rup\_table#event:rupTable\_multifilter\_beforeAdd</code>  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>object</code> | Objeto json con la información del filtro a añadir. |

**Example**  
```js
$("#idComponente").rup_table("addFilter", filter);
```
<a name="module_rup.table.multiFilter..getMultifilterDialogTemplate"></a>

### rup.table.multiFilter~getMultifilterDialogTemplate(settings) ⇒ <code>object</code>
Devuelve la template html empleada para renderizar los controles del formulario de filtrado múltiple.

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  
**Returns**: <code>object</code> - - Objeto jQuery con el contenido html de la template.  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_table("getMultifilterDialogTemplate", settings);
```
<a name="module_rup.table.multiFilter..configureMultifilter"></a>

### rup.table.multiFilter~configureMultifilter(settings)
Realiza la configuración interna del plugin multifilter a partir de las propiedades de configuración indicadas.

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración del componente. |

**Example**  
```js
$("#idComponente").rup_table("configureMultifilter", settings);
```
<a name="module_rup.table.multiFilter.._clearFilter"></a>

### rup.table.multiFilter~\_clearFilter(options)
Limpia el filtro

**Kind**: inner method of [<code>rup.table.multiFilter</code>](#module_rup.table.multiFilter)  
**Since**: UDA 3.4.0 // Table 1.0.0  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones del componente |

