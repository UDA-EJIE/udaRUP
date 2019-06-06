<a name="module_rup_jqtable/filter"></a>

## rup\_jqtable/filter
Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente.

**Summary**: Plugin de filtrado del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["filter"],	filter:{		// Propiedades de configuración del plugin filter	}});
```

* [rup_jqtable/filter](#module_rup_jqtable/filter)
    * [~options](#module_rup_jqtable/filter..options)
    * [~preConfigureFilter(settings)](#module_rup_jqtable/filter..preConfigureFilter)
    * [~postConfigureFilter(settings)](#module_rup_jqtable/filter..postConfigureFilter)
    * [~cleanFilterForm()](#module_rup_jqtable/filter..cleanFilterForm)
    * [~filter()](#module_rup_jqtable/filter..filter)
    * [~getFilterParams()](#module_rup_jqtable/filter..getFilterParams)
    * [~hideFilterForm()](#module_rup_jqtable/filter..hideFilterForm)
    * [~showFilterForm()](#module_rup_jqtable/filter..showFilterForm)
    * [~toggleFilterForm()](#module_rup_jqtable/filter..toggleFilterForm)
    * [~showSearchCriteria()](#module_rup_jqtable/filter..showSearchCriteria)

<a name="module_rup_jqtable/filter..options"></a>

### rup_jqtable/filter~options
Propiedades de configuración del plugin filter del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [showHidden] | <code>boolean</code> | <code>false</code> | Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no. |
| [url] | <code>string</code> | <code>null</code> | Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /filter). |
| [transitionConfig] | <code>object</code> |  | Configuración del efecto de la animación de mostrar/ocultar el formulario defiltrado. |
| [fncSearchCriteria] | <code>function</code> |  | Permite especificar una función de callback en la cual es posible modificar la cadena de texto con la que se muestra el resumen de los parámetros de filtrado. |

<a name="module_rup_jqtable/filter..preConfigureFilter"></a>

### rup_jqtable/filter~preConfigureFilter(settings)
Metodo que realiza la pre-configuración del plugin filter del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/filter..postConfigureFilter"></a>

### rup_jqtable/filter~postConfigureFilter(settings)
Metodo que realiza la post-configuración del plugin filter del componente RUP Table.Este método se ejecuta después de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/filter..cleanFilterForm"></a>

### rup_jqtable/filter~cleanFilterForm()
Limpia los campos del formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Emits**: [<code>rupTable\_filter\_beforeCleanFilterForm</code>](#module_rup_jqtable+event_rupTable_filter_beforeCleanFilterForm), [<code>rupTable\_filter\_afterCleanFilterForm</code>](#module_rup_jqtable+event_rupTable_filter_afterCleanFilterForm)  
**Example**  
```js
$("#idComponente").rup_jqtable("cleanFilterForm");
```
<a name="module_rup_jqtable/filter..filter"></a>

### rup_jqtable/filter~filter()
Realiza el filtrado de acuerdo a los datos existentes en el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Emits**: [<code>rupTable\_beforeFilter</code>](#module_rup_jqtable+event_rupTable_beforeFilter)  
**Example**  
```js
$("#idComponente").rup_jqtable("filter");
```
<a name="module_rup_jqtable/filter..getFilterParams"></a>

### rup_jqtable/filter~getFilterParams()
Devuelve los parámetros de filtrado empleados en el filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("getFilterParams");
```
<a name="module_rup_jqtable/filter..hideFilterForm"></a>

### rup_jqtable/filter~hideFilterForm()
Oculta el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("hideFilterForm");
```
<a name="module_rup_jqtable/filter..showFilterForm"></a>

### rup_jqtable/filter~showFilterForm()
Muestra el formulario de filtrado.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("showFilterForm");
```
<a name="module_rup_jqtable/filter..toggleFilterForm"></a>

### rup_jqtable/filter~toggleFilterForm()
Alterna el estado del formulario de filtrado entre visible y oculto.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("toggleFilterForm");
```
<a name="module_rup_jqtable/filter..showSearchCriteria"></a>

### rup_jqtable/filter~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario.

**Kind**: inner method of [<code>rup\_jqtable/filter</code>](#module_rup_jqtable/filter)  
**Example**  
```js
$("#idComponente").rup_jqtable("showSearchCriteria");
```
