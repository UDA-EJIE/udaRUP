<a name="module_rup_dialog"></a>

## rup_dialog
Permite lanzar un subproceso o un mensaje de confirmación dentro de un proceso principal sin salirse de este. <br/><br/>Es una evolución del patrón mensaje.

**Summary**: Componente RUP Dialog.  
**See**: El componente está basado en el plugin [jQuery UI Dialog](https://jqueryui.com/dialog/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/dialog/).  
**Example**  
```js
var properties = {  type: $.rup.dialog.TEXT,  autoOpen: true,  modal: true,  resizable: true,  title: "Título del dialog (text) ",  message: "Se esta creando un div con el mensaje puesto por parametro."};$("#selector").rup_dialog(properties);
```

* [rup_dialog](#module_rup_dialog)
    * [~defaults](#module_rup_dialog..defaults)
    * [~open()](#module_rup_dialog..open)
    * [~destroy()](#module_rup_dialog..destroy)
    * [~disable()](#module_rup_dialog..disable)
    * [~enable()](#module_rup_dialog..enable)
    * [~moveToTop()](#module_rup_dialog..moveToTop)
    * [~close()](#module_rup_dialog..close)
    * [~isOpen()](#module_rup_dialog..isOpen) ⇒ <code>boolean</code>
    * [~getOption(opt)](#module_rup_dialog..getOption) ⇒ <code>Object</code>
    * [~setOption(opt, value)](#module_rup_dialog..setOption)
    * [~createBtnLinks(btn, id)](#module_rup_dialog..createBtnLinks)
        * [~buttonHREF](#module_rup_dialog..createBtnLinks..buttonHREF)
    * [~DIV](#module_rup_dialog..DIV) : <code>string</code>
    * [~TEXT](#module_rup_dialog..TEXT) : <code>string</code>
    * [~AJAX](#module_rup_dialog..AJAX) : <code>string</code>
    * [~LINK](#module_rup_dialog..LINK) : <code>string</code>
    * [~ajaxOptions](#module_rup_dialog..ajaxOptions) : <code>object</code>
    * [~onOpen](#module_rup_dialog..onOpen) : <code>function</code>
    * [~onBeforeClose](#module_rup_dialog..onBeforeClose) ⇒ <code>boolean</code>

<a name="module_rup_dialog..defaults"></a>

### rup_dialog~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup_dialog</code>](#module_rup_dialog)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [url] | <code>string</code> |  | Url de donde se obtendrá el contenido del diálogo. |
| [rupCheckStyle] | <code>boolean</code> | <code>true</code> | Propiedad definida por el componentes base, si está a true se mostraran los mensajes específicos del componente base marcados por la guía de estilos, es decir, que si el desarrollador no cumple con la guisa de estilos o desarrollo el objeto base mostrará los mensajes advirtiendo su incumplimiento, si se pone a false no se mostraran. Esta acción queda bajo la responsabilidad de la aplicación, ya que esta propiedad no debería modificarse. |
| type | [<code>DIV</code>](#module_rup_dialog..DIV) \| [<code>TEXT</code>](#module_rup_dialog..TEXT) \| [<code>AJAX</code>](#module_rup_dialog..AJAX) \| [<code>LINK</code>](#module_rup_dialog..LINK) |  | Propiedad que establece el tipo de diálogo a mostrar. |
| ajaxOptions | <code>jQuery.rup_dialog~ajaxOptions</code> |  | Establece las todas las propiedades para configurar la petición ajax. |
| [showLoading] | <code>boolean</code> | <code>true</code> | Esta propiedad mostrará una capa de cargando datos en los diálogos de tipo Ajax durante la carga del mismo. |
| [disabled] | <code>boolean</code> | <code>false</code> | Propiedad que deshabilita o no el diálogo. |
| [autoOpen] | <code>boolean</code> | <code>true</code> | Si esta propiedad esta a true el diálogo se abrirá automáticamente cuando se cree, en el caso de que su valor sea false, el diálogo se mantendrá oculto hasta que se invoque a la función “open” (.rup_dialog(“open”)). |
| [buttons] | <code>Object</code> |  | Define los botones (literales y funciones a las que invocan) que contendrá el diálogo. La propiedad sería de tipo Array. Donde cada elemento del array debe ser un objeto que define las propiedades de cada botón y el tipo del mismo. |
| [closeOnEscape] | <code>boolean</code> | <code>true</code> | Especifica si se debe cerrar el diálogo cuando el tenga el foco y el usuario pulse la tecla ESC. |
| dialogClass | <code>string</code> |  | Porpiedad que establece el/los estilos que se añadirán al dialogo para dotar al dialogo de estilos diferentes. |
| [draggable] | <code>boolean</code> | <code>true</code> | Si su valor es true el diáologo sera dragable pinchando sobre el título. |
| [height] | <code>string</code> \| <code>number</code> | <code>&quot;auto&quot;</code> | Establece el alto del diálogoen pixeles. |
| [hide] | <code>string</code> | <code>null</code> | Efecto utilizado cuando se cierra el diálogo. |
| [maxHeight] | <code>boolean</code> \| <code>number</code> | <code>false</code> | Alto máximo en pixeles al que se puede llegar a redimensionar el diálogo. |
| [maxWidth] | <code>boolean</code> \| <code>number</code> | <code>false</code> | Ancho máximo en pixeles al que se puede llegar a redimensionar el diálogo. |
| [minHeight] | <code>boolean</code> \| <code>number</code> | <code>100</code> | Alto mínimo en pixeles al que se puede llegar a redimensionar el diálogo. |
| [minWidth] | <code>boolean</code> \| <code>number</code> | <code>150</code> | Ancho mínimo en pixeles al que se puede llegar a redimensionar el diálogo. |
| [modal] | <code>boolean</code> | <code>false</code> | Si se establece esta propiedad a true el diálogo se abrirá de forma modal, por encima del resto de elementos. |
| position | <code>string</code> \| <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;number&gt;</code> |  | Esta propiedad especifica donde debe mostrarse el diálogo. Sus posibles valores son: Un simple String representando la posición. 'center', 'left', 'right', 'top', 'bottom'. Un array con las coordenadas x, y en pixles (e. [350,100]). Un array con string que representan la posición (e. ['right','top']). |
| [resizable] | <code>boolean</code> | <code>true</code> | Si se establece esta propiedad a true el diálogo se redimensionable. |
| [show] | <code>string</code> |  | Efecto a realizar cuando se abre el diálogo. |
| [title] | <code>string</code> |  | Establece el título de la ventana. Puede ser cualquier html válido. |
| [width] | <code>number</code> | <code>300</code> | Establece el ancho del diálogo en pixeles. |
| open | <code>jQuery.rup_dialog~onOpen</code> |  | Evento que se lanza cuando se abre el diálogo. |
| close | [<code>onClose</code>](#jQuery.rup_dialog..onClose) |  | Evento que se lanza a la hora de cerrar el diálogo. |
| beforeClose | <code>jQuery.rup_dialog~onBeforeClose</code> |  | Evento que se lanza justo antes de que se cierre el dialogo, si este evento devuelve false se anulará las acción de cierre y el dialogo seguirá abierto. |

<a name="module_rup_dialog..open"></a>

### rup_dialog~open()
Abre el diálogo y estable el foco en el primer botón.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("open");
```
<a name="module_rup_dialog..destroy"></a>

### rup_dialog~destroy()
Borra el dialogo si este estubiera oculto o visible.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("destroy");
```
<a name="module_rup_dialog..disable"></a>

### rup_dialog~disable()
Función que deshabilita el dialogo sobre el que se aplica.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("disable");
```
<a name="module_rup_dialog..enable"></a>

### rup_dialog~enable()
Funcion que, en caso de estar desahibilitado, habilita el dialogo sobre el que se aplica.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("enable");
```
<a name="module_rup_dialog..moveToTop"></a>

### rup_dialog~moveToTop()
Funcion encargada de poner por encima de todos los dialogos al dialogo sobre el que se aplica. Puede ser muy util se se tiene mas de un dialog abierto a la vez.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("moveToTop");
```
<a name="module_rup_dialog..close"></a>

### rup_dialog~close()
Cierra el dialogo.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$("#selector").rup_dialog("close");
```
<a name="module_rup_dialog..isOpen"></a>

### rup_dialog~isOpen() ⇒ <code>boolean</code>
Función que devuelve si el dialogo esta abierto o no.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Returns**: <code>boolean</code> - - Determina si el diálogo está abierto o no.  
**Example**  
```js
$("#selector").rup_dialog("isOpen");
```
<a name="module_rup_dialog..getOption"></a>

### rup_dialog~getOption(opt) ⇒ <code>Object</code>
Obtiene la propiedad que recibe como parametro.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  
**Returns**: <code>Object</code> - - Valor de la propiedad especificada.  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>string</code> | Nombre de la propiedad. |

**Example**  
```js
$("#selector").rup_dialog("getOption","width");
```
<a name="module_rup_dialog..setOption"></a>

### rup_dialog~setOption(opt, value)
Establece la propiedad que recibe como parametro.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>string</code> | Nombre de la propiedad. |
| value | <code>object</code> | Valor de la propiedad a establecer. |

**Example**  
```js
$("#selector").rup_dialog("setOption","width", 200);
```
<a name="module_rup_dialog..createBtnLinks"></a>

### rup_dialog~createBtnLinks(btn, id)
Función que crea los botones como enlaces y se los añade al panel de botones al final de los botones.

**Kind**: inner method of [<code>rup_dialog</code>](#module_rup_dialog)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>object</code> | Objeto de definición del botón. |
| id | <code>object</code> | Identificador del diálogo. |

**Example**  
```js
$("#selector").rup_dialog("createBtnLinks", btnObj, "idDialog");
```
<a name="module_rup_dialog..createBtnLinks..buttonHREF"></a>

#### createBtnLinks~buttonHREF
Función que crea los botones como enlaces y se los añade al panel de botones al final de los botones

**Kind**: inner property of [<code>createBtnLinks</code>](#module_rup_dialog..createBtnLinks)  
<a name="module_rup_dialog..DIV"></a>

### rup_dialog~DIV : <code>string</code>
Dialogo creado a partir de un diálogo existente.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$.rup.dialog.DIV
```
<a name="module_rup_dialog..TEXT"></a>

### rup_dialog~TEXT : <code>string</code>
Dialogo creado a partir de un texto.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$.rup.dialog.TEXT
```
<a name="module_rup_dialog..AJAX"></a>

### rup_dialog~AJAX : <code>string</code>
Dialogo creado a partir de la respuesta de una petición AJAX.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$.rup.dialog.AJAX
```
<a name="module_rup_dialog..LINK"></a>

### rup_dialog~LINK : <code>string</code>
Dialogo creado a partir del contenido de un enlace estático.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**Example**  
```js
$.rup.dialog.LINK
```
<a name="module_rup_dialog..ajaxOptions"></a>

### rup_dialog~ajaxOptions : <code>object</code>
Propiedades de configuración de la petición Ajax.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**See**: [jQuery Ajax Settings](http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings)  
<a name="module_rup_dialog..onOpen"></a>

### rup_dialog~onOpen : <code>function</code>
Evento que se lanza cuando se abre el diálogo.

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**See**: [jQueryUI Dialog](http://api.jqueryui.com/dialog/#event-open)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Fecha seleccionada |
| ui | <code>object</code> | Objeto de jQueryUI correspondiente a la interfaz del diálogo. |

**Example**  
```js
$("#idDialog").rup_dialog({ open: function(event, ui) { ... }});
```
<a name="module_rup_dialog..onBeforeClose"></a>

### rup_dialog~onBeforeClose ⇒ <code>boolean</code>
Evento que se lanza justo antes de que se cierre el dialogo, si este evento devuelve false se anulará las acción de cierre y el dialogo seguirá abierto

**Kind**: inner typedef of [<code>rup_dialog</code>](#module_rup_dialog)  
**Returns**: <code>boolean</code> - - Si devuelve false se anulará las acción de cierre y el dialogo seguirá abierto.  
**See**: [jQueryUI Dialog](http://api.jqueryui.com/dialog/#event-beforeClose)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Fecha seleccionada |
| ui | <code>object</code> | Objeto de jQueryUI correspondiente a la interfaz del diálogo. |

**Example**  
```js
$("#idDialog").rup_dialog({ onBeforeClose: function(event, ui) { ... }});
```
