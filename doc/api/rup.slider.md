<a name="module_rup_slider"></a>

## rup\_slider
Tiene como objetivo permitir al usuario introducir datos mediante un control que se desplaza dentro de un rango de valores.

**Summary**: Componente RUP Slider.  
**See**: El componente está basado en el plugin [jQuery UI Slider](https://jqueryui.com/slider/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://api.jqueryui.com/slider/).  
**Example**  
```js
var properties = {		min: 0,		max: 500	};$("#idSlider").rup_slider(properties);
```

* [rup_slider](#module_rup_slider)
    * [~getRupValue()](#module_rup_slider..getRupValue) ⇒ <code>number</code>
    * [~setRupValue(param)](#module_rup_slider..setRupValue) ⇒ <code>jQuery</code>
    * [~destroy()](#module_rup_slider..destroy) ⇒ <code>jQuery</code>
    * [~enable()](#module_rup_slider..enable) ⇒ <code>jQuery</code>
    * [~disable()](#module_rup_slider..disable) ⇒ <code>jQuery</code>
    * [~instance()](#module_rup_slider..instance) ⇒ <code>object</code>
    * [~option()](#module_rup_slider..option) ⇒ <code>object</code>
    * [~option(paramName)](#module_rup_slider..option) ⇒ <code>object</code>
    * [~option(paramName, paramValue)](#module_rup_slider..option) ⇒ <code>jQuery</code>
    * [~option(param)](#module_rup_slider..option) ⇒ <code>jQuery</code>

<a name="module_rup_slider..getRupValue"></a>

### rup_slider~getRupValue() ⇒ <code>number</code>
Método utilizado para obtener el valor del componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la obtención del valor del componente Slider.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>number</code> - - Devuelve el valor actual del componente.  
**Example**  
```js
$("#idSlider").rup_slider("getRupValue");
```
<a name="module_rup_slider..setRupValue"></a>

### rup_slider~setRupValue(param) ⇒ <code>jQuery</code>
Método utilizado para asignar el valor al componente. Este método es el utilizado por el resto de componentes RUP para estandarizar la asignación del valor al componente Slider.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>number</code> | Valor que se va a asignar al componente. |

**Example**  
```js
// Un único desplazador$("#idSlider").rup_slider("setRupValue", 40);// Varios desplazadores$("#idSlider").rup_slider("setRupValue", [10,60]);
```
<a name="module_rup_slider..destroy"></a>

### rup_slider~destroy() ⇒ <code>jQuery</code>
Elimina las modificaciones realizadas sobre elemento del DOM.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
// Elimina el control sliderjQuery("#idSlider").rup_slider("destroy");
```
<a name="module_rup_slider..enable"></a>

### rup_slider~enable() ⇒ <code>jQuery</code>
Habilita el control.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
jQuery("#idSlider").rup_slider("enable");
```
<a name="module_rup_slider..disable"></a>

### rup_slider~disable() ⇒ <code>jQuery</code>
Deshabilita el control.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  
**Example**  
```js
jQuery("#idSlider").rup_slider("disable");
```
<a name="module_rup_slider..instance"></a>

### rup_slider~instance() ⇒ <code>object</code>
Devuelve la instancia de jQueryUI asociada al control. Si no ha sido inicializada retorna undefined.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>object</code> - - Instancia de jQueryUI asociada.  
**Example**  
```js
jQuery("#idSlider").rup_slider("instance");
```
<a name="module_rup_slider..option"></a>

### rup_slider~option() ⇒ <code>object</code>
Devuelve un objeto clave/valor que contiene las propiedades de configuración del control.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>object</code> - - Objeto clave/valor con las propiedades de configuración.  
**Example**  
```js
jQuery("#idSlider").rup_slider("option");
```
<a name="module_rup_slider..option"></a>

### rup_slider~option(paramName) ⇒ <code>object</code>
Devuelve el valor asociado a la propiedad identificada por parámetro.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>object</code> - - Valor asociado a la propiedad.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | Nombre de la propiedad. |

**Example**  
```js
jQuery("#idSlider").rup_slider("option", "min");
```
<a name="module_rup_slider..option"></a>

### rup_slider~option(paramName, paramValue) ⇒ <code>jQuery</code>
Asigna un valor a la propiedad indentificada por parámetro.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| paramName | <code>string</code> | Nombre de la propiedad. |
| paramValue | <code>object</code> | Valor de la propiedad. |

**Example**  
```js
jQuery("#idSlider").rup_slider("option", "min", 50);
```
<a name="module_rup_slider..option"></a>

### rup_slider~option(param) ⇒ <code>jQuery</code>
Permite asignar el valor de una o varias propiedades de configuración.

**Kind**: inner method of [<code>rup\_slider</code>](#module_rup_slider)  
**Returns**: <code>jQuery</code> - - Retorna la referencia al elemento.  

| Param | Type | Description |
| --- | --- | --- |
| param | <code>object</code> | Objeto clave/valor con las propiedades de configuración y sus valores. |

**Example**  
```js
jQuery("#idSlider").rup_slider("option", {min:10, max:60});
```
