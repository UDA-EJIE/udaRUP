<a name="module_rup_list"></a>

## rup\_list
Presenta los elementos que presenta una tabla rup_table en formato listado. Pensado para movilidad.

**Summary**: Componente RUP List.  
**Example**  
```js
$('#rup-list').rup_list({     action: '/demo/list/filter',     filterForm: 'listFilterForm',     feedback: 'rup-list-feedback',     visiblePages: 3,     key: 'codigoPK',     selectable: {         multi: true,         selector: '.list-item'     },     sidx: {         source: [{             value: 'USUARIO',             i18nCaption: 'Usuario'         }, {             value: 'EDAD',             i18nCaption: 'Edad'         }, {             value: 'CODCLIENTE',             i18nCaption: 'Codigo cliente'         }],         value: 'EDAD,USUARIO'     },     rowNum: {         source: [{             value: '5',             i18nCaption: 'Cinco'         }, {             value: '10',             i18nCaption: 'Diez'         }, {             value: '20',             i18nCaption: 'Veinte'         }],         value: '5'     },     isMultiSort: true,     modElement: (ev, item, json) => {         var userVal = item.find('#usuario_value_' + json.codigoPK);         userVal.text(userVal.text() + ' -Added');     },     load: () => {}});
```

* [rup_list](#module_rup_list)
    * [~defaults](#module_rup_list..defaults)
    * [~defaultsRowNum](#module_rup_list..defaultsRowNum)
    * [~defaultsSidx](#module_rup_list..defaultsSidx)
    * [~defaultsSelectable](#module_rup_list..defaultsSelectable)
    * [~defaultsEvents](#module_rup_list..defaultsEvents)
    * [~_changeOption(key, value)](#module_rup_list.._changeOption)
    * [~_validateSkeleton()](#module_rup_list.._validateSkeleton)
    * [~_create()](#module_rup_list.._create)
    * [~_scrollListInit()](#module_rup_list.._scrollListInit)
    * [~_sordButtonInit()](#module_rup_list.._sordButtonInit)
    * [~_sidxComboInit()](#module_rup_list.._sidxComboInit)
    * [~_multisortInit()](#module_rup_list.._multisortInit)
    * [~_rownumInit()](#module_rup_list.._rownumInit)
    * [~_pagenavInit()](#module_rup_list.._pagenavInit)
    * [~_actualizarOrdenMulti(e, self, ord)](#module_rup_list.._actualizarOrdenMulti)
    * [~_fnOrderOfOrderFields(ctx, line)](#module_rup_list.._fnOrderOfOrderFields)
    * [~_selectAll()](#module_rup_list.._selectAll)
    * [~_deselectAll()](#module_rup_list.._deselectAll)
    * [~_selectPage()](#module_rup_list.._selectPage)
    * [~_deselectPage()](#module_rup_list.._deselectPage)
    * [~_generateSelectablesBtnGroup()](#module_rup_list.._generateSelectablesBtnGroup)
    * [~_getPageIds()](#module_rup_list.._getPageIds)
    * [~_pagenavManagement(numPages)](#module_rup_list.._pagenavManagement)
    * [~_lock()](#module_rup_list.._lock)
    * [~_unlock()](#module_rup_list.._unlock)
    * [~destroy()](#module_rup_list..destroy)
    * [~_doFilter()](#module_rup_list.._doFilter)
    * [~reload()](#module_rup_list..reload)
    * [~filter()](#module_rup_list..filter)
    * [~page(page)](#module_rup_list..page)
    * [~getSelectedIds()](#module_rup_list..getSelectedIds)

<a name="module_rup_list..defaults"></a>

### rup_list~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup\_list</code>](#module_rup_list)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [action] | <code>String</code> | <code></code> | Determina la url contra la que se hacen las llamadas del listado. |
| [filterForm] | <code>String</code> | <code></code> | Determina el selector del formulario de filtrado del listado. |
| [feedback] | <code>String</code> | <code></code> | Determina el selector del feedback. |
| [visiblePages] | <code>Number</code> | <code>5</code> | Determina el número de páginas que serán visibles desde la paginación (mínimo 3). |
| [key] | <code>String</code> | <code></code> | Determina el identificador de cada tarjeta que vendrá especificado en el JSON. |
| [rowNum] | <code>Object</code> | <code>Object</code> | Determina la configuracion de la seleccion de elementos por página. |
| [sidx] | <code>Object</code> | <code>Object</code> | Determina los campos por los que se podrán ordenar los elementos |
| [sord] | <code>String</code> | <code></code> | Determina la dirección de la ordenación |
| [page] | <code>Number</code> | <code>1</code> | Determina página en la que se inicia por defecto |
| [createFooter] | <code>boolean</code> | <code>true</code> | Si es true crea una copia del header en la parte inferior del listado |
| [sord] | <code>String</code> | <code></code> | Determina la dirección de la ordenación |
| [modElement] | <code>Funcion</code> | <code>() &#x3D;&gt;{}</code> | Callback que se ejecuta antes del añadido de cada tarjeta al listado |
| [load] | <code>Funcion</code> | <code>() &#x3D;&gt; {}</code> | Callback que se ejecuta tras cada filtrado |
| [selectable] | <code>Object</code> | <code>Object</code> | Determina la configuración de la selección |
| [isMultiSort] | <code>boolean</code> | <code>false</code> | Si es true el modo de ordenación cambia a multiordenación |
| [isScrollList] | <code>boolean</code> | <code>false</code> | Si es true quita la paginación a favor de una carga dinámica de las tarjetas |

<a name="module_rup_list..defaultsRowNum"></a>

### rup_list~defaultsRowNum
Opciones por defecto de configuración de rowNum

**Kind**: inner property of [<code>rup\_list</code>](#module_rup_list)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [sorce] | <code>Array</code> | <code>Array</code> | Es un array de objetos con las propiedades value e i18nCaption que serán los elementos disponibles para la seleccion de los elementos por página |
| [value] | <code>String</code> | <code>5</code> | Valor del source por defecto |

<a name="module_rup_list..defaultsSidx"></a>

### rup_list~defaultsSidx
Opciones por defecto de configuración de sidx

**Kind**: inner property of [<code>rup\_list</code>](#module_rup_list)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [sorce] | <code>Array</code> | <code>Array</code> | Es un array de objetos con las propiedades value e i18nCaption que serán los elementos disponibles para la seleccion de la ordenacion. |
| [value] | <code>String</code> | <code>5</code> | Valor del source por defecto. En caso de ser multiOrdenacion se pueden añadir campos separados por comas |

<a name="module_rup_list..defaultsSelectable"></a>

### rup_list~defaultsSelectable
Opciones por defecto de configuración de selectable

**Kind**: inner property of [<code>rup\_list</code>](#module_rup_list)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [multi] | <code>boolean</code> | <code></code> | Si es true será de selección múltiple, de ser false será de seleccion simple. |
| [value] | <code>selector</code> | <code></code> | Selctor JQuery sobre el que se deberá hacer click para seleccionar o deseleccionar elementos. |

<a name="module_rup_list..defaultsEvents"></a>

### rup_list~defaultsEvents
Eventos lanzados sobre rup-list

**Kind**: inner property of [<code>rup\_list</code>](#module_rup_list)  
**Properties**

| Name | Description |
| --- | --- |
| [initComplete] | Se lanza una vez el componente ha sido inicializado. |
| [listAfterMultiselection] | Se lanza tras finalizar operaciones de multiseleccion desde el desplegable. |
| [rup_list-mord-inited] | Se lanza una vez se ha inicializado la característica de multiorder |
| [rup_list-mord-changed] | Se lanza cuando se vería la multiordenación |

<a name="module_rup_list.._changeOption"></a>

### rup_list~\_changeOption(key, value)
Método interno para cambiar el valor de algunas opciones

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| value | <code>\*</code> | 

<a name="module_rup_list.._validateSkeleton"></a>

### rup_list~\_validateSkeleton()
Método interno que valida que el esqueleto html es válido para el componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._create"></a>

### rup_list~\_create()
Método interno que configura el componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._scrollListInit"></a>

### rup_list~\_scrollListInit()
Método interno que crea el scrollList

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._sordButtonInit"></a>

### rup_list~\_sordButtonInit()
Método interno que configura el boton de alternar el sord en la ordenación simple

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._sidxComboInit"></a>

### rup_list~\_sidxComboInit()
Método interno que configura el combo de seleccion de sidx en la ordenación simple

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._multisortInit"></a>

### rup_list~\_multisortInit()
Método interno que configura los elementos de la multiordenación.

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._rownumInit"></a>

### rup_list~\_rownumInit()
Método interno que configura el combo de elementos de lista por página

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._pagenavInit"></a>

### rup_list~\_pagenavInit()
Método interno que configura el nav de la paginación

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._actualizarOrdenMulti"></a>

### rup_list~\_actualizarOrdenMulti(e, self, ord)
Método interno que crea la estructura de las líneas en la multiordenación

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> |  |
| self | <code>JQueryObj</code> | Objeto JQuery del botón |
| ord | <code>String</code> | Direccion de la ordenación con la que se va a generar la línea |

<a name="module_rup_list.._fnOrderOfOrderFields"></a>

### rup_list~\_fnOrderOfOrderFields(ctx, line)
Método interno que da funcionalidad a cada línea en la multiordenación

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>JQuery</code> | La instancia de rup_list |
| line | <code>JQuery</code> | Objeto JQuery de la línea a la que se va a dar funcionalidad |

<a name="module_rup_list.._selectAll"></a>

### rup_list~\_selectAll()
Método interno para seleccionar todos los elementos de la lista.

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._deselectAll"></a>

### rup_list~\_deselectAll()
Método interno para deseleccionar todos los elementos de la lista

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._selectPage"></a>

### rup_list~\_selectPage()
Método interno para seleccionar todos los elementos en la página actual

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._deselectPage"></a>

### rup_list~\_deselectPage()
Método interno para deseleccionar todos los elementos en la página actual

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._generateSelectablesBtnGroup"></a>

### rup_list~\_generateSelectablesBtnGroup()
Método interno que genera el desplegable de multiseleccion

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._getPageIds"></a>

### rup_list~\_getPageIds()
Método interno para obtener los Ids de la página actual

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._pagenavManagement"></a>

### rup_list~\_pagenavManagement(numPages)
Método interno que otorga funcionalidad a la paginación

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  

| Param | Type | Description |
| --- | --- | --- |
| numPages | <code>Number</code> | Número total de páginas |

<a name="module_rup_list.._lock"></a>

### rup_list~\_lock()
Método interno que se encarga del bloqueo del componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list.._unlock"></a>

### rup_list~\_unlock()
Método interno que se encarga del desbloqueo del componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list..destroy"></a>

### rup_list~destroy()
Método para destruir el componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Example**  
```js
$('#rup-list').rup_list('destroy');
```
<a name="module_rup_list.._doFilter"></a>

### rup_list~\_doFilter()
Método interno que se encarga de realizar el filtrado y construir la lista desde los datos recibidos

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
<a name="module_rup_list..reload"></a>

### rup_list~reload()
Método que se encarga de realizar una recarga de la lista

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Example**  
```js
$('#rup-list').rup_list('reload');
```
<a name="module_rup_list..filter"></a>

### rup_list~filter()
Método que se encarga de realizar el filtrado de la lista

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Example**  
```js
$('#rup-list').rup_list('filter');
```
<a name="module_rup_list..page"></a>

### rup_list~page(page)
Método para cambiar la página actual.

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  

| Param | Type | Description |
| --- | --- | --- |
| page | <code>Number</code> | La página a la que navegar |

**Example**  
```js
$('#rup-list').rup_list('page', 3);
```
<a name="module_rup_list..getSelectedIds"></a>

### rup_list~getSelectedIds()
Método que obtiene la información de la selección actual

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Example**  
```js
$('#rup-list').rup_list('getSelectedIds');
```
