<a name="module_rup_validate"></a>

## rup\_validate
Permite al usuario validar los datos introducidos en los campos que se presentan en la aplicación.

**Summary**: Componente RUP Validate.  
**See**: El componente está basado en el plugin [jQuery Validation Plugin](http://jqueryvalidation.org/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](http://jqueryvalidation.org/).  
**Example**  
```js
var properties={
  rules:{
      "campoObligatorio":{required:true},
      "dni":{required:true,dni:true}
  }
};
$("#formValidaciones").rup_validate(properties);
```

* [rup_validate](#module_rup_validate)
    * [~destroy()](#module_rup_validate..destroy)
    * [~resetForm()](#module_rup_validate..resetForm)
    * [~resetElements()](#module_rup_validate..resetElements)

<a name="module_rup_validate..destroy"></a>

### rup_validate~destroy()
Se eliminan todos los objetos y eventos credos por el componente.

**Kind**: inner method of [<code>rup\_validate</code>](#module_rup_validate)  
**Example**  
```js
$("#formValidaciones").rup_validate("destroy");
```
<a name="module_rup_validate..resetForm"></a>

### rup_validate~resetForm()
Se realiza un reset del formulario y se eliminan los mensajes de error de las reglas de validacion.

**Kind**: inner method of [<code>rup\_validate</code>](#module_rup_validate)  
**Example**  
```js
$("#formValidaciones").rup_validate("resetForm");
```
<a name="module_rup_validate..resetElements"></a>

### rup_validate~resetElements()
Se eliminan los menssajes de error de las reglas de validacion.

**Kind**: inner method of [<code>rup\_validate</code>](#module_rup_validate)  
**Example**  
```js
$("#formValidaciones").rup_validate("resetElements");
```
