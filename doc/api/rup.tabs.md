<a name="module_rup_tabs"></a>

## rup_tabs
Permiten dar acceso de forma compacta a grupos de contenidos mutuamente excluyentes pudiendo ser integradas en zonas muy reducidas de la interfaz.

**Summary**: Componente RUP Tabs.  
**See**: El componente está basado en el plugin [jQuery UI Tabs](https://jqueryui.com/tabs/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/tabs/).  
**Example**  
```js
$("#ejemploArbolDiv").rup_tabs(properties);
```

* [rup_tabs](#module_rup_tabs)
    * _instance_
        * ["create"](#module_rup_tabs+event_create)
        * ["select"](#module_rup_tabs+event_select)
        * ["load"](#module_rup_tabs+event_load)
        * ["activate"](#module_rup_tabs+event_activate)
        * ["add"](#module_rup_tabs+event_add)
        * ["remove"](#module_rup_tabs+event_remove)
        * ["enable"](#module_rup_tabs+event_enable)
        * ["disable"](#module_rup_tabs+event_disable)
    * _inner_
        * [~options](#module_rup_tabs..options)
        * [~disableTabs()](#module_rup_tabs..disableTabs)
        * [~enableTabs()](#module_rup_tabs..enableTabs)
        * [~loadTab()](#module_rup_tabs..loadTab)
        * [~changeUrlTab()](#module_rup_tabs..changeUrlTab)
        * [~changeLayerTab()](#module_rup_tabs..changeLayerTab)
        * [~selectTab()](#module_rup_tabs..selectTab)
        * [~addTab()](#module_rup_tabs..addTab)
        * [~removeTab()](#module_rup_tabs..removeTab)

<a name="module_rup_tabs+event_create"></a>

### "create"
Se lanza cada vez que se crea una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ create: function(){...} });
```
<a name="module_rup_tabs+event_select"></a>

### "select"
Se lanza el evento cada vez que se hace click sobre una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ select: function(){...} });
```
<a name="module_rup_tabs+event_load"></a>

### "load"
Este evento se desencadena después de que el contenido de una pestaña se ha cargado.

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ load: function(){...} });
```
<a name="module_rup_tabs+event_activate"></a>

### "activate"
Este evento ocurre cuando una pestaña está preparada para ser mostrada.

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ activate: function(){...} });
```
<a name="module_rup_tabs+event_add"></a>

### "add"
Este evento se desencadena cuando se añade una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ add: function(){...} });
```
<a name="module_rup_tabs+event_remove"></a>

### "remove"
Este evento se desencadena cuando se elimina una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ remove: function(){...} });
```
<a name="module_rup_tabs+event_enable"></a>

### "enable"
Este evento se desencadena cuando se habilita una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ enable: function(){...} });
```
<a name="module_rup_tabs+event_disable"></a>

### "disable"
Este evento se desencadena cuando se deshabilita una pestaña

**Kind**: event emitted by [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$(selector).rup_tabs ({ disable: function(){...} });
```
<a name="module_rup_tabs..options"></a>

### rup_tabs~options
**Kind**: inner property of [<code>rup_tabs</code>](#module_rup_tabs)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | <code>object</code> |  | Permite especificar el conjunto de pestañas que, inicialmente, estarán deshabilitadas |
| [close] | <code>boolean</code> | <code>false</code> | Determina si se debe mostrar un icono de cerrar pestaña junto al label de las mismas. |
| fixedHeight | <code>integer</code> |  | Permite especificar una altura fija para el contenedor de las pestañas |
| [lengthLiteral] | <code>integer</code> |  | Permite especificar un número máximo de caracteres a mostrar en el label de la pestaña antes de aplicar ellipsis. |
| maxNumberTabs | <code>integer</code> |  | Parámetro que determina el número máximo de pestañas que va a permitir el componente que se añadan de manera dinámica |
| [scrollable] | <code>boolean</code> | <code>false</code> | Determina si la pestaña permite el mostrar scroll en la capa contenedora |
| layer | <code>string</code> |  | Parámetro que permite especificar fragmentos html previamente cargados para el contenido de una pestaña. El parámetro acepta cualquier tipo de selector válido de JQuery para determinar que fragmento html se ubica en la pestaña. En caso de precisarse un selector de JQuery que devuelva más de un elemento, éstos se incluirán en la pestaña correspondiente dispuestos verticalmente (esta forma de trabajar no es muy ortodoxa pero es factible). |
| width | <code>integer</code> |  | Permite definir la anchura del componente. |
| height | <code>integer</code> |  | Permite difinir la altura del componente. |
| [tabsAtBottom] | <code>boolean</code> | <code>false</code> | Parámetro que determina si las pestañas se van a mostrar en la parte inferior en vez de en la superior |

<a name="module_rup_tabs..disableTabs"></a>

### rup_tabs~disableTabs()
Función encargada de deshabilitar una o un conjunto de pestañas de un mismo sub-nivel

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> \| <code>object</code> | Posición de las pestañas a deshabilitar |

**Example**  
```js
//Una única pestaña:$("#tabs").rup_tabs("disableTabs",{   idTab: "tabs",   position: 1   });//Un conjunto de pestañas:$("#tabs").rup_tabs("disableTabs",{   idTab: "tabs",   position: [0,1,2]});
```
<a name="module_rup_tabs..enableTabs"></a>

### rup_tabs~enableTabs()
Función encargada de habilitar una o un conjunto de pestañas de un mismo subnivel.

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> \| <code>object</code> | Posición de las pestañas a habilitar |

**Example**  
```js
//Una única pestaña:$("#tabs").rup_tabs("enableTabs ",{   idTab: "tabs",   position: 1 });//Un conjunto de pestañas: $("#tabs").rup_tabs("enableTabs",{   idTab: "tabs",   position: [0,1,2] });
```
<a name="module_rup_tabs..loadTab"></a>

### rup_tabs~loadTab()
Función que fuerza la recarga de una pestaña. Si se especifica una nueva url, además de recargar la página con la nueva url, se inserta ésta como nueva url de la pestaña

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de la pestaña a recargar |
| args.url | <code>string</code> | Nueva url a cargar. |

**Example**  
```js
//	Recarga simple:$("#tabs").rup_tabs("loadTab",{   idTab: "tabs",   position: 2 });//	Recarga con cambio de url:$("#tabs").rup_tabs("loadTab", {  idTab: "tabs",  position: 2,  url: "/nuevoFragmento" *});
```
<a name="module_rup_tabs..changeUrlTab"></a>

### rup_tabs~changeUrlTab()
Función encargada de actualizar la url de invocación de una pestaña determinada

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de la pestaña a cambiar |
| args.url | <code>string</code> | Nueva url a cargar. |

**Example**  
```js
$("#tabs").rup_tabs("changeUrlTab",{   idTab: "tabs",    position: 1,   url: "nuevaUrl" });
```
<a name="module_rup_tabs..changeLayerTab"></a>

### rup_tabs~changeLayerTab()
Función encargada de actualizar la capa html, previamente cargada, que se muestra en la pestaña determinada

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de la pestaña a cambiar |
| args.layer | <code>string</code> | Selector de la capa a cargar. |

**Example**  
```js
$("#tabs").rup_tabs("changeLayerTab",{   idTab: "tabs",  position: 2,  layer: "nuevaSelector"});
```
<a name="module_rup_tabs..selectTab"></a>

### rup_tabs~selectTab()
Función encargada de seleccionar una pestaña determinada. El comportamiento es idéntico al click con el ratón.

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de la pestaña a seleccionar |

**Example**  
```js
$("#tabs").rup_tabs("selectTab",{   idTab: "tabs",   position: 1, });
```
<a name="module_rup_tabs..addTab"></a>

### rup_tabs~addTab()
Función encargada de añadir una nueva pestaña cuando el componente ya está creado. Es posible añadir una nueva pestaña al final o entre otras pestañas.

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de las pestaña a añadir |
| args.url | <code>string</code> | la url a añadir a la pestaña. |
| args.label | <code>string</code> | Literal a mostrar en la pestaña. |

**Example**  
```js
$("#tabs").rup_tabs("addTab",{   idTab: "tabs", position: 2,  label: "nuevaPestaña",  url: "fragmento3" });
```
<a name="module_rup_tabs..removeTab"></a>

### rup_tabs~removeTab()
Función encargada de eliminar una nueva pestaña cuando el componente ya está creado

**Kind**: inner method of [<code>rup_tabs</code>](#module_rup_tabs)  

| Param | Type | Description |
| --- | --- | --- |
| args.idTab | <code>string</code> | Selector del componente pestaña |
| args.position | <code>integer</code> | Posición de las pestaña a eliminar |

