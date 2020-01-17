<a name="module_rup_jqtable/search"></a>

## rup\_jqtable/search
Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.

**Summary**: Plugin de search del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_jqtable({	url: "../jqGridUsuario",	usePlugins:["search"],	search:{		// Propiedades de configuración del plugin search	}});
```

* [rup_jqtable/search](#module_rup_jqtable/search)
    * [~options](#module_rup_jqtable/search..options)
    * [~preConfigureSearch(settings)](#module_rup_jqtable/search..preConfigureSearch)
    * [~postConfigureSearch(settings)](#module_rup_jqtable/search..postConfigureSearch)
    * [~toggleSearchForm()](#module_rup_jqtable/search..toggleSearchForm)
    * [~createSearchToolbar()](#module_rup_jqtable/search..createSearchToolbar)
    * [~createSearchRow(settings)](#module_rup_jqtable/search..createSearchRow)
    * [~navigateToMatchedRow(matchedRow)](#module_rup_jqtable/search..navigateToMatchedRow)
    * [~search()](#module_rup_jqtable/search..search)
    * [~navigateToMatchedRow()](#module_rup_jqtable/search..navigateToMatchedRow)
    * [~goToFirstMatched(paramPage)](#module_rup_jqtable/search..goToFirstMatched)
    * [~fncGetSearchNavigationParams(buttonType)](#module_rup_jqtable/search..fncGetSearchNavigationParams) ⇒ <code>object</code>
    * [~fncGetSearchNavigationParams(arrParams)](#module_rup_jqtable/search..fncGetSearchNavigationParams)
    * [~clearSearch()](#module_rup_jqtable/search..clearSearch)
    * [~clearHighlightedMatchedRows()](#module_rup_jqtable/search..clearHighlightedMatchedRows)
    * [~highlightMatchedRowsInPage(page)](#module_rup_jqtable/search..highlightMatchedRowsInPage)
    * [~highlightMatchedRow($row)](#module_rup_jqtable/search..highlightMatchedRow)
    * [~updateSearchPagination(paramRowId)](#module_rup_jqtable/search..updateSearchPagination)
    * [~getSearchCurrentRowCount(selectedRowId)](#module_rup_jqtable/search..getSearchCurrentRowCount)

<a name="module_rup_jqtable/search..options"></a>

### rup_jqtable/search~options
Propiedades de configuración del plugin search del componente RUP Table.

**Kind**: inner property of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> | <code>null</code> | Url que se va a utilizar para realizar las peticiones de filtrado de la tabla. En caso de no especificarse una concreta, se utilizará por defecto una construida a partir de la url base. (urlBase + /search). |
| [validate] | <code>object</code> |  | Mediante esta propiedad es posible especificar reglas de validación que se especifican en la guía de uso del componente RUP validation. |

<a name="module_rup_jqtable/search..preConfigureSearch"></a>

### rup_jqtable/search~preConfigureSearch(settings)
Metodo que realiza la pre-configuración del plugin search del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/search..postConfigureSearch"></a>

### rup_jqtable/search~postConfigureSearch(settings)
Metodo que realiza la post-configuración del plugin search del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_jqtable/search..toggleSearchForm"></a>

### rup_jqtable/search~toggleSearchForm()
Muestra/Oculta el formulario de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("toggleSearchForm");
```
<a name="module_rup_jqtable/search..createSearchToolbar"></a>

### rup_jqtable/search~createSearchToolbar()
Genera la barra de controles para gestionar la búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: <code>module:rup\_jqtable#event:rupTable\_searchAfterCreateToolbar</code>  
**Example**  
```js
$("#idTable").rup_jqtable("createSearchToolbar");
```
<a name="module_rup_jqtable/search..createSearchRow"></a>

### rup_jqtable/search~createSearchRow(settings)
Genera la barra de controles para gestionar la búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas. |

**Example**  
```js
$("#idTable").rup_jqtable("createSearchRow", settings);
```
<a name="module_rup_jqtable/search..navigateToMatchedRow"></a>

### rup_jqtable/search~navigateToMatchedRow(matchedRow)
Navega hasta el elemento indicado que se ajusta a los criterios de búsqueda indicados.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| matchedRow | <code>string</code> | Identificador de la línea a la cual se quiere navegar. |

**Example**  
```js
$("#idTable").rup_jqtable("navigateToMatchedRow", matchedRow);
```
<a name="module_rup_jqtable/search..search"></a>

### rup_jqtable/search~search()
Lanza la operación de búsqueda además del evento previo.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: <code>module:rup\_jqtable#event:rupTable\_beforeSearch</code>  
**Example**  
```js
$("#idTable").rup_jqtable("search");
```
<a name="module_rup_jqtable/search..navigateToMatchedRow"></a>

### rup_jqtable/search~navigateToMatchedRow()
Lanza la operación de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Emits**: <code>module:rup\_jqtable#rupTable\_searchBeforeSubmit.rupTable.event:masterDetail</code>  
**Example**  
```js
$("#idTable").rup_jqtable("doSearch");
```
<a name="module_rup_jqtable/search..goToFirstMatched"></a>

### rup_jqtable/search~goToFirstMatched(paramPage)
Navega hasta el primer elemento que se ajusta a los criterios de búsqueda. En caso de no existir elementos adecuados en la página actual se navega hasta el primer elemento.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| paramPage | <code>paramPage</code> | En caso de indicarse una página se utilizará en vez de la página actual. |

**Example**  
```js
$("#idTable").rup_jqtable("goToFirstMatched", paramPage);
```
<a name="module_rup_jqtable/search..fncGetSearchNavigationParams"></a>

### rup_jqtable/search~fncGetSearchNavigationParams(buttonType) ⇒ <code>object</code>
Devuelve los parámetros correspondientes al tipo de enlace de navegación indicado por parámetro.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Returns**: <code>object</code> - - Parametros de configuración asociados al tipo de enlace.  

| Param | Type | Description |
| --- | --- | --- |
| buttonType | <code>paramPage</code> | Tipo de parámetro first, prev, next o last.- |

**Example**  
```js
$("#idTable").rup_jqtable("fncGetSearchNavigationParams", buttonType);
```
<a name="module_rup_jqtable/search..fncGetSearchNavigationParams"></a>

### rup_jqtable/search~fncGetSearchNavigationParams(arrParams)
Realiza la navegación entre los elementos que se ajustan a los criterios de bús

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| arrParams | <code>Array.&lt;object&gt;</code> | Array de parámetros que determinan la navegación. |

**Example**  
```js
$("#idTable").rup_jqtable("doSearchNavigation", arrParams);
```
<a name="module_rup_jqtable/search..clearSearch"></a>

### rup_jqtable/search~clearSearch()
Limpia los criterios de búsqueda introducidos por el usuario.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("clearSearch");
```
<a name="module_rup_jqtable/search..clearHighlightedMatchedRows"></a>

### rup_jqtable/search~clearHighlightedMatchedRows()
Elimina el resaltado de los registros que se ajustan a los criterios de busqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  
**Example**  
```js
$("#idTable").rup_jqtable("clearHighlightedMatchedRows");
```
<a name="module_rup_jqtable/search..highlightMatchedRowsInPage"></a>

### rup_jqtable/search~highlightMatchedRowsInPage(page)
Resalta los registros que se ajustan a los criterios de búsqueda.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>string</code> | Identificador de la página en la que se desean resaltar los registos. |

**Example**  
```js
$("#idTable").rup_jqtable("highlightMatchedRowsInPage", page);
```
<a name="module_rup_jqtable/search..highlightMatchedRow"></a>

### rup_jqtable/search~highlightMatchedRow($row)
Resalta como ocurrencia de la búsqueda la línea especificada.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>string</code> | Objeto jQuery que referencia la línea de la tabla que se quiere resaltar. |

**Example**  
```js
$("#idTable").rup_jqtable("highlightMatchedRow", $("#idRow"));
```
<a name="module_rup_jqtable/search..updateSearchPagination"></a>

### rup_jqtable/search~updateSearchPagination(paramRowId)
Actualiza los valores de la navegación entre registros.

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| paramRowId | <code>string</code> | Identificador de la página. |

**Example**  
```js
$("#idTable").rup_jqtable("updateSearchPagination", paramRowId);
```
<a name="module_rup_jqtable/search..getSearchCurrentRowCount"></a>

### rup_jqtable/search~getSearchCurrentRowCount(selectedRowId)
Devuelve, para una linea determinada, la posición en que se encuentra dentro del total de registros que se ajustan a los criterios de búsqueda

**Kind**: inner method of [<code>rup\_jqtable/search</code>](#module_rup_jqtable/search)  

| Param | Type | Description |
| --- | --- | --- |
| selectedRowId | <code>string</code> | Identificador del registro. |

**Example**  
```js
$("#idTable").rup_jqtable("getSearchCurrentRowCount", "05");
```
