<a name="module_rup_accordion"></a>

## rup_accordion
Tiene como objetivo presentar un contenido donde conceptos relacionados pueden agruparse (ej. secciones) de manera que el usuario puede mostrar u ocultar información sin perder el contexto del contenido principal.

**Summary**: Componente RUP Accordion.  
**Example**  
```js
$(".rup_accordion").rup_accordion({  animated: "bounceslide",	active: false,	autoHeight: false,	collapsible: true});
```

* [rup_accordion](#module_rup_accordion)
    * [~destroy()](#module_rup_accordion..destroy)
    * [~disable()](#module_rup_accordion..disable)
    * [~enable()](#module_rup_accordion..enable)
    * [~option(opt, [value])](#module_rup_accordion..option)

<a name="module_rup_accordion..destroy"></a>

### rup_accordion~destroy()
Elimina completamente la funcionalidad del Accordion. Como resultado, se devuelven los
objetos html, tal y como estaban, antes de aplicar el componente Accordion.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  
**Example**  
```js
$("#idAccordion").rup_accordion("destroy");
```
<a name="module_rup_accordion..disable"></a>

### rup_accordion~disable()
Deshabilita el componente Accordion.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  
**Example**  
```js
$("#idAccordion").rup_accordion("disable");
```
<a name="module_rup_accordion..enable"></a>

### rup_accordion~enable()
Habilita el componente Accordion.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  
**Example**  
```js
$("#idAccordion").rup_accordion("enable");
```
<a name="module_rup_accordion..option"></a>

### rup_accordion~option(opt, [value])
Dependiendo de si se informa un valor asociado a una parámetro o se introduce un json con relaciones variable-valor o no se pasan parámetros asociados a la opción especificada, la función asigna el nuevo valor al parámetro asociado o asigna el nuevo conjunto de valores a los parámetros asociados o devuelve el valor actual del parámetro especificado (actuando como un get), respectivamente..

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  

| Param | Type | Description |
| --- | --- | --- |
| opt | <code>String</code> &#124; <code>Object</code> | Nombre de la propiedad u objeto con varias propiedades. |
| [value] | <code>\*</code> | Valor a asignar a la propiedad especificada por su nombre en el primer parámetro. |

**Example**  
```js
// Asignar el valor "bounceslide" a la propiedad "animated"$("#idAccordion").rup_accordion("option", "animated", "bounceslide");// Se asignan valores a varias propiedades por medio de un objeto json.$("#idAccordion").rup_accordion("option",{active: false, collapsible : true});// Se recupera el valor de la propiedad "animated"$("#idAccordion").rup_accordion("option", "animated");
```
