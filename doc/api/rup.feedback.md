<a name="module_rup_feedback"></a>

## rup\_feedback
Se informa al usuario de cómo interactuar con los elementos de la aplicación y del resultado de cualquier acción que realice o cualquier problema que tenga y de cómo solucionarlo.

**Summary**: Componente RUP Feedback.  
**Example**  
```js
var properties = {  type: "ok",  delay: 500,  fadeSpeed: 600,  gotoTop: false,  block: false,  closeLink: true};$("#id_capa").rup_feedback (properties);
```

* [rup_feedback](#module_rup_feedback)
    * _instance_
        * ["rupFeedback_show"](#module_rup_feedback+event_rupFeedback_show)
    * _inner_
        * [~options](#module_rup_feedback..options)
        * [~destroy()](#module_rup_feedback..destroy)
        * [~set(message, type, imgClass)](#module_rup_feedback..set)
        * [~hide([delay], [fadeSpeed])](#module_rup_feedback..hide)
        * [~close([notEmpty])](#module_rup_feedback..close)
        * [~show()](#module_rup_feedback..show)

<a name="module_rup_feedback+event_rupFeedback_show"></a>

### "rupFeedback_show"
Permite asociar una función que se ejecutará cuando se muestre el feedback.

**Kind**: event emitted by [<code>rup\_feedback</code>](#module_rup_feedback)  
**Example**  
```js
$("#feedback").on("rupFeedback_show", function(event){});
```
<a name="module_rup_feedback..options"></a>

### rup_feedback~options
Opciones por defecto de configuración del widget.

**Kind**: inner property of [<code>rup\_feedback</code>](#module_rup_feedback)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [type] | <code>string</code> | <code>null</code> | Tipo de feedback a mostrar [ok, alert, error]. |
| [message] | <code>string</code> |  | Mensaje que se mostrará en el feedback. Si no se define simplemente se creará el objeto donde se mostrarán los mensajes |
| [imgClass] | <code>Number</code> | <code></code> | Clase que determina el estilo que se va a aplicar en el icono del feedback. |
| [delay] | <code>Number</code> | <code></code> | Espera (ms) que va a aplicarse antes de ocultar el feedback. |
| [fadeSpeed] | <code>Number</code> | <code></code> | Tiempo (ms) que va a durar la animación de ocultación del feedback. |
| [gotoTop] | <code>boolean</code> | <code>true</code> | Drmina si cuando se muestre el feedback se debe desplazar la |
| [customGoTo] | <code>boolean</code> | <code></code> | Drmina si cuando se muestre el feedback donde se debe desplazar la página. |
| [block] | <code>boolean</code> | <code>true</code> | Indica si la capa que contendrá el mensaje de feedback debe tener o no un espacio fijo en la pantalla. |
| [closeLink] | <code>closeLink</code> | <code>true</code> | Indica si la capa de feedback tendrá un enlace para que el usuario de la aplicación pueda cerrar la capa manualmente. |

<a name="module_rup_feedback..destroy"></a>

### rup_feedback~destroy()
Elimina las modificaciones realizadas sobre la capa para convertirla en feedback volviendo a ser una simple capa.

**Kind**: inner method of [<code>rup\_feedback</code>](#module_rup_feedback)  
**Example**  
```js
// Elimina el feedbackjQuery("#feedback").rup_feedback("destroy");
```
<a name="module_rup_feedback..set"></a>

### rup_feedback~set(message, type, imgClass)
Establece el texto (msg) a mostrar en el feedback, que podrá ser tanto texto plano como html. <br/><br/>En caso de sólo definirse el parámetro msg, se mostrará como imagen aquella definida anteriormente ya sea de un tipo por defecto o de una imagen con estilo personalizado (si es que se había definido). <br/><br/>En caso de que se envíe el parámetro type informado de modificará la capa para mostrar la imagen por defecto asociada al tipo, borrando algún posible estilos personalizado establecido anteriormente. <br/><br/>Por último para realizar el cambio a un estilo personalizado se pasará como parámetro type null y como imgClass la clase con el estilo a establecer.

**Kind**: inner method of [<code>rup\_feedback</code>](#module_rup_feedback)  

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Texto del mensaje que se va a mostrar en el feedback. |
| type | <code>string</code> | Identificador del tipo de feedback [ok, alert, error]. |
| imgClass | <code>string</code> | Clase que determina el estilo que se va a aplicar en el icono del feedback. |

**Example** *(Feedback simple:)*  
```js
$("#id_capa").rup_feedback("set","Texto a mostrar");
```
**Example** *(Feedback cambiando a imagen de un tipo por defecto (Ej. error):)*  
```js
$("#id_capa").rup_feedback("set", "...", "error");
```
**Example** *(Feedback estableciendo un estilo personalizado:)*  
```js
$("#id_capa").rup_feedback("set", "...", null, "imgPropio");
```
<a name="module_rup_feedback..hide"></a>

### rup_feedback~hide([delay], [fadeSpeed])
Oculta la capa del feedback con una animación. <br/><br/>Si no se definen los parámetros se tomaran los definidos con anterioridad (creación del feedback por ejemplo) o si no los valores por defecto (null, null) que implica una animación sin espera con una “velocidad” de 400 ms.

**Kind**: inner method of [<code>rup\_feedback</code>](#module_rup_feedback)  

| Param | Type | Description |
| --- | --- | --- |
| [delay] | <code>Number</code> | Espera (ms) que va a aplicarse antes de ocultar el feedback. |
| [fadeSpeed] | <code>Number</code> | Tiempo (ms) que va a durar la animación de ocultación del feedback. |

**Example**  
```js
// Ocultar el feedback.jQuery("#feedback").rup_feedback("hide");
```
**Example**  
```js
// Ocultar el feedback. Se realiza con una demora de 1000ms y la transición dura 500ms.jQuery("#feedback").rup_feedback("hide",1000,500);
```
<a name="module_rup_feedback..close"></a>

### rup_feedback~close([notEmpty])
Oculta la capa del feedback sin animación alguna.<br/>Esta función será invocada por el enlace de cierre (parámetro closeLink) en caso de que se muestre.

**Kind**: inner method of [<code>rup\_feedback</code>](#module_rup_feedback)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [notEmpty] | <code>boolean</code> | <code>false</code> | Determina si se debe ejecutar empty() sobre el feedback. |

**Example**  
```js
// Cierra el feedback.jQuery("#feedback").rup_feedback("close");
```
<a name="module_rup_feedback..show"></a>

### rup_feedback~show()
Muestra la capa del feedback.Esta función será invocada automáticamente cada vez que se invoque la función set(…)

**Kind**: inner method of [<code>rup\_feedback</code>](#module_rup_feedback)  
**Emits**: [<code>rupFeedback\_show</code>](#module_rup_feedback+event_rupFeedback_show)  
**Example**  
```js
// Muestra el feedback.jQuery("#feedback").rup_feedback("show");
```
