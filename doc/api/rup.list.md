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
    * [~destroy()](#module_rup_list..destroy)
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

<a name="module_rup_list..destroy"></a>

### rup_list~destroy()
Método para destruir el componente

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Access**: public  
**Example**  
```js
$('#rup-list').rup_list('destroy');
```
<a name="module_rup_list..reload"></a>

### rup_list~reload()
Método que se encarga de realizar una recarga de la lista

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Access**: public  
**Example**  
```js
$('#rup-list').rup_list('reload');
```
<a name="module_rup_list..filter"></a>

### rup_list~filter()
Método que se encarga de realizar el filtrado de la lista

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Access**: public  
**Example**  
```js
$('#rup-list').rup_list('filter');
```
<a name="module_rup_list..page"></a>

### rup_list~page(page)
Método para cambiar la página actual.

**Kind**: inner method of [<code>rup\_list</code>](#module_rup_list)  
**Access**: public  

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
**Access**: public  
**Example**  
```js
$('#rup-list').rup_list('getSelectedIds');
```
