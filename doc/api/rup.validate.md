<a name="module_rup_validate"></a>

## rup_validate
Permite al usuario validar los datos introducidos en los campos que se presentan en la aplicación.

**Summary**: Componente RUP Validate.  
**See**: El componente está basado en el plugin [jQuery Validation Plugin](http://jqueryvalidation.org/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://jqueryvalidation.org/).  
**Example**  
```js
var properties={  rules:{      "campoObligatorio":{required:true},      "dni":{required:true,dni:true}  }};$("#formValidaciones").rup_validate(properties);
```

* [rup_validate](#module_rup_validate)
    * _instance_
        * ["rupValidate_formValidationError"](#module_rup_validate+event_rupValidate_formValidationError)
    * _inner_
        * [~options](#module_rup_validate..options)
        * [~destroy()](#module_rup_validate..destroy)
        * [~resetForm()](#module_rup_validate..resetForm)
        * [~onSubmitHandler](#module_rup_validate..onSubmitHandler) : <code>function</code>
        * [~onInvalidHandler](#module_rup_validate..onInvalidHandler) : <code>function</code>
        * [~onShowErrors](#module_rup_validate..onShowErrors) : <code>function</code>
        * [~onErrorPlacement](#module_rup_validate..onErrorPlacement) : <code>function</code>
        * [~onHighlight](#module_rup_validate..onHighlight) : <code>function</code>
        * [~onUnhighlight](#module_rup_validate..onUnhighlight) : <code>function</code>

<a name="module_rup_validate+event_rupValidate_formValidationError"></a>

### "rupValidate_formValidationError"
Este evento es lanzado cuando se produce alguna violación entre las reglas de validación especificadas para ser aplicadas sobre los campos del formulario.

**Kind**: event emitted by <code>[rup_validate](#module_rup_validate)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| e | <code>Event</code> | Objeto Event correspondiente al evento disparado. |

**Example**  
```js
$("#idFormulario").on("rupValidate_formValidationError", function(event){});
```
<a name="module_rup_validate..options"></a>

### rup_validate~options
Propiedades de configuración del componente.

**Kind**: inner property of <code>[rup_validate](#module_rup_validate)</code>  
**See**: Para mas información consulte la documentación acerca de las opciones de configuración del plugin [jQuery Validation Plugin](http://jqueryvalidation.org/validate/).  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| debug | <code>boolean</code> | <code>false</code> | Activa el modo debug. En caso de estar activado el formulario no se envía el formulario y los errores de ejecución que se hayan producido se visualizan en la consola. Requiere Firebug o Firebug lite. |
| submitHandler | <code>[onSubmitHandler](#module_rup_validate..onSubmitHandler)</code> |  | Método callback utilizado para capturar el evento submit cuando el formulario es válido. Reemplaza el submit por defecto. Es el método utilizado para realizar un submit mediante AJAX después de ser validado. |
| invalidHandler | <code>[onInvalidHandler](#module_rup_validate..onInvalidHandler)</code> |  | Método callback que se ejecuta cuando un formulario presenta errores de validación. |
| ignore | <code>Selector</code> |  | Selector jQuery que identifica los elementos del formulario que van a ser ignorados al realizarse las validaciones. |
| messages | <code>object</code> |  | Utilizado para indicar mensajes propios para las validaciones. Estos se especifican mediante pares de clave/valor. La clave es el nombre del elemento mientras que el valor es el texto que se ha de mostrar en caso de producirse un error en la validación. |
| groups | <code>object</code> |  | Se utiliza para realizar agrupamientos de mensajes de error. |
| onsubmit | <code>boolean</code> | <code>true</code> | Determina si se valida el formulario al realizarse el submit. Marcar como false para realizar las validaciones mediante el resto de eventos. |
| ofocusout | <code>boolean</code> | <code>true</code> | Determina si se realiza la validación de los campos (excepto los checkbox y radio) al lanzarse los eventos blur. Estas validaciones se realizan únicamente una vez que un campo ha sido marcado como inválido. |
| okeyup | <code>boolean</code> | <code>true</code> | Determina si se realiza la validación de los campos (excepto los checkbox y radio) al lanzarse los eventos keyup. Las validaciones se realizan únicamente una vez que un campo ha sido marcado como inválido. |
| onclick | <code>boolean</code> | <code>true</code> | Determina si se realizan las validaciones de los checkbox y radio al realizar un click sobre los mismos. |
| focusInvalid | <code>boolean</code> | <code>true</code> | Posiciona el foco en el último campo activo o en el primer campo inválido la realizarse la validación de los campos. En caso de encontrarse el foco en un campo al realizarse la validación se mantiene en dicho campo. En caso de no encontrarse el foco en un campo, se posicionará en el primer campo inválido existente. |
| focusCleanup | <code>boolean</code> | <code>false</code> | En caso de activarse, elimina el errorClass correspondiente y oculta los mensajes de error de los campos que reciben el foco. Evitar utilizar esta propiedad en conjunción con focusInvalid. |
| meta | <code>Selector</code> |  | En caso de utilizar metainformación en los campos que sea utilizada por otros plugins, es posible indicar un identificador para envolver la metadata correspondiente al el componente validate dentro de un objeto propio. |
| errorClass | <code>String</code> | <code>error</code> | Determina el nombre del class que va a aplicarse a los campos que presenten errores de validación. |
| validClass | <code>String</code> | <code>valid</code> | Determina el nombre del class que va a aplicarse a los campos que han sido validados y no presenten errores. |
| errorElement | <code>String</code> | <code>label</code> | Determina el tipo del elemento que va a utilizarse para generar los mensajes de error. |
| wrapper | <code>String</code> | <code>window</code> | Recubre los mensajes de error con el elemento especificado. Util en conjunción la propiedad errorLabelContainer para crear listado de errores. |
| errorLabelContainer | <code>Selector</code> |  | Determina el objeto contenedor en el que se van a mostrar los mensajes de error. |
| errorContainer | <code>Selector</code> |  | Determina un contenedor adicional para los mensajes de error. |
| ignoreTitle | <code>boolean</code> | <code>false</code> | Determina si se evita el obtener los mensajes a partir del atributo title. |
| showErrors | <code>[onShowErrors](#module_rup_validate..onShowErrors)</code> |  | Función callback para realizar un tratamiento  personalizado de los errores de validación. |
| errorPlacement | <code>[onErrorPlacement](#module_rup_validate..onErrorPlacement)</code> |  | Función de callback que permite personalizar el lugar en el que se posicionarán los mensajes de error. |
| highlight | <code>[onHighlight](#module_rup_validate..onHighlight)</code> |  | Función de callback para determinar como se debe resaltar los campos inválidos. |
| unhighlight | <code>[onUnhighlight](#module_rup_validate..onUnhighlight)</code> |  | Función de callback para restaurar los cambios realizados por la función indicada en la propiedad highlight. |

<a name="module_rup_validate..destroy"></a>

### rup_validate~destroy()
Se eliminan todos los objetos y eventos credos por el componente.

**Kind**: inner method of <code>[rup_validate](#module_rup_validate)</code>  
**Example**  
```js
$("#formValidaciones").rup_validate("destroy");
```
<a name="module_rup_validate..resetForm"></a>

### rup_validate~resetForm()
Se eliminan los menssajes de error de las reglas de validacion.

**Kind**: inner method of <code>[rup_validate](#module_rup_validate)</code>  
**Example**  
```js
$("#formValidaciones").rup_validate("resetForm");
```
<a name="module_rup_validate..onSubmitHandler"></a>

### rup_validate~onSubmitHandler : <code>function</code>
Función de callback que se ejecutará cuando el formulario sea válido.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>Element</code> | Referencia al objeto DOM del formulario que está siendo validado. |

**Example** *(Envia el formulario cuando este es válido.)*  
```js
$("#idFormulario").rup_tooltip({
  onSubmitHandler: function(form){
      $(form).ajaxSubmit();
  }
});
```
**Example** *(Realizar otras operaciones cuando el formulario es válido.)*  
```js
$("#idFormulario").rup_tooltip({
  onSubmitHandler: function(form){
            // Operaciones extra
      $(form).ajaxSubmit();
  }
});
```
<a name="module_rup_validate..onInvalidHandler"></a>

### rup_validate~onInvalidHandler : <code>function</code>
Función que se ejecutará cuando el formulario presente errores de validación.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Objeto event asociado al evento lanzado. |
| validator | <code>object</code> | Instancia del validador asociada al formulario actual. |

**Example**  
```js
$(".selector").validate({  invalidHandler: function(event, validator) {   // 'this' refers to the form   var errors = validator.numberOfInvalids();   if (errors) {     var message = errors == 1       ? 'You missed 1 field. It has been highlighted'       : 'You missed ' + errors + ' fields. They have been highlighted';     $("div.error span").html(message);     $("div.error").show();   } else {     $("div.error").hide();   } }});
```
<a name="module_rup_validate..onShowErrors"></a>

### rup_validate~onShowErrors : <code>function</code>
Función que se ejecutará cuando se produzca la validación de los datos permitiendo personalizar los errores de validación.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| errorMap | <code>Object</code> | Pares de clave/valor, donde el key se corresponde con el name del campo del formulario y el value con el mensaje que se va a mostrar para ese campo. |
| errorList | <code>Array.&lt;Object&gt;</code> | Array de objetos correspondientes a los campos validados. |
| errorList.message | <code>String</code> | Mensaje que va mostrarse para ese campo. |
| errorList.element | <code>Element</code> | Objeto del DOM correspondiente a ese campo. |

**Example**  
```js
$(".selector").validate({ showErrors: function(errorMap, errorList) {   $("#summary").html("Your form contains "     + this.numberOfInvalids()     + " errors, see details below.");   this.defaultShowErrors(); }});
```
<a name="module_rup_validate..onErrorPlacement"></a>

### rup_validate~onErrorPlacement : <code>function</code>
Función de callback que permite personalizar el lugar en el que se posicionarán los mensajes de error.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| error | <code>jQuery</code> | Referencia al objeto label que va a ser insertado en el DOM para visualizar los errores. |
| element | <code>jQuery</code> | Referencia al campo validado. |

**Example**  
```js
$("#myform").validate({  errorPlacement: function(error, element) {      error.appendTo( element.parent("td").next("td") );  }});
```
<a name="module_rup_validate..onHighlight"></a>

### rup_validate~onHighlight : <code>function</code>
Función de callback para determinar como se debe resaltar los campos inválidos.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>jQuery</code> | Referencia al campo validado. |
| errorClass | <code>String</code> | Valor actual del parámetro errorClass. |
| validClass | <code>String</code> | Valor actual del parámetro validClass. |

**Example**  
```js
$(".selector").validate({  highlight: function(element, errorClass, validClass) {       $(element).fadeOut(function() {           $(element).fadeIn();       });  }});
```
<a name="module_rup_validate..onUnhighlight"></a>

### rup_validate~onUnhighlight : <code>function</code>
Función de callback para determinar como se debe resaltar los campos inválidos.

**Kind**: inner typedef of <code>[rup_validate](#module_rup_validate)</code>  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>jQuery</code> | Referencia al campo validado. |
| errorClass | <code>String</code> | Valor actual del parámetro errorClass. |
| validClass | <code>String</code> | Valor actual del parámetro validClass. |

**Example**  
```js
$(".selector").validate({ highlight: function(element, errorClass, validClass) {   $(element).addClass(errorClass).removeClass(validClass);   $(element.form).find("label[for=" + element.id + "]")     .addClass(errorClass); }, unhighlight: function(element, errorClass, validClass) {   $(element).removeClass(errorClass).addClass(validClass);   $(element.form).find("label[for=" + element.id + "]")     .removeClass(errorClass); }});
```
