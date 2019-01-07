<a name="module_rup_messages"></a>

## rup_messages
Tiene como objetivo mostrar al usuario de forma homogénea, clara y llamativa, los posibles mensajes que pueden desencadenar las acciones en la aplicación. Estos mensajes predefinidos pueden ser de diferente tipología: error, confirmación, aviso o alerta.

**Summary**: Componente RUP Message.  
**Example**  
```js
$.rup_messages("msgOK", {		title: "Correcto",		message: "Todo ha ido OK."});
```

* [rup_messages](#module_rup_messages)
    * [~defaults](#module_rup_messages..defaults)
    * [~msgError(properties)](#module_rup_messages..msgError)
    * [~msgConfirm(properties)](#module_rup_messages..msgConfirm)
    * [~msgOK(properties)](#module_rup_messages..msgOK)
    * [~msgAlert(properties)](#module_rup_messages..msgAlert)

<a name="module_rup_messages..defaults"></a>

### rup_messages~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup_messages</code>](#module_rup_messages)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [minHeight] | <code>Number</code> | <code>100</code> | Altura mínima con la que se va a mostrar el mensaje. |

<a name="module_rup_messages..msgError"></a>

### rup_messages~msgError(properties)
Muestra un mensaje de error.

**Kind**: inner method of [<code>rup_messages</code>](#module_rup_messages)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Objeto de configuración del mensaje de error. |
| properties.title | <code>String</code> | Función a ejecutar justo antes de que se cierre la ventana. |
| properties.message | <code>String</code> | El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo. |
| properties.beforeClose | [<code>beforeCloseCallback</code>](#jQuery.rup_messages..beforeCloseCallback) | Texto que aparecerá en la barra del titulo del mensaje. |

**Example**  
```js
// Mostrar un mensaje de error.$.rup_messages("msgError", {     title: "Error grave",     message: "<p>Se ha producido un error a la hora de intentar guardar el registro.<br>Consulte con el administrador.</p>"});
```
<a name="module_rup_messages..msgConfirm"></a>

### rup_messages~msgConfirm(properties)
Muestra un mensaje de confirmación.

**Kind**: inner method of [<code>rup_messages</code>](#module_rup_messages)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Objeto de configuración del mensaje de error. |
| properties.title | <code>String</code> | Texto que aparecerá en la barra del titulo del mensaje. |
| properties.message | <code>String</code> | El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo. |
| properties.beforeClose | [<code>beforeCloseCallback</code>](#jQuery.rup_messages..beforeCloseCallback) | Función a ejecutar justo antes de que se cierre la ventana. |
| properties.OKFunction | [<code>OKFunctionCallback</code>](#jQuery.rup_messages..OKFunctionCallback) | Función a ejecutar cuando el usuario pulsa el botón de Aceptar. |
| properties.CANCELFunction | [<code>CANCELFunctionCallback</code>](#jQuery.rup_messages..CANCELFunctionCallback) | Función a ejecutar cuando el usuario pulsa el enlace de Cancelar. |

**Example**  
```js
// funciones de callback.function acceptClicked() { alert("Ha pulsado aceptar."); }function cancelClicked() { alert("Ha pulsado cancelar."); }// Mostrar un mensaje de error.$.rup_messages("msgConfirm", {     title: "Confirmación",     message: "¿Está seguro que desea cancelar?",     OKFunction : acceptClicked,     CANCELFunction : cancelClicked});
```
<a name="module_rup_messages..msgOK"></a>

### rup_messages~msgOK(properties)
Muestra un mensaje de aviso.

**Kind**: inner method of [<code>rup_messages</code>](#module_rup_messages)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Objeto de configuración del mensaje de aviso. |
| properties.title | <code>String</code> | Texto que aparecerá en la barra del titulo del mensaje. |
| properties.message | <code>String</code> | El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo. |
| properties.beforeClose | [<code>beforeCloseCallback</code>](#jQuery.rup_messages..beforeCloseCallback) | Función a ejecutar justo antes de que se cierre la ventana. |

**Example**  
```js
// Mostrar un mensaje de aviso.$.rup_messages("msgOK", {     title: "Correcto",     message: "Todo ha ido OK."});
```
<a name="module_rup_messages..msgAlert"></a>

### rup_messages~msgAlert(properties)
Muestra un mensaje de alerta.

**Kind**: inner method of [<code>rup_messages</code>](#module_rup_messages)  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>Object</code> | Objeto de configuración del mensaje de alerta. |
| properties.title | <code>String</code> | Texto que aparecerá en la barra del titulo del mensaje. |
| properties.message | <code>String</code> | El mensaje de error que se quiere mostrar. Dicho mensaje se situará a la derecha de la imagen de error. El mensaje puede ser texto plano o contener etiquetas HTML que se reflejarán en el mismo. |
| properties.beforeClose | [<code>beforeCloseCallback</code>](#jQuery.rup_messages..beforeCloseCallback) | Función a ejecutar justo antes de que se cierre la ventana. |

**Example**  
```js
// Mostrar un mensaje de aviso.$.rup_messages("msgAlert", {     title: "Alerta",     message: "Esto es una alerta."});
```
