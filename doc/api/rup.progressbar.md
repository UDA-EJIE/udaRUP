<a name="module_rup_progressbar"></a>

## rup\_progressbar
Tiene como objetivo mostrar al usuario de manera gráfica el estado de avance de una tarea o proceso.

**Summary**: Componente RUP ProgressBar.  
**See**: El componente está basado en el plugin [jQuery UI ProgressBar](https://jqueryui.com/progressbar/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/progressbar/).  
**Example**  
```js
var properties = {		value: 50	};$("#idProgressbar").rup_progressbar(properties);
```

* [rup_progressbar](#module_rup_progressbar)
    * [~defaults](#module_rup_progressbar..defaults)
    * [~getRupValue()](#module_rup_progressbar..getRupValue) ⇒ <code>number</code>
    * [~setRupValue(param)](#module_rup_progressbar..setRupValue) ⇒ <code>jQuery</code>
    * [~destroy()](#module_rup_progressbar..destroy) ⇒ <code>jQuery</code>
    * [~disable()](#module_rup_progressbar..disable) ⇒ <code>jQuery</code>
    * [~enable()](#module_rup_progressbar..enable) ⇒ <code>jQuery</code>
    * [~instance()](#module_rup_progressbar..instance) ⇒ <code>object</code>
    * [~option(param)](#module_rup_progressbar..option) ⇒ <code>jQuery</code>
    * [~option()](#module_rup_progressbar..option) ⇒ <code>object</code>
    * [~option(paramName)](#module_rup_progressbar..option) ⇒ <code>object</code>
    * [~option(paramName, paramValue)](#module_rup_progressbar..option) ⇒ <code>jQuery</code>
    * [~value(value)](#module_rup_progressbar..value) ⇒ <code>jQuery</code>
    * [~value()](#module_rup_progressbar..value) ⇒ <code>number</code>
    * [~widget()](#module_rup_progressbar..widget) ⇒ <code>jQuery</code>

<a name="module_rup_progressbar..defaults"></a>

### rup_progressbar~defaults
Propiedades de configuración del componente.

**Kind**: inner property of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [disabled] | <code>boolean</code> | <code>false</code> | Determina si la barra de progreso está habilitada o deshabilitada. |
| [max] | <code>number</code> | <code>100</code> | Indica el valor máximo que determinará el 100% de progreso. |
| [value] | <code>number</code> | <code>0</code> | Determina el valor de progreso con el que se incializará la barra de progreso. |

<a name="module_rup_progressbar..getRupValue"></a>

### rup_progressbar~getRupValue() ⇒ <code>number</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor de la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>number</code> - - Devuelve el valor actual del componente. El valor retornado se corresponderá con el progreso actual.  
**Example**  
```js
$("#idProgressbar").rup_progressbar("getRupValue");
```
<a name="module_rup_progressbar..setRupValue"></a>

### rup_progressbar~setRupValue(param) ⇒ <code>jQuery</code>
Método utilizado para asignar el valor al componente. Este método es el utilizado por
el resto de componentes RUP para estandarizar la asignación del valor a la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
$("#idProgressbar").rup_progressbar("setRupValue", 50);
```
<a name="module_rup_progressbar..destroy"></a>

### rup_progressbar~destroy() ⇒ <code>jQuery</code>
Elimina las modificaciones realizadas sobre elemento del DOM.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
// Elimina la barra de progresojQuery("#idProgressbar").rup_progressbar("destroy");
```
<a name="module_rup_progressbar..disable"></a>

### rup_progressbar~disable() ⇒ <code>jQuery</code>
Deshabilita la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("disable");
```
<a name="module_rup_progressbar..enable"></a>

### rup_progressbar~enable() ⇒ <code>jQuery</code>
Habilita la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("enable");
```
<a name="module_rup_progressbar..instance"></a>

### rup_progressbar~instance() ⇒ <code>object</code>
Devuelve la instancia de jQueryUI asociada a la barra de progreso. Si no ha sido inicializada retorna undefined.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>object</code> - - Instancia de jQueryUI asociada.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("instance");
```
<a name="module_rup_progressbar..option"></a>

### rup_progressbar~option(param) ⇒ <code>jQuery</code>
Permite asignar el valor de una o varias propiedades de configuración.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>object</code> | Objeto clave/valor con las propiedades de configuración y sus valores. |

**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("option", {value:50, max:0});
```
<a name="module_rup_progressbar..option"></a>

### rup_progressbar~option() ⇒ <code>object</code>
Devuelve un objeto clave/valor que contiene las propiedades de configuración de la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>object</code> - - Objeto clave/valor con las propiedades de configuración.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("option");
```
<a name="module_rup_progressbar..option"></a>

### rup_progressbar~option(paramName) ⇒ <code>object</code>
Devuelve el valor asociado a la propiedad identificada por parámetro.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>object</code> - - Valor asociado a la propiedad.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | Nombre de la propiedad. |

**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("option", "value");
```
<a name="module_rup_progressbar..option"></a>

### rup_progressbar~option(paramName, paramValue) ⇒ <code>jQuery</code>
Asigna un valor a la propiedad indentificada por parámetro.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | Nombre de la propiedad. |
| paramValue | <code>object</code> | Valor de la propiedad. |

**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("option", "value", 50);
```
<a name="module_rup_progressbar..value"></a>

### rup_progressbar~value(value) ⇒ <code>jQuery</code>
Asigna un valor a la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | Valor a asignar. |

**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("value", 50);
```
<a name="module_rup_progressbar..value"></a>

### rup_progressbar~value() ⇒ <code>number</code>
Devuelve el valor actual de la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>number</code> - - Valor actual de la barra de progreso.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("value");
```
<a name="module_rup_progressbar..widget"></a>

### rup_progressbar~widget() ⇒ <code>jQuery</code>
Devuelve el objeto widget de jQuery que contiene la barra de progreso.

**Kind**: inner method of [<code>rup\_progressbar</code>](#module_rup_progressbar)  
**Returns**: <code>jQuery</code> - - Objeto widget jQuery.  
**Example**  
```js
jQuery("#idProgressbar").rup_progressbar("widget");
```
