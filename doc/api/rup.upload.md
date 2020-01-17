<a name="module_rup_upload"></a>

## rup\_upload
Permite al usuario seleccionar uno o varios archivos de su equipo y subirlos a la aplicación.

**Summary**: Componente RUP Upload.  
**See**: El componente está basado en el plugin [jQuery File Upload](https://blueimp.github.io/jQuery-File-Upload/). Para mas información acerca de las funcionalidades y opciones de configuración pinche [aquí](https://blueimp.github.io/jQuery-File-Upload/).  
**Example**  
```js
$("#idUpload").rup_upload({});
```

* [rup_upload](#module_rup_upload)
    * [~destroy()](#module_rup_upload..destroy)
    * [~enable()](#module_rup_upload..enable)
    * [~disable()](#module_rup_upload..disable)
    * [~add()](#module_rup_upload..add)

<a name="module_rup_upload..destroy"></a>

### rup_upload~destroy()
Elimina los objetos jQuery asociados al elemento identificado por el selector, durante el proceso de creación del componente upload

**Kind**: inner method of [<code>rup\_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_combo("destroy");
```
<a name="module_rup_upload..enable"></a>

### rup_upload~enable()
**Kind**: inner method of [<code>rup\_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_upload("enable");
```
<a name="module_rup_upload..disable"></a>

### rup_upload~disable()
Deshabilita el componente upload

**Kind**: inner method of [<code>rup\_upload</code>](#module_rup_upload)  
**Example**  
```js
$(selector).rup_upload("disable");
```
<a name="module_rup_upload..add"></a>

### rup_upload~add()
Permite asociar una función que se ejecutará cuando se añada un fichero mediante el componente. muestre el desplegable del combo

**Kind**: inner method of [<code>rup\_upload</code>](#module_rup_upload)  
