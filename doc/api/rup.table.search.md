<a name="module_rup_table/search"></a>

## rup_table/search
Permite al usuario realizar una búsqueda entre el conjunto de resultados que se le muestran. Mediante una serie de criterios de búsqueda permite al usuario posicionarse entre los diferentes registros que se ajustan a dichos criterios.

**Summary**: Plugin de búsqueda del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({	url: "../jqGridUsuario",	usePlugins:["search"],       	search:{       		// Propiedades de configuración del plugin search       	}});
```

* [rup_table/search](#module_rup_table/search)
    * [~createSearchRow](#module_rup_table/search..createSearchRow)
    * [~navigateToMatchedRow](#module_rup_table/search..navigateToMatchedRow)
    * [~search](#module_rup_table/search..search)
    * [~goToFirstMatched](#module_rup_table/search..goToFirstMatched)
    * [~clearSearch](#module_rup_table/search..clearSearch)
    * [~clearHighlightedMatchedRows](#module_rup_table/search..clearHighlightedMatchedRows)
    * [~highlightMatchedRowsInPage](#module_rup_table/search..highlightMatchedRowsInPage)
    * [~highlightMatchedRow](#module_rup_table/search..highlightMatchedRow)
    * [~updateSearchPagination](#module_rup_table/search..updateSearchPagination)
    * [~getSearchCurrentRowCount](#module_rup_table/search..getSearchCurrentRowCount)
    * [~options](#module_rup_table/search..options)
    * [~preConfigureSearch(settings)](#module_rup_table/search..preConfigureSearch)
    * [~postConfigureSearch(settings)](#module_rup_table/search..postConfigureSearch)
    * [~toggleSearchForm()](#module_rup_table/search..toggleSearchForm)
    * [~createSearchToolbar()](#module_rup_table/search..createSearchToolbar)

<a name="module_rup_table/search..createSearchRow"></a>

### rup_table/search~createSearchRow
Genera la línea de busqueda de acuerdo a las propiedades de configuración especificadas.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Opciones de configuración indicadas en la incialización del componente |

**Example**  
```js
$("#idComponente").rup_table("createSearchRow", settings);
```
<a name="module_rup_table/search..navigateToMatchedRow"></a>

### rup_table/search~navigateToMatchedRow
Navega hasta el elemento indicado que se ajusta a los criterios de búsqueda indicados.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| matchedRow | <code>number</code> | Línea a la cual se quiere navegar. |

**Example**  
```js
$("#idComponente").rup_table("navigateToMatchedRow", matchedRow);
```
<a name="module_rup_table/search..search"></a>

### rup_table/search~search
Lanza la operación de búsqueda.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("search");
```
<a name="module_rup_table/search..goToFirstMatched"></a>

### rup_table/search~goToFirstMatched
Navega hasta el primer elemento que se ajusta a los criterios de búsqueda. En caso de no existir elementos adecuados en la página actual se navega hasta el primer elemento.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| paramPage | <code>number</code> | En caso de indicarse una página se utilizará en vez de la página actual. |

**Example**  
```js
$("#idComponente").rup_table("goToFirstMatched");
```
<a name="module_rup_table/search..clearSearch"></a>

### rup_table/search~clearSearch
Limpia los criterios de búsqueda introducidos por el usuario.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("cleanSearch");
```
<a name="module_rup_table/search..clearHighlightedMatchedRows"></a>

### rup_table/search~clearHighlightedMatchedRows
Elimina el resaltado de los registros que se ajustan a los criterios de busqueda.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("clearHighlightedMatchedRows");
```
<a name="module_rup_table/search..highlightMatchedRowsInPage"></a>

### rup_table/search~highlightMatchedRowsInPage
Resalta los registros que se ajustan a los criterios de búsqueda.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("highlightMatchedRowsInPage");
```
<a name="module_rup_table/search..highlightMatchedRow"></a>

### rup_table/search~highlightMatchedRow
Resalta como ocurrencia de la búsqueda la línea especificada.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| $row | <code>object</code> | Objeto jQuery que referencia la línea de la tabla que se quiere resaltar. |

**Example**  
```js
$("#idComponente").rup_table("highlightMatchedRow", $("#idRow"));
```
<a name="module_rup_table/search..updateSearchPagination"></a>

### rup_table/search~updateSearchPagination
Actualiza los valores de la navegación entre registros.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| paramRowId | <code>number</code> | Numero de fila $("#idComponente").rup_table("updateSearchPagination"); |

<a name="module_rup_table/search..getSearchCurrentRowCount"></a>

### rup_table/search~getSearchCurrentRowCount
Devuelve, para una linea determinada, la posición en que se encuentra dentro del total de registros que se ajustan a los criterios de búsqueda

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| selectedRowId | <code>string</code> | Identificador del registro. |

**Example**  
```js
$("#idComponente").rup_table("getSearchCurrentRowCount", "05");
```
<a name="module_rup_table/search..options"></a>

### rup_table/search~options
Parámetros de configuración para el plugin search.

**Kind**: inner property of <code>[rup_table/search](#module_rup_table/search)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| validate | <code>object</code> | Mediante esta propiedad es posible especificar reglas de validación que se especifican en la guía de uso del componente RUP validation. |

<a name="module_rup_table/search..preConfigureSearch"></a>

### rup_table/search~preConfigureSearch(settings)
Metodo que realiza la pre-configuración del plugin search del componente RUP Table.Este método se ejecuta antes de la incialización del plugin.

**Kind**: inner method of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/search..postConfigureSearch"></a>

### rup_table/search~postConfigureSearch(settings)
Método que define la postconfiguración necesaria para el correcto funcionamiento del componente.

**Kind**: inner method of <code>[rup_table/search](#module_rup_table/search)</code>  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/search..toggleSearchForm"></a>

### rup_table/search~toggleSearchForm()
Muestra/Oculta el formulario de búsqueda.

**Kind**: inner method of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("toggleSearchForm");
```
<a name="module_rup_table/search..createSearchToolbar"></a>

### rup_table/search~createSearchToolbar()
Genera la barra de controles para gestionar la búsqueda.

**Kind**: inner method of <code>[rup_table/search](#module_rup_table/search)</code>  
**Example**  
```js
$("#idComponente").rup_table("createSearchToolbar");
```
