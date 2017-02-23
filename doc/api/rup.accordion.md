<a name="module_rup_accordion"></a>

## rup_accordion
Tiene como objetivo presentar un contenido donde conceptos relacionados pueden agruparse (ej. secciones) de manera que el usuario puede mostrar u ocultar información sin perder el contexto del contenido principal.

**Summary**: Componente RUP Accordion.  
**Example**  
```js
$(".rup_accordion").rup_accordion({  animated: "bounceslide",	active: false,	autoHeight: false,	collapsible: true});
```

* [rup_accordion](#module_rup_accordion)
    * [~defaults](#module_rup_accordion..defaults)
    * [~destroy()](#module_rup_accordion..destroy)
    * [~disable()](#module_rup_accordion..disable)
    * [~enable()](#module_rup_accordion..enable)
    * [~option(opt, [value])](#module_rup_accordion..option)
    * [~widget()](#module_rup_accordion..widget) ⇒ <code>object</code>
    * [~activate()](#module_rup_accordion..activate)
    * ~~[~resize()](#module_rup_accordion..resize)~~

<a name="module_rup_accordion..defaults"></a>

### rup_accordion~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of <code>[rup_accordion](#module_rup_accordion)</code>  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| validation | <code>boolean</code> | <code>true</code> | Parámetro de configuración que determina la aplicación de la validación estructural asociada a las necesidades estructurales del Accordion. |

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
<a name="module_rup_accordion..widget"></a>

### rup_accordion~widget() ⇒ <code>object</code>
Devuelve el elemento .ui-accordion:.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  
**Returns**: <code>object</code> - - Objeto jQuery que contiene el accordion.  
**Example**  
```js
$("#idAccordion").rup_accordion("widget");
```
<a name="module_rup_accordion..activate"></a>

### rup_accordion~activate()
Activación programática de la sección especificada por parámetro.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  

| Type | Description |
| --- | --- |
| <code>number</code> &#124; <code>object</code> &#124; <code>boolean</code> | Valor numérico diferente de cero que indique la sección seleccionada o un selector que determine el elemento activado. En caso de tener el collapsible activado, es posible pasar el valor false para que se cierren todas las secciones. |

**Example**  
```js
// Activar la seción tercera.$("#idAccordion").rup_accordion("activate", 3);// Activar la seción identificada con el selector seccion3.$("#idAccordion").rup_accordion("activate", "#seccion3");// Colapsar todas las secciones.$("#idAccordion").rup_accordion("activate", false);
```
<a name="module_rup_accordion..resize"></a>

### ~~rup_accordion~resize()~~
***Deprecated***

La función provoca el reajuste de los height (tamaño vertical) de las distintas secciones del Accordion. La ejecución de esta función solo tiene sentido si la opción fillSpace está activada y el height del contenedor cambia.

**Kind**: inner method of <code>[rup_accordion](#module_rup_accordion)</code>  
**Example**  
```js
$("#idAccordion").rup_accordion("resize");
```
