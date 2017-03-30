<a name="module_rup_table/filter"></a>

## rup_table/filter
Gestiona las operaciones de filtrado de datos sobre el origen de datos que utiliza el componente

**Summary**: Plugin de filtro del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["filter"],       	filter:{       		// Propiedades de configuración del plugin filter       	}});
```

* [rup_table/filter](#module_rup_table/filter)
    * _instance_
        * ["rupTable_beforeFilter"](#module_rup_table/filter+event_rupTable_beforeFilter)
        * ["rupTable_filter_beforeClean"](#module_rup_table/filter+event_rupTable_filter_beforeClean)
    * _inner_
        * [~options](#module_rup_table/filter..options)
        * [~preConfigureFilter(settings)](#module_rup_table/filter..preConfigureFilter)
        * [~postConfigureFilter(settings)](#module_rup_table/filter..postConfigureFilter)
        * [~cleanFilterForm()](#module_rup_table/filter..cleanFilterForm)
        * [~filter(async)](#module_rup_table/filter..filter)
        * [~getFilterParams()](#module_rup_table/filter..getFilterParams)
        * [~hideFilterForm()](#module_rup_table/filter..hideFilterForm)
        * [~showFilterForm()](#module_rup_table/filter..showFilterForm)
        * [~toggleFilterForm()](#module_rup_table/filter..toggleFilterForm)
        * [~showSearchCriteria()](#module_rup_table/filter..showSearchCriteria)

<a name="module_rup_table/filter+event_rupTable_beforeFilter"></a>

### "rupTable_beforeFilter"
Este evento se desencadena antes de producirse la petición de filtrado

**Kind**: event emitted by <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeFilter", function(){   });
```
<a name="module_rup_table/filter+event_rupTable_filter_beforeClean"></a>

### "rupTable_filter_beforeClean"
El botón de limpiar el formulario, limpia y filtra el formulario. Este evento se lanza después de limpiar el formulario del filtro pero antes de filtrar con el formulario limpio.

**Kind**: event emitted by <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idComponente").on("rupTable_beforeClean", function(){   });
```
<a name="module_rup_table/filter..options"></a>

### rup_table/filter~options
Parámetros de configuración para el plugin filter.

**Kind**: inner property of <code>[rup_table/filter](#module_rup_table/filter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [showHidden] | <code>boolean</code> | Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no |
| url | <code>string</code> | Determina si el formulario de filtrado se debe de mostrar inicialmente oculto o no |
| transitionConfig | <code>object</code> | Configuración del efecto de la animación de mostrar/ocultar el formulario de filtrado. |
| fncSearchCriteria | <code>function</code> | Permite especificar una función de callback en la cual es posible modificar la cadena de texto con la que se muestra el resumen de los parámetros de filtrado. |
| excludeSummary | <code>array</code> | Permite excluir del resumen del filtro los campos especificados. Se debe usar el name del elemento a evitar |

<a name="module_rup_table/filter..preConfigureFilter"></a>

### rup_table/filter~preConfigureFilter(settings)
Metodo que realiza la pre-configuración del plugin filter del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/filter..postConfigureFilter"></a>

### rup_table/filter~postConfigureFilter(settings)
Método que define la preconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Todo**

- [ ] internacionalizar mensajes de error.


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/filter..cleanFilterForm"></a>

### rup_table/filter~cleanFilterForm()
Limpia los campos del formulario de filtrado

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("cleanFilterForm");
```
<a name="module_rup_table/filter..filter"></a>

### rup_table/filter~filter(async)
Realiza el filtrado de acuerdo a los datos existentes en el formulario de filtrado

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  

| Param | Type | Description |
| --- | --- | --- |
| async | <code>boolean</code> | Indica si la llamada debe realizarse en modo asíncrono (true) o síncrono (false). |

**Example**  
```js
$("#idComponente").rup_table("filter");
```
<a name="module_rup_table/filter..getFilterParams"></a>

### rup_table/filter~getFilterParams()
Devuelve los parámetros de filtrado empleados en el filtrado

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("getFilterParams");
```
<a name="module_rup_table/filter..hideFilterForm"></a>

### rup_table/filter~hideFilterForm()
Oculta el formulario de filtrado

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("hideFilterForm");
```
<a name="module_rup_table/filter..showFilterForm"></a>

### rup_table/filter~showFilterForm()
Muestra el formulario de filtrado

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("showFilterForm");
```
<a name="module_rup_table/filter..toggleFilterForm"></a>

### rup_table/filter~toggleFilterForm()
Alterna el estado del formulario de filtrado entre visible y oculto.

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("toggleFilterForm");
```
<a name="module_rup_table/filter..showSearchCriteria"></a>

### rup_table/filter~showSearchCriteria()
Actualiza el resumen de los criterios de filtrado a partir de los valores existentes en el formulario

**Kind**: inner method of <code>[rup_table/filter](#module_rup_table/filter)</code>  
**Example**  
```js
$("#idComponente").rup_table("showSearchCriteria");
```
