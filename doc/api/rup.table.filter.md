<a name="module_rup_table/filter"></a>

## rup_table/filter
Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.

**Summary**: Plugin de filtrado del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["filter"],	filter:{		// Propiedades de configuración del plugin filter	}});
```

* [rup_table/filter](#module_rup_table/filter)
    * [~options](#module_rup_table/filter..options)
    * [~preConfigureFilter(settings)](#module_rup_table/filter..preConfigureFilter)
    * [~postConfigureFilter(settings)](#module_rup_table/filter..postConfigureFilter)
    * [~cleanFilterForm()](#module_rup_table/filter..cleanFilterForm)
    * [~filter()](#module_rup_table/filter..filter)
    * [~getFilterParams()](#module_rup_table/filter..getFilterParams)
    * [~hideFilterForm()](#module_rup_table/filter..hideFilterForm)
    * [~showFilterForm()](#module_rup_table/filter..showFilterForm)
    * [~toggleFilterForm()](#module_rup_table/filter..toggleFilterForm)
    * [~showSearchCriteria()](#module_rup_table/filter..showSearchCriteria)

<a name="module_rup_table/filter..options"></a>

### rup_table/filter~options
Propiedades de configuración del plugin filter del componente RUP Table.

**Kind**: inner property of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showHidden] | <code>boolean</code> | <code>false</code> | Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no. |
| [url] | <code>string</code> | <code>null</code> | Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /filter). |
| [transitionConfig] | <code>object</code> |  | Configuración del efecto de la animación de mostrar/ocultar el formulario defiltrado. |
| [fncSearchCriteria] | <code>function</code> |  | Permite especificar una función de callback en la cual es posible modificar la cadena de texto con la que se muestra el resumen de los parámetros de filtrado. |

<a name="module_rup_table/filter..preConfigureFilter"></a>

### rup_table/filter~preConfigureFilter(settings)
Metodo que realiza la pre-configuración del plugin filter del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/filter..postConfigureFilter"></a>

### rup_table/filter~postConfigureFilter(settings)
Metodo que realiza la post-configuración del plugin filter del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/filter..cleanFilterForm"></a>

### rup_table/filter~cleanFilterForm()
Limpia los campos del formulario de filtrado.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Emits**: [<code>rupTable_filter_beforeCleanFilterForm</code>](#module_rup_table+event_rupTable_filter_beforeCleanFilterForm), [<code>rupTable_filter_afterCleanFilterForm</code>](#module_rup_table+event_rupTable_filter_afterCleanFilterForm)  
**Example**  
```js
$("#idComponente").rup_table("cleanFilterForm");
```
<a name="module_rup_table/filter..filter"></a>

### rup_table/filter~filter()
Realiza el filtrado de acuerdo a los datos existentes en el formulario de filtrado.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Emits**: [<code>rupTable_beforeFilter</code>](#module_rup_table+event_rupTable_beforeFilter)  
**Example**  
```js
$("#idComponente").rup_table("filter");
```
<a name="module_rup_table/filter..getFilterParams"></a>

### rup_table/filter~getFilterParams()
Devuelve los parámetros de filtrado empleados en el filtrado.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Example**  
```js
$("#idComponente").rup_table("getFilterParams");
```
<a name="module_rup_table/filter..hideFilterForm"></a>

### rup_table/filter~hideFilterForm()
Oculta el formulario de filtrado.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Example**  
```js
$("#idComponente").rup_table("hideFilterForm");
```
<a name="module_rup_table/filter..showFilterForm"></a>

### rup_table/filter~showFilterForm()
Muestra el formulario de filtrado.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Example**  
```js
$("#idComponente").rup_table("showFilterForm");
```
<a name="module_rup_table/filter..toggleFilterForm"></a>

### rup_table/filter~toggleFilterForm()
Alterna el estado del formulario de filtrado entre visible y oculto.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Example**  
```js
$("#idComponente").rup_table("toggleFilterForm");
```
<a name="module_rup_table/filter..showSearchCriteria"></a>

### rup_table/filter~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.

**Kind**: inner method of [<code>rup_table/filter</code>](#module_rup_table/filter)  
**Example**  
```js
$("#idComponente").rup_table("showSearchCriteria");
```
