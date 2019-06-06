<a name="module_rup_tooltip"></a>

## rup\_tooltip
Se les presenta a los usuarios una barra de botones con diversas funcionalidades relacionadas a elementos de la página. Gracias a este componente se presentan, ordenan y agrupan las distintas funcionalidades gestionadas por las aplicaciones.

**Summary**: Componente RUP Tooltip.  
**See**: El componente está basado en el plugin [qTip2](http://qtip2.com/options). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://qtip2.com/options).  
**Example**  
```js
$("[title]").rup_tooltip({});
```

* [rup_tooltip](#module_rup_tooltip)
    * [~open()](#module_rup_tooltip..open)
    * [~close()](#module_rup_tooltip..close)
    * [~enable()](#module_rup_tooltip..enable)
    * [~disable()](#module_rup_tooltip..disable)
    * [~destroy()](#module_rup_tooltip..destroy)
    * [~option(option, [value])](#module_rup_tooltip..option)

<a name="module_rup_tooltip..open"></a>

### rup_tooltip~open()
Muestra el tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  
**Example**  
```js
$("#idTooltip").rup_tooltip("open");
```
<a name="module_rup_tooltip..close"></a>

### rup_tooltip~close()
Oculta el tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  
**Example**  
```js
$("#idTooltip").rup_tooltip("close");
```
<a name="module_rup_tooltip..enable"></a>

### rup_tooltip~enable()
Habilita el tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  
**Example**  
```js
$("#idTooltip").rup_tooltip("enable");
```
<a name="module_rup_tooltip..disable"></a>

### rup_tooltip~disable()
Deshabilita el tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  
**Example**  
```js
$("#idTooltip").rup_tooltip("disable");
```
<a name="module_rup_tooltip..destroy"></a>

### rup_tooltip~destroy()
Elimina el tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  
**Example**  
```js
$("#idTooltip").rup_tooltip("destroy");
```
<a name="module_rup_tooltip..option"></a>

### rup_tooltip~option(option, [value])
Obtiene o establece la configuración del tooltip.

**Kind**: inner method of [<code>rup\_tooltip</code>](#module_rup_tooltip)  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>string</code> | Nombre de la propiedad que se desea gestionar. |
| [value] | <code>\*</code> | Corresponde al valor de la propiedad en caso de haberse especificado el nombre de la misma en el primér parámetro. |

**Example**  
```js
// Obtener el valor de la posición$("#idTooltip").rup_tooltip("option", "position");// Establecer el valor de la posición$("#idTooltip").rup_tooltip("option", "position", {offset: "15 15"});
```
