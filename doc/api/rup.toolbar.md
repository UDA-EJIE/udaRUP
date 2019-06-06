<a name="module_rup_toolbar"></a>

## rup\_toolbar
Se les presenta a los usuarios una barra de botones con diversas funcionalidades relacionadas a elementos de la página. Gracias a este componente se presentan, ordenan y agrupan las distintas funcionalidades gestionadas por las aplicaciones.

**Summary**: Componente RUP Toolbar.  
**Example**  
```js
var properties = {	width: 1000,	buttons:[		{i18nCaption:"buscar", css:"buscar", click: handlerBoton },      {i18nCaption:"editar", css:"editar", click: handlerMButtons},		{id : "mbuton2", i18nCaption:"ficheros", buttons:[		    {i18nCaption:"DLL", css:"dll", click: handlerMButtons },			{i18nCaption:"DOC", css:"doc", click: handlerMButtons},			{i18nCaption:"EXE", css:"exe", click: handlerMButtons},			{i18nCaption:"GIF", css:"gif", click: handlerMButtons},		]},		{i18nCaption:"filtrar", css:"filtrar", click: handlerMButtons}	]};$("#idToolbar").rup_toolbar(properties);
```

* [rup_toolbar](#module_rup_toolbar)
    * [~options](#module_rup_toolbar..options)
    * [~addButton()](#module_rup_toolbar..addButton)
    * [~addMButton()](#module_rup_toolbar..addMButton)
    * [~addButtonsToMButton()](#module_rup_toolbar..addButtonsToMButton)
    * [~showMButton()](#module_rup_toolbar..showMButton)
    * [~disableButton(id)](#module_rup_toolbar..disableButton)
    * [~enableButton(id)](#module_rup_toolbar..enableButton)
    * [~pressButton(id, css)](#module_rup_toolbar..pressButton)
    * [~unpressButton(id, css)](#module_rup_toolbar..unpressButton)
    * [~tooglePressButton(id, css)](#module_rup_toolbar..tooglePressButton)
    * [~refresh(id)](#module_rup_toolbar..refresh)
    * [~buttonClick](#module_rup_toolbar..buttonClick) : <code>function</code>
    * [~button](#module_rup_toolbar..button) : <code>Object</code>
    * [~mButton](#module_rup_toolbar..mButton) : <code>Object</code>

<a name="module_rup_toolbar..options"></a>

### rup_toolbar~options
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [width] | <code>Integer</code> | <code></code> | Tamaño que tendrá la botonera. Por defecto ocupará toda la página. |
| [buttons] | [<code>Array.&lt;button&gt;</code>](#module_rup_toolbar..button) |  | Array de botones a mostrar. |
| [mbuttons] | [<code>Array.&lt;mButton&gt;</code>](#module_rup_toolbar..mButton) |  | Array de botones con menú a mostrar. |

<a name="module_rup_toolbar..addButton"></a>

### rup_toolbar~addButton()
Añade un nuevo botón a la botonera. Las características del botón se especifican en los parámetros del método.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| obj | [<code>button</code>](#module_rup_toolbar..button) | Objeto que define el botón a añadir. |
| json_i18n | <code>object</code> | Objeto json con los recursos de i18n. |

**Example**  
```js
var button = {  i18nCaption:"editButton",  css:"editar"};$("#idToolbar").rup_date("addButton", button);
```
<a name="module_rup_toolbar..addMButton"></a>

### rup_toolbar~addMButton()
Añade un nuevo menu button a la botonera. Las características del mButton se especifican en los parámetros del método.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| obj | [<code>mButton</code>](#module_rup_toolbar..mButton) | Objeto que define el mButton a añadir. |
| json_i18n | <code>object</code> | Objeto json con los recursos de i18n. |

**Example**  
```js
var mButton = {  id: "mbuton1", i18nCaption:"otros", buttons:[	    {i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},      {i18nCaption:"editar", css:"editar", click: handlerMButtons},      {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons}  ]};$("#idToolbar").rup_date("addMButton", mButton);
```
<a name="module_rup_toolbar..addButtonsToMButton"></a>

### rup_toolbar~addButtonsToMButton()
Se añaden un conjunto de botones a un menu button existente.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| buttons | [<code>Array.&lt;button&gt;</code>](#module_rup_toolbar..button) | Array de botones a añadir al menu button. |
| menuButton | <code>string</code> | Identificador del menu button al que vamos a añadir los botones. |
| json_i18n | <code>object</code> | Objeto json con los recursos de i18n. |

**Example**  
```js
var buttons = [	    {i18nCaption:"nuevo", css:"nuevo", click: handlerMButtons},      {i18nCaption:"editar", css:"editar", click: handlerMButtons},      {i18nCaption:"cancelar", css:"cancelar", click: handlerMButtons}];$("#idToolbar").rup_date("addMButton", "mbuton1", buttons);
```
<a name="module_rup_toolbar..showMButton"></a>

### rup_toolbar~showMButton()
Se muestra la capa con los mButtons

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Example**  
```js
$("#idToolbar").rup_date("showMButton");
```
<a name="module_rup_toolbar..disableButton"></a>

### rup_toolbar~disableButton(id)
Desabilita el botón correspondiente al identificador indicado.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón que se desea deshabilitar. |

**Example**  
```js
$("#idToolbar").rup_date("disableButton","idEditButton");
```
<a name="module_rup_toolbar..enableButton"></a>

### rup_toolbar~enableButton(id)
Habilita el botón correspondiente al identificador indicado.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón que se desea habilitar. |

**Example**  
```js
$("#idToolbar").rup_date("enableButton","idEditButton");
```
<a name="module_rup_toolbar..pressButton"></a>

### rup_toolbar~pressButton(id, css)
Añade el estilo de css indicado para simular un estado press en el botón.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón. |
| css | <code>string</code> | Css asociado al estado press. |

**Example**  
```js
$("#idToolbar").rup_date("pressButton","idEditButton","preesed-button");
```
<a name="module_rup_toolbar..unpressButton"></a>

### rup_toolbar~unpressButton(id, css)
Elimina el estilo de css indicado para simular un estado press en el botón.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón. |
| css | <code>string</code> | Css asociado al estado press. |

**Example**  
```js
$("#idToolbar").rup_date("unpressButton","idEditButton","preesed-button");
```
<a name="module_rup_toolbar..tooglePressButton"></a>

### rup_toolbar~tooglePressButton(id, css)
Alterna el estado del estilo de css indicado para simular un estado press en el botón.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón. |
| css | <code>string</code> | Css asociado al estado press. |

**Example**  
```js
$("#idToolbar").rup_date("tooglePressButton","idEditButton","preesed-button");
```
<a name="module_rup_toolbar..refresh"></a>

### rup_toolbar~refresh(id)
Actualiza el botón al estado que determina la configuración actual.

**Kind**: inner method of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Identificador del botón. |

**Example**  
```js
$("#idToolbar").rup_date("refresh");
```
<a name="module_rup_toolbar..buttonClick"></a>

### rup_toolbar~buttonClick : <code>function</code>
Función de callback a ejecutar cuando se realiza un click sobre un botón de la botonera.

**Kind**: inner typedef of [<code>rup\_toolbar</code>](#module_rup_toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto correspondiente al evento click realizado sobre el botón. |
| event.data.id | <code>string</code> | Identificador del botón que ha lanzado el evento. |
| event.data.caption | <code>string</code> | Texto del botón que ha lanzado el evento. |

**Example**  
```js
var newButton = {  i18nCaption:"editButton",  click: function(event){  }};$("#idToolbar").rup_toolbar("addButton", newButton);
```
<a name="module_rup_toolbar..button"></a>

### rup_toolbar~button : <code>Object</code>
Definición del tipo de objeto que representa un botón de la botonera.

**Kind**: inner typedef of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> |  | Identificador único del botón con menú. |
| [i18nCaption] | <code>string</code> |  | Texto que se mostrará en el botón. Se indica el key del literar que se obtendrá de los ficheros de internacionalización correspondientes. |
| [css] | <code>string</code> |  | Define el estilo a aplicar. Se utilizará para mostrar imágenes a la izquierda del botón. |
| [right] | <code>boolean</code> | <code>false</code> | Determina si el botón aparece alineado a la derecha (true) o a la izquierda (false). |
| click | [<code>buttonClick</code>](#module_rup_toolbar..buttonClick) |  | Función javascript que se ejecutará cuando se pulse el botón al que se ha asociado. |

<a name="module_rup_toolbar..mButton"></a>

### rup_toolbar~mButton : <code>Object</code>
Definición del tipo de objeto que representa un mButton de la botonera.

**Kind**: inner typedef of [<code>rup\_toolbar</code>](#module_rup_toolbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| id | <code>string</code> |  | Identificador único del botón con menú. |
| [i18nCaption] | <code>string</code> |  | Texto que se mostrará en el botón. Se indica el key del literar que se obtendrá de los ficheros de internacionalización correspondientes. |
| [css] | <code>string</code> |  | Define el estilo a aplicar. Se utilizará para mostrar imágenes a la izquierda del botón. |
| [right] | <code>boolean</code> | <code>false</code> | Determina si el botón aparece alineado a la derecha (true) o a la izquierda (false). |
| buttons | [<code>Array.&lt;button&gt;</code>](#module_rup_toolbar..button) |  | Botones que va a incluir el botón con menú. |

