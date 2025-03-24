<a name="module_rup_form"></a>

## rup\_form
Permite al usuario introducir datos en una serie de campos para ser enviados al servidor y ser procesados.

**Summary**: Componente RUP Form.  
**Example**  
```js
var properties={
  // Propiedades de configuración
};

$("#formulario").rup_form(properties);
```

* [rup_form](#module_rup_form)
    * [~defaults](#module_rup_form..defaults)
    * [~ajaxFormSubmit(options)](#module_rup_form..ajaxFormSubmit)
    * [~ajaxSubmit(argOptions)](#module_rup_form..ajaxSubmit)
    * [~ajaxNotSubmit(argOptions)](#module_rup_form..ajaxNotSubmit)
    * [~destroy()](#module_rup_form..destroy)
    * [~formSerialize()](#module_rup_form..formSerialize) ⇒ <code>string</code>
    * [~formToJson()](#module_rup_form..formToJson) ⇒ <code>string</code>
    * [~fieldSerialize()](#module_rup_form..fieldSerialize) ⇒ <code>string</code>
    * [~fieldValue()](#module_rup_form..fieldValue) ⇒ <code>Array.&lt;string&gt;</code>
    * [~resetForm()](#module_rup_form..resetForm) ⇒ <code>jQuery</code>
    * [~clearForm(includeHidden)](#module_rup_form..clearForm) ⇒ <code>jQuery</code>
    * [~clearFields(includeHidden)](#module_rup_form..clearFields) ⇒ <code>jQuery</code>
    * [~configureOptions(settings)](#module_rup_form..configureOptions)

<a name="module_rup_form..defaults"></a>

### rup_form~defaults
Opciones por defecto de configuración del componente.

**Kind**: inner property of [<code>rup\_form</code>](#module_rup_form)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [beforeSerialize] | [<code>beforeSerialize</code>](#jQuery.rup_form..beforeSerialize) | <code></code> | Función de callback que será invocada antes de realizarse la serialización del formulario. Permite la modificación de los datos del formulario antes de que estos sean recuperados para su procesado por el componente. |
| [beforeSubmit] | [<code>beforeSubmit</code>](#jQuery.rup_form..beforeSubmit) | <code></code> | Función de callback que será invocada antes de realizarse el envío del formulario. Permite acceder a la información que será enviada al formulario. En caso de retornar false no se realizará en envío. |
| [clearForm] | <code>boolean</code> | <code></code> | Propiedad booleana que determina si el formulario debe de limpiarse después de realizar el envío. |
| [data] | <code>object</code> |  | Mediante esta propiedad es posible especificar parámetros extra que sean enviados alservidor. |
| [dataType] | <code>string</code> |  | Tipo de datos esperados en la respuesta. Los valores posibles son null, xml, json y script. |
| [error] | [<code>error</code>](#jQuery.rup_form..error) |  | Función de callback que será invocada cuando se produzca un error. |
| [forceSync] | <code>boolean</code> | <code>false</code> | Propiedad booleana. En caso de ser true elimina la corta espera que se produce antes de enviar el formulario cuando se envían ficheros o se utiliza la opción de iframe. La espera se utiliza para permitir al navegador actualizar modificaciones realizadas en el DOM antes de que se realice el envío de los datos. |
| [iframe] | <code>boolean</code> | <code>false</code> | Determina si el formulario debe de ser enviado siempre mediante un iframe. |
| [iframeSrc] | <code>string</code> |  | Propiedad de texto que deberá ser utlizada siempre en conjunción con la propiedad iframe. Por defecto, about:blank. Por defecto para páginas que utlicen el protocolo https, javascript:false. |
| [iframeTarget] | <code>string</code> | <code>null</code> | Identifica el iframe que será utilizado como target en la respuesta en los envíos de ficheros. Por defecto, el componente creará un iframe temporal para capturar la respuesta del envío de ficheros. |
| [multimodel] | <code>boolean</code> \| <code>object</code> | <code>false</code> | Permite especificar la configuración que se deberá de aplicar a la hora de realizar el envío de varias entidades en la misma petición. La configuración de este parámetro se detalla en el apartado 9.2. |
| [replaceTarget] | <code>boolean</code> | <code>false</code> | Opcionalmente se utililiza junto con la opción target. En caso de ser true el elemento identificado en la opción target será reemplazado. En caso de ser false solo su contenido será reemplazado. |
| [resetForm] | <code>boolean</code> | <code>false</code> | Propiedad booleana que determina si el formulario debe ser inicializado al realizarse el envío del mismo. |
| [semantic] | <code>bolean</code> | <code>false</code> | Propiedad booleana que determina si los campos del formulario deben ser enviado en estricto orden semántico. Por defecto la serialización normal del formulario se realiza en orden semántico exceptuando los campos img. |
| [suceess] | [<code>suceess</code>](#jQuery.rup_form..suceess) |  | Método callback que será invocado cuando se reciba la respuesta del formulario. |
| [target] | <code>string</code> \| <code>jQuery</code> \| <code>Element</code> |  | Identifica los elementos de la página que deberán ser actualizados con la respuesta del servidor. El target puede ser indicado mediante un selector de jQuery, un objeto de jQuery o un objeto DOM. |
| [type] | <code>string</code> |  | Detemina el método con el que se enviará el formulario, GET o POST. Por defecto el valor de la propiedad method indicada en el formulario o GET en caso de no encontrarse. |
| [uploadProgress] | [<code>uploadProgress</code>](#jQuery.rup_form..uploadProgress) | <code></code> | Método que será invocado con información de progreso del envío del formulario (en caso de estar soportado por el navegador). |
| [url] | <code>string</code> |  | URL a la cual se realizará en envío del formulario. Por defecto el valor indicado en la propiedad action del formulario. |
| [useJsonIfPossible] | <code>boolean</code> | <code>true</code> | Mediante este parámetro se especifica al componente que debe de utilizar el formato application/json como prioridad (siempre que sea posible) al realizar el envío del formulario. |

<a name="module_rup_form..ajaxFormSubmit"></a>

### rup_form~ajaxFormSubmit(options)
Realiza la misma función que ajaxSubmit. Se mantiene para asegurar la retrocompatibilidad con versiones anteriores.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | Opciones de configuración. |

**Example**  
```js
var options = {};
jQuery("#form").rup_form("ajaxFormSubmit", options);
```
<a name="module_rup_form..ajaxSubmit"></a>

### rup_form~ajaxSubmit(argOptions)
Realiza el envío del formulario. La configuración de este método es la misma que la de ajaxForm.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  

| Param | Type | Description |
| --- | --- | --- |
| argOptions | <code>object</code> | Opciones de configuración. |

**Example**  
```js
var options = {};
jQuery("#form").rup_form("ajaxSubmit", options);
```
<a name="module_rup_form..ajaxNotSubmit"></a>

### rup_form~ajaxNotSubmit(argOptions)
Realiza el envío del formulario. La configuración de este método es la misma que la de ajaxForm.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  

| Param | Type | Description |
| --- | --- | --- |
| argOptions | <code>object</code> | Opciones de configuración. |

**Example**  
```js
var options = {};
jQuery("#form").rup_form("ajaxNotSubmit", options);
```
<a name="module_rup_form..destroy"></a>

### rup_form~destroy()
Elimina la configuración realizada por el componente sobre el formulario html.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Example**  
```js
var options = {};
jQuery("#form").rup_form("destroy");
```
<a name="module_rup_form..formSerialize"></a>

### rup_form~formSerialize() ⇒ <code>string</code>
Serializa el contenido del formulario en un query string.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>string</code> - - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.  
**Example**  
```js
jQuery("#form").rup_form("formSerialize");
```
<a name="module_rup_form..formToJson"></a>

### rup_form~formToJson() ⇒ <code>string</code>
Realiza la serialización de campos del formulario en un objeto json.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>string</code> - - Retorna un objeto con el formato {nombre1:valor1, nombre2:valor2…nombreN:valorN}.  
**Example**  
```js
jQuery("#form").rup_form("formToJson");
```
<a name="module_rup_form..fieldSerialize"></a>

### rup_form~fieldSerialize() ⇒ <code>string</code>
Realiza la serialización de campos del formulario en un query string

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>string</code> - - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.  
**Example**  
```js
jQuery("#form .specialFields").rup_form("fieldSerialize");
```
<a name="module_rup_form..fieldValue"></a>

### rup_form~fieldValue() ⇒ <code>Array.&lt;string&gt;</code>
Devuelve un array con el valor de los campos indicados.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>Array.&lt;string&gt;</code> - - Retorna una cadena de texto con el formato nombre1=valor1&nombre2=valor2.  
**Example**  
```js
jQuery("#form .specialFields").rup_form("fieldValue");
```
<a name="module_rup_form..resetForm"></a>

### rup_form~resetForm() ⇒ <code>jQuery</code>
Inicializa el formulario con su estado inicial invocando al método reset nativo.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>jQuery</code> - - Retorna el propio componente.  
**Example**  
```js
jQuery("#form").rup_form("resetForm");
```
<a name="module_rup_form..clearForm"></a>

### rup_form~clearForm(includeHidden) ⇒ <code>jQuery</code>
Limpia los elementos del formulario.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>jQuery</code> - - Retorna el propio componente.  

| Param | Type | Description |
| --- | --- | --- |
| includeHidden | <code>boolean</code> | Determina si se deben de limpiar también los elementos hidden que existen en el formulario. |

**Example**  
```js
// Limpiar los campos del formulario
jQuery("#form").rup_form("clearForm");
// Limpiar los campos del formulario inlcuyendo los campos hidden
jQuery("#form").rup_form("clearForm", true);
```
<a name="module_rup_form..clearFields"></a>

### rup_form~clearFields(includeHidden) ⇒ <code>jQuery</code>
Limpia los campos especificados mediante el selector de jQuery.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  
**Returns**: <code>jQuery</code> - - Retorna el propio componente.  

| Param | Type | Description |
| --- | --- | --- |
| includeHidden | <code>boolean</code> | Determina si se deben de limpiar también los elementos hidden que existen en el formulario. |

**Example**  
```js
// Limpiar los campos del formulario
jQuery("#form .specialFields").rup_form("clearFields");
// Limpiar los campos del formulario inlcuyendo los campos hidden
jQuery("#form .specialFields").rup_form("clearFields", true);
```
<a name="module_rup_form..configureOptions"></a>

### rup_form~configureOptions(settings)
Función de inicialización del componente. Es un método de uso interno. No debería de invocarse de manera directa.

**Kind**: inner method of [<code>rup\_form</code>](#module_rup_form)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Propiedades de configuración |

